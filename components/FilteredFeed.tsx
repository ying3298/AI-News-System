"use client";

import { useState } from "react";
import type { NewsItem, DailyContent, SectionSlug } from "@/lib/types";
import FilterBar from "./FilterBar";
import NewsGrid from "./NewsGrid";

interface Props {
  sections: DailyContent["sections"];
}

export default function FilteredFeed({ sections }: Props) {
  const [active, setActive] = useState<SectionSlug | null>(null);

  const items: NewsItem[] = active
    ? sections[active]
    : Object.values(sections).flat();

  return (
    <>
      <FilterBar active={active} onFilter={setActive} />
      <NewsGrid items={items} />
    </>
  );
}
