Cool — rolling **HeroMedia + AssetProvider** (so the whole site can pull assets by lens/theme/pillar without prop-drilling).  
  
# 0) Add files  
```
/src
  /lib/assets
    AssetProvider.tsx
    useAssets.ts
    preload.ts          (optional, small)
  /ui/HeroMedia
    HeroMedia.tsx
    HeroMedia.css

```
  
# 1) AssetProvider (global context)  
```
AssetProvider.tsx
// src/lib/assets/AssetProvider.tsx
import React, { createContext, useMemo } from "react";
import type { AssetManifest, Lens, Theme, Pillar } from "./types";

// If using static manifest import:
import { manifest as staticManifest } from "./manifest";

export type AssetContextValue = {
  manifest: AssetManifest;
  lens: Exclude<Lens, "any">;
  theme: Exclude<Theme, "any">;
  pillar?: Exclude<Pillar, "NONE"> | "NONE";
};

export const AssetContext = createContext<AssetContextValue | null>(null);

export function AssetProvider(props: {
  lens: "individual" | "professional" | "organisation";
  theme: "dark" | "light";
  pillar?: "ER" | "SR" | "SC" | "CR" | "II" | "DM" | "NONE";
  manifest?: AssetManifest; // allow runtime swap if you want
  children: React.ReactNode;
}) {
  const { lens, theme, pillar = "NONE", manifest = staticManifest, children } = props;

  const value = useMemo<AssetContextValue>(
    () => ({ manifest, lens, theme, pillar }),
    [manifest, lens, theme, pillar]
  );

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}
useAssets.ts
// src/lib/assets/useAssets.ts
import { useContext } from "react";
import { AssetContext } from "./AssetProvider";

export function useAssets() {
  const ctx = useContext(AssetContext);
  if (!ctx) throw new Error("useAssets must be used inside <AssetProvider/>");
  return ctx;
}

```
Now every component can just call useAssets() and resolve the right asset.  
  
# 2) HeroMedia (video loop with poster fallback + reduced motion)  
```
HeroMedia.tsx
// src/ui/HeroMedia/HeroMedia.tsx
import React, { useMemo } from "react";
import "./HeroMedia.css";

import { useAssets } from "../../lib/assets/useAssets";
import { useReducedMotion } from "../../lib/assets/useReducedMotion";
import { resolveHeroScene } from "../../lib/assets/resolve";

/**
 * HeroMedia:
 * - Resolves hero scene asset via manifest
 * - Uses poster immediately, swaps in loop video if allowed
 * - Honors prefers-reduced-motion (no video)
 */
export function HeroMedia(props: {
  sceneId: string; // e.g. "hero-scene-01"
  className?: string;
  priority?: "eager" | "lazy";
  overlay?: "none" | "soft" | "dense";
  children?: React.ReactNode; // optional overlay content
}) {
  const { sceneId, className, priority = "lazy", overlay = "soft", children } = props;
  const { manifest, lens, theme, pillar } = useAssets();
  const reducedMotion = useReducedMotion();

  const resolved = useMemo(() => {
    return resolveHeroScene(manifest, sceneId, { lens, theme, pillar, reducedMotion });
  }, [manifest, sceneId, lens, theme, pillar, reducedMotion]);

  const poster = resolved.posterSrc ?? "";
  const video = resolved.videoSrc;

  // loading hints
  const imgLoading = priority === "eager" ? "eager" : "lazy";
  const videoPreload = priority === "eager" ? "auto" : "metadata";

  return (
    <div className={`ro-heroMedia ro-heroMedia--${overlay} ${className ?? ""}`} data-theme={theme} data-lens={lens}>
      {/* Poster always present for instant paint */}
      {poster ? (
        <img
          className="ro-heroMedia__poster"
          src={poster}
          alt={resolved.asset?.meta?.alt ?? ""}
          loading={imgLoading}
          decoding="async"
        />
      ) : (
        <div className="ro-heroMedia__poster ro-heroMedia__fallback" aria-hidden="true" />
      )}

      {/* Video loop only if available and not reduced motion */}
      {video ? (
        <video
          className="ro-heroMedia__video"
          src={video}
          muted
          playsInline
          autoPlay
          loop
          preload={videoPreload}
          aria-hidden="true"
        />
      ) : null}

      {/* Cinematic top-layer */}
      <div className="ro-heroMedia__glow" aria-hidden="true" />
      <div className="ro-heroMedia__grain" aria-hidden="true" />

      {/* Content overlay */}
      {children ? <div className="ro-heroMedia__content">{children}</div> : null}
    </div>
  );
}
HeroMedia.css
/* src/ui/HeroMedia/HeroMedia.css */
.ro-heroMedia {
  position: relative;
  overflow: hidden;
  border-radius: var(--r-xl, 20px);
  border: 1px solid rgba(233,231,255,0.16);
  background: rgba(21,20,42,0.55);
  box-shadow: var(--e2);
  min-height: 360px;
}

[data-theme="light"] .ro-heroMedia {
  background: rgba(251,250,255,0.70);
  border-color: rgba(42,41,66,0.10);
}

.ro-heroMedia__poster,
.ro-heroMedia__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ro-heroMedia__poster {
  opacity: 0.96;
  transform: scale(1.02);
  filter: saturate(1.02) contrast(1.02);
}

/* Put video above poster for motion richness */
.ro-heroMedia__video {
  opacity: 0.92;
  filter: saturate(1.02) contrast(1.02);
}

.ro-heroMedia__fallback {
  background:
    radial-gradient(700px 520px at 18% 18%, rgba(124,103,255,0.24), rgba(0,0,0,0)),
    radial-gradient(620px 460px at 84% 28%, rgba(64,224,208,0.16), rgba(0,0,0,0)),
    radial-gradient(620px 460px at 55% 86%, rgba(47,230,166,0.12), rgba(0,0,0,0));
}

.ro-heroMedia__glow {
  position: absolute;
  inset: -140px;
  background:
    radial-gradient(760px 560px at 18% 18%, rgba(124,103,255,0.18), rgba(0,0,0,0)),
    radial-gradient(700px 520px at 85% 30%, rgba(64,224,208,0.12), rgba(0,0,0,0)),
    radial-gradient(700px 520px at 60% 85%, rgba(47,230,166,0.10), rgba(0,0,0,0));
  pointer-events: none;
}

.ro-heroMedia__grain {
  position: absolute;
  inset: 0;
  background-image: url("/assets/textures/noise-tile.png");
  background-size: 220px 220px;
  opacity: 0.16;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.ro-heroMedia__content {
  position: relative;
  z-index: 1;
  padding: 22px;
}

/* Overlay intensity controls */
.ro-heroMedia--none .ro-heroMedia__glow { display: none; }
.ro-heroMedia--soft .ro-heroMedia__glow { opacity: 0.85; }
.ro-heroMedia--dense .ro-heroMedia__glow { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .ro-heroMedia__video { display: none; }
}

```
  
# 3) Optional: preload helper (hero feels instant)  
```
preload.ts
// src/lib/assets/preload.ts
export function preload(href: string, as: "image" | "video") {
  if (typeof document === "undefined") return () => {};
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
  return () => link.remove();
}

```
  
# 4) Using it (the clean way)  
Wrap your app (or page layout) once:  
```
import React, { useState } from "react";
import { AssetProvider } from "./lib/assets/AssetProvider";
import { HeroMedia } from "./ui/HeroMedia/HeroMedia";

export function App() {
  const [lens, setLens] = useState<"individual" | "professional" | "organisation">("individual");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <AssetProvider lens={lens} theme={theme}>
      <div style={{ padding: 20 }}>
        <HeroMedia sceneId="hero-scene-01" priority="eager" overlay="dense">
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 38, letterSpacing: "-0.02em" }}>
              Recovery that runs in real life.
            </div>
            <div style={{ marginTop: 10, color: "var(--ink-secondary)", fontSize: 15, lineHeight: 1.55 }}>
              Quietly. Safely. Provably.
            </div>
          </div>
        </HeroMedia>
      </div>
    </AssetProvider>
  );
}

```
  
# 5) One important note (ID conventions)  
Your resolver expects hero IDs like hero-scene-01. So in the manifest, keep stable IDs exactly like that:  
* ✅ "id": "hero-scene-01"  
* ✅ "id": "field-base-dark"  
* ✅ "id": "field-lens-individual-dark"  
If your current manifest uses double dashes in the *filename* (field-base--dark.avif), that’s fine — just keep the **ID clean** and map formats to paths.  
  
## Next roll (the real payoff)  
If you want, I’ll roll the **KeynotePresenter → HeroMedia integration** so each scene automatically pulls the correct hero-scene-0X, preloads the next one, and swaps loop/poster based on reduced motion — totally seamless.  
Just say: **“roll KeynotePresenter asset binding”**.  
Just say: **“roll KeynotePresenter asset binding”**.  
