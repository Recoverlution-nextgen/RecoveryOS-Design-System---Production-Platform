/**
 * SCIENCE: PHYSICS
 * 
 * Laws of motion, energy, forces as metaphors for personal transformation
 * Each NaviCue designed for Universal Player with specific response contracts
 */

import { NaviCue } from '../../NaviCueEngine';

// ============================================================================
// INERTIA & MOMENTUM
// ============================================================================

export const NewtonsFirstLaw: NaviCue = {
  id: 'PHYS-001',
  family: 'wisdom',
  modality: 'text',
  text_line: 'A body at rest stays at rest. A body in motion stays in motion. You are already moving. The question is: which direction?',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Inertia & Change',
  response_type: 'slider',
  response_options: {
    slider_label: 'How stuck do you feel right now?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'knowing',
};

export const MomentumOverPower: NaviCue = {
  id: 'PHYS-002',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Force equals mass times acceleration. Small force applied consistently beats massive force applied once. Momentum is the secret.',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Consistency vs Intensity',
  response_type: 'binary',
  response_options: {
    binary_left: 'I go all in',
    binary_right: 'I go steady',
  },
  kbe_target: 'believing',
};

export const FrictionAsResistance: NaviCue = {
  id: 'PHYS-003',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Friction opposes motion. But without friction, you cannot walk. Resistance is not always the enemy.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Useful Resistance',
  response_type: 'tap',
  response_options: {
    tap_options: ['Accept friction', 'Reduce friction', 'Study friction'],
  },
  kbe_target: 'embodying',
};

// ============================================================================
// ENERGY & THERMODYNAMICS
// ============================================================================

export const ConservationOfEnergy: NaviCue = {
  id: 'PHYS-004',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Energy cannot be created or destroyed, only transformed. Your pain does not disappear. It becomes wisdom.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Transformation Not Deletion',
  response_type: 'one_word',
  kbe_target: 'knowing',
};

export const EntropyAndOrder: NaviCue = {
  id: 'PHYS-005',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Entropy always increases. Order requires energy. Your life will not organize itself.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Chaos vs Structure',
  response_type: 'slider',
  response_options: {
    slider_label: 'How much chaos are you tolerating?',
    slider_min: 0,
    slider_max: 100,
  },
  kbe_target: 'believing',
};

export const PotentialToKinetic: NaviCue = {
  id: 'PHYS-006',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Potential energy is stored energy. Kinetic energy is motion. You are full of potential. The question is when you release it.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Waiting vs Acting',
  response_type: 'binary',
  response_options: {
    binary_left: 'Still storing',
    binary_right: 'Ready to release',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// GRAVITY & ATTRACTION
// ============================================================================

export const GravityPullsEverything: NaviCue = {
  id: 'PHYS-007',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Gravity pulls everything toward the center. What is the center of your life pulling you toward?',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Core Values',
  response_type: 'voice10',
  kbe_target: 'knowing',
};

export const OrbitalMechanics: NaviCue = {
  id: 'PHYS-008',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Planets orbit because velocity balances gravity. Too slow, you crash. Too fast, you drift. Balance is orbital.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Balance in Motion',
  response_type: 'spectrum',
  response_options: {
    spectrum_left: 'Crashing',
    spectrum_right: 'Drifting',
  },
  kbe_target: 'believing',
};

export const EscapeVelocity: NaviCue = {
  id: 'PHYS-009',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Escape velocity is the speed needed to break free. Sometimes you need to go faster than feels safe to leave the old orbit.',
  pillar_id: 'DM',
  pillar_name: 'Decisive Momentum',
  pillar_color: '#8B5CF6',
  theme_name: 'Breaking Free',
  response_type: 'binary',
  response_options: {
    binary_left: 'Not ready',
    binary_right: 'Full thrust',
  },
  kbe_target: 'embodying',
};

// ============================================================================
// WAVE MECHANICS
// ============================================================================

export const WaveParticleDuality: NaviCue = {
  id: 'PHYS-010',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Light is both wave and particle. You are both pattern and piece. Both versions are true.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Duality of Self',
  response_type: 'paradox',
  kbe_target: 'knowing',
};

export const ResonanceFrequency: NaviCue = {
  id: 'PHYS-011',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Every object has a natural frequency. When you match it, the object vibrates powerfully. What is your resonant frequency?',
  pillar_id: 'SC',
  pillar_name: 'Self Compassion',
  pillar_color: '#10B981',
  theme_name: 'Natural Rhythm',
  response_type: 'dial',
  kbe_target: 'embodying',
};

export const InterferencePatterns: NaviCue = {
  id: 'PHYS-012',
  family: 'wisdom',
  modality: 'text',
  text_line: 'When waves meet, they create interference patterns. Some parts amplify. Some parts cancel. Your beliefs interfere with each other too.',
  pillar_id: 'CR',
  pillar_name: 'Constructive Responsibility',
  pillar_color: '#F59E0B',
  theme_name: 'Conflicting Patterns',
  response_type: 'constellation',
  kbe_target: 'believing',
};

// ============================================================================
// RELATIVITY
// ============================================================================

export const TimeIsRelative: NaviCue = {
  id: 'PHYS-013',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Time moves slower at high speeds. When you are in flow, time bends. This is physics, not metaphor.',
  pillar_id: 'II',
  pillar_name: 'Integrated Identity',
  pillar_color: '#9333EA',
  theme_name: 'Flow States',
  response_type: 'timeline',
  kbe_target: 'knowing',
};

export const ObserverEffect: NaviCue = {
  id: 'PHYS-014',
  family: 'wisdom',
  modality: 'text',
  text_line: 'The observer changes what is observed. You cannot measure yourself without changing yourself. Awareness is intervention.',
  pillar_id: 'ER',
  pillar_name: 'Emotional Regulation',
  pillar_color: '#EF4444',
  theme_name: 'Self Awareness Loop',
  response_type: 'witness',
  kbe_target: 'embodying',
};

export const MassWarpsSpacetime: NaviCue = {
  id: 'PHYS-015',
  family: 'wisdom',
  modality: 'text',
  text_line: 'Mass warps spacetime. Heavy things bend reality around them. What heavy thing are you carrying that bends everything else?',
  pillar_id: 'SR',
  pillar_name: 'Schema Revision',
  pillar_color: '#3B82F6',
  theme_name: 'Core Schema',
  response_type: 'body_map',
  response_options: {
    body_regions: ['head', 'chest', 'stomach', 'shoulders'],
  },
  kbe_target: 'knowing',
};

// Export all as collection
export const PHYSICS_NAVICUES = [
  NewtonsFirstLaw,
  MomentumOverPower,
  FrictionAsResistance,
  ConservationOfEnergy,
  EntropyAndOrder,
  PotentialToKinetic,
  GravityPullsEverything,
  OrbitalMechanics,
  EscapeVelocity,
  WaveParticleDuality,
  ResonanceFrequency,
  InterferencePatterns,
  TimeIsRelative,
  ObserverEffect,
  MassWarpsSpacetime,
];
