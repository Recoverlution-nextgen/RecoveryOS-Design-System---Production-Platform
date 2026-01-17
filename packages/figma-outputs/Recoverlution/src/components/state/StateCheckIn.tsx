import { useState } from 'react';
import type { StateCheckIn as StateCheckInType } from '@/lib/types/state';
import { computeComposite, computeStateBand, computeArousalContext } from '@/lib/types/state';
import { Activity, Check } from 'lucide-react';

interface StateCheckInProps {
  onComplete: (checkIn: Partial<StateCheckInType>) => void;
  onCancel?: () => void;
  context?: string;
}

export function StateCheckIn({ onComplete, onCancel, context }: StateCheckInProps) {
  const [tempo, setTempo] = useState(50);
  const [flow, setFlow] = useState(50);
  const [sync, setSync] = useState(50);
  const [customContext, setCustomContext] = useState(context || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const composite = computeComposite(tempo, flow, sync);
  const stateBand = computeStateBand(composite);
  const arousalContext = computeArousalContext(tempo, sync);

  const stateBandColors: Record<string, { bg: string; border: string; text: string }> = {
    green: { bg: 'bg-[#5739FB]/10', border: 'border-[#5739FB]', text: 'text-[#5739FB]' },
    amber: { bg: 'bg-[#3E2BB8]/10', border: 'border-[#3E2BB8]', text: 'text-[#3E2BB8]' },
    red: { bg: 'bg-[#3E2BB8]/20', border: 'border-[#3E2BB8]', text: 'text-[#3E2BB8]' },
    shutdown: { bg: 'bg-[#3E2BB8]/30', border: 'border-[#3E2BB8]', text: 'text-[#3E2BB8]' },
  };

  const colors = stateBandColors[stateBand];

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    onComplete({
      tempo,
      flow,
      sync,
      composite,
      state_band: stateBand,
      arousal_context: arousalContext,
      context: customContext || undefined,
      triggered_by: 'manual',
      captured_at: new Date().toISOString(),
    });

    setTimeout(() => setIsSubmitting(false), 500);
  };

  const contextOptions = [
    'Morning check-in',
    'After practice',
    'Post-craving',
    'End of day',
    'Before meeting',
    'After trigger',
    'Just checking in',
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-[#3E2BB8]/20 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Activity className="size-6 text-[#5739FB]" />
          <h2 className="text-[#3E2BB8]">State Check-In</h2>
        </div>

        <p className="text-[#3E2BB8]/80 mb-8">
          Quick scan: How are you feeling right now?
        </p>

        {/* Sliders */}
        <div className="space-y-8 mb-8">
          {/* Tempo */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <div>
                <label className="block text-[#3E2BB8] mb-1">
                  Tempo
                </label>
                <p className="text-sm text-[#3E2BB8]/60">
                  Energy · Activation · Arousal
                </p>
              </div>
              <span className="text-2xl text-[#5739FB]">{tempo}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="w-full h-2 bg-[#3E2BB8]/20 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #5739FB ${tempo}%, #3E2BB820 ${tempo}%)`,
              }}
            />
            <div className="flex justify-between text-sm text-[#3E2BB8]/60 mt-2">
              <span>Shutdown</span>
              <span>Balanced</span>
              <span>Activated</span>
            </div>
          </div>

          {/* Flow */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <div>
                <label className="block text-[#3E2BB8] mb-1">
                  Flow
                </label>
                <p className="text-sm text-[#3E2BB8]/60">
                  Clarity · Focus · Presence
                </p>
              </div>
              <span className="text-2xl text-[#5739FB]">{flow}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={flow}
              onChange={(e) => setFlow(Number(e.target.value))}
              className="w-full h-2 bg-[#3E2BB8]/20 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #5739FB ${flow}%, #3E2BB820 ${flow}%)`,
              }}
            />
            <div className="flex justify-between text-sm text-[#3E2BB8]/60 mt-2">
              <span>Foggy</span>
              <span>Clear</span>
              <span>Sharp</span>
            </div>
          </div>

          {/* Sync */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <div>
                <label className="block text-[#3E2BB8] mb-1">
                  Sync
                </label>
                <p className="text-sm text-[#3E2BB8]/60">
                  Connection · Safety · Belonging
                </p>
              </div>
              <span className="text-2xl text-[#5739FB]">{sync}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sync}
              onChange={(e) => setSync(Number(e.target.value))}
              className="w-full h-2 bg-[#3E2BB8]/20 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #5739FB ${sync}%, #3E2BB820 ${sync}%)`,
              }}
            />
            <div className="flex justify-between text-sm text-[#3E2BB8]/60 mt-2">
              <span>Isolated</span>
              <span>Connected</span>
              <span>Aligned</span>
            </div>
          </div>
        </div>

        {/* Computed State */}
        <div className={`p-6 ${colors.bg} border ${colors.border} mb-8`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#3E2BB8]/60 mb-1">Current State</p>
              <p className={`text-2xl ${colors.text} uppercase tracking-wide`}>
                {stateBand}
              </p>
              <p className="text-sm text-[#3E2BB8]/60 mt-1 capitalize">
                {arousalContext} · Composite: {composite}
              </p>
            </div>
            <div className={`size-16 border-2 ${colors.border} ${colors.bg} flex items-center justify-center`}>
              <span className={`text-2xl ${colors.text}`}>{composite}</span>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="mb-8">
          <label className="block text-[#3E2BB8] mb-3">
            What's happening? (optional)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {contextOptions.map(option => (
              <button
                key={option}
                onClick={() => setCustomContext(option)}
                className={`px-3 py-2 text-sm border transition-colors ${
                  customContext === option
                    ? 'border-[#5739FB] bg-[#5739FB]/10 text-[#5739FB]'
                    : 'border-[#3E2BB8]/20 text-[#3E2BB8]/60 hover:border-[#3E2BB8]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={customContext}
            onChange={(e) => setCustomContext(e.target.value)}
            placeholder="Or type your own..."
            className="w-full px-4 py-3 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] placeholder:text-[#3E2BB8]/40 focus:outline-none focus:border-[#5739FB]"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 border border-[#3E2BB8]/20 text-[#3E2BB8] px-6 py-3 hover:bg-[#3E2BB8]/5 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-[#5739FB] text-white px-6 py-3 hover:bg-[#3E2BB8] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Check className="size-5" />
                <span>Captured</span>
              </>
            ) : (
              <span>Submit Check-In</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
