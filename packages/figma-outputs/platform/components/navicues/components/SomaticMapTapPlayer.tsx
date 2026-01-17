/**
 * SOMATIC MAP TAP PLAYER
 * 
 * Body sensation location + intensity
 * Response: Choice single (where do you feel it)
 */

import React, { useState } from 'react';
import { NavicuePlayerDTO, NavicueVariantDTO, StateSnapshot } from '../../../types/navicue-contract';
import { Activity } from 'lucide-react';

interface SomaticMapTapPlayerProps {
  navicue: NavicuePlayerDTO;
  variant: NavicueVariantDTO;
  userState?: StateSnapshot;
  onResponse: (response: any, statePost?: StateSnapshot) => void;
}

export function SomaticMapTapPlayer({ navicue, variant, userState, onResponse }: SomaticMapTapPlayerProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);
  
  const handleSubmit = () => {
    if (!selectedLocation) return;
    
    onResponse({
      navicue_id: navicue.navicue_id,
      response_type: 'choice_single',
      value: selectedLocation,
      metadata: { intensity },
      timestamp: new Date().toISOString(),
    });
  };
  
  const locations = variant.copy.options || [
    'Chest (tight, heavy)',
    'Throat (choked, closed)',
    'Stomach (knotted, nauseous)',
    'Head (pressure, fog)',
    'Everywhere (flooding)',
    'Nowhere (numb)'
  ];
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Activity className="w-10 h-10 text-[#5739FB]" />
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
      
      {/* Location Options */}
      <div className="space-y-3 mb-8">
        {locations.map((location, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedLocation(location)}
            className={`w-full p-4 border-2 text-left transition-all ${
              selectedLocation === location
                ? 'border-[#5739FB] bg-[#5739FB]/20'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            {location}
          </button>
        ))}
      </div>
      
      {/* Intensity Slider */}
      {selectedLocation && (
        <div className="mb-8">
          <label className="block text-base opacity-70 mb-3 text-center">
            How intense is the sensation?
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs opacity-60 mt-2">
            <span>Barely there</span>
            <span className="text-2xl text-[#5739FB]">{intensity}</span>
            <span>Overwhelming</span>
          </div>
        </div>
      )}
      
      {/* Continue */}
      <button
        onClick={handleSubmit}
        disabled={!selectedLocation}
        className="w-full px-6 py-4 bg-[#5739FB] hover:bg-[#3E2BB8] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
