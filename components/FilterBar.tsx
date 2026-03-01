"use client";

import { SECTION_META, type SectionSlug } from "@/lib/types";
import styles from "./FilterBar.module.css";

const SLUGS: SectionSlug[] = ["tools", "research", "business", "policy", "concerns"];

export type FilterValue = SectionSlug | "following" | null;

interface Props {
  active: FilterValue;
  onFilter: (value: FilterValue) => void;
  followedCount?: number;
}

export default function FilterBar({ active, onFilter, followedCount = 0 }: Props) {
  return (
    <div className={styles.bar}>
      {followedCount > 0 && (
        <button
          className={`${styles.pill} ${styles.followingPill} ${active === "following" ? styles.activeFollowing : ""}`}
          onClick={() => onFilter("following")}
        >
          Following
        </button>
      )}
      <button
        className={`${styles.pill} ${active === null ? styles.active : ""}`}
        onClick={() => onFilter(null)}
      >
        All
      </button>
      {SLUGS.map((slug) => (
        <button
          key={slug}
          className={`${styles.pill} ${active === slug ? styles.active : ""}`}
          onClick={() => onFilter(slug)}
        >
          {SECTION_META[slug].label}
        </button>
      ))}
    </div>
  );
}
