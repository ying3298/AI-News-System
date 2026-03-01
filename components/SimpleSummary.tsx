import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import styles from "./SimpleSummary.module.css";

interface Props {
  /** All stories from today's content, flattened */
  stories: NewsItem[];
}

/**
 * Prototype: personalized quick-scan card.
 * Hardcoded persona = designer who cares about creative tools & visual AI.
 * Filters real stories by preferred sections + tags, shows top 3-5.
 * TODO: replace PERSONA_SECTIONS / PERSONA_TAGS with onboarding prefs.
 */
const PERSONA_SECTIONS = ["tools", "creative"];
const PERSONA_TAGS = [
  "image-generation", "design", "creative", "video", "midjourney",
  "dall-e", "stable-diffusion", "figma", "adobe", "generative-art",
  "visual-ai", "consumer-adoption", "platform-strategy",
];

function pickForPersona(stories: NewsItem[], max: number): NewsItem[] {
  // Score each story by relevance to persona
  const scored = stories.map((s) => {
    let score = 0;
    if (PERSONA_SECTIONS.includes(s.section)) score += 3;
    const tags = s.normalizedTags || s.tags.map((t) => t.toLowerCase());
    for (const t of tags) {
      if (PERSONA_TAGS.includes(t)) score += 2;
    }
    return { story: s, score };
  });

  // Sort by score desc, then take top N (at least score > 0, fallback to first N)
  scored.sort((a, b) => b.score - a.score);
  const relevant = scored.filter((s) => s.score > 0);
  const picks = relevant.length >= 3 ? relevant : scored;
  return picks.slice(0, max).map((s) => s.story);
}

export default function SimpleSummary({ stories }: Props) {
  const picks = pickForPersona(stories, 5);

  if (picks.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Your quick scan</span>
          <span className={styles.count}>{picks.length} stories</span>
        </div>
        <div className={styles.items}>
          {picks.map((item) => (
            <Link key={item.id} href={`/story/${item.id}/`} className={styles.item}>
              <span className={styles.name}>{shortName(item)}</span>
              <span className={styles.note}>{item.summary}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Extract a short anchor name from the story title (first 2-3 meaningful words) */
function shortName(item: NewsItem): string {
  // Use first tag as a rough label if it's a known brand/product
  const title = item.title;
  // Try to extract the subject before the verb/action
  const colonIdx = title.indexOf(":");
  if (colonIdx > 0 && colonIdx < 25) return title.slice(0, colonIdx);
  // Otherwise take first 2-3 words up to ~20 chars
  const words = title.split(" ");
  let name = words[0];
  for (let i = 1; i < words.length && name.length < 18; i++) {
    name += " " + words[i];
  }
  return name;
}
