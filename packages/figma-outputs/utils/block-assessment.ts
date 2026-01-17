/**
 * RECOVERLUTION BLOCK ASSESSMENT SYSTEM
 * 
 * Calculates red/orange/green status for each learning block based on:
 * - Navicue responses and patterns
 * - Journey checkpoint comprehension
 * - State tracking self-awareness
 * - Wellbeing pillar scores
 * - Health data (HRV, sleep, etc.)
 * - Content engagement (articles, insights, practices)
 * - LUMA pattern analysis
 */

import type { BlockStatus, PillarCode } from './taxonomy';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AssessmentData {
  // Daily check-ins and patterns
  navicue_signals?: {
    last_30_days: number;
    relevant_responses: number;
    pattern?: string;
    accuracy_score?: number; // 0-100
  };
  
  // Journey checkpoint performance
  journey_data?: {
    [journeyId: string]: {
      completed: boolean;
      checkpoint_scores: number[]; // 0-100 for each checkpoint
      avg_comprehension: number;
    };
  };
  
  // State tracking patterns
  state_tracking?: {
    total_logs: number;
    dysregulation_events: number;
    self_identified_correctly: number;
    pattern?: string;
    self_awareness_score?: number; // 0-100
  };
  
  // Content engagement
  content_engagement?: {
    [contentId: string]: {
      type: 'article' | 'insight' | 'practice' | 'video';
      completed: boolean;
      score?: number; // 0-100
      attempts?: number;
    };
  };
  
  // Wellbeing pillar score (from Wellbeing page)
  wellbeing_pillar?: {
    pillar_score: number; // 0-100
    trend?: 'improving' | 'stable' | 'declining';
  };
  
  // Health data signals
  health_data?: {
    avg_hrv?: 'low' | 'medium' | 'high';
    sleep_quality?: 'poor' | 'fair' | 'good';
    pattern?: string;
  };
}

export interface LUMAInsight {
  diagnosis: string;
  recommended_content: Array<{
    type: 'article' | 'insight' | 'practice' | 'journey' | 'navicue';
    id: string;
    reason: string;
    priority?: 'low' | 'medium' | 'high';
  }>;
  should_revisit: boolean;
  priority: 'low' | 'medium' | 'high';
  personalized_message?: string;
}

export interface UserBlockProgress {
  user_id: string;
  block_id: string;
  
  // The traffic light status
  status: BlockStatus;
  confidence_score: number; // 0-100 (how confident we are in this assessment)
  
  // All the signals we used to determine status
  assessment_data: AssessmentData;
  
  // LUMA's analysis and recommendations
  luma_insights?: LUMAInsight;
  
  // Metadata
  last_assessed: string; // ISO timestamp
  last_updated: string; // ISO timestamp
  next_assessment_due?: string; // ISO timestamp
}

// ============================================================================
// STATUS CALCULATION
// ============================================================================

/**
 * Calculate block status based on assessment data
 * 
 * LOGIC:
 * - Red (0-40): Struggling, needs immediate attention
 * - Orange (41-70): Developing, making progress
 * - Green (71-100): Proficient, demonstrating competency
 */
export function calculateBlockStatus(
  assessmentData: AssessmentData
): { status: BlockStatus; score: number; confidence: number } {
  
  const scores: number[] = [];
  const weights: number[] = [];
  
  // 1. NAVICUE SIGNALS (Weight: 25%)
  if (assessmentData.navicue_signals?.accuracy_score !== undefined) {
    scores.push(assessmentData.navicue_signals.accuracy_score);
    weights.push(0.25);
  }
  
  // 2. JOURNEY COMPREHENSION (Weight: 20%)
  if (assessmentData.journey_data) {
    const journeyScores = Object.values(assessmentData.journey_data)
      .filter(j => j.completed)
      .map(j => j.avg_comprehension);
    
    if (journeyScores.length > 0) {
      const avgJourneyScore = journeyScores.reduce((a, b) => a + b, 0) / journeyScores.length;
      scores.push(avgJourneyScore);
      weights.push(0.20);
    }
  }
  
  // 3. STATE TRACKING SELF-AWARENESS (Weight: 20%)
  if (assessmentData.state_tracking?.self_awareness_score !== undefined) {
    scores.push(assessmentData.state_tracking.self_awareness_score);
    weights.push(0.20);
  }
  
  // 4. CONTENT ENGAGEMENT (Weight: 15%)
  if (assessmentData.content_engagement) {
    const contentScores = Object.values(assessmentData.content_engagement)
      .filter(c => c.completed && c.score !== undefined)
      .map(c => c.score!);
    
    if (contentScores.length > 0) {
      const avgContentScore = contentScores.reduce((a, b) => a + b, 0) / contentScores.length;
      scores.push(avgContentScore);
      weights.push(0.15);
    }
  }
  
  // 5. WELLBEING PILLAR SCORE (Weight: 20%)
  if (assessmentData.wellbeing_pillar?.pillar_score !== undefined) {
    scores.push(assessmentData.wellbeing_pillar.pillar_score);
    weights.push(0.20);
  }
  
  // Calculate weighted average
  if (scores.length === 0) {
    return { status: 'unknown', score: 0, confidence: 0 };
  }
  
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const normalizedWeights = weights.map(w => w / totalWeight);
  
  const weightedScore = scores.reduce((sum, score, i) => {
    return sum + (score * normalizedWeights[i]);
  }, 0);
  
  // Determine status
  let status: BlockStatus;
  if (weightedScore >= 71) {
    status = 'green';
  } else if (weightedScore >= 41) {
    status = 'orange';
  } else {
    status = 'red';
  }
  
  // Confidence based on number of signals
  const confidence = Math.min(100, (scores.length / 5) * 100);
  
  return {
    status,
    score: Math.round(weightedScore),
    confidence: Math.round(confidence)
  };
}

/**
 * Calculate Navicue accuracy score
 * Measures how well user responses align with expected patterns
 */
export function calculateNavicueAccuracy(
  responses: Array<{
    expected_pattern?: string;
    actual_response: any;
    matches_expectation?: boolean;
  }>
): number {
  if (responses.length === 0) return 0;
  
  const matches = responses.filter(r => r.matches_expectation === true).length;
  return Math.round((matches / responses.length) * 100);
}

/**
 * Calculate self-awareness score from state tracking
 * Measures how often user correctly identifies their state
 */
export function calculateSelfAwarenessScore(
  total_logs: number,
  correctly_identified: number
): number {
  if (total_logs === 0) return 0;
  return Math.round((correctly_identified / total_logs) * 100);
}

// ============================================================================
// LUMA PATTERN ANALYSIS
// ============================================================================

/**
 * Generate LUMA insights based on assessment data
 * This is where AI/ML would eventually analyze patterns
 */
export function generateLUMAInsights(
  blockId: string,
  assessmentData: AssessmentData,
  currentStatus: BlockStatus,
  score: number
): LUMAInsight {
  
  const recommendations: LUMAInsight['recommended_content'] = [];
  let diagnosis = '';
  let priority: 'low' | 'medium' | 'high' = 'low';
  
  // PATTERN: Low navicue accuracy
  if (assessmentData.navicue_signals && 
      assessmentData.navicue_signals.accuracy_score !== undefined &&
      assessmentData.navicue_signals.accuracy_score < 50) {
    
    diagnosis = 'Struggling to identify patterns in daily experiences';
    priority = 'high';
    
    recommendations.push({
      type: 'practice',
      id: 'PRAC_BS_001', // Body scan practice
      reason: 'Build foundational awareness through body scanning',
      priority: 'high'
    });
    
    recommendations.push({
      type: 'navicue',
      id: 'NAVICUE_DAILY_CHECK',
      reason: 'Continue daily check-ins to build pattern recognition',
      priority: 'medium'
    });
  }
  
  // PATTERN: Low journey comprehension
  if (assessmentData.journey_data) {
    const journeyScores = Object.values(assessmentData.journey_data)
      .filter(j => j.completed)
      .map(j => j.avg_comprehension);
    
    const avgScore = journeyScores.length > 0 
      ? journeyScores.reduce((a, b) => a + b, 0) / journeyScores.length 
      : 0;
    
    if (avgScore < 60) {
      diagnosis = diagnosis || 'Concepts understood but need reinforcement';
      
      recommendations.push({
        type: 'insight',
        id: `INSIGHT_${blockId}`, // Retry with different approach
        reason: 'Interactive learning with immediate feedback',
        priority: 'high'
      });
    }
  }
  
  // PATTERN: Low content engagement
  if (assessmentData.content_engagement) {
    const completed = Object.values(assessmentData.content_engagement)
      .filter(c => c.completed).length;
    const total = Object.keys(assessmentData.content_engagement).length;
    
    if (completed < total * 0.5) {
      diagnosis = diagnosis || 'Limited exposure to learning materials';
      priority = priority === 'high' ? 'high' : 'medium';
      
      recommendations.push({
        type: 'article',
        id: `ARTICLE_${blockId}`,
        reason: 'Deep dive into foundational concepts',
        priority: 'medium'
      });
    }
  }
  
  // DEFAULT: General improvement path
  if (recommendations.length === 0) {
    diagnosis = currentStatus === 'red' 
      ? 'Beginning the learning journey'
      : currentStatus === 'orange'
      ? 'Making steady progress'
      : 'Demonstrating strong competency';
    
    if (currentStatus !== 'green') {
      recommendations.push({
        type: 'insight',
        id: `INSIGHT_${blockId}`,
        reason: 'Continue building understanding',
        priority: 'medium'
      });
    }
  }
  
  return {
    diagnosis,
    recommended_content: recommendations,
    should_revisit: currentStatus === 'red' || score < 60,
    priority,
    personalized_message: generatePersonalizedMessage(currentStatus, score, diagnosis)
  };
}

/**
 * Generate personalized message for user
 */
function generatePersonalizedMessage(
  status: BlockStatus,
  score: number,
  diagnosis: string
): string {
  if (status === 'green') {
    return `You're demonstrating strong understanding here. Consider revisiting in 30 days to maintain proficiency.`;
  }
  
  if (status === 'orange') {
    return `You're making good progress. ${diagnosis}. Keep building on this foundation.`;
  }
  
  // Red
  return `This area needs attention. ${diagnosis}. Let's create a focused plan to build your skills here.`;
}

// ============================================================================
// ROLLUP CALCULATIONS
// ============================================================================

/**
 * Calculate theme status from block statuses
 */
export function calculateThemeStatus(
  blockStatuses: Array<{ status: BlockStatus; score: number }>
): { status: BlockStatus; score: number } {
  
  if (blockStatuses.length === 0) {
    return { status: 'unknown', score: 0 };
  }
  
  const avgScore = blockStatuses.reduce((sum, b) => sum + b.score, 0) / blockStatuses.length;
  
  let status: BlockStatus;
  if (avgScore >= 71) {
    status = 'green';
  } else if (avgScore >= 41) {
    status = 'orange';
  } else {
    status = 'red';
  }
  
  return { status, score: Math.round(avgScore) };
}

/**
 * Calculate concept status from theme statuses
 */
export function calculateConceptStatus(
  themeStatuses: Array<{ status: BlockStatus; score: number }>
): { status: BlockStatus; score: number } {
  return calculateThemeStatus(themeStatuses); // Same logic
}

/**
 * Calculate pillar status from concept statuses
 * This should align with Wellbeing page pillar scores
 */
export function calculatePillarStatus(
  conceptStatuses: Array<{ status: BlockStatus; score: number }>
): { status: BlockStatus; score: number } {
  return calculateThemeStatus(conceptStatuses); // Same logic
}

// ============================================================================
// KV STORE KEYS
// ============================================================================

export const AssessmentKeys = {
  // User progress
  userBlockProgress: (userId: string, blockId: string) => 
    `progress:${userId}:block:${blockId}`,
  
  userThemeProgress: (userId: string, themeId: string) => 
    `progress:${userId}:theme:${themeId}`,
  
  userConceptProgress: (userId: string, conceptId: string) => 
    `progress:${userId}:concept:${conceptId}`,
  
  userPillarProgress: (userId: string, pillarId: PillarCode) => 
    `progress:${userId}:pillar:${pillarId}`,
  
  // All blocks for a user
  allUserBlocks: (userId: string) => `progress:${userId}:block:`,
  
  // All themes for a user
  allUserThemes: (userId: string) => `progress:${userId}:theme:`,
  
  // All concepts for a user
  allUserConcepts: (userId: string) => `progress:${userId}:concept:`,
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  calculateBlockStatus,
  calculateNavicueAccuracy,
  calculateSelfAwarenessScore,
  generateLUMAInsights,
  calculateThemeStatus,
  calculateConceptStatus,
  calculatePillarStatus,
  AssessmentKeys
};
