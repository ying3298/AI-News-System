# THE AI FEED — Brand Identity System (IS)

## 1. Brand Vision

In a world racing toward AI, **THE AI FEED** keeps you grounded. We translate the noise into understanding, so you can navigate with confidence — not as a spectator, but as an empowered participant.

AI is reshaping everything. That can feel overwhelming. We exist to make sure it doesn't have to. Every story we curate, every summary we write, is in service of one thing: **you**, standing on solid ground, seeing clearly.

**Core promise:** Human-first AI literacy.
**Tone:** Grounded warmth — calm, clear, never condescending. You belong in this conversation.

---

## 2. Brand Personality

| Trait          | What it means                                                       |
|----------------|---------------------------------------------------------------------|
| **Grounding**  | We give you a place to stand. The world moves fast; we hold steady. |
| **Inclusive**   | This isn't just for engineers. Builders, leaders, parents, students — everyone belongs here. |
| **Warm**       | We speak like a thoughtful friend, not a newswire. Human tone, always. |
| **Empowering** | You don't just read the news — you understand it. You leave more capable than you arrived. |
| **Honest**     | No hype, no fear. Real substance, plain language, editorial rigor.  |

---

## 3. Visual Identity

### 3.1 Design Philosophy

**Human, not machine.** The visual system should feel like a well-made magazine — tactile, warm, editorial. Inspired by the LiFI 25 festival identity: one cohesive system with individuality expressed through color and context. Each news category gets its own character — same DNA, different expression. But the canvas underneath is always warm, natural, and inviting.

### 3.2 Color System

**Foundation palette** — warm neutrals that feel like natural materials, not screens:

| Token              | Hex       | Usage                                      |
|--------------------|-----------|---------------------------------------------|
| `--ink`            | `#1a1614` | Primary text — warm near-black, soft on eyes |
| `--paper`          | `#faf8f5` | Backgrounds — warm cream, like quality paper |
| `--fog`            | `#f3f0eb` | Surface cards — warm sand, like linen        |
| `--signal`         | `#c06014` | Primary accent — terracotta, warm and bold   |
| `--mute`           | `#9a918a` | Secondary text — warm stone                  |
| `--border`         | `#e8e4df` | Dividers — subtle, organic edge              |

**Section accent palette** — earthier tones that feel natural on the warm canvas:

| Section       | Color Name   | Hex       | Mood                             |
|---------------|-------------|-----------|-----------------------------------|
| `tools`       | Deep Sky     | `#2b6cb0` | Reliable, builder's clarity       |
| `research`    | Earthy Plum  | `#6b46a3` | Contemplation, intellectual depth |
| `business`    | Forest       | `#2d7a4f` | Organic growth, grounded ambition |
| `policy`      | Dark Gold    | `#b8860b` | Deliberate, measured governance   |
| `concerns`    | Brick        | `#b53d2e` | Serious attention, not alarm      |

### 3.3 Typography

| Role       | Family           | Weight   | Usage                                              |
|------------|------------------|----------|----------------------------------------------------|
| Headlines  | Fraunces         | 700–800  | Hero titles, section headers — warm, human, distinctive |
| Body       | Space Grotesk    | 400–500  | Article text, summaries — clean readability         |
| Data/Meta  | Space Grotesk    | 400      | Tags, dates, IDs, captions — small size, letter-spaced |

**Fraunces** is an old-style soft serif with genuine personality — slightly wonky, warm, confident. It says "human, not machine" at first glance. Paired with Space Grotesk for body and metadata, it creates a clear hierarchy: **character at the top, clarity everywhere else.** No monospace fonts — we deliberately avoid coder aesthetics to signal "everyone belongs here."

### 3.4 Graphic Motif: "Ground Forms"

The core visual motif is **Ground Forms** — organic, flowing shapes that represent human understanding growing alongside AI.

**The metaphor:** Each shape is a living element — seeds of understanding, roots of knowledge, branches of connection. Stories cluster like communities, ideas flow like rivers, and breakthroughs bloom like canopies.

| Element             | Description                                                      |
|---------------------|------------------------------------------------------------------|
| **Seeds**           | Small rounded shapes — individual stories, starting points        |
| **Roots**           | Flowing lines and curves — deep connections between ideas         |
| **Canopies**        | Overlapping rounded forms — major themes, collective understanding|
| **Ripples**         | Concentric organic rings — impact spreading outward               |
| **Terrain/texture** | Subtle dot patterns or topographic lines — the ground we stand on |

These forms should feel: **organic, warm, grounded, and alive — never cold or mechanical.**

---

## 4. AI Image Generation System (Gemini Nano Banana)

### 4.1 Purpose

Every news story or section gets a paired editorial illustration generated by Gemini, creating a cohesive visual layer across the feed. Images serve as **mood anchors** — they set the emotional tone of a story before the reader reads a word. The imagery should feel **handcrafted and human**, like editorial illustrations in a quality magazine.

### 4.2 Master Prompt Template

Use this base prompt structure for all image generation. Swap the `{variables}` per story.

```
BASE PROMPT:
"Warm editorial illustration for a human-centered news publication called THE AI FEED.
Style: Organic abstract composition using flowing shapes — rounded forms, smooth curves, natural clusters, and subtle textures.
Color palette: Warm cream (#faf8f5) background with {section_color} as the dominant accent color, with warm sand (#f3f0eb) shapes for depth.
Mood: {mood} — warm, grounded, inviting, editorial.
Subject hint: {subject_hint}
Composition: Generous breathing room, organic balance, shapes suggest {metaphor} without being literal.
No text, no faces, no photorealism, no harsh edges. Soft geometry, natural feel, print-quality."
```

### 4.3 Section-Specific Prompts

**TOOLS** (`#2b6cb0` Deep Sky)
```
Style: Organic abstract — rounded interlocking shapes suggesting hands building and assembling.
Color palette: Warm cream background, deep sky blue (#2b6cb0) dominant, soft sand accents.
Mood: Productive, reliable, builder's warmth.
Subject hint: {story_subject} — e.g., "a new coding assistant", "browser-based AI tool"
Metaphor: Pieces fitting together naturally, roots connecting, a structure growing from the ground up.
```

**RESEARCH** (`#6b46a3` Earthy Plum)
```
Style: Organic abstract — layered rounded forms and spirals suggesting depth and discovery.
Color palette: Warm cream background, earthy plum (#6b46a3) dominant, soft lavender and sand accents.
Mood: Contemplative, deep, quietly exciting.
Subject hint: {story_subject} — e.g., "new language model architecture", "protein folding breakthrough"
Metaphor: Seeds opening, layers of earth revealing something underneath, roots reaching deep.
```

**BUSINESS** (`#2d7a4f` Forest)
```
Style: Organic abstract — upward-growing shapes and branching forms suggesting natural growth.
Color palette: Warm cream background, forest green (#2d7a4f) dominant, soft mint and sand accents.
Mood: Grounded confidence, organic momentum, steady growth.
Subject hint: {story_subject} — e.g., "AI startup raises $500M", "tech acquisition"
Metaphor: Branches extending, canopies expanding, a forest growing from strong roots.
```

**POLICY** (`#b8860b` Dark Gold)
```
Style: Organic abstract — interwoven lines and structured curves suggesting frameworks and boundaries.
Color palette: Warm cream background, dark gold (#b8860b) dominant, soft amber and sand accents.
Mood: Measured, deliberate, carefully constructed.
Subject hint: {story_subject} — e.g., "EU AI Act enforcement", "US executive order on AI"
Metaphor: Woven patterns, terrain being mapped, contour lines defining the landscape.
```

**CONCERNS** (`#b53d2e` Brick)
```
Style: Organic abstract — disrupted patterns and scattered shapes suggesting tension without panic.
Color palette: Warm cream background, brick red (#b53d2e) dominant, dark warm gray accents.
Mood: Thoughtful alertness, serious but not alarmist. A pause, not a scream.
Subject hint: {story_subject} — e.g., "deepfake detection challenges", "AI job displacement study"
Metaphor: Cracks in terrain, roots disturbed, ripples spreading through still water.
```

### 4.4 Hero Image Prompt

For the daily headline story, use an amplified version:

```
"Bold editorial illustration for the lead story of THE AI FEED.
Style: Large-scale organic composition — confident, grounded, striking shapes with natural flow.
Color palette: Deep warm charcoal (#1a1614) to dark brown (#2c2420) background with warm cream and {section_color} shapes.
Mood: Impactful, definitive, this-is-the-story-of-the-day energy — but grounded, not aggressive.
Subject hint: {headline_subject}
Composition: Dramatic scale contrast — one large organic shape with smaller natural satellite elements.
No text, no faces, no photorealism. Soft geometry, natural textures, editorial quality."
```

### 4.5 Simple Summary Image Prompt

A warm, inviting illustration for the "Today in plain words" block:

```
"Soft editorial illustration for a daily news summary section.
Style: Gentle organic shapes — rounded forms, smooth flowing curves, scattered seed-like dots.
Color palette: Deep warm charcoal (#1a1614) background with warm cream (#faf8f5) and muted terracotta (#c06014) shapes.
Mood: Approachable, cozy, welcoming — like sitting down with a friend who explains the day.
Composition: Centered cluster of simple organic shapes, generous breathing room around edges.
No text, no faces, no photorealism. Soft edges, subtle warmth, inviting."
```

### 4.6 Image Specifications

| Property        | Value                          |
|-----------------|--------------------------------|
| Format          | PNG or WebP                    |
| Card images     | 800 x 450px (16:9)            |
| Hero images     | 1600 x 900px (16:9)           |
| Simple summary  | 1200 x 400px (3:1, banner)    |
| File naming     | `{date}-{section}-{id}.webp`  |
| Storage         | `/public/images/{date}/`       |

### 4.7 Quality Checklist

Before using a generated image, verify:
- [ ] Dominant color matches the section palette
- [ ] No text or letterforms accidentally generated
- [ ] No faces or human figures
- [ ] Clean warm cream (or dark warm) background without noise
- [ ] Shapes feel organic, intentional, and warm — not mechanical or random
- [ ] Works at both card size and full-width

---

## 5. Layout Integration

### 5.1 Where Images Appear

| Location          | Image type       | Size          | Behavior            |
|-------------------|------------------|---------------|---------------------|
| HERO              | Hero image       | Full-width bg | Behind gradient overlay |
| FEED cards        | Card image       | Top of card   | Above title          |
| STORY PAGE        | Card image       | Top banner    | Full-width           |
| SIMPLE            | Summary banner   | Inline        | Behind/beside text   |

### 5.2 Image-Free Fallback

When images are unavailable, cards display with:
- A colored top-border (2px) using the section accent color
- The section's color as a subtle background tint at 5% opacity on the warm paper base
- This ensures visual category differentiation without images

---

## 6. Voice & Tone Guide

| Context             | Tone                              | Example                                          |
|---------------------|-----------------------------------|--------------------------------------------------|
| Headlines           | Clear, direct, active             | "Google Launches Open-Source Vision Model"        |
| Summaries           | Informative, warm, concise        | "The model outperforms GPT-4V on three benchmarks — here's why it matters." |
| Simple Summary      | Plain, friendly, you-centered     | "Google made a new AI that understands pictures really well. It's free to use, which means anyone can build with it." |
| Tags                | Categorical, lowercase            | `open-source`, `computer-vision`, `benchmark`     |
| Quote of the day    | Attributed, humanizing            | Keep original voice, add context that connects to the reader |

**Voice principles:**
- **You belong here.** Never assume technical knowledge. Never talk down.
- **Warm, not cute.** Friendly authority, not corporate friendliness.
- **The reader is the subject.** Not "AI did X" but "here's what X means for you."
- **Earn trust through honesty.** If something is uncertain, say so. If something is exciting, say why.

---

## 7. Usage with Nano Banana: Quick Reference

1. Identify the story's **section** (tools/research/business/policy/concerns)
2. Pick the matching **section prompt template** from 4.3
3. Fill in `{story_subject}` with a 5-10 word description of the story
4. Generate at the correct **dimensions** from 4.6
5. Run through the **quality checklist** from 4.7
6. Save as `{date}-{section}-{id}.webp` in `/public/images/{date}/`
