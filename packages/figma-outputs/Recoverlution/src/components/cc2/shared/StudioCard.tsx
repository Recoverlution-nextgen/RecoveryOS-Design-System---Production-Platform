/**
 * STUDIO CARD - CLICKABLE STUDIO LAUNCHER
 * Opens a studio when clicked
 */

import { Database, Activity, CheckCircle, Zap, Compass, Layers, Video, Music, Shield, Lock, RefreshCw, Package, Clock, Search, Beaker, TrendingUp, FileText, Play } from 'lucide-react';

interface StudioCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  badge?: string;
}

export function StudioCard({ title, description, icon, onClick, badge }: StudioCardProps) {
  const icons = {
    database: Database,
    activity: Activity,
    check: CheckCircle,
    zap: Zap,
    compass: Compass,
    layers: Layers,
    video: Video,
    music: Music,
    orbit: Activity, // placeholder
    shield: Shield,
    lock: Lock,
    refresh: RefreshCw,
    package: Package,
    clock: Clock,
    search: Search,
    beaker: Beaker,
    trending: TrendingUp,
    file: FileText,
    play: Play,
  };

  const Icon = icons[icon as keyof typeof icons] || Database;

  return (
    <button
      onClick={onClick}
      className="bg-zinc-900/50 border border-zinc-800 p-6 text-left hover:border-[#5739FB] hover:bg-zinc-900/80 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#3E2BB8]/10 border border-[#3E2BB8]/20 group-hover:bg-[#3E2BB8]/20 group-hover:border-[#3E2BB8]/40 transition-all">
          <Icon className="w-6 h-6 text-[#5739FB]" />
        </div>
        {badge && (
          <span className="px-2 py-1 text-xs bg-[#5739FB]/20 text-[#5739FB] border border-[#5739FB]/30">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-[#5739FB] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-400">
        {description}
      </p>
    </button>
  );
}
