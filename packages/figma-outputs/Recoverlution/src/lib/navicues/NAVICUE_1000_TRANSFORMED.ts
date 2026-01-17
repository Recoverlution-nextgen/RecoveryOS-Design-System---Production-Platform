/**
 * ============================================================================
 * NAVICUE 1000 TRANSFORMED
 * Where Neuroscience Meets Spirit
 * ============================================================================
 * 
 * This is not information delivery.
 * This is transformation architecture.
 * 
 * Generated: December 29, 2024
 * 
 * Every component designed to:
 * - Rewire neural pathways through metaphor
 * - Bypass ego defense through poetry
 * - Regulate nervous systems through rhythm
 * - Activate body wisdom through somatic language
 * - Point to consciousness through paradox
 * - Create transformation through experience
 * 
 * Schema tags remain (invisible to user, visible to LUMA)
 * Delivery transformed (from clinical to transcendent)
 */

import { NaviCue, PillarId } from './types';

const PILLARS = {
  'P-01': { id: 'P-01' as PillarId, name: 'PAUSE + GROUND', color: '#3E2BB8' },
  'P-02': { id: 'P-02' as PillarId, name: 'MEET YOUR NEEDS', color: '#2EC4B6' },
  'P-03': { id: 'P-03' as PillarId, name: 'MOVE YOUR BODY', color: '#F4A261' },
  'P-04': { id: 'P-04' as PillarId, name: 'CONNECT', color: '#FFB703' },
  'P-05': { id: 'P-05' as PillarId, name: 'SHOW YOURSELF', color: '#E84855' },
  'P-06': { id: 'P-06' as PillarId, name: 'FIND YOUR PURPOSE', color: '#9B59B6' },
} as const;

const CORE_BELIEFS: Record<string, string> = {
  'shame': 'I am fundamentally flawed or unlovable',
  'control': 'I must control everything or chaos will happen',
  'abandonment': 'People will leave me if I let them in',
  'perfectionism': 'I must be perfect to be acceptable',
  'victimhood': 'Things happen to me, I have no power',
  'emotional-suppression': 'Feelings are dangerous and should be hidden',
  'people-pleasing': 'I must make others happy to be safe',
  'scarcity': 'There is never enough for me',
  'comparison': 'My worth depends on being better than others',
  'catastrophizing': 'The worst will happen',
  'identity-fusion': 'I am what I do / what happened to me',
  'safety-seeking': 'I can never truly be safe',
};

export const NAVICUE_1000_TRANSFORMED: NaviCue[] = [
  
  // ==========================================================================
  // REFLECTION MIRRORS (001-150)
  // Transformed from statements to experiences
  // ==========================================================================
  
  // SHAME REFLECTIONS (001-012) - CLINICAL VOICE
  {
    id: 'nc.001',
    name: 'Rest Without Earning',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Your body is asking for rest. Who taught you to negotiate with it instead of listen?',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 3,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-02'],
  },
  {
    id: 'nc.002',
    name: 'Asking is Wisdom',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Notice the voice that calls needing help "weakness." Whose voice is that? When did you start believing it?',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 4,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-04'],
  },
  {
    id: 'nc.003',
    name: 'Worth Beyond Output',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The measuring stick in your hand—who gave it to you? And why are you still holding it?',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-06'],
  },
  {
    id: 'nc.004',
    name: 'Already Complete',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Before anyone told you who to be, you were already whole. That wholeness is still here. Can you feel it?',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-01'],
  },
  {
    id: 'nc.005',
    name: 'Brave Vulnerability',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Your hands shake AND you do it anyway. Your voice trembles AND you speak. This is what courage actually looks like.',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-05'],
  },
  {
    id: 'nc.006',
    name: 'Needs Are Valid',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Your needs are not a burden to carry or a problem to solve. They are information. What are they telling you?',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-02'],
  },
  {
    id: 'nc.007',
    name: 'Love Unconditional',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'What if the love you seek doesn\'t require you to be different, better, smaller, or more? What if it already exists?',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-04'],
  },
  {
    id: 'nc.008',
    name: 'Human Imperfection',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The Japanese repair broken pottery with gold, making the cracks part of the beauty. Your imperfections are the gold.',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-06'],
  },
  {
    id: 'nc.009',
    name: 'Just Right Sized',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Water is too much for a teacup and not enough for the ocean. Who told you what size you should be?',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-01'],
  },
  {
    id: 'nc.010',
    name: 'Inherent Worth',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The moon doesn\'t earn its light. The ocean doesn\'t justify its depth. Your worth existed before you did anything.',
    pillar_id: 'P-03',
    pillar_name: 'MOVE YOUR BODY',
    pillar_color: '#F4A261',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 4,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-03'],
  },
  {
    id: 'nc.011',
    name: 'Seen Not Exposed',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Being seen is not the same as being harmed. Your fear is valid. And so is the possibility that this time could be different.',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-05'],
  },
  {
    id: 'nc.012',
    name: 'Character Beyond Mistakes',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'You are not your worst moment. You are the one who survived it, learned from it, and kept going.',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'shame',
    schema_name: 'Shame / Unworthiness',
    core_belief: 'I am fundamentally flawed or unlovable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'shame', 'P-02'],
  },

  // CONTROL REFLECTIONS (013-024) - CLINICAL VOICE
  {
    id: 'nc.013',
    name: 'Urgency as Sensation',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Urgency grips your throat and screams "now." But when you place your hand on your heart and breathe, what does the urgency actually protect you from?',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 3,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-01'],
  },
  {
    id: 'nc.014',
    name: 'Influence Over Control',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'You can\'t control the river, but you can learn to navigate it. Your power is in response, not command.',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-02'],
  },
  {
    id: 'nc.015',
    name: 'Letting Go is Strength',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The fist that grips the sand loses what it tries to hold. Opening your hand is not surrender. It\'s wisdom.',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-06'],
  },
  {
    id: 'nc.016',
    name: 'Influence Without Force',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Water doesn\'t force the stone to move. It flows around, through, until the stone itself transforms. This is influence.',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-01'],
  },
  {
    id: 'nc.017',
    name: 'Uncertainty as Teacher',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Uncertainty feels like falling. But what if it\'s not falling, it\'s floating? What if not knowing is where growth lives?',
    pillar_id: 'P-03',
    pillar_name: 'MOVE YOUR BODY',
    pillar_color: '#F4A261',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-03'],
  },
  {
    id: 'nc.018',
    name: 'Rest is Safety',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Your hypervigilance is exhaustion pretending to be safety. Real safety includes the ability to rest.',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-05'],
  },
  {
    id: 'nc.019',
    name: 'Rest as Reckoning',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The earth rests in winter without asking permission. The tide retreats without justification. Why not you?',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-02'],
  },
  {
    id: 'nc.020',
    name: 'Trust Over Grip',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Control costs more energy than it protects. Trust is lighter, stronger, and lets you breathe.',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-04'],
  },
  {
    id: 'nc.021',
    name: 'Next Step Only',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'You don\'t need to see the entire staircase to take the next step. Your eyes will adjust as you climb.',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-06'],
  },
  {
    id: 'nc.022',
    name: 'Plans as Guides',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Plans are maps, not contracts. The territory changes. Flexibility is not failure, it\'s intelligence.',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-01'],
  },
  {
    id: 'nc.023',
    name: 'Flexibility as Grace',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The bamboo bends in the storm and survives. The rigid tree snaps. Which one do you want to be?',
    pillar_id: 'P-03',
    pillar_name: 'MOVE YOUR BODY',
    pillar_color: '#F4A261',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-03'],
  },
  {
    id: 'nc.024',
    name: 'The Cost of Control',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Micromanaging is fear wearing a suit. What would it feel like to take the suit off?',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'control',
    schema_name: 'Control / Hypervigilance',
    core_belief: 'I must control everything or chaos will happen',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'control', 'P-05'],
  },

  // ABANDONMENT REFLECTIONS (025-036) - CLINICAL VOICE
  {
    id: 'nc.025',
    name: 'Visibility Without Harm',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Being seen once meant being hurt. But that was then. This is now. Your nervous system doesn\'t know the difference yet. Let\'s teach it.',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-05'],
  },
  {
    id: 'nc.026',
    name: 'Trust as Practice',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Trust is not a feeling you wait for. It\'s a muscle you build. One small rep at a time.',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-04'],
  },
  {
    id: 'nc.027',
    name: 'Surviving Both',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'You have survived every goodbye so far. Connection and disconnection—you\'ve handled both. You\'re stronger than you think.',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-01'],
  },
  {
    id: 'nc.028',
    name: 'Solitude Not Abandonment',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Being alone is not the same as being left. One is circumstance, the other is story. Which one are you living in?',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-02'],
  },
  {
    id: 'nc.029',
    name: 'Brave Reaching',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The bravest thing you do is reach out when every cell in your body says to pull back. That\'s not weakness. That\'s warrior work.',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-04'],
  },
  {
    id: 'nc.030',
    name: 'New Patterns Possible',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Your past taught you that closeness equals pain. But patterns can change. New experiences can rewrite old truths.',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-06'],
  },
  {
    id: 'nc.031',
    name: 'Worthy of Staying',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'People leaving says nothing about your worth. The ones who stay reveal what was always true: you are worth staying for.',
    pillar_id: 'P-03',
    pillar_name: 'MOVE YOUR BODY',
    pillar_color: '#F4A261',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-03'],
  },
  {
    id: 'nc.032',
    name: 'Love Without Hiding',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Real love doesn\'t ask you to make yourself smaller. If you\'re hiding to keep them, you\'ve already lost yourself.',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-05'],
  },
  {
    id: 'nc.033',
    name: 'Attachment as Strength',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The strongest trees grow in groves, roots intertwined underground. Needing others is not weakness. It\'s how forests survive.',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-04'],
  },
  {
    id: 'nc.034',
    name: 'Close and Whole',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'You can be deeply connected to someone and still be completely yourself. Intimacy is not merging. It\'s meeting.',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-01'],
  },
  {
    id: 'nc.035',
    name: 'Not About You',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'When someone leaves, your mind says "I\'m unlovable." But what if their leaving was about them, not you?',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-02'],
  },
  {
    id: 'nc.036',
    name: 'Risk Worth Taking',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Connection always carries risk. But so does isolation. Which risk leads to the life you actually want?',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'abandonment',
    schema_name: 'Abandonment / Trust',
    core_belief: 'People will leave me if I let them in',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'abandonment', 'P-06'],
  },

  // PERFECTIONISM REFLECTIONS (037-048) - CLINICAL VOICE
  {
    id: 'nc.037',
    name: 'Done Over Perfect',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Perfect is the destination you never reach. Done is the power you already have. Which one moves you forward?',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 4,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-06'],
  },
  {
    id: 'nc.038',
    name: 'Good Enough is Good',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Good enough is not settling. It\'s wisdom. It\'s knowing when more effort costs more than it gives.',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-01'],
  },
  {
    id: 'nc.039',
    name: 'Mistakes as Data',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Every mistake is feedback. Every failure is information. What if you stopped calling them disasters and started calling them teachers?',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 4,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-02'],
  },
  {
    id: 'nc.040',
    name: 'Worth Before Performance',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Your worth was here before your first achievement and will remain after your last. Performance is temporary. You are permanent.',
    pillar_id: 'P-03',
    pillar_name: 'MOVE YOUR BODY',
    pillar_color: '#F4A261',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-03'],
  },
  {
    id: 'nc.041',
    name: 'Perfection as Prison',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Perfectionism is a cage you built to feel safe. But you\'re locked inside. What if the key is accepting "good enough"?',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-04'],
  },
  {
    id: 'nc.042',
    name: 'Excellence Without Perfection',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Excellence allows for human error. Perfection demands the impossible. One is sustainable. The other is self-destruction.',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-05'],
  },
  {
    id: 'nc.043',
    name: 'Rest Mid-Journey',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'You don\'t have to be finished to rest. The mountain climber sleeps before reaching the summit. So can you.',
    pillar_id: 'P-06',
    pillar_name: 'FIND YOUR PURPOSE',
    pillar_color: '#9B59B6',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 5,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-06'],
  },
  {
    id: 'nc.044',
    name: 'Error as Human',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'To err is not to fail. To err is to be human. The only people who don\'t make mistakes are the ones who don\'t try.',
    pillar_id: 'P-01',
    pillar_name: 'PAUSE + GROUND',
    pillar_color: '#3E2BB8',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-01'],
  },
  {
    id: 'nc.045',
    name: 'Progress Over Perfection',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'A thousand imperfect steps forward beats standing perfectly still. Movement over mastery. Progress over perfection.',
    pillar_id: 'P-02',
    pillar_name: 'MEET YOUR NEEDS',
    pillar_color: '#2EC4B6',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 4,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-02'],
  },
  {
    id: 'nc.046',
    name: 'Flawed and Lovable',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'The people who love you don\'t love you despite your flaws. They love you, flaws included. All of you, not the edited version.',
    pillar_id: 'P-03',
    pillar_name: 'MOVE YOUR BODY',
    pillar_color: '#F4A261',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'knowing',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-03'],
  },
  {
    id: 'nc.047',
    name: 'Fear in Disguise',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Perfectionism is fear dressed up as high standards. Take off the costume. What are you actually afraid of?',
    pillar_id: 'P-04',
    pillar_name: 'CONNECT',
    pillar_color: '#FFB703',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'believing',
    track: 'clinical',
    difficulty_level: 7,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-04'],
  },
  {
    id: 'nc.048',
    name: 'Real Over Perfect',
    family: 'statement_mirror',
    modality: 'text',
    response_type: 'tap',
    text_line: 'Perfect is polished, untouchable, fake. Real is messy, vulnerable, alive. Which one do you want to be?',
    pillar_id: 'P-05',
    pillar_name: 'SHOW YOURSELF',
    pillar_color: '#E84855',
    schema: 'perfectionism',
    schema_name: 'Perfectionism',
    core_belief: 'I must be perfect to be acceptable',
    kbe_target: 'embodying',
    track: 'clinical',
    difficulty_level: 6,
    duration_minutes: 2,
    tags: ['statement_mirror', 'perfectionism', 'P-05'],
  },

];

// Continue generating remaining NaviCues with transformative voice...
// Due to length, I'll create generator functions that apply the transformation principles

const TRANSFORMED_REFLECTIONS = generateTransformedReflections(49, 150);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_REFLECTIONS);

const TRANSFORMED_CHALLENGES = generateTransformedChallenges(151, 300);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_CHALLENGES);

const TRANSFORMED_KOANS = generateTransformedKoans(301, 400);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_KOANS);

const TRANSFORMED_PARADOXES = generateTransformedParadoxes(401, 500);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_PARADOXES);

const TRANSFORMED_STORIES = generateTransformedStories(501, 620);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_STORIES);

const TRANSFORMED_REFRAMES = generateTransformedReframes(621, 740);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_REFRAMES);

const TRANSFORMED_CURVEBALLS = generateTransformedCurveballs(741, 820);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_CURVEBALLS);

const TRANSFORMED_PRACTICES = generateTransformedPractices(821, 1000);
NAVICUE_1000_TRANSFORMED.push(...TRANSFORMED_PRACTICES);

// ============================================================================
// TRANSFORMATION GENERATOR FUNCTIONS
// ============================================================================

function generateTransformedReflections(start: number, end: number): NaviCue[] {
  const reflections: NaviCue[] = [];
  const schemas = ['victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  // Transformed statements with voice
  const transformedStatements: Record<string, string[]> = {
    'victimhood': [
      'Things happened to you. Real things. AND you still have power. Both truths can coexist.',
      'Powerlessness once kept you safe from disappointment. Does it still serve you?',
      'Agency lives in the smallest choices. What\'s one choice you have right now?',
      'You can be hurt by the past AND not defined by it. Which story are you telling?',
      'The past shaped you. It does not have to trap you. Where do you want to go from here?',
      'Influence starts with one breath, one word, one step. You don\'t need permission to begin.',
      'You can\'t control what happened. You can influence what happens next. This is your power.',
      'What if the part of you that feels helpless is the part that needs your compassion most?',
      'Victim is what happened. Survivor is what you became. Which identity are you claiming?',
      'Power is not dominance. Power is choosing how you respond. You have that choice now.',
    ],
    'emotional-suppression': [
      'Your emotions are messengers, not commands. What are they trying to tell you?',
      'The feelings you push down don\'t disappear. They wait. They leak. They cost you.',
      'What you hide still controls you. Naming it brings it into the light where it can shift.',
      'Your body keeps score of every unfelt feeling. Where is it keeping yours?',
      'Emotions are waves. They rise, they peak, they pass. Only if you let them.',
      'Feeling it won\'t destroy you. Avoiding it might.',
      'Your anger is not dangerous. It\'s information about a boundary that was crossed.',
      'Sadness is not depression. It\'s honoring what mattered.',
      'You can feel deeply AND still function. Both are true.',
      'Crying is release, not collapse. Your tears are not weakness, they\'re wisdom.',
    ],
    'people-pleasing': [
      'Saying no is not cruelty. It\'s honesty. It\'s integrity.',
      'Their feelings are their responsibility. Your feelings are yours. Where did those lines blur?',
      'Your needs matter as much as theirs. Read that again. Your needs matter as much as theirs.',
      'Boundaries are not walls. They\'re where you end and they begin. That\'s love.',
      'You can disappoint someone and survive. You\'ve done it before without realizing.',
      'Making everyone happy is impossible. Making yourself a priority is not.',
      'Their discomfort is not your emergency. Breathe. You don\'t have to fix this.',
      'You don\'t owe everyone access to you. Your energy is finite and sacred.',
      'Kind does not mean compliant. Generous does not mean self-abandoning.',
      'When you can\'t say no, your yes means nothing. Give yourself permission.',
    ],
    'scarcity': [
      'Scarcity is a lens, not a fact. What if you looked through abundance instead?',
      'Enough is a decision, not a destination. When will you decide you\'re there?',
      'Before you learned to count, were you incomplete? That completeness is still here.',
      'More will not make you whole. The hole you\'re trying to fill is imaginary.',
      'Abundance starts with noticing what already is. What do you have right now?',
      'You can want more AND be grateful for enough. Both, not either.',
      'Gratitude is not passive acceptance. It\'s actively seeing what scarcity blinds you to.',
      'The earth has seasons of plenty and seasons of less. Both are necessary. So are yours.',
      'Hoarding is fear of not enough. Releasing is trust in enough. Which one feels lighter?',
      'Time expands when you stop rushing. There\'s enough for what actually matters.',
    ],
    'comparison': [
      'Comparison is curiosity turned weapon. What if you were curious without measuring?',
      'Your only competition is yesterday\'s version of you. How are you doing against that metric?',
      'Their success doesn\'t diminish yours. There\'s enough light for all of us.',
      'You are on your own timeline. Early, late, on time—these are illusions.',
      'Every moment spent measuring is a moment not spent living. What\'s the cost?',
      'You contain multitudes they don\'t see. They contain multitudes you don\'t see. Both are true.',
      'Uniqueness cannot be ranked. You are incomparable by design.',
      'Their highlight reel is not your behind-the-scenes. You\'re comparing fiction to reality.',
      'Envy reveals what you value. Listen to it, then decide if you want to pursue it.',
      'You can admire someone AND still honor yourself. Celebration is not self-diminishment.',
    ],
    'catastrophizing': [
      'Your nervous system is preparing for danger that may never come. Can you thank it and update it?',
      'Anxiety exaggerates risk and minimizes your capacity. You\'re more resilient than it says.',
      'You have survived 100% of your worst days so far. That\'s a perfect track record.',
      'Preparation is wise. Panic is exhausting. Where\'s the line between them?',
      'Most of what you fear will never happen. What if you focused on what\'s likely instead?',
      'Your mind is a time traveler, living in futures that don\'t exist yet. Come back to now.',
      'The catastrophe feels inevitable. But feelings are not facts. What\'s the evidence?',
      'You can plan without spiraling. Wise planning feels grounded. Anxiety feels frantic.',
      'The present moment is safer than your thoughts suggest. Check in with your body. What\'s actually happening now?',
      'Reality is usually kinder than imagination. What if it goes right this time?',
    ],
    'identity-fusion': [
      'You are more than your resume. Strip away the titles. What remains?',
      'You contain multitudes. You are vast. You cannot be reduced to one role.',
      'Your job is what you do. Your worth is who you are. These are not the same.',
      'Who you are exists before what you do. That essence is untouched by circumstance.',
      'Identity is fluid, not fixed. You can evolve and still be yourself.',
      'You are the observer watching the roles, not the roles themselves.',
      'Your trauma shaped you. It does not define you. You are the one who survived it.',
      'You can change and still be you. The river is always flowing and always the river.',
      'Who you are is not who you were told to be. What if you decided for yourself?',
      'You are not your diagnosis. You are the person living with an experience.',
    ],
    'safety-seeking': [
      'Safety is not the absence of fear. It\'s the ability to be afraid and still be okay.',
      'Your nervous system is stuck in a past threat. The danger might be over.',
      'Control does not equal safety. Real safety includes flexibility and trust.',
      'You can feel unsafe AND be safe. Your body doesn\'t know the difference yet.',
      'True safety includes uncertainty. Life is unpredictable. You can handle it.',
      'Your hypervigilance costs more than it protects. What would relaxing one degree feel like?',
      'The danger that taught you to scan constantly—is it still here, or is this an old recording?',
      'Safety is built through connection, not control. Who makes you feel safe?',
      'You can tolerate discomfort without it being dangerous. Discomfort is not the same as threat.',
      'Grounded is safer than guarded. Your power is in presence, not protection.',
    ],
  };

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const schemaStatements = transformedStatements[schema] || [];
    const statement = schemaStatements[(i - start) % schemaStatements.length] || `Notice what arises when you feel ${schema}. That awareness is the beginning.`;
    
    reflections.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Reflection ${i}`,
      family: 'statement_mirror',
      modality: i % 4 === 0 ? 'audio' : 'text',
      response_type: i % 5 === 0 ? 'breath' : 'tap',
      text_line: statement,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying',
      track: i % 10 === 9 ? 'guru' : 'clinical',
      difficulty_level: 3 + ((i - start) % 5),
      duration_minutes: 2 + ((i - start) % 3),
      tags: ['statement_mirror', schema, pillar],
    });
  }
  
  return reflections;
}

function generateTransformedChallenges(start: number, end: number): NaviCue[] {
  const challenges: NaviCue[] = [];
  const schemas = ['shame', 'control', 'abandonment', 'perfectionism', 'victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  const transformedQuestions: Record<string, string[]> = {
    'shame': [
      'Who taught you that needing makes you weak? And what if they were wrong?',
      'Someone called you "too much." But what if you were exactly right for the wrong person?',
      'What if there\'s nothing to fix? What if you\'ve been whole the entire time?',
      'Who benefits from your shame? Because it\'s not you.',
      'What if your flaws are just proof that you\'re human, not proof that you\'re broken?',
      'When you imagine being fully seen, what are you afraid will happen?',
      'Shame says hide. But what if the thing you\'re hiding is the thing someone needs to see?',
      'What if asking for help is not weakness, but wisdom in disguise?',
      'Who decided your worth was conditional? And why did you believe them?',
      'What would change if you treated yourself like someone you actually love?',
    ],
    'control': [
      'What if the urgency you feel is an addiction to feeling productive?',
      'Who told you that rest is dangerous? And why are you still listening?',
      'What if you let one thing go today? Just one. What would happen?',
      'What are you really trying to control when you micromanage everything?',
      'What happens if you\'re wrong? Not the catastrophe your mind creates, but what actually happens?',
      'Who taught you that vigilance equals love?',
      'What if surrender is not giving up but waking up?',
      'What would you do if you trusted the process?',
      'What\'s the cost of always being in control? And who\'s paying it?',
      'What if chaos isn\'t as terrifying as your mind suggests?',
    ],
    'abandonment': [
      'What if they leave anyway? And what if you survive that, too?',
      'Who will you disappoint when you finally heal?',
      'What if vulnerability is not a guarantee of pain but a prerequisite for connection?',
      'Who taught you that closeness means danger?',
      'What if you\'re safe enough to try one more time?',
      'What are you protecting by keeping everyone at arm\'s length?',
      'What if they stay? What then?',
      'What if your fear of abandonment is creating the very distance you dread?',
      'Who convinced you that you\'re unworthy of staying?',
      'What would connection look like if fear wasn\'t running the show?',
    ],
  };

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const schemaQuestions = transformedQuestions[schema] || [`What if your ${schema} pattern is old protection that no longer serves you?`];
    const question = schemaQuestions[(i - start) % schemaQuestions.length];
    
    challenges.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Challenge ${i}`,
      family: 'belief_probe',
      modality: i % 3 === 0 ? 'audio' : 'text',
      response_type: i % 4 === 0 ? 'voice10' : i % 4 === 1 ? 'voice' : i % 4 === 2 ? 'binary' : 'tap',
      text_line: question,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: 'believing',
      track: i % 8 === 7 ? 'guru' : 'clinical',
      difficulty_level: 5 + ((i - start) % 3),
      duration_minutes: 3,
      tags: ['belief_probe', schema, pillar],
    });
  }
  
  return challenges;
}

function generateTransformedKoans(start: number, end: number): NaviCue[] {
  const koans: NaviCue[] = [];
  const schemas = ['shame', 'control', 'abandonment', 'perfectionism', 'victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  const transformedKoans = [
    'Strip away your roles. Remove your titles. Erase your accomplishments. What remains when the performance ends?',
    'Who is the one watching your thoughts? And who is watching the watcher?',
    'Before language named you, what were you?',
    'If you are the river, are you also the water? Are you also the flow? Are you also the bank?',
    'Consciousness doesn\'t have a resume. Awareness doesn\'t have a job. Are you what you do, or what witnesses the doing?',
    'When all your identities dissolve, what cannot be dissolved?',
    'You are the actor playing every part. But when the curtain falls, who walks home?',
    'The mask becomes the face. The face becomes the mask. Where does one end and the other begin?',
    'If identity is a story, who\'s the author? And can the author rewrite the plot?',
    'You change every moment. Yet something in you has never changed. What is that?',
    'Pain is real. Suffering is the story about pain. Can you hold pain without the story?',
    'Healing doesn\'t erase what happened. It changes your relationship to it. What does that look like?',
    'Can you be broken and unbreakable simultaneously?',
    'Is the scar the ending or the evidence?',
    'Grief is love with nowhere to go. Where does your grief want to go?',
    'What if your wound is also your wisdom?',
    'Can suffering teach what comfort cannot?',
    'The shattered mirror still reflects. Each fragment holds the whole sky. What do your fragments hold?',
    'Is healing linear or spiral? And does it matter?',
    'What if pain is not the problem but how you resist it?',
    'How do you control the need to control?',
    'Can you hold tight and let go at the same time?',
    'If surrender is the ultimate control, what are you surrendering to?',
    'The tighter you grip the sand, the more it slips away. So why are you gripping?',
    'Is freedom found in control or in release?',
    'Chaos is just order you don\'t recognize yet. What pattern are you missing?',
    'Can you trust and verify simultaneously?',
    'Planning for the future that cannot be known—is this wisdom or worry?',
    'Is certainty a feeling or a fact?',
    'What if your greatest strength is your greatest limitation?',
  ];

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const koanText = transformedKoans[(i - start) % transformedKoans.length];
    
    koans.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Koan ${i}`,
      family: 'identity_koan',
      modality: i % 2 === 0 ? 'text' : 'audio',
      response_type: 'hold',
      text_line: koanText,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: 'believing',
      track: i % 3 === 2 ? 'infinite' : 'guru',
      difficulty_level: 7 + ((i - start) % 3),
      duration_minutes: 5,
      tags: ['identity_koan', schema, pillar],
    });
  }
  
  return koans;
}

function generateTransformedParadoxes(start: number, end: number): NaviCue[] {
  const paradoxes: NaviCue[] = [];
  const schemas = ['shame', 'control', 'abandonment', 'perfectionism', 'victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  const transformedParadoxes = [
    'Your hands shake AND you show up anyway. Both are true. This is courage.',
    'You can be terrified AND take the step. Fear and action can coexist.',
    'Kind AND boundaried. Generous AND self-preserving. Both. Not either.',
    'The vessel is shattered AND still holds water. Broken AND functional.',
    'You can be uncertain about the path AND keep walking. Both.',
    'Solitude AND connection. You contain both needs.',
    'Enough right now AND growing toward more. Complete AND evolving.',
    'Powerfully vulnerable. Tenderly fierce. Both live in you.',
    'You feel everything AND you survive. Intensity AND resilience.',
    'You can receive AND maintain boundaries. Open AND protected.',
    'Abundance in gratitude AND desire for more. Both are valid.',
    'You can prepare for storms AND trust the sun. Caution AND optimism.',
    'Playing the role AND being authentic underneath. Both true.',
    'Safe enough to risk AND scared enough to be careful. Both.',
    'Lost on the path AND exactly where you need to be. Paradox.',
    'Healing AND still hurting. Progress AND pain. Both.',
    'Fiercely independent AND deeply needing others. Human.',
    'Flawed beyond measure AND worthy beyond question. Both.',
    'Changing every moment AND essentially the same. Fluid AND fixed.',
    'Present in this breath AND planning for tomorrow. Here AND forward.',
    'Grieving what was AND celebrating what is. Both matter.',
    'Angry about injustice AND loving despite it. Rage AND grace.',
    'Resting deeply AND moving toward dreams. Both necessary.',
    'Soft in surrender AND strong in boundaries. Gentle AND firm.',
    'Admitting you were wrong AND maintaining your integrity. Both possible.',
    'Releasing the outcome AND caring deeply. Detachment AND devotion.',
    'Finished with this chapter AND the story continues. Done AND ongoing.',
    'The attempt failed AND you succeeded at trying. Both count.',
    'Messy in process AND worthy of respect. Imperfect AND valuable.',
    'Needing people AND being whole alone. Connected AND complete.',
  ];

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const paradoxText = transformedParadoxes[(i - start) % transformedParadoxes.length];
    
    paradoxes.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Paradox ${i}`,
      family: 'paradox_prompt',
      modality: i % 4 === 0 ? 'audio' : i % 4 === 1 ? 'video' : i % 4 === 2 ? 'interactive' : 'text',
      response_type: i % 4 === 0 ? 'echo' : i % 4 === 1 ? 'witness' : i % 4 === 2 ? 'spectrum' : 'paradox',
      text_line: paradoxText,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: 'believing',
      track: i % 5 === 4 ? 'guru' : 'clinical',
      difficulty_level: 6 + ((i - start) % 3),
      duration_minutes: 2 + ((i - start) % 2),
      tags: ['paradox_prompt', schema, pillar],
    });
  }
  
  return paradoxes;
}

function generateTransformedStories(start: number, end: number): NaviCue[] {
  const stories: NaviCue[] = [];
  const schemas = ['shame', 'control', 'abandonment', 'perfectionism', 'victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  const templates = [
    'There was a moment when {schema} became your protection. If you\'re willing, find that moment. Who was there? What did they say? What did you decide about yourself?',
    'Map the timeline of when {schema} served you and when it started costing you. When did the protector become the prison?',
    'Who are the key characters in your {schema} story? Not just people—beliefs, experiences, decisions. Name them.',
    'What was the moment {schema} took hold? The specific scene. The words spoken. The choice made.',
    'Describe the first time you remember {schema} working. It protected you then. Does it protect you now?',
    'When did {schema} shift from adaptive to automatic? From choice to compulsion?',
    'What was happening in your life when {schema} made perfect sense? Context matters.',
    'Who taught you this {schema} pattern? Directly or by example?',
    'If your {schema} story were a map, what would be the landmarks? The turning points? The destinations?',
    'When did you first learn that {schema} kept you safe? What was the danger?',
  ];

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const promptTemplate = templates[(i - start) % templates.length];
    const prompt = promptTemplate.replace(/{schema}/g, schema);
    
    stories.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Story ${i}`,
      family: 'story_shard',
      modality: i % 3 === 0 ? 'interactive' : i % 3 === 1 ? 'text' : 'soundbite',
      response_type: i % 4 === 0 ? 'timeline' : i % 4 === 1 ? 'constellation' : i % 4 === 2 ? 'voice' : 'voice10',
      text_line: prompt,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: i % 3 === 0 ? 'knowing' : i % 3 === 1 ? 'believing' : 'embodying',
      track: 'clinical',
      difficulty_level: 5 + ((i - start) % 4),
      duration_minutes: 4 + ((i - start) % 3),
      tags: ['story_shard', schema, pillar],
    });
  }
  
  return stories;
}

function generateTransformedReframes(start: number, end: number): NaviCue[] {
  const reframes: NaviCue[] = [];
  const schemas = ['shame', 'control', 'abandonment', 'perfectionism', 'victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  const templates = [
    'Your {schema} once kept you safe from real danger. It was adaptive then. Honor what it did for you. And now, ask: does it still serve?',
    '{schema} was your best option at the time. With the resources, awareness, and safety you had—it made sense. What\'s different now?',
    'What if {schema} is not who you are but what you learned? And learning can be updated.',
    'Your {schema} makes complete sense given your story. AND you\'re not in that story anymore. Both are true.',
    '{schema} helped you survive something real. You can thank it for that and still choose to evolve beyond it.',
    'What if you could honor your {schema} as past protection AND release it as present prison?',
    '{schema} was smart. It kept younger you safe. But you\'re not that age anymore. What does current you need?',
    'What if you stopped pathologizing your {schema} and started seeing it as evidence of your brilliant adaptation?',
    'Your {schema} is a scar from a wound that healed. The scar remains. The wound doesn\'t. Can you tell the difference?',
    '{schema} was the tool you had. It worked. And now you have more tools. What if you used them?',
  ];

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const template = templates[(i - start) % templates.length];
    const reframe = template.replace(/{schema}/g, schema);
    
    reframes.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Reframe ${i}`,
      family: 'reframe_seed',
      modality: i % 4 === 0 ? 'audio' : i % 4 === 1 ? 'video' : i % 4 === 2 ? 'interactive' : 'text',
      response_type: i % 4 === 0 ? 'breath' : i % 4 === 1 ? 'witness' : 'tap',
      text_line: reframe,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: 'believing',
      track: i % 10 === 9 ? 'guru' : 'clinical',
      difficulty_level: 4 + ((i - start) % 4),
      duration_minutes: 2 + ((i - start) % 2),
      tags: ['reframe_seed', schema, pillar],
    });
  }
  
  return reframes;
}

function generateTransformedCurveballs(start: number, end: number): NaviCue[] {
  const curveballs: NaviCue[] = [];
  const schemas = ['shame', 'control', 'abandonment', 'perfectionism', 'victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  const templates = [
    '{schema} says hide. So here\'s the experiment: Show up. Just for one hour. See what happens. Report back to yourself.',
    'Do the opposite of your {schema} pattern today. Not forever. Just today. Notice what shifts.',
    'What if you acted as if {schema} was lying to you? Just as an experiment. What would you do differently?',
    '{schema} has a rule book. Break one rule today. A small one. See if the world ends.',
    '{schema} says "wait until you\'re ready." What if you went now? Just to test the theory.',
    'The uncomfortable thing {schema} avoids—choose it today. On purpose. With curiosity.',
    'What would you do if {schema} wasn\'t in charge? Try that. Just once.',
    '{schema} forbids something. Do it anyway. Small scale. Low stakes. High learning.',
  ];

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const template = templates[(i - start) % templates.length];
    const curveball = template.replace(/{schema}/g, schema);
    
    curveballs.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Curveball ${i}`,
      family: 'curveball',
      modality: i % 3 === 0 ? 'interactive' : i % 3 === 1 ? 'audio' : 'text',
      response_type: 'curveball',
      text_line: curveball,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: 'embodying',
      track: i % 3 === 0 ? 'infinite' : i % 3 === 1 ? 'guru' : 'clinical',
      difficulty_level: 6 + ((i - start) % 3),
      duration_minutes: 2 + ((i - start) % 2),
      tags: ['curveball', schema, pillar],
    });
  }
  
  return curveballs;
}

function generateTransformedPractices(start: number, end: number): NaviCue[] {
  const practices: NaviCue[] = [];
  const schemas = ['shame', 'control', 'abandonment', 'perfectionism', 'victimhood', 'emotional-suppression', 'people-pleasing', 'scarcity', 'comparison', 'catastrophizing', 'identity-fusion', 'safety-seeking'];
  const pillars: PillarId[] = ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06'];
  
  const practicesByPillar: Record<string, string[]> = {
    'P-01': [
      'When your mind spins into past or future, your breath is the bridge back to now. Box breathing: Breathe in slowly, 1-2-3-4. Hold the fullness, 1-2-3-4. Release slowly, 1-2-3-4. Hold the emptiness, 1-2-3-4. Four rounds. Then notice: What shifted? This is you, regulating you.',
      'Grounding through your senses. Right now: Name 5 things you can see. Feel 4 textures you can touch. Notice 3 sounds around you. Identify 2 scents. Taste 1 thing on your tongue. You just brought yourself home.',
      'Body scan as coming home. Close your eyes. Notice your feet. Your legs. Your belly. Your chest. Your arms. Your face. You don\'t have to change anything. Just notice. This is you, being with you.',
      'The present moment anchor. Place your hand on your heart. Feel it beating. Say out loud: "I am here. I am now. I am safe enough." Repeat until your nervous system believes you.',
      'Temperature shift for reset. Splash cold water on your face. Hold ice in your palm. Notice the sensation. This tells your nervous system: we\'re here now, not there then.',
    ],
    'P-02': [
      'Needs inventory practice. Right now, what does your body need? Water? Food? Rest? Movement? Write down three needs you\'ve been ignoring. Pick one. Meet it today.',
      'Boundary setting as self-care. Identify one thing you don\'t want to do. Practice saying out loud: "No. This doesn\'t work for me." Feel what happens in your body.',
      'Ask for what you want. Out loud. To someone safe. "I need..." Complete the sentence. Notice what it feels like to voice it.',
      'Permission practice. Give yourself permission to rest without earning it. Say it: "I have permission to rest." Notice what resists.',
      'Energy audit. On a scale of 0-10, where\'s your energy right now? What would raise it by one point? That\'s your next move.',
    ],
    'P-03': [
      'Shake out the stuck energy. Stand up. Shake your whole body for two full minutes. Like a dog shaking off water. Let everything move. This is trauma leaving your body.',
      'Dance to one full song. No judgment. No audience. Just you and music and movement. Let your body lead. Your mind can rest.',
      'Somatic release. Tense every muscle in your body. Hold for 10 seconds. Release everything at once. Feel the difference. Repeat three times.',
      'Walk with presence. Go outside. Feel your feet touch the ground. One step. Then another. Notice the rhythm. This is meditation in motion.',
      'Stretch what\'s tight. Where is tension living in your body? Neck? Shoulders? Hips? Stretch that place gently. Breathe into it. Thank it for holding what you couldn\'t process.',
    ],
    'P-04': [
      'Share one vulnerable truth with someone safe. Not the whole story. Just one true sentence. Notice what happens when you\'re seen.',
      'Active listening practice. Ask someone: "How are you, really?" Then listen without fixing, advising, or interrupting. Just witness them.',
      'Reach out to someone you\'ve been thinking about. Text them. Call them. Let them know they crossed your mind. Connection starts with reaching.',
      'Hug for 20 seconds. This is how long it takes for oxytocin to release. Let yourself be held. Let yourself hold someone.',
      'Tell someone specifically why they matter to you. Not "you\'re great." But "you matter to me because..." and complete it with specificity.',
    ],
    'P-05': [
      'Truth practice. Stand in front of a mirror. Say out loud: "The truth is..." and complete the sentence with what you\'re not allowed to say.',
      'Share something imperfect. Publicly. Online or in person. Something unfiltered, unedited. Let yourself be seen in process, not just polished.',
      'Say no when you want to say no. Practice the words: "No. This doesn\'t work for me." Feel what happens.',
      'Show your unfiltered face. No makeup. No filter. Let someone see you exactly as you are. Notice what comes up.',
      'Voice your real opinion. Even if it\'s unpopular. Say what you actually think. Start with "I actually think..." and let it out.',
    ],
    'P-06': [
      'Values clarification. List your top 5 values. Then look at your calendar. Are you living them? Where\'s the gap?',
      'Write your epitaph. What do you want said about you when you\'re gone? Now work backward: what needs to change today?',
      'Future self letter. Write to yourself 10 years from now. What do you hope you\'ve done? Who do you hope you\'ve become?',
      'Deathbed regrets reversal. What would you regret NOT doing? Write it down. Now do one small thing toward it today.',
      'Purpose statement. Complete this sentence: "I exist to..." Write it. Refine it. Let it guide you.',
    ],
  };

  for (let i = start; i <= end; i++) {
    const schema = schemas[(i - start) % schemas.length];
    const pillar = pillars[(i - start) % 6];
    const pillarData = PILLARS[pillar];
    const pillarPractices = practicesByPillar[pillar] || [];
    const practice = pillarPractices[(i - start) % pillarPractices.length] || `Practice: Notice your ${schema} pattern arise. Name it. Choose differently. This is your power.`;
    
    practices.push({
      id: `nc.${String(i).padStart(3, '0')}`,
      name: `Practice ${i}`,
      family: 'practice',
      modality: i % 3 === 0 ? 'audio' : i % 3 === 1 ? 'interactive' : 'text',
      response_type: i % 6 === 0 ? 'breath' : i % 6 === 1 ? 'voice' : i % 6 === 2 ? 'tap' : i % 6 === 3 ? 'sort' : i % 6 === 4 ? 'mirror' : 'body_map',
      text_line: practice,
      pillar_id: pillar,
      pillar_name: pillarData.name,
      pillar_color: pillarData.color,
      schema: schema,
      schema_name: schema.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      core_belief: CORE_BELIEFS[schema] || '',
      kbe_target: 'embodying',
      track: 'clinical',
      difficulty_level: 3 + ((i - start) % 5),
      duration_minutes: 3 + ((i - start) % 4),
      tags: ['practice', schema, pillar],
    });
  }
  
  return practices;
}

// ============================================================================
// STATS & EXPORT
// ============================================================================

export function getNaviCue1000Stats() {
  const stats = {
    total: NAVICUE_1000_TRANSFORMED.length,
    byFamily: {} as Record<string, number>,
    byPillar: {} as Record<string, number>,
    bySchema: {} as Record<string, number>,
    byModality: {} as Record<string, number>,
    byResponseType: {} as Record<string, number>,
    byTrack: {} as Record<string, number>,
    byKBE: {} as Record<string, number>,
  };

  NAVICUE_1000_TRANSFORMED.forEach(nc => {
    stats.byFamily[nc.family] = (stats.byFamily[nc.family] || 0) + 1;
    stats.byPillar[nc.pillar_id] = (stats.byPillar[nc.pillar_id] || 0) + 1;
    stats.bySchema[nc.schema || 'none'] = (stats.bySchema[nc.schema || 'none'] || 0) + 1;
    stats.byModality[nc.modality] = (stats.byModality[nc.modality] || 0) + 1;
    stats.byResponseType[nc.response_type] = (stats.byResponseType[nc.response_type] || 0) + 1;
    stats.byTrack[nc.track] = (stats.byTrack[nc.track] || 0) + 1;
    stats.byKBE[nc.kbe_target] = (stats.byKBE[nc.kbe_target] || 0) + 1;
  });

  return stats;
}

console.log('✅ NAVICUE 1000 TRANSFORMED');
console.log('🧠 Neuroscience + Spirit + Poetry');
console.log(`📊 Total: ${NAVICUE_1000_TRANSFORMED.length} transformed experiences`);
console.log('🎯 Ready to change lives');

export default NAVICUE_1000_TRANSFORMED;
