/**
 * GURU PEMA CHÖDRÖN BATCH PAGE
 * 20 NaviCues inspired by Pema Chödrön's teachings
 */

import React, { useState } from 'react';
import GuruPema from '../../navicues/batches-guru/guru-batch-03-pema';

const navicues = [
  // Groundlessness (5)
  { id: 'groundlessness', name: 'Groundlessness Acceptance', component: GuruPema.GroundlessnessAcceptance, desc: 'Rest in uncertainty' },
  { id: 'no-solid-ground', name: 'No Solid Ground Recognition', component: GuruPema.NoSolidGround, desc: 'Nothing to stand on' },
  { id: 'falling-space', name: 'Falling Into Space', component: GuruPema.FallingIntoSpace, desc: 'Free fall without panic' },
  { id: 'letting-go', name: 'Letting Go of Security', component: GuruPema.LettingGoOfSecurity, desc: 'Release the handrail' },
  { id: 'impermanence', name: 'Impermanence Awareness', component: GuruPema.ImpermanenceAwareness, desc: 'Everything changes' },
  
  // Shenpa (5)
  { id: 'shenpa-recognition', name: 'Shenpa Recognition', component: GuruPema.ShenpaRecognition, desc: 'Notice the hook' },
  { id: 'shenpa-interruption', name: 'Shenpa Interruption Practice', component: GuruPema.ShenpaInterruption, desc: 'Break the chain' },
  { id: 'urge-recognition', name: 'Urge Recognition', component: GuruPema.UrgeRecognition, desc: 'Feel the pull' },
  { id: 'hook-moments', name: 'Hook Moments Tracker', component: GuruPema.HookMoments, desc: 'When you get caught' },
  { id: 'shenpa-patterns', name: 'Shenpa Patterns Identifier', component: GuruPema.ShenpaPatterns, desc: 'Your recurring hooks' },
  
  // Warrior Spirit (5)
  { id: 'warrior-training', name: 'Warrior Training', component: GuruPema.WarriorTraining, desc: 'Spiritual warrior path' },
  { id: 'fearlessness', name: 'Fearlessness in Softness', component: GuruPema.FearlessnessInSoftness, desc: 'Strength through tenderness' },
  { id: 'bodhichitta', name: 'Bodhichitta', component: GuruPema.Bodhichitta, desc: 'Awakened heart' },
  { id: 'bravery', name: 'Bravery in Vulnerability', component: GuruPema.BraveryInVulnerability, desc: 'Courage to stay open' },
  { id: 'warrior-practices', name: 'Warrior Practices', component: GuruPema.WarriorPractices, desc: 'Daily warrior cultivation' },
  
  // Tonglen (5)
  { id: 'tonglen', name: 'Tonglen Practice', component: GuruPema.TonglenPractice, desc: 'Giving and receiving' },
  { id: 'breathing-pain', name: 'Breathing In Pain', component: GuruPema.BreathingInPain, desc: 'Take in suffering' },
  { id: 'sending-relief', name: 'Sending Out Relief', component: GuruPema.SendingOutRelief, desc: 'Give peace' },
  { id: 'reversing', name: 'Reversing the Habit', component: GuruPema.ReversingHabit, desc: 'Opposite of instinct' },
  { id: 'compassion', name: 'Compassion Cultivation', component: GuruPema.CompassionCultivation, desc: 'Grow the heart' },
];

interface GuruPemaBatchProps {
  onNavigate?: (page: string) => void;
}

export function GuruPemaBatch({ onNavigate }: GuruPemaBatchProps) {
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
            ← Back to Pema Chödrön Arsenal
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
            GURU BATCH 03
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#FFFFFF' }}>
            Pema Chödrön Collection
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            20 NaviCues: Groundlessness, Shenpa, Warrior spirit, Tonglen
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>5</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Groundlessness</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>5</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Shenpa</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>5</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Warrior Spirit</div>
          </div>
          <div className="p-4 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-1" style={{ color: '#5739FB' }}>5</div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Tonglen</div>
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
                PEMA-{String(idx + 1).padStart(2, '0')}
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

export default GuruPemaBatch;
