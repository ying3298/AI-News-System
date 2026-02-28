import type { SectionSlug } from "../lib/types";

/**
 * Shared art direction — describes the target visual aesthetic.
 * Inspired by modern tech-editorial illustration: vibrant gradients,
 * glowing light, stylized figures, floating UI elements, dreamy mood.
 */
const ART_STYLE = `
Art style (MUST follow closely):
- Vibrant, luminous color gradients blending warm tones (gold, peach, coral, yellow) into cool tones (lavender, sky blue, violet, indigo) across the background
- Soft, glowing, diffused light — dreamy and radiant, as if light is coming from within the scene itself
- Stylized, simplified human figures with smooth rounded forms — NOT realistic, slightly abstract, no detailed facial features, solid color fills
- Floating rounded rectangles, circles, and app-like UI shapes drifting in the scene as visual metaphors for technology and digital life
- Subtle grainy paper texture across the entire image
- Colors blend and overlap with soft transparency and layering
- Everything feels warm, optimistic, modern — like a premium tech magazine cover
- NO flat minimalism, NO sharp geometric edges, NO hard outlines, NO photorealism, NO text, NO words, NO letters, NO logos
`.trim();

interface SectionImageConfig {
  gradientWarm: string;
  gradientCool: string;
  gradientDesc: string;
  sceneSuggestion: string;
}

export const SECTION_IMAGE_CONFIG: Record<SectionSlug, SectionImageConfig> = {
  tools: {
    gradientWarm: "golden yellow, warm peach",
    gradientCool: "sky blue, soft teal",
    gradientDesc: "golden warmth fading into clear sky blue",
    sceneSuggestion:
      "a person reaching toward or interacting with floating app screens and glowing tools, building or creating something digital",
  },
  research: {
    gradientWarm: "soft pink, coral",
    gradientCool: "deep violet, purple",
    gradientDesc: "coral pink melting into deep violet",
    sceneSuggestion:
      "a figure peering into or surrounded by glowing orbs of light — discovery, magnification, looking deeper into something mysterious",
  },
  business: {
    gradientWarm: "warm amber, golden orange",
    gradientCool: "emerald green, teal",
    gradientDesc: "warm amber blending into rich emerald teal",
    sceneSuggestion:
      "figures in motion — shaking hands, exchanging glowing objects, or standing before an expanding network of connected nodes",
  },
  policy: {
    gradientWarm: "peach, warm gold",
    gradientCool: "deep indigo, navy",
    gradientDesc: "soft peach gold transitioning to deep indigo",
    sceneSuggestion:
      "a figure standing at a crossroads or before a large balanced scale, deliberating — conveying authority, governance, or a pivotal decision",
  },
  concerns: {
    gradientWarm: "warm orange, salmon",
    gradientCool: "deep blue-gray, slate",
    gradientDesc: "warm orange fading into moody blue-gray",
    sceneSuggestion:
      "a figure pausing before a fractured or tilting floating element — something is off-balance, a moment of caution and reflection",
  },
};

export function buildCardPrompt(
  section: SectionSlug,
  storyTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Editorial illustration for a news card about: "${storyTitle}"

${ART_STYLE}

Color palette for this image: Background gradient flows from ${cfg.gradientDesc}. Use these as the dominant colors with soft overlapping transparent shapes.

Scene: ${cfg.sceneSuggestion}. The visual should help a reader instantly understand what "${storyTitle}" is about — use symbolic, metaphorical imagery connected to the headline.

Composition: 16:9 landscape. Include 1-2 simplified stylized human figures interacting with 2-3 floating rounded UI/tech elements. Luminous gradient background with soft glow. Subtle grainy texture over everything.`;
}

export function buildHeroPrompt(
  section: SectionSlug,
  headlineTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Hero editorial illustration for today's lead AI news story: "${headlineTitle}"

${ART_STYLE}

Color palette: Bold, dramatic gradient from ${cfg.gradientDesc} — richer and more saturated than usual, this is the hero image. Colors should feel cinematic and immersive.

Scene: ${cfg.sceneSuggestion}. This illustration must visually capture the essence of "${headlineTitle}" — a reader should glance at it and immediately feel the story's significance. Use larger, bolder floating elements and more dramatic lighting than a regular card image.

Composition: Wide 16:9 landscape. Dramatic scale — one or two large stylized figures with bold floating UI shapes around them. Luminous, glowing atmosphere. The image should feel like the opening spread of a premium tech magazine. Subtle grainy texture throughout.`;
}

export function buildSummaryPrompt(): string {
  return `Gentle editorial illustration for a "daily news recap" banner.

${ART_STYLE}

Color palette: Soft, warm gradient from golden peach to gentle lavender blue — calmer and more muted than the other images. This should feel cozy and inviting, not dramatic.

Scene: A simplified figure settling in to read or catch up — perhaps sitting with a glowing tablet, or surrounded by small floating notification bubbles and soft orbs of light. The mood is "let me catch you up on today" — warm, approachable, like a friendly morning newsletter.

Composition: Wide 3:1 landscape banner ratio. Generous negative space. Fewer elements than other images — just one figure and a few gentle floating shapes. Soft glowing light from the center. Subtle grainy paper texture throughout.`;
}
