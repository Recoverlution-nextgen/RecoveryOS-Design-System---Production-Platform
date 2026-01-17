import React, { useState } from 'react';

/**
 * BELIEF JOURNEY MAP - CROSS-LAYER INTEGRATION
 * 
 * Purpose: Visual progress through KNOWING → BELIEVING → EMBODYING
 * Mechanism: Shows where user is in transformation process
 * Psychology: Makes invisible process visible and trackable
 * 
 * Example: Belief "I am worthy"
 * - KNOWING: Recognized pattern (complete)
 * - BELIEVING: Testing hypothesis (in progress)
 * - EMBODYING: Building automaticity (locked)
 */

interface BeliefJourneyMapProps {
  belief: string;
  knowing: {
    complete: boolean;
    activities: string[];
  };
  believing: {
    complete: boolean;
    activities: string[];
  };
  embodying: {
    complete: boolean;
    activities: string[];
  };
  onContinue: () => void;
}

export function BeliefJourneyMap({ 
  belief, 
  knowing, 
  believing, 
  embodying,
  onContinue 
}: BeliefJourneyMapProps) {
  const getLayerStatus = (layer: { complete: boolean; activities: string[] }) => {
    if (layer.complete) return 'complete';
    if (layer.activities.length > 0) return 'active';
    return 'locked';
  };

  const getLayerColor = (status: string) => {
    switch(status) {
      case 'complete': return '#00FF00';
      case 'active': return '#5739FB';
      case 'locked': return 'rgba(255, 255, 255, 0.2)';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  };

  const knowingStatus = getLayerStatus(knowing);
  const believingStatus = getLayerStatus(believing);
  const embodyingStatus = getLayerStatus(embodying);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Belief journey map
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            {belief}
          </h2>
        </div>

        {/* Journey layers */}
        <div className="space-y-6">
          {/* KNOWING */}
          <div 
            className="p-6"
            style={{
              backgroundColor: knowingStatus === 'active' ? 'rgba(87, 57, 251, 0.15)' : 'rgba(87, 57, 251, 0.05)',
              border: `2px solid ${getLayerColor(knowingStatus)}`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg mb-1" style={{ color: '#FFFFFF' }}>
                  KNOWING
                </div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Implicit model capture
                </div>
              </div>
              <div 
                className="w-16 h-16 flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: getLayerColor(knowingStatus),
                  color: knowingStatus === 'locked' ? 'rgba(255, 255, 255, 0.3)' : '#000000',
                }}
              >
                {knowingStatus === 'complete' ? '✓' : knowingStatus === 'active' ? '...' : '🔒'}
              </div>
            </div>
            {knowing.activities.length > 0 && (
              <div className="space-y-2">
                {knowing.activities.map((activity, index) => (
                  <div 
                    key={index}
                    className="text-sm p-2"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {activity}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BELIEVING */}
          <div 
            className="p-6"
            style={{
              backgroundColor: believingStatus === 'active' ? 'rgba(87, 57, 251, 0.15)' : 'rgba(87, 57, 251, 0.05)',
              border: `2px solid ${getLayerColor(believingStatus)}`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg mb-1" style={{ color: '#FFFFFF' }}>
                  BELIEVING
                </div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Prediction error generation
                </div>
              </div>
              <div 
                className="w-16 h-16 flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: getLayerColor(believingStatus),
                  color: believingStatus === 'locked' ? 'rgba(255, 255, 255, 0.3)' : '#000000',
                }}
              >
                {believingStatus === 'complete' ? '✓' : believingStatus === 'active' ? '...' : '🔒'}
              </div>
            </div>
            {believing.activities.length > 0 && (
              <div className="space-y-2">
                {believing.activities.map((activity, index) => (
                  <div 
                    key={index}
                    className="text-sm p-2"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {activity}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EMBODYING */}
          <div 
            className="p-6"
            style={{
              backgroundColor: embodyingStatus === 'active' ? 'rgba(87, 57, 251, 0.15)' : 'rgba(87, 57, 251, 0.05)',
              border: `2px solid ${getLayerColor(embodyingStatus)}`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg mb-1" style={{ color: '#FFFFFF' }}>
                  EMBODYING
                </div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Automaticity + identity
                </div>
              </div>
              <div 
                className="w-16 h-16 flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: getLayerColor(embodyingStatus),
                  color: embodyingStatus === 'locked' ? 'rgba(255, 255, 255, 0.3)' : '#000000',
                }}
              >
                {embodyingStatus === 'complete' ? '✓' : embodyingStatus === 'active' ? '...' : '🔒'}
              </div>
            </div>
            {embodying.activities.length > 0 && (
              <div className="space-y-2">
                {embodying.activities.map((activity, index) => (
                  <div 
                    key={index}
                    className="text-sm p-2"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {activity}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={onContinue}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: '#5739FB',
            color: '#FFFFFF',
          }}
        >
          Continue journey
        </button>

        {/* Insight */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Transformation is a journey, not a destination
        </div>
      </div>
    </div>
  );
}
