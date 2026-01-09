I’ll roll the asset integration layer: a tiny typed loader for the manifest, a resolver that picks the right asset by lens/theme/pillar + reduced-motion, and an AmbientField component that uses it (drop-in for your site primitives).  
Below is the **asset integration layer**: a tiny, typed manifest loader + resolver (lens/theme/pillar + reduced-motion) + a drop-in ****<AmbientField/>**** that uses it.  
No frameworks assumed — works in Vite/React, Next, Astro, etc.  
  
## 0) Folder placement  
```
/src
  /lib/assets
    types.ts
    manifest.ts
    resolve.ts
    useReducedMotion.ts
  /ui/AmbientField
    AmbientField.tsx
    AmbientField.css

```
And your manifest lives at:  
```
/public/assets/_meta/assets.manifest.json

```
  
## 1) Types — types.ts  
```
// src/lib/assets/types.ts

export type Pillar = "ER" | "SR" | "SC" | "CR" | "II" | "DM" | "NONE";
export type Lens = "individual" | "professional" | "organisation" | "any";
export type Theme = "dark" | "light" | "any";

export type AssetClass = "field" | "hero" | "system" | "proof" | "icon" | "texture";
export type AssetType = "image" | "video" | "svg" | "png";
export type AssetExt = "avif" | "webp" | "png" | "svg" | "webm" | "mp4";

export type AssetFormat = {
  ext: AssetExt;
  path: string;
  width?: number;
  height?: number;
  durationMs?: number;
  sizeKB?: number;
};

export type AssetMeta = {
  alt?: string;
  loop?: boolean;
  seamless?: boolean;
  reducedMotionFallbackId?: string;
  dominantHex?: string[];
};

export type AssetUsage = {
  components: string[];
  routes: string[];
  preload: "eager" | "lazy" | "on-interaction";
  tags?: string[];
};

export type Asset = {
  id: string;
  class: AssetClass;
  type: AssetType;
  pillar?: Pillar;
  lens?: Lens;
  theme?: Theme;
  formats: AssetFormat[];
  meta?: AssetMeta;
  usage: AssetUsage;
};

export type AssetManifest = {
  version: string;
  updatedAt: string;
  brand: {
    colors: Record<string, string | Record<string, string>>;
    fonts: Record<string, string>;
  };
  assets: Asset[];
};

```
  
## 2) Manifest loader — manifest.ts  
Two options:  
* **Option A (recommended for Vite/Next)**: static import (fast, typed, no runtime fetch)  
* **Option B**: runtime fetch from /assets/_meta/assets.manifest.json  
## Option A: static import  
If your bundler supports JSON imports:  
```
// src/lib/assets/manifest.ts
import type { AssetManifest } from "./types";
// If TS complains, add `"resolveJsonModule": true` in tsconfig.
import manifestJson from "../../../public/assets/_meta/assets.manifest.json";

export const manifest = manifestJson as AssetManifest;

```
## Option B: runtime fetch  
Use this if you want to swap manifests without rebuild:  
```
// src/lib/assets/manifest.ts
import type { AssetManifest } from "./types";

let cache: AssetManifest | null = null;

export async function loadManifest(url = "/assets/_meta/assets.manifest.json"): Promise<AssetManifest> {
  if (cache) return cache;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load asset manifest: ${res.status}`);
  const json = (await res.json()) as AssetManifest;
  cache = json;
  return json;
}

```
If you choose Option B, the resolver below accepts a manifest param.  
  
## 3) Reduced motion hook — useReducedMotion.ts  
```
// src/lib/assets/useReducedMotion.ts
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

```
  
## 4) Resolver — resolve.ts  
This is the core: it chooses the right asset by **lens/theme/pillar**, and chooses the best format by **reduced-motion** + preferred extensions.  
```
// src/lib/assets/resolve.ts
import type { Asset, AssetExt, AssetManifest, Lens, Pillar, Theme } from "./types";

export type ResolveContext = {
  lens: Exclude<Lens, "any">;
  theme: Exclude<Theme, "any">;
  pillar?: Exclude<Pillar, "NONE"> | "NONE";
  reducedMotion?: boolean;
};

export function indexManifest(m: AssetManifest) {
  const byId = new Map<string, Asset>();
  for (const a of m.assets) byId.set(a.id, a);
  return { byId };
}

export function getById(m: AssetManifest, id: string) {
  return m.assets.find((a) => a.id === id) ?? null;
}

export function pickFormat(asset: Asset, preferred: AssetExt[]): string | null {
  for (const ext of preferred) {
    const f = asset.formats.find((x) => x.ext === ext);
    if (f) return f.path;
  }
  // fallback: first format
  return asset.formats[0]?.path ?? null;
}

export function resolveWithReducedMotion(m: AssetManifest, asset: Asset, reducedMotion: boolean): Asset {
  if (!reducedMotion) return asset;

  // If asset is video and has a reduced motion fallback id, return that fallback asset if present.
  if (asset.type === "video") {
    const fbId = asset.meta?.reducedMotionFallbackId;
    if (fbId) {
      const fb = getById(m, fbId);
      if (fb) return fb;
    }

    // Else: try to find a poster format within same asset
    const hasPoster = asset.formats.some((f) => f.ext === "avif" || f.ext === "webp" || f.ext === "png");
    if (hasPoster) {
      // Return a "virtual" asset typed as image by filtering formats
      return {
        ...asset,
        type: "image",
        formats: asset.formats.filter((f) => f.ext === "avif" || f.ext === "webp" || f.ext === "png"),
      };
    }
  }

  return asset;
}

/**
 * Resolve a FIELD background asset by priority:
 * 1) lens-specific field: field-lens-{lens}-{theme}
 * 2) pillar-specific field: field-pillar-{pillar}-{theme}
 * 3) base field: field-base-{theme}
 *
 * IDs must exist in manifest to resolve.
 */
export function resolveFieldAssetId(ctx: ResolveContext) {
  const { lens, theme, pillar = "NONE" } = ctx;
  const ids: string[] = [];

  // Lens first
  ids.push(`field-lens-${lens}-${theme}`);

  // Pillar (optional)
  if (pillar && pillar !== "NONE") ids.push(`field-pillar-${pillar.toLowerCase?.() ?? String(pillar).toLowerCase()}-${theme}`);

  // Base fallback
  ids.push(`field-base-${theme}`);

  return ids;
}

export function resolveFirstExisting(m: AssetManifest, ids: string[]): Asset | null {
  for (const id of ids) {
    const a = getById(m, id);
    if (a) return a;
  }
  return null;
}

/**
 * Resolve the best field image path for a context.
 */
export function resolveFieldPath(
  m: AssetManifest,
  ctx: ResolveContext,
  preferred: AssetExt[] = ["avif", "webp", "png"]
): { asset: Asset | null; path: string | null } {
  const ids = resolveFieldAssetId(ctx);
  const asset = resolveFirstExisting(m, ids);
  if (!asset) return { asset: null, path: null };

  const finalAsset = resolveWithReducedMotion(m, asset, !!ctx.reducedMotion);
  const path = pickFormat(finalAsset, preferred);
  return { asset: finalAsset, path };
}

/**
 * Resolve hero scene asset (e.g. hero-scene-01) and best playable source.
 */
export function resolveHeroScene(
  m: AssetManifest,
  sceneId: string,
  ctx: ResolveContext
): {
  asset: Asset | null;
  videoSrc: string | null;
  posterSrc: string | null;
} {
  const a = getById(m, sceneId);
  if (!a) return { asset: null, videoSrc: null, posterSrc: null };

  const reduced = !!ctx.reducedMotion;
  const finalAsset = resolveWithReducedMotion(m, a, reduced);

  // If reduced motion turns it into image, no video.
  const isVideo = finalAsset.type === "video" && !reduced;

  const poster = pickFormat(finalAsset, ["avif", "webp", "png"]);
  const video = isVideo ? pickFormat(finalAsset, ["webm", "mp4"]) : null;

  return { asset: finalAsset, videoSrc: video, posterSrc: poster };
}

```
Note: pillar IDs in your manifest examples were like field-pillar-er--dark.avif but the IDs you spec’d were field-pillar-er-dark. Choose one convention and keep it stable. The resolver expects field-pillar-er-dark style IDs. If you want -- separators, I’ll adjust.  
  
## 5) AmbientField component — AmbientField.tsx  
This is the drop-in wrapper that:  
* resolves best **field** by lens/theme/pillar  
* overlays noise/grain  
* supports “cinematic” glow via CSS  
* respects reduced motion automatically (if you pass loops later)  
```
// src/ui/AmbientField/AmbientField.tsx
import React, { useMemo } from "react";
import "./AmbientField.css";

import type { AssetManifest } from "../../lib/assets/types";
import { resolveFieldPath } from "../../lib/assets/resolve";
import { useReducedMotion } from "../../lib/assets/useReducedMotion";

// If using static manifest import:
import { manifest as staticManifest } from "../../lib/assets/manifest";

type Lens = "individual" | "professional" | "organisation";
type Theme = "dark" | "light";
type Pillar = "ER" | "SR" | "SC" | "CR" | "II" | "DM" | "NONE";

export function AmbientField(props: {
  lens: Lens;
  theme: Theme;
  pillar?: Pillar;
  manifest?: AssetManifest;       // optional override if using runtime load
  intensity?: "soft" | "base" | "dense";
  className?: string;
  children?: React.ReactNode;
}) {
  const {
    lens,
    theme,
    pillar = "NONE",
    manifest = staticManifest,
    intensity = "base",
    className,
    children,
  } = props;

  const reducedMotion = useReducedMotion();

  const resolved = useMemo(() => {
    return resolveFieldPath(manifest, { lens, theme, pillar, reducedMotion });
  }, [manifest, lens, theme, pillar, reducedMotion]);

  const bg = resolved.path ?? "";

  return (
    <div
      className={`ro-ambient ro-ambient--${intensity} ${className ?? ""}`}
      data-theme={theme}
      data-lens={lens}
      data-pillar={pillar}
      style={
        bg
          ? ({
              // CSS variable for background image
              ["--ambient-bg" as any]: `url("${bg}")`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="ro-ambient__bg" aria-hidden="true" />
      <div className="ro-ambient__glow" aria-hidden="true" />
      <div className="ro-ambient__grain" aria-hidden="true" />
      <div className="ro-ambient__content">{children}</div>
    </div>
  );
}

```
  
## 6) AmbientField styles — AmbientField.css  
This gives you the Apple-grade “field + glass + grain” look without heavy media.  
```
/* src/ui/AmbientField/AmbientField.css */

.ro-ambient {
  position: relative;
  overflow: hidden;
  border-radius: var(--r-xl, 20px);
}

/* Image-backed field (optional) */
.ro-ambient__bg {
  position: absolute;
  inset: 0;
  background-image: var(--ambient-bg);
  background-size: cover;
  background-position: center;
  opacity: 0.85;
  transform: scale(1.02);
  filter: saturate(1.02) contrast(1.02);
}

/* Cinematic glow (CSS-only; always available even if bg missing) */
.ro-ambient__glow {
  position: absolute;
  inset: -120px;
  background:
    radial-gradient(700px 520px at 18% 18%, rgba(124,103,255,0.22), rgba(0,0,0,0)),
    radial-gradient(620px 460px at 84% 28%, rgba(64,224,208,0.14), rgba(0,0,0,0)),
    radial-gradient(620px 460px at 55% 86%, rgba(47,230,166,0.10), rgba(0,0,0,0));
  opacity: 0.95;
  pointer-events: none;
}

/* Grain/noise overlay */
.ro-ambient__grain {
  position: absolute;
  inset: 0;
  background-image: url("/assets/textures/noise-tile.png");
  background-size: 220px 220px;
  opacity: 0.16;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Intensity presets */
.ro-ambient--soft .ro-ambient__bg { opacity: 0.72; }
.ro-ambient--soft .ro-ambient__grain { opacity: 0.12; }
.ro-ambient--dense .ro-ambient__bg { opacity: 0.92; }
.ro-ambient--dense .ro-ambient__grain { opacity: 0.20; }

/* Content above */
.ro-ambient__content {
  position: relative;
  z-index: 1;
}

/* Optional: lens / pillar subtle shifts (CSS only) */
.ro-ambient[data-lens="organisation"] .ro-ambient__grain {
  opacity: 0.20;
}
.ro-ambient[data-lens="individual"] .ro-ambient__grain {
  opacity: 0.14;
}

```
  
## 7) How you use it (Site primitives)  
Example Section wrapper:  
```
// src/ui/layout/Section.tsx
import React from "react";
import { AmbientField } from "../AmbientField/AmbientField";

export function Section(props: {
  lens: "individual" | "professional" | "organisation";
  theme: "dark" | "light";
  pillar?: "ER" | "SR" | "SC" | "CR" | "II" | "DM" | "NONE";
  children: React.ReactNode;
}) {
  return (
    <AmbientField lens={props.lens} theme={props.theme} pillar={props.pillar} intensity="soft" className="site-section">
      <div style={{ padding: 22 }}>{props.children}</div>
    </AmbientField>
  );
}

```
  
## 8) Optional: preload helper (for hero)  
If you want hero posters/loops to feel instant:  
```
// src/lib/assets/preload.ts
export function preloadAsset(href: string, as: "image" | "video") {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
  return () => link.remove();
}

```
Then preload the hero scene 01 poster on homepage mount.  
  
## Next roll (if you want)  
I can add:  
1. HeroMedia component that uses resolveHeroScene() (video loop with poster fallback + reduced motion swap)  
2. AssetProvider context (so you don’t pass lens/theme/manifest everywhere)  
3. A manifest “sanity checker” utility that warns if required Core12 assets are missing at build time.  
Just say: **“roll HeroMedia + AssetProvider”**.  
