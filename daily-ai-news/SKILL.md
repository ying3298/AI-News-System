---
name: daily-ai-news
description: Automated daily AI news collection and formatting. Use when the user says "daily news", "AI news update", "today's AI news", or wants to create a formatted AI news document. Searches for current AI news, formats it with emoji headers, and saves as .docx for Apple Pages.
---

# Daily AI News

## Overview

Collect, format, and save daily AI news as a .docx document compatible with Apple Pages.

## Workflow

### Step 1: Search for Today's News

Use WebSearch to find AI news for the current date across these categories:
- Major AI announcements and headlines
- New AI tools and products
- Research breakthroughs
- Industry and business news
- Government and policy updates

Search queries to use:
- "AI news [date]"
- "artificial intelligence announcements [date]"
- "AI tools products launch [date]"
- "AI research breakthrough [date]"

### Step 2: Format the Content

Structure news using these emoji headers (in order):

```
📰 TODAY'S HEADLINE
[Main story of the day - 2-3 sentences]

📅 [Full date, e.g., "February 10, 2026"]

😊 TODAY IN SIMPLE WORDS
[Explain like talking to a 6-year-old - 2-3 sentences]

🛠️ TOOLS & PRODUCTS
[New AI tools, apps, features - bullet points]

🔬 RESEARCH BREAKTHROUGHS
[Academic papers, scientific advances - bullet points]

💰 INDUSTRY & BUSINESS
[Funding, acquisitions, company news - bullet points]

🌐 GOVERNMENT & POLICY
[Regulations, government AI initiatives - bullet points]

⚠️ CONCERNS & QUESTIONS
[Ethical issues, risks, debates - bullet points]

💡 QUOTE OF THE DAY
"[Notable quote from AI leader]" — [Name, Title]

📚 SOURCES
[List of source URLs]
```

### Step 3: Generate Document

Run the docx generation script:

```bash
node scripts/create-news-doc.js "[date]" "[content-file]"
```

Or create manually using docx-js pattern from docx skill.

## Quick Command

When user says "daily news" or "AI news update":

1. Get today's date
2. Search for AI news
3. Format with emoji headers
4. Save to `/sessions/jolly-gracious-mccarthy/mnt/Chrome Apps.localized/AI-News-System/[date]-ai-news.docx`
5. Provide download link

## Output Location

Save files to: `AI-News-System/` folder with naming pattern:
- `YYYY-MM-DD-ai-news.docx` (e.g., `2026-02-10-ai-news.docx`)
