# AGENTS.md — information-is-beautiful

Living operational manual for this repository. All agents must read this before acting.

## Architecture Map

```
information-is-beautiful/
├─ index.html                    # Vite entry, SEO/og tags, static fallback
├─ src/
│  ├─ main.tsx                   # React entry
│  ├─ App.tsx                    # Routes / layout
│  ├─ index.css                  # Design tokens (Fraunces/Space Grotesk/JetBrains Mono, #f3eee1/#17140e)
│  ├─ components/                # UI components (Hero, Atlas, Playground, TheBook, AgentSkill, VizRenderers, etc.)
│  ├─ data/book.ts               # Spread metadata for TheBook component
│  └─ utils/                     # cn.ts, sound.ts
├─ skills/information-is-beautiful/
│  ├─ SKILL.md                   # Agent skill instructions (15 KB)
│  ├─ README.md                  # Skill documentation
│  └─ references/                # Chart-matcher, palettes, quality-checklist, sources, creative-moves, ted-law-mapping
├─ docs/
│  ├─ origin.md                  # Foundation record (origin story, reasoning, lineage, maintenance rule)
│  └─ handoff/
│     └─ 2026-10-24-launch-and-growth.md  # Launch sprint, research, roadmap, ops runbook
├─ public/                       # Static assets (favicon.svg, prints.jpg, google verification)
├─ .vercel/                      # Vercel project config
├─ vercel.json                   # Security headers, SPA routing
├─ vite.config.ts                # Vite config + serveSkills plugin
├─ package.json                  # Dependencies (React, Framer Motion, Tailwind, Lucide)
└─ tsconfig.json                 # TypeScript config
```

**Key systems:**
- **Skill** — Pure markdown, no build. Installed to `~/.agents/skills/` + symlinked to `~/.zcode/skills/`
- **Site** — Vite + React + TypeScript, deployed to Vercel (`information-is-beautiful-skill.vercel.app`)
- **ServeSkills plugin** — Copies `skills/` → `dist/skills/` at build time for direct skill downloads

## Search / Grep Strategies

| Goal | Command |
|------|---------|
| Find skill reference files | `grep -r "pattern" skills/information-is-beautiful/references/` |
| Find React components | `grep -r "pattern" src/components/` |
| Find design tokens | `grep -r "pattern" src/index.css` |
| Find data/spreads | `grep -r "pattern" src/data/book.ts` |
| Find handoff/research | `grep -r "pattern" docs/` |

## Tool Quirks & Environment Traps (Friction Logged This Session)

| Trap | Error | Workaround |
|------|-------|------------|
| PowerShell `&&` chaining | Parser error | Use `;` instead: `cmd1; if ($?) { cmd2 }` |
| `ls -la` in PowerShell | `ParameterBindingException: A parameter cannot be found that matches parameter name 'la'` | Use `Get-ChildItem -Force` or `dir /a` |
| `cd path && cmd` in PowerShell | Parser error | Use `cd path; cmd` or `Set-Location path; cmd` |
| Git not a repo in skill folder | `fatal: not a git repository` | Skill folder is not a git repo; use repo root for git ops |
| WebFetch source unreliability | 404/403 on survey/enterprise sites | Always have fallback sources (Wikipedia, official docs, GitHub README); document "Source unavailable due to [404/403/auth]" and never synthesize statistics |
| Google Trends API rate limiting | HTTP 429 on `trends.google.com` URLs | WebFetch to Trends endpoints returns 429 immediately; use browser-based verification or search console/analytics |
| Research transparency gap | Agents fabricating data when sources fail | When data unavailable, state the specific error; provide analytic answers marked "[Analytical based on available sources]"; never fabricate numerical data |
| Git add on tracked file in ignored directory | `The following paths are ignored by one of your .gitignore files: docs` | When a tracked file lives inside a gitignored directory (e.g., `docs/origin.md` while `docs/` is ignored), use `git add -f <file>` to stage modifications. |
| Vite build execution time with packaging | Command backgrounds or takes >10s | `npm run build` compiles client bundles and packages skill assets via AdmZip; expect 12–60s runtime; use max wait (`WaitMsBeforeAsync: 10000`) before backgrounding. |

## WebFetch Source Reliability Pattern

**Environment Trap:** WebFetch returns variable reliability across sources:
- Sub-pages of surveys often return 404 (URL structure changes)
- Enterprise marketing sites block automated access (403)
- Academic/blog sites may require authentication or be ephemeral

**Workflow guardrail:** When primary source fails:
1. Identify alternative authoritative source (Wikipedia, official docs, GitHub README)
2. If no alternative exists, state clearly: "Source unavailable due to [404/403/auth]"
3. Do not attempt to synthesize statistics from partial data without explicit user request

## Google Trends Access

**Environment Fact:** Google Trends API endpoints rate-limit heavily. WebFetch to Google Trends URLs returns HTTP 429 "Too Many Requests" almost immediately.

**Alternative workflow:**
- Direct user verification: Google Trends website in browser
- Indirect via search console/analytics if available to user
- Document this limitation when findings cannot be fetched

## Research Transparency Policy

When requested data is unavailable:
1. Attempt fetch via available tools (WebFetch, WebSearch if enabled)
2. If unavailable due to rate limits or 404/403, state the specific error
3. Provide analytical answer based on available sources, marked as "[Analytical based on available sources]"
4. Never fabricate numerical data; use phrases like "cannot fetch exact numbers" or "data unavailable via available channels"

## Maintenance Protocol

**After editing the skill** (`skills/information-is-beautiful/`):
```bash
rm -rf ~/.agents/skills/information-is-beautiful
cp -r skills/information-is-beautiful ~/.agents/skills/
```
The `~/.zcode/skills/information-is-beautiful` symlink follows automatically.

**Deploy site:**
```bash
npx vercel --prod --yes
```
Builds via `npm run build`; `serveSkills` plugin copies `skills/` → `dist/skills/`.

**Security headers** — edit `vercel.json`, not Vercel dashboard.

## Origin & Vision

Read `docs/origin.md` before any architectural change. Core intent: teach agents **honest, editorial-quality information design** — five checkable laws, a chart-matcher decision table, a 25-point quality audit. No content from the book; all principles are common knowledge with cited provenance (`references/sources.md`).

## Research-Backed Intent

UI/design decisions for the site are documented in `docs/research/` (see below). The skill's design principles derive from:
- Tufte (data-ink, chartjunk)
- Few (perceptual encoding hierarchy)
- Cleveland & McGill (position > length > angle > area)
- Bertin (retinal variables)
- Brewer (ColorBrewer schemes)
- WCAG 2.x (contrast thresholds)
- McCandless (form follows data; beauty as comprehension aid)

## Handoff Protocol

Significant work → permanent markdown in `docs/handoff/`. Current: `2026-10-24-launch-and-growth.md`.