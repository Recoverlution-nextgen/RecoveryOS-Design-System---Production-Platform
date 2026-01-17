/**
 * UNIVERSAL CONTENT TAGS
 * 
 * Single source of truth for how backend + frontend tags marry.
 * This schema exposes the data landscape and shows how everything connects.
 * 
 * Philosophy: "Nothing is an island. Everything has purpose and power."
 * 
 * Created: December 26, 2025
 * Status: Foundation for Command Center Schema Exposure
 */

// ============================================================================
// CLINICAL TAXONOMY (The 6-Pillar Blueprint)
// ============================================================================

export type PillarID = 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM';

export const PILLARS = {
  ER: 'Emotional Regulation',
  SR: 'Stress Resilience',
  SC: 'Social Connectivity',
  CR: 'Cognitive Reframing',
  II: 'Identity Integration',
  DM: 'Decision Mastery',
} as const;

/**
 * Clinical taxonomy structure:
 * Pillar → Concept → Theme → Mindblock
 * 
 * Mindblocks are the atomic units of mindset transformation.
 */
export interface ClinicalTaxonomy {
  pillar: PillarID;
  pillar_name: string;
  concept?: string;      // Mid-level grouping
  theme?: string;        // Specific focus area
  mindblock?: string;    // Atomic belief shift (limiting belief → new truth)
}

// ============================================================================
// NAVICUE DELIVERY SYSTEM (The Arsenal)
// ============================================================================

/**
 * Three-layer transformation architecture:
 * KNOWING → BELIEVING → EMBODYING
 */
export type DeliveryLayer = 'knowing' | 'believing' | 'embodying';

export const DELIVERY_LAYERS = {
  knowing: 'KNOWING - Reveals implicit beliefs through behavioral probes',
  believing: 'BELIEVING - Generates prediction errors that update beliefs',
  embodying: 'EMBODYING - Makes new patterns automatic and part of identity',
} as const;

/**
 * 21 NaviCue Arsenal Types
 */
export type NaviCueArsenalType =
  // KNOWING (8 types)
  | 'belief_probe'
  | 'reaction_timer'
  | 'prediction_capture'
  | 'pattern_recognition'
  | 'decision_log'
  | 'implicit_association'
  | 'micro_moment_snapshot'
  | 'attention_tracker'
  // BELIEVING (7 types)
  | 'prediction_lab'
  | 'evidence_vault'
  | 'micro_experiment'
  | 'hypothesis_builder'
  | 'pattern_interrupt'
  | 'safe_contradiction'
  | 'belief_ladder'
  // EMBODYING (6 types)
  | 'automaticity_tracker'
  | 'identity_receipt'
  | 'transfer_trainer'
  | 'integration_ritual'
  | 'embodiment_practice'
  | 'future_self_simulator'
  // CROSS-LAYER (1 type)
  | 'belief_journey_map';

export interface NaviCueDelivery {
  delivery_layer: DeliveryLayer;
  arsenal_type: NaviCueArsenalType;
  response_format: string;  // Which component renders this
  duration_seconds?: number; // Expected interaction time
}

// ============================================================================
// VOICE ARCHETYPE (Who's speaking)
// ============================================================================

export type VoiceArchetype =
  | 'ram_dass'           // Compassionate wisdom, "we're all just walking each other home"
  | 'alan_watts'         // Paradox and humor, "you are the universe experiencing itself"
  | 'pema_chodron'       // Gentle confrontation, "lean into the sharp points"
  | 'thich_nhat_hanh'    // Mindful presence, "breathe, you are alive"
  | 'jack_kornfield'     // Storytelling warmth, "after the ecstasy, the laundry"
  | 'clinical'           // Evidence-based, therapeutic voice
  | 'quantum'            // Physics metaphors, reality-bending
  | 'music'              // Rhythm, harmony, resonance
  | 'neutral';           // Default platform voice

export const VOICE_ARCHETYPES: Record<VoiceArchetype, string> = {
  ram_dass: 'Ram Dass - Compassionate wisdom',
  alan_watts: 'Alan Watts - Paradox and humor',
  pema_chodron: 'Pema Chödrön - Gentle confrontation',
  thich_nhat_hanh: 'Thích Nhất Hạnh - Mindful presence',
  jack_kornfield: 'Jack Kornfield - Storytelling warmth',
  clinical: 'Clinical - Evidence-based therapeutic',
  quantum: 'Quantum - Physics metaphors',
  music: 'Music - Rhythm and resonance',
  neutral: 'Neutral - Default platform voice',
};

// ============================================================================
// USER STATE (Who's receiving)
// ============================================================================

/**
 * E/C/C State System (Emotional / Cognitive / Craving)
 * Each measured 1-10
 */
export interface UserState {
  emotional: number;      // 1-10: Emotional intensity
  cognitive: number;      // 1-10: Cognitive clarity
  craving: number;        // 1-10: Urge intensity
  timestamp: string;      // ISO timestamp
  context?: string;       // Optional: where/why logged
}

/**
 * Treatment stage (journey phase)
 */
export type TreatmentStage =
  | 'intake'
  | 'stabilization'
  | 'active'
  | 'maintenance'
  | 'alumni';

// ============================================================================
// CONTENT TYPES (What's being delivered)
// ============================================================================

export type ContentType =
  | 'navicue'
  | 'article'
  | 'insight'
  | 'practice'
  | 'wellbeing_video'
  | 'journey'
  | 'soundbite'
  | 'dialogue';

export const CONTENT_TYPES: Record<ContentType, string> = {
  navicue: 'NaviCue - Micro-intervention',
  article: 'Article - Long-form education',
  insight: 'Insight - Key concept',
  practice: 'Practice - Guided exercise',
  wellbeing_video: 'Wellbeing Video - Visual guide',
  journey: 'Journey - Multi-week program',
  soundbite: 'SoundBite - Voice note capture',
  dialogue: 'Dialogue - Conversational AI',
};

// ============================================================================
// UNIVERSAL CONTENT TAGS (The marriage of all systems)
// ============================================================================

/**
 * This is the schema that marries backend + frontend.
 * Every piece of content can be tagged with these attributes.
 */
export interface UniversalContentTags {
  // WHAT (Clinical classification)
  clinical: ClinicalTaxonomy;

  // HOW (Delivery mechanism)
  delivery?: NaviCueDelivery;

  // WHO (Voice and target)
  voice?: {
    archetype: VoiceArchetype;
    tone?: string;  // Optional: specific tone variation
  };

  // WHEN (Context and state)
  context?: {
    optimal_state?: Partial<UserState>;  // Best state for this content
    treatment_stage?: TreatmentStage[];  // Which stages is this for
    time_of_day?: 'morning' | 'afternoon' | 'evening' | 'night' | 'any';
  };

  // WHY (Intent and outcome)
  intent?: {
    primary_goal: string;       // What this achieves
    mechanisms?: string[];      // How it works (neuroscience)
    expected_shift?: string;    // What changes
  };

  // WHERE (Platform location)
  platform?: {
    content_type: ContentType;
    featured?: boolean;         // Highlighted in UI
    prerequisites?: string[];   // What comes before
    follows_up?: string[];      // What comes after
  };

  // RELATIONSHIPS (The web)
  relationships?: {
    linked_navicues?: string[];     // Related NaviCues
    linked_practices?: string[];    // Related practices
    linked_articles?: string[];     // Related articles
    linked_journeys?: string[];     // Related journeys
    linked_insights?: string[];     // Related insights
  };

  // METADATA
  meta?: {
    created_at: string;
    updated_at: string;
    created_by?: string;
    version?: number;
    status?: 'draft' | 'review' | 'published' | 'archived';
    tags?: string[];  // Freeform searchable tags
  };
}

// ============================================================================
// DATABASE SCHEMA MAPPING
// ============================================================================

/**
 * Maps database tables to their tag structure
 */
export interface DatabaseSchemaMap {
  table_name: string;
  content_type: ContentType;
  primary_key: string;
  tag_columns: {
    clinical: string[];     // Which columns store clinical taxonomy
    delivery: string[];     // Which columns store delivery info
    voice: string[];        // Which columns store voice info
    state: string[];        // Which columns store state info
    relationships: string[]; // Which columns store relationships
  };
  has_jsonb: boolean;       // Does this table use JSONB for flexibility?
  jsonb_columns?: string[]; // Which columns are JSONB
}

/**
 * Current schema (as of Dec 26, 2025)
 */
export const SCHEMA_MAP: DatabaseSchemaMap[] = [
  {
    table_name: 'navicues',
    content_type: 'navicue',
    primary_key: 'id',
    tag_columns: {
      clinical: ['pillar_id', 'family', 'family_name'],
      delivery: ['modality', 'duration_seconds', 'practice_liquidity_score'],
      voice: [], // NOT YET IMPLEMENTED
      state: [],  // NOT YET IMPLEMENTED
      relationships: [], // Uses navicue_mindblocks join table
    },
    has_jsonb: false,
    jsonb_columns: [],
  },
  {
    table_name: 'navicue_library',
    content_type: 'navicue',
    primary_key: 'id',
    tag_columns: {
      clinical: ['pillar_id'], // PARTIAL - needs concept/theme/mindblock
      delivery: ['type_id'],    // PARTIAL - needs delivery_layer, arsenal_type
      voice: [],                // NOT YET IMPLEMENTED
      state: [],                // NOT YET IMPLEMENTED
      relationships: [],        // NOT YET IMPLEMENTED
    },
    has_jsonb: true,
    jsonb_columns: ['content'], // Currently stores everything in JSONB
  },
  {
    table_name: 'articles',
    content_type: 'article',
    primary_key: 'id',
    tag_columns: {
      clinical: ['pillar_id'],
      delivery: [],
      voice: [],
      state: [],
      relationships: [], // Uses article_mindblocks join table
    },
    has_jsonb: true,
    jsonb_columns: ['content'],
  },
  {
    table_name: 'insights',
    content_type: 'insight',
    primary_key: 'id',
    tag_columns: {
      clinical: ['pillar_id'],
      delivery: [],
      voice: [],
      state: [],
      relationships: [], // Uses insight_mindblocks join table
    },
    has_jsonb: true,
    jsonb_columns: ['content'],
  },
  {
    table_name: 'practices',
    content_type: 'practice',
    primary_key: 'id',
    tag_columns: {
      clinical: ['pillar_id'],
      delivery: ['duration_minutes'],
      voice: [],
      state: [],
      relationships: [], // Uses practice_mindblocks join table
    },
    has_jsonb: true,
    jsonb_columns: ['steps', 'variations'],
  },
  {
    table_name: 'wellbeing_videos',
    content_type: 'wellbeing_video',
    primary_key: 'id',
    tag_columns: {
      clinical: ['category'],  // WEAK - not aligned to pillars
      delivery: ['duration_seconds'],
      voice: [],
      state: [],
      relationships: [], // Uses wellbeing_mindblocks join table
    },
    has_jsonb: false,
    jsonb_columns: [],
  },
  {
    table_name: 'journeys',
    content_type: 'journey',
    primary_key: 'id',
    tag_columns: {
      clinical: ['primary_pillar'],
      delivery: ['total_weeks'],
      voice: [],
      state: [],
      relationships: ['journey_weeks', 'journey_days'], // Related tables
    },
    has_jsonb: true,
    jsonb_columns: ['settings'], // Journey-level settings
  },
];

// ============================================================================
// TAGGING STATUS REPORT
// ============================================================================

/**
 * Shows which content has which tags
 */
export interface TaggingStatus {
  content_type: ContentType;
  total_items: number;
  tagged: {
    clinical: number;     // Items with pillar/concept/theme/mindblock
    delivery: number;     // Items with delivery layer/arsenal type
    voice: number;        // Items with voice archetype
    state: number;        // Items with optimal state
    relationships: number; // Items with relationships
  };
  coverage: {
    clinical: number;     // % tagged
    delivery: number;
    voice: number;
    state: number;
    relationships: number;
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get pillar name from ID
 */
export function getPillarName(pillarId: PillarID): string {
  return PILLARS[pillarId];
}

/**
 * Get voice archetype description
 */
export function getVoiceDescription(archetype: VoiceArchetype): string {
  return VOICE_ARCHETYPES[archetype];
}

/**
 * Get content type name
 */
export function getContentTypeName(type: ContentType): string {
  return CONTENT_TYPES[type];
}

/**
 * Check if content is fully tagged
 */
export function isFullyTagged(tags: UniversalContentTags): boolean {
  return !!(
    tags.clinical.pillar &&
    tags.clinical.concept &&
    tags.clinical.theme &&
    tags.clinical.mindblock &&
    tags.delivery?.delivery_layer &&
    tags.delivery?.arsenal_type &&
    tags.voice?.archetype &&
    tags.context?.optimal_state
  );
}

/**
 * Get tagging completion percentage
 */
export function getTaggingCompletion(tags: UniversalContentTags): number {
  const checks = [
    !!tags.clinical.pillar,
    !!tags.clinical.concept,
    !!tags.clinical.theme,
    !!tags.clinical.mindblock,
    !!tags.delivery?.delivery_layer,
    !!tags.delivery?.arsenal_type,
    !!tags.voice?.archetype,
    !!tags.context?.optimal_state,
    !!tags.relationships && Object.keys(tags.relationships).length > 0,
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}
