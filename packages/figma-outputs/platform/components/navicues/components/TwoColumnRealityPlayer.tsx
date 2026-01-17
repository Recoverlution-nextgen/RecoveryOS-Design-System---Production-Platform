/**
 * TWO COLUMN REALITY PLAYER
 * 
 * Component: two_column_reality
 * Purpose: Mind says vs Reality says (defusion)
 * Response: Side choice
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariant, StateSnapshot } from '../../../types/navicue-contract';

interface TwoColumnRealityPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariant;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function TwoColumnRealityPlayer({
  navicue,
  variant,
  userState,
  onResponse,
}: TwoColumnRealityPlayerProps) {
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
  
  const leftLabel = variant.copy.left_label || "Mind says";
  const rightLabel = variant.copy.right_label || "Reality says";
  const leftText = variant.copy.left_text || "";
  const rightText = variant.copy.right_text || "";
  
  const handleSubmit = () => {
    if (!selectedSide) return;
    
    const response = {
      side_chosen: selectedSide,
    };
    
    const statePost: StateSnapshot = {
      ...userState,
      fusion: selectedSide === 'left' ? (userState?.fusion || 5) : Math.max((userState?.fusion || 5) - 1, 0),
    };
    
    onResponse(response, statePost);
  };
  
  return (
    <div className="p-8">
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl font-bold mb-4">{variant.copy.headline}</div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-lg opacity-90 mb-8">{variant.copy.prompt}</div>
      )}
      
      {/* Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <button
          onClick={() => setSelectedSide('left')}
          className={`p-6 border-2 transition-all text-left ${
            selectedSide === 'left'
              ? 'border-[#5739FB] bg-[#5739FB]/10'
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
        >
          <div className="text-sm opacity-60 mb-3">{leftLabel}</div>
          <div className="text-lg">{leftText}</div>
        </button>
        
        {/* Right Column */}
        <button
          onClick={() => setSelectedSide('right')}
          className={`p-6 border-2 transition-all text-left ${
            selectedSide === 'right'
              ? 'border-[#5739FB] bg-[#5739FB]/10'
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
        >
          <div className="text-sm opacity-60 mb-3">{rightLabel}</div>
          <div className="text-lg">{rightText}</div>
        </button>
      </div>
      
      {/* Helper Text */}
      <div className="text-sm opacity-70 mb-6 text-center">
        Which side will you live from for the next 60 seconds?
      </div>
      
      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!selectedSide}
        className="w-full px-6 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg"
      >
        Continue
      </button>
    </div>
  );
}
