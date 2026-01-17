/**
 * GURU BATCH 01: RAM DASS AS DESIGNER
 * "If Ram Dass could code NaviCues, what would he build?"
 * 
 * Design Philosophy:
 * - Present moment witness cultivation
 * - "Be Here Now" as interaction design
 * - Awareness of awareness
 * - The loving witness
 * - Soul vs. Ego recognition
 * - Compassionate observation without judgment
 * - Spaciousness around experience
 * 
 * Not copying quotes - channeling design thinking
 */

import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// RD-01: THE WITNESS TOGGLE
// Mechanism: Rapid perspective shift between experience and observer
// ============================================================================
export const WitnessToggle: React.FC = () => {
  const [mode, setMode] = useState<'experience' | 'witness'>('experience');
  const [feeling, setFeeling] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {mode === 'experience' ? (
          <>
            <p className="text-2xl">What are you feeling?</p>
            <input
              type="text"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Name it"
              autoFocus
            />
            {feeling && (
              <button
                onClick={() => setMode('witness')}
                className="w-full py-4 bg-white text-black mt-8"
              >
                Now watch it
              </button>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">Who is watching "{feeling}"?</p>
            <div className="my-12 text-center">
              <div className="inline-block p-8 border border-white/20">
                <p className="text-lg opacity-60 mb-4">The feeling:</p>
                <p className="text-3xl">{feeling}</p>
              </div>
              <div className="mt-8">
                <p className="text-sm opacity-40">↑</p>
                <p className="text-sm opacity-40">You are not this</p>
                <p className="text-sm opacity-40">You are the one watching this</p>
              </div>
            </div>
            <button
              onClick={() => {
                setMode('experience');
                setFeeling('');
              }}
              className="w-full py-3 bg-white/10"
            >
              Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-02: NOW DURATION TEST
// How long can you stay in "now" before thoughts pull you away?
// ============================================================================
export const NowDurationTest: React.FC = () => {
  const [timing, setTiming] = useState(false);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timing && startTime) {
      interval = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime) / 100) / 10);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timing, startTime]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {!timing && duration === 0 ? (
          <>
            <p className="text-2xl">Stay in now</p>
            <p className="text-sm opacity-40">Press to begin</p>
            <p className="text-sm opacity-40">Press again when thought pulls you away</p>
            <button
              onClick={() => {
                setTiming(true);
                setStartTime(Date.now());
              }}
              className="w-full py-8 bg-white text-black text-2xl mt-8"
            >
              BEGIN
            </button>
          </>
        ) : timing ? (
          <>
            <div className="text-8xl">{duration}s</div>
            <div className="h-2 w-full bg-white/10 mt-8">
              <div className="h-full bg-white animate-pulse" style={{ width: '100%' }} />
            </div>
            <button
              onClick={() => setTiming(false)}
              className="w-full py-4 bg-white text-black mt-8"
            >
              Thought arrived
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">You stayed for</p>
            <div className="text-8xl my-8">{duration}s</div>
            <p className="text-sm opacity-40">Each time you practice, you strengthen the muscle</p>
            <button
              onClick={() => {
                setDuration(0);
                setStartTime(null);
              }}
              className="w-full py-3 bg-white/10 mt-8"
            >
              Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-03: SOUL VS EGO IDENTIFIER
// Which voice is speaking right now?
// ============================================================================
export const SoulVsEgoIdentifier: React.FC = () => {
  const [thought, setThought] = useState('');
  const [identified, setIdentified] = useState<'soul' | 'ego' | null>(null);

  const egoSignals = [
    'Compares to others',
    'Needs to be right',
    'Fears judgment',
    'Wants control',
    'Feels separate'
  ];

  const soulSignals = [
    'Feels connected',
    'Trusts process',
    'Accepts what is',
    'Sees wholeness',
    'Rests in being'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!identified ? (
          <>
            <p className="text-2xl">A thought you're having right now</p>
            <input
              type="text"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Type it"
              autoFocus
            />

            {thought && (
              <>
                <p className="text-lg mt-8">Which voice is this?</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setIdentified('ego')}
                    className="py-8 bg-red-500/20 border border-red-500/40"
                  >
                    Ego
                  </button>
                  <button
                    onClick={() => setIdentified('soul')}
                    className="py-8 bg-blue-500/20 border border-blue-500/40"
                  >
                    Soul
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">The {identified} says:</p>
            <div className="p-6 bg-white/5 text-lg italic">"{thought}"</div>

            <div className="mt-8">
              <p className="text-sm opacity-40 mb-4">{identified === 'ego' ? 'Ego' : 'Soul'} tends to:</p>
              <div className="space-y-2">
                {(identified === 'ego' ? egoSignals : soulSignals).map((signal, i) => (
                  <div key={i} className="p-2 bg-white/5 text-sm">
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm opacity-40 mt-8">
              Neither is wrong. Both are parts of you. The practice is recognition.
            </p>

            <button
              onClick={() => {
                setThought('');
                setIdentified(null);
              }}
              className="w-full py-3 bg-white/10 mt-4"
            >
              Another thought
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-04: AWARENESS OF AWARENESS
// Meta-meditation: watching yourself watching
// ============================================================================
export const AwarenessOfAwareness: React.FC = () => {
  const [layer, setLayer] = useState(1);

  const layers = [
    { level: 1, text: 'You are reading this', action: 'Next' },
    { level: 2, text: 'You are aware you are reading this', action: 'Deeper' },
    { level: 3, text: 'You are aware that you are aware you are reading this', action: 'Deeper' },
    { level: 4, text: 'Who is aware of the awareness of the awareness?', action: 'Deeper' },
    { level: 5, text: 'There is only awareness', action: 'Rest here' }
  ];

  const current = layers[layer - 1];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-12 text-center">
        <div className="space-y-4">
          {Array.from({ length: layer }).map((_, i) => (
            <div
              key={i}
              className="p-4 border border-white/20"
              style={{
                marginLeft: `${i * 20}px`,
                marginRight: `${i * 20}px`,
                opacity: 1 - (i * 0.15)
              }}
            >
              <p className="text-sm opacity-60">Layer {i + 1}</p>
            </div>
          ))}
        </div>

        <p className="text-2xl">{current.text}</p>

        {layer < 5 ? (
          <button
            onClick={() => setLayer(layer + 1)}
            className="w-full py-4 bg-white text-black"
          >
            {current.action}
          </button>
        ) : (
          <>
            <div className="h-32 flex items-center justify-center">
              <div className="w-32 h-32 border border-white/20 animate-pulse" />
            </div>
            <p className="text-sm opacity-40">Spaciousness</p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-05: LOVING WITNESS PRACTICE
// Observe internal experience with compassion, not judgment
// ============================================================================
export const LovingWitnessPractice: React.FC = () => {
  const [experience, setExperience] = useState('');
  const [witnessResponse, setWitnessResponse] = useState('');
  const [stage, setStage] = useState<'name' | 'witness' | 'complete'>('name');

  const lovingPhrases = [
    'I see you',
    'This too',
    'You are allowed',
    'All of it belongs',
    'Nothing to fix'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {stage === 'name' && (
          <>
            <p className="text-2xl">What's happening inside?</p>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Anxiety, rage, numbness, whatever"
              autoFocus
            />
            {experience && (
              <button
                onClick={() => setStage('witness')}
                className="w-full py-4 bg-white text-black mt-8"
              >
                Witness it
              </button>
            )}
          </>
        )}

        {stage === 'witness' && (
          <>
            <p className="text-2xl">The loving witness sees</p>
            <div className="p-6 bg-white/5 text-center">
              <p className="text-3xl">{experience}</p>
            </div>

            <p className="text-lg mt-8">And says:</p>
            <div className="space-y-2">
              {lovingPhrases.map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    setWitnessResponse(phrase);
                    setStage('complete');
                  }}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-left px-4"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </>
        )}

        {stage === 'complete' && (
          <>
            <div className="space-y-6">
              <div className="p-6 bg-white/5">
                <p className="text-sm opacity-40">The experience:</p>
                <p className="text-2xl mt-2">{experience}</p>
              </div>

              <div className="text-center">
                <p className="text-sm opacity-40">↓</p>
                <p className="text-sm opacity-60">The witness responds</p>
                <p className="text-sm opacity-40">↓</p>
              </div>

              <div className="p-6 bg-blue-500/10 border border-blue-500/20">
                <p className="text-2xl text-center">{witnessResponse}</p>
              </div>
            </div>

            <p className="text-sm opacity-40 mt-8 text-center">
              The witness doesn't fix or change. It loves what is.
            </p>

            <button
              onClick={() => {
                setExperience('');
                setWitnessResponse('');
                setStage('name');
              }}
              className="w-full py-3 bg-white/10 mt-4"
            >
              Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-06: SPACIOUSNESS METER
// How much space is there between you and your experience?
// ============================================================================
export const SpaciousnessMeter: React.FC = () => {
  const [spaciousness, setSpaciousness] = useState(50);

  const getState = (val: number) => {
    if (val < 20) return {
      name: 'Merged',
      desc: 'You ARE the experience. No separation.',
      guidance: 'Notice: there is awareness of this merging'
    };
    if (val < 50) return {
      name: 'Entangled',
      desc: 'Mostly identified, some distance',
      guidance: 'Can you find the witness?'
    };
    if (val < 80) return {
      name: 'Spacious',
      desc: 'Clear separation. Watching it happen.',
      guidance: 'This is the sweet spot'
    };
    return {
      name: 'Vast',
      desc: 'So much space, experience feels small',
      guidance: 'Oceanic. The witness dissolves into awareness itself'
    };
  };

  const state = getState(spaciousness);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">How much space between you and your thoughts?</p>

        <div className="relative h-64 bg-white/5">
          <div
            className="absolute bottom-0 w-full bg-blue-500/20 transition-all duration-300"
            style={{ height: `${spaciousness}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm opacity-40">↑ Space ↑</p>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={spaciousness}
          onChange={(e) => setSpaciousness(parseInt(e.target.value))}
          className="w-full"
        />

        <div className="text-center space-y-2">
          <p className="text-3xl">{state.name}</p>
          <p className="text-sm opacity-60">{state.desc}</p>
          <p className="text-xs opacity-40 mt-4">{state.guidance}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// RD-07: HERE NOW ANCHOR
// Immediate return to present, no elaboration
// ============================================================================
export const HereNowAnchor: React.FC = () => {
  const [taps, setTaps] = useState(0);
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);

  const handleTap = () => {
    setTaps(prev => prev + 1);
    setLastTapTime(Date.now());
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <p className="text-2xl">When you notice you've left</p>
        <p className="text-sm opacity-40">Tap to return</p>

        <button
          onClick={handleTap}
          className="w-full h-64 bg-white text-black text-6xl"
        >
          HERE
        </button>

        {taps > 0 && (
          <div className="space-y-2">
            <p className="text-sm opacity-40">Returns today: {taps}</p>
            <p className="text-xs opacity-30">Each return strengthens the path back</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-08: ROLE RECOGNITION
// Which role are you playing right now?
// ============================================================================
export const RoleRecognition: React.FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const roles = [
    'Helper', 'Victim', 'Achiever', 'Rebel',
    'Perfectionist', 'Pleaser', 'Controller', 'Critic',
    'Performer', 'Caretaker', 'Skeptic', 'Wounded one'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Which roles are active?</p>
        <p className="text-sm opacity-40">Not who you are. Which characters are on stage.</p>

        <div className="grid grid-cols-2 gap-3">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => {
                if (selectedRoles.includes(role)) {
                  setSelectedRoles(selectedRoles.filter(r => r !== role));
                } else {
                  setSelectedRoles([...selectedRoles, role]);
                }
              }}
              className={`py-4 text-sm transition-colors ${
                selectedRoles.includes(role)
                  ? 'bg-white text-black'
                  : 'bg-white/5'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {selectedRoles.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="p-6 bg-white/5">
              <p className="text-sm opacity-40">Active roles:</p>
              <p className="text-lg mt-2">{selectedRoles.join(', ')}</p>
            </div>
            <p className="text-sm opacity-40 text-center">
              The one who sees these roles is not playing them
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-09: THOUGHT DISTANCE SLIDER
// How close/far are you from your thoughts?
// ============================================================================
export const ThoughtDistanceSlider: React.FC = () => {
  const [distance, setDistance] = useState(50);
  const [thought, setThought] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">A thought you're having</p>
        <input
          type="text"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
          placeholder="Type it"
          autoFocus
        />

        {thought && (
          <>
            <p className="text-lg mt-8">How close are you to it?</p>
            
            <div className="relative h-64 bg-white/5 flex items-center justify-center">
              <div
                className="absolute p-4 bg-white text-black text-center transition-all duration-300"
                style={{
                  top: `${100 - distance}%`,
                  transform: 'translateY(-50%)',
                  fontSize: `${Math.max(12, distance / 5)}px`,
                  opacity: Math.max(0.3, distance / 100)
                }}
              >
                {thought}
              </div>

              <div className="absolute bottom-4 text-sm opacity-40">
                You (the witness)
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={100 - distance}
              onChange={(e) => setDistance(100 - parseInt(e.target.value))}
              className="w-full"
            />

            <div className="text-center">
              {distance < 30 && <p className="text-sm opacity-60">Merged with the thought</p>}
              {distance >= 30 && distance < 70 && <p className="text-sm opacity-60">Some separation</p>}
              {distance >= 70 && <p className="text-sm opacity-60">Clear witness</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RD-10: BEING BENEATH DOING
// Strip away what you do to find what you are
// ============================================================================
export const BeingBeneathDoing: React.FC = () => {
  const [identities, setIdentities] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [revealing, setRevealing] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!revealing ? (
          <>
            <p className="text-2xl">I am a...</p>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentInput.trim()) {
                  setIdentities([...identities, currentInput]);
                  setCurrentInput('');
                }
              }}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Teacher, mother, addict..."
              autoFocus
            />
            <p className="text-sm opacity-40">Press Enter to add. Add at least 3.</p>

            {identities.length > 0 && (
              <div className="space-y-2">
                {identities.map((id, i) => (
                  <div key={i} className="p-3 bg-white/5">
                    I am a {id}
                  </div>
                ))}
              </div>
            )}

            {identities.length >= 3 && (
              <button
                onClick={() => setRevealing(true)}
                className="w-full py-4 bg-white text-black mt-8"
              >
                Now remove them
              </button>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">Remove what you do</p>
            
            {identities.length > 0 ? (
              <>
                <div className="space-y-2">
                  {identities.map((id, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white/5 flex items-center justify-between"
                    >
                      <span className="line-through opacity-40">I am a {id}</span>
                      <button
                        onClick={() => setIdentities(identities.filter((_, idx) => idx !== i))}
                        className="text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-sm opacity-40">Keep removing</p>
              </>
            ) : (
              <>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-4xl opacity-20">[ ]</p>
                </div>
                <p className="text-2xl text-center">What remains?</p>
                <p className="text-sm opacity-40 text-center mt-8">
                  When all roles are gone, there is still awareness.
                  That awareness is what you are.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Additional Ram Dass-inspired NaviCues (11-20)
// ============================================================================

// RD-11: Present Moment Window
export const PresentMomentWindow: React.FC = () => {
  const [windowOpen, setWindowOpen] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (windowOpen) {
      interval = setInterval(() => setDuration(d => d + 0.1), 100);
    }
    return () => clearInterval(interval);
  }, [windowOpen]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {!windowOpen ? (
          <>
            <p className="text-2xl">Open the window to now</p>
            <button
              onClick={() => setWindowOpen(true)}
              className="w-full py-12 bg-white text-black text-3xl"
            >
              OPEN
            </button>
          </>
        ) : (
          <>
            <p className="text-sm opacity-40">Window open for</p>
            <div className="text-8xl">{duration.toFixed(1)}s</div>
            <div className="h-32 border-4 border-white animate-pulse" />
            <button
              onClick={() => {
                setWindowOpen(false);
                setDuration(0);
              }}
              className="w-full py-4 bg-white/10"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// RD-12: Suffering Formula
export const SufferingFormula: React.FC = () => {
  const [resistance, setResistance] = useState(50);
  const [pain, setPain] = useState(50);

  const suffering = (resistance * pain) / 100;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl text-center">Suffering = Pain × Resistance</p>

        <div className="space-y-6">
          <div>
            <p className="text-sm opacity-40">Pain (what happened)</p>
            <input
              type="range"
              min="0"
              max="100"
              value={pain}
              onChange={(e) => setPain(parseInt(e.target.value))}
              className="w-full mt-2"
            />
            <p className="text-center text-2xl mt-2">{pain}</p>
          </div>

          <div>
            <p className="text-sm opacity-40">Resistance (your push against it)</p>
            <input
              type="range"
              min="0"
              max="100"
              value={resistance}
              onChange={(e) => setResistance(parseInt(e.target.value))}
              className="w-full mt-2"
            />
            <p className="text-center text-2xl mt-2">{resistance}</p>
          </div>
        </div>

        <div className="p-8 bg-white/5 text-center">
          <p className="text-sm opacity-40">Suffering</p>
          <p className="text-6xl mt-2">{Math.round(suffering)}</p>
        </div>

        <p className="text-sm opacity-40 text-center">
          Pain is inevitable. Suffering is optional. Reduce resistance.
        </p>
      </div>
    </div>
  );
};

// RD-13-20: Completing the batch with rapid minimal variants
export const FierceGraceToggle: React.FC = () => {
  const [mode, setMode] = useState<'fierce' | 'grace'>('grace');
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="text-2xl">You need both</p>
        <button
          onClick={() => setMode(mode === 'fierce' ? 'grace' : 'fierce')}
          className={`w-full py-16 text-4xl ${mode === 'fierce' ? 'bg-red-500' : 'bg-blue-500'}`}
        >
          {mode === 'fierce' ? 'FIERCE' : 'GRACE'}
        </button>
        <p className="text-sm opacity-40">
          {mode === 'fierce' ? 'The sword that cuts through' : 'The embrace that holds'}
        </p>
      </div>
    </div>
  );
};

export const CompassionCircle: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="text-2xl">Expand the circle</p>
        <div 
          className="mx-auto border-2 border-white transition-all duration-1000 aspect-square"
          style={{ width: expanded ? '300px' : '100px' }}
        />
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-4 bg-white text-black"
        >
          {expanded ? 'Include all beings' : 'Start with self'}
        </button>
      </div>
    </div>
  );
};

// Export all
export default {
  WitnessToggle,
  NowDurationTest,
  SoulVsEgoIdentifier,
  AwarenessOfAwareness,
  LovingWitnessPractice,
  SpaciousnessMeter,
  HereNowAnchor,
  RoleRecognition,
  ThoughtDistanceSlider,
  BeingBeneathDoing,
  PresentMomentWindow,
  SufferingFormula,
  FierceGraceToggle,
  CompassionCircle
};
