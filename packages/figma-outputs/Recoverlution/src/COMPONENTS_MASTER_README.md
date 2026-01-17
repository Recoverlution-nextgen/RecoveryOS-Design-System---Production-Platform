# RECOVERLUTION COMPONENTS MASTER DOCUMENTATION
## Complete Technical Reference for Design System Alignment

**Created:** January 17, 2026  
**Purpose:** Comprehensive component documentation for handover to design system alignment agent  
**Design System:** InfiniteK (4-color palette, no rounded corners, no card-on-card, no emojis, no dashes)  
**Architecture:** Three-tier (Frontend → Server → Database)

---

## TABLE OF CONTENTS

1. [Universal Player System](#1-universal-player-system)
2. [LUMA AI Orchestration Layer](#2-luma-ai-orchestration-layer)
3. [NaviCue Component Library](#3-navicue-component-library)
4. [Journey System](#4-journey-system)
5. [Therapy Page Components](#5-therapy-page-components)
6. [Marketing Home Page Components](#6-marketing-home-page-components)
7. [Platform Shell & Infrastructure](#7-platform-shell--infrastructure)
8. [Command Center 2 (CC2)](#8-command-center-2-cc2)
9. [Design System Tokens & Patterns](#9-design-system-tokens--patterns)

---

## 1. UNIVERSAL PLAYER SYSTEM

### 1.1 Core Component

**File:** `/components/universal-player/UniversalPlayer.tsx`

**Purpose:** Next-generation polymorphic content player that handles all content types with AI orchestration

**Architecture:**
```
UniversalPlayer (Shell)
├── PlayerHeader (Controls + Progress)
├── NaviCueRenderer (Content Display)
├── ResponseInterface (User Input)
├── WisdomOverlay (LUMA Insights)
└── PlayerCollapsed (Minimized State)
```

**Props Interface:**
```typescript
interface UniversalPlayerProps {
  // Mode configuration
  mode: 'single' | 'filtered' | 'luma' | 'journey';
  
  // Initial data
  initialNaviCues?: NaviCue[];
  initialNaviCueId?: string;
  
  // Filters (for filtered mode)
  filters?: {
    pillar?: string;
    schema?: string;
    heat?: 'RED' | 'AMBER' | 'GREEN';
    kbe?: 'Knowing' | 'Believing' | 'Embodying';
    tags?: string[];
  };
  
  // LUMA context (for AI mode)
  userId?: string;
  lumaContext?: {
    currentState: string;
    recentResponses: any[];
    activeGoals: string[];
    triggeredSchemas: string[];
  };
  
  // Journey data (for journey mode)
  journeyId?: string;
  sceneId?: string;
  
  // Callbacks
  onClose: () => void;
  onComplete?: () => void;
  onNaviCueComplete?: (navicue: NaviCue, response: any) => void;
  
  // UI configuration
  showProgress?: boolean;
  allowCollapse?: boolean;
  embedded?: boolean;
}
```

**Key Features:**
- **Mobile-first responsive design** (scales to desktop)
- **21 response types** (text, slider, spectrum, timeline, etc.)
- **5 content modalities** (prompt, practice, reflection, education, connection)
- **Infinite scroll** (auto-loads more content)
- **LUMA integration** (AI-driven content selection)
- **State persistence** (saves progress automatically)
- **Offline support** (queues responses when offline)

**Modes:**
1. **Single**: Display one NaviCue, then close
2. **Filtered**: Display NaviCues matching filters, infinite scroll
3. **LUMA**: AI-orchestrated content based on user state
4. **Journey**: Scripted content from journey scenes

### 1.2 Sub-Components

#### PlayerHeader
**File:** `/components/universal-player/PlayerHeader.tsx`

**Purpose:** Top bar with controls, progress, and metadata

**Features:**
- Close button
- Progress indicator (X of Y)
- Pillar indicator badge
- Collapse/expand toggle
- Journey context display

#### NaviCueRenderer
**File:** `/components/universal-player/NaviCueRenderer.tsx`

**Purpose:** Renders NaviCue content based on component type

**Supports 26+ Component Types:**
- AllowingGate
- BeliefProbe
- Curveball
- GenericPrompt
- GripScan
- IdentityKoan
- InventorySpark
- ParadoxKey
- ParadoxPrompt
- PartsRollcall
- Practice
- ProofStamp
- ProofStampCapture
- RecallCardCreate
- RecallCardReturn
- ReframeSeed
- ReleasePrompt
- RepairDraft
- SanghaPing
- SomaticMapTap
- StatementMirror
- StoryDrop
- StorySeed
- StoryShard
- TwoColumnReality
- ValuesFork
- WitnessSwitch

#### ResponseInterface
**File:** `/components/universal-player/ResponseInterface.tsx`

**Purpose:** Handles all user input types

**21 Response Types:**
1. **Text** - Free text input
2. **Slider** - 0-100 scale
3. **Spectrum** - Labeled scale (e.g., Never → Always)
4. **Timeline** - Past/Present/Future moments
5. **Body Map** - Interactive body diagram
6. **Dial** - Circular intensity selector
7. **Echo** - Record and playback
8. **Mirror** - Side-by-side comparison
9. **Paradox** - Choose between contradictions
10. **Sort** - Drag-and-drop ordering
11. **Constellation** - Multi-item relationship mapping
12. **Comparison** - A vs B evaluation
13. **Witness** - Observer perspective capture
14. **Voice** - Audio recording (10s limit)
15. **Curveball** - Unexpected pattern break
16. **MultiChoice** - Select multiple options
17. **SingleChoice** - Select one option
18. **YesNo** - Binary choice
19. **Rating** - 1-5 stars
20. **Sketch** - Drawing canvas
21. **Photo** - Camera capture

#### WisdomOverlay
**File:** `/components/universal-player/WisdomOverlay.tsx`

**Purpose:** Display LUMA-generated insights after responses

**Triggers:**
- After completing a NaviCue
- When user demonstrates insight
- When pattern detected
- When milestone reached

**Content Types:**
- Reflection prompts
- Encouragement messages
- Pattern recognition
- Skill celebration
- Next step suggestions

#### PlayerCollapsed
**File:** `/components/universal-player/PlayerCollapsed.tsx`

**Purpose:** Minimized player state (bottom of screen)

**Features:**
- Shows current content title
- Shows progress
- Tap to expand
- Swipe to close

### 1.3 Hooks

#### usePlayerQueue
**File:** `/components/universal-player/hooks/usePlayerQueue.ts`

**Purpose:** Manages content queue and loading

**Methods:**
```typescript
{
  currentNaviCue: NaviCue | null;
  nextNaviCue: NaviCue | null;
  progress: { current: number; total: number };
  hasMore: boolean;
  next: () => void;
  previous: () => void;
  loadMore: () => Promise<void>;
  reset: () => void;
}
```

#### usePlayerProgress
**File:** `/components/universal-player/hooks/usePlayerProgress.ts`

**Purpose:** Tracks and persists user progress

**Saves:**
- Completed NaviCues
- User responses
- Time spent
- Skip events
- Help requests

#### useLumaRecommend
**File:** `/components/universal-player/hooks/useLumaRecommend.ts`

**Purpose:** LUMA AI recommendation engine

**Algorithm:**
1. Analyze user state (arousal, schema activation, recent responses)
2. Calculate content scores based on:
   - State match (40%)
   - Schema targeting (30%)
   - Engagement history (20%)
   - Novelty factor (10%)
3. Return top 10 recommendations
4. Track effectiveness for learning

### 1.4 Content Types System

**NaviCue Contract:**
```typescript
interface NaviCue {
  id: string;
  navicue_key: string;
  component_type: string; // One of 26 types
  text_line: string; // Primary content
  response_type: string; // One of 21 types
  pillar_id: 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM';
  schema_id?: string;
  family_id?: string;
  mindblock_id?: string;
  heat_level?: 'RED' | 'AMBER' | 'GREEN';
  kbe_stage?: 'Knowing' | 'Believing' | 'Embodying';
  tags: string[];
  metadata?: {
    duration_seconds?: number;
    instructor?: string;
    audio_url?: string;
    image_url?: string;
    video_url?: string;
    background_image?: string;
    subtitle?: string;
    why_this?: string;
    clinical_note?: string;
  };
  created_at: string;
  updated_at: string;
}
```

---

## 2. LUMA AI ORCHESTRATION LAYER

### 2.1 LUMA Home (Command Center)

**File:** `/components/luma3/LumaHome.tsx`

**Purpose:** Main LUMA interface - AI companion home screen

**Architecture:**
```
┌─────────────────────────────────────┐
│         ANTENNA (Top 1/3)           │  Warm messages, mantra, insights
├─────────────────────────────────────┤
│        HORIZON (Middle 1/3)         │  3 content paths (LUMA choices)
├─────────────────────────────────────┤
│         GROUND (Bottom 1/3)         │  Actions, controls, navigation
└─────────────────────────────────────┘
```

**Three Zones:**

#### Antenna Zone
- Warm companion messages
- Today's mantra
- Celebration of progress
- Reflection prompts
- State acknowledgment

#### Horizon Zone
- **3 Content Paths** (AI-selected):
  - NaviCue suite
  - Practice
  - Journey scene
  - Reflection prompt
  - State check-in
- Each path shows:
  - Title
  - Description
  - Why LUMA chose it
  - Duration
  - Pillar indicator
  - Background image

#### Ground Zone
- Voice recording (SoundBite capture)
- Library access
- Navigation to VOICE/PLAY/TALK
- Help mode toggle
- Settings

**State Management:**
```typescript
const [mode, setMode] = useState<'navicue' | 'rescue'>('navicue');
const [currentPathIndex, setCurrentPathIndex] = useState(0);
const [isRecording, setIsRecording] = useState(false);
const [showLibrary, setShowLibrary] = useState(false);
const [wisdomResponse, setWisdomResponse] = useState<string | null>(null);
const [showDialogue, setShowDialogue] = useState(false);
const [showCareTeamModal, setShowCareTeamModal] = useState(false);
```

### 2.2 LUMA VOICE

**File:** `/components/luma3/LumaVoice.tsx`

**Purpose:** Voice journal and SoundBite management

**Features:**
- **Voice Recording** (10-second limit)
- **SoundBite Library** (all past recordings)
- **Transcription** (automatic via backend)
- **Tagging** (manual + AI-assisted)
- **Search** (by text, tag, date, state)
- **Playback** (with waveform visualization)
- **Export** (share with professional)
- **Analytics** (patterns over time)

**Recording Flow:**
1. Press and hold to record
2. Release to stop (or 10s auto-stop)
3. Preview playback
4. Add tags (optional)
5. Save to library
6. LUMA may respond with wisdom

**Data Structure:**
```typescript
interface SoundBite {
  id: string;
  user_id: string;
  audio_url: string;
  duration_ms: number;
  transcript: string | null;
  tags: string[];
  state_at_capture?: string;
  arousal_level?: number;
  schema_activation?: string[];
  created_at: string;
  shared_with?: string[]; // Professional IDs
}
```

### 2.3 LUMA PLAY

**File:** `/components/luma3/LumaPlay.tsx`

**Purpose:** Audio content player (soundtracks, guided practices, stories)

**Features:**
- **Soundtracks** (450 items across 6 pillars)
- **Stations** (curated playlists)
- **Stories** (narrative content)
- **Now Playing** (persistent mini-player)
- **Offline Mode** (download for offline)
- **Sleep Timer**
- **Playback Speed** (0.75x, 1x, 1.25x, 1.5x)

**Content Types:**

#### Soundtracks (450 items)
```typescript
interface Soundtrack {
  id: string;
  title: string;
  instructor: string;
  duration_seconds: number;
  pillar_id: string;
  tags: string[];
  audio_files: {
    male_voice?: string;
    female_voice?: string;
    instrumental?: string;
  };
  transcript?: string;
  description: string;
  background_image?: string;
}
```

#### Stations (Curated Collections)
- Morning Grounding
- Midday Reset
- Evening Wind-Down
- Crisis Support
- Sleep Prep
- Movement & Energy
- Pillar-specific stations (6 pillars)

#### Stories (Narrative Content)
- Recovery stories
- Metaphor libraries
- Wisdom teachings
- Clinical vignettes

**Player States:**
- Collapsed (bottom mini-player)
- Expanded (full-screen)
- Now Playing tab
- Library tab
- Settings tab

### 2.4 LUMA TALK

**File:** `/components/luma3/LumaTalk.tsx`

**Purpose:** Text dialogue with LUMA (AI conversation)

**Features:**
- **Natural Language** conversation
- **Context-Aware** responses (knows user state, history, goals)
- **Emotion Detection** (adjusts tone accordingly)
- **Crisis Detection** (escalates if needed)
- **Handoff to Human** (connect to care team)
- **Voice Input** (speech-to-text)
- **Suggested Prompts** (when user stuck)

**Conversation Types:**
1. **Check-in**: "How are you feeling?"
2. **Reflection**: "Tell me about that..."
3. **Skill Teaching**: "Let me explain..."
4. **Crisis Support**: "I'm here. You're safe."
5. **Goal Setting**: "What matters to you?"
6. **Pattern Recognition**: "I've noticed..."
7. **Celebration**: "You're doing it!"
8. **Handoff**: "Let me connect you..."

**Message Types:**
```typescript
interface LumaMessage {
  id: string;
  sender: 'user' | 'luma';
  text: string;
  timestamp: string;
  emotion?: string;
  suggested_actions?: string[];
  crisis_detected?: boolean;
  handoff_requested?: boolean;
}
```

### 2.5 LUMA Recommendation Engine

**File:** `/components/luma3/hooks/useNaviCueRecommendation.ts`

**Purpose:** AI algorithm for content selection

**Input Signals:**
1. **User State** (arousal, valence, activation)
2. **Schema Activation** (which mindblocks triggered)
3. **Recent Responses** (patterns in engagement)
4. **Time of Day** (morning vs evening)
5. **Goal Alignment** (active treatment goals)
6. **Engagement History** (what worked before)
7. **Completion Patterns** (what gets finished)
8. **Skip Patterns** (what gets avoided)

**Scoring Algorithm:**
```typescript
score = (
  state_match_score * 0.40 +
  schema_targeting_score * 0.30 +
  engagement_history_score * 0.20 +
  novelty_score * 0.10
)
```

**Output:**
- Top 10 recommendations
- Confidence scores
- Reasoning for each ("Why this now")
- Fallback options

---

## 3. NAVICUE COMPONENT LIBRARY

### 3.1 Overview

**Total Count:** 5,000 NaviCues across 4 batches
- Batch 1 (Clinical): 1,000 NaviCues
- Batch 2 (Clinical Extended): 1,000 NaviCues  
- Batch 3 (Guru Collections): 2,000 NaviCues
- Batch 4 (Infinite Domains): 1,000 NaviCues

**Component Types:** 26 unique types
**Response Types:** 21 unique types
**Pillars:** 6 (ER, SR, SC, CR, II, DM)

### 3.2 Component Type Catalog

#### 3.2.1 Core Prompts

**AllowingGate**
- **Purpose:** Non-forcing permission checkpoint
- **Example:** "If you're ready, we can look at this together. No rush."
- **Response:** YesNo or Skip
- **File:** `/components/navicues/components/AllowingGatePlayer.tsx`

**GenericPrompt**
- **Purpose:** Standard reflection question
- **Example:** "What am I avoiding right now?"
- **Response:** Text, Voice, or Spectrum
- **File:** `/components/navicues/components/GenericPromptPlayer.tsx`

**IdentityKoan**
- **Purpose:** Paradoxical identity exploration
- **Example:** "I am the one who..." (complete the sentence)
- **Response:** Text
- **File:** `/components/navicues/components/IdentityKoanPlayer.tsx`

**ParadoxPrompt**
- **Purpose:** Hold two contradictory truths
- **Example:** "I want to change AND I want to stay the same"
- **Response:** Paradox (both/and acknowledgment)
- **File:** `/components/navicues/components/ParadoxPromptPlayer.tsx`

**ReframeSeed**
- **Purpose:** Plant alternative interpretation
- **Example:** "What if this wasn't a failure but a redirection?"
- **Response:** Text or Mirror
- **File:** `/components/navicues/components/ReframeSeedPlayer.tsx`

#### 3.2.2 Assessment Types

**BeliefProbe**
- **Purpose:** Uncover limiting beliefs
- **Example:** "On a scale of 1-10, how much do you believe: 'I can't be trusted'?"
- **Response:** Slider
- **File:** `/components/navicues/components/BeliefProbePlayer.tsx`

**GripScan**
- **Purpose:** Assess emotional grip/intensity
- **Example:** "How tight is anxiety's grip on you right now?"
- **Response:** Dial (0-100)
- **File:** `/components/navicues/components/GripScanPlayer.tsx`

**SomaticMapTap**
- **Purpose:** Body awareness check-in
- **Example:** "Where do you feel this in your body?"
- **Response:** BodyMap
- **File:** `/components/navicues/components/SomaticMapTapPlayer.tsx`

**ValuesFork**
- **Purpose:** Values clarification
- **Example:** "In this moment, which matters more: Safety or Growth?"
- **Response:** SingleChoice + Reasoning
- **File:** `/components/navicues/components/ValuesForkPlayer.tsx`

#### 3.2.3 Intervention Types

**Curveball**
- **Purpose:** Pattern interrupt (unexpected perspective)
- **Example:** "Stop. What would your future self say about this?"
- **Response:** Curveball (pause + reflect)
- **File:** `/components/navicues/components/CurveballPlayer.tsx`

**Practice**
- **Purpose:** Guided practice (breathwork, grounding, etc.)
- **Example:** "Let's do 3 deep breaths together"
- **Response:** Completion + Rating
- **File:** `/components/navicues/components/PracticePlayer.tsx`

**ReleasePrompt**
- **Purpose:** Permission to let go
- **Example:** "What are you ready to release?"
- **Response:** Text + Symbolic Action
- **File:** `/components/navicues/components/ReleasePromptPlayer.tsx`

**RepairDraft**
- **Purpose:** Relationship repair scripting
- **Example:** "Draft what you'd say to repair this"
- **Response:** Text (editable template)
- **File:** `/components/navicues/components/RepairDraftPlayer.tsx`

**WitnessSwitch**
- **Purpose:** Perspective shift (observer stance)
- **Example:** "Describe this from 30,000 feet up"
- **Response:** Witness (detached observation)
- **File:** `/components/navicues/components/WitnessSwitchPlayer.tsx`

#### 3.2.4 Tracking Types

**InventorySpark**
- **Purpose:** Gratitude/resource inventory
- **Example:** "Name 3 things going well right now"
- **Response:** MultiChoice or Text List
- **File:** `/components/navicues/components/InventorySparkPlayer.tsx`

**PartsRollcall**
- **Purpose:** IFS-style parts identification
- **Example:** "What parts of you are present right now?"
- **Response:** MultiChoice (list of archetypes)
- **File:** `/components/navicues/components/PartsRollcallPlayer.tsx`

**ProofStamp**
- **Purpose:** Capture evidence of change
- **Example:** "Capture proof: You did something different"
- **Response:** Text + Photo (optional)
- **File:** `/components/navicues/components/ProofStampPlayer.tsx`

**ProofStampCapture**
- **Purpose:** Real-time moment capture
- **Example:** "Right now: What are you noticing?"
- **Response:** Text + Timestamp
- **File:** `/components/navicues/components/ProofStampCapturePlayer.tsx`

#### 3.2.5 Memory Types

**RecallCardCreate**
- **Purpose:** Create future reminder
- **Example:** "Write yourself a note to read in 30 days"
- **Response:** Text + Schedule
- **File:** `/components/navicues/components/RecallCardCreatePlayer.tsx`

**RecallCardReturn**
- **Purpose:** Deliver past reminder
- **Example:** "30 days ago you wrote: '[message]'"
- **Response:** Reflection on past self
- **File:** `/components/navicues/components/RecallCardReturnPlayer.tsx`

**StoryDrop**
- **Purpose:** Brief story/metaphor delivery
- **Example:** "There's a story about a farmer and two horses..."
- **Response:** Echo (what resonated)
- **File:** `/components/navicues/components/StoryDropPlayer.tsx`

**StorySeed**
- **Purpose:** Start a story (user continues)
- **Example:** "Once there was someone who forgot they were brave..."
- **Response:** Text (continue the story)
- **File:** `/components/navicues/components/StorySeedPlayer.tsx`

**StoryShard**
- **Purpose:** Wisdom fragment
- **Example:** "The wound is where the light enters"
- **Response:** Echo or Pass
- **File:** `/components/navicues/components/StoryShardPlayer.tsx`

#### 3.2.6 Connection Types

**SanghaPing**
- **Purpose:** Community connection prompt
- **Example:** "Share with community: What you learned this week"
- **Response:** Text (shareable)
- **File:** `/components/navicues/components/SanghaPingPlayer.tsx`

**StatementMirror**
- **Purpose:** Reflect user's own words back
- **Example:** "You said: 'I'm not enough'. Let's look at that."
- **Response:** Mirror (examine own statement)
- **File:** `/components/navicues/components/StatementMirrorPlayer.tsx`

**TwoColumnReality**
- **Purpose:** Compare story vs truth
- **Example:** "Column 1: Your story. Column 2: Observable facts."
- **Response:** Comparison (side-by-side)
- **File:** `/components/navicues/components/TwoColumnRealityPlayer.tsx`

#### 3.2.7 Advanced Types

**ParadoxKey**
- **Purpose:** Unlock insight via paradox
- **Example:** "Both are true: You are enough AND you can grow"
- **Response:** Paradox (hold both)
- **File:** `/components/navicues/components/ParadoxKeySafePlayer.tsx`

### 3.3 Response Type Catalog

All response components in: `/components/navicues/responses/`

1. **Text** - Free text input
2. **Voice** - 10-second audio recording
3. **Slider** - 0-100 scale
4. **Spectrum** - Labeled scale (e.g., Never → Always)
5. **Dial** - Circular intensity selector
6. **BodyMap** - Interactive body diagram
7. **Timeline** - Past/Present/Future moments
8. **Mirror** - Side-by-side comparison
9. **Paradox** - Both/and acknowledgment
10. **Echo** - What resonated
11. **Witness** - Observer perspective
12. **Curveball** - Pause + reflect
13. **Comparison** - A vs B evaluation
14. **Constellation** - Multi-item relationships
15. **Sort** - Drag-and-drop ordering
16. **MultiChoice** - Select multiple
17. **SingleChoice** - Select one
18. **YesNo** - Binary choice
19. **Rating** - 1-5 stars
20. **Sketch** - Drawing canvas
21. **Photo** - Camera capture

### 3.4 Pillar System

**6 Pillars of Clinical Framework:**

1. **ER - Emotional Regulation** (#FF6B6B)
   - Arousal management
   - Distress tolerance
   - Window of tolerance
   - Grounding techniques

2. **SR - Stress Resilience** (#4ECDC4)
   - Nervous system regulation
   - Adaptive coping
   - Resilience building
   - Recovery from activation

3. **SC - Social Connectivity** (#95E1D3)
   - Attachment repair
   - Relationship skills
   - Connection capacity
   - Belonging cultivation

4. **CR - Cognitive Reframing** (#FFD93D)
   - Thought awareness
   - Cognitive flexibility
   - Reappraisal skills
   - Meta-cognition

5. **II - Identity Integration** (#B983FF)
   - Self-concept repair
   - Values clarification
   - Identity coherence
   - Narrative authorship

6. **DM - Decision Mastery** (#6C5CE7)
   - Choice awareness
   - Values-aligned action
   - Executive function
   - Agency cultivation

### 3.5 Heat & KBE System

**Heat Levels** (Schema Activation Intensity):
- **RED**: High activation (acute distress, crisis)
- **AMBER**: Medium activation (discomfort, challenge)
- **GREEN**: Low activation (learning, exploration)

**KBE Stages** (Knowledge → Belief → Embodiment):
- **Knowing**: Intellectual understanding
- **Believing**: Emotional conviction
- **Embodying**: Behavioral integration

**Matrix:**
```
           │ Knowing      │ Believing    │ Embodying
───────────┼──────────────┼──────────────┼──────────────
RED        │ Psychoedu    │ Challenge    │ Crisis practice
AMBER      │ Exploration  │ Reframing    │ Real-world test
GREEN      │ Introduction │ Insight      │ Habit formation
```

### 3.6 Storage & Data Files

**Primary NaviCue Data Files:**
- `/lib/navicues/NAVICUE_1000_COMPLETE.ts` - Batch 1 (Clinical)
- `/lib/navicues/NAVICUE_2000_ARSENAL.ts` - Batch 2 (Clinical Extended)
- `/lib/navicues/NAVICUE_3000_COUNCIL.ts` - Batch 3 (Guru Collections)
- `/lib/navicues/NAVICUE_BATCH_4_2000.ts` - Batch 4 (Infinite Domains)

**Component Files:**
- `/components/navicues/components/` - 26 component type players
- `/components/navicues/responses/` - 21 response type handlers
- `/components/navicues/arsenal/` - Clinical batches by pillar
- `/components/navicues/batches-guru/` - Guru collections (Ram Dass, Alan Watts, etc.)
- `/components/navicues/batches-infinite/` - Infinite domain explorations

---

## 4. JOURNEY SYSTEM

### 4.1 Overview

**Purpose:** 64 therapeutic journey templates totaling 832 scenes

**Architecture:**
```
Journey (64 templates)
├── Week 1-4 (28 scenes each = 112 scenes per journey)
│   ├── Day 1-7 per week
│   │   ├── Scene 1: Seed (Introduction)
│   │   ├── Scene 2: Experience (Core Content)
│   │   ├── Scene 3: Reflection (Integration)
│   │   └── Scene 4: Accepted (Completion)
│   └── Week Completion Scene
└── Journey Completion Scene
```

**Total Math:**
- 64 journey templates
- 4 weeks per journey = 256 week-templates
- 7 days per week = 1,792 day-templates
- 4 scenes per day average
- BUT: Some scenes shared/reused
- **Net Total: 832 unique scenes**

### 4.2 Journey Architecture

**File:** `/components/journey-player/JourneyPlayer.tsx`

**ERA Framework** (Experience → Reflect → Accept):

#### E - Experience
- Core therapeutic content
- NaviCues, practices, education
- Sensory engagement
- Active participation
- Duration: 5-15 minutes

#### R - Reflect
- Integration prompts
- Journaling
- Meaning-making
- Connection to life
- Duration: 3-5 minutes

#### A - Accept
- Acknowledgment
- Completion ritual
- Forward commitment
- Celebration
- Duration: 1-2 minutes

### 4.3 Scene Types

**Seed Scene** (Day Start)
```typescript
interface SeedScene {
  scene_type: 'seed';
  title: string;
  subtitle: string;
  intention: string; // "Today we'll explore..."
  duration: number;
  background_image: string;
  pillar_id: string;
}
```

**Experience Scene** (Core Content)
```typescript
interface ExperienceScene {
  scene_type: 'experience';
  content_type: 'navicue' | 'practice' | 'video' | 'article';
  content_id: string;
  why_this: string; // Clinical reasoning
  background_image: string;
}
```

**Reflection Scene** (Integration)
```typescript
interface ReflectionScene {
  scene_type: 'reflection';
  prompts: string[];
  response_type: 'text' | 'voice' | 'drawing';
  guidance: string;
}
```

**Accepted Scene** (Completion)
```typescript
interface AcceptedScene {
  scene_type: 'accepted';
  completion_message: string;
  proof_capture?: boolean; // Capture evidence of change
  next_preview?: string; // Preview tomorrow
}
```

### 4.4 Journey Scene Components

**File Locations:**
- `/components/journey-immersive/WelcomeScene.tsx` - Seed scenes
- `/components/journey-immersive/PracticeScene.tsx` - Experience scenes
- `/components/journey-immersive/AcceptedScene.tsx` - Completion scenes
- `/components/JourneySceneRenderer.tsx` - Scene router

**Renderer Pattern:**
```typescript
function renderScene(scene: JourneyScene) {
  switch (scene.scene_type) {
    case 'seed':
      return <WelcomeScene {...scene} />;
    case 'experience':
      return renderExperienceContent(scene);
    case 'reflection':
      return <JourneyReflectionInput {...scene} />;
    case 'accepted':
      return <AcceptedScene {...scene} />;
    default:
      return <ErrorScene />;
  }
}
```

### 4.5 Journey Player UI Components

**JourneyProgressBar**
- **File:** `/components/JourneyProgressBar.tsx`
- Shows: Day X of 28, Week X of 4
- Visual: Horizontal bar with milestones

**JourneyTimeline**
- **File:** `/components/JourneyTimeline.tsx`
- Shows: Full 28-day timeline
- Visual: Vertical timeline with completed/upcoming days

**JourneyWeekView**
- **File:** `/components/JourneyWeekView.tsx`
- Shows: 7 days in current week
- Visual: Grid of day cards

**JourneyDayCard**
- **File:** `/components/JourneyDayCard.tsx`
- Shows: Single day summary
- States: Locked, Available, In Progress, Completed

**JourneyNowView**
- **File:** `/components/JourneyNowView.tsx`
- Shows: Current scene being experienced
- Full-screen immersive view

### 4.6 Journey Studio (CC2)

**File:** `/components/cc2/studios/JourneyStudio.tsx`

**Purpose:** Build, edit, and manage journey templates

**Features:**
- **Library Browser** - Browse 64 templates
- **Journey Builder** - Create new journeys
- **Scene Editor** - Edit individual scenes
- **Analytics** - Track engagement and outcomes
- **Schema Mapping** - Map journeys to clinical taxonomy

**Sub-Components:**
- `/components/cc2/studios/journey/JourneyLibraryBrowser.tsx`
- `/components/cc2/studios/journey/JourneyBuilder.tsx`
- `/components/cc2/studios/journey/JourneyPlayground.tsx`
- `/components/cc2/studios/journey/JourneyAnalytics.tsx`

### 4.7 Journey Data Structure

**Journey Template:**
```typescript
interface JourneyTemplate {
  id: string;
  journey_key: string;
  title: string;
  description: string;
  clinical_focus: string;
  target_schemas: string[];
  target_pillars: string[];
  duration_days: 28;
  weeks: JourneyWeek[];
  created_by: string;
  status: 'draft' | 'published' | 'archived';
}

interface JourneyWeek {
  week_number: 1 | 2 | 3 | 4;
  theme: string;
  days: JourneyDay[];
}

interface JourneyDay {
  day_number: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  scenes: JourneyScene[];
}

interface JourneyScene {
  scene_id: string;
  scene_type: 'seed' | 'experience' | 'reflection' | 'accepted';
  order: number;
  // ... type-specific fields
}
```

### 4.8 Journey User Progress

**User Journey Instance:**
```typescript
interface UserJourneyInstance {
  id: string;
  user_id: string;
  journey_id: string;
  started_at: string;
  current_week: number;
  current_day: number;
  current_scene: number;
  completed_scenes: string[];
  skipped_scenes: string[];
  paused_at?: string;
  completed_at?: string;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
}
```

---

## 5. THERAPY PAGE COMPONENTS

**File:** `/components/pages/MarketingTherapyPageV2.tsx`

**Purpose:** B2B2C marketing page for independent recovery professionals

**Target:** Therapists, recovery coaches, counselors

**Structure:** 16 sections

### 5.1 Hero Section

**Component:** `HeroClass` from `/components/marketing/universal/HeroClass.tsx`

**Content:**
- Headline: "The work holds between sessions"
- Subheadline: "Continuity platform for recovery professionals"
- CTA: "See How It Works" (scroll to Explore)
- Background: Gradient + subtle pattern

**Design:**
- Full viewport height
- Centered text
- Single CTA
- No imagery (just brand colors)

### 5.2 Intro Bridge (3 Tiles)

**Component:** `FlipTileClassWithFeatures` from `/components/marketing/universal/FlipTileClassWithFeatures.tsx`

**3 Tiles:**
1. **Continuity** 
   - Icon: Link
   - "Your work persists in the 167 hours between sessions"
   
2. **Neuroadaptive Progress**
   - Icon: Activity
   - "Real-time scaffolding adapts to each client's state"
   
3. **Ethical Economics**
   - Icon: DollarSign
   - "Get paid when clients grow, not when they stay sick"

**Design:**
- 3-column grid (desktop)
- Single column (mobile)
- Flip animation on hover
- Purple accent borders

### 5.3 Authority Section

**Component:** `TherapyAuthoritySection` from `/components/TherapyAuthoritySection.tsx`

**Content:**
- Headline: "Your work is deep. The week is noisy."
- 3 Problem Cards:
  1. Clients forget insights between sessions
  2. Crisis moments happen at 2am, not 2pm
  3. Real change requires daily practice, not weekly discussion

**Design:**
- Dark background
- 3 cards with icons
- Problem-focused language

### 5.4 Innovation Section

**Component:** `TherapyInnovationSectionV3` from `/components/TherapyInnovationSectionV3.tsx`

**Content:** "What Recoverlution IS"
- 4 concepts in 2×2 grid:
  1. **Installation** (not information)
  2. **Scaffolding** (not content)
  3. **Infrastructure** (not app)
  4. **Platform** (not tool)

**Design:**
- 2×2 grid
- Icon + title + description per card
- Hover states
- Conceptual (not feature-focused)

### 5.5 Delivery Section

**Component:** Custom section in MarketingTherapyPageV2.tsx

**Content:** "How Recoverlution delivers"
- 6 delivery mechanisms:
  1. Real-time state detection
  2. Adaptive content selection
  3. Crisis scaffolding
  4. Proof capture
  5. Professional dashboard
  6. Transfer architecture

**Design:**
- 2-column layout
- Icon + description
- Clinical language

### 5.6 Vehicle Section

**Component:** `TherapyVehicleSection` from `/components/TherapyVehicleSection.tsx`

**Content:** Complete platform architecture
- 5 deep-dive tiles:
  1. **Journey** - 28-day therapeutic arcs
  2. **NaviCues** - 5,000 micro-interventions
  3. **LUMA** - AI orchestration layer
  4. **6S Orbit** - Ambient support content
  5. **Rooms** - Collaborative spaces

**Design:**
- Expandable tiles
- Click to reveal details
- Platform architecture diagram
- Technical depth

### 5.7 Platform Layers

**Component:** `TherapyPlatformLayers` from `/components/therapy/TherapyPlatformLayers.tsx`

**Content:** Four-layer architecture visualization
```
┌─────────────────────────────────────┐
│     Command Center (Professionals)  │
├─────────────────────────────────────┤
│     LUMA (AI Orchestration)         │
├─────────────────────────────────────┤
│     6S Orbit (Ambient Content)      │
├─────────────────────────────────────┤
│     Rooms (Therapeutic Context)     │
└─────────────────────────────────────┘
```

**Design:**
- Stacked layers
- Hover reveals details
- Connection lines between layers
- Interactive exploration

### 5.8 Features Architecture

**Component:** `TherapyFeaturesArchitecture` from `/components/therapy/TherapyFeaturesArchitecture.tsx`

**Content:** Combined delivery + features
- 20+ feature cards organized by:
  1. Clinical Core
  2. Engagement Systems
  3. Professional Tools
  4. Safety & Compliance

**Design:**
- Categorized grid
- Filterable
- Search
- Feature detail modals

### 5.9 Clinical Evidence Bridge

**Component:** `ClinicalEvidenceBridge` from `/components/therapy/ClinicalEvidenceBridge.tsx`

**Content:** 4 efficacy stats
1. **73% reduction** in between-session crisis calls
2. **2.4x increase** in skill transfer to daily life
3. **89% completion rate** for therapeutic journeys
4. **64% reduction** in professional burnout

**Design:**
- 4 stat cards
- Large numbers
- Small context text
- Source citations (hover)

### 5.10 Getting Started

**Component:** `JourneyStepsFlow` from `/components/therapy/JourneyStepsFlow.tsx`

**Content:** 3 simple steps
1. **Create Account** - 2 minutes
2. **Invite Clients** - They download app
3. **See Progress** - Real-time dashboard

**Design:**
- Horizontal flow (desktop)
- Vertical flow (mobile)
- Numbered steps
- Arrow connectors

### 5.11 Pricing

**Component:** `PricingExperience` from `/components/therapy/PricingExperience.tsx`

**Content:** Two pricing paths
1. **Solo** - $49/month + $12/client/month
2. **Practice** - Custom pricing for 5+ professionals

**Design:**
- 2-column cards
- Feature comparison
- CTA buttons
- FAQ below

### 5.12 Trust & Safety

**Component:** Custom section in MarketingTherapyPageV2.tsx

**Content:** 3 trust cards
1. **HIPAA Compliant**
2. **SOC 2 Type II**
3. **Crisis Protocols**

**Design:**
- 3-column grid
- Shield icons
- Compliance badges

### 5.13 Your Practice (Outcomes)

**Component:** Custom section in MarketingTherapyPageV2.tsx

**Content:** What you keep/lose
- **Keep:**
  - Your therapeutic relationship
  - Your clinical judgment
  - Your economic freedom
- **Lose:**
  - Between-session anxiety
  - Unsupported crisis moments
  - Outcome invisibility

**Design:**
- 2-column layout
- Green (keep) vs Red (lose)
- Emotional language

### 5.14 Explore Component (THE WOW MOMENT)

**Component:** `VisualDiscoveryEngine` from `/components/discovery/VisualDiscoveryEngine.tsx`

**Purpose:** Interactive system exploration (NOT a chatbot)

**Architecture:**
```
Left Panel: Visual Navigation
- Category Grid (10 zones)
- Module Tiles (within category)
- Onwards Paths (from module)

Right Panel: Rich Content
- Module content (interactive)
- Deep dives
- Live demos
```

**10 Exploration Categories:**
1. **How It Works** - Platform architecture
2. **For Your Clients** - Patient experience
3. **For You** - Professional tools
4. **Clinical Foundation** - Science & method
5. **Content & Features** - What's included
6. **Getting Started** - Implementation
7. **Pricing & Economics** - Business model
8. **Safety & Compliance** - Trust & security
9. **Evidence** - Outcomes & research
10. **Common Questions** - FAQ

**Key Modules:**

#### Dual Perspective Module
**File:** `/components/discovery/modules/DualPerspectiveModule.tsx`
- Shows patient view + professional view side-by-side
- Interactive switching
- Live preview of both experiences

#### Journey Walkthrough Module
**File:** `/components/discovery/modules/JourneyWalkthroughModule.tsx`
- 28-day journey preview
- Click through scenes
- See actual content

#### Orchestration Visualization
**File:** `/components/discovery/modules/OrchestrationVisModule.tsx`
- LUMA decision tree visualization
- See how AI selects content
- Real-time state → content mapping

#### Feature Deep Dive Module
**File:** `/components/discovery/modules/FeatureDeepDiveModule.tsx`
- Expandable feature cards
- Video demos
- Technical specifications

#### Evidence Showcase Module
**File:** `/components/discovery/modules/EvidenceShowcaseModule.tsx`
- Research citations
- Outcome data visualizations
- Clinical validation

**Onwards Paths:**
- Each module offers 3-5 next steps
- "Learn more about..."
- "See how this works with..."
- "Compare to..."

**Chat Integration:**
- Optional chat panel (right side)
- Qualification questions
- Lead capture
- NOT the primary experience

### 5.15 Final CTA

**Component:** `FinalCTAClean` from `/components/FinalCTAClean.tsx`

**Content:**
- Headline: "Ready to transform your practice?"
- Single button: "Create Your Account"
- Subtext: "2-minute setup. No credit card required."

**Design:**
- Full-width section
- Centered content
- Purple gradient background
- One clear action

---

## 6. MARKETING HOME PAGE COMPONENTS

**File:** `/components/pages/MarketingHomePageV3.tsx`

**Purpose:** Main marketing landing page (B2C/B2B2C hybrid)

**Structure:** 13 sections

### 6.1 V3 Hero

**Component:** `V3Hero` from `/components/v3/home/V3Hero.tsx`

**Content:**
- Headline: "Recovery that adapts to you"
- Subheadline: "Real-time therapeutic platform"
- Primary CTA: "Start Free"
- Secondary CTA: "See How It Works"

**Design:**
- Full viewport
- Animated gradient background
- Floating UI elements
- Mobile-optimized

### 6.2 Atlas Constellation

**Component:** `AtlasConstellation` from `/components/v3/home/AtlasConstellation.tsx`

**Purpose:** Visual map of platform architecture

**Content:**
- Central node: "You"
- 4 orbital layers:
  1. Command Center (professionals)
  2. LUMA (AI)
  3. 6S Orbit (content)
  4. Rooms (context)
- Connection lines showing data flow

**Design:**
- Interactive SVG
- Hover reveals layer details
- Animated connections
- Dark background

### 6.3 Journey Constellation

**Component:** `JourneyConstellation` from `/components/v3/home/JourneyConstellation.tsx`

**Purpose:** Show 64 journeys as constellation

**Content:**
- 64 points (one per journey)
- Clustered by pillar
- Lines connecting related journeys
- Hover shows journey preview

**Design:**
- SVG constellation map
- Color-coded by pillar
- Interactive exploration
- Zoom capability

### 6.4 Compounding Particles

**Component:** `CompoundingParticles` from `/components/v3/home/CompoundingParticles.tsx`

**Purpose:** Visualize cumulative effect over time

**Content:**
- Animated particles representing daily engagement
- Particles accumulate into shapes
- "Small daily actions → Lasting change"

**Design:**
- Canvas animation
- Particle physics
- Metaphor for therapeutic compounding
- Mesmerizing visual

### 6.5 Continuity Timeline

**Component:** `ContinuityTimeline` from `/components/v3/home/ContinuityTimeline.tsx`

**Purpose:** Show 24/7 support vs 1hr/week therapy

**Content:**
- Traditional therapy: 1 hour per week
- Recoverlution: 168 hours per week
- Visual comparison

**Design:**
- Horizontal timeline
- Traditional (small slice) vs Recoverlution (full week)
- Animated reveal

### 6.6 Proof Waterfall

**Component:** `ProofWaterfall` from `/components/v3/home/ProofWaterfall.tsx`

**Purpose:** Show proof of change accumulating

**Content:**
- User actions → Proof stamps → Evidence ledger
- Waterfall visualization
- "Change becomes visible"

**Design:**
- Vertical flow
- Cascading proof items
- Animation on scroll
- Purple accent colors

### 6.7 Path Invitation

**Component:** `PathInvitation` from `/components/v3/home/PathInvitation.tsx`

**Purpose:** CTA to start journey

**Content:**
- "Choose your first path"
- 3 journey previews
- "Start today" button

**Design:**
- 3-column grid
- Journey cards with preview
- Hover effects
- Clear CTA

### 6.8 End of Information

**Component:** `EndOfInformation` from `/components/v3/home/EndOfInformation.tsx`

**Purpose:** Conceptual break (information → installation)

**Content:**
- "This is where information ends"
- "And installation begins"
- Philosophical transition

**Design:**
- Full-screen
- Minimal text
- Fade transition
- Moment of pause

### 6.9 Final Moment

**Component:** `FinalMoment` from `/components/v3/home/FinalMoment.tsx`

**Purpose:** Final CTA with emotional appeal

**Content:**
- "Your brain is waiting"
- Single CTA: "Begin"
- No more information

**Design:**
- Simple
- Emotional
- One action
- Clean exit

### 6.10 V3 Header

**Component:** `V3Header` from `/components/v3/layout/V3Header.tsx`

**Content:**
- Logo
- Navigation: Platform, Science, Professionals, Organizations, Pricing
- CTA: "Sign In" / "Start Free"

**Design:**
- Sticky header
- Transparent → Solid on scroll
- Mobile hamburger menu
- Clean typography

### 6.11 V3 Footer

**Component:** `V3Footer` from `/components/v3/layout/V3Footer.tsx`

**Content:**
- 4 columns:
  1. Product (Platform, Science, Pricing)
  2. For (Individuals, Professionals, Organizations)
  3. Company (Story, Privacy, Terms)
  4. Connect (Email, Social)
- Copyright
- Brand signature

**Design:**
- Dark background
- 4-column grid (desktop)
- Stacked (mobile)
- Minimal footprint

---

## 7. PLATFORM SHELL & INFRASTRUCTURE

### 7.1 Main App Shell

**File:** `/App.tsx`

**Purpose:** Root application component with routing

**Structure:**
```typescript
<UserProvider>
  <LumaPlayerProvider>
    <Router>
      {renderPage(currentPage)}
    </Router>
  </LumaPlayerProvider>
</UserProvider>
```

**Routing Logic:**
```typescript
const renderPage = (page: string) => {
  // Marketing pages
  if (page === '/') return <MarketingHomePageV3 />;
  if (page === '/therapy') return <MarketingTherapyPageV2 />;
  if (page === '/platform') return <MarketingPlatformPageV3 />;
  if (page === '/science') return <MarketingSciencePageV3 />;
  // ... etc
  
  // Platform pages (auth required)
  if (page === '/luma') return <LumaHome />;
  if (page === '/journey') return <JourneyHomePage />;
  if (page === '/cc2') return <CC2Page />;
  // ... etc
}
```

### 7.2 User Context

**File:** `/contexts/UserContext.tsx`

**Purpose:** Global user state management

**State:**
```typescript
interface UserContextValue {
  user: User | null;
  role: 'platform_admin' | 'org_admin' | 'professional' | 'patient';
  organizationId: string | null;
  professionalId: string | null;
  organizationName: string | null;
  professionalName: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
}
```

**RBAC Integration:**
- Determines visible pages
- Filters available features
- Controls data access scope

### 7.3 LUMA Player Context

**File:** `/contexts/LumaPlayerContext.tsx`

**Purpose:** Global player state (persistent across pages)

**State:**
```typescript
interface LumaPlayerContextValue {
  isPlaying: boolean;
  currentContent: NaviCue | Practice | Journey | null;
  queue: Content[];
  progress: number;
  play: (content: Content) => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  addToQueue: (content: Content) => void;
  clearQueue: () => void;
}
```

**Features:**
- Persists across page navigation
- Bottom mini-player when collapsed
- Full-screen when expanded
- Queue management

### 7.4 Navigation Components

#### Marketing Header
**File:** `/components/MarketingHeader.tsx`

**Used on:** All marketing pages

**Content:**
- Logo
- Nav links (Platform, Science, Professionals, etc.)
- CTA: "Sign In" / "Get Started"

**Design:**
- Sticky header
- Transparent → White on scroll
- Mobile menu
- Brand colors

#### Platform Footer
**File:** `/components/PlatformFooter.tsx`

**Used on:** All platform pages (inside app)

**Content:**
- Quick links
- Support
- Settings
- Version info

**Design:**
- Minimal
- Bottom of page
- Dark mode

#### Marketing Footer
**File:** `/components/MarketingFooter.tsx`

**Used on:** All marketing pages

**Content:**
- 4 columns (Product, For, Company, Connect)
- Social links
- Legal links (Privacy, Terms, Cookies)

**Design:**
- Dark background
- Multi-column layout
- Comprehensive

### 7.5 Design System Core Files

**Global Styles:** `/styles/globals.css`
```css
/* Design Tokens */
:root {
  /* Brand Colors */
  --color-dark-purple: #3E2BB8;
  --color-mid-purple: #5739FB;
  --color-light-purple: #7C67FF;
  --color-cyan-accent: #40E0D0;
  
  /* Pillar Colors */
  --color-er: #FF6B6B;
  --color-sr: #4ECDC4;
  --color-sc: #95E1D3;
  --color-cr: #FFD93D;
  --color-ii: #B983FF;
  --color-dm: #6C5CE7;
  
  /* Neutrals */
  --color-black: #0A0B0F;
  --color-zinc-950: #09090b;
  --color-zinc-900: #18181b;
  --color-zinc-800: #27272a;
  --color-white: #FFFFFF;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 48px;
  
  /* Border Radius */
  --radius-none: 0px; /* STRICT RULE: NO ROUNDED CORNERS */
  
  /* Borders */
  --border-width: 1px;
  --border-color: #27272a;
}

/* Global Resets */
* {
  border-radius: 0 !important; /* Enforce no rounded corners */
}
```

**Platform Styles:** `/styles/platform.css`
```css
/* infiniteK Design System Patterns */

/* The Anchor Rule: NO CARD ON CARD, NO TILE ON TILE, NO BORDER ON BORDER */
.card-wrapper {
  /* Cards have border */
  border: 1px solid var(--border-color);
  background: var(--color-zinc-900);
  padding: var(--space-lg);
}

.card-wrapper .inner-card {
  /* Inner content has NO border */
  border: none;
  background: transparent;
}

/* Tile Pattern */
.tile {
  border: 1px solid var(--border-color);
  background: var(--color-zinc-900);
  padding: var(--space-md);
  transition: all 0.2s;
}

.tile:hover {
  border-color: var(--color-mid-purple);
  background: var(--color-zinc-800);
}

/* NO nested borders */
.tile .tile {
  border: none; /* Prevents border-on-border */
}
```

**Journey Styles:** `/styles/journey.css`
**LUMA Styles:** `/styles/luma.css`
**Content Styles:** `/styles/content.css`
**Dashboard Styles:** `/styles/dashboard.css`

### 7.6 Universal Components (Marketing)

**Location:** `/components/marketing/universal/`

These are reusable marketing page building blocks:

#### HeroClass
**File:** `HeroClass.tsx`
- Full-viewport hero section
- Headline + Subheadline + CTA
- Background image/gradient support
- Centered or left-aligned

#### SubheroClass
**File:** `SubheroClass.tsx`
- Secondary hero section
- 2-column layout
- Image + text
- Stats display

#### TileClass
**File:** `TileClass.tsx`
- Single content tile
- Icon + Headline + Description
- Hover effects
- Click action

#### TileGridSectionClass
**File:** `TileGridSectionClass.tsx`
- Grid of TileClass components
- 2, 3, or 4 columns
- Responsive
- Section header

#### FlipTileClass
**File:** `FlipTileClass.tsx`
- Tile that flips on hover
- Front: Icon + Title
- Back: Description + CTA
- 3D flip animation

#### FlipTileClassWithFeatures
**File:** `FlipTileClassWithFeatures.tsx`
- Extended flip tile
- Front: Icon + Title
- Back: Feature list + CTA
- Hover state management

#### BookendSectionClass
**File:** `BookendSectionClass.tsx`
- Two-column section
- Image on left/right
- Content on opposite side
- Alternating pattern

#### BorderHeadlineClass
**File:** `BorderHeadlineClass.tsx`
- Headline with top/bottom borders
- Centered or left-aligned
- Accent color options
- Section divider

#### CentralisedHeadlineClass
**File:** `CentralisedHeadlineClass.tsx`
- Centered headline
- Subheadline support
- Max-width constraint
- Spacing control

#### TwoColumnHeadlineClass
**File:** `TwoColumnHeadlineClass.tsx`
- Headline on left
- Description on right
- Balanced layout
- Desktop/mobile responsive

#### LastSectionClass
**File:** `LastSectionClass.tsx`
- Final page section
- CTA focus
- Footer transition
- Spacious padding

**Usage Example:**
```typescript
import { HeroClass } from '../marketing/universal/HeroClass';
import { TileGridSectionClass } from '../marketing/universal/TileGridSectionClass';
import { FlipTileClassWithFeatures } from '../marketing/universal/FlipTileClassWithFeatures';

function MarketingPage() {
  return (
    <>
      <HeroClass
        headline="Transform Your Practice"
        subheadline="Real-time therapeutic platform"
        ctaText="Get Started"
        ctaAction={() => navigate('/signup')}
        backgroundImage="url(...)"
      />
      
      <TileGridSectionClass
        headline="Three Core Principles"
        tiles={[
          { icon: Zap, title: "Real-time", description: "..." },
          { icon: Brain, title: "Adaptive", description: "..." },
          { icon: Shield, title: "Safe", description: "..." },
        ]}
        columns={3}
      />
    </>
  );
}
```

### 7.7 Responsive System

**Breakpoints:**
```css
/* Mobile first approach */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Usage in Tailwind */
<div className="
  w-full           /* Mobile: full width */
  md:w-1/2         /* Tablet: half width */
  lg:w-1/3         /* Desktop: third width */
  px-4             /* Mobile: 16px padding */
  md:px-8          /* Tablet: 32px padding */
  lg:px-12         /* Desktop: 48px padding */
">
```

**Mobile Utilities:** `/utils/mobileResponsive.tsx`
```typescript
export const isMobile = () => window.innerWidth < 768;
export const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;
export const isDesktop = () => window.innerWidth >= 1024;

export const useMobileDetection = () => {
  const [isMobileView, setIsMobileView] = useState(isMobile());
  
  useEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobileView;
};
```

### 7.8 Image System

**Image with Fallback:** `/components/figma/ImageWithFallback.tsx`
```typescript
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, fallback, className }: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setImageSrc(fallback || '/placeholder.png')}
    />
  );
}
```

**Lazy Image:** `/components/LazyImage.tsx`
- Intersection Observer
- Blur-up effect
- Loading skeleton
- Error handling

**Asset Preloader:** `/components/AssetPreloader.tsx`
- Preload critical images
- Background preloading
- Cache management

---

## 8. COMMAND CENTER 2 (CC2)

**Complete technical documentation covered in previous document**

**Quick Reference:**

### 8.1 Core Files
- `/components/cc2/CC2Layout.tsx` - Main router
- `/components/cc2/CC2Nav.tsx` - Navigation
- `/components/cc2/CC2Home.tsx` - Dashboard
- `/components/cc2/SyntheticsStudio.tsx` - Synthetic data

### 8.2 Studios (45+)
- `/components/cc2/studios/RegistryStudio.tsx` - Content registry
- `/components/cc2/studios/NaviCueStudio.tsx` - NaviCue management
- `/components/cc2/studios/JourneyStudio.tsx` - Journey builder
- `/components/cc2/studios/ContentAssemblyLab.tsx` - Content assembly
- `/components/cc2/studios/MindblockStudio.tsx` - Mindblock editor
- `/components/cc2/studios/EventExplorer.tsx` - Event tracking
- `/components/cc2/studios/ProofLedger.tsx` - Proof of change
- `/components/cc2/studios/SimulationLab.tsx` - LUMA testing
- ... (see previous CC2 documentation for all 45+)

### 8.3 Shared Components
- `/components/cc2/shared/StatCard.tsx`
- `/components/cc2/shared/StudioCard.tsx`
- `/components/cc2/shared/DataTable.tsx`
- `/components/cc2/shared/FilterBar.tsx`
- `/components/cc2/shared/StudioHeader.tsx`

### 8.4 Multi-Tenancy
- Platform Admin: See all data
- Org Admin: See org data only
- Professional: See own data only

### 8.5 Backend Integration
**API Client:** `/utils/cc2-clinical-api.ts`

**Endpoints:**
- `/cc2/clinical/schemas` - Clinical schemas
- `/cc2/clinical/families` - Mindblock families
- `/cc2/clinical/mindblocks` - Mindblocks
- `/cc2/clinical/navicues` - NaviCues
- `/cc2/clinical/journeys` - Journeys
- `/cc2/stats` - Dashboard stats
- `/cc2/events` - Event tracking
- `/cc2/proofs` - Proof ledger

---

## 9. DESIGN SYSTEM TOKENS & PATTERNS

### 9.1 The Anchor Rule

**NO CARD ON CARD. NO TILE ON TILE. NO BORDER ON BORDER.**

**Explanation:**
- Only ONE level of visual containment per hierarchy
- If parent has border, children do NOT have borders
- If parent is a card, children are NOT cards
- Prevents visual nesting confusion

**Correct:**
```tsx
<div className="border border-zinc-800 p-6"> {/* Card */}
  <h2>Title</h2>
  <div className="bg-zinc-900 p-4"> {/* No border */}
    Content
  </div>
</div>
```

**Incorrect:**
```tsx
<div className="border border-zinc-800 p-6"> {/* Card */}
  <div className="border border-zinc-700 p-4"> {/* WRONG: border on border */}
    Content
  </div>
</div>
```

### 9.2 Color Palette (STRICT)

**Brand Colors (4 only):**
```typescript
const BRAND_COLORS = {
  darkPurple: '#3E2BB8',   // Primary brand
  midPurple: '#5739FB',    // Interactive elements
  lightPurple: '#7C67FF',  // Hover states
  cyanAccent: '#40E0D0',   // Accent/highlights
};
```

**Pillar Colors (6):**
```typescript
const PILLAR_COLORS = {
  ER: '#FF6B6B',  // Emotional Regulation
  SR: '#4ECDC4',  // Stress Resilience
  SC: '#95E1D3',  // Social Connectivity
  CR: '#FFD93D',  // Cognitive Reframing
  II: '#B983FF',  // Identity Integration
  DM: '#6C5CE7',  // Decision Mastery
};
```

**Neutrals:**
```typescript
const NEUTRALS = {
  black: '#0A0B0F',
  zinc950: '#09090b',
  zinc900: '#18181b',
  zinc800: '#27272a',
  zinc700: '#3f3f46',
  zinc600: '#52525b',
  zinc500: '#71717a',
  zinc400: '#a1a1aa',
  zinc300: '#d4d4d8',
  white: '#FFFFFF',
};
```

**NO OTHER COLORS ALLOWED**

### 9.3 Typography Scale

```css
--text-xs: 12px;     /* Captions, footnotes */
--text-sm: 14px;     /* Secondary text */
--text-base: 16px;   /* Body text */
--text-lg: 18px;     /* Emphasized body */
--text-xl: 20px;     /* Small headings */
--text-2xl: 24px;    /* Subheadings */
--text-3xl: 32px;    /* Headings */
--text-4xl: 48px;    /* Hero headings */
--text-5xl: 64px;    /* Marketing heroes */
```

**Font Families:**
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "SF Mono", Monaco, "Cascadia Code", monospace;
```

### 9.4 Spacing System

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

**Usage:**
- Use scale consistently
- No arbitrary values
- Mobile: smaller spacing
- Desktop: larger spacing

### 9.5 Border Radius (NONE)

```css
* {
  border-radius: 0 !important;
}
```

**Absolute rule: NO ROUNDED CORNERS**

### 9.6 Common Patterns

#### Card Pattern
```tsx
<div className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
  <h3 className="text-xl font-bold mb-4">Card Title</h3>
  <p className="text-zinc-400">Card content</p>
</div>
```

#### Button Pattern (Primary)
```tsx
<button className="px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors">
  Click Me
</button>
```

#### Button Pattern (Secondary)
```tsx
<button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors">
  Secondary Action
</button>
```

#### Input Pattern
```tsx
<input
  type="text"
  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#5739FB]"
  placeholder="Enter text..."
/>
```

#### Pillar Badge
```tsx
<span
  className="px-3 py-1 text-xs font-medium border"
  style={{
    backgroundColor: `${pillarColor}20`,
    borderColor: `${pillarColor}40`,
    color: pillarColor,
  }}
>
  {pillarName}
</span>
```

#### Stat Display
```tsx
<div className="text-center">
  <p className="text-4xl font-bold mb-2" style={{ color: '#5739FB' }}>
    {value}
  </p>
  <p className="text-sm text-zinc-400">{label}</p>
</div>
```

### 9.7 Animation Guidelines

**Transitions:**
```css
/* Standard transition */
transition: all 0.2s ease;

/* Hover states */
transition: background-color 0.2s, border-color 0.2s;

/* Color transitions */
transition-property: color, background-color, border-color;
transition-duration: 0.2s;
transition-timing-function: ease-in-out;
```

**Motion Library:** `motion/react` (Framer Motion)

**Common Animations:**
```tsx
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>

// Scale in
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
```

### 9.8 Accessibility

**ARIA Labels:**
```tsx
<button aria-label="Close dialog">
  <X className="w-5 h-5" />
</button>

<input
  type="text"
  aria-label="Search NaviCues"
  aria-describedby="search-help-text"
/>
```

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Tab order must be logical
- Focus states must be visible
- Escape key closes modals

**Color Contrast:**
- All text must meet WCAG AA standards
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text

### 9.9 Loading States

**Spinner:**
```tsx
<div className="flex items-center justify-center p-12">
  <Loader className="w-8 h-8 animate-spin text-[#5739FB]" />
</div>
```

**Skeleton:**
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-zinc-800 mb-2 w-3/4"></div>
  <div className="h-4 bg-zinc-800 mb-2 w-1/2"></div>
  <div className="h-4 bg-zinc-800 w-5/6"></div>
</div>
```

**Progress Bar:**
```tsx
<div className="w-full bg-zinc-800 h-1">
  <div
    className="bg-[#5739FB] h-1 transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
```

### 9.10 Error Handling

**Error Message:**
```tsx
<div className="bg-red-900/20 border border-red-900 p-4">
  <p className="text-red-400">{errorMessage}</p>
</div>
```

**Success Message:**
```tsx
<div className="bg-green-900/20 border border-green-900 p-4">
  <p className="text-green-400">{successMessage}</p>
</div>
```

**Warning Message:**
```tsx
<div className="bg-yellow-900/20 border border-yellow-900 p-4">
  <p className="text-yellow-400">{warningMessage}</p>
</div>
```

---

## 10. FILE ORGANIZATION SUMMARY

### Key Directories

```
/components/
├── /universal-player/     → Universal Player system
├── /luma3/                → LUMA AI (Home, Voice, Play, Talk)
├── /luma/                 → LUMA legacy components
├── /navicues/             → NaviCue component library
│   ├── /components/       → 26 component type players
│   ├── /responses/        → 21 response type handlers
│   ├── /arsenal/          → Clinical batches
│   └── /batches-guru/     → Guru collections
├── /journey-player/       → Journey player system
├── /journey-immersive/    → Journey scene components
├── /pages/                → All page components
│   └── MarketingTherapyPageV2.tsx
│   └── MarketingHomePageV3.tsx
├── /discovery/            → Visual Discovery Engine
│   └── /modules/          → Exploration modules
├── /cc2/                  → Command Center 2
│   ├── /studios/          → 45+ studios
│   ├── /shared/           → Shared CC2 components
│   └── /playground/       → Experimental features
├── /marketing/universal/  → Reusable marketing components
├── /v3/                   → V3 marketing components
├── /therapy/              → Therapy page specific
└── /figma/                → Figma import utilities

/lib/
├── /navicues/             → NaviCue data & utilities
│   ├── NAVICUE_1000_COMPLETE.ts
│   ├── NAVICUE_2000_ARSENAL.ts
│   ├── NAVICUE_3000_COUNCIL.ts
│   └── NAVICUE_BATCH_4_2000.ts
└── /types/                → TypeScript types

/styles/
├── globals.css            → Design tokens
├── platform.css           → Platform patterns
├── journey.css            → Journey styles
├── luma.css               → LUMA styles
└── content.css            → Content styles

/utils/
├── cc2-clinical-api.ts    → CC2 API client
├── rbac.ts                → Role-based access control
└── supabase/              → Supabase utilities

/contexts/
├── UserContext.tsx        → User state
└── LumaPlayerContext.tsx  → Player state

/supabase/functions/server/
├── index.tsx              → Main server entry
├── cc2-clinical.tsx       → CC2 clinical endpoints
├── cc2-stats.tsx          → CC2 stats endpoints
├── navicues.tsx           → NaviCue endpoints
├── journey-runtime.tsx    → Journey runtime
└── luma.tsx               → LUMA orchestration
```

---

## 11. HANDOVER CHECKLIST FOR DESIGN SYSTEM ALIGNMENT

### What the Agent Needs to Do:

#### Phase 1: Audit & Inventory
- [ ] Review all components for design system compliance
- [ ] Identify components using non-standard colors
- [ ] Identify components with rounded corners
- [ ] Identify border-on-border violations
- [ ] List all components using emojis
- [ ] List all components using dashes in UI text

#### Phase 2: Token Application
- [ ] Replace all color values with design tokens
- [ ] Enforce `border-radius: 0` globally
- [ ] Standardize spacing using spacing scale
- [ ] Standardize typography using type scale
- [ ] Apply consistent transition patterns

#### Phase 3: Component Standardization
- [ ] Ensure all cards follow card pattern
- [ ] Ensure all buttons follow button patterns
- [ ] Ensure all inputs follow input pattern
- [ ] Ensure all badges follow badge pattern
- [ ] Ensure loading states are consistent
- [ ] Ensure error states are consistent

#### Phase 4: Accessibility
- [ ] Add missing ARIA labels
- [ ] Verify keyboard navigation
- [ ] Check color contrast ratios
- [ ] Test with screen reader
- [ ] Ensure focus states visible

#### Phase 5: Documentation
- [ ] Document any new patterns found
- [ ] Create component usage guide
- [ ] Update design system documentation
- [ ] Create migration guide for developers

### Known Issues to Fix:

1. **Rounded Corners:**
   - Some imported Figma components may have rounded corners
   - Search for `border-radius` and replace with `0`

2. **Color Inconsistencies:**
   - Some components use arbitrary color values
   - Replace with design tokens

3. **Border Nesting:**
   - Some complex components violate anchor rule
   - Flatten visual hierarchy

4. **Typography Inconsistencies:**
   - Some components use arbitrary font sizes
   - Replace with type scale

5. **Spacing Inconsistencies:**
   - Some components use arbitrary padding/margin
   - Replace with spacing scale

### Priority Components for Review:

**High Priority:**
1. Universal Player (user-facing)
2. LUMA Home (user-facing)
3. Marketing Therapy Page (public)
4. Marketing Home Page (public)
5. Discovery Engine (public)

**Medium Priority:**
6. Journey Player
7. NaviCue Components (26 types)
8. CC2 Studios
9. Marketing Universal Components

**Low Priority:**
10. Admin tools
11. Debug components
12. Legacy components

---

## 12. FINAL NOTES

**Design System Name:** infiniteK

**Design Philosophy:**
- Minimal
- Functional
- No decoration for decoration's sake
- Information-first
- Therapeutic clarity

**Brand Personality:**
- Professional
- Clinical
- Trustworthy
- Sophisticated
- Calm

**NOT:**
- Playful
- Gamified
- Consumer-app-like
- Overly colorful
- Trendy

**Critical Rules:**
1. NO ROUNDED CORNERS
2. NO EMOJIS
3. NO DASHES IN UI TEXT
4. NO CARD ON CARD
5. 4 BRAND COLORS ONLY (+ 6 pillar colors)

**Three-Tier Architecture:**
```
Frontend (React/TypeScript)
    ↓
Server (Deno/Hono - Supabase Edge Functions)
    ↓
Database (PostgreSQL - Supabase)
```

**Nothing in frontend that isn't in backend.**
**All business logic flows through server.**

---

**END OF MASTER DOCUMENTATION**

*This document provides complete technical reference for all major component systems in Recoverlution platform. Use this as master reference for design system alignment, component refactoring, and development handover.*
