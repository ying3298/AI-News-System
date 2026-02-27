export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  whyItMatters: string;
  sourceUrl: string;
  sourceName: string;
  tags: string[];
  section: string;
  readTime: string;
  publishedAt: string;
}

export interface DailyContent {
  date: string;
  dateFormatted: string;
  headline: {
    title: string;
    summary: string;
    sourceUrl: string;
    sourceName: string;
  };
  simpleSummary: string;
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
