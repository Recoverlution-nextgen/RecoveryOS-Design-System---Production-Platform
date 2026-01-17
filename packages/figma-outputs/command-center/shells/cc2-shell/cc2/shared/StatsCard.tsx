/**
 * STATS CARD - Universal Stats Display Component
 * Used by ALL portal dashboards (Professional, Organisation)
 * infiniteK compliant: Glass effect, no rounded corners
 */

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  loading?: boolean;
}

export function StatsCard({ label, value, sublabel, icon: Icon, trend, loading }: StatsCardProps) {
  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-xl animate-pulse">
        <div className="h-4 w-24 bg-white/10 mb-3"></div>
        <div className="h-8 w-16 bg-white/10 mb-2"></div>
        {sublabel && <div className="h-3 w-32 bg-white/5"></div>}
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/8">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-5 h-5 opacity-50" />}
        <span className="text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
          {label}
        </span>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-3">
        <div className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          {value}
        </div>
        
        {trend && (
          <div className={`text-sm flex items-center gap-1 ${
            trend.direction === 'up' ? 'text-green-400' :
            trend.direction === 'down' ? 'text-red-400' :
            'text-gray-400'
          }`}>
            {trend.direction === 'up' && '↑'}
            {trend.direction === 'down' && '↓'}
            {trend.value}%
          </div>
        )}
      </div>

      {/* Sublabel */}
      {sublabel && (
        <p className="text-sm opacity-50 mt-2" style={{ fontFamily: 'var(--font-sans)' }}>
          {sublabel}
        </p>
      )}
    </div>
  );
}
