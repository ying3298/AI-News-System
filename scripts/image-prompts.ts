import type { SectionSlug } from "../lib/types";

interface SectionImageConfig {
  color: string;
  colorName: string;
  visualTheme: string;
  sceneSuggestion: string;
}

export const SECTION_IMAGE_CONFIG: Record<SectionSlug, SectionImageConfig> = {
  tools: {
    color: "#015ee8",
    colorName: "electric blue",
    visualTheme: "a workspace or studio scene — hands building, screens glowing, tools being used",
    sceneSuggestion: "Show someone using technology, a device being assembled, or a digital workspace coming alive",
  },
  research: {
    color: "#7c3aed",
    colorName: "deep violet",
    visualTheme: "a laboratory or discovery scene — a scientist at work, a microscope, a chalkboard full of ideas",
    sceneSuggestion: "Show a moment of discovery or investigation — peering into something, an experiment in progress",
  },
  business: {
    color: "#059669",
    colorName: "emerald green",
    visualTheme: "a deal, partnership, or growth scene — handshake, rising chart, bustling office, a startup launch",
    sceneSuggestion: "Show a moment of momentum — a team strategizing, money in motion, or doors opening to opportunity",
  },
  policy: {
    color: "#d97706",
    colorName: "warm amber",
    visualTheme: "a governance or decision-making scene — a gavel, a parliament, people debating around a table",
    sceneSuggestion: "Show authority and deliberation — a courtroom, a document being signed, or a crossroads",
  },
  concerns: {
    color: "#dc2626",
    colorName: "crimson red",
    visualTheme: "a cautionary or tension scene — a warning sign, a fork in the road, shadows falling across a landscape",
    sceneSuggestion: "Show something that makes people pause and think — a crack forming, a scale tipping, or a storm approaching",
  },
};

export function buildCardPrompt(
  section: SectionSlug,
  storyTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Editorial illustration for a news article titled: "${storyTitle}"

Style: Digital illustration with a warm, narrative feel — like a high-quality magazine or newspaper feature. NOT abstract geometric art. The image should tell a story and help the reader immediately understand what the article is about.

Scene idea: ${cfg.visualTheme}. ${cfg.sceneSuggestion}.

Important rules:
- The illustration should visually represent the specific story: "${storyTitle}"
- Use metaphorical or symbolic imagery that connects to the headline — viewers should look at this and get the gist of the story
- Warm, slightly muted color palette with ${cfg.colorName} tones
- Clean composition with a single clear focal point
- No text, no words, no letters, no UI elements
- No photorealism — this is a stylized editorial illustration
- No faces with realistic detail (silhouettes or simplified figures are OK)`;
}

export function buildHeroPrompt(
  section: SectionSlug,
  headlineTitle: string
): string {
  const cfg = SECTION_IMAGE_CONFIG[section];
  return `Hero editorial illustration for today's top AI news story: "${headlineTitle}"

Style: Bold, cinematic digital illustration — dramatic lighting, strong composition, storytelling quality. This is the lead image for a news publication, so it needs to be striking and immediately communicate the story.

Scene: Create a visual narrative that captures the essence of "${headlineTitle}". ${cfg.sceneSuggestion}.

Important rules:
- The illustration must visually convey what this story is about — a reader should glance at it and understand the topic
- Use dramatic, cinematic lighting with ${cfg.colorName} accent tones
- Wide composition (16:9 landscape) with clear visual hierarchy
- No text, no words, no letters, no logos, no UI elements
- No photorealism — stylized editorial illustration
- No detailed realistic faces (silhouettes, simplified figures, or scene-focused compositions are OK)
- This should feel like a premium magazine cover illustration`;
}

export function buildSummaryPrompt(): string {
  return `Cozy editorial illustration for a "daily news recap" section of an AI news site.

Style: Warm, inviting digital illustration — like the header of a friendly newsletter. Should feel approachable and calming, as if inviting the reader to sit down and catch up on today's news.

Scene: A cozy reading scene — perhaps a warm-lit desk with a newspaper and coffee, a person settling into a chair with a tablet, or a sunrise over a cityscape suggesting a fresh start to the day. The vibe is "let me catch you up on what happened today."

Important rules:
- Warm, soft color palette — navy blues, warm ambers, soft whites
- Gentle, inviting mood — not urgent or dramatic
- Wide composition (3:1 landscape ratio) suitable for a banner
- No text, no words, no letters, no UI elements
- No photorealism — stylized editorial illustration
- Simplified or silhouetted figures are OK`;
}
