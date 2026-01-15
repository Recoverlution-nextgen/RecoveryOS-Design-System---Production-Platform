# Color Matrix

**Cross-reference**: This extends the [RecoveryOS Color System Constitution](packages/tokens/COLOR_SYSTEM.md)

## RecoveryOS Color Matrix

The RecoveryOS color system is governed by strict principles: 90-95% neutrals, Purple for interactions, Cyan/Green for meaning, and semantic state mapping.

## Primary Palette

### Core Brand Triad
- **Purple**: `#3b82f6` (Primary-500) - Interactions, identity, restoration
- **Cyan**: `#0ea5e9` (Secondary-500) - Precision, clarity, signal
- **Green**: `#22c55e` (Success-500) - Motion, energy, growth

### Neutral Scale (50-900)
Following the RecoveryOS neutral fabric:

| Shade | Hex       | Usage                          | RecoveryOS Role |
|-------|-----------|--------------------------------|-----------------|
| 50    | `#f9fafb` | Very light backgrounds         | Paper surfaces |
| 100   | `#f3f4f6` | Light backgrounds, cards       | Elevated surfaces |
| 200   | `#e5e7eb` | Subtle borders, dividers       | Subtle boundaries |
| 300   | `#d1d5db` | Medium borders, inactive states | Medium boundaries |
| 400   | `#9ca3af` | Placeholder text, icons        | Placeholder content |
| 500   | `#6b7280` | Body text, secondary content   | Secondary text |
| 600   | `#4b5563` | Primary text, headings         | Primary text |
| 700   | `#374151` | Strong text, emphasis          | Strong text |
| 800   | `#1f2937` | Dark backgrounds, overlays     | Dark surfaces |
| 900   | `#111827` | Very dark backgrounds          | Deep dark surfaces |

## Semantic Color Mapping

### State Triad (RecoveryOS Core)
Following the constitution's state mapping:
- **Energy** → Green (motion, growth, vitality)
- **Clarity** → Cyan (precision, insight, focus)
- **Anchorage** → Purple (restoration, presence, stability)

### World Bias Adjustments
- **Companion**: Warm-neutral bias, softer borders
- **Console**: Crisp-neutral bias, clearer borders, more cyan signals
- **Command Centre**: Highest clarity bias, strongest border contrast

## Usage Guidelines

### Surface Restrictions (Constitution Compliance)
- **Tier 1 (Core UI)**: Neutrals only + Purple for interactions
- **Tier 2 (Interaction)**: Purple only for CTAs, focus rings, selection
- **Tier 3 (Meaning)**: Cyan OR Green for charts, indicators, chips
- **Tier 4 (Marketing)**: Low-saturation gradients for hero assets

### Component Rules
- **Buttons**: Primary = Purple, Secondary = Neutral, Focus = Purple
- **Rails/Selection**: Purple indicators, neutral text
- **Chips**: May use Purple/Cyan/Green tints, neutral text inside
- **Charts**: State triad allowed (Green/Cyan/Purple), muted saturation

## Color Budget Enforcement

Per screen limits (constitution compliance):
- 95% neutral pixels
- 1 interaction accent: Purple
- 1 meaning accent max: Cyan OR Green
- State colors only in checkpoint/charts/indicators

## Accessibility Standards

### Contrast Requirements
- **Normal text**: 4.5:1 minimum (neutral-600 on neutral-50)
- **Large text**: 3:1 minimum (neutral-700 on neutral-100)
- **Interactive elements**: 3:1 minimum contrast
- **Focus indicators**: Purple focus ring with sufficient contrast

### Reduced Motion
- State transitions respect `prefers-reduced-motion`
- No color-only state changes (always pair with shape/size)
- Clear visual hierarchy without color dependence

## Implementation

### CSS Custom Properties
```css
:root {
  /* Core triad */
  --color-purple: #3b82f6;
  --color-cyan: #0ea5e9;
  --color-green: #22c55e;

  /* Neutral scale */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  /* ... etc */

  /* State mapping */
  --color-energy: var(--color-green);
  --color-clarity: var(--color-cyan);
  --color-anchorage: var(--color-purple);
}
```

### World Bias Tokens
```css
/* Companion world - warm, soft */
--world-companion-border: 1px;
--world-companion-contrast: 0.85;

/* Console world - crisp, clear */
--world-console-border: 2px;
--world-console-contrast: 1.0;

/* Command Centre world - high clarity */
--world-command-border: 3px;
--world-command-contrast: 1.15;
```

## Governance References

- **[COLOR_SYSTEM.md](packages/tokens/COLOR_SYSTEM.md)** - Complete constitution
- **[COLOR_DO_DONT.md](docs/COLOR_DO_DONT.md)** - Usage guidelines
- **[COLOR_LINT_SPEC.md](docs/COLOR_LINT_SPEC.md)** - Automated enforcement
- **[TOKEN_USAGE.md](docs/TOKEN_USAGE.md)** - Implementation guide