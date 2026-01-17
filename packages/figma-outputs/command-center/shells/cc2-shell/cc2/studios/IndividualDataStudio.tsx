/**
 * INDIVIDUAL DATA STUDIO
 * Track patient engagement, progress, and clinical outcomes
 */

import { useState, useEffect } from 'react';
import { User, Activity, TrendingUp, Heart, Brain, Target } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { DataTable } from '../shared/DataTable';
import {
  fetchIndividualsList,
  fetchIndividualDetail,
  fetchIndividualTimeline,
  fetchIndividualSchemaFocus,
  fetchIndividualStats,
  type Individual,
  type IndividualDetail,
  type TimelineEvent,
  type SchemaFocus,
  type FamilyFocus,
  type MindblockFocus,
  type IndividualStats,
} from '../../../utils/cc2-individual-api';

interface IndividualDataStudioProps {
  onBack: () => void;
}

export function IndividualDataStudio({ onBack }: IndividualDataStudioProps) {
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [stats, setStats] = useState<IndividualStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndividual, setSelectedIndividual] = useState<Individual | null>(null);
  const [detailData, setDetailData] = useState<IndividualDetail | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [schemaFocus, setSchemaFocus] = useState<{
    schemas: SchemaFocus[];
    families: FamilyFocus[];
    mindblocks: MindblockFocus[];
  } | null>(null);

  // Filters
  const [organizationFilter, setOrganizationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 50;

  useEffect(() => {
    loadData();
  }, [organizationFilter, statusFilter, searchFilter, currentPage]);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔥 Loading individual data...');

      const [listData, statsData] = await Promise.all([
        fetchIndividualsList({
          organization_id: organizationFilter || undefined,
          status: statusFilter || undefined,
          search: searchFilter || undefined,
          limit: pageSize,
          offset: currentPage * pageSize,
        }),
        fetchIndividualStats({
          organization_id: organizationFilter || undefined,
        }),
      ]);

      console.log(`✅ Loaded ${listData.individuals.length} individuals`);
      setIndividuals(listData.individuals);
      setStats(statsData.stats);
    } catch (error) {
      console.error('❌ Failed to load individuals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (individual: Individual) => {
    try {
      setLoading(true);
      console.log('Loading individual detail:', individual.id);

      const [detail, timelineData, focusData] = await Promise.all([
        fetchIndividualDetail(individual.id),
        fetchIndividualTimeline(individual.id, 100),
        fetchIndividualSchemaFocus(individual.id),
      ]);

      setSelectedIndividual(individual);
      setDetailData(detail);
      setTimeline(timelineData.timeline);
      setSchemaFocus(focusData);
    } catch (error) {
      console.error('Failed to load individual detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedIndividual && detailData) {
    return (
      <IndividualDetailView
        individual={selectedIndividual}
        detail={detailData}
        timeline={timeline}
        schemaFocus={schemaFocus}
        onBack={() => {
          setSelectedIndividual(null);
          setDetailData(null);
          setTimeline([]);
          setSchemaFocus(null);
        }}
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
              <User className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold">Individual Data Studio</h1>
            </div>
          </div>
          <p className="text-zinc-400 text-lg">
            Track patient engagement, journey progress, and clinical outcomes
          </p>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              <StatCard
                title="Total Patients"
                value={stats.total}
                subtitle="All statuses"
                icon={User}
                color="#10b981"
              />
              <StatCard
                title="Active"
                value={stats.byStatus.active}
                subtitle="Engaged"
                icon={Activity}
                color="#22c55e"
              />
              <StatCard
                title="Paused"
                value={stats.byStatus.paused}
                subtitle="Temporary"
                icon={Heart}
                color="#f59e0b"
              />
              <StatCard
                title="Inactive"
                value={stats.byStatus.inactive}
                subtitle="Not engaged"
                icon={User}
                color="#6b7280"
              />
              <StatCard
                title="Graduated"
                value={stats.byStatus.graduated}
                subtitle="Completed"
                icon={TrendingUp}
                color="#3b82f6"
              />
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-white"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>

        {/* Individual List */}
        <div className="mb-4 text-sm text-zinc-400">
          Showing {individuals.length} individuals
        </div>

        <DataTable
          data={individuals}
          columns={[
            {
              key: 'full_name',
              label: 'Name',
              render: (val) => <span className="font-medium">{val || 'Unnamed'}</span>
            },
            {
              key: 'email',
              label: 'Email',
              render: (val) => <span className="text-sm text-zinc-400">{val}</span>
            },
            {
              key: 'organizations',
              label: 'Organization',
              render: (val: any) => (
                <span className="text-sm text-zinc-300">
                  {val?.name || 'None'}
                </span>
              )
            },
            {
              key: 'status',
              label: 'Status',
              render: (val) => (
                <span className={`px-2 py-1 text-xs ${
                  val === 'active' ? 'bg-green-900/30 text-green-400' :
                  val === 'paused' ? 'bg-yellow-900/30 text-yellow-400' :
                  val === 'graduated' ? 'bg-blue-900/30 text-blue-400' :
                  'bg-gray-900/30 text-gray-400'
                }`}>
                  {val}
                </span>
              )
            },
            {
              key: 'created_at',
              label: 'Registered',
              render: (val) => (
                <span className="text-xs text-zinc-500">
                  {new Date(val).toLocaleDateString()}
                </span>
              )
            },
          ]}
          onRowClick={handleViewDetail}
          loading={loading}
        />

        {/* Pagination */}
        {individuals.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-zinc-400">
              Page {currentPage + 1}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={individuals.length < pageSize}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Integration Status */}
        <div className="mt-8 p-6 border bg-green-900/20 border-green-700/30">
          <h3 className="text-green-400 font-bold mb-2">✅ Live Individual Tracking</h3>
          <ul className="text-sm text-green-200 space-y-1">
            <li>✓ Real-time engagement metrics</li>
            <li>✓ Journey progress tracking</li>
            <li>✓ Clinical focus analysis (schemas, mindblocks, heat, KBE)</li>
            <li>✓ Activity timeline with all events</li>
            <li>✓ State trends and proof collection</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * INDIVIDUAL DETAIL VIEW
 */
function IndividualDetailView({
  individual,
  detail,
  timeline,
  schemaFocus,
  onBack,
}: {
  individual: Individual;
  detail: IndividualDetail;
  timeline: TimelineEvent[];
  schemaFocus: {
    schemas: SchemaFocus[];
    families: FamilyFocus[];
    mindblocks: MindblockFocus[];
  } | null;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'clinical' | 'journey' | 'state'>('overview');

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          ← Back to List
        </button>

        {/* Header */}
        <div className="mb-8 bg-zinc-900/50 border border-zinc-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {detail.profile.full_name || 'Unnamed Individual'}
              </h2>
              <div className="text-sm text-zinc-400 space-y-1">
                <div>{detail.profile.email}</div>
                <div>
                  Organization: {detail.profile.organizations?.name || 'None'}
                </div>
                <div>
                  Registered: {new Date(detail.profile.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className={`px-4 py-2 font-bold ${
              detail.profile.status === 'active' ? 'bg-green-900/30 text-green-400' :
              detail.profile.status === 'paused' ? 'bg-yellow-900/30 text-yellow-400' :
              detail.profile.status === 'graduated' ? 'bg-blue-900/30 text-blue-400' :
              'bg-gray-900/30 text-gray-400'
            }`}>
              {detail.profile.status}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-zinc-800">
          {(['overview', 'timeline', 'clinical', 'journey', 'state'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-[#3E2BB8] text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab detail={detail} />
        )}

        {activeTab === 'timeline' && (
          <TimelineTab timeline={timeline} />
        )}

        {activeTab === 'clinical' && schemaFocus && (
          <ClinicalTab schemaFocus={schemaFocus} />
        )}

        {activeTab === 'journey' && (
          <JourneyTab journey={detail.current_journey} />
        )}

        {activeTab === 'state' && (
          <StateTab states={detail.recent_state} />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ detail }: { detail: IndividualDetail }) {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <div className="text-2xl font-bold text-[#3E2BB8]">
            {detail.metrics.navicue_responses}
          </div>
          <div className="text-xs text-zinc-500 mt-1">NaviCue Responses</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <div className="text-2xl font-bold text-green-400">
            {(detail.metrics.navicue_response_rate * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-zinc-500 mt-1">Response Rate</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <div className="text-2xl font-bold text-blue-400">
            {(detail.metrics.avg_latency / 1000).toFixed(1)}s
          </div>
          <div className="text-xs text-zinc-500 mt-1">Avg Latency</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {(detail.metrics.helpful_rate * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-zinc-500 mt-1">Helpful Rate</div>
        </div>
      </div>

      {/* Engagement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6">
          <h3 className="text-lg font-bold mb-4">Engagement</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Total Engagements</span>
              <span className="font-bold">{detail.metrics.total_engagements}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">State Checkins</span>
              <span className="font-bold">{detail.metrics.state_checkin_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Proofs Collected</span>
              <span className="font-bold">{detail.metrics.proofs_collected}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Transfer Tests</span>
              <span className="font-bold">{detail.metrics.transfer_tests}</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6">
          <h3 className="text-lg font-bold mb-4">Current Journey</h3>
          {detail.current_journey ? (
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-zinc-400">Template:</span>{' '}
                <span className="font-medium">{detail.current_journey.template_id}</span>
              </div>
              <div className="text-sm">
                <span className="text-zinc-400">Status:</span>{' '}
                <span className="font-medium">{detail.current_journey.status}</span>
              </div>
              <div className="text-sm">
                <span className="text-zinc-400">Started:</span>{' '}
                <span className="font-medium">
                  {new Date(detail.current_journey.started_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-zinc-500 text-sm">No active journey</div>
          )}
        </div>
      </div>

      {/* Recent Proofs */}
      {detail.recent_proofs.length > 0 && (
        <div className="bg-zinc-900/50 border border-zinc-800 p-6">
          <h3 className="text-lg font-bold mb-4">Recent Proofs (Last 10)</h3>
          <div className="space-y-2">
            {detail.recent_proofs.map((proof, idx) => (
              <div key={idx} className="flex justify-between text-sm p-2 bg-zinc-800/50">
                <span className="text-zinc-300">{proof.content_kind}</span>
                <span className={`font-medium ${
                  proof.outcome === 'pass' ? 'text-green-400' :
                  proof.outcome === 'partial' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {proof.outcome}
                </span>
                <span className="text-zinc-500">
                  {new Date(proof.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineTab({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6">
      <h3 className="text-lg font-bold mb-4">Activity Timeline ({timeline.length} events)</h3>
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {timeline.map((event, idx) => (
          <div key={idx} className="flex gap-4 p-3 bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
            <div className="flex-shrink-0 w-20 text-xs text-zinc-500">
              {new Date(event.timestamp).toLocaleTimeString()}
            </div>
            <div className={`flex-shrink-0 w-16 text-xs font-bold ${
              event.type === 'navicue' ? 'text-purple-400' :
              event.type === 'scene' ? 'text-blue-400' :
              event.type === 'state' ? 'text-green-400' :
              'text-zinc-400'
            }`}>
              {event.type}
            </div>
            <div className="flex-1 text-sm text-zinc-300">
              {event.type === 'navicue' && event.navicue && (
                <span>NaviCue: {event.navicue.code}</span>
              )}
              {event.type === 'scene' && (
                <span>Scene {event.scene_number} completed</span>
              )}
              {event.type === 'state' && (
                <span>State: E{event.energy} C{event.clarity} A{event.connection}</span>
              )}
              {event.type === 'event' && (
                <span>{event.event_type || 'Event'}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClinicalTab({ schemaFocus }: {
  schemaFocus: {
    schemas: SchemaFocus[];
    families: FamilyFocus[];
    mindblocks: MindblockFocus[];
  };
}) {
  return (
    <div className="space-y-6">
      {/* Schemas */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#3E2BB8]" />
          Schema Focus ({schemaFocus.schemas.length})
        </h3>
        {schemaFocus.schemas.length > 0 ? (
          <div className="space-y-2">
            {schemaFocus.schemas.map((schema) => (
              <div key={schema.schema_id} className="flex justify-between items-center p-3 bg-zinc-800/50">
                <div>
                  <div className="font-medium">{schema.title}</div>
                  <div className="text-xs text-zinc-500">{schema.schema_key}</div>
                </div>
                <div className="text-2xl font-bold text-[#3E2BB8]">{schema.count}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-zinc-500 text-sm">No schema data available</div>
        )}
      </div>

      {/* Mindblocks */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-orange-500" />
          Mindblock Distribution ({schemaFocus.mindblocks.length})
        </h3>
        {schemaFocus.mindblocks.length > 0 ? (
          <div className="space-y-2">
            {schemaFocus.mindblocks.slice(0, 10).map((mb) => (
              <div key={mb.mindblock_id} className="flex justify-between items-center p-3 bg-zinc-800/50">
                <div className="flex-1">
                  <div className="text-sm font-medium">{mb.mindblock_key}</div>
                  <div className="text-xs text-zinc-500">{mb.family_key}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-1 text-xs font-bold ${
                    mb.heat === 'RED' ? 'bg-red-900/30 text-red-400' :
                    mb.heat === 'AMBER' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-green-900/30 text-green-400'
                  }`}>
                    {mb.heat}
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-900/30 text-blue-400">
                    {mb.kbe_stage}
                  </span>
                  <span className="text-lg font-bold text-orange-500 w-8 text-right">
                    {mb.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-zinc-500 text-sm">No mindblock data available</div>
        )}
      </div>
    </div>
  );
}

function JourneyTab({ journey }: { journey: any }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6">
      <h3 className="text-lg font-bold mb-4">Journey Progress</h3>
      {journey ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Template</div>
              <div className="font-medium">{journey.template_id}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">Status</div>
              <div className="font-medium">{journey.status}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">Started</div>
              <div className="font-medium">
                {new Date(journey.started_at).toLocaleDateString()}
              </div>
            </div>
            {journey.completed_at && (
              <div>
                <div className="text-xs text-zinc-500 mb-1">Completed</div>
                <div className="font-medium">
                  {new Date(journey.completed_at).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-zinc-500 text-sm">No active journey</div>
      )}
    </div>
  );
}

function StateTab({ states }: { states: any[] }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6">
      <h3 className="text-lg font-bold mb-4">State Checkins (Last 30 days)</h3>
      {states.length > 0 ? (
        <div className="space-y-2">
          {states.map((state, idx) => (
            <div key={idx} className="flex gap-4 items-center p-3 bg-zinc-800/50">
              <div className="text-xs text-zinc-500 w-24">
                {new Date(state.created_at).toLocaleDateString()}
              </div>
              <div className="flex gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Energy:</span>
                  <span className="font-bold text-green-400">{state.energy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Clarity:</span>
                  <span className="font-bold text-blue-400">{state.clarity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Connection:</span>
                  <span className="font-bold text-purple-400">{state.connection}</span>
                </div>
              </div>
              {state.notes && (
                <div className="text-xs text-zinc-400 max-w-md truncate">
                  {state.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-zinc-500 text-sm">No state checkins recorded</div>
      )}
    </div>
  );
}
