import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

interface InsightHeaderProps {
  title: string;
  pillarName: string;
  pillarId: string;
  conceptName: string;
  themeName: string;
  blockName: string;
  blockStatus?: 'red' | 'orange' | 'green';
  estimatedMinutes: number;
  onBack?: () => void;
}

export function InsightHeader({
  title,
  pillarName,
  pillarId,
  conceptName,
  themeName,
  blockName,
  blockStatus = 'red',
  estimatedMinutes,
  onBack
}: InsightHeaderProps) {
  const statusColors = {
    red: 'bg-red-500/10 text-red-600 border-red-500/20',
    orange: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    green: 'bg-green-500/10 text-green-600 border-green-500/20'
  };

  const pillarColors: Record<string, string> = {
    ER: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
    SR: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    SC: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    CR: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    II: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    PS: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20'
  };

  return (
    <div className="glass-panel p-8">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Insights
        </button>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge className={pillarColors[pillarId] || pillarColors.ER}>
          {pillarName}
        </Badge>
        <span className="text-muted-foreground text-sm">→</span>
        <span className="text-sm text-muted-foreground">{conceptName}</span>
        <span className="text-muted-foreground text-sm">→</span>
        <span className="text-sm text-muted-foreground">{themeName}</span>
      </div>

      <h1 className="mb-4">{title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="size-4" />
          <span>{estimatedMinutes} minute read</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Addresses:</span>
          <Badge className={statusColors[blockStatus]}>
            {blockName}
          </Badge>
        </div>
      </div>
    </div>
  );
}
