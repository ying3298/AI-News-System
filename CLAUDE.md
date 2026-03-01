# THE AI FEED — Project Reference

## Tech Stack
- Primary language: TypeScript (Next.js)
- Styling: CSS (custom properties / variables)
- Always use TypeScript over JavaScript for new files
- Default fonts and design tokens are defined in CSS variables — check existing theme files before introducing new values

## Environment Setup
- Always run `npm install` (or check node_modules) before attempting builds or verifications
- Never copy node_modules between directories — always do a fresh install
- Before declaring work complete, verify the build compiles: `npm run build`

## Design & Branding
- This project uses a warm, human-centered aesthetic with earth tones and editorial typography (Fraunces)
- When making UI changes, preserve existing design tokens and CSS variables
- Do not swap fonts or introduce new design directions without explicit user confirmation
- Follow Apple HIG principles for UI components where applicable

## Workflow Rules
- When the user pastes a spec or document, treat it as the source of truth and follow it exactly — do not make independent creative choices that deviate from it
- If a session involves UI redesign, write AND implement the changes — do not stop at a plan
- Always complete the full implementation before the session ends; if running low on context, prioritize shipping over planning

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

- RSS feeds (22 sources) → Claude Haiku curation → JSON files in `/content/`
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
- `creative` — Creative AI
- `research` — Research
- `applications` — AI in the Wild
- `business` — Industry & Business
- `policy` — Government & Policy
- `concerns` — Safety & Ethics
- `culture` — AI & Society
