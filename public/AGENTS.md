# AGENTS.md — information-is-beautiful

This file describes how an AI agent should interact with the information-is-beautiful project and its deployed site.

## Project Overview

**information-is-beautiful** is an interactive tribute to David McCandless' atlas of infographics, plus an MIT-licensed Agent Skill that teaches AI coding agents the craft of honest, editorial-quality information design.

- **Live site:** https://information-is-beautiful-skill.vercel.app
- **Skill install:** `npx skills add karefined-eng/information-is-beautiful-skill`
- **GitHub:** https://github.com/karefined-eng/information-is-beautiful-skill
- **Author:** karefined

## For AI Agents Visiting This Site

### Primary Content

1. **The Atlas** (`/atlas`) — Six interactive spreads honoring iconic infographics from the book
2. **The Playground** (`/playground`) — Live chart-matcher: pick variables, get the right visual form
3. **The Book** (`/book`) — Spread metadata, sources, and purchase links
4. **Agent Skill** (`/skills/information-is-beautiful/`) — Full skill documentation (HTML wrappers for all `.md` files)

### How to Use the Skill

The skill is pure markdown, no build required. Install via:
```bash
npx skills add karefined-eng/information-is-beautiful-skill
```

Or read directly at: https://information-is-beautiful-skill.vercel.app/skills/information-is-beautiful/SKILL.html

### Key References (all available as HTML)

| Reference | Purpose | URL |
|-----------|---------|-----|
| `chart-matcher.md` | Data shape → visual form decision table | `/skills/information-is-beautiful/references/chart-matcher.html` |
| `creative-moves.md` | 8 generative patterns for unforgettable forms | `/skills/information-is-beautiful/references/creative-moves.html` |
| `palettes.md` | Colour as a data channel (exact hexes, colorblind-safe) | `/skills/information-is-beautiful/references/palettes.html` |
| `quality-checklist.md` | 25-point beauty audit (binary pass/fail) | `/skills/information-is-beautiful/references/quality-checklist.html` |
| `sources.md` | Authentic provenance for every principle | `/skills/information-is-beautiful/references/sources.html` |
| `ted-law-mapping.md` | TED talk insights mapped to the five laws | `/skills/information-is-beautiful/references/ted-law-mapping.html` |

### Design Principles (The Five Laws)

1. **Form follows data** — Start from variable types, not chart library defaults
2. **Honest scales** — Zero baseline for bars; area ∝ value; no dual y-axes
3. **Colour is a data channel** — Hue = category; intensity = magnitude; one accent hue
4. **Ink must be earned** — No chartjunk; direct labels > legends; whitespace > borders
5. **Annotation is narration** — Title states the insight; three reading depths (glance/study/immerse)

### Accessibility Commitments

- Mark-vs-background contrast ≥ 3:1; body text ≥ 4.5:1
- Colour never the sole channel (paired with position, pattern, or direct labels)
- Colourblind-safe palettes (protanopia/deuteranopia/tritanopia tested)
- True alt-text: insight sentence, not description ("Bar chart showing EMEA doubled in Q3")

### Interaction Notes

- Default state works as static image (no-JS fallback in `index.html`)
- Interaction = progressive disclosure (hover/focus reveals values; never hides essential labels)
- Motion only for object constancy (axis transitions, filtering)
- Opt-in sound (WebAudio synthesis, muted by default, toggle in nav)

### Data Sources

All visualizations use real, cited data:
- UN World Population Prospects 2024
- Ember Climate 2024
- Ghana Statistical Service
- Other sources documented in `references/sources.md` and per-spread metadata

### Contact

- GitHub issues: https://github.com/karefined-eng/information-is-beautiful-skill/issues
- Author: karefined (https://github.com/karefined-eng)

---

*This AGENTS.md is also available at the project root and in the skill's documentation.*