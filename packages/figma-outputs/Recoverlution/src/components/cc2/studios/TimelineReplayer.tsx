/**
 * TIMELINE REPLAYER - VISUALIZE USER'S DECISION HISTORY
 * Shows last 24h of LUMA decisions with full context
 * WhyNow explanations · State snapshots · Outcomes
 */

import { useState, useEffect } from 'react';
import { Clock, Play, Pause, SkipForward, Eye, Info, CheckCircle, XCircle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  event_type: 'decision' | 'exposure' | 'interaction' | 'proof';
  content_ref: string;
  content_kind: string;
  why_now: string;
  why_this: string;
  state_before: {
    band: 'green' | 'amber' | 'red';
    tempo: number;
    flow: number;
    arousal: number;
  };
  outcome: 'opened' | 'ignored' | 'completed' | 'blocked';
  resulted_in_proof: boolean;
  policy_version: string;
}

interface TimelineReplayerProps {
  userId: string;
}

export function TimelineReplayer({ userId }: TimelineReplayerProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    if (userId) {
      loadTimeline();
    }
  }, [userId]);

  const loadTimeline = async () => {
    setLoading(true);
    // Mock data - replace with real API call
    setTimeout(() => {
      const mockEvents: TimelineEvent[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          event_type: 'decision',
          content_ref: 'navicue-breath-001',
          content_kind: 'navicue',
          why_now: 'User in amber band with elevated arousal. Grounding practice needed.',
          why_this: 'Breath work has 89% historical success rate for this user in similar states.',
          state_before: {
            band: 'amber',
            tempo: 45,
            flow: 32,
            arousal: 68,
          },
          outcome: 'opened',
          resulted_in_proof: true,
          policy_version: 'v2.3.1',
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          event_type: 'decision',
          content_ref: 'soundtrack-courage-02',
          content_kind: 'soundbite',
          why_now: 'User scheduled important meeting in 2 hours. Pre-event support.',
          why_this: 'Courage lane historically reduces pre-event anxiety by 34%.',
          state_before: {
            band: 'green',
            tempo: 55,
            flow: 48,
            arousal: 52,
          },
          outcome: 'completed',
          resulted_in_proof: true,
          policy_version: 'v2.3.1',
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          event_type: 'decision',
          content_ref: 'practice-meditation-005',
          content_kind: 'practice',
          why_now: 'Morning routine trigger. User has 87% completion rate for morning practices.',
          why_this: 'Meditation creates baseline calm for the day ahead.',
          state_before: {
            band: 'green',
            tempo: 60,
            flow: 55,
            arousal: 45,
          },
          outcome: 'completed',
          resulted_in_proof: true,
          policy_version: 'v2.3.1',
        },
      ];
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  };

  const getBandColor = (band: string) => {
    switch (band) {
      case 'green': return '#10b981';
      case 'amber': return '#f59e0b';
      case 'red': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'opened':
        return <Eye className="w-4 h-4 text-blue-400" />;
      case 'ignored':
        return <XCircle className="w-4 h-4 text-zinc-500" />;
      case 'blocked':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Info className="w-4 h-4 text-zinc-400" />;
    }
  };

  if (!userId) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
        <Clock className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400">Enter a user ID to load their timeline</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
        <p className="text-zinc-400">Loading timeline...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Playback Controls */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            className="p-2 bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={4}>4x</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-zinc-400">
          {events.length} decisions in last 24h
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-[#5739FB] transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getBandColor(event.state_before.band) }}
                />
                <div>
                  <p className="text-sm text-zinc-400">
                    {new Date(event.timestamp).toLocaleTimeString()} · {idx === 0 ? 'Most Recent' : `${idx} earlier`}
                  </p>
                  <p className="text-white font-medium mt-1">
                    {event.content_kind.toUpperCase()} · {event.content_ref}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getOutcomeIcon(event.outcome)}
                {event.resulted_in_proof && (
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs">
                    PROOF
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase mb-1">State Before</p>
                <div className="flex gap-3 text-sm">
                  <span className="text-zinc-400">Tempo: <span className="text-white">{event.state_before.tempo}</span></span>
                  <span className="text-zinc-400">Flow: <span className="text-white">{event.state_before.flow}</span></span>
                  <span className="text-zinc-400">Arousal: <span className="text-white">{event.state_before.arousal}</span></span>
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase mb-1">Outcome</p>
                <p className="text-sm text-white capitalize">{event.outcome}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-zinc-500 uppercase mb-1">Why Now</p>
                <p className="text-sm text-zinc-300">{event.why_now}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase mb-1">Why This</p>
                <p className="text-sm text-zinc-300">{event.why_this}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500">
                Policy Version: <span className="text-zinc-400 font-mono">{event.policy_version}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-zinc-900 border border-zinc-700 max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Decision Trace Details</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <pre className="bg-zinc-950 border border-zinc-800 p-4 text-sm text-zinc-300 font-mono overflow-auto">
                {JSON.stringify(selectedEvent, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
