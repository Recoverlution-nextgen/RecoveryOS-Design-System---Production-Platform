// CONSTITUTION HEALTH BAR (shown in all tabs)
import { useConstitutionHealth } from '@/lib/hooks/useConstitution';
import { Activity } from 'lucide-react';

export function ConstitutionHealthBar() {
  const { data: health, isLoading } = useConstitutionHealth();
  
  if (isLoading || !health) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-white/10">
        <Activity className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">Loading constitution health...</span>
      </div>
    );
  }
  
  const statusColor =
    health.status === 'healthy' ? 'text-emerald-400' :
    health.status === 'degraded' ? 'text-amber-400' :
    'text-red-400';
  
  const barColor =
    health.status === 'healthy' ? 'bg-emerald-500' :
    health.status === 'degraded' ? 'bg-amber-500' :
    'bg-red-500';
  
  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-gray-900 border-b border-white/10">
      <div className="flex items-center gap-2">
        <Activity className={`w-4 h-4 ${statusColor}`} />
        <span className={`text-sm font-medium ${statusColor}`}>
          Constitution Health: {health.overall_score}/100
        </span>
      </div>
      
      <div className="flex-1 max-w-xs">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-500`}
            style={{ width: `${health.overall_score}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span>
          {health.laws.filter(l => l.status === 'healthy').length}/{health.laws.length} laws healthy
        </span>
      </div>
    </div>
  );
}
