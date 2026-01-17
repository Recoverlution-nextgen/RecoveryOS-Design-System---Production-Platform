/**
 * Journey Practice Accepted Scene
 * Confirmation after accepting practice
 * 
 * infiniteK Design System:
 * - Same background as practice scene
 * - Centered glass card with checkmark
 * - Calm confirmation message
 * - Two CTAs: Dashboard or Reflect
 */

import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getPracticeAsset } from '../../utils/journeyAssetMapper';
import { Block } from '../../utils/supabase/api';

interface AcceptedSceneProps {
  practice: Block;
  onDashboard: () => void;
  onReflect?: () => void;
}

export function AcceptedScene({ practice, onDashboard, onReflect }: AcceptedSceneProps) {
  return (
    <div className="journey-scene">
      {/* Same background as practice */}
      <div className="journey-background">
        <ImageWithFallback
          src={getPracticeAsset(practice.theme_id)}
          alt="Practice background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="journey-gradient-overlay-purple" />
      </div>

      {/* Confirmation card */}
      <div className="journey-glass-card journey-stagger-1">
        {/* Checkmark */}
        <div className="journey-checkmark journey-stagger-2">✓</div>
        
        {/* Confirmation message */}
        <p className="journey-confirmation-text journey-stagger-3">
          Practice it whenever you're ready.
          
          Carry it with you today. Notice the moments it shows up. There's no deadline, no timer. Just awareness.
        </p>
        
        {/* CTAs */}
        <div className="journey-button-group journey-stagger-4">
          <button className="journey-cta" onClick={onDashboard}>
            Back to Dashboard
          </button>
          
          {onReflect && (
            <button className="journey-btn-secondary" onClick={onReflect}>
              Reflect on this practice
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
