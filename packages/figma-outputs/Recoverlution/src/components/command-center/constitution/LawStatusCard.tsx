// LAW STATUS CARD
import type { LawStatus } from '@/lib/types/constitution';
import { CheckCircle2, AlertCircle, XCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Props {
  law: LawStatus;
}

export function LawStatusCard({ law }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  
  const statusConfig = {
    healthy: {
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      icon: CheckCircle2,
    },
    warning: {
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      icon: AlertCircle,
    },
    violation: {
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/20',
      icon: XCircle,
    },
  };
  
  const { color, bgColor, icon: Icon } = statusConfig[law.status];
  
  return (
    <div
      className={`p-4 border rounded-lg transition-all ${bgColor} ${showDetails ? 'ring-1 ring-white/10' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="text-xs font-medium text-white/50">LAW {law.law_number}</span>
          </div>
          
          <h4 className="text-sm font-medium text-white/90 mb-2">{law.law_name}</h4>
          
          <p className="text-sm text-white/70">{law.message}</p>
        </div>
        
        <div className="text-right flex flex-col items-end gap-2">
          <span className={`text-2xl font-medium ${color}`}>{law.score}</span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-white/50 hover:text-white/90 flex items-center gap-1 transition-colors"
          >
            Details
            <ChevronRight className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>
      
      {showDetails && law.details && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-xs space-y-1">
            {Object.entries(law.details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-white/50">{key.replace(/_/g, ' ')}:</span>
                <span className="text-white/80 font-mono">
                  {typeof value === 'number'
                    ? value.toLocaleString()
                    : JSON.stringify(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
