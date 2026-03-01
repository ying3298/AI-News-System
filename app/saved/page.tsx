"use client";

import { useState } from "react";
import Link from "next/link";
import { useSavedStories } from "@/lib/useSavedStories";
import { useFollowedTopics } from "@/lib/useFollowedTopics";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import SaveButton from "@/components/SaveButton";
import styles from "./saved.module.css";

type Tab = "saved" | "topics";

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const { saved, hydrated: savedHydrated } = useSavedStories();
  const { followed, removeFollow, clearAll, hydrated: topicsHydrated } = useFollowedTopics();

  const hydrated = savedHydrated && topicsHydrated;

  return (
    <div className="page-container" style={{ paddingTop: "var(--space-xl)" }}>
      <h1 className={styles.heading}>Library</h1>
      <p className={styles.subtitle}>
        Your saved stories and followed topics, stored locally in your browser.
      </p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "saved" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved Stories
          {hydrated && saved.length > 0 && (
            <span className={styles.tabCount}>{saved.length}</span>
          )}
        </button>
        <button
          className={`${styles.tab} ${activeTab === "topics" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("topics")}
        >
          Followed Topics
          {hydrated && followed.length > 0 && (
            <span className={styles.tabCount}>{followed.length}</span>
          )}
        </button>
      </div>

      {!hydrated ? (
        <p className={styles.empty}>Loading…</p>
      ) : activeTab === "saved" ? (
        /* ---- SAVED STORIES TAB ---- */
        saved.length === 0 ? (
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
        )
      ) : (
        /* ---- FOLLOWED TOPICS TAB ---- */
        followed.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.empty}>No followed topics yet.</p>
            <p className={styles.emptyHint}>
              Tap any tag on a story to follow that topic. Followed stories get highlighted in the feed.
            </p>
            <Link href="/" className="link-arrow" style={{ marginTop: "var(--space-md)", display: "inline-flex" }}>
              Browse the feed &rarr;
            </Link>
          </div>
        ) : (
          <div className={styles.topicsSection}>
            <div className={styles.topicsHeader}>
              <span className={styles.topicsCount}>
                {followed.length} topic{followed.length !== 1 ? "s" : ""}
              </span>
              <button className={styles.clearAll} onClick={clearAll}>
                Clear all
              </button>
            </div>
            <div className={styles.topicsList}>
              {followed.map((tag) => (
                <button
                  key={tag}
                  className={styles.topicPill}
                  onClick={() => removeFollow(tag)}
                  title={`Unfollow "${tag}"`}
                >
                  {tag}
                  <svg
                    className={styles.removeIcon}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M3 9L9 3M3 3l6 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
