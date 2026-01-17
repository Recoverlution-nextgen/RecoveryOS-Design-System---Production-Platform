/**
 * LUMA ORCHESTRATION ENGINE
 * 
 * The algorithmic intelligence that decides what NaviCue to serve next
 * based on user state, engagement patterns, and therapeutic goals.
 * 
 * This implements Just-In-Time Adaptive Intervention (JITAI) principles:
 * - Rotate cues to test what works
 * - Measure immediate effects
 * - Learn user patterns
 * - Adapt in real-time
 */

import type {
  NaviCueTelemetry,
  UserTherapeuticState,
  LumaOrchestrationRequest,
  LumaOrchestrationResponse,
  OrchestrationStrategy,
  NaviCueSelectionCriteria,
  StateComputationConfig,
  OrchestrationRules,
  DEFAULT_ORCHESTRATION_CONFIG,
  DEFAULT_ORCHESTRATION_RULES,
} from './telemetrySchema';

// ============================================================================
// CORE ORCHESTRATION ENGINE
// ============================================================================

export class LumaOrchestrationEngine {
  private config: StateComputationConfig;
  private rules: OrchestrationRules;
  
  constructor(
    config: StateComputationConfig = DEFAULT_ORCHESTRATION_CONFIG,
    rules: OrchestrationRules = DEFAULT_ORCHESTRATION_RULES
  ) {
    this.config = config;
    this.rules = rules;
  }
  
  /**
   * MAIN ORCHESTRATION FUNCTION
   * Decides what NaviCues to serve next based on current user state
   */
  async orchestrateNext(
    request: LumaOrchestrationRequest,
    availableNaviCues: any[] // From Supabase query
  ): Promise<LumaOrchestrationResponse> {
    const { current_state, count, mode } = request;
    
    // Step 1: Determine orchestration strategy
    const strategy = this.selectStrategy(current_state, mode);
    
    // Step 2: Apply state gating (critical safety filter)
    const gatedNaviCues = this.applyStateGating(
      availableNaviCues,
      current_state.current_arousal
    );
    
    // Step 3: Score all candidate NaviCues
    const scored = gatedNaviCues.map(nc => ({
      navicue: nc,
      criteria: this.scoreNaviCue(nc, current_state, strategy),
    }));
    
    // Step 4: Sort by total score and select top N
    const ranked = scored
      .sort((a, b) => b.criteria.total_score - a.criteria.total_score)
      .slice(0, count);
    
    // Step 5: Build response with reasoning
    return {
      navicues: ranked.map((item, idx) => ({
        navicue_id: item.navicue.id,
        schema: item.navicue.schema,
        family: item.navicue.family,
        kbe_target: item.navicue.kbe_target,
        council_lens: item.navicue.council_lens,
        way_process: item.navicue.way_process,
        heat_level: item.navicue.heat_level,
        selection_reason: this.explainSelection(item.criteria, strategy),
        confidence: item.criteria.total_score / 100,
        expected_arousal_fit: this.predictArousalFit(item.navicue, current_state),
        is_rotation: item.criteria.novelty_score > 70,
        is_therapeutic_target: item.criteria.schema_match_score > 70,
        priority: idx + 1,
      })),
      reasoning: {
        active_schemas: current_state.active_schemas
          .filter(s => s.heat > this.config.thresholds.schema_heat_active)
          .map(s => s.schema),
        arousal_state: current_state.current_arousal,
        kbe_readiness: this.summarizeKBEReadiness(current_state),
        rotation_needs: [
          ...current_state.family_rotation_needed,
          ...current_state.schema_rotation_needed,
        ],
        strategy: strategy,
      },
      predicted_state_shift: this.predictStateShift(ranked, current_state),
    };
  }
  
  /**
   * SELECT ORCHESTRATION STRATEGY
   * Choose the best approach based on current state
   */
  private selectStrategy(
    state: UserTherapeuticState,
    mode: 'adaptive' | 'targeted' | 'exploratory'
  ): OrchestrationStrategy {
    // Rescue mode override (safety first)
    if (
      this.rules.enable_rescue_mode &&
      (state.avg_resistance > this.rules.rescue_trigger_conditions.min_resistance_score ||
       state.current_arousal === 'red')
    ) {
      return 'rescue_intervention';
    }
    
    // Explicit mode selection
    if (mode === 'targeted') {
      return 'schema_clustering';
    }
    if (mode === 'exploratory') {
      return 'exploratory_probe';
    }
    
    // Adaptive mode - choose based on state
    // High arousal → regulate first
    if (state.current_arousal === 'red' || state.arousal_trend === 'escalating') {
      return 'heat_regulation';
    }
    
    // Active schemas detected → target them
    const activeSchemas = state.active_schemas.filter(
      s => s.heat > this.config.thresholds.schema_heat_active
    );
    if (activeSchemas.length > 0) {
      return 'schema_clustering';
    }
    
    // KBE progression opportunity
    const readyForProgression = state.kbe_readiness.filter(k => k.ready_for_next);
    if (readyForProgression.length > 0) {
      return 'kbe_progression';
    }
    
    // Council voice resonating strongly
    if (state.council_performance) {
      const topCouncil = state.council_performance.sort(
        (a, b) => b.resonance_score - a.resonance_score
      )[0];
      if (topCouncil && topCouncil.resonance_score > 70) {
        return 'council_amplification';
      }
    }
    
    // Need rotation
    if (
      state.family_rotation_needed.length > 2 ||
      state.schema_rotation_needed.length > 2
    ) {
      return 'family_rotation';
    }
    
    // Default: balanced clustering
    return 'schema_clustering';
  }
  
  /**
   * APPLY STATE GATING (CRITICAL SAFETY FILTER)
   * Only serve appropriate NaviCues based on arousal state
   * 
   * This is the #1 rule: Never serve paradox_key to a red-state user
   */
  private applyStateGating(
    navicues: any[],
    arousalState: 'green' | 'amber' | 'red'
  ): any[] {
    if (!this.rules.state_gating_enabled) {
      return navicues;
    }
    
    const allowedFamilies = 
      arousalState === 'red' 
        ? this.config.state_gating.high_heat_families
        : arousalState === 'amber'
        ? this.config.state_gating.medium_heat_families
        : this.config.state_gating.low_heat_families;
    
    return navicues.filter(nc => {
      // Family filter
      if (!allowedFamilies.includes(nc.family)) {
        return false;
      }
      
      // Heat level match (batch 3)
      if (this.rules.enforce_heat_level_matching && nc.heat_level) {
        const heatMap = { high: 'red', medium: 'amber', low: 'green' };
        const requiredArousal = heatMap[nc.heat_level as keyof typeof heatMap];
        if (requiredArousal && arousalState !== requiredArousal) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  /**
   * SCORE A CANDIDATE NAVICUE
   * Compute how well this NaviCue fits current user state
   */
  private scoreNaviCue(
    navicue: any,
    state: UserTherapeuticState,
    strategy: OrchestrationStrategy
  ): NaviCueSelectionCriteria {
    // Schema match (how hot is this schema?)
    const schemaMatch = this.scoreSchemaMatch(navicue.schema, state);
    
    // KBE appropriateness (is user ready for this layer?)
    const kbeAppropriate = this.scoreKBEAppropriateness(
      navicue.schema,
      navicue.kbe_target,
      state
    );
    
    // Arousal safety (is heat_level appropriate?)
    const arousalSafe = this.scoreArousalSafety(navicue.heat_level, state.current_arousal);
    
    // Family effectiveness (has this family worked before?)
    const familyEffective = this.scoreFamilyEffectiveness(navicue.family, state);
    
    // Council resonance (does this voice resonate?)
    const councilResonance = navicue.council_lens
      ? this.scoreCouncilResonance(navicue.council_lens, state)
      : 50; // Neutral if no council lens
    
    // Way process fit (does this mechanism work?)
    const wayFit = navicue.way_process
      ? this.scoreWayProcessFit(navicue.way_process, state)
      : 50; // Neutral if no way process
    
    // Novelty (have we served this recently?)
    const novelty = this.scoreNovelty(navicue.id, state);
    
    // Variety (does this add diversity?)
    const variety = this.scoreVariety(navicue, state);
    
    // Strategy-specific weighting
    const weights = this.getStrategyWeights(strategy);
    
    // Compute total score
    const totalScore =
      schemaMatch * weights.schema +
      kbeAppropriate * weights.kbe +
      arousalSafe * weights.arousal +
      familyEffective * weights.family +
      councilResonance * weights.council +
      wayFit * weights.way +
      novelty * weights.novelty +
      variety * weights.variety;
    
    return {
      schema_match_score: schemaMatch,
      kbe_appropriateness_score: kbeAppropriate,
      arousal_safety_score: arousalSafe,
      family_effectiveness_score: familyEffective,
      council_resonance_score: councilResonance,
      way_process_fit_score: wayFit,
      novelty_score: novelty,
      variety_score: variety,
      total_score: totalScore,
      rank: 0, // Will be set after sorting
    };
  }
  
  // ============================================================================
  // SCORING FUNCTIONS (0-100 scale)
  // ============================================================================
  
  private scoreSchemaMatch(schema: string, state: UserTherapeuticState): number {
    const activeSchema = state.active_schemas.find(s => s.schema === schema);
    if (!activeSchema) return 20; // Base score for non-active schemas
    
    // Heat is 0-100, directly use it
    return activeSchema.heat;
  }
  
  private scoreKBEAppropriateness(
    schema: string,
    kbeTarget: string,
    state: UserTherapeuticState
  ): number {
    const readiness = state.kbe_readiness.find(k => k.schema === schema);
    if (!readiness) return 50; // Neutral if no data
    
    // If serving current layer, high score
    if (readiness.current_layer === kbeTarget) {
      return 80;
    }
    
    // If serving next layer and ready, high score
    const layerOrder = ['knowing', 'believing', 'embodying'];
    const currentIdx = layerOrder.indexOf(readiness.current_layer);
    const targetIdx = layerOrder.indexOf(kbeTarget);
    
    if (targetIdx === currentIdx + 1 && readiness.ready_for_next) {
      return 90 * readiness.confidence;
    }
    
    // If jumping ahead too far, low score
    if (targetIdx > currentIdx + 1) {
      return 20;
    }
    
    // If going backwards, medium score (review is ok)
    if (targetIdx < currentIdx) {
      return 60;
    }
    
    return 50;
  }
  
  private scoreArousalSafety(heatLevel: string | undefined, arousal: string): number {
    if (!heatLevel) return 100; // No heat level = always safe
    
    const matchMap = {
      high: 'red',
      medium: 'amber',
      low: 'green',
    };
    
    const requiredArousal = matchMap[heatLevel as keyof typeof matchMap];
    if (!requiredArousal) return 100;
    
    // Perfect match
    if (arousal === requiredArousal) return 100;
    
    // Close match (amber served to green)
    if (heatLevel === 'medium' && arousal === 'green') return 70;
    if (heatLevel === 'high' && arousal === 'amber') return 60;
    
    // Mismatch
    return 20;
  }
  
  private scoreFamilyEffectiveness(family: string, state: UserTherapeuticState): number {
    const perf = state.family_performance.find(f => f.family === family);
    if (!perf) return 50; // Neutral if no data
    
    // Combine engagement and resonance
    return (perf.engagement_score + perf.resonance_score) / 2;
  }
  
  private scoreCouncilResonance(lens: string, state: UserTherapeuticState): number {
    if (!state.council_performance) return 50;
    
    const perf = state.council_performance.find(c => c.lens === lens);
    if (!perf) return 50;
    
    return perf.resonance_score;
  }
  
  private scoreWayProcessFit(process: string, state: UserTherapeuticState): number {
    if (!state.way_performance) return 50;
    
    const perf = state.way_performance.find(w => w.process === process);
    if (!perf) return 50;
    
    return perf.effectiveness_score;
  }
  
  private scoreNovelty(navicueId: string, state: UserTherapeuticState): number {
    // Have we served this recently?
    if (state.recent_navicues_30min.includes(navicueId)) {
      return 10; // Very low score for recent repeats
    }
    
    return 100; // High score for novel content
  }
  
  private scoreVariety(navicue: any, state: UserTherapeuticState): number {
    let score = 100;
    
    // Penalize if family needs rotation
    if (state.family_rotation_needed.includes(navicue.family)) {
      score -= 30;
    }
    
    // Penalize if schema needs rotation
    if (state.schema_rotation_needed.includes(navicue.schema)) {
      score -= 20;
    }
    
    return Math.max(0, score);
  }
  
  // ============================================================================
  // STRATEGY-SPECIFIC WEIGHTS
  // ============================================================================
  
  private getStrategyWeights(strategy: OrchestrationStrategy) {
    const weights = {
      schema: 0.3,
      kbe: 0.2,
      arousal: 0.15,
      family: 0.15,
      council: 0.05,
      way: 0.05,
      novelty: 0.05,
      variety: 0.05,
    };
    
    switch (strategy) {
      case 'schema_clustering':
        weights.schema = 0.5;
        weights.family = 0.2;
        weights.variety = 0.15;
        break;
        
      case 'kbe_progression':
        weights.kbe = 0.5;
        weights.schema = 0.3;
        break;
        
      case 'heat_regulation':
        weights.arousal = 0.6;
        weights.family = 0.2;
        break;
        
      case 'family_rotation':
        weights.variety = 0.4;
        weights.novelty = 0.3;
        weights.family = 0.2;
        break;
        
      case 'council_amplification':
        weights.council = 0.4;
        weights.way = 0.3;
        weights.schema = 0.2;
        break;
        
      case 'exploratory_probe':
        weights.novelty = 0.4;
        weights.variety = 0.3;
        break;
        
      case 'rescue_intervention':
        weights.arousal = 0.7;
        weights.family = 0.2;
        break;
    }
    
    return weights;
  }
  
  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================
  
  private explainSelection(
    criteria: NaviCueSelectionCriteria,
    strategy: OrchestrationStrategy
  ): string {
    const reasons: string[] = [];
    
    if (criteria.schema_match_score > 70) {
      reasons.push('schema_cluster_match');
    }
    if (criteria.kbe_appropriateness_score > 80) {
      reasons.push('kbe_progression_ready');
    }
    if (criteria.family_effectiveness_score > 70) {
      reasons.push('family_resonance');
    }
    if (criteria.council_resonance_score > 70) {
      reasons.push('council_voice_effective');
    }
    if (criteria.novelty_score > 90) {
      reasons.push('rotation_variety');
    }
    
    if (reasons.length === 0) {
      return strategy;
    }
    
    return reasons.join(', ');
  }
  
  private predictArousalFit(
    navicue: any,
    state: UserTherapeuticState
  ): 'green' | 'amber' | 'red' {
    // If NaviCue has heat_level, use that
    if (navicue.heat_level) {
      const map = {
        high: 'red' as const,
        medium: 'amber' as const,
        low: 'green' as const,
      };
      return map[navicue.heat_level as keyof typeof map] || state.current_arousal;
    }
    
    return state.current_arousal;
  }
  
  private summarizeKBEReadiness(state: UserTherapeuticState): string {
    const ready = state.kbe_readiness.filter(k => k.ready_for_next).length;
    const total = state.kbe_readiness.length;
    
    if (ready === 0) return 'consolidating_current_layer';
    if (ready / total > 0.7) return 'ready_for_progression';
    return 'mixed_readiness';
  }
  
  private predictStateShift(
    selected: Array<{ navicue: any; criteria: NaviCueSelectionCriteria }>,
    state: UserTherapeuticState
  ) {
    // Simplified prediction - would be ML model in production
    const avgArousalSafety =
      selected.reduce((sum, s) => sum + s.criteria.arousal_safety_score, 0) /
      selected.length;
    
    const arousalPrediction =
      avgArousalSafety > 80
        ? 'deescalate'
        : avgArousalSafety > 50
        ? 'stable'
        : 'escalate';
    
    const avgEngagement =
      selected.reduce((sum, s) => sum + s.criteria.family_effectiveness_score, 0) /
      selected.length;
    
    const engagementPrediction =
      avgEngagement > 70 ? 'increase' : avgEngagement > 50 ? 'stable' : 'decrease';
    
    // Schema heat predictions
    const schemaChanges = state.active_schemas.map(s => {
      const targeting = selected.filter(sel => sel.navicue.schema === s.schema).length;
      const predictedChange = targeting > 0 ? -10 : 0; // Serving reduces heat
      return { schema: s.schema, predicted_change: predictedChange };
    });
    
    return {
      arousal: arousalPrediction as 'escalate' | 'stable' | 'deescalate',
      engagement: engagementPrediction as 'increase' | 'stable' | 'decrease',
      schema_heat: schemaChanges,
    };
  }
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/*
import { LumaOrchestrationEngine } from './orchestrationEngine';

const luma = new LumaOrchestrationEngine();

// User just responded to a NaviCue
// We've computed their current state
const state: UserTherapeuticState = {
  // ... computed from telemetry history
  current_arousal: 'amber',
  active_schemas: [
    { schema: 'shame', heat: 75, ... },
    { schema: 'control', heat: 60, ... },
  ],
  // ... rest of state
};

// Query Supabase for available NaviCues
const availableNaviCues = await supabase
  .from('v_navicue_library_enriched_agg')
  .select('*')
  .eq('status', 'active');

// Get next NaviCues to serve
const response = await luma.orchestrateNext(
  {
    user_id: userId,
    session_id: sessionId,
    current_state: state,
    count: 5,
    mode: 'adaptive',
  },
  availableNaviCues.data
);

// Serve the top-ranked NaviCue
const nextNaviCue = response.navicues[0];
console.log('Serving:', nextNaviCue.navicue_id);
console.log('Reason:', nextNaviCue.selection_reason);
console.log('Strategy:', response.reasoning.strategy);
*/
