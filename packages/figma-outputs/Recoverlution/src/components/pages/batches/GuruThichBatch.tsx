/**
 * GURU THÍCH NHẤT HẠNH BATCH PAGE
 * 18 NaviCues inspired by Thích Nhất Hạnh's teachings
 */

import React, { useState } from 'react';
import GuruThich from '../../navicues/batches-guru/guru-batch-04-thich';

const navicues = [
  // Interbeing (6)
  { id: 'interbeing', name: 'Interbeing Awareness', component: GuruThich.InterbeingAwareness, desc: 'Everything inter-is' },
  { id: 'interconnection', name: 'Interconnection Mapping', component: GuruThich.InterconnectionMapping, desc: 'Map the web' },
  { id: 'nothing-independent', name: 'Nothing Exists Independently', component: GuruThich.NothingIndependent, desc: 'No separate existence' },
  { id: 'web-life', name: 'Web of Life Visualization', component: GuruThich.WebOfLife, desc: 'See the whole' },
  { id: 'interbeing-practice', name: 'Interbeing Daily Practice', component: GuruThich.InterbeingPractice, desc: 'Live the understanding' },
  { id: 'empty-self', name: 'Empty of Separate Self', component: GuruThich.EmptyOfSeparateSelf, desc: 'No independent self' },
  
  // Mindful Breathing (4)
  { id: 'conscious-breathing', name: 'Conscious Breathing', component: GuruThich.ConsciousBreathing, desc: 'Know you are breathing' },
  { id: 'gathas', name: 'Breathing Gathas', component: GuruThich.BreathingGathas, desc: 'Verses for breathing' },
  { id: 'in-out', name: 'In Out Deep Slow', component: GuruThich.InOutDeepSlow, desc: 'Basic breath practice' },
  { id: 'breath-anchor', name: 'Breath As Anchor', component: GuruThich.BreathAsAnchor, desc: 'Return to breath' },
  
  // Present Moment (4)
  { id: 'present-awareness', name: 'Present Moment Awareness', component: GuruThich.PresentMomentAwareness, desc: 'Only this moment exists' },
  { id: 'here-now', name: 'Here and Now Practice', component: GuruThich.HereAndNowPractice, desc: 'Fully present' },
  { id: 'arriving', name: 'Arriving in the Now', component: GuruThich.ArrivingInTheNow, desc: 'Come home to now' },
  { id: 'stopping', name: 'Stopping and Calming', component: GuruThich.StoppingAndCalming, desc: 'Stop to see clearly' },
  
  // Deep Listening (4)
  { id: 'deep-listening', name: 'Deep Listening Practice', component: GuruThich.DeepListeningPractice, desc: 'Listen with full presence' },
  { id: 'compassionate-listening', name: 'Listening With Compassion', component: GuruThich.ListeningWithCompassion, desc: 'Heart-centered listening' },
  { id: 'loving-speech', name: 'Loving Speech', component: GuruThich.LovingSpeech, desc: 'Words that heal' },
  { id: 'beginning-anew', name: 'Beginning Anew Practice', component: GuruThich.BeginningAnew, desc: 'Fresh start ritual' },
];

interface GuruThichBatchProps {
  onNavigate?: (page: string) => void;
}

export function GuruThichBatch({ onNavigate }: GuruThichBatchProps) {
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
            ← Back to Thích Nhất Hạnh Arsenal
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
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#5739FB' }}>
            GURU BATCH 04
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Thích Nhất Hạnh Collection
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            18 NaviCues: Interbeing, Mindful breathing, Present moment, Deep listening
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>6</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Interbeing</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>4</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Breathing</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>4</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Present</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>4</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Listening</div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {navicues.map((nc, idx) => (
            <button
              key={nc.id}
              onClick={() => setActiveNaviCue(idx)}
              className="p-8 text-left transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                border: '2px solid rgba(87, 57, 251, 0.2)',
              }}
            >
              <div className="text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: '#5739FB' }}>
                THÍCH-{String(idx + 1).padStart(2, '0')}
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

export default GuruThichBatch;
