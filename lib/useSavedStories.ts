"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ai-feed-saved-stories";

export interface SavedStory {
  id: string;
  title: string;
  summary: string;
  section: string;
  sourceName: string;
  sourceUrl: string;
  imageUrl?: string;
  savedAt: string; // ISO date
}

function loadSaved(): SavedStory[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistSaved(stories: SavedStory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

export function useSavedStories() {
  const [saved, setSaved] = useState<SavedStory[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSaved(loadSaved());
    setHydrated(true);
  }, []);

  const isSaved = useCallback(
    (id: string) => saved.some((s) => s.id === id),
    [saved]
  );

  const toggleSave = useCallback(
    (story: SavedStory) => {
      setSaved((prev) => {
        const exists = prev.some((s) => s.id === story.id);
        const next = exists
          ? prev.filter((s) => s.id !== story.id)
          : [{ ...story, savedAt: new Date().toISOString() }, ...prev];
        persistSaved(next);
        return next;
      });
    },
    []
  );

  const removeSaved = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.filter((s) => s.id !== id);
      persistSaved(next);
      return next;
    });
  }, []);

  return { saved, isSaved, toggleSave, removeSaved, hydrated };
}
