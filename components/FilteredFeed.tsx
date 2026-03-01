"use client";

import { useState } from "react";
import type { NewsItem, DailyContent, SectionSlug } from "@/lib/types";
import { useFollowedTopics } from "@/lib/useFollowedTopics";
import FilterBar, { type FilterValue } from "./FilterBar";
import NewsGrid from "./NewsGrid";
import SectionBlock from "./SectionBlock";

const SLUGS: SectionSlug[] = ["tools", "creative", "research", "applications", "business", "policy", "concerns", "culture"];

interface Props {
  sections: DailyContent["sections"];
}

export default function FilteredFeed({ sections }: Props) {
  const [active, setActive] = useState<FilterValue>(null);
  const { followed, isFollowed, toggleFollow, hydrated } = useFollowedTopics();

  const followedTopics = hydrated ? followed : [];

  // For "following" and single-category filters, compute flat items
  let items: NewsItem[] = [];
  if (active === "following") {
    const allItems: NewsItem[] = Object.values(sections).flat();
    items = allItems.filter((item) => {
      const tags = item.normalizedTags || item.tags.map((t) => t.toLowerCase());
      return tags.some((t) => followed.includes(t));
    });
  } else if (active) {
    items = sections[active];
  }

  return (
    <>
      <FilterBar
        active={active}
        onFilter={setActive}
        followedCount={hydrated ? followed.length : 0}
      />
      {active === null ? (
        SLUGS.map((slug) => (
          <SectionBlock
            key={slug}
            slug={slug}
            items={sections[slug] || []}
            isFollowed={isFollowed}
            toggleFollow={toggleFollow}
            followedTopics={followedTopics}
          />
        ))
      ) : (
        <NewsGrid
          items={items}
          isFollowed={isFollowed}
          toggleFollow={toggleFollow}
          followedTopics={followedTopics}
        />
      )}
    </>
  );
}
