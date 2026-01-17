/**
 * STORY SHARD PLAYER
 * 
 * Brief narrative vignette that resonates with user's experience
 * Response: Slider 0-10 (recognition/resonance)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { BookOpen } from 'lucide-react';

interface StoryShardPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function StoryShardPlayer({ navicue, variant, userState, onResponse }: StoryShardPlayerProps) {
  const [resonance, setResonance] = useState(5);
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'slider_0_10',
      value: resonance,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <BookOpen className="w-8 h-8 text-[#5739FB]" />
      </div>
      
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-6 text-center">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Story Body */}
      {variant.copy.body && (
        <div className="text-lg leading-relaxed mb-8 p-8 bg-zinc-900/30 border-l-4 border-[#5739FB] italic">
          {variant.copy.body}
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-base opacity-70 mb-6 text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Resonance Slider */}
      <div className="mb-8">
        <input
          type="range"
          min="0"
          max="10"
          value={resonance}
          onChange={(e) => setResonance(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs opacity-60 mt-2">
          <span>Doesn't land</span>
          <span className="text-2xl text-[#5739FB]">{resonance}</span>
          <span>Deeply resonates</span>
        </div>
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8]"
      >
        Continue
      </button>
    </div>
  );
}
