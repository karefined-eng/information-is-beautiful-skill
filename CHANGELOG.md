# Changelog

All notable changes to the `information-is-beautiful` skill. Dates are 2026.

## [1.3.0] — 2026-10-26

- **Added:** `references/ted-law-mapping.md` — maps every insight from David McCandless' TEDGlobal 2010 talk ("The beauty of data visualization") to the five laws, with timestamps and case-study patterns (Billion Dollar Gram, Mountains Out of Molehills, hidden seasonal patterns).
- **Changed:** `SKILL.md` expanded with full workflow, composition principles, failure modes, accessibility floor, and output guidance (now ~15 KB).
- **Changed:** `references/sources.md` updated with TED transcript citation and skill-section → source map.
- **Changed:** `references/creative-moves.md` refined.

## [1.2.0] — 2026-10-25

- **Added:** the ingenuity layer — `references/creative-moves.md`, eight generative
  patterns (one scale for incommensurables, time as terrain, grid a spectrum, mosaic of
  meaning, evidence grid, rank-and-tier, small multiples as story, meta-visual) distilled
  from the publicly known iconic formats. Cited as concepts with full lineage, never redrawn.
- **Changed:** the Workflow now routes to the creative moves when the honest form is
  correct but forgettable.
- **Added:** demo gallery in the README — ranking, composition, and time-series pairs,
  all on real cited data (UN WPP 2024, Ember 2024, Ghana Statistical Service).
- **Fixed:** the site's skill-zip download now works (zip generated at build time).

## [1.1.0] — 2026-10-25

- **Added:** a Request-modes table (Shape / Build / Audit / Fix) with the
  narrowest-mode rule and edit boundaries per mode.
- **Added:** a materiality definition — what counts as a real design decision.
- **Added:** "design every data reality" — a state-coverage list (empty data, single
  point, ties, nulls, outliers, negatives, huge values, long labels, localized numerals).
- **Changed:** audit output now leads with findings ordered by reader impact.

## [1.0.0] — 2026-10-24

First public release.

- Five checkable laws (form follows data; honest scales; colour is a data channel; ink
  must be earned; annotation is narration).
- `references/`: chart-matcher decision table, house palettes with exact hexes, the
  25-point quality checklist, and fully cited provenance (`sources.md`).
- Workflow with render-and-re-audit verification; worked example with numeric defaults.
- Installable via `npx skills add karefined-eng/information-is-beautiful-skill`;
  listed on skills.sh; MIT.