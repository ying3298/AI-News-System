import Anthropic from "@anthropic-ai/sdk";
import type { Message } from "@anthropic-ai/sdk/resources/messages";
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
3. Categorize the remaining stories into exactly 8 sections:
   - tools: AI software tools, products, platforms, APIs, coding assistants, chatbot updates. Excludes creative AI tools (those go in "creative") and domain-specific deployments (those go in "applications").
   - creative: AI for creative work — image generation, video generation, music, writing tools, design AI, creative workflow automation
   - research: Academic papers, scientific breakthroughs, new architectures, benchmarks, technical advances
   - applications: AI deployed in real-world domains — healthcare, drug discovery, robotics, physical AI, autonomous vehicles, climate, science, education, manufacturing. Stories about AI being USED in a specific field.
   - business: Funding, earnings, acquisitions, partnerships, company strategy, market news
   - policy: Government regulation, legislation, international AI governance, compliance, enforcement
   - concerns: AI safety risks, alignment, misuse, misinformation, deepfake harms, surveillance, bias, legal battles. Focus on concrete risks and things going wrong.
   - culture: How AI changes everyday life — workforce shifts, public perception, cultural debates, AI in entertainment, consumer trends. Human-centered stories about living with AI.
4. For each section, pick 1-2 of the best stories and write:
   - A concise title (rephrase for clarity, don't just copy the RSS title)
   - A 1-2 sentence summary
   - A "contentSimple": a 2-sentence plain-language version of this story, written for a smart 10-year-old. Same tone as the simpleSummary. Use simple words, name the companies/products, explain why it matters in everyday terms.
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
    "tools": [{ "id": "AI-001", "title": "...", "summary": "...", "contentSimple": "...", "content": "...", "keyTakeaways": ["..."], "whyItMatters": "...", "sourceUrl": "...", "sourceName": "...", "tags": ["..."], "section": "tools", "readTime": "3 min", "publishedAt": "..." }],
    "creative": [...],
    "research": [...],
    "applications": [...],
    "business": [...],
    "policy": [...],
    "concerns": [...],
    "culture": [...]
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

  // Helper: API call with 120s timeout
  function callWithTimeout(params: Parameters<typeof client.messages.create>[0]): Promise<Message> {
    return Promise.race([
      client.messages.create(params) as Promise<Message>,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Claude API call timed out after 120s")), 120_000)
      ),
    ]);
  }

  // First attempt with full detail
  let message = await callWithTimeout({
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
    message = await callWithTimeout({
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
      creative: parsed.sections.creative || [],
      research: parsed.sections.research || [],
      applications: parsed.sections.applications || [],
      business: parsed.sections.business || [],
      policy: parsed.sections.policy || [],
      concerns: parsed.sections.concerns || [],
      culture: parsed.sections.culture || [],
    },
    quote: parsed.quote,
    sources: Array.from(allSourceUrls),
    generatedAt: new Date().toISOString(),
  };
}
