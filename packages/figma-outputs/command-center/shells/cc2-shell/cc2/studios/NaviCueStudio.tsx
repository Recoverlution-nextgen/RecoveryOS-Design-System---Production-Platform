/**
 * NAVICUE STUDIO - THE ENGINE ROOM
 * 
 * The atomic intervention surface of Recoverlution OS.
 * NaviCues are not "content" - they are the smallest executable behavior primitive.
 * 
 * ARCHITECTURE:
 * - Source of truth: DB navicues table (3000 cues across 3 batches)
 * - Wired to: Registry → Delivery → Event → Proof
 * - Lifecycle: Registry-driven (draft/review/published/deprecated)
 * - Tools: Batch management, schema mapping, enhancement, player preview
 * 
 * DATA FLOW:
 * NaviCue → content_registry (contract) → delivery_registry (variant) 
 *         → event_spine (exposure/open/complete) → proofs (v26 artifacts)
 */

import { useState, useEffect, useMemo } from 'react';
import { Play, Filter, Search, Database, Zap, Eye, Edit, BarChart, Upload, RefreshCw, Settings } from 'lucide-react';
import { DataTable } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { StatCard } from '../shared/StatCard';
import { NaviCueSyncTool } from './NaviCueSyncTool';
import { NAVICUE_1000_COMPLETE } from '../../../lib/navicues/NAVICUE_1000_COMPLETE';
import { NAVICUE_MASTER_2000 } from '../../../lib/navicues/NAVICUE_MASTER_2000';
import { NAVICUE_3000_COUNCIL } from '../../../lib/navicues/NAVICUE_3000_COUNCIL';
import { NAVICUE_BATCH_4_2000 } from '../../../lib/navicues/NAVICUE_BATCH_4_2000';
import { fetchNaviCuesList } from '../../../utils/cc2-clinical-api';
import type { NaviCueListItem } from '../../../utils/cc2-clinical-api';

interface NaviCueStudioProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

interface NaviCue {
  id: string;
  name: string;
  text_line: string;
  pillar_id: string;
  schema?: string;
  family?: string;
  kbe_layer?: string;
  response_type?: string;
  heat_level?: 'high' | 'medium' | 'low';
  council_lens?: string;
  tags?: string[];
  batch?: number;
  status?: 'draft' | 'review' | 'published' | 'deprecated';
  created_at: string;
  exposures_count?: number;
  completions_count?: number;
  avg_effectiveness?: number;
}

export function NaviCueStudio({ onBack, tenantScope }: NaviCueStudioProps) {
  const [navicues, setNavicues] = useState<NaviCue[]>([]);
  const [filteredNavicues, setFilteredNavicues] = useState<NaviCue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNavicue, setSelectedNavicue] = useState<NaviCue | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'inspector' | 'analytics' | 'sync'>('list');
  const [dataSource, setDataSource] = useState<'files' | 'database'>('files');

  // Filters
  const [batchFilter, setBatchFilter] = useState<string>('all');
  const [schemaFilter, setSchemaFilter] = useState<string>('all');
  const [familyFilter, setFamilyFilter] = useState<string>('all');
  const [pillarFilter, setPillarFilter] = useState<string>('all');
  const [heatFilter, setHeatFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load NaviCues from TS files OR database
  useEffect(() => {
    loadNaviCues();
  }, [tenantScope, dataSource]);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [navicues, batchFilter, schemaFilter, familyFilter, pillarFilter, heatFilter, statusFilter, searchQuery]);

  const loadNaviCues = async () => {
    try {
      setLoading(true);
      
      if (dataSource === 'files') {
        // Load from TS files (current 5,000: 3,000 existing + 2,000 new)
        const allNaviCues = [
          ...NAVICUE_1000_COMPLETE.map(nc => ({ ...nc, batch: 1 })),
          ...NAVICUE_MASTER_2000.slice(1000).map(nc => ({ ...nc, batch: 2 })),
          ...NAVICUE_3000_COUNCIL.map(nc => ({ ...nc, batch: 3 })),
          ...NAVICUE_BATCH_4_2000.map(nc => ({ ...nc, batch: 4 })),
        ];
        
        setNavicues(allNaviCues as NaviCue[]);
      } else {
        // Load from V2 database using cc2-clinical-api
        console.log('🔥 Loading NaviCues from V2 database...');
        
        const result = await fetchNaviCuesList({
          status: 'active',
          limit: 5000, // Load all active NaviCues
        });
        
        console.log(`✅ Loaded ${result.navicues.length} NaviCues from database`);
        
        // Transform V2 schema to NaviCueStudio format
        const transformedNavicues: NaviCue[] = result.navicues.map((v2Cue: NaviCueListItem) => {
          // Extract primary schema from primary_targets
          const primarySchemaTarget = v2Cue.primary_targets?.find(
            (t: any) => t.scope_type === 'schema'
          );
          const primaryFamilyTarget = v2Cue.primary_targets?.find(
            (t: any) => t.scope_type === 'family'
          );
          
          // Extract first variant copy for display
          const firstVariant = v2Cue.variant_summary?.[0];
          const variantCopy = firstVariant?.copy || {};
          
          // Determine batch from tags or default to 1
          let batch = 1;
          if (v2Cue.tags?.includes('batch_2')) batch = 2;
          else if (v2Cue.tags?.includes('batch_3')) batch = 3;
          else if (v2Cue.tags?.includes('batch_4')) batch = 4;
          
          // Map tier to heat_level (hot → high, warm → medium, cool → low)
          const heat_level =
            v2Cue.tier === 'hot' ? 'high' :
            v2Cue.tier === 'warm' ? 'medium' :
            'low';
          
          return {
            id: v2Cue.id,
            name: v2Cue.code, // Use code as name
            text_line: variantCopy.prompt || variantCopy.headline || variantCopy.body || 'No copy',
            pillar_id: 'N/A', // V2 schema doesn't have pillar_id
            schema: primarySchemaTarget?.label || primarySchemaTarget?.schema_id || 'Unmapped',
            family: v2Cue.family || primaryFamilyTarget?.label || 'General',
            kbe_layer: v2Cue.kbe_layer, // learn|believe|live
            response_type: v2Cue.default_response_type,
            heat_level,
            council_lens: firstVariant?.lens,
            tags: v2Cue.tags || [],
            batch,
            status: v2Cue.status as 'draft' | 'review' | 'published' | 'deprecated',
            created_at: v2Cue.created_at,
            exposures_count: 0, // TODO: Wire to events API
            completions_count: 0, // TODO: Wire to events API
            avg_effectiveness: 0, // TODO: Wire to proofs API
          };
        });
        
        setNavicues(transformedNavicues);
      }
    } catch (error) {
      console.error('❌ Failed to load NaviCues:', error);
      // Fallback to files on error
      if (dataSource === 'database') {
        console.warn('⚠️  Falling back to TS files');
        setDataSource('files');
      }
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...navicues];

    if (batchFilter !== 'all') {
      filtered = filtered.filter(nc => nc.batch === parseInt(batchFilter));
    }

    if (schemaFilter !== 'all') {
      filtered = filtered.filter(nc => nc.schema === schemaFilter);
    }

    if (familyFilter !== 'all') {
      filtered = filtered.filter(nc => nc.family === familyFilter);
    }

    if (pillarFilter !== 'all') {
      filtered = filtered.filter(nc => nc.pillar_id === pillarFilter);
    }

    if (heatFilter !== 'all') {
      filtered = filtered.filter(nc => nc.heat_level === heatFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(nc => nc.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(nc =>
        nc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nc.text_line?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nc.schema?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nc.id?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNavicues(filtered);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredNavicues.length;
    const batch1 = filteredNavicues.filter(nc => nc.batch === 1).length;
    const batch2 = filteredNavicues.filter(nc => nc.batch === 2).length;
    const batch3 = filteredNavicues.filter(nc => nc.batch === 3).length;
    const batch4 = filteredNavicues.filter(nc => nc.batch === 4).length;
    const published = filteredNavicues.filter(nc => nc.status === 'published').length;
    const totalExposures = filteredNavicues.reduce((sum, nc) => sum + (nc.exposures_count || 0), 0);
    const totalCompletions = filteredNavicues.reduce((sum, nc) => sum + (nc.completions_count || 0), 0);
    const avgEffectiveness = filteredNavicues.length > 0
      ? filteredNavicues.reduce((sum, nc) => sum + (nc.avg_effectiveness || 0), 0) / filteredNavicues.length
      : 0;

    return {
      total,
      batch1,
      batch2,
      batch3,
      batch4,
      published,
      totalExposures,
      totalCompletions,
      completionRate: totalExposures > 0 ? (totalCompletions / totalExposures * 100).toFixed(1) : '0',
      avgEffectiveness: avgEffectiveness.toFixed(1),
    };
  }, [filteredNavicues]);

  // Get unique values for filters
  const schemas = useMemo(() => {
    const unique = new Set(navicues.map(nc => nc.schema).filter(Boolean));
    return ['all', ...Array.from(unique).sort()];
  }, [navicues]);

  const families = useMemo(() => {
    const unique = new Set(navicues.map(nc => nc.family).filter(Boolean));
    return ['all', ...Array.from(unique).sort()];
  }, [navicues]);

  const handleOpenInPlayer = (navicue: NaviCue) => {
    // TODO: Open in Player Preview with this navicue loaded
    console.log('Open in player:', navicue.id);
  };

  const handleCreateDelivery = (navicue: NaviCue) => {
    // TODO: Call POST /registry/delivery with navicue contract
    console.log('Create delivery for:', navicue.id);
  };

  const handleViewAnalytics = (navicue: NaviCue) => {
    setSelectedNavicue(navicue);
    setViewMode('analytics');
  };

  const handleSyncData = () => {
    setDataSource('database');
    loadNaviCues();
  };

  if (viewMode === 'sync') {
    return <NaviCueSyncTool onClose={() => setViewMode('list')} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl font-bold">NaviCue Studio</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const newSource = dataSource === 'files' ? 'database' : 'files';
                  setDataSource(newSource);
                }}
                className={`px-4 py-2 transition-colors flex items-center gap-2 ${
                  dataSource === 'database' 
                    ? 'bg-green-700 hover:bg-green-600 text-white' 
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                }`}
              >
                <Database className="w-4 h-4" />
                {dataSource === 'database' ? 'Using Database ✓' : 'Switch to Database'}
              </button>
              <button
                onClick={() => setViewMode('sync')}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Sync Tool
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-zinc-400 text-lg flex-1">
              The Engine Room · Atomic intervention surface · 3000 behavior primitives
            </p>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800">
              <span className="text-xs text-zinc-500">Source:</span>
              <span className={`text-xs font-bold ${
                dataSource === 'files' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {dataSource === 'files' ? 'TS Files' : 'Database'}
              </span>
            </div>
          </div>

          {/* Live Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <StatCard
              title="Total NaviCues"
              value={stats.total}
              subtitle="Filtered"
              icon={Database}
              color="#3E2BB8"
            />
            <StatCard
              title="Batch 1"
              value={stats.batch1}
              subtitle="Foundation"
              icon={Database}
              color="#5739FB"
            />
            <StatCard
              title="Batch 2"
              value={stats.batch2}
              subtitle="Arsenal"
              icon={Database}
              color="#5739FB"
            />
            <StatCard
              title="Batch 3"
              value={stats.batch3}
              subtitle="Council"
              icon={Database}
              color="#5739FB"
            />
            <StatCard
              title="Batch 4"
              value={stats.batch4}
              subtitle="New Additions"
              icon={Database}
              color="#5739FB"
            />
            <StatCard
              title="Published"
              value={stats.published}
              subtitle="Live now"
              icon={Zap}
              color="#10b981"
            />
            <StatCard
              title="Avg Effectiveness"
              value={stats.avgEffectiveness}
              subtitle="User rating"
              icon={BarChart}
              color="#f59e0b"
            />
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={[
            {
              label: 'Batch',
              value: batchFilter,
              options: [
                { value: 'all', label: 'All Batches' },
                { value: '1', label: 'Batch 1: Foundation' },
                { value: '2', label: 'Batch 2: Arsenal' },
                { value: '3', label: 'Batch 3: Council' },
                { value: '4', label: 'Batch 4: New Additions' },
              ],
              onChange: setBatchFilter,
            },
            {
              label: 'Schema',
              value: schemaFilter,
              options: schemas.map(s => ({ value: s, label: s === 'all' ? 'All Schemas' : s })),
              onChange: setSchemaFilter,
            },
            {
              label: 'Family',
              value: familyFilter,
              options: families.map(f => ({ value: f, label: f === 'all' ? 'All Families' : f })),
              onChange: setFamilyFilter,
            },
            {
              label: 'Pillar',
              value: pillarFilter,
              options: [
                { value: 'all', label: 'All Pillars' },
                { value: 'ER', label: 'ER: Emotional Regulation' },
                { value: 'SR', label: 'SR: Self Regulation' },
                { value: 'SC', label: 'SC: Social Connection' },
                { value: 'CR', label: 'CR: Cognitive Reframing' },
                { value: 'II', label: 'II: Identity Integration' },
                { value: 'DM', label: 'DM: Decision Mastery' },
              ],
              onChange: setPillarFilter,
            },
            {
              label: 'Heat',
              value: heatFilter,
              options: [
                { value: 'all', label: 'All Heat Levels' },
                { value: 'high', label: 'High Heat' },
                { value: 'medium', label: 'Medium Heat' },
                { value: 'low', label: 'Low Heat' },
              ],
              onChange: setHeatFilter,
            },
            {
              label: 'Status',
              value: statusFilter,
              options: [
                { value: 'all', label: 'All Status' },
                { value: 'draft', label: 'Draft' },
                { value: 'review', label: 'In Review' },
                { value: 'published', label: 'Published' },
                { value: 'deprecated', label: 'Deprecated' },
              ],
              onChange: setStatusFilter,
            },
          ]}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateNew={() => console.log('Create new NaviCue')}
        />

        {/* Results count */}
        <div className="mb-4 text-sm text-zinc-400">
          Showing {filteredNavicues.length} of {navicues.length} NaviCues
        </div>

        {/* Table */}
        <DataTable
          data={filteredNavicues}
          columns={[
            { 
              key: 'id', 
              label: 'ID',
              render: (val) => <span className="font-mono text-xs text-zinc-400">{val}</span>
            },
            { 
              key: 'name', 
              label: 'Name',
              render: (val) => <span className="font-medium">{val}</span>
            },
            { 
              key: 'text_line', 
              label: 'Text Line',
              render: (val) => <span className="text-sm text-zinc-300">{val?.substring(0, 60)}...</span>
            },
            { 
              key: 'batch', 
              label: 'Batch',
              render: (val) => (
                <span className="px-2 py-1 bg-zinc-800 text-xs">
                  B{val}
                </span>
              )
            },
            { key: 'pillar_id', label: 'Pillar' },
            { key: 'schema', label: 'Schema' },
            { key: 'family', label: 'Family' },
            { 
              key: 'heat_level', 
              label: 'Heat',
              render: (val) => (
                <span className={`px-2 py-1 text-xs ${
                  val === 'high' ? 'bg-red-900/30 text-red-400' :
                  val === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {val}
                </span>
              )
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (val) => (
                <span className={`px-2 py-1 text-xs ${
                  val === 'published' ? 'bg-green-900/30 text-green-400' :
                  val === 'review' ? 'bg-yellow-900/30 text-yellow-400' :
                  val === 'draft' ? 'bg-zinc-800 text-zinc-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {val}
                </span>
              )
            },
            { 
              key: 'exposures_count', 
              label: 'Exposures',
              render: (val) => <span className="text-zinc-400">{val?.toLocaleString() || 0}</span>
            },
            { 
              key: 'completions_count', 
              label: 'Completions',
              render: (val) => <span className="text-green-400">{val?.toLocaleString() || 0}</span>
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenInPlayer(row)}
                    className="p-1 hover:bg-zinc-800 transition-colors"
                    title="Open in Player"
                  >
                    <Play className="w-4 h-4 text-[#5739FB]" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNavicue(row);
                      setViewMode('inspector');
                    }}
                    className="p-1 hover:bg-zinc-800 transition-colors"
                    title="Inspect"
                  >
                    <Eye className="w-4 h-4 text-zinc-400" />
                  </button>
                  <button
                    onClick={() => handleViewAnalytics(row)}
                    className="p-1 hover:bg-zinc-800 transition-colors"
                    title="Analytics"
                  >
                    <BarChart className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
              ),
            },
          ]}
          onRowClick={(row) => {
            setSelectedNavicue(row);
            setViewMode('inspector');
          }}
          loading={loading}
        />

        {/* Integration Status */}
        <div className={`mt-8 p-6 border ${
          dataSource === 'database' 
            ? 'bg-green-900/20 border-green-700/30' 
            : 'bg-yellow-900/20 border-yellow-700/30'
        }`}>
          <h3 className={`font-bold mb-2 ${
            dataSource === 'database' ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {dataSource === 'database' ? '✅ Live Database Integration' : '🔧 API Integration Available'}
          </h3>
          {dataSource === 'database' ? (
            <ul className="text-sm text-green-200 space-y-1">
              <li>✓ Loading NaviCues from v2 database via cc2-clinical-api</li>
              <li>✓ Full schema mapping with targets and variants</li>
              <li>✓ Real-time filtering and search</li>
              <li>• TODO: Wire events API for exposures_count</li>
              <li>• TODO: Wire proofs API for completions_count and effectiveness</li>
            </ul>
          ) : (
            <ul className="text-sm text-yellow-200 space-y-1">
              <li>• Click "Switch to Database" button to load 3,000 NaviCues from Supabase</li>
              <li>• Data will be fetched from cc2/clinical/navicues/list endpoint</li>
              <li>• Full v2 schema with proper schema/family mappings</li>
              <li>• Currently showing NaviCues from TypeScript files</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Inspector view for deep-diving a single NaviCue
function NaviCueInspector({ navicue, onBack }: { navicue: NaviCue; onBack: () => void }) {
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
          {/* Left: NaviCue Details */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h2 className="text-2xl font-bold mb-4">{navicue.name}</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">ID</div>
                  <div className="font-mono text-sm text-zinc-300">{navicue.id}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Text Line</div>
                  <div className="text-lg text-white">{navicue.text_line}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Batch</div>
                    <div className="text-sm">Batch {navicue.batch}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Pillar</div>
                    <div className="text-sm">{navicue.pillar_id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Schema</div>
                    <div className="text-sm">{navicue.schema}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Family</div>
                    <div className="text-sm">{navicue.family}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">KBE Layer</div>
                    <div className="text-sm">{navicue.kbe_layer}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Heat Level</div>
                    <div className="text-sm">{navicue.heat_level}</div>
                  </div>
                </div>
                {navicue.council_lens && (
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Council Lens</div>
                    <div className="text-sm text-purple-400">{navicue.council_lens}</div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {navicue.tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-800 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Open in Player Preview
              </button>
              <button className="w-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                <Database className="w-4 h-4" />
                Create Delivery Variant
              </button>
              <button className="w-full px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Metadata
              </button>
            </div>
          </div>

          {/* Right: Analytics & Wiring */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4">Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Exposures</span>
                  <span className="font-bold">{navicue.exposures_count?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Completions</span>
                  <span className="font-bold text-green-400">{navicue.completions_count?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Completion Rate</span>
                  <span className="font-bold">
                    {navicue.exposures_count && navicue.completions_count
                      ? ((navicue.completions_count / navicue.exposures_count) * 100).toFixed(1)
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Avg Effectiveness</span>
                  <span className="font-bold text-yellow-400">{navicue.avg_effectiveness}/10</span>
                </div>
              </div>
            </div>

            {/* Wiring */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4">System Wiring</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-2 h-2 bg-green-500"></div>
                  <span>Registry Contract: Linked</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-2 h-2 bg-green-500"></div>
                  <span>Delivery Variants: 2 active</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-2 h-2 bg-green-500"></div>
                  <span>Event Spine: {navicue.exposures_count} events</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-2 h-2 bg-green-500"></div>
                  <span>Proofs: {navicue.completions_count} artifacts</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="w-2 h-2 bg-yellow-500"></div>
                  <span>Decision Traces: TODO</span>
                </div>
              </div>
            </div>

            {/* TODO: Recent Events */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4">Recent Events</h3>
              <div className="text-sm text-zinc-500">
                Load events from event_spine where content_ref = navicue:{navicue.id}
              </div>
            </div>

            {/* TODO: Recent Proofs */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-4">Recent Proofs</h3>
              <div className="text-sm text-zinc-500">
                Load proofs where content_ref = navicue:{navicue.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics view for a single NaviCue
function NaviCueAnalytics({ navicue, onBack }: { navicue: NaviCue; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          ← Back to List
        </button>

        <h1 className="text-3xl font-bold mb-8">
          Analytics: {navicue.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Exposures"
            value={navicue.exposures_count || 0}
            subtitle="All time"
            icon={Eye}
            color="#3E2BB8"
          />
          <StatCard
            title="Completions"
            value={navicue.completions_count || 0}
            subtitle="All time"
            icon={Zap}
            color="#10b981"
          />
          <StatCard
            title="Completion Rate"
            value={`${navicue.exposures_count && navicue.completions_count
              ? ((navicue.completions_count / navicue.exposures_count) * 100).toFixed(1)
              : 0}%`}
            subtitle="Engage rate"
            icon={BarChart}
            color="#5739FB"
          />
          <StatCard
            title="Effectiveness"
            value={`${navicue.avg_effectiveness || 0}/10`}
            subtitle="User rating"
            icon={BarChart}
            color="#f59e0b"
          />
        </div>

        {/* TODO: Charts and graphs */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-12 text-center">
          <BarChart className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-zinc-400">Analytics Coming Soon</h3>
          <p className="text-zinc-500">
            Cohort analysis, time series, effectiveness trends, and more
          </p>
        </div>
      </div>
    </div>
  );
}