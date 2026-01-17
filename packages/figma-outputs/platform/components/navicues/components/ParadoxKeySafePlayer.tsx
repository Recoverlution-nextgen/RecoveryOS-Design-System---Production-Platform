/**
 * PARADOX KEY SAFE PLAYER
 * 
 * Store a paradoxical truth for safekeeping
 * Response: Text short
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Key } from 'lucide-react';

interface ParadoxKeySafePlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function ParadoxKeySafePlayer({ navicue, variant, userState, onResponse }: ParadoxKeySafePlayerProps) {
  const [paradox, setParadox] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_short',
      value: paradox,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-12 max-w-3xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <Key className="w-12 h-12 text-[#5739FB]" />
      </div>
      
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-8 text-center">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Body */}
      {variant.copy.body && (
        <div className="text-lg opacity-80 mb-12 text-center leading-relaxed">
          {variant.copy.body}
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-base opacity-70 mb-8 text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Paradox Input */}
      <textarea
        value={paradox}
        onChange={(e) => setParadox(e.target.value)}
        placeholder="Name the paradox you are holding..."
        className="w-full h-40 p-6 bg-zinc-900/50 border-2 border-[#5739FB]/30 text-white resize-none mb-8 focus:border-[#5739FB] focus:outline-none text-lg"
      />
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!paradox.trim()}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Lock in the Safe
      </button>
    </div>
  );
}
