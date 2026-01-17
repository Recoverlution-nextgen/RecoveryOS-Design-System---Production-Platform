// POLICY OUTCOME BADGE
import type { SafetyOutcome } from '@/lib/types/constitution';
import { Shield, ShieldAlert, ShieldOff, ShieldCheck, Pause, AlertCircle } from 'lucide-react';

interface Props {
  outcome: SafetyOutcome;
  reason?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PolicyBadge({ outcome, reason, size = 'md' }: Props) {
  const config = {
    allow: {
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: ShieldCheck,
      label: 'Allow',
    },
    allow_with_modification: {
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: Shield,
      label: 'Modified',
    },
    hold: {
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      icon: Pause,
      label: 'Hold',
    },
    block: {
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      icon: ShieldOff,
      label: 'Block',
    },
    block_and_route: {
      color: 'bg-red-600/20 text-red-500 border-red-600/30',
      icon: ShieldAlert,
      label: 'Block + Route',
    },
    require_support: {
      color: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
      icon: AlertCircle,
      label: 'Support Required',
    },
  };
  
  const { color, icon: Icon, label } = config[outcome];
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  return (
    <div
      className={`inline-flex items-center gap-1.5 ${sizes[size]} ${color} border rounded font-medium transition-all hover:scale-105`}
      title={reason}
    >
      <Icon className={iconSizes[size]} />
      <span className="uppercase tracking-wide">{label}</span>
    </div>
  );
}
