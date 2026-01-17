/**
 * BODY_MAP Response Component
 * 
 * Tap body regions to locate sensations
 * Psychology: Builds interoceptive awareness, mind-body connection
 */

import { useState } from 'react';
import { motion } from 'motion/react';

type BodyRegion = 'head' | 'chest' | 'gut' | 'hands' | 'legs';

interface BodyMapResponseProps {
  regions?: BodyRegion[];
  multiSelect?: boolean;
  onRespond: (selectedRegions: BodyRegion[]) => void;
  pillarColor: string;
}

export function BodyMapResponse({
  regions = ['head', 'chest', 'gut', 'hands', 'legs'],
  multiSelect = true,
  onRespond,
  pillarColor
}: BodyMapResponseProps) {
  const [selectedRegions, setSelectedRegions] = useState<BodyRegion[]>([]);

  const toggleRegion = (region: BodyRegion) => {
    if (multiSelect) {
      setSelectedRegions(prev =>
        prev.includes(region)
          ? prev.filter(r => r !== region)
          : [...prev, region]
      );
    } else {
      setSelectedRegions([region]);
    }
  };

  const isSelected = (region: BodyRegion) => selectedRegions.includes(region);

  const handleContinue = () => {
    onRespond(selectedRegions);
  };

  return (
    <div className="space-y-8">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Tap where you feel it
      </div>

      {/* Body diagram */}
      <div className="relative mx-auto w-full max-w-xs">
        <svg
          viewBox="0 0 200 400"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
        >
          {/* Head */}
          {regions.includes('head') && (
            <motion.ellipse
              cx="100"
              cy="40"
              rx="30"
              ry="35"
              fill={isSelected('head') ? pillarColor : 'rgba(255,255,255,0.2)'}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              onClick={() => toggleRegion('head')}
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          )}

          {/* Chest */}
          {regions.includes('chest') && (
            <motion.rect
              x="60"
              y="80"
              width="80"
              height="80"
              fill={isSelected('chest') ? pillarColor : 'rgba(255,255,255,0.2)'}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              onClick={() => toggleRegion('chest')}
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          )}

          {/* Gut */}
          {regions.includes('gut') && (
            <motion.rect
              x="65"
              y="165"
              width="70"
              height="70"
              fill={isSelected('gut') ? pillarColor : 'rgba(255,255,255,0.2)'}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              onClick={() => toggleRegion('gut')}
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          )}

          {/* Hands */}
          {regions.includes('hands') && (
            <>
              {/* Left hand */}
              <motion.circle
                cx="40"
                cy="180"
                r="15"
                fill={isSelected('hands') ? pillarColor : 'rgba(255,255,255,0.2)'}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                onClick={() => toggleRegion('hands')}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              {/* Right hand */}
              <motion.circle
                cx="160"
                cy="180"
                r="15"
                fill={isSelected('hands') ? pillarColor : 'rgba(255,255,255,0.2)'}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                onClick={() => toggleRegion('hands')}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </>
          )}

          {/* Legs */}
          {regions.includes('legs') && (
            <>
              {/* Left leg */}
              <motion.rect
                x="70"
                y="240"
                width="25"
                height="120"
                fill={isSelected('legs') ? pillarColor : 'rgba(255,255,255,0.2)'}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                onClick={() => toggleRegion('legs')}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              {/* Right leg */}
              <motion.rect
                x="105"
                y="240"
                width="25"
                height="120"
                fill={isSelected('legs') ? pillarColor : 'rgba(255,255,255,0.2)'}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                onClick={() => toggleRegion('legs')}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </>
          )}
        </svg>
      </div>

      {/* Selected regions display */}
      {selectedRegions.length > 0 && (
        <div className="text-center">
          <div className="text-white/60 text-sm mb-2">Selected</div>
          <div 
            className="text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600
            }}
          >
            {selectedRegions.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
          </div>
        </div>
      )}

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={selectedRegions.length === 0}
        className="w-full py-4 bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          borderRadius: '0px',
          fontFamily: 'var(--font-display)',
          fontWeight: 600
        }}
      >
        Continue
      </button>
    </div>
  );
}
