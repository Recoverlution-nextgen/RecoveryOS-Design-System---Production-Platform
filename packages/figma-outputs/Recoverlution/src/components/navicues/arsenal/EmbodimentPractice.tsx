import React, { useState, useEffect } from 'react';

/**
 * EMBODIMENT PRACTICE - EMBODYING LAYER
 * 
 * Purpose: Connect insight to body and sensation
 * Mechanism: Somatic awareness + belief pairing
 * Psychology: Body stores beliefs; changing sensation changes belief
 * 
 * Example: "Where do you feel safety in your body?"
 * Connect belief to sensation → Body becomes anchor for new truth
 */

interface EmbodimentPracticeProps {
  belief: string;
  onComplete: (bodyLocation: string, sensation: string) => void;
}

const bodyRegions = [
  { id: 'head', label: 'Head', y: 15 },
  { id: 'chest', label: 'Chest', y: 35 },
  { id: 'stomach', label: 'Stomach', y: 50 },
  { id: 'hands', label: 'Hands', y: 45 },
  { id: 'legs', label: 'Legs', y: 75 },
];

export function EmbodimentPractice({ belief, onComplete }: EmbodimentPracticeProps) {
  const [phase, setPhase] = useState<'locate' | 'describe'>('locate');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [sensation, setSensation] = useState('');
  const [breathCount, setBreathCount] = useState(0);

  const handleSelectRegion = (regionId: string) => {
    setSelectedRegion(regionId);
    setBreathCount(0);
  };

  const handleBreathe = () => {
    if (breathCount < 3) {
      setBreathCount(breathCount + 1);
    }
    if (breathCount === 2) {
      setTimeout(() => setPhase('describe'), 500);
    }
  };

  const handleComplete = () => {
    if (!selectedRegion || !sensation.trim()) return;
    onComplete(selectedRegion, sensation);
  };

  if (phase === 'locate') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Embodiment practice
            </div>
            <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Belief:
            </h2>
            <div className="text-2xl" style={{ color: '#FFFFFF' }}>
              {belief}
            </div>
          </div>

          {/* Body map */}
          <div className="relative" style={{ height: '400px' }}>
            {/* Simple body outline */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="relative"
                style={{
                  width: '120px',
                  height: '350px',
                  border: '2px solid rgba(87, 57, 251, 0.3)',
                  borderRadius: '60px 60px 20px 20px',
                }}
              />
            </div>

            {/* Body regions */}
            {bodyRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleSelectRegion(region.id)}
                className="absolute left-1/2 transform -translate-x-1/2 px-6 py-3 transition-all duration-200"
                style={{
                  top: `${region.y}%`,
                  backgroundColor: selectedRegion === region.id 
                    ? '#5739FB' 
                    : 'rgba(87, 57, 251, 0.2)',
                  border: `2px solid ${selectedRegion === region.id ? '#5739FB' : 'transparent'}`,
                  color: '#FFFFFF',
                }}
              >
                {region.label}
              </button>
            ))}
          </div>

          {/* Breathe with it */}
          {selectedRegion && (
            <div className="space-y-4">
              <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Breathe into {bodyRegions.find(r => r.id === selectedRegion)?.label.toLowerCase()}
              </div>
              <button
                onClick={handleBreathe}
                className="w-full p-6 transition-all duration-200"
                style={{
                  backgroundColor: '#5739FB',
                  color: '#FFFFFF',
                }}
              >
                Breathe {breathCount + 1}/3
              </button>
            </div>
          )}

          {/* Instruction */}
          <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            {!selectedRegion 
              ? 'Where do you feel this belief in your body?' 
              : 'Breathe deeply and notice the sensation'}
          </div>
        </div>
      </div>
    );
  }

  // Describe phase
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Embodiment practice
          </div>
          <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
            Describe the sensation
          </h2>
        </div>

        {/* Location */}
        <div className="p-5 text-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-sm mb-1" style={{ color: '#5739FB' }}>
            Location:
          </div>
          <div style={{ color: '#FFFFFF' }}>
            {bodyRegions.find(r => r.id === selectedRegion)?.label}
          </div>
        </div>

        {/* Sensation description */}
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            What does this belief feel like in your {bodyRegions.find(r => r.id === selectedRegion)?.label.toLowerCase()}?
          </label>
          <textarea
            value={sensation}
            onChange={(e) => setSensation(e.target.value)}
            placeholder="Warm, expansive, light, grounded..."
            className="w-full p-4"
            rows={4}
            autoFocus
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          />
        </div>

        {/* Complete */}
        <button
          onClick={handleComplete}
          disabled={!sensation.trim()}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: sensation.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
            opacity: sensation.trim() ? 1 : 0.5,
          }}
        >
          Anchor this embodiment
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Your body remembers what your mind forgets
        </div>
      </div>
    </div>
  );
}
