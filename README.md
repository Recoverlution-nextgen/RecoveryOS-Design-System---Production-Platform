# Recoverlution Platform

A governed design system and asset management platform for therapeutic visual experiences.

## What This Is

- **Design System**: Token-based component library with TypeScript, React, and Supabase integration
- **Asset Management**: Governed therapeutic asset catalog with universal tagging and governance
- **Performance Optimized**: CDN-ready with image optimization, caching, and responsive delivery
- **Developer Experience**: Monorepo with automated tooling, testing, and documentation

## What This Isn't

- A general-purpose UI library (RecoveryOS-specific therapeutic focus)
- A CMS or content management system (asset governance only)
- A marketing website builder (platform components only)
- A data visualization library (therapeutic assets only)

## Repository Structure

```
/packages              # Governed design system packages
  /schema             # Asset schemas and taxonomy registries
  /tokens             # Design tokens (colors, typography, motion)
  /ui                 # React component library
  /assets             # Asset runtime helpers and utilities
  /copy               # Glass carve overlay copy system
  /config             # Build and tooling configuration
/scripts              # Asset generation, validation, and governance
/docs                 # Design system documentation and specifications
/assets               # Asset specifications and local mirrors
/apps                 # Reference implementations and snapshots
```

## Quick Start

```bash
# Install dependencies
npm install

# Validate assets and tokens
npm run validate:assets
npm run lint:color

# Build design system
npm run build

# Start documentation
npm run docs
```

## Governance

This repository enforces design system governance through:

- **Asset Governance**: Universal tagging, taxonomy validation, manifest generation
- **Color Governance**: Token usage validation, linting, and matrix compliance
- **Component Governance**: Type safety, accessibility standards, and testing
- **Performance Governance**: CDN optimization, caching strategies, and monitoring

See [DESIGN_SYSTEM_CONSTITUTION.md](DESIGN_SYSTEM_CONSTITUTION.md) for complete governance rules.</content>
<parameter name="filePath">/Users/danielfincham/recoverlution-platform/README.md