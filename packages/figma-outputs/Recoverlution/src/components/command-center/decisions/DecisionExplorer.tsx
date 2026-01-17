// DECISION EXPLORER (Tab 6) - COMPLETE TAB
import { useState } from 'react';
import { useDecisionTraces, useDecisionStats } from '@/lib/hooks/useDecisions';
import { useContentEnvelope } from '@/lib/hooks/useRegistry';
import { UserStateBadge } from '../shared/UserStateBadge';
import { PolicyBadge } from '../shared/PolicyBadge';
import type { DecisionTrace, DecisionTraceFilters } from '@/lib/types/constitution';
import {
  Search,
  Filter,
  Lightbulb,
  Target,
  Shield,
  TrendingUp,
  Clock,
  Zap,
} from 'lucide-react';

export function DecisionExplorer() {
  const [filters, setFilters] = useState<DecisionTraceFilters>({});
  const [selectedTrace, setSelectedTrace] = useState<DecisionTrace | null>(null);
  
  const { data: traces, isLoading } = useDecisionTraces(filters);
  const { data: stats } = useDecisionStats();
  const { data: chosenContent } = useContentEnvelope(selectedTrace?.content_ref_chosen || null);
  
  return (
    <div className="h-full flex">
      {/* Left: Decision List */}
      <div className="w-96 flex flex-col border-r border-white/10">
        <div className="flex-shrink-0 p-4 bg-white/5 border-b border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <p className="text-2xl font-medium text-white">{stats?.total || 0}</p>
              <p className="text-xs text-white/60">Total Decisions</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <p className="text-2xl font-medium text-emerald-400">
                {stats?.avg_confidence ? Math.round(stats.avg_confidence * 100) : 0}%
              </p>
              <p className="text-xs text-white/60">Avg Confidence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search by user ID..."
              className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#5739FB]"
              onChange={e => setFilters({ ...filters, user_id: e.target.value || undefined })}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {isLoading ? (
            <p className="text-sm text-white/50">Loading decisions...</p>
          ) : traces && traces.length > 0 ? (
            traces.map(trace => (
              <div
                key={trace.decision_trace_id}
                onClick={() => setSelectedTrace(trace)}
                className={`p-3 border rounded cursor-pointer transition-all ${
                  selectedTrace?.decision_trace_id === trace.decision_trace_id
                    ? 'border-[#5739FB] bg-[#5739FB]/10'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white/60">{trace.decision_type}</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-white/70">{Math.round(trace.why_now_confidence * 100)}%</span>
                  </div>
                </div>
                
                <p className="text-sm text-white/90 line-clamp-2 mb-2">{trace.why_now_resolved}</p>
                
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(trace.decided_at).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/50">No decisions found</p>
          )}
        </div>
      </div>
      
      {/* Right: Decision Inspector */}
      {selectedTrace ? (
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* WhyNow (Featured) */}
          <div className="p-6 bg-gradient-to-br from-[#5739FB]/20 to-[#3E2BB8]/20 border border-[#5739FB]/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-6 h-6 text-[#5739FB]" />
              <h3 className="text-lg font-medium text-white/90">WhyNow</h3>
            </div>
            <p className="text-xl text-white mb-3">{selectedTrace.why_now_resolved}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">Confidence:</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5739FB]"
                  style={{ width: `${selectedTrace.why_now_confidence * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-[#5739FB]">
                {Math.round(selectedTrace.why_now_confidence * 100)}%
              </span>
            </div>
          </div>
          
          {/* Input Snapshot */}
          {selectedTrace.input_snapshot.user_state && (
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-3">User State at Decision</h4>
              <div className="p-4 bg-white/5 border border-white/10 rounded">
                <div className="flex items-center gap-4 mb-3">
                  <UserStateBadge
                    stateBand={selectedTrace.input_snapshot.user_state.state_band}
                    arousalContext={selectedTrace.input_snapshot.user_state.arousal_context}
                    size="lg"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Tempo</p>
                    <p className="text-2xl font-medium text-white">{selectedTrace.input_snapshot.user_state.tempo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Flow</p>
                    <p className="text-2xl font-medium text-white">{selectedTrace.input_snapshot.user_state.flow}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Sync</p>
                    <p className="text-2xl font-medium text-white">{selectedTrace.input_snapshot.user_state.sync}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Candidates Considered */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-white/70" />
              <h4 className="text-sm font-medium text-white/90">Candidates Considered</h4>
            </div>
            <div className="space-y-2">
              {selectedTrace.candidates.map((candidate, idx) => (
                <div
                  key={idx}
                  className={`p-3 border rounded ${
                    candidate.content_ref === selectedTrace.content_ref_chosen
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-mono text-white/80">{candidate.content_ref.slice(0, 12)}...</span>
                    <span className="text-sm font-medium text-white">{candidate.score.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-white/60">{candidate.reason}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Policies Evaluated */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-white/70" />
              <h4 className="text-sm font-medium text-white/90">Safety Policies</h4>
            </div>
            <div className="space-y-2">
              {selectedTrace.policies_evaluated.map((policy, idx) => (
                <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/90">{policy.policy_name}</span>
                    <PolicyBadge outcome={policy.outcome} size="sm" />
                  </div>
                  <p className="text-xs text-white/60">{policy.reason}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chosen Content */}
          {chosenContent && (
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-3">Chosen Content</h4>
              <div className="p-4 bg-white/5 border border-white/10 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs bg-[#5739FB]/20 text-[#5739FB] rounded font-medium uppercase">
                    {chosenContent.content_kind}
                  </span>
                  <span className="text-sm text-white/90">{chosenContent.canonical_id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div>
                    <span className="text-white/50">Pillar:</span>
                    <span className="ml-2 text-white/90">{chosenContent.pillar_id}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Risk:</span>
                    <span className="ml-2 text-white/90">{chosenContent.risk_level}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Model Versions */}
          <div className="text-xs text-white/40">
            <p>Ranker: {selectedTrace.ranker_version || 'N/A'}</p>
            <p>Policy Engine: {selectedTrace.policy_engine_version || 'N/A'}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <p className="text-sm text-white/50">Select a decision to inspect</p>
        </div>
      )}
    </div>
  );
}
