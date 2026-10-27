# Agentic Skills & Information Design Research

This file records the external research that shaped the `information-is-beautiful` skill's design, packaging, and distribution decisions. Per the project's documentation standards, research-backed intent lives here — UI decisions are justified by documented evidence, not generic aesthetics.

---

## 1. Agentic skills space — top repos by stars (2026)

Researched October 2026. The "agentic skills" category on GitHub has exploded; the leading repositories are:

| Rank | Repository | Stars | Description |
| ---- | ---------- | ----- | ----------- |
| 1 | obra/superpowers | ~301K | Agentic skills framework & software development methodology |
| 2 | affaan-m/ECC | ~277K | Agent harness performance optimization (skills, memory, security, research-first) |
| 3 | mattpocock/skills | ~260K | Practical skills for real engineers |
| 4 | addyosmani/agent-skills | ~105K | Production-grade engineering skills for AI coding agents (Claude Code, Cursor) |
| 5 | sickn33/agentic-awesome-skills | ~48K | 2,700+ installable skill playbooks with an agent-first control plane |

Key trends:
- **Rapid growth** in agentic frameworks and performance-optimization tools is the dominant theme.
- **Python and TypeScript** dominate; TypeScript quickly catching up.
- **Specialized agents** rising (health, finance).
- Three of the top five agentic *frameworks* (Langflow 146K, Dify 136K, Flowise 51K) are **visual, low-code builders** — a trend toward accessibility.

Source: live GitHub research, October 2026.

---

## 2. Ponytail structure analysis — trending levers to replicate

Researched via `DietrichGebert/ponytail` README and GitHub topics API (October 2026). Ponytail is the most trending skill for the `agent-skills` topic. Its structure and tactics:

**Top-of-README badges** — stars, release version, npm version, "works with 20 agents", MIT license, Trendshift badges (daily/weekly/monthly), Star History chart link.

**Before/after proof** — a single strong before/after visual (date picker: 335 lines vs 10 lines) that quantifies impact (-53% code, -41% time, -26% cost, -45% tokens). Benchmarked in Claude Code with method, per-task tables, and limits.

**Clear command set** — `/ponytail`, `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-band`, `/ponytail-help` — each with a one-line description and target modes.

**Install per agent** — separate blocks for Claude Code, Codex, and "any other agent" (AGENTS.md copy), plus INSTALL.md for Copilot/Cursor/OpenCode/Gemini.

**GitHub topics** (from API): `agent-skills`, `ai-agents`, `claude`, `claude-code`, `claude-code-plugin`, `cursor-rules`, `developer-tools`, `llm`, `prompt-engineering`, `yagni`.

**Distribution** — one-command install, no binaries, SKILL.md + AGENTS.md dual path (progressive disclosure).

**Release cadence** — 29 releases, latest v5.3.2; notes-only releases, no zip attachments (distribution flows through installers).

**What we applied:**
- README badges (stars, release, agent compat, MIT) ✓
- One-command `npx skills add` install ✓
- Before/after demo gallery (rebuilt as creative-moves gallery) ✓
- CHANGELOG.md + tagged releases v1.0.0–v1.2.0 ✓
- GitHub topics matching ponytail's set ✓
- SKILL.md + references/ loaded on demand (progressive disclosure) ✓

---

## 3. Google Trends / informationisbeautiful.net hype analysis (2025)

Researched October 2026. Key findings:

- **Google Trends shows barely any hype** around informationisbeautiful.net in 2025 — search interest has declined from its peak years.
- **The field has shifted** from "romantic"/experimental visualization (NYT's 512 Paths, Periscopic's Gun Deaths, scrollytelling) to practical, mobile-first, AI-assisted workflows. Shirley Wu and Moritz Stefaner have argued the craft of web data storytelling has plateaued.
- **Tooling shifted to low-code/AI-assisted platforms:** Tableau Public, Datawrapper, Flourish, PowerBI, Canva, Figma, Looker, plus Copilot/ChatGPT writing Python. People now generate charts with a click or a prompt rather than hand-coding D3.
- **Data Visualization Society 2025 State of the Industry:** 58% of visualizers used AI in their work (up 21 points from 2024); 53% believe interest in data viz is increasing (down from 63% in 2024); top urgent issues are data-viz literacy, ethical standards, algorithmic bias.
- **informationisbeautiful.net itself is still active** (TED talk embed, Beautiful News, Dataviz of the Month, Awards 2025) but the *hype* has moved elsewhere.

**Implication for our skill:** The skill's value is not in chasing trendy aesthetics or "viral" viz. It's in **judgment and honesty** — matching form to data, auditing claims, citing sources. Stay tool-agnostic and portable so it works inside AI-assisted workflows where the actual viz gets generated. Focus on provenance and checkable laws over aesthetics.

Sources: PolicyViz "Where is Data Visualization Innovation?" (May 2025); DVS State of the Industry 2025; Google Trends; informationisbeautiful.net (2025-2026 pages).

---

## 4. Impeccable skill lessons applied

The impeccable skill (frontend design review/audit) teaches patterns that apply directly to an information-design skill:

| Impeccable principle | How we applied it |
| -------------------- | ----------------- |
| **Progressive disclosure** — load references on demand | `references/` (chart-matcher, palettes, checklist, sources, creative-moves) loaded only when needed; SKILL.md stays ~1,400 words |
| **Onboarding first** — guide user through options before acting | Added Onboarding section: purpose, audience, output medium, data source, request mode, colour channel, accessibility, reading depths, failure tolerance + creativity score dial |
| **Design every edge state** — empty, single point, ties, nulls, negatives, zero-as-meaningful | "Design every data reality" section in SKILL.md |
| **Accessibility as a floor** — contrast ≥3:1 marks / ≥4.5:1 text, colour never only channel, true alt-text | Accessibility floor section in SKILL.md |
| **UX copy as narration** — title states insight not topic; alt-text says what it shows | Law V (annotation is narration); TED Talk Insights section |
| **Harden the handover** — graphic + insight sentence + source line + checklist result | Output guidance requires all four; creative-moves failure modes enforce the same |

Nothing new to build — we already carry most of impeccable's lessons. If anything, tighten onboarding copy to match impeccable's directness: fewer words, clearer decisions.

---

## 5. Decisions traced to research (audit trail)

- **One-command `npx skills add` install** → ponytail / addyosmani pattern (distribution through installer, not release assets)
- **Badges at README top** → ponytail house style (stars, release, compatibility, license)
- **Tagged releases v1.0.0–v1.2.0 + CHANGELOG.md** → ponytail (29 releases), rea (30), superpowers (16), mattpocock (9), ECC (19), addyosmani (15); Anthropic's zero-release repo is the outlier
- **GitHub topics set** → ponytail's topic list (`agent-skills`, `claude-code`, `data-visualization`, etc.)
- **Creative-moves ingenuity layer** → response to "hype has declined" research; skill teaches craft (moves), not templates (never redraw spreads)
- **Creativity score dial + onboarding** → impeccable's progressive disclosure + user-owned configuration
- **Portable, pure-markdown, no binaries/network** → contrasts with tool-wrapper skills (seo-audit, geo-audit) that require CLI installs; knowledge skill installs by copying a folder

---

## 6. What we deliberately did NOT copy

- **Template-library approach** — we name iconic formats (Billion-Dollar-o-Gram, Snake Oil Supplements, etc.) as concepts with lineage, never redraw spreads (legal/provenance line from sources.md)
- **Repo-specific machinery** (Geist components, Vercel design system) — our skill is pure markdown, works with any agent
- **Skill-integrity meta-rules** — change governance lives in docs/origin.md, not SKILL.md
- **Zip attachments on releases** — distribution flows through `npx skills add`, not release assets
