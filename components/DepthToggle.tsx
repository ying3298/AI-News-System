"use client";

import { useEffect, useState } from "react";
import styles from "./DepthToggle.module.css";

export type DepthLevel = "simple" | "standard" | "deep";

const STORAGE_KEY = "ai-feed-depth-level";

const levels: { key: DepthLevel; label: string }[] = [
  { key: "simple", label: "Simple" },
  { key: "standard", label: "Standard" },
  { key: "deep", label: "Deep" },
];

interface Props {
  onChange: (level: DepthLevel) => void;
  hasSimple: boolean;
}

export default function DepthToggle({ onChange, hasSimple }: Props) {
  const [active, setActive] = useState<DepthLevel>("standard");

  // Restore preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as DepthLevel | null;
      if (saved && levels.some((l) => l.key === saved)) {
        // If no simple content, fall back to standard
        const resolved = saved === "simple" && !hasSimple ? "standard" : saved;
        setActive(resolved);
        onChange(resolved);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelect(level: DepthLevel) {
    setActive(level);
    onChange(level);
    try {
      localStorage.setItem(STORAGE_KEY, level);
    } catch {
      // localStorage unavailable
    }
  }

  // Filter out "simple" option if no contentSimple is available
  const availableLevels = hasSimple
    ? levels
    : levels.filter((l) => l.key !== "simple");

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Reading depth</span>
      <div className={styles.toggleGroup}>
        {availableLevels.map((level) => (
          <button
            key={level.key}
            className={`${styles.toggleBtn} ${active === level.key ? styles.active : ""}`}
            onClick={() => handleSelect(level.key)}
            aria-pressed={active === level.key}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
