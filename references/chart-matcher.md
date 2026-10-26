# Chart matcher — data shape to visual form

Rule zero: choose the form whose geometry *is* the comparison. Position and length carry precise judgment; area carries magnitude impressions; angle and colour carry only rough grouping. When in doubt, go simpler.

## Change over time
- Few series: **line chart**, direct end-labels, no legend. Horizontal gridlines only, whisper-thin.
- Many series (≤7): **small multiples** of lines, shared axes, each panel one accent colour.
- Total matters more than parts: **stacked area** (≤4 layers), biggest layer on the baseline.
- Events vs routine: **spike/peak timeline** — mark anomalies, label *why*, not just *when*.
- Never: area charts for precise comparison; connected lines through categorical x.

## Comparison across categories
- Default: **sorted horizontal bars** (long labels stay readable; zero baseline mandatory).
- Few huge-vs-tiny values: **dot plot** on a log scale, or state the ratio as a giant number instead.
- Two-group contrast (before/after, left/right): **mirrored bars** or a **slope chart** with both states labelled.
- Never: alphabetical order (unless it is a lookup table); more than ~15 bars (make it a table or dot strip).

## Part of a whole
- ≤5 parts, one moment in time: **single stacked bar at 100%** — beats a pie for judgment accuracy.
- Many unequal parts (the Billion-Dollar-Gram case): **block/treemap layout**, area ∝ value, label the five largest, group the tail as "rest".
- Change in composition: **stacked bars over time** with only the key flows coloured.
- Never: pies >5 slices, 3D pies, comparing two pies side by side.

## Distribution
- 50+ points: **histogram or dot strip**; show the shape honestly (skew, gaps, clusters).
- Compare 2–3 distributions: **overlaid dot/rug strips** or ridgelines — same scale, spine-aligned.
- Always mark the median and say what "normal" looks like.

## Relationship (x vs y)
- **Scatterplot**, points at full-opacity only if n < ~500 (else use transparency or density bins).
- Third quantitative variable: bubble size, **area ∝ value** (the Snake-Oil rule: two honest axes, one impressionistic size).
- Show the trend line only if you also show the noise around it.

## Geography
- Rates/ratios: **choropleth** with a sequential palette; absolute counts: **proportional circles** on the map.
- If the question is "which is biggest?", a sorted bar chart usually beats the map — maps answer "where".
- Normalise by population/area before colouring anything.

## Hierarchy & networks
- Hierarchy: **tree or sunburst** (depth ≤4; label generously).
- Flows between states: **Sankey** — width ∝ flow, ≤8 nodes per column, route crossings sparingly.
- Relations among entities: **node-link** with tuned repulsion; if the "hairball" exceeds ~80 nodes, aggregate or rank-and-list instead.

## Single big number
- Never a lonely KPI card. Deliver the **context trio**: the number, a benchmark (last period / target / peer), and a one-line so-what. The Number You Can't Unsee treatment: one numeral the size of a fist, quiet support cast.

## Uncertainty & estimates
- Show intervals (error bars, fan bands) — a single crisp line through uncertain data is a lie of confidence.
- Estimates and projections get dashed marks; actuals get solid ones. Say which is which.
