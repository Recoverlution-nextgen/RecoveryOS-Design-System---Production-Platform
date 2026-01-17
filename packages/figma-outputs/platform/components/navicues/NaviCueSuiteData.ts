/**
 * NaviCue Suite Data System
 * 
 * Architecture:
 * - PILLAR → THEME → SUITE (5-8 cues)
 * - Each suite is a curated therapeutic sequence
 * - LUMA shows 3 suites, shuffles to 3 more, tracks completion
 * - Auto-play next suite after completion
 * 
 * Tagging System:
 * - type: NaviCue family (statement_mirror, belief_probe, etc.)
 * - pillar: Which of 6 pillars
 * - theme: Specific concept within pillar
 * - suite_id: Unique identifier for the suite
 */

import { NaviCue } from './NaviCueEngine';
import { DASHBOARD_ASSETS } from '../../utils/dashboardAssetManifest';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface NaviCueSuite {
  id: string;
  pillar_id: string;
  pillar_name: string;
  pillar_color: string;
  theme: string;
  title: string;
  description: string;
  reason: string; // Why LUMA chose this
  duration_estimate: string; // "5 min", "8 min"
  background_asset: string;
  cue_ids: string[]; // References to individual cues
  priority?: number; // For LUMA sorting (1 = highest)
  tags?: string[]; // Additional tags like "rescue", "morning", "night"
}

export interface NaviCueMetadata {
  id: string;
  family: string;
  pillar_id: string;
  theme: string;
  tags?: string[];
}

// ============================================================================
// PILLAR SYSTEM (The 6 Pillars)
// ============================================================================

export const PILLARS = {
  'P-01': {
    id: 'P-01',
    name: 'PAUSE + GROUND',
    color: '#3E2BB8',
    description: 'Regulation and presence'
  },
  'P-02': {
    id: 'P-02',
    name: 'MEET YOUR NEEDS',
    color: '#2EC4B6',
    description: 'Self-compassion and worthiness'
  },
  'P-03': {
    id: 'P-03',
    name: 'MOVE YOUR BODY',
    color: '#F4A261',
    description: 'Somatic integration'
  },
  'P-04': {
    id: 'P-04',
    name: 'CONNECT',
    color: '#FFB703',
    description: 'Relationship and belonging'
  },
  'P-05': {
    id: 'P-05',
    name: 'SHOW YOURSELF',
    color: '#E84855',
    description: 'Boundaries and authenticity'
  },
  'P-06': {
    id: 'P-06',
    name: 'KNOW SELF',
    color: '#5739FB',
    description: 'Identity and narrative'
  }
} as const;

// ============================================================================
// ALL NAVICUES (Master Library)
// ============================================================================

export const ALL_NAVICUES: NaviCue[] = [
  // PILLAR 1: PAUSE + GROUND
  {
    id: "navi.mirror.urgency",
    family: "statement_mirror",
    modality: "text",
    text_line: "Urgency is a feeling, not a fact.",
    pillar_id: "P-01",
    pillar_name: "PAUSE + GROUND",
    pillar_color: "#3E2BB8",
    theme_name: "Urgency vs Reality",
    response_type: "tap",
    response_options: { tap_options: ["Landed", "Meh", "Pass"] },
    kbe_target: "knowing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.probe.relief",
    family: "belief_probe",
    modality: "text",
    text_line: "Relief now, regret later — what's the price tag today?",
    pillar_id: "P-01",
    pillar_name: "PAUSE + GROUND",
    pillar_color: "#3E2BB8",
    theme_name: "The Cost of Relief",
    response_type: "one_word",
    kbe_target: "believing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.koan.pain",
    family: "identity_koan",
    modality: "text",
    text_line: "What if the pain isn't the problem, but how you've been taught to fear it?",
    pillar_id: "P-01",
    pillar_name: "PAUSE + GROUND",
    pillar_color: "#3E2BB8",
    theme_name: "Pain & Fear",
    response_type: "breath",
    response_options: { breath_count: 5 },
    kbe_target: "embodying",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.story.twominutes",
    family: "story_shard",
    modality: "text",
    text_line: "He wrote 'I'm triggered' and waited two minutes. The meeting survived.",
    pillar_id: "P-01",
    pillar_name: "PAUSE + GROUND",
    pillar_color: "#3E2BB8",
    theme_name: "Pause Practice",
    response_type: "tap",
    response_options: { tap_options: ["I've done this", "I need this", "Tell me more"] },
    kbe_target: "embodying",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.reframe.relapse",
    family: "reframe_seed",
    modality: "text",
    text_line: "Relapse isn't the end of your story. It's a chapter that teaches you how to write the next one.",
    pillar_id: "P-01",
    pillar_name: "PAUSE + GROUND",
    pillar_color: "#3E2BB8",
    theme_name: "Relapse Reframe",
    response_type: "breath",
    response_options: { breath_count: 4 },
    kbe_target: "believing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.curve.3am",
    family: "curveball",
    modality: "text",
    text_line: "3am thoughts are liars. You're not making life decisions right now. You're going back to sleep.",
    pillar_id: "P-01",
    pillar_name: "PAUSE + GROUND",
    pillar_color: "#3E2BB8",
    theme_name: "Night Mind",
    response_type: "binary",
    response_options: { binary_left: "Fighting it", binary_right: "Trying to trust" },
    kbe_target: "knowing",
    is_curveball: true,
    background_asset: DASHBOARD_ASSETS.navicues
  },

  // PILLAR 2: MEET YOUR NEEDS
  {
    id: "navi.mirror.deserving",
    family: "statement_mirror",
    modality: "text",
    text_line: "You don't earn rest. You're already worthy of it.",
    pillar_id: "P-02",
    pillar_name: "MEET YOUR NEEDS",
    pillar_color: "#2EC4B6",
    theme_name: "Rest & Worth",
    response_type: "breath",
    response_options: { breath_count: 3 },
    kbe_target: "embodying",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.probe.avoiding",
    family: "belief_probe",
    modality: "text",
    text_line: "What are you avoiding by staying busy?",
    pillar_id: "P-02",
    pillar_name: "MEET YOUR NEEDS",
    pillar_color: "#2EC4B6",
    theme_name: "Busyness as Armor",
    response_type: "hold",
    response_options: { hold_duration: 5 },
    kbe_target: "knowing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.story.grocery",
    family: "story_shard",
    modality: "text",
    text_line: "She cried in the grocery store parking lot, then bought herself flowers. Both mattered.",
    pillar_id: "P-02",
    pillar_name: "MEET YOUR NEEDS",
    pillar_color: "#2EC4B6",
    theme_name: "Self Compassion",
    response_type: "binary",
    response_options: { binary_left: "I've been there", binary_right: "I'm there now" },
    kbe_target: "embodying",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.reframe.rest",
    family: "reframe_seed",
    modality: "text",
    text_line: "Rest isn't lazy. It's the most radical form of resistance in a culture that profits from your exhaustion.",
    pillar_id: "P-02",
    pillar_name: "MEET YOUR NEEDS",
    pillar_color: "#2EC4B6",
    theme_name: "Rest as Resistance",
    response_type: "tap",
    response_options: { tap_options: ["Amen", "Still fighting this", "New lens"] },
    kbe_target: "believing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.curve.dishwasher",
    family: "curveball",
    modality: "text",
    text_line: "You loaded the dishwasher. That counts as taking care of yourself today.",
    pillar_id: "P-02",
    pillar_name: "MEET YOUR NEEDS",
    pillar_color: "#2EC4B6",
    theme_name: "Tiny Wins",
    response_type: "tap",
    response_options: { tap_options: ["Needed to hear this", "Laughing", "Truth"] },
    kbe_target: "embodying",
    is_curveball: true,
    background_asset: DASHBOARD_ASSETS.navicues
  },

  // PILLAR 3: MOVE YOUR BODY
  {
    id: "navi.mirror.enough",
    family: "statement_mirror",
    modality: "text",
    text_line: "Done is better than perfect, and you've already done enough.",
    pillar_id: "P-03",
    pillar_name: "MOVE YOUR BODY",
    pillar_color: "#F4A261",
    theme_name: "Enoughness",
    response_type: "slider",
    response_options: { slider_label: "How much do you believe this?", slider_min: 0, slider_max: 10 },
    kbe_target: "believing",
    background_asset: DASHBOARD_ASSETS.navicues
  },

  // PILLAR 4: CONNECT
  {
    id: "navi.paradox.heal",
    family: "paradox_prompt",
    modality: "text",
    text_line: "Healing doesn't mean the damage never happened. It means it no longer controls you.",
    pillar_id: "P-04",
    pillar_name: "CONNECT",
    pillar_color: "#FFB703",
    theme_name: "Healing",
    response_type: "tap",
    response_options: { tap_options: ["Needed this", "Not today", "Keep going"] },
    kbe_target: "believing",
    background_asset: DASHBOARD_ASSETS.navicues
  },

  // PILLAR 5: SHOW YOURSELF
  {
    id: "navi.paradox.kind",
    family: "paradox_prompt",
    modality: "text",
    text_line: "You can be kind and still say no.",
    pillar_id: "P-05",
    pillar_name: "SHOW YOURSELF",
    pillar_color: "#E84855",
    theme_name: "Boundaries",
    response_type: "binary",
    response_options: { binary_left: "Still learning", binary_right: "I know this" },
    kbe_target: "knowing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.paradox.both",
    family: "paradox_prompt",
    modality: "text",
    text_line: "You can be terrified and brave at the same time.",
    pillar_id: "P-05",
    pillar_name: "SHOW YOURSELF",
    pillar_color: "#E84855",
    theme_name: "Courage",
    response_type: "binary",
    response_options: { binary_left: "Trying to believe", binary_right: "Living it" },
    kbe_target: "embodying",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.story.text",
    family: "story_shard",
    modality: "text",
    text_line: "Three times he typed the reply. Zero times he hit send. That was the boundary.",
    pillar_id: "P-05",
    pillar_name: "SHOW YOURSELF",
    pillar_color: "#E84855",
    theme_name: "Digital Boundaries",
    response_type: "tap",
    response_options: { tap_options: ["Relate", "Aspire to this", "Not ready"] },
    kbe_target: "knowing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.curve.unfollow",
    family: "curveball",
    modality: "text",
    text_line: "Unfollow that account. Your peace is worth more than being polite to a screen.",
    pillar_id: "P-05",
    pillar_name: "SHOW YOURSELF",
    pillar_color: "#E84855",
    theme_name: "Digital Boundaries",
    response_type: "tap",
    response_options: { tap_options: ["Done", "Not yet", "Considering"] },
    kbe_target: "embodying",
    is_curveball: true,
    background_asset: DASHBOARD_ASSETS.navicues
  },

  // PILLAR 6: KNOW SELF
  {
    id: "navi.probe.story",
    family: "belief_probe",
    modality: "text",
    text_line: "What story are you telling yourself about why you can't?",
    pillar_id: "P-06",
    pillar_name: "KNOW SELF",
    pillar_color: "#5739FB",
    theme_name: "Self Narrative",
    response_type: "one_word",
    kbe_target: "knowing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.koan.control",
    family: "identity_koan",
    modality: "text",
    text_line: "If control made you safe, would it have worked by now?",
    pillar_id: "P-06",
    pillar_name: "KNOW SELF",
    pillar_color: "#5739FB",
    theme_name: "Control Patterns",
    response_type: "none",
    kbe_target: "believing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.koan.worthy",
    family: "identity_koan",
    modality: "text",
    text_line: "Who would you be if you didn't have to prove your worth?",
    pillar_id: "P-06",
    pillar_name: "KNOW SELF",
    pillar_color: "#5739FB",
    theme_name: "Identity & Worth",
    response_type: "none",
    kbe_target: "knowing",
    is_curveball: true,
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.reframe.trigger",
    family: "reframe_seed",
    modality: "text",
    text_line: "A trigger isn't a failure. It's your nervous system showing you where the work lives.",
    pillar_id: "P-06",
    pillar_name: "KNOW SELF",
    pillar_color: "#5739FB",
    theme_name: "Triggers as Data",
    response_type: "slider",
    response_options: { slider_label: "How new is this idea?", slider_min: 0, slider_max: 10 },
    kbe_target: "knowing",
    background_asset: DASHBOARD_ASSETS.navicues
  },
  {
    id: "navi.mirror.progress",
    family: "statement_mirror",
    modality: "text",
    text_line: "Progress isn't linear. Some days you're building. Some days you're just not losing ground.",
    pillar_id: "P-06",
    pillar_name: "KNOW SELF",
    pillar_color: "#5739FB",
    theme_name: "Progress Reframe",
    response_type: "tap",
    response_options: { tap_options: ["Truth", "Hard to hear", "Needed this"] },
    kbe_target: "believing",
    background_asset: DASHBOARD_ASSETS.navicues
  }
];

// ============================================================================
// CURATED SUITES (Pillar → Theme → Suite)
// ============================================================================

export const NAVICUE_SUITES: NaviCueSuite[] = [
  // SUITE 1: Rest as Birthright (MEET YOUR NEEDS)
  {
    id: 'suite.rest.birthright',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    theme: 'Rest & Worth',
    title: 'Rest is not earned',
    description: 'You do not need to grind yourself into exhaustion to deserve rest. Rest is a birthright, not a reward.',
    reason: 'You have been pushing hard. This is not about productivity. This is about remembering that you are a human being, not a human doing.',
    duration_estimate: '6 min',
    background_asset: DASHBOARD_ASSETS.navicues,
    cue_ids: [
      'navi.mirror.deserving',    // Breath: "You don't earn rest"
      'navi.probe.avoiding',       // Hold: "What are you avoiding?"
      'navi.reframe.rest',         // Tap: "Rest is resistance"
      'navi.curve.dishwasher',     // Tap: "Dishwasher counts"
      'navi.mirror.enough'         // Slider: "Done is enough"
    ],
    priority: 1,
    tags: ['rest', 'worthiness', 'self-compassion']
  },

  // SUITE 2: Boundaries Without Guilt (SHOW YOURSELF)
  {
    id: 'suite.boundaries.noguilty',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    theme: 'Boundaries',
    title: 'Boundaries without guilt',
    description: 'You can be kind and still say no. Setting boundaries is not selfish. It is survival.',
    reason: 'You have been saying yes when you mean no. Your resentment is showing you where boundaries belong.',
    duration_estimate: '5 min',
    background_asset: DASHBOARD_ASSETS.navicues,
    cue_ids: [
      'navi.paradox.kind',         // Binary: "Kind and say no"
      'navi.story.text',           // Tap: "Typed but didn't send"
      'navi.curve.unfollow',       // Tap: "Unfollow that account"
      'navi.paradox.both',         // Binary: "Terrified and brave"
      'navi.story.grocery'         // Binary: "Cried, bought flowers"
    ],
    priority: 1,
    tags: ['boundaries', 'guilt', 'authenticity']
  },

  // SUITE 3: Night Mind Rescue (PAUSE + GROUND)
  {
    id: 'suite.night.rescue',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    theme: 'Night Mind',
    title: 'The 3am spiral',
    description: 'Night thoughts are not truth. They are fear dressed up as facts. You are going back to sleep.',
    reason: 'Your nervous system is dysregulated. These spirals are not real decisions. Let us ground you.',
    duration_estimate: '4 min',
    background_asset: DASHBOARD_ASSETS.navicues,
    cue_ids: [
      'navi.curve.3am',            // Binary: "3am thoughts are liars"
      'navi.koan.pain',            // Breath: "Pain isn't the problem"
      'navi.story.twominutes',     // Tap: "Waited two minutes"
      'navi.reframe.relapse'       // Breath: "Relapse is a chapter"
    ],
    priority: 2,
    tags: ['rescue', 'night', 'anxiety', 'regulation']
  },

  // SUITE 4: Urgency vs Reality (PAUSE + GROUND)
  {
    id: 'suite.urgency.reality',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    theme: 'Urgency vs Reality',
    title: 'Everything feels urgent',
    description: 'Urgency is a feeling, not a fact. Your nervous system is lying to you about the timeline.',
    reason: 'You are in sympathetic activation. The feeling of urgency is real. The urgency itself is not.',
    duration_estimate: '5 min',
    background_asset: DASHBOARD_ASSETS.navicues,
    cue_ids: [
      'navi.mirror.urgency',       // Tap: "Urgency is a feeling"
      'navi.probe.relief',         // One word: "Price tag of relief"
      'navi.story.twominutes',     // Tap: "Waited two minutes"
      'navi.mirror.enough',        // Slider: "Done is enough"
      'navi.curve.dishwasher'      // Tap: "Dishwasher counts"
    ],
    priority: 1,
    tags: ['urgency', 'regulation', 'grounding']
  },

  // SUITE 5: Who Am I Really? (KNOW SELF)
  {
    id: 'suite.identity.core',
    pillar_id: 'P-06',
    pillar_name: 'KNOW SELF',
    pillar_color: '#5739FB',
    theme: 'Identity & Worth',
    title: 'Who am I without this?',
    description: 'The story you tell yourself about yourself is just that. A story. What if it is not the only version?',
    reason: 'You have been defining yourself by what you do, not who you are. Let us separate those.',
    duration_estimate: '7 min',
    background_asset: DASHBOARD_ASSETS.navicues,
    cue_ids: [
      'navi.probe.story',          // One word: "What story?"
      'navi.koan.worthy',          // None: "Who without proving worth?"
      'navi.koan.control',         // None: "If control made you safe"
      'navi.reframe.trigger',      // Slider: "Trigger is data"
      'navi.mirror.progress'       // Tap: "Progress isn't linear"
    ],
    priority: 2,
    tags: ['identity', 'narrative', 'self-knowledge']
  },

  // SUITE 6: Healing the Damage (CONNECT)
  {
    id: 'suite.healing.damage',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    theme: 'Healing',
    title: 'The damage does not define you',
    description: 'Healing does not mean the damage never happened. It means it no longer controls you.',
    reason: 'You keep waiting to be undamaged before you can move forward. That is not how healing works.',
    duration_estimate: '5 min',
    background_asset: DASHBOARD_ASSETS.navicues,
    cue_ids: [
      'navi.paradox.heal',         // Tap: "Damage doesn't control"
      'navi.koan.pain',            // Breath: "Pain isn't the problem"
      'navi.reframe.relapse',      // Breath: "Relapse is a chapter"
      'navi.story.grocery',        // Binary: "Cried, bought flowers"
      'navi.mirror.progress'       // Tap: "Progress isn't linear"
    ],
    priority: 2,
    tags: ['healing', 'trauma', 'recovery']
  }
];

// ============================================================================
// SUITE SELECTION LOGIC
// ============================================================================

/**
 * Get 3 initial suites for LUMA HOME
 * Priority 1 suites first, then shuffle rest
 */
export function getInitialSuites(): NaviCueSuite[] {
  const priority1 = NAVICUE_SUITES.filter(s => s.priority === 1);
  const priority2 = NAVICUE_SUITES.filter(s => s.priority === 2);
  
  // Shuffle priority 2
  const shuffled2 = [...priority2].sort(() => Math.random() - 0.5);
  
  // Take all priority 1 + fill remaining from priority 2
  return [...priority1, ...shuffled2].slice(0, 3);
}

/**
 * Get 3 NEW suites (excluding current ones and completed ones)
 */
export function getShuffledSuites(
  currentSuiteIds: string[],
  completedSuiteIds: string[]
): NaviCueSuite[] {
  const excludeIds = [...currentSuiteIds, ...completedSuiteIds];
  
  const available = NAVICUE_SUITES.filter(s => !excludeIds.includes(s.id));
  
  // If we've completed everything, allow repeats but shuffle
  if (available.length === 0) {
    return [...NAVICUE_SUITES]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }
  
  // Shuffle and take 3
  return available
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}

/**
 * Get NaviCues for a specific suite
 */
export function getCuesForSuite(suiteId: string): NaviCue[] {
  const suite = NAVICUE_SUITES.find(s => s.id === suiteId);
  if (!suite) return [];
  
  return suite.cue_ids
    .map(id => ALL_NAVICUES.find(c => c.id === id))
    .filter(Boolean) as NaviCue[];
}

/**
 * Convert suite to ContentPath format for LUMA
 */
export function suiteToContentPath(suite: NaviCueSuite, index: number) {
  return {
    id: suite.id,
    contentType: 'navicue' as const,
    contentId: suite.id,
    content: {
      title: suite.title,
      description: suite.description,
      backgroundImage: suite.background_asset,
      pillarName: suite.pillar_name,
      pillarColor: suite.pillar_color,
      duration: suite.duration_estimate,
      concept: suite.theme
    },
    reason: suite.reason,
    priority: (index + 1) as 1 | 2 | 3
  };
}
