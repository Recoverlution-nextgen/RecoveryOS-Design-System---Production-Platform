import React, { useState } from 'react';

/**
 * PATTERN RECOGNITION - KNOWING LAYER
 * 
 * Purpose: Shows user their unconscious patterns through data visualization
 * Mechanism: Displays patterns from their responses over time
 * Psychology: Seeing pattern creates awareness without defensiveness
 * 
 * Example: "You've predicted rejection 8 times this week"
 * Visual shows pattern they couldn't see in the moment
 */

interface PatternRecognitionProps {
  patternName: string;
  frequency: number;
  timeframe: string;
  examples: string[];
  insight: string;
  onAcknowledge: () => void;
}

export function PatternRecognition({ 
  patternName, 
  frequency, 
  timeframe, 
  examples,
  insight,
  onAcknowledge 
}: PatternRecognitionProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    setTimeout(() => {
      onAcknowledge();
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Pattern detected
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            {patternName}
          </h2>
        </div>

        {/* Frequency visualization */}
        <div className="text-center p-8" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-6xl mb-2" style={{ color: '#5739FB' }}>
            {frequency}
          </div>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            times {timeframe}
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-3">
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Recent examples:
          </div>
          {examples.slice(0, 3).map((example, index) => (
            <div
              key={index}
              className="p-4 text-sm"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                borderLeft: '3px solid #5739FB',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {example}
            </div>
          ))}
        </div>

        {/* Insight */}
        <div className="p-6" style={{ backgroundColor: 'rgba(62, 43, 184, 0.2)' }}>
          <div className="text-sm mb-2" style={{ color: '#5739FB' }}>
            What this reveals:
          </div>
          <div style={{ color: '#FFFFFF' }}>
            {insight}
          </div>
        </div>

        {/* Acknowledge */}
        <button
          onClick={handleAcknowledge}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: acknowledged ? '#3E2BB8' : 'rgba(87, 57, 251, 0.2)',
            color: '#FFFFFF',
          }}
        >
          {acknowledged ? 'Pattern recognized' : 'I see this pattern'}
        </button>
      </div>
    </div>
  );
}
