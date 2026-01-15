# Color Do's and Don'ts

**Cross-reference**: Extends [RecoveryOS Color System Constitution](packages/tokens/COLOR_SYSTEM.md)

Guidelines for proper color usage in the RecoveryOS design system.

## ✅ Do's (Constitution Compliant)

### Color Usage
- **Use the brand triad only**: Purple (interactions), Cyan (clarity), Green (energy)
- **Maintain 90-95% neutral ratio**: Neutrals carry the UI fabric
- **Use semantic state mapping**: Energy→Green, Clarity→Cyan, Anchorage→Purple
- **Respect world biases**: Companion (warm), Console (crisp), Command Centre (clear)
- **Test contrast**: Ensure 4.5:1 contrast ratio for accessibility
- **Use design tokens**: Always reference semantic tokens, never hardcode

### Implementation
- **Use CSS custom properties**: Reference token variables only
- **Document intent**: Comment color choices with constitutional purpose
- **Version control**: Track color changes in design system releases
- **Test across worlds**: Verify colors work in all three world biases

## ❌ Don'ts (Constitution Violations)

### Color Usage
- **Don't introduce new hues**: Only the established triad + neutrals
- **Don't use color for primary navigation**: Purple is for interactions only
- **Don't exceed color budgets**: Max 1 meaning accent per screen
- **Don't use red/orange/yellow**: Handled by shape + copy + contrast
- **Don't make buttons cyan/green**: Only purple for primary actions
- **Don't full-background color toasts**: Use thin rails + icons instead

### Implementation
- **Don't hardcode colors**: Always use CSS custom properties
- **Don't use color alone for meaning**: Always pair with icons, text, or other cues
- **Don't skip world testing**: Colors must work across all three worlds
- **Don't violate surface restrictions**: Follow the four-tier system strictly

## Constitution-Specific Rules

### Surface Restrictions
```css
/* ✅ Tier 1: Core UI - Neutrals only */
.card { background: var(--color-neutral-50); }
.text { color: var(--color-neutral-900); }

/* ✅ Tier 2: Interaction - Purple only */
.button-primary { background: var(--color-purple); }
.focus-ring { border-color: var(--color-purple); }

/* ✅ Tier 3: Meaning - Cyan OR Green */
.chart-bar { fill: var(--color-cyan); }
.success-indicator { color: var(--color-green); }

/* ❌ Wrong: Multiple meaning colors */
.problematic-view {
  --has-cyan: true;
  --has-green: true; /* Violation: only one meaning accent allowed */
}
```

### State Mapping Compliance
```css
/* ✅ Correct state usage */
.checkpoint-energy { color: var(--color-energy); }    /* Green */
.checkpoint-clarity { color: var(--color-clarity); }  /* Cyan */
.checkpoint-anchorage { color: var(--color-anchorage); } /* Purple */

/* ❌ Wrong: State colors in global chrome */
.primary-nav { color: var(--color-energy); } /* Violation: states for checkpoints only */
```

### World Bias Implementation
```css
/* ✅ World-aware implementation */
@media (prefers-color-scheme: dark) {
  .companion {
    --border-weight: var(--world-companion-border);
    --contrast-multiplier: var(--world-companion-contrast);
  }
  .console {
    --border-weight: var(--world-console-border);
    --contrast-multiplier: var(--world-console-contrast);
  }
}
```

## Common Constitution Violations to Avoid

### 1. Color Budget Violations
```css
/* ❌ Wrong - too many meaning colors */
.dashboard {
  --chart-color-1: var(--color-cyan);
  --chart-color-2: var(--color-green);
  --badge-color: var(--color-purple); /* Exceeds budget */
}

/* ✅ Correct - single meaning accent */
.dashboard {
  --chart-color-1: var(--color-cyan);
  --chart-color-2: var(--color-cyan-300); /* Same family */
  --badge-color: var(--color-neutral-600); /* Neutral */
}
```

### 2. Surface Tier Violations
```css
/* ❌ Wrong - meaning color in core UI */
.card-header { background: var(--color-green); } /* Tier 3 in Tier 1 */

/* ✅ Correct - neutral in core UI */
.card-header { background: var(--color-neutral-100); }
.card-accent { border-left: 3px solid var(--color-green); } /* Thin accent allowed */
```

### 3. State Color Misuse
```css
/* ❌ Wrong - state in navigation */
.nav-item.active { color: var(--color-energy); } /* States for checkpoints only */

/* ✅ Correct - interaction color in navigation */
.nav-item.active { color: var(--color-purple); }
.nav-item.active::before { background: var(--color-purple); }
```

### 4. World Bias Ignored
```css
/* ❌ Wrong - no world consideration */
.component { border-width: 2px; } /* Same everywhere */

/* ✅ Correct - world-aware */
.component {
  border-width: var(--world-console-border); /* Adjusts by world */
}
```

## RecoveryOS-Specific Guidelines

### Companion World (Warm, Soft)
- Prefer warmer neutral tones
- Softer border weights
- Reduced color usage overall

### Console World (Crisp, Clear)
- Sharper contrast ratios
- More cyan signal usage
- Clearer boundary definitions

### Command Centre World (High Clarity)
- Maximum contrast for accessibility
- Strongest semantic accents
- Clear governance indicators

## Accessibility First

### Color Contrast Requirements
- **4.5:1** for normal text (14pt and below)
- **3:1** for large text (18pt+ or 14pt+ bold)
- **3:1** for interactive elements
- **Test all world biases** for contrast compliance

### Motion Sensitivity
- Respect `prefers-reduced-motion`
- No flashing or strobing color changes
- Clear visual feedback without color dependence

### Color Vision Deficiency
- Test with color blindness simulators
- Never rely on color alone for meaning
- Provide redundant visual cues

## Governance References

- **[COLOR_SYSTEM.md](packages/tokens/COLOR_SYSTEM.md)** - Complete constitution
- **[COLOR_LINT_SPEC.md](docs/COLOR_LINT_SPEC.md)** - Automated enforcement
- **[TOKEN_USAGE.md](docs/TOKEN_USAGE.md)** - Implementation guide
- **[DESIGN_SYSTEM_CONSTITUTION.md](DESIGN_SYSTEM_CONSTITUTION.md)** - Core principles