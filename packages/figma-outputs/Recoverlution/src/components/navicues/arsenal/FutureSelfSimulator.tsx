import React, { useState } from 'react';

/**
 * FUTURE SELF SIMULATOR - EMBODYING LAYER
 * 
 * Purpose: Visualize identity shift completion
 * Mechanism: Guided visualization of transformed self
 * Psychology: Mental rehearsal creates neural pathways
 * 
 * Example: "Imagine yourself 6 months from now with this belief fully embodied"
 * Detailed visualization makes future identity feel real and accessible
 */

interface FutureSelfSimulatorProps {
  newIdentity: string;
  timeframe: string;
  onComplete: (visualization: {
    actions: string;
    feelings: string;
    evidence: string;
  }) => void;
}

export function FutureSelfSimulator({ newIdentity, timeframe, onComplete }: FutureSelfSimulatorProps) {
  const [phase, setPhase] = useState<'intro' | 'actions' | 'feelings' | 'evidence'>('intro');
  const [actions, setActions] = useState('');
  const [feelings, setFeelings] = useState('');
  const [evidence, setEvidence] = useState('');

  const handleIntro = () => {
    setPhase('actions');
  };

  const handleActions = () => {
    if (!actions.trim()) return;
    setPhase('feelings');
  };

  const handleFeelings = () => {
    if (!feelings.trim()) return;
    setPhase('evidence');
  };

  const handleComplete = () => {
    if (!evidence.trim()) return;
    onComplete({ actions, feelings, evidence });
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Future self simulator
            </div>
            <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
              Imagine yourself {timeframe}
            </h2>
          </div>

          {/* Identity */}
          <div 
            className="p-8 text-center text-xl"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.15)',
              border: '2px solid #5739FB',
              color: '#FFFFFF',
            }}
          >
            {newIdentity}
          </div>

          {/* Instruction */}
          <div className="space-y-4 text-center" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <p>Close your eyes for a moment.</p>
            <p>See yourself {timeframe} with this fully embodied.</p>
            <p>Notice how you move, speak, and show up in the world.</p>
          </div>

          {/* Begin */}
          <button
            onClick={handleIntro}
            className="w-full p-6 transition-all duration-200"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
            }}
          >
            Begin visualization
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'actions') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Future self simulator
            </div>
            <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
              What are you doing?
            </h2>
          </div>

          {/* Prompt */}
          <div className="text-center" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {timeframe}, with {newIdentity}...
          </div>

          {/* Input */}
          <div className="space-y-3">
            <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              What actions are you taking?
            </label>
            <textarea
              value={actions}
              onChange={(e) => setActions(e.target.value)}
              placeholder="I am..."
              className="w-full p-4"
              rows={5}
              autoFocus
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
          </div>

          {/* Continue */}
          <button
            onClick={handleActions}
            disabled={!actions.trim()}
            className="w-full p-5 transition-all duration-200"
            style={{
              backgroundColor: actions.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
              opacity: actions.trim() ? 1 : 0.5,
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'feelings') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Future self simulator
            </div>
            <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
              How do you feel?
            </h2>
          </div>

          {/* Prompt */}
          <div className="text-center" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Living as {newIdentity}...
          </div>

          {/* Input */}
          <div className="space-y-3">
            <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              What emotions and sensations do you experience?
            </label>
            <textarea
              value={feelings}
              onChange={(e) => setFeelings(e.target.value)}
              placeholder="I feel..."
              className="w-full p-4"
              rows={5}
              autoFocus
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
          </div>

          {/* Continue */}
          <button
            onClick={handleFeelings}
            disabled={!feelings.trim()}
            className="w-full p-5 transition-all duration-200"
            style={{
              backgroundColor: feelings.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
              opacity: feelings.trim() ? 1 : 0.5,
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Evidence phase
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Future self simulator
          </div>
          <h2 className="text-xl" style={{ color: '#FFFFFF' }}>
            What proves it?
          </h2>
        </div>

        {/* Prompt */}
        <div className="text-center" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          How do you know this transformation is real?
        </div>

        {/* Input */}
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            What evidence shows this change happened?
          </label>
          <textarea
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="The evidence is..."
            className="w-full p-4"
            rows={5}
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
          disabled={!evidence.trim()}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: evidence.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
            opacity: evidence.trim() ? 1 : 0.5,
          }}
        >
          Complete visualization
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Your brain rehearses the future you visualize
        </div>
      </div>
    </div>
  );
}
