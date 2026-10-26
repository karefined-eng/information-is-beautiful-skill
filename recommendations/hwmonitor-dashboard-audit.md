# HWMonitor Thermal Dashboard — IIB Audit

**Date:** 2026-10-26
**Auditor:** IIB Skill (auto-generated from redesign session)
**Charts:** 2 + 4 metric cards | **Findings:** 8 (2 critical, 3 major, 3 minor)

---

## Executive Summary

The dashboard shows **CPU cores at 52–56°C during 2.43W idle load — warm for idle, suggesting airflow/fan curve issues**. Metric cards with bullet charts are effective; the core temperature chart was the primary violation.

**Priority fix:** Chart 1 (form follows data — bullet chart vs bars).

---

## Metric Cards (4) — CPU Package, Hottest Core, GPU, Battery

### Finding M1 — Form Follows Data (Major)
**Finding:** Original used simple numeric value + progress bar (0–100%). Progress bar implies "percentage of max" but 54°C is 54% of 100°C — misleading since safe range is 0–45°C, not 0–100°C.

**Law:** Law 1 — "Geometry must match the comparison."

**Consequence:** Reader sees "54% full" not "9°C into warm zone."

**Fix:** Bullet chart with threshold bands (Safe <45°C / Warm 45–65°C / Hot >65°C). Marker at actual value. (Implemented.)

---

### Finding M2 — Colour = Data Channel (Minor)
**Finding:** All four cards used same amber warning colour for 54–56°C, but battery 56% is healthy (green zone).

**Law:** Law 3 — "Intensity = magnitude... never let colour fight the message."

**Consequence:** Battery card falsely signals "warning" at healthy 56%.

**Fix:** Battery card uses blue marker + green/amber/red threshold bands (Critical <20% / OK 20–80% / Full >80%). (Implemented.)

---

### Finding M3 — Annotation = Narration (Minor)
**Finding:** Cards showed raw values only; no context for "is this bad?"

**Law:** Law 5 — "Layer the reading: glance → study → immerse."

**Fix:** Each card adds one-line context: "Tjmax 100°C • 54% of limit" / "44°C headroom to throttle" / "Charging at 10.3W". (Implemented.)

---

## Chart 1: Core Temperatures — Position vs Thresholds

### Finding 1.1 — Form Follows Data (Critical)
**Finding:** Original used vertical grouped bars (one bar per core, height = temperature). Bars imply "higher = more" but the comparison is *position relative to thresholds*, not magnitude ranking.

**Law:** Law 1 — "Never start from a chart type and force data into it — start from variable types (quantity / threshold / category) and the one insight that matters."

**Consequence:**
- Glance: Reader ranks cores by height (Core #2 "hottest") but misses that *all* are in warm zone
- Study: Cannot see distance to safe/warm/hot boundaries
- Immerse: No visual anchor for Tjmax (100°C) vs operating range

**Fix:** Horizontal bullet chart — threshold bands as background (Safe/Warm/Hot), actual temp as thin dark marker. Y-axis = cores (categorical), X-axis = temperature with threshold zones. (Implemented.)

---

### Finding 1.2 — Honest Scales (Major)
**Finding:** Original Y-axis 0–100°C with data at 52–56°C — 94% of chart empty.

**Law:** Law 2 — "Quantitative axes start at zero... but honour magnitude: a billion and a million must *feel* different."

**Consequence:** Waste of ink; differences between cores (52 vs 56) visually compressed.

**Fix:** X-axis 0–100°C (full range to Tjmax) but threshold bands visually segment the meaningful 0–65°C region. Marker differences visible.

---

### Finding 1.3 — Colour = Data Channel (Major)
**Finding:** Original used distinct colour per core (categorical palette) — implies cores are different *categories*, not same metric measured 6 ways.

**Law:** Law 3 — "Hue = category. Intensity = magnitude."

**Consequence:** Reader hunts for "which colour is Core #2" instead of seeing "all cores warm."

**Fix:** Threshold bands = hue (green/amber/red). Actual markers = single hue (ink `#1a1a1a`), intensity = position. (Implemented.)

---

### Finding 1.4 — Ink Must Be Earned (Minor)
**Finding:** Original had legend for 6 cores + axis labels + gridlines.

**Law:** Law 4 — "No redundant legends when direct labels are possible."

**Fix:** Y-axis labels = core names (direct). No legend. Gridlines only at threshold boundaries (45, 65). (Implemented.)

---

## Chart 2: Core Clock Speeds

### Finding 2.1 — Form Follows Data (Minor)
**Finding:** Vertical bars for 7 items (4 cores + BCLK + LLC + Memory). Core #2 at 2294 MHz visually dominates; others at 798 MHz appear "zero."

**Law:** Law 1 — "Geometry must match comparison."

**Consequence:** Reader sees "one core fast, others off" not "one core boosting, others parked at base."

**Fix:** Horizontal bars with log scale or annotated "parked at 800 MHz" baseline. (Acceptable as-is with note.)

---

### Finding 2.2 — Colour = Data Channel (Minor)
**Finding:** Core #2 highlighted in ink; others in context grey — correct usage.

**Law:** Law 3 — "One accent highlights key series."

**Status:** ✅ Correct. No change needed.

---

### Finding 2.3 — Annotation = Narration (Minor)
**Finding:** No annotation explaining "Core #2 boosting to 2.29 GHz (36× multiplier); others at 8× base."

**Law:** Law 5 — "The title states the insight."

**Fix:** Subtitle: "Core #2 boosting to 2.29 GHz; others parked at 800 MHz." (Implemented.)

---

## Power Breakdown Table

### Finding P1 — Form Follows Data (Major)
**Finding:** Original listed in sensor order (Cores, GT, DRAM, Uncore) not magnitude order.

**Law:** Law 1 — "Order deliberately. Sort by meaning (magnitude) — never alphabetically unless lookup is the task."

**Consequence:** Reader must mentally sort to see "Cores = 52% of package power."

**Fix:** Sort by wattage descending: IA Cores (1.26W) → DRAM (0.78W) → Uncore (0.39W) → GT (0.02W). (Implemented.)

---

### Finding P2 — Ink Must Be Earned (Minor)
**Finding:** Power bars used full width for 1.26W; 0.02W GPU bar invisible.

**Law:** Law 4 — "If an element can be deleted without losing meaning, delete it."

**Fix:** GPU row retained (shows "truly idle") but bar at 1% visible. Consider "—" for <0.05W. (Acceptable.)

---

## Summary of Fixes Applied in Redesign

| Component | Critical | Major | Minor | Status |
|-----------|----------|-------|-------|--------|
| Metric Cards | 0 | 1 | 2 | ✅ Fixed |
| Core Temps Chart | 1 | 2 | 1 | ✅ Fixed |
| Clock Speeds | 0 | 0 | 2 | ⚠️ Partial |
| Power Breakdown | 0 | 1 | 1 | ✅ Fixed |

**Remaining:** Chart 2 log-scale or annotated baseline for parked cores.