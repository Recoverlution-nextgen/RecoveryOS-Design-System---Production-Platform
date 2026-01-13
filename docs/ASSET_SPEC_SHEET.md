# RecoveryOS Website Asset Specification

**Purpose**: Define the asset system for the marketing website. Assets are not decoration—they're how people feel the OS before they understand it.

**Philosophy**: Abstract enough to be universal, precise enough to feel engineered. Cinematic states, not illustrations.

---

## Asset Classes

### A) Atmosphere Assets
**Purpose**: Background OS field that makes every page feel cohesive
**Format**: CSS-first (gradients + noise), optional WebM loops
**Performance**: <50KB total

### B) Hero Keynote Assets
**Purpose**: Power the 4 WalkthroughPresenter scenes
**Format**: AVIF/WebP posters + WebM loops
**Performance**: Poster ≤250-400KB, Loop ≤1.2-1.8MB

### C) System Assets
**Purpose**: Make the framework tangible (threads, halos, nodes, seals)
**Format**: SVG + CSS effects, optional micro WebM/Lottie
**Performance**: <100KB total

### D) Iconography
**Purpose**: OS-grade UI icons (12-16 total)
**Format**: SVG, 1.5-2px stroke, currentColor
**Performance**: <20KB total

### E) Proof Assets
**Purpose**: Make receipts feel real
**Format**: CSS textures + SVG
**Performance**: <50KB total

---

## Folder Structure

```
packages/ui/src/
  assets/
    atmosphere/
      noise.png                    # Tileable grain (4KB)
      field-variants.ts            # Pillar/lens gradient configs
    
    heroes/
      scene-01/
        poster.avif                # 300KB
        poster.webp                # 350KB (fallback)
        loop.webm                  # 1.5MB
        loop.mp4                   # 1.8MB (fallback)
      scene-02/
        poster.avif
        poster.webp
        loop.webm
        loop.mp4
      scene-03/
        poster.avif
        poster.webp
        loop.webm
        loop.mp4
      scene-04/
        poster.avif
        poster.webp
        loop.webm
        loop.mp4
    
    system/
      thread-line.svg              # Continuity line texture
      pillar-halos/
        er.svg
        sr.svg
        sc.svg
        cr.svg
        ii.svg
        dm.svg
      node-capsule.svg             # Pill shape base
      seal-pulse.svg               # Proof sealing effect (or CSS)
      altitude-refraction.svg      # TraceTravel 3-lens effect
    
    icons/
      lens-toggle.svg
      depth-dial.svg
      play.svg
      run.svg
      install.svg
      seal.svg
      receipt.svg
      spine.svg
      node.svg
      consent.svg
      quiet-hours.svg
      escalation.svg
      integrations.svg
      search.svg
      chevron.svg
      close.svg
    
    proof/
      receipt-texture.svg          # Card surface
      seal-mark.svg                # State indicator
      vault-texture.svg            # Background depth
    
    manifest.json                  # Asset registry
    tokens.ts                      # Asset token exports
```

---

## Asset Manifest Structure

```json
{
  "atmosphere": {
    "noise": {
      "path": "atmosphere/noise.png",
      "format": "png",
      "size": "4KB",
      "dimensions": "64x64",
      "usage": "Tileable grain overlay for all sections"
    },
    "fields": {
      "calm": {
        "gradients": ["--return-glow", "--thread-pulse", "--drift-stable"],
        "usage": "Default ambient field"
      },
      "heat": {
        "gradients": ["--handrail-escalate", "--drift-active", "--return-glow"],
        "usage": "Heat mode ambient field"
      },
      "pillars": {
        "ER": {"primary": "--return-glow", "secondary": "--return-press"},
        "SR": {"primary": "--drift-stable", "secondary": "--return-glow"},
        "SC": {"primary": "--thread-pulse", "secondary": "--thread-depth-fg"},
        "CR": {"primary": "--lens-professional", "secondary": "--thread-pulse"},
        "II": {"primary": "--lens-organisation", "secondary": "--trace-seal"},
        "DM": {"primary": "--drift-noticing", "secondary": "--lens-individual"}
      }
    }
  },
  
  "heroes": {
    "scene-01": {
      "title": "Runs in real life",
      "poster": {
        "avif": "heroes/scene-01/poster.avif",
        "webp": "heroes/scene-01/poster.webp",
        "size": "300KB / 350KB",
        "dimensions": "1920x1080"
      },
      "loop": {
        "webm": "heroes/scene-01/loop.webm",
        "mp4": "heroes/scene-01/loop.mp4",
        "duration": "10s",
        "size": "1.5MB / 1.8MB"
      },
      "usage": "WalkthroughPresenter Scene 1 (motion + continuity)"
    },
    "scene-02": {
      "title": "Feed with a spine",
      "poster": {
        "avif": "heroes/scene-02/poster.avif",
        "webp": "heroes/scene-02/poster.webp",
        "size": "300KB / 350KB",
        "dimensions": "1920x1080"
      },
      "loop": {
        "webm": "heroes/scene-02/loop.webm",
        "mp4": "heroes/scene-02/loop.mp4",
        "duration": "12s",
        "size": "1.5MB / 1.8MB"
      },
      "usage": "WalkthroughPresenter Scene 2 (order emerging from noise)"
    },
    "scene-03": {
      "title": "Receipts",
      "poster": {
        "avif": "heroes/scene-03/poster.avif",
        "webp": "heroes/scene-03/poster.webp",
        "size": "300KB / 350KB",
        "dimensions": "1920x1080"
      },
      "loop": {
        "webm": "heroes/scene-03/loop.webm",
        "mp4": "heroes/scene-03/loop.mp4",
        "duration": "8s",
        "size": "1.2MB / 1.5MB"
      },
      "usage": "WalkthroughPresenter Scene 3 (proof crystallizing)"
    },
    "scene-04": {
      "title": "One OS / Three worlds",
      "poster": {
        "avif": "heroes/scene-04/poster.avif",
        "webp": "heroes/scene-04/poster.webp",
        "size": "300KB / 350KB",
        "dimensions": "1920x1080"
      },
      "loop": {
        "webm": "heroes/scene-04/loop.webm",
        "mp4": "heroes/scene-04/loop.mp4",
        "duration": "10s",
        "size": "1.5MB / 1.8MB"
      },
      "usage": "WalkthroughPresenter Scene 4 (lens refraction)"
    }
  },
  
  "system": {
    "threadLine": {
      "path": "system/thread-line.svg",
      "usage": "SpineExplorer overlay, continuity visualization"
    },
    "pillarHalos": {
      "ER": {"path": "system/pillar-halos/er.svg", "color": "--return-glow"},
      "SR": {"path": "system/pillar-halos/sr.svg", "color": "--drift-stable"},
      "SC": {"path": "system/pillar-halos/sc.svg", "color": "--thread-pulse"},
      "CR": {"path": "system/pillar-halos/cr.svg", "color": "--lens-professional"},
      "II": {"path": "system/pillar-halos/ii.svg", "color": "--lens-organisation"},
      "DM": {"path": "system/pillar-halos/dm.svg", "color": "--drift-noticing"}
    },
    "nodeCapsule": {
      "path": "system/node-capsule.svg",
      "usage": "SpineAtlas nodes, pill shapes"
    },
    "sealPulse": {
      "path": "system/seal-pulse.svg",
      "usage": "Proof sealing animation (or CSS-based)"
    },
    "altitudeRefraction": {
      "path": "system/altitude-refraction.svg",
      "usage": "TraceTravel 3-lens visualization"
    }
  },
  
  "icons": {
    "lensToggle": {"path": "icons/lens-toggle.svg", "stroke": "1.5px"},
    "depthDial": {"path": "icons/depth-dial.svg", "stroke": "1.5px"},
    "play": {"path": "icons/play.svg", "stroke": "2px"},
    "run": {"path": "icons/run.svg", "stroke": "1.5px"},
    "install": {"path": "icons/install.svg", "stroke": "1.5px"},
    "seal": {"path": "icons/seal.svg", "stroke": "1.5px"},
    "receipt": {"path": "icons/receipt.svg", "stroke": "1.5px"},
    "spine": {"path": "icons/spine.svg", "stroke": "1.5px"},
    "node": {"path": "icons/node.svg", "stroke": "1.5px"},
    "consent": {"path": "icons/consent.svg", "stroke": "1.5px"},
    "quietHours": {"path": "icons/quiet-hours.svg", "stroke": "1.5px"},
    "escalation": {"path": "icons/escalation.svg", "stroke": "1.5px"},
    "integrations": {"path": "icons/integrations.svg", "stroke": "1.5px"},
    "search": {"path": "icons/search.svg", "stroke": "1.5px"},
    "chevron": {"path": "icons/chevron.svg", "stroke": "2px"},
    "close": {"path": "icons/close.svg", "stroke": "2px"}
  },
  
  "proof": {
    "receiptTexture": {
      "path": "proof/receipt-texture.svg",
      "usage": "TraceTravel card surface"
    },
    "sealMark": {
      "path": "proof/seal-mark.svg",
      "usage": "State indicator with halo"
    },
    "vaultTexture": {
      "path": "proof/vault-texture.svg",
      "usage": "Background depth for sealed artifacts"
    }
  }
}
```

---

## Asset Tokens (TypeScript)

```typescript
// packages/ui/src/assets/tokens.ts

export type PillarId = 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM';
export type Lens = 'individual' | 'professional' | 'organisation';
export type SceneId = 'scene-01' | 'scene-02' | 'scene-03' | 'scene-04';

export const ATMOSPHERE_TOKENS = {
  noise: '/assets/atmosphere/noise.png',
  
  fields: {
    calm: {
      gradients: ['var(--return-glow)', 'var(--thread-pulse)', 'var(--drift-stable)'],
      positions: ['20% 20%', '80% 30%', '60% 80%'],
      sizes: ['600px 420px', '520px 380px', '520px 380px'],
    },
    heat: {
      gradients: ['var(--handrail-escalate)', 'var(--drift-active)', 'var(--return-glow)'],
      positions: ['30% 25%', '75% 35%', '50% 75%'],
      sizes: ['600px 420px', '520px 380px', '520px 380px'],
    },
    pillars: {
      ER: { primary: 'var(--return-glow)', secondary: 'var(--return-press)' },
      SR: { primary: 'var(--drift-stable)', secondary: 'var(--return-glow)' },
      SC: { primary: 'var(--thread-pulse)', secondary: 'var(--thread-depth-fg)' },
      CR: { primary: 'var(--lens-professional)', secondary: 'var(--thread-pulse)' },
      II: { primary: 'var(--lens-organisation)', secondary: 'var(--trace-seal)' },
      DM: { primary: 'var(--drift-noticing)', secondary: 'var(--lens-individual)' },
    },
  },
} as const;

export const HERO_TOKENS = {
  'scene-01': {
    title: 'Runs in real life',
    poster: {
      avif: '/assets/heroes/scene-01/poster.avif',
      webp: '/assets/heroes/scene-01/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-01/loop.webm',
      mp4: '/assets/heroes/scene-01/loop.mp4',
    },
  },
  'scene-02': {
    title: 'Feed with a spine',
    poster: {
      avif: '/assets/heroes/scene-02/poster.avif',
      webp: '/assets/heroes/scene-02/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-02/loop.webm',
      mp4: '/assets/heroes/scene-02/loop.mp4',
    },
  },
  'scene-03': {
    title: 'Receipts',
    poster: {
      avif: '/assets/heroes/scene-03/poster.avif',
      webp: '/assets/heroes/scene-03/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-03/loop.webm',
      mp4: '/assets/heroes/scene-03/loop.mp4',
    },
  },
  'scene-04': {
    title: 'One OS / Three worlds',
    poster: {
      avif: '/assets/heroes/scene-04/poster.avif',
      webp: '/assets/heroes/scene-04/poster.webp',
    },
    loop: {
      webm: '/assets/heroes/scene-04/loop.webm',
      mp4: '/assets/heroes/scene-04/loop.mp4',
    },
  },
} as const;

export const SYSTEM_TOKENS = {
  threadLine: '/assets/system/thread-line.svg',
  pillarHalos: {
    ER: '/assets/system/pillar-halos/er.svg',
    SR: '/assets/system/pillar-halos/sr.svg',
    SC: '/assets/system/pillar-halos/sc.svg',
    CR: '/assets/system/pillar-halos/cr.svg',
    II: '/assets/system/pillar-halos/ii.svg',
    DM: '/assets/system/pillar-halos/dm.svg',
  },
  nodeCapsule: '/assets/system/node-capsule.svg',
  sealPulse: '/assets/system/seal-pulse.svg',
  altitudeRefraction: '/assets/system/altitude-refraction.svg',
} as const;

export const ICON_TOKENS = {
  lensToggle: '/assets/icons/lens-toggle.svg',
  depthDial: '/assets/icons/depth-dial.svg',
  play: '/assets/icons/play.svg',
  run: '/assets/icons/run.svg',
  install: '/assets/icons/install.svg',
  seal: '/assets/icons/seal.svg',
  receipt: '/assets/icons/receipt.svg',
  spine: '/assets/icons/spine.svg',
  node: '/assets/icons/node.svg',
  consent: '/assets/icons/consent.svg',
  quietHours: '/assets/icons/quiet-hours.svg',
  escalation: '/assets/icons/escalation.svg',
  integrations: '/assets/icons/integrations.svg',
  search: '/assets/icons/search.svg',
  chevron: '/assets/icons/chevron.svg',
  close: '/assets/icons/close.svg',
} as const;

export const PROOF_TOKENS = {
  receiptTexture: '/assets/proof/receipt-texture.svg',
  sealMark: '/assets/proof/seal-mark.svg',
  vaultTexture: '/assets/proof/vault-texture.svg',
} as const;
```

---

## Usage Mapping by Component

### WalkthroughPresenter
**Assets used**:
- `HERO_TOKENS['scene-01']` through `HERO_TOKENS['scene-04']`
- `ATMOSPHERE_TOKENS.fields.calm` (or .heat for mode)
- Lens-aware field morphing

**Loading strategy**:
- Poster: eager (first paint)
- Loop: lazy (after interaction or auto-advance)

---

### SpineExplorer
**Assets used**:
- `SYSTEM_TOKENS.threadLine` (overlay)
- `SYSTEM_TOKENS.pillarHalos[pillar]` (6 variants)
- `SYSTEM_TOKENS.nodeCapsule` (pill shapes)
- `ATMOSPHERE_TOKENS.fields.pillars[pillar]`

**Depth morphing**:
- Glance: halo only
- Seed: halo + faint thread
- Thread: thread brightens + node detail
- Journey: adds slow shimmer

---

### ContinuityStream
**Assets used**:
- `ATMOSPHERE_TOKENS.fields.pillars` (rail tints)
- `SYSTEM_TOKENS.nodeCapsule` (state dots)

**Stage colors**:
- Routed: cyan (--thread-pulse)
- Delivered: purple (--lens-individual)
- Sealed: cyan/green blend
- Reviewed: green (--drift-stable)

---

### OrchestrationFeed
**Assets used**:
- `ATMOSPHERE_TOKENS.fields.pillars` (card tints)
- Optional: `SYSTEM_TOKENS.threadLine` (conductor rail)

**Card visual hierarchy**:
- "Why routed": cyan rail
- "What held": green tint
- "What's next": purple lift

---

### TraceTravel
**Assets used**:
- `PROOF_TOKENS.receiptTexture` (card surface)
- `PROOF_TOKENS.sealMark` (state indicator)
- `SYSTEM_TOKENS.altitudeRefraction` (lens refraction visual)

**Lens refraction**:
- Individual: warm purple glass (calm)
- Professional: cyan clarity (signal)
- Organisation: neutral/mono + crisp edges

---

### TrustRails
**Assets used**:
- `ATMOSPHERE_TOKENS.fields.calm` (neutral base)
- `PROOF_TOKENS.vaultTexture` (governance stability)
- Green clarity accents (--drift-stable)

**Visual metaphor**: Three nested rings (LOCKED / CONTROLLED / EXPANDABLE)

---

## File Format Standards

### Still Images
- **Primary**: AVIF (best compression)
- **Fallback**: WebP
- **Hero posters**: 1920x1080, ≤250-400KB
- **Section posters**: 1280x720, ≤120-200KB

### Motion Loops
- **Primary**: WebM (VP9)
- **Fallback**: MP4 (H.264)
- **Duration**: 8-12s, seamless
- **Hero loops**: ≤1.2-1.8MB
- **Micro loops**: ≤300-600KB

### SVG Assets
- **Stroke**: 1.5-2px
- **Color**: currentColor (inherits from CSS)
- **Optimization**: SVGO with precision 2
- **Size target**: <5KB per icon

### Textures
- **Noise**: PNG, 64x64, tileable, ≤4KB
- **Grain overlay**: opacity 0.05-0.15

---

## Compression Guidelines

### Images
```bash
# AVIF (best)
avifenc --min 20 --max 40 input.png output.avif

# WebP (fallback)
cwebp -q 85 input.png -o output.webp
```

### Video
```bash
# WebM (VP9)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -pass 1 -an -f null /dev/null
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 0 -crf 30 -pass 2 -c:a libopus output.webm

# MP4 (H.264 fallback)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -an output.mp4
```

### SVG
```bash
# SVGO optimization
svgo --multipass --precision=2 input.svg -o output.svg
```

---

## Art Direction Rules

### DO:
- Abstract system geometry
- Fluid motion (loops, glide, morph)
- Premium depth (blur, parallax, layering)
- Calm confidence (no alarm states)
- Universal/projectible (anyone can see themselves)

### DON'T:
- Literal brains, people, syringes, locks, shields
- Warning palettes (red, orange, yellow)
- Busy detail or visual noise
- Clinical/medical imagery
- Stock tech tropes (circuit boards, binary, matrices)

### Color Palette Constraint:
- **Purple** (individual, return, stability)
- **Cyan** (professional, thread, clarity)
- **Green** (organisation, proof, governance)
- **Neutrals** (gray scale for structure)

---

## Loading Strategy

### Critical Path
1. **Noise texture**: Inline data URI or preload
2. **Hero poster** (scene 1): Eager load
3. **AmbientField gradients**: CSS (instant)

### Progressive Enhancement
1. **Hero loop**: Lazy load after first paint
2. **Other scene posters**: Lazy load on scroll
3. **System assets**: Lazy load when component mounts
4. **Icons**: Sprite sheet or inline SVG

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Show posters only, hide loops */
  .hero-loop { display: none; }
  .hero-poster { display: block; }
}
```

---

## Immediate Deliverables ("Core 12")

**Phase 0 minimum viable asset set**:

1. ✅ Noise texture (4KB PNG, tileable)
2. ⬜ Hero poster 1: "Runs in real life" (300KB AVIF)
3. ⬜ Hero poster 2: "Feed with a spine" (300KB AVIF)
4. ⬜ Hero poster 3: "Receipts" (300KB AVIF)
5. ⬜ Hero poster 4: "One OS / Three worlds" (300KB AVIF)
6. ⬜ Hero loop 1 (1.5MB WebM) [optional for v1]
7. ⬜ Hero loop 2 (1.5MB WebM) [optional for v1]
8. ⬜ Hero loop 3 (1.2MB WebM) [optional for v1]
9. ⬜ Hero loop 4 (1.5MB WebM) [optional for v1]
10. ⬜ Thread line SVG (<5KB)
11. ⬜ Seal pulse SVG or CSS
12. ⬜ Receipt object SVG (<5KB)

**Everything else can be built with CSS + tokens.**

---

## Next Steps

1. ✅ Asset Spec Sheet complete
2. ⬜ Implement asset token system (tokens.ts)
3. ⬜ Create placeholder hero posters (SVG or gradient-based)
4. ⬜ Enhance AmbientField with pillar/lens variants
5. ⬜ Build system primitives (ThreadLine, PillarHalo, NodeCapsule, SealPulse)
6. ⬜ Create icon system (16 SVG icons)
7. ⬜ Integrate with WalkthroughPresenter
