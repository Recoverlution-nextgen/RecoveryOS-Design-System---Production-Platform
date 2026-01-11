Rolling the last 5%: **message affinity** — keynote autoplay will **wait until system messages are done** (no cutting off “Receipt sealed.” mid-glide).  
To do that cleanly, we expose a tiny bit of state from useSystemMessages: busy + pending.  
  
## 1) Update the message hook to expose queue status  
## Update src/ui/KeynoteLiveDock/useSystemMessages.ts  
Replace the return with busy + pending:  
```
import { useCallback, useEffect, useRef, useState } from "react";

export type SystemMsg = {
  id: string;
  text: string;
  variant?: "base" | "impact";
};

export function useSystemMessages(opts?: { showMs?: number; gapMs?: number }) {
  const showMs = opts?.showMs ?? 1200;
  const gapMs = opts?.gapMs ?? 220;

  const [current, setCurrent] = useState<SystemMsg | null>(null);
  const queue = useRef<SystemMsg[]>([]);
  const timer = useRef<number | null>(null);
  const gapTimer = useRef<number | null>(null);

  const [, bump] = useState(0); // tiny rerender tick to reflect pending count

  const pending = queue.current.length;
  const busy = !!current || pending > 0;

  const pump = useCallback(() => {
    if (current) return;
    const next = queue.current.shift() ?? null;
    bump((x) => x + 1); // reflect pending changes

    if (!next) return;

    setCurrent(next);

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setCurrent(null);

      if (gapTimer.current) window.clearTimeout(gapTimer.current);
      gapTimer.current = window.setTimeout(() => {
        pump();
      }, gapMs);
    }, showMs);
  }, [current, gapMs, showMs]);

  const push = useCallback(
    (msg: Omit<SystemMsg, "id">) => {
      queue.current.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, ...msg });
      bump((x) => x + 1);
      pump();
    },
    [pump]
  );

  const clear = useCallback(() => {
    queue.current = [];
    bump((x) => x + 1);
    setCurrent(null);
    if (timer.current) window.clearTimeout(timer.current);
    if (gapTimer.current) window.clearTimeout(gapTimer.current);
    timer.current = null;
    gapTimer.current = null;
  }, []);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return { current, push, clear, busy, pending };
}

```
  
## 2) Make autoplay wait for messages (affinity)  
## Update src/ui/WalkthroughMode/WalkthroughPresenter.tsx  
**A) Grab busy from the hook**  
Where you set up the hook, change:  
```
const { current: sysMsg, push: pushSys, clear: clearSys } =
  useSystemMessages({ showMs: 1200, gapMs: 220 });

```
to:  
```
const { current: sysMsg, push: pushSys, clear: clearSys, busy: sysBusy } =
  useSystemMessages({ showMs: 1200, gapMs: 220 });

```
**B) Gate autoplay advance on sysBusy**  
In your autoplay effect, modify the “advance when p>=1” block.  
Find this part (from your autoplay loop):  
```
if (p >= 1) {
  tickStart.current = performance.now();
  animateSwap((i + 1) % scenes.length);
  return;
}

```
Replace with this:  
```
if (p >= 1) {
  // Message affinity: do not advance while system messages are active/queued
  if (sysBusy) {
    // Hold at 100% until messages clear, then advance.
    setProgress(1);
  } else {
    tickStart.current = performance.now();
    animateSwap((i + 1) % scenes.length);
    return;
  }
}

```
**C) Ensure the effect watches sysBusy**  
Add sysBusy to the deps of the autoplay useEffect:  
Add sysBusy to the deps of the autoplay useEffect:  
```
}, [open, autoplay, intervalMs, paused, i, reducedMotion, sysBusy]);

```
That’s it.  
  
## 3) Optional polish: “soft hold” instead of hard 100%  
If you don’t want the progress bar to sit hard at 100%, you can “breathe” it slightly while waiting:  
Replace the setProgress(1) with:  
```
setProgress(0.985);

```
Feels more alive, less “stuck.”  
  
## Behavior you now get  
* Autoplay hits the end of a scene  
* If a system message is mid-flight or queued…  
    * **it holds**  
    * **finishes the message**  
    * then advances  
* So “Receipt sealed.” always lands cleanly.  
If you want the *ultimate keynote feel*, next roll is: **scene cadence adapts** (impact messages extend the scene by +800ms automatically, without looking like a pause).  
