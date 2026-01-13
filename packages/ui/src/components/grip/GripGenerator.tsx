/**
 * GripGenerator — Intent + Time picker
 * 
 * Direction: Anchor (settle) | Compass (orient) | Handrail (hold)
 * Duration: 10s | 30s | 2m
 * 
 * Flow: Choose direction → Pick time → Confirm → Launch GripPlayer
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GripGenerator.css';

export interface GripConfig {
  direction: 'anchor' | 'compass' | 'handrail';
  duration: 10 | 30 | 120; // seconds
}

export interface GripGeneratorProps {
  /** Current lens mode */
  lens?: 'individual' | 'professional' | 'organisation';
  /** Callback when grip is confirmed */
  onConfirm?: (config: GripConfig) => void;
  /** Callback when cancelled */
  onCancel?: () => void;
}

export const GripGenerator: React.FC<GripGeneratorProps> = ({
  lens = 'individual',
  onConfirm,
  onCancel,
}) => {
  const [step, setStep] = useState<'direction' | 'duration'>('direction');
  const [direction, setDirection] = useState<GripConfig['direction'] | null>(null);
  const [duration, setDuration] = useState<GripConfig['duration']>(10);

  const handleDirectionSelect = (dir: GripConfig['direction']) => {
    setDirection(dir);
    setStep('duration');
  };

  const handleDurationSelect = (dur: GripConfig['duration']) => {
    setDuration(dur);
  };

  const handleConfirm = () => {
    if (direction) {
      onConfirm?.({ direction, duration });
    }
  };

  // Copy per lens and step
  const copy = {
    individual: {
      title: step === 'direction' ? 'What kind of help?' : 'How long?',
      anchor: { label: 'Settle', description: 'Ground yourself' },
      compass: { label: 'Orient', description: 'Find direction' },
      handrail: { label: 'Hold on', description: 'Stay steady' },
      confirm: 'Start',
    },
    professional: {
      title: step === 'direction' ? 'Select grip type' : 'Duration',
      anchor: { label: 'Anchor', description: 'Grounding protocol' },
      compass: { label: 'Compass', description: 'Orientation support' },
      handrail: { label: 'Handrail', description: 'Sustained hold' },
      confirm: 'Begin',
    },
    organisation: {
      title: step === 'direction' ? 'Grip type' : 'Duration (seconds)',
      anchor: { label: 'ANCHOR', description: 'Settling sequence' },
      compass: { label: 'COMPASS', description: 'Orienting sequence' },
      handrail: { label: 'HANDRAIL', description: 'Sustained sequence' },
      confirm: 'Execute',
    },
  };

  const directionOptions: Array<GripConfig['direction']> = ['anchor', 'compass', 'handrail'];
  const durationOptions: Array<GripConfig['duration']> = [10, 30, 120];

  return (
    <motion.div
      className={`grip-generator grip-generator--${lens}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      {/* Header */}
      <header className="grip-generator__header">
        <h2 className="grip-generator__title">{copy[lens].title}</h2>
        <button
          className="grip-generator__close"
          onClick={onCancel}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </header>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 'direction' && (
          <motion.div
            key="direction"
            className="grip-generator__step"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grip-generator__options">
              {directionOptions.map((dir) => (
                <motion.button
                  key={dir}
                  className={`grip-generator__option grip-generator__option--${dir}`}
                  onClick={() => handleDirectionSelect(dir)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="grip-generator__option-label">
                    {copy[lens][dir].label}
                  </span>
                  <span className="grip-generator__option-description">
                    {copy[lens][dir].description}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'duration' && (
          <motion.div
            key="duration"
            className="grip-generator__step"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grip-generator__duration-options">
              {durationOptions.map((dur) => (
                <motion.button
                  key={dur}
                  className={`grip-generator__duration-option ${duration === dur ? 'grip-generator__duration-option--selected' : ''}`}
                  onClick={() => handleDurationSelect(dur)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {dur < 60 ? `${dur}s` : `${Math.floor(dur / 60)}m`}
                </motion.button>
              ))}
            </div>

            <div className="grip-generator__actions">
              <motion.button
                className="grip-generator__back"
                onClick={() => setStep('direction')}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
              <motion.button
                className="grip-generator__confirm"
                onClick={handleConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copy[lens].confirm}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
