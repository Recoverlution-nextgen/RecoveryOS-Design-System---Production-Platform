# Color Lint Specification

Automated color governance rules for the Recoverlution design system.

## Lint Rules

### color/no-hardcoded-colors
**Severity**: Error
**Description**: Prevents hardcoded color values in component styles

**Valid**:
```css
.button {
  background: var(--color-primary-500);
  color: var(--color-neutral-50);
}
```

**Invalid**:
```css
.button {
  background: #6366f1; /* Hardcoded hex */
  color: rgb(255, 255, 255); /* Hardcoded rgb */
}
```

### color/allowed-color-functions
**Severity**: Error
**Description**: Restricts color functions to approved methods

**Allowed**:
- CSS custom properties: `var(--color-token)`
- Transparent colors: `transparent`
- Current color: `currentColor`
- Inherit: `inherit`

**Not Allowed**:
- Hex codes: `#ff0000`
- RGB/RGBA: `rgb(255, 0, 0)`
- HSL/HSLA: `hsl(0, 100%, 50%)`
- Named colors: `red`, `blue`

### color/semantic-color-usage
**Severity**: Warning
**Description**: Encourages semantic color usage over generic colors

**Preferred**:
```css
.success-message { color: var(--color-success-600); }
.error-text { color: var(--color-error-600); }
.warning-banner { background: var(--color-warning-100); }
```

**Allowed but discouraged**:
```css
.success-message { color: var(--color-green-600); } /* Use semantic instead */
```

### color/contrast-minimum
**Severity**: Error
**Description**: Enforces minimum contrast ratios for accessibility

**Checks**:
- Normal text: ≥ 4.5:1 contrast ratio
- Large text: ≥ 3:1 contrast ratio
- Interactive elements: ≥ 3:1 contrast ratio
- Graphical elements: ≥ 3:1 contrast ratio

### color/neutral-scale-consistency
**Severity**: Warning
**Description**: Ensures consistent use of neutral scale for text hierarchy

**Valid patterns**:
```css
.primary-text { color: var(--color-neutral-900); }
.secondary-text { color: var(--color-neutral-600); }
.tertiary-text { color: var(--color-neutral-400); }
```

## Implementation

### Script Integration
Add to `package.json`:
```json
{
  "scripts": {
    "lint:color": "stylelint '**/*.{css,scss}' --config packages/config/stylelint.config.js --custom-syntax postcss-scss"
  }
}
```

### CI Integration
```yaml
# .github/workflows/ci.yml
- name: Lint Colors
  run: npm run lint:color
```

## Custom Rules

### color/brand-color-usage
**Severity**: Warning
**Description**: Monitors usage of brand colors to prevent overuse

**Logic**:
- Count occurrences of `--color-primary-*` and `--color-secondary-*`
- Warn if ratio exceeds 1:10 (brand colors vs neutral colors)

### color/color-palette-completeness
**Severity**: Error
**Description**: Ensures all required color shades are defined

**Required shades**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
**Required colors**: primary, secondary, neutral, success, warning, error

## Error Messages

### Clear and Actionable
```
❌ Hardcoded color detected
Use var(--color-primary-500) instead of #6366f1
See: docs/COLOR_DO_DONT.md#hardcoded-colors
```

### Contextual
```
❌ Insufficient contrast ratio
Text contrast 3.2:1 < required 4.5:1
Foreground: var(--color-neutral-400)
Background: var(--color-neutral-100)
```

## Exemptions

### Allowed Hardcoded Colors
- `transparent`
- `currentColor`
- `inherit`
- `initial`
- `unset`

### File Exclusions
- `node_modules/`
- `dist/`
- `build/`
- `*.min.css`
- Third-party libraries

## Performance Considerations

### Fast Feedback
- Lint only changed files in CI
- Cache results between runs
- Parallel processing for large codebases

### Selective Enforcement
- Strict rules for component libraries
- Relaxed rules for documentation sites
- Different rulesets for different package types