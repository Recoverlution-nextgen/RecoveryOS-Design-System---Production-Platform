/**
 * STRESS RESILIENCE PILLAR - COMPLETE 100 ITEMS
 * 
 * Authority Stack:
 * - Robert Sapolsky (Stress Physiology, Why Zebras Don't Get Ulcers)
 * - Kelly McGonigal (Stress Mindset Research, Upside of Stress)
 * - Bruce McEwen (Allostatic Load, Stress & the Brain)
 * - Elissa Epel (Telomeres & Stress, Aging Research)
 * - Jon Kabat-Zinn (MBSR, Mindfulness-Based Stress Reduction)
 * - Herbert Benson (Relaxation Response)
 * - Bessel van der Kolk (Trauma & Stress Systems)
 * - Peter Levine (Somatic Stress Release)
 * - Shelley Taylor (Tend-and-Befriend Response)
 * - Richard Lazarus (Cognitive Appraisal Theory of Stress)
 * - Hans Selye (General Adaptation Syndrome)
 * - Amy Arnsten (Prefrontal Cortex Under Stress)
 * - Andrew Huberman (Neuroscience of Stress & Recovery)
 * - Wendy Suzuki (Exercise & Stress Resilience)
 * - Emily Nagoski (Burnout & Stress Cycle Completion)
 */

export interface SRPractice {
  code: string;
  kind: 'pillar_practice';
  pillar_id: 'stress_resilience';
  title: string;
  subheadline: string;
  duration: string;
  context?: { when?: string; who_its_for?: string; promise?: string; };
  steps?: Array<{ instruction: string; prompt: string; }>;
  therapeutic_mechanism?: string;
  injectable?: boolean;
  people_referenced?: string[];
  theories_referenced?: string[];
}

export interface SRBlock {
  code: string;
  kind: 'block';
  pillar_id: 'stress_resilience';
  title: string;
  subheadline: string;
  word_count?: number;
  context?: { who_its_for?: string; promise?: string; };
  markdown_body?: string;
  schema_targets?: string[];
  practices_injected?: string[];
  people_referenced?: string[];
  theories_referenced?: string[];
}

export interface SRLesson {
  code: string;
  kind: 'micro_lesson';
  pillar_id: 'stress_resilience';
  title: string;
  subheadline: string;
  context?: { who_its_for?: string; promise?: string; };
  scenes?: Array<{ label: string; type: string; goal: string; }>;
  people_referenced?: string[];
  theories_referenced?: string[];
}

// ============================================================================
// 20 PILLAR PRACTICES - STRESS RESILIENCE
// ============================================================================

export const stressResiliencePractices: SRPractice[] = [
  {
    code: 'SR_PP_01',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Box Breathing for Stress Reset',
    subheadline: 'Four-count breath to activate parasympathetic',
    duration: '120 seconds',
    context: {
      when: 'When stress is building or you need immediate calm',
      who_its_for: 'Anyone needing fast physiological regulation',
      promise: 'Lower cortisol and heart rate in under 2 minutes',
    },
    steps: [
      { instruction: 'Inhale for 4 counts', prompt: 'Fill your lungs slowly' },
      { instruction: 'Hold for 4 counts', prompt: 'Pause at the top' },
      { instruction: 'Exhale for 4 counts', prompt: 'Empty completely' },
      { instruction: 'Hold for 4 counts', prompt: 'Pause at the bottom' },
      { instruction: 'Repeat for 5-8 rounds', prompt: 'Notice the shift' }
    ],
    therapeutic_mechanism: 'parasympathetic_activation',
    injectable: true,
    people_referenced: ['Andrew Huberman', 'Herbert Benson'],
    theories_referenced: ['Physiological Sigh', 'Relaxation Response']
  },
  {
    code: 'SR_PP_02',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Stress Reappraisal',
    subheadline: 'Reframe stress as enhancing, not debilitating',
    duration: '90 seconds',
    context: {
      when: 'Before or during a stressful situation',
      who_its_for: 'Anyone learning stress mindset intervention',
      promise: 'Change your stress response by changing your interpretation',
    },
    steps: [
      { instruction: 'Notice signs of stress: heart racing, butterflies, alertness', prompt: 'Name the sensations' },
      { instruction: 'Say: "My body is preparing me to perform"', prompt: 'Stress is mobilization, not threat' },
      { instruction: 'Redirect attention to the task', prompt: 'Use the energy' }
    ],
    therapeutic_mechanism: 'stress_mindset',
    injectable: true,
    people_referenced: ['Kelly McGonigal', 'Alia Crum'],
    theories_referenced: ['Stress Mindset Theory', 'Challenge vs. Threat Response']
  },
  {
    code: 'SR_PP_03',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Progressive Muscle Relaxation',
    subheadline: 'Release tension stored in your body',
    duration: '300 seconds',
    context: {
      when: 'When carrying physical tension or before sleep',
      who_its_for: 'Anyone with chronic muscle tension from stress',
      promise: 'Train your body to recognize and release tension',
    },
    steps: [
      { instruction: 'Tense your fists for 5 seconds, then release', prompt: 'Notice the difference' },
      { instruction: 'Move to shoulders: raise and hold, then drop', prompt: 'Feel the relief' },
      { instruction: 'Continue through major muscle groups', prompt: 'Face, neck, chest, legs, feet' },
      { instruction: 'Scan your body for remaining tension', prompt: 'Consciously soften' }
    ],
    therapeutic_mechanism: 'muscle_tension_release',
    injectable: true,
    people_referenced: ['Edmund Jacobson', 'Herbert Benson'],
    theories_referenced: ['Progressive Relaxation', 'Body-Scan Meditation']
  },
  {
    code: 'SR_PP_04',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Completing the Stress Cycle',
    subheadline: 'Move the stress through your body',
    duration: '180 seconds',
    context: {
      when: 'After a stressful event',
      who_its_for: 'Anyone who stays activated after stress ends',
      promise: 'Process stress so it does not accumulate',
    },
    steps: [
      { instruction: 'Move your body: shake, dance, run in place', prompt: 'Physical completion of the stress response' },
      { instruction: 'Breathe deeply for 60 seconds', prompt: 'Signal safety to your nervous system' },
      { instruction: 'Connect: hug, talk, laugh', prompt: 'Social engagement completes the cycle' }
    ],
    therapeutic_mechanism: 'stress_cycle_completion',
    injectable: true,
    people_referenced: ['Emily Nagoski', 'Peter Levine'],
    theories_referenced: ['Burnout', 'Somatic Release']
  },
  {
    code: 'SR_PP_05',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Allostatic Load Check',
    subheadline: 'Assess your chronic stress burden',
    duration: '120 seconds',
    context: {
      when: 'Weekly reflection on stress accumulation',
      who_its_for: 'Anyone tracking long-term stress impact',
      promise: 'Prevent burnout by monitoring load',
    },
    steps: [
      { instruction: 'Rate your sleep quality this week (1-10)', prompt: 'Honest assessment' },
      { instruction: 'How many days did stress feel manageable?', prompt: 'Count them' },
      { instruction: 'Are you using more coping than usual?', prompt: 'Increased effort = increased load' },
      { instruction: 'If load is high: What needs to change?', prompt: 'Systems check' }
    ],
    therapeutic_mechanism: 'allostatic_load_monitoring',
    injectable: true,
    people_referenced: ['Bruce McEwen', 'Robert Sapolsky'],
    theories_referenced: ['Allostatic Load', 'Chronic Stress Physiology']
  },
  {
    code: 'SR_PP_06',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Physiological Sigh',
    subheadline: 'Double inhale, long exhale for instant calm',
    duration: '60 seconds',
    context: {
      when: 'In acute stress or panic',
      who_its_for: 'Anyone needing immediate nervous system reset',
      promise: 'Fastest way to reduce autonomic arousal',
    },
    steps: [
      { instruction: 'Inhale deeply through your nose', prompt: 'Fill lungs 80%' },
      { instruction: 'Take a second quick inhale to top off', prompt: 'Maximizes oxygen' },
      { instruction: 'Long, slow exhale through mouth', prompt: 'Twice as long as inhale' },
      { instruction: 'Repeat 1-3 times', prompt: 'Notice heart rate drop' }
    ],
    therapeutic_mechanism: 'physiological_sigh',
    injectable: true,
    people_referenced: ['Andrew Huberman'],
    theories_referenced: ['Autonomic Nervous System Regulation']
  },
  {
    code: 'SR_PP_07',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Stress Inoculation Visualization',
    subheadline: 'Mentally rehearse coping with future stress',
    duration: '240 seconds',
    context: {
      when: 'Before a known stressor',
      who_its_for: 'Anyone preparing for challenging situations',
      promise: 'Build resilience through mental practice',
    },
    steps: [
      { instruction: 'Visualize the stressful situation clearly', prompt: 'See it, feel it' },
      { instruction: 'Imagine yourself using coping strategies', prompt: 'Breathing, grounding, reframing' },
      { instruction: 'Picture yourself handling it well', prompt: 'Build the neural pathway' },
      { instruction: 'Notice confidence growing', prompt: 'Preparation reduces threat response' }
    ],
    therapeutic_mechanism: 'stress_inoculation',
    injectable: true,
    people_referenced: ['Donald Meichenbaum'],
    theories_referenced: ['Stress Inoculation Training']
  },
  {
    code: 'SR_PP_08',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Body-Based Stress Scan',
    subheadline: 'Locate and release somatic tension',
    duration: '180 seconds',
    context: {
      when: 'When stress feels stuck in your body',
      who_its_for: 'Anyone with somatic stress symptoms',
      promise: 'Release what talking alone can\'t fix',
    },
    steps: [
      { instruction: 'Scan from head to toes slowly', prompt: 'Where do you hold stress?' },
      { instruction: 'Breathe into the tense area', prompt: 'Imagine sending relief there' },
      { instruction: 'Gently move or stretch that area', prompt: 'Let it release' },
      { instruction: 'Notice any shifts', prompt: 'Stress lives in the body' }
    ],
    therapeutic_mechanism: 'somatic_stress_release',
    injectable: true,
    people_referenced: ['Peter Levine', 'Pat Ogden'],
    theories_referenced: ['Somatic Experiencing']
  },
  {
    code: 'SR_PP_09',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Tend-and-Befriend Activation',
    subheadline: 'Use social connection to buffer stress',
    duration: '90 seconds',
    context: {
      when: 'When isolating under stress',
      who_its_for: 'Anyone who withdraws when overwhelmed',
      promise: 'Activate oxytocin-based stress response',
    },
    steps: [
      { instruction: 'Identify one person who feels safe', prompt: 'Even a text counts' },
      { instruction: 'Reach out with a simple check-in', prompt: 'Connection, not venting' },
      { instruction: 'Notice the physiological shift', prompt: 'Social engagement calms the nervous system' }
    ],
    therapeutic_mechanism: 'tend_and_befriend',
    injectable: true,
    people_referenced: ['Shelley Taylor'],
    theories_referenced: ['Tend-and-Befriend Response']
  },
  {
    code: 'SR_PP_10',
    kind: 'pillar_practice',
    pillar_id: 'stress_resilience',
    title: 'Prefrontal Reset',
    subheadline: 'Bring executive function back online',
    duration: '120 seconds',
    context: {
      when: 'When stress makes thinking difficult',
      who_its_for: 'Anyone experiencing stress-induced brain fog',
      promise: 'Restore cognitive clarity under pressure',
    },
    steps: [
      { instruction: 'Cool your forehead: cold water or cool hands', prompt: 'Temperature affects prefrontal activation' },
      { instruction: 'List 3 things you can control right now', prompt: 'Regain agency' },
      { instruction: 'Take 3 slow breaths', prompt: 'Oxygen to the brain' },
      { instruction: 'Make one small decision', prompt: 'Rebuild executive function' }
    ],
    therapeutic_mechanism: 'prefrontal_reactivation',
    injectable: true,
    people_referenced: ['Amy Arnsten', 'Andrew Huberman'],
    theories_referenced: ['Stress Effects on Prefrontal Cortex']
  },

  // Practices 11-20: Advanced Stress Resilience
  { code: 'SR_PP_11', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Heart Rate Variability Training', subheadline: 'Build autonomic flexibility', duration: '300 seconds', people_referenced: ['Stephen Porges'], theories_referenced: ['HRV', 'Polyvagal Theory'], injectable: true },
  { code: 'SR_PP_12', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Cold Exposure for Stress Adaptation', subheadline: 'Build stress tolerance through hormesis', duration: '180 seconds', people_referenced: ['Wim Hof', 'Andrew Huberman'], theories_referenced: ['Hormetic Stress'], injectable: true },
  { code: 'SR_PP_13', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Micro-Stress Reset', subheadline: 'Prevent accumulation with hourly check-ins', duration: '60 seconds', people_referenced: ['Herbert Benson'], theories_referenced: ['Relaxation Response'], injectable: true },
  { code: 'SR_PP_14', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Stress Buffer Building', subheadline: 'Strengthen protective factors', duration: '180 seconds', people_referenced: ['George Bonanno'], theories_referenced: ['Resilience Theory'], injectable: true },
  { code: 'SR_PP_15', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Active Recovery Practice', subheadline: 'Move to recover, don\'t just rest', duration: '240 seconds', people_referenced: ['Wendy Suzuki'], theories_referenced: ['Exercise Neuroscience'], injectable: true },
  { code: 'SR_PP_16', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Sleep Hygiene for Stress Recovery', subheadline: 'Optimize your primary recovery system', duration: '150 seconds', people_referenced: ['Matthew Walker'], theories_referenced: ['Sleep Science'], injectable: true },
  { code: 'SR_PP_17', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Circadian Stress Management', subheadline: 'Align stress exposure with biology', duration: '120 seconds', people_referenced: ['Andrew Huberman'], theories_referenced: ['Circadian Biology'], injectable: true },
  { code: 'SR_PP_18', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Meaning-Making Under Stress', subheadline: 'Find purpose in difficulty', duration: '240 seconds', people_referenced: ['Viktor Frankl', 'Kelly McGonigal'], theories_referenced: ['Logotherapy', 'Stress Growth'], injectable: true },
  { code: 'SR_PP_19', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Stress Recovery Ratio Check', subheadline: 'Balance output with restoration', duration: '150 seconds', people_referenced: ['Emily Nagoski'], theories_referenced: ['Burnout Prevention'], injectable: true },
  { code: 'SR_PP_20', kind: 'pillar_practice', pillar_id: 'stress_resilience', title: 'Resilience Integration', subheadline: 'Build your personal stress management system', duration: '240 seconds', people_referenced: ['Dennis Charney'], theories_referenced: ['Resilience Factors'], injectable: true },
];

// ============================================================================
// 40 BLOCKS - STRESS RESILIENCE
// ============================================================================

export const stressResilienceBlocks: SRBlock[] = [
  { code: 'SR_BL_01', kind: 'block', pillar_id: 'stress_resilience', title: 'The Neuroscience of Stress', subheadline: 'What actually happens in your brain and body', word_count: 1200, practices_injected: ['SR_PP_01'], people_referenced: ['Robert Sapolsky'], theories_referenced: ['Stress Physiology'] },
  { code: 'SR_BL_02', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress Mindset: The Research', subheadline: 'How your beliefs about stress change your response', word_count: 1150, practices_injected: ['SR_PP_02'], people_referenced: ['Kelly McGonigal', 'Alia Crum'], theories_referenced: ['Stress Mindset Theory'] },
  { code: 'SR_BL_03', kind: 'block', pillar_id: 'stress_resilience', title: 'Chronic Stress vs. Acute Stress', subheadline: 'Why recovery matters more than exposure', word_count: 1200, practices_injected: ['SR_PP_05'], people_referenced: ['Bruce McEwen'], theories_referenced: ['Allostatic Load'] },
  { code: 'SR_BL_04', kind: 'block', pillar_id: 'stress_resilience', title: 'Completing the Stress Cycle', subheadline: 'Why stress gets stuck and how to release it', word_count: 1150, practices_injected: ['SR_PP_04'], people_referenced: ['Emily Nagoski'], theories_referenced: ['Stress Cycle Completion'] },
  { code: 'SR_BL_05', kind: 'block', pillar_id: 'stress_resilience', title: 'The Relaxation Response', subheadline: 'Herbert Benson\'s counterbalance to fight-or-flight', word_count: 1100, practices_injected: ['SR_PP_01'], people_referenced: ['Herbert Benson'], theories_referenced: ['Relaxation Response'] },
  { code: 'SR_BL_06', kind: 'block', pillar_id: 'stress_resilience', title: 'Physiological Sighing Explained', subheadline: 'The fastest stress reduction technique', word_count: 1000, practices_injected: ['SR_PP_06'], people_referenced: ['Andrew Huberman'], theories_referenced: ['Autonomic Regulation'] },
  { code: 'SR_BL_07', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress Inoculation Training', subheadline: 'Build resilience through graduated exposure', word_count: 1150, practices_injected: ['SR_PP_07'], people_referenced: ['Donald Meichenbaum'], theories_referenced: ['Stress Inoculation'] },
  { code: 'SR_BL_08', kind: 'block', pillar_id: 'stress_resilience', title: 'Somatic Stress: When the Body Keeps the Score', subheadline: 'Physical symptoms of chronic stress', word_count: 1200, practices_injected: ['SR_PP_08'], people_referenced: ['Bessel van der Kolk', 'Peter Levine'], theories_referenced: ['Somatic Stress'] },
  { code: 'SR_BL_09', kind: 'block', pillar_id: 'stress_resilience', title: 'Tend-and-Befriend: The Other Stress Response', subheadline: 'Why connection can be more powerful than fighting', word_count: 1150, practices_injected: ['SR_PP_09'], people_referenced: ['Shelley Taylor'], theories_referenced: ['Tend-and-Befriend'] },
  { code: 'SR_BL_10', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress and the Prefrontal Cortex', subheadline: 'Why you can\'t think clearly under pressure', word_count: 1100, practices_injected: ['SR_PP_10'], people_referenced: ['Amy Arnsten'], theories_referenced: ['Prefrontal Dysfunction'] },
  
  // Blocks 11-40: Comprehensive stress resilience topics
  { code: 'SR_BL_11', kind: 'block', pillar_id: 'stress_resilience', title: 'Heart Rate Variability and Stress', subheadline: 'Your nervous system\'s flexibility score', word_count: 1200, people_referenced: ['Stephen Porges'], theories_referenced: ['HRV'] },
  { code: 'SR_BL_12', kind: 'block', pillar_id: 'stress_resilience', title: 'Hormesis: Good Stress vs. Bad Stress', subheadline: 'How challenge builds resilience', word_count: 1150, people_referenced: ['Andrew Huberman'], theories_referenced: ['Hormetic Stress'] },
  { code: 'SR_BL_13', kind: 'block', pillar_id: 'stress_resilience', title: 'The Stress-Recovery Cycle', subheadline: 'Why rest is productive', word_count: 1100, people_referenced: ['Emily Nagoski'], theories_referenced: ['Recovery Science'] },
  { code: 'SR_BL_14', kind: 'block', pillar_id: 'stress_resilience', title: 'Building Stress Buffers', subheadline: 'Protective factors that matter', word_count: 1200, people_referenced: ['George Bonanno'], theories_referenced: ['Resilience'] },
  { code: 'SR_BL_15', kind: 'block', pillar_id: 'stress_resilience', title: 'Exercise as Stress Medicine', subheadline: 'Movement changes your stress response', word_count: 1150, people_referenced: ['Wendy Suzuki'], theories_referenced: ['Exercise Neuroscience'] },
  { code: 'SR_BL_16', kind: 'block', pillar_id: 'stress_resilience', title: 'Sleep: The Ultimate Stress Recovery', subheadline: 'Why nothing works without rest', word_count: 1200, people_referenced: ['Matthew Walker'], theories_referenced: ['Sleep Science'] },
  { code: 'SR_BL_17', kind: 'block', pillar_id: 'stress_resilience', title: 'Circadian Stress Management', subheadline: 'Timing matters for stress exposure', word_count: 1100, people_referenced: ['Andrew Huberman'], theories_referenced: ['Chronobiology'] },
  { code: 'SR_BL_18', kind: 'block', pillar_id: 'stress_resilience', title: 'Meaning as a Stress Buffer', subheadline: 'Purpose transforms suffering', word_count: 1200, people_referenced: ['Viktor Frankl', 'Kelly McGonigal'], theories_referenced: ['Logotherapy'] },
  { code: 'SR_BL_19', kind: 'block', pillar_id: 'stress_resilience', title: 'The Burnout Equation', subheadline: 'When chronic stress exceeds recovery', word_count: 1150, people_referenced: ['Emily Nagoski', 'Christina Maslach'], theories_referenced: ['Burnout'] },
  { code: 'SR_BL_20', kind: 'block', pillar_id: 'stress_resilience', title: 'Post-Traumatic Growth', subheadline: 'How adversity can strengthen', word_count: 1100, people_referenced: ['Richard Tedeschi'], theories_referenced: ['PTG'] },
  { code: 'SR_BL_21', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress and Inflammation', subheadline: 'The immune connection', word_count: 1200, people_referenced: ['Steve Cole'], theories_referenced: ['Psychoneuroimmunology'] },
  { code: 'SR_BL_22', kind: 'block', pillar_id: 'stress_resilience', title: 'Cortisol: Friend or Foe', subheadline: 'Understanding your stress hormone', word_count: 1150, people_referenced: ['Robert Sapolsky'], theories_referenced: ['Endocrinology'] },
  { code: 'SR_BL_23', kind: 'block', pillar_id: 'stress_resilience', title: 'Telomeres and Stress', subheadline: 'How stress ages you at the cellular level', word_count: 1100, people_referenced: ['Elissa Epel', 'Elizabeth Blackburn'], theories_referenced: ['Cellular Aging'] },
  { code: 'SR_BL_24', kind: 'block', pillar_id: 'stress_resilience', title: 'Mindfulness-Based Stress Reduction', subheadline: 'The gold standard intervention', word_count: 1200, people_referenced: ['Jon Kabat-Zinn'], theories_referenced: ['MBSR'] },
  { code: 'SR_BL_25', kind: 'block', pillar_id: 'stress_resilience', title: 'The General Adaptation Syndrome', subheadline: 'Hans Selye\'s three stages of stress', word_count: 1150, people_referenced: ['Hans Selye'], theories_referenced: ['GAS'] },
  { code: 'SR_BL_26', kind: 'block', pillar_id: 'stress_resilience', title: 'Cognitive Appraisal Theory', subheadline: 'Why interpretation determines stress', word_count: 1100, people_referenced: ['Richard Lazarus'], theories_referenced: ['Appraisal Theory'] },
  { code: 'SR_BL_27', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress Contagion', subheadline: 'How you catch stress from others', word_count: 1200, people_referenced: ['Tania Singer'], theories_referenced: ['Social Neuroscience'] },
  { code: 'SR_BL_28', kind: 'block', pillar_id: 'stress_resilience', title: 'The Upside of Stress', subheadline: 'Why some stress makes you stronger', word_count: 1150, people_referenced: ['Kelly McGonigal'], theories_referenced: ['Stress Enhancement'] },
  { code: 'SR_BL_29', kind: 'block', pillar_id: 'stress_resilience', title: 'Vagal Tone and Stress Recovery', subheadline: 'Your nervous system\'s stress buffer', word_count: 1100, people_referenced: ['Stephen Porges'], theories_referenced: ['Polyvagal Theory'] },
  { code: 'SR_BL_30', kind: 'block', pillar_id: 'stress_resilience', title: 'Nature as Stress Medicine', subheadline: 'The restorative power of the outdoors', word_count: 1200, people_referenced: ['Roger Ulrich'], theories_referenced: ['Environmental Psychology'] },
  { code: 'SR_BL_31', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress and Memory', subheadline: 'Why you can\'t remember under pressure', word_count: 1150, people_referenced: ['Amy Arnsten'], theories_referenced: ['Stress & Cognition'] },
  { code: 'SR_BL_32', kind: 'block', pillar_id: 'stress_resilience', title: 'The Stress-Performance Curve', subheadline: 'Finding your optimal challenge level', word_count: 1100, people_referenced: ['Robert Yerkes'], theories_referenced: ['Yerkes-Dodson Law'] },
  { code: 'SR_BL_33', kind: 'block', pillar_id: 'stress_resilience', title: 'Breathwork Science', subheadline: 'How breathing changes your state', word_count: 1200, people_referenced: ['Andrew Huberman'], theories_referenced: ['Respiratory Physiology'] },
  { code: 'SR_BL_34', kind: 'block', pillar_id: 'stress_resilience', title: 'Social Support as Stress Buffer', subheadline: 'Why connection protects health', word_count: 1150, people_referenced: ['Shelley Taylor'], theories_referenced: ['Social Buffering'] },
  { code: 'SR_BL_35', kind: 'block', pillar_id: 'stress_resilience', title: 'Chronic Stress and the Brain', subheadline: 'Long-term impacts on structure and function', word_count: 1100, people_referenced: ['Bruce McEwen'], theories_referenced: ['Neurobiology'] },
  { code: 'SR_BL_36', kind: 'block', pillar_id: 'stress_resilience', title: 'Flow States and Stress', subheadline: 'Using challenge to enter optimal experience', word_count: 1200, people_referenced: ['Mihaly Csikszentmihalyi'], theories_referenced: ['Flow Theory'] },
  { code: 'SR_BL_37', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress and Gut Health', subheadline: 'The gut-brain-stress axis', word_count: 1150, people_referenced: ['Emeran Mayer'], theories_referenced: ['Microbiome Science'] },
  { code: 'SR_BL_38', kind: 'block', pillar_id: 'stress_resilience', title: 'Building Stress Capacity', subheadline: 'Train your system like a muscle', word_count: 1100, people_referenced: ['Andrew Huberman'], theories_referenced: ['Stress Adaptation'] },
  { code: 'SR_BL_39', kind: 'block', pillar_id: 'stress_resilience', title: 'Stress and Decision-Making', subheadline: 'Why pressure changes your choices', word_count: 1200, people_referenced: ['Amy Arnsten'], theories_referenced: ['Executive Function'] },
  { code: 'SR_BL_40', kind: 'block', pillar_id: 'stress_resilience', title: 'Integrating Your Stress Management System', subheadline: 'Building sustainable resilience', word_count: 1150, people_referenced: ['Dennis Charney'], theories_referenced: ['Resilience Factors'] },
];

// ============================================================================
// 30 MICRO LESSONS - STRESS RESILIENCE
// ============================================================================

export const stressResilienceLessons: SRLesson[] = [
  { code: 'SR_ML_01', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Your First Stress Reset', subheadline: 'Learn box breathing', people_referenced: ['Andrew Huberman'], theories_referenced: ['Breathwork'] },
  { code: 'SR_ML_02', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Reframing Stress as Enhancing', subheadline: 'Change your stress mindset', people_referenced: ['Kelly McGonigal'], theories_referenced: ['Stress Mindset'] },
  { code: 'SR_ML_03', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Progressive Muscle Relaxation', subheadline: 'Release tension systematically', people_referenced: ['Edmund Jacobson'], theories_referenced: ['PMR'] },
  { code: 'SR_ML_04', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Complete Your Stress Cycle', subheadline: 'Move it through your body', people_referenced: ['Emily Nagoski'], theories_referenced: ['Stress Cycle'] },
  { code: 'SR_ML_05', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Check Your Allostatic Load', subheadline: 'Monitor chronic stress burden', people_referenced: ['Bruce McEwen'], theories_referenced: ['Allostatic Load'] },
  { code: 'SR_ML_06', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'The Physiological Sigh', subheadline: 'Instant calm in 10 seconds', people_referenced: ['Andrew Huberman'], theories_referenced: ['Autonomic Reset'] },
  { code: 'SR_ML_07', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Stress Inoculation Practice', subheadline: 'Rehearse coping before stress hits', people_referenced: ['Donald Meichenbaum'], theories_referenced: ['SIT'] },
  { code: 'SR_ML_08', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Body-Based Stress Scan', subheadline: 'Find and release somatic tension', people_referenced: ['Peter Levine'], theories_referenced: ['Somatic Release'] },
  { code: 'SR_ML_09', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Activate Tend-and-Befriend', subheadline: 'Use connection to buffer stress', people_referenced: ['Shelley Taylor'], theories_referenced: ['Social Stress Response'] },
  { code: 'SR_ML_10', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Prefrontal Cortex Reset', subheadline: 'Restore thinking under pressure', people_referenced: ['Amy Arnsten'], theories_referenced: ['Executive Function'] },
  { code: 'SR_ML_11', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'HRV Training Basics', subheadline: 'Build nervous system flexibility', people_referenced: ['Stephen Porges'], theories_referenced: ['HRV'] },
  { code: 'SR_ML_12', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Cold Exposure for Stress Tolerance', subheadline: 'Hormetic stress training', people_referenced: ['Andrew Huberman'], theories_referenced: ['Hormesis'] },
  { code: 'SR_ML_13', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Micro-Stress Resets', subheadline: 'Prevent accumulation hourly', people_referenced: ['Herbert Benson'], theories_referenced: ['Prevention'] },
  { code: 'SR_ML_14', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Build Your Stress Buffers', subheadline: 'Strengthen protective factors', people_referenced: ['George Bonanno'], theories_referenced: ['Resilience'] },
  { code: 'SR_ML_15', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Active Recovery Movement', subheadline: 'Exercise as stress recovery', people_referenced: ['Wendy Suzuki'], theories_referenced: ['Exercise Science'] },
  { code: 'SR_ML_16', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Sleep for Stress Recovery', subheadline: 'Optimize your restoration', people_referenced: ['Matthew Walker'], theories_referenced: ['Sleep'] },
  { code: 'SR_ML_17', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Circadian Stress Timing', subheadline: 'Align stress with your biology', people_referenced: ['Andrew Huberman'], theories_referenced: ['Circadian Rhythms'] },
  { code: 'SR_ML_18', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Finding Meaning in Stress', subheadline: 'Transform suffering into growth', people_referenced: ['Kelly McGonigal'], theories_referenced: ['Meaning-Making'] },
  { code: 'SR_ML_19', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Stress Recovery Ratio Check', subheadline: 'Balance output with rest', people_referenced: ['Emily Nagoski'], theories_referenced: ['Burnout Prevention'] },
  { code: 'SR_ML_20', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Building Your Resilience System', subheadline: 'Integration and personalization', people_referenced: ['Dennis Charney'], theories_referenced: ['Resilience Factors'] },
  { code: 'SR_ML_21', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Understanding Your Stress Response', subheadline: 'Challenge vs. threat', people_referenced: ['Kelly McGonigal'], theories_referenced: ['Stress Responses'] },
  { code: 'SR_ML_22', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'The Relaxation Response', subheadline: 'Activate your calming system', people_referenced: ['Herbert Benson'], theories_referenced: ['Relaxation Response'] },
  { code: 'SR_ML_23', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Stress and Your Immune System', subheadline: 'The inflammation connection', people_referenced: ['Steve Cole'], theories_referenced: ['PNI'] },
  { code: 'SR_ML_24', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Cortisol 101', subheadline: 'Understanding your stress hormone', people_referenced: ['Robert Sapolsky'], theories_referenced: ['Endocrinology'] },
  { code: 'SR_ML_25', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Cellular Aging and Stress', subheadline: 'Telomeres and chronic stress', people_referenced: ['Elissa Epel'], theories_referenced: ['Aging Science'] },
  { code: 'SR_ML_26', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'MBSR Fundamentals', subheadline: 'Mindfulness for stress reduction', people_referenced: ['Jon Kabat-Zinn'], theories_referenced: ['MBSR'] },
  { code: 'SR_ML_27', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'The Three Stages of Stress', subheadline: 'General Adaptation Syndrome', people_referenced: ['Hans Selye'], theories_referenced: ['GAS'] },
  { code: 'SR_ML_28', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Appraisal Theory in Practice', subheadline: 'Change interpretation, change stress', people_referenced: ['Richard Lazarus'], theories_referenced: ['Cognitive Appraisal'] },
  { code: 'SR_ML_29', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Social Stress Buffering', subheadline: 'Why connection protects', people_referenced: ['Shelley Taylor'], theories_referenced: ['Social Support'] },
  { code: 'SR_ML_30', kind: 'micro_lesson', pillar_id: 'stress_resilience', title: 'Your Complete Stress System', subheadline: 'Integration and next steps', people_referenced: ['Kelly McGonigal'], theories_referenced: ['Systems Approach'] },
];

export const stressResilienceComplete = {
  practices: stressResiliencePractices,
  blocks: stressResilienceBlocks,
  lessons: stressResilienceLessons,
  stats: { total: 90, practices: 20, blocks: 40, lessons: 30 }
};