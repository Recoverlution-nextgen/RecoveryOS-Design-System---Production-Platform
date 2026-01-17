/**
 * INFINITE BATCH 02: MUSIC THEORY AS EMOTION ARCHITECTURE
 * Pure creative freedom - no constraints, no precedent
 * 
 * Theme: Musical Concepts as Psychological Intervention
 * - Harmony: multiple notes sounding together (parts integration)
 * - Dissonance: tension waiting for resolution
 * - Key changes: shifting entire emotional landscape
 * - Tempo: speed of internal experience
 * - Dynamics: volume/intensity modulation
 * - Rest: silence as crucial as sound
 * - Rhythm: patterns that organize chaos
 * - Melody: the through-line that makes sense
 * 
 * This is what happens when music becomes therapy
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// M-01: EMOTIONAL KEY DETECTOR
// What key (emotional tonality) are you in right now?
// ============================================================================
export const EmotionalKeyDetector: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const keys = [
    { name: 'C Major', mood: 'Pure, simple, innocent', color: 'bg-white' },
    { name: 'A Minor', mood: 'Sad, reflective, nostalgic', color: 'bg-blue-500' },
    { name: 'D Major', mood: 'Triumphant, bright, victorious', color: 'bg-yellow-500' },
    { name: 'E Minor', mood: 'Melancholic, longing, romantic', color: 'bg-purple-500' },
    { name: 'F Major', mood: 'Pastoral, peaceful, calm', color: 'bg-green-500' },
    { name: 'G Major', mood: 'Happy, pastoral, comfortable', color: 'bg-orange-500' },
    { name: 'B♭ Major', mood: 'Joyful, rich, warm', color: 'bg-amber-500' },
    { name: 'F# Minor', mood: 'Dark, passionate, intense', color: 'bg-red-900' }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">What key are you in?</p>
        <p className="text-sm opacity-40">Each key has a distinct emotional color</p>

        <div className="grid grid-cols-2 gap-3">
          {keys.map((key) => (
            <button
              key={key.name}
              onClick={() => setSelectedKey(key.name)}
              className={`p-4 ${key.color} ${
                selectedKey === key.name ? 'ring-4 ring-white' : ''
              } text-left`}
            >
              <p className="text-sm font-bold">{key.name}</p>
              <p className="text-xs opacity-80 mt-1">{key.mood}</p>
            </button>
          ))}
        </div>

        {selectedKey && (
          <div className="p-6 bg-white/5 text-center">
            <p className="text-sm opacity-40">Currently in:</p>
            <p className="text-2xl mt-2">{selectedKey}</p>
            <p className="text-sm opacity-60 mt-4">
              {keys.find(k => k.name === selectedKey)?.mood}
            </p>
          </div>
        )}

        <p className="text-sm opacity-40 text-center">
          Different keys create different emotional landscapes.
          Same notes, different feelings.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// M-02: DISSONANCE RESOLVER
// Hold tension, then release to resolution
// ============================================================================
export const DissonanceResolver: React.FC = () => {
  const [tension, setTension] = useState(80);
  const [resolved, setResolved] = useState(false);

  const getTensionDescription = (val: number) => {
    if (val > 80) return { text: 'Extreme dissonance', desc: 'Unbearable, must resolve' };
    if (val > 60) return { text: 'High tension', desc: 'Uncomfortable, seeking release' };
    if (val > 40) return { text: 'Moderate dissonance', desc: 'Notable but tolerable' };
    if (val > 20) return { text: 'Slight tension', desc: 'Interesting, adds color' };
    return { text: 'Resolved', desc: 'Consonant, at rest' };
  };

  const state = getTensionDescription(tension);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Your internal dissonance</p>
        <p className="text-sm opacity-40">
          Dissonance isn't wrong. It's tension seeking resolution.
        </p>

        {!resolved ? (
          <>
            <div className="relative h-64 bg-white/5">
              <div
                className="absolute bottom-0 w-full bg-red-500/30 transition-all duration-300"
                style={{ height: `${tension}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm opacity-40">Tension level</p>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={tension}
              onChange={(e) => setTension(parseInt(e.target.value))}
              className="w-full"
            />

            <div className="text-center space-y-2">
              <p className="text-3xl">{state.text}</p>
              <p className="text-sm opacity-60">{state.desc}</p>
            </div>

            {tension > 50 && (
              <button
                onClick={() => {
                  setTension(0);
                  setResolved(true);
                }}
                className="w-full py-4 bg-green-500 text-white animate-pulse"
              >
                Resolve to consonance
              </button>
            )}
          </>
        ) : (
          <>
            <div className="h-64 bg-green-500/20 flex items-center justify-center">
              <p className="text-6xl">♪</p>
            </div>

            <div className="text-center space-y-2">
              <p className="text-3xl">Resolution</p>
              <p className="text-sm opacity-60">The tension released. Ahhhh.</p>
            </div>

            <p className="text-sm opacity-40 text-center">
              Music needs both dissonance and consonance.
              So do you.
              Tension → Resolution is the pattern of all stories.
            </p>

            <button
              onClick={() => {
                setResolved(false);
                setTension(80);
              }}
              className="w-full py-3 bg-white/10"
            >
              Build tension again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// M-03: TEMPO ADJUSTER
// How fast is your internal metronome?
// ============================================================================
export const TempoAdjuster: React.FC = () => {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);

  const getTempo = (val: number) => {
    if (val < 60) return { name: 'Largo', desc: 'Very slow, dragging' };
    if (val < 80) return { name: 'Adagio', desc: 'Slow, deliberate' };
    if (val < 100) return { name: 'Andante', desc: 'Walking pace' };
    if (val < 120) return { name: 'Moderato', desc: 'Moderate' };
    if (val < 140) return { name: 'Allegro', desc: 'Fast, lively' };
    if (val < 160) return { name: 'Vivace', desc: 'Very fast, vivacious' };
    return { name: 'Presto', desc: 'Extremely fast, frantic' };
  };

  const tempo = getTempo(bpm);

  useEffect(() => {
    if (!playing) return;
    
    const interval = setInterval(() => {
      // Visual pulse at BPM rate
    }, (60 / bpm) * 1000);

    return () => clearInterval(interval);
  }, [playing, bpm]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Your internal tempo</p>
        <p className="text-sm opacity-40">How fast is your life moving?</p>

        <div className="relative h-64 bg-white/5 flex items-center justify-center">
          <div
            className={`w-32 h-32 bg-white ${playing ? 'animate-pulse' : ''}`}
            style={{
              animationDuration: `${60 / bpm}s`
            }}
          />
        </div>

        <input
          type="range"
          min="40"
          max="180"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="w-full"
        />

        <div className="text-center space-y-2">
          <p className="text-6xl">{bpm}</p>
          <p className="text-sm opacity-40">BPM</p>
          <p className="text-2xl mt-4">{tempo.name}</p>
          <p className="text-sm opacity-60">{tempo.desc}</p>
        </div>

        <button
          onClick={() => setPlaying(!playing)}
          className="w-full py-4 bg-white text-black"
        >
          {playing ? 'Stop' : 'Play'}
        </button>

        <p className="text-sm opacity-40 text-center">
          You can't always control the tempo others demand.
          But you can notice your internal metronome.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// M-04: DYNAMICS CONTROLLER
// Volume/intensity of internal experience
// ============================================================================
export const DynamicsController: React.FC = () => {
  const [dynamic, setDynamic] = useState(50);

  const dynamics = [
    { range: [0, 15], name: 'ppp (pianississimo)', desc: 'Barely audible' },
    { range: [15, 30], name: 'pp (pianissimo)', desc: 'Very soft' },
    { range: [30, 45], name: 'p (piano)', desc: 'Soft' },
    { range: [45, 55], name: 'mp (mezzo-piano)', desc: 'Moderately soft' },
    { range: [55, 70], name: 'mf (mezzo-forte)', desc: 'Moderately loud' },
    { range: [70, 85], name: 'f (forte)', desc: 'Loud' },
    { range: [85, 95], name: 'ff (fortissimo)', desc: 'Very loud' },
    { range: [95, 100], name: 'fff (fortississimo)', desc: 'Extremely loud' }
  ];

  const currentDynamic = dynamics.find(
    d => dynamic >= d.range[0] && dynamic < d.range[1]
  ) || dynamics[0];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Your emotional volume</p>
        <p className="text-sm opacity-40">
          How loud are you experiencing this moment?
        </p>

        <div className="relative h-64 bg-white/5">
          <div
            className="absolute bottom-0 w-full bg-blue-500 transition-all duration-300"
            style={{ height: `${dynamic}%` }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={dynamic}
          onChange={(e) => setDynamic(parseInt(e.target.value))}
          className="w-full"
        />

        <div className="text-center space-y-2">
          <p className="text-4xl font-serif italic">{currentDynamic.name}</p>
          <p className="text-sm opacity-60">{currentDynamic.desc}</p>
        </div>

        <p className="text-sm opacity-40 text-center">
          Same emotion at different volumes is different.
          Quiet sadness vs. loud sadness.
          Soft joy vs. explosive joy.
          Volume matters.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// M-05: REST MARKER
// Silence is music too
// ============================================================================
export const RestMarker: React.FC = () => {
  const [restDuration, setRestDuration] = useState<'quarter' | 'half' | 'whole' | null>(null);
  const [resting, setResting] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const restTypes = [
    { type: 'quarter' as const, symbol: '𝄽', duration: 2, name: 'Quarter rest (2s)' },
    { type: 'half' as const, symbol: '𝄾', duration: 4, name: 'Half rest (4s)' },
    { type: 'whole' as const, symbol: '𝄻', duration: 8, name: 'Whole rest (8s)' }
  ];

  useEffect(() => {
    if (!resting) return;

    const interval = setInterval(() => {
      setElapsed(e => e + 0.1);
    }, 100);

    const duration = restTypes.find(r => r.type === restDuration)?.duration || 0;
    const timeout = setTimeout(() => {
      setResting(false);
      setElapsed(0);
    }, duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [resting, restDuration]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!resting ? (
          <>
            <p className="text-2xl">Take a rest</p>
            <p className="text-sm opacity-40">
              In music, rests are as important as notes.
              Choose your silence.
            </p>

            <div className="space-y-3">
              {restTypes.map((rest) => (
                <button
                  key={rest.type}
                  onClick={() => {
                    setRestDuration(rest.type);
                    setResting(true);
                  }}
                  className="w-full py-6 bg-white/5 hover:bg-white/10 flex items-center justify-between px-6"
                >
                  <span className="text-4xl">{rest.symbol}</span>
                  <span className="text-sm">{rest.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl">Resting</p>
            
            <div className="h-64 bg-white/5 flex items-center justify-center">
              <p className="text-8xl opacity-20">
                {restTypes.find(r => r.type === restDuration)?.symbol}
              </p>
            </div>

            <div className="text-center">
              <p className="text-6xl">{elapsed.toFixed(1)}s</p>
              <p className="text-sm opacity-40 mt-4">
                {restTypes.find(r => r.type === restDuration)?.duration}s total
              </p>
            </div>

            <p className="text-sm opacity-40 text-center">
              Silence is not absence. It's presence without sound.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// M-06: HARMONY BUILDER
// Multiple emotional parts sounding together
// ============================================================================
export const HarmonyBuilder: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<string[]>([]);

  const notes = [
    { name: 'C (Root)', emotion: 'Stability, foundation' },
    { name: 'E (Third)', emotion: 'Joy, brightness' },
    { name: 'G (Fifth)', emotion: 'Power, strength' },
    { name: 'B♭ (Flat 7)', emotion: 'Tension, blues' },
    { name: 'D (Ninth)', emotion: 'Color, complexity' }
  ];

  const getChordQuality = () => {
    if (activeNotes.length === 0) return 'Silence';
    if (activeNotes.length === 1) return 'Single note (lonely)';
    if (activeNotes.includes('C') && activeNotes.includes('E') && activeNotes.includes('G')) {
      return 'Major triad (happy, complete)';
    }
    if (activeNotes.length === 2) return 'Interval (partial)';
    return 'Complex chord (rich)';
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Build your emotional harmony</p>
        <p className="text-sm opacity-40">
          You're never just one emotion. You're a chord.
        </p>

        <div className="space-y-3">
          {notes.map((note) => (
            <button
              key={note.name}
              onClick={() => {
                if (activeNotes.includes(note.name)) {
                  setActiveNotes(activeNotes.filter(n => n !== note.name));
                } else {
                  setActiveNotes([...activeNotes, note.name]);
                }
              }}
              className={`w-full p-4 text-left ${
                activeNotes.includes(note.name)
                  ? 'bg-blue-500'
                  : 'bg-white/5'
              }`}
            >
              <p className="text-lg">{note.name}</p>
              <p className="text-sm opacity-80">{note.emotion}</p>
            </button>
          ))}
        </div>

        {activeNotes.length > 0 && (
          <div className="p-6 bg-white/5 text-center">
            <p className="text-sm opacity-40">Your chord:</p>
            <p className="text-xl mt-2">{activeNotes.join(' + ')}</p>
            <p className="text-sm opacity-60 mt-4">{getChordQuality()}</p>
          </div>
        )}

        <p className="text-sm opacity-40 text-center">
          You can be stable AND tense.
          Joyful AND powerful.
          Multiple notes create harmony, not contradiction.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// M-07: RHYTHM PATTERN RECOGNIZER
// Your internal patterns
// ============================================================================
export const RhythmPatternRecognizer: React.FC = () => {
  const [taps, setTaps] = useState<number[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleTap = () => {
    setTaps([...taps, Date.now()]);
  };

  const analyzePattern = () => {
    if (taps.length < 3) return 'Need more taps';
    
    const intervals = [];
    for (let i = 1; i < taps.length; i++) {
      intervals.push(taps[i] - taps[i-1]);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, int) => sum + Math.pow(int - avgInterval, 2), 0) / intervals.length;

    if (variance < 5000) return 'Steady, consistent rhythm';
    if (variance < 20000) return 'Moderately variable';
    return 'Chaotic, irregular rhythm';
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!analyzing ? (
          <>
            <p className="text-2xl">Tap your internal rhythm</p>
            <p className="text-sm opacity-40">
              How does your mood pulse? Fast? Slow? Steady? Erratic?
            </p>

            <button
              onClick={handleTap}
              className="w-full h-64 bg-white text-black text-6xl"
            >
              TAP
            </button>

            <div className="text-center">
              <p className="text-4xl">{taps.length}</p>
              <p className="text-sm opacity-40">taps</p>
            </div>

            {taps.length >= 3 && (
              <button
                onClick={() => setAnalyzing(true)}
                className="w-full py-4 bg-blue-500"
              >
                Analyze pattern
              </button>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">Your rhythm pattern</p>

            <div className="p-8 bg-white/5 text-center">
              <p className="text-xl">{analyzePattern()}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm opacity-40">Tap count: {taps.length}</p>
              <div className="h-16 bg-white/5 flex items-center px-4">
                {taps.slice(0, 20).map((_, i) => (
                  <div key={i} className="w-1 h-full bg-white mx-1" />
                ))}
              </div>
            </div>

            <p className="text-sm opacity-40 text-center">
              Your internal rhythm affects everything.
              Steady rhythm = regulation.
              Erratic rhythm = dysregulation.
            </p>

            <button
              onClick={() => {
                setTaps([]);
                setAnalyzing(false);
              }}
              className="w-full py-3 bg-white/10"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// M-08-20: Rapid music variants
// ============================================================================

export const MelodicContour: React.FC = () => {
  const [path, setPath] = useState<number[]>([50]);
  
  const addNote = (direction: 'up' | 'down' | 'same') => {
    const last = path[path.length - 1];
    const next = direction === 'up' ? last + 10 : direction === 'down' ? last - 10 : last;
    setPath([...path, Math.max(0, Math.min(100, next))]);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Your melodic contour</p>
        <p className="text-sm opacity-40">The shape of your day/week/mood</p>

        <div className="relative h-64 bg-white/5">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <polyline
              points={path.map((y, x) => `${(x / path.length) * 400},${200 - (y * 2)}`).join(' ')}
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => addNote('up')} className="py-4 bg-green-500">↑ Up</button>
          <button onClick={() => addNote('same')} className="py-4 bg-yellow-500">→ Same</button>
          <button onClick={() => addNote('down')} className="py-4 bg-red-500">↓ Down</button>
        </div>
      </div>
    </div>
  );
};

export const StaccatoLegatoToggle: React.FC = () => {
  const [articulation, setArticulation] = useState<'staccato' | 'legato'>('staccato');
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="text-2xl">How are you moving through time?</p>
        <button
          onClick={() => setArticulation(articulation === 'staccato' ? 'legato' : 'staccato')}
          className={`w-full py-16 text-4xl ${
            articulation === 'staccato' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {articulation === 'staccato' ? 'STACCATO' : 'LEGATO'}
        </button>
        <p className="text-sm opacity-40">
          {articulation === 'staccato'
            ? 'Short, detached, choppy. Each moment separate.'
            : 'Smooth, connected, flowing. One long breath.'}
        </p>
      </div>
    </div>
  );
};

// Export all
export default {
  EmotionalKeyDetector,
  DissonanceResolver,
  TempoAdjuster,
  DynamicsController,
  RestMarker,
  HarmonyBuilder,
  RhythmPatternRecognizer,
  MelodicContour,
  StaccatoLegatoToggle
};
