/**
 * ADVANCED LUMA SCORING SYSTEM
 * 
 * Replaces random selection with intelligent therapeutic scoring
 * based on schema heat, KBE readiness, family effectiveness,
 * novelty, variety, and council/way performance.
 */

import type { UserTherapeuticState, NaviCueSelectionCriteria, OrchestrationStrategy } from './telemetrySchema';

export interface ScoringCandidate {
  navicue_id: string;
  pillar_id: string;
  kbe_target: string;
  heat_level: string;
  family: string;
  council_lens?: string;
  way_process?: string;
  schema_id?: string;
  tags?: string[];
}

export interface ScoringContext {
  user_id: string;
  state: UserTherapeuticState;
  strategy: OrchestrationStrategy;
  recent_navicues: string[]; // Last 30min
  seen_pillars_today: string[];
  seen_families_today: string[];
  seen_schemas_today: string[];
}

// ============================================================================
// SCHEMA HEAT SCORING
// ============================================================================

/**
 * Score how well this NaviCue targets active schemas
 * Higher score = hotter schema = more therapeutically relevant
 */
export function scoreSchemaMatch(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  if (!candidate.schema_id) return 20; // Base score for unknown schema

  const activeSchema = context.state.active_schemas.find(
    s => s.schema === candidate.schema_id
  );

  if (!activeSchema) return 20; // Not an active schema

  // Heat is 0-100, directly use it
  return activeSchema.heat;
}

// ============================================================================
// KBE APPROPRIATENESS SCORING
// ============================================================================

/**
 * Score whether user is ready for this KBE layer
 * Higher score = appropriate progression
 */
export function scoreKBEAppropriateness(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  if (!candidate.schema_id) return 50; // Neutral if no schema

  const readiness = context.state.kbe_readiness.find(
    k => k.schema === candidate.schema_id
  );

  if (!readiness) return 50; // No data = neutral

  const layerOrder = ['knowing', 'believing', 'embodying'];
  const currentIdx = layerOrder.indexOf(readiness.current_layer);
  const targetIdx = layerOrder.indexOf(candidate.kbe_target);

  // Serving current layer = high score
  if (readiness.current_layer === candidate.kbe_target) {
    return 80;
  }

  // Serving next layer and ready = very high score
  if (targetIdx === currentIdx + 1 && readiness.ready_for_next) {
    return 90 * readiness.confidence;
  }

  // Jumping ahead too far = low score
  if (targetIdx > currentIdx + 1) {
    return 20;
  }

  // Going backwards (review) = medium score
  if (targetIdx < currentIdx) {
    return 60;
  }

  return 50;
}

// ============================================================================
// AROUSAL SAFETY SCORING
// ============================================================================

/**
 * Score whether heat_level is appropriate for current arousal
 * Higher score = safer match
 */
export function scoreArousalSafety(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  if (!candidate.heat_level) return 100; // No heat level = assume safe

  const heatToLevel: Record<string, number> = { low: 0, medium: 1, high: 2 };
  const arousalToLevel: Record<string, number> = { green: 0, amber: 1, red: 2 };

  const heatLevel = heatToLevel[candidate.heat_level] ?? 1;
  const arousalLevel = arousalToLevel[context.state.current_arousal] ?? 1;

  // Perfect match
  if (heatLevel === arousalLevel) return 100;

  // Safe (higher heat for lower arousal)
  if (heatLevel > arousalLevel) return 70 + (heatLevel - arousalLevel) * 10;

  // Unsafe (lower heat for higher arousal)
  return Math.max(0, 50 - (arousalLevel - heatLevel) * 20);
}

// ============================================================================
// FAMILY EFFECTIVENESS SCORING
// ============================================================================

/**
 * Score based on past performance of this family
 * Higher score = this delivery mechanism works for this user
 */
export function scoreFamilyEffectiveness(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  const perf = context.state.family_performance.find(
    f => f.family === candidate.family
  );

  if (!perf) return 50; // No data = neutral

  // Combine engagement and resonance
  return (perf.engagement_score + perf.resonance_score) / 2;
}

// ============================================================================
// COUNCIL RESONANCE SCORING
// ============================================================================

/**
 * Score based on council voice performance (Batch 3)
 * Higher score = this wisdom voice resonates
 */
export function scoreCouncilResonance(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  if (!candidate.council_lens || !context.state.council_performance) {
    return 50; // Neutral if not applicable
  }

  const perf = context.state.council_performance.find(
    c => c.lens === candidate.council_lens
  );

  if (!perf) return 50; // No data = neutral

  return perf.resonance_score;
}

// ============================================================================
// WAY PROCESS FIT SCORING
// ============================================================================

/**
 * Score based on way process performance (Batch 3)
 * Higher score = this mechanism works
 */
export function scoreWayProcessFit(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  if (!candidate.way_process || !context.state.way_performance) {
    return 50; // Neutral if not applicable
  }

  const perf = context.state.way_performance.find(
    w => w.process === candidate.way_process
  );

  if (!perf) return 50; // No data = neutral

  return perf.effectiveness_score;
}

// ============================================================================
// NOVELTY SCORING
// ============================================================================

/**
 * Score based on recency
 * Higher score = not served recently
 */
export function scoreNovelty(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  // Recently served (last 30min) = very low score
  if (context.recent_navicues.includes(candidate.navicue_id)) {
    return 10;
  }

  return 100; // Not recently served = high novelty
}

// ============================================================================
// VARIETY SCORING
// ============================================================================

/**
 * Score based on diversity needs
 * Higher score = adds variety to today's mix
 */
export function scoreVariety(
  candidate: ScoringCandidate,
  context: ScoringContext
): number {
  let score = 100;

  // Penalize if pillar seen today
  if (context.seen_pillars_today.includes(candidate.pillar_id)) {
    score -= 20;
  }

  // Penalize if family seen today
  if (context.seen_families_today.includes(candidate.family)) {
    score -= 20;
  }

  // Penalize if schema seen today
  if (candidate.schema_id && context.seen_schemas_today.includes(candidate.schema_id)) {
    score -= 20;
  }

  // Check rotation needs from state
  if (context.state.family_rotation_needed.includes(candidate.family)) {
    score -= 30;
  }

  if (candidate.schema_id && context.state.schema_rotation_needed.includes(candidate.schema_id)) {
    score -= 20;
  }

  return Math.max(0, score);
}

// ============================================================================
// COMPOSITE SCORING
// ============================================================================

/**
 * Get strategy-specific weights
 */
export function getStrategyWeights(strategy: OrchestrationStrategy) {
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

/**
 * Compute composite score for a candidate
 */
export function scoreCandidate(
  candidate: ScoringCandidate,
  context: ScoringContext
): NaviCueSelectionCriteria {
  // Compute individual scores
  const schema_match_score = scoreSchemaMatch(candidate, context);
  const kbe_appropriateness_score = scoreKBEAppropriateness(candidate, context);
  const arousal_safety_score = scoreArousalSafety(candidate, context);
  const family_effectiveness_score = scoreFamilyEffectiveness(candidate, context);
  const council_resonance_score = scoreCouncilResonance(candidate, context);
  const way_process_fit_score = scoreWayProcessFit(candidate, context);
  const novelty_score = scoreNovelty(candidate, context);
  const variety_score = scoreVariety(candidate, context);

  // Get strategy weights
  const weights = getStrategyWeights(context.strategy);

  // Compute weighted total
  const total_score =
    schema_match_score * weights.schema +
    kbe_appropriateness_score * weights.kbe +
    arousal_safety_score * weights.arousal +
    family_effectiveness_score * weights.family +
    council_resonance_score * weights.council +
    way_process_fit_score * weights.way +
    novelty_score * weights.novelty +
    variety_score * weights.variety;

  return {
    schema_match_score,
    kbe_appropriateness_score,
    arousal_safety_score,
    family_effectiveness_score,
    council_resonance_score,
    way_process_fit_score,
    novelty_score,
    variety_score,
    total_score,
    rank: 0, // Will be set after sorting
  };
}

/**
 * Score and rank all candidates
 */
export function scoreAndRankCandidates(
  candidates: ScoringCandidate[],
  context: ScoringContext
): Array<{ candidate: ScoringCandidate; criteria: NaviCueSelectionCriteria }> {
  // Score all candidates
  const scored = candidates.map(candidate => ({
    candidate,
    criteria: scoreCandidate(candidate, context),
  }));

  // Sort by total score (descending)
  scored.sort((a, b) => b.criteria.total_score - a.criteria.total_score);

  // Assign ranks
  scored.forEach((item, idx) => {
    item.criteria.rank = idx + 1;
  });

  return scored;
}

// ============================================================================
// SELECTION EXPLANATION
// ============================================================================

/**
 * Build human-readable explanation for selection
 */
export function explainSelection(
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
  if (criteria.arousal_safety_score === 100) {
    reasons.push('arousal_perfect_fit');
  }

  if (reasons.length === 0) {
    return strategy;
  }

  return reasons.join('|');
}

// ============================================================================
// EXPORT
// ============================================================================

export const AdvancedScoring = {
  scoreCandidate,
  scoreAndRankCandidates,
  explainSelection,
  getStrategyWeights,
  
  // Individual scoring functions
  scoreSchemaMatch,
  scoreKBEAppropriateness,
  scoreArousalSafety,
  scoreFamilyEffectiveness,
  scoreCouncilResonance,
  scoreWayProcessFit,
  scoreNovelty,
  scoreVariety,
};
