/**
 * STATE Renderer - Universal Player
 * 
 * Renders STATE check-in in the Universal Player
 * Simplified version of StatePage sliders
 */

import { useState } from 'react';
import { Zap, Target, Heart } from 'lucide-react';

interface StateRendererProps {
  content: any;
  metadata?: any;
  onInteraction?: (data: any) => void;
}

const STATE_METRICS = [
  {
    id: 'tempo',
    label: 'Tempo',
    subtitle: 'Physical rhythm',
    question: 'How does your body feel?',
    lowLabel: 'Depleted',
    highLabel: 'Energized',
    icon: Zap,
    color: '#5739FB'
  },
  {
    id: 'flow',
    label: 'Flow',
    subtitle: 'Mental clarity',
    question: 'How clear is your thinking?',
    lowLabel: 'Scattered',
    highLabel: 'Sharp',
    icon: Target,
    color: '#06B6D4'
  },
  {
    id: 'sync',
    label: 'Sync',
    subtitle: 'Emotional ground',
    question: 'How connected do you feel?',
    lowLabel: 'Untethered',
    highLabel: 'Anchored',
    icon: Heart,
    color: '#3E2BB8'
  }
];

export function StateRenderer({ content, metadata, onInteraction }: StateRendererProps) {
  const [values, setValues] = useState({
    tempo: 50,
    flow: 50,
    sync: 50
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (metric: string, value: number) => {
    setValues(prev => ({ ...prev, [metric]: value }));
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    if (onInteraction) {
      onInteraction({
        type: 'state_checkin',
        values,
        composite: Math.round((values.tempo + values.flow + values.sync) / 3)
      });
    }
  };

  return (
    <div>
      {/* Eyebrow */}
      <div className="mb-6 flex items-center gap-3">
        <div 
          className="w-2 h-2 bg-[#7C67FF]"
          style={{ borderRadius: '0px' }}
        />
        <div className="text-white/60 text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>
          STATE · RIGHT NOW
        </div>
      </div>

      {/* Glass card */}
      <div 
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 shadow-2xl"
        style={{ borderRadius: '0px' }}
      >
        {/* Accent */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 bg-[#7C67FF]"
        />

        {/* Content */}
        <div className="space-y-8">
          {/* Title */}
          <div>
            <h2 
              className="text-white leading-tight mb-2"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              How are you right now?
            </h2>
            <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
              Three dimensions. One moment.
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            {STATE_METRICS.map((metric) => {
              const Icon = metric.icon;
              const value = values[metric.id as keyof typeof values];
              
              return (
                <div key={metric.id} className="space-y-3">
                  {/* Label */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: metric.color }} />
                      <span className="text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {metric.label}
                      </span>
                      <span className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                        {metric.subtitle}
                      </span>
                    </div>
                    <span className="text-white/60 text-sm tabular-nums" style={{ fontFamily: 'var(--font-sans)' }}>
                      {value}
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleChange(metric.id, parseInt(e.target.value))}
                      disabled={hasSubmitted}
                      className="w-full h-2 appearance-none cursor-pointer"
                      style={{
                        borderRadius: '0px',
                        background: `linear-gradient(to right, ${metric.color}40 0%, ${metric.color}40 ${value}%, rgba(255,255,255,0.1) ${value}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                    {/* Labels */}
                    <div className="flex items-center justify-between mt-1.5 text-xs text-white/40">
                      <span>{metric.lowLabel}</span>
                      <span>{metric.highLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit button */}
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
              style={{ 
                borderRadius: '0px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600
              }}
            >
              Log STATE
            </button>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Logged
              </p>
              <p className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                Swipe to continue
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
