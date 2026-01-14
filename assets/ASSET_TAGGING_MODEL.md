# RecoveryOS Asset Tagging Model

## Overview

RecoveryOS uses a sophisticated multi-axis tagging system that prevents "tag swamps" while enabling precise asset discovery. Assets receive structured metadata rather than freeform tags, ensuring consistency and discoverability.

## Governance Rules

**These constraints keep the system elegant:**

- Each asset must have exactly **1 association** (primary role)
- **World** is required (use `neutral` only for universal assets)
- **State** is required (use `neutral` if truly state-agnostic)
- **Pillars**: Maximum 1 per asset (otherwise meaningless)
- **Concepts**: Maximum 3 per asset
- **Themes**: Maximum 3 per asset
- If an asset needs more than these limits, it's not "one asset" — it's a set

**Tags must come from the controlled taxonomy registry.** No custom strings allowed.

## Tagging Axes

### A) Association (Required - Exactly 1)
What role does this asset play in the system?

- `brand_hero` - Primary brand expression, key visuals
- `journey` - Journey markers and waypoints
- `navicue` - Navigation cues and signposts
- `baseline` - Foundational elements (or `sentient_baseline` if named)
- `proof_receipt` - Proof stamps, receipts, tangible validation
- `system_diagram` - System architecture and flow diagrams
- `cover` - Content covers and thumbnails
- `icon` - Interface icons and glyphs
- `motion` - Motion graphics and animations

### B) World (Required)
Contextual environment or lens.

- `companion` - Supportive, guiding presence
- `console` - Command center, operational control
- `command_centre` - Strategic oversight and planning
- `neutral` - Universal, context-agnostic

### C) State (Required)
Emotional or operational condition.

- `energy` - Active, dynamic, high-energy
- `clarity` - Clear, precise, focused
- `anchorage` - Grounded, stable, secure
- `neutral` - State-agnostic

### D) Framework Tags (Spine Intelligence)

#### Pillars (Max 1)
Core RecoveryOS pillars from the framework.

- `pillar.emotional_regulation`
- `pillar.stress_resilience`
- `pillar.social_connectivity`
- `pillar.cognitive_reframing`
- `pillar.identity_integration`
- `pillar.decision_mastery`

#### Concepts (Max 3)
Specific psychological/neurological concepts.

- `concept.arousal_regulation`
- `concept.interoception_affect_labeling`
- `concept.attention_orienting`
- `concept.inhibitory_control`
- `concept.reward_time_horizon`
- `concept.cognitive_defusion`
- `concept.meaning_values_orientation`
- `concept.self_compassion_shame_soothing`
- `concept.co_regulation_attachment_safety`
- `concept.boundary_mechanics`
- `concept.narrative_integration`
- `concept.repair_reconnection`

#### Themes (Max 3)
Practical, actionable themes.

- `theme.downshift_under_load`
- `theme.name_the_pattern`
- `theme.create_choice_space`
- `theme.urge_surf_delay`
- `theme.reframe_in_motion`
- `theme.values_anchor`
- `theme.self_compassion_in_heat`
- `theme.boundary_micro_reps`
- `theme.connection_micro_acts`
- `theme.repair_the_moment`
- `theme.proof_capture`
- `theme.transfer_testing`

### E) Content Type (Library Layer)
How this asset fits into content ecosystems.

- `navicue` - Navigation and orientation
- `journey` - Journey progression
- `article` - Written content
- `insight` - Key insights and learnings
- `practice` - Practical exercises
- `audio` - Audio content
- `series` - Multi-part content
- `proof` - Validation and proof
- `neutral` - Content-agnostic

### F) Format + Crops (Technical)
Physical presentation format.

- `hero_wide` - Wide hero banners
- `card` - Card-sized assets
- `square` - Square format
- `tile` - Tile/grid format
- `diagram` - Diagram format
- `stamp` - Stamp/small proof format
- `timeline` - Timeline format
- `icon_16` - 16px icons
- `icon_24` - 24px icons
- `lottie` - Lottie animations

### G) Brush / Grade (Visual Treatment)
Visual processing applied.

- `duotone_purple_base` - Base purple duotone
- `duotone_purple_cyan` - Purple-cyan duotone
- `duotone_purple_green` - Purple-green duotone
- `xpro_purple_ink` - X-Pro purple treatment
- `aurora_purple_ink` - Aurora purple treatment
- `grain_01` - Grain texture 01
- etc.

## Asset Manifest Schema

Each asset folder contains an `asset-manifest.json` file following this schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "RecoveryOS Asset Manifest v1",
  "type": "object",
  "required": ["assets", "version"],
  "properties": {
    "version": { "type": "string" },
    "assets": {
      "type": "array",
      "items": { "$ref": "#/$defs/asset" }
    }
  },
  "$defs": {
    "asset": {
      "type": "object",
      "required": ["id", "association", "world", "state", "format", "files", "version"],
      "properties": {
        "id": { "type": "string" },
        "association": {
          "type": "string",
          "enum": ["brand_hero", "journey", "navicue", "baseline", "sentient_baseline", "proof_receipt", "system_diagram", "cover", "icon", "motion"]
        },
        "world": { "type": "string", "enum": ["companion", "console", "command_centre", "neutral"] },
        "state": { "type": "string", "enum": ["energy", "clarity", "anchorage", "neutral"] },
        "contentType": {
          "type": "string",
          "enum": ["navicue", "journey", "article", "insight", "practice", "audio", "series", "proof", "neutral"]
        },
        "format": {
          "type": "string",
          "enum": ["hero_wide", "card", "square", "tile", "diagram", "stamp", "timeline", "icon_16", "icon_24", "lottie"]
        },
        "brush": { "type": "string" },
        "tags": {
          "type": "object",
          "properties": {
            "pillars": { "type": "array", "maxItems": 1, "items": { "type": "string" } },
            "concepts": { "type": "array", "maxItems": 3, "items": { "type": "string" } },
            "themes": { "type": "array", "maxItems": 3, "items": { "type": "string" } }
          },
          "additionalProperties": false
        },
        "intent": { "type": "string" },
        "files": {
          "type": "object",
          "required": ["src"],
          "properties": {
            "src": { "type": "string" },
            "src2x": { "type": "string" },
            "src3x": { "type": "string" },
            "svg": { "type": "string" },
            "lottie": { "type": "string" }
          },
          "additionalProperties": false
        },
        "version": { "type": "string" },
        "priority": { "type": "integer", "minimum": 0, "maximum": 100 }
      },
      "additionalProperties": false
    }
  }
}
```

## Example Asset Manifest

```json
{
  "version": "v1",
  "assets": [
    {
      "id": "KV_COMPANION_RETURN_MOMENT",
      "association": "brand_hero",
      "world": "companion",
      "state": "anchorage",
      "contentType": "neutral",
      "format": "hero_wide",
      "brush": "duotone_purple_base",
      "tags": {
        "pillars": ["pillar.identity_integration"],
        "concepts": ["concept.self_compassion_shame_soothing"],
        "themes": ["theme.proof_capture"]
      },
      "intent": "A calm visual metaphor for Return — turning the moment into a move.",
      "files": {
        "src": "/assets/__exports/webp/KV_COMPANION_RETURN_MOMENT__anchorage__companion__hero-wide__light__v1.webp",
        "src2x": "/assets/__exports/webp/KV_COMPANION_RETURN_MOMENT__anchorage__companion__hero-wide__light__v1@2x.webp"
      },
      "version": "v1",
      "priority": 90
    }
  ]
}
```

## Frontend Usage Pattern

```typescript
import { findAsset, findAssets, getAssetsByAssociation } from '@/utils/assetFinder';

// Find specific asset
const heroAsset = findAsset({
  association: "brand_hero",
  world: "companion",
  state: "anchorage",
  tags: { pillars: ["pillar.identity_integration"] },
  format: "hero_wide"
});

// Find all assets matching criteria
const companionAssets = findAssets({
  world: "companion",
  state: "anchorage"
});

// Get all brand heroes
const brandHeroes = getAssetsByAssociation("brand_hero");
```

## Taxonomy Registry

All tags must come from `assets/taxonomy.framework.json`. This file contains the authoritative definitions for pillars, concepts, and themes.

## Validation

The asset linting system (`npm run lint:asset`) enforces:

- Required fields presence
- Enum value validation
- Taxonomy compliance
- Governance rule enforcement (max items per tag type)
- File reference validation
- JSON schema compliance

## Why This Structure?

1. **Prevents Tag Swamps**: Controlled vocabulary prevents proliferation of similar tags
2. **Enables Precise Discovery**: Multi-axis search allows exact asset matching
3. **Maintains Governance**: Hard limits prevent over-tagging
4. **Supports Framework Integration**: Direct mapping to RecoveryOS pillars/concepts/themes
5. **Scales Infinitely**: New assets fit cleanly into existing taxonomy
6. **Frontend Ready**: Structured data enables rich querying and filtering