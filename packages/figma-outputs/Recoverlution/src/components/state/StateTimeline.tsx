import type { StateTimelinePoint } from '@/lib/types/state';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StateTimelineProps {
  data: StateTimelinePoint[];
  timeRange: '24h' | '7d' | '30d';
  onTimeRangeChange: (range: '24h' | '7d' | '30d') => void;
}

export function StateTimeline({ data, timeRange, onTimeRangeChange }: StateTimelineProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-[#3E2BB8]/20 p-12 text-center">
        <p className="text-[#3E2BB8]/60">
          No state data yet. Complete your first check-in to see your timeline.
        </p>
      </div>
    );
  }

  // Calculate averages and trends
  const avgTempo = Math.round(data.reduce((sum, d) => sum + d.tempo, 0) / data.length);
  const avgFlow = Math.round(data.reduce((sum, d) => sum + d.flow, 0) / data.length);
  const avgSync = Math.round(data.reduce((sum, d) => sum + d.sync, 0) / data.length);

  // Simple trend calculation (comparing first half to second half)
  const midpoint = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, midpoint);
  const secondHalf = data.slice(midpoint);
  
  const trend = (dimension: 'tempo' | 'flow' | 'sync') => {
    if (firstHalf.length === 0 || secondHalf.length === 0) return 'stable';
    const firstAvg = firstHalf.reduce((sum, d) => sum + d[dimension], 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, d) => sum + d[dimension], 0) / secondHalf.length;
    const diff = secondAvg - firstAvg;
    if (diff > 5) return 'up';
    if (diff < -5) return 'down';
    return 'stable';
  };

  const tempoTrend = trend('tempo');
  const flowTrend = trend('flow');
  const syncTrend = trend('sync');

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <TrendingUp className="size-4 text-[#5739FB]" />;
    if (trend === 'down') return <TrendingDown className="size-4 text-[#3E2BB8]" />;
    return <Minus className="size-4 text-[#3E2BB8]/40" />;
  };

  // Find max values for scaling
  const maxValue = 100;
  const chartHeight = 240;

  return (
    <div className="bg-white border border-[#3E2BB8]/20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#3E2BB8]/20">
        <div>
          <h3 className="text-[#3E2BB8] mb-1">State Timeline</h3>
          <p className="text-sm text-[#3E2BB8]/60">
            Your Tempo · Flow · Sync over time
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as const).map(range => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-4 py-2 text-sm border transition-colors ${
                timeRange === range
                  ? 'border-[#5739FB] bg-[#5739FB]/10 text-[#5739FB]'
                  : 'border-[#3E2BB8]/20 text-[#3E2BB8]/60 hover:border-[#3E2BB8]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-6 p-6 border-b border-[#3E2BB8]/20">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-[#3E2BB8]/60">Tempo Avg</span>
            <TrendIcon trend={tempoTrend} />
          </div>
          <p className="text-2xl text-[#5739FB]">{avgTempo}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-[#3E2BB8]/60">Flow Avg</span>
            <TrendIcon trend={flowTrend} />
          </div>
          <p className="text-2xl text-[#5739FB]">{avgFlow}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-[#3E2BB8]/60">Sync Avg</span>
            <TrendIcon trend={syncTrend} />
          </div>
          <p className="text-2xl text-[#5739FB]">{avgSync}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="relative" style={{ height: chartHeight }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-sm text-[#3E2BB8]/40">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 h-full relative">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(value => (
              <div
                key={value}
                className="absolute left-0 right-0 border-t border-[#3E2BB8]/10"
                style={{ bottom: `${value}%` }}
              />
            ))}

            {/* Data points and lines */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Tempo line */}
              <polyline
                points={data.map((d, i) => 
                  `${(i / (data.length - 1)) * 100}%,${100 - d.tempo}%`
                ).join(' ')}
                fill="none"
                stroke="#5739FB"
                strokeWidth="2"
                opacity="0.8"
              />

              {/* Flow line */}
              <polyline
                points={data.map((d, i) => 
                  `${(i / (data.length - 1)) * 100}%,${100 - d.flow}%`
                ).join(' ')}
                fill="none"
                stroke="#3E2BB8"
                strokeWidth="2"
                opacity="0.6"
              />

              {/* Sync line */}
              <polyline
                points={data.map((d, i) => 
                  `${(i / (data.length - 1)) * 100}%,${100 - d.sync}%`
                ).join(' ')}
                fill="none"
                stroke="#5739FB"
                strokeWidth="2"
                opacity="0.4"
                strokeDasharray="4 4"
              />
            </svg>

            {/* State band overlays */}
            {data.map((d, i) => {
              const bandColors: Record<string, string> = {
                green: 'bg-[#5739FB]/5',
                amber: 'bg-[#3E2BB8]/5',
                red: 'bg-[#3E2BB8]/10',
                shutdown: 'bg-[#3E2BB8]/20',
              };
              
              return (
                <div
                  key={i}
                  className={`absolute bottom-0 ${bandColors[d.state_band]}`}
                  style={{
                    left: `${(i / (data.length - 1)) * 100}%`,
                    width: `${100 / data.length}%`,
                    height: '100%',
                    opacity: 0.3,
                  }}
                  title={`${d.state_band} at ${new Date(d.timestamp).toLocaleString()}`}
                />
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-[#5739FB]" />
            <span className="text-[#3E2BB8]/60">Tempo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-[#3E2BB8]" />
            <span className="text-[#3E2BB8]/60">Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-[#5739FB] opacity-40" style={{ borderTop: '2px dashed' }} />
            <span className="text-[#3E2BB8]/60">Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}
