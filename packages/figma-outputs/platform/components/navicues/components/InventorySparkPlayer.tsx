/**
 * INVENTORY SPARK PLAYER
 * 
 * Quick check-in on resources/strengths
 * Response: Choice multi (what's available right now)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Sparkles } from 'lucide-react';

interface InventorySparkPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function InventorySparkPlayer({ navicue, variant, userState, onResponse }: InventorySparkPlayerProps) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const toggleResource = (resource: string) => {
    if (selected.includes(resource)) {
      setSelected(selected.filter(r => r !== resource));
    } else {
      setSelected([...selected, resource]);
    }
  };
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'choice_multi',
      value: selected,
      timestamp: new Date().toISOString(),
    });
  };
  
  const resources = variant.copy.options || [
    'Breath',
    'Curiosity',
    'Humor',
    'Support',
    'Time',
    'Perspective',
    'Willingness',
    'Self-compassion'
  ];
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Sparkles className="w-10 h-10 text-[#5739FB]" />
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
      
      {/* Resources Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {resources.map((resource, idx) => (
          <button
            key={idx}
            onClick={() => toggleResource(resource)}
            className={`p-4 border-2 transition-all ${
              selected.includes(resource)
                ? 'border-[#5739FB] bg-[#5739FB]/20'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 border-2 flex items-center justify-center ${
                selected.includes(resource)
                  ? 'border-[#5739FB] bg-[#5739FB]'
                  : 'border-zinc-600'
              }`}>
                {selected.includes(resource) && <div className="text-sm">✓</div>}
              </div>
              <div>{resource}</div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
