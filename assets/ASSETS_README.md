# RecoveryOS Asset System

## Overview

The RecoveryOS asset system provides a sophisticated, governed approach to managing expressive brand assets that amplify identity without contaminating UI clarity. This system scales infinitely while maintaining strict governance through multi-axis tagging and automated validation.

## Core Principles

1. **Governed Expression**: Assets amplify brand identity through controlled, purposeful expression
2. **Infinite Scalability**: New assets fit cleanly into existing taxonomy without drift
3. **Multi-Axis Discovery**: Precise asset finding through structured metadata
4. **Automated Governance**: CI/CD enforcement prevents tag swamps and naming drift
5. **Framework Integration**: Direct mapping to RecoveryOS pillars, concepts, and themes

## System Architecture

### Directory Structure
```
assets/
├── taxonomy.framework.json          # Controlled vocabulary registry
├── asset-manifest.schema.json       # JSON schema validation
├── asset-manifest.example.json      # Example manifests
├── ASSET_TAGGING_MODEL.md          # Complete tagging documentation
├── ASSET_GOVERNANCE_STRUCTURE.md   # Folder structure rules
├── ASSET_PACKLIST.md               # Asset creation priorities
├── ASSET_MATRIX.md                 # World/state/content mapping
├── ASSET_SYSTEM.md                 # Brush library and treatments
├── ASSET_SPEC_SHEET.template.md    # Asset specification template
├── ASSETS_README.md                # This file
├── __exports/                      # Published asset exports
├── __archive/                      # Deprecated assets
└── [asset-folders]/               # Individual asset folders
    └── ASSET_ID/
        ├── ASSET_ID.spec.md        # Asset specification
        ├── asset.meta.json     # Structured metadata
        ├── exports/               # Working export files
        └── [source-files]/        # Source assets
```

### Asset Folder Naming
Assets use the pattern: `ARCTYPE_SCOPE_NAME`

Examples:
- `KV_COMPANION_BECOMING_PATH`
- `COVER_INSIGHT_SIGNAL_MAP`
- `STAMP_PROOF_HELD`
- `ICON_NAVIGATION_HOME`

## Multi-Axis Tagging System

### Required Axes (Exactly 1 per asset)
- **Association**: Primary role (brand_hero, journey, navicue, baseline, proof_receipt, system_diagram, cover, icon, motion)
- **World**: Contextual environment (companion, console, command_centre, neutral)
- **State**: Emotional condition (energy, clarity, anchorage, neutral)

### Optional Axes
- **Content Type**: Library classification (article, insight, practice, audio, series, proof)
- **Format**: Technical presentation (hero_wide, card, square, tile, diagram, stamp, icon_16, icon_24, lottie)
- **Brush**: Visual treatment (duotone_purple_base, xpro_purple_ink, aurora_purple_ink, grain_01)

### Framework Tags (Controlled Vocabulary)
- **Pillars** (Max 1): Core RecoveryOS pillars
- **Concepts** (Max 3): Psychological/neurological concepts
- **Themes** (Max 3): Practical, actionable themes

## Governance Rules

**These constraints prevent tag swamps:**

1. **Exactly 1 association** per asset
2. **Required world and state** (use `neutral` for universal assets)
3. **Maximum 1 pillar** per asset
4. **Maximum 3 concepts** per asset
5. **Maximum 3 themes** per asset
6. **No custom tags** - all tags must come from `taxonomy.framework.json`

## Asset Creation Workflow

### 1. Plan the Asset
- Determine association, world, state, and format
- Identify relevant framework tags from taxonomy
- Write clear intent statement
- Define required export formats

### 2. Create Asset Folder
```bash
mkdir assets/ASSET_ID
cd assets/ASSET_ID
```

### 3. Create Specification
Copy `ASSET_SPEC_SHEET.template.md` and fill in details:
- Asset purpose and intent
- Technical specifications
- Export requirements
- Framework mapping

### 4. Create Manifest
Create `asset.meta.json` following the schema:
```json
{
  "id": "ASSET_ID",
  "association": "brand_hero",
  "world": "companion",
  "state": "anchorage",
  "format": "hero_wide",
  "brush": "duotone_purple_base",
  "tags": {
    "pillars": ["pillar.identity_integration"],
    "concepts": ["concept.self_compassion_shame_soothing"],
    "themes": ["theme.proof_capture"]
  },
  "intent": "Clear intent statement",
  "files": {
    "src": "/assets/__exports/webp/ASSET_ID__anchorage__companion__hero-wide__light__v1.webp"
  },
  "version": "v1",
  "priority": 90
}
```

### 5. Create Exports
- Place working files in `exports/` folder
- Follow naming pattern: `ASSET_ID__state__world__format__theme__v{version}.{ext}`
- Export to `__exports/` for publishing

### 6. Validate
```bash
npm run lint:asset
```

## Frontend Integration

### Basic Usage
```typescript
import { findAsset, useAsset } from '@/hooks/useAssets';

// Find specific asset
const heroAsset = findAsset({
  association: 'brand_hero',
  world: 'companion',
  state: 'anchorage'
});

// React hook
const heroAsset = useAsset({
  association: 'brand_hero',
  world: 'companion',
  state: 'anchorage'
});
```

### Advanced Queries
```typescript
// Find by framework tags
const identityAssets = findAssets({
  tags: {
    pillars: ['pillar.identity_integration']
  }
});

// Find by multiple criteria
const companionAnchorageHeroes = findAssets({
  association: 'brand_hero',
  world: 'companion',
  state: 'anchorage',
  format: 'hero_wide'
});
```

### Specialized Hooks
```typescript
// Hero assets
const hero = useHeroAsset('companion', 'anchorage');

// Proof assets
const proof = useProofAsset('neutral', 'energy');

// Cover assets
const cover = useCoverAsset('insight', 'tile');

// Icons
const icon = useIconAsset('navigation_home', 'icon_24');
```

## Brush Library

### Duotone Treatments
- `duotone_purple_base` - Primary purple duotone
- `duotone_purple_cyan` - Purple-cyan variant
- `duotone_purple_green` - Purple-green variant

### X-Pro Treatments
- `xpro_purple_ink` - Cinematic purple treatment

### Aurora Treatments
- `aurora_purple_ink` - Ethereal purple treatment

### Grain Textures
- `grain_01` through `grain_05` - Subtle texture overlays

## Export Standards

### Formats
- **WebP**: Primary web format (lossless for UI, lossy for photos)
- **PNG**: Transparency and lossless requirements
- **SVG**: Vector graphics and icons
- **Lottie**: Motion graphics

### Naming Pattern
```
ASSET_ID__state__world__format__theme__v{version}.{ext}
```

Examples:
- `KV_COMPANION_BECOMING__anchorage__companion__hero-wide__light__v1.webp`
- `STAMP_PROOF_HELD__energy__neutral__stamp__v1.svg`

### Density Variants
- `src`: 1x base resolution
- `src2x`: 2x high-DPI
- `src3x`: 3x ultra high-DPI

## Asset Priority System

Assets include a priority score (0-100) for selection logic:

- **90-100**: Core brand assets, highest priority
- **70-89**: Primary content assets
- **50-69**: Secondary assets
- **30-49**: Utility assets
- **10-29**: Experimental assets
- **0-9**: Deprecated assets

## Validation & Governance

### Automated Checks
The asset linting system enforces:

- ✅ Required file presence
- ✅ Asset ID naming compliance
- ✅ Export naming patterns
- ✅ Manifest schema validation
- ✅ Taxonomy compliance
- ✅ Governance rule enforcement
- ✅ File reference validation

### CI/CD Integration
```bash
npm run lint:asset  # Validates all assets
npm run lint        # Includes asset validation
```

## Asset Creation Priorities

Following `ASSET_PACKLIST.md`:

### P0 (Critical Foundation)
- Brand signature kit (duotone/xpro/aurora presets)
- World key visuals (KV_COMPANION_*, KV_CONSOLE_*, etc.)

### P1 (Proof System)
- Receipt cards and proof stamps
- Tangible governance artifacts

### P2 (Content System)
- Cover assets for content types
- Diagram library
- Icon system

### P3 (Motion & Advanced)
- Lottie animations
- Interactive assets

## Taxonomy Management

The `taxonomy.framework.json` file contains all valid tags:

```json
{
  "pillars": [
    { "id": "pillar.emotional_regulation", "label": "Emotional Regulation" }
  ],
  "concepts": [
    { "id": "concept.arousal_regulation", "label": "Arousal Regulation" }
  ],
  "themes": [
    { "id": "theme.downshift_under_load", "label": "Downshift Under Load" }
  ]
}
```

**Never add custom tags** - extend the taxonomy file instead.

## Migration & Maintenance

### Adding New Assets
1. Follow the creation workflow above
2. Test with `npm run lint:asset`
3. Commit with clear description

### Updating Taxonomy
1. Edit `taxonomy.framework.json`
2. Update relevant documentation
3. Test all assets still validate

### Deprecating Assets
1. Move to `__archive/` folder
2. Set priority to 0-9
3. Update any references

## Troubleshooting

### Common Issues

**"Invalid association"**
- Check `ASSET_TAGGING_MODEL.md` for valid associations
- Ensure exactly one association per asset

**"Tag not found in taxonomy"**
- All tags must come from `taxonomy.framework.json`
- Check spelling and case sensitivity

**"Too many concepts/themes"**
- Maximum 3 concepts, 3 themes per asset
- Consider splitting into multiple assets

**"Missing required files"**
- Each asset needs: `spec.md`, `exports/`, `asset.meta.json`

### Getting Help

1. Check `ASSET_TAGGING_MODEL.md` for detailed tagging rules
2. Review `asset-manifest.example.json` for manifest structure
3. Run `npm run lint:asset` for specific validation errors
4. See `ASSET_GOVERNANCE_STRUCTURE.md` for folder structure rules

## Future Enhancements

- Async asset loading with React Suspense
- Asset performance monitoring
- Automated export generation
- Visual asset diffing
- Collaborative asset review workflows