# IIB Recommendation Template

Copy this file for each new chart audit.

---

## [Chart Title] — [Law: Form Follows Data / Honest Scales / Colour = Data Channel / Ink Must Be Earned / Annotation = Narration]

**Finding:**
[One sentence: what the reader sees that is wrong. Be specific — "Y-axis starts at 40,000 not 0" not "scale is misleading."]

**Law:**
[Which law and which clause. Quote the skill if needed.]

**Consequence:**
[What the reader *concludes* or *fails to see*. Not what you dislike — what the reader gets wrong.]
- Glance (1s): [misreading at first sight]
- Study (10s): [what they miss on closer look]
- Immerse (1m): [what deeper analysis reveals or obscures]

**Fix:**
[Smallest concrete change. One action. Not "redesign" — "change X to Y."]
- Code: [specific property change, e.g. `y: { min: 0 }`]
- Visual: [what the reader will see differently]

**Before/After:**
```
Before: [description or ASCII sketch]
After:  [description or ASCII sketch]
```

**Checklist:**
- [ ] Finding cites specific law clause
- [ ] Consequence describes reader impact at 3 depths
- [ ] Fix is one minimal change
- [ ] No subjective language ("ugly," "cluttered," "better")
- [ ] Ordered by reader impact (misleading > legibility > craft)

---

## Example (Filled)

## Capacity Trajectory — Honest Scales

**Finding:**
Y-axis starts at 40,000 mWh instead of 0, magnifying a 7% drop into a visually dramatic plunge.

**Law:**
Law 2 — Honest Scales: "Quantitative axes start at zero (length encodings) — or explicitly break + say so."

**Consequence:**
- Glance: Reader sees "collapse" not "gradual decline"
- Study: Cannot compare absolute capacity vs design (60k) — truncated baseline hides 80% threshold context
- Immerse: Projection line appears steeper than reality; no visual anchor for "full health"

**Fix:**
Set `y: { min: 0, max: 65000 }` and add shaded 80–100% threshold band.

**Before/After:**
```
Before:  ████████░░  (40k–60k only, drop looks 50%)
After:   ████████████░░░░░░░░░░  (0–60k, drop visibly 7%, threshold band visible)
```

**Checklist:**
- [x] Finding cites specific law clause
- [x] Consequence describes reader impact at 3 depths
- [x] Fix is one minimal change
- [x] No subjective language
- [x] Ordered by reader impact