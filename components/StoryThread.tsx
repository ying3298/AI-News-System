import Link from "next/link";
import type { RelatedStory } from "@/lib/types";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import styles from "./StoryThread.module.css";

interface Props {
  relatedStories: RelatedStory[];
}

function formatThreadDate(dateStr: string): string {
  try {
    const d = new Date(dateStr + "T12:00:00Z");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

export default function StoryThread({ relatedStories }: Props) {
  if (!relatedStories || relatedStories.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        <svg
          className={styles.threadIcon}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M3 4h10M3 8h7M3 12h10" />
        </svg>
        Story Thread
      </h2>
      <div className={styles.list}>
        {relatedStories.map((related) => {
          const sectionLabel =
            SECTION_META[related.section as SectionSlug]?.label ?? related.section;

          return (
            <Link
              key={`${related.date}-${related.id}`}
              href={`/story/${related.id}/`}
              className={styles.threadItem}
            >
              <span className={styles.dot} />
              <div className={styles.threadContent}>
                <span className={styles.threadTitle}>{related.title}</span>
                <div className={styles.threadMeta}>
                  <span className={styles.metaText}>
                    {formatThreadDate(related.date)}
                  </span>
                  <span className={styles.sep}>/</span>
                  <span className={styles.metaText}>{sectionLabel}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
