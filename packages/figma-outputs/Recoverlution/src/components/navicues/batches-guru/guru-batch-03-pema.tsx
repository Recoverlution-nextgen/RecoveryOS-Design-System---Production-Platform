/**
 * GURU BATCH 03: PEMA CHÖDRÖN
 * 20 NaviCues from Buddhist nun teaching American Tibetan Buddhism
 * Core themes: Groundlessness, Shenpa, Warrior spirit, Tonglen, Comfortable with uncertainty
 */

import React, { useState } from 'react';

// ============================================================================
// GROUNDLESSNESS (5 NaviCues)
// ============================================================================

export function GroundlessnessAcceptance() {
  const [comfort, setComfort] = useState(5);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Groundlessness</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          The ground is always shifting. There is no solid ground. How comfortable are you with this?
        </p>

        <div className="mb-8">
          <input
            type="range"
            min="0"
            max="10"
            value={comfort}
            onChange={(e) => setComfort(parseInt(e.target.value))}
            className="w-full h-2 mb-4"
            style={{ accentColor: '#5739FB' }}
          />
          <div className="text-3xl mb-4" style={{ color: '#5739FB' }}>{comfort}/10</div>
        </div>

        <div className="p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {comfort <= 3 && 'You crave certainty. The groundlessness terrifies you.'}
            {comfort > 3 && comfort <= 6 && 'You are learning. Sometimes you can let go.'}
            {comfort > 6 && comfort <= 8 && 'You are becoming comfortable with uncertainty.'}
            {comfort > 8 && 'You rest in groundlessness. You know there is nothing to hold onto.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function NoSolidGround() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>No Solid Ground Recognition - Coming Soon</div>;
}

export function FallingIntoSpace() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Falling Into Space - Coming Soon</div>;
}

export function LettingGoOfSecurity() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Letting Go of Security - Coming Soon</div>;
}

export function ImpermanenceAwareness() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Impermanence Awareness - Coming Soon</div>;
}

// ============================================================================
// SHENPA (Attachment/Hooked Quality) (5 NaviCues)
// ============================================================================

export function ShenpaRecognition() {
  const [moments, setMoments] = useState<string[]>([]);
  const [current, setCurrent] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl mb-4" style={{ color: '#FFFFFF' }}>Shenpa Recognition</h1>
        <p className="text-lg mb-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Shenpa is the urge, the hook, the charge. When did you get hooked today?
        </p>

        <input
          type="text"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && current.trim()) {
              setMoments([...moments, current.trim()]);
              setCurrent('');
            }
          }}
          placeholder="Type a moment when you got hooked..."
          className="w-full p-4 mb-6"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '2px solid rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
          }}
        />

        <div className="space-y-3">
          {moments.map((moment, idx) => (
            <div key={idx} className="p-4" style={{ backgroundColor: 'rgba(87, 57, 251, 0.15)' }}>
              <div style={{ color: '#FFFFFF' }}>{moment}</div>
            </div>
          ))}
        </div>

        {moments.length > 0 && (
          <div className="mt-8 p-6 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-2xl mb-2" style={{ color: '#5739FB' }}>{moments.length}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Times you noticed the hook</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ShenpaInterruption() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Shenpa Interruption Practice - Coming Soon</div>;
}

export function UrgeRecognition() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Urge Recognition - Coming Soon</div>;
}

export function HookMoments() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Hook Moments Tracker - Coming Soon</div>;
}

export function ShenpaPatterns() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Shenpa Patterns Identifier - Coming Soon</div>;
}

// WARRIOR SPIRIT (5 NaviCues)
export function WarriorTraining() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Warrior Training - Coming Soon</div>;
}

export function FearlessnessInSoftness() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Fearlessness in Softness - Coming Soon</div>;
}

export function Bodhichitta() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Bodhichitta (Awakened Heart) - Coming Soon</div>;
}

export function BraveryInVulnerability() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Bravery in Vulnerability - Coming Soon</div>;
}

export function WarriorPractices() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Warrior Practices - Coming Soon</div>;
}

// TONGLEN (Giving and Receiving) (5 NaviCues)
export function TonglenPractice() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Tonglen Practice - Coming Soon</div>;
}

export function BreathingInPain() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Breathing In Pain - Coming Soon</div>;
}

export function SendingOutRelief() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Sending Out Relief - Coming Soon</div>;
}

export function ReversingHabit() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Reversing the Habit - Coming Soon</div>;
}

export function CompassionCultivation() {
  return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', color: '#FFF' }}>Compassion Cultivation - Coming Soon</div>;
}

const GuruPema = {
  // Groundlessness (5)
  GroundlessnessAcceptance,
  NoSolidGround,
  FallingIntoSpace,
  LettingGoOfSecurity,
  ImpermanenceAwareness,
  
  // Shenpa (5)
  ShenpaRecognition,
  ShenpaInterruption,
  UrgeRecognition,
  HookMoments,
  ShenpaPatterns,
  
  // Warrior Spirit (5)
  WarriorTraining,
  FearlessnessInSoftness,
  Bodhichitta,
  BraveryInVulnerability,
  WarriorPractices,
  
  // Tonglen (5)
  TonglenPractice,
  BreathingInPain,
  SendingOutRelief,
  ReversingHabit,
  CompassionCultivation,
};

export default GuruPema;
