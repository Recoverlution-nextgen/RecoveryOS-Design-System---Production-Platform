/**
 * NAVICUE TELEMETRY & ORCHESTRATION SCHEMA
 * 
 * Complete data model for capturing user interactions,
 * analyzing patterns, and dynamically serving next NaviCues
 * based on therapeutic state and engagement signals.
 * 
 * This is the LUMA intelligence layer that makes Recoverlution
 * a Just-In-Time Adaptive Intervention (JITAI) system.
 */

// ============================================================================
// TELEMETRY: WHAT WE CAPTURE
// ============================================================================

/**
 * PRIMARY TELEMETRY - Captured on every NaviCue interaction
 */
export interface NaviCueTelemetry {
  // Identity
  user_id: string;
  session_id: string;
  timestamp: string; // ISO 8601
  
  // NaviCue Context
  navicue_id: string;              // nc.2345
  schema: string;                   // shame, control, abandonment, etc.
  schema_name: string;              // "Shame / Unworthiness"
  family: string;                   // grip_scan, allowing_gate, story_drop, etc.
  kbe_target: 'knowing' | 'believing' | 'embodying';
  pillar_id: string;                // P-01, P-02, etc.
  council_lens?: string;            // mate, billw, watts, ramdass, etc. (batch 3)
  way_process?: string;             // see_clearly, feel_honestly, release, etc. (batch 3)
  heat_level?: string;              // high, medium, low (batch 3)
  
  // User Response
  response_type: string;            // tap, voice10, slider, breath, etc.
  response_data: {
    text?: string;
    choice?: string;
    slider?: number;
    voice_id?: string;
  };
  
  // ENGAGEMENT SIGNALS (critical for LUMA)
  hesitation_ms: number;            // Time to respond (engagement metric)
  dwell_time_ms: number;            // How long they stayed
  completed: boolean;               // Did they finish or skip?
  
  // THERAPEUTIC SIGNALS (The 5 Universal Signals)
  signals: {
    fusion: number;                 // 0-10: "Story = me" (decentering metric)
    resistance: number;             // 0-10: "Can't be with this" (acceptance metric)
    choice_access: number;          // 0-10: "Can I pause/choose" (agency metric)
    shame_threat?: number;          // 0-10: Activation level (optional)
    connection?: number;            // 0-10: Co-regulation state (optional)
  };
  
  // Context
  arousal_fit: 'green' | 'amber' | 'red' | 'downshift_first';  // Their state when served
  served_reason: string;            // 'schema_match', 'kbe_progression', 'rotation', etc.
  queue_position?: number;          // If from pre-computed queue
  
  // Metadata
  device_type?: 'mobile' | 'desktop' | 'tablet';
  time_of_day?: 'morning' | 'afternoon' | 'evening' | 'night';
  modality: 'text' | 'audio' | 'video' | 'soundbite' | 'interactive';
}

/**
 * AGGREGATED STATE - Computed from telemetry history
 */
export interface UserTherapeuticState {
  user_id: string;
  computed_at: string;
  
  // SCHEMA CLUSTERING (which mindblocks are "hot")
  active_schemas: {
    schema: string;
    heat: number;                   // 0-100: How "active" this schema is
    recency_weight: number;         // Recent hits weighted higher
    engagement_avg: number;         // Avg hesitation + completion rate
    last_hit: string;               // ISO timestamp
    hit_count_7d: number;           // Frequency
  }[];
  
  // KBE PROGRESSION (are they ready for deeper work?)
  kbe_distribution: {
    knowing: number;                // % of recent interactions
    believing: number;
    embodying: number;
  };
  kbe_readiness: {
    schema: string;
    current_layer: 'knowing' | 'believing' | 'embodying';
    ready_for_next: boolean;        // Based on engagement signals
    confidence: number;             // 0-1
  }[];
  
  // AROUSAL TRACKING (are they activated or regulated?)
  current_arousal: 'green' | 'amber' | 'red';
  arousal_trend: 'escalating' | 'stable' | 'deescalating';
  arousal_history_1h: Array<{
    timestamp: string;
    level: 'green' | 'amber' | 'red';
    trigger?: string;               // Optional: what caused shift
  }>;
  
  // FAMILY EFFECTIVENESS (which delivery mechanisms resonate?)
  family_performance: {
    family: string;
    engagement_score: number;       // 0-100: Based on hesitation + completion
    resonance_score: number;        // 0-100: Based on signals (low resistance, high choice_access)
    last_served: string;
    serve_count_7d: number;
    avg_hesitation_ms: number;
  }[];
  
  // COUNCIL RESONANCE (which wisdom voices land?) - Batch 3
  council_performance?: {
    lens: string;                   // mate, billw, watts, etc.
    resonance_score: number;
    serve_count: number;
    avg_signals: {
      fusion: number;
      resistance: number;
      choice_access: number;
    };
  }[];
  
  // WAY PROCESS EFFECTIVENESS (which mechanisms work?) - Batch 3
  way_performance?: {
    process: string;                // see_clearly, feel_honestly, etc.
    effectiveness_score: number;
    serve_count: number;
    avg_signals: {
      fusion: number;
      resistance: number;
      choice_access: number;
    };
  }[];
  
  // ROTATION TRACKING (avoid hammering same content)
  recent_navicues_30min: string[]; // Last 10-20 NaviCue IDs
  family_rotation_needed: string[]; // Families we've served too much
  schema_rotation_needed: string[]; // Schemas we've hit too much
  
  // OVERALL METRICS
  session_start: string;
  total_interactions: number;
  avg_hesitation_ms: number;
  completion_rate: number;          // % of NaviCues completed vs skipped
  avg_fusion: number;               // Trending toward decentering?
  avg_resistance: number;           // Trending toward acceptance?
  avg_choice_access: number;        // Trending toward agency?
}

// ============================================================================
// ORCHESTRATION: WHAT WE SERVE NEXT
// ============================================================================

/**
 * LUMA ORCHESTRATION REQUEST
 * Input to the algorithm that decides what to serve next
 */
export interface LumaOrchestrationRequest {
  user_id: string;
  session_id: string;
  current_state: UserTherapeuticState;
  
  // Context
  count: number;                    // How many NaviCues to return (1-10)
  mode: 'adaptive' | 'targeted' | 'exploratory';
  
  // Constraints (optional filters)
  required_schema?: string;         // Force a specific schema
  required_pillar?: string;         // Force a specific pillar
  exclude_families?: string[];      // Don't serve these
  exclude_navicues?: string[];      // Don't repeat these
  
  // Strategy hints
  prefer_council_lens?: string;     // If a voice is resonating
  prefer_way_process?: string;      // If a mechanism is working
}

/**
 * LUMA ORCHESTRATION RESPONSE
 * What the algorithm recommends serving next
 */
export interface LumaOrchestrationResponse {
  navicues: Array<{
    navicue_id: string;
    schema: string;
    family: string;
    kbe_target: string;
    council_lens?: string;
    way_process?: string;
    heat_level?: string;
    
    // Why this was selected
    selection_reason: string;       // "schema_cluster_match", "kbe_progression", etc.
    confidence: number;             // 0-1: How confident the algorithm is
    expected_arousal_fit: 'green' | 'amber' | 'red';
    
    // Orchestration metadata
    is_rotation: boolean;           // True if serving for variety
    is_therapeutic_target: boolean; // True if targeting active schema
    priority: number;               // 1-10: Serve order
  }>;
  
  // Algorithm reasoning (for transparency/debugging)
  reasoning: {
    active_schemas: string[];       // Which schemas are hot
    arousal_state: string;          // Current user state
    kbe_readiness: string;          // Overall readiness assessment
    rotation_needs: string[];       // What we're avoiding
    strategy: string;               // Overall strategy used
  };
  
  // State updates (what changed after this serve)
  predicted_state_shift: {
    arousal: 'escalate' | 'stable' | 'deescalate';
    engagement: 'increase' | 'stable' | 'decrease';
    schema_heat: Array<{ schema: string; predicted_change: number }>;
  };
}

// ============================================================================
// ANALYSIS: HOW WE COMPUTE STATE
// ============================================================================

/**
 * STATE COMPUTATION FUNCTIONS
 * Transform telemetry history into current therapeutic state
 */
export interface StateComputationConfig {
  // Time windows
  recent_window_minutes: number;    // Default: 30 (for recency weighting)
  history_window_days: number;      // Default: 7 (for pattern detection)
  
  // Scoring weights
  weights: {
    recency: number;                // 0-1: How much recent hits matter
    engagement: number;             // 0-1: How much hesitation matters
    completion: number;             // 0-1: How much completion matters
    signals: number;                // 0-1: How much fusion/resistance matters
  };
  
  // Thresholds
  thresholds: {
    schema_heat_active: number;     // Min heat to consider schema "active"
    kbe_progression_min_interactions: number; // Min interactions before advancing KBE
    arousal_amber_threshold: number; // Resistance score that triggers amber
    arousal_red_threshold: number;   // Resistance score that triggers red
    rotation_same_family_max: number; // Max times same family in window
  };
  
  // State gating rules (batch 3)
  state_gating: {
    high_heat_families: string[];   // Only these when arousal = red
    medium_heat_families: string[]; // Add these when arousal = amber
    low_heat_families: string[];    // All families when arousal = green
  };
}

// ============================================================================
// ORCHESTRATION ALGORITHM: THE CORE LOGIC
// ============================================================================

/**
 * ORCHESTRATION STRATEGIES
 * Different approaches for different scenarios
 */
export type OrchestrationStrategy = 
  | 'schema_clustering'             // Target hot schemas with variety
  | 'kbe_progression'               // Gradual deepening on ready schemas
  | 'heat_regulation'               // Prioritize arousal management
  | 'family_rotation'               // Avoid repetition, try new angles
  | 'council_amplification'         // More of what's working (voice/process)
  | 'exploratory_probe'             // Test new schemas/families
  | 'rescue_intervention';          // Emergency high-heat protocol

/**
 * SELECTION CRITERIA
 * How we score candidate NaviCues
 */
export interface NaviCueSelectionCriteria {
  // Therapeutic targeting (60% of score)
  schema_match_score: number;       // 0-100: How well schema aligns with state
  kbe_appropriateness_score: number; // 0-100: Is user ready for this layer?
  arousal_safety_score: number;     // 0-100: Is heat_level appropriate?
  
  // Engagement optimization (30% of score)
  family_effectiveness_score: number; // 0-100: Has this family worked before?
  council_resonance_score: number;   // 0-100: Does this voice resonate?
  way_process_fit_score: number;     // 0-100: Does this mechanism work?
  
  // Rotation needs (10% of score)
  novelty_score: number;            // 0-100: How fresh is this?
  variety_score: number;            // 0-100: Adds diversity to recent queue
  
  // Composite
  total_score: number;              // Weighted sum
  rank: number;                     // 1-N ranking
}

/**
 * ORCHESTRATION RULES ENGINE
 * Hard constraints that must be satisfied
 */
export interface OrchestrationRules {
  // State gating (CRITICAL - batch 3)
  state_gating_enabled: boolean;
  enforce_heat_level_matching: boolean; // Never serve low-heat families to high-heat users
  
  // KBE progression gates
  kbe_progression_enabled: boolean;
  min_knowing_interactions: number;  // Before believing is allowed
  min_believing_interactions: number; // Before embodying is allowed
  
  // Rotation rules
  rotation_enabled: boolean;
  max_same_family_consecutive: number; // Don't serve same family back-to-back
  max_same_schema_consecutive: number; // Don't hammer same schema
  
  // Diversity requirements
  require_family_diversity: boolean; // Force variety in batch
  require_kbe_mix: boolean;         // Mix of knowing/believing/embodying
  
  // Safety overrides
  enable_rescue_mode: boolean;      // Override everything if crisis detected
  rescue_trigger_conditions: {
    min_resistance_score: number;   // If resistance > this, rescue mode
    min_arousal_red_duration_minutes: number; // If red this long, rescue
  };
}

// ============================================================================
// MEASUREMENT: DID IT WORK?
// ============================================================================

/**
 * EFFECTIVENESS MEASUREMENT
 * Track whether orchestration decisions led to good outcomes
 */
export interface OrchestrationEffectiveness {
  serve_id: string;                 // Unique ID for this serve decision
  timestamp: string;
  
  // What we predicted
  predicted: {
    arousal_shift: string;
    engagement: string;
    schema_heat_change: Array<{ schema: string; change: number }>;
  };
  
  // What actually happened
  actual: {
    arousal_shift: string;
    engagement_score: number;       // Based on hesitation + completion
    schema_heat_change: Array<{ schema: string; change: number }>;
  };
  
  // Accuracy
  prediction_accuracy: {
    arousal: boolean;               // Did arousal shift as predicted?
    engagement: number;             // 0-1: How close was engagement prediction?
    schema_heat: number;            // 0-1: How accurate were schema predictions?
    overall: number;                // 0-1: Composite accuracy
  };
  
  // Learning signal
  reward: number;                   // -1 to +1: How good was this decision?
  /*
    +1: Perfect - user engaged, arousal regulated, schema heat decreased
    0: Neutral - no harm, no help
    -1: Bad - user skipped, arousal escalated, resistance increased
  */
}

/**
 * LEARNING & ADAPTATION
 * How the algorithm improves over time
 */
export interface LumaLearningUpdate {
  user_id: string;
  updated_at: string;
  
  // Pattern updates
  discovered_patterns: Array<{
    pattern_type: 'schema_cluster' | 'family_preference' | 'council_resonance' | 'time_of_day';
    pattern_data: Record<string, any>;
    confidence: number;
    first_detected: string;
    last_confirmed: string;
  }>;
  
  // Model adjustments
  weight_adjustments: {
    schema_targeting: number;       // Increase/decrease emphasis
    kbe_progression: number;
    family_rotation: number;
    council_preference: number;
  };
  
  // Strategy effectiveness
  strategy_performance: Array<{
    strategy: OrchestrationStrategy;
    success_rate: number;           // 0-1
    avg_reward: number;             // -1 to +1
    times_used: number;
    last_used: string;
  }>;
}

// ============================================================================
// INTEGRATION INTERFACES
// ============================================================================

/**
 * Complete flow from interaction to next serve
 */
export interface NaviCueOrchestrationFlow {
  // Step 1: Capture telemetry
  captureTelemetry(interaction: NaviCueTelemetry): Promise<void>;
  
  // Step 2: Update state
  computeState(userId: string, config: StateComputationConfig): Promise<UserTherapeuticState>;
  
  // Step 3: Orchestrate next
  orchestrateNext(request: LumaOrchestrationRequest): Promise<LumaOrchestrationResponse>;
  
  // Step 4: Measure effectiveness
  measureEffectiveness(serveId: string): Promise<OrchestrationEffectiveness>;
  
  // Step 5: Learn and adapt
  updateModel(userId: string): Promise<LumaLearningUpdate>;
}

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

export const DEFAULT_ORCHESTRATION_CONFIG: StateComputationConfig = {
  recent_window_minutes: 30,
  history_window_days: 7,
  
  weights: {
    recency: 0.4,
    engagement: 0.3,
    completion: 0.2,
    signals: 0.1,
  },
  
  thresholds: {
    schema_heat_active: 60,
    kbe_progression_min_interactions: 3,
    arousal_amber_threshold: 6,
    arousal_red_threshold: 8,
    rotation_same_family_max: 3,
  },
  
  state_gating: {
    high_heat_families: ['grip_scan', 'allowing_gate', 'proof_stamp'],
    medium_heat_families: ['grip_scan', 'allowing_gate', 'release_prompt', 'story_drop', 'proof_stamp'],
    low_heat_families: ['grip_scan', 'allowing_gate', 'release_prompt', 'story_drop', 'paradox_key', 'inventory_spark', 'sangha_ping', 'proof_stamp'],
  },
};

export const DEFAULT_ORCHESTRATION_RULES: OrchestrationRules = {
  state_gating_enabled: true,
  enforce_heat_level_matching: true,
  
  kbe_progression_enabled: true,
  min_knowing_interactions: 3,
  min_believing_interactions: 5,
  
  rotation_enabled: true,
  max_same_family_consecutive: 2,
  max_same_schema_consecutive: 3,
  
  require_family_diversity: true,
  require_kbe_mix: false,
  
  enable_rescue_mode: true,
  rescue_trigger_conditions: {
    min_resistance_score: 8,
    min_arousal_red_duration_minutes: 15,
  },
};
