"use client";

import Link from "next/link";
import { useSavedStories } from "@/lib/useSavedStories";
import styles from "./Header.module.css";

export default function SavedNavLink() {
  const { saved, hydrated } = useSavedStories();
  const count = hydrated ? saved.length : 0;

  return (
    <Link href="/saved/" className={styles.navLink}>
      <span className={styles.dot} />
      SAVED
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
}
