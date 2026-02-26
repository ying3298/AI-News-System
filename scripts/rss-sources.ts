export interface RSSSource {
  name: string;
  url: string;
  category?: string;
}

export const RSS_SOURCES: RSSSource[] = [
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    category: "tools",
  },
  {
    name: "The Verge AI",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    category: "tools",
  },
  {
    name: "VentureBeat AI",
    url: "https://venturebeat.com/category/ai/feed/",
    category: "business",
  },
  {
    name: "MIT Tech Review",
    url: "https://www.technologyreview.com/feed/",
    category: "research",
  },
  {
    name: "Ars Technica AI",
    url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
    category: "tools",
  },
  {
    name: "ArXiv CS.AI",
    url: "https://rss.arxiv.org/rss/cs.AI",
    category: "research",
  },
  {
    name: "Wired AI",
    url: "https://www.wired.com/feed/tag/ai/latest/rss",
    category: "concerns",
  },
  {
    name: "Reuters Tech",
    url: "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best&best-type=reuters-best-technology",
    category: "business",
  },
];
