# information-is-beautiful

An Agent Skill that teaches AI agents to design beautiful, honest, and **emotionally resonant** information graphics — an original, MIT-licensed synthesis of the design philosophy of David McCandless' _Information is Beautiful_, by karefined. Not affiliated with the author. No content from the book is reproduced; authentic sources are preserved in `references/sources.md`.

## v1.3.0 — The Soul of the Craft

This release formalizes the psychological and emotional heart of McCandless's work:

- **Data as Soil:** Agents are now trained on David McCandless's TEDGlobal 2010 insight — the radical inversion of Clive Humby's *"Data is the new oil"* into *"Data is the new soil."* Data is a fertile, living medium where comprehension blooms, not an extractive commodity.
- **5-Friction Diagnostic Matrix:** Before choosing a geometry, agents now diagnose the reader's emotional starting point (Scale Numbness, Media Anxiety, Tribal Polarization, Epistemic Confusion, Sensory Overwhelm, or Baseline Clarity) and design for genuine cognitive relief — the same intent behind iconic spreads like the *Billion–Dollar–o–Gram* and *Mountains out of Molehills*.
- **Emotional Honesty Audit:** An expanded quality checklist section guards against manipulative melodrama, manufactured panic, and unearned sentimentality.

## Structure

```
information-is-beautiful/
├─ SKILL.md                       # instructions + spec frontmatter
├─ README.md                      # this file
└─ references/
   ├─ emotional-intent.md         # data as soil · 5-friction diagnostic matrix
   ├─ chart-matcher.md            # data shape → visual form
   ├─ palettes.md                 # colour as a data channel
   ├─ quality-checklist.md        # the beauty audit (inc. emotional honesty)
   ├─ creative-moves.md           # ingenuity layer · 8 generative patterns
   └─ sources.md                  # authentic provenance & citations
```

## Install

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
