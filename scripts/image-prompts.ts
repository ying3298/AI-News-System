import type { SectionSlug } from "../lib/types";

/**
 * Shared rendering style — HOW the image looks.
 * The WHAT (scene/subject) comes from each story's headline.
 */
const RENDER_STYLE = `
Rendering style (apply to whatever scene you create):
- Vibrant, luminous color gradients blending warm tones (gold, peach, coral, yellow) into cool tones (lavender, sky blue, violet, indigo) across the background
- Soft, glowing, diffused light — dreamy and radiant, light feels like it comes from within the scene
- Stylized, simplified human figures with smooth rounded forms — NOT realistic, slightly abstract, no detailed facial features, solid color fills
- Floating rounded rectangles, circles, and app-like shapes can appear as props or environmental details
- Subtle grainy paper texture across the entire image
- Colors blend and overlap with soft transparency and layering
- NO flat minimalism, NO sharp geometric edges, NO hard outlines, NO photorealism
- NO text, NO words, NO letters, NO logos, NO UI wireframes
`.trim();

interface SectionImageConfig {
  gradientDesc: string;
}

export const SECTION_IMAGE_CONFIG: Record<SectionSlug, SectionImageConfig> = {
  tools: {
    gradientDesc: "golden warmth fading into clear sky blue",
  },
  creative: {
    gradientDesc: "vibrant magenta fading into warm golden peach",
  },
  research: {
    gradientDesc: "coral pink melting into deep violet",
  },
  applications: {
    gradientDesc: "bright teal fading into warm coral pink",
  },
  business: {
    gradientDesc: "warm amber blending into rich emerald teal",
  },
  policy: {
    gradientDesc: "soft peach gold transitioning to deep indigo",
  },
  concerns: {
    gradientDesc: "warm orange fading into moody blue-gray",
  },
  culture: {
    gradientDesc: "soft lavender blending into warm apricot",
  },
};

export function buildCardPrompt(
  section: SectionSlug,
  storyTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Create an editorial illustration that tells the story of this AI news headline:
"${storyTitle}"

MOST IMPORTANT: The image must visually communicate what this story is about. A reader should look at this illustration and immediately understand the topic. Think about what objects, actions, or metaphors best represent "${storyTitle}" — then illustrate that scene.

Examples of good storytelling:
- A headline about a new AI chatbot → show a figure conversing with a glowing friendly shape
- A headline about AI regulation → show a figure placing guardrails or holding a scale
- A headline about a company launching a product → show hands unveiling or presenting a glowing object
- A headline about AI safety concerns → show a figure stepping carefully, or a cracking surface

${RENDER_STYLE}

Color palette: Background gradient flows from ${cfg.gradientDesc}.
Composition: 16:9 landscape. Clear single focal point that tells the story. 1-2 stylized figures acting out the narrative. Luminous gradient background with soft glow and subtle grainy texture.`;
}

export function buildHeroPrompt(
  section: SectionSlug,
  headlineTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Create a bold, cinematic editorial illustration for today's biggest AI news story:
"${headlineTitle}"

MOST IMPORTANT: This is the lead story of the day. The illustration must powerfully and clearly communicate what "${headlineTitle}" is about. A reader should glance at this and instantly grasp the story's significance. Choose the most vivid, specific visual metaphor you can for this particular headline — not a generic tech scene.

Think: What is the core action, conflict, or breakthrough in this headline? Show THAT moment.

${RENDER_STYLE}

Color palette: Bold, dramatic gradient from ${cfg.gradientDesc} — richer and more saturated, cinematic and immersive.
Composition: Wide 16:9 landscape. Dramatic scale — larger figures and bolder elements than a regular card. This should feel like a premium magazine cover spread. Subtle grainy texture throughout.`;
}

export function buildSummaryPrompt(): string {
  return `Create a gentle editorial illustration for a "daily news recap" banner on an AI news site.

The image should convey the feeling of "here's your daily catch-up" — someone settling in to read, a cozy moment of catching up on what happened today in the world of AI and technology.

Scene ideas: A figure sitting with a glowing tablet or newspaper, surrounded by small floating notification bubbles. Or a figure looking out over a landscape of softly glowing data points. The mood is warm, calm, and inviting — like a friendly morning newsletter.

${RENDER_STYLE}

Color palette: Soft, warm gradient from golden peach to gentle lavender blue — calmer and more muted than other images.
Composition: Wide 3:1 landscape banner. Generous negative space. Just one figure and a few gentle floating shapes. Soft glowing light from center. Subtle grainy paper texture.`;
}
