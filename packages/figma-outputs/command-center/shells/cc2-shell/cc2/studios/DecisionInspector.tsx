/**
 * DECISION INSPECTOR - DEEP DIVE INTO A SINGLE LUMA DECISION
 * Full candidate set · Policy outcomes · WhyNow breakdown
 * The "one in a million" debugging tool
 */

import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle, Shield, Zap } from 'lucide-react';

interface Candidate {
  content_ref: string;
  content_kind: string;
  rank_score: number;
  policy_outcome: 'allow' | 'allow_modified' | 'hold' | 'block_route' | 'require_support';
  safety_flags: string[];
  targeting_match: number;
  historical_performance: number;
  why_ranked_here: string;
}

interface DecisionTrace {
  id: string;
  timestamp: string;
  user_id: string;
  state_snapshot: {
    band: 'green' | 'amber' | 'red';
    tempo: number;
    flow: number;
    arousal: number;
    recent_completions: number;
  };
  candidates: Candidate[];
  selected: {
    content_ref: string;
    why_this: string;
    why_now: string;
    proof_target: string;
    next_if_works: string;
    next_if_fails: string;
  };
  policy_version: string;
  runtime_ms: number;
}

interface DecisionInspectorProps {
  decisionId: string;
}

export function DecisionInspector({ decisionId }: DecisionInspectorProps) {
  const [trace, setTrace] = useState<DecisionTrace | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    if (decisionId) {
      loadDecision();
    }
  }, [decisionId]);

  const loadDecision = async () => {
    setLoading(true);
    // Mock data - replace with real API call
    setTimeout(() => {
      const mockTrace: DecisionTrace = {
        id: 'decision-abc123',
        timestamp: new Date().toISOString(),
        user_id: 'user-xyz789',
        state_snapshot: {
          band: 'amber',
          tempo: 45,
          flow: 32,
          arousal: 68,
          recent_completions: 3,
        },
        candidates: [
          {
            content_ref: 'navicue-breath-001',
            content_kind: 'navicue',
            rank_score: 0.92,
            policy_outcome: 'allow',
            safety_flags: [],
            targeting_match: 0.95,
            historical_performance: 0.89,
            why_ranked_here: 'Perfect state match + high historical success + no safety concerns',
          },
          {
            content_ref: 'practice-meditation-005',
            content_kind: 'practice',
            rank_score: 0.85,
            policy_outcome: 'allow',
            safety_flags: [],
            targeting_match: 0.88,
            historical_performance: 0.82,
            why_ranked_here: 'Good state match + solid performance but longer duration than ideal',
          },
          {
            content_ref: 'navicue-movement-003',
            content_kind: 'navicue',
            rank_score: 0.78,
            policy_outcome: 'hold',
            safety_flags: ['fatigue_cooldown_active'],
            targeting_match: 0.90,
            historical_performance: 0.76,
            why_ranked_here: 'Strong targeting but on cooldown from 2h ago',
          },
          {
            content_ref: 'journey-scene-crisis-001',
            content_kind: 'journey_scene',
            rank_score: 0.45,
            policy_outcome: 'block_route',
            safety_flags: ['state_mismatch', 'requires_green_band'],
            targeting_match: 0.30,
            historical_performance: 0.91,
            why_ranked_here: 'High performance but wrong state. User not ready. Route to grounding first.',
          },
        ],
        selected: {
          content_ref: 'navicue-breath-001',
          why_this: 'Breath work has 89% historical success rate for this user in similar states. Perfect targeting match.',
          why_now: 'User in amber band with elevated arousal. Grounding practice needed before higher-order work.',
          proof_target: 'State delta: expect tempo +10, arousal -15 within 5 minutes',
          next_if_works: 'Open path to courage lane or connection practices',
          next_if_fails: 'Route to shorter grounding cue or offer support check-in',
        },
        policy_version: 'v2.3.1',
        runtime_ms: 34,
      };
      setTrace(mockTrace);
      setLoading(false);
    }, 500);
  };

  const getPolicyOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'allow': return 'text-green-400 bg-green-500/20';
      case 'allow_modified': return 'text-blue-400 bg-blue-500/20';
      case 'hold': return 'text-yellow-400 bg-yellow-500/20';
      case 'block_route': return 'text-red-400 bg-red-500/20';
      case 'require_support': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-zinc-400 bg-zinc-500/20';
    }
  };

  const getPolicyIcon = (outcome: string) => {
    switch (outcome) {
      case 'allow': return <CheckCircle className="w-4 h-4" />;
      case 'allow_modified': return <AlertCircle className="w-4 h-4" />;
      case 'hold': return <AlertCircle className="w-4 h-4" />;
      case 'block_route': return <XCircle className="w-4 h-4" />;
      case 'require_support': return <Shield className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  if (!decisionId) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
        <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400">Select a decision from the timeline to inspect</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
        <p className="text-zinc-400">Loading decision trace...</p>
      </div>
    );
  }

  if (!trace) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
        <p className="text-zinc-400">Decision not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <p className="text-xs text-zinc-500 uppercase mb-1">State Band</p>
          <p className="text-2xl font-bold capitalize" style={{ 
            color: trace.state_snapshot.band === 'green' ? '#10b981' : 
                   trace.state_snapshot.band === 'amber' ? '#f59e0b' : '#ef4444' 
          }}>
            {trace.state_snapshot.band}
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <p className="text-xs text-zinc-500 uppercase mb-1">Candidates</p>
          <p className="text-2xl font-bold text-white">{trace.candidates.length}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <p className="text-xs text-zinc-500 uppercase mb-1">Runtime</p>
          <p className="text-2xl font-bold text-white">{trace.runtime_ms}ms</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <p className="text-xs text-zinc-500 uppercase mb-1">Policy</p>
          <p className="text-sm font-mono text-zinc-300">{trace.policy_version}</p>
        </div>
      </div>

      {/* State Snapshot */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#5739FB]" />
          State Snapshot
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-zinc-500 uppercase mb-1">Tempo</p>
            <p className="text-xl font-bold text-white">{trace.state_snapshot.tempo}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase mb-1">Flow</p>
            <p className="text-xl font-bold text-white">{trace.state_snapshot.flow}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase mb-1">Arousal</p>
            <p className="text-xl font-bold text-white">{trace.state_snapshot.arousal}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase mb-1">Recent Completions</p>
            <p className="text-xl font-bold text-white">{trace.state_snapshot.recent_completions}</p>
          </div>
        </div>
      </div>

      {/* Selected Content */}
      <div className="bg-gradient-to-br from-[#3E2BB8]/20 to-[#5739FB]/20 border border-[#5739FB] p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          Selected Content
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 uppercase mb-1">Content Ref</p>
            <p className="text-white font-mono">{trace.selected.content_ref}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase mb-1">Why This</p>
              <p className="text-sm text-zinc-300">{trace.selected.why_this}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase mb-1">Why Now</p>
              <p className="text-sm text-zinc-300">{trace.selected.why_now}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase mb-1">Proof Target</p>
            <p className="text-sm text-zinc-300">{trace.selected.proof_target}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase mb-1">Next if Works</p>
              <p className="text-sm text-zinc-300">{trace.selected.next_if_works}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase mb-1">Next if Fails</p>
              <p className="text-sm text-zinc-300">{trace.selected.next_if_fails}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Rankings */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-6">
        <h3 className="text-lg font-bold mb-4">Candidate Rankings</h3>
        <div className="space-y-3">
          {trace.candidates.map((candidate, idx) => (
            <div
              key={candidate.content_ref}
              onClick={() => setSelectedCandidate(candidate)}
              className={`
                p-4 border transition-colors cursor-pointer
                ${candidate.content_ref === trace.selected.content_ref
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-zinc-700 hover:border-zinc-600'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-zinc-600">#{idx + 1}</div>
                  <div>
                    <p className="text-white font-medium">{candidate.content_ref}</p>
                    <p className="text-sm text-zinc-400">{candidate.content_kind}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 text-xs flex items-center gap-1 ${getPolicyOutcomeColor(candidate.policy_outcome)}`}>
                    {getPolicyIcon(candidate.policy_outcome)}
                    {candidate.policy_outcome.replace('_', ' ').toUpperCase()}
                  </div>
                  {candidate.content_ref === trace.selected.content_ref && (
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs">
                      SELECTED
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Rank Score</p>
                  <p className="text-lg font-bold text-white">{(candidate.rank_score * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Targeting Match</p>
                  <p className="text-lg font-bold text-blue-400">{(candidate.targeting_match * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Historical</p>
                  <p className="text-lg font-bold text-purple-400">{(candidate.historical_performance * 100).toFixed(0)}%</p>
                </div>
              </div>

              {candidate.safety_flags.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-zinc-500 mb-1">Safety Flags</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.safety_flags.map((flag) => (
                      <span key={flag} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs">
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-zinc-500 mb-1">Why Ranked Here</p>
                <p className="text-sm text-zinc-300">{candidate.why_ranked_here}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-zinc-900 border border-zinc-700 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Candidate Details</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <pre className="bg-zinc-950 border border-zinc-800 p-4 text-sm text-zinc-300 font-mono overflow-auto">
                {JSON.stringify(selectedCandidate, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
