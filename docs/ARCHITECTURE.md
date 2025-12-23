# Recoverlution Platform Architecture

## System Overview

Recoverlution is built as a modern, scalable SaaS platform combining clinical excellence with cutting-edge technology.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  React + TypeScript + Vite + Tailwind (infiniteK)      │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS/WebSocket
                     │
┌────────────────────▼────────────────────────────────────┐
│                 Backend Services                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Supabase   │  │    Stripe    │  │  Edge Fns    │ │
│  │  PostgreSQL  │  │   Payments   │  │    (Hono)    │ │
│  │   Auth/RLS   │  │  Webhooks    │  │              │ │
│  │   Storage    │  │              │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Core Systems

### 1. LUMA AI Orchestration

**Five-Layer Interface System:**

```
Layer 5: Autonomous Decision Making
  ↓
Layer 4: Context-Aware Recommendations
  ↓
Layer 3: Pattern Recognition & Learning
  ↓
Layer 2: Data Collection & Analysis
  ↓
Layer 1: User Interaction Capture
```

**Responsibilities:**
- Personalized therapeutic pathways
- NaviCue delivery optimization
- User progress tracking
- Intervention timing
- Clinical outcome prediction

**Implementation:**
```typescript
interface LUMAContext {
  userId: string;
  sessionHistory: Session[];
  currentState: UserState;
  clinicalProfile: ClinicalProfile;
  navigationPatterns: NavigationPattern[];
}

interface LUMARecommendation {
  navicues: NaviCue[];
  deliveryMechanism: DeliveryMechanism;
  timing: TimingStrategy;
  priority: Priority;
  rationale: string;
}
```

---

### 2. Sound Bites System: 6 S's Architecture

**Organization:**
```
Sound Bites
├── YOUR VOICE (450 personal soundbites)
│   ├── STATION      - Primary recording hub
│   ├── SOUNDTRACKS  - Personal audio collections
│   ├── STORY        - Narrative recordings
│   ├── STICKYNOTES  - Quick voice memos
│   ├── SHELF        - Organized storage
│   └── SEARCH       - Intelligent discovery
│
└── LIBRARY (curated therapeutic content)
    ├── STATION      - Content hub
    ├── SOUNDTRACKS  - Curated collections
    ├── STORY        - Guided narratives
    ├── STICKYNOTES  - Quick tips
    ├── SHELF        - Organized library
    └── SEARCH       - Content discovery
```

**Data Model:**
```typescript
interface Soundbite {
  id: string;
  userId: string;
  category: 'YOUR_VOICE' | 'LIBRARY';
  sComponent: 'STATION' | 'SOUNDTRACKS' | 'STORY' | 'STICKYNOTES' | 'SHELF' | 'SEARCH';
  audioUrl: string;
  duration: number;
  transcript?: string;
  tags: string[];
  relatedNaviCues: string[];
  createdAt: Date;
  metadata: SoundbiteMetadata;
}
```

---

### 3. NaviCue Arsenal

**500 NaviCues** stored in `navicue_library` table.

**Database Schema:**
```sql
CREATE TABLE navicue_library (
  id UUID PRIMARY KEY,
  pillar_id UUID REFERENCES pillars(id),
  concept_id UUID REFERENCES concepts(id),
  theme_id UUID REFERENCES themes(id),
  mindblock_id UUID REFERENCES mindblocks(id),
  content TEXT NOT NULL,
  delivery_mechanisms TEXT[], -- Array of allowed mechanisms
  trigger_conditions JSONB,
  priority INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**20 Delivery Mechanisms:**

1. **Modal Overlay** - Full-screen focus
2. **Inline Contextual** - Within content flow
3. **Toast Notification** - Brief, non-intrusive
4. **Sidebar Panel** - Persistent reference
5. **Progressive Disclosure** - Expandable sections
6. **Tooltip Enhancement** - Hover interactions
7. **Animated Transition** - Motion-based reveals
8. **Voice Activation** - Audio trigger
9. **Scroll-Triggered** - Position-based
10. **Time-Delayed** - Scheduled appearance
11. **Interaction-Based** - Action-triggered
12. **Gamified Unlock** - Achievement-based
13. **Contextual Banner** - Page-specific
14. **Carousel Sequence** - Multi-step flow
15. **Sticky Header** - Always visible
16. **Bottom Sheet** - Mobile-optimized
17. **Spotlight Focus** - UI dimming
18. **Breadcrumb Integration** - Navigation-linked
19. **Floating Action** - Quick access button
20. **Embedded Widget** - Component integration

**Selection Algorithm:**
```typescript
function selectDeliveryMechanism(
  navicue: NaviCue,
  context: LUMAContext,
  userPreferences: UserPreferences
): DeliveryMechanism {
  // LUMA layer 4 decision logic
  // Consider:
  // - User attention state
  // - Device type (mobile/desktop)
  // - Previous interaction patterns
  // - NaviCue priority
  // - Therapeutic timing
}
```

---

### 4. Clinical Foundation: 6-Pillar Blueprint

**Taxonomy Hierarchy:**
```
Pillar (6 total)
└── Concept (multiple per pillar)
    └── Theme (multiple per concept)
        └── Mindblock (atomic unit)
```

**Data Relationships:**
```typescript
interface ClinicalHierarchy {
  pillar: {
    id: string;
    name: string;
    description: string;
    color: string; // Brand color from infiniteK
  };
  
  concepts: Array<{
    id: string;
    pillarId: string;
    name: string;
    description: string;
  }>;
  
  themes: Array<{
    id: string;
    conceptId: string;
    name: string;
    description: string;
  }>;
  
  mindblocks: Array<{
    id: string;
    themeId: string;
    content: string;
    transformationGoal: string;
    relatedNaviCues: string[];
  }>;
}
```

**User Progress Tracking:**
```typescript
interface UserProgress {
  userId: string;
  pillarProgress: Record<string, number>; // Pillar ID → completion %
  conceptProgress: Record<string, number>;
  themeProgress: Record<string, number>;
  mindblockProgress: Record<string, MindblockProgress>;
  lastUpdated: Date;
}

interface MindblockProgress {
  mindblockId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  attempts: number;
  lastInteraction: Date;
  navicuesViewed: string[];
  soundbitesCreated: string[];
}
```

---

## Database Schema

### Core Tables

```sql
-- Users (managed by Supabase Auth)
-- Extended with custom profile data

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  subscription_tier TEXT CHECK (subscription_tier IN ('foundation', 'professional')),
  stripe_customer_id TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clinical Taxonomy

CREATE TABLE pillars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pillar_id UUID REFERENCES pillars(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mindblocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  transformation_goal TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NaviCues

CREATE TABLE navicue_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pillar_id UUID REFERENCES pillars(id),
  concept_id UUID REFERENCES concepts(id),
  theme_id UUID REFERENCES themes(id),
  mindblock_id UUID REFERENCES mindblocks(id),
  content TEXT NOT NULL,
  delivery_mechanisms TEXT[],
  trigger_conditions JSONB,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sound Bites

CREATE TABLE soundbites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT CHECK (category IN ('YOUR_VOICE', 'LIBRARY')),
  s_component TEXT CHECK (s_component IN ('STATION', 'SOUNDTRACKS', 'STORY', 'STICKYNOTES', 'SHELF', 'SEARCH')),
  audio_url TEXT NOT NULL,
  duration INTEGER, -- seconds
  transcript TEXT,
  tags TEXT[],
  related_navicues UUID[],
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress

CREATE TABLE user_mindblock_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mindblock_id UUID REFERENCES mindblocks(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')),
  attempts INTEGER DEFAULT 0,
  last_interaction TIMESTAMPTZ,
  navicues_viewed UUID[],
  soundbites_created UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, mindblock_id)
);

-- LUMA Context

CREATE TABLE luma_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_start TIMESTAMPTZ DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  interactions JSONB,
  recommendations_generated JSONB,
  outcomes JSONB
);
```

---

## API Architecture

### Supabase Edge Functions

**Located in:** `/supabase/functions/`

**Key Functions:**

1. **luma-recommend** - Generate LUMA recommendations
2. **navicue-deliver** - Select and deliver NaviCues
3. **soundbite-process** - Process audio uploads
4. **progress-calculate** - Calculate user progress
5. **stripe-webhook** - Handle Stripe events

**Example Function Structure:**
```typescript
// /supabase/functions/luma-recommend/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const { userId, context } = await req.json();
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // LUMA recommendation logic
  const recommendations = await generateRecommendations(userId, context);
  
  return new Response(JSON.stringify(recommendations), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

---

## Frontend Architecture

### Component Organization

```typescript
// Feature-based structure
src/
├── features/
│   ├── luma/
│   │   ├── components/
│   │   │   ├── LUMADashboard.tsx
│   │   │   ├── RecommendationPanel.tsx
│   │   │   └── ProgressVisualization.tsx
│   │   ├── hooks/
│   │   │   ├── useLUMARecommendations.ts
│   │   │   └── useLUMAContext.ts
│   │   └── types/
│   │       └── luma.types.ts
│   │
│   ├── navicues/
│   │   ├── components/
│   │   │   ├── NaviCueModal.tsx
│   │   │   ├── NaviCueToast.tsx
│   │   │   └── DeliveryMechanisms/
│   │   ├── hooks/
│   │   │   └── useNaviCueDelivery.ts
│   │   └── delivery/
│   │       └── mechanismRegistry.ts
│   │
│   ├── soundbites/
│   │   ├── components/
│   │   │   ├── Station.tsx
│   │   │   ├── Soundtracks.tsx
│   │   │   ├── Story.tsx
│   │   │   ├── StickyNotes.tsx
│   │   │   ├── Shelf.tsx
│   │   │   └── Search.tsx
│   │   └── hooks/
│   │       ├── useAudioRecording.ts
│   │       └── useAudioPlayback.ts
│   │
│   └── clinical/
│       ├── components/
│       │   ├── PillarOverview.tsx
│       │   ├── ConceptExplorer.tsx
│       │   ├── ThemeDetail.tsx
│       │   └── MindblockCard.tsx
│       └── hooks/
│           └── useClinicalProgress.ts
```

### State Management

**Zustand for global state:**
```typescript
// stores/authStore.ts
import create from 'zustand';

interface AuthState {
  user: User | null;
  session: Session | null;
  subscriptionTier: 'foundation' | 'professional' | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  subscriptionTier: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
}));
```

---

## Security

### Row-Level Security (RLS)

All user data protected with RLS policies:

```sql
-- Example: Soundbites access control
ALTER TABLE soundbites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own soundbites"
  ON soundbites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own soundbites"
  ON soundbites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own soundbites"
  ON soundbites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own soundbites"
  ON soundbites FOR DELETE
  USING (auth.uid() = user_id);
```

---

## Deployment

### Environment Configuration

**Development:**
- Local Supabase instance (optional)
- Stripe test mode
- Local edge functions

**Production:**
- Supabase hosted (wzeqlkbmqxlsjryidagf)
- Stripe live mode
- Edge functions deployed
- CDN for static assets

---

## Performance Considerations

- **Code Splitting:** Route-based chunking
- **Lazy Loading:** Component-level lazy loading
- **Caching:** React Query for server state
- **Optimistic Updates:** Immediate UI feedback
- **Audio Optimization:** Compressed formats, streaming
- **Database Indexing:** Query optimization

---

## Monitoring & Analytics

- **Error Tracking:** Sentry integration
- **User Analytics:** Privacy-focused tracking
- **Performance Metrics:** Core Web Vitals
- **Clinical Outcomes:** Progress tracking dashboard

---

For more details, see:
- [Design System Documentation](DESIGN_SYSTEM.md)
- [Notion Workspace](https://www.notion.so/2d25a0fd01ef8161965bd978102f0e1b)