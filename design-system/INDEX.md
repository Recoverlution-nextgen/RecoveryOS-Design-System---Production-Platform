# RecoveryOS Design System Index

## Overview
This directory contains the authoritative design system documentation for RecoveryOS. All design decisions, component specifications, and guidelines are maintained here.

## Directory Structure

### Core Files
- **[README.md](README.md)** - Main design system overview and principles
- **[tokens.json](tokens.json)** - Authoritative design tokens (colors, typography, spacing, etc.)
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Quick start guide for new team members

### Architecture
Complete system architecture and technical specifications:
- **[SYSTEM_COMPLETE.md](architecture/SYSTEM_COMPLETE.md)** - Complete system architecture overview
- **[CONTINUITY_LAYER.md](architecture/CONTINUITY_LAYER.md)** - Public language architecture and vocabulary
- **[WEBSITE_BUILD_SPEC.md](architecture/WEBSITE_BUILD_SPEC.md)** - Website technical specifications
- **[DEPLOYMENT_READY.md](architecture/DEPLOYMENT_READY.md)** - Deployment and infrastructure requirements

### Components
Detailed specifications for all UI components:
- **[ReturnButton.md](components/ReturnButton.md)** - Universal action surface
- **[COMPONENT_EVOLUTION.md](components/COMPONENT_EVOLUTION.md)** - Component development and evolution
- *More components to be added...*

### Assets
Asset governance and management system:
- **[ASSET_GOVERNANCE.md](assets/ASSET_GOVERNANCE.md)** - Asset governance integration and rules
- *Asset specifications and governance rules...*

### Motion
Motion design and animation specifications:
- **[MOTION.md](motion/MOTION.md)** - Motion design principles and guidelines
- **[MOTION_COMPLETE.md](motion/MOTION_COMPLETE.md)** - Complete motion architecture

### Tokens
Design token implementations:
- **[ ============================================================.md](tokens/ ============================================================.md)** - RecoveryOS token system (CSS)
- *Additional token formats and implementations...*

### Colors
Color system and palette specifications:
- **[{.md](colors/{.md)** - ColorJSON system and specifications
- *Color palette definitions and usage guidelines...*

### Icons
Icon system and glyph specifications:
- **[icon-system-inline.md](icons/icon-system-inline.md)** - Inline icon system for RecoveryOS
- *Icon glyph libraries and usage guidelines...*

### Patterns
Re-usable UI patterns and interaction models:
- **[UniversalPlayer.md](patterns/UniversalPlayer.md)** - Content delivery interface
- *More patterns to be added...*

### Guidelines
Design and development standards:
- **[accessibility.md](guidelines/accessibility.md)** - WCAG AA compliance requirements
- **[voice.md](guidelines/voice.md)** - Brand voice and language patterns
- **[PUBLIC_LANGUAGE.md](guidelines/PUBLIC_LANGUAGE.md)** - Public language and communication standards

## Maintenance Process

### Adding New Content
1. **Components**: Create detailed spec in `components/` directory
2. **Patterns**: Document reusable patterns in `patterns/` directory
3. **Guidelines**: Add standards to `guidelines/` directory
4. **Tokens**: Update `tokens.json` for any token changes

### Version Control
- **Major versions**: Breaking changes to core components
- **Minor versions**: New components or significant updates
- **Patch versions**: Documentation improvements, clarifications

### Review Process
All changes require:
- Design review for visual/UX changes
- Engineering review for technical feasibility
- Clinical review for mental health impact
- Accessibility review for compliance

## Reference Documents

### Historical (Context Only)
- `docs/infinitely, exponential, next-generation apple-grade...` - Original vision document
- `archive/kit/` - Component architecture exploration
- `archive/recoveryos.tokens.css/` - Token implementation details

### Active Development
- `packages/ui/` - Component implementations
- Storybook - Interactive component documentation
- Figma - Design mockups and prototypes

## Quick Start

### For Designers
1. Read [README.md](README.md) for core principles
2. Review [tokens.json](tokens.json) for available design tokens
3. Check [guidelines/](guidelines/) for standards
4. Reference [patterns/](patterns/) for common solutions

### For Developers
1. Read [README.md](README.md) for system overview
2. Use [tokens.json](tokens.json) for implementation
3. Follow [guidelines/accessibility.md](guidelines/accessibility.md)
4. Reference component specs in [components/](components/)

### For Product Managers
1. Read [README.md](README.md) for strategic alignment
2. Review [patterns/](patterns/) for user experience models
3. Check [guidelines/voice.md](guidelines/voice.md) for communication standards

## Contact & Support

- **Design Reviews**: All design changes require review
- **Technical Questions**: Component implementation guidance
- **Standards Updates**: Regular updates to guidelines and tokens

---

**Last Updated**: January 2026
**Version**: 1.0.0
