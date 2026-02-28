import type { SectionSlug } from "../lib/types";

interface SectionImageConfig {
  color: string;
  colorName: string;
  styleHint: string;
  mood: string;
  metaphor: string;
  accentDesc: string;
}

export const SECTION_IMAGE_CONFIG: Record<SectionSlug, SectionImageConfig> = {
  tools: {
    color: "#015ee8",
    colorName: "electric blue",
    styleHint: "interlocking shapes suggesting assembly and construction",
    mood: "Productive, precise, builder energy",
    metaphor:
      "Building blocks clicking together, circuits forming, tools aligning",
    accentDesc: "light gray accents",
  },
  research: {
    color: "#7c3aed",
    colorName: "deep violet",
    styleHint: "layered circles and spirals suggesting discovery and depth",
    mood: "Contemplative, deep, intellectually exciting",
    metaphor:
      "Layers peeling back, concentric patterns revealing inner structure, magnification",
    accentDesc: "soft lavender accents",
  },
  business: {
    color: "#059669",
    colorName: "emerald green",
    styleHint: "ascending lines and expanding shapes suggesting growth",
    mood: "Confident, forward-moving, opportunity",
    metaphor: "Upward trajectories, expanding networks, nodes multiplying",
    accentDesc: "mint accents",
  },
  policy: {
    color: "#d97706",
    colorName: "warm amber",
    styleHint:
      "intersecting grids and boundary lines suggesting structure and governance",
    mood: "Measured, authoritative, deliberate",
    metaphor:
      "Frameworks being drawn, grids aligning, boundaries being established",
    accentDesc: "soft gold accents",
  },
  concerns: {
    color: "#dc2626",
    colorName: "crimson red",
    styleHint: "fractured shapes and disrupted patterns suggesting tension",
    mood: "Alert, thought-provoking, serious but not alarmist",
    metaphor: "Patterns breaking, signals diverging, cracks in structure",
    accentDesc: "dark gray accents",
  },
};

export function buildCardPrompt(
  section: SectionSlug,
  storyTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Minimal editorial illustration for a news publication.
Style: Abstract geometric composition — circles, arcs, flowing lines, dot clusters. ${cfg.styleHint}.
Color palette: White background with ${cfg.colorName} (${cfg.color}) as dominant accent, subtle gray (#f7f7f7) shapes for depth. ${cfg.accentDesc}.
Mood: ${cfg.mood} — calm, precise, slightly futuristic.
Subject hint: ${storyTitle}
Composition: Clean negative space, asymmetric balance, shapes suggest ${cfg.metaphor} without being literal.
No text, no words, no letters, no faces, no photorealism, no gradients. Flat color, sharp edges, print-quality.`;
}

export function buildHeroPrompt(
  section: SectionSlug,
  headlineTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Bold editorial illustration for the lead story of a news publication.
Style: Large-scale abstract geometric composition — confident, striking shapes.
Color palette: Deep navy (#1a1a2e) to dark blue (#0f3460) background with white and ${cfg.colorName} (${cfg.color}) shapes.
Mood: Impactful, definitive, this-is-the-story-of-the-day energy.
Subject hint: ${headlineTitle}
Composition: Dramatic scale contrast — one large dominant shape with smaller satellite elements.
No text, no words, no letters, no faces, no photorealism. Flat color, sharp edges, editorial quality.`;
}

export function buildSummaryPrompt(): string {
  return `Soft editorial illustration for a daily news summary section.
Style: Gentle abstract shapes — rounded circles, smooth curves, floating dots.
Color palette: Deep navy (#1a1a2e) background with soft white and muted blue (#4a90d9) shapes.
Mood: Approachable, warm, inviting — like a friendly overview.
Composition: Centered cluster of simple shapes, generous breathing room around edges.
No text, no words, no letters, no faces, no photorealism. Soft edges, subtle depth, calming.`;
}
