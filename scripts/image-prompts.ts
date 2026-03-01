import type { SectionSlug } from "../lib/types";

// ─── Visual Lexicon: Artist-Referenced Style Categories ──────────────
// Each category maps to specific artist references, visual motifs, and moods.
// The system selects the best category based on the story's section + content.

interface StyleCategory {
  id: string;
  vibe: string;
  artists: string;
  motifs: string;
  medium: string;
}

const STYLE_CATEGORIES: Record<string, StyleCategory> = {
  // Category A: Modern Condition & Societal Critique
  modern_condition: {
    id: "A",
    vibe: "Anxious, isolated, absurd, critical of modern work/life, hyper-consumerist",
    artists: "In the surreal, mundane-anxiety style of Tetsuya Ishida and Pawel Kuczynski, with the quiet isolation of Edward Hopper",
    motifs: "Humans merging with objects or furniture, mundane settings with one deeply unsettling element, faces obscured by media, scale distortion (giant structures dwarfing domestic spaces)",
    medium: "Oil painting or conceptual illustration",
  },
  // Category B: Techno-Dystopia & Cyber-Satire
  techno_dystopia: {
    id: "B",
    vibe: "Overwhelming, futuristic, grotesque, monumental, hyper-detailed, satirical",
    artists: "Hyper-realistic dystopian 3D art in the style of Beeple (Mike Winkelmann), with the rural-meets-machine eeriness of Simon Stålenhag",
    motifs: "Towering structures, massive screens, mundane suburban life juxtaposed with massive sci-fi machinery, glowing neon contrasting with dirty realism, pop-culture icons in decay",
    medium: "Cinematic 3D render with photorealistic textures",
  },
  // Category C: Psychological Surrealism
  psychological: {
    id: "C",
    vibe: "Quiet, absurd, deeply internal, dream logic, metaphorical",
    artists: "In the impossible-yet-calm surrealism of René Magritte and Rob Gonsalves, with the melting logic of Salvador Dalí",
    motifs: "Faces submerged in unexpected vessels, impossible geometry, isolated figures in vast empty landscapes, clouds and skies trapped inside rooms or silhouettes",
    medium: "Surrealist oil painting or matte painting",
  },
  // Category D: Macro/Micro Environmental Metaphors
  environmental: {
    id: "D",
    vibe: "Cosmic, ecological, high contrast, wondrous but alarming",
    artists: "Pop-surrealism in the style of Jacek Yerka and Vladimir Kush, with the photographic trickery of Erik Johansson",
    motifs: "Objects peeling away to reveal ecosystems, teardrops containing entire landscapes, eyes reflecting galaxies, natural elements behaving unnaturally",
    medium: "Pop-surrealism illustration or photo-manipulation",
  },
  // Category E: Ethereal, Historical & Nostalgic
  nostalgic: {
    id: "E",
    vibe: "Dreamy, soft-focus, melancholic, vintage, stylistically bound",
    artists: "Taisho-era delicacy of Yumeji Takehisa, the fairy-tale intricacy of Arthur Rackham, 1970s soft-focus cinema aesthetic",
    motifs: "Flat graphic coloring, delicate line-work, soft glowing natural light, vintage attire as metaphor, eerie calmness, pale complexions",
    medium: "Vintage-style illustration or soft-focus conceptual photography",
  },
  // Category F: Visceral & Conceptual Photography
  visceral: {
    id: "F",
    vibe: "Gritty, intimate, raw, cinematic, psychological",
    artists: "Cinematic photography in the unsettling suburban style of Gregory Crewdson, with the sequential narrative of Duane Michals",
    motifs: "Double exposures, reflections on glass masking faces, motion blur, harsh cinematic lighting, raw emotional micro-expressions",
    medium: "Conceptual photography or cinematic still",
  },
};

// Map each news section to its primary + fallback style category
const SECTION_STYLE_MAP: Record<SectionSlug, { primary: string; fallback: string }> = {
  tools:        { primary: "techno_dystopia", fallback: "modern_condition" },
  creative:     { primary: "nostalgic",       fallback: "psychological" },
  research:     { primary: "psychological",   fallback: "environmental" },
  applications: { primary: "modern_condition", fallback: "visceral" },
  business:     { primary: "modern_condition", fallback: "techno_dystopia" },
  policy:       { primary: "visceral",        fallback: "modern_condition" },
  concerns:     { primary: "techno_dystopia", fallback: "psychological" },
  culture:      { primary: "nostalgic",       fallback: "modern_condition" },
};

// Section-specific mood and color direction
interface SectionMood {
  mood: string;
  palette: string;
  lighting: string;
}

const SECTION_MOODS: Record<SectionSlug, SectionMood> = {
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

// ─── Anti-Patterns ───────────────────────────────────────────────────

const AVOID_RULES = `
AVOID these AI-slop patterns:
- NO floating geometric shapes with no narrative purpose
- NO oversaturated neon rainbow gradients
- NO perfect symmetry
- NO generic "person gesturing at glowing orb" compositions
- NO dreamy ethereal glow-from-within lighting
- NO plastic/waxy skin textures
- NO lens flare or unmotivated volumetric beams
- NO text, words, letters, logos, or UI wireframes
- NO literal depictions of headlines (e.g., red arrow going down for "market crash")
`.trim();

// ─── Helper: People Block ────────────────────────────────────────────

function buildPeopleBlock(people: string[]): string {
  if (!people || people.length === 0) return "";
  const descriptions = people
    .map(
      (name) =>
        `- ${name}: Render as a recognizable stylized figure resembling ${name}. Use their known public appearance as reference.`
    )
    .join("\n");
  return `
CHARACTERS IN THIS STORY:
${descriptions}

Include these figures as characters in the scene. Their likeness should be recognizable at a glance — like an editorial cartoon. Stylized and slightly exaggerated, not photorealistic. They should be DOING something that tells the story, not just standing.`;
}

// ─── Prompt Builders ─────────────────────────────────────────────────

/**
 * Build a card-sized editorial illustration prompt.
 * Uses the Visual Lexicon to select artistic style based on story content.
 */
export function buildCardPrompt(
  section: SectionSlug,
  title: string,
  summary: string,
  keyTakeaway: string,
  whyItMatters: string,
  people: string[],
): string {
  const styleMap = SECTION_STYLE_MAP[section];
  const style = STYLE_CATEGORIES[styleMap.primary];
  const sectionMood = SECTION_MOODS[section];
  const peopleBlock = buildPeopleBlock(people);

  return `Create a single editorial illustration for this AI news story.

HEADLINE: "${title}"
THE REAL STORY: ${summary}
KEY INSIGHT: ${keyTakeaway}
WHY IT MATTERS: ${whyItMatters}
${peopleBlock}
STEP 1 — DEVELOP A METAPHOR: Do NOT depict the headline literally. Instead, find a powerful visual metaphor. If the story is about market collapse, don't draw a red arrow — draw a figure dissolving into sand inside a giant hourglass. If the story is about surveillance, don't draw an eye icon — draw a person whose reflection in a mirror shows someone else watching.

STEP 2 — RENDER IT:
MEDIUM: ${style.medium}
STYLE: ${style.artists}
VISUAL MOTIFS: ${style.motifs}
VIBE: ${style.vibe}

MOOD: ${sectionMood.mood}
COLOR: ${sectionMood.palette}
LIGHTING: ${sectionMood.lighting}

${AVOID_RULES}

COMPOSITION: 16:9 landscape. One clear focal point that IS the metaphor. ${people.length > 0 ? "Feature the named characters prominently in the scene, acting out the metaphor." : "Stylized human figures for scale if the metaphor calls for it."} Asymmetric framing. Rich atmospheric depth. Film-grain texture throughout.`;
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
  people: string[],
): string {
  const styleMap = SECTION_STYLE_MAP[section];
  const style = STYLE_CATEGORIES[styleMap.primary];
  const sectionMood = SECTION_MOODS[section];
  const peopleBlock = buildPeopleBlock(people);

  return `Create a bold, cinematic editorial illustration for today's biggest AI news story. This must be magazine-cover quality — The New Yorker, The Atlantic, Wired level.

HEADLINE: "${title}"
THE REAL STORY: ${summary}
KEY INSIGHT: ${keyTakeaway}
WHY IT MATTERS: ${whyItMatters}
${peopleBlock}
STEP 1 — DEVELOP A METAPHOR: This is the lead story. The metaphor must be unforgettable. Do NOT depict the headline literally. Find the most visceral, instantly readable visual metaphor that captures the story's true significance. The viewer should understand the stakes before reading a word.

STEP 2 — RENDER IT AT MONUMENTAL SCALE:
MEDIUM: ${style.medium}
STYLE: ${style.artists}
VISUAL MOTIFS: ${style.motifs}
VIBE: ${style.vibe} — amplified to maximum dramatic impact.

MOOD: ${sectionMood.mood} — this is the biggest story today.
COLOR: ${sectionMood.palette} — richer, more saturated, cinematic.
LIGHTING: ${sectionMood.lighting} — more dramatic, higher contrast.

${AVOID_RULES}

COMPOSITION: Wide 16:9 landscape. Dramatic perspective — low angle looking up, or vast environmental scale. ${people.length > 0 ? "Feature the named characters at monumental scale, dominating the frame." : "Monumental subject dominating the frame."} Deep atmospheric depth. This should stop someone mid-scroll.`;
}

/**
 * Build a summary banner prompt.
 * The "daily briefing" banner — calm, editorial, purposeful.
 */
export function buildSummaryPrompt(): string {
  return `Create a wide editorial banner for a daily AI news digest.

The feeling: a curated morning briefing — someone organized, prepared, ready to share what matters.

MEDIUM: Conceptual photography or matte painting.
STYLE: The quiet, staged suburban intensity of Gregory Crewdson meets the orderly calm of a well-composed still life.

Scene: A solitary figure at a desk or wide window, surrounded by layered information — papers, screens, data visualizations that feel purposeful and organized. The atmosphere is calm but alert. Early dawn light. The world is waking up to today's news.

COLOR: Muted warm tones — soft amber, cream, steel blue accents. Restrained and professional.
LIGHTING: Pre-dawn or early morning — soft directional light from one side, warm but not golden-hour dramatic.

${AVOID_RULES}

COMPOSITION: Wide 3:1 landscape banner. Generous negative space on one side. The figure is small but purposeful. Layered depth. Film-grain texture throughout.`;
}

// Re-export for backward compatibility
export const SECTION_IMAGE_CONFIG = SECTION_MOODS;
