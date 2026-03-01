"use client";

import { useSavedStories, type SavedStory } from "@/lib/useSavedStories";
import styles from "./SaveButton.module.css";

interface Props {
  story: SavedStory;
  size?: "sm" | "md";
  className?: string;
}

export default function SaveButton({ story, size = "sm", className = "" }: Props) {
  const { isSaved, toggleSave, hydrated } = useSavedStories();
  const saved = hydrated && isSaved(story.id);

  return (
    <button
      className={`${styles.btn} ${styles[size]} ${saved ? styles.saved : ""} ${className}`}
      onClick={(e) => {
        e.preventDefault(); // prevent Link navigation on card
        e.stopPropagation();
        toggleSave(story);
      }}
      aria-label={saved ? "Remove from saved" : "Save story"}
      title={saved ? "Remove from saved" : "Save for later"}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
