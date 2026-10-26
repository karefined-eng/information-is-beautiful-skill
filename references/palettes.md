# Palettes — colour with meaning

Colour is a data channel with a data-ink budget like everything else: catgorical hues for identity, value intensity for magnitude, one reserved accent for the thing the reader must see.

## The paper-atelier base (this skill's default)

Ground any visual on warm paper, never pure white; ink near-black, never pure black:

- Paper `#f3eee1` — backgrounds
- Ink `#17140e` — primary marks, text, axes
- Soft ink `#4a463c` — secondary labels, captions

Accents (one hue per series; saturated against the paper):

- Tangerine `#ff5d1f` — the reserved highlight; use for the key finding only
- Teal `#00a5a8`
- Sun `#ffb300` — pair with ink labels (light fill)
- Magenta `#e22d96`
- Cobalt `#3557ff`
- Leaf `#4f9d3a`

## Constructing a palette from the data

1. **Categorical** — one hue per category, equal perceptual weight, max 8; beyond that, group small categories as "other" (ink at 40%).
2. **Sequential** (magnitude) — single hue, light → dark = small → large on light paper. 5–7 steps; the lightest step must still read against the paper.
3. **Diverging** (above/below a meaningful midpoint) — two hues through a neutral paper midpoint (e.g., teal ↔ tangerine). The neutral value must exist in the data story (0%, national average, break-even).

## The accent discipline

- One accent hue per visual, applied to one series or mark.
- Context series render in ink at 60–90%, or paper-deep grey.
- If everything is accent, nothing is: re-read the insight sentence and recolour from it.

## Colour-vision safety

- Never red/green as the only distinction of category or sign. Safe axis: **blue ↔ orange** (cobalt ↔ tangerine), plus vary lightness.
- Test: desaturate the visual mentally — if two series collapse into one, add a position or pattern channel.
- Colour is never the only encoder: direct labels or patterns back it up.

## Cultural charge (the Colours-in-Culture caution)

Hues carry meanings that flip around the world — red is danger in Western charts and luck in China; white is mourning in several Asian cultures. When the audience is global, prefer hue systems chosen for the data's math (sequential/diverging) over symbolic colour coding, and never rely on red = bad / green = good without labels.

## Contrast floor

- Marks vs background ≥ 3:1; small text ≥ 4.5:1.
- Thin elements (1 px lines, small points) need more saturation than large fills to carry the same hue.
