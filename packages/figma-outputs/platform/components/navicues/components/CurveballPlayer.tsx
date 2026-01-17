/**
 * CURVEBALL PLAYER
 * 
 * Unexpected question or reframe that disrupts pattern
 * Response: Text 1line (immediate gut response)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Zap } from 'lucide-react';

interface CurveballPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function CurveballPlayer({ navicue, variant, userState, onResponse }: CurveballPlayerProps) {
  const [response, setResponse] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_1line',
      value: response,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Flash Icon */}
      <div className="flex justify-center mb-8">
        <Zap className="w-10 h-10 text-[#5739FB] animate-pulse" />
      </div>
      
      {/* Headline */}
      {variant.copy.headline && (
        <div className="text-2xl mb-6 text-center text-[#5739FB]">
          {variant.copy.headline}
        </div>
      )}
      
      {/* The Curveball */}
      {variant.copy.body && (
        <div className="text-3xl mb-12 text-center p-8 bg-[#5739FB]/10 border-2 border-[#5739FB]">
          {variant.copy.body}
        </div>
      )}
      
      {/* Prompt */}
      {variant.copy.prompt && (
        <div className="text-lg opacity-80 mb-6 text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Quick Response Input */}
      <input
        type="text"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="First thought that comes to mind..."
        className="w-full p-4 bg-zinc-900/50 border-2 border-zinc-700 text-white mb-8 focus:border-[#5739FB] focus:outline-none text-lg"
        autoFocus
      />
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!response.trim()}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Send It
      </button>
    </div>
  );
}
