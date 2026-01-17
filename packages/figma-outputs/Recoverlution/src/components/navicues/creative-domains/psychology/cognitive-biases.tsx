/**
 * PSYCHOLOGY: COGNITIVE BIASES
 * 
 * Turn cognitive biases into self-awareness tools
 * Each bias becomes a NaviCue that helps users recognize their own thinking errors
 */

import { NaviCue } from '../../NaviCueEngine';

// ============================================================================
// CONFIRMATION BIAS
// ============================================================================

export const ConfirmationBias: NaviCue = {
  id: 'BIAS-001',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You see what confirms what you already believe. The brain is not a search engine. It is a confirmation machine.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Selective Attention',
  response_type: 'binary',
  response_options: {
    binary_left: 'I notice this',
    binary_right: 'I don\'t see it',
  },
  kbe_target: 'knowing',
};

export const SeekingDisconfirmation: NaviCue = {
  id: 'BIAS-002',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Ask not "What confirms this?" Ask "What would prove this wrong?" Scientists falsify. Believers confirm.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Falsification Mindset',
  response_type: 'voice10',
  kbe_target: 'believing',
};

export const EchoChambersEverywhere: NaviCue = {
  id: 'BIAS-003',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You surround yourself with people who agree with you. Then you think everyone agrees with you. Echo chambers are invisible from inside.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Social Confirmation',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

// ============================================================================
// ANCHORING BIAS
// ============================================================================

export const AnchoringBias: NaviCue = {
  id: 'BIAS-004',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The first number you hear becomes the anchor. Every judgment after is relative to it. You are being anchored constantly.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Reference Point Manipulation',
  response_type: 'slider',
  response_options: {
    slider_label: 'How influenced are you by first impressions?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const ResetTheAnchor: NaviCue = {
  id: 'BIAS-005',
  family: 'wisdom',
  modality: 'text',
  text_line: 'To escape the anchor, you must consciously reject it. Ask "What if I had no reference point?" Start from zero.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Cognitive Reset',
  response_type: 'tap',
  response_options: {
    tap_options: ['Reset now', 'Keep anchor', 'Not sure'],
  },
  kbe_target: 'embodying',
};

export const PriceAsAnchor: NaviCue = {
  id: 'BIAS-006',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Retailers know this. Show you $500 first. Then $200 feels cheap. The value did not change. Your anchor did.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Relative Perception',
  response_type: 'comparison',
  kbe_target: 'believing',
};

// ============================================================================
// AVAILABILITY HEURISTIC
// ============================================================================

export const AvailabilityHeuristic: NaviCue = {
  id: 'BIAS-007',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You think the risk is higher if you can remember an example. Vivid memories create false probabilities.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Memory vs Reality',
  response_type: 'binary',
  response_options: {
    binary_left: 'If I remember it, it's common',
    binary_right: 'Memory lies about frequency',
  },
  kbe_target: 'knowing',
};

export const MediaAmplification: NaviCue = {
  id: 'BIAS-008',
  family: 'wisdom',
  modality: 'text',
  text_line: 'News shows plane crashes, not safe landings. Your brain thinks planes are more dangerous than cars. Availability bias via media.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Media-Induced Fear',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Media shapes my fears',
    spectrum_right: 'I think statistically',
  },
  kbe_target: 'believing',
};

export const RecencyEffect: NaviCue = {
  id: 'BIAS-009',
  family: 'wisdom',
  modality: 'text',
  text_line: 'What happened recently feels more likely to happen again. Recency is not predictive. It is just memory proximity.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Time Weighting Error',
  response_type: 'timeline',
  kbe_target: 'embodying',
};

// ============================================================================
// SUNK COST FALLACY
// ============================================================================

export const SunkCostFallacy: NaviCue = {
  id: 'BIAS-010',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You stay because you already invested. But the past is gone. The question is not "What did I spend?" but "What should I do now?"',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Past Investment Trap',
  response_type: 'binary',
  response_options: {
    binary_left: 'I stay because I started',
    binary_right: 'I decide based on now',
  },
  kbe_target: 'knowing',
};

export const ThrowGoodAfterBad: NaviCue = {
  id: 'BIAS-011',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Throwing good money after bad. Sunk costs are sunk. Irrecoverable. Walking away is not quitting. It is math.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Rational Exit',
  response_type: 'slider',
  response_options: {
    slider_label: 'How hard is it for you to walk away?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const RelationshipsAsSunkCosts: NaviCue = {
  id: 'BIAS-012',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You stay in relationships because "I already gave 5 years." Those 5 years are gone whether you stay or leave.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Relationship Investment Trap',
  response_type: 'paradox',
  kbe_target: 'embodying',
};

// ============================================================================
// FUNDAMENTAL ATTRIBUTION ERROR
// ============================================================================

export const FundamentalAttributionError: NaviCue = {
  id: 'BIAS-013',
  family: 'wisdom',
  modality: 'text',
  text_line: 'When you fail, it is the situation. When they fail, it is their character. This asymmetry is automatic.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Attribution Asymmetry',
  response_type: 'sort',
  response_options: {
    sort_items: [
      'My failure = bad luck',
      'Their failure = bad person',
      'My success = my skill',
      'Their success = their luck',
    ],
  },
  kbe_target: 'knowing',
};

export const CorrespondenceBias: NaviCue = {
  id: 'BIAS-014',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You assume behavior corresponds to character. The rude person is a rude person. But maybe they just got bad news.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Context Blindness',
  response_type: 'binary',
  response_options: {
    binary_left: 'Judge character',
    binary_right: 'Consider context',
  },
  kbe_target: 'believing',
};

export const ActorObserverBias: NaviCue = {
  id: 'BIAS-015',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You see your own behavior as situational. You see others behavior as dispositional. Empathy requires flipping this.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Perspective Asymmetry',
  response_type: 'mirror',
  kbe_target: 'embodying',
};

// ============================================================================
// HINDSIGHT BIAS
// ============================================================================

export const HindsightBias: NaviCue = {
  id: 'BIAS-016',
  family: 'wisdom',
  modality: 'text',
  text_line: 'After it happens, you say "I knew it." No you didn\'t. Hindsight creates false certainty about the past.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Retroactive Certainty',
  response_type: 'binary',
  response_options: {
    binary_left: 'I knew it',
    binary_right: 'I'm revising',
  },
  kbe_target: 'knowing',
};

export const IKnewItAllAlong: NaviCue = {
  id: 'BIAS-017',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The outcome feels inevitable in retrospect. But before it happened, it was uncertain. Memory rewrites probability.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Memory Rewriting',
  response_type: 'witness',
  kbe_target: 'believing',
};

export const LearnFromMistakes: NaviCue = {
  id: 'BIAS-018',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Hindsight bias makes learning hard. If you think you "should have known," you cannot learn what you actually did not know.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Blame Prevention',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much do you blame past you?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'embodying',
};

// ============================================================================
// OPTIMISM BIAS
// ============================================================================

export const OptimismBias: NaviCue = {
  id: 'BIAS-019',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You think bad things happen to other people. Not you. This is optimism bias. It keeps you sane and unprepared.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Illusion of Invulnerability',
  response_type: 'binary',
  response_options: {
    binary_left: 'It won't happen to me',
    binary_right: 'I could be vulnerable',
  },
  kbe_target: 'knowing',
};

export const PlanningFallacy: NaviCue = {
  id: 'BIAS-020',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You think this project will take 2 weeks. It takes 6. Every time. Optimism bias makes you bad at prediction.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Unrealistic Timelines',
  response_type: 'tap',
  response_options: {
    tap_options: ['Double my estimate', 'Keep optimistic', 'Check past data'],
  },
  kbe_target: 'believing',
};

// Export collection
export const COGNITIVE_BIASES_NAVICUES = [
  ConfirmationBias,
  SeekingDisconfirmation,
  EchoChambersEverywhere,
  AnchoringBias,
  ResetTheAnchor,
  PriceAsAnchor,
  AvailabilityHeuristic,
  MediaAmplification,
  RecencyEffect,
  SunkCostFallacy,
  ThrowGoodAfterBad,
  RelationshipsAsSunkCosts,
  FundamentalAttributionError,
  CorrespondenceBias,
  ActorObserverBias,
  HindsightBias,
  IKnewItAllAlong,
  LearnFromMistakes,
  OptimismBias,
  PlanningFallacy,
];
