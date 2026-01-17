/**
 * GURU ALAN WATTS BATCH PAGE
 * 12 Alan Watts NaviCues from batches-guru
 */

import React, { useState } from 'react';
import GuruAlanWatts from '../../navicues/batches-guru/guru-batch-02-alan-watts';

const navicues = [
  { id: 'backwards', name: 'Backwards Law Simulator', component: GuruAlanWatts.BackwardsLawSimulator, desc: 'The more you try, the worse it gets' },
  { id: 'ego', name: 'Ego as Social Fiction', component: GuruAlanWatts.EgoAsSocialFiction, desc: 'Your "self" is a story others told you' },
  { id: 'improv', name: 'Life as Improvisation', component: GuruAlanWatts.LifeAsImprovisation, desc: 'There is no script. There never was.' },
  { id: 'bind', name: 'Double Bind Recognizer', component: GuruAlanWatts.DoubleBindRecognizer, desc: 'Commands that defeat themselves' },
  { id: 'control', name: 'Control Illusion Slider', component: GuruAlanWatts.ControlIllusionSlider, desc: 'Perceived vs actual control (5%)' },
  { id: 'now', name: 'Now Is All There Is', component: GuruAlanWatts.NowIsAllThereIs, desc: 'Past/future as mental constructs' },
  { id: 'void', name: 'Void Is Not Empty', component: GuruAlanWatts.VoidIsNotEmpty, desc: 'Emptiness as potential, not lack' },
  { id: 'thinking', name: 'Thinking About Thinking Trap', component: GuruAlanWatts.ThinkingAboutThinkingTrap, desc: 'Recursive thought loop detector' },
  { id: 'resistance', name: 'Resistance Multiplier', component: GuruAlanWatts.ResistanceMultiplier, desc: 'What you resist persists and grows' },
  { id: 'duality', name: 'Game of Black and White', component: GuruAlanWatts.GameOfBlackAndWhite, desc: 'Dualities are invented, not discovered' },
  { id: 'eternal', name: 'The Eternal Now Button', component: GuruAlanWatts.TheEternalNowButton, desc: 'Every tap is the first tap' },
  { id: 'watcher', name: 'The Watcher Paradox', component: GuruAlanWatts.TheWatcherParadox, desc: 'Who watches the watcher?' },
];

interface GuruAlanWattsBatchProps {
  onNavigate?: (page: string) => void;
}

export function GuruAlanWattsBatch({ onNavigate }: GuruAlanWattsBatchProps) {
  const [activeNaviCue, setActiveNaviCue] = useState<number | null>(null);

  if (activeNaviCue !== null) {
    const NaviCueComponent = navicues[activeNaviCue].component;
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(87, 57, 251, 0.2)' }}>
          <button
            onClick={() => setActiveNaviCue(null)}
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            ← Back to Alan Watts Collection
          </button>
        </div>
        <NaviCueComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          {onNavigate && (
            <button
              onClick={() => onNavigate('navicue-arsenal')}
              className="text-sm mb-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              ← Back to NaviCue Arsenal
            </button>
          )}
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#7B68EE' }}>
            GURU BATCH 02
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Alan Watts Collection
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            12 NaviCues for paradox, effortless action, and dissolving illusions
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {navicues.map((nc, idx) => (
            <button
              key={nc.id}
              onClick={() => setActiveNaviCue(idx)}
              className="p-8 text-left transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'rgba(123, 104, 238, 0.1)',
                border: '2px solid rgba(123, 104, 238, 0.2)',
              }}
            >
              <div className="text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: '#7B68EE' }}>
                AW-{String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#FFFFFF' }}>
                {nc.name}
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {nc.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuruAlanWattsBatch;
