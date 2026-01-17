/**
 * PROTOCOL STUDIO
 * Analytics and management for journey protocols
 * 
 * FEATURES:
 * - View protocol summary with KPIs
 * - Trigger sync to refresh materialized views
 * - Filter by status (active/draft/archived)
 * - View integrity issues
 * - Charts for phase/scene-type breakdown
 * - Seed synthetic data for testing
 */

import { useState, useEffect } from 'react';
import { Database, RefreshCw, AlertTriangle, BarChart, Users, PlayCircle } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { DataTable } from '../shared/DataTable';
import {
  refreshProtocolAnalytics,
  fetchProtocolSummary,
  fetchProtocolStats,
  fetchProtocolIntegrity,
  fetchProtocolBreakdown,
  seedSyntheticData,
  type ProtocolSummary,
  type ProtocolStats,
  type ProtocolIntegrityIssue,
  type ProtocolBreakdown,
} from '../../../utils/cc2-clinical-api';

interface ProtocolStudioProps {
  onBack: () => void;
}

export function ProtocolStudio({ onBack }: ProtocolStudioProps) {
  const [protocols, setProtocols] = useState<ProtocolSummary[]>([]);
  const [stats, setStats] = useState<ProtocolStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolSummary | null>(null);
  const [integrityIssues, setIntegrityIssues] = useState<ProtocolIntegrityIssue[]>([]);
  const [breakdown, setBreakdown] = useState<ProtocolBreakdown[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔥 Loading protocol data...');

      const [summaryData, statsData] = await Promise.all([
        fetchProtocolSummary(),
        fetchProtocolStats(),
      ]);

      console.log(`✅ Loaded ${summaryData.protocols.length} protocols`);
      setProtocols(summaryData.protocols);
      setStats(statsData.stats);
      setLastRefreshed(summaryData.last_refreshed);
    } catch (error) {
      console.error('❌ Failed to load protocols:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      console.log('🔄 Syncing protocol analytics...');
      
      const result = await refreshProtocolAnalytics();
      console.log('✅ Sync complete:', result);
      
      await loadData(); // Reload data after sync
      alert('Protocol analytics refreshed successfully!');
    } catch (error) {
      console.error('❌ Sync failed:', error);
      alert('Failed to sync protocol analytics');
    } finally {
      setSyncing(false);
    }
  };

  const handleSeedSynthetics = async () => {
    if (!confirm('This will create 3,000 synthetic users and ~36,000 mindblock engagements. Continue?')) {
      return;
    }

    try {
      setSeeding(true);
      console.log('🌱 Seeding synthetic data...');
      
      const result = await seedSyntheticData({
        count_users: 3000,
        coverage_per_mindblock: 15,
        days: 45,
        cohort_label: 'synthetics_v1',
        with_orgs: true,
        with_journeys: false,
        with_notifications: false,
      });
      
      console.log('✅ Seed complete:', result);
      alert(`Synthetic data created!\n\nUsers: ${result.users_created}\nEngagements: ${result.engagements_created}\nMindblocks covered: ${result.mindblocks_covered}`);
    } catch (error) {
      console.error('❌ Seed failed:', error);
      alert('Failed to seed synthetic data');
    } finally {
      setSeeding(false);
    }
  };

  const handleViewDetail = async (protocol: ProtocolSummary) => {
    try {
      setLoading(true);
      console.log('Loading protocol detail:', protocol.protocol_id);

      const [issuesData, breakdownData] = await Promise.all([
        fetchProtocolIntegrity(protocol.protocol_id),
        fetchProtocolBreakdown(protocol.protocol_id),
      ]);

      setSelectedProtocol(protocol);
      setIntegrityIssues(issuesData.issues);
      setBreakdown(breakdownData.breakdown);
    } catch (error) {
      console.error('Failed to load protocol detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedProtocol) {
    return (
      <ProtocolDetailView
        protocol={selectedProtocol}
        issues={integrityIssues}
        breakdown={breakdown}
        onBack={() => setSelectedProtocol(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold">Protocol Studio</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSeedSynthetics}
                disabled={seeding}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                {seeding ? 'Seeding...' : 'Seed Synthetics'}
              </button>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync Analytics'}
              </button>
            </div>
          </div>
          <p className="text-zinc-400 text-lg mb-2">
            Journey Protocol Analytics · Materialized Views · Synthetic Testing
          </p>
          {lastRefreshed && (
            <p className="text-xs text-zinc-500">
              Last refreshed: {new Date(lastRefreshed).toLocaleString()}
            </p>
          )}

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
              <StatCard
                title="Total Protocols"
                value={stats.total_protocols}
                subtitle="All status"
                icon={Database}
                color="#3E2BB8"
              />
              <StatCard
                title="Active"
                value={stats.active_protocols}
                subtitle="Live protocols"
                icon={PlayCircle}
                color="#10b981"
              />
              <StatCard
                title="Draft"
                value={stats.draft_protocols}
                subtitle="In development"
                icon={Database}
                color="#f59e0b"
              />
              <StatCard
                title="Archived"
                value={stats.archived_protocols}
                subtitle="Deprecated"
                icon={Database}
                color="#6b7280"
              />
              <StatCard
                title="Total Scenes"
                value={stats.total_scenes}
                subtitle="All protocols"
                icon={BarChart}
                color="#8b5cf6"
              />
              <StatCard
                title="Total Contracts"
                value={stats.total_contracts}
                subtitle="All protocols"
                icon={Database}
                color="#6366f1"
              />
              <StatCard
                title="Missing Contracts"
                value={stats.total_missing_contracts}
                subtitle="Needs attention"
                icon={AlertTriangle}
                color="#ef4444"
              />
            </div>
          )}
        </div>

        {/* Protocol Table */}
        <div className="mb-4 text-sm text-zinc-400">
          Showing {protocols.length} protocols
        </div>

        <DataTable
          data={protocols}
          columns={[
            {
              key: 'protocol_slug',
              label: 'Slug',
              render: (val) => <span className="font-mono text-xs text-zinc-400">{val}</span>
            },
            {
              key: 'protocol_title',
              label: 'Title',
              render: (val) => <span className="font-medium">{val}</span>
            },
            {
              key: 'protocol_status',
              label: 'Status',
              render: (val) => (
                <span className={`px-2 py-1 text-xs ${
                  val === 'active' ? 'bg-green-900/30 text-green-400' :
                  val === 'draft' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-gray-900/30 text-gray-400'
                }`}>
                  {val}
                </span>
              )
            },
            {
              key: 'scene_count',
              label: 'Scenes',
              render: (val) => <span className="text-zinc-300">{val}</span>
            },
            {
              key: 'contract_count',
              label: 'Contracts',
              render: (val) => <span className="text-zinc-300">{val}</span>
            },
            {
              key: 'missing_contracts',
              label: 'Missing',
              render: (val) => (
                <span className={`font-bold ${
                  val > 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  {val}
                </span>
              )
            },
            {
              key: 'scenes_require_trigger',
              label: 'Triggers',
              render: (val) => <span className="text-xs text-zinc-400">{val}</span>
            },
            {
              key: 'scenes_require_resistance',
              label: 'Resistance',
              render: (val) => <span className="text-xs text-zinc-400">{val}</span>
            },
          ]}
          onRowClick={handleViewDetail}
          loading={loading}
        />

        {/* Integration Status */}
        <div className="mt-8 p-6 border bg-green-900/20 border-green-700/30">
          <h3 className="text-green-400 font-bold mb-2">✅ Live Protocol Analytics</h3>
          <ul className="text-sm text-green-200 space-y-1">
            <li>✓ Materialized views for fast queries</li>
            <li>✓ Integrity checking (scene/contract mismatches)</li>
            <li>✓ Phase and scene-type breakdowns</li>
            <li>✓ Synthetic data seeding for testing</li>
            <li>✓ One-click sync to refresh analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * PROTOCOL DETAIL VIEW
 */
function ProtocolDetailView({
  protocol,
  issues,
  breakdown,
  onBack,
}: {
  protocol: ProtocolSummary;
  issues: ProtocolIntegrityIssue[];
  breakdown: ProtocolBreakdown[];
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          ← Back to List
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Protocol Info */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h2 className="text-2xl font-bold mb-4">{protocol.protocol_title}</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Slug</div>
                  <div className="font-mono text-sm">{protocol.protocol_slug}</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Status</div>
                  <div className={`inline-block px-3 py-1 font-bold ${
                    protocol.protocol_status === 'active' ? 'bg-green-900/30 text-green-400' :
                    protocol.protocol_status === 'draft' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-gray-900/30 text-gray-400'
                  }`}>
                    {protocol.protocol_status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Scenes</div>
                    <div className="text-2xl font-bold">{protocol.scene_count}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Contracts</div>
                    <div className="text-2xl font-bold">{protocol.contract_count}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Missing</div>
                    <div className={`text-2xl font-bold ${
                      protocol.missing_contracts > 0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {protocol.missing_contracts}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Receipts</div>
                    <div className="text-2xl font-bold">{protocol.contracts_expect_receipt}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown by Phase */}
            {breakdown.length > 0 && (
              <div className="bg-zinc-900/50 border border-zinc-800 p-6">
                <h3 className="text-lg font-bold mb-4">Phase Breakdown</h3>
                <div className="space-y-3">
                  {breakdown.map((item) => (
                    <div key={`${item.phase}-${item.scene_type}`} className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">{item.phase} / {item.scene_type}</div>
                        <div className="text-xs text-zinc-500">{item.scene_count} scenes</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-400">
                          {item.scenes_with_audio} audio · {item.scenes_require_trigger} triggers
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Integrity Issues */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Integrity Issues ({issues.length})
              </h3>
              {issues.length > 0 ? (
                <div className="space-y-2">
                  {issues.map((issue, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-red-900/20 border border-red-700/30 text-sm"
                    >
                      <div className="font-bold text-red-300">Scene {issue.scene_number}</div>
                      <div className="text-xs text-red-200 mt-1">
                        {issue.issue === 'contract_without_scene' 
                          ? 'Contract exists without corresponding scene'
                          : 'Scene exists without corresponding contract'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-green-400">
                  ✅ No integrity issues found
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4">Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Require Trigger</span>
                  <span className="font-bold">{protocol.scenes_require_trigger}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Require Resistance</span>
                  <span className="font-bold">{protocol.scenes_require_resistance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Expect Receipt</span>
                  <span className="font-bold">{protocol.contracts_expect_receipt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Expect Checks</span>
                  <span className="font-bold">{protocol.contracts_expect_checks}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
