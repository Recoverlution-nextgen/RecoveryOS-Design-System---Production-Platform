/**
 * STORY SEED PLAYER
 * 
 * Plant a narrative seed for future self
 * Response: Text short
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Sprout } from 'lucide-react';

interface StorySeedPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function StorySeedPlayer({ navicue, variant, userState, onResponse }: StorySeedPlayerProps) {
  const [seed, setSeed] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_short',
      value: seed,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Sprout className="w-10 h-10 text-[#5739FB]" />
      </div>
      
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-6 text-center">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Body */}
      {variant.copy.body && (
        <div className="text-lg opacity-80 mb-8 text-center leading-relaxed">
          {variant.copy.body}
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="p-6 bg-[#5739FB]/10 border-l-4 border-[#5739FB] mb-8 text-lg italic">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Story Input */}
      <textarea
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="Start the story..."
        className="w-full h-32 p-4 bg-zinc-900/50 border border-zinc-700 text-white resize-none mb-8 focus:border-[#5739FB] focus:outline-none"
      />
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!seed.trim()}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Plant This Seed
      </button>
    </div>
  );
}
