/**
 * GURU BATCH 02: ALAN WATTS AS DESIGNER
 * "If Alan Watts could code NaviCues, what would he build?"
 * 
 * Design Philosophy:
 * - Paradox as interface pattern
 * - Playful deconstruction of certainty
 * - Eastern philosophy meets Western psychology
 * - The backwards law (trying makes it worse)
 * - Ego as social convention, not reality
 * - Life as improvisation, not script
 * - The eternal now hiding in plain sight
 * 
 * Not copying quotes - channeling design thinking
 */

import React, { useState, useEffect } from 'react';

// ============================================================================
// AW-01: THE BACKWARDS LAW SIMULATOR
// The more you try, the worse it gets
// ============================================================================
export const BackwardsLawSimulator: React.FC = () => {
  const [effort, setEffort] = useState(50);
  const [goal, setGoal] = useState('happiness');

  // Backwards law: effort inversely related to achievement
  const achievement = 100 - effort;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">You want {goal}</p>

        <div className="space-y-4">
          <p className="text-sm opacity-40">How hard are you trying?</p>
          <input
            type="range"
            min="0"
            max="100"
            value={effort}
            onChange={(e) => setEffort(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-center text-2xl">Effort: {effort}%</p>
        </div>

        <div className="p-8 bg-white/5 text-center">
          <p className="text-sm opacity-40">Result</p>
          <p className="text-6xl mt-2">{achievement}%</p>
        </div>

        <p className="text-sm opacity-40 text-center">
          The harder you chase, the faster it runs.
          Stop trying. Let it come to you.
        </p>

        <div className="grid grid-cols-3 gap-2 mt-8">
          {['happiness', 'sleep', 'calm'].map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className={`py-2 text-sm ${goal === g ? 'bg-white text-black' : 'bg-white/10'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// AW-02: EGO AS SOCIAL FICTION
// Your "self" is a story others told you
// ============================================================================
export const EgoAsSocialFiction: React.FC = () => {
  const [layers, setLayers] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');

  const prompts = [
    'Your name (they gave you this)',
    'Your role (they assigned this)',
    'Your identity (they reinforced this)',
    'What remains when you remove all of it?'
  ];

  const currentPrompt = layers.length < 3 ? prompts[layers.length] : prompts[3];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">{currentPrompt}</p>

        {layers.length < 3 ? (
          <>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentInput.trim()) {
                  setLayers([...layers, currentInput]);
                  setCurrentInput('');
                }
              }}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Type and press Enter"
              autoFocus
            />

            {layers.map((layer, i) => (
              <div key={i} className="p-3 bg-white/5 opacity-60">
                <p className="text-xs opacity-40">{prompts[i]}</p>
                <p>{layer}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="space-y-2">
              {layers.map((layer, i) => (
                <div
                  key={i}
                  className="p-3 bg-white/5 opacity-30 line-through"
                >
                  {layer}
                </div>
              ))}
            </div>

            <div className="h-32 flex items-center justify-center border border-white/20">
              <p className="text-6xl opacity-20">?</p>
            </div>

            <p className="text-sm opacity-40 text-center">
              The ego is a social institution, like the metric system.
              Useful, but not real in the way a rock is real.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-03: LIFE AS IMPROVISATION
// There is no script. There never was.
// ============================================================================
export const LifeAsImprovisation: React.FC = () => {
  const [decision, setDecision] = useState('');
  const [realized, setRealized] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!realized ? (
          <>
            <p className="text-2xl">A decision you need to make</p>
            <input
              type="text"
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Type it"
              autoFocus
            />

            {decision && (
              <>
                <p className="text-lg mt-8">You're looking for the "right" answer</p>
                <div className="space-y-2">
                  <button className="w-full py-4 bg-white/5" disabled>
                    The script (doesn't exist)
                  </button>
                  <button className="w-full py-4 bg-white/5" disabled>
                    The plan (doesn't exist)
                  </button>
                  <button className="w-full py-4 bg-white/5" disabled>
                    The correct path (doesn't exist)
                  </button>
                </div>

                <button
                  onClick={() => setRealized(true)}
                  className="w-full py-4 bg-white text-black mt-8"
                >
                  Show me
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">There is only improvisation</p>
            
            <div className="p-8 bg-white/5 text-center">
              <p className="text-sm opacity-40 mb-4">Your decision:</p>
              <p className="text-xl">{decision}</p>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-sm opacity-60">↓</p>
              <p className="text-lg">Make a choice</p>
              <p className="text-sm opacity-60">↓</p>
              <p className="text-lg">Then improvise from there</p>
              <p className="text-sm opacity-60">↓</p>
              <p className="text-lg">That's all anyone is doing</p>
            </div>

            <p className="text-sm opacity-40 text-center mt-8">
              Jazz musicians don't follow a script. Neither does life.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-04: THE DOUBLE BIND
// Damned if you do, damned if you don't - recognize the trap
// ============================================================================
export const DoubleBindRecognizer: React.FC = () => {
  const [bind, setBind] = useState('');
  const [recognized, setRecognized] = useState(false);

  const examples = [
    'Try to be spontaneous',
    'Don\'t think about it',
    'Just relax',
    'Be yourself (naturally)',
    'Try not to try'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Caught in a double bind?</p>
        <p className="text-sm opacity-40">Command that defeats itself</p>

        <div className="space-y-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setBind(ex);
                setRecognized(false);
              }}
              className={`w-full py-3 text-left px-4 ${bind === ex ? 'bg-white text-black' : 'bg-white/5'}`}
            >
              "{ex}"
            </button>
          ))}
        </div>

        {bind && !recognized && (
          <>
            <div className="p-6 bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-lg">"{bind}"</p>
              <p className="text-sm opacity-40 mt-4">This is impossible</p>
            </div>

            <button
              onClick={() => setRecognized(true)}
              className="w-full py-4 bg-white text-black"
            >
              See the trap
            </button>
          </>
        )}

        {recognized && (
          <>
            <div className="space-y-4 text-center">
              <p className="text-xl">The bind:</p>
              <p className="text-2xl italic">"{bind}"</p>
              <p className="text-sm opacity-60 mt-4">↓</p>
              <p className="text-lg">Recognition dissolves it</p>
              <p className="text-sm opacity-40 mt-4">
                You can't follow the command. So stop trying.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-05: CONTROL ILLUSION SLIDER
// How much control do you think you have vs. reality?
// ============================================================================
export const ControlIllusionSlider: React.FC = () => {
  const [perceived, setPerceived] = useState(50);
  const [revealed, setRevealed] = useState(false);

  const actualControl = 5; // Spoiler: very little

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">How much control do you have over your life?</p>

        <input
          type="range"
          min="0"
          max="100"
          value={perceived}
          onChange={(e) => setPerceived(parseInt(e.target.value))}
          className="w-full"
        />

        <div className="text-center">
          <p className="text-sm opacity-40">You think:</p>
          <p className="text-6xl">{perceived}%</p>
        </div>

        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-4 bg-white text-black"
          >
            Show reality
          </button>
        )}

        {revealed && (
          <>
            <div className="p-8 bg-white/5 text-center">
              <p className="text-sm opacity-40">Actual control:</p>
              <p className="text-6xl">{actualControl}%</p>
            </div>

            <div className="space-y-2 text-sm opacity-60">
              <p>You didn't choose your:</p>
              <ul className="list-none space-y-1 pl-4">
                <li>• Birth</li>
                <li>• Genes</li>
                <li>• Family</li>
                <li>• Next thought</li>
                <li>• Heart beating</li>
                <li>• Death timing</li>
              </ul>
            </div>

            <p className="text-sm opacity-40 text-center mt-6">
              The illusion of control creates anxiety.
              Accepting the flow creates peace.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-06: NOW IS ALL THERE IS
// Past and future are mental constructs happening now
// ============================================================================
export const NowIsAllThereIs: React.FC = () => {
  const [thinkingAbout, setThinkingAbout] = useState<'past' | 'future' | null>(null);
  const [realized, setRealized] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Where is your mind?</p>

        <div className="space-y-3">
          <button
            onClick={() => setThinkingAbout('past')}
            className={`w-full py-6 ${thinkingAbout === 'past' ? 'bg-blue-500' : 'bg-white/5'}`}
          >
            Replaying the past
          </button>
          <button
            onClick={() => setThinkingAbout('future')}
            className={`w-full py-6 ${thinkingAbout === 'future' ? 'bg-red-500' : 'bg-white/5'}`}
          >
            Worrying about the future
          </button>
        </div>

        {thinkingAbout && !realized && (
          <>
            <div className="p-6 bg-white/5 text-center">
              <p className="text-lg">
                You are thinking about the {thinkingAbout}
              </p>
            </div>

            <button
              onClick={() => setRealized(true)}
              className="w-full py-4 bg-white text-black"
            >
              When is that happening?
            </button>
          </>
        )}

        {realized && (
          <>
            <div className="space-y-6 text-center">
              <p className="text-xl">The thinking is happening</p>
              <p className="text-6xl">NOW</p>
              <p className="text-sm opacity-40 mt-4">
                The {thinkingAbout} exists only as a thought in this present moment.
                There is nowhere else to be.
              </p>
            </div>

            <div className="h-32 flex items-center justify-center mt-8">
              <div className="w-32 h-32 border border-white animate-pulse" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-07: THE VOID IS NOT EMPTY
// Silence contains all sound, space contains all form
// ============================================================================
export const VoidIsNotEmpty: React.FC = () => {
  const [stage, setStage] = useState<'see-void' | 'see-fullness'>('see-void');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {stage === 'see-void' ? (
          <>
            <p className="text-2xl">Look at the emptiness</p>
            <div className="h-64 border border-white/20" />
            <p className="text-sm opacity-40">Nothing here</p>
            <button
              onClick={() => setStage('see-fullness')}
              className="w-full py-4 bg-white text-black mt-8"
            >
              Look again
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">The void is pregnant</p>
            <div className="h-64 border border-white/20 flex items-center justify-center">
              <div className="text-sm opacity-60 space-y-2">
                <p>Contains all possible forms</p>
                <p>Silence holds all sound</p>
                <p>Space allows all movement</p>
                <p>Nothing enables everything</p>
              </div>
            </div>
            <p className="text-sm opacity-40 mt-4">
              Emptiness is not lack. It's potential.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-08: THINKING ABOUT THINKING TRAP
// The problem isn't the problem, it's thinking about the problem
// ============================================================================
export const ThinkingAboutThinkingTrap: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [layers, setLayers] = useState(0);

  const layerDescriptions = [
    'The problem',
    'Thinking about the problem',
    'Thinking about thinking about the problem',
    'Thinking about thinking about thinking...',
    'You see the trap'
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {layers === 0 ? (
          <>
            <p className="text-2xl">What's the problem?</p>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
              placeholder="Type it"
              autoFocus
            />
            {problem && (
              <button
                onClick={() => setLayers(1)}
                className="w-full py-4 bg-white text-black"
              >
                Next
              </button>
            )}
          </>
        ) : layers < 4 ? (
          <>
            <p className="text-2xl">{layerDescriptions[layers]}</p>
            
            {Array.from({ length: layers }).map((_, i) => (
              <div
                key={i}
                className="p-4 border border-white/20"
                style={{ marginLeft: `${i * 20}px`, marginRight: `${i * 20}px` }}
              >
                <p className="text-sm opacity-60">{layerDescriptions[i]}</p>
              </div>
            ))}

            <button
              onClick={() => setLayers(layers + 1)}
              className="w-full py-4 bg-white text-black"
            >
              Keep thinking about it
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">The trap revealed</p>
            <p className="text-sm opacity-40">Original problem: {problem}</p>
            
            <div className="p-6 bg-white/5 text-center">
              <p className="text-lg">You've added {layers - 1} layers of thinking</p>
              <p className="text-sm opacity-40 mt-4">None of which solved anything</p>
            </div>

            <p className="text-sm opacity-60 text-center">
              The problem isn't the problem.
              The problem is the recursive thinking about the problem.
              Stop thinking. Do something. Or do nothing. But stop the loop.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-09: RESISTANCE = SUFFERING MULTIPLIER
// What you resist persists and grows
// ============================================================================
export const ResistanceMultiplier: React.FC = () => {
  const [experience, setExperience] = useState('');
  const [resistance, setResistance] = useState(50);

  const suffering = resistance;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <p className="text-2xl">Something you don't want to feel</p>
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:outline-none focus:border-white"
          placeholder="Sadness, anger, fear..."
          autoFocus
        />

        {experience && (
          <>
            <p className="text-lg mt-8">How much are you resisting it?</p>
            <input
              type="range"
              min="0"
              max="100"
              value={resistance}
              onChange={(e) => setResistance(parseInt(e.target.value))}
              className="w-full"
            />

            <div className="space-y-4">
              <div className="p-4 bg-white/5">
                <p className="text-sm opacity-40">The feeling:</p>
                <p className="text-xl">{experience}</p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20">
                <p className="text-sm opacity-40">Your resistance:</p>
                <p className="text-4xl">{resistance}%</p>
              </div>

              <div className="p-6 bg-white/5 text-center">
                <p className="text-sm opacity-40">Suffering level:</p>
                <p className="text-6xl">{suffering}%</p>
              </div>
            </div>

            <p className="text-sm opacity-40 text-center">
              {resistance > 70 && "High resistance = high suffering. What you resist persists."}
              {resistance <= 70 && resistance > 30 && "Moderate resistance = moderate suffering."}
              {resistance <= 30 && "Low resistance = the feeling moves through. Acceptance is peace."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// AW-10: THE GAME OF BLACK AND WHITE
// Dualities are invented, not discovered
// ============================================================================
export const GameOfBlackAndWhite: React.FC = () => {
  const [pairs, setPairs] = useState<Array<[string, string]>>([]);
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [revealed, setRevealed] = useState(false);

  const examplePairs: Array<[string, string]> = [
    ['Good', 'Bad'],
    ['Success', 'Failure'],
    ['Right', 'Wrong'],
    ['Light', 'Dark']
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        {!revealed ? (
          <>
            <p className="text-2xl">Name a pair of opposites</p>
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={left}
                onChange={(e) => setLeft(e.target.value)}
                className="bg-transparent border-b border-white/20 py-2 text-center focus:outline-none focus:border-white"
                placeholder="Light"
              />
              <input
                type="text"
                value={right}
                onChange={(e) => setRight(e.target.value)}
                className="bg-transparent border-b border-white/20 py-2 text-center focus:outline-none focus:border-white"
                placeholder="Dark"
              />
            </div>

            {left && right && (
              <button
                onClick={() => {
                  setPairs([...pairs, [left, right]]);
                  setLeft('');
                  setRight('');
                }}
                className="w-full py-3 bg-white text-black"
              >
                Add pair
              </button>
            )}

            {pairs.length > 0 && (
              <>
                <div className="space-y-2">
                  {pairs.map((pair, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4 p-3 bg-white/5">
                      <span className="text-right">{pair[0]}</span>
                      <span className="text-left">{pair[1]}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setRevealed(true)}
                  className="w-full py-4 bg-white text-black"
                >
                  See the truth
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">They define each other</p>
            
            {pairs.map((pair, i) => (
              <div key={i} className="text-center space-y-2">
                <p className="text-lg">{pair[0]} exists because {pair[1]} exists</p>
                <p className="text-sm opacity-40">Remove one, the other disappears</p>
              </div>
            ))}

            <div className="p-6 bg-white/5 text-center mt-8">
              <p className="text-sm opacity-40">The game:</p>
              <p className="text-lg mt-2">
                All opposites are two sides of one thing.
                The division is useful, but not ultimate.
              </p>
            </div>

            <p className="text-sm opacity-40 text-center">
              Good/bad, right/wrong, success/failure - all invented categories.
              Reality doesn't come pre-sliced.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Watts-inspired rapid additions (11-20)
// ============================================================================

export const TheEternalNowButton: React.FC = () => {
  const [taps, setTaps] = useState(0);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="text-2xl">Every tap is the first tap</p>
        <button
          onClick={() => setTaps(taps + 1)}
          className="w-full py-24 bg-white text-black text-6xl"
        >
          NOW
        </button>
        <p className="text-sm opacity-40">Taps: {taps} (all happening now)</p>
      </div>
    </div>
  );
};

export const TheWatcherParadox: React.FC = () => {
  const [watching, setWatching] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        {!watching ? (
          <>
            <p className="text-2xl">Watch your thoughts</p>
            <button onClick={() => setWatching(true)} className="w-full py-8 bg-white text-black">
              Begin watching
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl">Who is doing the watching?</p>
            <p className="text-sm opacity-40 mt-8">
              If "you" are watching "your thoughts", who is this "you"?
              And isn't the thought "I am watching" also a thought?
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// Export all
export default {
  BackwardsLawSimulator,
  EgoAsSocialFiction,
  LifeAsImprovisation,
  DoubleBindRecognizer,
  ControlIllusionSlider,
  NowIsAllThereIs,
  VoidIsNotEmpty,
  ThinkingAboutThinkingTrap,
  ResistanceMultiplier,
  GameOfBlackAndWhite,
  TheEternalNowButton,
  TheWatcherParadox
};
