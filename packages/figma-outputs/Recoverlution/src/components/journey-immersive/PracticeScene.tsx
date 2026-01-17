/**
 * Journey Practice Scene
 * Daily practice display with LUMA personalization
 * 
 * infiniteK Design System:
 * - Full-screen practice-specific background
 * - Purple gradient overlay
 * - Main glass card (practice details)
 * - Supporting "Why Now" card (LUMA reasoning)
 * - Patient language only (no backend jargon)
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getPracticeAsset } from '../../utils/journeyAssetMapper';
import { Block } from '../../utils/supabase/api';

interface PracticeSceneProps {
  practice: Block;
  whyNow: string;
  onBack: () => void;
  onAccept: () => void;
}

export function PracticeScene({ practice, whyNow, onBack, onAccept }: PracticeSceneProps) {
  // Get day-specific prompt
  const prompt = getDayPrompt(practice);

  return (
    <div className="journey-scene">
      {/* Full-screen background with practice-specific asset */}
      <div className="journey-background">
        <ImageWithFallback
          src={getPracticeAsset(practice.theme_id)}
          alt="Practice background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="journey-gradient-overlay-purple" />
      </div>

      {/* Top navigation bar */}
      <div className="journey-nav-bar">
        <button className="journey-nav-back" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <span className="journey-nav-title">Journey ·</span>
      </div>

      {/* Main content (centered) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', marginTop: '80px' }}>
        {/* Main practice card */}
        <div className="journey-practice-card journey-stagger-1">
          <div className="journey-badge journey-stagger-2">Your practice today</div>
          
          <h1 className="journey-stagger-3">{practice.name}.</h1>
          <div className="journey-title-underline journey-stagger-3" />
          
          <p className="journey-practice-body journey-stagger-4">
            {prompt}
          </p>
          
          <button className="journey-cta journey-stagger-4" onClick={onAccept}>
            I'll try this today →
          </button>
        </div>

        {/* Why now card */}
        {whyNow && (
          <div className="journey-why-card journey-stagger-4">
            <h3>💡 Why this practice now</h3>
            <p>{whyNow}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Get day-specific prompt from block
 * Maps current day to appropriate ERA field (flat structure)
 */
function getDayPrompt(block: Block): string {
  const today = new Date().getDay(); // 0=Sun, 1=Mon, etc.
  
  // Map day of week to ERA key (flat structure)
  const dayKeys: Record<number, keyof Block['era']> = {
    0: 'sun_reflect',
    1: 'mon_seed',
    2: 'tue_embody',
    3: 'wed_root',
    4: 'thu_adapt',
    5: 'fri_lens',
    6: 'sat_integrate'
  };
  
  const key = dayKeys[today];
  
  // Get prompt from ERA (flat structure)
  if (block.era && key && block.era[key]) {
    return block.era[key] as string;
  }
  
  // Fallback: use mon_seed if available
  if (block.era?.mon_seed) {
    return block.era.mon_seed;
  }
  
  // Final fallback
  return 'Notice the space between trigger and response. Practice awareness today.';
}
