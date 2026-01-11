Absolutely — rolling **scene-dependent interval profiles** (keynote rhythm, not a metronome).  
You’ll get:  
* a per-scene base cadence (ms)  
* optional per-scene “breath” (ms) that adds *without feeling like a pause*  
* impact extensions still stack on top (your +800ms for “Receipt sealed.”)  
  
## 1) Add cadence profile to scenes  
In WalkthroughPresenter.tsx, update your Scene type:  
```
type Scene = {
  id: string;
  eyebrow: string;
  headline: string;
  line: string;
  cta: { label: string; goRoom?: Room };
  demo?: DemoSeal;

  // NEW: keynote rhythm controls
  cadence?: {
    baseMs: number;        // default autoplay interval for this scene
    breathMs?: number;     // subtle extra time for this scene (adds to base)
  };
};

```
Now update your scenes array to include cadence. Example profiles (feels intentional):  
```
const scenes = useMemo<Scene[]>(() => {
  const isInd = lens === "individual";
  return [
    {
      id: "hero-scene-01",
      eyebrow: "RecoveryOS",
      headline: "Recovery that runs in real life.",
      line: isInd
        ? "A system you can return to — quietly — whenever you need it."
        : "Delivery, not content. The OS routes what works into the flow of life.",
      cta: { label: "Seal a receipt", goRoom: "moment" },
      demo: { pillar: "II", title: "Receipt sealed", line: "A tiny proof the brain trusts — stored quietly, ready to travel." },
      cadence: { baseMs: 4800, breathMs: 200 } // opening is tighter
    },
    {
      id: "hero-scene-02",
      eyebrow: "Continuity",
      headline: "A feed with a spine.",
      line: isInd ? "No noise. No pressure. Just what helps." : "Rationale + cadence + what held + what’s next — clean signal.",
      cta: { label: "Run the system", goRoom: "orchestration" },
      demo: { pillar: "CR", title: "Routed → Delivered", line: "One move, right-sized — delivered into the flow." },
      cadence: { baseMs: 5400, breathMs: 260 } // let the idea land
    },
    {
      id: "hero-scene-03",
      eyebrow: "Trust",
      headline: "Safety as design.",
      line: isInd ? "Quiet by default. Consent-bound. Dignity first." : "Appropriate dose, auditable rails, human boundary when it matters.",
      cta: { label: "Prove the boundary", goRoom: "trust" },
      demo: { pillar: "ER", title: "Rail engaged", line: "The system tightens delivery — not your freedom." },
      cadence: { baseMs: 6200, breathMs: 360 } // trust needs oxygen
    },
    {
      id: "hero-scene-04",
      eyebrow: "One OS",
      headline: "Three worlds. One truth.",
      line: isInd ? "One system that holds across real life." : "Same spine. Same receipt. Different altitude.",
      cta: { label: "Make it travel", goRoom: "threeWorlds" },
      demo: { pillar: "SC", title: "Trace travels", line: "Same receipt → identity reinforcement → clinical signal → defensible continuity." },
      cadence: { baseMs: 5600, breathMs: 280 } // close is spacious but not slow
    }
  ];
}, [lens]);

```
  
## 2) Use per-scene cadence in the autoplay loop  
Right now your autoplay uses a single intervalMs prop. Keep it as a fallback, but prefer the scene profile.  
Add a helper inside the component:  
```
function getSceneIntervalMs(scene: Scene) {
  const base = scene.cadence?.baseMs ?? intervalMs;
  const breath = scene.cadence?.breathMs ?? 0;
  return base + breath;
}

```
Now in your autoplay loop, replace usage of intervalMs with the active scene cadence.  
Find:  
```
const effectiveInterval = intervalMs + extraMsRef.current;
const p = Math.min(1, elapsed / effectiveInterval);

```
Replace with:  
```
const sceneInterval = getSceneIntervalMs(scenes[i]);
const effectiveInterval = sceneInterval + extraMsRef.current;
const p = Math.min(1, elapsed / effectiveInterval);

```
And likewise for the advance condition:  
```
if (elapsed >= effectiveInterval) {
  if (sysBusy) {
    setProgress(0.985);
  } else {
    tickStart.current = performance.now();
    extraMsRef.current = 0;
    animateSwap((i + 1) % scenes.length);
    return;
  }
}

```
  
## 3) Reset cadence modifiers cleanly on manual navigation  
You already reset extraMsRef.current = 0 on scene swap — keep that.  
Also reset the progress start time on manual nav, which you already do. That ensures the cadence feels right even when the user drives.  
  
## 4) Optional: “hero rhythm” that matches content weight (rule-of-thumb)  
If you want it systematic (so future scenes don’t drift), use this heuristic:  
* **Statement scenes** (what it is): 4.6–5.1s  
* **System scenes** (how it works): 5.2–5.8s  
* **Trust scenes** (safety): 5.9–6.6s  
* **Closing synthesis**: 5.2–5.8s  
* Impact event (“Receipt sealed.”): +800ms (already rolled)  
This keeps the keynote’s pacing *designed*.  
  
## 5) Tiny polish: display cadence subtly (dev-only)  
If you want a debug toggle, you can show current effective interval in small text — hidden in prod.  
  
Now the keynote is:  
* cinematic  
* interactive  
* alive  
* paced like a real announcement  
If you want the next nuclear move: I’ll roll **scene audio-bed hooks** (silent by default, user-initiated) with “soft chime” only on sealed impact — still dignity-safe, still non-triggering.  
