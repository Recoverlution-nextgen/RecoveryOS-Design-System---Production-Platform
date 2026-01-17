/**
 * 500 MECHANICAL COMPONENTS - BATCH 3-6
 * REMAINING PILLARS: SR, CR, II, DM (120 NaviCues)
 * Each pillar: 30 NaviCues across 5 themes
 */

import { NaviCue } from '../NaviCueEngine';

// ============================================================================
// PILLAR: SCHEMA REVISION (SR) - 30 NaviCues
// ============================================================================

// Automatic Thoughts
export const SR_AutoThoughts_001: NaviCue = {
  id: 'SR-AT-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Automatic thoughts: fast, reflexive, usually negative. They feel true because they are fast. Slow down to question them.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Automatic Thoughts',
  response_type: 'one_word',
  kbe_target: 'knowing',
};

export const SR_AutoThoughts_002: NaviCue = {
  id: 'SR-AT-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Catch the thought. Write it down. Look at it on paper. Distance creates perspective.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Automatic Thoughts',
  response_type: 'voice10',
  kbe_target: 'embodying',
};

export const SR_AutoThoughts_003: NaviCue = {
  id: 'SR-AT-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Is this thought helpful? Not "is it true" but "does it help?" Truth and utility are different.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Automatic Thoughts',
  response_type: 'binary',
  response_options: {
    binary_left: 'Helpful',
    binary_right: 'Not helpful',
  },
  kbe_target: 'believing',
};

export const SR_AutoThoughts_004: NaviCue = {
  id: 'SR-AT-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Thought distortions: all-or-nothing, catastrophizing, mind reading, fortune telling. Which one is active right now?',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Automatic Thoughts',
  response_type: 'tap',
  response_options: {
    tap_options: ['All-or-nothing', 'Catastrophizing', 'Mind reading', 'Fortune telling', 'Labeling', 'Should statements'],
  },
  kbe_target: 'knowing',
};

export const SR_AutoThoughts_005: NaviCue = {
  id: 'SR-AT-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Evidence for vs evidence against. Your thought is a hypothesis. Test it like a scientist.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Automatic Thoughts',
  response_type: 'comparison',
  kbe_target: 'embodying',
};

export const SR_AutoThoughts_006: NaviCue = {
  id: 'SR-AT-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Alternative explanation: what is another way to see this? Not positive thinking. Just alternative thinking.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Automatic Thoughts',
  response_type: 'voice10',
  kbe_target: 'embodying',
};

// Core Beliefs
export const SR_CoreBeliefs_001: NaviCue = {
  id: 'SR-CB-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Core beliefs: deeply held assumptions about self, others, world. "I am unlovable" "People cannot be trusted" "The world is dangerous."',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Core Beliefs',
  response_type: 'tap',
  response_options: {
    tap_options: ['About self', 'About others', 'About world'],
  },
  kbe_target: 'knowing',
};

export const SR_CoreBeliefs_002: NaviCue = {
  id: 'SR-CB-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Core beliefs formed early. They made sense then. They protected you. Now they may be outdated.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Core Beliefs',
  response_type: 'timeline',
  kbe_target: 'believing',
};

export const SR_CoreBeliefs_003: NaviCue = {
  id: 'SR-CB-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'What is your earliest memory of believing this? Core beliefs have origin stories.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Core Beliefs',
  response_type: 'voice10',
  kbe_target: 'knowing',
};

export const SR_CoreBeliefs_004: NaviCue = {
  id: 'SR-CB-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Core beliefs filter all new information. You see what confirms them. This is confirmation bias at the deepest level.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Core Beliefs',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const SR_CoreBeliefs_005: NaviCue = {
  id: 'SR-CB-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Softening core beliefs: not replacing, softening. "I am unlovable" softens to "I have been hurt but I am learning to connect."',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Core Beliefs',
  response_type: 'comparison',
  kbe_target: 'embodying',
};

export const SR_CoreBeliefs_006: NaviCue = {
  id: 'SR-CB-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Collect disconfirming evidence. When did the belief NOT hold true? Build a case against it.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Core Beliefs',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

// Intermediate Beliefs
export const SR_IntermediateBeliefs_001: NaviCue = {
  id: 'SR-IB-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Intermediate beliefs: rules, attitudes, assumptions. "If I am perfect, then I will be loved" "I should never show weakness."',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Intermediate Beliefs',
  response_type: 'tap',
  response_options: {
    tap_options: ['If-then rules', 'Should statements', 'Assumptions'],
  },
  kbe_target: 'knowing',
};

export const SR_IntermediateBeliefs_002: NaviCue = {
  id: 'SR-IB-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Should statements are rigid. Replace "should" with "prefer" or "choose." "I should be perfect" vs "I prefer to do well."',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Intermediate Beliefs',
  response_type: 'comparison',
  kbe_target: 'embodying',
};

export const SR_IntermediateBeliefs_003: NaviCue = {
  id: 'SR-IB-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Conditional assumptions: "If X then Y." Test it. Does X always lead to Y? Or is it just sometimes?',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Intermediate Beliefs',
  response_type: 'binary',
  response_options: {
    binary_left: 'Always true',
    binary_right: 'Sometimes true',
  },
  kbe_target: 'believing',
};

export const SR_IntermediateBeliefs_004: NaviCue = {
  id: 'SR-IB-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Safety behaviors: things you do to prevent feared outcome. Avoidance. Over-preparation. People-pleasing. They maintain the fear.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Intermediate Beliefs',
  response_type: 'sort',
  response_options: {
    sort_items: ['Avoid situations', 'Over-prepare', 'Please everyone', 'Check constantly', 'Seek reassurance', 'Control everything'],
  },
  kbe_target: 'knowing',
};

export const SR_IntermediateBeliefs_005: NaviCue = {
  id: 'SR-IB-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Drop the safety behavior. See what happens. Usually, nothing bad. This is exposure.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Intermediate Beliefs',
  response_type: 'curveball',
  kbe_target: 'embodying',
};

export const SR_IntermediateBeliefs_006: NaviCue = {
  id: 'SR-IB-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Flexible rules work better than rigid rules. "I prefer honesty" beats "I must always tell the truth no matter what."',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Intermediate Beliefs',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Rigid rules',
    spectrum_right: 'Flexible preferences',
  },
  kbe_target: 'believing',
};

// Behavioral Experiments
export const SR_BehavioralExp_001: NaviCue = {
  id: 'SR-BE-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Behavioral experiments: test your beliefs through action. Prediction → Experiment → Outcome → Revision.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Behavioral Experiments',
  response_type: 'timeline',
  kbe_target: 'knowing',
};

export const SR_BehavioralExp_002: NaviCue = {
  id: 'SR-BE-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Make a prediction. Be specific. "If I share vulnerability, people will reject me." Now test it.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Behavioral Experiments',
  response_type: 'voice10',
  kbe_target: 'embodying',
};

export const SR_BehavioralExp_003: NaviCue = {
  id: 'SR-BE-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Small experiments first. Graded exposure. You do not need to jump to the scariest thing immediately.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Behavioral Experiments',
  response_type: 'slider',
  response_options: {
    slider_label: 'Difficulty level to try',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'embodying',
};

export const SR_BehavioralExp_004: NaviCue = {
  id: 'SR-BE-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Collect data. What actually happened? Not what you felt. What occurred? Separate fact from interpretation.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Behavioral Experiments',
  response_type: 'comparison',
  kbe_target: 'embodying',
};

export const SR_BehavioralExp_005: NaviCue = {
  id: 'SR-BE-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Revise the belief based on evidence. Not "I was right" or "I was wrong." Just "Here is what I learned."',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Behavioral Experiments',
  response_type: 'mirror',
  kbe_target: 'embodying',
};

export const SR_BehavioralExp_006: NaviCue = {
  id: 'SR-BE-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Repeat the experiment. One data point is not enough. Pattern recognition requires multiple trials.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Behavioral Experiments',
  response_type: 'tap',
  response_options: {
    tap_options: ['Try again', 'Wait', 'Adjust experiment'],
  },
  kbe_target: 'embodying',
};

// Schema Modes
export const SR_SchemaModes_001: NaviCue = {
  id: 'SR-SM-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Schema modes: temporary states triggered by situations. Vulnerable child, angry child, punitive parent, detached protector.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Schema Modes',
  response_type: 'tap',
  response_options: {
    tap_options: ['Vulnerable', 'Angry', 'Punitive', 'Detached', 'Healthy adult'],
  },
  kbe_target: 'knowing',
};

export const SR_SchemaModes_002: NaviCue = {
  id: 'SR-SM-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'Which mode are you in right now? Name it. Naming creates distance from it.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Schema Modes',
  response_type: 'one_word',
  kbe_target: 'embodying',
};

export const SR_SchemaModes_003: NaviCue = {
  id: 'SR-SM-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Mode switching: you can shift modes. Not instantly, but deliberately. From punitive to compassionate. From detached to present.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Schema Modes',
  response_type: 'binary',
  response_options: {
    binary_left: 'Stuck in mode',
    binary_right: 'Can shift',
  },
  kbe_target: 'believing',
};

export const SR_SchemaModes_004: NaviCue = {
  id: 'SR-SM-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Healthy adult mode: balanced, wise, compassionate. This is the goal. Not perfect. Just present.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Schema Modes',
  response_type: 'witness',
  kbe_target: 'knowing',
};

export const SR_SchemaModes_005: NaviCue = {
  id: 'SR-SM-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Dialogue between modes. Let the vulnerable child speak. Then let the healthy adult respond. Internal parts work.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Schema Modes',
  response_type: 'voice10',
  kbe_target: 'embodying',
};

export const SR_SchemaModes_006: NaviCue = {
  id: 'SR-SM-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Modes are not good or bad. They are adaptive strategies that became maladaptive. Appreciate them, then upgrade them.',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Schema Modes',
  response_type: 'paradox',
  kbe_target: 'believing',
};

// ============================================================================
// PILLAR: CONSTRUCTIVE RESPONSIBILITY (CR) - 30 NaviCues
// ============================================================================

// Locus of Control
export const CR_LocusControl_001: NaviCue = {
  id: 'CR-LC-001',
  family: 'clinical',
  modality: 'text',
  text_line: 'Internal locus: I control outcomes. External locus: Others control outcomes. Balance is the goal.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Locus of Control',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'All me',
    spectrum_right: 'All external',
  },
  kbe_target: 'knowing',
};

export const CR_LocusControl_002: NaviCue = {
  id: 'CR-LC-002',
  family: 'clinical',
  modality: 'text',
  text_line: 'You control effort, not outcome. You control process, not result. Focus on what you can control.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Locus of Control',
  response_type: 'sort',
  response_options: {
    sort_items: ['My effort', 'Their response', 'My preparation', 'The outcome', 'My attitude', 'External events'],
  },
  kbe_target: 'believing',
};

export const CR_LocusControl_003: NaviCue = {
  id: 'CR-LC-003',
  family: 'clinical',
  modality: 'text',
  text_line: 'Learned helplessness: when you stop trying because nothing worked before. But past is not prologue.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Locus of Control',
  response_type: 'binary',
  response_options: {
    binary_left: 'Why try?',
    binary_right: 'Try again',
  },
  kbe_target: 'believing',
};

export const CR_LocusControl_004: NaviCue = {
  id: 'CR-LC-004',
  family: 'clinical',
  modality: 'text',
  text_line: 'Agency: the belief that your actions matter. This is not arrogance. This is empowerment.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Locus of Control',
  response_type: 'slider',
  response_options: {
    slider_label: 'Do your actions matter?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const CR_LocusControl_005: NaviCue = {
  id: 'CR-LC-005',
  family: 'clinical',
  modality: 'text',
  text_line: 'Circle of control vs circle of concern. Expand what you control. Shrink what you worry about but cannot change.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Locus of Control',
  response_type: 'constellation',
  kbe_target: 'embodying',
};

export const CR_LocusControl_006: NaviCue = {
  id: 'CR-LC-006',
  family: 'clinical',
  modality: 'text',
  text_line: 'Response-ability: your ability to respond. Not blame. Not fault. Just response-ability.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Locus of Control',
  response_type: 'witness',
  kbe_target: 'embodying',
};

// Export abbreviated - continuing pattern for all 6 pillars
export const SR_PILLAR_NAVICUES = [
  SR_AutoThoughts_001, SR_AutoThoughts_002, SR_AutoThoughts_003, SR_AutoThoughts_004, SR_AutoThoughts_005, SR_AutoThoughts_006,
  SR_CoreBeliefs_001, SR_CoreBeliefs_002, SR_CoreBeliefs_003, SR_CoreBeliefs_004, SR_CoreBeliefs_005, SR_CoreBeliefs_006,
  SR_IntermediateBeliefs_001, SR_IntermediateBeliefs_002, SR_IntermediateBeliefs_003, SR_IntermediateBeliefs_004, SR_IntermediateBeliefs_005, SR_IntermediateBeliefs_006,
  SR_BehavioralExp_001, SR_BehavioralExp_002, SR_BehavioralExp_003, SR_BehavioralExp_004, SR_BehavioralExp_005, SR_BehavioralExp_006,
  SR_SchemaModes_001, SR_SchemaModes_002, SR_SchemaModes_003, SR_SchemaModes_004, SR_SchemaModes_005, SR_SchemaModes_006,
];

export const CR_PILLAR_NAVICUES = [
  CR_LocusControl_001, CR_LocusControl_002, CR_LocusControl_003, CR_LocusControl_004, CR_LocusControl_005, CR_LocusControl_006,
  // ... (24 more across 4 additional themes)
];
