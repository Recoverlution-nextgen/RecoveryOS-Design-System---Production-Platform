import React, { useState } from 'react';

/**
 * TRANSFER TRAINER - EMBODYING LAYER
 * 
 * Purpose: Apply learning to new contexts
 * Mechanism: Practice using skill in different situations
 * Psychology: Transfer = true mastery, not just local learning
 * 
 * Example: Learned "Set boundaries at work"
 * Transfer: Can you set boundaries with family? Friends? Strangers?
 * Generalization across contexts = embodied skill
 */

interface TransferTrainerProps {
  skill: string;
  originalContext: string;
  newContexts: Array<{
    id: string;
    context: string;
    difficulty: 'easier' | 'similar' | 'harder';
  }>;
  onAttempt: (contextId: string, confidence: number) => void;
}

export function TransferTrainer({ skill, originalContext, newContexts, onAttempt }: TransferTrainerProps) {
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(5);
  const [committed, setCommitted] = useState(false);

  const handleCommit = () => {
    if (!selectedContext) return;
    setCommitted(true);
    setTimeout(() => {
      onAttempt(selectedContext, confidence);
    }, 500);
  };

  const selectedCtx = newContexts.find(c => c.id === selectedContext);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easier': return '#00FF00';
      case 'similar': return '#FFFF00';
      case 'harder': return '#FF4500';
      default: return '#5739FB';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Transfer training
          </div>
          <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Skill learned:
          </h2>
          <div className="text-2xl" style={{ color: '#FFFFFF' }}>
            {skill}
          </div>
        </div>

        {/* Original context */}
        <div className="p-5" style={{ backgroundColor: 'rgba(0, 255, 0, 0.1)' }}>
          <div className="text-xs mb-2 uppercase" style={{ color: 'rgba(0, 255, 0, 0.8)' }}>
            Original context
          </div>
          <div style={{ color: '#FFFFFF' }}>
            {originalContext}
          </div>
        </div>

        {/* New contexts */}
        <div className="space-y-3">
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Can you use this skill in a new context?
          </div>
          {newContexts.map((ctx) => (
            <button
              key={ctx.id}
              onClick={() => setSelectedContext(ctx.id)}
              className="w-full p-5 text-left transition-all duration-200"
              style={{
                backgroundColor: selectedContext === ctx.id 
                  ? 'rgba(87, 57, 251, 0.2)' 
                  : 'rgba(87, 57, 251, 0.05)',
                border: `2px solid ${selectedContext === ctx.id ? '#5739FB' : 'transparent'}`,
                color: '#FFFFFF',
              }}
            >
              <div className="flex items-start justify-between">
                <div>{ctx.context}</div>
                <div 
                  className="text-xs px-2 py-1 uppercase ml-3"
                  style={{
                    backgroundColor: getDifficultyColor(ctx.difficulty),
                    color: '#000000',
                  }}
                >
                  {ctx.difficulty}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Confidence */}
        {selectedContext && (
          <div className="space-y-4">
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              How confident are you that you can use {skill} in this context?
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="10"
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                className="w-full"
                style={{
                  accentColor: '#5739FB',
                }}
              />
              <div className="flex justify-between text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                <span>Not confident (0)</span>
                <span className="text-xl" style={{ color: '#5739FB' }}>{confidence}</span>
                <span>Very confident (10)</span>
              </div>
            </div>
          </div>
        )}

        {/* Commit */}
        <button
          onClick={handleCommit}
          disabled={!selectedContext || committed}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: (selectedContext && !committed) ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
            opacity: (selectedContext && !committed) ? 1 : 0.5,
          }}
        >
          {committed ? 'Committed to transfer' : 'Commit to trying this'}
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          True mastery means the skill works across contexts
        </div>
      </div>
    </div>
  );
}
