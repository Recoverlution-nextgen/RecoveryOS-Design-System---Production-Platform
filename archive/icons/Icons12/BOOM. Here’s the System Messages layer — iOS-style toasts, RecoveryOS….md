BOOM. Here’s the **System Messages** layer — iOS-style toasts, RecoveryOS tone. Quiet. Governed. One sentence. Cyan dot when “live.” No hype.  
You’ll add:  
* SystemToast component  
* toastBus (tiny event emitter)  
* 6 message templates  
* 3 emit points (WalkthroughPresenter + any “rail change” + any “seal” moment)  
  
## 1) Add the toast bus  
```
src/ui/system/toastBus.ts
export type ToastTone = "muted" | "ink" | "cyan";

export type ToastEvent = {
  id?: string;
  tone?: ToastTone;
  icon?: any; // IconName (keep flexible mid-refactor)
  title: string;
  body?: string;
  ttlMs?: number; // default 2400
};

type Listener = (e: ToastEvent) => void;
const listeners = new Set<Listener>();

export const toastBus = {
  emit(e: ToastEvent) {
    listeners.forEach((fn) => fn(e));
  },
  on(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

```
  
## 2) Add the toast UI  
```
src/ui/system/SystemToast.css
.ro-toastHost {
  position: fixed;
  left: 18px;
  right: 18px;
  bottom: 18px;
  z-index: 90;
  display: grid;
  gap: 10px;
  pointer-events: none;
}

@media (min-width: 900px) {
  .ro-toastHost {
    left: auto;
    width: 420px;
    right: 18px;
  }
}

.ro-toast {
  pointer-events: none;
  border-radius: 16px;
  border: 1px solid rgba(233,231,255,0.14);
  background: rgba(21,20,42,0.62);
  box-shadow: 0 18px 80px rgba(0,0,0,0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 12px 12px;
  transform: translateY(8px);
  opacity: 0;
  transition:
    transform 240ms var(--ease-regulate, cubic-bezier(.2,.8,.2,1)),
    opacity 240ms var(--ease-regulate, cubic-bezier(.2,.8,.2,1));
}

.ro-toast[data-open="true"] {
  transform: translateY(0);
  opacity: 1;
}

.ro-toastRow {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: start;
}

.ro-toastDot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  margin-top: 6px;
  background: var(--ink-secondary);
  opacity: 0.85;
}

.ro-toast[data-tone="cyan"] .ro-toastDot { background: var(--c-cyan-500); opacity: 0.95; }
.ro-toast[data-tone="ink"] .ro-toastDot  { background: var(--ink-primary); opacity: 0.85; }
.ro-toast[data-tone="muted"] .ro-toastDot{ background: var(--ink-secondary); opacity: 0.7; }

.ro-toastTitle {
  margin: 0;
  font-size: 13px;
  line-height: 1.25;
  font-weight: 600;
  font-family: "Plus Jakarta Sans", Inter, system-ui;
  opacity: 0.92;
}

.ro-toastBody {
  margin: 4px 0 0 0;
  font-size: 12px;
  line-height: 1.35;
  opacity: 0.72;
}

@media (prefers-reduced-motion: reduce) {
  .ro-toast { transition: none; }
}

```
  
## 3) SystemToast component (host + queue)  
```
src/ui/system/SystemToast.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toastBus, type ToastEvent } from "./toastBus";
import "./SystemToast.css";

type LiveToast = Required<Pick<ToastEvent, "title">> &
  ToastEvent & { key: string; open: boolean; createdAt: number };

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function SystemToastHost() {
  const [toasts, setToasts] = useState<LiveToast[]>([]);
  const timers = useRef<Record<string, number>>({});

  useEffect(() => {
    return toastBus.on((e) => {
      const key = e.id ?? uid();
      const ttlMs = e.ttlMs ?? 2400;

      const toast: LiveToast = {
        key,
        open: true,
        createdAt: Date.now(),
        tone: e.tone ?? "muted",
        icon: e.icon,
        title: e.title,
        body: e.body,
        ttlMs,
      };

      setToasts((prev) => {
        // keep max 3, newest first
        const next = [toast, ...prev].slice(0, 3);
        return next;
      });

      // schedule close + remove
      window.clearTimeout(timers.current[key]);
      timers.current[key] = window.setTimeout(() => {
        setToasts((prev) => prev.map((t) => (t.key === key ? { ...t, open: false } : t)));
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.key !== key));
        }, 260);
      }, ttlMs);
    });
  }, []);

  return (
    <div className="ro-toastHost" aria-live="polite" aria-relevant="additions">
      {toasts.map((t) => (
        <div key={t.key} className="ro-toast" data-open={t.open ? "true" : "false"} data-tone={t.tone}>
          <div className="ro-toastRow">
            <div className="ro-toastDot" />
            <div>
              <p className="ro-toastTitle">{t.title}</p>
              {t.body ? <p className="ro-toastBody">{t.body}</p> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

```
  
## 4) Mount it once (site-wide)  
In your app layout/root (Next app/layout.tsx or pages/_app.tsx):  
## App Router (app/layout.tsx) inside <body>  
```
import { SystemToastHost } from "@/ui/system/SystemToast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SystemToastHost />
      </body>
    </html>
  );
}

```
## Pages Router (pages/_app.tsx)  
```
import type { AppProps } from "next/app";
import { SystemToastHost } from "@/ui/system/SystemToast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SystemToastHost />
    </>
  );
}

```
  
## 5) Add “RecoveryOS tone” message templates  
```
src/ui/system/systemMessages.ts
import { toastBus } from "./toastBus";

export const SystemMessages = {
  consentUpdated(mode: string) {
    toastBus.emit({
      tone: "ink",
      title: "Consent updated.",
      body: `Visibility set to ${mode}.`,
      ttlMs: 2400,
    });
  },

  quietHoursActive() {
    toastBus.emit({
      tone: "muted",
      title: "Quiet Hours active.",
      body: "Routing will stay silent unless escalation is required.",
      ttlMs: 2600,
    });
  },

  escalationAvailable() {
    toastBus.emit({
      tone: "ink",
      title: "Escalation available.",
      body: "Protocol is ready if the window narrows further.",
      ttlMs: 2600,
    });
  },

  routeCommitted() {
    toastBus.emit({
      tone: "muted",
      title: "Route committed.",
      body: "One move. One contract. No noise.",
      ttlMs: 2200,
    });
  },

  receiptSealed() {
    toastBus.emit({
      tone: "cyan",
      title: "Receipt sealed.",
      body: "Proof captured. The trace can travel.",
      ttlMs: 2400,
    });
  },

  governedAlways() {
    toastBus.emit({
      tone: "muted",
      title: "Governed by design.",
      body: "Every route is logged. Every boundary holds.",
      ttlMs: 2400,
    });
  },
};

```
  
## 6) Emit toasts from WalkthroughPresenter + actions  
In WalkthroughPresenter.tsx:  
## A) Import  
```
import { SystemMessages } from "@/ui/system/systemMessages";

```
## B) On CTA click (“Run” / “See how it works”)  
```
const onCta = () => {
  SystemMessages.routeCommitted();
  // existing CTA logic...
};

```
## C) On “seal” moment (wherever you trigger seal pulse)  
```
SystemMessages.receiptSealed();

```
## D) On lens toggle (optional but clean)  
```
SystemMessages.governedAlways();

```
## E) If you have a consent settings UI anywhere  
```
SystemMessages.consentUpdated("Me · Care · System"); // or whatever mode string

```
  
## 7) Extra polish: tie to ConsoleOverlay events (optional, insane)  
If you’re already emitting consoleBus.emit({ type:"route", ... }), add:  
* When stage becomes Sealed → toast receiptSealed()  
* When window becomes narrow → toast escalationAvailable()  
Example (where you emit signals):  
```
if (model?.window?.value === "narrow") SystemMessages.escalationAvailable();

```
  
## Result  
Now the keynote + demo feels like an OS:  
* hidden console overlay (.)  
* real-time system state  
* quiet system toasts that reinforce: **governed, routed, sealed, trace travels**  
If you want the *final landing flag*: I’ll add a single “permission-style” modal for Consent Map (not a form — an OS dialog) that appears once, never nags, and makes trust feel engineered.  
