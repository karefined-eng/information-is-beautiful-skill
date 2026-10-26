# Recommendations — Information is Beautiful Skill

This folder contains worked examples of **IIB recommendation write-ups** — the structured critique + fix format used when auditing or improving charts.

## Purpose

When the skill runs in **Audit** or **Fix** mode, it produces recommendations following this template. These samples show the expected depth, tone, and structure.

## Contents

| File | Description |
|------|-------------|
| `battery-dashboard-audit.md` | Full audit of the battery health dashboard (5 charts) |
| `hwmonitor-dashboard-audit.md` | Full audit of the HWMonitor thermal dashboard (2 charts + metrics) |
| `template.md` | Blank template for new recommendations |
| `commentary.md` | Guide on writing effective IIB recommendations |

## Recommendation Format

Each recommendation follows:

```
## [Chart Title] — [Law Violated]

**Finding:** What the reader sees that misleads or obscures.

**Law:** Which of the five laws is broken (Form/Honest/Colour/Ink/Annotation).

**Consequence:** What the reader concludes incorrectly, or fails to see.

**Fix:** Smallest concrete change that restores honesty/legibility.

**Before/After:** Visual or code-level description of the change.
```

## Quality Bar

- **No taste calls** — every finding cites a law
- **Reader-first** — consequence is what the *reader* experiences, not what the *designer* prefers
- **Minimal fix** — one concrete change, not a redesign wishlist
- **Ordered by impact** — scale/omission/false emphasis first, then legibility, then craft