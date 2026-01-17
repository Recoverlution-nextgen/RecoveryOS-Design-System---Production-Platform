import React, { useState } from 'react';

/**
 * PREDICTION LAB - BELIEVING LAYER
 * 
 * Purpose: Generate prediction errors that update beliefs
 * Mechanism: User predicts outcome → Reality contradicts → Belief updates
 * Psychology: Violated expectations = learning opportunity
 * 
 * Example: "Predict: If I share this vulnerable thing, they will..."
 * Then: Log what actually happened
 * Gap between prediction and reality = belief update moment
 */

interface PredictionLabProps {
  experiment: string;
  onPrediction: (prediction: string) => void;
  onOutcome?: (outcome: string, predictionMatched: boolean) => void;
  previousPrediction?: string;
  mode: 'predict' | 'report';
}

export function PredictionLab({ 
  experiment, 
  onPrediction, 
  onOutcome,
  previousPrediction,
  mode 
}: PredictionLabProps) {
  const [prediction, setPrediction] = useState('');
  const [outcome, setOutcome] = useState('');
  const [matched, setMatched] = useState<boolean | null>(null);

  const handleSubmitPrediction = () => {
    if (!prediction.trim()) return;
    onPrediction(prediction);
  };

  const handleSubmitOutcome = (didMatch: boolean) => {
    setMatched(didMatch);
    setTimeout(() => {
      onOutcome?.(outcome, didMatch);
    }, 500);
  };

  if (mode === 'predict') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
              Prediction lab
            </div>
            <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
              Make a prediction
            </h2>
          </div>

          {/* Experiment */}
          <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
            <div className="text-sm mb-2" style={{ color: '#5739FB' }}>
              The experiment:
            </div>
            <div style={{ color: '#FFFFFF' }}>
              {experiment}
            </div>
          </div>

          {/* Prediction input */}
          <div className="space-y-3">
            <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              What do you think will happen?
            </label>
            <textarea
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              placeholder="I predict that..."
              className="w-full p-4"
              rows={4}
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmitPrediction}
            disabled={!prediction.trim()}
            className="w-full p-5 transition-all duration-200"
            style={{
              backgroundColor: prediction.trim() ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
              opacity: prediction.trim() ? 1 : 0.5,
            }}
          >
            Lock in prediction
          </button>

          {/* Hint */}
          <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Be honest about what you really expect
          </div>
        </div>
      </div>
    );
  }

  // Report mode
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Prediction lab
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            What actually happened?
          </h2>
        </div>

        {/* Previous prediction */}
        <div className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="text-sm mb-2" style={{ color: '#5739FB' }}>
            You predicted:
          </div>
          <div style={{ color: '#FFFFFF' }}>
            {previousPrediction}
          </div>
        </div>

        {/* Outcome input */}
        <div className="space-y-3">
          <label className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            What actually happened?
          </label>
          <textarea
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            placeholder="The reality was..."
            className="w-full p-4"
            rows={4}
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          />
        </div>

        {/* Match question */}
        <div className="space-y-3">
          <div className="text-sm text-center" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Did reality match your prediction?
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSubmitOutcome(true)}
              className="p-5 transition-all duration-200"
              style={{
                backgroundColor: matched === true ? '#3E2BB8' : 'rgba(87, 57, 251, 0.2)',
                color: '#FFFFFF',
              }}
            >
              Yes, it matched
            </button>
            <button
              onClick={() => handleSubmitOutcome(false)}
              className="p-5 transition-all duration-200"
              style={{
                backgroundColor: matched === false ? '#3E2BB8' : 'rgba(87, 57, 251, 0.2)',
                color: '#FFFFFF',
              }}
            >
              No, it was different
            </button>
          </div>
        </div>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          When reality contradicts your prediction, beliefs update
        </div>
      </div>
    </div>
  );
}
