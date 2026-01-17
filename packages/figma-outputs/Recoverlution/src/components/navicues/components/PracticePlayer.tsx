/**
 * PRACTICE PLAYER
 * 
 * Guided experiential practice with instructions
 * Response: Slider 0-10 for completion/engagement
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Play } from 'lucide-react';

interface PracticePlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function PracticePlayer({ navicue, variant, userState, onResponse }: PracticePlayerProps) {
  const [started, setStarted] = useState(false);
  const [rating, setRating] = useState(5);
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'slider_0_10',
      value: rating,
      timestamp: new Date().toISOString(),
    });
  };
  
  if (!started) {
    return (
      <div className="p-12 max-w-2xl mx-auto text-center">
        {/* Headline */}
        {variant.copy.headline && (
          <div className="text-3xl mb-6">
            {variant.copy.headline}
          </div>
        )}
        
        {/* Body */}
        {variant.copy.body && (
          <div className="text-lg opacity-80 mb-12 leading-relaxed">
            {variant.copy.body}
          </div>
        )}
        
        {/* Start Button */}
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] flex items-center gap-3 mx-auto text-lg"
        >
          <Play className="w-5 h-5" />
          Begin Practice
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Practice Instructions */}
      {variant.copy.prompt && (
        <div className="p-6 bg-zinc-900/50 border border-zinc-700 mb-8">
          <div className="text-sm opacity-60 mb-3">PRACTICE</div>
          <div className="text-lg leading-relaxed whitespace-pre-line">
            {variant.copy.prompt}
          </div>
        </div>
      )}
      
      {/* Completion Rating */}
      <div className="mb-8">
        <label className="block text-lg mb-4 text-center">
          How fully did you engage with this practice?
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs opacity-60 mt-2">
          <span>Barely touched it</span>
          <span className="text-2xl text-[#5739FB]">{rating}</span>
          <span>Fully present</span>
        </div>
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8]"
      >
        Complete Practice
      </button>
    </div>
  );
}
