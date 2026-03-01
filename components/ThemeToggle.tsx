"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "ai-feed-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // On mount, read saved preference
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved && ["light", "dark", "system"].includes(saved)) {
        setTheme(saved);
        applyTheme(saved);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  function applyTheme(t: Theme) {
    const html = document.documentElement;
    if (t === "light") {
      html.setAttribute("data-theme", "light");
    } else if (t === "dark") {
      html.setAttribute("data-theme", "dark");
    } else {
      // System — remove attribute, let prefers-color-scheme handle it
      html.removeAttribute("data-theme");
    }
  }

  function cycle() {
    const next: Theme =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable
    }
  }

  // Don't render icon until mounted to avoid hydration mismatch
  if (!mounted) {
    return <button className={styles.btn} aria-label="Toggle theme" />;
  }

  return (
    <button
      className={styles.btn}
      onClick={cycle}
      aria-label={`Theme: ${theme}. Click to change.`}
      title={`Theme: ${theme}`}
    >
      {theme === "light" && (
        <svg viewBox="0 0 20 20" fill="currentColor" className={styles.icon}>
          <circle cx="10" cy="10" r="4" />
          <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.93 3.93l1.41 1.41M14.66 14.66l1.41 1.41M3.93 16.07l1.41-1.41M14.66 5.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      )}
      {theme === "dark" && (
        <svg viewBox="0 0 20 20" fill="currentColor" className={styles.icon}>
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
      {theme === "system" && (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <rect x="3" y="4" width="14" height="10" rx="1.5" />
          <path d="M7 17h6M10 14v3" />
        </svg>
      )}
    </button>
  );
}
