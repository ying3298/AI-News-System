export interface RelatedStory {
  id: string;
  date: string;
  title: string;
  section: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  contentSimple?: string;
  keyTakeaways: string[];
  whyItMatters: string;
  sourceUrl: string;
  sourceName: string;
  tags: string[];
  section: string;
  readTime: string;
  publishedAt: string;
  imageUrl?: string;
  relatedStories?: RelatedStory[];
}

export interface DailyContent {
  date: string;
  dateFormatted: string;
  headline: {
    title: string;
    summary: string;
    sourceUrl: string;
    sourceName: string;
    imageUrl?: string;
  };
  simpleSummary: string;
  simpleSummaryImageUrl?: string;
  sections: {
    tools: NewsItem[];
    research: NewsItem[];
    business: NewsItem[];
    policy: NewsItem[];
    concerns: NewsItem[];
  };
  quote: {
    text: string;
    author: string;
    authorTitle: string;
  };
  sources: string[];
  generatedAt: string;
}

export interface ContentIndex {
  dates: string[];
  latest: string;
}

export type SectionSlug = keyof DailyContent["sections"];

export const SECTION_META: Record<SectionSlug, { label: string; emoji: string }> = {
  tools: { label: "Tools & Products", emoji: "tools" },
  research: { label: "Research", emoji: "research" },
  business: { label: "Industry & Business", emoji: "business" },
  policy: { label: "Government & Policy", emoji: "policy" },
  concerns: { label: "Concerns & Ethics", emoji: "concerns" },
};
