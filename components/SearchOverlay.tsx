"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { NewsItem } from "@/lib/types";
import styles from "./SearchOverlay.module.css";

interface Props {
  items: NewsItem[];
}

export default function SearchOverlay({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.sourceName.toLowerCase().includes(q)
        );
      })
    : [];

  const handleOpen = useCallback(() => {
    setOpen(true);
    setQuery("");
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpen();
      }
      if (e.key === "Escape") {
        handleClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleOpen, handleClose]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  if (!open) {
    return (
      <button className={styles.trigger} onClick={handleOpen}>
        Search
        <kbd className={styles.kbd}>/K</kbd>
      </button>
    );
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search stories, tags, sources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={handleClose}>
            ESC
          </button>
        </div>

        {query.length >= 2 && (
          <div className={styles.results}>
            {results.length === 0 ? (
              <div className={styles.empty}>
                No stories matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              results.map((item) => (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.result}
                >
                  <span className={styles.resultId}>{item.id}</span>
                  <div className={styles.resultContent}>
                    <span className={styles.resultTitle}>{item.title}</span>
                    <span className={styles.resultSource}>{item.sourceName}</span>
                  </div>
                </a>
              ))
            )}
          </div>
        )}

        {query.length < 2 && (
          <div className={styles.hint}>
            Type at least 2 characters to search across all stories
          </div>
        )}
      </div>
    </div>
  );
}
