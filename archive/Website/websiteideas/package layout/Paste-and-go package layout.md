```
Paste-and-go package layout

/src
  /styles
    recoveryos.tokens.css           (the one we already made)
  /ui
    index.ts
    /ReturnButton
      ReturnButton.tsx
      ReturnButton.css
    /TraceTile
      TraceTile.tsx
      TraceTile.css
    /ThreadView
      ThreadView.tsx
      ThreadView.css
    /LensControl
      LensControl.tsx
      LensControl.css
    /DepthDial
      DepthDial.tsx
      DepthDial.css
    /HandrailPanel
      HandrailPanel.tsx
      HandrailPanel.css
    /PortalDock
      PortalDock.tsx
      PortalDock.css
  App.tsx

```
  
## 0) Global import (required)  
```
/* src/styles/global.css */
@import "./recoveryos.tokens.css";

/* Optional global polish */
* { box-sizing: border-box; }
a { color: inherit; }
button { font-family: inherit; }

```
  
## 1) ReturnButton (OS object)  
```
/* src/ui/ReturnButton/ReturnButton.css */
.ro-return {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  background: var(--return-surface);
  color: var(--return-ink);
  border: 1px solid rgba(233,231,255,0.22);
  border-radius: 999px;
  padding: 14px 18px;

  box-shadow: var(--e1);
  cursor: pointer;
  user-select: none;

  transition:
    transform calc(var(--dur-confirm) * var(--motion-multiplier, 1)) var(--ease-decide),
    background calc(var(--dur-confirm) * var(--motion-multiplier, 1)) var(--ease-decide),
    box-shadow calc(var(--dur-glide) * var(--motion-multiplier, 1)) var(--ease-regulate);
}

.ro-return:hover {
  background: var(--return-surface-hover);
  transform: translateY(-1px);
  box-shadow: var(--e2);
}

.ro-return:active {
  transform: translateY(0px);
  background: var(--c-purple-950);
}

.ro-return:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 5px var(--focus-ring-subtle),
    var(--e2);
}

.ro-return__glyph {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(251,250,255,0.12);
}

.ro-return__label {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.ro-return__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 600;
  font-size: 14px;
}

.ro-return__sub {
  font-size: 12px;
  opacity: 0.78;
}

.ro-return__glow {
  pointer-events: none;
  position: absolute;
  inset: -18px;
  border-radius: 999px;
  background: radial-gradient(60% 140% at 50% 50%, var(--return-glow), rgba(0,0,0,0));
  opacity: 0.9;
  filter: blur(14px);
}

[data-reduce-motion="true"] .ro-return,
@media (prefers-reduced-motion: reduce) {
  .ro-return { transition: none; }
}
/* src/ui/ReturnButton/ReturnButton.tsx */
import React from "react";
import "./ReturnButton.css";

export type Intent = "anchor" | "clarity" | "connection" | "direction";

export function ReturnButton(props: {
  title?: string;
  subtitle?: string;
  defaultIntent?: Intent;
  onReturn?: (intent: Intent) => void;
}) {
  const {
    title = "Return",
    subtitle = "Small enough to happen.",
    defaultIntent = "anchor",
    onReturn,
  } = props;

  return (
    <button
      type="button"
      className="ro-return"
      onClick={() => onReturn?.(defaultIntent)}
      aria-label={`${title}. ${subtitle}`}
    >
      <span className="ro-return__glow" aria-hidden="true" />
      <span className="ro-return__glyph" aria-hidden="true">
        {/* simple OS glyph */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 10H5V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M5 10c2-4 6-6 10-6 5 0 9 4 9 9s-4 9-9 9c-4 0-7-2-9-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        </svg>
      </span>

      <span className="ro-return__label">
        <span className="ro-return__title">{title}</span>
        <span className="ro-return__sub">{subtitle}</span>
      </span>
    </button>
  );
}

```
  
## 2) TraceTile (artifact object)  
```
/* src/ui/TraceTile/TraceTile.css */
.ro-trace {
  background: var(--trace-surface);
  color: var(--trace-ink);
  border: 1px solid var(--trace-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);

  display: grid;
  gap: 10px;

  position: relative;
  overflow: hidden;
}

.ro-trace__rail {
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 3px;
  background: var(--cmp-pillar-rail, var(--surface-border));
  border-radius: 999px;
  opacity: 0.9;
}

.ro-trace__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.ro-trace__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 650;
  font-size: 14px;
}

.ro-trace__meta {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-trace__body {
  font-size: 14px;
  line-height: var(--lh-body);
  color: var(--ink-secondary);
}

.ro-trace__seal {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-trace__sealDot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--trace-seal);
  box-shadow: 0 0 0 6px rgba(64,224,208,0.12);
}

.ro-trace.is-draft .ro-trace__sealDot {
  opacity: 0.25;
  box-shadow: none;
}

.ro-trace:focus-within {
  outline: none;
  box-shadow: 0 0 0 5px var(--focus-ring-subtle), var(--e2);
}

.ro-trace__btn {
  border: 1px solid var(--surface-border);
  background: transparent;
  color: var(--ink-primary);
  border-radius: 999px;
  padding: 8px 12px;
  cursor: pointer;
}

.ro-trace__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}
/* src/ui/TraceTile/TraceTile.tsx */
import React from "react";
import "./TraceTile.css";
import type { Pillar } from "../tokens";

const PILLAR_VARS: Record<Pillar, string> = {
  ER: "var(--pillar-er-base)",
  SR: "var(--pillar-sr-base)",
  SC: "var(--pillar-sc-base)",
  CR: "var(--pillar-cr-base)",
  II: "var(--pillar-ii-base)",
  DM: "var(--pillar-dm-base)",
};

export function TraceTile(props: {
  title: string;
  body?: string;
  sealed?: boolean;
  pillar?: Pillar;
  timestamp?: string;
  onOpen?: () => void;
}) {
  const { title, body, sealed = true, pillar, timestamp, onOpen } = props;

  const style: React.CSSProperties =
    pillar
      ? ({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--cmp-pillar-rail" as any]: PILLAR_VARS[pillar],
        } as React.CSSProperties)
      : {};

  return (
    <article
      className={`ro-trace ${sealed ? "is-sealed" : "is-draft"}`}
      style={style}
      tabIndex={0}
      aria-label={`Trace: ${title}`}
    >
      <span className="ro-trace__rail" aria-hidden="true" />

      <div className="ro-trace__top">
        <div>
          <div className="ro-trace__title">{title}</div>
          {timestamp ? <div className="ro-trace__meta">{timestamp}</div> : null}
        </div>

        <button className="ro-trace__btn" onClick={onOpen} type="button">
          Open
        </button>
      </div>

      {body ? <div className="ro-trace__body">{body}</div> : null}

      <div className="ro-trace__seal">
        <span className="ro-trace__sealDot" aria-hidden="true" />
        <span>{sealed ? "Sealed" : "Draft"}</span>
      </div>
    </article>
  );
}

```
  
## 3) ThreadView (continuity line)  
```
/* src/ui/ThreadView/ThreadView.css */
.ro-thread {
  background: var(--surface-panel);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);
  overflow: hidden;
}

.ro-thread__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.ro-thread__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 650;
}

.ro-thread__sub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-thread__line {
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--thread-g0), var(--thread-g1), var(--thread-g2));
  opacity: 0.95;
}

.ro-thread__nodes {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.ro-thread__node {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--cmp-node, var(--thread-node));
  box-shadow: 0 0 0 6px rgba(124,103,255,0.12);
}

.ro-thread__node.is-active {
  background: var(--focus-ring);
  box-shadow: 0 0 0 6px rgba(64,224,208,0.16);
}
/* src/ui/ThreadView/ThreadView.tsx */
import React from "react";
import "./ThreadView.css";
import type { Pillar } from "../tokens";

const NODE_COLOR: Record<Pillar, string> = {
  ER: "var(--pillar-er-base)",
  SR: "var(--pillar-sr-base)",
  SC: "var(--pillar-sc-base)",
  CR: "var(--pillar-cr-base)",
  II: "var(--pillar-ii-base)",
  DM: "var(--pillar-dm-base)",
};

export function ThreadView(props: {
  title?: string;
  subtitle?: string;
  nodes: Array<{ id: string; pillar?: Pillar; active?: boolean }>;
}) {
  const { title = "Thread", subtitle = "A line you can return to.", nodes } = props;

  return (
    <section className="ro-thread" aria-label="Thread view">
      <div className="ro-thread__header">
        <div>
          <div className="ro-thread__title">{title}</div>
          <div className="ro-thread__sub">{subtitle}</div>
        </div>
      </div>

      <div className="ro-thread__line" aria-hidden="true" />

      <div className="ro-thread__nodes" aria-label="Thread nodes">
        {nodes.map((n) => {
          const style: React.CSSProperties =
            n.pillar
              ? ({
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--cmp-node" as any]: NODE_COLOR[n.pillar],
                } as React.CSSProperties)
              : {};
          return (
            <span
              key={n.id}
              className={`ro-thread__node ${n.active ? "is-active" : ""}`}
              style={style}
              title={n.id}
            />
          );
        })}
      </div>
    </section>
  );
}

```
  
## 4) LensControl (Individual / Professional / Organisation)  
```
/* src/ui/LensControl/LensControl.css */
.ro-lens {
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  background: var(--surface-panel);
  border: 1px solid var(--surface-border);
  border-radius: 999px;
  box-shadow: var(--e1);
}

.ro-lens__btn {
  border: 1px solid transparent;
  background: transparent;
  color: var(--ink-secondary);
  padding: 10px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  transition: background calc(var(--dur-confirm) * var(--motion-multiplier, 1)) var(--ease-decide);
}

.ro-lens__btn[aria-pressed="true"] {
  background: rgba(233,231,255,0.70);
  color: var(--ink-primary);
}

[data-theme="dark"] .ro-lens__btn[aria-pressed="true"] {
  background: rgba(233,231,255,0.12);
}

.ro-lens__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}
/* src/ui/LensControl/LensControl.tsx */
import React from "react";
import "./LensControl.css";
import type { Lens } from "../tokens";

export function LensControl(props: {
  value: Lens;
  onChange: (lens: Lens) => void;
}) {
  const { value, onChange } = props;

  const items: Array<{ lens: Lens; label: string }> = [
    { lens: "individual", label: "Individual" },
    { lens: "professional", label: "Professional" },
    { lens: "organisation", label: "Organisation" },
  ];

  return (
    <div className="ro-lens" role="group" aria-label="Lens selector">
      {items.map((i) => (
        <button
          key={i.lens}
          type="button"
          className="ro-lens__btn"
          aria-pressed={value === i.lens}
          onClick={() => onChange(i.lens)}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}

```
  
## 5) DepthDial (Glance / Seed / Thread / Journey)  
```
/* src/ui/DepthDial/DepthDial.css */
.ro-depth {
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  background: var(--surface-panel);
  border: 1px solid var(--surface-border);
  border-radius: 999px;
}

.ro-depth__btn {
  border: 1px solid transparent;
  background: transparent;
  color: var(--ink-secondary);
  padding: 8px 10px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
}

.ro-depth__btn[aria-pressed="true"] {
  background: rgba(233,231,255,0.70);
  color: var(--ink-primary);
}

[data-theme="dark"] .ro-depth__btn[aria-pressed="true"] {
  background: rgba(233,231,255,0.12);
}

.ro-depth__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}
/* src/ui/DepthDial/DepthDial.tsx */
import React from "react";
import "./DepthDial.css";

export type Depth = "glance" | "seed" | "thread" | "journey";

export function DepthDial(props: {
  value: Depth;
  onChange: (d: Depth) => void;
  available?: Depth[];
}) {
  const { value, onChange, available = ["glance", "seed", "thread", "journey"] } = props;

  const labels: Record<Depth, string> = {
    glance: "Glance",
    seed: "Seed",
    thread: "Thread",
    journey: "Journey",
  };

  return (
    <div className="ro-depth" role="group" aria-label="Depth dial">
      {available.map((d) => (
        <button
          key={d}
          type="button"
          className="ro-depth__btn"
          aria-pressed={value === d}
          onClick={() => onChange(d)}
        >
          {labels[d]}
        </button>
      ))}
    </div>
  );
}

```
  
## 6) HandrailPanel (trust surface starter)  
```
/* src/ui/HandrailPanel/HandrailPanel.css */
.ro-handrail {
  background: var(--handrail-surface);
  border: 1px solid var(--handrail-border);
  border-radius: var(--r-xl);
  box-shadow: var(--e1);
  overflow: hidden;
}

.ro-handrail__edge {
  height: 3px;
  background: var(--handrail-edge);
  opacity: 0.9;
}

.ro-handrail__content {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.ro-handrail__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 650;
}

.ro-handrail__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  background: rgba(233,231,255,0.35);
  border: 1px solid rgba(233,231,255,0.55);
  border-radius: var(--r-lg);
  padding: 10px 12px;
}

[data-theme="dark"] .ro-handrail__row {
  background: rgba(233,231,255,0.08);
  border: 1px solid rgba(233,231,255,0.14);
}

.ro-handrail__label {
  font-size: 13px;
  color: var(--ink-primary);
}

.ro-handrail__hint {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-toggle {
  width: 42px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid var(--surface-border);
  background: rgba(42,41,66,0.12);
  position: relative;
  cursor: pointer;
}

.ro-toggle[aria-checked="true"] {
  background: rgba(64,224,208,0.22);
  border-color: rgba(64,224,208,0.45);
}

.ro-toggle::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--surface-bg);
  box-shadow: var(--e1);
  transition: transform calc(var(--dur-confirm) * var(--motion-multiplier, 1)) var(--ease-decide);
}

.ro-toggle[aria-checked="true"]::after {
  transform: translateX(16px);
}

.ro-toggle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}
/* src/ui/HandrailPanel/HandrailPanel.tsx */
import React from "react";
import "./HandrailPanel.css";

function Toggle(props: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  const { checked, onChange, label } = props;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="ro-toggle"
      onClick={() => onChange(!checked)}
    />
  );
}

export function HandrailPanel(props: {
  title?: string;
  consentVisible?: boolean;
  onConsentVisibleChange?: (v: boolean) => void;
  quietHours?: boolean;
  onQuietHoursChange?: (v: boolean) => void;
  escalation?: boolean;
  onEscalationChange?: (v: boolean) => void;
}) {
  const {
    title = "Handrail",
    consentVisible = true,
    onConsentVisibleChange,
    quietHours = true,
    onQuietHoursChange,
    escalation = false,
    onEscalationChange,
  } = props;

  return (
    <section className="ro-handrail" aria-label="Handrail panel">
      <div className="ro-handrail__edge" aria-hidden="true" />
      <div className="ro-handrail__content">
        <div className="ro-handrail__title">{title}</div>

        <div className="ro-handrail__row">
          <div>
            <div className="ro-handrail__label">Consent rails</div>
            <div className="ro-handrail__hint">Show what the system can do.</div>
          </div>
          <Toggle checked={consentVisible} onChange={(v) => onConsentVisibleChange?.(v)} label="Consent rails" />
        </div>

        <div className="ro-handrail__row">
          <div>
            <div className="ro-handrail__label">Quiet hours</div>
            <div className="ro-handrail__hint">Respect your rhythm by default.</div>
          </div>
          <Toggle checked={quietHours} onChange={(v) => onQuietHoursChange?.(v)} label="Quiet hours" />
        </div>

        <div className="ro-handrail__row">
          <div>
            <div className="ro-handrail__label">Escalation</div>
            <div className="ro-handrail__hint">Offer a human handoff (by consent).</div>
          </div>
          <Toggle checked={escalation} onChange={(v) => onEscalationChange?.(v)} label="Escalation" />
        </div>
      </div>
    </section>
  );
}

```
  
## 7) PortalDock (reopen immersive portal anywhere)  
```
/* src/ui/PortalDock/PortalDock.css */
.ro-dock {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 50;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  background: var(--surface-panel);
  border: 1px solid var(--surface-border);
  border-radius: 999px;
  padding: 10px 12px;
  box-shadow: var(--e2);
}

.ro-dock__btn {
  border: 1px solid transparent;
  background: var(--return-surface);
  color: var(--return-ink);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
}

.ro-dock__btn:hover { background: var(--return-surface-hover); }
.ro-dock__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 5px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

.ro-dock__hint {
  font-size: 12px;
  color: var(--ink-secondary);
  padding-right: 6px;
}
/* src/ui/PortalDock/PortalDock.tsx */
import React from "react";
import "./PortalDock.css";

export function PortalDock(props: { onOpen: () => void; hint?: string }) {
  const { onOpen, hint = "Open Portal" } = props;

  return (
    <div className="ro-dock" role="region" aria-label="Portal dock">
      <div className="ro-dock__hint">{hint}</div>
      <button className="ro-dock__btn" type="button" onClick={onOpen}>
        Return
      </button>
    </div>
  );
}

```
  
## 8) Exports  
```
/* src/ui/index.ts */
export { ReturnButton } from "./ReturnButton/ReturnButton";
export { TraceTile } from "./TraceTile/TraceTile";
export { ThreadView } from "./ThreadView/ThreadView";
export { LensControl } from "./LensControl/LensControl";
export { DepthDial } from "./DepthDial/DepthDial";
export { HandrailPanel } from "./HandrailPanel/HandrailPanel";
export { PortalDock } from "./PortalDock/PortalDock";

export type { Intent } from "./ReturnButton/ReturnButton";
export type { Depth } from "./DepthDial/DepthDial";

// src/ui/tokens.ts (if you don't already have it)
export type Lens = "individual" | "professional" | "organisation";
export type Pillar = "ER" | "SR" | "SC" | "CR" | "II" | "DM";

```
  
## 9) App.tsx example (paste → run)  
```
/* src/App.tsx */
import React, { useState } from "react";
import "./styles/global.css";

import {
  ReturnButton,
  TraceTile,
  ThreadView,
  LensControl,
  DepthDial,
  HandrailPanel,
  PortalDock,
} from "./ui";
import type { Lens } from "./ui/tokens";
import type { Depth } from "./ui/DepthDial/DepthDial";

export default function App() {
  const [lens, setLens] = useState<Lens>("individual");
  const [depth, setDepth] = useState<Depth>("glance");

  const [consentVisible, setConsentVisible] = useState(true);
  const [quietHours, setQuietHours] = useState(true);
  const [escalation, setEscalation] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "var(--surface-bg)",
        color: "var(--ink-primary)",
      }}
      data-attention="calm"
      // toggle these to test:
      // data-theme="dark"
      // data-reduce-motion="true"
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <LensControl value={lens} onChange={setLens} />
        <DepthDial value={depth} onChange={setDepth} />
        <ReturnButton
          onReturn={(intent) => console.log("Return:", intent)}
          subtitle={`Lens: ${lens} • Depth: ${depth}`}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 18, marginTop: 18 }}>
        <div style={{ display: "grid", gap: 14 }}>
          <ThreadView
            nodes={[
              { id: "t1", pillar: "ER" },
              { id: "t2", pillar: "SC" },
              { id: "t3", pillar: "DM", active: true },
              { id: "t4", pillar: "II" },
              { id: "t5", pillar: "SR" },
            ]}
          />

          <TraceTile
            title="A small return held."
            body="One move. Tiny proof. Enough to keep direction."
            sealed={true}
            pillar="DM"
            timestamp="Today"
            onOpen={() => console.log("Open trace")}
          />
        </div>

        <HandrailPanel
          consentVisible={consentVisible}
          onConsentVisibleChange={setConsentVisible}
          quietHours={quietHours}
          onQuietHoursChange={setQuietHours}
          escalation={escalation}
          onEscalationChange={setEscalation}
        />
      </div>

      <PortalDock onOpen={() => console.log("Open Portal")} hint="Open Portal" />
    </div>
  );
}

```
  
## What you now have (and why it won’t drift)  
* Every component is **bound to semantic vars** (--return-*, --trace-*, --thread-*, --handrail-*)  
* Pillars “brush” via **three vars** (--p-base/--p-tint/--p-soft) so deep hierarchies scale cleanly  
* Dark mode + calm/focus + reduce-motion are **attribute driven** (OS-like)  
If you want the next “paste-and-go” tranche, I’ll ship the **Portal shell** (full-screen overlay + prompt corridor + artifact rail) as a runnable component set using the same tokens—so your “website within a website” is real UI, not a concept.  
