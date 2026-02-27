export interface RSSSource {
  name: string;
  url: string;
  category?: string;
}

export const RSS_SOURCES: RSSSource[] = [
  // ── Tech & Tools ──────────────────────────────────
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
    name: "Ars Technica AI",
    url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
    category: "tools",
  },

  // ── Business & Industry ───────────────────────────
  {
    name: "VentureBeat AI",
    url: "https://venturebeat.com/category/ai/feed/",
    category: "business",
  },
  {
    name: "CNBC Tech",
    url: "https://www.cnbc.com/id/19854910/device/rss/rss.html",
    category: "business",
  },
  {
    name: "Reuters Tech",
    url: "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best&best-type=reuters-best-technology",
    category: "business",
  },

  // ── Research ──────────────────────────────────────
  {
    name: "MIT Tech Review",
    url: "https://www.technologyreview.com/feed/",
    category: "research",
  },
  {
    name: "ArXiv CS.AI",
    url: "https://rss.arxiv.org/rss/cs.AI",
    category: "research",
  },
  {
    name: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
    category: "research",
  },
  {
    name: "DeepMind Blog",
    url: "https://deepmind.google/blog/feed/basic/",
    category: "research",
  },

  // ── Policy, Ethics & Breaking ─────────────────────
  {
    name: "Wired AI",
    url: "https://www.wired.com/feed/tag/ai/latest/rss",
    category: "concerns",
  },
  {
    name: "AP News AI",
    url: "https://apnews.com/hub/artificial-intelligence.rss",
    category: "policy",
  },
  {
    name: "NYT Technology",
    url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    category: "policy",
  },
  {
    name: "Washington Post Tech",
    url: "https://feeds.washingtonpost.com/rss/business/technology",
    category: "policy",
  },

  // ── Company Blogs (direct announcements) ──────────
  {
    name: "Anthropic Blog",
    url: "https://www.anthropic.com/feed",
    category: "concerns",
  },
  {
    name: "OpenAI Blog",
    url: "https://openai.com/blog/rss.xml",
    category: "tools",
  },
];
