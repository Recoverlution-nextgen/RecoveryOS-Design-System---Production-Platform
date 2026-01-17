/**
 * INFINITE MUSIC BATCH PAGE
 * 9 Music Theory Emotion Architecture NaviCues from batches-infinite
 */

import React, { useState } from 'react';
import InfiniteMusic from '../../navicues/batches-infinite/infinite-batch-02-music';

const navicues = [
  { id: 'key', name: 'Emotional Key Detector', component: InfiniteMusic.EmotionalKeyDetector, desc: 'C Major (innocent) to F# Minor (dark)' },
  { id: 'dissonance', name: 'Dissonance Resolver', component: InfiniteMusic.DissonanceResolver, desc: 'Tension → Resolution mechanic' },
  { id: 'tempo', name: 'Tempo Adjuster', component: InfiniteMusic.TempoAdjuster, desc: 'Internal BPM (Largo to Presto)' },
  { id: 'dynamics', name: 'Dynamics Controller', component: InfiniteMusic.DynamicsController, desc: 'Emotional volume (ppp to fff)' },
  { id: 'rest', name: 'Rest Marker', component: InfiniteMusic.RestMarker, desc: 'Silence as music (rests)' },
  { id: 'harmony', name: 'Harmony Builder', component: InfiniteMusic.HarmonyBuilder, desc: 'Multiple emotions as chord' },
  { id: 'rhythm', name: 'Rhythm Pattern Recognizer', component: InfiniteMusic.RhythmPatternRecognizer, desc: 'Tap your internal pulse' },
  { id: 'contour', name: 'Melodic Contour', component: InfiniteMusic.MelodicContour, desc: 'Shape of your day/week' },
  { id: 'articulation', name: 'Staccato/Legato Toggle', component: InfiniteMusic.StaccatoLegatoToggle, desc: 'Choppy vs smooth time' },
];

interface InfiniteMusicBatchProps {
  onNavigate?: (page: string) => void;
}

export function InfiniteMusicBatch({ onNavigate }: InfiniteMusicBatchProps) {
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
            ← Back to Music Collection
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
            INFINITE BATCH 02
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Music Theory Emotion Architecture
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            9 NaviCues using music theory to map emotional experience
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
                M-{String(idx + 1).padStart(2, '0')}
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

export default InfiniteMusicBatch;
