# Figma Outputs Package

This package (`@recoveryos/figma-outputs`) serves as a staging area for outputs from Figma Make and other creative UI tools.

## Purpose

- **Isolation**: Keep creative UI experiments and Figma-generated code separate from the canonical design system (`packages/ui`).
- **Staging**: Push Figma outputs here first, then review, cleanse, and integrate into the design system.
- **Workflow**: Figma Make can push directly to this folder via GitHub integration.

## Usage

1. Push Figma-generated components, styles, or assets to this package.
2. Review and align with design system tokens and patterns.
3. Move cleaned code to `packages/ui` or `lib/design-system`.
4. Delete from here after integration.

## Structure

- `index.ts`: Main entry point (currently empty).
- Add subfolders as needed for components, assets, etc.

## Notes

- This package is not built or published.
- Dependencies should be minimal; avoid importing from `packages/ui` to prevent circular deps.