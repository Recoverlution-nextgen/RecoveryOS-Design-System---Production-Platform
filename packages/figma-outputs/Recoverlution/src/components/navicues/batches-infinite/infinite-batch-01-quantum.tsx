/**
 * INFINITE BATCH 01: QUANTUM THERAPY
 * Pure creative freedom - no constraints, no precedent
 * 
 * Theme: Quantum Mechanics as Psychological Intervention
 * - Superposition: holding multiple states simultaneously
 * - Observer effect: measurement changes the system
 * - Entanglement: connection without contact
 * - Uncertainty: cannot know position and momentum
 * - Wave-particle duality: both/and, not either/or
 * - Quantum tunneling: passing through barriers
 * - Schrödinger's states: alive and dead until observed
 * 
 * This is what happens when physics becomes therapy
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// Q-01: SUPERPOSITION STATE HOLDER
// Be anxious AND calm simultaneously until you observe yourself
// ============================================================================
export const SuperpositionStateHolder: React.FC = () => {
  const [superposition, setSuperposition] = useState(true);
  const [observedState, setObservedState] = useState<string | null>(null);

  const possibleStates = [
    'Anxious', 'Calm', 'Angry', 'Peaceful',
    'Excited', 'Numb', 'Hopeful', 'Defeated'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {superposition ? (
          <>
            <p className="text-2xl">You are in superposition</p>
            <p className="text-sm opacity-40">
              All states exist simultaneously until observed
            </p>

            <div className="h-64 border border-white/20 flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-2 gap-2 opacity-50 blur-sm">
                {possibleStates.map((state) => (
                  <div key={state} className="p-2 bg-white/10 text-xs">
                    {state}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm opacity-60">Quantum wave function:</p>
              <p className="text-xs font-mono">|ψ⟩ = Σ anxiety + calm + anger + peace...</p>
            </div>

            <button
              onClick={() => {
                setSuperposition(false);
                // Collapse to random state
                const randomState = possibleStates[Math.floor(Math.random() * possibleStates.length)];
                setObservedState(randomState);
              }}
              className="w-full py-4 bg-white text-black"
            >
              Observe yourself
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">Wave function collapsed</p>
            
            <div className="p-12 bg-white text-black text-center">
              <p className="text-sm opacity-60 mb-2">You are:</p>
              <p className="text-6xl">{observedState}</p>
            </div>

            <p className="text-sm opacity-40 text-center">
              The act of observing yourself forced a choice.
              Before observation, you were everything.
              After observation, you are this.
            </p>

            <button
              onClick={() => {
                setSuperposition(true);
                setObservedState(null);
              }}
              className="w-full py-3 bg-white/10"
            >
              Return to superposition
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Q-02: UNCERTAINTY PRINCIPLE SLIDER
// Cannot know both "where you are" and "where you're going"
// ============================================================================
export const UncertaintyPrincipleSlider: React.FC = () => {
  const [focus, setFocus] = useState(50); // 0 = position, 100 = momentum

  const positionClarity = 100 - focus;
  const momentumClarity = focus;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Heisenberg says: You can't have both</p>
        <p className="text-sm opacity-40">
          The more precisely you know where you are,
          the less you know where you're going
        </p>

        <div className="space-y-6">
          <div>
            <p className="text-sm opacity-60">Position (where you are now)</p>
            <div className="h-24 bg-white/5 mt-2 flex items-center justify-center">
              <p className="text-4xl" style={{ opacity: positionClarity / 100 }}>
                📍
              </p>
            </div>
            <p className="text-center mt-2">Clarity: {positionClarity}%</p>
          </div>

          <div>
            <p className="text-sm opacity-60">Momentum (where you're going)</p>
            <div className="h-24 bg-white/5 mt-2 flex items-center justify-center">
              <p className="text-4xl" style={{ opacity: momentumClarity / 100 }}>
                →
              </p>
            </div>
            <p className="text-center mt-2">Clarity: {momentumClarity}%</p>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={focus}
          onChange={(e) => setFocus(parseInt(e.target.value))}
          className="w-full"
        />

        <div className="text-center space-y-2">
          <p className="text-xs opacity-40">Δx · Δp ≥ ℏ/2</p>
          <p className="text-sm opacity-60">
            {focus < 30 && "Focused on now. Future is blur."}
            {focus >= 30 && focus < 70 && "Trying to know both. Knowing neither."}
            {focus >= 70 && "Focused on direction. Present is blur."}
          </p>
        </div>

        <p className="text-sm opacity-40 text-center">
          This isn't a bug. It's the universe.
          Stop trying to have perfect clarity on both.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// Q-03: QUANTUM ENTANGLEMENT DETECTOR
// Your state is correlated with someone distant
// ============================================================================
export const QuantumEntanglementDetector: React.FC = () => {
  const [person, setPerson] = useState('');
  const [yourState, setYourState] = useState<'up' | 'down' | null>(null);
  const [measured, setMeasured] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!person ? (
          <>
            <p className="text-2xl">Who are you entangled with?</p>
            <p className="text-sm opacity-40">
              Someone whose state affects yours instantly, regardless of distance
            </p>
            <input
              type="text"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Their name"
              autoFocus
            />
          </>
        ) : !measured ? (
          <>
            <p className="text-2xl">Quantum pair detected</p>
            
            <div className="space-y-8">
              <div className="p-6 bg-white/5 text-center">
                <p className="text-sm opacity-40">You</p>
                <p className="text-6xl opacity-30">?</p>
              </div>

              <div className="text-center">
                <p className="text-sm opacity-60">⟺</p>
                <p className="text-xs opacity-40">Entangled</p>
              </div>

              <div className="p-6 bg-white/5 text-center">
                <p className="text-sm opacity-40">{person}</p>
                <p className="text-6xl opacity-30">?</p>
              </div>
            </div>

            <p className="text-sm opacity-40 text-center">
              Before measurement, both states exist in superposition.
              Measuring one collapses both instantly.
            </p>

            <button
              onClick={() => {
                const state = Math.random() > 0.5 ? 'up' : 'down';
                setYourState(state);
                setMeasured(true);
              }}
              className="w-full py-4 bg-white text-black"
            >
              Measure your state
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">Wave function collapsed</p>

            <div className="space-y-8">
              <div className="p-6 bg-green-500 text-center">
                <p className="text-sm opacity-80">You</p>
                <p className="text-6xl">{yourState === 'up' ? '↑' : '↓'}</p>
                <p className="text-sm mt-2">{yourState === 'up' ? 'Elevated' : 'Low'}</p>
              </div>

              <div className="text-center">
                <p className="text-sm opacity-60">⟺</p>
                <p className="text-xs opacity-40">Instant correlation</p>
              </div>

              <div className="p-6 bg-blue-500 text-center">
                <p className="text-sm opacity-80">{person}</p>
                <p className="text-6xl">{yourState === 'up' ? '↓' : '↑'}</p>
                <p className="text-sm mt-2">{yourState === 'up' ? 'Low' : 'Elevated'}</p>
              </div>
            </div>

            <p className="text-sm opacity-40 text-center">
              Entangled particles are always opposite.
              When one is measured up, the other is down.
              No signal travels between them. It's just... correlation.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Q-04: WAVE-PARTICLE DUALITY TOGGLE
// You are both solid (particle) and fluid (wave)
// ============================================================================
export const WaveParticleDualityToggle: React.FC = () => {
  const [mode, setMode] = useState<'particle' | 'wave'>('particle');
  const [identity, setIdentity] = useState('');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Are you particle or wave?</p>

        {!identity ? (
          <>
            <p className="text-sm opacity-40">First, who do you think you are?</p>
            <input
              type="text"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="I am a..."
              autoFocus
            />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setMode('particle')}
                className={`py-8 ${mode === 'particle' ? 'bg-white text-black' : 'bg-white/5'}`}
              >
                Particle
              </button>
              <button
                onClick={() => setMode('wave')}
                className={`py-8 ${mode === 'wave' ? 'bg-white text-black' : 'bg-white/5'}`}
              >
                Wave
              </button>
            </div>

            {mode === 'particle' ? (
              <>
                <div className="h-64 bg-white/5 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white" />
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-xl">Particle mode: "{identity}"</p>
                  <p className="text-sm opacity-60">
                    Fixed, localized, definite.
                    You know exactly what you are.
                    But you're stuck in one position.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="h-64 bg-white/5 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <path
                      d="M 0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100"
                      stroke="white"
                      fill="none"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-xl">Wave mode: "{identity}"</p>
                  <p className="text-sm opacity-60">
                    Fluid, spread out, probabilistic.
                    You exist everywhere at once.
                    But you're undefined, uncertain.
                  </p>
                </div>
              </>
            )}

            <p className="text-sm opacity-40 text-center mt-8">
              Light is both particle and wave.
              So are you.
              Neither description is complete.
              The truth is both.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Q-05: QUANTUM TUNNELING THROUGH BARRIERS
// Pass through what should be impossible
// ============================================================================
export const QuantumTunnelingSimulator: React.FC = () => {
  const [barrier, setBarrier] = useState('');
  const [tunneling, setTunneling] = useState(false);
  const [throughBarrier, setThroughBarrier] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!barrier ? (
          <>
            <p className="text-2xl">Name an impossible barrier</p>
            <input
              type="text"
              value={barrier}
              onChange={(e) => setBarrier(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="What's blocking you?"
              autoFocus
            />
          </>
        ) : !tunneling ? (
          <>
            <p className="text-2xl">The barrier</p>
            
            <div className="relative h-64 bg-white/5">
              <div className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-white" />
              <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-red-500 flex items-center justify-center">
                <div className="text-xs -rotate-90 whitespace-nowrap">{barrier}</div>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 border-2 border-white/40" />
            </div>

            <p className="text-sm opacity-40 text-center">
              Classically impossible. You don't have enough energy to get over.
            </p>

            <button
              onClick={() => setTunneling(true)}
              className="w-full py-4 bg-white text-black"
            >
              Quantum tunnel
            </button>
          </>
        ) : !throughBarrier ? (
          <>
            <p className="text-2xl">Tunneling in progress</p>
            
            <div className="relative h-64 bg-white/5">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white opacity-30 animate-pulse" />
              <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-red-500/40" />
            </div>

            <p className="text-sm opacity-60 text-center">
              Probability wave penetrating barrier...
            </p>

            <button
              onClick={() => setThroughBarrier(true)}
              className="w-full py-4 bg-white text-black"
            >
              Collapse wave function
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">You're through</p>

            <div className="relative h-64 bg-white/5">
              <div className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 border-2 border-white/20" />
              <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-red-500/20" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-white" />
            </div>

            <div className="p-6 bg-white/5 text-center">
              <p className="text-sm opacity-40">Barrier:</p>
              <p className="text-lg line-through opacity-60">{barrier}</p>
            </div>

            <p className="text-sm opacity-40 text-center">
              Quantum particles can pass through barriers they shouldn't be able to.
              It's called tunneling. It's how the sun works.
              Maybe you can too.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Q-06: SCHRÖDINGER'S EMOTIONAL STATE
// You're both fine and not fine until someone asks
// ============================================================================
export const SchrodingersEmotionalState: React.FC = () => {
  const [boxClosed, setBoxClosed] = useState(true);
  const [state, setState] = useState<'fine' | 'not-fine' | null>(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {boxClosed ? (
          <>
            <p className="text-2xl">Schrödinger's question</p>
            <p className="text-lg opacity-60">"How are you?"</p>

            <div className="h-64 border-4 border-white flex items-center justify-center">
              <div className="space-y-4">
                <p className="text-4xl opacity-30">📦</p>
                <p className="text-sm opacity-40">Closed box</p>
                <p className="text-xs opacity-30">Fine AND Not Fine</p>
              </div>
            </div>

            <p className="text-sm opacity-40">
              Before you check, you exist in superposition.
              Both states are equally true.
            </p>

            <button
              onClick={() => {
                setBoxClosed(false);
                setState(Math.random() > 0.5 ? 'fine' : 'not-fine');
              }}
              className="w-full py-4 bg-white text-black"
            >
              Open the box
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">Wave function collapsed</p>

            <div className={`h-64 border-4 flex items-center justify-center ${
              state === 'fine' ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'
            }`}>
              <div className="space-y-4">
                <p className="text-6xl">{state === 'fine' ? '😊' : '😞'}</p>
                <p className="text-2xl">{state === 'fine' ? "I'm fine" : "I'm not fine"}</p>
              </div>
            </div>

            <p className="text-sm opacity-40">
              The cat was both alive and dead.
              You were both fine and not fine.
              Observation forced reality to choose.
            </p>

            <button
              onClick={() => {
                setBoxClosed(true);
                setState(null);
              }}
              className="w-full py-3 bg-white/10"
            >
              Close the box
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Q-07: PROBABILITY CLOUD VISUALIZER
// You don't have a position, you have a probability distribution
// ============================================================================
export const ProbabilityCloudVisualizer: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [probabilities, setProbabilities] = useState<Record<string, number>>({});

  const options = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!question ? (
          <>
            <p className="text-2xl">A question about you</p>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="I am confident"
              autoFocus
            />
          </>
        ) : Object.keys(probabilities).length < 5 ? (
          <>
            <p className="text-2xl">"{question}"</p>
            <p className="text-sm opacity-40">
              Don't pick one answer. Assign probability to each.
            </p>

            <div className="space-y-4">
              {options.map((option) => (
                <div key={option} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{option}</span>
                    <span className="text-sm">{probabilities[option] || 0}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={probabilities[option] || 0}
                    onChange={(e) => setProbabilities({
                      ...probabilities,
                      [option]: parseInt(e.target.value)
                    })}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/5 text-center">
              <p className="text-sm opacity-40">Total probability:</p>
              <p className="text-2xl">
                {Object.values(probabilities).reduce((a, b) => a + b, 0)}%
              </p>
              <p className="text-xs opacity-30">(doesn't have to sum to 100)</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl">Your probability cloud</p>
            <p className="text-sm opacity-40">"{question}"</p>

            <div className="space-y-2">
              {options.map((option) => {
                const prob = probabilities[option] || 0;
                return (
                  <div key={option} className="flex items-center gap-4">
                    <span className="text-sm w-32">{option}</span>
                    <div className="flex-1 h-8 bg-white/5">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${prob}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{prob}%</span>
                  </div>
                );
              })}
            </div>

            <p className="text-sm opacity-40 text-center mt-8">
              You're not one thing. You're a distribution.
              This is more accurate than forcing a single answer.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Q-08-20: Rapid quantum variants
// ============================================================================

export const QuantumCoherence: React.FC = () => {
  const [coherent, setCoherent] = useState(true);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="text-2xl">Coherence check</p>
        <button
          onClick={() => setCoherent(!coherent)}
          className={`w-full py-16 text-4xl ${
            coherent ? 'bg-blue-500' : 'bg-red-500'
          }`}
        >
          {coherent ? 'COHERENT' : 'DECOHERENT'}
        </button>
        <p className="text-sm opacity-40">
          {coherent
            ? 'All parts moving as one wave. Flow state.'
            : 'Wave collapsed. Interacting with environment. Friction.'}
        </p>
      </div>
    </div>
  );
};

export const QuantumMeasurementProblem: React.FC = () => {
  const [measured, setMeasured] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        {!measured ? (
          <>
            <p className="text-2xl">Before you look at yourself</p>
            <p className="text-sm opacity-40">You are pure potential</p>
            <div className="h-64 flex items-center justify-center">
              <div className="text-8xl opacity-20 blur-md">∞</div>
            </div>
            <button onClick={() => setMeasured(true)} className="w-full py-4 bg-white text-black">
              Measure
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">You looked</p>
            <p className="text-sm opacity-40">Wave function collapsed</p>
            <div className="h-64 flex items-center justify-center">
              <div className="text-8xl">1</div>
            </div>
            <p className="text-sm opacity-40">
              The measurement changed what you were.
              You can't know what you were before looking.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// Export all
export default {
  SuperpositionStateHolder,
  UncertaintyPrincipleSlider,
  QuantumEntanglementDetector,
  WaveParticleDualityToggle,
  QuantumTunnelingSimulator,
  SchrodingersEmotionalState,
  ProbabilityCloudVisualizer,
  QuantumCoherence,
  QuantumMeasurementProblem
};
