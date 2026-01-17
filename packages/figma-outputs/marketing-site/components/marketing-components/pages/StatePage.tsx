import { useState } from 'react';
import { StateCheckIn } from '@/components/state/StateCheckIn';
import { StateTimeline } from '@/components/state/StateTimeline';
import type { StateCheckIn as StateCheckInType, StateTimelinePoint } from '@/lib/types/state';
import { Activity, Plus } from 'lucide-react';

export function StatePage() {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkIns, setCheckIns] = useState<StateCheckInType[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  const handleCheckInComplete = (checkIn: Partial<StateCheckInType>) => {
    const newCheckIn: StateCheckInType = {
      id: `checkin_${Date.now()}`,
      user_id: 'current_user', // TODO: Get from auth
      tempo: checkIn.tempo!,
      flow: checkIn.flow!,
      sync: checkIn.sync!,
      composite: checkIn.composite!,
      state_band: checkIn.state_band!,
      arousal_context: checkIn.arousal_context!,
      context: checkIn.context,
      triggered_by: checkIn.triggered_by || 'manual',
      captured_at: checkIn.captured_at || new Date().toISOString(),
    };

    setCheckIns(prev => [newCheckIn, ...prev]);
    setShowCheckIn(false);

    // TODO: Write to event_spine
    console.log('State check-in captured:', newCheckIn);
  };

  // Convert check-ins to timeline points
  const timelineData: StateTimelinePoint[] = checkIns.map(c => ({
    timestamp: c.captured_at,
    tempo: c.tempo,
    flow: c.flow,
    sync: c.sync,
    composite: c.composite,
    state_band: c.state_band,
  })).reverse();

  // Get latest check-in
  const latestCheckIn = checkIns[0];

  const stateBandColors: Record<string, { bg: string; border: string; text: string }> = {
    green: { bg: 'bg-[#5739FB]/10', border: 'border-[#5739FB]', text: 'text-[#5739FB]' },
    amber: { bg: 'bg-[#3E2BB8]/10', border: 'border-[#3E2BB8]', text: 'text-[#3E2BB8]' },
    red: { bg: 'bg-[#3E2BB8]/20', border: 'border-[#3E2BB8]', text: 'text-[#3E2BB8]' },
    shutdown: { bg: 'bg-[#3E2BB8]/30', border: 'border-[#3E2BB8]', text: 'text-[#3E2BB8]' },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#3E2BB8]/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="size-8 text-[#5739FB]" />
                <h1 className="text-[#3E2BB8]">State</h1>
              </div>
              <p className="text-[#3E2BB8]/60">
                Track your Tempo · Flow · Sync
              </p>
            </div>
            <button
              onClick={() => setShowCheckIn(true)}
              className="flex items-center gap-2 bg-[#5739FB] text-white px-6 py-3 hover:bg-[#3E2BB8] transition-colors"
            >
              <Plus className="size-5" />
              <span>New Check-In</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Latest State Card */}
        {latestCheckIn && (
          <div className={`p-6 ${stateBandColors[latestCheckIn.state_band].bg} border ${stateBandColors[latestCheckIn.state_band].border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#3E2BB8]/60 mb-1">Current State</p>
                <p className={`text-3xl ${stateBandColors[latestCheckIn.state_band].text} uppercase tracking-wide mb-2`}>
                  {latestCheckIn.state_band}
                </p>
                <div className="flex items-center gap-4 text-sm text-[#3E2BB8]/80">
                  <span>Tempo: {latestCheckIn.tempo}</span>
                  <span>Flow: {latestCheckIn.flow}</span>
                  <span>Sync: {latestCheckIn.sync}</span>
                </div>
                {latestCheckIn.context && (
                  <p className="text-sm text-[#3E2BB8]/60 mt-2">
                    {latestCheckIn.context}
                  </p>
                )}
              </div>
              <div className={`size-24 border-2 ${stateBandColors[latestCheckIn.state_band].border} ${stateBandColors[latestCheckIn.state_band].bg} flex items-center justify-center`}>
                <span className={`text-4xl ${stateBandColors[latestCheckIn.state_band].text}`}>
                  {latestCheckIn.composite}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <StateTimeline
          data={timelineData}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />

        {/* Recent Check-Ins */}
        <div className="bg-white border border-[#3E2BB8]/20">
          <div className="p-6 border-b border-[#3E2BB8]/20">
            <h3 className="text-[#3E2BB8]">Recent Check-Ins</h3>
          </div>
          <div className="divide-y divide-[#3E2BB8]/10">
            {checkIns.length === 0 ? (
              <div className="p-12 text-center text-[#3E2BB8]/60">
                No check-ins yet. Complete your first one to start tracking.
              </div>
            ) : (
              checkIns.slice(0, 10).map((checkIn) => {
                const colors = stateBandColors[checkIn.state_band];
                return (
                  <div key={checkIn.id} className="p-4 flex items-center justify-between hover:bg-[#3E2BB8]/5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs border ${colors.border} ${colors.bg} ${colors.text} uppercase`}>
                          {checkIn.state_band}
                        </span>
                        <span className="text-sm text-[#3E2BB8]/60">
                          {new Date(checkIn.captured_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#3E2BB8]/80">
                        <span>T: {checkIn.tempo}</span>
                        <span>F: {checkIn.flow}</span>
                        <span>S: {checkIn.sync}</span>
                        {checkIn.context && (
                          <>
                            <span className="text-[#3E2BB8]/40">·</span>
                            <span className="text-[#3E2BB8]/60">{checkIn.context}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={`size-12 border ${colors.border} ${colors.bg} flex items-center justify-center`}>
                      <span className={`text-lg ${colors.text}`}>{checkIn.composite}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Check-In Modal */}
      {showCheckIn && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6">
          <StateCheckIn
            onComplete={handleCheckInComplete}
            onCancel={() => setShowCheckIn(false)}
          />
        </div>
      )}
    </div>
  );
}
