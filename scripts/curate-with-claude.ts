import Anthropic from "@anthropic-ai/sdk";
import type { RawFeedItem } from "./fetch-rss";
import type { DailyContent } from "../lib/types";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a senior AI news editor curating a daily digest called "THE AI FEED".

Given a list of raw RSS feed items about AI, you must:

1. Select the single most impactful story as the HEADLINE
2. Write a 2-3 sentence "simple summary" of the day's AI news (explain like talking to a curious 10-year-old)
3. Categorize the remaining stories into exactly 5 sections:
   - tools: New AI tools, products, features, developer tools
   - research: Academic papers, scientific breakthroughs, new architectures
   - business: Funding, earnings, acquisitions, partnerships, company news
   - policy: Government regulation, legislation, international AI governance
   - concerns: Ethics, safety risks, job displacement, misinformation, legal issues
4. For each section, pick 3-5 of the best stories and write:
   - A concise title (rephrase for clarity, don't just copy the RSS title)
   - A 1-2 sentence summary
   - A longer content paragraph (3-5 sentences) with more detail
   - 2-4 key takeaways as an array of strings
   - A "whyItMatters" sentence explaining significance
   - Assign 2-4 descriptive tags
   - Estimate a readTime like "3 min"
5. Pick or compose a relevant quote of the day from an AI leader

Assign sequential IDs starting from AI-001.

Respond with ONLY valid JSON matching this exact structure (no markdown fencing):
{
  "headline": { "title": "...", "summary": "...", "sourceUrl": "...", "sourceName": "..." },
  "simpleSummary": "...",
  "sections": {
    "tools": [{ "id": "AI-001", "title": "...", "summary": "...", "content": "...", "keyTakeaways": ["..."], "whyItMatters": "...", "sourceUrl": "...", "sourceName": "...", "tags": ["..."], "section": "tools", "readTime": "3 min", "publishedAt": "..." }],
    "research": [...],
    "business": [...],
    "policy": [...],
    "concerns": [...]
  },
  "quote": { "text": "...", "author": "...", "authorTitle": "..." }
}

If a section has no relevant stories, include it with an empty array.
Ensure all sourceUrl values come from the provided feed items.`;

export async function curateWithClaude(
  items: RawFeedItem[],
  dateStr: string
): Promise<DailyContent> {
  const feedSummary = items
    .map(
      (item, i) =>
        `[${i + 1}] ${item.title}\nSource: ${item.sourceName}\nURL: ${item.link}\nSnippet: ${item.contentSnippet}\n`
    )
    .join("\n");

  const userPrompt = `Today is ${dateStr}. Here are ${items.length} AI news items from today's RSS feeds:\n\n${feedSummary}\n\nCurate these into the daily digest JSON.`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20241022",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Try to parse JSON, stripping markdown fences if present
  let jsonStr = responseText.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  const parsed = JSON.parse(jsonStr);

  // Build the full DailyContent object
  const dateFormatted = new Date(dateStr + "T12:00:00Z").toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

  const allSourceUrls = new Set<string>();
  [
    parsed.headline?.sourceUrl,
    ...Object.values(parsed.sections)
      .flat()
      .map((item: any) => item.sourceUrl),
  ].forEach((url: string) => {
    if (url) allSourceUrls.add(url);
  });

  return {
    date: dateStr,
    dateFormatted,
    headline: parsed.headline,
    simpleSummary: parsed.simpleSummary,
    sections: {
      tools: parsed.sections.tools || [],
      research: parsed.sections.research || [],
      business: parsed.sections.business || [],
      policy: parsed.sections.policy || [],
      concerns: parsed.sections.concerns || [],
    },
    quote: parsed.quote,
    sources: Array.from(allSourceUrls),
    generatedAt: new Date().toISOString(),
  };
}
