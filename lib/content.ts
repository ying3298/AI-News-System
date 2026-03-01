import fs from "fs";
import path from "path";
import type { DailyContent, ContentIndex, SectionSlug } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getContentIndex(): ContentIndex {
  const filePath = path.join(CONTENT_DIR, "index.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getDailyContent(date: string): DailyContent {
  const filePath = path.join(CONTENT_DIR, `${date}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  // Backfill new sections for older content files that only had 5 categories
  if (parsed.sections) {
    parsed.sections.creative = parsed.sections.creative || [];
    parsed.sections.applications = parsed.sections.applications || [];
    parsed.sections.culture = parsed.sections.culture || [];
  }
  // Normalize simpleSummary: wrap old string format as single-item array
  if (typeof parsed.simpleSummary === "string") {
    parsed.simpleSummary = [parsed.simpleSummary];
  }
  return parsed;
}

export function getLatestContent(): DailyContent {
  const index = getContentIndex();
  return getDailyContent(index.latest);
}

export function getAllDates(): string[] {
  const index = getContentIndex();
  return index.dates;
}

export function getSectionSlugs(): SectionSlug[] {
  return ["tools", "creative", "research", "applications", "business", "policy", "concerns", "culture"];
}

export function getAllStoryIds(): { id: string; date: string }[] {
  const index = getContentIndex();
  const result: { id: string; date: string }[] = [];
  for (const date of index.dates) {
    const content = getDailyContent(date);
    const allItems = Object.values(content.sections).flat();
    for (const item of allItems) {
      result.push({ id: item.id, date });
    }
  }
  return result;
}

export function getStoryById(
  storyId: string
): { item: import("./types").NewsItem; date: string; dateFormatted: string } | null {
  const index = getContentIndex();
  for (const date of index.dates) {
    const content = getDailyContent(date);
    const allItems = Object.values(content.sections).flat();
    const found = allItems.find((item) => item.id === storyId);
    if (found) {
      return { item: found, date: content.date, dateFormatted: content.dateFormatted };
    }
  }
  return null;
}
