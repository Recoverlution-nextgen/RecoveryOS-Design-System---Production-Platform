/**
 * IDENTITY KOAN PLAYER
 * 
 * Zen-like paradoxical question about self-concept
 * Response: Text short (open reflection)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';

interface IdentityKoanPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function IdentityKoanPlayer({ navicue, variant, userState, onResponse }: IdentityKoanPlayerProps) {
  const [reflection, setReflection] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_short',
      value: reflection,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-12 max-w-3xl mx-auto">
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-center text-2xl mb-12 opacity-80">
          {variant.copy.headline}
        </div>
      )}
      
      {/* The Koan (Body) */}
      {variant.copy.body && (
        <div className="text-center text-3xl mb-16 leading-relaxed p-8 border-t border-b border-[#5739FB]/30">
          {variant.copy.body}
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-center text-lg opacity-70 mb-8">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Reflection Space */}
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Let your thoughts flow here..."
        className="w-full h-48 p-6 bg-zinc-900/50 border border-zinc-700 text-white resize-none mb-8 focus:border-[#5739FB] focus:outline-none"
      />
      
      {/* Skip or Continue */}
      <div className="flex gap-4">
        <button
          onClick={() => onResponse({ navicue_id: navicue.navicue_id, response_type: 'none', value: null, timestamp: new Date().toISOString() })}
          className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700"
        >
          Sit with this longer
        </button>
        <button
          onClick={handleSubmit}
          disabled={!reflection.trim()}
          className="flex-1 px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
