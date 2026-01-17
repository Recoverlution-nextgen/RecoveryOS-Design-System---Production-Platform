/**
 * SANGHA PING PLAYER
 * 
 * Quick message to community/support circle
 * Response: Text 1line
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Users } from 'lucide-react';

interface SanghaPingPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function SanghaPingPlayer({ navicue, variant, userState, onResponse }: SanghaPingPlayerProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'text_1line',
      value: message,
      timestamp: new Date().toISOString(),
    });
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Users className="w-10 h-10 text-[#5739FB]" />
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
        <div className="text-base opacity-70 mb-6 text-center">
          {variant.copy.prompt}
        </div>
      )}
      
      {/* Message Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a signal..."
        className="w-full p-4 bg-zinc-900/50 border-2 border-zinc-700 text-white mb-8 focus:border-[#5739FB] focus:outline-none text-lg"
        autoFocus
      />
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!message.trim()}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Send to Circle
      </button>
    </div>
  );
}
