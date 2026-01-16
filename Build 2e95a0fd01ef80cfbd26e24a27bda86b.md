# Build

- **Platform UI/UX = the Shell**
- **Room UI/UX = the Immersive Spaces**
- **LUMA UI/UX = the Conductor Overlay + Feed Spine**

If we get these three right, everything feels like **one organism**.

---

# 1) Platform UI/UX (The Shell)

This is the “home architecture” that makes a huge system feel simple.

## Platform’s job

- Establish **orientation**: “Where am I? What’s next? What matters?”
- Provide **continuity**: state, reminders, receipts, support access
- Enable **entry/exit** from rooms without breaking the emotional thread
- Never feel like a “dashboard product”

## Core surfaces (Platform)

- **Home / Dashboard** (glanceable truth + next move)
- **Rooms index** (only if needed — ideally minimal)
- **Search / Library** (toolkit + saved)
- **Momentum** (proof + receipts)
- **Navigate** (support + scheduling + community signal)
- **Settings / Integrations**

## Navigation model (Apple-grade)

You want a **hybrid**:

- **Primary: LUMA-first home** (feed + next action)
- **Secondary: Rooms** (intentional entry)
- **Tertiary: Utility** (settings, integrations, account)

Avoid: “8 icons = 8 products.”

### Recommended pattern

- Bottom nav with **3–4 anchors max**:
    - **LUMA**
    - **Rooms**
    - **Momentum**
    - **Navigate**
- Everything else behind:
    - profile / settings
    - search
    - notifications

## Platform tone

- Calm, spatial, premium.
- The shell should *almost disappear*.
- The hero is always the **next move**, not the interface.

---

# 2) Room UI/UX (Immersive Spaces)

Rooms are where users *choose intensity*.

## Room design rule

Each room gets:

- a distinct **cadence**
- a distinct **visual language**
- but uses the same **Player primitives** (Cue → Signal → Route → Receipt)

## Room entry = ritual

The entry moment is where you prevent sterility.

Each room needs:

- a short **threshold animation**
- a “You’re entering” feeling
- clear expectation: *duration + outcome + why now*

## Room exit = clean handoff

When a room finishes, the user should land somewhere meaningful:

- Receipt surface
- “Next best move” (often a navicue)
- Optional: save to Bag

### Room UX patterns by type

**Journey Room (Immersive / cinematic)**

- Full-screen cue sequence
- Minimal navigation chrome
- “Progress” shown as *presence*, not a stepper UI

**Navicues (Ambient / addictive)**

- Infinite stream
- High novelty, low friction
- Micro-interactions: swipe, tap, hold, record

**Wellbeing Studio (Ritual + media)**

- Series clusters
- “Play now” default
- Schedule as a gentle invite, not a settings workflow

**Toolkit (Browse + inject anywhere)**

- Modular objects
- Easy save/share-to-self
- Audio-first options

**STATE (Glance + input)**

- 5–10 second check-in
- Gesture-first, minimal text

**Momentum (Proof theater)**

- Receipts as story + signal
- Less “analytics dashboard,” more “operating truth”

**Navigate (Support infrastructure)**

- Feed with signal
- Scheduling that feels like care, not admin

---

# 3) LUMA UI/UX (The Conductor)

LUMA is not “a screen.”

LUMA is a **presence layer**.

## LUMA’s job

- Make the platform feel **continuous**
- Grade the moment and route the dose
- Keep the user in-flow without forcing them into rooms
- Be instantly accessible: *one gesture away*

## LUMA’s 3 modes (this is key)

### A) LUMA Feed (Spine)

- “What’s next” + “what matters”
- Navicue-forward, Instagram energy, but governed
- Every item is a Cue with an outcome

### B) LUMA Talk (Guided corridor)

- Conversational, but not endless texting
- Prompt-led
- Converts to signals + receipts

### C) LUMA Voice (Capture)

- Always-on, low-friction voice drop
- Prompts appear when the system needs backstory signal

### Bonus: LUMA Play

- Audio mode for soundbites / Sparks / Flames / Embers
- Mood/intent/tempo selector
- Feels like Apple Music, but therapeutic

## LUMA interaction model (how it appears)

Best pattern:

- LUMA as a **persistent “orb / pill”** or **bottom-sheet summon**
- Tap = feed
- Hold = voice
- Swipe = quick navicue
- Long-hold / SOS gesture = support

This preserves “one conductor” without dominating the rooms.

---

# The UX glue: how these layers feel like ONE

This is the part that stops “sterile + generic.”

## Unification mechanics

- **Same microcopy voice** everywhere (soul + science, no corporate tone)
- **Consistent motion language**
    - motion communicates state changes and transitions, not sparkle
- **Receipts everywhere**
    - not as gamification, as identity proof
- **Handoffs**
    - every room ends by routing into LUMA or Momentum (receipt)

## Presence states (high leverage)

Define the system-wide “presence state” so UI adapts:

- **Ambient** (LUMA nudges, navicues)
- **Focused** (short guided action)
- **Immersive** (Journey / Studio)
- **Regulate** (STATE + grounding)
- **Support** (Navigate + SOS)

This gives you coherence across the whole platform.

---

# If we’re about to JIRA it…

Next step is to lock 6 UX decisions that drive all tickets:

1. **Navigation model** (LUMA-first bottom nav structure)
2. **LUMA summon mechanics** (orb/pill/bottom-sheet + gestures)
3. **Room entry/exit rituals** (animations + receipt handoffs)
4. **Cue rendering system** (formats + interactions)
5. **Receipt patterns** (micro vs sprint vs momentum)
6. **Design + motion language** (global rules)

If you want, I’ll translate the above into a **JIRA-style epic map** next:

- **Epic: Platform Shell**
- **Epic: LUMA Conductor Layer**
- **Epic: Universal Player Runtime**
- **Epic: Rooms (Journey / Navicues / Studio / Toolkit / State / Momentum / Navigate)**
- **Epic: Design System + Motion System**
- **Epic: Instrumentation + Receipts**

…and each epic gets dev-ready stories with acceptance criteria.