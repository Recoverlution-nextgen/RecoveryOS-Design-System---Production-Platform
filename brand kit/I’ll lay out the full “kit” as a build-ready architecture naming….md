I’ll lay out the full “kit” as a build-ready architecture: naming system + design tokens + motion/asset rules + core objects + component library + lensing model, with a clear folder/registry structure so design and engineering can implement it immediately.  
Awesome. We’ll build the **kit** like a real OS kit: **names → tokens → objects → components → scenes → lensing**. This is the foundation that makes the website (and later product UI) feel inevitable.  
Below is **RecoveryOS Kit v1** — build-ready architecture, with clear registries and rules.  
Below is **RecoveryOS Kit v1** — build-ready architecture, with clear registries and rules.  
  
## RecoveryOS Kit v1  
## The Continuity Layer Design System  
## 0) Kit structure (what ships)  
Think of this like Apple’s Human Interface Guidelines + SF Symbols + UIKit + marketing templates… but RecoveryOS.  
**A) Language Kit**  
**A) Language Kit**  
* Public dictionary (Return / Thread / Trace / Handrail / Drift / Grip / Compass / Carry)  
* Verb set (Try / Return / Save / Review / Share / Hand-off)  
* Tone rules + forbidden synonyms  
**B) Token Kit**  
* Foundations (color/type/spacing/radius/elevation)  
* Semantics (return/thread/trace/handrail/lens/motion)  
* Modes (Light/Dark + Calm/Focus + Accessibility)  
**C) Object Kit**  
* Core OS objects: ReturnButton, TraceObject, ThreadLine, HandrailRail, LensShift  
* Object states + lifecycle  
**D) Component Kit**  
* Primitive components (buttons, tiles, drawers)  
* Signature components (GripGenerator, ThreadView, TraceVault, LensShift)  
* Governance components (ConsentPanel, IntegrityPreview)  
**E) Scene Kit**  
* Keynote sections (hero, demo, object reveal, lens shift)  
* Layout templates + scroll choreography  
**F) Asset Kit**  
* Cinematic rules  
* Atmosphere fields  
* Motion signals  
* Diagram language  
**G) Registry + Naming**  
* Component registry  
* Token registry  
* Asset naming schema  
* Content blocks  
  
## 1) Naming system  
This is the part that prevents drift.  
## 1.1 OS nouns (public-facing, stable)  
**Return · Thread · Trace · Handrail · Grip · Drift · Compass · Carry**  
## 1.2 Naming convention rules  
* **Objects**: PascalCase nouns (TraceObject, ThreadLine)  
* **Actions**: VerbNoun (ReturnAction, SaveTrace)  
* **Spaces**: *Room* suffix (ThreadRoom, VaultRoom)  
* **Controls**: *Control* suffix (LensControl, DoseControl)  
* **Panels**: *Panel* suffix (ConsentPanel, IntegrityPanel)  
* **Overlays**: *Overlay* suffix (DayOverlay, LensOverlay)  
## 1.3 The “forbidden” naming pattern  
No clinical taxonomy names in public component names.  
* Avoid: HeatBand, SchemaExplorer, MindblockRewriter  
* Use: DriftMeter, AtlasExplorer, BridgeBuilder  
(Internally you can map those to whatever IDs you want.)  
  
## 2) Token Kit (the OS-level foundation)  
## 2.1 Token layers  
**Foundation → Semantic → Component → Scene**  
## Foundation tokens  
* color.*  
* type.*  
* space.*  
* radius.*  
* elev.*  
## Semantic tokens (the RecoveryOS meaning layer)  
* return.*  
* thread.*  
* trace.*  
* handrail.*  
* drift.*  
* lens.*  
* motion.*  
## Component tokens (local)  
* TraceTile.surface  
* ReturnButton.glow  
* ThreadLine.weight  
* Handrail.border  
## Scene tokens (page choreography)  
* scene.hero.spacing  
* scene.demo.density  
* scene.reveal.duration  
  
## 2.2 Semantic token families (v1)  
Here’s the “we’re not a normal design system” part.  
```
return/*

```
* return.surface  
* return.ink  
* return.focusRing  
* return.press  
* return.glow (subtle)  
```
thread/*

```
* thread.line  
* thread.node  
* thread.pulse (micro-motion)  
* thread.depth (foreground vs background)  
```
trace/*

```
* trace.surface  
* trace.border  
* trace.stamp  
* trace.seal  
* trace.vaultSurface  
```
handrail/*

```
* handrail.surface  
* handrail.border  
* handrail.callout  
* handrail.escalate  
```
lens/*

```
* lens.individual  
* lens.professional  
* lens.organisation (These don’t change the brand—only emphasis: density, copy length, module order, and which proof view is default.)  
```
motion/*

```
* motion.arrive  
* motion.glide  
* motion.settle  
* motion.confirm  
* motion.carry  
  
## 2.3 Modes (v1)  
You need modes that feel like an OS, not a theme.  
* **Appearance**: Light / Dark  
* **Attention**: Calm / Focus  
* **Accessibility**: Reduced Motion / Increased Contrast  
Calm vs Focus is huge: Calm = breath + space. Focus = tighter UI, fewer distractions (especially for demo flows).  
  
## 3) Object Kit (the core OS objects)  
These are not “components.” They are **publicly recognizable artifacts**.  
## 3.1 ReturnButton (the signature)  
**Job:** one universal action surface; always available.  
**States**  
* Idle  
* Hover (desktop)  
* Press  
* Active (running a Grip)  
* Confirm (Return completed)  
* Hold (long-press reveals intent)  
**Rules**  
* Always the same location pattern  
* Always one-tap = “help me return”  
* Long-press = choose direction: Anchor / Compass / Handrail  
  
## 3.2 Grip (micro-experience)  
**Job:** the smallest runnable “help” the user can accept.  
**Grip types (public)**  
**Grip types (public)**  
* Anchor (settle)  
* Compass (direction)  
* Handrail (support)  
**Grip constraints**  
* Always 10s / 30s / 2m  
* Always ends with a Trace (optional, dignity-first)  
  
## 3.3 TraceObject (proof made tangible)  
**Job:** a quiet artifact of motion.  
**Fields (public)**  
**Fields (public)**  
* Direction chosen (Anchor/Compass/Handrail)  
* Small action taken (what happened)  
* Tiny change noticed (even 1%)  
**States**  
* Draft (not saved)  
* Sealed (saved)  
* Carried (appears in Thread)  
* Shared (via Lens; consent-aware)  
  
## 3.4 Thread  
**Job:** continuity over time, the “timeless pass.”  
**States**  
* New (empty)  
* Growing (nodes)  
* Reviewable (weekly grouping)  
* Shareable (lens-based)  
**Rules**  
* Thread is never a streak.  
* Thread is never performance.  
* Thread is “a line you can return to.”  
  
## 3.5 Handrail  
**Job:** safety without drama.  
**Capabilities**  
**Capabilities**  
* “Support available”  
* “Escalate by consent”  
* “Quiet hours respected”  
Handrail is a **design presence**, not a scary button.  
  
## 4) Component Kit (build-ready library)  
## 4.1 Primitives (boring but necessary)  
* Button, IconButton  
* Card, Surface  
* Chip, Tag  
* Drawer, Modal  
* Toast (quiet)  
* ProgressiveDisclosure (Fold/Reveal)  
* SegmentedControl (LensControl)  
## 4.2 Signature components (the RecoveryOS magic)  
```
LensControl

```
**UI:** Individual / Professional / Organisation **Behavior:** re-renders meaning, not layout.  
```
GripGenerator

```
Pick:  
* direction (Anchor/Compass/Handrail)  
* time (10s/30s/2m) Outputs:  
* one Grip  
* optional Seal → TraceObject  
```
DayOverlay

```
Scroll-based overlay showing continuity inside a day:  
* morning, midday, evening  
* tiny touchpoints  
* ReturnButton presence  
```
ThreadView

```
A clean, beautiful line:  
* nodes = Traces  
* clusters = weekly installs  
* click = reveal Trace detail  
```
TraceTile

```
A “physical” representation of a TraceObject:  
* minimal text  
* tactile depth  
* seal mark  
```
VaultView

```
Trace storage, searchable by:  
* direction  
* “what helped”  
* time  
```
TraceTravel

```
The signature ecosystem reveal. Same TraceTile re-renders as:  
* **Me View** (identity)  
* **Care View** (signal)  
* **System View** (integrity)  
```
ConsentPanel

```
A calm, readable “what the system sees/does.”  
* toggles  
* explanations  
* no legalese vibe  
```
IntegrityPreview

```
A sample audit trail that doesn’t feel bureaucratic:  
* routed action  
* consent state  
* handrail usage  
* reliability  
  
## 4.3 Component props philosophy (so engineering loves you)  
Everything should accept:  
* mode (calm/focus)  
* lens (individual/professional/organisation)  
* reducedMotion  
* density (comfortable/compact)  
This gives you OS-like adaptability.  
  
## 5) Scene Kit (website sections as reusable templates)  
We’re building scenes like Apple builds keynote segments.  
## 5.1 Canonical scenes (v1)  
* SceneHeroContinuity  
* SceneWhatWasMissing (Continuity Layer reveal)  
* SceneReturnDemo (GripGenerator)  
* SceneTraceReveal (TraceObject born)  
* SceneThreadReveal (timeless pass)  
* SceneLensShift (TraceTravel)  
* SceneTrust (ConsentPanel + Handrail)  
* SceneIntegrations (DayOverlay style)  
* SceneCTA  
## 5.2 Scene rules  
* one story point per scene  
* one interaction max per scene  
* one object reveal per scene  
* long copy is always behind a Fold  
  
## 6) Asset Kit (how you use what you already have)  
## 6.1 Asset families (roles)  
1. **Motion Reality** (life in motion)  
2. **OS Objects** (Return, Trace, Thread, Handrail)  
3. **Atmospheres** (fields that imply “a layer is present”)  
4. **Signals** (micro motion: arrive/glide/settle/confirm/carry)  
5. **Diagrams** (only after a felt demo, for reassurance)  
## 6.2 Asset rules  
* no “wellness stock”  
* no recovery clichés  
* no crisis porn  
* realism, dignity, continuity  
* objects look like Apple-grade product renders: crisp, calm, iconic  
## 6.3 Asset naming schema  
```
FAMILY__subject__state__v#.ext

```
Examples:  
* REALITY__doorway-evening__loop__v2.mp4  
* OBJECT__trace-tile__sealed__v4.png  
* FIELD__continuity-haze__dark__v1.webp  
* MOTION__seal-confirm__v3.json  
  
## 7) Registry (the implementation backbone)  
## 7.1 Token registry  
```
/tokens

```
* foundation.json  
* semantic.return.json  
* semantic.trace.json  
* semantic.thread.json  
* semantic.handrail.json  
* semantic.motion.json  
* modes.json  
## 7.2 Component registry  
```
/components

```
* /primitives  
* /objects (ReturnButton, TraceTile, ThreadLine)  
* /signature (GripGenerator, TraceTravel, DayOverlay, VaultView)  
* /panels (ConsentPanel, IntegrityPreview)  
## 7.3 Scene registry  
```
/scenes

```
* each scene has:  
    * layout.tsx  
    * copy.{lens}.mdx  
    * assets.json  
    * motion.json  
## 7.4 Content blocks (marketing without chaos)  
```
/content-blocks

```
* TruthLine  
* PromiseLine  
* AhaLine  
* DemoPrompt  
* ObjectCaption  
So marketing stays modular and consistent.  
  
## 8) Lens logic (how “same same but different” works)  
Lens never changes the product story—only:  
1. **Default scene order**  
2. **Copy density**  
3. **Which object view is default**  
4. **CTA type**  
5. **Which proof interpretation appears first**  
## Individual defaults  
* first demo = Return → Grip → Trace  
* default view = Me View (identity)  
## Professional defaults  
* first demo = Trace → Signal (Care View)  
* default view = patterns + next-session usefulness  
## Organisation defaults  
* first demo = IntegrityPreview + ConsentPanel  
* default view = audit-grade trace + reliability  
  
## What I need from you (no rehashing, just inputs)  
To lock v1, give me **only**:  
1. The 6–10 words you want to be *iconic* (we can use Return/Thread/Trace/Handrail etc. unless you want alternatives)  
2. What asset types you already have (film / still / renders / gradients / UI mocks)  
And then I’ll output v1 as:  
* a **Kit Spec** (ready for Figma + engineering)  
* a **component index** with variants/states  
* a **homepage scene stack** using your assets (assigned roles)  
But even without that, the structure above is the kit foundation: **language → tokens → objects → components → scenes → lens.**  
