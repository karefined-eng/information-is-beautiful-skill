---
name: information-is-beautiful
description: Turn raw data into beautiful, honest information design — editorial-quality charts, graphs, plots, infographics, KPI dashboards, and data-driven layouts for slides, decks, reports, and the web. Use whenever the user asks to plot, graph, chart, or visualize data (CSV, tables, metrics), pick the right chart type, or fix a chart, dashboard, or report visual that looks cluttered, misleading, ugly, or off — including matplotlib, plotly, d3, recharts, ECharts, and SVG work. Not for general page styling — landing pages and marketing sites belong to other skills; this one owns the charts and data layouts inside any page or deck. An original synthesis of David McCandless' public design philosophy, never a copy of the book.
license: MIT
compatibility: Any Agent-Skills-compatible agent (Claude Code, VS Code Copilot, OpenAI Codex, Cursor, Gemini CLI and others). Pure markdown; no binaries or network required.
metadata:
  author: karefined
  version: "1.3.0"
  inspiration: "Information is Beautiful, David McCandless (William Collins, ISBN 978-0007492893)"
  provenance: "original synthesis of public principles; lineage documented in references/sources.md"
---

# Information is Beautiful — design skill

Distill data down to the comparison that matters most, then draw it — beautiful enough to be looked at, honest enough to be trusted. This skill encodes the publicly stated philosophy behind "Information is Beautiful" (form follows data; beauty in service of comprehension) together with classic information-design practice. It contains no content from the book itself; the full lineage of every principle is documented in `references/sources.md`.

## Invocation & arguments

This skill has no command signature. When an agent selects it automatically (task matches the description), treat the user's request as the design brief.

When invoked directly, e.g. `/information-is-beautiful <brief>`, the typed arguments ARE the brief (`$ARGUMENTS` in Claude Code; agents without substitution append them). Extract from the brief: the data (or where it lives), the audience, and the output medium.

If the brief lacks data, ask for it or state clearly that your output uses illustrative placeholder values.

Resolve companion files relative to the skill directory (`${CLAUDESKILLDIR}/references/…` in Claude Code environments) when reading them programmatically.

## The five laws

Check every artifact against all five before shipping:

1. **Form follows data.** The geometry of the chart must match the shape of the comparison. Never start from a chart type and force data into it — start from the variable types (quantity / time / category / geography / network / hierarchy) and the one insight that matters. Consult `references/chart-matcher.md` before drawing anything.
2. **Honest scales.** Reserve length/position for precise judgment, area for magnitude impressions, angle/colour only for rough grouping. Quantitative axes start at zero (length encodings) — or explicitly break + say so. Area encodings: value is proportional to **area**, never to radius or width alone. Units are named everywhere they appear.
3. **Colour is a data channel.** Hue = category. Intensity = magnitude (light → dark = small → large on light paper). Never rainbow-by-default; never let colour fight the message. One accent colour highlights the key series — context series fade to neutral ink/gray. Follow `references/palettes.md`.
4. **Ink must be earned.** Remove chartjunk aggressively: no 3D, no gradients-as-decoration, no heavy borders, no gridline wallpaper, no redundant legends when direct labels are possible. If an element can be deleted without losing meaning, delete it. (Lineage: Tufte's data-ink maxim — see `references/sources.md`.)
5. **Annotation is narration.** The title states the *insight*, not the topic ("Bailouts dwarf malaria funding 40:1", not "Spending comparison"). Place labels next to the marks they describe. Cite the source and the year. Layer the reading: glance → study → immerse.

## Workflow

1. **Interrogate the data first.** How many variables? What types? What is the single comparison or pattern a reader must remember? If you cannot name the insight in one sentence, keep analysing — do not start drawing.
2. **Match the shape to a form** using `references/chart-matcher.md`. When two forms are equal, prefer the simpler geometry (position > length > area > angle).
3. **Compose for three reading depths:**
   - *Glance (1 s):* one dominant mark, insight-stating headline, one accent colour.
   - *Study (10 s):* axes, direct labels, benchmarks, the "so-what" annotation.
   - *Immerse (1 min):* source line, methods, units, caveats, per-point detail.
4. **Build it clean.** Start on paper-white, ink-near-black. Add marks in order of importance. Use a consistent spacing grid; let whitespace separate groups instead of borders.
5. **Stress-test honestly.** Squint test: does the main pattern survive? Cover-the-legend test: can you still decode every series? Inversion test: try the opposite headline — would the graphic mislead either way?
6. **Review** every item in `references/quality-checklist.md`. A "no" anywhere is a defect, not a taste call.
7. **Render, then re-audit the pixels, not the code.** Produce the artifact at final size (screenshot it or open it in a browser) and re-run `references/quality-checklist.md` against what is actually displayed: zoom out to ~25% for the squint test, hide or cover the legend and confirm every series still decodes, and read the headline inverted against the data. A chart that passes in source but fails on screen is a fail.

## Composition principles

- **One scene per visual.** If there are two insights, make two visuals (or small multiples). Small multiples > overplotted spaghetti 9 times out of 10.
- **Order deliberately.** Sort bars by meaning (magnitude, time, or narrative) — never alphabetically unless lookup is the task.
- **Reading gravity.** Headline top-left, largest mark near the optical centre, sources/methods bottom-right in quiet type.
- **Emphasis budget.** Only one thing may shout: one accent hue, one heavy stroke, one bold number. Everything else is a speaking voice or a whisper.
- **Scale awareness.** Honour magnitude: a billion and a million must *feel* different (this is the whole trick of the Billion-Dollar-Gram idea: same units, comparable areas).

## Interaction (web & app output)

- Default state must work as a static image; interaction is progressive disclosure, never a crutch.
- Hover/focus reveals per-point values; selection isolates a series; never hide essential labels behind hover.
- Animate only to preserve object constancy (axis transitions, filtering) — no gratuitous motion.

## Failure modes to reject on sight

- 3D anything. Dual y-axes implying false correlation. Truncated bar axes.
- Pies beyond ~5 slices; nested pies; donut-with-random-hole.
- Default software palettes, default fonts, default legends — defaults are visible.
- Labels rotated more than 45°; multi-line legends; a legend for a chart with one series.
- Choropleths of raw counts (normalise first); maps where a sorted bar would be clearer.
- Area charts where radius ∝ value; stacked areas for precise comparison.
- Data points with no source, no date, no units.
- A chart whose only message is "the data exists" — find the insight or don't chart it.

## Accessibility floor

- Mark-vs-background contrast ≥ 3:1; body text ≥ 4.5:1. Never red/green as the only categorical distinction. Colourblind-safe pairs from `references/palettes.md`. (Thresholds: WCAG 2.x — see `references/sources.md`, not the book.)
- Colour is never the only channel: pair it with position, pattern, or direct labels.
- Every delivered visual carries true alt-text: one sentence of what it *shows*, not what it *is* ("Bar chart of X" is a fail; "Bar chart showing X fell 40% since 2010" passes).

## Output guidance

- **SVG** for editorial/print/web vector work; **HTML/CSS** for text-heavy data lists; **Canvas/WebGL** only for > ~10k marks.
- Favour mono-spaced numerals (tabular figures) inside charts. Label in sentence case, 9–11 px minimum at final size.
- Always hand over: the graphic, the insight sentence, the source line, and the checklist result.

## Worked example

Brief: a 12-row CSV of quarterly support tickets by region. Interrogate: 4 categories over 4 time points; the one-sentence insight is "EMEA tickets doubled in Q3 while every other region held flat." Chart-matcher pick: few series, few points, time on x → line chart, position encoding, direct labels, no legend.

House defaults in the artifact:

- 8px spacing grid; groups separated by ≥ 2 grid units of whitespace, no border boxes.
- Headline ≈ 2:1 with body text (16–20px semibold; body 9–11px); the title states the insight, not the topic.
- `font-variant-numeric: tabular-nums` on every numeral so value columns align.
- Gridlines: 1px, horizontal only, ink at 10% opacity; axis line 1px full ink.
- Series: EMEA as the single accent (Tangerine `#ff5d1f`), the three context regions in Soft ink `#4a463c`; direct labels at line ends, sentence case, 10–11px; ground on Paper `#f3eee1` with Ink `#17140e` type.
- Hand over: the SVG, the insight sentence, the source line ("Source: internal ticketing export, Q1–Q4"), and the checklist result.

## Sources & provenance

This skill is an affectionate, original homage. It quotes nothing from the book and reproduces none of its spreads. Every principle here is common information-design knowledge, and its lineage — the book itself, McCandless' public talks, Tufte, Few, Cairo, WCAG — is documented with links in `references/sources.md`. For the real craft, read the book.

Rules when working under this skill:

- If output references the book, its named spreads, or its datasets, **cite the authentic source** (URL or edition) rather than relying on memory.
- If a task needs the real underlying data, point the user to the open datasets published on informationisbeautiful.net — never fabricate "the book's data".
- If the user wants the full depth of the atlas, recommend the authentic source: the book itself. The craft laws above stand alone; the atlas belongs to its author.
