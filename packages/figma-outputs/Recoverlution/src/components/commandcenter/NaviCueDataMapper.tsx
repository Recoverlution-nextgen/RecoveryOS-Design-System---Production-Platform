/**
 * NAVICUE DATA MAPPER & TAGGING SYSTEM
 * 
 * Front-end control room for organizing all NaviCue metadata.
 * Build the schema/tagging system BEFORE connecting to database.
 * 
 * Features:
 * - View all 500 NaviCues with current metadata
 * - Tag editor for each NaviCue
 * - Schema assignment interface
 * - Mindblock mapping
 * - Intent/Mechanism/Voice/Track tagging
 * - Bulk operations
 * - Coverage dashboard
 * - Export mapping JSON for database import
 * 
 * Created: December 26, 2025
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, X } from 'lucide-react';
import { CommandCenterCard } from './CommandCenterLayout';
import { NAVICUE_1000_COMPLETE } from '../../lib/navicues/NAVICUE_1000_COMPLETE';
import { NAVICUE_MASTER_2000 } from '../../lib/navicues/NAVICUE_MASTER_2000';
import { NAVICUE_3000_COUNCIL } from '../../lib/navicues/NAVICUE_3000_COUNCIL';
import type { NaviCue } from '../../lib/navicues/types';

// ============================================================================
// TYPES
// ============================================================================

interface NaviCueMetadata {
  id: string;
  name: string;
  text_line: string;
  family: string;
  track: string | null;
  pillar: string | null;
  concept: string | null;
  theme: string | null;
  mindblocks: string[];
  schemas: string[];
  intent_primary: string | null;
  intent_secondary: string | null;
  delivery_mechanism: string | null;
  voice_archetype: string | null;
  kbe_layer: string | null;
  status: string;
  completeness: number;
}

interface TaggingStats {
  totalNaviCues: number;
  fullyTagged: number;
  partiallyTagged: number;
  untagged: number;
  avgCompleteness: number;
  byTrack: Record<string, number>;
  byPillar: Record<string, number>;
  byFamily: Record<string, number>;
}

// ============================================================================
// NAVICUE DATA MAPPER
// ============================================================================

export default function NaviCueDataMapper({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [naviCues, setNaviCues] = useState<NaviCueMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNaviCue, setSelectedNaviCue] = useState<NaviCueMetadata | null>(null);
  const [filterTrack, setFilterTrack] = useState<string>('all');
  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [filterCompleteness, setFilterCompleteness] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load NaviCues from local TypeScript files
  useEffect(() => {
    async function loadLocalNaviCues() {
      try {
        setLoading(true);
        
        // Combine all 3 batches
        const allNaviCues = [
          ...NAVICUE_1000_COMPLETE,
          ...NAVICUE_MASTER_2000,
          ...NAVICUE_3000_COUNCIL,
        ];

        console.log('Loaded NaviCues from local data:', allNaviCues.length);

        // Transform to NaviCueMetadata format
        const transformedNaviCues: NaviCueMetadata[] = allNaviCues.map((nc: NaviCue) => {
          // Calculate completeness based on filled fields
          const fields = [
            nc.pillar_id,
            nc.track,
            nc.schema,
            nc.family,
            nc.voice_archetype,
            nc.kbe_target,
          ];
          const filledFields = fields.filter(f => f != null).length;
          const completeness = Math.round((filledFields / fields.length) * 100);

          return {
            id: nc.id || `NC-${Math.random().toString(36).substr(2, 9)}`,
            name: nc.name || 'Untitled NaviCue',
            text_line: nc.text_line || '',
            family: nc.family || 'Unknown',
            track: nc.track || null,
            pillar: nc.pillar_id || null,
            concept: null, // Not in current schema
            theme: null, // Not in current schema
            mindblocks: [], // Not in current schema
            schemas: nc.schema ? [nc.schema] : [],
            intent_primary: null, // Not in current schema
            intent_secondary: null, // Not in current schema
            delivery_mechanism: nc.family || null,
            voice_archetype: nc.voice_archetype || null,
            kbe_layer: nc.kbe_target || null,
            status: 'active',
            completeness,
          };
        });

        setNaviCues(transformedNaviCues);
        setError(null);
      } catch (err) {
        console.error('Error loading local NaviCues:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadLocalNaviCues();
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalNaviCues = naviCues.length;
    const fullyTagged = naviCues.filter((n) => n.completeness === 100).length;
    const partiallyTagged = naviCues.filter((n) => n.completeness > 20 && n.completeness < 100).length;
    const untagged = naviCues.filter((n) => n.completeness <= 20).length;
    const avgCompleteness = totalNaviCues > 0 ? Math.round((fullyTagged + partiallyTagged * 0.5) / totalNaviCues * 100) : 0;
    
    const byTrack: Record<string, number> = {};
    const byPillar: Record<string, number> = {};
    const byFamily: Record<string, number> = {};
    
    naviCues.forEach((n) => {
      if (n.track) {
        byTrack[n.track] = (byTrack[n.track] || 0) + 1;
      }
      if (n.pillar) {
        byPillar[n.pillar] = (byPillar[n.pillar] || 0) + 1;
      }
      if (n.family) {
        byFamily[n.family] = (byFamily[n.family] || 0) + 1;
      }
    });
    
    return {
      totalNaviCues,
      fullyTagged,
      partiallyTagged,
      untagged,
      avgCompleteness,
      byTrack,
      byPillar,
      byFamily,
    };
  }, [naviCues]);

  // Filter navicues
  const filteredNaviCues = useMemo(() => {
    return naviCues.filter((navicue) => {
      // Search filter
      if (searchQuery && !navicue.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !navicue.text_line.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !navicue.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Track filter
      if (filterTrack !== 'all' && navicue.track !== filterTrack) {
        return false;
      }
      
      // Pillar filter
      if (filterPillar !== 'all' && navicue.pillar !== filterPillar) {
        return false;
      }
      
      // Completeness filter
      if (filterCompleteness === 'complete' && navicue.completeness !== 100) {
        return false;
      }
      if (filterCompleteness === 'partial' && (navicue.completeness <= 20 || navicue.completeness === 100)) {
        return false;
      }
      if (filterCompleteness === 'incomplete' && navicue.completeness > 20) {
        return false;
      }
      
      return true;
    });
  }, [naviCues, searchQuery, filterTrack, filterPillar, filterCompleteness]);

  return (
    <div style={{ color: '#FFFFFF' }}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Data Mapping & Tagging System</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Front-end control room for organizing all NaviCue metadata before database connection
        </p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
          }}
        >
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Total NaviCues
          </div>
          <div className="text-3xl mb-1">{stats.totalNaviCues}</div>
        </div>
        
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}
        >
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Fully Tagged
          </div>
          <div className="text-3xl mb-1" style={{ color: '#22C55E' }}>{stats.fullyTagged}</div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {Math.round((stats.fullyTagged / stats.totalNaviCues) * 100)}%
          </div>
        </div>
        
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Partially Tagged
          </div>
          <div className="text-3xl mb-1" style={{ color: '#F59E0B' }}>{stats.partiallyTagged}</div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {Math.round((stats.partiallyTagged / stats.totalNaviCues) * 100)}%
          </div>
        </div>
        
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Needs Tagging
          </div>
          <div className="text-3xl mb-1" style={{ color: '#EF4444' }}>{stats.untagged}</div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {Math.round((stats.untagged / stats.totalNaviCues) * 100)}%
          </div>
        </div>
      </div>

      {/* Coverage Analysis */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Pillar Coverage */}
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.05)',
            border: '1px solid rgba(87, 57, 251, 0.2)',
          }}
        >
          <h3 className="text-lg mb-3">Pillar Coverage</h3>
          <div className="space-y-2">
            {Object.entries(stats.byPillar).map(([pillar, count]) => (
              <div key={pillar} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3"
                    style={{ backgroundColor: 'rgba(87, 57, 251, 0.5)' }}
                  />
                  <span className="text-sm">{pillar}</span>
                </div>
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {count} NaviCues
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Track Distribution */}
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.05)',
            border: '1px solid rgba(87, 57, 251, 0.2)',
          }}
        >
          <h3 className="text-lg mb-3">Track Distribution</h3>
          <div className="space-y-2">
            {Object.entries(stats.byTrack).map(([track, count]) => (
              <div key={track} className="flex items-center justify-between">
                <span className="text-sm capitalize">{track}</span>
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {count} NaviCues
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            size={16} 
            style={{ color: 'rgba(255, 255, 255, 0.4)' }}
          />
          <input
            type="text"
            placeholder="Search NaviCues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              color: '#FFFFFF',
            }}
          />
        </div>

        {/* Track Filter */}
        <select
          value={filterTrack}
          onChange={(e) => setFilterTrack(e.target.value)}
          className="px-4 py-2"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
          }}
        >
          <option value="all">All Tracks</option>
          <option value="clinical">Clinical</option>
          <option value="guru">Guru</option>
          <option value="infinite">Infinite</option>
          <option value="custom">Custom</option>
          <option value="unassigned">Unassigned</option>
        </select>

        {/* Pillar Filter */}
        <select
          value={filterPillar}
          onChange={(e) => setFilterPillar(e.target.value)}
          className="px-4 py-2"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
          }}
        >
          <option value="all">All Pillars</option>
          <option value="ER">Emotional Regulation</option>
          <option value="SR">Self Regulation</option>
          <option value="SC">Social Connection</option>
          <option value="CR">Cognitive Reframing</option>
          <option value="II">Identity Integration</option>
          <option value="DM">Developing Meaning</option>
        </select>

        {/* Completeness Filter */}
        <select
          value={filterCompleteness}
          onChange={(e) => setFilterCompleteness(e.target.value as any)}
          className="px-4 py-2"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
            color: '#FFFFFF',
          }}
        >
          <option value="all">All Completeness</option>
          <option value="complete">Fully Tagged</option>
          <option value="partial">Partially Tagged</option>
          <option value="incomplete">Needs Tagging</option>
        </select>

        {/* Export Button */}
        <button
          className="px-4 py-2 flex items-center gap-2"
          style={{
            backgroundColor: '#5739FB',
            color: '#FFFFFF',
          }}
        >
          <Download size={16} />
          Export JSON
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        Showing {filteredNaviCues.length} of {stats.totalNaviCues} NaviCues
      </div>

      {/* NaviCue List */}
      <div className="space-y-2">
        {filteredNaviCues.map((navicue) => (
          <NaviCueRow
            key={navicue.id}
            navicue={navicue}
            onClick={() => {
              setSelectedNaviCue(navicue);
            }}
            isSelected={selectedNaviCue?.id === navicue.id}
          />
        ))}
      </div>

      {/* Detail Panel */}
      {selectedNaviCue && (
        <NaviCueDetailPanel
          navicue={selectedNaviCue}
          onClose={() => {
            setSelectedNaviCue(null);
          }}
        />
      )}
    </div>
  );
}

// ============================================================================
// NAVICUE ROW
// ============================================================================

interface NaviCueRowProps {
  navicue: NaviCueMetadata;
  onClick: () => void;
  isSelected: boolean;
}

function NaviCueRow({ navicue, onClick, isSelected }: NaviCueRowProps) {
  const completenessColor = 
    navicue.completeness === 100 ? '#22C55E' :
    navicue.completeness > 20 ? '#F59E0B' :
    '#EF4444';

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 transition-all duration-200"
      style={{
        backgroundColor: isSelected ? 'rgba(87, 57, 251, 0.2)' : 'rgba(87, 57, 251, 0.05)',
        border: `2px solid ${isSelected ? '#5739FB' : 'transparent'}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {navicue.id}
            </span>
            {navicue.pillar && (
              <span 
                className="px-2 py-0.5 text-xs"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.2)',
                  color: '#5739FB',
                }}
              >
                {navicue.pillar}
              </span>
            )}
            {navicue.track && (
              <span 
                className="px-2 py-0.5 text-xs capitalize"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.2)',
                  color: '#5739FB',
                }}
              >
                {navicue.track}
              </span>
            )}
          </div>
          <div className="text-sm mb-1">{navicue.name}</div>
          <div className="text-xs line-clamp-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {navicue.text_line}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div 
            className="px-2 py-1 text-xs"
            style={{
              backgroundColor: `${completenessColor}20`,
              color: completenessColor,
            }}
          >
            {navicue.completeness}% tagged
          </div>
          <div className="text-xs capitalize" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {navicue.status}
          </div>
        </div>
      </div>
    </button>
  );
}

// ============================================================================
// DETAIL PANEL
// ============================================================================

interface NaviCueDetailPanelProps {
  navicue: NaviCueMetadata;
  onClose: () => void;
}

function NaviCueDetailPanel({ navicue, onClose }: NaviCueDetailPanelProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
        style={{
          backgroundColor: '#0A0B0F',
          border: '1px solid rgba(87, 57, 251, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl mb-2">{navicue.name}</h3>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {navicue.id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.2)',
                color: '#FFFFFF',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Text Line */}
          <div>
            <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Text Line
            </label>
            <div className="p-3" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
              {navicue.text_line}
            </div>
          </div>

          {/* Clinical Mapping */}
          <div>
            <h4 className="text-lg mb-3">Clinical Mapping</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Pillar
                </label>
                <div className="text-sm">{navicue.pillar || 'Not assigned'}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Track
                </label>
                <div className="text-sm capitalize">{navicue.track || 'Not assigned'}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Schemas
                </label>
                <div className="text-sm">{navicue.schemas.length > 0 ? navicue.schemas.join(', ') : 'None'}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Mindblocks
                </label>
                <div className="text-sm">{navicue.mindblocks.length > 0 ? navicue.mindblocks.join(', ') : 'None'}</div>
              </div>
            </div>
          </div>

          {/* Intent & Mechanism */}
          <div>
            <h4 className="text-lg mb-3">Intent & Mechanism</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Primary Intent
                </label>
                <div className="text-sm capitalize">{navicue.intent_primary || 'Not assigned'}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Secondary Intent
                </label>
                <div className="text-sm capitalize">{navicue.intent_secondary || 'None'}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Delivery Mechanism
                </label>
                <div className="text-sm">{navicue.delivery_mechanism || 'Not assigned'}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Voice Archetype
                </label>
                <div className="text-sm">{navicue.voice_archetype || 'Not assigned'}</div>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div>
            <h4 className="text-lg mb-3">Meta</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  KBE Layer
                </label>
                <div className="text-sm capitalize">{navicue.kbe_layer || 'Not assigned'}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Status
                </label>
                <div className="text-sm capitalize">{navicue.status}</div>
              </div>
              <div>
                <label className="text-xs mb-2 block" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Completeness
                </label>
                <div className="text-sm">{navicue.completeness}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}