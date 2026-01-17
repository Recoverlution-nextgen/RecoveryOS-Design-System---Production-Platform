// USER STATE BADGE
import type { StateBand, ArousalContext } from '@/lib/types/constitution';

interface Props {
  stateBand: StateBand;
  arousalContext?: ArousalContext;
  tempo?: number;
  flow?: number;
  sync?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function UserStateBadge({
  stateBand,
  arousalContext,
  tempo,
  flow,
  sync,
  size = 'md',
}: Props) {
  const colors = {
    green: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    shutdown: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    any: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const label = arousalContext
    ? `${stateBand} · ${arousalContext}`
    : stateBand;
  
  const hoverContent = (tempo !== undefined && flow !== undefined && sync !== undefined)
    ? `Tempo: ${tempo}, Flow: ${flow}, Sync: ${sync}`
    : null;
  
  return (
    <div
      className={`inline-flex items-center gap-1 ${sizes[size]} ${colors[stateBand]} border rounded font-medium transition-all hover:scale-105`}
      title={hoverContent || undefined}
    >
      <div className={`w-2 h-2 rounded-full ${stateBand === 'green' ? 'bg-emerald-400' : stateBand === 'amber' ? 'bg-amber-400' : stateBand === 'red' ? 'bg-red-400' : 'bg-gray-400'}`} />
      <span className="uppercase tracking-wide">{label}</span>
    </div>
  );
}
