import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import type { DailyContent, SectionSlug } from "../lib/types";
import {
  buildCardPrompt,
  buildHeroPrompt,
  buildSummaryPrompt,
} from "./image-prompts";
import { IMAGE_CONFIG } from "./image-config";

const CONTENT_DIR = path.join(process.cwd(), "content");
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

// Defer initialization so the module loads even without the key
let ai: GoogleGenAI;
function getAI(): GoogleGenAI {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable is required.");
      process.exit(1);
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

// Resolved at startup by probeModel()
let activeModel: string = "";

/**
 * Probe each model in IMAGE_CONFIG.models with a tiny test request.
 * Returns the first model that responds successfully.
 */
async function probeModel(): Promise<string> {
  for (const model of IMAGE_CONFIG.models) {
    try {
      console.log(`Probing model: ${model}...`);
      const response = await getAI().models.generateContent({
        model,
        contents: "A single red dot on a white background",
        config: { responseModalities: ["TEXT", "IMAGE"] },
      });
      const parts = response.candidates?.[0]?.content?.parts || [];
      const hasImage = parts.some((p: any) =>
        p.inlineData?.mimeType?.startsWith("image/")
      );
      if (hasImage) {
        console.log(`✓ Using model: ${model}`);
        return model;
      }
      console.warn(`  ${model}: responded but no image data`);
    } catch (error: any) {
      const msg = error.message?.substring(0, 100) || "unknown error";
      console.warn(`  ${model}: unavailable (${msg})`);
    }
  }
  console.error("No image models available. All probes failed.");
  process.exit(1);
}

interface ImageTask {
  prompt: string;
  outputPath: string; // absolute filesystem path
  publicPath: string; // relative URL path for JSON ("/images/...")
  aspectRatio: string;
  width: number;
  height: number;
}

/**
 * Generate a single image via Gemini and save as WebP.
 * Retries up to maxRetries times with exponential backoff on 503/429 errors.
 */
async function generateSingleImage(task: ImageTask, maxRetries = 3): Promise<boolean> {
  // Skip if image already exists (for incremental retries)
  if (fs.existsSync(task.outputPath)) {
    console.log(`Skipped (exists): ${task.publicPath}`);
    return true;
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await getAI().models.generateContent({
        model: activeModel,
        contents: task.prompt,
        config: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      });

      // Find the image part in the response
      const parts = response.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find((p: any) =>
        p.inlineData?.mimeType?.startsWith("image/")
      );

      if (!imagePart?.inlineData?.data) {
        console.warn(`No image data returned for: ${task.publicPath}`);
        return false;
      }

      const pngBuffer = Buffer.from(imagePart.inlineData.data, "base64");

      // Convert to WebP and resize to target dimensions
      await sharp(pngBuffer)
        .resize(task.width, task.height, { fit: "cover" })
        .webp({ quality: IMAGE_CONFIG.quality })
        .toFile(task.outputPath);

      console.log(`Generated: ${task.publicPath}`);
      return true;
    } catch (error: any) {
      const msg = error.message || "";
      const isRetryable = msg.includes("503") || msg.includes("429") || msg.includes("UNAVAILABLE") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("fetch failed");

      if (isRetryable && attempt < maxRetries) {
        const delay = Math.pow(2, attempt + 1) * 5000; // 10s, 20s, 40s
        console.warn(`Retry ${attempt + 1}/${maxRetries} for ${task.publicPath} in ${delay / 1000}s...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      console.warn(`Failed to generate image for ${task.publicPath}: ${msg}`);
      return false;
    }
  }
  return false;
}

/**
 * Process image tasks in batches to respect rate limits.
 */
async function processInBatches(
  tasks: ImageTask[],
  concurrency: number = IMAGE_CONFIG.batchConcurrency
): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();

  for (let i = 0; i < tasks.length; i += concurrency) {
    const batch = tasks.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(
      batch.map((task) => generateSingleImage(task))
    );

    batch.forEach((task, idx) => {
      const result = batchResults[idx];
      results.set(
        task.publicPath,
        result.status === "fulfilled" && result.value
      );
    });

    // Small delay between batches to be polite to the API
    if (i + concurrency < tasks.length) {
      await new Promise((r) => setTimeout(r, IMAGE_CONFIG.batchDelayMs));
    }
  }

  return results;
}

/**
 * Try to detect which section the headline belongs to,
 * and return the matching NewsItem for full story context.
 */
function findHeadlineStory(content: DailyContent): { section: SectionSlug; story: any | null } {
  for (const [section, items] of Object.entries(content.sections)) {
    for (const item of items) {
      if (item.sourceUrl === content.headline.sourceUrl) {
        return { section: section as SectionSlug, story: item };
      }
    }
  }
  return { section: "tools", story: null };
}

async function main() {
  const dateStr = process.argv[2];
  if (!dateStr) {
    // Default to today
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    console.log(`No date provided, using today: ${todayStr}`);
    process.argv[2] = todayStr;
    return main();
  }

  // Probe models to find the best available one
  activeModel = await probeModel();

  const contentPath = path.join(CONTENT_DIR, `${dateStr}.json`);
  if (!fs.existsSync(contentPath)) {
    console.error(`Content file not found: ${contentPath}`);
    process.exit(1);
  }

  const content: DailyContent = JSON.parse(
    fs.readFileSync(contentPath, "utf-8")
  );
  const dateImagesDir = path.join(IMAGES_DIR, dateStr);
  fs.mkdirSync(dateImagesDir, { recursive: true });

  const tasks: ImageTask[] = [];

  // 1. Hero image — always AI-generated
  const { section: heroSection, story: heroStory } = findHeadlineStory(content);
  const heroFilename = `${dateStr}-hero.webp`;
  tasks.push({
    prompt: buildHeroPrompt(
      heroSection,
      content.headline.title,
      heroStory?.summary || content.headline.summary,
      heroStory?.keyTakeaways?.[0] || content.headline.summary,
      heroStory?.whyItMatters || content.headline.summary,
      heroStory?.people || [],
    ),
    outputPath: path.join(dateImagesDir, heroFilename),
    publicPath: `/images/${dateStr}/${heroFilename}`,
    aspectRatio: IMAGE_CONFIG.hero.aspectRatio,
    width: IMAGE_CONFIG.hero.width,
    height: IMAGE_CONFIG.hero.height,
  });

  // 2. Summary banner image
  const summaryFilename = `${dateStr}-summary.webp`;
  tasks.push({
    prompt: buildSummaryPrompt(),
    outputPath: path.join(dateImagesDir, summaryFilename),
    publicPath: `/images/${dateStr}/${summaryFilename}`,
    aspectRatio: IMAGE_CONFIG.summary.aspectRatio,
    width: IMAGE_CONFIG.summary.width,
    height: IMAGE_CONFIG.summary.height,
  });

  // 3. Card images — all AI-generated
  for (const [section, items] of Object.entries(content.sections)) {
    for (const item of items) {
      const cardFilename = `${dateStr}-${section}-${item.id}.webp`;
      tasks.push({
        prompt: buildCardPrompt(
          section as SectionSlug,
          item.title,
          item.summary || "",
          item.keyTakeaways?.[0] || item.summary || "",
          item.whyItMatters || item.summary || "",
          item.people || [],
        ),
        outputPath: path.join(dateImagesDir, cardFilename),
        publicPath: `/images/${dateStr}/${cardFilename}`,
        aspectRatio: IMAGE_CONFIG.card.aspectRatio,
        width: IMAGE_CONFIG.card.width,
        height: IMAGE_CONFIG.card.height,
      });
    }
  }

  console.log(`Generating ${tasks.length} images for ${dateStr}...`);
  const results = await processInBatches(tasks);

  // 4. Update content JSON with image paths for successful generations
  let updated = false;

  const heroPath = `/images/${dateStr}/${heroFilename}`;
  if (results.get(heroPath)) {
    content.headline.imageUrl = heroPath;
    updated = true;
  }

  const summaryPath = `/images/${dateStr}/${summaryFilename}`;
  if (results.get(summaryPath)) {
    content.simpleSummaryImageUrl = summaryPath;
    updated = true;
  }

  for (const [section, items] of Object.entries(content.sections)) {
    for (const item of items) {
      const cardPath = `/images/${dateStr}/${dateStr}-${section}-${item.id}.webp`;
      if (results.get(cardPath)) {
        item.imageUrl = cardPath;
        updated = true;
      }
    }
  }

  if (updated) {
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
    console.log(`Updated ${contentPath} with image paths`);
  }

  const successCount = [...results.values()].filter(Boolean).length;
  console.log(
    `Done: ${successCount}/${tasks.length} images generated successfully.`
  );

  if (successCount === 0 && tasks.length > 0) {
    console.error("All image generations failed.");
    process.exit(1);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error("Fatal error in image generation:", error);
  process.exit(1);
});
