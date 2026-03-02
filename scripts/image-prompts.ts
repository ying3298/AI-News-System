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
  /** Camera body, lens, film stock, focal length — concrete equipment that anchors the rendering */
  gear: string;
  /** Hard negatives specific to this category — tells the model what this is NOT */
  negatives: string;
}

const STYLE_CATEGORIES: Record<string, StyleCategory> = {
  // Category A: Modern Condition & Societal Critique
  modern_condition: {
    id: "A",
    vibe: "Anxious, isolated, absurd, critical of modern work/life, hyper-consumerist",
    artists: "In the surreal, mundane-anxiety style of Tetsuya Ishida and Pawel Kuczynski, with the quiet isolation of Edward Hopper, the geometric chiaroscuro of Fan Ho, and the claustrophobic density of Michael Wolf",
    motifs: "Humans merging with objects or furniture, mundane settings with one deeply unsettling element, faces obscured by media, scale distortion (giant structures dwarfing domestic spaces), a single silhouetted figure walking through a diagonal shaft of hard light between massive dark walls, an endless grid of identical windows filling the frame",
    medium: "Oil painting, conceptual illustration, or high-contrast film photography",
    gear: "Shot on Hasselblad 500CM with 80mm f/2.8 Planar, Kodak Portra 400 film, medium format depth. 50mm normal perspective for domestic scenes, 28mm wide-angle for architectural scale.",
    negatives: "",
  },
  // Category B: Techno-Dystopia & Cyber-Satire
  techno_dystopia: {
    id: "B",
    vibe: "Overwhelming, futuristic, grotesque, monumental, hyper-detailed, satirical",
    artists: "Hyper-realistic dystopian 3D art in the style of Beeple (Mike Winkelmann), with the rural-meets-machine eeriness of Simon Stålenhag, the monumental capitalism of Andreas Gursky, and the motion-blurred urban abstraction of Ernst Haas",
    motifs: "Towering structures, massive screens, mundane suburban life juxtaposed with massive sci-fi machinery, glowing neon contrasting with dirty realism, pop-culture icons in decay, god's-eye elevated perspectives showing thousands of identical elements stretching to the horizon, motion-blurred figures streaking through warm amber city light",
    medium: "Cinematic 3D render, monumental photography, or painterly color abstraction",
    gear: "Shot on ARRI Alexa 65 or large-format 4x5 view camera. 14mm ultra-wide for monumental perspectives, 24mm for environmental scale. Kodak Vision3 500T cinema film stock for warm tungsten tones.",
    negatives: "",
  },
  // Category C: Psychological Surrealism
  psychological: {
    id: "C",
    vibe: "Quiet, absurd, deeply internal, dream logic, metaphorical, meditative",
    artists: "In the impossible-yet-calm surrealism of René Magritte and Rob Gonsalves, with the melting logic of Salvador Dalí, the avant-garde bodily distortion of Eikoh Hosoe, and the meditative void of Hiroshi Sugimoto",
    motifs: "Faces submerged in unexpected vessels, impossible geometry, isolated figures in vast empty landscapes, clouds and skies trapped inside rooms or silhouettes, contorted human figures in extreme high-contrast B&W against empty rural landscapes, a frame bisected by a single razor-thin horizon line — absolute stillness",
    medium: "Surrealist oil painting, matte painting, or minimal long-exposure photography",
    gear: "Shot on large-format 8x10 view camera, 210mm lens, f/64 for infinite sharpness. Fuji Velvia 50 slide film for hyper-saturated color and razor-fine grain. Long exposures of 30+ seconds for surreal motion.",
    negatives: "",
  },
  // Category D: Macro/Micro Environmental Metaphors
  environmental: {
    id: "D",
    vibe: "Cosmic, ecological, high contrast, wondrous but alarming",
    artists: "Pop-surrealism in the style of Jacek Yerka and Vladimir Kush, with the photographic trickery of Erik Johansson, the atmospheric woodblock landscapes of Hasui Kawase, and the epic documentary scale of Sebastiao Salgado",
    motifs: "Objects peeling away to reveal ecosystems, teardrops containing entire landscapes, eyes reflecting galaxies, natural elements behaving unnaturally, layered flat color planes of deep blue and warm amber with fine linework defining trees and water, vast landscapes with lone human figures providing scale against overwhelming geological forms",
    medium: "Pop-surrealism illustration, photo-manipulation, or shin-hanga woodblock style",
    gear: "Shot on Mamiya RZ67, 110mm f/2.8 lens, Kodak Ektar 100 film for vivid saturated color and fine grain. 50mm wide for landscape scale. Woodblock prints use traditional Japanese pigments on mulberry paper.",
    negatives: "",
  },
  // Category E: Ethereal, Historical & Nostalgic
  nostalgic: {
    id: "E",
    vibe: "Dreamy, soft-focus, melancholic, vintage, stylistically bound, intimate",
    artists: "Taisho-era delicacy of Yumeji Takehisa, the fairy-tale intricacy of Arthur Rackham, the luminous everyday poetics of Rinko Kawauchi, and the painterly rain-streaked warmth of Saul Leiter",
    motifs: "Flat graphic coloring, delicate line-work, soft glowing natural light, vintage attire as metaphor, eerie calmness, pale complexions, softly overexposed close-ups bathed in pale radiant light with dreamy shallow focus, street scenes viewed through rain-streaked windows with warm blurred foreground elements",
    medium: "Vintage-style illustration, soft-focus film photography, or Art Nouveau ink",
    gear: "Shot on Contax T2, 38mm f/2.8 Sonnar lens, Kodak Portra 160 film for soft pastel tones and creamy skin. Shallow depth of field at f/2.8. Slight overexposure for luminous highlights. Or: dip pen and Japanese sumi ink on cream Arches paper.",
    negatives: "",
  },
  // Category F: Visceral & Conceptual Photography
  visceral: {
    id: "F",
    vibe: "Gritty, intimate, raw, cinematic, psychological, confrontational",
    artists: "Cinematic photography in the unsettling suburban style of Gregory Crewdson, with the sequential narrative of Duane Michals, the raw street grain of Daido Moriyama, and the glowing suburban noir of Todd Hido",
    motifs: "Double exposures, reflections on glass masking faces, motion blur, harsh cinematic lighting, raw emotional micro-expressions, extreme high-contrast B&W with heavy grain and blown-out whites, solitary suburban houses with warm light glowing from a single window against deep darkness",
    medium: "Conceptual photography, cinematic still, or high-grain B&W street photography",
    gear: "Shot on Canon AE-1 with 50mm f/1.4, Ilford HP5 Plus 400 pushed to 1600 for heavy grain and contrast. Or: Mamiya 7 medium format with 80mm lens, Kodak Tri-X 400 for rich tonal range. Available darkness, practical light sources only.",
    negatives: "",
  },
  // Category G: Analog Documentary & Social Realism
  analog_documentary: {
    id: "G",
    vibe: "Raw, grainy, humanist, street-level truth, wabi-sabi imperfection, social realism, confrontational",
    artists: "The grainy confrontational street photography of Daido Moriyama and William Klein, with the epic humanist documentary scale of Sebastiao Salgado and the postwar expressionism of Shomei Tomatsu",
    motifs: "Extreme film grain, high-contrast B&W, industrial smokestacks, lone figures shot from above, intimate close-up portraits with visible pores and weathering, motion blur, contact-sheet triptych aesthetic, objects rendered as symbols against stark backgrounds",
    medium: "High-contrast black-and-white documentary photography with visible grain and darkroom process",
    gear: "Shot on Leica M6 with 35mm Summicron f/2, Kodak Tri-X 400 pushed two stops to 1600 for extreme grain and crushed blacks. Hand-printed on fiber-based silver gelatin paper with visible dodging and burning. Selenium-toned for cool-purple shadow tone. 35mm focal length for street-level immersion.",
    negatives: "This is NOT a 3D render. NOT digital art. NOT an illustration. NOT CGI. This must look like a real black-and-white photograph shot on high-ISO film — with real grain, real imperfection, real darkroom printing artifacts. No color. No clean digital surfaces. No polished rendering.",
  },
  // Category H: Japanese Minimalism & Contemplative Zen
  japanese_minimalism: {
    id: "H",
    vibe: "Contemplative, precise, wabi-sabi, negative space as subject, material texture, Zen stillness",
    artists: "The visual haiku of Masao Yamamoto, the luminous everyday of Rinko Kawauchi, with the modernist geometry of Ikko Tanaka and the atmospheric woodblock prints of Hasui Kawase",
    motifs: "Single botanical element against void, geometric orb or circle motif, pen-and-ink linework on cream paper, sumi-e brushstroke quality, deliberate imperfection, aged paper texture, bonsai and natural forms meeting clean geometry, a single small subject isolated in vast negative space",
    medium: "Ink illustration on textured cream paper, or minimal toned photograph printed on washi paper",
    gear: "Sumi-e ink and horsehair brush on handmade kozo washi paper, visible fiber texture in the paper. Or: Mamiya 7 with 80mm lens, Ilford FP4 Plus 125 contact-printed on warm-tone fiber paper, selenium toned. Single natural light source.",
    negatives: "This is NOT a 3D render. NOT digital art. NOT CGI. NOT a busy scene. This must look like physical ink on real paper — you should see the paper texture, the brushstroke, the imperfection of a hand-drawn line. At least 50% of the image must be empty negative space. Maximum 2 elements in the composition. No complex scenes. No digital polish.",
  },
  // Category I: Print Materiality & Typographic Craft
  print_materiality: {
    id: "I",
    vibe: "Tactile, retro-modern, process-visible, limited palette, craft-forward, typographic, authoritative",
    artists: "The psychedelic poster collage of Tadanori Yokoo, the modernist Olympic geometry of Yusaku Kamekura, and the social pictograms of Gerd Arntz",
    motifs: "Halftone dot patterns, screen-print color separation, visible registration marks, bold typography as image, limited 2-3 color palette, overprinted layers, risograph texture, woodcut flatness, rising-sun rays with collaged photographic fragments, stark pictographic figures in repeating rows",
    medium: "Risograph print or screen-print poster with visible halftone dots and ink texture on paper",
    gear: "2-color risograph print on cream French Paper Pop-Tone stock, 100 LPI halftone screen. Soy-based ink with slight misregistration between color layers (1-2mm offset). Or: hand-pulled screen-print with visible squeegee texture, printed on uncoated cotton stock.",
    negatives: "This is NOT a 3D render. NOT digital art. NOT CGI. NOT photorealistic. This must look like a physical printed poster — you should see halftone dots, ink layering, paper texture, and imperfect registration between color layers. Use ONLY 2-3 flat colors maximum. No gradients. No photorealism. No smooth digital surfaces.",
  },
};

// Map each news section to its primary + fallback style category
const SECTION_STYLE_MAP: Record<SectionSlug, { primary: string; fallback: string }> = {
  tools:        { primary: "techno_dystopia",      fallback: "print_materiality" },
  creative:     { primary: "nostalgic",            fallback: "japanese_minimalism" },
  research:     { primary: "japanese_minimalism",  fallback: "psychological" },
  applications: { primary: "modern_condition",     fallback: "analog_documentary" },
  business:     { primary: "print_materiality",    fallback: "modern_condition" },
  policy:       { primary: "analog_documentary",   fallback: "visceral" },
  concerns:     { primary: "visceral",             fallback: "analog_documentary" },
  culture:      { primary: "techno_dystopia",       fallback: "nostalgic" },
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
CRITICAL — ABSOLUTELY NO TEXT: The image must contain ZERO text, words, letters, numbers, logos, labels, signs, banners, headlines, captions, watermarks, or UI wireframes of any kind. Not even a single letter. This is the most important rule.

AVOID these AI-slop patterns:
- NO floating geometric shapes with no narrative purpose
- NO oversaturated neon rainbow gradients
- NO perfect symmetry
- NO generic "person gesturing at glowing orb" compositions
- NO dreamy ethereal glow-from-within lighting
- NO plastic/waxy skin textures
- NO lens flare or unmotivated volumetric beams
- NO literal depictions of headlines (e.g., red arrow going down for "market crash")
- NO clean, polished digital surfaces unless the medium specifically calls for it
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

  const negativesBlock = style.negatives ? `\nCRITICAL RENDERING CONSTRAINT:\n${style.negatives}\n` : "";

  return `MEDIUM — THIS IS THE MOST IMPORTANT INSTRUCTION: ${style.medium}
${negativesBlock}
Create a single editorial image for this AI news story.

HEADLINE: "${title}"
THE REAL STORY: ${summary}
KEY INSIGHT: ${keyTakeaway}
WHY IT MATTERS: ${whyItMatters}
${peopleBlock}
STEP 1 — DEVELOP A METAPHOR: Do NOT depict the headline literally. Instead, find a powerful visual metaphor. If the story is about market collapse, don't draw a red arrow — draw a figure dissolving into sand inside a giant hourglass. If the story is about surveillance, don't draw an eye icon — draw a person whose reflection in a mirror shows someone else watching.

STEP 2 — RENDER IT IN THIS EXACT MEDIUM (${style.medium}):
EQUIPMENT & PROCESS: ${style.gear}
STYLE: ${style.artists}
VISUAL MOTIFS: ${style.motifs}
VIBE: ${style.vibe}

MOOD: ${sectionMood.mood}
COLOR: ${sectionMood.palette}
LIGHTING: ${sectionMood.lighting}

${AVOID_RULES}

COMPOSITION: 16:9 landscape. One clear focal point that IS the metaphor. ${people.length > 0 ? "Feature the named characters prominently in the scene, acting out the metaphor." : "Stylized human figures for scale if the metaphor calls for it."} Asymmetric framing. Rich atmospheric depth. The rendering MUST match the specified medium and equipment — ${style.medium}.`;
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

  const negativesBlock = style.negatives ? `\nCRITICAL RENDERING CONSTRAINT:\n${style.negatives}\n` : "";

  return `MEDIUM — THIS IS THE MOST IMPORTANT INSTRUCTION: ${style.medium}
${negativesBlock}
Create a bold editorial image for today's biggest AI news story. This must be magazine-cover quality — The New Yorker, The Atlantic, Wired level.

HEADLINE: "${title}"
THE REAL STORY: ${summary}
KEY INSIGHT: ${keyTakeaway}
WHY IT MATTERS: ${whyItMatters}
${peopleBlock}
STEP 1 — DEVELOP A METAPHOR: This is the lead story. The metaphor must be unforgettable. Do NOT depict the headline literally. Find the most visceral, instantly readable visual metaphor that captures the story's true significance. The viewer should understand the stakes before reading a word.

STEP 2 — RENDER IT AT MONUMENTAL SCALE IN THIS EXACT MEDIUM (${style.medium}):
EQUIPMENT & PROCESS: ${style.gear}
STYLE: ${style.artists}
VISUAL MOTIFS: ${style.motifs}
VIBE: ${style.vibe} — amplified to maximum dramatic impact.

MOOD: ${sectionMood.mood} — this is the biggest story today.
COLOR: ${sectionMood.palette} — richer, more saturated, cinematic.
LIGHTING: ${sectionMood.lighting} — more dramatic, higher contrast.

${AVOID_RULES}

COMPOSITION: Wide 16:9 landscape. Dramatic perspective — low angle looking up, or vast environmental scale. ${people.length > 0 ? "Feature the named characters at monumental scale, dominating the frame." : "Monumental subject dominating the frame."} Deep atmospheric depth. The rendering MUST match the specified medium and equipment — ${style.medium}.`;
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
