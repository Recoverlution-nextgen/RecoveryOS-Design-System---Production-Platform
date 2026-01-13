import React from 'react';
import './AmbientField.css';
import { getFieldConfig, getPillarColors, type PillarId } from '../../../assets/tokens';

export interface AmbientFieldProps {
  variant?: 'calm' | 'heat' | 'return' | 'thread' | 'trace' | 'handrail' | PillarId;
  intensity?: 'low' | 'medium' | 'high';
  children?: React.ReactNode;
  className?: string;
}

export function AmbientField({
  variant = 'calm',
  intensity = 'medium',
  children,
  className = '',
}: AmbientFieldProps) {
  // Check if variant is a pillar ID
  const isPillar = ['ER', 'SR', 'SC', 'CR', 'II', 'DM'].includes(variant);
  const dataVariant = isPillar ? 'pillar' : variant;
  
  return (
    <div
      className={`ro-ambient ro-ambient--${dataVariant} ro-ambient--${intensity} ${className}`}
      data-variant={dataVariant}
      data-pillar={isPillar ? variant : undefined}
      data-intensity={intensity}
      aria-hidden="true"
    >
      <div className="ro-ambient__glow" />
      <div className="ro-ambient__glass" />
      {children}
    </div>
  );
}
