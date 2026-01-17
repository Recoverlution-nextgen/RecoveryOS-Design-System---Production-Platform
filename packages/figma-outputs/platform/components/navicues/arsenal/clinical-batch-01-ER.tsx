/**
 * ARSENAL BATCH 01: EMOTIONAL REGULATION (ER)
 * Clinical NaviCues targeting Pillar ER mechanisms
 * 
 * Focus: Vagal tone, Window of Tolerance, State regulation, Grounding
 * Mechanism: RT-P (Physiology), RT-A (Attention), RT-M (Meaning)
 */

import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// NC-A01: VAGAL TONE BASELINE
// ============================================================================
export const VagalToneBaseline: React.FC = () => {
  const [breathCount, setBreathCount] = useState(0);
  const [inhaling, setInhaling] = useState(true);
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!started ? (
          <>
            <p className="text-lg opacity-60">60 seconds</p>
            <p className="text-2xl">Count your breaths</p>
            <p className="text-sm opacity-40">One inhale + one exhale = one breath</p>
            <button
              onClick={() => setStarted(true)}
              className="mt-8 px-8 py-3 bg-white text-black"
            >
              Begin
            </button>
          </>
        ) : (
          <>
            <div className="text-center space-y-4">
              <div className="text-8xl font-light">{breathCount}</div>
              <p className="text-sm opacity-40">breaths</p>
            </div>
            <div className="space-y-2 mt-12">
              <button
                onClick={() => {
                  setInhaling(true);
                }}
                className={`w-full py-4 ${inhaling ? 'bg-white text-black' : 'bg-white/10'}`}
              >
                IN
              </button>
              <button
                onClick={() => {
                  setInhaling(false);
                  setBreathCount(prev => prev + 1);
                }}
                className={`w-full py-4 ${!inhaling ? 'bg-white text-black' : 'bg-white/10'}`}
              >
                OUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// NC-A02: WINDOW OF TOLERANCE MAP
// ============================================================================
export const WindowOfToleranceMap: React.FC = () => {
  const [position, setPosition] = useState(50);
  const [marked, setMarked] = useState(false);

  const getZone = (val: number) => {
    if (val > 70) return { name: 'Hyperarousal', color: 'bg-red-500' };
    if (val < 30) return { name: 'Hypoarousal', color: 'bg-blue-500' };
    return { name: 'Window of Tolerance', color: 'bg-green-500' };
  };

  const zone = getZone(position);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Where are you right now?</p>
        
        <div className="relative h-96 bg-white/5 flex flex-col">
          {/* Zones */}
          <div className="flex-1 bg-red-500/20 flex items-center justify-center border-b border-white/10">
            <span className="text-sm opacity-40">Too activated</span>
          </div>
          <div className="flex-1 bg-green-500/20 flex items-center justify-center border-b border-white/10">
            <span className="text-sm opacity-40">Optimal</span>
          </div>
          <div className="flex-1 bg-blue-500/20 flex items-center justify-center">
            <span className="text-sm opacity-40">Shutdown</span>
          </div>

          {/* Slider */}
          <div
            className="absolute w-full h-1 bg-white"
            style={{ top: `${100 - position}%`, transform: 'translateY(-50%)' }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={100 - position}
          onChange={(e) => setPosition(100 - parseInt(e.target.value))}
          className="w-full"
          style={{ transform: 'rotate(0deg)' }}
        />

        <div className="text-center space-y-2">
          <div className={`inline-block px-4 py-2 ${zone.color}`}>
            {zone.name}
          </div>
          {!marked && (
            <button
              onClick={() => setMarked(true)}
              className="block w-full mt-4 py-3 bg-white text-black"
            >
              Mark this
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NC-A03: STATE DELTA CAPTURE
// ============================================================================
export const StateDeltaCapture: React.FC = () => {
  const [before, setBefore] = useState<number | null>(null);
  const [after, setAfter] = useState<number | null>(null);
  const [stage, setStage] = useState<'before' | 'pause' | 'after'>('before');

  const delta = after !== null && before !== null ? after - before : 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {stage === 'before' && (
          <>
            <p className="text-2xl">Before you do anything</p>
            <p className="text-sm opacity-40">Rate your energy right now</p>
            <div className="flex items-center justify-between mt-8">
              <span className="text-xs opacity-40">Depleted</span>
              <span className="text-xs opacity-40">Activated</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={before || 50}
              onChange={(e) => setBefore(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-6xl text-center">{before || 50}</div>
            <button
              onClick={() => setStage('pause')}
              className="w-full py-3 bg-white text-black mt-8"
            >
              Next
            </button>
          </>
        )}

        {stage === 'pause' && (
          <>
            <p className="text-2xl">Take 3 deep breaths</p>
            <p className="text-sm opacity-40">Inhale for 4, exhale for 6</p>
            <div className="h-64 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-white animate-pulse" />
            </div>
            <button
              onClick={() => setStage('after')}
              className="w-full py-3 bg-white text-black"
            >
              Done
            </button>
          </>
        )}

        {stage === 'after' && (
          <>
            <p className="text-2xl">After 3 breaths</p>
            <p className="text-sm opacity-40">Rate your energy now</p>
            <div className="flex items-center justify-between mt-8">
              <span className="text-xs opacity-40">Depleted</span>
              <span className="text-xs opacity-40">Activated</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={after || 50}
              onChange={(e) => setAfter(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-6xl text-center">{after || 50}</div>
            
            {after !== null && before !== null && (
              <div className="mt-8 p-6 bg-white/5 text-center">
                <p className="text-sm opacity-40">Change</p>
                <p className={`text-4xl ${delta > 0 ? 'text-green-500' : delta < 0 ? 'text-blue-500' : 'text-white'}`}>
                  {delta > 0 ? '+' : ''}{delta}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// NC-A04: GROUNDING ANCHOR
// ============================================================================
export const GroundingAnchor: React.FC = () => {
  const [anchors, setAnchors] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');

  const prompts = [
    '5 things you can see',
    '4 things you can touch',
    '3 things you can hear',
    '2 things you can smell',
    '1 thing you can taste'
  ];

  const currentPrompt = anchors.length < 5 ? prompts[anchors.length] : null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {currentPrompt ? (
          <>
            <p className="text-2xl">{currentPrompt}</p>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentInput.trim()) {
                  setAnchors([...anchors, currentInput]);
                  setCurrentInput('');
                }
              }}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Type and press Enter"
              autoFocus
            />
          </>
        ) : (
          <>
            <p className="text-2xl">Your anchors</p>
            <div className="space-y-2">
              {anchors.map((anchor, i) => (
                <div key={i} className="p-3 bg-white/5">
                  <span className="opacity-40">{prompts[i]}: </span>
                  {anchor}
                </div>
              ))}
            </div>
            <p className="text-sm opacity-40 mt-8">You are here. You are present.</p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// NC-A05: BREATH RHYTHM MATCHER
// ============================================================================
export const BreathRhythmMatcher: React.FC = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const durations = { inhale: 4, hold: 2, exhale: 6, pause: 2 };
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const durations = { inhale: 4, hold: 2, exhale: 6, pause: 2 };
    const phaseOrder: Array<'inhale' | 'hold' | 'exhale' | 'pause'> = ['inhale', 'hold', 'exhale', 'pause'];
    const currentIndex = phaseOrder.indexOf(phase);
    const phaseDuration = durations[phase];

    if (count > 0 && count % phaseDuration === 0) {
      const nextIndex = (currentIndex + 1) % phaseOrder.length;
      setPhase(phaseOrder[nextIndex]);
      if (phase === 'pause') setCycles(prev => prev + 1);
    }
  }, [count, phase]);

  const getPhaseColor = () => {
    switch(phase) {
      case 'inhale': return 'bg-blue-500';
      case 'hold': return 'bg-purple-500';
      case 'exhale': return 'bg-green-500';
      case 'pause': return 'bg-yellow-500';
    }
  };

  return (
    <div className={`min-h-screen ${getPhaseColor()} transition-colors duration-1000 flex flex-col items-center justify-center p-8`}>
      <div className="max-w-md w-full text-center space-y-8 text-white">
        <p className="text-6xl uppercase tracking-wider">{phase}</p>
        <p className="text-sm opacity-60">{cycles} cycles complete</p>
      </div>
    </div>
  );
};

// ============================================================================
// NC-A06: AROUSAL GOLDILOCKS
// ============================================================================
export const ArousalGoldilocks: React.FC = () => {
  const [level, setLevel] = useState(50);

  const getState = (val: number) => {
    if (val < 30) return { name: 'Too Low', desc: 'Shutdown, numb, disconnected', color: 'text-blue-400' };
    if (val > 70) return { name: 'Too High', desc: 'Panic, overwhelm, chaos', color: 'text-red-400' };
    return { name: 'Just Right', desc: 'Alert, present, capable', color: 'text-green-400' };
  };

  const state = getState(level);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Your arousal level</p>
        <p className="text-sm opacity-40">Not energy. Not mood. Nervous system activation.</p>

        <div className="relative h-64 bg-white/5 my-8">
          <div className="absolute top-0 w-full h-1/3 bg-red-500/10 flex items-center justify-center">
            <span className="text-xs opacity-30">Too High</span>
          </div>
          <div className="absolute top-1/3 w-full h-1/3 bg-green-500/10 flex items-center justify-center">
            <span className="text-xs opacity-30">Just Right</span>
          </div>
          <div className="absolute top-2/3 w-full h-1/3 bg-blue-500/10 flex items-center justify-center">
            <span className="text-xs opacity-30">Too Low</span>
          </div>

          <div
            className="absolute w-full h-2 bg-white transition-all duration-300"
            style={{ top: `${100 - level}%` }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={100 - level}
          onChange={(e) => setLevel(100 - parseInt(e.target.value))}
          className="w-full"
        />

        <div className="text-center space-y-2">
          <p className={`text-3xl ${state.color}`}>{state.name}</p>
          <p className="text-sm opacity-40">{state.desc}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NC-A07: EMOTION NAMER (No Cliché)
// ============================================================================
export const EmotionNamer: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const emotions = [
    'Tight', 'Hollow', 'Electric', 'Heavy', 'Sparking',
    'Numb', 'Buzzing', 'Sinking', 'Frozen', 'Burning',
    'Floating', 'Jagged', 'Smooth', 'Pulsing', 'Still'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Not happy or sad</p>
        <p className="text-sm opacity-40">Pick the textures that fit</p>

        <div className="grid grid-cols-3 gap-2">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() => {
                if (selected.includes(emotion)) {
                  setSelected(selected.filter(e => e !== emotion));
                } else {
                  setSelected([...selected, emotion]);
                }
              }}
              className={`py-3 text-sm transition-colors ${
                selected.includes(emotion)
                  ? 'bg-white text-black'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="mt-8 p-4 bg-white/5">
            <p className="text-sm opacity-40">You feel:</p>
            <p className="text-lg mt-2">{selected.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// NC-A08: CO-REGULATION DETECTOR
// ============================================================================
export const CoRegulationDetector: React.FC = () => {
  const [person, setPerson] = useState('');
  const [effect, setEffect] = useState<'calms' | 'activates' | 'neutral' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!submitted ? (
          <>
            <p className="text-2xl">Who did you last spend time with?</p>
            <input
              type="text"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="First name or relationship"
              autoFocus
            />

            {person && (
              <>
                <p className="text-lg mt-8">After being with {person}, you feel:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setEffect('calms')}
                    className={`w-full py-4 ${effect === 'calms' ? 'bg-green-500' : 'bg-white/5'}`}
                  >
                    More regulated
                  </button>
                  <button
                    onClick={() => setEffect('neutral')}
                    className={`w-full py-4 ${effect === 'neutral' ? 'bg-yellow-500' : 'bg-white/5'}`}
                  >
                    No change
                  </button>
                  <button
                    onClick={() => setEffect('activates')}
                    className={`w-full py-4 ${effect === 'activates' ? 'bg-red-500' : 'bg-white/5'}`}
                  >
                    More dysregulated
                  </button>
                </div>
              </>
            )}

            {effect && (
              <button
                onClick={() => setSubmitted(true)}
                className="w-full py-3 bg-white text-black mt-8"
              >
                Mark this
              </button>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">Noted</p>
            <div className="p-6 bg-white/5">
              <p className="opacity-40 text-sm">Co-regulation data</p>
              <p className="text-lg mt-2">{person} → {effect}</p>
            </div>
            <p className="text-sm opacity-40 mt-4">
              Your nervous system learns from other nervous systems.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// NC-A09: RECOVERY HALF-LIFE
// ============================================================================
export const RecoveryHalfLife: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const duration = startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!started ? (
          <>
            <p className="text-2xl">Something just activated you</p>
            <p className="text-sm opacity-40">When you feel the activation start to fade, tap the button</p>
            <button
              onClick={() => {
                setStarted(true);
                setStartTime(Date.now());
              }}
              className="w-full py-4 bg-white text-black mt-8"
            >
              Activation started
            </button>
          </>
        ) : !endTime ? (
          <>
            <p className="text-2xl">Timer running</p>
            <p className="text-sm opacity-40">Tap when you feel the wave receding</p>
            <div className="h-32 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white animate-pulse" />
            </div>
            <button
              onClick={() => setEndTime(Date.now())}
              className="w-full py-4 bg-white text-black"
            >
              It's fading
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">Your recovery time</p>
            <div className="text-8xl text-center my-8">{duration}s</div>
            <p className="text-sm opacity-40 text-center">
              The faster your recovery, the more resilient your system.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// NC-A10: POLYVAGAL STATE INDICATOR
// ============================================================================
export const PolyvagalStateIndicator: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const states = [
    {
      name: 'Ventral Vagal',
      short: 'Social engagement',
      desc: 'Safe, connected, present',
      color: 'bg-green-500',
      signals: ['Eye contact feels easy', 'Voice has prosody', 'Curious about others']
    },
    {
      name: 'Sympathetic',
      short: 'Mobilization',
      desc: 'Fight or flight active',
      color: 'bg-red-500',
      signals: ['Heart racing', 'Muscles tense', 'Scanning for threat']
    },
    {
      name: 'Dorsal Vagal',
      short: 'Immobilization',
      desc: 'Shutdown, collapse',
      color: 'bg-blue-500',
      signals: ['Numb', 'Foggy', 'Want to disappear']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!selectedState ? (
          <>
            <p className="text-2xl">Which state are you in?</p>
            <p className="text-sm opacity-40">Not good or bad. Just is.</p>

            <div className="space-y-3">
              {states.map((state) => (
                <button
                  key={state.name}
                  onClick={() => setSelectedState(state.name)}
                  className={`w-full p-4 ${state.color} text-left`}
                >
                  <p className="text-lg">{state.short}</p>
                  <p className="text-sm opacity-80">{state.desc}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl">{selectedState}</p>
            <div className="space-y-2">
              <p className="text-sm opacity-40">Check if these fit:</p>
              {states.find(s => s.name === selectedState)?.signals.map((signal, i) => (
                <div key={i} className="p-3 bg-white/5">
                  {signal}
                </div>
              ))}
            </div>
            <p className="text-sm opacity-40 mt-8">
              Naming the state begins to shift it.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================
export default {
  VagalToneBaseline,
  WindowOfToleranceMap,
  StateDeltaCapture,
  GroundingAnchor,
  BreathRhythmMatcher,
  ArousalGoldilocks,
  EmotionNamer,
  CoRegulationDetector,
  RecoveryHalfLife,
  PolyvagalStateIndicator
};
