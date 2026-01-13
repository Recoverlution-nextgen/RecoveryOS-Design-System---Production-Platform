Here you go — **Asset Spec Sheet + Folder Map + exact JSON manifests** (schema + example) + **usage mapping** for the 5 narrative components + routes.  
  
# 1) Asset spec sheet  
## Naming rules  
* **kebab-case**  
* Stable IDs never change; labels can.  
* Variants append with --:  
    * hero-scene-01--poster  
    * hero-scene-01--loop  
    * field-pillar-er--dark  
    * icon-consent--solid  
## Formats + budgets  
* **Posters:** avif (primary) + webp (fallback)  
    * Hero poster: **≤ 450 KB**  
    * Section poster: **≤ 220 KB**  
* **Loops:** webm (primary) + optional mp4 fallback  
    * Hero loop (8–12s): **≤ 1.8 MB**  
    * Micro loop (2–5s): **≤ 650 KB**  
* **Textures:** tiny PNG (tileable) or SVG  
    * Noise: **≤ 35 KB**  
* Honor prefers-reduced-motion: swap loops → posters.  
## Asset classes  
1. **Fields** (ambient OS background): lens + pillar variants  
2. **Hero** (keynote): 4 scenes (poster+loop)  
3. **System** (OS primitives): thread line, halos, pulses, refraction  
4. **Proof** (receipt object + seal)  
5. **Icons** (12–16 total)  
6. **Textures** (noise / grain / glass mask)  
## Art direction (do / don’t)  
* Do: abstract, cinematic, universal, calm motion, depth via blur/parallax  
* Don’t: brains, locks, shields, warning metaphors, red/orange/yellow “danger” energy, stock “AI grids”  
  
# 2) Folder map (website-ready)  
```
/public/assets
  /_meta
    assets.schema.json
    assets.manifest.json
    usage.map.json

  /fields
    /base
      field-base--dark.avif
      field-base--dark.webp
      field-base--light.avif
      field-base--light.webp
    /lens
      field-lens-individual--dark.avif
      field-lens-individual--dark.webp
      field-lens-professional--dark.avif
      field-lens-professional--dark.webp
      field-lens-organisation--dark.avif
      field-lens-organisation--dark.webp
      (light variants optional)
    /pillar
      field-pillar-er--dark.avif
      field-pillar-sr--dark.avif
      field-pillar-sc--dark.avif
      field-pillar-cr--dark.avif
      field-pillar-ii--dark.avif
      field-pillar-dm--dark.avif
      (webp fallbacks)

  /hero
    /scene-01
      hero-scene-01--poster.avif
      hero-scene-01--poster.webp
      hero-scene-01--loop.webm
      hero-scene-01--loop.mp4 (optional)
    /scene-02 ...
    /scene-03 ...
    /scene-04 ...

  /system
    /thread
      thread-overlay--soft.svg
      thread-overlay--dense.svg
    /halos
      halo-pillar-er.svg
      halo-pillar-sr.svg
      halo-pillar-sc.svg
      halo-pillar-cr.svg
      halo-pillar-ii.svg
      halo-pillar-dm.svg
    /pulses
      pulse-seal--soft.webm (optional)
      pulse-seal--soft.svg  (preferred if you do CSS/SVG)
    /refraction
      refraction-receipt--base.avif
      refraction-receipt--individual.avif
      refraction-receipt--professional.avif
      refraction-receipt--organisation.avif
      (webp fallbacks)

  /proof
    receipt-object--base.avif
    receipt-object--base.webp
    seal-dot.svg
    vault-texture--soft.avif (optional)

  /icons
    icon-lens.svg
    icon-depth.svg
    icon-run.svg
    icon-install.svg
    icon-seal.svg
    icon-receipt.svg
    icon-spine.svg
    icon-node.svg
    icon-consent.svg
    icon-quiet-hours.svg
    icon-escalation.svg
    icon-signals.svg
    icon-search.svg
    icon-close.svg

  /textures
    noise-tile.png
    grain-soft.png
    glass-mask.svg

```
  
# 3) assets.schema.json (exact JSON Schema)  
```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://recoveryos/assets.schema.json",
  "title": "RecoveryOS Asset Manifest Schema",
  "type": "object",
  "required": ["version", "updatedAt", "brand", "assets"],
  "properties": {
    "version": { "type": "string" },
    "updatedAt": { "type": "string", "format": "date-time" },
    "brand": {
      "type": "object",
      "required": ["colors", "fonts"],
      "properties": {
        "colors": {
          "type": "object",
          "required": ["purple900", "purple500", "purple300", "cyan500"],
          "properties": {
            "purple900": { "type": "string", "pattern": "^#([0-9a-fA-F]{6})$" },
            "purple500": { "type": "string", "pattern": "^#([0-9a-fA-F]{6})$" },
            "purple300": { "type": "string", "pattern": "^#([0-9a-fA-F]{6})$" },
            "cyan500": { "type": "string", "pattern": "^#([0-9a-fA-F]{6})$" },
            "green500": { "type": "string", "pattern": "^#([0-9a-fA-F]{6})$" },
            "neutrals": {
              "type": "object",
              "additionalProperties": { "type": "string", "pattern": "^#([0-9a-fA-F]{6})$" }
            }
          },
          "additionalProperties": false
        },
        "fonts": {
          "type": "object",
          "required": ["heading", "body"],
          "properties": {
            "heading": { "type": "string" },
            "body": { "type": "string" },
            "mono": { "type": "string" }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    },
    "assets": {
      "type": "array",
      "minItems": 1,
      "items": { "$ref": "#/$defs/asset" }
    }
  },
  "$defs": {
    "asset": {
      "type": "object",
      "required": ["id", "class", "type", "formats", "usage"],
      "properties": {
        "id": { "type": "string", "pattern": "^[a-z0-9\\-]+$" },
        "class": {
          "type": "string",
          "enum": ["field", "hero", "system", "proof", "icon", "texture"]
        },
        "type": {
          "type": "string",
          "enum": ["image", "video", "svg", "png"]
        },
        "pillar": {
          "type": "string",
          "enum": ["ER", "SR", "SC", "CR", "II", "DM", "NONE"]
        },
        "lens": {
          "type": "string",
          "enum": ["individual", "professional", "organisation", "any"]
        },
        "theme": {
          "type": "string",
          "enum": ["dark", "light", "any"]
        },
        "formats": {
          "type": "array",
          "minItems": 1,
          "items": { "$ref": "#/$defs/format" }
        },
        "meta": { "$ref": "#/$defs/meta" },
        "usage": { "$ref": "#/$defs/usage" }
      },
      "additionalProperties": false
    },
    "format": {
      "type": "object",
      "required": ["ext", "path"],
      "properties": {
        "ext": { "type": "string", "enum": ["avif", "webp", "png", "svg", "webm", "mp4"] },
        "path": { "type": "string" },
        "width": { "type": "integer", "minimum": 1 },
        "height": { "type": "integer", "minimum": 1 },
        "durationMs": { "type": "integer", "minimum": 1 },
        "sizeKB": { "type": "integer", "minimum": 1 }
      },
      "additionalProperties": false
    },
    "meta": {
      "type": "object",
      "properties": {
        "alt": { "type": "string" },
        "loop": { "type": "boolean" },
        "seamless": { "type": "boolean" },
        "reducedMotionFallbackId": { "type": "string" },
        "dominantHex": {
          "type": "array",
          "items": { "type": "string", "pattern": "^#([0-9a-fA-F]{6})$" },
          "maxItems": 6
        }
      },
      "additionalProperties": false
    },
    "usage": {
      "type": "object",
      "required": ["components", "routes", "preload"],
      "properties": {
        "components": {
          "type": "array",
          "items": { "type": "string" },
          "minItems": 1
        },
        "routes": {
          "type": "array",
          "items": { "type": "string" },
          "minItems": 1
        },
        "preload": { "type": "string", "enum": ["eager", "lazy", "on-interaction"] },
        "tags": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "additionalProperties": false
    }
  }
}

```
  
# 4) assets.manifest.json (example manifest — exact JSON)  
This includes the **Core 12** plus the system primitives that power your 5 narrative components.  
```
{
  "version": "1.0.0",
  "updatedAt": "2026-01-09T00:00:00Z",
  "brand": {
    "colors": {
      "purple900": "#3E2BB8",
      "purple500": "#5739FB",
      "purple300": "#7C67FF",
      "cyan500": "#40E0D0",
      "green500": "#2FE6A6",
      "neutrals": {
        "ink900": "#0B0A14",
        "ink700": "#2A2942",
        "ink500": "#6B6A86",
        "paper": "#FBFAFF"
      }
    },
    "fonts": {
      "heading": "Plus Jakarta Sans",
      "body": "Inter",
      "mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
    }
  },
  "assets": [
    {
      "id": "noise-tile",
      "class": "texture",
      "type": "png",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "png", "path": "/assets/textures/noise-tile.png", "sizeKB": 28 }
      ],
      "meta": { "alt": "Subtle tiled noise texture" },
      "usage": {
        "components": ["AmbientField"],
        "routes": ["/", "/how-it-works", "/trust", "/three-worlds", "/spine", "/demo"],
        "preload": "eager",
        "tags": ["texture", "premium", "grain"]
      }
    },

    {
      "id": "field-base-dark",
      "class": "field",
      "type": "image",
      "pillar": "NONE",
      "lens": "any",
      "theme": "dark",
      "formats": [
        { "ext": "avif", "path": "/assets/fields/base/field-base--dark.avif", "width": 2400, "height": 1400, "sizeKB": 180 },
        { "ext": "webp", "path": "/assets/fields/base/field-base--dark.webp", "width": 2400, "height": 1400, "sizeKB": 260 }
      ],
      "meta": { "alt": "RecoveryOS ambient base field (dark)", "dominantHex": ["#3E2BB8", "#5739FB", "#40E0D0"] },
      "usage": {
        "components": ["AmbientField", "Section"],
        "routes": ["/", "/how-it-works", "/trust", "/three-worlds", "/spine", "/demo"],
        "preload": "eager",
        "tags": ["field", "base", "dark"]
      }
    },

    {
      "id": "field-lens-individual-dark",
      "class": "field",
      "type": "image",
      "pillar": "NONE",
      "lens": "individual",
      "theme": "dark",
      "formats": [
        { "ext": "avif", "path": "/assets/fields/lens/field-lens-individual--dark.avif", "width": 2400, "height": 1400, "sizeKB": 210 },
        { "ext": "webp", "path": "/assets/fields/lens/field-lens-individual--dark.webp", "width": 2400, "height": 1400, "sizeKB": 310 }
      ],
      "meta": { "alt": "Lens field: individual (dark)" },
      "usage": {
        "components": ["AmbientField"],
        "routes": ["/", "/how-it-works", "/three-worlds", "/demo"],
        "preload": "lazy",
        "tags": ["field", "lens", "individual"]
      }
    },
    {
      "id": "field-lens-professional-dark",
      "class": "field",
      "type": "image",
      "pillar": "NONE",
      "lens": "professional",
      "theme": "dark",
      "formats": [
        { "ext": "avif", "path": "/assets/fields/lens/field-lens-professional--dark.avif", "width": 2400, "height": 1400, "sizeKB": 210 },
        { "ext": "webp", "path": "/assets/fields/lens/field-lens-professional--dark.webp", "width": 2400, "height": 1400, "sizeKB": 310 }
      ],
      "meta": { "alt": "Lens field: professional (dark)" },
      "usage": {
        "components": ["AmbientField"],
        "routes": ["/", "/how-it-works", "/three-worlds", "/demo"],
        "preload": "lazy",
        "tags": ["field", "lens", "professional"]
      }
    },
    {
      "id": "field-lens-organisation-dark",
      "class": "field",
      "type": "image",
      "pillar": "NONE",
      "lens": "organisation",
      "theme": "dark",
      "formats": [
        { "ext": "avif", "path": "/assets/fields/lens/field-lens-organisation--dark.avif", "width": 2400, "height": 1400, "sizeKB": 210 },
        { "ext": "webp", "path": "/assets/fields/lens/field-lens-organisation--dark.webp", "width": 2400, "height": 1400, "sizeKB": 310 }
      ],
      "meta": { "alt": "Lens field: organisation (dark)" },
      "usage": {
        "components": ["AmbientField"],
        "routes": ["/", "/how-it-works", "/three-worlds", "/demo", "/trust"],
        "preload": "lazy",
        "tags": ["field", "lens", "organisation"]
      }
    },

    {
      "id": "hero-scene-01",
      "class": "hero",
      "type": "video",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "webm", "path": "/assets/hero/scene-01/hero-scene-01--loop.webm", "durationMs": 10000, "sizeKB": 1500 },
        { "ext": "avif", "path": "/assets/hero/scene-01/hero-scene-01--poster.avif", "width": 2400, "height": 1400, "sizeKB": 380 },
        { "ext": "webp", "path": "/assets/hero/scene-01/hero-scene-01--poster.webp", "width": 2400, "height": 1400, "sizeKB": 520 }
      ],
      "meta": { "alt": "Hero scene 01: runs in real life", "loop": true, "seamless": true, "reducedMotionFallbackId": "hero-scene-01-poster" },
      "usage": {
        "components": ["WalkthroughPresenter", "HeroKeynotePresenter"],
        "routes": ["/"],
        "preload": "eager",
        "tags": ["hero", "scene-01", "runs-in-real-life"]
      }
    },
    {
      "id": "hero-scene-02",
      "class": "hero",
      "type": "video",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "webm", "path": "/assets/hero/scene-02/hero-scene-02--loop.webm", "durationMs": 10000, "sizeKB": 1600 },
        { "ext": "avif", "path": "/assets/hero/scene-02/hero-scene-02--poster.avif", "width": 2400, "height": 1400, "sizeKB": 390 },
        { "ext": "webp", "path": "/assets/hero/scene-02/hero-scene-02--poster.webp", "width": 2400, "height": 1400, "sizeKB": 540 }
      ],
      "meta": { "alt": "Hero scene 02: feed with a spine", "loop": true, "seamless": true },
      "usage": {
        "components": ["WalkthroughPresenter", "HeroKeynotePresenter"],
        "routes": ["/"],
        "preload": "lazy",
        "tags": ["hero", "scene-02", "feed-with-spine"]
      }
    },
    {
      "id": "hero-scene-03",
      "class": "hero",
      "type": "video",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "webm", "path": "/assets/hero/scene-03/hero-scene-03--loop.webm", "durationMs": 10000, "sizeKB": 1400 },
        { "ext": "avif", "path": "/assets/hero/scene-03/hero-scene-03--poster.avif", "width": 2400, "height": 1400, "sizeKB": 360 },
        { "ext": "webp", "path": "/assets/hero/scene-03/hero-scene-03--poster.webp", "width": 2400, "height": 1400, "sizeKB": 500 }
      ],
      "meta": { "alt": "Hero scene 03: receipts", "loop": true, "seamless": true },
      "usage": {
        "components": ["WalkthroughPresenter", "HeroKeynotePresenter"],
        "routes": ["/"],
        "preload": "lazy",
        "tags": ["hero", "scene-03", "proof"]
      }
    },
    {
      "id": "hero-scene-04",
      "class": "hero",
      "type": "video",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "webm", "path": "/assets/hero/scene-04/hero-scene-04--loop.webm", "durationMs": 10000, "sizeKB": 1600 },
        { "ext": "avif", "path": "/assets/hero/scene-04/hero-scene-04--poster.avif", "width": 2400, "height": 1400, "sizeKB": 400 },
        { "ext": "webp", "path": "/assets/hero/scene-04/hero-scene-04--poster.webp", "width": 2400, "height": 1400, "sizeKB": 560 }
      ],
      "meta": { "alt": "Hero scene 04: one OS three worlds", "loop": true, "seamless": true },
      "usage": {
        "components": ["WalkthroughPresenter", "HeroKeynotePresenter"],
        "routes": ["/"],
        "preload": "lazy",
        "tags": ["hero", "scene-04", "three-worlds"]
      }
    },

    {
      "id": "thread-overlay-soft",
      "class": "system",
      "type": "svg",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "svg", "path": "/assets/system/thread/thread-overlay--soft.svg", "sizeKB": 14 }
      ],
      "meta": { "alt": "Continuity thread overlay (soft)" },
      "usage": {
        "components": ["SpineExplorer", "SpineAtlasMini"],
        "routes": ["/how-it-works", "/spine", "/demo"],
        "preload": "lazy",
        "tags": ["thread", "overlay"]
      }
    },

    {
      "id": "seal-dot",
      "class": "proof",
      "type": "svg",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "svg", "path": "/assets/proof/seal-dot.svg", "sizeKB": 6 }
      ],
      "meta": { "alt": "Seal dot icon" },
      "usage": {
        "components": ["TraceTile", "ContinuityStream", "TraceTravelCard"],
        "routes": ["/", "/how-it-works", "/three-worlds", "/demo"],
        "preload": "eager",
        "tags": ["proof", "seal"]
      }
    },

    {
      "id": "receipt-object-base",
      "class": "proof",
      "type": "image",
      "pillar": "NONE",
      "lens": "any",
      "theme": "any",
      "formats": [
        { "ext": "avif", "path": "/assets/proof/receipt-object--base.avif", "width": 1400, "height": 900, "sizeKB": 160 },
        { "ext": "webp", "path": "/assets/proof/receipt-object--base.webp", "width": 1400, "height": 900, "sizeKB": 220 }
      ],
      "meta": { "alt": "Receipt object base (neutral)" },
      "usage": {
        "components": ["TraceTravelCard", "TraceTravelShowcase"],
        "routes": ["/", "/how-it-works", "/three-worlds", "/demo"],
        "preload": "lazy",
        "tags": ["proof", "receipt"]
      }
    },

    {
      "id": "refraction-receipt-individual",
      "class": "system",
      "type": "image",
      "pillar": "NONE",
      "lens": "individual",
      "theme": "any",
      "formats": [
        { "ext": "avif", "path": "/assets/system/refraction/refraction-receipt--individual.avif", "width": 1400, "height": 900, "sizeKB": 160 },
        { "ext": "webp", "path": "/assets/system/refraction/refraction-receipt--individual.webp", "width": 1400, "height": 900, "sizeKB": 220 }
      ],
      "meta": { "alt": "Receipt refraction: individual" },
      "usage": {
        "components": ["TraceTravelShowcase"],
        "routes": ["/three-worlds", "/demo"],
        "preload": "lazy",
        "tags": ["refraction", "individual"]
      }
    },
    {
      "id": "refraction-receipt-professional",
      "class": "system",
      "type": "image",
      "pillar": "NONE",
      "lens": "professional",
      "theme": "any",
      "formats": [
        { "ext": "avif", "path": "/assets/system/refraction/refraction-receipt--professional.avif", "width": 1400, "height": 900, "sizeKB": 160 },
        { "ext": "webp", "path": "/assets/system/refraction/refraction-receipt--professional.webp", "width": 1400, "height": 900, "sizeKB": 220 }
      ],
      "meta": { "alt": "Receipt refraction: professional" },
      "usage": {
        "components": ["TraceTravelShowcase"],
        "routes": ["/three-worlds", "/demo"],
        "preload": "lazy",
        "tags": ["refraction", "professional"]
      }
    },
    {
      "id": "refraction-receipt-organisation",
      "class": "system",
      "type": "image",
      "pillar": "NONE",
      "lens": "organisation",
      "theme": "any",
      "formats": [
        { "ext": "avif", "path": "/assets/system/refraction/refraction-receipt--organisation.avif", "width": 1400, "height": 900, "sizeKB": 160 },
        { "ext": "webp", "path": "/assets/system/refraction/refraction-receipt--organisation.webp", "width": 1400, "height": 900, "sizeKB": 220 }
      ],
      "meta": { "alt": "Receipt refraction: organisation" },
      "usage": {
        "components": ["TraceTravelShowcase"],
        "routes": ["/three-worlds", "/demo", "/trust"],
        "preload": "lazy",
        "tags": ["refraction", "organisation"]
      }
    }
  ]
}

```
  
# 5) usage.map.json (components + routes → asset IDs)  
This is the wiring doc that prevents “random asset use”.  
```
{
  "version": "1.0.0",
  "rules": {
    "reducedMotion": {
      "policy": "swap-video-to-poster",
      "fallbackStrategy": "use-meta.reducedMotionFallbackId-or-first-image-format"
    },
    "lensFieldPriority": [
      "field-lens-{lens}-{theme}",
      "field-base-{theme}"
    ],
    "pillarFieldPriority": [
      "field-pillar-{pillar}-{theme}",
      "field-base-{theme}"
    ]
  },
  "components": {
    "AmbientField": {
      "uses": ["noise-tile", "field-base-dark", "field-lens-individual-dark", "field-lens-professional-dark", "field-lens-organisation-dark"],
      "notes": "AmbientField chooses lens field if available, else base."
    },
    "WalkthroughPresenter": {
      "uses": ["hero-scene-01", "hero-scene-02", "hero-scene-03", "hero-scene-04", "noise-tile"],
      "notes": "Hero loops are optional; posters are required."
    },
    "SpineExplorer": {
      "uses": ["thread-overlay-soft", "noise-tile"],
      "notes": "Thread overlay + pillar halos (if/when added) + subtle pulse on selection."
    },
    "ContinuityStream": {
      "uses": ["seal-dot", "noise-tile"],
      "notes": "Visual rails are CSS; seal-dot is the only icon asset needed."
    },
    "OrchestrationFeed": {
      "uses": ["noise-tile"],
      "notes": "Orchestration is mostly typographic + rails; assets are ambient only."
    },
    "TraceTravelShowcase": {
      "uses": ["receipt-object-base", "refraction-receipt-individual", "refraction-receipt-professional", "refraction-receipt-organisation", "noise-tile"],
      "notes": "Same object, three refractions. This is the 'one OS, three worlds' aha."
    }
  },
  "routes": {
    "/": {
      "hero": ["hero-scene-01", "hero-scene-02", "hero-scene-03", "hero-scene-04"],
      "ambient": ["field-base-dark", "noise-tile"]
    },
    "/how-it-works": {
      "ambient": ["field-base-dark", "noise-tile"],
      "system": ["thread-overlay-soft", "seal-dot"]
    },
    "/three-worlds": {
      "ambient": ["field-base-dark", "noise-tile"],
      "proof": ["receipt-object-base", "refraction-receipt-individual", "refraction-receipt-professional", "refraction-receipt-organisation"]
    },
    "/trust": {
      "ambient": ["field-base-dark", "noise-tile"],
      "system": ["seal-dot"]
    },
    "/spine": {
      "ambient": ["field-base-dark", "noise-tile"],
      "system": ["thread-overlay-soft"]
    },
    "/demo": {
      "ambient": ["field-base-dark", "noise-tile"],
      "system": ["thread-overlay-soft", "seal-dot"],
      "proof": ["receipt-object-base"]
    }
  }
}

```
  
# 6) The “Core 12” deliverables checklist (to hand to your asset team)  
```
{
  "core12": [
    "noise-tile",
    "field-base--dark (avif+webp)",
    "hero-scene-01--poster (avif+webp)",
    "hero-scene-02--poster (avif+webp)",
    "hero-scene-03--poster (avif+webp)",
    "hero-scene-04--poster (avif+webp)",
    "hero-scene-01--loop (webm)",
    "hero-scene-02--loop (webm)",
    "hero-scene-03--loop (webm)",
    "hero-scene-04--loop (webm)",
    "receipt-object--base (avif+webp)",
    "refraction-receipt--individual/professional/organisation (avif+webp)"
  ]
}

```
  
If you want, next I’ll “roll” the **asset integration layer** (one tiny loader util + <AmbientField/> implementation that auto-selects by **lens + theme + pillar + reduced motion**, using exactly these manifests).  
If you want, next I’ll “roll” the **asset integration layer** (one tiny loader util + <AmbientField/> implementation that auto-selects by **lens + theme + pillar + reduced motion**, using exactly these manifests).  
