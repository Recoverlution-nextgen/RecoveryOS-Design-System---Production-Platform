/**
 * Practice Renderer - Universal Player
 * 
 * Renders Practices in the Universal Player
 * Showroom version - displays practice intro
 */

import { Timer, Heart, Zap } from 'lucide-react';

interface PracticeRendererProps {
  content: any;
  metadata?: any;
  onInteraction?: (data: any) => void;
}

export function PracticeRenderer({ content, metadata }: PracticeRendererProps) {
  if (!content) {
    return <div className="text-white text-center">No content available</div>;
  }

  const getDurationIcon = () => {
    const duration = content.duration_minutes || 5;
    if (duration <= 3) return Heart;
    if (duration <= 10) return Zap;
    return Timer;
  };

  const DurationIcon = getDurationIcon();

  return (
    <div>
      {/* Eyebrow */}
      <div className="mb-6 flex items-center gap-3">
        <div 
          className="w-2 h-2 bg-[#8B7DFF]"
          style={{ borderRadius: '0px' }}
        />
        <div className="text-white/60 text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>
          PRACTICE · {content.practice_type || 'TOOLKIT'}
        </div>
      </div>

      {/* Glass card */}
      <div 
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 shadow-2xl"
        style={{ borderRadius: '0px' }}
      >
        {/* Accent */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 bg-[#8B7DFF]"
        />

        {/* Content */}
        <div className="space-y-6">
          {/* Title */}
          <h2 
            className="text-white leading-tight"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)'
            }}
          >
            {content.practice_name || content.title || 'Practice'}
          </h2>

          {/* Duration */}
          {content.duration_minutes && (
            <div className="flex items-center gap-2 text-white/60">
              <DurationIcon className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-sans)' }}>
                {content.duration_minutes} minute{content.duration_minutes !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Description */}
          {content.description && (
            <p className="text-white/80 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              {content.description}
            </p>
          )}

          {/* Instructions preview */}
          {content.instructions && (
            <div className="space-y-3">
              <p className="text-white/40 text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
                How it works
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                {typeof content.instructions === 'string' 
                  ? content.instructions.slice(0, 120) + (content.instructions.length > 120 ? '...' : '')
                  : 'Step-by-step guidance available'}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4">
            <p className="text-white/40 text-sm text-center" style={{ fontFamily: 'var(--font-sans)' }}>
              Swipe to begin practice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
