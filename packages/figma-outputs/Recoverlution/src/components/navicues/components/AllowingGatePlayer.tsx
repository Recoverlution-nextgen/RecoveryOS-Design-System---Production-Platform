/**
 * ALLOWING GATE PLAYER
 * 
 * Permission to feel/be/want something
 * Response: Binary (allow / not yet)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';

interface AllowingGatePlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function AllowingGatePlayer({ navicue, variant, userState, onResponse }: AllowingGatePlayerProps) {
  const [choice, setChoice] = useState<'allow' | 'not_yet' | null>(null);
  
  const handleSubmit = (value: 'allow' | 'not_yet') => {
    setChoice(value);
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'binary',
      value,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-12 max-w-3xl mx-auto">
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-8 text-center opacity-80">
          {variant.copy.headline}
        </div>
      )}
      
      {/* Permission Statement */}
      {variant.copy.body && (
        <div className="text-3xl mb-16 text-center p-12 border-4 border-[#5739FB]/30 leading-relaxed">
          {variant.copy.body}
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-lg opacity-70 mb-12 text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Binary Choice */}
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleSubmit('allow')}
          className="p-8 border-2 border-[#5739FB] hover:bg-[#5739FB]/20 transition-all"
        >
          <div className="text-2xl mb-3">✓</div>
          <div className="text-xl">I allow this</div>
        </button>
        
        <button
          onClick={() => handleSubmit('not_yet')}
          className="p-8 border-2 border-zinc-700 hover:bg-zinc-800 transition-all"
        >
          <div className="text-2xl mb-3 opacity-60">○</div>
          <div className="text-xl opacity-80">Not yet</div>
        </button>
      </div>
    </div>
  );
}
