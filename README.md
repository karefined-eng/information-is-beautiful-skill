# information-is-beautiful

<p align="center">
  <a href="https://github.com/karefined-eng/information-is-beautiful-skill/stargazers"><img src="https://img.shields.io/github/stars/karefined-eng/information-is-beautiful-skill?style=flat-square&color=111111&label=stars" alt="Stars"></a>
  <a href="https://github.com/karefined-eng/information-is-beautiful-skill/releases"><img src="https://img.shields.io/github/v/release/karefined-eng/information-is-beautiful-skill?style=flat-square&color=111111&label=release" alt="Release"></a>
  <img src="https://img.shields.io/badge/works%20with-Claude%20Code,%20Codex,%20Cursor,%20ZCode-111111?style=flat-square" alt="Works with agents">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license"></a>
</p>

<p align="center">
  An Agent Skill that teaches AI agents to design beautiful, honest information
  graphics — an original, MIT-licensed synthesis of the design philosophy of
  David McCandless' _Information is Beautiful_, by karefined. Not affiliated with
  the author. No content from the book is reproduced; authentic sources are
  preserved in `references/sources.md`.
</p>

<p align="center">
  <img src="https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/ranking.svg" width="100%" alt="Ranking demo: world populations, before &amp; after" />
</p>

<p align="center">
  <strong>Proof — before/after demos.</strong> Each pair draws the same real,
  cited dataset twice: the left panel is default-software slop; the right panel
  follows the skill's five laws. Same data, honest insight.
</p>

## Proof — before/after demos

### 1 · Ranking → sorted bars (most universal)
[![world populations before/after](https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/ranking.svg)](https://github.com/karefined-eng/information-is-beautiful-skill/blob/main/examples/ranking.svg)

UN World Population Prospects 2024. The slop panel sorts alphabetically and clips
the axis at 500M, so India and China look identical. The skill sorts by magnitude,
accents India and China in tangerine, and states: *India has passed China as the
world's most populous nation.*

### 2 · Composition → aggregated stacked bar (the expertise move)
[![world electricity mix before/after](https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/composition.svg)](https://github.com/karefined-eng/information-is-beautiful-skill/blob/main/examples/composition.svg)

Ember Global Electricity Review 2024. Slop: an illegal 8-slice exploded 3D pie.
Skill: aggregate to Fossil 59% vs Low-carbon 41%, then break out coal/gas/hydro/
nuclear/wind/solar beneath — knowing which chart to stop drawing.

### 3 · Time → line (localization)
[![Ghana inflation before/after](https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/before-after.svg)](https://github.com/karefined-eng/information-is-beautiful-skill/blob/main/examples/before-after.svg)

Ghana Statistical Service CPI. Slop: a 3D pie of rates over time. Skill: a
time-proportional line; "Ghana cut inflation from 54% to 5% in three years."

---

## Structure

```
information-is-beautiful/
├─ SKILL.md                       # instructions + spec frontmatter
├─ README.md                      # this file
├─ CHANGELOG.md                   # version history
└─ references/
<<<<<<< HEAD
    ├─ chart-matcher.md           # data shape → visual form
    ├─ creative-moves.md          # eight generative patterns for unforgettable forms
    ├─ palettes.md                # colour as a data channel
    ├─ quality-checklist.md       # the 25-point beauty audit
    ├─ sources.md                 # authentic provenance & citations
    └─ ted-law-mapping.md         # TED talk insights → five laws mapping
=======
   ├─ chart-matcher.md            # data shape → visual form
   ├─ palettes.md                 # colour as a data channel
   ├─ quality-checklist.md        # the 25-point beauty audit
   ├─ sources.md                  # authentic provenance & citations
   └─ creative-moves.md           # the ingenuity layer (v1.2.0)
>>>>>>> origin/educated-kidney
```

## Install

**One command (any Agent-Skills-compatible agent):**
```bash
npx skills add karefined-eng/information-is-beautiful-skill
```

**ZCode (personal — every project):**
```bash
cp -r information-is-beautiful ~/.agents/skills/
ln -s ~/.agents/skills/information-is-beautiful ~/.zcode/skills/
```

**Claude Code (personal — every project):**
```bash
cp -r information-is-beautiful ~/.claude/skills/
```

**Claude Code (project — travels with the repo):**
```bash
cp -r information-is-beautiful .claude/skills/
```

**Any other Agent-Skills-compatible agent** (VS Code Copilot, OpenAI Codex,
Cursor, Gemini CLI, …): place the folder wherever that client loads skills, or
point it at `SKILL.md`. The skill is pure markdown — no binaries, no network.

**Fast alias:** also install `iib/` (16-line wrapper) for `/iib` shorthand.

## Use — commands & arguments

The skill follows the agentskills.io progressive-disclosure model, so most of
the time you do nothing: the agent sees `name` + `description` at session start
and pulls in the guidance automatically whenever your task involves charts,
infographics, dashboards, or data-driven layout.

Explicit use in Claude Code — the folder/frontmatter name becomes a slash
command, and **everything after the command is passed to the skill as its task
arguments**:

```
/information-is-beautiful                                    # load the full guidance
/information-is-beautiful redesign this bar chart honestly   # guided task
/information-is-beautiful pick the right form for:           # routed to chart-matcher
  country, gdp_2024, gdp_2014, population
/information-is-beautiful audit this SVG against the checklist
```

Fast alias:
```
/iib redesign this bar chart honestly
```

Automatic triggers (no command needed — the description match does it):

- "make me a dashboard of these metrics"
- "this chart feels off, fix it"
- "turn this CSV into an infographic"

Tips:

- Mention a reference by name to route the agent straight to it
  ("use the chart-matcher", "run the beauty audit", "check the palette").
- The skill is invoked per turn; re-invoke whenever you want a fresh audit.

## Request modes

| Mode | Typical request | Required behavior |
| ---- | --------------- | ----------------- |
| **Shape** | "How should I visualize this?", a dataset with no settled chart | Interrogate the data, pick the form via `references/chart-matcher.md`, define the insight sentence. Do not draw unless asked. |
| **Build** | "Make a chart of this", "turn this CSV into an infographic" | Apply the five laws end to end; deliver the artifact plus insight sentence, source line, and checklist result. |
| **Audit** | "What's wrong with this chart?", "is this misleading?" | Score against `references/quality-checklist.md`; report findings ordered by reader impact, each with the smallest concrete fix. Do not edit unless asked. |
| **Fix** | "This chart is misleading / ugly / cluttered" | Diagnose against the laws, then make the smallest change that restores honesty and legibility. |

A **material** change alters what the reader will conclude from the data — scale, comparison, emphasis, or omissions. Recolouring and label wording usually are not material; a changed baseline or a dropped series always is.

## The five laws

Check every artifact against all five before shipping:

1. **Form follows data.** The geometry of the chart must match the shape of the comparison. Never start from a chart type and force data into it — start from the variable types (quantity / time / category / geography / network / hierarchy) and the one insight that matters. Consult `references/chart-matcher.md` before drawing anything.
2. **Honest scales.** Reserve length/position for precise judgment, area for magnitude impressions, angle/colour only for rough grouping. Quantitative axes start at zero (length encodings) — or explicitly break + say so. Area encodings: value is proportional to **area**, never to radius or width alone. Units are named everywhere they appear.
3. **Colour is a data channel.** Hue = category. Intensity = magnitude (light → dark = small → large on light paper). Never rainbow-by-default; never let colour fight the message. One accent colour highlights the key series — context series fade to neutral ink/gray. Follow `references/palettes.md`.
4. **Ink must be earned.** Remove chartjunk aggressively: no 3D, no gradients-as-decoration, no heavy borders, no gridline wallpaper, no redundant legends when direct labels are possible. If an element can be deleted without losing meaning, delete it. (Lineage: Tufte's data-ink maxim — see `references/sources.md`.)
5. **Annotation is narration.** The title states the *insight*, not the topic ("Bailouts dwarf malaria funding 40:1", not "Spending comparison"). Place labels next to the marks they describe. Cite the source and the year. Layer the reading: glance → study → immerse.

## Workflow

1. **Interrogate the data first.** How many variables? What types? What is the single comparison or pattern a reader must remember? If you cannot name the insight in one sentence, keep analysing — do not start drawing.
2. **Match the shape to a form** using `references/chart-matcher.md`. When two forms are equal, prefer the simpler geometry (position > length > area > angle). If the honest form is correct but *forgettable* — the insight lives between charts, in a juxtaposition or a second dimension — consult `references/creative-moves.md` before settling.
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

## Design every data reality

The happy path is not the data. Before delivery, check how the artifact behaves with: an empty dataset; a single point; ties; missing or null values; outliers far outside the range; negative, decimal, and huge values; zero as a meaningful value; more categories than fit; labels longer than their space; and numerals, currencies, or units localized differently (including RTL). Choose each treatment deliberately — a chart that only works on the average case is a defect.

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
- For audits, lead with findings ordered by reader impact: first anything that misleads (scale, omission, false emphasis), then legibility failures, then craft. Each finding names where it is, which law it breaks, the consequence for the reader, and the smallest concrete fix.

## Distribution

Share the zip, commit the folder into a repo's `.claude/skills/`, or package it
inside a plugin for a Claude Code marketplace
(`/plugin marketplace add <owner/repo>`). MIT — remix freely; just don't imply
affiliation with or endorsement by David McCandless, and keep
`references/sources.md` intact so provenance survives the fork.