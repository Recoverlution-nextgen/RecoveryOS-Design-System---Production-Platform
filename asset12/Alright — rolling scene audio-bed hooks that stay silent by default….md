Alright — rolling **scene audio-bed hooks** that stay *silent by default*, require *explicit user opt-in*, and only fire a **soft “seal” chime** on impact (e.g. “Receipt sealed.”).  
This is built to feel like OS feedback — **relief**, not alarm.  
This is built to feel like OS feedback — **relief**, not alarm.  
  
## 0) What you’re adding (minimal + safe)  
## Audio elements  
* **Ambient bed** (very subtle, loop) — optional  
* **Seal chime** (single soft hit) — only on SEALED impact  
## Rules  
* **Never autoplay** audio (browser + dignity)  
* **User must toggle sound ON**  
* **Respect “quiet by default”**: low volume, gentle fade, short tails  
* **No sharp transients** (avoid anything that feels like warning)  
  
## 1) Folder + files  
```
/public/assets/audio
  bed-01.mp3          (optional)
  bed-01.ogg          (optional)
  seal-chime.mp3
  seal-chime.ogg

```
Use OGG + MP3 for broad browser coverage. If you only ship one, use MP3.  
  
## 2) AudioProvider (user-initiated unlock + safe playback)  
```
src/lib/audio/AudioProvider.tsx
import React, { createContext, useCallback, useMemo, useRef, useState } from "react";

type SoundId = "bed" | "seal";

type AudioCtxValue = {
  enabled: boolean;                  // user toggle
  unlocked: boolean;                 // true after first user gesture (required by browsers)
  setEnabled: (v: boolean) => void;
  unlock: () => Promise<void>;       // call on user click
  play: (id: SoundId) => void;       // safe, no-throw
  startBed: () => void;
  stopBed: () => void;
};

export const AudioContext = createContext<AudioCtxValue | null>(null);

type Src = { mp3?: string; ogg?: string };

const SOURCES: Record<SoundId, Src> = {
  bed: {
    mp3: "/assets/audio/bed-01.mp3",
    ogg: "/assets/audio/bed-01.ogg"
  },
  seal: {
    mp3: "/assets/audio/seal-chime.mp3",
    ogg: "/assets/audio/seal-chime.ogg"
  }
};

function pickSrc(src: Src) {
  // Prefer ogg if supported; fallback mp3.
  const a = document.createElement("audio");
  if (src.ogg && a.canPlayType('audio/ogg; codecs="vorbis"')) return src.ogg;
  if (src.mp3) return src.mp3;
  return src.ogg ?? "";
}

export function AudioProvider(props: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Reuse audio elements (fast + consistent)
  const bedEl = useRef<HTMLAudioElement | null>(null);
  const sealEl = useRef<HTMLAudioElement | null>(null);

  // Soft safety volumes (keep quiet)
  const VOLUME = useMemo(() => ({ bed: 0.10, seal: 0.22 }), []);
  const bedFading = useRef(false);

  const ensure = useCallback((id: SoundId) => {
    if (typeof document === "undefined") return null;

    if (id === "bed") {
      if (!bedEl.current) {
        const el = document.createElement("audio");
        el.src = pickSrc(SOURCES.bed);
        el.loop = true;
        el.preload = "auto";
        el.volume = 0;
        bedEl.current = el;
      }
      return bedEl.current;
    }

    if (!sealEl.current) {
      const el = document.createElement("audio");
      el.src = pickSrc(SOURCES.seal);
      el.loop = false;
      el.preload = "auto";
      el.volume = VOLUME.seal;
      sealEl.current = el;
    }
    return sealEl.current;
  }, [VOLUME.seal]);

  // Browser audio unlock requires a user gesture. We do a tiny play/pause.
  const unlock = useCallback(async () => {
    if (unlocked) return;
    try {
      const el = ensure("seal");
      if (!el) return;
      el.currentTime = 0;
      // play() may reject if not a gesture — but we call this from a click.
      await el.play();
      el.pause();
      el.currentTime = 0;
      setUnlocked(true);
    } catch {
      // stay locked; no throw
    }
  }, [ensure, unlocked]);

  const fadeTo = useCallback(async (el: HTMLAudioElement, to: number, ms = 420) => {
    if (bedFading.current) return;
    bedFading.current = true;

    const from = el.volume;
    const start = performance.now();

    return new Promise<void>((resolve) => {
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        const v = from + (to - from) * t;
        el.volume = Math.max(0, Math.min(1, v));
        if (t >= 1) {
          bedFading.current = false;
          resolve();
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, []);

  const startBed = useCallback(async () => {
    if (!enabled || !unlocked) return;
    const el = ensure("bed");
    if (!el || !el.src) return;

    try {
      // Only start if not already playing
      if (el.paused) {
        el.currentTime = 0;
        el.volume = 0;
        await el.play();
      }
      await fadeTo(el, VOLUME.bed, 520);
    } catch {
      // no throw
    }
  }, [enabled, unlocked, ensure, fadeTo, VOLUME.bed]);

  const stopBed = useCallback(async () => {
    const el = bedEl.current;
    if (!el) return;
    try {
      await fadeTo(el, 0, 360);
      el.pause();
    } catch {
      // no throw
    }
  }, [fadeTo]);

  const play = useCallback((id: SoundId) => {
    if (!enabled || !unlocked) return;
    const el = ensure(id);
    if (!el || !el.src) return;

    // Don’t stack seal hits into noise: restart quickly & quietly.
    try {
      if (id === "seal") {
        el.pause();
        el.currentTime = 0;
        el.volume = VOLUME.seal;
        void el.play();
      } else {
        void startBed();
      }
    } catch {
      // no throw
    }
  }, [enabled, unlocked, ensure, startBed, VOLUME.seal]);

  const value = useMemo<AudioCtxValue>(() => ({
    enabled,
    unlocked,
    setEnabled: (v: boolean) => setEnabled(v),
    unlock,
    play,
    startBed,
    stopBed
  }), [enabled, unlocked, unlock, play, startBed, stopBed]);

  return <AudioContext.Provider value={value}>{props.children}</AudioContext.Provider>;
}
src/lib/audio/useAudio.ts
```
```


```
```
import { useContext } from "react";
import { AudioContext } from "./AudioProvider";

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider/>");
  return ctx;
}

```
  
## 3) Sound toggle (user-initiated, OS-calm)  
```
src/ui/chrome/SoundToggle.tsx
import React from "react";
import { useAudio } from "../../lib/audio/useAudio";

export function SoundToggle() {
  const { enabled, unlocked, setEnabled, unlock, startBed, stopBed } = useAudio();

  async function onToggle() {
    if (!unlocked) await unlock(); // user gesture happens here
    const next = !enabled;
    setEnabled(next);
    if (next) startBed();
    else stopBed();
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="ro-chip"
      aria-pressed={enabled}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? "Sound: On" : "Sound: Off"}
    </button>
  );
}

```
Style ro-chip with your existing token kit (glass pill). Keep it subtle.  
  
## 4) Wrap your app  
Where you currently have:  
```
<AssetProvider lens={lens} theme={theme}>
  ...
</AssetProvider>

```
Wrap with AudioProvider:  
```
import { AudioProvider } from "./lib/audio/AudioProvider";

<AudioProvider>
  <AssetProvider lens={lens} theme={theme}>
    ...
  </AssetProvider>
</AudioProvider>

```
  
## 5) Wire “seal chime” into the keynote impact  
In WalkthroughPresenter.tsx, import:  
```
import { useAudio } from "../../lib/audio/useAudio";

```
Inside component:  
```
const audio = useAudio();

```
Now in your existing impact trigger (the one you call on SEALED):  
```
function triggerImpact() {
  extraMsRef.current = Math.max(extraMsRef.current, 800);

  // AUDIO: gentle seal chime (only if user enabled + unlocked)
  audio.play("seal");

  if (impactTimer.current) window.clearTimeout(impactTimer.current);
  const k = Date.now();
  setImpactKey(k);
  impactTimer.current = window.setTimeout(() => setImpactKey(null), 680);
}

```
That’s it. If the user never turns sound on, nothing happens. If they do, it’s OS-quiet.  
  
## 6) Optional: only play chime when dock is open (extra dignity)  
If you want to avoid sound unless the user is *already engaged*:  
```
if (dockMode === "open") audio.play("seal");

```
  
## 7) Recommended audio mastering notes (for your audio person)  
To keep it non-triggering and “restorative”:  
* **No sharp attack** (fast transient reads like notification/alarm)  
* **Short, soft tail** (no long wash)  
* **Lower mid focus** (avoid piercing highs)  
* **Peak at -12 to -9 LUFS**, then we play at low volume anyway  
I can’t guarantee any sound is universally non-triggering, but these constraints keep it firmly on the “relief” side.  
  
If you want the absolute final move: I’ll roll **scene-aware bed routing** (bed subtly shifts per scene/lens) while still being a single file + gain morph — ultra premium, still quiet.  
If you want the absolute final move: I’ll roll **scene-aware bed routing** (bed subtly shifts per scene/lens) while still being a single file + gain morph — ultra premium, still quiet.  
