// PLATFORM CONSTITUTION TYPES
// Complete TypeScript definitions for the 10 Laws

export type ContentKind =
  | 'article'
  | 'practice'
  | 'insight'
  | 'video'
  | 'journey_scene'
  | 'state_checkin'
  | 'story'
  | 'navicue';

export type StateBand = 'green' | 'amber' | 'red' | 'shutdown' | 'any';
export type ArousalContext = 'calm' | 'activated' | 'shutdown' | 'any';
export type RiskLevel = 'low' | 'medium' | 'high';
export type HarmType = 'activation' | 'shame' | 'craving' | 'trauma_memory' | 'dissociation' | 'relational';

export type ResponseType =
  | 'tap'
  | 'binary'
  | 'slider'
  | 'voice'
  | 'voice10'
  | 'text'
  | 'practice_completion'
  | 'article_read'
  | 'video_completion'
  | 'state_checkin';

export type ProofCaptureMode =
  | 'receipt'
  | 'micro_proof'
  | 'transfer_test'
  | 'prediction_error'
  | 'durability_check';

export type NoResponseAction =
  | 'requeue'
  | 'downgrade'
  | 'swap_variant'
  | 'close'
  | 'route_to_downshift';

export interface ResponseContract {
  required: boolean;
  type: ResponseType;
  entry_cue?: string;
  exit_receipt?: string;
  proof_capture_mode: ProofCaptureMode;
  on_no_response: NoResponseAction;
  timeout_seconds?: number;
  measurement?: Record<string, string>;
}

export interface RescueContract {
  mode: 'self' | 'peer' | 'clinician' | 'crisis';
  steps: string[];
  escalation_thresholds: Record<string, any>;
  local_resources_required: boolean;
}

export interface MeasurementContract {
  signals_captured: string[];
  proof_pathway: string;
  evidence_link?: string;
}

// LAW 1 & 2: Content Envelope
export interface ContentEnvelope {
  id: string;
  
  // IDENTITY
  content_kind: ContentKind;
  source_table: string;
  source_pk: string;
  canonical_id: string;
  version: number;
  
  // VERSIONING
  supersedes_content_ref?: string;
  change_log?: string;
  min_client_version?: string;
  
  // TARGETING
  pillar_id: string;
  theme_id?: string;
  tags: string[];
  mindblock_targets: string[];
  schema_targets: string[];
  
  // STATE COMPATIBILITY (LAW 9)
  state_band_allowed: StateBand[];
  arousal_context_allowed: ArousalContext[];
  
  // SAFETY
  risk_level: RiskLevel;
  harm_types: HarmType[];
  contraindications: string[];
  requires_support: boolean;
  
  // CONTRACTS (LAW 2, 7, 8)
  response_contract: ResponseContract;
  rescue_contract?: RescueContract;
  why_now_template: string;
  why_now_inputs: string[];
  
  // MEASUREMENT
  clinical_metadata: Record<string, any>;
  measurement_contract: MeasurementContract;
  
  // GOVERNANCE
  organization_id?: string;
  cohort_id?: string;
  visibility_scope: 'personal' | 'org' | 'public';
  
  // LIFECYCLE
  status: 'draft' | 'review' | 'active' | 'archived';
  is_active: boolean;
  
  // AUDIT
  created_by?: string;
  approved_by?: string;
  approved_at?: string;
  
  created_at: string;
  updated_at: string;
}

// LAW 3: Delivery Registry
export type DeliveryKind =
  | 'feed_card'
  | 'modal'
  | 'inline_player'
  | 'push'
  | 'email'
  | 'sms'
  | 'clinician_prompt';

export type Channel = 'in_app' | 'push' | 'email' | 'sms';

export interface DeliveryEnvelope {
  id: string;
  content_ref: string;
  
  // DELIVERY FORMAT
  delivery_kind: DeliveryKind;
  channel: Channel;
  
  // PRESENTATION
  cta_label?: string;
  preview_payload?: Record<string, any>;
  player_mode?: string;
  
  // COST
  estimated_seconds?: number;
  
  // CONTEXT
  time_context?: string[];
  behavioral_context?: string[];
  
  // VARIANT
  variant_key?: string;
  activation_rules?: Record<string, any>;
  
  is_active: boolean;
  created_at: string;
}

// LAW 4: Event Spine
export type EventType =
  | 'content_exposed'
  | 'content_opened'
  | 'content_interacted'
  | 'content_completed'
  | 'content_abandoned'
  | 'response_captured'
  | 'proof_created'
  | 'state_captured'
  | 'resistance_detected'
  | 'safety_gate_triggered'
  | 'rescue_initiated'
  | 'journey_advanced'
  | 'notification_sent';

export interface EventSpineEntry {
  id: string;
  event_id: string;
  
  // WHO
  user_id: string;
  organization_id?: string;
  
  // WHAT
  event_type: EventType;
  
  // CONTENT
  content_ref?: string;
  delivery_ref?: string;
  
  // CONTEXT
  event_context: Record<string, any>;
  
  // PAYLOAD
  event_payload: Record<string, any>;
  
  // WHEN
  occurred_at: string;
  received_at: string;
}

// LAW 5: Proof Artifacts
export type ProofType = 'receipt' | 'micro_proof' | 'transfer' | 'prediction_error' | 'durability_check';

export interface ProofArtifact {
  id: string;
  event_id?: string;
  
  user_id: string;
  content_ref?: string;
  
  // PROOF TYPE
  artifact_type: ProofType;
  
  // CONTENT
  proof_data: Record<string, any>;
  
  // MEASUREMENT
  confidence_score?: number;
  schema_updates?: Record<string, any>;
  mindblock_associations?: string[];
  
  // CONTEXT
  arousal_at_capture?: number;
  state_band_at_capture?: StateBand;
  
  created_at: string;
}

// LAW 6: Safety Policies
export type SafetyOutcome =
  | 'allow'
  | 'allow_with_modification'
  | 'hold'
  | 'block'
  | 'block_and_route'
  | 'require_support';

export interface SafetyPolicy {
  id: string;
  policy_name: string;
  policy_type: string;
  
  // EVALUATION
  conditions: Record<string, any>;
  
  // OUTCOMES
  outcome_on_pass: SafetyOutcome;
  outcome_on_fail: SafetyOutcome;
  
  // MODIFICATION
  modification_rules?: Record<string, any>;
  
  // ROUTING
  rescue_target?: string;
  
  priority: number;
  is_active: boolean;
  created_at: string;
}

export interface SafetyPolicyOutcome {
  id: string;
  event_id?: string;
  
  user_id: string;
  content_ref?: string;
  policy_id?: string;
  policy_name?: string;
  
  // OUTCOME
  outcome: SafetyOutcome;
  reason?: string;
  
  // MODIFICATIONS
  variant_swapped_to?: string;
  downshift_inserted?: boolean;
  
  // RESCUE
  rescue_initiated?: boolean;
  rescue_target?: string;
  
  evaluated_at: string;
}

// LAW 7: Decision Traces
export interface DecisionTrace {
  id: string;
  decision_trace_id: string;
  
  user_id: string;
  decision_type: string;
  
  // INPUTS
  input_snapshot: {
    user_state?: {
      tempo: number;
      flow: number;
      sync: number;
      composite: number;
      state_band: StateBand;
      arousal_context: ArousalContext;
    };
    recent_events?: any[];
    schema_heat?: Record<string, number>;
    time_context?: string;
    last_interaction?: string;
  };
  
  // CANDIDATES
  candidates: Array<{
    content_ref: string;
    score: number;
    reason: string;
  }>;
  
  // POLICIES
  policies_evaluated: Array<{
    policy_id: string;
    policy_name: string;
    outcome: SafetyOutcome;
    reason: string;
  }>;
  
  // CHOSEN
  content_ref_chosen?: string;
  delivery_ref_chosen?: string;
  variant_chosen?: string;
  
  // WHYNOW (LAW 7)
  why_now_resolved: string;
  why_now_confidence: number;
  
  // MODEL VERSION
  ranker_version?: string;
  policy_engine_version?: string;
  
  // EXPERIMENT
  experiment_id?: string;
  experiment_variant?: string;
  
  decided_at: string;
}

// LAW 9: State Model
export interface UserStateSnapshot {
  id: string;
  user_id: string;
  
  // USER INPUT
  tempo: number;
  flow: number;
  sync: number;
  
  // COMPUTED
  composite: number;
  state_band: StateBand;
  arousal_context: ArousalContext;
  
  // CONTEXT
  context?: string;
  location?: string;
  
  captured_at: string;
}

export interface StateBandRule {
  composite_range: [number, number];
  arousal_allowed: ArousalContext[];
  content_types_allowed: string;
  description: string;
}

// LAW 10: Agency Settings
export interface UserAgencySettings {
  user_id: string;
  
  // DATA CONSENT
  consent_calendar: boolean;
  consent_location: boolean;
  consent_voice_transcripts: boolean;
  consent_community_posts: boolean;
  
  // LUMA CONTROLS
  luma_enabled: boolean;
  luma_notifications_enabled: boolean;
  luma_suggestion_frequency: 'minimal' | 'balanced' | 'active';
  
  // SHARING
  share_with_clinician: boolean;
  share_with_organization: boolean;
  share_for_research: boolean;
  
  // PAUSE/MUTE
  paused_until?: string;
  muted_rooms: string[];
  
  // RETENTION
  voice_retention_days: number;
  
  updated_at: string;
}

// CONSTITUTION HEALTH
export interface LawStatus {
  law_number: number;
  law_name: string;
  status: 'healthy' | 'warning' | 'violation';
  score: number; // 0-100
  message: string;
  details?: Record<string, any>;
}

export interface ConstitutionHealth {
  overall_score: number; // 0-100
  status: 'healthy' | 'degraded' | 'critical';
  laws: LawStatus[];
  last_updated: string;
}

// FILTERS
export interface ContentRegistryFilters {
  content_kind?: ContentKind[];
  pillar_id?: string[];
  status?: string[];
  search?: string;
  has_valid_contract?: boolean;
  has_why_now?: boolean;
}

export interface EventSpineFilters {
  event_type?: EventType[];
  user_id?: string;
  content_ref?: string;
  time_range?: {
    start: string;
    end: string;
  };
}

export interface DecisionTraceFilters {
  user_id?: string;
  decision_type?: string[];
  content_ref?: string;
  time_range?: {
    start: string;
    end: string;
  };
  min_confidence?: number;
}

export interface ProofArtifactFilters {
  artifact_type?: ProofType[];
  user_id?: string;
  content_ref?: string;
  min_confidence?: number;
  time_range?: {
    start: string;
    end: string;
  };
}

// ANALYTICS
export interface EventAnalytics {
  total_events: number;
  events_by_type: Record<EventType, number>;
  events_over_time: Array<{
    timestamp: string;
    count: number;
    event_type: EventType;
  }>;
  completion_funnel: {
    exposed: number;
    opened: number;
    interacted: number;
    completed: number;
    abandoned: number;
  };
  top_content: Array<{
    content_ref: string;
    exposure_count: number;
    completion_rate: number;
  }>;
}

export interface ProofAnalytics {
  total_artifacts: number;
  artifacts_by_type: Record<ProofType, number>;
  average_confidence: number;
  average_confidence_by_type: Record<ProofType, number>;
  generation_rate_over_time: Array<{
    timestamp: string;
    count: number;
  }>;
  schema_impact: Record<string, {
    update_count: number;
    avg_confidence: number;
  }>;
  transfer_success_rate: number;
}

export interface StateDistribution {
  green: number;
  amber: number;
  red: number;
  shutdown: number;
  total_users: number;
}

export interface SafetyPolicyStats {
  policy_id: string;
  policy_name: string;
  total_evaluations: number;
  outcomes: Record<SafetyOutcome, number>;
  block_rate: number;
  users_affected: number;
}
