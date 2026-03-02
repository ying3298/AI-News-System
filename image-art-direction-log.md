# Art Direction Changelog

> Each entry records what inspired a change, what shifted, and why.

---

## 2025-03-01 — Founding Direction Shift

### Inspiration
5 reference images uploaded:
1. **Intimate film family portrait** — cream warmth, natural window light, visible grain
2. **Monumental arched columns + tiny figures** — amber/black chiaroscuro, motion blur
3. **B&W documentary triptych** — extreme grain, industrial + human + landscape panels
4. **Ink bonsai illustration** — single botanical element, geometric orb, negative space on cream paper
5. **Risograph bonsai poster** — halftone texture, bold Japanese typography, limited green/grey palette

### What Changed

**3 new style categories added:**
- `analog_documentary` (G) — Daido Moriyama, William Klein, Sebastiao Salgado, Shomei Tomatsu
- `japanese_minimalism` (H) — Masao Yamamoto, Rinko Kawauchi, Ikko Tanaka, Hasui Kawase
- `print_materiality` (I) — Tadanori Yokoo, Yusaku Kamekura, Gerd Arntz

**New artists blended into existing categories:**
- `modern_condition` += Fan Ho (geometric chiaroscuro), Michael Wolf (claustrophobic density)
- `techno_dystopia` += Andreas Gursky (monumental capitalism), Ernst Haas (motion-blurred color)
- `psychological` += Eikoh Hosoe (Japanese avant-garde), Hiroshi Sugimoto (meditative void)
- `environmental` += Hasui Kawase (woodblock atmosphere), Sebastiao Salgado (epic documentary)
- `nostalgic` += Rinko Kawauchi (luminous everyday), Saul Leiter (painterly rain warmth)
- `visceral` += Daido Moriyama (raw street grain), Todd Hido (suburban noir glow)

**Section mapping updated:**
- Research now defaults to `japanese_minimalism` (was `psychological`)
- Business now defaults to `print_materiality` (was `modern_condition`)
- Policy now defaults to `analog_documentary` (was `visceral`)
- Concerns now defaults to `visceral` (was `techno_dystopia`)
- Tools fallback shifted to `print_materiality`
- Creative/Culture fallback shifted to `japanese_minimalism`

### Overall Direction
Moving away from: digital polish, 3D renders, generic surrealist illustration
Moving toward: analog film grain, Japanese aesthetic influence, documentary grit, print materiality, human intimacy at every scale

---

## 2025-03-02 — AI & Society → Beeple

### Inspiration
User reviewed generated Culture/AI & Society cards (AI-012, AI-013). The `nostalgic` style (Rackham, Kawauchi) produced soft fairy-tale illustrations that felt too gentle for stories about robotics hardware and market disruption.

### What Changed
- Culture (`culture`) primary style: `nostalgic` → `techno_dystopia` (Beeple, Stålenhag, Gursky, Haas)
- Culture fallback: `japanese_minimalism` → `nostalgic`

### Rationale
AI & Society stories often cover technological disruption colliding with human life — hardware battlegrounds, market shifts. Beeple's monumental scale and satirical edge better matches this tension than soft vintage illustration.
