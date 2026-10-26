# Commentary: Writing Effective IIB Recommendations

> "A recommendation is not a critique — it's a *prescription* with a diagnosis attached."

---

## The Difference Between Critique and Recommendation

| Critique | Recommendation |
|----------|----------------|
| "This chart is confusing" | "Y-axis starts at 40k, making 7% drop look like 50%. Set `min: 0`." |
| "Colours are bad" | "Red line signals crisis for normal wear. Use ink for capacity, amber only for threshold." |
| "Needs better labels" | "Title states topic not insight. Change to 'Battery lost 7% in 14 days; 80% threshold in 67 days.'" |
| "Too much clutter" | "Legend redundant for 2-series stacked bar. Direct-label segments; remove legend." |

**Rule:** Every recommendation must be *actionable by a junior designer* without guessing.

---

## The Five Laws as Diagnostic Tools

Don't just cite the law — cite the **specific clause**.

| Law | Diagnostic Question | Good Citation | Weak Citation |
|-----|---------------------|---------------|---------------|
| **1. Form Follows Data** | Does the geometry match the variable types and comparison? | "Law 1: 'Never start from a chart type... start from variable types.' Vertical bars used for discrete cycles implies continuity." | "Law 1: wrong chart type." |
| **2. Honest Scales** | Does the scale let the reader judge magnitude accurately? | "Law 2: 'Quantitative axes start at zero.' Y-min at 40k magnifies 7% drop to 50% visual." | "Law 2: axis doesn't start at zero." |
| **3. Colour = Data Channel** | Does hue mean category? Intensity mean magnitude? | "Law 3: 'Hue = category. Intensity = magnitude.' Six core colours imply categories; all are same metric." | "Law 3: too many colours." |
| **4. Ink Must Be Earned** | Can any element be deleted without losing meaning? | "Law 4: 'No redundant legends when direct labels possible.' 2-series stacked bar has legend." | "Law 4: too much ink." |
| **5. Annotation = Narration** | Does the title state the insight? Are there 3 reading depths? | "Law 5: 'Title states insight not topic.' Title 'Capacity Degradation' → 'Battery lost 7% in 14 days.'" | "Law 5: needs better title." |

---

## The Three Reading Depths Test

Every recommendation must explain consequence at three depths:

| Depth | Time | Question | Example Consequence |
|-------|------|----------|---------------------|
| **Glance** | 1 second | What does the reader *instantly* believe? | "Battery collapsing" (vs "gradual decline") |
| **Study** | 10 seconds | What can they *verify* or *compare*? | "Cannot see distance to 80% threshold" |
| **Immerse** | 1 minute | What does *deep analysis* reveal or obscure? | "Projection slope distorted; no anchor for full health" |

**If you can't articulate all three, the finding isn't sharp enough.**

---

## The "Smallest Fix" Principle

| Bad Fix | Good Fix |
|---------|----------|
| "Redesign the chart" | "Change `y.min` from 40000 to 0" |
| "Use better colours" | "Capacity line: `#1a1a1a`. Threshold line: `#e67e22`." |
| "Add more annotations" | "Add single annotation: 'Peak: 57,761 mWh (96%)' at Oct 10–17, y=57761." |
| "Make it clearer" | "Direct-label 'Active'/'Standby' on bars; remove legend." |

**Test:** Can the fix be implemented in one commit? If no, it's not minimal.

---

## Ordering by Reader Impact

Always order findings:

1. **Misleading** (scale, omission, false emphasis) — reader concludes wrong thing
2. **Legibility failures** (clutter, redundant ink, unreadable labels) — reader struggles
3. **Craft** (alignment, spacing, typography) — reader notices but isn't misled

**Never lead with craft.** A pretty chart that lies is worse than an ugly chart that tells truth.

---

## Language Rules

| Avoid | Use |
|-------|-----|
| "ugly", "cluttered", "messy", "bad" | "violates Law X", "obscures Y", "misleads on Z" |
| "should", "could", "might" | "Fix: change X to Y" |
| "the designer" / "I" | "the reader" |
| "make it pop" | "single accent colour on key series" |
| "clean up" | "remove legend; direct-label segments" |

**Tone:** Clinical, not critical. The chart has a problem; the reader has a consequence; the fix solves it.

---

## Before/After Format

Show the change visually or in code:

```
Before:  y: { min: 40000, max: 62000 }
After:   y: { min: 0, max: 65000 }
         annotation: { type: 'box', xScale: 'x', yScale: 'y',
                       xMin: 'Oct 10', xMax: 'Oct 25', yMin: 48000, yMax: 60000,
                       backgroundColor: 'rgba(230,126,34,0.08)' }
```

Or ASCII for geometry changes:

```
Before:  ████░░░░  (40k–60k only)
After:   ████████░░░░░░░░░░  (0–60k, threshold band visible)
```

---

## Checklist for Every Recommendation

Before submitting a recommendation, verify:

- [ ] **Finding** cites specific law clause (not just law name)
- [ ] **Consequence** describes reader impact at glance / study / immerse
- [ ] **Fix** is one minimal, concrete change (code or visual property)
- [ ] **Language** is clinical — no subjective adjectives
- [ ] **Order** follows: misleading → legibility → craft
- [ ] **Before/After** shows the exact change
- [ ] **No redesign scope creep** — one chart, one law, one fix per finding

---

## Common Patterns in This Codebase

### Battery / Capacity Charts
- **Always** use 0–design-capacity scale
- **Always** show 80% threshold band
- **Never** use red for degradation (use neutral + amber threshold)
- **Always** title with insight: "X% lost in Y days; threshold in Z days"

### Thermal / Temperature Charts
- **Always** use bullet chart (threshold bands + marker)
- **Never** use categorical colours for same metric
- **Always** show Tjmax / throttle point as context
- **Safe/Warm/Hot** bands > raw numbers

### Cycle / Event Charts
- **Never** use line for discrete events
- **Always** use dumbbell / dot-range / gantt for start→end
- **Always** colour by depth/magnitude, not sequence
- **Always** summarize: "N of M events deep"

### Power / Resource Breakdown
- **Always** sort by magnitude descending
- **Always** use single hue, intensity = magnitude
- **Never** alphabetical or sensor order
- **Consider** removing <1% rows or showing as "—"

---

## How to Use This in Practice

1. **Run audit mode** → produces findings in this format
2. **Review ordering** → move misleading to top
3. **Verify fixes** → each is one commit
4. **Apply fixes** → generates "fixed" version
5. **Re-audit** → should pass quality checklist

The goal: **zero findings on re-audit** — not "looks better."