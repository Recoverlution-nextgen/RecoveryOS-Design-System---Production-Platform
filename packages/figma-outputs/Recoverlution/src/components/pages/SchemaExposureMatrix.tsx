/**
 * SCHEMA EXPOSURE MATRIX
 * 
 * Exposes the complete data landscape and shows how backend + frontend tags marry.
 * 
 * 6 Views:
 * 1. Database Tables - All tables and their structure
 * 2. Tag Coverage - What's tagged, what's not
 * 3. Relationship Web - How content connects
 * 4. Clinical Taxonomy - Pillar → Concept → Theme → Mindblock
 * 5. Content Inventory - What exists across all types
 * 6. Gap Analysis - What's missing, what's orphaned
 * 
 * Philosophy: "Nothing is an island. Everything has purpose and power."
 * 
 * Created: December 26, 2025
 * Status: Foundation for Command Center
 */

import React, { useState, useEffect } from 'react';
import {
  SCHEMA_MAP,
  PILLARS,
  CONTENT_TYPES,
  VOICE_ARCHETYPES,
  DELIVERY_LAYERS,
  type DatabaseSchemaMap,
  type ContentType,
  type PillarID,
  type TaggingStatus,
} from '../../utils/universal-tags';

type ViewMode = 
  | 'database'
  | 'coverage'
  | 'relationships'
  | 'taxonomy'
  | 'inventory'
  | 'gaps';

export default function SchemaExposureMatrix() {
  const [view, setView] = useState<ViewMode>('database');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  // Fetch stats from Supabase on mount
  useEffect(() => {
    fetchDatabaseStats();
  }, []);

  async function fetchDatabaseStats() {
    setLoading(true);
    try {
      // TODO: Implement actual API calls to get counts
      // For now, placeholder data
      setStats({
        navicues: { total: 500, active: 500 },
        articles: { total: 180, active: 180 },
        practices: { total: 180, active: 180 },
        insights: { total: 0, active: 0 },
        wellbeing_videos: { total: 0, active: 0 },
        journeys: { total: 0, active: 0 },
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1a0a2e] to-[#0A0118]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white mb-2">Schema Exposure Matrix</h1>
              <p className="text-white/60">
                Backend ↔ Frontend Tag Marriage · Nothing is an island · Everything has purpose and power
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded bg-[#3E2BB8]/20 border border-[#3E2BB8]/30">
                <span className="text-[#5739FB] text-sm">
                  {stats ? `${Object.values(stats).reduce((sum: number, s: any) => sum + s.total, 0)} total items` : 'Loading...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* View Selector */}
      <div className="border-b border-white/10 bg-black/10">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="flex gap-1 py-2">
            {[
              { id: 'database' as ViewMode, label: '1. Database Tables', icon: '🗄️' },
              { id: 'coverage' as ViewMode, label: '2. Tag Coverage', icon: '📊' },
              { id: 'relationships' as ViewMode, label: '3. Relationship Web', icon: '🕸️' },
              { id: 'taxonomy' as ViewMode, label: '4. Clinical Taxonomy', icon: '🧬' },
              { id: 'inventory' as ViewMode, label: '5. Content Inventory', icon: '📦' },
              { id: 'gaps' as ViewMode, label: '6. Gap Analysis', icon: '🔍' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`
                  px-4 py-2 rounded text-sm transition-all
                  ${view === v.id
                    ? 'bg-[#3E2BB8] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="mr-2">{v.icon}</span>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1920px] mx-auto px-8 py-8">
        {view === 'database' && <DatabaseTablesView />}
        {view === 'coverage' && <TagCoverageView stats={stats} />}
        {view === 'relationships' && <RelationshipWebView />}
        {view === 'taxonomy' && <ClinicalTaxonomyView />}
        {view === 'inventory' && <ContentInventoryView stats={stats} />}
        {view === 'gaps' && <GapAnalysisView stats={stats} />}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 1: DATABASE TABLES
// ============================================================================

function DatabaseTablesView() {
  return (
    <div className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-2">Database Schema Map</h2>
        <p className="text-white/60 mb-6">
          All tables in Supabase and their tag structure
        </p>

        <div className="space-y-4">
          {SCHEMA_MAP.map((table) => (
            <TableCard key={table.table_name} table={table} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TableCard({ table }: { table: DatabaseSchemaMap }) {
  const [expanded, setExpanded] = useState(false);

  const tagCount = Object.values(table.tag_columns).flat().length;

  return (
    <div className="bg-white/5 border border-white/10 rounded p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="text-[#5739FB] text-2xl">
            {CONTENT_TYPES[table.content_type].split(' ')[0]}
          </div>
          <div>
            <h3 className="text-white">{table.table_name}</h3>
            <p className="text-white/60 text-sm">
              {CONTENT_TYPES[table.content_type]} · {tagCount} tag columns
              {table.has_jsonb && ' · JSONB flexible schema'}
            </p>
          </div>
        </div>
        <div className="text-white/40">
          {expanded ? '▼' : '▶'}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pl-12 space-y-3">
          <div>
            <div className="text-white/60 text-sm mb-1">Clinical Tags:</div>
            <div className="flex flex-wrap gap-2">
              {table.tag_columns.clinical.length > 0 ? (
                table.tag_columns.clinical.map((col) => (
                  <span key={col} className="px-2 py-1 bg-[#3E2BB8]/20 border border-[#3E2BB8]/30 rounded text-[#5739FB] text-sm">
                    {col}
                  </span>
                ))
              ) : (
                <span className="text-white/40 text-sm">⚠️ Not yet implemented</span>
              )}
            </div>
          </div>

          <div>
            <div className="text-white/60 text-sm mb-1">Delivery Tags:</div>
            <div className="flex flex-wrap gap-2">
              {table.tag_columns.delivery.length > 0 ? (
                table.tag_columns.delivery.map((col) => (
                  <span key={col} className="px-2 py-1 bg-[#5739FB]/20 border border-[#5739FB]/30 rounded text-[#7B68EE] text-sm">
                    {col}
                  </span>
                ))
              ) : (
                <span className="text-white/40 text-sm">⚠️ Not yet implemented</span>
              )}
            </div>
          </div>

          <div>
            <div className="text-white/60 text-sm mb-1">Voice Tags:</div>
            <div className="flex flex-wrap gap-2">
              {table.tag_columns.voice.length > 0 ? (
                table.tag_columns.voice.map((col) => (
                  <span key={col} className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 text-sm">
                    {col}
                  </span>
                ))
              ) : (
                <span className="text-white/40 text-sm">⚠️ Not yet implemented</span>
              )}
            </div>
          </div>

          {table.has_jsonb && (
            <div>
              <div className="text-white/60 text-sm mb-1">JSONB Columns:</div>
              <div className="flex flex-wrap gap-2">
                {table.jsonb_columns?.map((col) => (
                  <span key={col} className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-sm">
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// VIEW 2: TAG COVERAGE
// ============================================================================

function TagCoverageView({ stats }: { stats: any }) {
  if (!stats) {
    return <div className="text-white/60">Loading statistics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-2">Tag Coverage Analysis</h2>
        <p className="text-white/60 mb-6">
          Shows which content has which tags · Identifies gaps
        </p>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(CONTENT_TYPES).map(([key, label]) => {
            const contentType = key as ContentType;
            const total = stats[contentType]?.total || 0;
            
            return (
              <CoverageCard
                key={key}
                contentType={contentType}
                label={label}
                total={total}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CoverageCard({
  contentType,
  label,
  total,
}: {
  contentType: ContentType;
  label: string;
  total: number;
}) {
  // TODO: Fetch actual tagging stats from database
  // For now, placeholder percentages
  const coverage = {
    clinical: contentType === 'navicue' ? 100 : contentType === 'article' || contentType === 'practice' ? 100 : 0,
    delivery: contentType === 'navicue' ? 30 : 0,
    voice: 0,
    state: 0,
    relationships: 0,
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded p-4">
      <h3 className="text-white mb-1">{label}</h3>
      <div className="text-[#5739FB] text-2xl mb-4">{total} items</div>

      <div className="space-y-2">
        {Object.entries(coverage).map(([tag, percent]) => (
          <div key={tag}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/60 capitalize">{tag}</span>
              <span className="text-white/80">{percent}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percent === 100
                    ? 'bg-green-500'
                    : percent > 50
                    ? 'bg-yellow-500'
                    : percent > 0
                    ? 'bg-orange-500'
                    : 'bg-red-500/50'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 3: RELATIONSHIP WEB
// ============================================================================

function RelationshipWebView() {
  return (
    <div className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-2">Relationship Web</h2>
        <p className="text-white/60 mb-6">
          How all content connects · Nothing is an island
        </p>

        <div className="bg-white/5 border border-white/10 rounded p-8">
          <div className="text-center text-white/60">
            🕸️ Visual relationship graph coming soon
            <br />
            <br />
            Will show:
            <ul className="text-left max-w-md mx-auto mt-4 space-y-2">
              <li>• NaviCue → Mindblock connections</li>
              <li>• Article → Mindblock connections</li>
              <li>• Practice → Mindblock connections</li>
              <li>• Journey → Scene → Content links</li>
              <li>• Orphaned content (no relationships)</li>
              <li>• Hub content (highly connected)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 4: CLINICAL TAXONOMY
// ============================================================================

function ClinicalTaxonomyView() {
  return (
    <div className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-2">Clinical Taxonomy</h2>
        <p className="text-white/60 mb-6">
          Pillar → Concept → Theme → Mindblock hierarchy
        </p>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(PILLARS).map(([id, name]) => (
            <div key={id} className="bg-white/5 border border-white/10 rounded p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#3E2BB8]" />
                <h3 className="text-white">{name}</h3>
              </div>
              <div className="text-white/60 text-sm">
                ID: {id}
                <br />
                Concepts: Coming soon
                <br />
                Themes: Coming soon
                <br />
                Mindblocks: Coming soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 5: CONTENT INVENTORY
// ============================================================================

function ContentInventoryView({ stats }: { stats: any }) {
  if (!stats) {
    return <div className="text-white/60">Loading inventory...</div>;
  }

  const total = Object.values(stats).reduce((sum: number, s: any) => sum + s.total, 0);

  return (
    <div className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-2">Content Inventory</h2>
        <p className="text-white/60 mb-6">
          Complete count of all content across platform
        </p>

        <div className="mb-8">
          <div className="text-[#5739FB] text-5xl mb-2">{total}</div>
          <div className="text-white/60">Total pieces of content</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(stats).map(([type, data]: [string, any]) => (
            <div key={type} className="bg-white/5 border border-white/10 rounded p-4">
              <div className="text-[#5739FB] text-3xl mb-1">{data.total}</div>
              <div className="text-white capitalize">{type.replace('_', ' ')}</div>
              <div className="text-white/60 text-sm">{data.active} active</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 6: GAP ANALYSIS
// ============================================================================

function GapAnalysisView({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-6">
        <h2 className="text-white mb-2">Gap Analysis</h2>
        <p className="text-white/60 mb-6">
          What's missing · What's orphaned · What needs attention
        </p>

        <div className="space-y-4">
          {/* Missing Tags */}
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
            <h3 className="text-red-400 mb-2">🚨 Missing Tags</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• 500 NaviCues missing delivery_layer tag</li>
              <li>• 500 NaviCues missing voice_archetype tag</li>
              <li>• 500 NaviCues missing concept/theme/mindblock tags</li>
              <li>• 180 Articles missing mindblock mapping</li>
              <li>• 180 Practices missing mindblock mapping</li>
            </ul>
          </div>

          {/* Orphaned Content */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4">
            <h3 className="text-yellow-400 mb-2">⚠️ Orphaned Content</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Content not linked to any mindblocks</li>
              <li>• Content not part of any journey</li>
              <li>• Content with no relationships</li>
            </ul>
          </div>

          {/* Not Yet Built */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
            <h3 className="text-blue-400 mb-2">🔨 Not Yet Built</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• 0 Insights (need to create library)</li>
              <li>• 0 Wellbeing Videos (need to migrate)</li>
              <li>• 0 Journeys (need to build scenes)</li>
            </ul>
          </div>

          {/* Strong Coverage */}
          <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
            <h3 className="text-green-400 mb-2">✅ Strong Coverage</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• 500 NaviCues (all have pillar tags)</li>
              <li>• 180 Articles (all have pillar tags)</li>
              <li>• 180 Practices (all have pillar tags)</li>
              <li>• 450 Soundbites in consolidated storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
