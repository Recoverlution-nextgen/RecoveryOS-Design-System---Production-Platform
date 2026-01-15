# RecoveryOS Design System

## Introduction

The RecoveryOS Design System is a comprehensive platform for building therapeutic digital experiences. It provides the visual language, component library, and architectural patterns necessary to support individuals on their recovery journeys.

## System Architecture

### Design Tokens

At the foundation of RecoveryOS are design tokens—atomic design decisions that cascade throughout the entire system:

- **Primitive Tokens**: Raw values (colors, sizes, weights)
- **Semantic Tokens**: Purpose-driven mappings (brand colors, spacing scales)
- **Component Tokens**: Specific applications (button padding, card shadows)

This three-tier system ensures consistency while enabling flexibility across different contexts.

### Component Library

The component library provides pre-built, accessible UI elements:

- **Navigation Components**: Headers, menus, breadcrumbs
- **Content Components**: Cards, articles, media players
- **Interactive Components**: Buttons, forms, modals
- **Feedback Components**: Alerts, toasts, progress indicators

Each component is built with accessibility standards (WCAG 2.1 AA) and therapeutic considerations in mind.

### Asset Governance

A universal tagging system categorizes all content across multiple axes:

- **World Axis**: Companion, Console, Command
- **Framework Axis**: Baseline, Pillars, Concepts
- **State Axis**: Energy, Clarity, Anchorage
- **Content Type Axis**: Navicue, Journey, Article, Insight, Practice, Audio, Story, Series

This multidimensional system enables intelligent content discovery and recommendation.

## Technical Implementation

### Technology Stack

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript for type safety
- **Styling**: CSS Variables with CSS Modules
- **Backend**: Supabase for data and auth
- **Deployment**: Vercel for edge optimization

### Pages Router Architecture

The application uses Next.js Pages Router for:

- Static optimization of content pages
- Simple routing with file-based structure
- Built-in API routes for backend integration
- Incremental Static Regeneration for dynamic content

### Styling Approach

The system employs a hybrid CSS approach:

1. **Global Tokens**: CSS variables in `tokens.css`
2. **Global Styles**: Base typography and layout in `globals.css`
3. **Component Styles**: Scoped styles via CSS Modules or inline
4. **Utility Classes**: Minimal utility layer for common patterns

## Content Strategy

### Documentation

All documentation is written in Markdown and rendered dynamically:

- **Operating Truth**: Foundational principles and philosophy
- **Component Docs**: Usage guides and examples
- **Implementation Guides**: Technical how-tos
- **Content Guidelines**: Therapeutic content standards

### Therapeutic Content

The platform serves various content types:

- **Navicues**: Quick navigational guidance
- **Journeys**: Structured multi-step experiences
- **Articles**: In-depth educational content
- **Insights**: Brief moments of clarity
- **Practices**: Actionable exercises
- **Audio**: Guided meditations and talks
- **Stories**: Personal narratives
- **Series**: Organized content collections

## Development Workflow

### Local Development

```bash
npm install --no-workspaces
npm run dev
```

### Building for Production

```bash
npm run build -- --no-lint
npm start
```

### Deployment

The system deploys automatically to Vercel on push to main:

- Install command: `npm install --no-workspaces`
- Build command: `npm run build -- --no-lint`
- Framework preset: Next.js

## Future Directions

### Planned Enhancements

- **Component Playground**: Interactive component explorer
- **Theme Customization**: User-configurable color schemes
- **Analytics Integration**: Therapeutic progress tracking
- **Content Recommendations**: ML-powered content discovery
- **Mobile Applications**: Native iOS and Android experiences

### Governance Model

The design system follows a centralized governance model:

- **Design Council**: Reviews and approves design changes
- **Component Review**: Ensures quality and accessibility
- **Content Curation**: Maintains therapeutic standards
- **Technical Standards**: Enforces architectural consistency

## Conclusion

RecoveryOS represents a new paradigm in therapeutic digital experiences—one that honors the complexity of recovery while providing clear, compassionate guidance. Through systematic design, universal governance, and thoughtful implementation, we create spaces where healing can flourish.
