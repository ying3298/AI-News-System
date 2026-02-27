# THE AI FEED — Project Reference

## Site Section Map

| Ref Name       | What it is                              | File(s)                                      |
|----------------|-----------------------------------------|----------------------------------------------|
| **HERO**       | Top banner with headline story          | `components/HeroHeadline.tsx`                |
| **INTRO**      | Tagline + explore link below hero       | `app/page.tsx` (inline)                      |
| **SIMPLE**     | "Today in simple words" block           | `components/SimpleSummary.tsx`               |
| **FILTERS**    | Category filter buttons above feed      | `components/FilterBar.tsx`                   |
| **FEED**       | Main news grid (all stories)            | `components/NewsGrid.tsx`, `NewsCard.tsx`    |
| **QUOTE**      | Daily quote block                       | `components/QuoteBlock.tsx`                  |
| **HEADER**     | Top nav bar                             | `components/Header.tsx`                      |
| **FOOTER**     | Bottom bar with meta + status           | `components/Footer.tsx`                      |
| **STORY PAGE** | Individual story detail page            | `app/story/[id]/page.tsx`                    |
| **ARCHIVE**    | Calendar view + past editions           | `app/archive/`, `components/ArchiveCalendar.tsx` |

## Content Pipeline

- RSS feeds (8 sources) → Claude Haiku curation → JSON files in `/content/`
- GitHub Actions runs daily at 11:00 UTC (6-7 AM EST)
- Vercel auto-deploys on git push

## Key Files

- `lib/types.ts` — All TypeScript interfaces (NewsItem, DailyContent, etc.)
- `lib/content.ts` — Content loading functions (getLatestContent, getDailyContent, etc.)
- `lib/dates.ts` — Date formatting utilities
- `scripts/generate-daily-json.ts` — Content generation orchestrator
- `scripts/curate-with-claude.ts` — Claude API integration
- `scripts/fetch-rss.ts` — RSS feed fetching
- `scripts/rss-sources.ts` — Feed source definitions
- `content/index.json` — Date index (dates array + latest pointer)
- `content/YYYY-MM-DD.json` — Daily content files

## Categories (SectionSlug)

- `tools` — Tools & Products
- `research` — Research
- `business` — Industry & Business
- `policy` — Government & Policy
- `concerns` — Concerns & Ethics
