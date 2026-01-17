import React, { useState } from 'react';

/**
 * INTEGRATION RITUAL - EMBODYING LAYER
 * 
 * Purpose: Ceremony marking transformation
 * Mechanism: Deliberate acknowledgment of change
 * Psychology: Rituals solidify transitions, make change "real"
 * 
 * Example: Let go of old belief through symbolic action
 * Write it down → Watch it fade → Declare new truth
 * Ceremonial completion creates closure and commitment
 */

interface IntegrationRitualProps {
  oldBelief: string;
  newBelief: string;
  onComplete: (declaration: string) => void;
}

export function IntegrationRitual({ oldBelief, newBelief, onComplete }: IntegrationRitualProps) {
  const [phase, setPhase] = useState<'acknowledge' | 'release' | 'declare'>('acknowledge');
  const [declaration, setDeclaration] = useState('');
  const [fadeProgress, setFadeProgress] = useState(0);

  const handleAcknowledge = () => {
    setPhase('release');
  };

  const handleRelease = () => {
    // Fade animation
    const interval = setInterval(() => {
      setFadeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('declare');
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const handleDeclare = () => {
    if (!declaration.trim()) return;
    onComplete(declaration);
  };

  if (phase === 'acknowledge') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Integration ritual
            </div>
            <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
              Acknowledge the old
            </h2>
          </div>

          {/* Old belief */}
          <div 
            className="p-8 text-center text-xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {oldBelief}
          </div>

          {/* Acknowledgment */}
          <div className="text-center space-y-4">
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              This belief served a purpose. It protected you once.
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              But you don't need it anymore.
            </p>
          </div>

          {/* Continue */}
          <button
            onClick={handleAcknowledge}
            className="w-full p-6 transition-all duration-200"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
            }}
          >
            I acknowledge this
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'release') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Integration ritual
            </div>
            <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
              Release the old
            </h2>
          </div>

          {/* Fading belief */}
          <div 
            className="p-8 text-center text-xl transition-all duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.6)',
              opacity: 1 - (fadeProgress / 100),
            }}
          >
            {oldBelief}
          </div>

          {/* Progress */}
          <div className="w-full h-2" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)' }}>
            <div 
              className="h-full transition-all duration-300"
              style={{
                width: `${fadeProgress}%`,
                backgroundColor: '#5739FB',
              }}
            />
          </div>

          {/* Release button */}
          {fadeProgress === 0 && (
            <button
              onClick={handleRelease}
              className="w-full p-6 transition-all duration-200"
              style={{
                backgroundColor: '#5739FB',
                color: '#FFFFFF',
              }}
            >
              Let it go
            </button>
          )}

          {/* Instruction */}
          <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {fadeProgress === 0 ? 'Release what no longer serves you' : 'Watching it fade...'}
          </div>
        </div>
      </div>
    );
  }

  // Declare phase
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Integration ritual
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            Declare the new
          </h2>
        </div>

        {/* New belief */}
        <div 
          className="p-8 text-center text-2xl"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.2)',
            border: '2px solid #5739FB',
            color: '#FFFFFF',
          }}
        >
          {newBelief}
        </div>

        {/* Declaration */}
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Make a declaration to seal this transformation:
          </label>
          <textarea
            value={declaration}
            onChange={(e) => setDeclaration(e.target.value)}
            placeholder="I declare that..."
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
          onClick={handleDeclare}
          disabled={!declaration.trim()}
          className="w-full p-6 text-lg transition-all duration-200"
          style={{
            backgroundColor: declaration.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
            opacity: declaration.trim() ? 1 : 0.5,
          }}
        >
          Complete the ritual
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Speaking your truth makes it real
        </div>
      </div>
    </div>
  );
}
