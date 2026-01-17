import React, { useState } from 'react';

/**
 * PREDICTION CAPTURE - KNOWING LAYER
 * 
 * Purpose: Captures mental model by asking "What will happen next?"
 * Mechanism: User predicts outcome before seeing result
 * Psychology: Prediction reveals implicit expectations and beliefs
 * 
 * Example: "If you ask for help, what will happen?"
 * Prediction reveals trust, self-worth, safety beliefs
 */

interface PredictionCaptureProps {
  situation: string;
  outcomes: string[];
  onPrediction: (predicted: string) => void;
}

export function PredictionCapture({ situation, outcomes, onPrediction }: PredictionCaptureProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      onPrediction(outcomes[index]);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            What do you expect?
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            {situation}
          </h2>
        </div>

        {/* Outcomes */}
        <div className="space-y-4">
          <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            What will actually happen?
          </div>
          
          <div className="space-y-3">
            {outcomes.map((outcome, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className="w-full p-5 text-left transition-all duration-200"
                style={{
                  backgroundColor: selected === index ? '#3E2BB8' : 'rgba(87, 57, 251, 0.08)',
                  border: `2px solid ${selected === index ? '#5739FB' : 'rgba(87, 57, 251, 0.2)'}`,
                  color: '#FFFFFF',
                }}
              >
                {outcome}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Your prediction reveals what you believe
        </div>
      </div>
    </div>
  );
}
