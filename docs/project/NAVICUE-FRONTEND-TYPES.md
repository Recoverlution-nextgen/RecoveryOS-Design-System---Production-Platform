# 🎨 NAVICUE FRONTEND TYPES - DELIVERY MECHANISMS TOOLKIT
**Date:** December 22, 2024  
**Purpose:** Design all NaviCue presentation formats for psychological effectiveness

---

## 🎯 GOAL

Build the complete toolkit of NaviCue delivery mechanisms that:
1. **Engage diverse learning styles** (visual, kinesthetic, reflective, interactive)
2. **Support K-B-E progression** (Knowing → Believing → Embodying)
3. **Create psychological safety** for mindset exploration
4. **Prevent habituation** through variety
5. **Enable LUMA to orchestrate** the right format at the right time

---

## ✅ CURRENT RESPONSE TYPES (What We Have)

### 1. **TAP** - Multiple choice buttons
**Current Use:** World view probes, emotional weather  
**Example:** "Your emotional weather: storm / cloudy / calm / clear"  
**UI:** Grid of 3 buttons, tap to select  
**Psychology:** Quick, low-friction decision making

### 2. **BINARY** - Left/Right choice  
**Current Use:** Simple yes/no, A/B decisions  
**Example:** "Landed" vs "Meh"  
**UI:** Two large buttons side-by-side  
**Psychology:** Forces commitment, no middle ground

### 3. **SLIDER** - 0-10 scale  
**Current Use:** Safety ratings, trust thermometer  
**Example:** "Trust in yourself right now: 0-10"  
**UI:** Horizontal slider with live value display  
**Psychology:** Nuanced self-assessment, precision

### 4. **ONE_WORD** - Text input  
**Current Use:** Identity snapshots, value archeology  
**Example:** "I am someone who..."  
**UI:** Text input field (20 char max)  
**Psychology:** Self-generated insight, ownership

### 5. **BREATH** - Breathe with thought  
**Current Use:** Somatic integration  
**Example:** "Breathe with this: You are safe"  
**UI:** Counter with breath button (1/3, 2/3, 3/3)  
**Psychology:** Embodiment, nervous system regulation

### 6. **HOLD** - Press and hold  
**Current Use:** Sitting with discomfort  
**Example:** "Hold to sit with this feeling"  
**UI:** Hold button fills up over 5 seconds  
**Psychology:** Building distress tolerance, presence

### 7. **NONE** - Just display  
**Current Use:** Statements, mirrors, provocations  
**Example:** "You've been running from yourself"  
**UI:** Text displayed, swipe to continue  
**Psychology:** Reflection without performance pressure

---

## 🚀 MISSING TYPES (What We Need)

### 8. **VOICE10** - 10-second voice response
**Purpose:** Verbal processing, authentic expression  
**Example:** "Say out loud: What are you really afraid of?"  
**UI:**  
- Record button (10s max)
- Waveform visualization
- Playback option
- Continue after recording

**Psychology:**  
- Verbal processing activates different brain pathways
- Speaking truth out loud = embodiment
- No performance pressure (not transcribed)
- Creates intimacy with self

**Technical:**  
- Use browser MediaRecorder API
- Store as audio blob in navicue_responses
- Optional: Store in Supabase Storage if needed later

---

### 9. **SORT** - Drag to prioritize
**Purpose:** Values clarification, priority setting  
**Example:** "Drag these in order of importance: Safety | Growth | Connection | Freedom"  
**UI:**  
- 3-5 cards
- Drag to reorder vertically
- Visual feedback on reorder
- Submit when ready

**Psychology:**  
- Forces trade-off thinking
- Reveals true priorities (not stated values)
- Kinesthetic engagement
- Decision-making practice

**Technical:**  
- Use react-dnd or @dnd-kit/core
- Save final order as array

---

### 10. **CONSTELLATION** - Spatial positioning
**Purpose:** Map relationships, distance, closeness  
**Example:** "Where does this belief sit in your life? Place it on the map."  
**UI:**  
- 2D canvas with center point (YOU)
- Drag label to position
- Proximity to center = importance/presence
- Can place multiple items if needed

**Psychology:**  
- Spatial metaphors for psychological distance
- Visual representation of inner landscape
- Reveals unconscious hierarchies
- Used in family systems therapy

**Technical:**  
- Canvas or SVG with drag interaction
- Save x/y coordinates
- Calculate distance from center

---

### 11. **TIMELINE** - Place on temporal line
**Purpose:** Process memory, track change, project future  
**Example:** "When did you start believing this? Mark it on the timeline."  
**UI:**  
- Horizontal line: PAST ←→ FUTURE
- Drag marker to position
- Labels: "Childhood | Teen | Young Adult | Now | Future"
- Optional: Add multiple markers

**Psychology:**  
- Temporal mapping of beliefs
- Identifies origin stories
- Projects change trajectory
- Supports narrative therapy

**Technical:**  
- Slider or draggable marker
- Save position value (0-100 or age/year)

---

### 12. **BODY_MAP** - Tap body regions
**Purpose:** Somatic awareness, locate sensations  
**Example:** "Where do you feel this anxiety in your body?"  
**UI:**  
- Simple body outline
- Tap regions: Head, Chest, Gut, Hands, Legs
- Multiple selections allowed
- Visual highlight on tap

**Psychology:**  
- Builds interoceptive awareness
- Connects thought to sensation
- Foundation for somatic therapy
- Reveals body-mind patterns

**Technical:**  
- SVG body outline with click regions
- Save array of selected regions

---

### 13. **DIAL** - Circular intensity selector
**Purpose:** Energy levels, intensity, arousal  
**Example:** "How activated is your nervous system right now?"  
**UI:**  
- Circular dial
- Rotate to select intensity
- Color gradient: Blue (calm) → Red (activated)
- Center displays level

**Psychology:**  
- Visual metaphor for arousal curve
- More intuitive than slider for energy states
- Matches circular breathing patterns
- Kinesthetic engagement

**Technical:**  
- Rotatable SVG dial
- Save angle/value (0-100)

---

### 14. **SPECTRUM** - Two-axis positioning
**Purpose:** Map complex states with two dimensions  
**Example:** "Where are you? Safe/Unsafe × Connected/Alone"  
**UI:**  
- 2D grid with axes
- Drag marker to position
- Quadrants labeled
- Example: Top-left = "Safe but alone", Bottom-right = "Unsafe but together"

**Psychology:**  
- Captures nuance of complex states
- Reveals paradoxes
- More sophisticated than binary
- Used in polarity mapping

**Technical:**  
- 2D draggable area
- Save x, y coordinates

---

### 15. **COMPARISON** - Side-by-side reflection
**Purpose:** Compare old vs new, then vs now  
**Example:** "THEN you believed: [old belief] → NOW you believe: [new belief]"  
**UI:**  
- Split screen
- Left: THEN (grayed out)
- Right: NOW (active)
- Progress bar between them
- Tap to acknowledge shift

**Psychology:**  
- Makes change visible
- Reinforces progress
- Celebrates transformation
- Green status signal

**Technical:**  
- Display two text blocks
- Save acknowledgment timestamp

---

### 16. **MIRROR** - Reflect back exact words
**Purpose:** Self-recognition, ownership  
**Example:** "You said: 'I'm not good enough' - Is that still true?"  
**UI:**  
- Display user's previous response in quote
- Binary: "Yes, still true" / "No, not anymore"
- Shows timestamp of original

**Psychology:**  
- Confronts cognitive dissonance
- Tracks belief evolution
- Creates accountability
- Reveals contradictions

**Technical:**  
- Query previous navicue_responses
- Display stored response_text
- Save confirmation/rejection

---

### 17. **PARADOX** - Hold two truths
**Purpose:** Build capacity for complexity  
**Example:** "Both are true: I want connection AND I push people away"  
**UI:**  
- Display two statements
- Hold button on each simultaneously (two fingers/clicks)
- Progress bars fill as held
- Complete when both full

**Psychology:**  
- Dialectical thinking (DBT)
- Reduces black/white thinking
- Builds distress tolerance
- Embraces contradictions

**Technical:**  
- Two hold buttons
- Track duration on each
- Complete when both reach threshold

---

### 18. **ECHO** - Repeat after me
**Purpose:** Internalize new beliefs through repetition  
**Example:** "Say this 3 times: I am worthy of rest"  
**UI:**  
- Display statement
- Voice record button
- Counter: 1/3, 2/3, 3/3
- Must record 3 times

**Psychology:**  
- Repetition creates neural pathways
- Speaking = embodiment
- Overcomes resistance through action
- Used in affirmation therapy

**Technical:**  
- Multiple voice recordings
- Save count of completions

---

### 19. **WITNESS** - Observe without response
**Purpose:** Practice non-reactivity, build observer self  
**Example:** "Just notice: You are angry. Don't change it. Just see it."  
**UI:**  
- Display statement
- Timer runs (10 seconds)
- No buttons
- Auto-advances when complete
- Subtle breathing animation

**Psychology:**  
- Mindfulness practice
- Separates observer from experience
- Reduces reactivity
- Foundation for emotional regulation

**Technical:**  
- Timer-based auto-advance
- Save duration witnessed

---

### 20. **CURVEBALL** - Unexpected format shift
**Purpose:** Break patterns, create surprise, test flexibility  
**Example:** Screen goes black → "In the silence, what emerges?"  
**UI Variations:**  
- Blank screen with one word after 3 seconds
- Inverted colors
- Sideways text
- Audio-only (no visual)
- Image-only (no text)

**Psychology:**  
- Disrupts habituation
- Tests adaptability
- Creates memorable moments
- Reveals automatic reactions

**Technical:**  
- Random format variations
- Special CSS transforms
- Track response to disruption

---

## 🧠 PSYCHOLOGY MAPPING

### Response Type → K-B-E Layer

| Type | Knowing | Believing | Embodying |
|------|---------|-----------|-----------|
| TAP | ✅ Quick assessment | - | - |
| SLIDER | ✅ Nuanced measure | - | - |
| ONE_WORD | ✅ Self-label | ✅ Claim identity | - |
| BINARY | - | ✅ Commitment | - |
| BREATH | - | - | ✅ Somatic |
| HOLD | - | - | ✅ Tolerance |
| VOICE10 | - | ✅ Spoken truth | ✅ Verbal embodiment |
| SORT | ✅ Clarify values | ✅ Choose priorities | - |
| BODY_MAP | ✅ Locate sensation | - | ✅ Somatic awareness |
| DIAL | ✅ Energy check | - | - |
| SPECTRUM | ✅ Complex mapping | - | - |
| MIRROR | - | ✅ Own words | ✅ Accountability |
| PARADOX | - | ✅ Hold complexity | ✅ Distress tolerance |
| ECHO | - | - | ✅ Repetition = wiring |
| WITNESS | - | - | ✅ Non-reactivity |

### Response Type → Mindset Change Mechanism

| Type | Change Mechanism |
|------|-----------------|
| TAP | Pattern recognition |
| SLIDER | Quantify internal state |
| ONE_WORD | Self-authoring |
| BINARY | Decisiveness |
| BREATH | Nervous system regulation |
| HOLD | Build capacity |
| VOICE10 | Authentic expression |
| SORT | Reveal true priorities |
| CONSTELLATION | Visualize relationships |
| TIMELINE | Contextualize beliefs |
| BODY_MAP | Mind-body connection |
| MIRROR | Confront cognitive dissonance |
| PARADOX | Dialectical thinking |
| ECHO | Neural pathway creation |
| WITNESS | Observer self development |

---

## 🎨 PRESENTATION VARIATIONS

### Visual Presentation Styles

1. **GLASS_CARD** (current default)
   - Glassmorphism
   - Pillar color accent
   - Blurred background

2. **FULL_IMAGE**
   - Background image fills screen
   - Text overlaid
   - For story shards, visual provocations

3. **MINIMAL_TEXT**
   - Black screen
   - Single line of white text
   - Maximum impact, minimal distraction

4. **SPLIT_SCREEN**
   - Two concepts side-by-side
   - Compare/contrast
   - Old belief vs new truth

5. **IMMERSIVE_VIDEO**
   - Short video clip (15-30s)
   - Soundbite overlay
   - Text appears at key moment

6. **ANIMATED_TEXT**
   - Words appear one at a time
   - Typewriter effect
   - Forces slower processing

---

## 🔄 TRANSITION PATTERNS

Between NaviCues, use varied transitions:

1. **FADE** - Gentle, safe
2. **SLIDE** - Directional, forward motion
3. **ZOOM** - Intensify, focus in
4. **FLIP** - Perspective shift
5. **DISSOLVE** - Let go, transform
6. **SNAP** - Curveball, interrupt

---

## 🎯 IMPLEMENTATION PRIORITIES

### Phase 1 (Core Expansion) - IMMEDIATE
Add these to complete psychological toolkit:
- ✅ VOICE10 (verbal processing)
- ✅ SORT (values clarification)
- ✅ BODY_MAP (somatic awareness)
- ✅ MIRROR (self-confrontation)

### Phase 2 (Advanced Formats) - SOON
- CONSTELLATION (relational mapping)
- TIMELINE (temporal context)
- PARADOX (complexity holding)
- WITNESS (non-reactivity)

### Phase 3 (Enhanced Delivery) - LATER
- ECHO (repetition practice)
- DIAL (intensity selection)
- SPECTRUM (two-axis mapping)
- CURVEBALL (pattern interruption)

---

## 📐 DESIGN SPECS FOR EACH NEW TYPE

### VOICE10
```typescript
interface Voice10Config {
  max_duration: 10; // seconds
  show_waveform: boolean;
  allow_playback: boolean;
  storage_location: 'navicue_responses' | 'supabase_storage';
}
```

### SORT
```typescript
interface SortConfig {
  items: string[]; // 3-5 items to sort
  instruction: string; // "Order by importance"
  orientation: 'vertical' | 'horizontal';
}
```

### BODY_MAP
```typescript
interface BodyMapConfig {
  regions: ('head' | 'chest' | 'gut' | 'hands' | 'legs')[];
  multi_select: boolean;
  intensity_levels?: boolean; // tap multiple times for intensity
}
```

### MIRROR
```typescript
interface MirrorConfig {
  reference_navicue_id: string; // Which NaviCue to pull response from
  days_ago_max: number; // How far back to look
  question: string; // "Is this still true?"
}
```

---

## 🧪 TESTING CRITERIA

Each new type should be tested for:

1. **Psychological Safety**
   - Does it feel invasive or supportive?
   - Can user skip if too intense?

2. **Engagement**
   - Is it more engaging than passive reading?
   - Does it prevent habituation?

3. **Insight Generation**
   - Does response reveal something user didn't consciously know?
   - Does it create "aha" moments?

4. **Technical Performance**
   - <100ms response time
   - Works on mobile + desktop
   - Graceful degradation if feature unsupported

5. **Data Quality**
   - Does response provide useful signal to LUMA?
   - Can it map to mindblock progress?

---

## 🎬 NEXT STEPS

1. **Build Phase 1 types** (VOICE10, SORT, BODY_MAP, MIRROR)
2. **Update NaviCue type definitions** to support new response types
3. **Create reusable response components** for each type
4. **Test with real therapeutic scenarios**
5. **Give LUMA ability to select format** based on:
   - K-B-E target
   - User state (regulated vs dysregulated)
   - Mindblock being addressed
   - Habituation prevention

---

**READY TO BUILD WHEN YOU CONFIRM WHICH TYPES TO START WITH** 🚀
