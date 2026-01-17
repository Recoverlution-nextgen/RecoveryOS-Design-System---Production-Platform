/**
 * RISK BADGE - Universal Risk Indicator Component
 * Used across Professional and Organisation studios
 * Red/Amber/Green arousal band indicators
 */

interface RiskBadgeProps {
  level: 'green' | 'amber' | 'red';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskBadge({ level, label, size = 'md' }: RiskBadgeProps) {
  const colors = {
    green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
    red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  const { bg, text, border } = colors[level];
  const sizeClass = sizes[size];
  const dotSize = dotSizes[size];

  return (
    <div className={`inline-flex items-center gap-2 ${bg} ${border} border ${sizeClass} ${text}`}
      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
      <span className={`${dotSize} rounded-full ${text.replace('text-', 'bg-')}`} />
      <span className="uppercase tracking-wide">{label || level}</span>
    </div>
  );
}
