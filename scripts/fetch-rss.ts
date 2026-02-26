import Parser from "rss-parser";
import { RSS_SOURCES, type RSSSource } from "./rss-sources";

export interface RawFeedItem {
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
  sourceName: string;
  sourceCategory?: string;
}

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-News-System/1.0 (RSS Aggregator)",
  },
});

async function fetchSingleFeed(
  source: RSSSource
): Promise<RawFeedItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    return (feed.items || [])
      .filter((item) => {
        if (!item.pubDate) return true; // include if no date
        const itemDate = new Date(item.pubDate).getTime();
        return itemDate >= oneDayAgo;
      })
      .slice(0, 10) // max 10 per source
      .map((item) => ({
        title: item.title || "Untitled",
        link: item.link || "",
        contentSnippet: (item.contentSnippet || item.content || "").slice(
          0,
          500
        ),
        pubDate: item.pubDate || new Date().toISOString(),
        sourceName: source.name,
        sourceCategory: source.category,
      }));
  } catch (error) {
    console.warn(`Failed to fetch ${source.name}: ${error}`);
    return [];
  }
}

export async function fetchAllFeeds(): Promise<RawFeedItem[]> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map((source) => fetchSingleFeed(source))
  );

  const items: RawFeedItem[] = [];
  const seenUrls = new Set<string>();

  for (const result of results) {
    if (result.status === "fulfilled") {
      for (const item of result.value) {
        if (!seenUrls.has(item.link)) {
          seenUrls.add(item.link);
          items.push(item);
        }
      }
    }
  }

  console.log(
    `Fetched ${items.length} unique items from ${RSS_SOURCES.length} sources`
  );
  return items;
}
