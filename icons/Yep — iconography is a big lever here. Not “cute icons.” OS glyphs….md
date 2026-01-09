Yep — iconography is a big lever here. Not “cute icons.” **OS glyphs.** Quiet. Abstract. Functional. Recognisable in 12px and still beautiful at 96px.  
Here’s the full map (style + system + what we actually need for the 6 pages + product).  
  
## The RecoveryOS Icon Philosophy  
**Icon = a verb.** Not decoration. Not illustration. Every glyph should answer: *what does the system do here?*  
**Shape language**  
* **Geometry-first** (circles, arcs, rails, nodes, fields)  
* **No literal brains / hearts / hands / shields**  
* **No medical symbols**  
* **No “wellness” motifs**  
* Prefer **paths, routing, sealing, lenses, altitude, traces**  
**Stroke + weight**  
* One master weight: **1.75px at 24px** (scales cleanly)  
* Rounded caps/joins (calm)  
* Two styles only:  
    1. **Line glyph** (default)  
    2. **Filled “state dot”** (only for status: sealed/live/on)  
**Brand signature**  
* Purple = structure  
* Cyan = activity / “live” / seal events  
* Green (optional) = growth/return (subtle, not “success!”)  
  
## The 3 Families (this is the system)  
## 1) Spine Icons (structure)  
Used for: pillars, framework, specs, navigation nodes Look: rails + nodes + scaffolds  
* spine (vertical rail with 3 nodes)  
* pillar (upright bar + anchor)  
* atlas (map grid + nodes)  
* schema (stacked layers)  
* module (tile + port)  
* lock-id (stable ID / deprecation map)  
## 2) Flow Icons (behavior)  
Used for: keynote scenes, how-it-works, demo, orchestration Look: arrows, routes, loops, gates  
* sense (radar arc + point)  
* route (split path → converge)  
* deliver (drop-in / insertion notch)  
* seal (ring closes / snap shut)  
* review (loopback arc)  
* orchestrate (conductor lines)  
* continuity (linked chain of nodes)  
## 3) Trust Icons (rails)  
Used for: trust page, headers, badges, logs Look: boundaries, gates, constraints, audit marks (NOT shields)  
* consent-map (grid + toggle dot)  
* quiet-hours (moon arc / muted wave)  
* escalation (ladder step / handoff node)  
* governance (role rings / permissions)  
* integrity-log (sealed ledger mark)  
  
## The “Core 12” (minimum set for the website)  
If we do nothing else, build these 12 and we’re covered:  
1. spine  
2. lens  
3. altitude  
4. trace  
5. receipt  
6. sense  
7. route  
8. deliver  
9. seal  
10. review  
11. consent-map  
12. integrity-log  
Everything else can be derived.  
  
## Pillar Icon Strategy (important)  
Don’t give each pillar a literal icon. Give each pillar a **unique glyph variant** built from the same parts:  
* Same base: **rail + node**  
* Variation: node count / arc direction / anchor type  
So the system reads as *one OS*, not six brands.  
## Example pillar glyph logic  
* **ER**: arc compressing into a node (downshift)  
* **SR**: broken rail rejoined (repair)  
* **SC**: two nodes bridged (connection continuity)  
* **CR**: branching routes converging (routing engine)  
* **II**: rail + seal stamp (integrity)  
* **DM**: wave + marker (drift detection)  
Still abstract. Still unified.  
  
## States + Micro-icons (UI detail)  
We also need tiny, consistent system states:  
* live (cyan dot)  
* sealed (closed ring + dot)  
* routed (arrow node)  
* delivered (insertion notch)  
* reviewed (loop arrow)  
* locked (small notch/lock)  
* go / open / close / back  
These should be *the same geometry* in all components.  
  
## Where iconography shows up (by page)  
## Home  
* Hero: seal, spine, trust-rails, three-worlds  
* “What it is”: spine, trace, receipt  
## How it works  
* sense, route, deliver, seal  
* Pillar glyphs (6)  
* Continuity stages (4 small icons)  
## Trust  
* consent-map, quiet-hours, escalation, governance  
* integrity-log  
## Three worlds  
* lens + altitude  
* trace-travel (receipt moving through 3 rings)  
## Specs  
* Full glossary icons as headers (helps scanning)  
* Stability model: return (loop back to rail)  
## Contact / Demo  
* run-moment (play + node)  
* seal impact icon in the demo  
  
## Implementation: how we ship them  
## Option A (best): Inline SVG icon system  
* src/ui/icons/*.tsx  
* Icon name="seal" size={24} tone="ink|cyan|pillar" />  
* Allows:  
    * color via CSS tokens  
    * stroke scaling  
    * motion hooks (seal pulse)  
## Option B: icon font  
Not recommended. Harder to animate + multi-tone.  
  
## Icon Token Spec (so it’s governed)  
* --icon-stroke: 1.75px;  
* --icon-radius: 12px; (rounded joins)  
* --icon-opacity-muted: 0.72;  
* --icon-color-ink: var(--ink-primary);  
* --icon-color-live: var(--c-cyan-500);  
* Pillar mapping:  
    * icon inherits --p-base, --p-tint from pillar tokens (already in your kit)  
  
## Quick set of names (so the front end can build immediately)  
```
Icon names (website v1)

core:
  spine, lens, altitude, trace, receipt

loop:
  sense, route, deliver, seal, review, continuity, orchestrate

trust:
  consentMap, quietHours, escalation, governance, integrityLog

utility:
  play, pause, next, back, close, info, external, chevronDown

pillars:
  pillarER, pillarSR, pillarSC, pillarCR, pillarII, pillarDM

```
  
## If you say “roll it”, I’ll do one of two things next  
1. **Draw the full SVG set** (as React TSX components) with your tokens and sizes (16/20/24/32).  
2. Or produce an **iconography spec sheet** (grid + rules + do/don’t + examples) for your designer to execute.  
If you want maximum speed for build: I’d roll **12 core + 6 pillar glyphs + 8 utility** first.  
