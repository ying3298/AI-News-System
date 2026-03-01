/**
 * Centralized image pipeline configuration.
 * Edit these values to tune image generation quality, dimensions, and behavior.
 */

export const IMAGE_CONFIG = {
  /** Gemini model for AI image generation (Nano Banana Pro) */
  model: "gemini-3-pro-image-preview",

  /** Output format */
  format: "webp" as const,

  /** WebP quality (1–100, higher = better quality, larger file) */
  quality: 85,

  /** Hero image — headline banner at top of page */
  hero: { width: 1600, height: 900, aspectRatio: "16:9" },

  /** Summary banner — "Today in simple words" section */
  summary: { width: 1200, height: 400, aspectRatio: "3:1" },

  /** Card image — story cards in the feed grid */
  card: { width: 800, height: 450, aspectRatio: "16:9" },

  /** Max parallel Gemini requests (stay under 300 RPM) */
  batchConcurrency: 5,

  /** Delay between batches in ms */
  batchDelayMs: 1000,
};

/**
 * Upgrade RSS image URLs to higher-resolution versions where possible.
 * Some feeds (e.g. The Guardian) provide tiny thumbnails — this swaps them
 * for larger versions using the same CDN parameters.
 */
export function upgradeImageUrl(url: string): string {
  // Guardian: force width=1200 regardless of original size
  if (url.includes("i.guim.co.uk")) {
    return url.replace(/width=\d+/, "width=1200");
  }

  // Future CDN (Creative Bloq, TechRadar, etc.): request 1200px wide
  if (url.includes("cdn.mos.cms.futurecdn.net") && /-\d+-80\./.test(url)) {
    return url.replace(/-\d+-80\./, "-1200-80.");
  }

  return url;
}
