"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSavedStories, type SavedStory } from "@/lib/useSavedStories";
import { useFollowedTopics } from "@/lib/useFollowedTopics";
import { useLibraryPreferences, type GroupBy, type SortBy } from "@/lib/useLibraryPreferences";
import { SECTION_META, type SectionSlug } from "@/lib/types";
import SaveButton from "@/components/SaveButton";
import styles from "./saved.module.css";

type Tab = "saved" | "topics";

/** Group saved stories into labeled buckets */
function groupStories(
  stories: SavedStory[],
  groupBy: GroupBy,
  sortBy: SortBy
): { label: string; section?: SectionSlug; stories: SavedStory[] }[] {
  // Sort first
  const sorted = [...stories].sort((a, b) => {
    const dateA = new Date(a.savedAt).getTime();
    const dateB = new Date(b.savedAt).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (groupBy === "none") {
    return [{ label: "", stories: sorted }];
  }

  if (groupBy === "section") {
    const map = new Map<string, SavedStory[]>();
    for (const s of sorted) {
      const key = s.section || "other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    }
    return Array.from(map.entries()).map(([section, items]) => ({
      label: SECTION_META[section as SectionSlug]?.label ?? section,
      section: section as SectionSlug,
      stories: items,
    }));
  }

  // Group by date (week buckets)
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const buckets: { label: string; stories: SavedStory[] }[] = [
    { label: "This week", stories: [] },
    { label: "Last week", stories: [] },
    { label: "Older", stories: [] },
  ];
  for (const s of sorted) {
    const age = now - new Date(s.savedAt).getTime();
    if (age < oneWeek) buckets[0].stories.push(s);
    else if (age < oneWeek * 2) buckets[1].stories.push(s);
    else buckets[2].stories.push(s);
  }
  return buckets.filter((b) => b.stories.length > 0);
}

/** Section-colored dot */
const SECTION_COLORS: Record<string, string> = {
  tools: "#2b6cb0",
  creative: "#c026d3",
  research: "#6b46a3",
  applications: "#0d9488",
  business: "#2d7a4f",
  policy: "#b8860b",
  concerns: "#b53d2e",
  culture: "#7c3aed",
};

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const { saved, hydrated: savedHydrated } = useSavedStories();
  const { followed, removeFollow, clearAll, hydrated: topicsHydrated } = useFollowedTopics();
  const { groupBy, sortBy, setGroupBy, setSortBy, hydrated: prefsHydrated } = useLibraryPreferences();

  const hydrated = savedHydrated && topicsHydrated && prefsHydrated;

  const groups = useMemo(
    () => groupStories(saved, groupBy, sortBy),
    [saved, groupBy, sortBy]
  );

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
          <>
            {/* Controls */}
            <div className={styles.controls}>
              <label className={styles.controlLabel}>
                Group by
                <select
                  className={styles.controlSelect}
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                >
                  <option value="section">Category</option>
                  <option value="date">Date Saved</option>
                  <option value="none">None</option>
                </select>
              </label>
              <label className={styles.controlLabel}>
                Sort
                <select
                  className={styles.controlSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </label>
            </div>

            {/* Grouped list */}
            <div className={styles.groupedList}>
              {groups.map((group, gi) => (
                <div key={group.label || gi}>
                  {group.label && (
                    <div className={styles.groupHeader}>
                      {group.section && SECTION_COLORS[group.section] && (
                        <span
                          className={styles.groupDot}
                          style={{ background: SECTION_COLORS[group.section] }}
                        />
                      )}
                      <span className={styles.groupLabel}>{group.label}</span>
                      <span className={styles.groupCount}>
                        {group.stories.length}
                      </span>
                    </div>
                  )}
                  <div className={styles.list}>
                    {group.stories.map((story) => {
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
                </div>
              ))}
            </div>
          </>
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
