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