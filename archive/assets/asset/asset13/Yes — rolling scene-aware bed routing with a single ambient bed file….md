Yes — rolling **scene-aware bed routing** with a **single ambient bed file** + **gain/EQ/pan morphing** (Web Audio), still **silent by default**, still **user-opt-in**, still **quiet**.  
This gives you that Apple keynote “the air changed” feeling — without adding more assets.  
  
## What we’re building  
* One loop: /assets/audio/bed-01.(mp3|ogg)  
* A tiny Web Audio chain:  
    * MediaElementSource → Gain → Lowpass → HighShelf → StereoPan → Destination  
* A profile map:  
    * per **scene** + **lens** target parameters  
* Smooth morphing:  
    * linearRampToValueAtTime over ~700ms  
* Your keynote calls:  
    * audio.routeBed({ sceneId, lens }) on scene change  
  
## 1) Add new file: bedProfiles.ts  
```
src/lib/audio/bedProfiles.ts
export type Lens = "individual" | "professional" | "organisation";

export type BedProfile = {
  gain: number;            // 0..0.2 (keep quiet)
  lowpassHz: number;       // 800..20000
  shelfGainDb: number;     // -6..+6 (gentle brightness)
  pan: number;             // -0.2..+0.2 (barely-there space)
  rampMs?: number;         // morph time
};

export type BedRoute = {
  sceneId: string;         // e.g. "hero-scene-03"
  lens: Lens;
};

const BASE: BedProfile = {
  gain: 0.10,
  lowpassHz: 14000,
  shelfGainDb: 0,
  pan: 0,
  rampMs: 720
};

/**
 * Scene rhythm: the bed "leans" into the story.
 * Not louder — more "presence vs distance" via lowpass/shelf/pan.
 */
const SCENE: Record<string, Partial<BedProfile>> = {
  "hero-scene-01": { lowpassHz: 15000, shelfGainDb: 0.5, pan: -0.05 }, // opening: clean
  "hero-scene-02": { lowpassHz: 12500, shelfGainDb: 0.0, pan: 0.02 },  // system: steady
  "hero-scene-03": { lowpassHz: 9800,  shelfGainDb: -0.8, pan: 0.0 },  // trust: warmer
  "hero-scene-04": { lowpassHz: 13500, shelfGainDb: 0.3, pan: 0.06 }   // synthesis: open
};

/**
 * Lens nuance: changes "texture" subtly.
 * Individual = softer + slightly warmer
 * Professional = neutral/clear
 * Organisation = slightly more defined (still calm)
 */
const LENS: Record<Lens, Partial<BedProfile>> = {
  individual:   { gain: 0.095, lowpassHz: 11500, shelfGainDb: -0.4, pan: -0.02 },
  professional: { gain: 0.10,  lowpassHz: 13000, shelfGainDb: 0.0,  pan: 0.0 },
  organisation: { gain: 0.105, lowpassHz: 14000, shelfGainDb: 0.35, pan: 0.02 }
};

export function resolveBedProfile(route: BedRoute): BedProfile {
  const s = SCENE[route.sceneId] ?? {};
  const l = LENS[route.lens] ?? {};

  return {
    ...BASE,
    ...l,
    ...s,
    // scene can override ramp if needed
    rampMs: s.rampMs ?? BASE.rampMs
  };
}

```
  
## 2) Upgrade AudioProvider to support WebAudio bed routing  
## Update src/lib/audio/AudioProvider.tsx  
This is the clean approach:  
* keep your existing **unlock / enabled / play(seal)** logic  
* add a WebAudio bed graph when available  
* add routeBed(route) to morph parameters  
Replace your AudioProvider with this version (it includes your previous features + routing):  
```
import React, { createContext, useCallback, useMemo, useRef, useState } from "react";
import { resolveBedProfile, type BedRoute } from "./bedProfiles";

type SoundId = "bed" | "seal";

type AudioCtxValue = {
  enabled: boolean;
  unlocked: boolean;
  setEnabled: (v: boolean) => void;

  unlock: () => Promise<void>;

  play: (id: SoundId) => void;

  startBed: () => void;
  stopBed: () => void;

  // NEW: scene-aware morphing (single bed file)
  routeBed: (route: BedRoute) => void;
};

export const AudioContext = createContext<AudioCtxValue | null>(null);

type Src = { mp3?: string; ogg?: string };

const SOURCES: Record<SoundId, Src> = {
  bed: { mp3: "/assets/audio/bed-01.mp3", ogg: "/assets/audio/bed-01.ogg" },
  seal: { mp3: "/assets/audio/seal-chime.mp3", ogg: "/assets/audio/seal-chime.ogg" }
};

function pickSrc(src: Src) {
  const a = document.createElement("audio");
  if (src.ogg && a.canPlayType('audio/ogg; codecs="vorbis"')) return src.ogg;
  if (src.mp3) return src.mp3;
  return src.ogg ?? "";
}

export function AudioProvider(props: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // HTMLAudio elements
  const bedEl = useRef<HTMLAudioElement | null>(null);
  const sealEl = useRef<HTMLAudioElement | null>(null);

  // WebAudio graph refs (bed only)
  const wa = useRef<{
    ctx: AudioContext;
    src: MediaElementAudioSourceNode;
    gain: GainNode;
    lowpass: BiquadFilterNode;
    shelf: BiquadFilterNode;
    pan: StereoPannerNode;
  } | null>(null);

  const bedFading = useRef(false);

  const VOLUME = useMemo(() => ({ bed: 0.10, seal: 0.22 }), []);

  const ensureEl = useCallback((id: SoundId) => {
    if (typeof document === "undefined") return null;

    if (id === "bed") {
      if (!bedEl.current) {
        const el = document.createElement("audio");
        el.src = pickSrc(SOURCES.bed);
        el.loop = true;
        el.preload = "auto";
        el.volume = 0; // we control via graph or fades
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

  const ensureWebAudio = useCallback(() => {
    if (wa.current) return wa.current;
    const el = bedEl.current;
    if (!el) return null;

    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
    if (!Ctx) return null;

    const ctx = new Ctx();

    const src = ctx.createMediaElementSource(el);

    const gain = ctx.createGain();
    gain.gain.value = 0;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 14000;

    const shelf = ctx.createBiquadFilter();
    shelf.type = "highshelf";
    shelf.frequency.value = 5200;
    shelf.gain.value = 0;

    const pan = ctx.createStereoPanner();
    pan.pan.value = 0;

    // chain: src -> gain -> lowpass -> shelf -> pan -> out
    src.connect(gain);
    gain.connect(lowpass);
    lowpass.connect(shelf);
    shelf.connect(pan);
    pan.connect(ctx.destination);

    wa.current = { ctx, src, gain, lowpass, shelf, pan };
    return wa.current;
  }, []);

  const unlock = useCallback(async () => {
    if (unlocked) return;
    try {
      // Ensure elements exist
      const seal = ensureEl("seal");
      const bed = ensureEl("bed");
      if (!seal || !bed) return;

      // Create WebAudio context if possible (requires gesture)
      const graph = ensureWebAudio();
      if (graph) {
        // Resume on gesture
        await graph.ctx.resume();
      }

      // iOS/Safari sometimes needs a tiny play/pause to unlock media
      seal.currentTime = 0;
      await seal.play();
      seal.pause();
      seal.currentTime = 0;

      setUnlocked(true);
    } catch {
      // remain locked; no throw
    }
  }, [ensureEl, ensureWebAudio, unlocked]);

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

    const el = ensureEl("bed");
    if (!el || !el.src) return;

    try {
      // Start element playback if needed
      if (el.paused) {
        el.currentTime = 0;
        el.volume = 0;
        await el.play();
      }

      // If WebAudio exists, we use the graph gain; else we fade element volume
      const graph = ensureWebAudio();
      if (graph) {
        await graph.ctx.resume();
        const now = graph.ctx.currentTime;
        graph.gain.gain.cancelScheduledValues(now);
        graph.gain.gain.setValueAtTime(graph.gain.gain.value, now);
        graph.gain.gain.linearRampToValueAtTime(VOLUME.bed, now + 0.52);
      } else {
        await fadeTo(el, VOLUME.bed, 520);
      }
    } catch {
      // no throw
    }
  }, [enabled, unlocked, ensureEl, ensureWebAudio, fadeTo, VOLUME.bed]);

  const stopBed = useCallback(async () => {
    const el = bedEl.current;
    if (!el) return;

    try {
      const graph = wa.current;
      if (graph) {
        const now = graph.ctx.currentTime;
        graph.gain.gain.cancelScheduledValues(now);
        graph.gain.gain.setValueAtTime(graph.gain.gain.value, now);
        graph.gain.gain.linearRampToValueAtTime(0, now + 0.36);
        window.setTimeout(() => el.pause(), 380);
      } else {
        await fadeTo(el, 0, 360);
        el.pause();
      }
    } catch {
      // no throw
    }
  }, [fadeTo]);

  const play = useCallback((id: SoundId) => {
    if (!enabled || !unlocked) return;
    const el = ensureEl(id);
    if (!el || !el.src) return;

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
  }, [enabled, unlocked, ensureEl, startBed, VOLUME.seal]);

  // NEW: routeBed morphing (single bed file)
  const routeBed = useCallback((route: BedRoute) => {
    if (!enabled || !unlocked) return;

    const el = ensureEl("bed");
    if (!el) return;

    const graph = ensureWebAudio();
    if (!graph) return; // routing only when WebAudio is available

    const p = resolveBedProfile(route);

    // Ensure bed is running
    if (el.paused) {
      // startBed() will also set gain
      void startBed();
    }

    const t0 = graph.ctx.currentTime;
    const dt = Math.max(0.18, (p.rampMs ?? 720) / 1000);

    // Gain
    graph.gain.gain.cancelScheduledValues(t0);
    graph.gain.gain.setValueAtTime(graph.gain.gain.value, t0);
    graph.gain.gain.linearRampToValueAtTime(p.gain, t0 + dt);

    // Lowpass
    graph.lowpass.frequency.cancelScheduledValues(t0);
    graph.lowpass.frequency.setValueAtTime(graph.lowpass.frequency.value, t0);
    graph.lowpass.frequency.linearRampToValueAtTime(p.lowpassHz, t0 + dt);

    // High shelf gain
    graph.shelf.gain.cancelScheduledValues(t0);
    graph.shelf.gain.setValueAtTime(graph.shelf.gain.value, t0);
    graph.shelf.gain.linearRampToValueAtTime(p.shelfGainDb, t0 + dt);

    // Pan
    graph.pan.pan.cancelScheduledValues(t0);
    graph.pan.pan.setValueAtTime(graph.pan.pan.value, t0);
    graph.pan.pan.linearRampToValueAtTime(p.pan, t0 + dt);
  }, [enabled, unlocked, ensureEl, ensureWebAudio, startBed]);

  const value = useMemo<AudioCtxValue>(() => ({
    enabled,
    unlocked,
    setEnabled: (v: boolean) => setEnabled(v),
    unlock,
    play,
    startBed,
    stopBed,
    routeBed
  }), [enabled, unlocked, unlock, play, startBed, stopBed, routeBed]);

  return <AudioContext.Provider value={value}>{props.children}</AudioContext.Provider>;
}

```
  
## 3) Wire keynote scene changes → bed routing  
In WalkthroughPresenter.tsx you already have audio = useAudio() and you already know s.id + lens.  
Add this effect:  
```
useEffect(() => {
  if (!open) return;
  // Route bed to current scene + lens
  audio.routeBed({ sceneId: scenes[i].id, lens });
}, [open, i, lens, scenes, audio]);

```
That’s it.  
Now when the keynote moves through scenes, the bed **morphs**:  
* Scene 03 (Trust) warms and softens  
* Organisation lens gets slightly clearer (still quiet)  
* Individual lens gets slightly warmer / closer  
Still one file.  
  
## 4) Optional: route bed on “impact” too (micro emphasis)  
Inside triggerImpact() (when SEALED happens), you can slightly “open” the bed for 600ms then return:  
```
audio.routeBed({ sceneId: scenes[i].id, lens });

// Optional: brief “open” feel on sealed (subtle)
setTimeout(() => {
  audio.routeBed({ sceneId: scenes[i].id, lens });
}, 650);

```
(If you want *true* impact shaping, we can add an impact overlay gain bump node — but this is already very premium.)  
  
## 5) What you’ll feel  
Not “music changes.” More like: **the room reorients**.  
And because it’s only EQ/gain/pan morphing:  
* no extra downloads  
* no complexity explosion  
* still calm, still consent-bound  
  
If you want the final, final flex: I can roll a **lens-aware “soundless” mode** where toggling Sound ON doesn’t start the bed immediately — it starts only on first keynote interaction. That’s the most dignified possible audio posture.  
If you want the final, final flex: I can roll a **lens-aware “soundless” mode** where toggling Sound ON doesn’t start the bed immediately — it starts only on first keynote interaction. That’s the most dignified possible audio posture.  
