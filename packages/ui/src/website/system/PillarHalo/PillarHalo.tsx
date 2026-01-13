import React from 'react';
import { getPillarColors, type PillarId } from '../../../assets/tokens';
import './PillarHalo.css';

export interface PillarHaloProps {
  pillarId: PillarId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PillarHalo({
  pillarId,
  size = 'md',
  intensity = 'medium',
  animated = false,
  className = '',
  children
}: PillarHaloProps) {
  const colors = getPillarColors(pillarId);
  
  return (
    <div
      className={`ro-pillar-halo ro-pillar-halo--${size} ro-pillar-halo--${intensity} ${animated ? 'ro-pillar-halo--animated' : ''} ${className}`}
      data-pillar={pillarId}
      style={{
        '--pillar-primary': colors.primary,
        '--pillar-secondary': colors.secondary,
      } as React.CSSProperties}
    >
      <div className="ro-pillar-halo__glow" />
      {children && <div className="ro-pillar-halo__content">{children}</div>}
    </div>
  );
}
