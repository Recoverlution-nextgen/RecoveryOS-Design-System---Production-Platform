/**
 * NAVICUE SEED DATA
 * Actual NaviCue content ready for Universal Player
 * 
 * This bridges the gap between:
 * - React component arsenal (existing)
 * - NaviCue data objects (what player needs)
 */

import { NaviCue } from './types';

// ============================================================================
// CLINICAL TRACK - EMOTIONAL REGULATION (ER)
// ============================================================================

export const NAVICUES_CLINICAL_ER: NaviCue[] = [
  {
    id: 'NC-ER-001',
    name: 'Vagal Tone Baseline',
    family: 'practice',
    modality: 'interactive',
    text_line: 'Count your breaths for 60 seconds to establish baseline vagal tone.',
    pillar_id: 'ER',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    concept_name: 'Nervous System Awareness',
    theme_name: 'Vagal Regulation',
    response_type: 'breath',
    kbe_target: 'knowing',
    tags: ['breathing', 'baseline', 'vagal', 'assessment'],
    difficulty: 1,
    duration_minutes: 1,
  },
  {
    id: 'NC-ER-002',
    name: 'Window of Tolerance',
    family: 'belief_probe',
    modality: 'interactive',
    text_line: 'Where are you right now? Hyperaroused, optimal, or hypoaroused?',
    pillar_id: 'ER',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    concept_name: 'Arousal Regulation',
    theme_name: 'Window of Tolerance',
    response_type: 'spectrum',
    kbe_target: 'knowing',
    tags: ['arousal', 'awareness', 'regulation'],
    difficulty: 2,
    duration_minutes: 2,
  },
  {
    id: 'NC-ER-003',
    name: 'Grounding Anchor',
    family: 'practice',
    modality: 'interactive',
    text_line: 'Name 5 things you see. 4 you feel. 3 you hear. 2 you smell. 1 you taste.',
    pillar_id: 'ER',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    concept_name: 'Grounding Techniques',
    theme_name: 'Sensory Anchoring',
    response_type: 'tap',
    kbe_target: 'embodying',
    tags: ['grounding', '54321', 'sensory', 'anchor'],
    difficulty: 1,
    duration_minutes: 3,
  },
  {
    id: 'NC-ER-004',
    name: 'Breath Rhythm Matcher',
    family: 'practice',
    modality: 'interactive',
    text_line: 'Follow the rhythm: Inhale 4, Hold 2, Exhale 6, Hold 2.',
    pillar_id: 'ER',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    concept_name: 'Breath Regulation',
    theme_name: 'Paced Breathing',
    response_type: 'breath',
    kbe_target: 'embodying',
    tags: ['breathing', '4262', 'rhythm', 'vagal'],
    difficulty: 2,
    duration_minutes: 5,
  },
  {
    id: 'NC-ER-005',
    name: 'Emotion Namer',
    family: 'belief_probe',
    modality: 'text',
    text_line: 'What texture is this feeling? Tight? Hollow? Electric? Liquid? Sharp?',
    pillar_id: 'ER',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    concept_name: 'Emotion Awareness',
    theme_name: 'Emotion Vocabulary',
    response_type: 'one_word',
    kbe_target: 'knowing',
    tags: ['emotion', 'naming', 'texture', 'awareness'],
    difficulty: 2,
    duration_minutes: 2,
  },
];

// ============================================================================
// GURU TRACK - RAM DASS
// ============================================================================

export const NAVICUES_GURU_RAMDASS: NaviCue[] = [
  {
    id: 'NC-RD-001',
    name: 'Witness Toggle',
    family: 'identity_koan',
    modality: 'text',
    text_line: 'You are not the thinker. You are the one watching the thinker.',
    pillar_id: 'II',
    pillar_name: 'Integrated Identity',
    pillar_color: '#9333EA',
    concept_name: 'Witness Consciousness',
    theme_name: 'Observer Self',
    response_type: 'tap',
    kbe_target: 'believing',
    tags: ['witness', 'observer', 'consciousness', 'ram-dass'],
    difficulty: 3,
    duration_minutes: 2,
    voice_archetype: 'mystic',
  },
  {
    id: 'NC-RD-002',
    name: 'Now Duration Test',
    family: 'practice',
    modality: 'interactive',
    text_line: 'How long can you stay in "now" before a thought pulls you away?',
    pillar_id: 'II',
    pillar_name: 'Integrated Identity',
    pillar_color: '#9333EA',
    concept_name: 'Present Moment',
    theme_name: 'Be Here Now',
    response_type: 'hold',
    kbe_target: 'knowing',
    tags: ['present', 'now', 'meditation', 'ram-dass'],
    difficulty: 4,
    duration_minutes: 3,
    voice_archetype: 'mystic',
  },
  {
    id: 'NC-RD-003',
    name: 'Soul vs Ego',
    family: 'identity_koan',
    modality: 'text',
    text_line: 'Is this the voice of your soul, or your ego trying to protect itself?',
    pillar_id: 'II',
    pillar_name: 'Integrated Identity',
    pillar_color: '#9333EA',
    concept_name: 'Identity Layers',
    theme_name: 'Soul Recognition',
    response_type: 'binary',
    kbe_target: 'knowing',
    tags: ['soul', 'ego', 'identity', 'ram-dass'],
    difficulty: 4,
    duration_minutes: 3,
    voice_archetype: 'mystic',
  },
  {
    id: 'NC-RD-004',
    name: 'Suffering Formula',
    family: 'reframe_seed',
    modality: 'text',
    text_line: 'Suffering = Pain × Resistance. The pain is inevitable. The resistance is optional.',
    pillar_id: 'SC',
    pillar_name: 'Self Compassion',
    pillar_color: '#10B981',
    concept_name: 'Pain Acceptance',
    theme_name: 'Resistance Release',
    response_type: 'slider',
    response_options: {
      min: 0,
      max: 10,
      minLabel: 'No resistance',
      maxLabel: 'Full resistance'
    },
    kbe_target: 'believing',
    tags: ['suffering', 'resistance', 'acceptance', 'ram-dass'],
    difficulty: 4,
    duration_minutes: 4,
    voice_archetype: 'mystic',
  },
];

// ============================================================================
// GURU TRACK - ALAN WATTS
// ============================================================================

export const NAVICUES_GURU_WATTS: NaviCue[] = [
  {
    id: 'NC-AW-001',
    name: 'Backwards Law',
    family: 'paradox_prompt',
    modality: 'text',
    text_line: 'The harder you try to be happy, the less happy you become. Notice this?',
    pillar_id: 'SR',
    pillar_name: 'Schema Revision',
    pillar_color: '#3B82F6',
    concept_name: 'Effort Paradox',
    theme_name: 'Effortless Action',
    response_type: 'binary',
    kbe_target: 'believing',
    tags: ['paradox', 'effort', 'happiness', 'alan-watts'],
    difficulty: 4,
    duration_minutes: 3,
    voice_archetype: 'philosopher',
  },
  {
    id: 'NC-AW-002',
    name: 'Ego as Fiction',
    family: 'identity_koan',
    modality: 'text',
    text_line: 'Your "self" is a story other people told you. You believed them.',
    pillar_id: 'II',
    pillar_name: 'Integrated Identity',
    pillar_color: '#9333EA',
    concept_name: 'Social Self',
    theme_name: 'Identity Construction',
    response_type: 'tap',
    kbe_target: 'believing',
    tags: ['ego', 'identity', 'fiction', 'alan-watts'],
    difficulty: 5,
    duration_minutes: 4,
    voice_archetype: 'philosopher',
  },
  {
    id: 'NC-AW-003',
    name: 'Control Illusion',
    family: 'belief_probe',
    modality: 'interactive',
    text_line: 'How much control do you actually have? (Spoiler: about 5%)',
    pillar_id: 'ER',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    concept_name: 'Control Beliefs',
    theme_name: 'Letting Go',
    response_type: 'slider',
    response_options: {
      min: 0,
      max: 100,
      minLabel: 'No control',
      maxLabel: 'Total control'
    },
    kbe_target: 'knowing',
    tags: ['control', 'illusion', 'acceptance', 'alan-watts'],
    difficulty: 3,
    duration_minutes: 3,
    voice_archetype: 'philosopher',
  },
  {
    id: 'NC-AW-004',
    name: 'Resistance Multiplier',
    family: 'reframe_seed',
    modality: 'text',
    text_line: 'What you resist persists. What you accept transforms.',
    pillar_id: 'SC',
    pillar_name: 'Self Compassion',
    pillar_color: '#10B981',
    concept_name: 'Resistance Patterns',
    theme_name: 'Acceptance Practice',
    response_type: 'tap',
    kbe_target: 'believing',
    tags: ['resistance', 'acceptance', 'transformation', 'alan-watts'],
    difficulty: 4,
    duration_minutes: 2,
    voice_archetype: 'philosopher',
  },
];

// ============================================================================
// INFINITE TRACK - QUANTUM METAPHORS
// ============================================================================

export const NAVICUES_INFINITE_QUANTUM: NaviCue[] = [
  {
    id: 'NC-QM-001',
    name: 'Observer Effect',
    family: 'paradox_prompt',
    modality: 'text',
    text_line: 'In quantum physics, observation changes reality. What if that is true for your thoughts too?',
    pillar_id: 'SR',
    pillar_name: 'Schema Revision',
    pillar_color: '#3B82F6',
    concept_name: 'Attention Impact',
    theme_name: 'Observer Consciousness',
    response_type: 'tap',
    kbe_target: 'believing',
    tags: ['quantum', 'observation', 'awareness', 'metaphor'],
    difficulty: 4,
    duration_minutes: 3,
  },
  {
    id: 'NC-QM-002',
    name: 'Superposition Self',
    family: 'identity_koan',
    modality: 'text',
    text_line: 'A quantum particle exists in all states until observed. You contain all possible selves.',
    pillar_id: 'II',
    pillar_name: 'Integrated Identity',
    pillar_color: '#9333EA',
    concept_name: 'Multiplicity',
    theme_name: 'Potential Selves',
    response_type: 'tap',
    kbe_target: 'believing',
    tags: ['quantum', 'superposition', 'potential', 'identity'],
    difficulty: 5,
    duration_minutes: 4,
  },
];

// ============================================================================
// AGGREGATE COLLECTIONS
// ============================================================================

export const ALL_SEED_NAVICUES: NaviCue[] = [
  ...NAVICUES_CLINICAL_ER,
  ...NAVICUES_GURU_RAMDASS,
  ...NAVICUES_GURU_WATTS,
  ...NAVICUES_INFINITE_QUANTUM,
];

export const SEED_NAVICUES_BY_PILLAR = {
  ER: ALL_SEED_NAVICUES.filter(nc => nc.pillar_id === 'ER'),
  SR: ALL_SEED_NAVICUES.filter(nc => nc.pillar_id === 'SR'),
  SC: ALL_SEED_NAVICUES.filter(nc => nc.pillar_id === 'SC'),
  CR: ALL_SEED_NAVICUES.filter(nc => nc.pillar_id === 'CR'),
  II: ALL_SEED_NAVICUES.filter(nc => nc.pillar_id === 'II'),
  DM: ALL_SEED_NAVICUES.filter(nc => nc.pillar_id === 'DM'),
};

export const SEED_NAVICUES_BY_TRACK = {
  clinical: NAVICUES_CLINICAL_ER,
  'ram-dass': NAVICUES_GURU_RAMDASS,
  'alan-watts': NAVICUES_GURU_WATTS,
  quantum: NAVICUES_INFINITE_QUANTUM,
};

// ============================================================================
// STATS
// ============================================================================

export const SEED_DATA_STATS = {
  total: ALL_SEED_NAVICUES.length,
  byPillar: {
    ER: SEED_NAVICUES_BY_PILLAR.ER.length,
    SR: SEED_NAVICUES_BY_PILLAR.SR.length,
    SC: SEED_NAVICUES_BY_PILLAR.SC.length,
    CR: SEED_NAVICUES_BY_PILLAR.CR.length,
    II: SEED_NAVICUES_BY_PILLAR.II.length,
    DM: SEED_NAVICUES_BY_PILLAR.DM.length,
  },
  byTrack: {
    clinical: NAVICUES_CLINICAL_ER.length,
    'ram-dass': NAVICUES_GURU_RAMDASS.length,
    'alan-watts': NAVICUES_GURU_WATTS.length,
    quantum: NAVICUES_INFINITE_QUANTUM.length,
  },
};

console.log('✅ Seed data loaded:', SEED_DATA_STATS);
