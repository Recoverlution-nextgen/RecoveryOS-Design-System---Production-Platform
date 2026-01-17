/**
 * RECOVERLUTION TAXONOMY SEED DATA
 * 
 * Initial structure for:
 * - 6 Pillars (already defined in taxonomy.ts)
 * - 2-3 Concepts per pillar
 * - 2-3 Themes per concept  
 * - 5-10 Blocks per theme (sample structure)
 * 
 * This creates the foundational learning architecture.
 * Content (articles, insights, journeys, practices) will map to these blocks.
 */

import type { Concept, Theme, Block, PillarCode } from './taxonomy';

// ============================================================================
// CONCEPTS
// ============================================================================

export const CONCEPTS: Concept[] = [
  // -------------------------------------------------------------------------
  // EMOTIONAL REGULATION (ER)
  // -------------------------------------------------------------------------
  {
    id: 'ER_WOT',
    type: 'concept',
    pillar_id: 'ER',
    name: 'Window of Tolerance',
    theory: 'The Window of Tolerance is a neurobiological concept developed by Dr. Dan Siegel that describes the optimal zone of arousal where we can effectively process emotions and respond to stress. Outside this window, we become either hyperaroused (anxious, panicked) or hypoaroused (numb, shut down).',
    science_refs: [
      'Siegel, D. (1999). The Developing Mind',
      'Ogden, P., Minton, K., & Pain, C. (2006). Trauma and the Body',
      'Porges, S. (2011). The Polyvagal Theory'
    ],
    order: 1
  },
  {
    id: 'ER_EID',
    type: 'concept',
    pillar_id: 'ER',
    name: 'Emotion Identification',
    theory: 'Emotional granularity refers to the ability to identify and label emotions with precision. Research shows that people who can differentiate between nuanced emotional states (distinguishing "anxious" from "overwhelmed" from "stressed") demonstrate better emotional regulation and mental health outcomes.',
    science_refs: [
      'Barrett, L. F. (2017). How Emotions Are Made',
      'Kircanski, K., et al. (2012). Feelings into words'
    ],
    order: 2
  },
  {
    id: 'ER_REG',
    type: 'concept',
    pillar_id: 'ER',
    name: 'Regulation Strategies',
    theory: 'Emotion regulation encompasses the processes by which we influence which emotions we have, when we have them, and how we experience and express them. Adaptive strategies include reappraisal, acceptance, and problem-solving, while maladaptive strategies include suppression and avoidance.',
    science_refs: [
      'Gross, J. J. (2015). Emotion Regulation: Current Status and Future Prospects',
      'Aldao, A., et al. (2010). Emotion regulation strategies'
    ],
    order: 3
  },

  // -------------------------------------------------------------------------
  // STRESS RESILIENCE (SR)
  // -------------------------------------------------------------------------
  {
    id: 'SR_ACT',
    type: 'concept',
    pillar_id: 'SR',
    name: 'Stress Activation',
    theory: 'The stress response (fight-flight-freeze) is an adaptive survival mechanism governed by the sympathetic nervous system. Understanding how stress activates the body helps us recognize when we are in a threat response versus actual danger.',
    science_refs: [
      'Sapolsky, R. (2004). Why Zebras Don\'t Get Ulcers',
      'McEwen, B. S. (2007). Physiology and neurobiology of stress'
    ],
    order: 1
  },
  {
    id: 'SR_REC',
    type: 'concept',
    pillar_id: 'SR',
    name: 'Recovery & Rest',
    theory: 'Resilience requires adequate recovery. The parasympathetic nervous system facilitates rest and digest processes that allow the body to repair and restore after stress. Chronic stress without recovery leads to allostatic load and burnout.',
    science_refs: [
      'Geurts, S., & Sonnentag, S. (2006). Recovery as an explanatory mechanism',
      'Meijman, T. F., & Mulder, G. (1998). Psychological aspects of workload'
    ],
    order: 2
  },
  {
    id: 'SR_COP',
    type: 'concept',
    pillar_id: 'SR',
    name: 'Coping Mechanisms',
    theory: 'Coping strategies can be problem-focused (addressing the stressor directly) or emotion-focused (managing emotional responses). Effective coping involves flexibility in selecting strategies based on controllability of the stressor.',
    science_refs: [
      'Lazarus, R. S., & Folkman, S. (1984). Stress, Appraisal, and Coping',
      'Carver, C. S., et al. (1989). Assessing coping strategies'
    ],
    order: 3
  },

  // -------------------------------------------------------------------------
  // SOCIAL SUPPORT (SS)
  // -------------------------------------------------------------------------
  {
    id: 'SS_CON',
    type: 'concept',
    pillar_id: 'SS',
    name: 'Healthy Connection',
    theory: 'Social connection is a fundamental human need. Secure attachment and healthy relationships buffer against stress, improve immune function, and are predictive of longevity and wellbeing.',
    science_refs: [
      'Bowlby, J. (1988). A Secure Base',
      'Holt-Lunstad, J., et al. (2010). Social relationships and mortality risk'
    ],
    order: 1
  },
  {
    id: 'SS_BND',
    type: 'concept',
    pillar_id: 'SS',
    name: 'Boundaries & Communication',
    theory: 'Healthy boundaries involve understanding and communicating our needs, limits, and values. Clear boundaries protect relationships and prevent resentment while allowing for authentic connection.',
    science_refs: [
      'Brown, B. (2010). The Gifts of Imperfection',
      'Gottman, J. (1999). The Seven Principles for Making Marriage Work'
    ],
    order: 2
  },

  // -------------------------------------------------------------------------
  // MEANING & REFLECTION (MR)
  // -------------------------------------------------------------------------
  {
    id: 'MR_PUR',
    type: 'concept',
    pillar_id: 'MR',
    name: 'Purpose & Values',
    theory: 'Living in alignment with personal values and cultivating a sense of purpose are associated with greater life satisfaction, resilience, and psychological wellbeing. Purpose provides direction and motivation beyond immediate gratification.',
    science_refs: [
      'Frankl, V. (1946). Man\'s Search for Meaning',
      'Damon, W., et al. (2003). The development of purpose'
    ],
    order: 1
  },
  {
    id: 'MR_REF',
    type: 'concept',
    pillar_id: 'MR',
    name: 'Reflective Practice',
    theory: 'Self-reflection and metacognition (thinking about thinking) enhance learning, emotional processing, and behavioral change. Structured reflection practices like journaling have been shown to reduce stress and improve wellbeing.',
    science_refs: [
      'Pennebaker, J. W. (1997). Writing about emotional experiences',
      'Schon, D. (1983). The Reflective Practitioner'
    ],
    order: 2
  },

  // -------------------------------------------------------------------------
  // IDENTITY & CONFIDENCE (IC)
  // -------------------------------------------------------------------------
  {
    id: 'IC_SEL',
    type: 'concept',
    pillar_id: 'IC',
    name: 'Self-Concept',
    theory: 'Identity is not fixed but continually shaped by experiences, relationships, and reflection. A coherent sense of self supports psychological wellbeing, while identity disruption (common in recovery) requires intentional reconstruction.',
    science_refs: [
      'Erikson, E. (1968). Identity: Youth and Crisis',
      'McAdams, D. P. (2001). The psychology of life stories'
    ],
    order: 1
  },
  {
    id: 'IC_EFF',
    type: 'concept',
    pillar_id: 'IC',
    name: 'Self-Efficacy',
    theory: 'Self-efficacy is the belief in one\'s ability to succeed in specific situations. High self-efficacy influences goal-setting, effort, persistence, and resilience in the face of setbacks.',
    science_refs: [
      'Bandura, A. (1997). Self-efficacy: The exercise of control',
      'Maddux, J. E. (2009). Self-efficacy: The power of believing you can'
    ],
    order: 2
  },

  // -------------------------------------------------------------------------
  // PHYSICAL SELF-CARE (PS)
  // -------------------------------------------------------------------------
  {
    id: 'PS_SLP',
    type: 'concept',
    pillar_id: 'PS',
    name: 'Sleep & Circadian Health',
    theory: 'Sleep is essential for physical health, cognitive function, emotional regulation, and memory consolidation. Circadian rhythms govern sleep-wake cycles and disruptions contribute to numerous health issues.',
    science_refs: [
      'Walker, M. (2017). Why We Sleep',
      'Czeisler, C. A., & Gooley, J. J. (2007). Sleep and circadian rhythms'
    ],
    order: 1
  },
  {
    id: 'PS_NUT',
    type: 'concept',
    pillar_id: 'PS',
    name: 'Nutrition & Energy',
    theory: 'Nutrition directly impacts brain function, mood, energy, and physical health. The gut-brain axis connects digestive health to mental wellbeing through neurotransmitter production and inflammatory pathways.',
    science_refs: [
      'Jacka, F. N., et al. (2017). Nutritional psychiatry',
      'Sarris, J., et al. (2015). Nutritional medicine as mainstream'
    ],
    order: 2
  },
  {
    id: 'PS_MOV',
    type: 'concept',
    pillar_id: 'PS',
    name: 'Movement & Exercise',
    theory: 'Physical activity has profound effects on mental health through neuroplasticity, neurotransmitter production, stress reduction, and improved self-efficacy. Both aerobic and resistance training show mental health benefits.',
    science_refs: [
      'Ratey, J. (2008). Spark: The Revolutionary New Science of Exercise',
      'Ekkekakis, P. (2013). The Routledge Handbook of Physical Activity'
    ],
    order: 3
  }
];

// ============================================================================
// THEMES
// ============================================================================

export const THEMES: Theme[] = [
  // -------------------------------------------------------------------------
  // EMOTIONAL REGULATION - Window of Tolerance
  // -------------------------------------------------------------------------
  {
    id: 'ER_WOT_REC',
    type: 'theme',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    name: 'Recognizing Your Window',
    function: 'Learning to identify when you are inside, above (hyperaroused), or below (hypoaroused) your window of tolerance in real-time, enabling you to take appropriate regulating action.',
    order: 1,
    total_blocks: 6
  },
  {
    id: 'ER_WOT_EXP',
    type: 'theme',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    name: 'Expanding Your Capacity',
    function: 'Gradually increasing the range of emotions and sensations you can tolerate without becoming dysregulated, building resilience over time.',
    order: 2,
    total_blocks: 5
  },
  {
    id: 'ER_WOT_NAV',
    type: 'theme',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    name: 'Navigating Dysregulation',
    function: 'Developing practical skills to return to your window when you notice you have moved outside it, whether hyperaroused or hypoaroused.',
    order: 3,
    total_blocks: 7
  },

  // -------------------------------------------------------------------------
  // EMOTIONAL REGULATION - Emotion Identification
  // -------------------------------------------------------------------------
  {
    id: 'ER_EID_NAM',
    type: 'theme',
    concept_id: 'ER_EID',
    pillar_id: 'ER',
    name: 'Naming Emotions',
    function: 'Building a rich emotional vocabulary to differentiate between similar feeling states, increasing precision in identifying what you are experiencing.',
    order: 1,
    total_blocks: 5
  },
  {
    id: 'ER_EID_BOD',
    type: 'theme',
    concept_id: 'ER_EID',
    pillar_id: 'ER',
    name: 'Body-Emotion Connection',
    function: 'Recognizing how emotions manifest as physical sensations in your body, using somatic awareness as emotional information.',
    order: 2,
    total_blocks: 6
  },

  // -------------------------------------------------------------------------
  // STRESS RESILIENCE - Stress Activation
  // -------------------------------------------------------------------------
  {
    id: 'SR_ACT_REC',
    type: 'theme',
    concept_id: 'SR_ACT',
    pillar_id: 'SR',
    name: 'Recognizing Stress Signals',
    function: 'Identifying physical, emotional, and cognitive signs that your stress response has been activated, enabling early intervention.',
    order: 1,
    total_blocks: 5
  },
  {
    id: 'SR_ACT_TRI',
    type: 'theme',
    concept_id: 'SR_ACT',
    pillar_id: 'SR',
    name: 'Understanding Triggers',
    function: 'Mapping what situations, thoughts, or experiences tend to activate your stress response, building awareness of your unique patterns.',
    order: 2,
    total_blocks: 6
  },

  // -------------------------------------------------------------------------
  // STRESS RESILIENCE - Recovery & Rest
  // -------------------------------------------------------------------------
  {
    id: 'SR_REC_ACT',
    type: 'theme',
    concept_id: 'SR_REC',
    pillar_id: 'SR',
    name: 'Active Recovery',
    function: 'Engaging in intentional practices that activate the parasympathetic nervous system and facilitate physical and mental recovery.',
    order: 1,
    total_blocks: 6
  },

  // Add more themes for other concepts...
  // (Abbreviated for brevity - would continue for all concepts)
];

// ============================================================================
// BLOCKS (Sample for ER_WOT_REC theme)
// ============================================================================

export const BLOCKS: Block[] = [
  // -------------------------------------------------------------------------
  // THEME: Recognizing Your Window (ER_WOT_REC)
  // -------------------------------------------------------------------------
  {
    id: 'ER_WOT_REC_001',
    type: 'block',
    theme_id: 'ER_WOT_REC',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    learning_objective: 'Identify personal signs of hyperarousal',
    competency_description: 'Can recognize when their nervous system is activated above their window of tolerance (anxious, panicked, overwhelmed)',
    assessment_signals: [
      'navicue_energy_patterns',
      'navicue_physical_sensations',
      'journey_checkpoint_accuracy',
      'state_tracking_self_awareness'
    ],
    order: 1,
    difficulty: 'beginner'
  },
  {
    id: 'ER_WOT_REC_002',
    type: 'block',
    theme_id: 'ER_WOT_REC',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    learning_objective: 'Identify personal signs of hypoarousal',
    competency_description: 'Can recognize when their nervous system is deactivated below their window of tolerance (numb, shut down, dissociated)',
    assessment_signals: [
      'navicue_energy_patterns',
      'navicue_engagement_levels',
      'journey_checkpoint_accuracy',
      'state_tracking_self_awareness'
    ],
    order: 2,
    difficulty: 'beginner'
  },
  {
    id: 'ER_WOT_REC_003',
    type: 'block',
    theme_id: 'ER_WOT_REC',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    learning_objective: 'Identify when in optimal arousal zone',
    competency_description: 'Can recognize when they are within their window of tolerance (calm, alert, present, able to process)',
    assessment_signals: [
      'navicue_daily_checkins',
      'state_tracking_patterns',
      'wellbeing_pillar_score'
    ],
    order: 3,
    difficulty: 'beginner'
  },
  {
    id: 'ER_WOT_REC_004',
    type: 'block',
    theme_id: 'ER_WOT_REC',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    learning_objective: 'Track arousal patterns over time',
    competency_description: 'Can identify daily and weekly patterns in their window fluctuations, noticing trends and contributing factors',
    assessment_signals: [
      'navicue_pattern_analysis',
      'state_tracking_consistency',
      'journey_reflection_quality'
    ],
    order: 4,
    difficulty: 'intermediate'
  },
  {
    id: 'ER_WOT_REC_005',
    type: 'block',
    theme_id: 'ER_WOT_REC',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    learning_objective: 'Differentiate between similar arousal states',
    competency_description: 'Can distinguish between nuanced states (e.g., anxious vs overwhelmed, tired vs dissociated)',
    assessment_signals: [
      'navicue_granularity',
      'journey_checkpoint_accuracy',
      'content_engagement_insights'
    ],
    order: 5,
    difficulty: 'intermediate'
  },
  {
    id: 'ER_WOT_REC_006',
    type: 'block',
    theme_id: 'ER_WOT_REC',
    concept_id: 'ER_WOT',
    pillar_id: 'ER',
    learning_objective: 'Predict arousal shifts before they occur',
    competency_description: 'Can anticipate when they are likely to move out of their window based on early warning signs',
    assessment_signals: [
      'navicue_predictive_accuracy',
      'state_tracking_proactive_use',
      'practice_completion_timing'
    ],
    order: 6,
    difficulty: 'advanced'
  },

  // -------------------------------------------------------------------------
  // Additional blocks would be defined for all themes...
  // -------------------------------------------------------------------------
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all concepts for a pillar
 */
export function getConceptsForPillar(pillarId: PillarCode): Concept[] {
  return CONCEPTS.filter(c => c.pillar_id === pillarId).sort((a, b) => a.order - b.order);
}

/**
 * Get all themes for a concept
 */
export function getThemesForConcept(conceptId: string): Theme[] {
  return THEMES.filter(t => t.concept_id === conceptId).sort((a, b) => a.order - b.order);
}

/**
 * Get all blocks for a theme
 */
export function getBlocksForTheme(themeId: string): Block[] {
  return BLOCKS.filter(b => b.theme_id === themeId).sort((a, b) => a.order - b.order);
}

/**
 * Get complete hierarchy for a pillar
 */
export function getPillarHierarchy(pillarId: PillarCode) {
  const concepts = getConceptsForPillar(pillarId);
  
  return concepts.map(concept => ({
    concept,
    themes: getThemesForConcept(concept.id).map(theme => ({
      theme,
      blocks: getBlocksForTheme(theme.id)
    }))
  }));
}

/**
 * Count totals
 */
export function getTaxonomyStats() {
  return {
    pillars: 6,
    concepts: CONCEPTS.length,
    themes: THEMES.length,
    blocks: BLOCKS.length,
    avg_concepts_per_pillar: CONCEPTS.length / 6,
    avg_themes_per_concept: THEMES.length / CONCEPTS.length,
    avg_blocks_per_theme: BLOCKS.length / THEMES.length
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  CONCEPTS,
  THEMES,
  BLOCKS,
  getConceptsForPillar,
  getThemesForConcept,
  getBlocksForTheme,
  getPillarHierarchy,
  getTaxonomyStats
};
