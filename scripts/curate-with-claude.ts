import Anthropic from "@anthropic-ai/sdk";
import type { RawFeedItem } from "./fetch-rss";
import type { DailyContent } from "../lib/types";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a senior AI news editor curating a daily digest called "THE AI FEED".

Given a list of raw RSS feed items about AI, you must:

1. Select the single most impactful story as the HEADLINE
2. Write a "simple summary" — a plain-language recap of the day's most important AI news, written so a very smart 10-year-old would understand. Rules:
   - Actually summarize what happened today: mention the key stories, companies, and developments
   - Use simple, clear language — explain technical things with quick comparisons (e.g., "like a brain for computers" or "kind of like autocorrect but way smarter")
   - 3-4 short sentences that cover the top 2-3 stories of the day
   - Be specific: name the companies, products, or decisions — don't be vague
   - Tone: friendly, curious, a little excited — like a cool older sibling explaining the news after school
   - It's okay to use words like "AI" and "robot" but avoid heavy jargon like "neural network", "inference", "LLM", or "parameters"
   - Example: "Big news today — the US government got into a fight with Anthropic (the company that makes Claude) about whether the military can use their AI. Meanwhile, OpenAI just got $110 billion in new funding, which is more money than most countries spend in a year. Also, a music app called Suno that uses AI to write songs just hit 2 million paying users!"
3. Categorize the remaining stories into exactly 5 sections:
   - tools: New AI tools, products, features, developer tools
   - research: Academic papers, scientific breakthroughs, new architectures
   - business: Funding, earnings, acquisitions, partnerships, company news
   - policy: Government regulation, legislation, international AI governance
   - concerns: Ethics, safety risks, job displacement, misinformation, legal issues
4. For each section, pick 2-3 of the best stories and write:
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

  // First attempt with full detail
  let message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 16384,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  let responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  // If output was truncated (hit max_tokens), retry asking for fewer stories
  if (message.stop_reason === "max_tokens") {
    console.warn("Response truncated, retrying with compact request...");
    const compactPrompt = `${userPrompt}\n\nIMPORTANT: Keep output concise. Pick only 2-3 stories per section. Keep content fields to 2 sentences max. The JSON must fit within the token limit.`;
    message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 16384,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: compactPrompt }],
    });
    responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
  }

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
