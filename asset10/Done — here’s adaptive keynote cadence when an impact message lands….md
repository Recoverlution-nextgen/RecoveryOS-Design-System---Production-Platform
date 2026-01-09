Done — here’s **adaptive keynote cadence**: when an **impact** message lands (e.g. “Receipt sealed.”), the presenter **automatically extends the current scene by +800ms**. No visible pause. No “stuck at 100%”. Just a longer breath.  
We’ll do it with a tiny extraMsRef that the autoplay loop reads **live**.  
  
## 1) WalkthroughPresenter: add an “extra cadence” ref  
In src/ui/WalkthroughMode/WalkthroughPresenter.tsx, near your other refs:  
```
const extraMsRef = useRef(0); // +ms added to current scene interval (impact breath)

```
When you reset scene state (where you already reset progress on scene change), also reset this:  
Inside animateSwap() after setI(toIndex) (or right before it), add:  
```
extraMsRef.current = 0;

```
Example (inside your animateSwap timeout):  
```
txTimer.current = window.setTimeout(() => {
  extraMsRef.current = 0;     // reset per scene
  setI(toIndex);
  setTx("in");
  tickStart.current = performance.now();
  setProgress(0);
}, 140);

```
  
## 2) Make impact trigger add +800ms to the current scene  
In your existing triggerImpact() (the one that sets impactKey), add:  
```
extraMsRef.current = Math.max(extraMsRef.current, 800);

```
So:  
```
function triggerImpact() {
  // Extend current scene cadence (quiet breath)
  extraMsRef.current = Math.max(extraMsRef.current, 800);

  if (impactTimer.current) window.clearTimeout(impactTimer.current);
  const k = Date.now();
  setImpactKey(k);
  impactTimer.current = window.setTimeout(() => setImpactKey(null), 680);
}

```
Now any time you call triggerImpact() (like on SEALED), the scene gets +800ms.  
  
## 3) Autoplay loop: use effective interval (base + extra)  
Find your autoplay loop where you compute elapsed and p.  
Replace this:  
```
const p = Math.min(1, elapsed / intervalMs);

```
With this:  
```
const effectiveInterval = intervalMs + extraMsRef.current;
const p = Math.min(1, elapsed / effectiveInterval);

```
And replace the “advance on p>=1” logic with an **effectiveInterval** check (more stable):  
```
if (!paused) {
  const effectiveInterval = intervalMs + extraMsRef.current;
  const p = Math.min(1, elapsed / effectiveInterval);
  setProgress(p);

  if (elapsed >= effectiveInterval) {
    // Message affinity: don't advance while messages are active/queued
    if (sysBusy) {
      // Soft-hold, don't slam to 100%
      setProgress(0.985);
    } else {
      tickStart.current = performance.now();
      extraMsRef.current = 0; // reset for next scene
      animateSwap((i + 1) % scenes.length);
      return;
    }
  }
}

```
Make sure your autoplay effect deps include sysBusy (you already did).  
  
## 4) Tie “impact cadence” to the right moment  
You already have:  
```
if (nextStage === "SEALED") triggerImpact();

```
That’s perfect. It means:  
* **Routed / Delivered**: normal cadence  
* **Sealed**: +800ms “breath” + dock pulse + impact message  
* **Reviewed**: normal cadence (unless you choose otherwise)  
If you want **Reviewed** to also get a smaller breath, you can do:  
```
if (nextStage === "SEALED") triggerImpact();
if (nextStage === "REVIEWED") extraMsRef.current = Math.max(extraMsRef.current, 400);

```
  
## What you now have (feel)  
* Scene cadence is **alive**, not fixed.  
* “Receipt sealed.” lands like a keynote moment:  
    * the system speaks  
    * the dock pulses  
    * the scene holds *just long enough*  
    * then it glides forward  
No abrupt advance. No waiting UI. Just inevitability.  
If you want the **final-final Apple keynote move**: I can roll **scene-dependent interval profiles** (e.g., Scene 1 is 4.8s, Scene 2 is 5.4s, Scene 3 is 6.2s, plus impact extensions) so the keynote has a deliberate rhythm rather than a metronome.  
