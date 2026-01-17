/**
 * GRIP SCAN PLAYER
 * 
 * Body-based check for tension/holding patterns
 * Response: Choice multi (where are you gripping?)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Hand } from 'lucide-react';

interface GripScanPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function GripScanPlayer({ navicue, variant, userState, onResponse }: GripScanPlayerProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  
  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };
  
  const handleSubmit = () => {
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'choice_multi',
      value: selectedAreas,
      timestamp: new Date().toISOString(),
    });
  };
  
  const bodyAreas = variant.copy.options || [
    'Jaw / Face',
    'Shoulders / Neck',
    'Chest / Breath',
    'Stomach / Gut',
    'Hands / Fists',
    'Lower back',
    'Nowhere (I feel open)'
  ];
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Hand className="w-10 h-10 text-[#5739FB]" />
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
      
      {/* Body Areas Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {bodyAreas.map((area, idx) => (
          <button
            key={idx}
            onClick={() => toggleArea(area)}
            className={`p-4 border-2 transition-all ${
              selectedAreas.includes(area)
                ? 'border-[#5739FB] bg-[#5739FB]/20'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 border-2 flex items-center justify-center ${
                selectedAreas.includes(area)
                  ? 'border-[#5739FB] bg-[#5739FB]'
                  : 'border-zinc-600'
              }`}>
                {selectedAreas.includes(area) && <div className="text-sm">✓</div>}
              </div>
              <div className="text-sm">{area}</div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={selectedAreas.length === 0}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
