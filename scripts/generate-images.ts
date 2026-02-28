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
 */
async function generateSingleImage(task: ImageTask): Promise<boolean> {
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
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
      .webp({ quality: 85 })
      .toFile(task.outputPath);

    console.log(`Generated: ${task.publicPath}`);
    return true;
  } catch (error: any) {
    console.warn(
      `Failed to generate image for ${task.publicPath}: ${error.message}`
    );
    return false;
  }
}

/**
 * Process image tasks in batches to respect rate limits.
 * Concurrency of 5 stays well under 300 RPM.
 */
async function processInBatches(
  tasks: ImageTask[],
  concurrency: number = 5
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
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return results;
}

/**
 * Try to detect which section the headline belongs to.
 */
function detectHeadlineSection(content: DailyContent): SectionSlug {
  for (const [section, items] of Object.entries(content.sections)) {
    for (const item of items) {
      if (item.sourceUrl === content.headline.sourceUrl) {
        return section as SectionSlug;
      }
    }
  }
  return "tools"; // fallback
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

  // 1. Hero image
  const heroSection = detectHeadlineSection(content);
  const heroFilename = `${dateStr}-hero.webp`;
  tasks.push({
    prompt: buildHeroPrompt(heroSection, content.headline.title),
    outputPath: path.join(dateImagesDir, heroFilename),
    publicPath: `/images/${dateStr}/${heroFilename}`,
    aspectRatio: "16:9",
    width: 1600,
    height: 900,
  });

  // 2. Summary banner image
  const summaryFilename = `${dateStr}-summary.webp`;
  tasks.push({
    prompt: buildSummaryPrompt(),
    outputPath: path.join(dateImagesDir, summaryFilename),
    publicPath: `/images/${dateStr}/${summaryFilename}`,
    aspectRatio: "16:9",
    width: 1200,
    height: 400,
  });

  // 3. Card images for each story
  for (const [section, items] of Object.entries(content.sections)) {
    for (const item of items) {
      const cardFilename = `${dateStr}-${section}-${item.id}.webp`;
      tasks.push({
        prompt: buildCardPrompt(section as SectionSlug, item.title),
        outputPath: path.join(dateImagesDir, cardFilename),
        publicPath: `/images/${dateStr}/${cardFilename}`,
        aspectRatio: "16:9",
        width: 800,
        height: 450,
      });
    }
  }

  console.log(`Generating ${tasks.length} images for ${dateStr}...`);
  const results = await processInBatches(tasks, 5);

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
