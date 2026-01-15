# Token Usage Guide

**Cross-reference**: Implements [Design System Constitution](DESIGN_SYSTEM_CONSTITUTION.md) "Tokens are law" principle

How to properly use design tokens in the Recoverlution design system.

## CSS Custom Properties

All design tokens are available as CSS custom properties:

```css
/* Colors */
--color-primary-500: #6366f1;
--color-neutral-900: #0f172a;

/* Spacing */
--space-4: 1rem;
--space-8: 2rem;

/* Typography */
--font-size-lg: 1.125rem;
--font-weight-semibold: 600;

/* Border Radius */
--radius-md: 0.375rem;

/* Shadows */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

## Usage in Components

### CSS-in-JS (Styled Components)
```tsx
import styled from 'styled-components';

const Button = styled.button`
  background: var(--color-primary-500);
  color: var(--color-neutral-50);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--color-primary-600);
  }

  &:disabled {
    background: var(--color-neutral-300);
    color: var(--color-neutral-500);
  }
`;
```

### Tailwind CSS (if used)
```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          500: 'var(--color-primary-500)',
          900: 'var(--color-primary-900)',
        }
      },
      spacing: {
        18: 'var(--space-18)',
      }
    }
  }
}
```

### Vanilla CSS
```css
.component {
  color: var(--color-neutral-900);
  margin: var(--space-4);
}
```

## JavaScript/TypeScript Usage

### Theme Object Access
```tsx
import { theme } from '@recoverlution/tokens';

function Component() {
  return (
    <div
      style={{
        color: theme.colors.neutral[900],
        padding: theme.spacing[4]
      }}
    >
      Content
    </div>
  );
}
```

### CSS-in-JS Libraries
```tsx
import { css } from '@emotion/react';
import { theme } from '@recoverlution/tokens';

const styles = css`
  color: ${theme.colors.primary[500]};
  font-size: ${theme.fontSize.lg};
`;
```

## Token Categories

### Colors
- **Primary**: Brand actions, links, CTAs
- **Secondary**: Supporting actions, secondary buttons
- **Neutral**: Text, backgrounds, borders (50-900 scale)
- **Success/Warning/Error**: Status indicators, form validation

### Spacing
- **Scale**: 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96
- **Usage**: Margins, padding, positioning
- **Unit**: rem (relative to root font size)

### Typography
- **Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
- **Weights**: thin, light, normal, medium, semibold, bold, extrabold, black
- **Families**: Primary (IBM Plex Sans), monospace (IBM Plex Mono)

### Layout
- **Border Radius**: none, sm, md, lg, xl, 2xl, 3xl, full
- **Shadows**: sm, md, lg, xl, 2xl, inner, none
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

## Best Practices

### 1. Use Semantic Tokens
```tsx
/* ✅ Good - semantic meaning */
const primaryButton = css`
  background: var(--color-primary-500);
`;

/* ❌ Avoid - presentational */
const blueButton = css`
  background: #6366f1;
`;
```

### 2. Consistent Spacing
```tsx
/* ✅ Good - consistent scale */
const card = css`
  padding: var(--space-6);
  margin-bottom: var(--space-4);
`;

/* ❌ Avoid - arbitrary values */
const card = css`
  padding: 1.5rem;
  margin-bottom: 1rem;
`;
```

### 3. Responsive Design
```tsx
const responsiveText = css`
  font-size: var(--font-size-sm);

  @media (min-width: 768px) {
    font-size: var(--font-size-base);
  }

  @media (min-width: 1024px) {
    font-size: var(--font-size-lg);
  }
`;
```

### 4. Theme Overrides
```tsx
// For dark mode or theme variants
const darkTheme = {
  colors: {
    background: 'var(--color-neutral-900)',
    text: 'var(--color-neutral-50)',
  }
};
```

## Migration Guide

### From Hardcoded Values
```tsx
// Before
const styles = {
  color: '#0f172a',
  margin: '1rem',
  borderRadius: '0.375rem'
};

// After
const styles = {
  color: 'var(--color-neutral-900)',
  margin: 'var(--space-4)',
  borderRadius: 'var(--radius-md)'
};
```

### From Other Token Systems
```tsx
// From Material Design
// theme.palette.primary.main → theme.colors.primary[500]

// From Custom System
// theme.brand.primary → theme.colors.primary[500]
```

## Tooling Support

### Editor Integration
- CSS custom property autocomplete
- Token validation in linting
- Theme object IntelliSense in TypeScript

### Build-time Validation
- Token existence checks
- Usage analytics
- Deprecation warnings