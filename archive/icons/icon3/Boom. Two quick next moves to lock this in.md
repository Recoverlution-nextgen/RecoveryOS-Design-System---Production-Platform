Boom. Two quick next moves to lock this in:  
1. **IconGrid QA page** (so you and FE can tune stroke/spacing in 2 minutes)  
2. **Icon usage map** (so every page/component uses icons consistently—no drift)  
Here’s both, ready to paste.  
  
# 1) IconGrid QA page (dev-only)  
```
src/ui/icons/IconGrid.tsx
import React, { useMemo, useState } from "react";
import { Icon } from "./Icon";
import type { IconName, IconTone } from "./Icon";

const ALL: IconName[] = [
  // core
  "spine","lens","altitude","trace","receipt",
  // loop
  "sense","route","deliver","seal","review","continuity","orchestrate",
  // trust
  "consentMap","quietHours","escalation","governance","integrityLog",
  // utility
  "play","pause","next","back","close","info","external","chevronDown",
  // pillars
  "pillarER","pillarSR","pillarSC","pillarCR","pillarII","pillarDM"
];

const SIZES = [16, 20, 24, 32] as const;
const TONES: IconTone[] = ["ink","muted","cyan","pillar"];

export function IconGrid() {
  const [tone, setTone] = useState<IconTone>("ink");
  const [pulse, setPulse] = useState(false);

  const rows = useMemo(() => ALL, []);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <label style={{ fontSize: 12, opacity: .75 }}>Tone</label>
        <select value={tone} onChange={(e) => setTone(e.target.value as IconTone)}>
          {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <label style={{ fontSize: 12, opacity: .75, marginLeft: 12 }}>
          <input type="checkbox" checked={pulse} onChange={(e) => setPulse(e.target.checked)} />
          <span style={{ marginLeft: 6 }}>Pulse</span>
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px repeat(4, 120px)", gap: 10 }}>
        <div style={{ fontSize: 12, opacity: .7 }}>Name</div>
        {SIZES.map((s) => (
          <div key={s} style={{ fontSize: 12, opacity: .7 }}>{s}px</div>
        ))}

        {rows.map((name) => (
          <React.Fragment key={name}>
            <div style={{ fontFamily: "Inter, system-ui", fontSize: 12, opacity: .85 }}>
              {name}
            </div>
            {SIZES.map((size) => (
              <div key={`${name}-${size}`} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 44,
                borderRadius: 12,
                border: "1px solid rgba(233,231,255,0.12)",
                paddingLeft: 12,
                background: "rgba(21,20,42,0.35)"
              }}>
                <Icon name={name} size={size} tone={tone} pulse={pulse && name === "seal"} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

```
## Quick route (Next.js example)  
Add a dev-only page:  
```
src/pages/_icons.tsx
import React from "react";
import { IconGrid } from "../ui/icons/IconGrid";

export default function IconsPage() {
  return <IconGrid />;
}

```
If you’re using App Router, tell me and I’ll adjust to /app/_icons/page.tsx.  
  
# 2) Icon usage map (so it stays “same spine” everywhere)  
## Global mapping (rules)  
* **Primary concept per section = 1 hero glyph** (big)  
* **Secondary concepts = 2–3 micro glyphs** (small)  
* **Never mix “trust” glyphs into “flow” sections** unless the point *is* trust  
## HOME  
* Hero scene 1: receipt + seal  
* Hero scene 2: spine + route  
* Hero scene 3: integrityLog (or governance)  
* Hero scene 4: lens + altitude + trace  
## HOW IT WORKS  
* Hero: sense route deliver seal  
* SpineExplorer: spine + pillar glyphs  
* ContinuityStream: route deliver seal review  
* OrchestrationFeed: orchestrate  
* Proof section: trace + receipt  
## TRUST  
* Rails: consentMap quietHours escalation governance  
* Integrity Log: integrityLog + seal  
## THREE WORLDS  
* Hero: lens + altitude  
* Comparison: each column header gets lens  
* TraceTravel: trace + 3-ring motif (we can add a dedicated traceTravel glyph if you want)  
## SPECS  
* Glossary terms get their matching glyph (anchors scanning)  
* Stability model: review + continuity (return model)  
## CONTACT/DEMO  
* Demo CTA: play  
* Sealed feedback: seal (pulse) + receipt  
  
# Want the “nuclear polish”?  
I can add:  
* **traceTravel icon** (receipt moving through 3 rings)  
* **rail icon** (pure boundary glyph)  
* **lockedId icon** (stability/governance)  
Just say “roll traceTravel + rail + lockedId”.  
