/**
 * NAVICUE ARSENAL - Complete Collection
 * 
 * EXPANDED: Now includes three production tracks:
 * 
 * TRACK 1: CORE ARSENAL (Original 20 types)
 * - KNOWING: Implicit model capture (8 types)
 * - BELIEVING: Prediction error generation (6 types)
 * - EMBODYING: Automaticity + identity (6 types)
 * 
 * TRACK 2: CLINICAL BATCHES (Pillar-based)
 * - ER, SR, SC, CR, II, DM pillars
 * - Mechanism-focused (RT-P through RT-X)
 * 
 * TRACK 3: GURU BATCHES (Wisdom as Design)
 * - Ram Dass, Alan Watts, Pema Chödrön, etc.
 * - Architecture gurus as UX designers
 * 
 * TRACK 4: INFINITE BATCHES (Pure Creative Freedom)
 * - Quantum Therapy, Music Theory, Gaming, etc.
 * - Cross-domain metaphors as interventions
 * 
 * Total: 74+ NaviCue types and growing
 */

// ============================================================================
// TRACK 1: CORE ARSENAL (KNOWING → BELIEVING → EMBODYING)
// ============================================================================

// KNOWING LAYER - Implicit Model Capture
export { BeliefProbe } from './BeliefProbe';
export { ReactionTimer } from './ReactionTimer';
export { PredictionCapture } from './PredictionCapture';
export { PatternRecognition } from './PatternRecognition';
export { DecisionLog } from './DecisionLog';
export { ImplicitAssociation } from './ImplicitAssociation';
export { MicroMomentSnapshot } from './MicroMomentSnapshot';
export { AttentionTracker } from './AttentionTracker';

// BELIEVING LAYER - Prediction Error Generation
export { PredictionLab } from './PredictionLab';
export { EvidenceVault } from './EvidenceVault';
export { MicroExperiment } from './MicroExperiment';
export { HypothesisBuilder } from './HypothesisBuilder';
export { PatternInterrupt } from './PatternInterrupt';

// EMBODYING LAYER - Automaticity + Identity
export { AutomaticityTracker } from './AutomaticityTracker';
export { IdentityReceipt } from './IdentityReceipt';
export { TransferTrainer } from './TransferTrainer';
export { IntegrationRitual } from './IntegrationRitual';
export { EmbodimentPractice } from './EmbodimentPractice';
export { FutureSelfSimulator } from './FutureSelfSimulator';

// ============================================================================
// TRACK 2: CLINICAL BATCHES (Pillar-based, Mechanism-focused)
// ============================================================================

// Import all clinical batch components
import ClinicalER from './clinical-batch-01-ER';

// Re-export ER (Emotional Regulation) batch
export const ClinicalBatch_ER = {
  VagalToneBaseline: ClinicalER.VagalToneBaseline,
  WindowOfToleranceMap: ClinicalER.WindowOfToleranceMap,
  StateDeltaCapture: ClinicalER.StateDeltaCapture,
  GroundingAnchor: ClinicalER.GroundingAnchor,
  BreathRhythmMatcher: ClinicalER.BreathRhythmMatcher,
  ArousalGoldilocks: ClinicalER.ArousalGoldilocks,
  EmotionNamer: ClinicalER.EmotionNamer,
  CoRegulationDetector: ClinicalER.CoRegulationDetector,
  RecoveryHalfLife: ClinicalER.RecoveryHalfLife,
  PolyvagalStateIndicator: ClinicalER.PolyvagalStateIndicator,
};

// ============================================================================
// TRACK 3: GURU BATCHES (Wisdom as Design)
// ============================================================================

// Import all guru batch components
import GuruRamDass from '../batches-guru/guru-batch-01-ram-dass';
import GuruAlanWatts from '../batches-guru/guru-batch-02-alan-watts';

// Re-export Ram Dass batch
export const GuruBatch_RamDass = {
  WitnessToggle: GuruRamDass.WitnessToggle,
  NowDurationTest: GuruRamDass.NowDurationTest,
  SoulVsEgoIdentifier: GuruRamDass.SoulVsEgoIdentifier,
  AwarenessOfAwareness: GuruRamDass.AwarenessOfAwareness,
  LovingWitnessPractice: GuruRamDass.LovingWitnessPractice,
  SpaciousnessMeter: GuruRamDass.SpaciousnessMeter,
  HereNowAnchor: GuruRamDass.HereNowAnchor,
  RoleRecognition: GuruRamDass.RoleRecognition,
  ThoughtDistanceSlider: GuruRamDass.ThoughtDistanceSlider,
  BeingBeneathDoing: GuruRamDass.BeingBeneathDoing,
  PresentMomentWindow: GuruRamDass.PresentMomentWindow,
  SufferingFormula: GuruRamDass.SufferingFormula,
  FierceGraceToggle: GuruRamDass.FierceGraceToggle,
  CompassionCircle: GuruRamDass.CompassionCircle,
};

// Re-export Alan Watts batch
export const GuruBatch_AlanWatts = {
  BackwardsLawSimulator: GuruAlanWatts.BackwardsLawSimulator,
  EgoAsSocialFiction: GuruAlanWatts.EgoAsSocialFiction,
  LifeAsImprovisation: GuruAlanWatts.LifeAsImprovisation,
  DoubleBindRecognizer: GuruAlanWatts.DoubleBindRecognizer,
  ControlIllusionSlider: GuruAlanWatts.ControlIllusionSlider,
  NowIsAllThereIs: GuruAlanWatts.NowIsAllThereIs,
  VoidIsNotEmpty: GuruAlanWatts.VoidIsNotEmpty,
  ThinkingAboutThinkingTrap: GuruAlanWatts.ThinkingAboutThinkingTrap,
  ResistanceMultiplier: GuruAlanWatts.ResistanceMultiplier,
  GameOfBlackAndWhite: GuruAlanWatts.GameOfBlackAndWhite,
  TheEternalNowButton: GuruAlanWatts.TheEternalNowButton,
  TheWatcherParadox: GuruAlanWatts.TheWatcherParadox,
};

// ============================================================================
// TRACK 4: INFINITE BATCHES (Pure Creative Freedom)
// ============================================================================

// Import all infinite batch components
import InfiniteQuantum from '../batches-infinite/infinite-batch-01-quantum';
import InfiniteMusic from '../batches-infinite/infinite-batch-02-music';

// Re-export Quantum Therapy batch
export const InfiniteBatch_Quantum = {
  SuperpositionStateHolder: InfiniteQuantum.SuperpositionStateHolder,
  UncertaintyPrincipleSlider: InfiniteQuantum.UncertaintyPrincipleSlider,
  QuantumEntanglementDetector: InfiniteQuantum.QuantumEntanglementDetector,
  WaveParticleDualityToggle: InfiniteQuantum.WaveParticleDualityToggle,
  QuantumTunnelingSimulator: InfiniteQuantum.QuantumTunnelingSimulator,
  SchrodingersEmotionalState: InfiniteQuantum.SchrodingersEmotionalState,
  ProbabilityCloudVisualizer: InfiniteQuantum.ProbabilityCloudVisualizer,
  QuantumCoherence: InfiniteQuantum.QuantumCoherence,
  QuantumMeasurementProblem: InfiniteQuantum.QuantumMeasurementProblem,
};

// Re-export Music Theory batch
export const InfiniteBatch_Music = {
  EmotionalKeyDetector: InfiniteMusic.EmotionalKeyDetector,
  DissonanceResolver: InfiniteMusic.DissonanceResolver,
  TempoAdjuster: InfiniteMusic.TempoAdjuster,
  DynamicsController: InfiniteMusic.DynamicsController,
  RestMarker: InfiniteMusic.RestMarker,
  HarmonyBuilder: InfiniteMusic.HarmonyBuilder,
  RhythmPatternRecognizer: InfiniteMusic.RhythmPatternRecognizer,
  MelodicContour: InfiniteMusic.MelodicContour,
  StaccatoLegatoToggle: InfiniteMusic.StaccatoLegatoToggle,
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface NaviCueType {
  id: string;
  name: string;
  layer: 'KNOWING' | 'BELIEVING' | 'EMBODYING' | 'CLINICAL' | 'GURU' | 'INFINITE';
  purpose: string;
  mechanism: string;
  psychologyPrinciple: string;
  dataSchema: Record<string, any>;
}

// ============================================================================
// FULL CATALOG (Original 20 core types)
// ============================================================================

export const NAVICUE_TYPE_CATALOG: NaviCueType[] = [
  // KNOWING
  {
    id: 'belief_probe',
    name: 'Belief Probe',
    layer: 'KNOWING',
    purpose: 'Reveals implicit beliefs through behavioral choices',
    mechanism: 'Scenario + multiple choice reveals framework',
    psychologyPrinciple: 'Response pattern reveals underlying beliefs',
    dataSchema: {
      scenario: 'string',
      options: 'array<{text: string, reveals: string}>',
      response: 'string',
      revealed_belief: 'string',
    },
  },
  {
    id: 'reaction_timer',
    name: 'Reaction Timer',
    layer: 'KNOWING',
    purpose: 'Speed of response reveals automatic associations',
    mechanism: 'Measure time to classify statement as true/false',
    psychologyPrinciple: 'Faster response = more automatic belief',
    dataSchema: {
      statement: 'string',
      answer: 'boolean',
      reaction_time_ms: 'number',
    },
  },
  {
    id: 'prediction_capture',
    name: 'Prediction Capture',
    layer: 'KNOWING',
    purpose: 'Captures mental model through prediction',
    mechanism: 'Ask "What will happen?" before outcome',
    psychologyPrinciple: 'Predictions reveal expectations and beliefs',
    dataSchema: {
      situation: 'string',
      predicted_outcome: 'string',
    },
  },
  {
    id: 'pattern_recognition',
    name: 'Pattern Recognition',
    layer: 'KNOWING',
    purpose: 'Shows unconscious patterns through data',
    mechanism: 'Visualize response patterns over time',
    psychologyPrinciple: 'Seeing pattern creates awareness',
    dataSchema: {
      pattern_name: 'string',
      frequency: 'number',
      timeframe: 'string',
      examples: 'array<string>',
      acknowledged: 'boolean',
    },
  },
  {
    id: 'decision_log',
    name: 'Decision Log',
    layer: 'KNOWING',
    purpose: 'Tracks micro-choices to reveal patterns',
    mechanism: 'Log binary decisions throughout day',
    psychologyPrinciple: 'Accumulated choices reveal true priorities',
    dataSchema: {
      question: 'string',
      options: '[optionA: string, optionB: string]',
      choice: 'A | B',
      timestamp: 'datetime',
    },
  },
  {
    id: 'implicit_association',
    name: 'Implicit Association',
    layer: 'KNOWING',
    purpose: 'Pairs concepts to reveal hidden beliefs',
    mechanism: 'Speed of association reveals automatic connections',
    psychologyPrinciple: 'Based on Implicit Association Test',
    dataSchema: {
      concept1: 'string',
      concept2: 'string',
      associated: 'boolean',
      reaction_time_ms: 'number',
    },
  },
  {
    id: 'micro_moment_snapshot',
    name: 'Micro-Moment Snapshot',
    layer: 'KNOWING',
    purpose: 'Captures what user notices in present',
    mechanism: 'Random prompts: "What did you just notice?"',
    psychologyPrinciple: 'Attention reveals values and concerns',
    dataSchema: {
      category: 'body | thought | emotion | urge',
      note: 'string',
      timestamp: 'datetime',
    },
  },
  {
    id: 'attention_tracker',
    name: 'Attention Tracker',
    layer: 'KNOWING',
    purpose: 'What they focus on reveals priorities',
    mechanism: 'Track selection order and speed',
    psychologyPrinciple: 'Attention is choice that reveals values',
    dataSchema: {
      elements: 'array<{id: string, label: string}>',
      selection_order: 'array<string>',
      time_to_select: 'array<number>',
    },
  },
  
  // BELIEVING
  {
    id: 'prediction_lab',
    name: 'Prediction Lab',
    layer: 'BELIEVING',
    purpose: 'Generate prediction errors that update beliefs',
    mechanism: 'Predict outcome → Log reality → Compare',
    psychologyPrinciple: 'Violated expectations = learning',
    dataSchema: {
      experiment: 'string',
      prediction: 'string',
      actual_outcome: 'string',
      matched: 'boolean',
    },
  },
  {
    id: 'evidence_vault',
    name: 'Evidence Vault',
    layer: 'BELIEVING',
    purpose: 'Collect counter-evidence to limiting beliefs',
    mechanism: 'Log instances that contradict old belief',
    psychologyPrinciple: 'Evidence accumulation forces revision',
    dataSchema: {
      limiting_belief: 'string',
      counter_evidence: 'array<string>',
      count: 'number',
    },
  },
  {
    id: 'micro_experiment',
    name: 'Micro-Experiment Designer',
    layer: 'BELIEVING',
    purpose: 'Design safe real-world tests',
    mechanism: 'Choose experiment + state hypothesis',
    psychologyPrinciple: 'Experiential learning > intellectual',
    dataSchema: {
      new_belief: 'string',
      experiment_id: 'string',
      hypothesis: 'string',
      stakes: 'low | medium | high',
    },
  },
  {
    id: 'hypothesis_builder',
    name: 'Hypothesis Builder',
    layer: 'BELIEVING',
    purpose: 'Build testable If/Then statements',
    mechanism: 'Structure predictions in falsifiable format',
    psychologyPrinciple: 'Scientific method applied to beliefs',
    dataSchema: {
      belief: 'string',
      condition: 'string',
      prediction: 'string',
    },
  },
  {
    id: 'pattern_interrupt',
    name: 'Pattern Interrupt',
    layer: 'BELIEVING',
    purpose: 'Catch automatic thought, insert alternative',
    mechanism: 'Recognize old → Choose new response',
    psychologyPrinciple: 'Interrupts habitual neural pathway',
    dataSchema: {
      automatic_thought: 'string',
      alternative_chosen: 'string',
      alternatives: 'array<string>',
    },
  },
  
  // EMBODYING
  {
    id: 'automaticity_tracker',
    name: 'Automaticity Tracker',
    layer: 'EMBODYING',
    purpose: 'Measures how automatic new pattern is',
    mechanism: 'Track reaction time and effort',
    psychologyPrinciple: 'Automaticity = true learning',
    dataSchema: {
      new_pattern: 'string',
      effort_level: '1-5',
      reaction_time_ms: 'number',
    },
  },
  {
    id: 'identity_receipt',
    name: 'Identity Receipt',
    layer: 'EMBODYING',
    purpose: 'Collect evidence of "new you"',
    mechanism: 'Log instances where new identity showed up',
    psychologyPrinciple: 'Identity needs proof, not just intention',
    dataSchema: {
      new_identity: 'string',
      action: 'string',
      timestamp: 'datetime',
      count: 'number',
    },
  },
  {
    id: 'transfer_trainer',
    name: 'Transfer Trainer',
    layer: 'EMBODYING',
    purpose: 'Apply learning to new contexts',
    mechanism: 'Practice skill in different situations',
    psychologyPrinciple: 'Transfer = true mastery',
    dataSchema: {
      skill: 'string',
      original_context: 'string',
      new_context: 'string',
      confidence: '0-10',
    },
  },
  {
    id: 'integration_ritual',
    name: 'Integration Ritual',
    layer: 'EMBODYING',
    purpose: 'Ceremony marking transformation',
    mechanism: 'Acknowledge → Release → Declare',
    psychologyPrinciple: 'Rituals solidify transitions',
    dataSchema: {
      old_belief: 'string',
      new_belief: 'string',
      declaration: 'string',
    },
  },
  {
    id: 'embodiment_practice',
    name: 'Embodiment Practice',
    layer: 'EMBODYING',
    purpose: 'Connect insight to body and sensation',
    mechanism: 'Locate in body + describe sensation',
    psychologyPrinciple: 'Body stores beliefs',
    dataSchema: {
      belief: 'string',
      body_location: 'string',
      sensation: 'string',
    },
  },
  {
    id: 'future_self_simulator',
    name: 'Future Self Simulator',
    layer: 'EMBODYING',
    purpose: 'Visualize identity shift completion',
    mechanism: 'Guided visualization of transformed self',
    psychologyPrinciple: 'Mental rehearsal creates neural pathways',
    dataSchema: {
      new_identity: 'string',
      timeframe: 'string',
      actions: 'string',
      feelings: 'string',
      evidence: 'string',
    },
  },
];

// ============================================================================
// EXTENDED CATALOG (All tracks combined)
// ============================================================================

export const EXTENDED_NAVICUE_CATALOG = {
  // Core Arsenal (20 types)
  coreKnowing: 8,
  coreBelieving: 6,
  coreEmbodying: 6,
  
  // Clinical Batches
  clinicalER: 10,
  clinicalSR: 0, // Planned
  clinicalSC: 0, // Planned
  clinicalCR: 0, // Planned
  clinicalII: 0, // Planned
  clinicalDM: 0, // Planned
  
  // Guru Batches
  guruRamDass: 14,
  guruAlanWatts: 12,
  guruPemachodron: 0, // Planned
  // ... 17 more gurus planned
  
  // Infinite Batches
  infiniteQuantum: 9,
  infiniteMusic: 9,
  infiniteGaming: 0, // Planned
  // ... 7 more themes planned
  
  // Total counts
  totalComplete: 74,
  totalPlanned: 700,
  percentComplete: 10.6,
};

// ============================================================================
// QUICK ACCESS COLLECTIONS
// ============================================================================

// All Clinical NaviCues
export const ALL_CLINICAL = {
  ER: ClinicalBatch_ER,
  // SR, SC, CR, II, DM to be added
};

// All Guru NaviCues
export const ALL_GURU = {
  RamDass: GuruBatch_RamDass,
  AlanWatts: GuruBatch_AlanWatts,
  // More gurus to be added
};

// All Infinite NaviCues
export const ALL_INFINITE = {
  Quantum: InfiniteBatch_Quantum,
  Music: InfiniteBatch_Music,
  // More themes to be added
};

// Everything in one place
export const ALL_NAVICUES = {
  clinical: ALL_CLINICAL,
  guru: ALL_GURU,
  infinite: ALL_INFINITE,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getNaviCuesByTrack(track: 'clinical' | 'guru' | 'infinite') {
  return ALL_NAVICUES[track];
}

export function getNaviCuesByPillar(pillar: 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM') {
  return ALL_CLINICAL[pillar];
}

export function getNaviCuesByGuru(guru: 'RamDass' | 'AlanWatts') {
  return ALL_GURU[guru];
}

export function getNaviCuesByTheme(theme: 'Quantum' | 'Music') {
  return ALL_INFINITE[theme];
}

export function getAllNaviCueCount(): number {
  return EXTENDED_NAVICUE_CATALOG.totalComplete;
}

export function getCompletionPercentage(): number {
  return Math.round((EXTENDED_NAVICUE_CATALOG.totalComplete / EXTENDED_NAVICUE_CATALOG.totalPlanned) * 100);
}
