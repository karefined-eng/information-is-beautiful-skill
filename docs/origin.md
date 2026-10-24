# origin.md — information-is-beautiful

The foundation record for the skill and this tribute site. Read before proposing
any change to the skill's philosophy, scope, or voice.

## Origin story

`information-is-beautiful` is a bespoke Agent Skill created for karefined,
bundled inside this Vite tribute site (`find-information-is-beautiful-pdf`). It
was **generated as a custom deliverable, not imported from a marketplace**. The
evidence, gathered 2026-10-24:

- The project arrived in `eleviewer/Downloads/` as browser re-downloaded zips
  (`find-information-is-beautiful-pdf.zip`, `(1).zip`, `(3).zip` — the numbered
  suffixes are browser artifacts, not versions).
- The parent `eleviewer` repo's `.gitignore` excludes `downloads/` (line 10), so
  the project was never part of any repository history.
- No ancestor or other copy of the skill exists anywhere on disk (checked
  `~/.claude`, `~/Documents`, `~/Desktop`, the eleviewer repo outside Downloads).
- Frontmatter credits `author: karefined` — the owner's own handle (git user
  `karefined-eng`).
- The only other skill downloads present are unrelated `claude-ai-skill` zips
  (SEO skills), i.e. this project is not part of that import pattern.

The three historical zips were consolidated on 2026-10-24 into one canonical
copy (this project's `skills/information-is-beautiful/`), installed
to `~/.agents/skills/` with a symlink at `~/.zcode/skills/`, and the zips were
deleted after their unique content (the README) was rescued.

## Core reasoning

The skill teaches agents the *craft*, not the book. It is an original synthesis
of principles its authors have made public — McCandless' philosophy (form
follows data; beauty in service of comprehension) resting on the wider public
lineage (Tufte, Cleveland & McGill, Bertin, Few, Cairo, Brewer, WCAG). It
deliberately contains **no content from the book**: every principle is common
information-design knowledge, and `references/sources.md` preserves the full
lineage so citations go to the authentic sources, never to this skill.

Psychological intent: agents default to decorative, default-themed charts.
This skill exists to make an agent's output *honest enough to be trusted and
beautiful enough to be looked at* — enforced through checkable laws, a
decision-table matcher, a gating checklist, and (since v1.2.0) a render-and-
re-audit procedure, so "looks fine" is never accepted without evidence.

## Verified lineage (checked online 2026-10-24)

- ✅ ISBN 978-0007294664 = first edition (2009); ISBN 978-0007492893 = new
  edition (Collins, 6 December 2012, 256 pp.).
- ✅ US edition: _The Visual Miscellaneum_ (Harper Design, Nov 2009,
  ISBN 978-0061748363). *Correction applied:* the US subtitle uses American
  spelling — "A **Colorful** Guide…".
- ✅ The talk is **TEDGlobal 2010** (Oxford, July 2010). *Correction applied:*
  official styling is "TEDGlobal", one word.
- ✅ Open Library record OL44136188M resolves to _Information Is Beautiful_
  (HarperCollins, 2012).
- ✅ WCAG thresholds: ≥ 4.5:1 small text (SC 1.4.3), ≥ 3:1 non-text marks
  (SC 1.4.11) — accessibility standards, not book wisdom.
- ✅ agentskills.io/specification: required frontmatter is `name` (≤ 64 chars,
  kebab-case) + `description`; `license`, `compatibility`, `metadata` optional.
  This skill's frontmatter conforms; its `description` stays under 1024 chars.

## Version history

- **1.0.x (Oct 19)** — original authored versions (zip lineages).
- **1.1.0 (Oct 24)** — consolidation merge: newest content restored to proper
  markdown, README rescued, sources unioned.
- **1.2.0 (Oct 24)** — effectiveness pass: trigger-optimized description,
  render-and-re-audit workflow step, worked example with numeric house
  defaults (all hexes from `references/palettes.md`).
- **1.3.0 (Oct 24)** — renamed the skill from `information-beautiful-design`
  to `information-is-beautiful` at the owner's request, so the folder, spec
  `name`, and slash command match the book title; frontmatter disclaimers
  (not affiliated with the author/publisher) carry the provenance weight.

## Maintenance rule

The canonical copy lives in this project (`skills/information-is-beautiful/`).
After editing it, re-sync the install:

```bash
rm -rf ~/.agents/skills/information-is-beautiful
cp -r public/skills/information-is-beautiful ~/.agents/skills/
```

The `~/.zcode/skills/information-is-beautiful` symlink follows automatically.

## Publication (2026-10-24)

- **Public repo:** https://github.com/karefined-eng/information-is-beautiful-skill (MIT)
- **Live site:** https://information-is-beautiful-skill.vercel.app — the skill is also
  directly downloadable at
  https://information-is-beautiful-skill.vercel.app/skills/information-is-beautiful/SKILL.md
- Repo and Vercel project renamed from `information-is-beautiful` to
  `information-is-beautiful-skill` on 2026-10-24 to keep the trademarked book
  title out of the product's own name; the old Vercel domain was removed
  (404) and the old GitHub URL redirects (301).
- Site additions (2026-10-24): TED talk embedded in the Author section via the
  official TED embed player (CC BY-NC-ND, click-to-load — no TED scripts run
  until the visitor asks), and opt-in UI sounds (WebAudio synthesis, muted by
  default, toggle in the nav, preference persisted).
- The project moved from `eleviewer/Downloads/` to `~/information-is-beautiful`
  before publication; this folder is now the repo root (earlier path mentions
  in this file are historical record, not current locations).
- Vercel Deployment Protection is `all_except_custom_domains`: raw deployment
  URLs stay behind SSO, while the production alias is public by design.
- Topics: `agent-skills`, `data-visualization`, `information-design`, `claude-code`.
