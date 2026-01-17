/**
 * NAVICUE ARSENAL V3
 * 
 * Rebuilt from the ground up around the clinical foundation:
 * Pillar → Concept → Theme → Mindblock → NaviCue
 * 
 * Structure:
 * 1. PLAYER - Hero tab for selecting and playing NaviCues
 * 2. CLINICAL FOUNDATION - Schema-driven navigation + Creative Tools
 * 3. ANALYTICS & SYSTEM - Performance and integration
 * 4. DATA MAPPING - Tagging and data management
 * 
 * Created: December 26, 2025
 * Updated: December 29, 2025 - Player-first architecture
 */

import React, { useState } from 'react';
import { CommandCenterLayout } from '../commandcenter/CommandCenterLayout';
import { TabbedContent } from '../commandcenter/UniversalPatterns';
import { BeliefLadder, BeliefProgressTracker, BeliefLadderData, BeliefProgressData } from '../navicues/BeliefProgressTracker';
import { VOICE_ARCHETYPES, VoiceArchetypeName } from '../navicues/VoiceWrapper';
import { ALL_CLINICAL, ALL_GURU, ALL_INFINITE, EXTENDED_NAVICUE_CATALOG, getCompletionPercentage } from '../navicues/arsenal';
import NaviCueArsenalBrowser from '../navicues/NaviCueArsenalBrowser';
import { CreativePlaygroundPage } from './CreativePlaygroundPage';
import { MagicWandUniverse } from './magicwand/MagicWandUniverse';
import { MyBrainLaboratory } from './mybrain/MyBrainLaboratory';
import { FeatureIntegrationsOrchestra } from './integrations/FeatureIntegrationsOrchestra';
import NaviCueDataMapper from '../commandcenter/NaviCueDataMapper';
import { NaviCueLibraryBrowser } from './NaviCueLibraryBrowser';
import { AdminNaviCueSync } from '../AdminNaviCueSync';
import { CreativeDomainsBrowser } from './CreativeDomainsBrowser';
import { UniversalPlayer } from '../universal-player/UniversalPlayer';
import { NaviCueFilters } from '../../lib/navicues/types';
import { NaviCueMatrixHero } from '../navicues/NaviCueMatrixHero';
import { LaunchPlayerView } from './LaunchPlayerView';
import { BatchOverview } from '../commandcenter/arsenal/BatchOverview';
import { EnhancementControls } from '../commandcenter/arsenal/EnhancementControls';
import { NaviCueLibraryBrowser } from '../commandcenter/arsenal/NaviCueLibraryBrowser';
import { NAVICUE_1000_COMPLETE } from '../../lib/navicues/NAVICUE_1000_COMPLETE';
import { NAVICUE_MASTER_2000 } from '../../lib/navicues/NAVICUE_MASTER_2000';
import { NAVICUE_3000_COUNCIL } from '../../lib/navicues/NAVICUE_3000_COUNCIL';

interface NaviCueArsenalPageProps {
  onNavigate?: (page: string) => void;
}

export default function NaviCueArsenalPageV3({ onNavigate }: NaviCueArsenalPageProps) {
  // Main category view
  const [category, setCategory] = useState<'player' | 'production' | 'analytics' | 'mapping'>('player');
  
  // Sub-views within each category
  const [playerView, setPlayerView] = useState<'launch' | 'history' | 'favorites'>('launch');
  const [productionView, setProductionView] = useState<'batches' | 'enhancement' | 'library'>('library');
  const [analyticsView, setAnalyticsView] = useState<'effectiveness' | 'lifecycle' | 'belief-ladders' | 'integrations'>('effectiveness');
  
  // State for specific views
  const [selectedSchema, setSelectedSchema] = useState<string | null>('shame');
  const [selectedPillar, setSelectedPillar] = useState<string | null>('ER');
  const [selectedVoice, setSelectedVoice] = useState<VoiceArchetypeName | null>(null);

  // Universal Player state
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerFilters, setPlayerFilters] = useState<NaviCueFilters>({});

  // Handler to enter player with filters
  const handleEnterPlayer = (filters: NaviCueFilters) => {
    setPlayerFilters(filters);
    setShowPlayer(true);
  };

  // Calculate REAL stats from actual data
  const batch1Count = NAVICUE_1000_COMPLETE.length;
  const batch2Count = NAVICUE_MASTER_2000.length - batch1Count;
  const batch3Count = NAVICUE_3000_COUNCIL.length;
  const totalNaviCues = batch1Count + batch2Count + batch3Count;

  const views = [
    { 
      id: 'player', 
      label: 'Player', 
      icon: '▶',
      badge: `${totalNaviCues}`,
    },
    { 
      id: 'production', 
      label: 'Production Floor', 
      icon: 'PROD',
      badge: '3 Batches',
    },
    { 
      id: 'analytics', 
      label: 'Analytics Observatory', 
      icon: 'SCAN',
      badge: 'Live',
    },
    { 
      id: 'mapping', 
      label: 'Data Mapping', 
      icon: 'MAP',
      badge: 'Tagging',
    },
  ];

  const headerStats = [
    {
      label: 'Total NaviCues',
      value: totalNaviCues,
      status: 'success' as const,
    },
    {
      label: 'Batch 1',
      value: batch1Count,
      status: 'success' as const,
    },
    {
      label: 'Batch 2',
      value: batch2Count,
      status: batch2Count > 0 ? 'success' as const : 'warning' as const,
    },
    {
      label: 'Batch 3',
      value: batch3Count,
      status: batch3Count > 0 ? 'success' as const : 'warning' as const,
    },
  ];

  return (
    <CommandCenterLayout
      title="NaviCue Arsenal"
      subtitle={`${totalNaviCues} production-ready NaviCues • 3 Batches • Clinical Foundation • LUMA Ready`}
      icon="⚡"
      currentView={category}
      views={views}
      onViewChange={(viewId) => setCategory(viewId as any)}
      onNavigate={onNavigate}
      stats={headerStats}
    >
      {/* CATEGORY 1: PLAYER (The Hero) */}
      {category === 'player' && (
        <PlayerCategory
          view={playerView}
          onViewChange={setPlayerView}
          onEnterPlayer={handleEnterPlayer}
        />
      )}

      {/* CATEGORY 2: PRODUCTION FLOOR (Enhancement, Batches, Library) */}
      {category === 'production' && (
        <ProductionFloorCategory
          view={productionView}
          onViewChange={setProductionView}
        />
      )}

      {/* CATEGORY 3: ANALYTICS OBSERVATORY (All Data) */}
      {category === 'analytics' && (
        <AnalyticsObservatoryCategory
          view={analyticsView}
          onViewChange={setAnalyticsView}
        />
      )}

      {/* CATEGORY 4: DATA MAPPING */}
      {category === 'mapping' && (
        <DataMappingCategory
          onNavigate={onNavigate}
        />
      )}

      {/* UNIVERSAL PLAYER OVERLAY */}
      {showPlayer && (
        <UniversalPlayer
          mode="filtered"
          filters={playerFilters}
          onClose={() => setShowPlayer(false)}
          onNaviCueComplete={(navicue, response) => {
            console.log('NaviCue completed:', navicue.id, response);
          }}
          showProgress={true}
          allowCollapse={true}
        />
      )}
    </CommandCenterLayout>
  );
}

// ============================================================================
// CATEGORY 1: PLAYER
// ============================================================================

interface PlayerCategoryProps {
  view: 'launch' | 'history' | 'favorites';
  onViewChange: (view: 'launch' | 'history' | 'favorites') => void;
  onEnterPlayer?: (filters: NaviCueFilters) => void;
}

function PlayerCategory({ view, onViewChange, onEnterPlayer }: PlayerCategoryProps) {
  const tabs = [
    {
      id: 'launch',
      label: 'Launch Player',
      icon: '▶',
      badge: 'All NaviCues',
      content: <LaunchPlayerView />,
    },
    {
      id: 'history',
      label: 'Play History',
      icon: 'HIST',
      badge: 'Recent',
      content: <PlayHistoryView />,
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'FAV',
      badge: 'Saved',
      content: <FavoritesView />,
    },
  ];

  return (
    <TabbedContent
      tabs={tabs}
      activeTab={view}
      onTabChange={(tabId) => onViewChange(tabId as any)}
    />
  );
}

function PlayHistoryView() {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <h2 className="text-2xl mb-4">Play History</h2>
      <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        Recent NaviCues played
      </p>
      <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        Play history coming soon...
      </div>
    </div>
  );
}

function FavoritesView() {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <h2 className="text-2xl mb-4">Favorites</h2>
      <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        Saved NaviCues
      </p>
      <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        Favorites coming soon...
      </div>
    </div>
  );
}

// ============================================================================
// CATEGORY 2: PRODUCTION FLOOR
// ============================================================================

function ProductionFloorCategory({
  view,
  onViewChange,
}: {
  view: string;
  onViewChange: (view: string) => void;
}) {
  const subViews = [
    { id: 'library', label: 'NaviCue Library', icon: '📚' },
    { id: 'batches', label: 'Batch Overview', icon: '📦' },
    { id: 'enhancement', label: 'Enhancement Engine', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Sub-navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '8px'
      }}>
        {subViews.map(sv => (
          <button
            key={sv.id}
            onClick={() => onViewChange(sv.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: view === sv.id ? 'var(--brand-primary)' : 'transparent',
              color: view === sv.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: view === sv.id ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {sv.icon} {sv.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === 'library' && <NaviCueLibraryBrowser />}
      {view === 'batches' && <BatchOverview />}
      {view === 'enhancement' && <EnhancementControls />}
    </div>
  );
}

// ============================================================================
// CATEGORY 3: ANALYTICS OBSERVATORY
// ============================================================================

function AnalyticsObservatoryCategory({
  view,
  onViewChange,
}: {
  view: string;
  onViewChange: (view: string) => void;
}) {
  const subViews = [
    { id: 'effectiveness', label: 'NaviCue Effectiveness', icon: '📊' },
    { id: 'lifecycle', label: 'User Lifecycle', icon: '🔄' },
    { id: 'belief-ladders', label: 'Belief Progression', icon: '🪜' },
    { id: 'integrations', label: 'Integrations Data', icon: '🔌' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Sub-navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '8px',
        flexWrap: 'wrap',
      }}>
        {subViews.map(sv => (
          <button
            key={sv.id}
            onClick={() => onViewChange(sv.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: view === sv.id ? 'var(--brand-primary)' : 'transparent',
              color: view === sv.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: view === sv.id ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {sv.icon} {sv.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === 'effectiveness' && <PlaceholderView title="NaviCue Effectiveness" items={[
        'Engagement rates by schema',
        'Completion rates by family',
        'Heat level distribution',
        'KBE progression metrics'
      ]} />}
      {view === 'lifecycle' && <PlaceholderView title="User Lifecycle" items={[
        'Journey progression',
        'Content viewed',
        'Voice interactions',
        'Messenger usage',
        'Health app integrations'
      ]} />}
      {view === 'belief-ladders' && <PlaceholderView title="Belief Progression" items={[
        'Schema heat evolution',
        'KBE layer progression',
        'Belief ladders by user',
        'Pattern detection'
      ]} />}
      {view === 'integrations' && <PlaceholderView title="Integrations Data" items={[
        'Health apps & watches data',
        'Sleep tracking',
        'Heart rate variability',
        'Activity levels',
        'Correlation with STATE'
      ]} />}
    </div>
  );
}

function PlaceholderView({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: 'var(--bg-secondary)', 
      border: '1px solid var(--border-subtle)' 
    }}>
      <div style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px' }}>
        {title}
      </div>
      <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        Analytics coming soon...
        <br /><br />
        Will show:
        {items.map((item, idx) => (
          <div key={idx}>• {item}</div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// CATEGORY 4: CLINICAL FOUNDATION (Legacy - for reference)
// ============================================================================

interface ClinicalFoundationCategoryProps {
  view: 'schema-matrix' | 'pillar-nav' | 'mindblock-tracker' | 'library' | 'creative-playground' | 'magicwand' | 'mybrain' | 'creative-domains';
  onViewChange: (view: 'schema-matrix' | 'pillar-nav' | 'mindblock-tracker' | 'library' | 'creative-playground' | 'magicwand' | 'mybrain' | 'creative-domains') => void;
  selectedSchema: string | null;
  onSelectSchema: (schema: string) => void;
  selectedPillar: string | null;
  onSelectPillar: (pillar: string) => void;
  selectedVoice: VoiceArchetypeName | null;
  onSelectVoice: (voice: VoiceArchetypeName | null) => void;
  onNavigate?: (page: string) => void;
}

function ClinicalFoundationCategory(props: ClinicalFoundationCategoryProps) {
  const {
    view,
    onViewChange,
    selectedSchema,
    onSelectSchema,
    selectedPillar,
    onSelectPillar,
    selectedVoice,
    onSelectVoice,
    onNavigate,
  } = props;

  // Handle library sub-views
  if (view === 'library') {
    return (
      <div style={{ color: '#FFFFFF' }}>
        <h2 className="text-2xl mb-4">NaviCue Library</h2>
        <LibraryBrowserView onNavigate={onNavigate} />
      </div>
    );
  }

  const tabs = [
    {
      id: 'schema-matrix',
      label: 'NaviCue Matrix',
      icon: '🗺️',
      badge: 'HERO VIEW',
      content: <NaviCueMatrixHero />,
    },
    {
      id: 'pillar-nav',
      label: 'Pillar Navigator',
      icon: '🏛️',
      badge: '6 Pillars',
      content: <PillarNavigatorView selectedPillar={selectedPillar} onSelectPillar={onSelectPillar} />,
    },
    {
      id: 'mindblock-tracker',
      label: 'Mindblock Tracker',
      icon: '🎯',
      badge: 'Atomic Unit',
      content: <MindblockTrackerView />,
    },
    {
      id: 'library',
      label: 'Library',
      icon: '📚',
      badge: '500',
      content: <LibraryBrowserView onNavigate={onNavigate} />,
    },
    {
      id: 'creative-playground',
      label: 'Creative Playground',
      icon: '🎨',
      badge: '10,000',
      content: <CreativePlaygroundPage onNavigate={onNavigate} />,
    },
    {
      id: 'magicwand',
      label: 'Magic Wand',
      icon: '✨',
      badge: '10 cats',
      content: <MagicWandUniverse onNavigate={onNavigate} />,
    },
    {
      id: 'mybrain',
      label: 'My Brain Lab',
      icon: '🧠',
      badge: '25',
      content: <MyBrainLaboratory onNavigate={onNavigate} />,
    },
    {
      id: 'creative-domains',
      label: 'Creative Domains',
      icon: '🎨',
      badge: '6K NEW',
      content: <CreativeDomainsBrowser onNavigate={onNavigate} />,
    },
  ];

  return (
    <TabbedContent
      tabs={tabs}
      activeTab={view}
      onTabChange={(tabId) => onViewChange(tabId as any)}
    />
  );
}

// ============================================================================
// CATEGORY 3: ANALYTICS & SYSTEM (Performance & Integration)
// ============================================================================

interface AnalyticsCategoryProps {
  view: 'effectiveness' | 'lifecycle' | 'belief-ladders' | 'integrations' | 'database-sync';
  onViewChange: (view: 'effectiveness' | 'lifecycle' | 'belief-ladders' | 'integrations' | 'database-sync') => void;
  selectedSchema: string | null;
  onSelectSchema: (schema: string) => void;
  onNavigate?: (page: string) => void;
}

function AnalyticsCategory({ view, onViewChange, selectedSchema, onSelectSchema, onNavigate }: AnalyticsCategoryProps) {
  const tabs = [
    {
      id: 'effectiveness',
      label: 'Effectiveness Analytics',
      icon: '📈',
      badge: 'Live Data',
      content: <EffectivenessAnalyticsView />,
    },
    {
      id: 'lifecycle',
      label: 'NaviCue Lifecycle',
      icon: '🔄',
      badge: 'Status',
      content: <NaviCueLifecycleView />,
    },
    {
      id: 'belief-ladders',
      label: 'Belief Ladders',
      icon: '🪜',
      badge: 'Legacy',
      content: <BeliefLaddersView selectedSchema={selectedSchema} onSelectSchema={onSelectSchema} />,
    },
    {
      id: 'integrations',
      label: 'Feature Integrations',
      icon: '🔌',
      content: <FeatureIntegrationsOrchestra onNavigate={onNavigate} />,
    },
    {
      id: 'database-sync',
      label: 'Database Sync',
      icon: '🔄',
      content: <AdminNaviCueSync onNavigate={onNavigate} />,
    },
  ];

  return (
    <TabbedContent
      tabs={tabs}
      activeTab={view}
      onTabChange={(tabId) => onViewChange(tabId as any)}
    />
  );
}

// ============================================================================
// CATEGORY 4: DATA MAPPING (Tagging & Mapping)
// ============================================================================

function DataMappingCategory({ onNavigate }: { onNavigate?: (page: string) => void; }) {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <h2 className="text-2xl mb-4">Data Mapping</h2>
      <NaviCueDataMapper />
    </div>
  );
}

// ============================================================================
// VIEW COMPONENTS: CLINICAL FOUNDATION
// ============================================================================

interface SchemaExposureMatrixViewProps {
  selectedSchema: string | null;
  onSelectSchema: (schema: string) => void;
}

function SchemaExposureMatrixView({ selectedSchema, onSelectSchema }: SchemaExposureMatrixViewProps) {
  // 12 core schemas with NaviCue counts
  const schemas = [
    { id: 'shame', name: 'Shame / Unworthiness', count: 65, intensity: 'high', pillar: 'CR' },
    { id: 'control', name: 'Control / Hypervigilance', count: 58, intensity: 'high', pillar: 'ER' },
    { id: 'abandonment', name: 'Abandonment / Trust', count: 52, intensity: 'high', pillar: 'SC' },
    { id: 'perfectionism', name: 'Perfectionism / Achievement', count: 48, intensity: 'medium', pillar: 'II' },
    { id: 'victimhood', name: 'Victimhood / Powerlessness', count: 45, intensity: 'medium', pillar: 'SR' },
    { id: 'emotional-suppression', name: 'Emotional Suppression', count: 42, intensity: 'medium', pillar: 'ER' },
    { id: 'people-pleasing', name: 'People Pleasing', count: 38, intensity: 'medium', pillar: 'SC' },
    { id: 'scarcity', name: 'Scarcity / Not Enough', count: 35, intensity: 'low', pillar: 'DM' },
    { id: 'comparison', name: 'Comparison / Competition', count: 32, intensity: 'low', pillar: 'II' },
    { id: 'catastrophizing', name: 'Catastrophizing / Worry', count: 30, intensity: 'low', pillar: 'ER' },
    { id: 'identity-fusion', name: 'Identity Fusion / Roles', count: 28, intensity: 'low', pillar: 'II' },
    { id: 'safety-seeking', name: 'Safety Seeking / Avoidance', count: 27, intensity: 'low', pillar: 'SR' },
  ];

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Schema Exposure Matrix</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          12 core schemas mapped to NaviCue coverage. Click to explore mindblocks and targeting strategy.
        </p>
      </div>

      {/* Schema Grid */}
      <div className="grid grid-cols-1 gap-3">
        {schemas.map((schema) => {
          const isSelected = selectedSchema === schema.id;
          const intensityColor = 
            schema.intensity === 'high' ? '#22C55E' :
            schema.intensity === 'medium' ? '#F59E0B' :
            '#6B7280';

          return (
            <button
              key={schema.id}
              onClick={() => onSelectSchema(schema.id)}
              className="text-left p-4 transition-all duration-200"
              style={{
                backgroundColor: isSelected ? 'rgba(87, 57, 251, 0.2)' : 'rgba(87, 57, 251, 0.05)',
                border: `2px solid ${isSelected ? '#5739FB' : 'transparent'}`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">{schema.name}</span>
                    <span 
                      className="px-2 py-0.5 text-xs"
                      style={{
                        backgroundColor: 'rgba(87, 57, 251, 0.2)',
                        color: '#5739FB',
                      }}
                    >
                      {schema.pillar}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {schema.count} NaviCues targeting this schema
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Intensity
                    </div>
                    <div className="text-sm" style={{ color: intensityColor }}>
                      {schema.intensity.toUpperCase()}
                    </div>
                  </div>
                  <div 
                    className="w-16 h-16 flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.1)',
                      border: `2px solid ${intensityColor}`,
                    }}
                  >
                    <span className="text-2xl">{schema.count}</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${(schema.count / 65) * 100}%`,
                    backgroundColor: intensityColor,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Schema Detail */}
      {selectedSchema && (
        <div 
          className="mt-6 p-6"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
          }}
        >
          <h3 className="text-xl mb-4">
            {schemas.find((s) => s.id === selectedSchema)?.name} Schema
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Total NaviCues
              </div>
              <div className="text-2xl">{schemas.find((s) => s.id === selectedSchema)?.count}</div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Mindblocks Targeted
              </div>
              <div className="text-2xl">8</div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Avg Per Mindblock
              </div>
              <div className="text-2xl">8.1</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface PillarNavigatorViewProps {
  selectedPillar: string | null;
  onSelectPillar: (pillar: string) => void;
}

function PillarNavigatorView({ selectedPillar, onSelectPillar }: PillarNavigatorViewProps) {
  const pillars = [
    { 
      id: 'ER', 
      name: 'Emotional Regulation', 
      concepts: 3,
      themes: 8,
      mindblocks: 24,
      navicues: 85,
      color: '#EF4444',
    },
    { 
      id: 'SR', 
      name: 'Self Regulation', 
      concepts: 3,
      themes: 7,
      mindblocks: 21,
      navicues: 75,
      color: '#F59E0B',
    },
    { 
      id: 'SC', 
      name: 'Social Connection', 
      concepts: 3,
      themes: 9,
      mindblocks: 27,
      navicues: 95,
      color: '#10B981',
    },
    { 
      id: 'CR', 
      name: 'Cognitive Reframing', 
      concepts: 3,
      themes: 10,
      mindblocks: 30,
      navicues: 110,
      color: '#3B82F6',
    },
    { 
      id: 'II', 
      name: 'Identity Integration', 
      concepts: 3,
      themes: 8,
      mindblocks: 24,
      navicues: 80,
      color: '#8B5CF6',
    },
    { 
      id: 'DM', 
      name: 'Developing Meaning', 
      concepts: 3,
      themes: 6,
      mindblocks: 18,
      navicues: 55,
      color: '#EC4899',
    },
  ];

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Pillar Navigator</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Drill down: Pillar → Concept → Theme → Mindblock → NaviCue
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {pillars.map((pillar) => {
          const isSelected = selectedPillar === pillar.id;

          return (
            <button
              key={pillar.id}
              onClick={() => onSelectPillar(pillar.id)}
              className="text-left p-6 transition-all duration-200"
              style={{
                backgroundColor: isSelected ? 'rgba(87, 57, 251, 0.2)' : 'rgba(87, 57, 251, 0.05)',
                border: `2px solid ${isSelected ? pillar.color : 'transparent'}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: `${pillar.color}20`,
                    color: pillar.color,
                  }}
                >
                  {pillar.id}
                </div>
                <div>
                  <div className="text-lg mb-1">{pillar.name}</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {pillar.navicues} NaviCues
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Concepts
                  </div>
                  <div className="text-xl">{pillar.concepts}</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Themes
                  </div>
                  <div className="text-xl">{pillar.themes}</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Mindblocks
                  </div>
                  <div className="text-xl">{pillar.mindblocks}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Drill-down view when pillar selected */}
      {selectedPillar && (
        <div 
          className="mt-6 p-6"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
          }}
        >
          <h3 className="text-xl mb-4">
            {pillars.find((p) => p.id === selectedPillar)?.name} Drill Down
          </h3>
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Concept → Theme → Mindblock drill-down coming soon...
          </div>
        </div>
      )}
    </div>
  );
}

function MindblockTrackerView() {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Mindblock Tracker</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Track the atomic unit of mindset transformation: Limiting Belief → New Truth → Stage
        </p>
      </div>

      <div className="space-y-4">
        {/* Example mindblocks */}
        {[
          {
            id: 'MB-CR-001',
            limitingBelief: 'I am fundamentally flawed',
            newTruth: 'I am human, with strengths and limitations',
            stage: 'Embodying',
            progress: 85,
            navicues: 12,
          },
          {
            id: 'MB-ER-005',
            limitingBelief: 'If I relax my guard, everything will fall apart',
            newTruth: 'Safety can exist without constant vigilance',
            stage: 'Believing',
            progress: 60,
            navicues: 10,
          },
          {
            id: 'MB-SC-008',
            limitingBelief: 'I cannot trust people',
            newTruth: 'I can discern who is trustworthy',
            stage: 'Knowing',
            progress: 30,
            navicues: 8,
          },
        ].map((mb) => (
          <div
            key={mb.id}
            className="p-4"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {mb.id}
                </div>
                <div className="mb-2">
                  <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Limiting: 
                  </span>{' '}
                  <span className="line-through opacity-60">{mb.limitingBelief}</span>
                </div>
                <div>
                  <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    New Truth: 
                  </span>{' '}
                  <span style={{ color: '#22C55E' }}>{mb.newTruth}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span 
                    className="px-3 py-1"
                    style={{
                      backgroundColor: 'rgba(87, 57, 251, 0.2)',
                      color: '#5739FB',
                    }}
                  >
                    {mb.stage}
                  </span>
                </div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {mb.navicues} NaviCues
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full h-2" style={{ backgroundColor: 'rgba(87, 57, 251, 0.2)' }}>
              <div
                className="h-full"
                style={{
                  width: `${mb.progress}%`,
                  backgroundColor: '#5739FB',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntentCoverageView() {
  const pillars = ['ER', 'SR', 'SC', 'CR', 'II', 'DM'];
  const intents = ['Confront', 'Validate', 'Reframe', 'Inspire', 'Educate'];

  // Mock coverage data (percentage of NaviCues for each combination)
  const getCoverage = (pillar: string, intent: string) => {
    return Math.floor(Math.random() * 30) + 10; // Random 10-40 for demo
  };

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Intent Coverage Matrix</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Pillars × Intents gap analysis. Numbers show NaviCue count for each combination.
        </p>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '4px' }}>
          <thead>
            <tr>
              <th className="p-3" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
                Pillar / Intent
              </th>
              {intents.map((intent) => (
                <th 
                  key={intent}
                  className="p-3 text-center"
                  style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}
                >
                  {intent}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pillars.map((pillar) => (
              <tr key={pillar}>
                <td 
                  className="p-3"
                  style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}
                >
                  {pillar}
                </td>
                {intents.map((intent) => {
                  const count = getCoverage(pillar, intent);
                  const intensity = count > 25 ? 'high' : count > 15 ? 'medium' : 'low';
                  const bgColor = 
                    intensity === 'high' ? 'rgba(34, 197, 94, 0.2)' :
                    intensity === 'medium' ? 'rgba(245, 158, 11, 0.2)' :
                    'rgba(239, 68, 68, 0.2)';

                  return (
                    <td 
                      key={`${pillar}-${intent}`}
                      className="p-3 text-center"
                      style={{ backgroundColor: bgColor }}
                    >
                      {count}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW COMPONENTS: LIBRARY
// ============================================================================

function FullCatalogView({ onEnterPlayer }: { onEnterPlayer?: (filters: NaviCueFilters) => void; }) {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../../lib/navicues/navicueData').then(async (module) => {
      const s = await module.getNaviCueStats();
      setStats(s);
      setLoading(false);
      console.log('📊 NaviCue Stats:', s);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ color: '#FFFFFF' }}>
        <h2 className="text-2xl mb-4">Full NaviCue Catalog</h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Loading NaviCue data...
        </p>
      </div>
    );
  }

  return (
    <div style={{ color: '#FFFFFF' }}>
      <h2 className="text-2xl mb-4">Full NaviCue Catalog</h2>
      <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        All NaviCues transformed from component arsenal and ready for Universal Player
      </p>
      
      {/* STATS GRID */}
      {stats && (
        <div className="mb-8 space-y-6">
          {/* Total Count */}
          <div className="p-6 bg-[#5739FB]/10 border border-[#5739FB]/30">
            <div className="text-5xl mb-2">{stats.total}</div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Total NaviCues Loaded and Ready
            </div>
          </div>

          {/* By Pillar */}
          <div>
            <h3 className="text-lg mb-3">By Pillar</h3>
            <div className="grid grid-cols-6 gap-3">
              {Object.entries(stats.byPillar).map(([pillar, count]) => (
                <div key={pillar} className="p-4 bg-white/5 border border-white/10">
                  <div className="text-2xl mb-1">{count as number}</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {pillar}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Response Type */}
          <div>
            <h3 className="text-lg mb-3">By Response Type</h3>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(stats.byResponseType).map(([type, count]) => (
                <div key={type} className="p-3 bg-white/5 border border-white/10">
                  <div className="text-xl mb-1">{count as number}</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Modality */}
          <div>
            <h3 className="text-lg mb-3">By Modality</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(stats.byModality).map(([modality, count]) => (
                <div key={modality} className="p-3 bg-white/5 border border-white/10">
                  <div className="text-xl mb-1">{count as number}</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {modality}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* LAUNCH BUTTON */}
      {onEnterPlayer && stats && (
        <div className="mb-6">
          <button
            onClick={() => {
              console.log('🚀 Launching Universal Player with all NaviCues');
              onEnterPlayer({});
            }}
            className="w-full bg-[#5739FB] hover:bg-[#3E2BB8] px-8 py-4 text-white text-lg transition-colors"
          >
            🎮 Launch Universal Player → {stats.total} NaviCues Ready
          </button>
        </div>
      )}
      
      <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        Advanced filtering and search coming soon...
      </div>
    </div>
  );
}

function TrackBrowserView() {
  const tracks = [
    {
      id: 'clinical',
      name: 'Clinical Track',
      description: '6 Pillars grounded in evidence-based therapeutic frameworks',
      count: 300,
      color: '#3B82F6',
    },
    {
      id: 'guru',
      name: 'Guru Track',
      description: 'Wisdom from Ram Dass, Alan Watts, Pema Chödrön, Thích Nhất Hạnh, Jack Kornfield',
      count: 150,
      color: '#8B5CF6',
    },
    {
      id: 'infinite',
      name: 'Infinite Track',
      description: 'Quantum Physics, Music Theory, Nature, Art, Philosophy',
      count: 50,
      color: '#EC4899',
    },
    {
      id: 'custom',
      name: 'Custom Track',
      description: 'User-generated and community NaviCues',
      count: 0,
      color: '#10B981',
    },
  ];

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Browse by Track</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          4 distinct tracks for belief transformation
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="p-6"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              border: `2px solid ${track.color}40`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl mb-2" style={{ color: track.color }}>
                  {track.name}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {track.description}
                </p>
              </div>
              <div 
                className="w-20 h-20 flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: `${track.color}20`,
                  color: track.color,
                }}
              >
                {track.count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceConstellationView({ selectedVoice, onSelectVoice }: { selectedVoice: VoiceArchetypeName | null; onSelectVoice: (voice: VoiceArchetypeName | null) => void; }) {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <h2 className="text-2xl mb-4">Voice Archetypes</h2>
      <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        12 voice archetypes, each with unique tone and delivery style
      </p>
      <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        Voice constellation coming soon...
      </div>
    </div>
  );
}

function DeliveryMechanismView() {
  const mechanisms = [
    { id: 'socratic', name: 'Socratic Question', count: 45, example: 'What would happen if you let go of that belief?' },
    { id: 'metaphor', name: 'Metaphor Mirror', count: 38, example: 'You are the sky. Emotions are the weather passing through.' },
    { id: 'pattern-interrupt', name: 'Pattern Interrupt', count: 32, example: 'Stop. Notice the pattern. What is it protecting you from?' },
    { id: 'reframe', name: 'Reframe Sandwich', count: 42, example: 'Acknowledge → Shift perspective → New possibility' },
    { id: 'paradox', name: 'Paradox Holder', count: 28, example: 'The way out is through. The cure is in the wound.' },
    { id: 'body-anchor', name: 'Body Anchor', count: 25, example: 'Where do you feel this in your body?' },
    { id: 'timeline', name: 'Timeline Shift', count: 22, example: 'Five years from now, what will you wish you had done today?' },
    { id: 'validation', name: 'Validation First', count: 35, example: 'Of course you feel this way. Anyone would.' },
    { id: 'micro-commitment', name: 'Micro Commitment', count: 30, example: 'What is one tiny step you could take right now?' },
    { id: 'contrast', name: 'Contrast Frame', count: 27, example: 'Before this, you believed X. Now consider Y.' },
  ];

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Delivery Mechanisms</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          21 distinct mechanisms for delivering NaviCues (showing top 10)
        </p>
      </div>

      <div className="space-y-3">
        {mechanisms.map((mechanism) => (
          <div
            key={mechanism.id}
            className="p-4"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              border: '1px solid rgba(87, 57, 251, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg mb-1">{mechanism.name}</h3>
                <p className="text-sm italic" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  "{mechanism.example}"
                </p>
              </div>
              <div 
                className="ml-4 px-3 py-1 text-sm"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.2)',
                  color: '#5739FB',
                }}
              >
                {mechanism.count} NaviCues
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NaviCueBrowserView({ onNavigate }: { onNavigate?: (page: string) => void; }) {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <NaviCueLibraryBrowser onNavigate={onNavigate} />
    </div>
  );
}

function LibraryBrowserView({ onNavigate }: { onNavigate?: (page: string) => void; }) {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <NaviCueLibraryBrowser onNavigate={onNavigate} />
    </div>
  );
}

// ============================================================================
// VIEW COMPONENTS: ANALYTICS & SYSTEM
// ============================================================================

function EffectivenessAnalyticsView() {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Effectiveness Analytics</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Live data on NaviCue performance: delivery count, user reactions, completion rates
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
          }}
        >
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Total Deliveries
          </div>
          <div className="text-3xl mb-1">45,892</div>
          <div className="text-xs" style={{ color: '#22C55E' }}>
            ↑ 12% this week
          </div>
        </div>
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
          }}
        >
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Avg Engagement
          </div>
          <div className="text-3xl mb-1">78%</div>
          <div className="text-xs" style={{ color: '#22C55E' }}>
            ↑ 5% this week
          </div>
        </div>
        <div 
          className="p-4"
          style={{
            backgroundColor: 'rgba(87, 57, 251, 0.1)',
            border: '1px solid rgba(87, 57, 251, 0.3)',
          }}
        >
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Save Rate
          </div>
          <div className="text-3xl mb-1">34%</div>
          <div className="text-xs" style={{ color: '#F59E0B' }}>
            → Stable
          </div>
        </div>
      </div>

      <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        Detailed analytics dashboard coming soon...
      </div>
    </div>
  );
}

function NaviCueLifecycleView() {
  const statuses = [
    { id: 'active', name: 'Active', count: 500, color: '#22C55E' },
    { id: 'review', name: 'In Review', count: 25, color: '#F59E0B' },
    { id: 'draft', name: 'Draft', count: 48, color: '#6B7280' },
    { id: 'archived', name: 'Archived', count: 12, color: '#EF4444' },
  ];

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">NaviCue Lifecycle</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Track NaviCue status: Draft → Review → Active → Archived
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div
            key={status.id}
            className="p-6"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.05)',
              border: `2px solid ${status.color}40`,
            }}
          >
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: `${status.color}20`,
                  color: status.color,
                }}
              >
                {status.count}
              </div>
              <div className="text-lg mb-1">{status.name}</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                NaviCues
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeliefLaddersView({ selectedSchema, onSelectSchema }: { selectedSchema: string | null; onSelectSchema: (schema: string) => void; }) {
  // Mock data
  const schemas: BeliefLadderData[] = [
    {
      schema: 'Shame / Unworthiness',
      schemaDescription: 'Core belief that "I am fundamentally flawed or unlovable"',
      totalMindblocks: 8,
      completedMindblocks: 3,
      mindblocks: [
        {
          id: 'MB-CR-001',
          limitingBelief: 'I am fundamentally flawed',
          newTruth: 'I am human, with strengths and limitations',
          stage: 'embodying',
          progress: 85,
        },
        {
          id: 'MB-CR-002',
          limitingBelief: 'I must hide my real self',
          newTruth: 'Authenticity creates real connection',
          stage: 'believing',
          progress: 60,
        },
      ],
    },
  ];

  const selectedLadder = schemas.find((s) => s.schema === selectedSchema) || schemas[0];

  return (
    <div style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Belief Ladders (Legacy View)</h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Original belief progression tracker. Now superseded by Schema Matrix + Mindblock Tracker.
        </p>
      </div>
      <BeliefLadder ladder={selectedLadder} />
    </div>
  );
}