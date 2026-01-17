/**
 * NaviCue Recommendation Card
 * 
 * Displays LUMA's recommended NaviCue in HOME screen
 * Philosophy: Beautiful, clear, inviting - shows WHY this NaviCue now
 */

import { motion } from 'motion/react';
import { ArrowRight, SkipForward } from 'lucide-react';
import type { NaviCue } from '../navicues/NaviCueEngine';

interface NaviCueRecommendationCardProps {
  navicue: NaviCue;
  reason: string; // Why LUMA chose this now
  onLaunch: () => void;
  onSkip: () => void;
}

export function NaviCueRecommendationCard({
  navicue,
  reason,
  onLaunch,
  onSkip
}: NaviCueRecommendationCardProps) {
  
  const getResponseTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'tap': 'Choose',
      'binary': 'Yes or No',
      'slider': 'Scale',
      'one_word': 'One Word',
      'voice': 'Speak',
      'voice10': '10 Seconds',
      'breath': 'Breathe',
      'hold': 'Hold',
      'sort': 'Order',
      'body_map': 'Locate',
      'mirror': 'Reflect',
      'constellation': 'Map',
      'timeline': 'Place',
      'dial': 'Dial',
      'spectrum': 'Position',
      'comparison': 'See Change',
      'paradox': 'Hold Both',
      'echo': 'Repeat',
      'witness': 'Observe',
      'curveball': 'Surprise',
      'none': 'Read'
    };
    return labels[type] || 'Respond';
  };

  const getKBELabel = (kbe: string): string => {
    const labels: Record<string, string> = {
      'knowing': 'Awareness',
      'believing': 'Belief Work',
      'embodying': 'Embodiment'
    };
    return labels[kbe] || kbe;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden"
      style={{ borderRadius: '0px' }}
    >
      {/* Pillar accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: navicue.pillar_color }}
      />

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Pillar dot */}
            <div 
              className="w-3 h-3 flex-shrink-0"
              style={{ 
                backgroundColor: navicue.pillar_color,
                borderRadius: '0px'
              }}
            />
            
            {/* Pillar & Theme */}
            <div>
              <div className="text-white/60 text-xs uppercase tracking-wider">
                {navicue.pillar_name}
              </div>
              {navicue.theme_name && (
                <div className="text-white/40 text-xs">
                  {navicue.theme_name}
                </div>
              )}
            </div>
          </div>

          {/* Type badge */}
          <div 
            className="px-3 py-1 text-xs uppercase tracking-wider text-white/80 border border-white/20"
            style={{ borderRadius: '0px' }}
          >
            {getResponseTypeLabel(navicue.response_type)}
          </div>
        </div>

        {/* NaviCue text preview */}
        <div 
          className="text-white text-lg leading-relaxed line-clamp-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          "{navicue.text_line}"
        </div>

        {/* Why now - LUMA's reasoning */}
        <div className="flex items-start gap-2 p-3 bg-white/5 border-l-2" style={{ 
          borderRadius: '0px',
          borderLeftColor: navicue.pillar_color
        }}>
          <div className="text-white/60 text-sm">
            <span className="text-white/80" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Why now:
            </span>{' '}
            {reason}
          </div>
        </div>

        {/* K-B-E indicator */}
        <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider">
          <div className="w-1.5 h-1.5 bg-white/40" style={{ borderRadius: '0px' }} />
          {getKBELabel(navicue.kbe_target)}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-[1fr,auto] gap-3 pt-2">
          {/* Try This button */}
          <motion.button
            onClick={onLaunch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative py-4 px-6 bg-white/20 hover:bg-white/30 text-white transition-colors overflow-hidden group"
            style={{ borderRadius: '0px' }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${navicue.pillar_color}20, transparent)`
              }}
            />
            <div className="relative flex items-center justify-center gap-2">
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Try This
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.button>

          {/* Skip button */}
          <motion.button
            onClick={onSkip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center"
            style={{ borderRadius: '0px' }}
            title="Skip for now"
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
