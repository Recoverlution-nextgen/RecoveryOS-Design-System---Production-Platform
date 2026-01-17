/**
 * PROOF STAMP CAPTURE PLAYER
 * 
 * Quick win capture
 * Response: Text short
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Star } from 'lucide-react';

interface ProofStampCapturePlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function ProofStampCapturePlayer({ navicue, variant, userState, onResponse }: ProofStampCapturePlayerProps) {
  const [win, setWin] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_short',
      value: win,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Star className="w-12 h-12 text-[#5739FB]" />
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
        <div className="p-6 bg-[#5739FB]/10 border-2 border-[#5739FB] mb-8 text-lg text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Input */}
      <input
        type="text"
        value={win}
        onChange={(e) => setWin(e.target.value)}
        placeholder="Name the win..."
        className="w-full p-4 bg-zinc-900/50 border-2 border-zinc-700 text-white mb-8 focus:border-[#5739FB] focus:outline-none text-lg"
        autoFocus
      />
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!win.trim()}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Stamp It
      </button>
    </div>
  );
}
