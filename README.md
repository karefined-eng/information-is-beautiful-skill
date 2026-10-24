# Information is Beautiful — skill + tribute site

A fan-made tribute to David McCandless' _Information is Beautiful_, and home
of **`information-is-beautiful`** — an MIT-licensed [Agent Skill](https://agentskills.io)
that teaches AI agents to design honest, editorial-quality charts,
infographics, KPI dashboards, and data-driven layouts.

Not affiliated with the author or publisher. No content from the book is
reproduced anywhere — the lineage of every principle is documented and cited
in [`public/skills/information-is-beautiful/references/sources.md`](public/skills/information-is-beautiful/references/sources.md).

## What's inside

```
├─ public/skills/information-is-beautiful/   # the Agent Skill
│  ├─ SKILL.md                               # five laws, workflow, worked example
│  ├─ README.md                              # install & invocation guide
│  └─ references/                            # chart-matcher, palettes,
│                                            # quality-checklist, sources
├─ src/                                      # Vite + React + TS tribute site
│  └─ components/AgentSkill.tsx              # showcases the skill
└─ docs/origin.md                            # origin story & verified lineage
```

## Install the skill

Any Agent-Skills-compatible agent (Claude Code, ZCode, VS Code Copilot,
Cursor, Gemini CLI, …):

```bash
cp -r public/skills/information-is-beautiful ~/.agents/skills/
ln -s ~/.agents/skills/information-is-beautiful ~/.zcode/skills/   # ZCode
cp -r public/skills/information-is-beautiful ~/.claude/skills/     # Claude Code
```

Then invoke it explicitly — everything after the command is the brief:

```
/information-is-beautiful redesign this bar chart honestly
/information-is-beautiful pick the right form for: country, gdp_2024, population
```

…or let it auto-trigger on chart, dashboard, and infographic tasks.

## Run the site

```bash
npm install
npm run dev
```

## License

MIT — see [LICENSE](LICENSE). Remix freely; just don't imply affiliation with
or endorsement by David McCandless or HarperCollins, and keep
`references/sources.md` intact so provenance survives the fork.
