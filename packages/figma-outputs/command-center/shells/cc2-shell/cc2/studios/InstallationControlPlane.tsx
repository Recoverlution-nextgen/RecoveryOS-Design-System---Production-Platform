/**
 * INSTALLATION CONTROL PLANE
 * 
 * The operational command center for nervous system programming.
 * 
 * NOT a dashboard. NOT a monitoring tool.
 * This is the live control plane for executing, monitoring, and proving
 * installation protocols across 2,847 Mindblock targets.
 * 
 * Based on: Installation System paradigm (Installation vs Information)
 * Powers: Algorithm Visualizer claims with live, queryable data
 * Architecture: Eight Primitives installation protocol + KBE progression tracking
 * 
 * SIX OPERATIONAL VIEWS:
 * 1. Installation Dashboard (Live MTTR, primitive usage, episode monitoring)
 * 2. Target Selector (Which Mindblocks to install, per-user KBE state)
 * 3. Protocol Executor (Eight Primitives orchestration, context-adaptive)
 * 4. Installation Monitor (KBE depth, proof artifacts, trajectories)
 * 5. Proof Ledger (Chain browser, artifact timeline, trajectory forecasts)
 * 6. System Health (Stuck users, regression detector, installation success rates)
 */

import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  Target,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Database,
  GitBranch,
  BarChart,
  Filter,
  Search,
  Play,
  Pause,
  SkipForward,
  Settings,
  Shield,
  Layers,
  Crosshair
} from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';

type ViewMode = 'dashboard' | 'targets' | 'protocol' | 'monitor' | 'proof' | 'health';

interface InstallationControlPlaneProps {
  onBack?: () => void;
}

export function InstallationControlPlane({ onBack }: InstallationControlPlaneProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-full overflow-auto" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <div className="p-8 bg-white" style={{ borderBottom: '2px solid #E0E0E0' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#3E2BB8' }}>
              Installation Control Plane
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Nervous system programming command center. Execute, monitor, and prove installation protocols across 2,847 Mindblock targets.
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50"
            >
              ← Back
            </button>
          )}
        </div>

        {/* View Mode Navigation */}
        <div className="flex gap-2">
          <ViewTab
            active={viewMode === 'dashboard'}
            onClick={() => setViewMode('dashboard')}
            icon={Activity}
            label="Installation Dashboard"
            subtitle="Live MTTR & Episodes"
          />
          <ViewTab
            active={viewMode === 'targets'}
            onClick={() => setViewMode('targets')}
            icon={Target}
            label="Target Selector"
            subtitle="2,847 Mindblocks"
          />
          <ViewTab
            active={viewMode === 'protocol'}
            onClick={() => setViewMode('protocol')}
            icon={Zap}
            label="Protocol Executor"
            subtitle="Eight Primitives"
          />
          <ViewTab
            active={viewMode === 'monitor'}
            onClick={() => setViewMode('monitor')}
            icon={TrendingUp}
            label="Installation Monitor"
            subtitle="KBE Depth & Proof"
          />
          <ViewTab
            active={viewMode === 'proof'}
            onClick={() => setViewMode('proof')}
            icon={Shield}
            label="Proof Ledger"
            subtitle="Chains & Trajectories"
          />
          <ViewTab
            active={viewMode === 'health'}
            onClick={() => setViewMode('health')}
            icon={AlertTriangle}
            label="System Health"
            subtitle="Stuck Users & Regression"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {viewMode === 'dashboard' && <InstallationDashboard />}
        {viewMode === 'targets' && <TargetSelector />}
        {viewMode === 'protocol' && <ProtocolExecutor />}
        {viewMode === 'monitor' && <InstallationMonitor />}
        {viewMode === 'proof' && <ProofLedger />}
        {viewMode === 'health' && <SystemHealth />}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW TAB COMPONENT
// ============================================================================

interface ViewTabProps {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  subtitle: string;
}

function ViewTab({ active, onClick, icon: Icon, label, subtitle }: ViewTabProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start px-4 py-3 text-left transition-all border-2"
      style={{
        backgroundColor: active ? '#3E2BB8' : 'white',
        borderColor: active ? '#3E2BB8' : '#E0E0E0',
        color: active ? 'white' : '#333',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-bold">{label}</span>
      </div>
      <span className="text-xs opacity-80">{subtitle}</span>
    </button>
  );
}

// ============================================================================
// VIEW 1: INSTALLATION DASHBOARD
// Live MTTR, Primitive Usage, Episode Monitoring
// ============================================================================

function InstallationDashboard() {
  const [mttrData, setMttrData] = useState({
    avgMTTR: 4.2,
    medianMTTR: 3.1,
    p95MTTR: 12.7,
    episodesToday: 89,
    episodesOpen: 12,
  });

  const [primitiveUsage, setPrimitiveUsage] = useState([
    { key: 'orient', name: 'Orient', count: 1247, trend: '+12%' },
    { key: 'downshift', name: 'Downshift', count: 892, trend: '+8%' },
    { key: 'name_pattern', name: 'Name Pattern', count: 673, trend: '+15%' },
    { key: 'make_move', name: 'Make Move', count: 1421, trend: '+22%' },
    { key: 'capture_receipt', name: 'Capture Receipt', count: 589, trend: '+10%' },
    { key: 'transfer_test', name: 'Transfer Test', count: 234, trend: '+18%' },
    { key: 'repair', name: 'Repair', count: 156, trend: '+5%' },
    { key: 'witness', name: 'Witness', count: 89, trend: '+3%' },
  ]);

  const [liveSignals, setLiveSignals] = useState({
    coherence: 0.76,
    spikeIndex: 0.23,
    measurementsToday: 847,
  });

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Live Installation Performance
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <MetricCard
            title="MTTR (Mean Time To Return)"
            value="4.2 min"
            subtitle="↓ 18% this week"
            detail={`Median: ${mttrData.medianMTTR}min | P95: ${mttrData.p95MTTR}min`}
            color="#10B981"
          />
          <MetricCard
            title="Coherence Index"
            value="0.76"
            subtitle={`${liveSignals.measurementsToday} measurements today`}
            detail="Energy + Clarity + Anchorage signals"
            color="#3E2BB8"
          />
          <MetricCard
            title="Spike Index"
            value="0.23"
            subtitle="↓ 12% vs baseline"
            detail={`${mttrData.episodesToday} episodes closed today`}
            color="#F59E0B"
          />
        </div>
      </div>

      {/* Episode Monitor */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Active Arousal Episodes
        </h3>
        <div className="bg-white p-6 border-2 border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-700">
              {mttrData.episodesOpen} episodes currently open
            </span>
            <button className="px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: '#3E2BB8' }}>
              View All Episodes
            </button>
          </div>
          <EpisodeTimeline />
        </div>
      </div>

      {/* Eight Primitives Usage */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Eight Primitives (Today's Installation Protocol Usage)
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {primitiveUsage.map((primitive) => (
            <div key={primitive.key} className="bg-white p-4 border-2 border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-700">{primitive.name}</span>
                <span className="text-xs font-medium text-green-600">{primitive.trend}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: '#3E2BB8' }}>
                {primitive.count}
              </div>
              <div className="text-xs text-gray-500 mt-1">events executed</div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Event Feed */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Live Installation Events
        </h3>
        <div className="bg-white p-6 border-2 border-gray-300">
          <LiveEventFeed />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 2: TARGET SELECTOR
// Which Mindblocks to install, per-user KBE state
// ============================================================================

function TargetSelector() {
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [kbeFilter, setKbeFilter] = useState<'all' | 'knowing' | 'believing' | 'embodying'>('all');

  const pillars = [
    { key: 'all', name: 'All Pillars', count: 2847 },
    { key: 'ER', name: 'Emotional Regulation', count: 435 },
    { key: 'SR', name: 'Stress Resilience', count: 435 },
    { key: 'SC', name: 'Social Connectivity', count: 435 },
    { key: 'CR', name: 'Cognitive Reframing', count: 435 },
    { key: 'II', name: 'Identity Integration', count: 435 },
    { key: 'DM', name: 'Decision Mastery', count: 435 },
  ];

  const [mindblocks, setMindblocks] = useState([
    {
      id: 1,
      text: 'If I feel this, I\'ll break.',
      pillar: 'ER',
      schema: 'Emotional Intolerance',
      family: 'Escalate to end it',
      kbe: { knowing: 1247, believing: 456, embodying: 89 },
      lastInstallation: '2 hours ago',
    },
    {
      id: 2,
      text: 'People leave.',
      pillar: 'SC',
      schema: 'Abandonment / Disconnection',
      family: 'Pre-emptive withdrawal',
      kbe: { knowing: 982, believing: 234, embodying: 45 },
      lastInstallation: '5 hours ago',
    },
    {
      id: 3,
      text: 'Nothing I do matters.',
      pillar: 'SR',
      schema: 'Helplessness / Powerlessness',
      family: 'Learned defeat',
      kbe: { knowing: 1053, believing: 312, embodying: 67 },
      lastInstallation: '1 hour ago',
    },
    {
      id: 4,
      text: 'I need this now.',
      pillar: 'DM',
      schema: 'Immediate Relief',
      family: 'Future discounting',
      kbe: { knowing: 876, believing: 298, embodying: 123 },
      lastInstallation: '30 minutes ago',
    },
    {
      id: 5,
      text: 'If I\'m not perfect, I\'m nothing.',
      pillar: 'CR',
      schema: 'Negativity / Doom Bias',
      family: 'Control the controller',
      kbe: { knowing: 934, believing: 267, embodying: 78 },
      lastInstallation: '3 hours ago',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header with Filters */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Installation Targets (2,847 Mindblocks)
        </h2>
        <div className="bg-white p-6 border-2 border-gray-300">
          <div className="grid grid-cols-3 gap-4">
            {/* Pillar Filter */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">Filter by Pillar</label>
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 text-sm"
              >
                {pillars.map((pillar) => (
                  <option key={pillar.key} value={pillar.key}>
                    {pillar.name} ({pillar.count})
                  </option>
                ))}
              </select>
            </div>

            {/* User Search */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">Search User</label>
              <input
                type="text"
                placeholder="Enter user ID or name..."
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 text-sm"
              />
            </div>

            {/* KBE Stage Filter */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">KBE Stage</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setKbeFilter('all')}
                  className="px-3 py-2 text-xs font-medium border-2"
                  style={{
                    backgroundColor: kbeFilter === 'all' ? '#3E2BB8' : 'white',
                    borderColor: kbeFilter === 'all' ? '#3E2BB8' : '#E0E0E0',
                    color: kbeFilter === 'all' ? 'white' : '#333',
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setKbeFilter('knowing')}
                  className="px-3 py-2 text-xs font-medium border-2"
                  style={{
                    backgroundColor: kbeFilter === 'knowing' ? '#EF4444' : 'white',
                    borderColor: kbeFilter === 'knowing' ? '#EF4444' : '#E0E0E0',
                    color: kbeFilter === 'knowing' ? 'white' : '#333',
                  }}
                >
                  Knowing
                </button>
                <button
                  onClick={() => setKbeFilter('believing')}
                  className="px-3 py-2 text-xs font-medium border-2"
                  style={{
                    backgroundColor: kbeFilter === 'believing' ? '#F59E0B' : 'white',
                    borderColor: kbeFilter === 'believing' ? '#F59E0B' : '#E0E0E0',
                    color: kbeFilter === 'believing' ? 'white' : '#333',
                  }}
                >
                  Believing
                </button>
                <button
                  onClick={() => setKbeFilter('embodying')}
                  className="px-3 py-2 text-xs font-medium border-2"
                  style={{
                    backgroundColor: kbeFilter === 'embodying' ? '#10B981' : 'white',
                    borderColor: kbeFilter === 'embodying' ? '#10B981' : '#E0E0E0',
                    color: kbeFilter === 'embodying' ? 'white' : '#333',
                  }}
                >
                  Embodying
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mindblock List */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Mindblock Registry
        </h3>
        <div className="space-y-4">
          {mindblocks.map((mindblock) => (
            <MindblockTargetCard key={mindblock.id} mindblock={mindblock} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface MindblockTargetCardProps {
  mindblock: {
    id: number;
    text: string;
    pillar: string;
    schema: string;
    family: string;
    kbe: { knowing: number; believing: number; embodying: number };
    lastInstallation: string;
  };
}

function MindblockTargetCard({ mindblock }: MindblockTargetCardProps) {
  const totalUsers = mindblock.kbe.knowing + mindblock.kbe.believing + mindblock.kbe.embodying;
  const knowingPct = ((mindblock.kbe.knowing / totalUsers) * 100).toFixed(0);
  const believingPct = ((mindblock.kbe.believing / totalUsers) * 100).toFixed(0);
  const embodyingPct = ((mindblock.kbe.embodying / totalUsers) * 100).toFixed(0);

  return (
    <div className="bg-white p-6 border-2 border-gray-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: '#3E2BB8' }}>
              {mindblock.pillar}
            </span>
            <span className="text-lg font-bold text-gray-900">"{mindblock.text}"</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-bold">Schema:</span> {mindblock.schema} • <span className="font-bold">Family:</span> {mindblock.family}
          </div>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: '#3E2BB8' }}
        >
          Execute Installation
        </button>
      </div>

      {/* KBE Distribution */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
          <span>KBE Distribution ({totalUsers} users)</span>
          <span className="text-gray-500">Last installation: {mindblock.lastInstallation}</span>
        </div>
        <div className="flex h-6 overflow-hidden border-2 border-gray-300">
          <div
            className="flex items-center justify-center text-xs font-bold text-white"
            style={{ width: `${knowingPct}%`, backgroundColor: '#EF4444' }}
          >
            {knowingPct}%
          </div>
          <div
            className="flex items-center justify-center text-xs font-bold text-white"
            style={{ width: `${believingPct}%`, backgroundColor: '#F59E0B' }}
          >
            {believingPct}%
          </div>
          <div
            className="flex items-center justify-center text-xs font-bold text-white"
            style={{ width: `${embodyingPct}%`, backgroundColor: '#10B981' }}
          >
            {embodyingPct}%
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Knowing: {mindblock.kbe.knowing}</span>
          <span>Believing: {mindblock.kbe.believing}</span>
          <span>Embodying: {mindblock.kbe.embodying}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50">
          View User KBE States
        </button>
        <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50">
          View KBE Transitions
        </button>
        <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50">
          View Proof Artifacts
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 3: PROTOCOL EXECUTOR
// Eight Primitives orchestration, context-adaptive
// ============================================================================

function ProtocolExecutor() {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMindblock, setSelectedMindblock] = useState('');
  const [primitiveSequence, setPrimitiveSequence] = useState([
    { key: 'orient', name: 'Orient', status: 'ready', duration: null },
    { key: 'downshift', name: 'Downshift', status: 'pending', duration: null },
    { key: 'name_pattern', name: 'Name Pattern', status: 'pending', duration: null },
    { key: 'make_move', name: 'Make Move', status: 'pending', duration: null },
    { key: 'capture_receipt', name: 'Capture Receipt', status: 'pending', duration: null },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Protocol Executor (Eight Primitives Installation)
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Execute context-adaptive installation protocols. The Eight Primitives are not "intervention types" — they're installation steps.
        </p>

        {/* Target Selection */}
        <div className="bg-white p-6 border-2 border-gray-300 mb-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Select Installation Target
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">User</label>
              <select className="w-full p-2 border-2 border-gray-300 text-sm">
                <option value="">Select user...</option>
                <option value="user1">Alex Thompson (ID: 0x4f2a...)</option>
                <option value="user2">Jordan Martinez (ID: 0x8b1c...)</option>
                <option value="user3">Sam Chen (ID: 0x2d9e...)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">Mindblock Target</label>
              <select className="w-full p-2 border-2 border-gray-300 text-sm">
                <option value="">Select target...</option>
                <option value="mb1">"If I feel this, I'll break." (ER)</option>
                <option value="mb2">"People leave." (SC)</option>
                <option value="mb3">"I need this now." (DM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Protocol Sequence */}
        <div className="bg-white p-6 border-2 border-gray-300">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Installation Protocol Sequence
          </h3>
          <div className="space-y-3">
            {primitiveSequence.map((primitive, index) => (
              <PrimitiveStepCard key={primitive.key} primitive={primitive} index={index} />
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button
              className="px-6 py-3 text-sm font-bold text-white"
              style={{ backgroundColor: '#3E2BB8' }}
            >
              <Play className="w-4 h-4 inline mr-2" />
              Execute Installation Protocol
            </button>
            <button className="px-6 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50">
              Preview Sequence
            </button>
          </div>
        </div>

        {/* Context Readiness */}
        <div className="bg-white p-6 border-2 border-gray-300">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Nervous System Readiness
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <ReadinessIndicator label="Arousal Level" value="Regulated" status="ready" />
            <ReadinessIndicator label="Context Safety" value="High" status="ready" />
            <ReadinessIndicator label="Capacity Window" value="Open" status="ready" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimitiveStepCard({ primitive, index }: { primitive: any; index: number }) {
  const statusColors = {
    ready: '#3E2BB8',
    running: '#F59E0B',
    complete: '#10B981',
    pending: '#9CA3AF',
  };

  return (
    <div className="flex items-center gap-4 p-4 border-2" style={{ borderColor: statusColors[primitive.status as keyof typeof statusColors] }}>
      <div
        className="flex items-center justify-center w-10 h-10 text-white font-bold"
        style={{ backgroundColor: statusColors[primitive.status as keyof typeof statusColors] }}
      >
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="font-bold text-gray-900">{primitive.name}</div>
        <div className="text-xs text-gray-600">
          {primitive.key === 'orient' && 'Fast read: Is nervous system ready to receive?'}
          {primitive.key === 'downshift' && 'Create receiving capacity (regulate first)'}
          {primitive.key === 'name_pattern' && 'Mark what\'s being installed (turn pain into map)'}
          {primitive.key === 'make_move' && 'Execute installation (small, repeatable)'}
          {primitive.key === 'capture_receipt' && 'Verify nervous system registered it'}
        </div>
      </div>
      <div className="text-sm font-bold text-gray-700 capitalize">{primitive.status}</div>
    </div>
  );
}

function ReadinessIndicator({ label, value, status }: { label: string; value: string; status: 'ready' | 'caution' | 'blocked' }) {
  const colors = {
    ready: '#10B981',
    caution: '#F59E0B',
    blocked: '#EF4444',
  };

  return (
    <div className="p-4 border-2" style={{ borderColor: colors[status] }}>
      <div className="text-xs font-bold text-gray-600 mb-1">{label}</div>
      <div className="text-lg font-bold" style={{ color: colors[status] }}>{value}</div>
    </div>
  );
}

// ============================================================================
// VIEW 4: INSTALLATION MONITOR
// KBE depth, proof artifacts, trajectories
// ============================================================================

function InstallationMonitor() {
  const [selectedUser, setSelectedUser] = useState('user1');
  const [userKBEState, setUserKBEState] = useState([
    {
      mindblock: 'If I feel this, I\'ll break.',
      pillar: 'ER',
      stage: 'believing',
      confidence: 0.82,
      evidenceCount: 12,
      lastEvidence: '2 hours ago',
      transition: 'knowing → believing (Jan 4)',
    },
    {
      mindblock: 'People leave.',
      pillar: 'SC',
      stage: 'knowing',
      confidence: 0.67,
      evidenceCount: 5,
      lastEvidence: '1 day ago',
      transition: null,
    },
    {
      mindblock: 'Abandonment triggers',
      pillar: 'SC',
      stage: 'embodying',
      confidence: 0.91,
      evidenceCount: 23,
      lastEvidence: '3 hours ago',
      transition: 'believing → embodying (Jan 4)',
    },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Installation Monitor (KBE Depth & Proof Artifacts)
        </h2>

        {/* User Selector */}
        <div className="bg-white p-4 border-2 border-gray-300 mb-6">
          <label className="text-sm font-bold text-gray-700 mb-2 block">Select User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 text-sm"
          >
            <option value="user1">Alex Thompson</option>
            <option value="user2">Jordan Martinez</option>
            <option value="user3">Sam Chen</option>
          </select>
        </div>

        {/* User KBE Dashboard */}
        <div className="bg-white p-6 border-2 border-gray-300 mb-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            User KBE State (Installation Depth per Target)
          </h3>
          <div className="space-y-4">
            {userKBEState.map((state, index) => (
              <UserKBEStateCard key={index} state={state} />
            ))}
          </div>
        </div>

        {/* Platform Aggregates */}
        <div className="bg-white p-6 border-2 border-gray-300">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Platform KBE Health (All Users)
          </h3>
          <div className="mb-6">
            <div className="text-sm font-bold text-gray-700 mb-2">Total User-Mindblock Pairs: 62,130</div>
            <div className="flex h-12 overflow-hidden border-2 border-gray-300">
              <div className="flex items-center justify-center text-sm font-bold text-white" style={{ width: '74%', backgroundColor: '#EF4444' }}>
                KNOWING: 45,892 (74%)
              </div>
              <div className="flex items-center justify-center text-sm font-bold text-white" style={{ width: '20%', backgroundColor: '#F59E0B' }}>
                BELIEVING: 12,347 (20%)
              </div>
              <div className="flex items-center justify-center text-sm font-bold text-white" style={{ width: '6%', backgroundColor: '#10B981' }}>
                EMBODYING: 3,891 (6%)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <MetricCard
              title="K→B Transitions This Week"
              value="1,247"
              subtitle="Installation progress"
              color="#F59E0B"
            />
            <MetricCard
              title="B→E Transitions This Week"
              value="234"
              subtitle="Installation completion"
              color="#10B981"
            />
            <MetricCard
              title="E→B Regressions"
              value="12"
              subtitle="Stability concern"
              color="#EF4444"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserKBEStateCard({ state }: { state: any }) {
  const stageColors = {
    knowing: '#EF4444',
    believing: '#F59E0B',
    embodying: '#10B981',
  };

  return (
    <div className="p-4 border-2 border-gray-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: '#3E2BB8' }}>
              {state.pillar}
            </span>
            <span className="font-bold text-gray-900">"{state.mindblock}"</span>
          </div>
          {state.transition && (
            <div className="text-xs text-gray-600">{state.transition}</div>
          )}
        </div>
        <div className="text-right">
          <div className="px-3 py-1 text-xs font-bold text-white uppercase mb-1" style={{ backgroundColor: stageColors[state.stage as keyof typeof stageColors] }}>
            {state.stage}
          </div>
          <div className="text-xs text-gray-600">Confidence: {state.confidence}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Evidence: {state.evidenceCount} artifacts</span>
        <span>Last evidence: {state.lastEvidence}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50">
          View Evidence Trail
        </button>
        <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50">
          View KBE Timeline
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 5: PROOF LEDGER
// Chain browser, artifact timeline, trajectory forecasts
// ============================================================================

function ProofLedger() {
  const [selectedChain, setSelectedChain] = useState('chain1');
  const [chainData, setChainData] = useState({
    id: 'chain1',
    user: 'Alex Thompson',
    scope: 'Emotional Regulation (ER)',
    opened: 'Jan 3, 2026 14:00',
    status: 'ACTIVE',
    artifactCount: 17,
    artifacts: [
      { date: 'Jan 3 14:15', type: 'navicue_response', content: 'NaviCue: "Name the feeling"', weight: 1.0 },
      { date: 'Jan 3 16:42', type: 'practice_log', content: 'Practice: "Box breathing" (quality: 8/10)', weight: 1.2 },
      { date: 'Jan 4 09:10', type: 'transfer_result', content: 'Context: "Work meeting" - SUCCESS', weight: 1.5 },
      { date: 'Jan 4 11:30', type: 'witness_confirm', content: 'Witness: Therapist confirmed co-regulation', weight: 1.8 },
      { date: 'Jan 5 13:20', type: 'journey_completion', content: 'Journey Scene: "Recognize triggers"', weight: 1.0 },
    ],
    trajectory: {
      score: 0.78,
      previousScore: 0.61,
      stability: 'HIGH',
      slope: '+0.12/week',
      forecast: 'Embodying by Jan 15',
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          Proof Ledger (Nervous System Receipts)
        </h2>

        {/* Chain Selector */}
        <div className="bg-white p-4 border-2 border-gray-300 mb-6">
          <label className="text-sm font-bold text-gray-700 mb-2 block">Select Proof Chain</label>
          <select className="w-full p-2 border-2 border-gray-300 text-sm">
            <option value="chain1">ER Chain - Alex Thompson (17 artifacts)</option>
            <option value="chain2">SC Chain - Jordan Martinez (23 artifacts)</option>
            <option value="chain3">DM Chain - Sam Chen (12 artifacts)</option>
          </select>
        </div>

        {/* Chain Details */}
        <div className="bg-white p-6 border-2 border-gray-300 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: '#3E2BB8' }}>
                {chainData.scope} - {chainData.user}
              </h3>
              <div className="text-sm text-gray-600">
                Opened: {chainData.opened} • Status: {chainData.status} • {chainData.artifactCount} artifacts linked
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold mb-1" style={{ color: '#10B981' }}>
                {chainData.trajectory.score}
              </div>
              <div className="text-xs text-gray-600">
                ↑ from {chainData.trajectory.previousScore}
              </div>
            </div>
          </div>

          {/* Artifacts Timeline */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-3">Artifacts in Chain</h4>
            <div className="space-y-2">
              {chainData.artifacts.map((artifact, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border-2 border-gray-300">
                  <div className="text-xs font-bold text-gray-500 w-24">{artifact.date}</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-900 mb-1">{artifact.content}</div>
                    <div className="text-xs text-gray-600">Type: {artifact.type} • Weight: {artifact.weight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trajectory */}
          <div className="p-4 border-2 border-green-500 bg-green-50">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Proof Trajectory</h4>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-600 mb-1">Score</div>
                <div className="text-lg font-bold text-green-600">{chainData.trajectory.score}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Stability</div>
                <div className="text-lg font-bold text-green-600">{chainData.trajectory.stability}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Slope</div>
                <div className="text-lg font-bold text-green-600">{chainData.trajectory.slope}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Forecast</div>
                <div className="text-sm font-bold text-green-600">{chainData.trajectory.forecast}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CEO Dashboard */}
        <div className="bg-white p-6 border-2 border-gray-300">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Outcomes as Currency (Platform-Wide)
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <MetricCard
              title="Users with Positive Trajectory"
              value="847"
              subtitle="Slope +0.05/week or higher"
              color="#10B981"
            />
            <MetricCard
              title="Average Proof Score"
              value="0.68"
              subtitle="↑ from 0.54 (baseline)"
              color="#3E2BB8"
            />
            <MetricCard
              title="Installation Success Rate"
              value="67%"
              subtitle="K→B or B→E this month"
              color="#F59E0B"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 6: SYSTEM HEALTH
// Stuck users, regression detector, installation success rates
// ============================================================================

function SystemHealth() {
  const [stuckUsers, setStuckUsers] = useState([
    { user: 'User 0x4f2a...', mindblock: 'People leave.', pillar: 'SC', daysStuck: 37, kbeStage: 'knowing' },
    { user: 'User 0x8b1c...', mindblock: 'Nothing I do matters.', pillar: 'SR', daysStuck: 42, kbeStage: 'knowing' },
    { user: 'User 0x2d9e...', mindblock: 'If I\'m not perfect, I\'m nothing.', pillar: 'CR', daysStuck: 31, kbeStage: 'knowing' },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#3E2BB8' }}>
          System Health (Installation Quality & Regression Detection)
        </h2>

        {/* Health Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Stuck Users (30+ days)"
            value="3,892"
            subtitle="12% of active users"
            color="#EF4444"
          />
          <MetricCard
            title="Regressions This Week"
            value="12"
            subtitle="E→B or B→K transitions"
            color="#F59E0B"
          />
          <MetricCard
            title="Installation Success Rate"
            value="67%"
            subtitle="K→B or B→E achieved"
            color="#10B981"
          />
          <MetricCard
            title="Avg Days to B→E"
            value="18.3"
            subtitle="Installation completion time"
            color="#3E2BB8"
          />
        </div>

        {/* Stuck Users List */}
        <div className="bg-white p-6 border-2 border-gray-300 mb-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Stuck Users (30+ days in Knowing)
          </h3>
          <div className="space-y-3">
            {stuckUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-2 border-red-500 bg-red-50">
                <div>
                  <div className="font-bold text-gray-900 mb-1">{user.user}</div>
                  <div className="text-sm text-gray-600">
                    Mindblock: "{user.mindblock}" ({user.pillar}) • Stage: {user.kbeStage}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{user.daysStuck}</div>
                  <div className="text-xs text-gray-600">days stuck</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing 3 of 247 stuck users. <button className="font-bold text-purple-600 hover:underline">View all →</button>
          </div>
        </div>

        {/* Top Stuck Mindblocks */}
        <div className="bg-white p-6 border-2 border-gray-300">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#3E2BB8' }}>
            Top Stuck Mindblocks (Lowest K→B Success Rate)
          </h3>
          <div className="space-y-2">
            <StuckMindblockRow mindblock="People leave." pillar="SC" stuckCount={247} successRate={23} />
            <StuckMindblockRow mindblock="Nothing I do matters." pillar="SR" stuckCount={189} successRate={28} />
            <StuckMindblockRow mindblock="If I'm not perfect, I'm nothing." pillar="CR" stuckCount={156} successRate={31} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StuckMindblockRow({ mindblock, pillar, stuckCount, successRate }: { mindblock: string; pillar: string; stuckCount: number; successRate: number }) {
  return (
    <div className="flex items-center justify-between p-3 border-2 border-gray-300">
      <div className="flex items-center gap-3">
        <span className="px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: '#3E2BB8' }}>{pillar}</span>
        <span className="font-bold text-gray-900">"{mindblock}"</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-sm font-bold text-red-600">{stuckCount} stuck</div>
          <div className="text-xs text-gray-600">users</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-orange-600">{successRate}%</div>
          <div className="text-xs text-gray-600">K→B rate</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  detail?: string;
  color: string;
}

function MetricCard({ title, value, subtitle, detail, color }: MetricCardProps) {
  return (
    <div className="bg-white p-6 border-2 border-gray-300">
      <div className="text-sm font-bold text-gray-700 mb-2">{title}</div>
      <div className="text-3xl font-bold mb-1" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-600 mb-1">{subtitle}</div>
      {detail && <div className="text-xs text-gray-500 mt-2">{detail}</div>}
    </div>
  );
}

function EpisodeTimeline() {
  const episodes = [
    { user: 'User 0x4f2a...', opened: '14:23', peak: '14:28', mttr: '4.2 min', status: 'closed' },
    { user: 'User 0x8b1c...', opened: '14:45', peak: '14:52', mttr: '12.1 min', status: 'closed' },
    { user: 'User 0x2d9e...', opened: '15:12', peak: '—', mttr: '—', status: 'open' },
  ];

  return (
    <div className="space-y-2">
      {episodes.map((episode, index) => (
        <div key={index} className="flex items-center justify-between p-3 border-2 border-gray-300">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 ${episode.status === 'open' ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <div>
              <div className="text-sm font-bold text-gray-900">{episode.user}</div>
              <div className="text-xs text-gray-600">
                Opened: {episode.opened} • Peak: {episode.peak}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold" style={{ color: episode.status === 'open' ? '#EF4444' : '#10B981' }}>
              {episode.status.toUpperCase()}
            </div>
            {episode.mttr !== '—' && (
              <div className="text-xs text-gray-600">MTTR: {episode.mttr}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function LiveEventFeed() {
  const events = [
    { time: '15:23:47', user: '0x4f2a...', event: 'Orient primitive executed', pillar: 'ER', type: 'primitive' },
    { time: '15:23:12', user: '0x8b1c...', event: 'NaviCue completed: "Name the feeling"', pillar: 'ER', type: 'navicue' },
    { time: '15:22:38', user: '0x2d9e...', event: 'KBE transition: Knowing → Believing', pillar: 'SC', type: 'kbe' },
    { time: '15:21:55', user: '0x1a5f...', event: 'Arousal episode opened (spike detected)', pillar: 'SR', type: 'episode' },
    { time: '15:21:20', user: '0x6c3b...', event: 'Proof artifact created: transfer_test', pillar: 'DM', type: 'proof' },
  ];

  return (
    <div className="space-y-1">
      {events.map((event, index) => (
        <div key={index} className="flex items-center gap-3 p-2 text-sm border-b border-gray-200">
          <div className="text-xs font-mono text-gray-500 w-20">{event.time}</div>
          <div className="px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: '#3E2BB8' }}>{event.pillar}</div>
          <div className="flex-1 text-gray-900">{event.event}</div>
          <div className="text-xs text-gray-500">{event.user}</div>
        </div>
      ))}
      <div className="pt-2 text-center">
        <button className="text-sm font-bold text-purple-600 hover:underline">
          View full event spine →
        </button>
      </div>
    </div>
  );
}
