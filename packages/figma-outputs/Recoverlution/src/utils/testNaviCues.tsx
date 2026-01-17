/**
 * TEST NAVICUES - Comprehensive examples for all response types
 * 
 * Use these for testing and development
 */

import type { NaviCue } from '../components/navicues/NaviCueEngine';

export const TEST_NAVICUES: NaviCue[] = [
  // ========== VOICE10 EXAMPLES ==========
  {
    id: 'test.voice10.001',
    family: 'belief_probe',
    modality: 'text',
    text_line: 'Say out loud: What are you really afraid of?',
    pillar_id: 'P-01',
    pillar_name: 'Safety & Trust',
    pillar_color: '#10B981',
    theme_name: 'Fear Patterns',
    response_type: 'voice10',
    response_options: {
      voice_max_duration: 10,
      voice_show_waveform: true,
      voice_allow_playback: true
    },
    kbe_target: 'believing'
  },
  
  // ========== SORT EXAMPLES ==========
  {
    id: 'test.sort.001',
    family: 'belief_probe',
    modality: 'text',
    text_line: 'What matters most to you right now?',
    pillar_id: 'P-06',
    pillar_name: 'Purpose & Identity',
    pillar_color: '#6366F1',
    theme_name: 'Values Clarification',
    response_type: 'sort',
    response_options: {
      sort_items: ['Safety', 'Growth', 'Connection', 'Freedom'],
      sort_instruction: 'Order by importance',
      sort_orientation: 'vertical'
    },
    kbe_target: 'knowing'
  },
  
  // ========== BODY_MAP EXAMPLES ==========
  {
    id: 'test.bodymap.001',
    family: 'statement_mirror',
    modality: 'text',
    text_line: 'Where do you feel this anxiety in your body?',
    pillar_id: 'P-01',
    pillar_name: 'Safety & Trust',
    pillar_color: '#10B981',
    theme_name: 'Somatic Awareness',
    response_type: 'body_map',
    response_options: {
      body_regions: ['head', 'chest', 'gut', 'hands', 'legs'],
      body_multi_select: true
    },
    kbe_target: 'embodying'
  },
  
  // ========== MIRROR EXAMPLES ==========
  {
    id: 'test.mirror.001',
    family: 'belief_probe',
    modality: 'text',
    text_line: 'You said something yesterday...',
    pillar_id: 'P-06',
    pillar_name: 'Purpose & Identity',
    pillar_color: '#6366F1',
    theme_name: 'Belief Evolution',
    response_type: 'mirror',
    response_options: {
      mirror_reference_navicue_id: 'previous-navicue-id',
      mirror_days_ago_max: 7,
      mirror_question: 'Is this still true?'
    },
    kbe_target: 'believing'
  },
  
  // ========== CONSTELLATION EXAMPLES ==========
  {
    id: 'test.constellation.001',
    family: 'belief_probe',
    modality: 'text',
    text_line: 'Map your inner landscape. What is close to you right now?',
    pillar_id: 'P-04',
    pillar_name: 'Connection & Belonging',
    pillar_color: '#EC4899',
    theme_name: 'Relational Mapping',
    response_type: 'constellation',
    response_options: {
      constellation_items: ['Fear', 'Hope', 'Shame', 'Joy'],
      constellation_center_label: 'YOU'
    },
    kbe_target: 'knowing'
  },
  
  // ========== TIMELINE EXAMPLES ==========
  {
    id: 'test.timeline.001',
    family: 'story_shard',
    modality: 'text',
    text_line: 'When did you start believing you were not enough?',
    pillar_id: 'P-06',
    pillar_name: 'Purpose & Identity',
    pillar_color: '#6366F1',
    theme_name: 'Origin Stories',
    response_type: 'timeline',
    response_options: {
      timeline_labels: ['Childhood', 'Teen', 'Young Adult', 'Now', 'Future'],
      timeline_min_label: 'PAST',
      timeline_max_label: 'FUTURE'
    },
    kbe_target: 'knowing'
  },
  
  // ========== DIAL EXAMPLES ==========
  {
    id: 'test.dial.001',
    family: 'statement_mirror',
    modality: 'text',
    text_line: 'How activated is your nervous system right now?',
    pillar_id: 'P-01',
    pillar_name: 'Safety & Trust',
    pillar_color: '#10B981',
    theme_name: 'Nervous System Regulation',
    response_type: 'dial',
    response_options: {
      dial_min_label: 'Calm',
      dial_max_label: 'Activated',
      dial_color_start: '#3B82F6',
      dial_color_end: '#EF4444'
    },
    kbe_target: 'knowing'
  },
  
  // ========== SPECTRUM EXAMPLES ==========
  {
    id: 'test.spectrum.001',
    family: 'belief_probe',
    modality: 'text',
    text_line: 'Where are you right now?',
    pillar_id: 'P-01',
    pillar_name: 'Safety & Trust',
    pillar_color: '#10B981',
    theme_name: 'Complex State Mapping',
    response_type: 'spectrum',
    response_options: {
      spectrum_x_label: 'Safe ← → Unsafe',
      spectrum_y_label: 'Connected ← → Alone',
      spectrum_quadrants: ['Safe & Connected', 'Unsafe & Connected', 'Safe & Alone', 'Unsafe & Alone']
    },
    kbe_target: 'knowing'
  },
  
  // ========== COMPARISON EXAMPLES ==========
  {
    id: 'test.comparison.001',
    family: 'reframe_seed',
    modality: 'text',
    text_line: 'Look how far you have come',
    pillar_id: 'P-02',
    pillar_name: 'Hope & Optimism',
    pillar_color: '#F59E0B',
    theme_name: 'Progress Recognition',
    response_type: 'comparison',
    response_options: {
      comparison_old_text: 'I will never get better',
      comparison_new_text: 'I am learning to heal'
    },
    kbe_target: 'believing'
  },
  
  // ========== PARADOX EXAMPLES ==========
  {
    id: 'test.paradox.001',
    family: 'paradox_prompt',
    modality: 'text',
    text_line: 'Both are true. Hold them together.',
    pillar_id: 'P-03',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    theme_name: 'Dialectical Thinking',
    response_type: 'paradox',
    response_options: {
      paradox_statement_1: 'I want connection',
      paradox_statement_2: 'I push people away',
      paradox_hold_duration: 5
    },
    kbe_target: 'believing'
  },
  
  // ========== ECHO EXAMPLES ==========
  {
    id: 'test.echo.001',
    family: 'reframe_seed',
    modality: 'text',
    text_line: 'Say this three times until you believe it',
    pillar_id: 'P-06',
    pillar_name: 'Purpose & Identity',
    pillar_color: '#6366F1',
    theme_name: 'Affirmation Practice',
    response_type: 'echo',
    response_options: {
      echo_statement: 'I am worthy of rest',
      echo_repetitions: 3
    },
    kbe_target: 'embodying'
  },
  
  // ========== WITNESS EXAMPLES ==========
  {
    id: 'test.witness.001',
    family: 'statement_mirror',
    modality: 'text',
    text_line: 'You are angry. Do not change it. Just see it.',
    pillar_id: 'P-03',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    theme_name: 'Non-Reactivity',
    response_type: 'witness',
    response_options: {
      witness_duration: 10
    },
    kbe_target: 'embodying'
  },
  
  // ========== CURVEBALL EXAMPLES ==========
  {
    id: 'test.curveball.001',
    family: 'curveball',
    modality: 'text',
    text_line: 'You have been running from yourself',
    pillar_id: 'P-06',
    pillar_name: 'Purpose & Identity',
    pillar_color: '#6366F1',
    theme_name: 'Pattern Interruption',
    response_type: 'curveball',
    kbe_target: 'knowing'
  },
  
  // ========== CLASSIC TYPES (for comparison) ==========
  {
    id: 'test.tap.001',
    family: 'statement_mirror',
    modality: 'text',
    text_line: 'Your emotional weather right now',
    pillar_id: 'P-03',
    pillar_name: 'Emotional Regulation',
    pillar_color: '#EF4444',
    theme_name: 'Emotional Check In',
    response_type: 'tap',
    response_options: {
      tap_options: ['Storm', 'Cloudy', 'Calm', 'Clear']
    },
    kbe_target: 'knowing'
  },
  
  {
    id: 'test.binary.001',
    family: 'belief_probe',
    modality: 'text',
    text_line: 'Does this still serve you?',
    pillar_id: 'P-05',
    pillar_name: 'Growth Mindset',
    pillar_color: '#8B5CF6',
    theme_name: 'Belief Examination',
    response_type: 'binary',
    response_options: {
      binary_left: 'No longer',
      binary_right: 'Yes it does'
    },
    kbe_target: 'believing'
  },
  
  {
    id: 'test.slider.001',
    family: 'statement_mirror',
    modality: 'text',
    text_line: 'How safe do you feel in this moment?',
    pillar_id: 'P-01',
    pillar_name: 'Safety & Trust',
    pillar_color: '#10B981',
    theme_name: 'Safety Assessment',
    response_type: 'slider',
    response_options: {
      slider_label: 'Safety Level',
      slider_min: 0,
      slider_max: 10
    },
    kbe_target: 'knowing'
  },
  
  {
    id: 'test.breath.001',
    family: 'reframe_seed',
    modality: 'text',
    text_line: 'You are safe here',
    pillar_id: 'P-01',
    pillar_name: 'Safety & Trust',
    pillar_color: '#10B981',
    theme_name: 'Grounding',
    response_type: 'breath',
    response_options: {
      breath_count: 3
    },
    kbe_target: 'embodying'
  },
  
  {
    id: 'test.none.001',
    family: 'statement_mirror',
    modality: 'text',
    text_line: 'Recovery is not linear. Neither is healing.',
    pillar_id: 'P-02',
    pillar_name: 'Hope & Optimism',
    pillar_color: '#F59E0B',
    theme_name: 'Truth Telling',
    response_type: 'none',
    kbe_target: 'knowing'
  }
];
