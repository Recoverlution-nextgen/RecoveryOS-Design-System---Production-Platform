# Asset Copy Overlay Specification

Glass carve overlay system for therapeutic asset enhancement.

## Core Concept

Glass carve overlays apply subtle text treatments over therapeutic assets to enhance their psychological impact without overwhelming the visual experience.

## Overlay Types

### Paper White
**CSS**: `--asset-type-paper-white`
**Usage**: Clean, minimal overlays on dark or complex backgrounds
**Opacity**: 85-95%
**Typography**: Light weight, high contrast

### Rim
**CSS**: `--asset-type-rim`
**Usage**: Defined edges on organic or flowing assets
**Opacity**: 70-85%
**Typography**: Medium weight, defined contrast

### Bloom
**CSS**: `--asset-type-bloom`
**Usage**: Soft, expanding text on growth-themed assets
**Opacity**: 60-80%
**Typography**: Variable weight, organic feel

### Frost
**CSS**: `--asset-type-frost`
**Usage**: Icy, crystalline effects on clarity assets
**Opacity**: 75-90%
**Typography**: Thin weight, sharp contrast

## Typography Specifications

### Font Family
**Primary**: IBM Plex Sans (clean, modern, therapeutic)
**Fallback**: System UI font stack

### Font Sizes (Responsive Scale)
```css
--overlay-text-xs: clamp(0.75rem, 2vw, 1rem);    /* Mobile captions */
--overlay-text-sm: clamp(1rem, 3vw, 1.25rem);     /* Mobile body */
--overlay-text-base: clamp(1.25rem, 4vw, 1.5rem); /* Tablet body */
--overlay-text-lg: clamp(1.5rem, 5vw, 2rem);      /* Desktop headlines */
--overlay-text-xl: clamp(2rem, 6vw, 2.5rem);      /* Large displays */
```

### Font Weights
```css
--overlay-weight-thin: 100;
--overlay-weight-light: 300;
--overlay-weight-normal: 400;
--overlay-weight-medium: 500;
--overlay-weight-semibold: 600;
```

### Letter Spacing
```css
--overlay-tracking-tight: -0.025em;
--overlay-tracking-normal: 0;
--overlay-tracking-wide: 0.025em;
--overlay-tracking-wider: 0.05em;
```

## Positioning & Layout

### Anchor Points
- **Center**: Primary focal point, main message
- **Bottom**: Supporting text, credits
- **Top**: Contextual information, timestamps
- **Corners**: Minimal metadata, navigation

### Safe Zones
```css
--overlay-safe-zone: 5%; /* Minimum distance from edges */
--overlay-focal-zone: 20%; /* Preferred center area */
```

### Responsive Behavior
- **Mobile**: Single line, center positioning
- **Tablet**: 1-2 lines, flexible positioning
- **Desktop**: Multi-line, optimal positioning

## Color & Contrast

### Text Colors (by Overlay Type)
```css
/* Paper White */
--overlay-paper-text: rgba(255, 255, 255, 0.9);
--overlay-paper-shadow: rgba(0, 0, 0, 0.3);

/* Rim */
--overlay-rim-text: rgba(255, 255, 255, 0.85);
--overlay-rim-shadow: rgba(0, 0, 0, 0.4);

/* Bloom */
--overlay-bloom-text: rgba(255, 255, 255, 0.75);
--overlay-bloom-shadow: rgba(0, 0, 0, 0.2);

/* Frost */
--overlay-frost-text: rgba(248, 250, 252, 0.9);
--overlay-frost-shadow: rgba(15, 23, 42, 0.4);
```

### Background Treatments
- **Subtle Blur**: `backdrop-filter: blur(1px)`
- **Gradient Fade**: Linear gradient from transparent to semi-transparent
- **Border Accent**: Thin border matching text color

## Animation & Interaction

### Entrance Animations
```css
--overlay-enter-duration: 0.6s;
--overlay-enter-easing: cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover States
- **Opacity Increase**: +10% on hover
- **Scale Transform**: 1.02x subtle growth
- **Color Shift**: Slight warmth increase

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  --overlay-enter-duration: 0.2s;
  /* Disable scale transforms */
}
```

## Content Guidelines

### Copy Length
- **Micro**: 1-3 words (impactful, immediate)
- **Short**: 4-8 words (concise, memorable)
- **Medium**: 9-15 words (contextual, therapeutic)

### Tone Categories
- **Gentle**: Nurturing, supportive language
- **Direct**: Clear, action-oriented messaging
- **Contemplative**: Reflective, introspective tone
- **Empowering**: Strength-building, motivational

### Therapeutic Alignment
- **Growth**: Forward-moving, developmental
- **Calm**: Peaceful, centering language
- **Clarity**: Clear, focused messaging
- **Connection**: Relational, belonging-focused

## Implementation Examples

### Paper White on Neural Flower
```css
.overlay-paper {
  --asset-type-paper-white: rgba(255, 255, 255, 0.9);
  font-weight: var(--overlay-weight-light);
  text-align: center;
  bottom: var(--overlay-safe-zone);
}
```

### Rim on Flowstate
```css
.overlay-rim {
  --asset-type-rim: rgba(255, 255, 255, 0.8);
  font-weight: var(--overlay-weight-medium);
  text-align: left;
  top: var(--overlay-safe-zone);
}
```

### Bloom on Evolving Forms
```css
.overlay-bloom {
  --asset-type-bloom: rgba(255, 255, 255, 0.7);
  font-weight: var(--overlay-weight-normal);
  text-align: center;
  background: radial-gradient(ellipse, transparent 0%, rgba(0,0,0,0.1) 100%);
}
```

## Accessibility Considerations

### Screen Readers
- All overlay text must have appropriate ARIA labels
- Context provided for abbreviated or symbolic text
- Semantic structure maintained

### Color Contrast
- Minimum 4.5:1 contrast ratio against background
- Tested across all overlay types and asset styles
- Fallback colors for low-contrast situations

### Motion Sensitivity
- Respect `prefers-reduced-motion` settings
- Subtle animations only, no jarring effects
- Option to disable animations entirely

## Performance Optimization

### Rendering
- Use `will-change: opacity` for animated overlays
- Optimize text rendering with `text-rendering: optimizeLegibility`
- Minimize DOM nodes for overlay elements

### Loading
- Lazy-load overlay content with asset
- Preload critical overlay fonts
- Cache overlay stylesheets

### Bundle Size
- Extract overlay styles to separate CSS file
- Use CSS custom properties for dynamic theming
- Minimize unused overlay type styles