import React, { useState } from 'react';

/**
 * AUTOMATICITY TRACKER - EMBODYING LAYER
 * 
 * Purpose: Measures how automatic new pattern has become
 * Mechanism: Tracks reaction time and effort for new response
 * Psychology: Automaticity = true learning, not just knowledge
 * 
 * Example: New thought "I am capable"
 * Week 1: Takes 5 seconds to remember → Slow, effortful
 * Week 4: Comes immediately → Fast, automatic
 */

interface AutomaticityTrackerProps {
  newPattern: string;
  onCheck: (effortLevel: number, reactionTime: number) => void;
}

export function AutomaticityTracker({ newPattern, onCheck }: AutomaticityTrackerProps) {
  const [startTime] = useState(Date.now());
  const [effortLevel, setEffortLevel] = useState<number | null>(null);
  const [responded, setResponded] = useState(false);

  const handleSubmit = () => {
    if (effortLevel === null) return;
    
    const reactionTime = Date.now() - startTime;
    setResponded(true);
    
    setTimeout(() => {
      onCheck(effortLevel, reactionTime);
    }, 500);
  };

  const getEffortLabel = (level: number) => {
    switch(level) {
      case 1: return 'Completely automatic';
      case 2: return 'Mostly automatic';
      case 3: return 'Some effort required';
      case 4: return 'Significant effort';
      case 5: return 'Very difficult';
      default: return '';
    }
  };

  const getEffortColor = (level: number) => {
    const colors = ['#00FF00', '#7FFF00', '#FFFF00', '#FFA500', '#FF4500'];
    return colors[level - 1];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Automaticity check
          </div>
          <h2 className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            How automatic is this now?
          </h2>
        </div>

        {/* Pattern */}
        <div 
          className="p-8 text-center text-2xl"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.15)',
            border: '2px solid #5739FB',
            color: '#FFFFFF',
          }}
        >
          {newPattern}
        </div>

        {/* Effort scale */}
        <div className="space-y-4">
          <div className="text-sm text-center" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            How much effort did it take to access this thought?
          </div>
          
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setEffortLevel(level)}
                className="w-full p-4 text-left transition-all duration-200"
                style={{
                  backgroundColor: effortLevel === level 
                    ? getEffortColor(level) 
                    : 'rgba(87, 57, 251, 0.05)',
                  border: `2px solid ${effortLevel === level ? getEffortColor(level) : 'rgba(87, 57, 251, 0.2)'}`,
                  color: effortLevel === level ? '#000000' : '#FFFFFF',
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{getEffortLabel(level)}</span>
                  <span className="text-xl">{level}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={effortLevel === null || responded}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: (effortLevel !== null && !responded) ? '#5739FB' : 'rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
            opacity: (effortLevel !== null && !responded) ? 1 : 0.5,
          }}
        >
          {responded ? 'Tracked' : 'Log automaticity'}
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          {effortLevel === 1 
            ? 'This has become automatic. The belief is embodied.' 
            : 'Keep practicing. Automaticity comes with repetition.'}
        </div>
      </div>
    </div>
  );
}
