// PROOF LEDGER (Tab 8) - COMPLETE TAB
import { useState } from 'react';
import { useProofArtifacts, useProofAnalytics } from '@/lib/hooks/useProof';
import { UserStateBadge } from '../shared/UserStateBadge';
import type { ProofArtifactFilters, ProofType } from '@/lib/types/constitution';
import {
  Award,
  Filter,
  TrendingUp,
  CheckCircle2,
  Target,
  Zap,
  Clock,
  BarChart3,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PROOF_TYPE_COLORS: Record<ProofType, string> = {
  receipt: '#10B981',
  micro_proof: '#3B82F6',
  transfer: '#8B5CF6',
  prediction_error: '#F59E0B',
  durability_check: '#EC4899',
};

const PROOF_TYPE_ICONS: Record<ProofType, any> = {
  receipt: CheckCircle2,
  micro_proof: Target,
  transfer: Zap,
  prediction_error: TrendingUp,
  durability_check: Award,
};

export function ProofLedger() {
  const [filters, setFilters] = useState<ProofArtifactFilters>({});
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  
  const { data: artifacts, isLoading } = useProofArtifacts(filters);
  const { data: analytics } = useProofAnalytics();
  
  return (
    <div className="h-full flex flex-col">
      {/* Top Stats */}
      {analytics && (
        <div className="flex-shrink-0 p-4 bg-white/5 border-b border-white/10">
          <div className="grid grid-cols-6 gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-white/60" />
                <span className="text-xs text-white/60">Total Proof</span>
              </div>
              <p className="text-2xl font-medium text-white">{analytics.total_artifacts}</p>
            </div>
            
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-white/60">Avg Confidence</span>
              </div>
              <p className="text-2xl font-medium text-amber-400">
                {Math.round(analytics.average_confidence * 100)}%
              </p>
            </div>
            
            {Object.entries(analytics.artifacts_by_type).map(([type, count]) => {
              const Icon = PROOF_TYPE_ICONS[type as ProofType];
              return (
                <div key={type} className="p-3 bg-white/5 border border-white/10 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" style={{ color: PROOF_TYPE_COLORS[type as ProofType] }} />
                    <span className="text-xs text-white/60 capitalize">{type.replace('_', ' ')}</span>
                  </div>
                  <p className="text-2xl font-medium text-white">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="flex-shrink-0 p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-white/50" />
          
          <select
            className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5739FB]"
            onChange={e => setFilters({
              ...filters,
              artifact_type: e.target.value ? [e.target.value as ProofType] : undefined
            })}
          >
            <option value="">All Types</option>
            <option value="receipt">Receipt</option>
            <option value="micro_proof">Micro Proof</option>
            <option value="transfer">Transfer</option>
            <option value="prediction_error">Prediction Error</option>
            <option value="durability_check">Durability Check</option>
          </select>
          
          <input
            type="number"
            placeholder="Min confidence (0-1)..."
            step="0.1"
            min="0"
            max="1"
            className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#5739FB]"
            onChange={e => setFilters({
              ...filters,
              min_confidence: e.target.value ? Number(e.target.value) : undefined
            })}
          />
          
          <span className="ml-auto text-sm text-white/50">
            {artifacts?.length || 0} artifacts
          </span>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-6 p-6 overflow-auto">
        {/* Left: Proof Gallery */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-white/70" />
            <h3 className="text-sm font-medium text-white/90">Proof Artifacts</h3>
          </div>
          
          {isLoading ? (
            <p className="text-sm text-white/50">Loading artifacts...</p>
          ) : artifacts && artifacts.length > 0 ? (
            <div className="space-y-3">
              {artifacts.map(artifact => {
                const Icon = PROOF_TYPE_ICONS[artifact.artifact_type];
                const color = PROOF_TYPE_COLORS[artifact.artifact_type];
                
                return (
                  <div
                    key={artifact.id}
                    onClick={() => setSelectedArtifact(artifact.id)}
                    className={`p-4 border rounded cursor-pointer transition-all ${
                      selectedArtifact === artifact.id
                        ? 'border-[#5739FB] bg-[#5739FB]/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" style={{ color }} />
                        <span
                          className="px-2 py-0.5 text-xs rounded font-medium uppercase"
                          style={{
                            backgroundColor: `${color}20`,
                            color: color,
                            borderColor: `${color}40`,
                            border: '1px solid'
                          }}
                        >
                          {artifact.artifact_type.replace('_', ' ')}
                        </span>
                      </div>
                      
                      {artifact.confidence_score !== null && artifact.confidence_score !== undefined && (
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span className="text-sm font-medium text-white">
                            {Math.round(artifact.confidence_score * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {artifact.state_band_at_capture && (
                      <div className="mb-2">
                        <UserStateBadge
                          stateBand={artifact.state_band_at_capture}
                          size="sm"
                        />
                      </div>
                    )}
                    
                    <div className="text-xs text-white/60">
                      {artifact.proof_data && (
                        <p className="line-clamp-2">
                          {JSON.stringify(artifact.proof_data).slice(0, 100)}...
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3 text-xs text-white/40">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(artifact.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-white/50">No proof artifacts found</p>
          )}
        </div>
        
        {/* Right: Analytics */}
        {analytics && (
          <div className="space-y-6">
            {/* Generation Rate Over Time */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-sm font-medium text-white/90 mb-4">Generation Rate</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={analytics.generation_rate_over_time}>
                  <XAxis
                    dataKey="timestamp"
                    stroke="#ffffff40"
                    fontSize={10}
                    tickFormatter={val => new Date(val).toLocaleDateString()}
                  />
                  <YAxis stroke="#ffffff40" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ffffff20', borderRadius: '0.5rem' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#5739FB" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Confidence by Type */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-sm font-medium text-white/90 mb-4">Avg Confidence by Type</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Object.entries(analytics.average_confidence_by_type).map(([type, conf]) => ({
                  type: type.replace('_', ' '),
                  confidence: Math.round(conf * 100)
                }))}>
                  <XAxis dataKey="type" stroke="#ffffff40" fontSize={10} />
                  <YAxis stroke="#ffffff40" fontSize={10} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ffffff20', borderRadius: '0.5rem' }}
                  />
                  <Bar dataKey="confidence" fill="#5739FB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Transfer Success Rate */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-violet-400" />
                <h4 className="text-sm font-medium text-white/90">Transfer Success Rate</h4>
              </div>
              <p className="text-4xl font-medium text-violet-400">
                {Math.round(analytics.transfer_success_rate * 100)}%
              </p>
              <p className="text-xs text-white/50 mt-2">
                Transfers with confidence &gt; 70%
              </p>
            </div>
            
            {/* Schema Impact */}
            {Object.keys(analytics.schema_impact).length > 0 && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-sm font-medium text-white/90 mb-3">Schema Impact</h4>
                <div className="space-y-2">
                  {Object.entries(analytics.schema_impact)
                    .sort((a, b) => b[1].update_count - a[1].update_count)
                    .slice(0, 5)
                    .map(([schema, impact]) => (
                      <div key={schema} className="flex items-center justify-between text-xs">
                        <span className="text-white/70">{schema}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white/50">{impact.update_count} updates</span>
                          <span className="text-amber-400 font-medium">
                            {Math.round(impact.avg_confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
