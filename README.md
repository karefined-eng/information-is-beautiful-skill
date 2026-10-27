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
  <img src="https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/ranking.svg" width="100%" alt="Ranking demo: world populations, sorted honest bars" />
</p>

<p align="center">
  <strong>Gallery — creative-moves by default.</strong> The skill ships at creativity
  score 8 / high experimentation: when the honest form is correct but forgettable,
  reach for an ingenious move instead. Each example below shows a real dataset drawn
  in a move from `references/creative-moves.md`, not just default-software slop.
</p>

## Gallery — creative-moves by default

### 1 · One scale for incommensurables
[![world populations](https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/ranking.svg)](https://github.com/karefined-eng/information-is-beautiful-skill/blob/main/examples/ranking.svg)

UN World Population Prospects 2024. Rather than clip an axis at 500M so India and
China look identical, sort by magnitude on one comparable scale — India and China
accented in tangerine, everything else in soft ink. *Insight: India has passed China
as the world's most populous nation.* (Move: one scale for incommensurables — same
unit, comparable areas.)

### 2 · Time as terrain
[![Ghana inflation](https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/before-after.svg)](https://github.com/karefined-eng/information-is-beautiful-skill/blob/main/examples/before-after.svg)

Ghana Statistical Service CPI (Dec 2022 → Sep 2026). Time-proportional line: the
stall in 2024 holds visible, not smoothed away; the holding near 5% is annotated as
the story. *Insight: Ghana cut inflation from 54% to 5% in three years.* (Move: time
as terrain — intensity as landscape across time.)

### 3 · Composition → aggregated stacked bar
[![world electricity mix](https://github.com/karefined-eng/information-is-beautiful-skill/raw/main/examples/composition.svg)](https://github.com/karefined-eng/information-is-beautiful-skill/blob/main/examples/composition.svg)

Ember Global Electricity Review 2024. Aggregate to Fossil 59% vs Low-carbon 41%,
then break out coal/gas/hydro/nuclear/wind/solar beneath — knowing which chart to
stop drawing. (Move: rank-and-tier / aggregation — order by magnitude, cut into
defensible tiers.)

---

## Structure

```
information-is-beautiful/
├─ SKILL.md                       # instructions + spec frontmatter
├─ README.md                      # this file
└─ references/
   ├─ chart-matcher.md            # data shape → visual form
   ├─ palettes.md                 # colour as a data channel
   ├─ quality-checklist.md        # the 25-point beauty audit
   ├─ sources.md                  # authentic provenance & citations
   └─ creative-moves.md           # the ingenuity layer (v1.2.0)
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

Automatic triggers (no command needed — the description match does it):

- "make me a dashboard of these metrics"
- "this chart feels off, fix it"
- "turn this CSV into an infographic"

Tips:

- Mention a reference by name to route the agent straight to it
  ("use the chart-matcher", "run the beauty audit", "check the palette").
- The skill is invoked per turn; re-invoke whenever you want a fresh audit.

## Distribution

Share the zip, commit the folder into a repo's `.claude/skills/`, or package it
inside a plugin for a Claude Code marketplace
(`/plugin marketplace add <owner/repo>`). MIT — remix freely; just don't imply
affiliation with or endorsement by David McCandless, and keep
`references/sources.md` intact so provenance survives the fork.
