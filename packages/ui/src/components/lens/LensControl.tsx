/**
 * LensControl — Altitude toggle
 * Individual | Professional | Organisation
 * 
 * Changes tone, density, emphasis across entire UI
 */

import React from 'react';
import { motion } from 'framer-motion';
import './LensControl.css';

export interface LensControlProps {
  /** Current lens */
  value: 'individual' | 'professional' | 'organisation';
  /** Change handler */
  onChange: (lens: 'individual' | 'professional' | 'organisation') => void;
  /** Control size */
  size?: 'compact' | 'comfortable';
}

export const LensControl: React.FC<LensControlProps> = ({
  value,
  onChange,
  size = 'comfortable',
}) => {
  const lenses: Array<{ value: LensControlProps['value']; label: string; icon: string }> = [
    { value: 'individual', label: 'Individual', icon: '●' },
    { value: 'professional', label: 'Professional', icon: '◆' },
    { value: 'organisation', label: 'Organisation', icon: '■' },
  ];

  return (
    <div className={`lens-control lens-control--${size}`}>
      <div className="lens-control__track">
        {lenses.map((lens) => {
          const isActive = value === lens.value;
          return (
            <motion.button
              key={lens.value}
              className={`lens-control__option ${isActive ? 'lens-control__option--active' : ''}`}
              onClick={() => onChange(lens.value)}
              whileHover={{ scale: isActive ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="lens-control__icon">{lens.icon}</span>
              <span className="lens-control__label">{lens.label}</span>
              
              {isActive && (
                <motion.div
                  className="lens-control__active-indicator"
                  layoutId="lens-active-indicator"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
