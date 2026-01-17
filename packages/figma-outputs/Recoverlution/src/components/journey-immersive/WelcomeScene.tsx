/**
 * Journey Welcome Scene
 * First-time immersive welcome (single screen)
 * 
 * infiniteK Design System:
 * - Full-screen background asset
 * - Dark gradient overlay
 * - Centered glass card
 * - Calm, present-moment messaging
 * - Single CTA: "Begin"
 */

import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getWelcomeAsset } from '../../utils/journeyAssetMapper';

interface WelcomeSceneProps {
  onBegin: () => void;
}

export function WelcomeScene({ onBegin }: WelcomeSceneProps) {
  return (
    <div className="journey-scene">
      {/* Full-screen background */}
      <div className="journey-background">
        <ImageWithFallback
          src={getWelcomeAsset()}
          alt="Journey welcome"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="journey-gradient-overlay" />
      </div>

      {/* Centered glass card */}
      <div className="journey-glass-card journey-stagger-1">
        <p className="journey-welcome-text">
          Welcome to your practice.
          
          Each day, you'll find one simple practice here. Something to notice. Something to try. Something that builds capacity over time.
          
          No timelines. No pressure. Just one day at a time.
        </p>

        <button className="journey-cta" onClick={onBegin}>
          Begin →
        </button>
      </div>
    </div>
  );
}
