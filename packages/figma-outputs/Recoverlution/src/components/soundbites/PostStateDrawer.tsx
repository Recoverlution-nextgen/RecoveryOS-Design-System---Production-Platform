/**
 * POST-STATE CAPTURE DRAWER
 * 4-slider UI for capturing state after soundbite playback
 * 
 * Captures: Energy, Clarity, Arousal, Connection (1-10 scale)
 * Triggered: Automatically when track ends OR manually via button
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Brain, Heart, Users } from 'lucide-react';

interface PostStateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (state: PostState) => Promise<void>;
  soundbiteTitle?: string;
}

export interface PostState {
  energy: number;
  clarity: number;
  arousal: number;
  connection: number;
}

export function PostStateDrawer({ isOpen, onClose, onSubmit, soundbiteTitle }: PostStateDrawerProps) {
  const [energy, setEnergy] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [arousal, setArousal] = useState(5);
  const [connection, setConnection] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit({ energy, clarity, arousal, connection });
      onClose();
    } catch (error) {
      console.error('[PostStateDrawer] Submit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-50 max-h-[85vh] overflow-y-auto"
            style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-gray-900">How do you feel now?</h2>
                  {soundbiteTitle && (
                    <p className="text-sm text-gray-500 mt-1">{soundbiteTitle}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ borderRadius: '8px' }}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="px-6 py-6 space-y-8">
              {/* Energy */}
              <StateSlider
                label="Energy"
                value={energy}
                onChange={setEnergy}
                icon={Zap}
                color="#3E2BB8"
                lowLabel="Drained"
                highLabel="Energized"
              />

              {/* Clarity */}
              <StateSlider
                label="Clarity"
                value={clarity}
                onChange={setClarity}
                icon={Brain}
                color="#5739FB"
                lowLabel="Foggy"
                highLabel="Clear"
              />

              {/* Arousal */}
              <StateSlider
                label="Arousal"
                value={arousal}
                onChange={setArousal}
                icon={Heart}
                color="#3E2BB8"
                lowLabel="Calm"
                highLabel="Activated"
              />

              {/* Connection */}
              <StateSlider
                label="Connection"
                value={connection}
                onChange={setConnection}
                icon={Users}
                color="#5739FB"
                lowLabel="Isolated"
                highLabel="Connected"
              />
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={handleSkip}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
                style={{ borderRadius: '12px' }}
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 text-white transition-colors disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
                  borderRadius: '12px',
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface StateSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: React.ElementType;
  color: string;
  lowLabel: string;
  highLabel: string;
}

function StateSlider({ label, value, onChange, icon: Icon, color, lowLabel, highLabel }: StateSliderProps) {
  return (
    <div>
      {/* Label + Icon */}
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="text-gray-900">{label}</span>
        <span className="ml-auto text-2xl" style={{ color }}>
          {value}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none cursor-pointer"
        style={{
          borderRadius: '4px',
          background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - 1) / 9) * 100}%, #E5E7EB ${((value - 1) / 9) * 100}%, #E5E7EB 100%)`,
        }}
      />

      {/* Labels */}
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">{lowLabel}</span>
        <span className="text-xs text-gray-500">{highLabel}</span>
      </div>
    </div>
  );
}
