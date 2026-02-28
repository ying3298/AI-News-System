import fs from "fs";
import path from "path";
import { fetchAllFeeds, type RawFeedItem } from "./fetch-rss";
import { curateWithClaude } from "./curate-with-claude";
import type { ContentIndex, DailyContent, NewsItem } from "../lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getTodayDateStr(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Fallback: build DailyContent from raw RSS items when Claude API is unavailable.
 * Groups items by their source category, uses RSS titles/snippets as-is.
 */
function buildFallbackContent(
  rawItems: RawFeedItem[],
  dateStr: string
): DailyContent {
  const dateFormatted = new Date(dateStr + "T12:00:00Z").toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
  );

  const sectionMap: Record<string, RawFeedItem[]> = {
    tools: [],
    research: [],
    business: [],
    policy: [],
    concerns: [],
  };

  for (const item of rawItems) {
    const cat = item.sourceCategory || "tools";
    if (sectionMap[cat]) {
      sectionMap[cat].push(item);
    } else {
      sectionMap.tools.push(item);
    }
  }

  let idCounter = 1;
  function toNewsItem(raw: RawFeedItem, section: string): NewsItem {
    const id = `AI-${String(idCounter++).padStart(3, "0")}`;
    return {
      id,
      title: raw.title,
      summary: raw.contentSnippet.slice(0, 250) || raw.title,
      content: raw.contentSnippet,
      keyTakeaways: [],
      whyItMatters: "",
      sourceUrl: raw.link,
      sourceName: raw.sourceName,
      tags: [raw.sourceName],
      section,
      readTime: "2 min",
      publishedAt: raw.pubDate,
    };
  }

  const sections = {
    tools: sectionMap.tools.slice(0, 5).map((r) => toNewsItem(r, "tools")),
    research: sectionMap.research.slice(0, 5).map((r) => toNewsItem(r, "research")),
    business: sectionMap.business.slice(0, 5).map((r) => toNewsItem(r, "business")),
    policy: sectionMap.policy.slice(0, 5).map((r) => toNewsItem(r, "policy")),
    concerns: sectionMap.concerns.slice(0, 5).map((r) => toNewsItem(r, "concerns")),
  };

  // Pick the first item from the largest section as headline
  const allItems = Object.values(sections).flat();
  const headlineItem = allItems[0];

  const allSourceUrls = new Set<string>();
  allItems.forEach((item) => allSourceUrls.add(item.sourceUrl));

  return {
    date: dateStr,
    dateFormatted,
    headline: {
      title: headlineItem?.title || "Today's AI News",
      summary: headlineItem?.summary || "Check out the latest AI developments.",
      sourceUrl: headlineItem?.sourceUrl || "",
      sourceName: headlineItem?.sourceName || "",
    },
    simpleSummary:
      "Today's edition was assembled directly from RSS feeds without AI curation. Browse the stories below for the latest AI news.",
    sections,
    quote: {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
      authorTitle: "Computer Scientist",
    },
    sources: Array.from(allSourceUrls),
    generatedAt: new Date().toISOString(),
  };
}

async function main() {
  const dateStr = process.argv[2] || getTodayDateStr();
  const outputPath = path.join(CONTENT_DIR, `${dateStr}.json`);
  const indexPath = path.join(CONTENT_DIR, "index.json");

  // Allow --force flag or FORCE_UPDATE env var to regenerate
  const forceUpdate =
    process.argv.includes("--force") || process.env.FORCE_UPDATE === "true";

  if (fs.existsSync(outputPath) && !forceUpdate) {
    console.log(`Content for ${dateStr} already exists, skipping. Use --force to regenerate.`);
    process.exit(0);
  }

  if (fs.existsSync(outputPath) && forceUpdate) {
    console.log(`Content for ${dateStr} exists but --force is set, regenerating...`);
  }

  console.log(`Generating content for ${dateStr}...`);

  // Step 1: Fetch RSS feeds
  console.log("Fetching RSS feeds...");
  const rawItems = await fetchAllFeeds();

  if (rawItems.length === 0) {
    console.error("No feed items found. Aborting.");
    process.exit(1);
  }

  // Step 2: Curate with Claude (with fallback)
  let content: DailyContent;
  try {
    console.log("Curating with Claude...");
    content = await curateWithClaude(rawItems, dateStr);
  } catch (error: any) {
    console.warn(`Claude API failed: ${error.message}`);
    console.log("Falling back to RSS-only content...");
    content = buildFallbackContent(rawItems, dateStr);
  }

  // Step 3: Write content JSON
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
  console.log(`Written: ${outputPath}`);

  // Step 4: Update index
  let index: ContentIndex;
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  } else {
    index = { dates: [], latest: "" };
  }

  if (!index.dates.includes(dateStr)) {
    index.dates.unshift(dateStr);
    index.dates.sort((a, b) => b.localeCompare(a)); // newest first
  }
  index.latest = index.dates[0];

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`Updated index: latest = ${index.latest}`);

  console.log("Done!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
