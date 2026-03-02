/**
 * Centralized image pipeline configuration.
 * Edit these values to tune image generation quality, dimensions, and behavior.
 */

export const IMAGE_CONFIG = {
  /** Gemini image models — tries in order until one works */
  models: [
    "gemini-3-pro-image-preview",      // Nano Banana Pro (preferred)
    "nano-banana-pro-preview",          // Nano Banana Pro (alternate ID)
    "gemini-2.5-flash-image",           // Nano Banana Flash (fallback)
  ],

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

  /** Max parallel Gemini requests (Gemini quota: 20 RPM) */
  batchConcurrency: 4,

  /** Delay between batches in ms (15s × 4 = ~16 RPM, safely under 20 RPM limit) */
  batchDelayMs: 15000,
};

// All images are now AI-generated via Gemini — no RSS source image handling needed.
