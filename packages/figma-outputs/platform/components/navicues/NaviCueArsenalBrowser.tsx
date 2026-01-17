/**
 * NAVICUE ARSENAL BROWSER
 * 
 * Visual interface for exploring all 74+ NaviCues across 4 tracks
 * - Browse by track (Clinical, Guru, Infinite)
 * - Filter by pillar, guru, or theme
 * - Live preview of each NaviCue
 * - Quick stats and completion tracking
 */

import React, { useState } from 'react';
import {
  ALL_CLINICAL,
  ALL_GURU,
  ALL_INFINITE,
  EXTENDED_NAVICUE_CATALOG,
  getCompletionPercentage,
} from './index';

type Track = 'clinical' | 'guru' | 'infinite' | 'all';
type NaviCueComponent = React.FC;

interface NaviCueEntry {
  id: string;
  name: string;
  track: Track;
  category: string;
  component: NaviCueComponent;
  description: string;
  philosophy?: string;
}

export const NaviCueArsenalBrowser: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewNaviCue, setPreviewNaviCue] = useState<NaviCueEntry | null>(null);

  // ============================================================================
  // BUILD NAVICUE REGISTRY
  // ============================================================================

  const naviCueRegistry: NaviCueEntry[] = [
    // CLINICAL - ER
    ...(ALL_CLINICAL?.ER ? [
      { id: 'clinical-er-vagal', name: 'Vagal Tone Baseline', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.VagalToneBaseline, description: 'Count breaths for 60s to establish baseline vagal tone' },
      { id: 'clinical-er-window', name: 'Window of Tolerance', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.WindowOfToleranceMap, description: 'Map your position in arousal zones (hyper/optimal/hypo)' },
      { id: 'clinical-er-delta', name: 'State Delta Capture', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.StateDeltaCapture, description: 'Measure before/after state change from intervention' },
      { id: 'clinical-er-grounding', name: 'Grounding Anchor', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.GroundingAnchor, description: '5-4-3-2-1 sensory anchoring technique' },
      { id: 'clinical-er-breath', name: 'Breath Rhythm Matcher', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.BreathRhythmMatcher, description: '4-2-6-2 breathing pacer with visual cues' },
      { id: 'clinical-er-goldilocks', name: 'Arousal Goldilocks', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.ArousalGoldilocks, description: 'Too high/too low/just right arousal detector' },
      { id: 'clinical-er-emotion', name: 'Emotion Namer', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.EmotionNamer, description: 'Non-cliché emotion texture words (tight, hollow, electric)' },
      { id: 'clinical-er-coreg', name: 'Co-Regulation Detector', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.CoRegulationDetector, description: 'Who calms or activates your nervous system?' },
      { id: 'clinical-er-recovery', name: 'Recovery Half-Life', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.RecoveryHalfLife, description: 'How fast do you return to baseline after activation?' },
      { id: 'clinical-er-polyvagal', name: 'Polyvagal State Indicator', track: 'clinical' as Track, category: 'ER', component: ALL_CLINICAL.ER.PolyvagalStateIndicator, description: 'Ventral/Sympathetic/Dorsal vagal state recognition' },
    ] : []),

    // GURU - RAM DASS
    ...(ALL_GURU?.RamDass ? [
      { id: 'guru-rd-witness', name: 'Witness Toggle', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.WitnessToggle, description: 'Rapid shift between experience and observer perspective', philosophy: 'Present moment witness cultivation' },
      { id: 'guru-rd-now', name: 'Now Duration Test', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.NowDurationTest, description: 'How long can you stay in "now" before thoughts pull you?', philosophy: 'Be Here Now practice' },
      { id: 'guru-rd-soul', name: 'Soul vs Ego Identifier', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.SoulVsEgoIdentifier, description: 'Which voice is speaking right now?', philosophy: 'Distinguish ego from soul' },
      { id: 'guru-rd-awareness', name: 'Awareness of Awareness', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.AwarenessOfAwareness, description: 'Meta-meditation: watch yourself watching', philosophy: 'Layers of consciousness' },
      { id: 'guru-rd-loving', name: 'Loving Witness', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.LovingWitnessPractice, description: 'Observe internal experience with compassion', philosophy: 'Unconditional loving presence' },
      { id: 'guru-rd-space', name: 'Spaciousness Meter', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.SpaciousnessMeter, description: 'How much space between you and your experience?', philosophy: 'Awareness creates space' },
      { id: 'guru-rd-anchor', name: 'Here Now Anchor', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.HereNowAnchor, description: 'Tap to return to present moment', philosophy: 'Always available now' },
      { id: 'guru-rd-roles', name: 'Role Recognition', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.RoleRecognition, description: 'Which characters/roles are on stage?', philosophy: 'Witness the roles you play' },
      { id: 'guru-rd-distance', name: 'Thought Distance Slider', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.ThoughtDistanceSlider, description: 'Visual representation of proximity to thoughts', philosophy: 'Distance creates freedom' },
      { id: 'guru-rd-being', name: 'Being Beneath Doing', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.BeingBeneathDoing, description: 'Strip away identities to find awareness', philosophy: 'You are not your roles' },
      { id: 'guru-rd-window', name: 'Present Moment Window', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.PresentMomentWindow, description: 'Open/close window to now', philosophy: 'Portal to presence' },
      { id: 'guru-rd-suffering', name: 'Suffering Formula', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.SufferingFormula, description: 'Pain × Resistance = Suffering calculator', philosophy: 'Pain inevitable, suffering optional' },
      { id: 'guru-rd-fierce', name: 'Fierce Grace Toggle', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.FierceGraceToggle, description: 'Both sword and embrace needed', philosophy: 'Paradox of transformation' },
      { id: 'guru-rd-compassion', name: 'Compassion Circle', track: 'guru' as Track, category: 'Ram Dass', component: ALL_GURU.RamDass.CompassionCircle, description: 'Expand from self to all beings', philosophy: 'Universal compassion' },
    ] : []),

    // GURU - ALAN WATTS
    ...(ALL_GURU?.AlanWatts ? [
      { id: 'guru-aw-backwards', name: 'Backwards Law', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.BackwardsLawSimulator, description: 'The more you try, the worse it gets', philosophy: 'Effortless action' },
      { id: 'guru-aw-ego', name: 'Ego as Fiction', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.EgoAsSocialFiction, description: 'Your "self" is a story others told you', philosophy: 'Social construction of identity' },
      { id: 'guru-aw-improv', name: 'Life as Improvisation', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.LifeAsImprovisation, description: 'There is no script. There never was.', philosophy: 'Jazz philosophy' },
      { id: 'guru-aw-bind', name: 'Double Bind Recognizer', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.DoubleBindRecognizer, description: 'Commands that defeat themselves', philosophy: 'Paradox awareness' },
      { id: 'guru-aw-control', name: 'Control Illusion', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.ControlIllusionSlider, description: 'Perceived vs actual control (5%)', philosophy: 'Accepting the flow' },
      { id: 'guru-aw-now', name: 'Now Is All There Is', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.NowIsAllThereIs, description: 'Past/future as mental constructs in present', philosophy: 'Eternal present' },
      { id: 'guru-aw-void', name: 'Void Is Not Empty', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.VoidIsNotEmpty, description: 'Emptiness as potential, not lack', philosophy: 'Pregnant void' },
      { id: 'guru-aw-thinking', name: 'Thinking Trap', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.ThinkingAboutThinkingTrap, description: 'Recursive thought loop detector', philosophy: 'Stop the loop' },
      { id: 'guru-aw-resistance', name: 'Resistance Multiplier', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.ResistanceMultiplier, description: 'What you resist persists and grows', philosophy: 'Acceptance dissolves' },
      { id: 'guru-aw-duality', name: 'Black and White Game', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.GameOfBlackAndWhite, description: 'Dualities are invented, not discovered', philosophy: 'Beyond opposites' },
      { id: 'guru-aw-eternal', name: 'Eternal Now Button', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.TheEternalNowButton, description: 'Every tap is the first tap', philosophy: 'Always new' },
      { id: 'guru-aw-watcher', name: 'Watcher Paradox', track: 'guru' as Track, category: 'Alan Watts', component: ALL_GURU.AlanWatts.TheWatcherParadox, description: 'Who watches the watcher?', philosophy: 'Infinite regress' },
    ] : []),

    // INFINITE - QUANTUM
    ...(ALL_INFINITE?.Quantum ? [
      { id: 'infinite-q-superposition', name: 'Superposition State', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.SuperpositionStateHolder, description: 'All emotional states exist until observed', philosophy: 'Quantum psychology' },
      { id: 'infinite-q-uncertainty', name: 'Uncertainty Principle', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.UncertaintyPrincipleSlider, description: 'Position vs momentum trade-off', philosophy: 'Heisenberg applied to life' },
      { id: 'infinite-q-entangle', name: 'Quantum Entanglement', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.QuantumEntanglementDetector, description: 'Correlated distant emotional states', philosophy: 'Connection without contact' },
      { id: 'infinite-q-wave', name: 'Wave-Particle Duality', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.WaveParticleDualityToggle, description: 'You are both solid and fluid', philosophy: 'Both/and identity' },
      { id: 'infinite-q-tunnel', name: 'Quantum Tunneling', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.QuantumTunnelingSimulator, description: 'Pass through impossible barriers', philosophy: 'Breakthrough possible' },
      { id: 'infinite-q-schrodinger', name: "Schrödinger's State", track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.SchrodingersEmotionalState, description: 'Fine AND not-fine until measured', philosophy: 'Superposition collapse' },
      { id: 'infinite-q-probability', name: 'Probability Cloud', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.ProbabilityCloudVisualizer, description: 'Distribution not single answer', philosophy: 'Probabilistic self' },
      { id: 'infinite-q-coherence', name: 'Quantum Coherence', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.QuantumCoherence, description: 'Flow state vs decoherence', philosophy: 'Unity vs fragmentation' },
      { id: 'infinite-q-measurement', name: 'Measurement Problem', track: 'infinite' as Track, category: 'Quantum', component: ALL_INFINITE.Quantum.QuantumMeasurementProblem, description: 'Observation changes reality', philosophy: 'Observer effect' },
    ] : []),

    // INFINITE - MUSIC
    ...(ALL_INFINITE?.Music ? [
      { id: 'infinite-m-key', name: 'Emotional Key Detector', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.EmotionalKeyDetector, description: 'C Major (innocent) to F# Minor (dark)', philosophy: 'Tonality as mood' },
      { id: 'infinite-m-dissonance', name: 'Dissonance Resolver', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.DissonanceResolver, description: 'Tension → Resolution mechanic', philosophy: 'Musical catharsis' },
      { id: 'infinite-m-tempo', name: 'Tempo Adjuster', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.TempoAdjuster, description: 'Internal BPM (Largo to Presto)', philosophy: 'Speed of life' },
      { id: 'infinite-m-dynamics', name: 'Dynamics Controller', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.DynamicsController, description: 'Emotional volume (ppp to fff)', philosophy: 'Intensity modulation' },
      { id: 'infinite-m-rest', name: 'Rest Marker', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.RestMarker, description: 'Silence as music (rests)', philosophy: 'Space as sound' },
      { id: 'infinite-m-harmony', name: 'Harmony Builder', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.HarmonyBuilder, description: 'Multiple emotions as chord', philosophy: 'Complexity as beauty' },
      { id: 'infinite-m-rhythm', name: 'Rhythm Pattern', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.RhythmPatternRecognizer, description: 'Tap your internal pulse', philosophy: 'Pattern recognition' },
      { id: 'infinite-m-contour', name: 'Melodic Contour', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.MelodicContour, description: 'Shape of your day/week', philosophy: 'Narrative arc' },
      { id: 'infinite-m-articulation', name: 'Staccato/Legato', track: 'infinite' as Track, category: 'Music', component: ALL_INFINITE.Music.StaccatoLegatoToggle, description: 'Choppy vs smooth time', philosophy: 'Continuity vs separation' },
    ] : []),
  ];

  // ============================================================================
  // FILTER LOGIC
  // ============================================================================

  const filteredNaviCues = naviCueRegistry.filter(nc => {
    if (selectedTrack !== 'all' && nc.track !== selectedTrack) return false;
    if (selectedCategory && nc.category !== selectedCategory) return false;
    return true;
  });

  const categories = [...new Set(naviCueRegistry.map(nc => nc.category))];
  const trackCategories = selectedTrack === 'all' 
    ? categories 
    : categories.filter(cat => naviCueRegistry.some(nc => nc.track === selectedTrack && nc.category === cat));

  // ============================================================================
  // RENDER
  // ============================================================================

  // Show loading state if no NaviCues loaded
  if (naviCueRegistry.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl">Loading NaviCue Arsenal...</p>
          <p className="text-sm opacity-60">Initializing components</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl mb-2">NaviCue Arsenal</h1>
          <p className="text-lg opacity-60">
            {EXTENDED_NAVICUE_CATALOG.totalComplete} NaviCues across 4 tracks
          </p>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-white/5">
              <p className="text-sm opacity-40">Clinical</p>
              <p className="text-3xl">{EXTENDED_NAVICUE_CATALOG.clinicalER}</p>
            </div>
            <div className="p-4 bg-white/5">
              <p className="text-sm opacity-40">Guru</p>
              <p className="text-3xl">{EXTENDED_NAVICUE_CATALOG.guruRamDass + EXTENDED_NAVICUE_CATALOG.guruAlanWatts}</p>
            </div>
            <div className="p-4 bg-white/5">
              <p className="text-sm opacity-40">Infinite</p>
              <p className="text-3xl">{EXTENDED_NAVICUE_CATALOG.infiniteQuantum + EXTENDED_NAVICUE_CATALOG.infiniteMusic}</p>
            </div>
            <div className="p-4 bg-white/5">
              <p className="text-sm opacity-40">Complete</p>
              <p className="text-3xl">{getCompletionPercentage()}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* Track Filter */}
            <div>
              <p className="text-sm opacity-40 mb-2">TRACK</p>
              <div className="space-y-1">
                {(['all', 'clinical', 'guru', 'infinite'] as Track[]).map(track => (
                  <button
                    key={track}
                    onClick={() => {
                      setSelectedTrack(track);
                      setSelectedCategory(null);
                    }}
                    className={`w-full text-left px-3 py-2 ${
                      selectedTrack === track ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {track.charAt(0).toUpperCase() + track.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-sm opacity-40 mb-2">CATEGORY</p>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 text-sm ${
                    !selectedCategory ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  All
                </button>
                {trackCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-sm ${
                      selectedCategory === cat ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {!previewNaviCue ? (
              <>
                <div className="mb-6">
                  <p className="text-2xl">
                    {filteredNaviCues.length} NaviCues
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                </div>

                {/* Grid of NaviCues */}
                <div className="grid grid-cols-2 gap-4">
                  {filteredNaviCues.map(nc => (
                    <button
                      key={nc.id}
                      onClick={() => setPreviewNaviCue(nc)}
                      className="text-left p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-lg">{nc.name}</p>
                        <span className={`text-xs px-2 py-1 ${
                          nc.track === 'clinical' ? 'bg-green-500/20 text-green-400' :
                          nc.track === 'guru' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {nc.track}
                        </span>
                      </div>
                      <p className="text-sm opacity-60 mb-2">{nc.description}</p>
                      {nc.philosophy && (
                        <p className="text-xs opacity-40 italic">"{nc.philosophy}"</p>
                      )}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Preview Mode */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-3xl mb-1">{previewNaviCue.name}</p>
                    <p className="text-sm opacity-60">{previewNaviCue.description}</p>
                    {previewNaviCue.philosophy && (
                      <p className="text-xs opacity-40 italic mt-2">"{previewNaviCue.philosophy}"</p>
                    )}
                  </div>
                  <button
                    onClick={() => setPreviewNaviCue(null)}
                    className="px-6 py-3 bg-white text-black"
                  >
                    ← Back to Grid
                  </button>
                </div>

                {/* Live Preview */}
                <div className="border border-white/20 bg-black">
                  <previewNaviCue.component />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaviCueArsenalBrowser;