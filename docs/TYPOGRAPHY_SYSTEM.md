# Typography System

**Cross-reference**: Extends [Design System Constitution](DESIGN_SYSTEM_CONSTITUTION.md) and [Token Usage Guide](TOKEN_USAGE.md)

Comprehensive typography system for the Recoverlution design system using IBM Plex superfamily, following RecoveryOS constitution principles of tokens-as-law and universal accessibility.

## Font Family Stack

### Primary Typeface: IBM Plex Sans
**Weights Available**: 100, 200, 300, 400, 500, 600, 700
**Character Set**: Extended Latin, Cyrillic, Greek
**Usage**: Primary UI text, headings, body copy

### Monospace: IBM Plex Mono
**Weights Available**: 100, 200, 300, 400, 500, 600, 700
**Character Set**: Extended Latin, Cyrillic, Greek
**Usage**: Code, data display, technical content

### Serif (Optional): IBM Plex Serif
**Weights Available**: 100, 200, 300, 400, 500, 600, 700
**Character Set**: Extended Latin, Cyrillic, Greek
**Usage**: Long-form content, editorial, quotes

## Type Scale

### Modular Scale
Base size: 16px (1rem)
Ratio: 1.25 (Major Third)

| Scale | px | rem | Usage |
|-------|----|-----|-------|
| xs | 12px | 0.75rem | Captions, metadata |
| sm | 14px | 0.875rem | Secondary text, labels |
| base | 16px | 1rem | Body text, default |
| lg | 20px | 1.25rem | Large body, emphasis |
| xl | 25px | 1.5625rem | Subheadings, cards |
| 2xl | 31px | 1.9375rem | Headings, hero text |
| 3xl | 39px | 2.4375rem | Large headings |
| 4xl | 49px | 3.0625rem | Hero headings |
| 5xl | 61px | 3.8125rem | Display text |
| 6xl | 76px | 4.75rem | Large display |
| 7xl | 95px | 5.9375rem | Maximum impact |
| 8xl | 119px | 7.4375rem | Exceptional cases |
| 9xl | 149px | 9.3125rem | Rare, high-impact |

## Font Weight Scale

| Weight | Value | Usage | Optical Size |
|--------|-------|-------|--------------|
| Thin | 100 | Large display text | 48px+ |
| Extra Light | 200 | Large headings | 36px+ |
| Light | 300 | Headings, emphasis | 24px+ |
| Regular | 400 | Body text, UI elements | All sizes |
| Medium | 500 | Subheadings, buttons | 18px+ |
| Semi Bold | 600 | Emphasis, CTAs | 16px+ |
| Bold | 700 | Strong emphasis | 14px+ |

## Line Heights

### Body Text
- **Tight**: 1.25 (20px at 16px base)
- **Normal**: 1.5 (24px at 16px base)
- **Relaxed**: 1.75 (28px at 16px base)

### Headings
- **Tight**: 1.1 (scale-relative)
- **Normal**: 1.2 (scale-relative)
- **Loose**: 1.3 (scale-relative)

## Letter Spacing

### General Text
- **Tight**: -0.025em (condensed)
- **Normal**: 0 (default)
- **Wide**: 0.025em (expanded)
- **Extra Wide**: 0.05em (spaced)

### Display Text
- **Tight**: -0.05em (for large sizes)
- **Normal**: -0.025em (for large sizes)
- **Wide**: 0 (for large sizes)

## Usage Guidelines

### Headings Hierarchy
```html
<h1 class="text-4xl font-semibold tracking-tight">Page Title</h1>
<h2 class="text-2xl font-medium tracking-tight">Section Title</h2>
<h3 class="text-xl font-medium tracking-normal">Subsection Title</h3>
<h4 class="text-lg font-medium tracking-normal">Component Title</h4>
```

### Body Text
```html
<p class="text-base font-normal leading-normal">
  Primary body text for readable content.
</p>

<p class="text-sm font-normal leading-normal text-neutral-600">
  Secondary content, captions, or metadata.
</p>
```

### Interactive Elements
```html
<button class="text-sm font-medium tracking-wide">
  Button Text
</button>

<a class="text-sm font-medium underline">
  Link Text
</a>
```

## Responsive Typography

### Fluid Typography
```css
.clamp-heading {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.2;
}
```

### Breakpoint Adjustments
```css
.responsive-text {
  font-size: var(--text-sm);
}

@media (min-width: 768px) {
  .responsive-text {
    font-size: var(--text-base);
  }
}

@media (min-width: 1024px) {
  .responsive-text {
    font-size: var(--text-lg);
  }
}
```

## Accessibility Considerations

### Contrast Requirements
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text**: 3:1 minimum contrast ratio (18pt+ or 14pt+ bold)
- **Interactive Text**: 4.5:1 minimum contrast ratio

### Readability
- **Line Length**: 45-75 characters per line optimal
- **Line Height**: Minimum 1.5 for body text
- **Font Size**: Minimum 14px for body text (16px preferred)

### Screen Readers
- **Semantic HTML**: Use proper heading hierarchy
- **Text Alternatives**: Provide alt text for icon fonts
- **Language Declaration**: Declare document language

## Performance Optimization

### Font Loading Strategy
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/ibm-plex-sans-regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font face declarations -->
<style>
  @font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/ibm-plex-sans-regular.woff2') format('woff2');
  }
</style>
```

### Subsetting
- **Latin Basic**: A-Z, a-z, 0-9, punctuation
- **Latin Extended**: Accented characters
- **Cyrillic**: Russian character support
- **Greek**: Greek character support

### Fallback Strategy
```css
font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

## Implementation

### CSS Custom Properties
```css
:root {
  --font-family-sans: 'IBM Plex Sans', system-ui, sans-serif;
  --font-family-mono: 'IBM Plex Mono', 'SF Mono', monospace;
  --font-family-serif: 'IBM Plex Serif', Georgia, serif;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  /* ... etc */

  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  /* ... etc */
}
```

### Utility Classes
```css
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.tracking-tight { letter-spacing: var(--letter-spacing-tight); }
```

## Quality Assurance

### Visual Testing
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Cross-platform**: macOS, Windows, Linux, mobile
- **High-DPI**: Retina and 4K display support
- **Color contrast**: Automated contrast ratio checking

### Performance Testing
- **Font loading**: Measure font display swap time
- **Layout shift**: Monitor CLS (Cumulative Layout Shift)
- **Bundle size**: Track font file sizes
- **Caching**: Verify font caching strategies

### Accessibility Testing
- **Screen readers**: NVDA, JAWS, VoiceOver
- **Color blindness**: Deuteranopia, protanopia, tritanopia
- **Motion sensitivity**: Reduced motion preferences
- **High contrast**: Windows high contrast mode