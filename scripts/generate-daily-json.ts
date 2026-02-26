import fs from "fs";
import path from "path";
import { fetchAllFeeds } from "./fetch-rss";
import { curateWithClaude } from "./curate-with-claude";
import type { ContentIndex } from "../lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getTodayDateStr(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

async function main() {
  const dateStr = process.argv[2] || getTodayDateStr();
  const outputPath = path.join(CONTENT_DIR, `${dateStr}.json`);
  const indexPath = path.join(CONTENT_DIR, "index.json");

  // Check if content already exists for this date
  if (fs.existsSync(outputPath)) {
    console.log(`Content for ${dateStr} already exists, skipping.`);
    process.exit(0);
  }

  console.log(`Generating content for ${dateStr}...`);

  // Step 1: Fetch RSS feeds
  console.log("Fetching RSS feeds...");
  const rawItems = await fetchAllFeeds();

  if (rawItems.length === 0) {
    console.error("No feed items found. Aborting.");
    process.exit(1);
  }

  // Step 2: Curate with Claude
  console.log("Curating with Claude...");
  const content = await curateWithClaude(rawItems, dateStr);

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
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
