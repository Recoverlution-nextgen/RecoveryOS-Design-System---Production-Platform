# RecoveryOS Color Matrix (v1 — Locked)
Color is a metadata layer.
Neutrals are the OS fabric.

We do not paint the UI with framework colors.
We tag meaning with restraint.

---

## 0) Constitution
1) Neutrals carry 90–95% of pixels.
2) Purple is the only INTERACTION accent.
3) Cyan and Green are MEANING accents, not interaction accents.
4) Framework + Content Type colors are CHIP/ICON-only (tag layer).
5) State colors (Energy/Clarity/Anchorage) live in CHARTS + CHECKPOINT UI, not global chrome.
6) No red/orange/yellow in the *system palette* by default.
   (Critical severity is handled by shape + copy + contrast, not hue.)

---

## 1) Axes
We support four axes without chaos by restricting where each can appear.

A) World
- companion / console / command_centre

B) StateBand
- low / medium / high

C) State (Sense checkpoint)
- Energy / Clarity / Anchorage

D) Taxonomy overlays
- Framework nodes (Baseline → Pillars → Concepts → Themes → Schema → Mindblocks)
- Content types (NaviCue / Journey / Article / Insight / Practice / Audio / Series)

---

## 2) Allowed Surfaces (where color may appear)
### Tier 1: Core UI
- Backgrounds, cards, text, borders
> NEUTRALS ONLY (plus Purple for interactions).

### Tier 2: Interaction
- primary CTA, focus ring, selection indicator, active rail
> PURPLE ONLY.

### Tier 3: Meaning accents
- charts, indicators, small rails on toasts, badges, chips, tiny icons
> CYAN or GREEN (rarely both in one view).

### Tier 4: Marketing brush layer
- duotone/X-Pro+ assets
- hero gradients (very low saturation)
> allowed; does not change product token system.

---

## 3) World Treatment (bias, not palette swaps)
World shifts happen via semantic tokens (contrast/border/surface), not hue.

Companion
- warm-neutral bias
- lowest border weight
- least color usage

Console
- crisp-neutral bias
- clearer borders
- more cyan usage (signal)

Command Centre
- highest clarity bias
- strongest border contrast
- more semantic accents (governance)

Rule: The accent remains Purple across worlds.

---

## 4) StateBand Treatment (pressure)
Band shifts are token remaps, not new colors.

Low band
- softer borders
- higher paper ratio
- reduced chroma appearance

Medium band
- baseline

High band
- higher contrast for text and dividers
- stronger focus ring
- fewer decorative tints
- clearer status cues (still muted)

---

## 5) State Mapping (Energy / Clarity / Anchorage)
State is a first-class signal layer in RecoveryOS.

We map state into the brand triad to avoid new hues:
- Energy  → Green (motion)
- Clarity → Cyan (precision)
- Anchorage → Purple (restoration)

Where it appears:
- Sense checkpoint UI
- Charts/graphs
- Small indicators
- Chips/badges

Where it does NOT appear:
- global nav rails
- primary buttons (always purple)
- full-page backgrounds

---

## 6) Framework Taxonomy (chip-only)
Framework nodes are navigational metadata, not page color.

Allowed:
- chips in Library/filters
- small labels in Console/Control
- Studio tooling (internal)
Not allowed:
- page backgrounds
- primary navigation
- global button colors

---

## 7) Content Type Taxonomy (chip/icon-only)
Content type uses icon fill + chip.
No new hues beyond the triad unless a future version introduces a governed extension.

Mapping (v1 default):
- NaviCue   → Purple (identity / move)
- Journey   → Green  (motion / pathway)
- Article   → Neutral (calm line)
- Insight   → Cyan   (clarity / precision)
- Practice  → Green  (doing)
- Audio     → Purple (presence)
- Series    → Cyan   (structure / signal)

---

## 8) Color Budget Rules (premium enforcement)
Per screen:
- 95% neutral
- 1 interaction accent: Purple
- 1 meaning accent max: Cyan OR Green
- state colors only in checkpoint/charts/indicators

Per component:
- never more than one non-neutral hue (except charts)

---

## 9) Component Rules
Buttons
- Primary = Purple
- Secondary = Neutral
- Focus ring = Purple
- Never cyan/green buttons

Rails / selection
- Selection indicator = Purple
- Text stays neutral

Chips
- Taxonomy chips may use Purple/Cyan/Green tints
- Text inside chips is neutral ink, never cyan/green light tones

Toasts
- Default: neutral
- Semantic: a thin left rail + icon in meaning color
- Never full red/orange backgrounds

Charts
- State triad allowed (Green/Cyan/Purple)
- Keep saturation muted; rely on labels + legend

---

## 10) Governance
Any new hue requires:
- purpose
- surfaces
- do/don't
- snapshot coverage
- accessibility check

No exceptions.