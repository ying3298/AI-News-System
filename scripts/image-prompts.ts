import type { SectionSlug } from "../lib/types";

/**
 * Shared rendering style — Editorial Surrealism.
 * Inspired by Beeple's approach: cinematic technique + surreal editorial metaphors.
 * Each image should function like a magazine cover — one dominant visual metaphor.
 */
const RENDER_STYLE = `
VISUAL STYLE — Editorial Surrealism:
- Cinematic 3D-rendered look with rich atmospheric depth — volumetric fog, haze, environmental lighting
- Muted, restrained color palette: 2-3 dominant hues per image, not rainbow gradients
- Strong directional lighting with motivated sources (screens, fire, energy, windows) — NOT generic glowing from nowhere
- Textured, imperfect surfaces: concrete, metal, worn fabric, weathered materials. Nothing looks pristine or mathematical
- Film-grain texture throughout — visible but subtle, like 35mm film stock
- Asymmetrical compositions — avoid centering everything perfectly
- Human figures are stylized silhouettes or simplified forms (NOT photorealistic faces) — used for SCALE, showing a small person against large forces
- Objects and environments should feel PHYSICAL and HEAVY — things have weight, cast shadows, occupy real space
- Deep atmospheric perspective: clear foreground, detailed midground, hazy background

AVOID these AI-slop patterns:
- NO floating geometric shapes with no narrative purpose
- NO oversaturated neon rainbow gradients
- NO perfect symmetry
- NO generic "person gesturing at glowing orb" compositions
- NO dreamy ethereal glow-from-within lighting
- NO plastic/waxy skin textures
- NO lens flare or unmotivated volumetric beams
- NO text, words, letters, logos, or UI wireframes
`.trim();

/**
 * Section configs: editorial mood, color direction, and lighting.
 * Color serves the MOOD of the story, not just the category.
 */
interface SectionImageConfig {
  mood: string;
  palette: string;
  lighting: string;
}

export const SECTION_IMAGE_CONFIG: Record<SectionSlug, SectionImageConfig> = {
  tools: {
    mood: "Bright, clear, forward-looking — the energy of something new arriving",
    palette: "Clean whites, warm amber accents, touches of sky blue",
    lighting: "Bright, even, product-showcase clarity — like morning light through a window",
  },
  creative: {
    mood: "Vivid, expressive, bold — the thrill of creation and artistic ambition",
    palette: "Rich magentas, deep golds, electric violet accents",
    lighting: "Dramatic sidelighting with warm color spill — gallery or studio atmosphere",
  },
  research: {
    mood: "Precise, cerebral, revelatory — the weight of discovery",
    palette: "Cool steel blues, muted violet, white highlights",
    lighting: "Clinical, cool, directional — like a laboratory or observatory",
  },
  applications: {
    mood: "Grounded, real-world, tangible — AI touching everyday life",
    palette: "Earth tones, teal, warm concrete grays",
    lighting: "Natural, environmental — outdoor daylight or interior practical light",
  },
  business: {
    mood: "Heavy, structural, consequential — forces shaping markets",
    palette: "Dark navy, amber, charcoal with gold accents",
    lighting: "Low-key, dramatic — boardroom shadows, towering structures lit from below",
  },
  policy: {
    mood: "Formal, weighty, institutional — power and governance",
    palette: "Deep indigo, marble white, muted red accents",
    lighting: "Institutional — high ceilings, filtered daylight, long shadows",
  },
  concerns: {
    mood: "Tense, foreboding, cautionary — something is at stake",
    palette: "Warm orange-to-gray, desaturated, muted reds",
    lighting: "Moody, obscured — haze, partial shadow, things partially hidden",
  },
  culture: {
    mood: "Warm, human, reflective — society grappling with change",
    palette: "Soft lavender, warm apricot, muted earth tones",
    lighting: "Golden hour, nostalgic — warm environmental light with long shadows",
  },
};

/**
 * Build a card-sized editorial illustration prompt.
 * Now takes full story context for story-specific visual journalism.
 */
export function buildCardPrompt(
  section: SectionSlug,
  title: string,
  summary: string,
  keyTakeaway: string,
  whyItMatters: string,
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Create a single editorial illustration for this AI news story.

HEADLINE: "${title}"
THE REAL STORY: ${summary}
KEY INSIGHT: ${keyTakeaway}
WHY IT MATTERS: ${whyItMatters}

YOUR TASK: Create a visual metaphor that communicates the KEY INSIGHT — not just the headline. Literalize the metaphor: if something is "collapsing," show it physically crumbling. If someone is "exposed," show the moment of exposure. If power is consolidating, show massive structures dwarfing individuals. Show the CONSEQUENCE, not the abstract concept.

Think like Beeple: one dominant subject, cinematic scale, editorial point of view. What is the single most powerful image that captures this story's significance?

${RENDER_STYLE}

MOOD: ${cfg.mood}
COLOR: ${cfg.palette}
LIGHTING: ${cfg.lighting}
COMPOSITION: 16:9 landscape. One clear focal point. A small human figure for scale if it strengthens the metaphor. Asymmetric framing. Deep atmospheric layers — clear foreground, detailed midground subject, hazy background.`;
}

/**
 * Build a hero-sized editorial illustration prompt.
 * More dramatic, magazine-cover scale.
 */
export function buildHeroPrompt(
  section: SectionSlug,
  title: string,
  summary: string,
  keyTakeaway: string,
  whyItMatters: string,
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Create a bold, cinematic editorial illustration for today's biggest AI news story.

HEADLINE: "${title}"
THE REAL STORY: ${summary}
KEY INSIGHT: ${keyTakeaway}
WHY IT MATTERS: ${whyItMatters}

YOUR TASK: This is the lead story of the day. The image must stop someone mid-scroll. Create the single most powerful visual metaphor for this story's significance. Literalize it: make the abstract physical, make the invisible visible, make the stakes tangible.

Think like Beeple at his most ambitious: monumental scale, dramatic perspective, unmistakable editorial point of view. The viewer should understand the story before reading a word.

${RENDER_STYLE}

MOOD: ${cfg.mood} — amplified. This is the biggest story today.
COLOR: ${cfg.palette} — richer, more saturated, cinematic.
LIGHTING: ${cfg.lighting} — more dramatic, more contrast.
COMPOSITION: Wide 16:9 landscape. Dramatic perspective — low angle looking up, or vast environmental scale. Monumental subject dominating the frame. A small human figure for scale if appropriate. Deep atmospheric depth. This should feel like a premium magazine cover spread.`;
}

/**
 * Build a summary banner prompt.
 * The "daily briefing" banner — calm, editorial, purposeful.
 */
export function buildSummaryPrompt(): string {
  return `Create a wide editorial banner for a daily AI news digest.

The feeling: a curated morning briefing — someone organized, prepared, ready to share what matters. NOT dreamy or whimsical. Clear-eyed and purposeful.

Scene: A solitary figure at a desk or wide window, surrounded by layered information — papers, screens, data visualizations that feel purposeful and organized, not random. The atmosphere is calm but alert. Early dawn light. The world is waking up to today's news.

${RENDER_STYLE}

COLOR: Muted warm tones — soft amber, cream, steel blue accents. Restrained and professional.
LIGHTING: Pre-dawn or early morning — soft directional light from one side, warm but not golden-hour dramatic.
COMPOSITION: Wide 3:1 landscape banner. Generous negative space on one side. The figure is small but purposeful. Layered depth. Film-grain texture throughout.`;
}
