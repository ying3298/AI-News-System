# Image Storytelling Guide

> Every image on THE AI FEED should help a reader **understand the story before reading a single word**.

---

## Core Principle

**Storytelling first, style second.**

The headline determines _what_ the image shows. The art style determines _how_ it looks. Never sacrifice narrative clarity for visual aesthetics.

### The 3-Second Test
A reader scrolling through the feed should be able to glance at any image and within 3 seconds:
1. Understand the general topic of the story
2. Feel the emotional tone (exciting, cautionary, breakthrough, etc.)
3. Want to read more

---

## Visual Language

All images share a consistent rendering style:

| Element | Description |
|---------|-------------|
| **Background** | Vibrant warm-to-cool gradient (gold/peach → lavender/blue) |
| **Light** | Soft, glowing, diffused — dreamy and radiant |
| **Figures** | Stylized, simplified human forms — smooth, rounded, no detailed faces |
| **Props** | Floating rounded shapes (screens, orbs, cards) as tech metaphors |
| **Texture** | Subtle grainy paper texture across the whole image |
| **Mood** | Optimistic, modern, warm, inviting |

### What we avoid
- Photorealism or stock-photo aesthetics
- Text, words, letters, or logos in images
- Sharp geometric minimalism
- Generic "tech" imagery with no story connection
- Abstract art that doesn't communicate anything specific

---

## Storytelling Patterns

Each story type has natural visual metaphors. Use these as starting points:

### Product Launches / New Tools
- A figure unveiling, presenting, or reaching toward a glowing new object
- Hands assembling or activating something
- A door opening to reveal light

### Research / Discoveries
- A figure peering into a glowing orb or magnifying something
- Layers peeling back to reveal hidden structure
- A lightbulb moment — illumination, revelation

### Business / Industry Moves
- Figures shaking hands, exchanging glowing objects
- A network of connected nodes expanding
- Paths converging or a bridge forming between two sides

### Policy / Regulation
- A figure placing guardrails, holding a balanced scale
- A crossroads or fork in the road
- A document being stamped or a gavel falling

### Concerns / Ethics
- A figure stepping carefully across a cracking surface
- A scale tipping, something falling out of balance
- A storm cloud approaching an otherwise calm scene

---

## Image Types

### Hero Image (1 per day)
- **Purpose**: The day's biggest story, front and center
- **Specs**: 1600×900 (16:9), bold and cinematic
- **Storytelling**: Must powerfully and specifically communicate the lead headline. This is not a generic banner — it illustrates _this particular_ story
- **Style**: Bolder gradients, larger figures, more dramatic lighting

### Story Cards (~10-12 per day)
- **Purpose**: Thumbnail for each news story in the feed grid
- **Specs**: 800×450 (16:9), clear at small sizes
- **Storytelling**: Single clear focal point that connects to the headline. A reader scanning the grid should be able to "read" the images like a visual table of contents
- **Style**: Standard gradient backgrounds, 1-2 figures, clean composition

### Summary Banner (1 per day)
- **Purpose**: Header for the "Today in simple words" section
- **Specs**: 1200×400 (3:1), wide banner format
- **Storytelling**: Generic "catching up on today's news" feeling — a cozy reading scene
- **Style**: Softer, calmer, more muted gradients. Warm and inviting

---

## Section Color Palettes

Each news category has a signature gradient direction:

| Section | Gradient | Mood |
|---------|----------|------|
| **Tools** | Gold → Sky blue | Productive, builder energy |
| **Research** | Coral → Deep violet | Discovery, wonder |
| **Business** | Amber → Emerald teal | Growth, momentum |
| **Policy** | Peach → Deep indigo | Deliberation, authority |
| **Concerns** | Orange → Blue-gray | Caution, reflection |

These gradients are the _background canvas_ — the story content and figures sit on top of them.

---

## Quality Checklist

Before an image passes, it should satisfy:

- [ ] **Tells the story** — Can you guess the headline from the image alone?
- [ ] **Consistent style** — Matches the gradient/glow/figure aesthetic
- [ ] **No text** — Zero words, letters, or logos visible
- [ ] **Clear at thumbnail size** — Single focal point, not cluttered
- [ ] **Appropriate tone** — Matches the section's mood (exciting vs cautionary)
- [ ] **No realistic faces** — Figures are stylized silhouettes or simplified forms

---

## Technical Implementation

Image generation is handled by:
- **Prompt templates**: `scripts/image-prompts.ts`
- **Generation script**: `scripts/generate-images.ts`
- **Model**: Gemini 2.5 Flash Image (`gemini-2.5-flash-image`)
- **Pipeline**: RSS → Claude curation → JSON → Gemini images → WebP conversion → Git commit → Vercel deploy

Prompts follow this structure:
1. **Story context** (headline title) — tells Gemini _what_ to illustrate
2. **Storytelling guidance** — concrete examples of good visual metaphors
3. **Render style** (shared constant) — tells Gemini _how_ to render it
4. **Color palette** (per-section gradient) — sets the background mood
5. **Composition specs** (aspect ratio, figure count) — ensures consistency
