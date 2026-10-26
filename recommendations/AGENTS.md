# IIB Recommendations — AI Improvements & Brainstorming

> **Purpose:** Capture AI-generated ideas, improvements, and experimental patterns for the next IIB skill release. This is a living scratchpad — not yet vetted recommendations.

---

## 🧪 Experimental / Under Exploration

### 1. Automated Chart Type Selection (Form Follows Data)
**Idea:** Given a dataset + insight sentence, auto-select chart type using `chart-matcher.md` logic.

**Approach:**
```typescript
// Input: data schema + insight
// Output: chart spec + rationale
function selectChartType(dataSchema, insight) {
  // Parse variable types (quant/time/cat/geo/network/hierarchy)
  // Match to chart-matcher decision tree
  // Return: { type, encoding, rationale }
}
```

**Status:** Needs `chart-matcher.md` formalized as executable logic, not just prose.

---

### 2. Honest Scale Validator (Law 2)
**Idea:** Lint rule that flags non-zero-baseline quantitative axes.

**Approach:**
```typescript
// AST or spec-level check
function checkHonestScales(spec) {
  for (const encoding of spec.encodings) {
    if (encoding.channel === 'y' && encoding.type === 'quantitative') {
      if (spec.scales.y?.domain?.[0] !== 0 && !spec.scales.y?.break) {
        return { error: 'Non-zero baseline', fix: 'Set domain: [0, max]' };
      }
    }
  }
}
```

**Status:** Doable for Vega-Lite / Chart.js specs. Harder for raw D3.

---

### 3. Colour Channel Auditor (Law 3)
**Idea:** Detect when hue encodes magnitude (rainbow) or category uses single hue.

**Approach:** Parse color scale + data mapping → flag violations.

**Status:** Requires semantic understanding of data → encoding mapping.

---

### 4. Ink Budget Calculator (Law 4)
**Idea:** Quantify data-ink ratio; flag elements removable without meaning loss.

**Metric:** `dataInk / totalInk` — target > 0.8

**Status:** Theoretical. Needs pixel-level rendering analysis.

---

### 5. Three-Depth Annotation Checker (Law 5)
**Idea:** Verify title = insight (not topic), glance/study/immerse layers present.

**Checklist:**
- [ ] Title states insight sentence
- [ ] Single accent colour on key mark
- [ ] Direct labels (no legend for ≤3 series)
- [ ] Source + year + units visible
- [ ] Benchmark / threshold annotated

**Status:** Partially automatable (title check, legend check).

---

## 🎨 Visual Language Standardization

### Unified IIB Colour System
**Current:** Ad-hoc per chart. **Proposed:** Single token set.

| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#1a1a1a` | Primary marks, text |
| `--ink-muted` | `#666` | Axis labels, secondary text |
| `--paper` | `#faf8f5` | Background |
| `--accent` | `#e67e22` | **Single** highlight (threshold, key series) |
| `--good` | `#27ae60` | Positive threshold, safe zone |
| `--warn` | `#e67e22` | Warning zone, medium depth |
| `--crit` | `#c0392b` | Critical zone, deep discharge |
| `--context` | `#bbb` | Reference lines, design capacity |
| `--safe-bg` | `#e8f8f0` | Safe threshold band |
| `--warn-bg` | `#fef3e2` | Warning threshold band |
| `--crit-bg` | `#fdeaea` | Critical threshold band |

**Usage:** All charts import CSS custom properties. Zero hardcoded hex in chart code.

---

### Standard Chart Components (Reusable)
| Component | Charts Using | Spec |
|-----------|--------------|------|
| `BulletChart` | Thermal, battery, capacity | Threshold bands + marker |
| `DumbbellChart` | Cycles, before/after | Start→end + connector |
| `ThresholdLine` | All quantitative | Dashed + label at threshold |
| `ShadedBand` | Trajectory, capacity | yMin→yMax fill with opacity |
| `DirectLabel` | Stacked bars, grouped | Inside bar, white text, auto-position |

**Goal:** One implementation per pattern → consistent look, easier audit.

---

## 📊 New Chart Types for Common IIB Patterns

### Capacity/Health Trajectory (Standard)
**Use case:** Battery, disk, memory, any degrading metric
**Spec:** 
- X: time, Y: capacity (0→design)
- Bands: 80–100% (safe), 60–80% (warn), <60% (crit)
- Actual: solid ink line + points
- Projected: dashed same hue
- Threshold: accent dashed + label
- Title: "X% lost in Y days; threshold in Z days"

### Thermal Bullet (Standard)
**Use case:** CPU, GPU, battery, ambient
**Spec:**
- Horizontal bullet chart
- Bands: safe/warn/crit (configurable thresholds)
- Marker: actual value
- Tjmax/limit: context line
- Title: "Component at X°C (Y% of limit) — Z°C headroom"

### Cycle Depth (Standard)
**Use case:** Battery, SSD write cycles, any charge/discharge
**Spec:**
- Horizontal dumbbell per cycle
- Colour by min depth: green/amber/red
- Connector line between start/end
- Summary: "N of M cycles deep (<20%)"

### Power/Resource Breakdown (Standard)
**Use case:** CPU power, memory, disk I/O, network
**Spec:**
- Horizontal bars, sorted descending
- Single hue, intensity = magnitude
- % of total labeled
- <1%: show as "—" or omit

---

## 🤖 AI-Assisted Audit Pipeline

### Vision: `iib-audit <chart-spec>` → Markdown Report

```
Input: chart.json (Vega-Lite / Chart.js / custom spec)
Output: audit.md with findings ordered by impact

Pipeline:
1. Parse spec → AST
2. Extract: encodings, scales, marks, data schema
3. Run law checks:
   - Law 1: geometry vs variable types
   - Law 2: scale domains, zero baseline
   - Law 3: color channel usage
   - Law 4: legend redundancy, grid density
   - Law 5: title insight, 3-depth layers
4. Generate findings with fix code
5. Render before/after visual diff (headless browser)
```

**Status:** Architecture only. Need spec parser + headless render for diff.

---

## 📝 Brainstorming: Next Release Features

| Feature | Effort | Value | Notes |
|---------|--------|-------|-------|
| Chart type recommender | Medium | High | Core "Form Follows Data" automation |
| Honest scale linter | Low | High | CI-integrable |
| Colour auditor | Medium | Medium | Needs semantic mapping |
| Ink calculator | High | Low | Pixel analysis hard |
| Three-depth checker | Low | High | Mostly text checks |
| Standard component lib | Medium | High | Reusable, consistent |
| Visual diff in audit | High | High | Requires playwright/puppeteer |
| Auto-fix suggestions | Medium | High | Code mods for common fixes |

---

## 🗂️ Filing Convention

When adding ideas here:

```
## [Short Title] — [Law/Component]

**Problem:** One sentence
**Idea:** One paragraph
**Sketch/Code:** Minimal prototype
**Blockers:** What's needed to proceed
**Priority:** High/Med/Low
**Related:** Links to existing recs
```

**Don't:** Write full specs here. **Do:** Link to separate file when fleshed out.

---

## 📌 Current Priorities (Ranked)

1. **Standard component library** (BulletChart, DumbbellChart, ThresholdLine) — enables consistent fixes
2. **Honest scale linter** — CI gate, catches Law 2 violations automatically
3. **Unified colour tokens** — eliminates ad-hoc hex, makes Law 3 auditable
4. **Chart type recommender** — automates Law 1, the hardest law
5. **Visual diff in audit** — shows before/after, makes fixes concrete

---

*Last updated: 2026-10-26 — Add ideas freely. Promote to `recommendations/*.md` when vetted.*