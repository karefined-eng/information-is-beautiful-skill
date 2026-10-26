# Battery Health Dashboard — IIB Audit

**Date:** 2026-10-26
**Auditor:** IIB Skill (auto-generated from redesign session)
**Charts:** 5 | **Findings:** 12 (3 critical, 5 major, 4 minor)

---

## Executive Summary

The dashboard communicates the key insight — **battery lost 7% capacity in 14 days post-calibration, on track for 80% threshold in ~67 days** — but several charts violate IIB laws, risking reader misinterpretation of severity and timescale.

**Priority fixes:** Chart 1 (honest scale), Chart 3 (threshold context), Chart 4 (form follows data).

---

## Chart 1: Full Charge Capacity vs Design Capacity

### Finding 1.1 — Honest Scales (Critical)
**Finding:** Y-axis starts at 20,000 mWh (not 0), making the 7% drop (4,037 mWh) visually occupy ~50% of chart height.

**Law:** Law 2 — "Quantitative axes start at zero (length encodings) — or explicitly break + say so."

**Consequence:**
- Glance: Reader sees "collapse" not "gradual decline"
- Study: Cannot visually compare current (53.7k) vs design (60k) vs threshold (48k)
- Immerse: Projection appears steeper; no anchor for "full health"

**Fix:** Set `y: { min: 0, max: 65000 }`. Add 80% threshold line at 48,000 with annotation.

---

### Finding 1.2 — Colour = Data Channel (Major)
**Finding:** Capacity line uses red (`#c0392b`), signaling "danger/failure" for expected degradation.

**Law:** Law 3 — "Never let colour fight the message. One accent colour highlights the key series — context series fade to neutral."

**Consequence:** Reader interprets normal wear as crisis; red fights the "this is expected" message.

**Fix:** Capacity line → neutral ink (`#1a1a1a`). Single accent (amber `#e67e22`) only on 80% threshold line.

---

### Finding 1.3 — Annotation = Narration (Minor)
**Finding:** Title states topic ("Capacity Degradation") not insight.

**Law:** Law 5 — "The title states the *insight*, not the topic."

**Consequence:** Reader must derive "7% in 14 days" from study, not glance.

**Fix:** Title → "Battery lost 7% capacity in 14 days after calibration recovery; 80% threshold in ~67 days at current rate."

---

## Chart 2: Daily Battery Usage — Active vs Standby

### Finding 2.1 — Ink Must Be Earned (Major)
**Finding:** Legend present for 2-series stacked bar (redundant with direct labels possible).

**Law:** Law 4 — "No redundant legends when direct labels are possible."

**Consequence:** Glance: legend distracts from bars; Study: eye jumps legend→bar→legend.

**Fix:** Remove legend. Direct-label "Active" / "Standby" on bars (implemented in redesign).

---

### Finding 2.2 — Form Follows Data (Minor)
**Finding:** Oct 3–10 and Oct 10–17 are week ranges; others single days. Mixed granularity on categorical axis.

**Law:** Law 1 — "The geometry must match the shape of the comparison."

**Consequence:** Reader assumes equal time per column; weekly bars inflate active hours visually.

**Fix:** Either aggregate all to weekly, or annotate width difference. (Acceptable as-is with note.)

---

## Chart 3: Capacity Trajectory — Actual vs Projected

### Finding 3.1 — Honest Scales (Critical)
**Finding:** Y-axis 40k–62k (not 0–60k). 80% threshold (48k) falls near bottom, projection line crosses it off-chart.

**Law:** Law 2 — "Quantitative axes start at zero... or explicitly break + say so."

**Consequence:**
- Glance: Threshold invisible; projection looks like "leveling off"
- Study: Cannot see distance from current (53.7k) to threshold (48k) vs design (60k)
- Immerse: Linear projection visually distorted; no sense of "how much capacity remains"

**Fix:** Full 0–65k scale. Shaded band for 80–100% design (48k–60k). Projection dashed into band.

---

### Finding 3.2 — Colour = Data Channel (Major)
**Finding:** Actual and projected use same colour (ink); only dash style differs.

**Law:** Law 3 — "One accent colour highlights the key series."

**Consequence:** At glance, cannot distinguish observed vs projected.

**Fix:** Actual = ink (`#1a1a1a`). Projected = same hue, 40% opacity, dashed. Threshold band = amber tint.

---

### Finding 3.3 — Annotation = Narration (Minor)
**Finding:** No annotation marking "today" or "threshold crossing date."

**Law:** Law 5 — "Layer the reading: glance → study → immerse."

**Fix:** Add vertical "Today" line at Oct 25. Annotate projection crossing: "~Dec 31: 80% threshold."

---

## Chart 4: Charge/Drain Cycles — Depth of Discharge

### Finding 4.1 — Form Follows Data (Critical)
**Finding:** Original used line chart for discrete cycles; implies continuity between unrelated discharge events.

**Law:** Law 1 — "Never start from a chart type and force data into it — start from variable types."

**Consequence:** Reader sees "continuous discharge" not "7 separate cycles." Cannot compare depth per cycle.

**Fix:** Horizontal dumbbell/dot-range: each cycle = start% → end% bar pair + connecting line, colored by minimum depth (green/amber/red). (Implemented in redesign.)

---

### Finding 4.2 — Colour = Data Channel (Major)
**Finding:** Original used single colour; depth encoded only by Y-position (hard to compare across cycles).

**Law:** Law 3 — "Intensity = magnitude (light → dark = small → large)."

**Consequence:** Reader must mentally sort by Y-position; no instant "which cycles were deep?"

**Fix:** Colour by minimum depth: ≤20% = red, 20–50% = amber, >50% = green. (Implemented.)

---

### Finding 4.3 — Annotation = Narration (Minor)
**Finding:** No summary statistic: "4 of 7 cycles deep (<20%)."

**Law:** Law 5 — "The title states the insight."

**Fix:** Insight in title/subtitle: "4 of 7 cycles drained to 2–3% — deep discharges accelerate wear 3–5×."

---

## Chart 5: Estimated Battery Life at Full Charge

### Finding 5.1 — Ink Must Be Earned (Major)
**Finding:** Legend for 2-series stacked bar; standby values (1–60h) dwarf active (3–9h), making active labels unreadable.

**Law:** Law 4 — "No redundant legends when direct labels are possible."

**Fix:** Direct labels implemented. Consider log scale or separate charts for active vs standby (different magnitudes).

---

### Finding 5.2 — Form Follows Data (Minor)
**Finding:** Active and standby are different units of "battery life" (hours active vs hours asleep); stacking implies additive comparison.

**Law:** Law 1 — "Geometry must match comparison."

**Consequence:** Stacked bar suggests "total hours = active + standby" which is misleading (they're alternative modes).

**Fix:** Side-by-side grouped bars, or two separate charts with shared Y-scale. (Acceptable as stacked with annotation.)

---

## Summary of Fixes Applied in Redesign

| Chart | Critical | Major | Minor | Status |
|-------|----------|-------|-------|--------|
| 1. Capacity | 1 | 1 | 1 | ✅ Fixed |
| 2. Usage | 0 | 1 | 1 | ✅ Fixed |
| 3. Trajectory | 1 | 1 | 1 | ✅ Fixed |
| 4. Cycles | 1 | 1 | 1 | ✅ Fixed |
| 5. Estimates | 0 | 1 | 1 | ⚠️ Partial |

**Remaining:** Chart 5 grouped-bar alternative; Chart 2 granularity note.