# A) Component Registry (v1)  
This is the “what exists” list. Specs follow.  
**Tiers** **O** = Iconic OS Object (recurs everywhere) **B** = Belief Machine (creates aha) **T** = Trust Surface (makes safety felt) **X** = Explorer (deep, immersive)  

| Component | Tier | Story job | Primary default lens | Core dependency |
| -------------------------------------- | ---- | --------------------------------------- | -------------------- | ----------------- |
| LensControl | O | One site, three altitudes | All | Lens runtime |
| ReturnButton | O | One universal “start” | Individual | Player |
| DepthDial (Glance/Seed/Thread/Journey) | O | Controls intensity + disclosure | All | Content modules |
| UniversalPlayer | O | One player for everything | All | Module runtime |
| PortalDock | O | Reopen immersive explorer anywhere | All | Portal |
| LoopRunner | B | Demonstrate the OS loop through action | Individual | Player + Routing |
| GripGenerator | B | Convert intent → runnable move | Individual | Player |
| ReceiptForge | B | Seal moment → create artifact | All | Vault |
| TraceTile | O | The portable artifact object | All | ReceiptForge |
| ThreadView | B | Show continuity compounding | Individual | Vault |
| TraceTravel | B | Same artifact, 3 meanings | Professional | Lens runtime |
| RoomSwitcher | B | Explain “rooms with jobs” | All | Room registry |
| ConductorView (LUMA) | B | Show governed orchestration | Professional | Routing + Rails |
| FeedWithSpine | B | Make “not random” visible | Professional | ConductorView |
| SpineAtlas | X | Explore deep framework without drowning | Professional | Spine graph |
| NaviCueGallery | X | Mini-apps in the moment | Individual | Player |
| JourneyStudio | X | Weekly install simulator | Individual | Player |
| LumaTalkCorridor | X | Guided prompts (not open chat) | All | Prompt engine |
| ConsentMap | T | Consent as design | Org | Rails |
| EscalationRail | T | Human boundary + protocols | Org | Support graph |
| IntegrityLogPreview | T | Auditability without bureaucracy | Org | Log schema |
| GovernanceLockMap | T | LOCKED/CONTROLLED/EXPANDABLE stability | Org | Governance schema |
| IntegrationsOverlay | B | “Runs in the day” without surveillance | Professional | Signals model |
| RecoveryOSPortal | X | Website-within-website | All | Everything above |
  
Grounding: loop + depth toggles + rooms + universal player + guided corridor + “feed with a spine” + trust/governance are explicit in your doc.  
  
# B) Spec Sheets (build-ready)  
Format: **Purpose / Where used / Props / Variants / States / Events / Notes**  
## 1) RecoveryOSPortal (X) — the website-within-website  
**Purpose** A full-screen immersive OS environment where someone can *explore*, *run*, and *see* RecoveryOS across **Individual / Professional / Organisation**—guided, prompt-driven, governed. (This is your “guided corridor,” not open chat.)  
**Where used**  
* Keynote page “Open Portal” moment  
* Dedicated /studio  
* Reopenable via PortalDock  
**Props**  
* lens: "individual" | "professional" | "organisation"  
* mode: "calm" | "focus"  
* depth: "glance" | "seed" | "thread" | "journey"  
* railsVisible: boolean (trust surfaces on/off)  
* entry: "runMoment" | "installWeek" | "exploreSpine" | "seeOrchestration" | "trust" | "integrations"  
* artifactPolicy: { allowSave: boolean; allowShare: boolean; anonymizeByDefault: boolean }  
**Variants**  
* Portal/Minimal (single experience, no atlas)  
* Portal/Full (rooms + atlas + governance)  
* Portal/Org (starts in Trust + Governance)  
**States**  
* idleAmbient → prompting → routing → running → sealing → artifactView → elevatingLens  
**Events**  
* portal.opened(entry)  
* prompt.submitted(intent, context, tempo, depth)  
* route.resolved(targetMeta)  
* player.completed(outcome)  
* artifact.sealed(traceId)  
* lens.changed(nextLens)  
* rails.toggled(on/off)  
**Notes**  
* The portal’s core UX loop mirrors: **Prompt → signal → route → move → receipt**.  
* Supports two tempos: **Journeys install baseline** vs **NaviCues steer the moment**.  
* Artifacts should “travel up the spine”: same object, three meanings.  
  
## 2) LumaTalkCorridor (X) — guided prompts inside the Portal  
**Purpose** A conversational corridor that *listens but leads*—no open chatbot sprawl.  
**Props**  
* scriptId (which corridor: onboarding, moment, week, trust)  
* dynamicPrompts: boolean  
* tone: "warm" | "clinical" | "executive" (lens-coupled)  
**States**  
* listening / leading / confirming / handoffOffer  
**Events**  
* corridor.nextStep(stepId)  
* corridor.offerHandoff(type)  
  
## 3) UniversalPlayer (O) — one player to run everything  
**Purpose** One universal cue system + player powering Journeys + NaviCues + Practices, so the site feels like one OS, not pages.  
**Props**  
* moduleType: "navicue" | "journey" | "practice" | "spark" | "flame" | "ember"  
* duration: 10 | 30 | 120 | 300  
* interactionMode: "glance" | "seed" | "thread" | "journey"  
* rails: { consent: boolean; quietHours: boolean; escalation: boolean }  
**Events**  
* player.started  
* player.stepChanged  
* player.completed  
* player.aborted(reason)  
  
## 4) DepthDial (O) — Glance / Seed / Thread / Journey  
**Purpose** A universal depth toggle so anyone can go deeper without leaving context.  
**Props**  
* value  
* availableLevels (context-dependent)  
* compressAtHighLoad: boolean (optional behavior)  
  
## 5) ReturnButton (O) — iconic OS action surface  
**Purpose** The single “start here” action that opens the system without requiring explanation.  
**Props**  
* defaultIntent: "anchor" | "clarity" | "connection" | "direction"  
* holdIntents: Intent[] (long-press chooser)  
* haptics: boolean (optional)  
* lens  
**States**  
* idle / hover / pressed / holding / confirmed  
**Events**  
* return.tap  
* return.hold  
* return.intentSelected(intent)  
  
## 6) LoopRunner (B) — Sense → Route → Deliver → Seal as experience  
**Purpose** Demonstrate the OS loop through a single runnable experience.  
**Props**  
* tempo: "moment" | "week"  
* intent  
* depth  
* showWhyThis: boolean  
**States**  
* sense → route → deliver → seal  
**Events**  
* loop.sensed(signal)  
* loop.routed(plan)  
* loop.delivered(result)  
* loop.sealed(traceId)  
  
## 7) GripGenerator (B) — intent → move (right-sized)  
**Purpose** Convert “what I need” into a runnable micro-move that can land now.  
**Props**  
* intent: anchor | clarity | connection | direction  
* time: 10s | 30s | 2m | 5m  
* style: "minimal" | "guided"  
**Outputs**  
* module fed to UniversalPlayer  
  
## 8) ReceiptForge (B) — Seal → artifact object  
**Purpose** “Seal turns moment into proof”—creates a **Trace** object (and optionally a pro/org rendering).  
**Props**  
* captureMode: "micro" | "standard" | "audit"  
* fields: { pre?: State; post?: State; note?: string }  
* attachMeta: boolean (on by default in Pro/Org)  
**States**  
* draft → sealed → stored → shareable  
  
## 9) TraceTile (O) — the portable artifact  
**Purpose** A single object that can render as **identity**, **signal**, or **defensibility**.  
**Props**  
* traceId  
* view: "me" | "care" | "system"  
* density: "airy" | "compact"  
**Events**  
* trace.opened  
* trace.shared(consentLevel)  
  
## 10) ThreadView (B) — compounding continuity (no streak energy)  
**Purpose** Show “thousands of small rewires” as a calm continuity line.  
**Props**  
* range: 7d | 30d | 90d  
* grouping: "daily" | "weekly"  
* lens  
* showClusters: boolean (Journeys = weekly installs)  
  
## 11) TraceTravel (B) — the three-world reveal  
**Purpose** Same Trace → three altitude renderings: Person / Clinician / Org.  
**Props**  
* traceId  
* trigger: "toggle" | "scroll" | "auto"  
* defaultViewByLens: boolean  
  
## 12) LensControl (O) — Individual / Professional / Organisation  
**Purpose** Universal lens toggle; changes interpretation, defaults, and emphasis.  
**Props**  
* value  
* onChange  
* sticky: boolean  
**Rules**  
* Does not reshuffle the whole page; it re-renders the same objects.  
  
## 13) ConductorView (B) — LUMA as orchestration (governed, coherent)  
**Purpose** Show “a feed with a spine” and why something is routed now—without feeling like a random feed.  
**Props**  
* inputsVisible: "minimal" | "expanded"  
* whyDrawer: boolean  
* governanceOverlay: boolean  
**States**  
* listening / routing / delivering / logging  
  
## 14) RoomSwitcher (B) — rooms with purpose (modules)  
**Purpose** Make modules feel like rooms, not features—Journeys / NaviCues / Toolkit / Wellbeing / State.  
**Props**  
* room: "journeys" | "navicues" | "toolkit" | "wellbeing" | "state"  
* entryDepth  
* lens  
  
## 15) SpineAtlas (X) — the deep framework explorer  
**Purpose** Explore Pillars → Concepts → Themes → Schema → Mindblocks as a zoomable map, but always returns to runnable experiences.  
**Props**  
* level: "pillars" | "concepts" | "themes" | "schema" | "mindblocks"  
* nodeId  
* depth  
* showRunThis: boolean  
**Rules**  
* Every node must offer: **Run this now** (moment) and **Install this** (week).  
  
## 16) NaviCueGallery (X) — mini-apps in the moment  
**Purpose** Show NaviCues as tiny runnable experiences (micro-interventions), not content.  
**Props**  
* filters: { intent; duration; domain }  
* contractVisible: boolean (show the “one move contract”)  
**One-move contract (displayable UI pattern)** Target + mechanism + primitive + dose + intent + proofrequest.  
  
## 17) JourneyStudio (X) — weekly install simulator  
**Purpose** Make “baseline installation cycles” feel like a rhythm, not a curriculum.  
**Props**  
* weekThemeId  
* cadence: "ERA" (Experience → Recognise → Align)  
* proofMode: "receipts"  
  
# Trust Surfaces (T) — must feel like design, not compliance  
Your trust model is explicit: consent by design, dignity, appropriateness, human boundary, verifiable trust via receipts/logs, escalation protocols.  
## 18) ConsentMap (T)  
**Purpose** A calm, readable “what the system can see/do/ask” panel.  
**Props**  
* visibilityLevels  
* sharingOptions  
* defaultsByLens  
  
## 19) EscalationRail (T)  
**Purpose** Show escalation as infrastructure: tighten dose, switch primitive, stabilise sequence, bring in human—by consent/protocol.  
**Props**  
* supportGraphEnabled: boolean  
* handoffTypes: ["peer","clinician","crisis"] (or your own names)  
* consentGate: boolean  
  
## 20) IntegrityLogPreview (T)  
**Purpose** Make “auditable delivery logs” readable, not bureaucratic.  
**Props**  
* detail: "summary" | "expanded"  
* filters: { consent; escalation; reliability }  
  
## 21) GovernanceLockMap (T)  
**Purpose** Show stability: LOCKED / CONTROLLED / EXPANDABLE; labels evolve, IDs don’t; deprecation maps forward.  
**Props**  
* showExamples: boolean  
* showIdStability: boolean  
  
# C) Portal Prompt Tree (v1)  
This is the exact “guided exploration” spine. It’s prompt-driven, immersive, and exploratory—without becoming open chat.  
## Entry (Portal opens)  
**1. Choose Lens (always visible)**  
* Individual  
* Professional  
* Organisation  
**2. Choose Tempo (two tempos, one OS)**  
* Moment (NaviCue-style)  
* Week (Journey-style)  
**3. Choose Depth**  
* Glance / Seed / Thread / Journey  
**4. Choose Intent**  
* Anchor (settle)  
* Clarity (steady mind)  
* Connection (repair/relate)  
* Direction (values/next move)  
Then the corridor runs: **Prompt → signal → route → move → receipt**.  
  
## Branch A: Moment (NaviCue simulator)  
**Prompt**  
* “What’s your direction right now?” (intent)  
* “How much time do you have?” (10s / 30s / 2m)  
* “Do you want quiet or guided?” (calm/focus)  
**Signal (minimal, dignity-first)**  
* optional: “state check” (Energy/Clarity/Anchorage)  
**Route**  
* show the **one-move contract** as a compact card:  
    * target (hidden name if Individual)  
    * mechanism  
    * primitive  
    * dose  
    * proofrequest  
**Move**  
* UniversalPlayer runs the micro-experience  
**Receipt**  
* ReceiptForge asks: “Seal a Trace?” (yes/no)  
* Trace appears in right rail as TraceTile  
**Elevation**  
* If lens toggles, TraceTravel re-renders that same Trace into Care/System views.  
  
## Branch B: Week (Journey simulator)  
**Prompt**  
* “What are you installing this week?”  
* “What should feel easier in real life?”  
**ERA loop preview**  
* Experience → Recognise → Align  
**Install**  
* one baseline rep + one real-world move  
* generates scheduled proof artifacts  
**Receipt**  
* weekly receipts appear as a cluster in ThreadView  
  
## Branch C: Explore (Spine Atlas)  
**Prompt**  
* “Do you want to explore by: Pillar / Theme / Mindblock?”  
* “Do you want this explained or runnable?”  
**Atlas**  
* zoom map through Pillars → Concepts → Themes → Schema → Mindblocks  
* every node offers:  
    * **Run a Moment**  
    * **Install a Week**  
    * **See proof archetype** (what Trace looks like)  
  
## Branch D: Orchestration (LUMA)  
**Prompt**  
* “Want to see how the system chooses what to deliver?”  
**Conductor**  
* shows feed with spine:  
    * why this  
    * right dose  
    * right timing  
    * governed rails  
**Receipt**  
* shows how routing produces a Trace and (optionally) a Signal/Integrity rendering.  
  
## Branch E: Trust & Rails  
**Prompt**  
* “Want to see boundaries before anything else?” (Org default)  
**Panels**  
* ConsentMap  
* Quiet Hours (boundary)  
* EscalationRail (handoff)  
* IntegrityLogPreview  
**Governance**  
* GovernanceLockMap (LOCKED/CONTROLLED/EXPANDABLE)  
  
## Branch F: Integrations (continuity in the flow of life)  
**Prompt**  
* “Want to see how it runs inside a day?”  
**Overlay**  
* “signals in, missed moments out” concept view (no surveillance framing)  
  
# D) The “story coverage” guarantee (no dead zones)  
This kit covers every dimension without turning into internal regurgitation:  
* **OS loop** is experienced via LoopRunner and Portal routing.  
* **Two tempos** are embodied via NaviCueGallery + JourneyStudio.  
* **One universal player** makes it feel like one OS.  
* **Three worlds** are proven via TraceTravel.  
* **Trust/governance** are product surfaces, not claims.  
  
If you want the next output in the same turn style: I can now write the **implementation checklist** (MVP vs v1 vs v2) and the **exact JSON-like schema** for TraceObject, SignalView, and IntegrityLog so engineering can wire artifacts once and render them across lenses (same ID, different altitude).  
