/**
 * NAVICUE UNIVERSAL CONTRACT
 * 
 * Shared types between Supabase + Frontend
 * This is the single source of truth for NaviCue rendering
 * 
 * Version: 1.0.0
 */

// ============================================================================
// PRIMITIVES
// ============================================================================

export type KbeLayer = "K" | "B" | "E";
export type Tier = "hot" | "warm" | "cool";
export type NavicueStatus = "draft" | "active" | "archived";

export type CouncilLens =
  | "mate"
  | "bill_w"
  | "watts"
  | "ram_dass"
  | "therapist"
  | "hawkins"
  | "system";

export type BrainCoordinate = {
  schema_id?: string;
  family_id?: string;
  mindblock_id?: string;
  context_key?: string;
  mechanism_key?: string;
  kbe_target?: KbeLayer;
};

export type StateSnapshot = {
  heat?: number;           // 0–10
  fusion?: number;         // 0–10
  resistance?: number;     // 0–10
  choice_access?: number;  // 0–10
  shame_intensity?: number;
  connection?: number;
  certainty?: number;
  [k: string]: unknown;
};

// ============================================================================
// COMPONENT TYPES (The Innovation Layer)
// ============================================================================

// Import the full 200-component taxonomy
import type { NaviCue200ComponentType } from './navicue-200-taxonomy';

export type ComponentType = NaviCue200ComponentType;

// ============================================================================
// RESPONSE TYPES (How User Interacts)
// ============================================================================

export type ResponseType =
  | "none"
  | "binary"
  | "choice_single"
  | "choice_multi"
  | "slider_0_10"
  | "rank_3"
  | "text_1line"
  | "text_short"
  | "voice_10s"
  | "voice_30s"
  | "checklist"
  | "draft_message"
  | "tap_region"
  | "side_choice";

// ============================================================================
// COPY PAYLOAD (Variant)
// ============================================================================

export type NavicueCopy = {
  headline?: string;
  body?: string;
  prompt?: string;
  helper?: string;
  microcopy?: string;
  options?: string[];
  left_label?: string;   // Two-column
  right_label?: string;
  left_text?: string;
  right_text?: string;
  thread_steps?: string[]; // Micro-thread
  [k: string]: unknown;
};

export type NavicueVariant = {
  variant_id: string;
  lens: CouncilLens;
  language: string;
  copy: NavicueCopy;
  is_default: boolean;
  version: number;
};

// ============================================================================
// TARGET PAYLOAD (Schema/Mindblock Mapping)
// ============================================================================

export type TargetScopeType = 
  | "schema" 
  | "family" 
  | "mindblock" 
  | "theme" 
  | "concept" 
  | "pillar" 
  | "global";

export type NavicueTarget = {
  scope_type: TargetScopeType;
  schema_id?: string;
  family_id?: string;
  mindblock_id?: string;
  pillar_id?: string;
  concept_id?: string;
  theme_id?: string;
  weight: number;
  is_primary: boolean;
  brain_coordinate?: BrainCoordinate;
};

// ============================================================================
// COMPONENT CONFIGS (Strongly Typed)
// ============================================================================

export type TwoColumnRealityConfig = {
  left_label?: string;
  right_label?: string;
  left_text?: string;
  right_text?: string;
  response_mode?: "choose_side" | "rank" | "slider";
};

export type PartsRollcallConfig = {
  parts: Array<{ key: string; label: string; icon?: string }>;
  allow_custom?: boolean;
};

export type ValuesForkConfig = {
  optionA: { label: string; description?: string };
  optionB: { label: string; description?: string };
  optionC?: { label: string; description?: string };
};

export type MicroThread3Config = {
  steps: Array<{
    component_type: ComponentType;
    response_type: ResponseType;
    config?: Record<string, unknown>;
  }>;
};

export type SomaticMapConfig = {
  regions: string[];
  measure_grip?: boolean;
  measure_temperature?: boolean;
};

export type RecallCardConfig = {
  max_chars?: number;
  suggestions?: string[];
  template?: string;
};

export type RepairDraftConfig = {
  tones: Array<{ key: string; label: string }>;
  channels: Array<{ key: string; label: string }>;
  sizes: Array<{ key: string; label: string }>;
};

export type ProofStampConfig = {
  proof_types: Array<{ key: string; label: string }>;
  allow_note?: boolean;
  allow_photo?: boolean;
};

export type SanghaPingConfig = {
  options: Array<{ key: string; label: string; action: string }>;
};

// ============================================================================
// UNIVERSAL PLAYER DTO (What FE Fetches)
// ============================================================================

export type NavicueStep = {
  step_index: number;
  component_type: ComponentType;
  response_type: ResponseType;
  config: Record<string, unknown>;
};

export type NavicuePlayerDTO = {
  navicue_id: string;
  code?: string;
  status: NavicueStatus;
  
  kbe_layer?: KbeLayer;
  tier?: Tier;
  family?: string;
  
  component_type: ComponentType;
  default_response_type: ResponseType;
  
  intent?: string;
  safety_notes?: string;
  
  config: Record<string, unknown>;
  analytics_config: Record<string, unknown>;
  tags: string[];
  
  variants: NavicueVariant[];
  targets: NavicueTarget[];
  steps?: NavicueStep[];
  
  // Metadata
  created_at?: string;
  updated_at?: string;
};

// ============================================================================
// DEPLOYMENT + RESPONSE (Runtime)
// ============================================================================

export type NavicueDeploymentDTO = {
  deployment_id: string;
  individual_id: string;
  organization_id?: string;
  
  navicue_id: string;
  variant_id?: string;
  
  tier?: Tier;
  state_pre: StateSnapshot;
  brain_coordinate?: BrainCoordinate;
  rationale: {
    one_liner: string;
    signals?: string[];
  };
  
  delivered_at: string;
  expires_at?: string;
};

export type NavicueResponseDTO = {
  response_id: string;
  deployment_id: string;
  
  response_type: ResponseType;
  response: Record<string, unknown>;
  state_post: StateSnapshot;
  
  responded_at: string;
};

export type NavicueEffectDTO = {
  effect_id: string;
  deployment_id: string;
  
  metrics_pre: Record<string, number>;
  metrics_post: Record<string, number>;
  delta: Record<string, number>;
  
  computed_at: string;
};

// ============================================================================
// BATCH GENERATION (For 7,000 NaviCues)
// ============================================================================

export type SchemaWaypack = {
  schema_id: string;
  domain: string;
  display_name: string;
  
  core_illusion: string;
  core_protection: string[];
  somatic_signature: string[];
  grip_type: string[];
  
  release_key: string;
  clean_choice: string[];
  repair_pattern: string[];
  belonging_medicine: string[];
  
  contraindications: {
    tier3_hot: ComponentType[];
    always_avoid: string[];
  };
  
  recommended_families: {
    K: ComponentType[];
    B: ComponentType[];
    E: ComponentType[];
  };
  
  lens_blend: Record<CouncilLens, number>;
  
  metrics: {
    primary: string[];
    secondary: string[];
  };
};

export type GeneratedNavicue = {
  code: string;
  kbe_layer: KbeLayer;
  tier: Tier;
  family: string;
  component_type: ComponentType;
  default_response_type: ResponseType;
  
  intent: string;
  config: Record<string, unknown>;
  
  variants: Array<{
    lens: CouncilLens;
    copy: NavicueCopy;
  }>;
  
  targets: Array<{
    scope_type: TargetScopeType;
    schema_id?: string;
    weight: number;
    is_primary: boolean;
  }>;
  
  tags: string[];
};

// ============================================================================
// QUALITY GATES
// ============================================================================

export type NavicueQualityCheck = {
  navicue_code: string;
  checks: {
    has_variants: boolean;
    has_targets: boolean;
    has_kbe_layer: boolean;
    tier_appropriate_for_component: boolean;
    council_lens_valid: boolean;
    no_diagnosis_language: boolean;
    copy_not_empty: boolean;
  };
  passed: boolean;
  errors: string[];
  warnings: string[];
};