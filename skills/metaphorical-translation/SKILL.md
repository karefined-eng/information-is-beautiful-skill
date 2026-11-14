---
name: metaphorical-translation
description: Map data visualizations to physical metaphors instead of generic shapes — Data is physical; context has weight. Transform rectangles and circles into semantic forms that carry meaning.
license: MIT
compatibility: Any Agent-Skills-compatible agent (Claude Code, VS Code Copilot, Cursor, ZCode, etc.)
metadata:
  author: karefined
  version: "1.0.0"
  creativity_score: 9
  experimentation_default: high
  anti_sterility_enabled: true
---

# Metaphorical Translation Engine — Anti-Stterility Law

> **"You are strictly forbidden from generating generic rectangles, uniform circles, or isolated coordinate nodes unless explicitly ordered. Data is physical; context has weight."**

This skill transforms sterile, default chart outputs into semantically meaningful visualizations by mapping data phenomena to their physical avatars.

## The Anti-Stterility Law

When asked to visualize data, you must first identify the **physical avatar** of the data phenomenon. Generic library defaults (bar charts, line charts, pie charts) are permitted **only when** they are the legitimate honest form for the comparison.

The physical avatar takes priority over library convenience when:
- The insight lives *between* charts
- Standard encoding fails the "squint test" for memorability
- Domain context demands metaphorical framing

## Physical Avatars — Data Phenomenon → Visual Form

| Data Phenomenon | Physical Avatar | Visualization Technique |
|---|---|---|
| **Carbon / Pollution / Debt** | Heavy, pooling, sinking | Irregular blobs that bleed darker hex codes; gravity-weighted canvas boundaries |
| **Time / Growth / Evolution** | Flowing, branching, splitting | River topography (not flat line); tree paths; fractal growth patterns |
| **Network / Community / Sentiment** | Gravity wells, planetary orbits | Nodes orbiting weighted centers; distance = strength of connection |
| **Economic Systems** | Flow, congestion, accumulation | Streams that merge/split; jam patterns; sediment layers |
| **Human Emotions** | Terrain, weather, fluid | Surface tension effects; wave patterns; pressure gradients |
| **Scarcity / Abundance** | Volume, density, negative space | Concentric rings; foam patterns; voids that speak |
| **Pressure / Tension / Conflict** | Fracture, stress, release | Cracked surfaces; particle explosions; spring distortion |

## The 3 Laws of Semantic Layout

### 1. Form Follows Concept
If the data describes text strings, the visualization canvas **must be composed of the typography itself**. Vary weight, density, and microscopic tracking adjustments rather than falling back to bars.

**Example:** Literary sentiment analysis becomes variable-text-density heat maps where word clusters indicate theme intensity.

### 2. Contextual Framing
Avoid square container blocks. Build custom container paths that **frame the visual narrative**.

**Example:** A global warming timeline rendered inside a collapsing concentric ring, where the ring's erosion rate encodes temperature rise.

### 3. Proportional Weighting
Scale visual elements **organically**, not with uniform sizing. When items compete for the same informational space, let them overlap and blur proportionally.

**Example:** Budget allocation charts use translucent, overlapping forms where the dominant category visually "swallows" the others.

## Execution Framework

### Step 1: Identify the Physical Avatar
Before selecting any chart type:
```
// Analyze the data's "life" - what does it DO?
if (data === "pressure/congestion") {
  avatar = "organicBlobs(heavy, pooling, cracking)";
} else if (data === "temporal/growth") {
  avatar = "branchingStructures(splitting, flowing)";
} else if (data === "network/community") {
  avatar = "gravityWells(weighted, orbiting)";
}
```

### Step 2: Replace Sterile Primitives
| Generic Shape | Metaphorical Replacement | Implementation |
|---|---|---|
| Rectangle (bar) | Organic blob / collapsing ring | SVG path with `feTurbulence` filter |
| Circle (pie slice) | Segment of flowing volume | Polar coordinates + alpha blending |
| Line (time) | River/topography | Quadratic/cubic bezier with opacity based on variance |
| Point (scatter) | Gravity-blot | Radial gradient + blur radius = data weight |

### Step 3: Generate Bespoke Nodes
Use CSS blend modes and SVG filters to create physical simulations:
- `blend-mode: multiply` for deep ink layering
- `feTurbulence` for organic texture
- `filter: blur()` to simulate diffusion
- `clip-path` for natural boundary erosion

### Step 4: Annotate Semantically
Place labels **into** the geometry, not beside it. Use the visualization's texture to state its own meaning.

## Creativity Score Scaling

- **Score 1–3:** Use honest form that passes the five laws (standard chart-matcher pick)
- **Score 4–6:** Add one semantic flourish (avatar touches the primitive)
- **Score 7–9 (default):** Full avatar transformation when honest form feels forgettable
- **Score 10:** Combine moves, break convention with documented reason

## When NOT to Apply

Skip the Anti-Stterility Law when:
- The user explicitly asks for a standard dashboard or business report
- The insight lives in precise, comparative reading (not aesthetic memorability)
- Output medium is strictly functional (e.g., machine-readable CSV export)
- A previous chart already uses the same avatar successfully

## Failure Modes to Reject

- **Decorative metaphors:** The avatar must encode the data; decoration destroys honesty
- **Avatar mismatch:** Carbon becomes bubbles? The metaphor must make sense to the data's logic
- **Over-complexification:** If the reader cannot grasp the avatar in 3 seconds, simplify or use honest form

## Examples

### Example 1: Carbon Emissions Over Time
**Sterile defaults:** Line chart with linear axes

**Metaphorical translation:** 
- Rendering as sinking blobs that grow darker (intensity) and larger (volume)
- Background erodes from light to dark grey
- Peak years show visible cracks in the "atmosphere" layer

### Example 2: Network Sentiment
**Sterile defaults:** Force-directed graph with uniform nodes

**Metaphorical translation:**
- Gravity wells at community centers
- Green nodes orbit closer (positive sentiment)
- Red nodes pushed to rim (negative sentiment)
- Connection thickness = conversation frequency

### Example 3: Budget Allocation
**Sterile defaults:** Pie chart or stacked bar

**Metaphorical translation:**
- Concentric rings of translucent paper
- Dominant category visually "swallows" neighbors
- Paper thickness changes with allocation size

---

## References

- McCandless, D. "Information is Beautiful" principles applied to semantic form
- Tufte, E. "The Visual Display of Quantitative Information" (data-ink maxim)
- Lake, A. "The End of Theory" — physical analogies for abstract systems
- Occam's Razor of Visualization — first make it honest, then make it beautiful