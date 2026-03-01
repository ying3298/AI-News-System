"use client";

import { useState, useEffect, useCallback } from "react";

export type GroupBy = "section" | "date" | "none";
export type SortBy = "newest" | "oldest";

const GROUP_KEY = "ai-feed-library-grouping";
const SORT_KEY = "ai-feed-library-sort";

export function useLibraryPreferences() {
  const [groupBy, setGroupByState] = useState<GroupBy>("section");
  const [sortBy, setSortByState] = useState<SortBy>("newest");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const g = localStorage.getItem(GROUP_KEY) as GroupBy | null;
      const s = localStorage.getItem(SORT_KEY) as SortBy | null;
      if (g && ["section", "date", "none"].includes(g)) setGroupByState(g);
      if (s && ["newest", "oldest"].includes(s)) setSortByState(s);
    } catch {}
    setHydrated(true);
  }, []);

  const setGroupBy = useCallback((v: GroupBy) => {
    setGroupByState(v);
    localStorage.setItem(GROUP_KEY, v);
  }, []);

  const setSortBy = useCallback((v: SortBy) => {
    setSortByState(v);
    localStorage.setItem(SORT_KEY, v);
  }, []);

  return { groupBy, sortBy, setGroupBy, setSortBy, hydrated };
}
