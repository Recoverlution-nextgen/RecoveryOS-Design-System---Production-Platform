/**
 * PHILOSOPHY: STOICISM
 * 
 * Core Stoic principles as belief transformation tools
 * Dichotomy of control, amor fati, memento mori, negative visualization
 */

import { NaviCue } from '../../NaviCueEngine';

// ============================================================================
// DICHOTOMY OF CONTROL
// ============================================================================

export const DichotomyOfControl: NaviCue = {
  id: 'STOIC-001',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Some things are up to you. Some things are not. Wisdom is knowing the difference.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Control vs Acceptance',
  response_type: 'sort',
  response_options: {
    sort_items: [
      'My thoughts',
      'My actions',
      'Others opinions',
      'The weather',
      'My reactions',
      'The outcome',
    ],
  },
  kbe_target: 'knowing',
};

export const OnlyMyJudgments: NaviCue = {
  id: 'STOIC-002',
  family: 'wisdom',
  modality: 'text',
  text_line: 'It is not events that disturb you, but your judgment about events. The event is neutral. Your story makes it painful.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Story vs Reality',
  response_type: 'mirror',
  kbe_target: 'believing',
};

export const WhatYouControl: NaviCue = {
  id: 'STOIC-003',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You control your beliefs, your desires, your aversions, and your actions. Everything else is not up to you.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Sphere of Control',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

// ============================================================================
// MEMENTO MORI (Remember Death)
// ============================================================================

export const MementoMori: NaviCue = {
  id: 'STOIC-004',
  family: 'wisdom',
  modality: 'text',
  text_line: 'You will die. This is not morbid. It is freedom. If you remember you will die, you cannot waste today.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Mortality Awareness',
  response_type: 'breath',
  response_options: {
    breath_count: 3,
  },
  kbe_target: 'knowing',
};

export const LastTimeParadox: NaviCue = {
  id: 'STOIC-005',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Every conversation might be your last with that person. Not to create anxiety. To create presence.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Presence Through Impermanence',
  response_type: 'hold',
  response_options: {
    hold_duration: 5,
  },
  kbe_target: 'embodying',
};

export const DeathAsAdvisor: NaviCue = {
  id: 'STOIC-006',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Death is the best advisor. It tells you what actually matters by showing you what will not matter when you die.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Values Clarification',
  response_type: 'voice10',
  kbe_target: 'knowing',
};

// ============================================================================
// AMOR FATI (Love of Fate)
// ============================================================================

export const AmorFati: NaviCue = {
  id: 'STOIC-007',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Do not just accept what happens. Love what happens. Not because it is good. Because it is yours.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Radical Acceptance',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much are you resisting reality?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const TheObstacleIsTheWay: NaviCue = {
  id: 'STOIC-008',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The obstacle is the way. What blocks the path becomes the path. Resistance creates strength.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Reframing Resistance',
  response_type: 'binary',
  response_options: {
    binary_left: 'See obstacle',
    binary_right: 'See opportunity',
  },
  kbe_target: 'embodying',
};

export const WhatHappenedHadToHappen: NaviCue = {
  id: 'STOIC-009',
  family: 'wisdom',
  modality: 'text',
  text_line: 'What happened had to happen given all prior conditions. The universe does not make mistakes. You are exactly where you need to be.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Determinism vs Regret',
  response_type: 'paradox',
  kbe_target: 'believing',
};

// ============================================================================
// NEGATIVE VISUALIZATION (Premeditatio Malorum)
// ============================================================================

export const NegativeVisualization: NaviCue = {
  id: 'STOIC-010',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Imagine losing everything you have. Now open your eyes. You still have it. This is gratitude through loss.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Gratitude via Subtraction',
  response_type: 'timeline',
  kbe_target: 'knowing',
};

export const PracticeMisfortune: NaviCue = {
  id: 'STOIC-011',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Practice misfortune while you are comfortable. Sleep on the floor. Skip a meal. Immunize yourself to loss before it arrives.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Resilience Training',
  response_type: 'tap',
  response_options: {
    tap_options: ['Try it today', 'Not ready', 'Already do this'],
  },
  kbe_target: 'embodying',
};

export const ImpermanenceOfAll: NaviCue = {
  id: 'STOIC-012',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Everything you love will disappear. This is not pessimism. This is physics. Entropy is non negotiable.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Impermanence Acceptance',
  response_type: 'witness',
  kbe_target: 'knowing',
};

// ============================================================================
// VIRTUE AS THE ONLY GOOD
// ============================================================================

export const VirtueAlone: NaviCue = {
  id: 'STOIC-013',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Wealth, health, reputation are not good. They are preferred indifferents. Only virtue is good. The rest is luck.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Internal vs External',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'External success',
    spectrum_right: 'Internal character',
  },
  kbe_target: 'believing',
};

export const NoOneCanHarmYourCharacter: NaviCue = {
  id: 'STOIC-014',
  family: 'wisdom',
  modality: 'text',
  text_line: 'No one can harm your character except you. They can insult you, reject you, hurt you. But only you can betray who you are.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Autonomy of Self',
  response_type: 'binary',
  response_options: {
    binary_left: 'Believe it',
    binary_right: 'Doubt it',
  },
  kbe_target: 'embodying',
};

export const FourCardinalVirtues: NaviCue = {
  id: 'STOIC-015',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Wisdom to know what is right. Courage to do it. Justice to treat others fairly. Temperance to do it with balance. These are the four.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Virtue Framework',
  response_type: 'sort',
  response_options: {
    sort_items: ['Wisdom', 'Courage', 'Justice', 'Temperance'],
  },
  kbe_target: 'knowing',
};

// ============================================================================
// VOLUNTARY DISCOMFORT
// ============================================================================

export const VoluntaryDiscomfort: NaviCue = {
  id: 'STOIC-016',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Choose discomfort before it chooses you. Cold showers, hard conversations, early mornings. Train for adversity.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Antifragility Practice',
  response_type: 'tap',
  response_options: {
    tap_options: ['Start today', 'Plan tomorrow', 'Not yet'],
  },
  kbe_target: 'embodying',
};

export const ComfortIsTheTrap: NaviCue = {
  id: 'STOIC-017',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Comfort is the trap. The more you avoid discomfort, the more fragile you become. Resilience requires friction.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Comfort vs Growth',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much comfort are you seeking?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const WeaknessFromEase: NaviCue = {
  id: 'STOIC-018',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Muscles atrophy without resistance. Character atrophies without challenge. Ease creates weakness.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Productive Struggle',
  response_type: 'binary',
  response_options: {
    binary_left: 'Seeking ease',
    binary_right: 'Seeking growth',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// INNER CITADEL
// ============================================================================

export const InnerCitadel: NaviCue = {
  id: 'STOIC-019',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Build an inner citadel. A fortress that cannot be invaded. External chaos does not breach your internal peace.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Internal Sanctuary',
  response_type: 'body_map',
  response_options: {
    body_regions: ['head', 'chest', 'stomach', 'heart'],
  },
  kbe_target: 'knowing',
};

export const UnshakeableCore: NaviCue = {
  id: 'STOIC-020',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The world can take everything from you except your principles. Your core is unshakeable if you choose it to be.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Principled Living',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

// Export collection
export const STOICISM_NAVICUES = [
  DichotomyOfControl,
  OnlyMyJudgments,
  WhatYouControl,
  MementoMori,
  LastTimeParadox,
  DeathAsAdvisor,
  AmorFati,
  TheObstacleIsTheWay,
  WhatHappenedHadToHappen,
  NegativeVisualization,
  PracticeMisfortune,
  ImpermanenceOfAll,
  VirtueAlone,
  NoOneCanHarmYourCharacter,
  FourCardinalVirtues,
  VoluntaryDiscomfort,
  ComfortIsTheTrap,
  WeaknessFromEase,
  InnerCitadel,
  UnshakeableCore,
];
