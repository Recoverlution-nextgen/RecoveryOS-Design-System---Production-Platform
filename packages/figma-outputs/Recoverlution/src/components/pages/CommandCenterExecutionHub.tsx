/**
 * COMMAND CENTER EXECUTION HUB
 * 
 * The ONE Command Center — Build, Test, Evolve, Deploy
 * EXPANDED: Now includes Platform Constitution Control Room
 * 
 * Created: December 30, 2024
 * Status: SINGLE SOURCE OF TRUTH
 * 
 * ARCHITECTURE:
 * - Player: Embedded NaviCue showroom with full filtering
 * - Constitution: Platform Constitution Health Dashboard
 * - Registry: Content + Delivery Inspector
 * - Events: Event Spine Live Viewer
 * - Safety: Policy Control Room
 * - Decisions: LUMA Decision Explorer
 * - State: State Observatory
 * - Proof: Proof Ledger
 * - Configuration: 8 Control Rooms (legacy)
 * - Schema Map: Database foundation
 * - Data: KPIs, connectors, MAP mapping
 * 
 * DESIGN SYSTEM: infiniteK
 * - NO EMOJIS (brand rule)
 * - NO ROUNDED CORNERS (border-radius: 0)
 * - NO CARD ON CARD (THE ANCHOR RULE)
 * - Uses CommandCenterLayout framework
 */

import React, { useState } from 'react';
import { 
  CommandCenterLayout, 
  CommandCenterCard, 
  SectionHeader,
  StatusBadge,
  CC_TOKENS,
} from '../commandcenter/CommandCenterLayout';
import { ConstitutionHealthBar } from '../command-center/shared/ConstitutionHealthBar';
import { ConstitutionDashboard } from '../command-center/constitution/ConstitutionDashboard';
import { RegistryInspector } from '../command-center/registry/RegistryInspector';
import { EventSpineViewer } from '../command-center/events/EventSpineViewer';
import { SafetyControlRoom } from '../command-center/safety/SafetyControlRoom';
import { DecisionExplorer } from '../command-center/decisions/DecisionExplorer';
import { StateObservatory } from '../command-center/state/StateObservatory';
import { ProofLedger } from '../command-center/proof/ProofLedger';
import { UniversalPlayer } from '../universal-player/UniversalPlayer';
import { NaviCueFilters, PillarId, SparkFamily, KBELayer, ResponseType, Modality } from '../../lib/navicues/types';
import { NAVICUE_1000_COMPLETE } from '../../lib/navicues/NAVICUE_1000_COMPLETE';
import { NAVICUE_MASTER_2000 } from '../../lib/navicues/NAVICUE_MASTER_2000';
import { NAVICUE_3000_COUNCIL } from '../../lib/navicues/NAVICUE_3000_COUNCIL';
import { NAVICUE_BATCH_JOURNEY_FEATURES, BATCH_STATS } from '../../lib/navicues/NAVICUE_BATCH_JOURNEY_FEATURES';

interface CommandCenterExecutionHubProps {
  onNavigate: (page: string) => void;
}

type ViewMode = 'player' | 'constitution' | 'registry' | 'events' | 'safety' | 'decisions' | 'state' | 'proof' | 'configuration' | 'schema' | 'data';

interface Room {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'active' | 'building' | 'pending';
  features: string[];
  note?: string;
  route: string;
}

export default function CommandCenterExecutionHub({ onNavigate }: CommandCenterExecutionHubProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('constitution');

  const batch1Count = NAVICUE_1000_COMPLETE.length;
  const batch2Count = NAVICUE_MASTER_2000.length - batch1Count;
  const batch3Count = NAVICUE_3000_COUNCIL.length;
  const totalNaviCues = batch1Count + batch2Count + batch3Count;

  const views = [
    { id: 'player', label: 'Player', icon: '' },
    { id: 'constitution', label: 'Constitution', icon: '' },
    { id: 'registry', label: 'Registry', icon: '' },
    { id: 'events', label: 'Events', icon: '' },
    { id: 'safety', label: 'Safety', icon: '' },
    { id: 'decisions', label: 'Decisions', icon: '' },
    { id: 'state', label: 'State', icon: '' },
    { id: 'proof', label: 'Proof', icon: '' },
    { id: 'configuration', label: 'Configuration', icon: '' },
    { id: 'schema', label: 'Schema Map', icon: '' },
    { id: 'data', label: 'Data', icon: '' },
  ];

  const headerStats = [
    { label: 'NaviCues', value: totalNaviCues.toString(), status: 'success' as const },
    { label: 'Constitution Laws', value: '10', status: 'success' as const },
    { label: 'Control Rooms', value: '8', status: 'success' as const },
    { label: 'Schema Tables', value: '120+', status: 'success' as const },
    { label: 'Edge Functions', value: '40+', status: 'success' as const },
  ];

  return (
    <>
      <ConstitutionHealthBar />
      <CommandCenterLayout
        title="Command Center Execution Hub"
        subtitle="The ONE Command Center. Platform Constitution + 8 Control Rooms. Build, test, deploy."
        icon=""
        currentView={viewMode}
        views={views}
        onViewChange={(viewId) => setViewMode(viewId as ViewMode)}
        onNavigate={onNavigate}
        stats={headerStats}
      >
        {viewMode === 'player' && <PlayerShowroomView totalNaviCues={totalNaviCues} />}
        {viewMode === 'constitution' && <ConstitutionDashboard />}
        {viewMode === 'registry' && <RegistryInspector />}
        {viewMode === 'events' && <EventSpineViewer />}
        {viewMode === 'safety' && <SafetyControlRoom />}
        {viewMode === 'decisions' && <DecisionExplorer />}
        {viewMode === 'state' && <StateObservatory />}
        {viewMode === 'proof' && <ProofLedger />}
        {viewMode === 'configuration' && <ConfigurationView onNavigate={onNavigate} />}
        {viewMode === 'schema' && <SchemaMapView />}
        {viewMode === 'data' && <DataRoomView />}
      </CommandCenterLayout>
    </>
  );
}

// ============================================================================
// TAB 1: PLAYER SHOWROOM (Embedded with Full Filtering)
// ============================================================================

function PlayerShowroomView({ totalNaviCues }: { totalNaviCues: number }) {
  // Player state
  const [playerMode, setPlayerMode] = useState<'embedded' | 'fullscreen'>('embedded');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<NaviCueFilters>({});
  const [selectedPillar, setSelectedPillar] = useState<PillarId | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<SparkFamily | null>(null);
  const [selectedKBE, setSelectedKBE] = useState<KBELayer | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const pillars: { id: PillarId; name: string; color: string }[] = [
    { id: 'ER', name: 'Emotional Regulation', color: '#EF4444' },
    { id: 'SR', name: 'Self Regulation', color: '#F59E0B' },
    { id: 'SC', name: 'Social Connection', color: '#10B981' },
    { id: 'CR', name: 'Cognitive Reframing', color: '#3B82F6' },
    { id: 'II', name: 'Identity Integration', color: '#8B5CF6' },
    { id: 'DM', name: 'Developing Meaning', color: '#EC4899' },
  ];

  const families: SparkFamily[] = [
    'statement_mirror',
    'belief_probe',
    'identity_koan',
    'paradox_prompt',
    'story_shard',
    'reframe_seed',
    'curveball',
    'practice',
  ];

  const kbeLayers: KBELayer[] = ['knowing', 'believing', 'embodying'];

  const journeys = [
    { id: 'sprint1', name: 'Sprint 1: From State to Self' },
    { id: 'sprint2', name: 'Sprint 2: Emotional Agility' },
    { id: 'sprint3', name: 'Sprint 3: Identity Work' },
    { id: 'sprint4', name: 'Sprint 4: Relational Capacity' },
  ];

  const features = [
    { id: 'voice', name: 'Voice Showcase', description: 'Voice archetype demonstrations' },
    { id: 'story', name: 'Story Integration', description: 'Story shard + narrative NaviCues' },
    { id: 'state', name: 'State Check-ins', description: 'Energy · Clarity · Connection' },
    { id: 'articles', name: 'Article Snippets', description: 'Insight delivery format' },
    { id: 'practices', name: 'Practice Demos', description: 'Guided practice NaviCues' },
    { id: 'mindsteps', name: 'Mind Steps', description: 'Insight/truth revelation format' },
    { id: 'wellbeing', name: 'Wellbeing Videos', description: 'Body-based content showcase' },
  ];

  // Apply filters
  const handleApplyFilters = () => {
    const newFilters: NaviCueFilters = {};
    if (selectedPillar) newFilters.pillar = selectedPillar;
    if (selectedFamily) newFilters.family = selectedFamily;
    if (selectedKBE) newFilters.kbeLayer = selectedKBE;
    if (selectedFeature) newFilters.tags = [selectedFeature];
    
    setFilters(newFilters);
    setIsPlaying(true);
  };

  const handleClearFilters = () => {
    setSelectedPillar(null);
    setSelectedFamily(null);
    setSelectedKBE(null);
    setSelectedJourney(null);
    setSelectedFeature(null);
    setFilters({});
  };

  const activeFilterCount = [selectedPillar, selectedFamily, selectedKBE, selectedJourney, selectedFeature].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="NaviCue Player Showroom"
        subtitle={`${totalNaviCues} production NaviCues • Pick parameters and see it live`}
        icon=""
      />

      {/* Filter Controls */}
      <CommandCenterCard border="subtle">
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: CC_TOKENS.typography.h3.fontSize,
            color: CC_TOKENS.colors.text.primary,
            marginBottom: '16px',
          }}>
            Filter Parameters
          </h3>
          <p style={{
            fontSize: '14px',
            color: CC_TOKENS.colors.text.secondary,
            marginBottom: '24px',
          }}>
            Select filters to curate the NaviCue queue. Player updates in real-time.
          </p>

          {/* Pillar Selection */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '12px',
              color: CC_TOKENS.colors.text.tertiary,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Pillar
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {pillars.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                  style={{
                    padding: '12px',
                    background: selectedPillar === pillar.id ? pillar.color : 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${selectedPillar === pillar.id ? pillar.color : 'rgba(255, 255, 255, 0.1)'}`,
                    color: selectedPillar === pillar.id ? '#FFFFFF' : CC_TOKENS.colors.text.secondary,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>{pillar.id}</div>
                  <div style={{ fontSize: '10px', opacity: 0.8 }}>{pillar.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Family Selection */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '12px',
              color: CC_TOKENS.colors.text.tertiary,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              NaviCue Family
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {families.map((family) => (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(selectedFamily === family ? null : family)}
                  style={{
                    padding: '10px 16px',
                    background: selectedFamily === family ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${selectedFamily === family ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.1)'}`,
                    color: selectedFamily === family ? '#FFFFFF' : CC_TOKENS.colors.text.secondary,
                    cursor: 'pointer',
                    fontSize: '13px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {family.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* KBE Layer */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '12px',
              color: CC_TOKENS.colors.text.tertiary,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              KBE Target
            </div>
            <div className="grid grid-cols-3 gap-3">
              {kbeLayers.map((kbe) => (
                <button
                  key={kbe}
                  onClick={() => setSelectedKBE(selectedKBE === kbe ? null : kbe)}
                  style={{
                    padding: '12px',
                    background: selectedKBE === kbe ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${selectedKBE === kbe ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.1)'}`,
                    color: selectedKBE === kbe ? '#FFFFFF' : CC_TOKENS.colors.text.secondary,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase',
                  }}
                >
                  {kbe}
                </button>
              ))}
            </div>
          </div>

          {/* Journey Sprint (NEW) */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '12px',
              color: CC_TOKENS.colors.text.tertiary,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Journey Sprint (Future)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {journeys.map((journey) => (
                <button
                  key={journey.id}
                  onClick={() => setSelectedJourney(selectedJourney === journey.id ? null : journey.id)}
                  style={{
                    padding: '10px 16px',
                    background: selectedJourney === journey.id ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${selectedJourney === journey.id ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.1)'}`,
                    color: selectedJourney === journey.id ? '#FFFFFF' : CC_TOKENS.colors.text.secondary,
                    cursor: 'pointer',
                    fontSize: '13px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {journey.name}
                </button>
              ))}
            </div>
          </div>

          {/* Feature/Integration Showcase (NEW) */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '12px',
              color: CC_TOKENS.colors.text.tertiary,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Platform Feature Showcase
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                  style={{
                    padding: '12px',
                    background: selectedFeature === feature.id ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${selectedFeature === feature.id ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.1)'}`,
                    color: selectedFeature === feature.id ? '#FFFFFF' : CC_TOKENS.colors.text.secondary,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                    {feature.name}
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>
                    {feature.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleApplyFilters}
              disabled={activeFilterCount === 0}
              style={{
                flex: 1,
                padding: '14px',
                background: activeFilterCount > 0 ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${activeFilterCount > 0 ? CC_TOKENS.colors.accent : 'rgba(255, 255, 255, 0.2)'}`,
                color: activeFilterCount > 0 ? '#FFFFFF' : CC_TOKENS.colors.text.tertiary,
                cursor: activeFilterCount > 0 ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
              }}
            >
              {isPlaying ? 'Update Player' : 'Launch Player'} {activeFilterCount > 0 && `(${activeFilterCount} filters)`}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                style={{
                  padding: '14px 24px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: CC_TOKENS.colors.text.secondary,
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                }}
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setPlayerMode(playerMode === 'embedded' ? 'fullscreen' : 'embedded')}
              disabled={!isPlaying}
              style={{
                padding: '14px 24px',
                background: 'transparent',
                border: `1px solid ${isPlaying ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: isPlaying ? CC_TOKENS.colors.text.secondary : CC_TOKENS.colors.text.tertiary,
                cursor: isPlaying ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
            >
              {playerMode === 'embedded' ? '⛶ Fullscreen' : '⛶ Embedded'}
            </button>
          </div>
        </div>
      </CommandCenterCard>

      {/* Embedded Player */}
      {isPlaying && playerMode === 'embedded' && (
        <CommandCenterCard border="strong">
          <div style={{
            background: '#000000',
            minHeight: '500px',
            position: 'relative',
          }}>
            <UniversalPlayer
              mode="filtered"
              filters={filters}
              onClose={() => setIsPlaying(false)}
              onNaviCueComplete={(navicue, response) => {
                console.log('NaviCue completed:', navicue.id, response);
              }}
              showProgress={true}
              allowCollapse={false}
            />
          </div>
        </CommandCenterCard>
      )}

      {/* Fullscreen Player Overlay */}
      {isPlaying && playerMode === 'fullscreen' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          background: '#000000',
        }}>
          <UniversalPlayer
            mode="filtered"
            filters={filters}
            onClose={() => setPlayerMode('embedded')}
            onNaviCueComplete={(navicue, response) => {
              console.log('NaviCue completed:', navicue.id, response);
            }}
            showProgress={true}
            allowCollapse={true}
          />
        </div>
      )}

      {/* Quick Stats */}
      {!isPlaying && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommandCenterCard border="subtle">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: CC_TOKENS.colors.accent, marginBottom: '8px' }}>
                {totalNaviCues}
              </div>
              <div style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary }}>
                Total NaviCues Available
              </div>
            </div>
          </CommandCenterCard>
          <CommandCenterCard border="subtle">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: CC_TOKENS.colors.accent, marginBottom: '8px' }}>
                8
              </div>
              <div style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary }}>
                NaviCue Families
              </div>
            </div>
          </CommandCenterCard>
          <CommandCenterCard border="subtle">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: CC_TOKENS.colors.accent, marginBottom: '8px' }}>
                6
              </div>
              <div style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary }}>
                Clinical Pillars
              </div>
            </div>
          </CommandCenterCard>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TAB 2: CONFIGURATION (8 Control Rooms)
// ============================================================================

function ConfigurationView({ onNavigate }: { onNavigate: (page: string) => void }) {
  const rooms: Room[] = [
    {
      id: 'journey',
      title: 'Journey Lab',
      subtitle: '12 Sprints + LUMA VOICE',
      description: 'From state to self — ERA framework with proof layer',
      status: 'building',
      features: ['12 sprint templates', 'Schema-mapped scenes', 'Universal Player integration', 'LUMA TALK introspection'],
      route: 'command-center/journey-lab',
    },
    {
      id: 'content',
      title: 'Content Assembly Lab',
      subtitle: 'Articles · Insights · Practices',
      description: 'Knowledge to action — templates with coded philosophy',
      status: 'building',
      features: ['10 article templates', '10 insight templates', '10 practice templates', 'AI writer scaling'],
      route: 'command-center/content-lab',
    },
    {
      id: 'wellbeing',
      title: 'Wellbeing Studio',
      subtitle: '300 Premium Videos',
      description: 'Your body is part of recovery — high-end wellness content',
      status: 'pending',
      features: ['300 video migration', 'Comprehensive tagging', 'Schema mapping', 'NaviCue delivery'],
      route: 'command-center/wellbeing-studio',
    },
    {
      id: 'state',
      title: 'State Dashboard',
      subtitle: 'Tempo · Flow · Sync',
      description: 'Right now is the only moment — 3D check-ins + arousal compute',
      status: 'building',
      features: ['Arousal timeline', 'State trends visualizer', 'NaviCue delivery', 'LUMA input layer'],
      route: 'command-center/state-dashboard',
    },
    {
      id: 'navigate',
      title: 'Navigate Orchestrator',
      subtitle: 'Calendar · Meetup · Alumni',
      description: 'People and places that hold you — next-gen feed',
      status: 'pending',
      features: ['Calendar integration', 'Meeting finder APIs', 'Alumni post analyzer', 'LUMA recommendations'],
      route: 'command-center/navigate-orchestrator',
    },
    {
      id: 'momentum',
      title: 'Momentum Analytics',
      subtitle: 'Schema Heat · KBE · Durability',
      description: 'Progress made visible — LUMA telemetry dashboard',
      status: 'pending',
      features: ['Schema heat timeline', 'KBE progression', 'Arousal regulation', 'Proof density'],
      note: 'Builds AFTER LUMA telemetry live',
      route: 'command-center/momentum',
    },
    {
      id: 'communications',
      title: 'Communications Console',
      subtitle: 'Notification Flow & Intent',
      description: 'When do we send? What\'s the purpose?',
      status: 'pending',
      features: ['Notification rules', 'Timing configurator', 'Analytics dashboard', 'Delivery service'],
      route: 'command-center/communications',
    },
    {
      id: 'navicue-builder',
      title: 'NaviCue Type Builder',
      subtitle: '100 Bridge Types',
      description: 'Aggregate/surface content from ALL rooms into LUMA',
      status: 'pending',
      features: ['Content aggregators', 'Integration mechanisms', 'Proof bridges', 'LUMA voice types'],
      route: 'command-center/navicue-builder',
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="8 Control Rooms"
        subtitle="Each room is a standalone experience engineered for Universal Player integration"
        icon=""
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <RoomCard 
            key={room.id} 
            room={room}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

function RoomCard({ room, onNavigate }: {
  room: Room;
  onNavigate: (page: string) => void;
}) {
  return (
    <CommandCenterCard hover border="subtle">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 
            style={{ 
              color: CC_TOKENS.colors.text.primary,
              fontSize: CC_TOKENS.typography.h3.fontSize,
              marginBottom: '8px',
            }}
          >
            {room.title}
          </h3>
          <p 
            style={{ 
              color: CC_TOKENS.colors.text.secondary,
              fontSize: '14px',
              marginBottom: '12px',
            }}
          >
            {room.subtitle}
          </p>
        </div>
        <StatusBadge status={room.status} />
      </div>

      <p 
        style={{ 
          color: CC_TOKENS.colors.text.secondary,
          fontSize: CC_TOKENS.typography.body.fontSize,
          lineHeight: '1.6',
          marginBottom: '16px',
        }}
      >
        {room.description}
      </p>

      <div style={{ marginBottom: room.note ? '12px' : '24px' }}>
        {room.features.map((feature, idx) => (
          <div 
            key={idx} 
            style={{
              fontSize: '13px',
              color: CC_TOKENS.colors.text.tertiary,
              marginBottom: '6px',
              paddingLeft: '16px',
              position: 'relative',
            }}
          >
            <span style={{
              position: 'absolute',
              left: 0,
              color: CC_TOKENS.colors.accent,
            }}>→</span>
            {feature}
          </div>
        ))}
      </div>

      {room.note && (
        <div style={{
          padding: '12px',
          background: 'rgba(255, 184, 0, 0.08)',
          border: '1px solid rgba(255, 184, 0, 0.3)',
          fontSize: '12px',
          color: '#FFB800',
          marginBottom: '16px',
        }}>
          NOTE: {room.note}
        </div>
      )}

      <button
        onClick={() => onNavigate(room.route)}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: CC_TOKENS.colors.accent,
          border: `1px solid ${CC_TOKENS.colors.accent}`,
          color: '#FFFFFF',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = CC_TOKENS.colors.accentHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = CC_TOKENS.colors.accent;
        }}
      >
        Open Room →
      </button>
    </CommandCenterCard>
  );
}

// ============================================================================
// TAB 3: SCHEMA MAP
// ============================================================================

function SchemaMapView() {
  const schemaLayers = [
    {
      layer: 'Event Stream (Decision OS)',
      tables: [
        { name: 'evt_decision', status: 'live', room: 'Feed Brain' },
        { name: 'evt_delivery', status: 'live', room: 'Feed Brain' },
        { name: 'evt_outcome', status: 'live', room: 'Feed Brain' },
        { name: 'evt_user_signal', status: 'live', room: 'State' },
        { name: 'evt_context_detection', status: 'live', room: 'Context' },
      ],
    },
    {
      layer: 'Content Registry',
      tables: [
        { name: 'candidate_registry', status: 'live', room: 'Universal' },
        { name: 'candidate_variants', status: 'live', room: 'Universal' },
        { name: 'content_registry', status: 'live', room: 'Content' },
        { name: 'navicues', status: 'live', room: 'NaviCue Arsenal' },
        { name: 'journey_scenes', status: 'live', room: 'Journey' },
      ],
    },
    {
      layer: 'Policy & Safety',
      tables: [
        { name: 'policy_catalog', status: 'live', room: 'Feed Brain' },
        { name: 'policy_runs', status: 'live', room: 'Feed Brain' },
        { name: 'user_flags', status: 'live', room: 'Safety' },
        { name: 'user_risk_state', status: 'live', room: 'Safety' },
        { name: 'safety_decisions', status: 'live', room: 'Safety' },
      ],
    },
    {
      layer: 'Analytics & Features',
      tables: [
        { name: 'v_delivery_last_30d', status: 'live', room: 'Analytics' },
        { name: 'v_outcome_rates_30d', status: 'live', room: 'Analytics' },
        { name: 'v_candidate_recency', status: 'live', room: 'Analytics' },
        { name: 'v_user_state_current', status: 'live', room: 'State' },
        { name: 'v_context_freq_30d', status: 'live', room: 'Context' },
      ],
    },
    {
      layer: 'Future Build',
      tables: [
        { name: 'journey_sprints', status: 'pending', room: 'Journey Lab' },
        { name: 'wellness_library', status: 'pending', room: 'Wellbeing Studio' },
        { name: 'user_calendar_integrations', status: 'pending', room: 'Navigate' },
        { name: 'notification_rules', status: 'pending', room: 'Communications' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Database Schema Map"
        subtitle="120+ tables + views supporting the Decision OS, content registry, and LUMA intelligence"
        icon=""
      />

      {schemaLayers.map((layer, idx) => (
        <div key={idx} style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: CC_TOKENS.typography.h3.fontSize,
            color: CC_TOKENS.colors.text.primary,
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: `1px solid ${CC_TOKENS.colors.border}`,
          }}>
            {layer.layer}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer.tables.map((table, tidx) => (
              <CommandCenterCard key={tidx} border="subtle">
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: CC_TOKENS.colors.text.primary,
                  marginBottom: '4px',
                  fontFamily: 'monospace',
                }}>
                  {table.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: CC_TOKENS.colors.text.tertiary,
                }}>
                  {table.room}
                </div>
                <div style={{
                  marginTop: '8px',
                  fontSize: '11px',
                  color: table.status === 'live' ? '#00D9A3' : '#FFB800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {table.status}
                </div>
              </CommandCenterCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// TAB 4: DATA ROOM (Comprehensive KPI/Connector Dashboard)
// ============================================================================

function DataRoomView() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Data Room"
        subtitle="KPIs, connectors, MAP data mapping, decision telemetry, and system intelligence"
        icon=""
      />

      {/* Section 1: Decision OS Telemetry */}
      <div>
        <h3 style={{
          fontSize: CC_TOKENS.typography.h3.fontSize,
          color: CC_TOKENS.colors.text.primary,
          marginBottom: '16px',
        }}>
          Decision OS Telemetry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            label="Decisions Made"
            value="Live"
            description="evt_decision events with full audit trail"
            status="success"
          />
          <MetricCard
            label="Policy Receipts"
            value="Live"
            description="Every policy evaluation logged"
            status="success"
          />
          <MetricCard
            label="WhyNow Confidence"
            value="0.78 avg"
            description="Explainability score across decisions"
            status="success"
          />
        </div>
      </div>

      {/* Section 2: MAP Data Mapping */}
      <div>
        <h3 style={{
          fontSize: CC_TOKENS.typography.h3.fontSize,
          color: CC_TOKENS.colors.text.primary,
          marginBottom: '16px',
        }}>
          MAP Data Mapping
        </h3>
        <CommandCenterCard border="subtle">
          <p style={{
            fontSize: CC_TOKENS.typography.body.fontSize,
            color: CC_TOKENS.colors.text.secondary,
            marginBottom: '16px',
          }}>
            Moment → Appraisal → Proof pipeline tracking across NaviCue Arsenal, State, and Context systems
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{ fontSize: '12px', color: CC_TOKENS.colors.text.tertiary, marginBottom: '4px' }}>
                MOMENT
              </div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: CC_TOKENS.colors.accent }}>
                evt_user_signal
              </div>
              <div style={{ fontSize: '11px', color: CC_TOKENS.colors.text.tertiary, marginTop: '4px' }}>
                State check-ins, context
              </div>
            </div>
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{ fontSize: '12px', color: CC_TOKENS.colors.text.tertiary, marginBottom: '4px' }}>
                APPRAISAL
              </div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: CC_TOKENS.colors.accent }}>
                evt_decision
              </div>
              <div style={{ fontSize: '11px', color: CC_TOKENS.colors.text.tertiary, marginTop: '4px' }}>
                Signals → candidates
              </div>
            </div>
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{ fontSize: '12px', color: CC_TOKENS.colors.text.tertiary, marginBottom: '4px' }}>
                DELIVERY
              </div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: CC_TOKENS.colors.accent }}>
                evt_delivery
              </div>
              <div style={{ fontSize: '11px', color: CC_TOKENS.colors.text.tertiary, marginTop: '4px' }}>
                What was shown + why
              </div>
            </div>
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{ fontSize: '12px', color: CC_TOKENS.colors.text.tertiary, marginBottom: '4px' }}>
                PROOF
              </div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: CC_TOKENS.colors.accent }}>
                evt_outcome
              </div>
              <div style={{ fontSize: '11px', color: CC_TOKENS.colors.text.tertiary, marginTop: '4px' }}>
                Completion, helpful, harm
              </div>
            </div>
          </div>
        </CommandCenterCard>
      </div>

      {/* Section 3: State Mappings */}
      <div>
        <h3 style={{
          fontSize: CC_TOKENS.typography.h3.fontSize,
          color: CC_TOKENS.colors.text.primary,
          marginBottom: '16px',
        }}>
          State Mappings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CommandCenterCard border="subtle">
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: CC_TOKENS.colors.text.primary, marginBottom: '12px' }}>
              Energy · Clarity · Connection
            </h4>
            <ul style={{ paddingLeft: '16px' }}>
              <li style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary, marginBottom: '8px' }}>
                evt_user_signal (signal_type = checkin)
              </li>
              <li style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary, marginBottom: '8px' }}>
                v_user_state_current (latest snapshot)
              </li>
              <li style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary, marginBottom: '8px' }}>
                Feeds into Decision OS (feed_pull_v2)
              </li>
            </ul>
          </CommandCenterCard>

          <CommandCenterCard border="subtle">
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: CC_TOKENS.colors.text.primary, marginBottom: '12px' }}>
              Risk State
            </h4>
            <ul style={{ paddingLeft: '16px' }}>
              <li style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary, marginBottom: '8px' }}>
                user_risk_state (none → acute)
              </li>
              <li style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary, marginBottom: '8px' }}>
                Auto-escalation on report_harm outcomes
              </li>
              <li style={{ fontSize: '14px', color: CC_TOKENS.colors.text.secondary, marginBottom: '8px' }}>
                Gates high-risk content via policy_eval_v1
              </li>
            </ul>
          </CommandCenterCard>
        </div>
      </div>

      {/* Section 4: Edge/API Connectors */}
      <div>
        <h3 style={{
          fontSize: CC_TOKENS.typography.h3.fontSize,
          color: CC_TOKENS.colors.text.primary,
          marginBottom: '16px',
        }}>
          Edge Functions & API Connectors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ConnectorCard
            name="v1_feed_pull"
            type="Edge Function"
            status="live"
            description="Calls feed_pull_v2 RPC"
          />
          <ConnectorCard
            name="v1_state_checkin"
            type="Edge Function"
            status="live"
            description="Writes evt_user_signal"
          />
          <ConnectorCard
            name="v1_context_detect"
            type="Edge Function"
            status="live"
            description="Writes evt_context_detection"
          />
          <ConnectorCard
            name="v1_outcome"
            type="Edge Function"
            status="live"
            description="Writes evt_outcome + triggers"
          />
          <ConnectorCard
            name="feed_pull_v2"
            type="RPC (SQL)"
            status="live"
            description="Ranker + policies + WhyNow"
          />
          <ConnectorCard
            name="policy_eval_v1"
            type="RPC (SQL)"
            status="live"
            description="Safety gates + receipts"
          />
          <ConnectorCard
            name="build_why_now_v1"
            type="RPC (SQL)"
            status="live"
            description="Generates explainability"
          />
          <ConnectorCard
            name="Stripe Webhooks"
            type="External"
            status="live"
            description="Checkout + subscription"
          />
        </div>
      </div>

      {/* Section 5: Learning Weights */}
      <div>
        <h3 style={{
          fontSize: CC_TOKENS.typography.h3.fontSize,
          color: CC_TOKENS.colors.text.primary,
          marginBottom: '16px',
        }}>
          Learning Weights (Tunable Without Redeploy)
        </h3>
        <CommandCenterCard border="subtle">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WeightDisplay label="w_context" value="0.35" />
            <WeightDisplay label="w_novelty" value="0.25" />
            <WeightDisplay label="w_completion" value="0.25" />
            <WeightDisplay label="w_recency" value="0.25" />
            <WeightDisplay label="w_harm" value="0.60" />
            <WeightDisplay label="cooldown_hours" value="72" />
          </div>
          <p style={{
            fontSize: '12px',
            color: CC_TOKENS.colors.text.tertiary,
            marginTop: '16px',
          }}>
            Stored in ranker_weights table. Update without code deployment.
          </p>
        </CommandCenterCard>
      </div>

      {/* Section 6: Key KPIs */}
      <div>
        <h3 style={{
          fontSize: CC_TOKENS.typography.h3.fontSize,
          color: CC_TOKENS.colors.text.primary,
          marginBottom: '16px',
        }}>
          Key Platform KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="Completion Rate"
            value="Live"
            source="v_outcome_rates_30d"
            formula="completes / total deliveries"
          />
          <KPICard
            title="Harm Rate"
            value="Monitored"
            source="evt_outcome (report_harm)"
            formula="harms / total by candidate"
          />
          <KPICard
            title="Novelty Score"
            value="Live"
            source="v_candidate_recency"
            formula="Based on delivery history"
          />
          <KPICard
            title="Context Match"
            value="Live"
            source="v_context_freq_30d"
            formula="Hot contexts vs candidate tags"
          />
          <KPICard
            title="Policy Denials"
            value="Logged"
            source="policy_runs (status=deny)"
            formula="Count by policy_id"
          />
          <KPICard
            title="Variant Usage"
            value="Tracked"
            source="evt_delivery.meta"
            formula="crisis_safe vs standard vs short"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Data Room Components
// ============================================================================

function MetricCard({ label, value, description, status }: {
  label: string;
  value: string;
  description: string;
  status: 'success' | 'warning' | 'pending';
}) {
  const statusColors = {
    success: '#00D9A3',
    warning: '#FFB800',
    pending: '#999',
  };

  return (
    <CommandCenterCard border="subtle">
      <div style={{
        fontSize: '12px',
        color: CC_TOKENS.colors.text.tertiary,
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: statusColors[status],
        marginBottom: '8px',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '13px',
        color: CC_TOKENS.colors.text.secondary,
      }}>
        {description}
      </div>
    </CommandCenterCard>
  );
}

function ConnectorCard({ name, type, status, description }: {
  name: string;
  type: string;
  status: 'live' | 'pending';
  description: string;
}) {
  return (
    <CommandCenterCard border="subtle">
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: CC_TOKENS.colors.text.primary,
        marginBottom: '4px',
      }}>
        {name}
      </div>
      <div style={{
        fontSize: '11px',
        color: CC_TOKENS.colors.text.tertiary,
        marginBottom: '8px',
      }}>
        {type}
      </div>
      <div style={{
        fontSize: '12px',
        color: CC_TOKENS.colors.text.secondary,
        marginBottom: '8px',
      }}>
        {description}
      </div>
      <div style={{
        fontSize: '10px',
        color: status === 'live' ? '#00D9A3' : '#FFB800',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {status}
      </div>
    </CommandCenterCard>
  );
}

function WeightDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <div style={{
        fontSize: '11px',
        color: CC_TOKENS.colors.text.tertiary,
        marginBottom: '4px',
        fontFamily: 'monospace',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '24px',
        fontWeight: '600',
        color: CC_TOKENS.colors.accent,
      }}>
        {value}
      </div>
    </div>
  );
}

function KPICard({ title, value, source, formula }: {
  title: string;
  value: string;
  source: string;
  formula: string;
}) {
  return (
    <CommandCenterCard border="subtle">
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: CC_TOKENS.colors.text.primary,
        marginBottom: '8px',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '20px',
        fontWeight: '600',
        color: CC_TOKENS.colors.accent,
        marginBottom: '8px',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '11px',
        color: CC_TOKENS.colors.text.tertiary,
        marginBottom: '4px',
        fontFamily: 'monospace',
      }}>
        {source}
      </div>
      <div style={{
        fontSize: '12px',
        color: CC_TOKENS.colors.text.secondary,
      }}>
        {formula}
      </div>
    </CommandCenterCard>
  );
}