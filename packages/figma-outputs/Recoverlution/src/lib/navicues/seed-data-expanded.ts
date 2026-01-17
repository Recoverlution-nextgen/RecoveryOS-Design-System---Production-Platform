/**
 * EXPANDED SEED DATA
 * 
 * All 74 NaviCues from the existing component arsenal,
 * transformed into proper NaviCue data objects ready for Universal Player.
 * 
 * Source: NaviCueArsenalBrowser registry
 * Transform: registry-to-navicues transformer
 */

import { transformRegistryToNaviCues } from './transformers/registry-to-navicues';
import { NaviCue } from './types';

// ============================================================================
// REGISTRY DATA (from NaviCueArsenalBrowser)
// ============================================================================

const CLINICAL_ER_REGISTRY = [
  { id: 'clinical-er-vagal', name: 'Vagal Tone Baseline', track: 'clinical' as const, category: 'ER', description: 'Count breaths for 60s to establish baseline vagal tone' },
  { id: 'clinical-er-window', name: 'Window of Tolerance', track: 'clinical' as const, category: 'ER', description: 'Map your position in arousal zones (hyper/optimal/hypo)' },
  { id: 'clinical-er-delta', name: 'State Delta Capture', track: 'clinical' as const, category: 'ER', description: 'Measure before/after state change from intervention' },
  { id: 'clinical-er-grounding', name: 'Grounding Anchor', track: 'clinical' as const, category: 'ER', description: '5-4-3-2-1 sensory anchoring technique' },
  { id: 'clinical-er-breath', name: 'Breath Rhythm Matcher', track: 'clinical' as const, category: 'ER', description: '4-2-6-2 breathing pacer with visual cues' },
  { id: 'clinical-er-goldilocks', name: 'Arousal Goldilocks', track: 'clinical' as const, category: 'ER', description: 'Too high/too low/just right arousal detector' },
  { id: 'clinical-er-emotion', name: 'Emotion Namer', track: 'clinical' as const, category: 'ER', description: 'Non-cliché emotion texture words (tight, hollow, electric)' },
  { id: 'clinical-er-coreg', name: 'Co-Regulation Detector', track: 'clinical' as const, category: 'ER', description: 'Who calms or activates your nervous system?' },
  { id: 'clinical-er-recovery', name: 'Recovery Half-Life', track: 'clinical' as const, category: 'ER', description: 'How fast do you return to baseline after activation?' },
  { id: 'clinical-er-polyvagal', name: 'Polyvagal State Indicator', track: 'clinical' as const, category: 'ER', description: 'Ventral/Sympathetic/Dorsal vagal state recognition' },
];

const GURU_RAMDASS_REGISTRY = [
  { id: 'guru-rd-witness', name: 'Witness Toggle', track: 'guru' as const, category: 'Ram Dass', description: 'Rapid shift between experience and observer perspective', philosophy: 'Present moment witness cultivation' },
  { id: 'guru-rd-now', name: 'Now Duration Test', track: 'guru' as const, category: 'Ram Dass', description: 'How long can you stay in "now" before thoughts pull you?', philosophy: 'Be Here Now practice' },
  { id: 'guru-rd-soul', name: 'Soul vs Ego Identifier', track: 'guru' as const, category: 'Ram Dass', description: 'Which voice is speaking right now?', philosophy: 'Distinguish ego from soul' },
  { id: 'guru-rd-awareness', name: 'Awareness of Awareness', track: 'guru' as const, category: 'Ram Dass', description: 'Meta-meditation: watch yourself watching', philosophy: 'Layers of consciousness' },
  { id: 'guru-rd-loving', name: 'Loving Witness', track: 'guru' as const, category: 'Ram Dass', description: 'Observe internal experience with compassion', philosophy: 'Unconditional loving presence' },
  { id: 'guru-rd-space', name: 'Spaciousness Meter', track: 'guru' as const, category: 'Ram Dass', description: 'How much space between you and your experience?', philosophy: 'Awareness creates space' },
  { id: 'guru-rd-anchor', name: 'Here Now Anchor', track: 'guru' as const, category: 'Ram Dass', description: 'Tap to return to present moment', philosophy: 'Always available now' },
  { id: 'guru-rd-roles', name: 'Role Recognition', track: 'guru' as const, category: 'Ram Dass', description: 'Which characters/roles are on stage?', philosophy: 'Witness the roles you play' },
  { id: 'guru-rd-distance', name: 'Thought Distance Slider', track: 'guru' as const, category: 'Ram Dass', description: 'Visual representation of proximity to thoughts', philosophy: 'Distance creates freedom' },
  { id: 'guru-rd-being', name: 'Being Beneath Doing', track: 'guru' as const, category: 'Ram Dass', description: 'Strip away identities to find awareness', philosophy: 'You are not your roles' },
  { id: 'guru-rd-window', name: 'Present Moment Window', track: 'guru' as const, category: 'Ram Dass', description: 'Open/close window to now', philosophy: 'Portal to presence' },
  { id: 'guru-rd-suffering', name: 'Suffering Formula', track: 'guru' as const, category: 'Ram Dass', description: 'Pain × Resistance = Suffering calculator', philosophy: 'Pain inevitable, suffering optional' },
  { id: 'guru-rd-fierce', name: 'Fierce Grace Toggle', track: 'guru' as const, category: 'Ram Dass', description: 'Both sword and embrace needed', philosophy: 'Paradox of transformation' },
  { id: 'guru-rd-compassion', name: 'Compassion Circle', track: 'guru' as const, category: 'Ram Dass', description: 'Expand from self to all beings', philosophy: 'Universal compassion' },
];

const GURU_WATTS_REGISTRY = [
  { id: 'guru-aw-backwards', name: 'Backwards Law', track: 'guru' as const, category: 'Alan Watts', description: 'The more you try, the worse it gets', philosophy: 'Effortless action' },
  { id: 'guru-aw-ego', name: 'Ego as Fiction', track: 'guru' as const, category: 'Alan Watts', description: 'Your "self" is a story others told you', philosophy: 'Social construction of identity' },
  { id: 'guru-aw-improv', name: 'Life as Improvisation', track: 'guru' as const, category: 'Alan Watts', description: 'There is no script. There never was.', philosophy: 'Jazz philosophy' },
  { id: 'guru-aw-bind', name: 'Double Bind Recognizer', track: 'guru' as const, category: 'Alan Watts', description: 'Commands that defeat themselves', philosophy: 'Paradox awareness' },
  { id: 'guru-aw-control', name: 'Control Illusion', track: 'guru' as const, category: 'Alan Watts', description: 'Perceived vs actual control (5%)', philosophy: 'Accepting the flow' },
  { id: 'guru-aw-now', name: 'Now Is All There Is', track: 'guru' as const, category: 'Alan Watts', description: 'Past/future as mental constructs in present', philosophy: 'Eternal present' },
  { id: 'guru-aw-void', name: 'Void Is Not Empty', track: 'guru' as const, category: 'Alan Watts', description: 'Emptiness as potential, not lack', philosophy: 'Pregnant void' },
  { id: 'guru-aw-thinking', name: 'Thinking Trap', track: 'guru' as const, category: 'Alan Watts', description: 'Recursive thought loop detector', philosophy: 'Stop the loop' },
  { id: 'guru-aw-resistance', name: 'Resistance Multiplier', track: 'guru' as const, category: 'Alan Watts', description: 'What you resist persists and grows', philosophy: 'Acceptance dissolves' },
  { id: 'guru-aw-duality', name: 'Black and White Game', track: 'guru' as const, category: 'Alan Watts', description: 'Dualities are invented, not discovered', philosophy: 'Beyond opposites' },
  { id: 'guru-aw-eternal', name: 'Eternal Now Button', track: 'guru' as const, category: 'Alan Watts', description: 'Every tap is the first tap', philosophy: 'Always new' },
  { id: 'guru-aw-watcher', name: 'Watcher Paradox', track: 'guru' as const, category: 'Alan Watts', description: 'Who watches the watcher?', philosophy: 'Infinite regress' },
];

const INFINITE_QUANTUM_REGISTRY = [
  { id: 'infinite-q-superposition', name: 'Superposition State', track: 'infinite' as const, category: 'Quantum', description: 'All emotional states exist until observed', philosophy: 'Quantum psychology' },
  { id: 'infinite-q-uncertainty', name: 'Uncertainty Principle', track: 'infinite' as const, category: 'Quantum', description: 'Position vs momentum trade-off', philosophy: 'Heisenberg applied to life' },
  { id: 'infinite-q-entangle', name: 'Quantum Entanglement', track: 'infinite' as const, category: 'Quantum', description: 'Correlated distant emotional states', philosophy: 'Connection without contact' },
  { id: 'infinite-q-wave', name: 'Wave-Particle Duality', track: 'infinite' as const, category: 'Quantum', description: 'You are both solid and fluid', philosophy: 'Both/and identity' },
  { id: 'infinite-q-tunnel', name: 'Quantum Tunneling', track: 'infinite' as const, category: 'Quantum', description: 'Pass through impossible barriers', philosophy: 'Breakthrough possible' },
  { id: 'infinite-q-schrodinger', name: "Schrödinger's State", track: 'infinite' as const, category: 'Quantum', description: 'Fine AND not-fine until measured', philosophy: 'Superposition collapse' },
  { id: 'infinite-q-probability', name: 'Probability Cloud', track: 'infinite' as const, category: 'Quantum', description: 'Distribution not single answer', philosophy: 'Probabilistic self' },
  { id: 'infinite-q-coherence', name: 'Quantum Coherence', track: 'infinite' as const, category: 'Quantum', description: 'Flow state vs decoherence', philosophy: 'Unity vs fragmentation' },
  { id: 'infinite-q-measurement', name: 'Measurement Problem', track: 'infinite' as const, category: 'Quantum', description: 'Observation changes reality', philosophy: 'Observer effect' },
];

const INFINITE_MUSIC_REGISTRY = [
  { id: 'infinite-m-key', name: 'Emotional Key Detector', track: 'infinite' as const, category: 'Music', description: 'C Major (innocent) to F# Minor (dark)', philosophy: 'Tonality as mood' },
  { id: 'infinite-m-dissonance', name: 'Dissonance Resolver', track: 'infinite' as const, category: 'Music', description: 'Tension → Resolution mechanic', philosophy: 'Musical catharsis' },
  { id: 'infinite-m-tempo', name: 'Tempo Adjuster', track: 'infinite' as const, category: 'Music', description: 'Internal BPM (Largo to Presto)', philosophy: 'Speed of life' },
  { id: 'infinite-m-dynamics', name: 'Dynamics Controller', track: 'infinite' as const, category: 'Music', description: 'Emotional volume (ppp to fff)', philosophy: 'Intensity modulation' },
  { id: 'infinite-m-rest', name: 'Rest Marker', track: 'infinite' as const, category: 'Music', description: 'Silence as music (rests)', philosophy: 'Space as sound' },
  { id: 'infinite-m-harmony', name: 'Harmony Builder', track: 'infinite' as const, category: 'Music', description: 'Multiple emotions as chord', philosophy: 'Complexity as beauty' },
  { id: 'infinite-m-rhythm', name: 'Rhythm Pattern', track: 'infinite' as const, category: 'Music', description: 'Tap your internal pulse', philosophy: 'Pattern recognition' },
  { id: 'infinite-m-contour', name: 'Melodic Contour', track: 'infinite' as const, category: 'Music', description: 'Shape of your day/week', philosophy: 'Narrative arc' },
  { id: 'infinite-m-articulation', name: 'Staccato/Legato', track: 'infinite' as const, category: 'Music', description: 'Choppy vs smooth time', philosophy: 'Continuity vs separation' },
];

// ============================================================================
// TRANSFORM ALL REGISTRIES
// ============================================================================

export const NAVICUES_CLINICAL_ER_EXPANDED: NaviCue[] = transformRegistryToNaviCues(CLINICAL_ER_REGISTRY);
export const NAVICUES_GURU_RAMDASS_EXPANDED: NaviCue[] = transformRegistryToNaviCues(GURU_RAMDASS_REGISTRY);
export const NAVICUES_GURU_WATTS_EXPANDED: NaviCue[] = transformRegistryToNaviCues(GURU_WATTS_REGISTRY);
export const NAVICUES_INFINITE_QUANTUM_EXPANDED: NaviCue[] = transformRegistryToNaviCues(INFINITE_QUANTUM_REGISTRY);
export const NAVICUES_INFINITE_MUSIC_EXPANDED: NaviCue[] = transformRegistryToNaviCues(INFINITE_MUSIC_REGISTRY);

// ============================================================================
// MASTER COLLECTION
// ============================================================================

export const ALL_SEED_NAVICUES_EXPANDED: NaviCue[] = [
  ...NAVICUES_CLINICAL_ER_EXPANDED,
  ...NAVICUES_GURU_RAMDASS_EXPANDED,
  ...NAVICUES_GURU_WATTS_EXPANDED,
  ...NAVICUES_INFINITE_QUANTUM_EXPANDED,
  ...NAVICUES_INFINITE_MUSIC_EXPANDED,
];

// ============================================================================
// STATS
// ============================================================================

export const EXPANDED_SEED_STATS = {
  total: ALL_SEED_NAVICUES_EXPANDED.length,
  clinical_er: NAVICUES_CLINICAL_ER_EXPANDED.length,
  guru_ramdass: NAVICUES_GURU_RAMDASS_EXPANDED.length,
  guru_watts: NAVICUES_GURU_WATTS_EXPANDED.length,
  infinite_quantum: NAVICUES_INFINITE_QUANTUM_EXPANDED.length,
  infinite_music: NAVICUES_INFINITE_MUSIC_EXPANDED.length,
};

console.log('✅ Expanded seed data loaded:', EXPANDED_SEED_STATS);
