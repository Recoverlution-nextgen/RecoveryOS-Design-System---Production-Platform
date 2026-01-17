/**
 * 500 MECHANICAL COMPONENTS - BATCH 1
 * PILLAR: EMOTIONAL REGULATION (ER)
 * 
 * 30 NaviCues across 5 themes:
 * - Window of Tolerance
 * - Nervous System States
 * - Emotion Surfing
 * - Distress Tolerance
 * - Grounding & Anchoring
 */

import { NaviCue } from '../NaviCueEngine';

// ============================================================================
// THEME: WINDOW OF TOLERANCE
// ============================================================================

export const WindowOfToleranceIntro: NaviCue = {
  id: 'ER-WOT-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'There is a zone where you can think clearly. Above it: hyperarousal. Below it: hypoarousal. The window is where you are functional.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Window of Tolerance',
  response_type: 'slider',
  response_options: {
    slider_label: 'Where are you right now?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const HyperArousalSignals: NaviCue = {
  id: 'ER-WOT-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Racing heart. Tightness. Urgency. Spiraling thoughts. These are hyperarousal. You are above your window.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Window of Tolerance',
  response_type: 'body_map',
  response_options: {
    body_regions: ['head', 'chest', 'stomach', 'shoulders', 'jaw'],
  },
  kbe_target: 'knowing',
};

export const HypoArousalSignals: NaviCue = {
  id: 'ER-WOT-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Numbness. Fog. Disconnection. Flatness. These are hypoarousal. You are below your window.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Window of Tolerance',
  response_type: 'tap',
  response_options: {
    tap_options: ['Feeling this now', 'Not now', 'Sometimes'],
  },
  kbe_target: 'knowing',
};

export const ExpandTheWindow: NaviCue = {
  id: 'ER-WOT-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'The goal is not to never leave the window. The goal is to expand the window. Practice at the edges.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Window of Tolerance',
  response_type: 'binary',
  response_options: {
    binary_left: 'Avoid edges',
    binary_right: 'Practice at edges',
  },
  kbe_target: 'believing',
};

export const ReturnToWindow: NaviCue = {
  id: 'ER-WOT-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'When you leave the window, the first task is simple: return. Not solve. Not fix. Just return.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Window of Tolerance',
  response_type: 'breath',
  response_options: {
    breath_count: 5,
  },
  kbe_target: 'embodying',
};

export const TitrationPrinciple: NaviCue = {
  id: 'ER-WOT-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Titration: approach the trigger in small doses. You do not need to face it all at once. Pendulate between activation and calm.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Window of Tolerance',
  response_type: 'timeline',
  kbe_target: 'embodying',
};

// ============================================================================
// THEME: NERVOUS SYSTEM STATES
// ============================================================================

export const PolyvagalTheoryIntro: NaviCue = {
  id: 'ER-NS-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Three nervous system states: Ventral (safe and social), Sympathetic (fight or flight), Dorsal (shutdown). You cycle through all three.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Nervous System States',
  response_type: 'tap',
  response_options: {
    tap_options: ['Ventral (calm)', 'Sympathetic (activated)', 'Dorsal (shut down)'],
  },
  kbe_target: 'knowing',
};

export const VentralVagalState: NaviCue = {
  id: 'ER-NS-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Ventral vagal: safe, connected, curious, playful. This is your natural state when threat is absent. You can think clearly here.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Nervous System States',
  response_type: 'slider',
  response_options: {
    slider_label: 'How often are you in ventral state?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const SympatheticActivation: NaviCue = {
  id: 'ER-NS-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Sympathetic: fight or flight. Energy mobilizes. Heart races. You prepare to act. This is not bad. It is survival.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Nervous System States',
  response_type: 'body_map',
  response_options: {
    body_regions: ['heart', 'chest', 'legs', 'arms', 'stomach'],
  },
  kbe_target: 'knowing',
};

export const DorsalShutdown: NaviCue = {
  id: 'ER-NS-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Dorsal vagal: shutdown. When fight or flight fails, the body freezes. Numbness. Dissociation. Conservation mode.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Nervous System States',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const GlimmerVsTrigger: NaviCue = {
  id: 'ER-NS-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Trigger: cue of danger. Glimmer: cue of safety. You can train yourself to notice glimmers.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Nervous System States',
  response_type: 'sort',
  response_options: {
    sort_items: ['Morning coffee', 'Text from friend', 'Email notification', 'Sunlight on skin', 'Deep breath', 'Deadline reminder'],
  },
  kbe_target: 'believing',
};

export const CoRegulation: NaviCue = {
  id: 'ER-NS-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Your nervous system regulates through connection. Safe people calm your system without words. This is co-regulation.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Nervous System States',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

// ============================================================================
// THEME: EMOTION SURFING
// ============================================================================

export const EmotionWave: NaviCue = {
  id: 'ER-ES-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Emotions are waves. They rise, peak, and fall. The average wave lasts 90 seconds if you do not resist it.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Emotion Surfing',
  response_type: 'timeline',
  kbe_target: 'knowing',
};

export const SurfDontSwim: NaviCue = {
  id: 'ER-ES-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Surf the wave. Do not swim against it. Fighting the wave exhausts you. Riding it gets you to shore.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Emotion Surfing',
  response_type: 'binary',
  response_options: {
    binary_left: 'Fight emotions',
    binary_right: 'Ride emotions',
  },
  kbe_target: 'believing',
};

export const NameTheWave: NaviCue = {
  id: 'ER-ES-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Name the emotion. Fear. Anger. Sadness. Naming reduces intensity by 30%. Your brain shifts from feeling to observing.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Emotion Surfing',
  response_type: 'one_word',
  kbe_target: 'embodying',
};

export const LocateInBody: NaviCue = {
  id: 'ER-ES-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Where is the emotion in your body? Chest? Throat? Stomach? Locating it makes it specific. Specific is manageable.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Emotion Surfing',
  response_type: 'body_map',
  response_options: {
    body_regions: ['head', 'throat', 'chest', 'stomach', 'shoulders', 'hands'],
  },
  kbe_target: 'embodying',
};

export const AllowTheFeeling: NaviCue = {
  id: 'ER-ES-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Allow the feeling without acting on it. Feeling anger does not require yelling. Feeling fear does not require fleeing.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Emotion Surfing',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const PeakAndDecline: NaviCue = {
  id: 'ER-ES-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'The emotion will peak. Then it will decline. This is guaranteed. Your job is to wait for the decline without adding fuel.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Emotion Surfing',
  response_type: 'breath',
  response_options: {
    breath_count: 5,
  },
  kbe_target: 'embodying',
};

// ============================================================================
// THEME: DISTRESS TOLERANCE
// ============================================================================

export const TolerateNotEliminate: NaviCue = {
  id: 'ER-DT-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Distress tolerance is not about eliminating pain. It is about enduring it without making it worse.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Distress Tolerance',
  response_type: 'binary',
  response_options: {
    binary_left: 'Eliminate pain',
    binary_right: 'Tolerate pain',
  },
  kbe_target: 'knowing',
};

export const TIPSkills: NaviCue = {
  id: 'ER-DT-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'TIP: Temperature (cold water on face), Intense exercise, Paced breathing, Paired muscle relaxation. These reset your nervous system fast.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Distress Tolerance',
  response_type: 'tap',
  response_options: {
    tap_options: ['Cold water', 'Exercise', 'Breathing', 'Muscle relax'],
  },
  kbe_target: 'embodying',
};

export const RadicalAcceptance: NaviCue = {
  id: 'ER-DT-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Radical acceptance: this is happening. Not "I like this" or "I want this." Just "this is happening." Stop fighting reality.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Distress Tolerance',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much are you resisting what is?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const SelfSoothingKit: NaviCue = {
  id: 'ER-DT-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Build a self-soothing kit. Five senses: What you see, hear, smell, taste, touch. Have a plan before the crisis.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Distress Tolerance',
  response_type: 'sort',
  response_options: {
    sort_items: ['Favorite photo', 'Calming music', 'Lavender oil', 'Dark chocolate', 'Soft blanket'],
  },
  kbe_target: 'embodying',
};

export const ImproveTheMoment: NaviCue = {
  id: 'ER-DT-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'IMPROVE: Imagery, Meaning, Prayer, Relaxation, One thing at a time, Vacation (brief), Encouragement. Small shifts during distress.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Distress Tolerance',
  response_type: 'tap',
  response_options: {
    tap_options: ['Imagery', 'Meaning', 'Relax', 'One thing', 'Break', 'Encourage'],
  },
  kbe_target: 'embodying',
};

export const DistractACCEPTS: NaviCue = {
  id: 'ER-DT-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'ACCEPTS: Activities, Contributing, Comparisons, Emotions (opposite), Pushing away, Thoughts, Sensations. Distraction is not avoidance when used wisely.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Distress Tolerance',
  response_type: 'tap',
  response_options: {
    tap_options: ['Activity', 'Help others', 'Opposite emotion', 'Shift thoughts'],
  },
  kbe_target: 'embodying',
};

// ============================================================================
// THEME: GROUNDING & ANCHORING
// ============================================================================

export const FiveThingsSee: NaviCue = {
  id: 'ER-GA-001',
  family: 'clinical',
  modality: 'text',
  text_line: '5 things you can see. 4 things you can touch. 3 things you can hear. 2 things you can smell. 1 thing you can taste. This is 5-4-3-2-1 grounding.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Grounding & Anchoring',
  response_type: 'tap',
  response_options: {
    tap_options: ['Try now', 'Save for later', 'Already do this'],
  },
  kbe_target: 'embodying',
};

export const FeetOnGround: NaviCue = {
  id: 'ER-GA-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Feel your feet on the ground. Literally. Press down. Notice the contact. You are here. Not in the past. Not in the future. Here.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Grounding & Anchoring',
  response_type: 'hold',
  response_options: {
    hold_duration: 5,
  },
  kbe_target: 'embodying',
};

export const BoxBreathing: NaviCue = {
  id: 'ER-GA-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Box breathing: inhale 4 counts, hold 4, exhale 4, hold 4. Repeat. This signals safety to your nervous system.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Grounding & Anchoring',
  response_type: 'breath',
  response_options: {
    breath_count: 4,
  },
  kbe_target: 'embodying',
};

export const HandOnHeart: NaviCue = {
  id: 'ER-GA-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Place your hand on your heart. Feel it beat. This simple gesture activates self-compassion circuitry.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Grounding & Anchoring',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const OrientToRoom: NaviCue = {
  id: 'ER-GA-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Orient to the room. Slowly look around. Name objects. Blue chair. White wall. Window. This tells your brain: no threat here.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Grounding & Anchoring',
  response_type: 'tap',
  response_options: {
    tap_options: ['Try it now', 'Later', 'Know this'],
  },
  kbe_target: 'embodying',
};

export const ColdWaterReset: NaviCue = {
  id: 'ER-GA-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Cold water on your face triggers the dive reflex. Heart rate drops. Parasympathetic activates. Instant reset.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Grounding & Anchoring',
  response_type: 'binary',
  response_options: {
    binary_left: 'Try it',
    binary_right: 'Not now',
  },
  kbe_target: 'embodying',
};

// Export collection
export const ER_PILLAR_NAVICUES = [
  // Window of Tolerance (6)
  WindowOfToleranceIntro,
  HyperArousalSignals,
  HypoArousalSignals,
  ExpandTheWindow,
  ReturnToWindow,
  TitrationPrinciple,
  
  // Nervous System States (6)
  PolyvagalTheoryIntro,
  VentralVagalState,
  SympatheticActivation,
  DorsalShutdown,
  GlimmerVsTrigger,
  CoRegulation,
  
  // Emotion Surfing (6)
  EmotionWave,
  SurfDontSwim,
  NameTheWave,
  LocateInBody,
  AllowTheFeeling,
  PeakAndDecline,
  
  // Distress Tolerance (6)
  TolerateNotEliminate,
  TIPSkills,
  RadicalAcceptance,
  SelfSoothingKit,
  ImproveTheMoment,
  DistractACCEPTS,
  
  // Grounding & Anchoring (6)
  FiveThingsSee,
  FeetOnGround,
  BoxBreathing,
  HandOnHeart,
  OrientToRoom,
  ColdWaterReset,
];
