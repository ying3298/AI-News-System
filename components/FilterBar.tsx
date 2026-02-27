"use client";

import { SECTION_META, type SectionSlug } from "@/lib/types";
import styles from "./FilterBar.module.css";

const SLUGS: SectionSlug[] = ["tools", "research", "business", "policy", "concerns"];

interface Props {
  active: SectionSlug | null;
  onFilter: (slug: SectionSlug | null) => void;
}

export default function FilterBar({ active, onFilter }: Props) {
  return (
    <div className={styles.bar}>
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
