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
  return JSON.parse(raw);
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
  return ["tools", "research", "business", "policy", "concerns"];
}
