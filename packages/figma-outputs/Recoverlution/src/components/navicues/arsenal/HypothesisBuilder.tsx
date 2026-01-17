import React, { useState } from 'react';

/**
 * HYPOTHESIS BUILDER - BELIEVING LAYER
 * 
 * Purpose: Build testable "If X then Y" statements
 * Mechanism: Structure predictions in falsifiable format
 * Psychology: Scientific method applied to beliefs
 * 
 * Example: "If [I am worthy], then [people will want to spend time with me]"
 * Creates specific prediction that can be tested in reality
 */

interface HypothesisBuilderProps {
  belief: string;
  onBuild: (hypothesis: { condition: string; prediction: string }) => void;
}

export function HypothesisBuilder({ belief, onBuild }: HypothesisBuilderProps) {
  const [condition, setCondition] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleBuild = () => {
    if (!condition.trim() || !prediction.trim()) return;
    onBuild({ condition, prediction });
  };

  const isComplete = condition.trim() && prediction.trim();

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Hypothesis builder
          </div>
          <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Belief to test:
          </h2>
          <div className="text-2xl" style={{ color: '#FFFFFF' }}>
            {belief}
          </div>
        </div>

        {/* Builder */}
        <div className="space-y-6">
          {/* Condition */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl" style={{ color: '#5739FB' }}>IF</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                this belief is true...
              </div>
            </div>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="I am worthy of love"
              className="w-full p-4 text-lg"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                border: '2px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
          </div>

          {/* Prediction */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl" style={{ color: '#5739FB' }}>THEN</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                this should happen in reality...
              </div>
            </div>
            <input
              type="text"
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              placeholder="People will reach out to connect with me"
              className="w-full p-4 text-lg"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.1)',
                border: '2px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
          </div>
        </div>

        {/* Preview */}
        {isComplete && (
          <div className="p-6" style={{ backgroundColor: 'rgba(62, 43, 184, 0.2)' }}>
            <div className="text-sm mb-3" style={{ color: '#5739FB' }}>
              Your hypothesis:
            </div>
            <div style={{ color: '#FFFFFF' }}>
              <span style={{ color: '#5739FB' }}>IF</span> {condition}, <span style={{ color: '#5739FB' }}>THEN</span> {prediction}
            </div>
          </div>
        )}

        {/* Build */}
        <button
          onClick={handleBuild}
          disabled={!isComplete}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: isComplete ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
            opacity: isComplete ? 1 : 0.5,
          }}
        >
          Test this hypothesis
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Testable hypotheses reveal whether beliefs match reality
        </div>
      </div>
    </div>
  );
}
