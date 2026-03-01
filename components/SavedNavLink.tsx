"use client";

import Link from "next/link";
import { useSavedStories } from "@/lib/useSavedStories";
import { useFollowedTopics } from "@/lib/useFollowedTopics";
import styles from "./Header.module.css";

export default function SavedNavLink() {
  const { saved, hydrated: savedHydrated } = useSavedStories();
  const { followed, hydrated: topicsHydrated } = useFollowedTopics();

  const hydrated = savedHydrated && topicsHydrated;
  const count = hydrated ? saved.length + followed.length : 0;

  return (
    <Link href="/saved/" className={styles.navLink}>
      <span className={styles.dot} />
      LIBRARY
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
}
