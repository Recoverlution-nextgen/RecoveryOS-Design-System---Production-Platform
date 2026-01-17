/**
 * 500 MECHANICAL COMPONENTS - BATCH 2
 * PILLAR: SELF COMPASSION (SC)
 * 
 * 30 NaviCues across 5 themes:
 * - Self Kindness vs Self Judgment
 * - Common Humanity
 * - Mindful Awareness
 * - Inner Critic Work
 * - Self Forgiveness
 */

import { NaviCue } from '../NaviCueEngine';

// ============================================================================
// THEME: SELF KINDNESS VS SELF JUDGMENT
// ============================================================================

export const InnerVoiceTone: NaviCue = {
  id: 'SC-SK-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Listen to how you talk to yourself. Would you speak to a friend that way? If not, why is it acceptable for you?',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Kindness',
  response_type: 'binary',
  response_options: {
    binary_left: 'Harsh with myself',
    binary_right: 'Kind with myself',
  },
  kbe_target: 'knowing',
};

export const FriendTest: NaviCue = {
  id: 'SC-SK-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'The friend test: What would you say to a friend in this situation? Now say it to yourself. This is self compassion.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Kindness',
  response_type: 'voice10',
  kbe_target: 'embodying',
};

export const MistakeVsIdentity: NaviCue = {
  id: 'SC-SK-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'I made a mistake vs I am a mistake. One is behavior. One is identity. Do not collapse the two.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Kindness',
  response_type: 'comparison',
  kbe_target: 'believing',
};

export const SoftenTheEdge: NaviCue = {
  id: 'SC-SK-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'When you catch self-criticism, soften the edge. "I am terrible" becomes "I am struggling." Small shift, big impact.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Kindness',
  response_type: 'mirror',
  kbe_target: 'embodying',
};

export const PhysicalGesture: NaviCue = {
  id: 'SC-SK-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Physical gestures activate self-compassion. Hand on heart. Hug yourself. Touch your face gently. The body teaches the mind.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Kindness',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const PermissionToStuggle: NaviCue = {
  id: 'SC-SK-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'You have permission to struggle. Struggling does not mean failing. It means you are human and trying.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Kindness',
  response_type: 'breath',
  response_options: {
    breath_count: 3,
  },
  kbe_target: 'believing',
};

// ============================================================================
// THEME: COMMON HUMANITY
// ============================================================================

export const NotAlone: NaviCue = {
  id: 'SC-CH-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'You are not alone in this. Suffering is part of the human experience. Everyone struggles. You are not uniquely broken.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Common Humanity',
  response_type: 'slider',
  response_options: {
    slider_label: 'How isolated do you feel in your struggle?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const IsolationVsConnection: NaviCue = {
  id: 'SC-CH-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Shame says "I am the only one." Compassion says "I am one of many." Connection is the antidote to isolation.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Common Humanity',
  response_type: 'binary',
  response_options: {
    binary_left: 'I feel alone',
    binary_right: 'I feel connected',
  },
  kbe_target: 'believing',
};

export const SharedExperience: NaviCue = {
  id: 'SC-CH-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Think of someone else who has felt this way. You are part of a shared human experience, not an isolated incident.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Common Humanity',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

export const PerfectionMyth: NaviCue = {
  id: 'SC-CH-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'The myth of perfection isolates you. Nobody has it figured out. Everyone is improvising. You are not behind.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Common Humanity',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const HumanCondition: NaviCue = {
  id: 'SC-CH-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'To be human is to be imperfect, vulnerable, and flawed. This is not a bug. This is the human condition.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Common Humanity',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const BelongingInStruggle: NaviCue = {
  id: 'SC-CH-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Your struggle does not make you less worthy of belonging. It makes you human. Belonging includes the messy parts.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Common Humanity',
  response_type: 'hold',
  response_options: {
    hold_duration: 5,
  },
  kbe_target: 'embodying',
};

// ============================================================================
// THEME: MINDFUL AWARENESS
// ============================================================================

export const NoticeWithoutJudge: NaviCue = {
  id: 'SC-MA-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Notice what you are feeling without judging it. Observation without evaluation. This is mindful awareness.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Mindful Awareness',
  response_type: 'one_word',
  kbe_target: 'embodying',
};

export const OverIdentification: NaviCue = {
  id: 'SC-MA-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Over-identification: "I AM anxious" vs "I FEEL anxious." You are not the emotion. You are the one experiencing it.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Mindful Awareness',
  response_type: 'comparison',
  kbe_target: 'believing',
};

export const ThoughtsNotFacts: NaviCue = {
  id: 'SC-MA-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Thoughts are not facts. They are mental events. You can observe them without believing them.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Mindful Awareness',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const EmotionalWeather: NaviCue = {
  id: 'SC-MA-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Emotions are like weather. They come and go. You are the sky, not the storm. The sky is always there.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Mindful Awareness',
  response_type: 'timeline',
  kbe_target: 'believing',
};

export const GentleCuriosity: NaviCue = {
  id: 'SC-MA-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Approach your experience with gentle curiosity. Not "Why am I like this?" but "What is happening right now?"',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Mindful Awareness',
  response_type: 'voice10',
  kbe_target: 'embodying',
};

export const PauseBeforeReact: NaviCue = {
  id: 'SC-MA-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Pause before reacting. Notice → Breathe → Choose. This tiny gap is where freedom lives.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Mindful Awareness',
  response_type: 'breath',
  response_options: {
    breath_count: 3,
  },
  kbe_target: 'embodying',
};

// ============================================================================
// THEME: INNER CRITIC WORK
// ============================================================================

export const CriticVsCoach: NaviCue = {
  id: 'SC-IC-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'The inner critic tears down. The inner coach builds up. Both want you to improve. Only one works.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Inner Critic',
  response_type: 'binary',
  response_options: {
    binary_left: 'Critic dominates',
    binary_right: 'Coach emerging',
  },
  kbe_target: 'knowing',
};

export const CriticOrigins: NaviCue = {
  id: 'SC-IC-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Your inner critic learned its voice from somewhere. Whose voice is it really? Parent? Teacher? Culture?',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Inner Critic',
  response_type: 'constellation',
  kbe_target: 'knowing',
};

export const CriticProtects: NaviCue = {
  id: 'SC-IC-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'The critic thinks it protects you. "If I am hard on myself, I will not fail again." But shame is not a growth strategy.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Inner Critic',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const ThankAndDismiss: NaviCue = {
  id: 'SC-IC-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Thank the critic for trying to protect you. Then dismiss it. "Thank you for sharing. I am handling this differently now."',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Inner Critic',
  response_type: 'mirror',
  kbe_target: 'embodying',
};

export const RewriteTheScript: NaviCue = {
  id: 'SC-IC-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Rewrite the critic\'s script. "You are worthless" becomes "You are learning." Same event, different narrator.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Inner Critic',
  response_type: 'comparison',
  kbe_target: 'embodying',
};

export const CriticVolume: NaviCue = {
  id: 'SC-IC-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'You cannot silence the critic completely. But you can turn down the volume. How loud is it right now?',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Inner Critic',
  response_type: 'slider',
  response_options: {
    slider_label: 'Inner critic volume',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

// ============================================================================
// THEME: SELF FORGIVENESS
// ============================================================================

export const ForgivenessNotExcuse: NaviCue = {
  id: 'SC-SF-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Self forgiveness is not excusing the behavior. It is releasing the shame. You can own the mistake without becoming it.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Forgiveness',
  response_type: 'binary',
  response_options: {
    binary_left: 'Still holding shame',
    binary_right: 'Ready to release',
  },
  kbe_target: 'knowing',
};

export const WhatWouldItTake: NaviCue = {
  id: 'SC-SF-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'What would it take to forgive yourself? Not "should you" but "what would make it possible?" Start there.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Forgiveness',
  response_type: 'voice10',
  kbe_target: 'believing',
};

export const YouDidBest: NaviCue = {
  id: 'SC-SF-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'You did the best you could with what you knew at the time. Now you know more. This is growth, not failure.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Forgiveness',
  response_type: 'timeline',
  kbe_target: 'believing',
};

export const PerfectionTrap: NaviCue = {
  id: 'SC-SF-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'The perfection trap: "I should have known better." But you are judging past you with present knowledge. Unfair.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Forgiveness',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const LetterToPastSelf: NaviCue = {
  id: 'SC-SF-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Write a letter to your past self. What would you say now? Compassion is retroactive.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Forgiveness',
  response_type: 'voice10',
  kbe_target: 'embodying',
};

export const RepairNotErase: NaviCue = {
  id: 'SC-SF-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'You cannot erase the past. But you can repair the relationship with yourself. Repair is possible. Erasure is not.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Self Forgiveness',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

// Export collection
export const SC_PILLAR_NAVICUES = [
  // Self Kindness (6)
  InnerVoiceTone,
  FriendTest,
  MistakeVsIdentity,
  SoftenTheEdge,
  PhysicalGesture,
  PermissionToStuggle,
  
  // Common Humanity (6)
  NotAlone,
  IsolationVsConnection,
  SharedExperience,
  PerfectionMyth,
  HumanCondition,
  BelongingInStruggle,
  
  // Mindful Awareness (6)
  NoticeWithoutJudge,
  OverIdentification,
  ThoughtsNotFacts,
  EmotionalWeather,
  GentleCuriosity,
  PauseBeforeReact,
  
  // Inner Critic (6)
  CriticVsCoach,
  CriticOrigins,
  CriticProtects,
  ThankAndDismiss,
  RewriteTheScript,
  CriticVolume,
  
  // Self Forgiveness (6)
  ForgivenessNotExcuse,
  WhatWouldItTake,
  YouDidBest,
  PerfectionTrap,
  LetterToPastSelf,
  RepairNotErase,
];
