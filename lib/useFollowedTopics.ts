"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ai-feed-followed-topics";

function loadFollowed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistFollowed(topics: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
}

export function useFollowedTopics() {
  const [followed, setFollowed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFollowed(loadFollowed());
    setHydrated(true);
  }, []);

  const isFollowed = useCallback(
    (tag: string) => followed.includes(tag.toLowerCase().trim()),
    [followed]
  );

  const toggleFollow = useCallback((tag: string) => {
    const normalized = tag.toLowerCase().trim();
    setFollowed((prev) => {
      const next = prev.includes(normalized)
        ? prev.filter((t) => t !== normalized)
        : [...prev, normalized];
      persistFollowed(next);
      return next;
    });
  }, []);

  const removeFollow = useCallback((tag: string) => {
    const normalized = tag.toLowerCase().trim();
    setFollowed((prev) => {
      const next = prev.filter((t) => t !== normalized);
      persistFollowed(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setFollowed([]);
    persistFollowed([]);
  }, []);

  return { followed, isFollowed, toggleFollow, removeFollow, clearAll, hydrated };
}
