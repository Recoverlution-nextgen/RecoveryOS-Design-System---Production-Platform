# Figma Outputs Package

This package (`@recoveryos/figma-outputs`) serves as a staging area for outputs from Figma Make and other creative UI tools.

## Purpose

- **Isolation**: Keep creative UI experiments and Figma-generated code separate from the canonical design system (`packages/ui`).
- **Staging**: Push Figma outputs here first, then review, cleanse, and integrate into the design system.
- **Workflow**: Figma Make can push directly to this folder via GitHub integration.

## Organization Structure

Outputs are broken down into smallest possible parts across multiple dimensions:

### Marketing Site
- **Components**:
  - `marketing-components/`: Marketing-specific UI components

### Platform
- **Components**:
  - `universal-player/`: Universal Player component
  - `luma/`: LUMA component
  - `navicues/`: Navicues component
  - `journey/`: Journey component
- **Shells**:
  - `platform-shell/`: Platform shell/layout

### Supabase
- **Integrations**: Supabase integration code and configurations
- **APIs**: API definitions and related code

## Usage

1. Push Figma-generated components, styles, or assets to the appropriate subfolder above.
2. Review and align with design system tokens and patterns.
3. Move cleaned code to `packages/ui` or `lib/design-system`.
4. Delete from here after integration.

## Structure

- `index.ts`: Main entry point (currently empty).
- Add subfolders as needed for components, assets, etc.

## Notes

- This package is not built or published.
- Dependencies should be minimal; avoid importing from `packages/ui` to prevent circular deps.