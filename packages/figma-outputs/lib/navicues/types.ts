/**
 * NAVICUE UNIFIED TYPES
 * Single source of truth for NaviCue data structures
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export type SparkFamily = 
  | "statement_mirror"
  | "belief_probe"
  | "identity_koan"
  | "paradox_prompt"
  | "story_shard"
  | "reframe_seed"
  | "curveball"
  | "practice";

export type Modality = "text" | "audio" | "soundbite" | "video" | "interactive";

export type ResponseType = 
  | "tap" 
  | "binary" 
  | "slider" 
  | "one_word" 
  | "voice" 
  | "breath" 
  | "hold" 
  | "none"
  | "voice10"
  | "sort"
  | "body_map"
  | "mirror"
  | "constellation"
  | "timeline"
  | "dial"
  | "spectrum"
  | "comparison"
  | "paradox"
  | "echo"
  | "witness"
  | "curveball";

export type KBELayer = "knowing" | "believing" | "embodying";

export type PillarId = "ER" | "SR" | "SC" | "CR" | "II" | "DM";

export type PresentationStyle =
  | "glass_card"
  | "full_image"
  | "minimal_text"
  | "split_screen"
  | "immersive_video"
  | "animated_text";

export type BackgroundType = "image" | "gradient" | "video" | "solid";

// ============================================================================
// NAVICUE INTERFACE
// ============================================================================

export interface NaviCue {
  // Identity
  id: string;
  name?: string;
  family: SparkFamily;
  
  // Content
  modality: Modality;
  text_line?: string;
  audio_asset?: string;
  video_asset?: string;
  soundbite_id?: string;
  interactive_component?: any;
  
  // Clinical foundation
  pillar_id: PillarId;
  pillar_name: string;
  pillar_color: string;
  concept_id?: string;
  concept_name?: string;
  theme_id?: string;
  theme_name?: string;
  
  // Response configuration
  response_type: ResponseType;
  response_options?: any;
  kbe_target: KBELayer;
  
  // Visual presentation
  presentation_style?: PresentationStyle;
  background_type?: BackgroundType;
  background_asset?: string;
  background_gradient?: string;
  background_color?: string;
  
  // Metadata
  tags?: string[];
  difficulty?: number; // 1-5
  duration_minutes?: number;
  intent_primary?: string;
  intent_secondary?: string;
  voice_archetype?: string;
  
  // Flags
  is_curveball?: boolean;
  requires_audio?: boolean;
  requires_video?: boolean;
  
  // Database fields (when synced)
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  status?: "draft" | "published" | "archived";
  version?: number;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface NaviCueFilters {
  pillar?: PillarId | PillarId[];
  concept?: string | string[];
  theme?: string | string[];
  tags?: string[];
  responseTypes?: ResponseType[];
  modalities?: Modality[];
  difficulty?: number | number[];
  durationMinutes?: number | number[];
  kbeLayer?: KBELayer | KBELayer[];
  family?: SparkFamily | SparkFamily[];
  voiceArchetype?: string | string[];
  excludeIds?: string[];
  schema?: string | string[]; // Schema filtering
  track?: string | string[]; // Track filtering (clinical, guru, infinite)
}

// ============================================================================
// PLAYER TYPES
// ============================================================================

export type PlayerMode = "filtered" | "luma" | "journey" | "single";

export interface PlayerState {
  mode: PlayerMode;
  queue: NaviCue[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  totalServed: number;
  totalCompleted: number;
  sessionStartTime: number;
  sessionDuration: number;
}

export interface PlayerFilters {
  filters: NaviCueFilters;
  userId?: string;
  sessionIntent?: string;
}

export interface PlayerProgress {
  totalServed: number;
  totalCompleted: number;
  byPillar: Record<PillarId, number>;
  byResponseType: Record<ResponseType, number>;
  sessionDuration: number;
  responses: Record<string, any>;
}

// ============================================================================
// LUMA TYPES
// ============================================================================

export interface LumaContext {
  userId: string;
  currentState?: "activated" | "regulated" | "exploring" | "integrating";
  recentPillars?: PillarId[];
  recentResponses?: any[];
  sessionIntent?: string;
  preferredModality?: Modality;
}

export interface LumaRecommendation {
  navicues: NaviCue[];
  reasoning?: string;
  adjustments?: string[];
  wisdomMessage?: string;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

export interface NaviCueResponse {
  navicueId: string;
  userId: string;
  responseType: ResponseType;
  responseData: any;
  timestamp: string;
  timeSpent: number;
  sessionId?: string;
}

// ============================================================================
// PILLAR DATA
// ============================================================================

export interface Pillar {
  id: PillarId;
  name: string;
  color: string;
  description: string;
  focus: string;
}

export const PILLARS: Record<PillarId, Pillar> = {
  ER: {
    id: "ER",
    name: "Emotional Regulation",
    color: "#EF4444",
    description: "State management, window of tolerance",
    focus: "Managing emotional states and nervous system regulation"
  },
  SR: {
    id: "SR",
    name: "Schema Revision",
    color: "#3B82F6",
    description: "Belief systems, core assumptions",
    focus: "Identifying and revising limiting beliefs"
  },
  SC: {
    id: "SC",
    name: "Self Compassion",
    color: "#10B981",
    description: "Inner kindness, common humanity",
    focus: "Developing compassionate self-relationship"
  },
  CR: {
    id: "CR",
    name: "Constructive Responsibility",
    color: "#F59E0B",
    description: "Agency without blame",
    focus: "Taking ownership without self-criticism"
  },
  II: {
    id: "II",
    name: "Integrated Identity",
    color: "#9333EA",
    description: "Coherent self-narrative",
    focus: "Building consistent sense of self"
  },
  DM: {
    id: "DM",
    name: "Decisive Momentum",
    color: "#8B5CF6",
    description: "Action, commitment, follow-through",
    focus: "Moving from intention to action"
  }
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface FetchNaviCuesParams {
  filters?: NaviCueFilters;
  count?: number;
  lumaContext?: LumaContext;
  userId?: string;
  excludeIds?: string[];
  shuffle?: boolean;
}

export interface NaviCueWithMetadata extends NaviCue {
  usageCount?: number;
  averageRating?: number;
  lastUsed?: string;
  completionRate?: number;
}