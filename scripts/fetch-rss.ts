import Parser from "rss-parser";
import { RSS_SOURCES, type RSSSource } from "./rss-sources";

export interface RawFeedItem {
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
  sourceName: string;
  sourceCategory?: string;
  sourceImageUrl?: string;
}

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-News-System/1.0 (RSS Aggregator)",
  },
  customFields: {
    item: [
      ["media:content", "media:content", { keepArray: false }],
      ["media:thumbnail", "media:thumbnail", { keepArray: false }],
    ],
  },
});

/**
 * Extract the best available image URL from an RSS item.
 * Priority: media:content → media:thumbnail → enclosure (if image type)
 */
function extractImageUrl(item: any): string | undefined {
  // media:content (used by TechCrunch, The Verge, VentureBeat)
  const mediaContent =
    item["media:content"]?.["$"]?.url || item["media:content"]?.url;
  if (mediaContent && mediaContent.startsWith("http")) return mediaContent;

  // media:thumbnail
  const mediaThumbnail =
    item["media:thumbnail"]?.["$"]?.url || item["media:thumbnail"]?.url;
  if (mediaThumbnail && mediaThumbnail.startsWith("http")) return mediaThumbnail;

  // Standard RSS 2.0 enclosure (only if it's an image)
  const enclosure = item.enclosure?.url;
  if (enclosure && /\.(jpg|jpeg|png|webp|gif)/i.test(enclosure))
    return enclosure;

  return undefined;
}

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
        sourceImageUrl: extractImageUrl(item),
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

  const withImages = items.filter((i) => i.sourceImageUrl).length;
  console.log(
    `Fetched ${items.length} unique items from ${RSS_SOURCES.length} sources (${withImages} with source images)`
  );
  return items;
}
