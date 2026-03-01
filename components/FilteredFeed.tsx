"use client";

import { useState } from "react";
import type { NewsItem, DailyContent } from "@/lib/types";
import { useFollowedTopics } from "@/lib/useFollowedTopics";
import FilterBar, { type FilterValue } from "./FilterBar";
import NewsGrid from "./NewsGrid";

interface Props {
  sections: DailyContent["sections"];
}

export default function FilteredFeed({ sections }: Props) {
  const [active, setActive] = useState<FilterValue>(null);
  const { followed, isFollowed, toggleFollow, hydrated } = useFollowedTopics();

  const allItems: NewsItem[] = Object.values(sections).flat();

  let items: NewsItem[];
  if (active === "following") {
    items = allItems.filter((item) => {
      const tags = item.normalizedTags || item.tags.map((t) => t.toLowerCase());
      return tags.some((t) => followed.includes(t));
    });
  } else if (active) {
    items = sections[active];
  } else {
    items = allItems;
  }

  return (
    <>
      <FilterBar
        active={active}
        onFilter={setActive}
        followedCount={hydrated ? followed.length : 0}
      />
      <NewsGrid
        items={items}
        isFollowed={isFollowed}
        toggleFollow={toggleFollow}
        followedTopics={hydrated ? followed : []}
      />
    </>
  );
}
