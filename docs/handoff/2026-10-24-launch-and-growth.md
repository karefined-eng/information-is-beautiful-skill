# Handoff — launch, research & growth roadmap

Written 2026-10-25, covering the launch sprint of 2026-10-24. Read `docs/origin.md`
first for the origin story; this file is the operational + strategic record.

## Current state

- **Repo:** https://github.com/karefined-eng/information-is-beautiful-skill (public, MIT,
  `main` branch-protected: no force-push, no deletion, no PR requirement — solo workflow)
- **Site:** https://information-is-beautiful-skill.vercel.app (Vercel project
  `information-is-beautiful-skill`; deploys with `npx vercel --prod --yes`)
- **Skill:** `skills/information-is-beautiful/` v1.0.0 — installable via
  `npx skills add karefined-eng/information-is-beautiful-skill`, listed on skills.sh
  (page: `skills.sh/karefined-eng/information-is-beautiful-skill/information-is-beautiful`,
  install counter active)
- **Local install:** `~/.agents/skills/information-is-beautiful/` + `~/.zcode/skills/` symlink.
  Re-sync after edits: `rm -rf ~/.agents/skills/information-is-beautiful && cp -r skills/information-is-beautiful ~/.agents/skills/`
- **Google verification** file deployed at `/googlee12d9cb5dc350ba4.html` — Search Console
  "Verify" click still pending (owner action).

## Research archive

### Ecosystem leaderboard (verified via GitHub API, 2026-10-24)

| Repo | Stars | What it is |
|---|---|---|
| morluto/rea | 377.8K | "Reverse Engineer Anything" — MCP for RE; #1 in topic:agent-skills; created 2026-04 |
| obra/superpowers | 304.6K | agentic skills framework & methodology |
| mattpocock/skills | 302.4K | "Skills for Real Engineers" collection |
| affaan-m/ECC | 288.0K | agent harness performance optimization |
| DietrichGebert/ponytail | 175.4K | single persona skill ("laziest senior dev") |
| anthropics/skills | 183.5K | official skills repo |
| Leonxlnx/taste-skill | 101.9K | art direction + real-browser check (closest niche) |
| tt-a1i/archify | 88.7K | interactive diagrams |
| cathrynlavery/diagram-design | 60.7K | editorial diagram design — closest niche comp |
| blader/humanizer | 60.2K | removes AI-writing tells |
| ComposioHQ/awesome-claude-skills | 77.8K | curated list — PR target for listing |

### The patterns that make skill repos trend

1. **Installer ergonomics first.** `npx skills add owner/repo` must succeed. Winners place
   skills at `skills/<name>/` or `.agents/skills/<name>/`; many add multi-agent plugin dirs
   (`.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/` … — ponytail claims 20 agents).
2. **README as landing page.** Centered hero image, one-line persona tagline, badges
   (stars/license/skills.sh/npm), **measured numbers** (ponytail: "-53% code, -41% time,
   39 tasks × 5 runs"), quick install at top, social proof section.
3. **Sharp positioning.** One memorable idea per repo (lazy senior dev / humanizer / taste).
4. **Topic SEO.** Winners carry 10–20 topics; we run 11 (incl. `iib`).
5. **Launch loop beats naming.** REA: 0 → 377K in ~6 months via trendshift, Discord, a real
   website (rea.tools), npm package, and 24-language i18n.

### skills CLI internals (from `skills@latest/dist/cli.mjs` source — verified empirically)

- Discovery: shallow git clone, then walks skill containers (root, `skills/`,
  `skills/.curated/`, `.agents/skills/`, `.claude/skills/`, … 30+ prefixes) up to **three
  levels deep**; `--full-depth` extends. A `.claude-plugin/marketplace.json` with
  `"skills": ["./skills/<name>"]` is also honored.
- Frontmatter parsed with **strict YAML**: an unquoted scalar containing `): ` (colon-space)
  breaks parsing → the CLI reports only "No skills found". Debug with `npx skills add <repo> -l`
  (list mode prints per-file YAML warnings). See also global AGENTS.md quirks.
- Installs phone home to skills.sh telemetry → installs create/feed the directory listing
  and its ranking. No manual registration exists.
- Installs resolve via `os.homedir()` (USERPROFILE on Windows) — overriding MSYS `$HOME`
  does NOT isolate a test; override `USERPROFILE` instead.

### Acronym-repo lessons (REA / ECC anatomy)

- The acronym is a **handle, never the discovery surface**: REA's H1 is
  "REA: Reverse Engineer Anything"; its GitHub description contains no "REA". Keywords
  live in description + topics; the short handle lives in repo name, npm, domain (rea.tools).
- Winning acronyms encode the **benefit** ("Reverse Engineer Anything"), not the inspiration.
  "IIB" encodes the book title — so we paired it as a handle (`information-is-beautiful (IIB)`
  in the README H1, `iib` topic, `iib://loading` easter egg, `iib-sound` pref key) and did
  **not** rename. A second `iib` alias-skill would split the skills.sh install count — avoid.
- Future home of the handle: **`iib.tools` or `iib.design`** when a domain is bought
  (rea.tools pattern; main domain canonical for SEO, short domain aliased).

### Effectiveness review of the skill (Explore agent, 2026-10-24)

Verdict was: **explicit invocation strong; auto-trigger moderate-to-strong.** Gaps found and
fixed: trigger vocabulary (added plot/graph/KPI/CSV/library names/complaint phrasings),
executable checks (added render-and-re-audit workflow step), missing example (added worked
example with numeric house defaults from palettes.md). Remaining known ceiling: no lint
script (kept pure-markdown on purpose — compatibility line promises "no binaries").

## Audit baselines & results

- **SEO (SEOmator 5.1.0, 373 rules, crawl+CWV):** 84 (B) → **87 (B)** after fixes; rules
  measured grew 4× (269 → 911 passes) after dropping the single-file build.
  Fixes shipped: canonical, OG/Twitter tags + 1248×832 og:image, favicon.svg, JSON-LD
  (WebSite/Person/SoftwareApplication), shortened description, robots.txt, sitemap.xml,
  llms.txt, AGENTS.md, 5 security headers (vercel.json), chunked build (HTML 475KB → 5.3KB),
  static no-JS fallback content inside `#root` (React replaces it on mount).
  Remaining flags are mostly the crawler scoring `.md`/`.svg` files as HTML (tool artifact —
  do not "fix"; the files must stay crawlable). Accepted design choice: 10–11px mono labels.
- **GEO (seomator-geo-audit 1.2.1):** 17 (poor) → **79 (good)**; citability 0→91,
  technical 90→100, schema 0→87, platform 0→93, content 39 (laggard). Evidence PARTIAL only
  because `.md` pages are correctly skipped as not_html. Re-run:
  `geo audit https://information-is-beautiful-skill.vercel.app --json`
- Re-run SEO: `seomator audit https://information-is-beautiful-skill.vercel.app --crawl -m 20 --format llm`
  (add `--no-save` to avoid polluting history).

## Growth roadmap (ranked by leverage)

1. **Hero visuals + before/after examples** in the README — this niche trends on visual proof
   (diagram-design and taste-skill live on it). Screenshot the site; render one chart with the
   skill vs. a default-software chart.
2. **Honest benchmark** — even 10 chart tasks, with vs. without the skill, scored against our
   own quality-checklist; publish the numbers ponytail-style.
3. **Distribution spikes** — PR to ComposioHQ/awesome-claude-skills; launch posts (X, r/ClaudeAI,
   LocalLLaMA); installs feed the skills.sh ranking loop.
4. **Prerender the React app** at build time — the last real SEO/GEO gap (raw HTML still only
   carries the fallback summary; full content is JS-gated). React-SSG or @prerenderer.
5. **Sibling skill / collection** (e.g. dashboard-design) — collections trend bigger; only after
   proof. Keep one listing per skill to avoid splitting install counts.
6. **npm package + install.sh + more agent plugin dirs** (rea/codex pattern).
7. **i18n README** (REA runs 24 languages).
8. **Domain** — main: something like informationisbeautiful.design; short alias: iib.tools /
   iib.design. Attaching a Vercel domain: `POST /v9/projects/{id}/domains` (a plain CLI alias
   stays SSO-protected under `all_except_custom_domains`).

## Ops runbook

- Deploy: `npx vercel --prod --yes` from the repo root (builds `npm run build`; `serveSkills`
  plugin copies `skills/` → `dist/skills/` and serves it in dev).
- Security/cache headers live in `vercel.json` — edit there, not in the Vercel dashboard.
- Branch protection is API-managed; settings: force-push ✗, deletion ✗, admin bypass ✓.
- Site URL is the project alias — renaming the Vercel project does NOT move the alias;
  the new-name domain was added via API and the old one removed.
- Local repo lives at `C:\Users\asamoah\information-is-beautiful` (moved out of
  eleviewer/Downloads on 2026-10-24; the old folder husk was deletable after session end).

## Known quirks (site-specific)

- SEO audit flags "2 GA properties G-C, G-J" — false positive from minified bundle content;
  index.html has no analytics.
- SEO audit scores markdown/svg files as HTML pages during crawl → phantom criticals
  (`technical-bad-content-type`, missing og on .md pages). Ignore by rule name.
- Google Fonts rule flags the preconnect URLs for missing `display=swap` — the actual
  stylesheet link has it. False positive.
