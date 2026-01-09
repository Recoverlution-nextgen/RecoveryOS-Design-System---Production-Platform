Locked. Here’s the **lens-aware “soundless” mode**:  
* **Sound ON** = permission granted (still silent)  
* **Bed starts only after first real interaction** (click / key / tap inside keynote)  
* **Routing can “pre-stage” parameters** without starting playback  
* Reduced-motion + your existing unlock rules still apply  
  
# 1) Update AudioProvider to add “armed / engaged” gating  
## Replace src/lib/audio/AudioProvider.tsx with this version  
(keeps everything you already rolled: unlock, seal chime, bed routing — now with soundless gating)  
```
import React, { createContext, useCallback, useMemo, useRef, useState } from "react";
import { resolveBedProfile, type BedRoute } from "./bedProfiles";

type SoundId = "bed" | "seal";

type AudioCtxValue = {
  enabled: boolean;     // user preference
  unlocked: boolean;    // browser media unlock achieved via user gesture
  armed: boolean;       // sound enabled but bed not yet started (soundless mode)
  engaged: boolean;     // bed has started (at least once) this session

  setEnabled: (v: boolean) => void;
  unlock: () => Promise<void>;

  play: (id: SoundId) => void;

  // Explicit controls
  startBed: () => void;
  stopBed: () => void;

  // NEW: start bed only when you decide (first meaningful interaction)
  engageBed: (route?: BedRoute) => void;

  // Route without auto-start (pre-stage)
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
  const [enabled, _setEnabled] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Soundless gating
  const [engaged, setEngaged] = useState(false);
  const armed = enabled && unlocked && !engaged;

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
        el.volume = 0; // controlled via graph or fades
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
      const seal = ensureEl("seal");
      const bed = ensureEl("bed");
      if (!seal || !bed) return;

      const graph = ensureWebAudio();
      if (graph) await graph.ctx.resume();

      // media unlock (gesture-required)
      seal.currentTime = 0;
      await seal.play();
      seal.pause();
      seal.currentTime = 0;

      setUnlocked(true);
    } catch {
      // remain locked
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
    // IMPORTANT: startBed is explicit; we do NOT auto-start on enable.
    if (!enabled || !unlocked) return;

    const el = ensureEl("bed");
    if (!el || !el.src) return;

    try {
      if (el.paused) {
        el.currentTime = 0;
        el.volume = 0;
        await el.play();
      }

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

      setEngaged(true);
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
    } finally {
      setEngaged(false);
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
        // bed is explicit: do nothing here
      }
    } catch {
      // no throw
    }
  }, [enabled, unlocked, ensureEl, VOLUME.seal]);

  // Route WITHOUT auto-start (pre-stage parameters)
  const routeBed = useCallback((route: BedRoute) => {
    if (!enabled || !unlocked) return;

    const el = ensureEl("bed");
    if (!el) return;

    const graph = ensureWebAudio();
    if (!graph) return;

    const p = resolveBedProfile(route);
    const t0 = graph.ctx.currentTime;
    const dt = Math.max(0.18, (p.rampMs ?? 720) / 1000);

    graph.lowpass.frequency.cancelScheduledValues(t0);
    graph.lowpass.frequency.setValueAtTime(graph.lowpass.frequency.value, t0);
    graph.lowpass.frequency.linearRampToValueAtTime(p.lowpassHz, t0 + dt);

    graph.shelf.gain.cancelScheduledValues(t0);
    graph.shelf.gain.setValueAtTime(graph.shelf.gain.value, t0);
    graph.shelf.gain.linearRampToValueAtTime(p.shelfGainDb, t0 + dt);

    graph.pan.pan.cancelScheduledValues(t0);
    graph.pan.pan.setValueAtTime(graph.pan.pan.value, t0);
    graph.pan.pan.linearRampToValueAtTime(p.pan, t0 + dt);

    // NOTE: gain is only meaningful once bed is running;
    // we still ramp it to target so it "lands" immediately on engage.
    graph.gain.gain.cancelScheduledValues(t0);
    graph.gain.gain.setValueAtTime(graph.gain.gain.value, t0);
    graph.gain.gain.linearRampToValueAtTime(engaged ? p.gain : 0, t0 + dt);
  }, [enabled, unlocked, ensureEl, ensureWebAudio, engaged]);

  // Engage: first meaningful interaction (starts bed + routes)
  const engageBed = useCallback((route?: BedRoute) => {
    if (!enabled || !unlocked) return;
    if (engaged) {
      if (route) routeBed(route);
      return;
    }
    void startBed().then(() => {
      if (route) routeBed(route);
    });
  }, [enabled, unlocked, engaged, startBed, routeBed]);

  // SetEnabled behavior:
  // - turning ON: permission only (soundless), do NOT start bed
  // - turning OFF: stop bed immediately and reset engaged
  const setEnabled = useCallback((v: boolean) => {
    _setEnabled(v);
    if (!v) {
      void stopBed();
    }
    // If turning on, remain soundless until engageBed() is called.
  }, [stopBed]);

  const value = useMemo<AudioCtxValue>(() => ({
    enabled,
    unlocked,
    armed,
    engaged,
    setEnabled,
    unlock,
    play,
    startBed,
    stopBed,
    engageBed,
    routeBed
  }), [enabled, unlocked, armed, engaged, setEnabled, unlock, play, startBed, stopBed, engageBed, routeBed]);

  return <AudioContext.Provider value={value}>{props.children}</AudioContext.Provider>;
}

```
  
# 2) Update SoundToggle so it doesn’t start bed on enable  
## src/ui/chrome/SoundToggle.tsx (update)  
```
import React from "react";
import { useAudio } from "../../lib/audio/useAudio";

export function SoundToggle() {
  const { enabled, unlocked, setEnabled, unlock, stopBed } = useAudio();

  async function onToggle() {
    // user gesture happens here
    if (!unlocked) await unlock();

    const next = !enabled;
    setEnabled(next);

    // Turning off stops bed immediately
    if (!next) stopBed();

    // Turning on is soundless: no bed start here.
  }

  return (
    <button type="button" onClick={onToggle} className="ro-chip" aria-pressed={enabled}>
      {enabled ? "Sound: On" : "Sound: Off"}
    </button>
  );
}

```
  
# 3) Keynote: engage bed on *first real interaction* (not on open)  
Right now you route bed on scene change via audio.routeBed(...). Keep that (it pre-stages EQ/pan).  
But **do NOT start bed on open**. Instead, engage on:  
But **do NOT start bed on open**. Instead, engage on:  
* Next / Back  
* CTA click  
* Any key that moves the keynote (← → Enter)  
* Any pointer down inside the sheet (tap/click)  
## In WalkthroughPresenter.tsx  
**A) Keep your routing effect (pre-staging)**  
```
useEffect(() => {
  if (!open) return;
  audio.routeBed({ sceneId: scenes[i].id, lens });
}, [open, i, lens, scenes, audio]);

```
**B) Add a tiny helper**  
```
function engageAudioForKeynote() {
  audio.engageBed({ sceneId: scenes[i].id, lens });
}

```
**C) Call it inside your actions**  
* In next() / prev() / runCTA() add at the top:  
```
engageAudioForKeynote();

```
* In your key handlers (ArrowRight/ArrowLeft/Enter), before calling next/prev/runCTA, call:  
```
engageAudioForKeynote();

```
**D) Engage on first tap/click inside the sheet** On the keynote sheet container element:  
```
<div className="ro-presenter__sheet" onPointerDown={engageAudioForKeynote}>
  ...
</div>

```
Now it’s **fully dignity-safe**:  
* Sound toggle grants permission (still silent)  
* First interaction inside keynote starts the bed  
* Bed is already “tonally routed” to the current scene/lens so it lands perfectly  
  
# 4) Optional microcopy (tiny, not annoying)  
If you want a subtle hint when sound is armed but not engaged, you can show a small line in the presenter footer:  
```
const { armed } = useAudio();
...
{armed ? <div className="ro-presenter__paused">Sound ready</div> : null}

```
(No CTA, no pressure.)  
  
If you want the *chef’s kiss*: I can make the bed start **only after the first “Receipt sealed.”** (even more conservative) while still allowing the seal chime.  
