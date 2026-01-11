  
```
Portal Shell = paste-and-go, fully wired to your tokens + existing components.

Adds:
- Full-screen overlay
- Ambient field
- Prompt corridor (guided, not open chat)
- Room switcher (Moment / Week / Spine / Orchestration / Trust / Integrations)
- LensControl + DepthDial in the chrome
- Artifact rail (TraceTiles)
- “Rails” toggle (shows HandrailPanel)
- Dock integration (open/close)

No backend needed. Everything runs locally with mock routing.

```
  
## 1) PortalShell styles  
```
/* src/ui/PortalShell/PortalShell.css */
.ro-portal {
  position: fixed;
  inset: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: 340px 1fr 380px;
  gap: 0;

  background: var(--surface-bg);
  color: var(--ink-primary);
}

.ro-portal__ambient {
  position: absolute;
  inset: 0;
  background: var(--field-ambient);
  pointer-events: none;
}

.ro-portal__glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(251,250,255,0.78), rgba(251,250,255,0.92));
  pointer-events: none;
}

[data-theme="dark"] .ro-portal__glass {
  background: linear-gradient(180deg, rgba(11,10,20,0.72), rgba(11,10,20,0.88));
}

.ro-portal__left,
.ro-portal__center,
.ro-portal__right {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  overflow: hidden;
}

.ro-portal__left {
  border-right: 1px solid var(--surface-border);
  background: rgba(251,250,255,0.72);
}
[data-theme="dark"] .ro-portal__left {
  background: rgba(21,20,42,0.78);
}

.ro-portal__right {
  border-left: 1px solid var(--surface-border);
  background: rgba(251,250,255,0.72);
}
[data-theme="dark"] .ro-portal__right {
  background: rgba(21,20,42,0.78);
}

.ro-portal__center {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.ro-portal__chrome {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.ro-portal__chromeLeft {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ro-portal__brand {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.ro-portal__brandName {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 700;
  font-size: 14px;
}

.ro-portal__brandSub {
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-portal__chromeRight {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ro-portal__btn {
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.30);
  color: var(--ink-primary);
  border-radius: 999px;
  padding: 10px 12px;
  cursor: pointer;
}

[data-theme="dark"] .ro-portal__btn {
  background: rgba(233,231,255,0.08);
}

.ro-portal__btn:hover {
  border-color: rgba(64,224,208,0.45);
}

.ro-portal__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

.ro-portal__main {
  padding: 18px 16px;
  overflow: auto;
}

.ro-portal__footer {
  padding: 14px 16px;
  border-top: 1px solid var(--surface-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: rgba(251,250,255,0.56);
}
[data-theme="dark"] .ro-portal__footer {
  background: rgba(21,20,42,0.56);
}

.ro-portal__roomList {
  padding: 14px;
  display: grid;
  gap: 8px;
}

.ro-room {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 12px 12px;
  border-radius: var(--r-lg);
  border: 1px solid var(--surface-border);
  background: rgba(233,231,255,0.30);
  cursor: pointer;
}

[data-theme="dark"] .ro-room {
  background: rgba(233,231,255,0.08);
}

.ro-room:hover {
  border-color: rgba(64,224,208,0.40);
}

.ro-room[aria-current="true"] {
  border-color: rgba(64,224,208,0.60);
  box-shadow: 0 0 0 4px rgba(64,224,208,0.10);
}

.ro-room__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ro-room__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--room-accent, var(--c-purple-500));
  box-shadow: 0 0 0 6px rgba(124,103,255,0.10);
}

.ro-room__title {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 650;
  font-size: 13px;
}

.ro-room__sub {
  font-size: 12px;
  color: var(--ink-secondary);
  margin-top: 2px;
}

.ro-portal__rightInner {
  padding: 14px;
  display: grid;
  gap: 12px;
  overflow: auto;
  height: 100%;
}

.ro-portal__railTitle {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 700;
  font-size: 13px;
}

.ro-portal__railSub {
  font-size: 12px;
  color: var(--ink-secondary);
  margin-top: 2px;
}

.ro-portal__railHeader {
  display: grid;
  gap: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--surface-border);
}

.ro-corridor {
  display: grid;
  gap: 12px;
}

.ro-corridor__card {
  background: rgba(233,231,255,0.30);
  border: 1px solid var(--surface-border);
  border-radius: var(--r-xl);
  padding: 16px;
  box-shadow: var(--e1);
}

[data-theme="dark"] .ro-corridor__card {
  background: rgba(233,231,255,0.08);
}

.ro-corridor__prompt {
  font-family: var(--font-heading);
  letter-spacing: var(--tracking-heading-tight);
  font-weight: 700;
  margin-bottom: 10px;
}

.ro-choiceGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.ro-choice {
  border: 1px solid var(--surface-border);
  background: rgba(251,250,255,0.72);
  border-radius: var(--r-lg);
  padding: 12px;
  cursor: pointer;
  text-align: left;
}

[data-theme="dark"] .ro-choice {
  background: rgba(21,20,42,0.60);
}

.ro-choice:hover {
  border-color: rgba(64,224,208,0.45);
}

.ro-choice:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--focus-ring-subtle);
  border-color: var(--focus-ring);
}

.ro-choice__title {
  font-weight: 650;
  font-size: 13px;
  color: var(--ink-primary);
}

.ro-choice__sub {
  margin-top: 4px;
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-contract {
  margin-top: 12px;
  border: 1px dashed rgba(64,224,208,0.45);
  border-radius: var(--r-lg);
  padding: 12px;
  display: grid;
  gap: 8px;
}

.ro-contract__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  color: var(--ink-secondary);
}

.ro-contract__key { color: var(--ink-tertiary); }
.ro-contract__val { color: var(--ink-primary); font-weight: 600; }

.ro-divider {
  height: 1px;
  background: var(--surface-divider);
  margin: 12px 0;
}

/* Responsive: collapse rails */
@media (max-width: 1100px) {
  .ro-portal { grid-template-columns: 1fr; }
  .ro-portal__left, .ro-portal__right { display: none; }
  .ro-portal__center { grid-template-rows: auto 1fr auto; }
}

```
  
## 2) Portal types + mock routing helpers  
```
/* src/ui/PortalShell/portalTypes.ts */
export type Lens = "individual" | "professional" | "organisation";
export type Depth = "glance" | "seed" | "thread" | "journey";

export type Room =
  | "moment"          // NaviCue simulator
  | "week"            // Journey simulator
  | "spine"           // Atlas entry (stub for now)
  | "orchestration"   // LUMA view (stub)
  | "trust"           // Handrail
  | "integrations";   // Overlay (stub)

export type Intent = "anchor" | "clarity" | "connection" | "direction";

export type Trace = {
  id: string;
  title: string;
  body?: string;
  sealed: boolean;
  pillar?: "ER" | "SR" | "SC" | "CR" | "II" | "DM";
  timestamp?: string;
};

export type OneMoveContract = {
  intent: Intent;
  tempo: "moment" | "week";
  durationSec: number;
  primitive: "somatic" | "cognitive" | "relational" | "values" | "mechanics" | "proof";
  pillar?: Trace["pillar"];
  proofRequest: "micro" | "prepost" | "note" | "choice" | "scene" | "none";
};

export function ulidish(): string {
  // UI-only; replace with real ULID/UUIDv7 later
  return `t_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function routeMock(room: Room, intent: Intent): OneMoveContract {
  const base = {
    intent,
    tempo: room === "week" ? "week" : "moment",
    durationSec: room === "week" ? 300 : 30,
    primitive: (intent === "anchor"
      ? "somatic"
      : intent === "clarity"
      ? "cognitive"
      : intent === "connection"
      ? "relational"
      : "values") as OneMoveContract["primitive"],
    pillar: (intent === "anchor"
      ? "ER"
      : intent === "clarity"
      ? "CR"
      : intent === "connection"
      ? "SC"
      : "DM") as Trace["pillar"],
    proofRequest: (room === "week" ? "scene" : "micro") as OneMoveContract["proofRequest"],
  };
  return base;
}

export function traceFromContract(c: OneMoveContract): Trace {
  const title =
    c.intent === "anchor"
      ? "Return held."
      : c.intent === "clarity"
      ? "Clarity regained."
      : c.intent === "connection"
      ? "Connection restored."
      : "Direction chosen.";

  const body =
    c.tempo === "week"
      ? "A small install. A baseline laid down."
      : "One move. Tiny proof. Enough to keep motion.";

  return {
    id: ulidish(),
    title,
    body,
    sealed: true,
    pillar: c.pillar,
    timestamp: "Now",
  };
}

```
  
## 3) PortalShell component (overlay + corridor + rail)  
```
/* src/ui/PortalShell/PortalShell.tsx */
import React, { useMemo, useState } from "react";
import "./PortalShell.css";

import { LensControl } from "../LensControl/LensControl";
import { DepthDial, Depth } from "../DepthDial/DepthDial";
import { TraceTile } from "../TraceTile/TraceTile";
import { HandrailPanel } from "../HandrailPanel/HandrailPanel";
import { ReturnButton } from "../ReturnButton/ReturnButton";

import type { Lens, Room, Intent, Trace, OneMoveContract } from "./portalTypes";
import { routeMock, traceFromContract } from "./portalTypes";

const ROOMS: Array<{
  id: Room;
  title: string;
  sub: string;
  accentVar: string;
}> = [
  { id: "moment", title: "Run a Moment", sub: "One move. One receipt.", accentVar: "var(--c-cyan-500)" },
  { id: "week", title: "Install a Week", sub: "Baseline. Then proof.", accentVar: "var(--c-purple-500)" },
  { id: "spine", title: "Explore the Spine", sub: "Depth without drowning.", accentVar: "var(--c-purple-900)" },
  { id: "orchestration", title: "See Orchestration", sub: "A feed with a spine.", accentVar: "var(--c-cyan-500)" },
  { id: "trust", title: "Trust & Rails", sub: "Consent. Boundaries.", accentVar: "var(--c-neutral-700)" },
  { id: "integrations", title: "Integrations", sub: "Runs inside the day.", accentVar: "var(--c-green-500)" },
];

function ContractCard({ c }: { c: OneMoveContract }) {
  return (
    <div className="ro-contract" aria-label="One move contract">
      <div className="ro-contract__row">
        <span className="ro-contract__key">Intent</span>
        <span className="ro-contract__val">{c.intent}</span>
      </div>
      <div className="ro-contract__row">
        <span className="ro-contract__key">Tempo</span>
        <span className="ro-contract__val">{c.tempo}</span>
      </div>
      <div className="ro-contract__row">
        <span className="ro-contract__key">Dose</span>
        <span className="ro-contract__val">{c.durationSec}s</span>
      </div>
      <div className="ro-contract__row">
        <span className="ro-contract__key">Primitive</span>
        <span className="ro-contract__val">{c.primitive}</span>
      </div>
      <div className="ro-contract__row">
        <span className="ro-contract__key">Proof</span>
        <span className="ro-contract__val">{c.proofRequest}</span>
      </div>
    </div>
  );
}

export function PortalShell(props: {
  open: boolean;
  onClose: () => void;
  initialLens?: Lens;
  initialRoom?: Room;
}) {
  const { open, onClose, initialLens = "individual", initialRoom = "moment" } = props;

  const [lens, setLens] = useState<Lens>(initialLens);
  const [depth, setDepth] = useState<Depth>("glance");
  const [room, setRoom] = useState<Room>(initialRoom);

  const [railsVisible, setRailsVisible] = useState<boolean>(lens !== "individual");

  const [traces, setTraces] = useState<Trace[]>([
    { id: "seed", title: "A small return held.", body: "Enough to keep motion.", sealed: true, pillar: "DM", timestamp: "Earlier" },
  ]);

  const [contract, setContract] = useState<OneMoveContract | null>(null);

  // Trust toggles (handrail)
  const [consentVisible, setConsentVisible] = useState(true);
  const [quietHours, setQuietHours] = useState(true);
  const [escalation, setEscalation] = useState(false);

  const intentChoices: Array<{ id: Intent; title: string; sub: string }> = useMemo(
    () => [
      { id: "anchor", title: "Anchor", sub: "Settle the system. Return to ground." },
      { id: "clarity", title: "Clarity", sub: "Steady mind. Clean next step." },
      { id: "connection", title: "Connection", sub: "Repair the moment. Rejoin the thread." },
      { id: "direction", title: "Direction", sub: "Values forward. Choose the next move." },
    ],
    []
  );

  const roomMeta = useMemo(() => ROOMS.find((r) => r.id === room)!, [room]);

  if (!open) return null;

  const run = (intent: Intent) => {
    const c = routeMock(room, intent);
    setContract(c);
    // “Deliver → Seal”: immediately create trace for the shell
    const t = traceFromContract(c);
    setTraces((prev) => [t, ...prev].slice(0, 12));
  };

  return (
    <div className="ro-portal" role="dialog" aria-modal="true" aria-label="RecoveryOS Portal">
      <div className="ro-portal__ambient" aria-hidden="true" />
      <div className="ro-portal__glass" aria-hidden="true" />

      {/* LEFT: Rooms */}
      <aside className="ro-portal__left" aria-label="Rooms">
        <div className="ro-portal__roomList">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              type="button"
              className="ro-room"
              aria-current={room === r.id}
              onClick={() => setRoom(r.id)}
              style={
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--room-accent" as any]: r.accentVar,
                } as React.CSSProperties
              }
            >
              <span className="ro-room__left">
                <span className="ro-room__dot" aria-hidden="true" />
                <span>
                  <div className="ro-room__title">{r.title}</div>
                  <div className="ro-room__sub">{r.sub}</div>
                </span>
              </span>

              <span aria-hidden="true" style={{ color: "var(--ink-tertiary)" }}>
                →
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* CENTER: Corridor */}
      <main className="ro-portal__center" aria-label="Portal center">
        <header className="ro-portal__chrome">
          <div className="ro-portal__chromeLeft">
            <div className="ro-portal__brand">
              <div className="ro-portal__brandName">RecoveryOS Portal</div>
              <div className="ro-portal__brandSub">{roomMeta.title}</div>
            </div>
          </div>

          <div className="ro-portal__chromeRight">
            <LensControl
              value={lens}
              onChange={(l) => {
                setLens(l);
                setRailsVisible(l !== "individual");
              }}
            />
            <DepthDial value={depth} onChange={setDepth} />
            <button className="ro-portal__btn" type="button" onClick={() => setRailsVisible((v) => !v)}>
              {railsVisible ? "Hide rails" : "Show rails"}
            </button>
            <button className="ro-portal__btn" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </header>

        <section className="ro-portal__main">
          {/* Corridor card */}
          <div className="ro-corridor">
            <div className="ro-corridor__card">
              <div className="ro-corridor__prompt">Choose the next right move.</div>

              <div className="ro-choiceGrid">
                {intentChoices.map((c) => (
                  <button key={c.id} type="button" className="ro-choice" onClick={() => run(c.id)}>
                    <div className="ro-choice__title">{c.title}</div>
                    <div className="ro-choice__sub">{c.sub}</div>
                  </button>
                ))}
              </div>

              {contract ? (
                <>
                  <div className="ro-divider" />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>One-move contract</div>
                    <div style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
                      {lens === "individual" ? "Human view" : lens === "professional" ? "Signal view" : "Integrity view"}
                    </div>
                  </div>
                  <ContractCard c={contract} />
                </>
              ) : null}
            </div>

            {/* Optional: a “Return” action that feels iconic */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <ReturnButton
                title="Return"
                subtitle="Run one move now."
                defaultIntent="anchor"
                onReturn={(intent) => run(intent)}
              />
              <div style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
                Depth: <strong style={{ color: "var(--ink-primary)" }}>{depth}</strong> • Lens:{" "}
                <strong style={{ color: "var(--ink-primary)" }}>{lens}</strong>
              </div>
            </div>

            {/* Rails panel inside main (optional) */}
            {railsVisible && (
              <HandrailPanel
                title="Rails"
                consentVisible={consentVisible}
                onConsentVisibleChange={setConsentVisible}
                quietHours={quietHours}
                onQuietHoursChange={setQuietHours}
                escalation={escalation}
                onEscalationChange={setEscalation}
              />
            )}
          </div>
        </section>

        <footer className="ro-portal__footer">
          <div style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
            Quiet • Safe • Provable
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--ink-secondary)" }}>
              Artifacts: <strong style={{ color: "var(--ink-primary)" }}>{traces.length}</strong>
            </span>
          </div>
        </footer>
      </main>

      {/* RIGHT: Artifact Rail */}
      <aside className="ro-portal__right" aria-label="Artifact rail">
        <div className="ro-portal__rightInner">
          <div className="ro-portal__railHeader">
            <div className="ro-portal__railTitle">Artifact Rail</div>
            <div className="ro-portal__railSub">Traces seal the moment into proof.</div>
          </div>

          {traces.map((t) => (
            <TraceTile
              key={t.id}
              title={t.title}
              body={t.body}
              sealed={t.sealed}
              pillar={t.pillar}
              timestamp={t.timestamp}
              onOpen={() => console.log("open trace", t.id)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

```
  
## 4) Export it  
```
/* src/ui/PortalShell/index.ts */
export { PortalShell } from "./PortalShell";
/* src/ui/index.ts (add this line) */
export { PortalShell } from "./PortalShell/PortalShell";

```
  
## 5) Wire it in App.tsx (open/close + dock)  
```
/* src/App.tsx */
import React, { useState } from "react";
import "./styles/global.css";

import { PortalDock, PortalShell, ReturnButton } from "./ui";

export default function App() {
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", padding: 24 }}>
      <ReturnButton title="Open Portal" subtitle="Explore the OS." onReturn={() => setPortalOpen(true)} />

      <PortalShell open={portalOpen} onClose={() => setPortalOpen(false)} />

      <PortalDock onOpen={() => setPortalOpen(true)} hint="Open Portal" />
    </div>
  );
}

```
  
