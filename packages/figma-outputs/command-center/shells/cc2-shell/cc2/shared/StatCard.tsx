/**
 * STAT CARD - LIVE METRIC DISPLAY
 * Shows real-time stats with icon and color
 */

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-zinc-400 mb-1">{title}</p>
          <p className="text-3xl font-bold" style={{ color }}>{value}</p>
        </div>
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      <p className="text-xs text-zinc-500">{subtitle}</p>
    </div>
  );
}
