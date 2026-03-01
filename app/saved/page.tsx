"use client";

import Link from "next/link";
import { useSavedStories } from "@/lib/useSavedStories";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import SaveButton from "@/components/SaveButton";
import styles from "./saved.module.css";

export default function SavedPage() {
  const { saved, hydrated } = useSavedStories();

  return (
    <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
      <h1 className={styles.heading}>Saved Stories</h1>
      <p className={styles.subtitle}>
        Your bookmarked stories, stored locally in your browser.
      </p>

      {!hydrated ? (
        <p className={styles.empty}>Loading…</p>
      ) : saved.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.empty}>No saved stories yet.</p>
          <p className={styles.emptyHint}>
            Tap the bookmark icon on any story to save it for later.
          </p>
          <Link href="/" className="link-arrow" style={{ marginTop: "var(--space-md)", display: "inline-flex" }}>
            Browse the feed &rarr;
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {saved.map((story) => {
            const sectionLabel =
              SECTION_META[story.section as SectionSlug]?.label ?? story.section;

            return (
              <div key={story.id} className={styles.item}>
                {story.imageUrl && (
                  <Link href={`/story/${story.id}/`} className={styles.imageLink}>
                    <img
                      src={story.imageUrl}
                      alt=""
                      className={styles.image}
                      loading="lazy"
                    />
                  </Link>
                )}
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className="story-id">{story.id}</span>
                    <span className={styles.sep}>/</span>
                    <span className={styles.metaText}>{sectionLabel}</span>
                    <span className={styles.sep}>/</span>
                    <span className={styles.metaText}>{story.sourceName}</span>
                  </div>
                  <Link href={`/story/${story.id}/`} className={styles.title}>
                    {story.title}
                  </Link>
                  <p className={styles.summary}>{story.summary}</p>
                </div>
                <SaveButton story={story} size="md" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
