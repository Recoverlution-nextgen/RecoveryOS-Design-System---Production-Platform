/**
 * ARTS: MUSIC THEORY
 * 
 * Musical concepts as frameworks for emotional life and personal rhythm
 * Harmony, dissonance, tempo, dynamics, silence
 */

import { NaviCue } from '../../NaviCueEngine';

// ============================================================================
// HARMONY & DISSONANCE
// ============================================================================

export const DissonanceResolution: NaviCue = {
  id: 'MUSIC-001',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Dissonance creates tension. Resolution creates release. Without dissonance, resolution means nothing. Embrace the discord.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Tension & Release',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much dissonance are you in?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const HarmonyRequiresMultiple: NaviCue = {
  id: 'MUSIC-002',
  family: 'wisdom',
  modality: 'text',
  text_line: 'One note is not harmony. Harmony requires multiple voices. In life, your identity is not one thing. It is the chord of all your parts.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Multiplicity of Self',
  response_type: 'constellation',
  kbe_target: 'believing',
};

export const TritoneTheDevil: NaviCue = {
  id: 'MUSIC-003',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The tritone was called "the devil in music." The most dissonant interval. But it demands resolution. Your pain demands transformation.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Productive Discomfort',
  response_type: 'binary',
  response_options: {
    binary_left: 'Avoid tension',
    binary_right: 'Use tension',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// RHYTHM & TEMPO
// ============================================================================

export const YourTempo: NaviCue = {
  id: 'MUSIC-004',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Every piece has a tempo. Your life has a tempo. The metronome is not the master. You are.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Personal Rhythm',
  response_type: 'tap',
  response_options: {
    tap_options: ['Too fast', 'Too slow', 'Just right'],
  },
  kbe_target: 'knowing',
};

export const Rubato: NaviCue = {
  id: 'MUSIC-005',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Rubato means "stolen time." You slow down here, speed up there. The total time is the same, but the feel changes. Life allows rubato.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Flexible Pacing',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Rigid timing',
    spectrum_right: 'Flexible timing',
  },
  kbe_target: 'believing',
};

export const SyncopationOffBeat: NaviCue = {
  id: 'MUSIC-006',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Syncopation emphasizes the offbeat. The unexpected. In life, growth happens in the unexpected moments, not the planned ones.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Offbeat Moments',
  response_type: 'witness',
  kbe_target: 'embodying',
};

// ============================================================================
// DYNAMICS (Volume & Intensity)
// ============================================================================

export const FortissimoVsPianissimo: NaviCue = {
  id: 'MUSIC-007',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Fortissimo is very loud. Pianissimo is very soft. Both have power. In life, intensity is not always volume. Quiet can be devastating.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Power in Softness',
  response_type: 'slider',
  response_options: {
    slider_label: 'How loud are you being?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const Crescendo: NaviCue = {
  id: 'MUSIC-008',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Crescendo is gradual increase. Not sudden. Not all at once. In life, change builds. Small increases compound.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Gradual Intensification',
  response_type: 'timeline',
  kbe_target: 'believing',
};

export const SforzandoTheAccent: NaviCue = {
  id: 'MUSIC-009',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Sforzando: a sudden, strong accent. One note screams. In life, sometimes you need to accent one moment. Make it unmissable.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Decisive Moments',
  response_type: 'binary',
  response_options: {
    binary_left: 'Blend in',
    binary_right: 'Stand out',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// SILENCE & RESTS
// ============================================================================

export const RestsAreMusicToo: NaviCue = {
  id: 'MUSIC-010',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Rests are part of the music. Silence is not absence. It is space. In life, rest is not laziness. It is composition.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Productive Silence',
  response_type: 'breath',
  response_options: {
    breath_count: 5,
  },
  kbe_target: 'knowing',
};

export const GeneralPause: NaviCue = {
  id: 'MUSIC-011',
  family: 'wisdom',
  modality: 'text',
  text_line: 'General pause: the entire orchestra stops. Complete silence. Then resumes. In life, sometimes you need to stop everything.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Total Reset',
  response_type: 'hold',
  response_options: {
    hold_duration: 10,
  },
  kbe_target: 'embodying',
};

export const SpaceBetweenNotes: NaviCue = {
  id: 'MUSIC-012',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The space between notes gives them meaning. Without space, it is noise. In life, boundaries create meaning.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Boundaries as Space',
  response_type: 'body_map',
  response_options: {
    body_regions: ['personal space', 'work space', 'emotional space', 'mental space'],
  },
  kbe_target: 'believing',
};

// ============================================================================
// MELODY & COUNTERPOINT
// ============================================================================

export const MelodicContour: NaviCue = {
  id: 'MUSIC-013',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Melody is not random notes. It is contour. Direction. Shape. In life, your story is not random events. It is arc.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Narrative Shape',
  response_type: 'voice10',
  kbe_target: 'knowing',
};

export const CounterpointTwoVoices: NaviCue = {
  id: 'MUSIC-014',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Counterpoint: two independent melodies played together. They do not merge. They coexist. In life, you can hold two truths.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Paradox Tolerance',
  response_type: 'paradox',
  kbe_target: 'believing',
};

export const CanonImitation: NaviCue = {
  id: 'MUSIC-015',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Canon: one voice follows another. Imitation with delay. In life, you learn by following, then leading with the same pattern.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Learn Then Lead',
  response_type: 'mirror',
  kbe_target: 'embodying',
};

// ============================================================================
// KEY & MODALITY
// ============================================================================

export const MajorVsMinor: NaviCue = {
  id: 'MUSIC-016',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Major is not happy. Minor is not sad. They are qualities, not emotions. In life, your state is more complex than binary mood.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Emotional Complexity',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Simple mood',
    spectrum_right: 'Complex state',
  },
  kbe_target: 'knowing',
};

export const ModulationKeyChange: NaviCue = {
  id: 'MUSIC-017',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Modulation: changing keys mid-piece. New tonal center. In life, you can shift your entire framework. New lens, new world.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Perspective Shift',
  response_type: 'binary',
  response_options: {
    binary_left: 'Same key',
    binary_right: 'Modulate now',
  },
  kbe_target: 'believing',
};

export const TonicTheHome: NaviCue = {
  id: 'MUSIC-018',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The tonic is home. You can wander, but you return. In life, you need a tonic. A center. A place you return to.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Emotional Home Base',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

// ============================================================================
// FORM & STRUCTURE
// ============================================================================

export const SonataForm: NaviCue = {
  id: 'MUSIC-019',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Sonata form: exposition, development, recapitulation. You state the theme, explore it, return transformed. This is life.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Transformation Cycle',
  response_type: 'timeline',
  kbe_target: 'knowing',
};

export const ThemeAndVariations: NaviCue = {
  id: 'MUSIC-020',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Theme and variations: one idea, endless transformations. In life, you are one person, infinite expressions.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Consistency Through Change',
  response_type: 'sort',
  response_options: {
    sort_items: ['Core self', 'Situational self', 'Past self', 'Future self'],
  },
  kbe_target: 'believing',
};

// Export collection
export const MUSIC_NAVICUES = [
  DissonanceResolution,
  HarmonyRequiresMultiple,
  TritoneTheDevil,
  YourTempo,
  Rubato,
  SyncopationOffBeat,
  FortissimoVsPianissimo,
  Crescendo,
  SforzandoTheAccent,
  RestsAreMusicToo,
  GeneralPause,
  SpaceBetweenNotes,
  MelodicContour,
  CounterpointTwoVoices,
  CanonImitation,
  MajorVsMinor,
  ModulationKeyChange,
  TonicTheHome,
  SonataForm,
  ThemeAndVariations,
];
