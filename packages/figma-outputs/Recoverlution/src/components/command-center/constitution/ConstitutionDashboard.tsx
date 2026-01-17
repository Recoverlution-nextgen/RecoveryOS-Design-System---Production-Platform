// CONSTITUTION DASHBOARD (Tab 2)
import { useConstitutionHealth } from '@/lib/hooks/useConstitution';
import { LawStatusCard } from './LawStatusCard';
import { Activity, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

export function ConstitutionDashboard() {
  const { data: health, isLoading } = useConstitutionHealth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Activity className="w-8 h-8 text-gray-500 animate-pulse mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading constitution health...</p>
        </div>
      </div>
    );
  }
  
  if (!health) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-sm text-white/70">Failed to load constitution health</p>
        </div>
      </div>
    );
  }
  
  const statusColor =
    health.status === 'healthy' ? 'text-emerald-400' :
    health.status === 'degraded' ? 'text-amber-400' :
    'text-red-400';
  
  const statusBgColor =
    health.status === 'healthy' ? 'bg-emerald-500/20 border-emerald-500/30' :
    health.status === 'degraded' ? 'bg-amber-500/20 border-amber-500/30' :
    'bg-red-500/20 border-red-500/30';
  
  const statusIcon =
    health.status === 'healthy' ? CheckCircle2 :
    health.status === 'degraded' ? AlertCircle :
    AlertCircle;
  
  const StatusIcon = statusIcon;
  
  const healthyCount = health.laws.filter(l => l.status === 'healthy').length;
  const warningCount = health.laws.filter(l => l.status === 'warning').length;
  const violationCount = health.laws.filter(l => l.status === 'violation').length;
  
  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`col-span-1 md:col-span-2 p-6 ${statusBgColor} border rounded-lg`}>
          <div className="flex items-center gap-3 mb-4">
            <StatusIcon className={`w-8 h-8 ${statusColor}`} />
            <div>
              <h2 className={`text-2xl font-medium ${statusColor}`}>
                {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
              </h2>
              <p className="text-sm text-white/60">Constitution Status</p>
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <span className={`text-5xl font-medium ${statusColor}`}>
              {health.overall_score}
            </span>
            <span className="text-xl text-white/40 mb-2">/100</span>
          </div>
          
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                health.status === 'healthy' ? 'bg-emerald-500' :
                health.status === 'degraded' ? 'bg-amber-500' :
                'bg-red-500'
              }`}
              style={{ width: `${health.overall_score}%` }}
            />
          </div>
        </div>
        
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-white/60">Healthy</span>
          </div>
          <p className="text-3xl font-medium text-emerald-400">{healthyCount}</p>
          <p className="text-xs text-white/40 mt-1">laws passing</p>
        </div>
        
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-white/60">Warning</span>
          </div>
          <p className="text-3xl font-medium text-amber-400">{warningCount}</p>
          <p className="text-xs text-white/40 mt-1">laws degraded</p>
        </div>
      </div>
      
      {/* Violation Alert (if any) */}
      {violationCount > 0 && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-400">
              {violationCount} law{violationCount > 1 ? 's' : ''} violated
            </p>
            <p className="text-xs text-white/60 mt-0.5">
              Critical issues detected. Immediate attention required.
            </p>
          </div>
        </div>
      )}
      
      {/* The 10 Laws */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-white/70" />
          <h3 className="text-lg font-medium text-white/90">The 10 Laws</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {health.laws.map(law => (
            <LawStatusCard key={law.law_number} law={law} />
          ))}
        </div>
      </div>
      
      {/* Last Updated */}
      <div className="text-center text-xs text-white/40">
        Last updated: {new Date(health.last_updated).toLocaleString()}
      </div>
    </div>
  );
}
