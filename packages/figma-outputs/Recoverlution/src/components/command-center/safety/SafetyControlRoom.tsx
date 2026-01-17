// SAFETY CONTROL ROOM (Tab 5) - COMPLETE TAB
import { useState } from 'react';
import { useSafetyPolicies, useSafetyOutcomes, useSafetyPolicyStats, useTogglePolicy } from '@/lib/hooks/useSafety';
import { PolicyBadge } from '../shared/PolicyBadge';
import type { SafetyPolicy, SafetyOutcome } from '@/lib/types/constitution';
import {
  Shield,
  ShieldOff,
  Plus,
  Edit2,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const OUTCOME_COLORS: Record<SafetyOutcome, string> = {
  allow: '#10B981',
  allow_with_modification: '#F59E0B',
  hold: '#6B7280',
  block: '#EF4444',
  block_and_route: '#DC2626',
  require_support: '#8B5CF6',
};

export function SafetyControlRoom() {
  const [selectedPolicy, setSelectedPolicy] = useState<SafetyPolicy | null>(null);
  const [editingPolicy, setEditingPolicy] = useState<SafetyPolicy | null>(null);
  
  const { data: policies, isLoading: loadingPolicies } = useSafetyPolicies();
  const { data: stats } = useSafetyPolicyStats();
  const { data: recentOutcomes } = useSafetyOutcomes({});
  const toggleMutation = useTogglePolicy();
  
  const activePolicies = policies?.filter(p => p.is_active) || [];
  const inactivePolicies = policies?.filter(p => !p.is_active) || [];
  
  const handleToggle = (policy: SafetyPolicy) => {
    toggleMutation.mutate({ id: policy.id, is_active: !policy.is_active });
  };
  
  return (
    <div className="h-full flex">
      {/* Left: Policies List */}
      <div className="w-80 flex flex-col border-r border-white/10">
        <div className="flex-shrink-0 p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white/90">Safety Policies</h3>
            <button className="p-1.5 bg-[#5739FB] hover:bg-[#4628EA] rounded transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-white/60">{activePolicies.length} active</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldOff className="w-4 h-4 text-gray-400" />
              <span className="text-white/60">{inactivePolicies.length} inactive</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {loadingPolicies ? (
            <p className="p-4 text-sm text-white/50">Loading policies...</p>
          ) : policies && policies.length > 0 ? (
            <div className="divide-y divide-white/10">
              {/* Active Policies */}
              {activePolicies.map(policy => (
                <PolicyListItem
                  key={policy.id}
                  policy={policy}
                  selected={selectedPolicy?.id === policy.id}
                  onSelect={() => setSelectedPolicy(policy)}
                  onToggle={() => handleToggle(policy)}
                />
              ))}
              
              {/* Inactive Policies */}
              {inactivePolicies.length > 0 && (
                <>
                  <div className="p-3 bg-white/[0.02]">
                    <p className="text-xs text-white/40 uppercase tracking-wide">Inactive</p>
                  </div>
                  {inactivePolicies.map(policy => (
                    <PolicyListItem
                      key={policy.id}
                      policy={policy}
                      selected={selectedPolicy?.id === policy.id}
                      onSelect={() => setSelectedPolicy(policy)}
                      onToggle={() => handleToggle(policy)}
                    />
                  ))}
                </>
              )}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Shield className="w-8 h-8 text-white/20 mx-auto mb-2" />
              <p className="text-sm text-white/50">No policies yet</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Center: Policy Details / Editor */}
      <div className="flex-1 flex flex-col">
        {selectedPolicy ? (
          <>
            <div className="flex-shrink-0 p-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white/90">{selectedPolicy.policy_name}</h3>
                  <p className="text-xs text-white/50">Priority: {selectedPolicy.priority}</p>
                </div>
                <button
                  onClick={() => setEditingPolicy(selectedPolicy)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm text-white/90 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {/* Policy Type */}
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2">Policy Type</h4>
                <p className="text-sm text-white/90">{selectedPolicy.policy_type}</p>
              </div>
              
              {/* Conditions */}
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2">Conditions</h4>
                <pre className="p-3 bg-black/30 border border-white/10 rounded text-xs text-white/80 overflow-auto">
                  {JSON.stringify(selectedPolicy.conditions, null, 2)}
                </pre>
              </div>
              
              {/* Outcomes */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-2">On Pass</h4>
                  <PolicyBadge outcome={selectedPolicy.outcome_on_pass} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-2">On Fail</h4>
                  <PolicyBadge outcome={selectedPolicy.outcome_on_fail} />
                </div>
              </div>
              
              {/* Modification Rules */}
              {selectedPolicy.modification_rules && (
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-2">Modification Rules</h4>
                  <pre className="p-3 bg-black/30 border border-white/10 rounded text-xs text-white/80 overflow-auto">
                    {JSON.stringify(selectedPolicy.modification_rules, null, 2)}
                  </pre>
                </div>
              )}
              
              {/* Rescue Target */}
              {selectedPolicy.rescue_target && (
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-2">Rescue Target</h4>
                  <p className="text-sm text-white/90">{selectedPolicy.rescue_target}</p>
                </div>
              )}
              
              {/* Stats for this policy */}
              {stats && stats.find(s => s.policy_id === selectedPolicy.id) && (
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-3">Policy Statistics</h4>
                  {(() => {
                    const policyStat = stats.find(s => s.policy_id === selectedPolicy.id)!;
                    return (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded">
                          <p className="text-2xl font-medium text-white">{policyStat.total_evaluations}</p>
                          <p className="text-xs text-white/50 mt-1">Total Evaluations</p>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded">
                          <p className="text-2xl font-medium text-red-400">
                            {Math.round(policyStat.block_rate * 100)}%
                          </p>
                          <p className="text-xs text-white/50 mt-1">Block Rate</p>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded">
                          <p className="text-2xl font-medium text-white">{policyStat.users_affected}</p>
                          <p className="text-xs text-white/50 mt-1">Users Affected</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-white/50">Select a policy to view details</p>
          </div>
        )}
      </div>
      
      {/* Right: Policy Outcomes & Analytics */}
      <div className="w-96 flex flex-col border-l border-white/10 bg-white/[0.02]">
        <div className="flex-shrink-0 p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white/70" />
            <h3 className="text-sm font-medium text-white/90">Policy Outcomes</h3>
          </div>
        </div>
        
        {/* Overall Stats */}
        {stats && (
          <div className="flex-shrink-0 p-4 border-b border-white/10 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-white/60">Evaluations</span>
                </div>
                <p className="text-xl font-medium text-white">
                  {stats.reduce((sum, s) => sum + s.total_evaluations, 0)}
                </p>
              </div>
              
              <div className="p-3 bg-white/5 border border-white/10 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-violet-400" />
                  <span className="text-xs text-white/60">Users</span>
                </div>
                <p className="text-xl font-medium text-white">
                  {stats.reduce((sum, s) => sum + s.users_affected, 0)}
                </p>
              </div>
            </div>
            
            {/* Block Rate Chart */}
            <div>
              <h4 className="text-xs font-medium text-white/70 mb-2">Block Rate by Policy</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={stats.slice(0, 5).map(s => ({
                  name: s.policy_name.slice(0, 20),
                  rate: Math.round(s.block_rate * 100)
                }))}>
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="#ffffff40" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #ffffff20', borderRadius: '0.5rem' }}
                  />
                  <Bar dataKey="rate" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Recent Outcomes */}
        <div className="flex-1 overflow-auto p-4">
          <h4 className="text-xs font-medium text-white/70 mb-3">Recent Outcomes</h4>
          {recentOutcomes && recentOutcomes.length > 0 ? (
            <div className="space-y-2">
              {recentOutcomes.slice(0, 20).map(outcome => (
                <div
                  key={outcome.id}
                  className="p-2 bg-white/5 border border-white/10 rounded text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <PolicyBadge outcome={outcome.outcome} size="sm" />
                    <span className="text-white/40">
                      {new Date(outcome.evaluated_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs">{outcome.policy_name}</p>
                  {outcome.reason && (
                    <p className="text-white/40 text-xs mt-1">{outcome.reason}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/50">No recent outcomes</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PolicyListItem({
  policy,
  selected,
  onSelect,
  onToggle,
}: {
  policy: SafetyPolicy;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`p-3 cursor-pointer transition-colors ${
        selected ? 'bg-[#5739FB]/10 border-l-2 border-[#5739FB]' : 'hover:bg-white/5'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/90 truncate">{policy.policy_name}</p>
          <p className="text-xs text-white/50 mt-0.5">{policy.policy_type}</p>
        </div>
        
        <button
          onClick={e => {
            e.stopPropagation();
            onToggle();
          }}
          className="flex-shrink-0"
        >
          {policy.is_active ? (
            <ToggleRight className="w-5 h-5 text-emerald-400" />
          ) : (
            <ToggleLeft className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}
