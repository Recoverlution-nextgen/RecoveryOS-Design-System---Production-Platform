/**
 * CC2 HOME - TENANT-AWARE LIVE OS COCKPIT
 * Real-time dashboard with multi-tenancy support
 * - Platform Admin: See ALL data
 * - Org Admin: See only org data
 * - Professional: See only own data
 */

import { useEffect, useState } from 'react';
import { Activity, Shield, CheckCircle, Users, Database, Zap, Brain, Layers, Flame, User, Image, TrendingUp, Settings, Bot } from 'lucide-react';
import { StatCard } from './shared/StatCard';
import { StudioCard } from './shared/StudioCard';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';
import { SoundbiteAnalytics } from '../soundbites/SoundbiteAnalytics';
import { useUser, useTenantScope } from '../../contexts/UserContext';
import { getVisibleStudios } from '../../utils/rbac';

type CC2Mode = 'home' | 'build' | 'govern' | 'simulate' | 'prove' | 'playground';

interface CC2HomeProps {
  mode: CC2Mode;
  onModeChange: (mode: CC2Mode) => void;
  onStudioOpen: (studio: string) => void;
  tenantScope: 'platform' | 'org' | 'professional';
  onTenantScopeChange: (scope: 'platform' | 'org' | 'professional') => void;
}

export function CC2Home({ mode, onModeChange, onStudioOpen, tenantScope, onTenantScopeChange }: CC2HomeProps) {
  const { role, organizationId, professionalId, organizationName, professionalName } = useUser();
  const { tenantScope: autoTenantScope, tenantId } = useTenantScope();
  
  const [stats, setStats] = useState({
    contentLive: 0,
    eventsToday: 0,
    proofsToday: 0,
    blocksToday: 0,
    openRate: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  // Auto-set tenant scope based on user role
  useEffect(() => {
    onTenantScopeChange(autoTenantScope);
  }, [autoTenantScope]);

  // Reload stats when tenant scope changes
  useEffect(() => {
    loadStats();
  }, [tenantScope, tenantId]);

  async function loadStats() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('[CC2] No session found, using placeholder stats');
        setStats({
          contentLive: 247,
          eventsToday: 1843,
          proofsToday: 89,
          blocksToday: 3,
          openRate: 73,
          completionRate: 58,
        });
        setLoading(false);
        return;
      }

      // Build URL with tenant params
      let url = `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/cc2/stats`;
      url += `?tenantScope=${tenantScope}`;
      if (tenantId) {
        url += `&tenantId=${tenantId}`;
      }

      console.log(`[CC2] Loading stats for ${tenantScope}:`, tenantId);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats({
          contentLive: data.content_live || 0,
          eventsToday: data.events_today || 0,
          proofsToday: data.proofs_today || 0,
          blocksToday: data.blocks_today || 0,
          openRate: data.open_rate || 0,
          completionRate: data.completion_rate || 0,
        });
        console.log(`[CC2] Loaded stats for ${tenantScope}:`, data);
      } else {
        const errorText = await response.text();
        console.error(`[CC2] Failed to load stats: ${response.status} ${response.statusText}`, errorText);
        // Use placeholder on error
        setStats({
          contentLive: 247,
          eventsToday: 1843,
          proofsToday: 89,
          blocksToday: 3,
          openRate: 73,
          completionRate: 58,
        });
      }
    } catch (error) {
      console.error('[CC2] Error loading stats:', error);
      setStats({
        contentLive: 247,
        eventsToday: 1843,
        proofsToday: 89,
        blocksToday: 3,
        openRate: 73,
        completionRate: 58,
      });
    } finally {
      setLoading(false);
    }
  }

  // Get visible studios based on user role
  const visibleStudioIds = getVisibleStudios(role);

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Control Plane
          </h1>
          <p className="text-zinc-400 text-lg">
            Truth · Governance · Simulation · Proof
          </p>

          {/* Role & Tenant Info */}
          <div className="mt-4 flex items-center gap-4">
            <div className="px-3 py-1 bg-[#3E2BB8] bg-opacity-20 text-[#5739FB] text-sm">
              {role === 'platform_admin' && 'Platform Admin'}
              {role === 'org_admin' && `Org Admin: ${organizationName}`}
              {role === 'professional' && `Professional: ${professionalName}`}
            </div>
            <div className="text-sm text-zinc-500">
              Viewing {tenantScope} data
            </div>
          </div>

          {/* Tenant Selector (Platform Admin Only) */}
          {role === 'platform_admin' && (
            <div className="mt-6 flex gap-3">
              <span className="text-sm text-zinc-500 py-2">Scope:</span>
              {(['platform', 'org', 'professional'] as const).map((scope) => (
                <button
                  key={scope}
                  onClick={() => onTenantScopeChange(scope)}
                  className={`
                    px-4 py-2 text-sm transition-all
                    ${tenantScope === scope
                      ? 'bg-[#3E2BB8] text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }
                  `}
                >
                  {scope.charAt(0).toUpperCase() + scope.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <StatCard
            title="Now Live"
            value={stats.contentLive}
            subtitle="Active Deliveries"
            icon={Activity}
            color="#3E2BB8"
          />
          <StatCard
            title="Events Today"
            value={stats.eventsToday}
            subtitle="User Actions Captured"
            icon={Zap}
            color="#5739FB"
          />
          <StatCard
            title="Proofs Today"
            value={stats.proofsToday}
            subtitle="Artifacts Secured"
            icon={Shield}
            color="#7B61FF"
          />
          <StatCard
            title="Safety Blocks"
            value={stats.blocksToday}
            subtitle="Interventions Prevented"
            icon={Shield}
            color="#FF6B6B"
          />
          <StatCard
            title="Open Rate"
            value={`${stats.openRate}%`}
            subtitle="Delivery Engagement"
            icon={CheckCircle}
            color="#4ECDC4"
          />
          <StatCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            subtitle="Finished Interventions"
            icon={Users}
            color="#95E1D3"
          />
        </div>

        {/* Soundbite Analytics (if in GOVERN mode) */}
        {mode === 'govern' && (
          <div className="mb-16">
            <SoundbiteAnalytics />
          </div>
        )}

        {/* Studio Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Studios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* FEATURED: Installation System Explorer - NEW DEMO INTERFACE */}
            <StudioCard
              id="installation-system-explorer"
              title="Installation System Explorer"
              description="Interactive demonstration · Paradigm shift · Eight Primitives · Live installations"
              icon={Brain}
              color="#3E2BB8"
              onClick={() => onStudioOpen('installation-system-explorer')}
            />
            
            {/* FEATURED: Installation Control Plane - Available to all roles */}
            <StudioCard
              id="installation-control-plane"
              title="Installation Control Plane"
              description="Nervous system programming command center · Execute & prove installations"
              icon={Brain}
              color="#3E2BB8"
              onClick={() => onStudioOpen('installation-control-plane')}
            />
            
            {/* FEATURED: Algorithm Visualizer - Available to all roles */}
            <StudioCard
              id="algorithm-visualizer"
              title="Algorithm Visualizer"
              description="Complete system architecture: how Recoverlution works"
              icon={Brain}
              color="#3E2BB8"
              onClick={() => onStudioOpen('algorithm-visualizer')}
            />

            {/* FEATURED: Taxonomy Exploration Engine - NEW */}
            <StudioCard
              id="taxonomy-exploration-engine"
              title="Taxonomy Exploration Engine"
              description="Navigate the three-layer system: Clinical targets · Delivery specs · Content"
              icon={Layers}
              color="#5739FB"
              onClick={() => onStudioOpen('taxonomy-exploration-engine')}
            />

            {/* BUILD STUDIOS - Available to all roles */}
            <StudioCard
              id="navicue"
              title="NaviCue Studio"
              description="Design provocations & engagement units"
              icon={Zap}
              color="#3E2BB8"
              onClick={() => onStudioOpen('navicue')}
            />
            <StudioCard
              id="mindblock"
              title="Mindblock Studio"
              description="Manage 2,400 mindblocks across 200 families"
              icon={Flame}
              color="#f97316"
              onClick={() => onStudioOpen('mindblock')}
            />
            <StudioCard
              id="protocol"
              title="Protocol Studio"
              description="Journey analytics & synthetic data testing"
              icon={Database}
              color="#3b82f6"
              onClick={() => onStudioOpen('protocol')}
            />
            <StudioCard
              id="individual-data"
              title="Individual Data"
              description="Track patient engagement and clinical progress"
              icon={User}
              color="#10b981"
              onClick={() => onStudioOpen('individual-data')}
            />
            <StudioCard
              id="wellbeing"
              title="Wellbeing Studio"
              description="Video library & JW Player sync"
              icon={Activity}
              color="#5739FB"
              onClick={() => onStudioOpen('wellbeing')}
            />
            <StudioCard
              id="journey"
              title="Journey Studio"
              description="Build therapeutic journeys"
              icon={Database}
              color="#7B61FF"
              onClick={() => onStudioOpen('journey')}
            />
            <StudioCard
              id="content-assembly"
              title="Content Assembly Lab"
              description="Compose multi-modal content"
              icon={CheckCircle}
              color="#9D88FF"
              onClick={() => onStudioOpen('content-assembly')}
            />
            <StudioCard
              id="navicue-playground"
              title="NaviCue Playground"
              description="Test & preview 1000 engagement units"
              icon={Zap}
              color="#B8A3FF"
              onClick={() => onStudioOpen('navicue-playground')}
            />
            <StudioCard
              id="navicue-sync"
              title="NaviCue Sync"
              description="Sync to Notion & manage deployments"
              icon={Database}
              color="#D4C5FF"
              onClick={() => onStudioOpen('navicue-sync')}
            />
            
            {/* Platform Admin Studios */}
            {role === 'platform_admin' && (
              <>
                <StudioCard
                  id="registry"
                  title="Registry Studio"
                  description="Content · Deliveries · Variants"
                  icon={Database}
                  color="#3E2BB8"
                  onClick={() => onStudioOpen('registry')}
                />
                <StudioCard
                  id="events"
                  title="Event Explorer"
                  description="Event Spine Query"
                  icon={Activity}
                  color="#5739FB"
                  onClick={() => onStudioOpen('events')}
                />
                <StudioCard
                  id="proofs"
                  title="Proof Ledger"
                  description="Artifacts · Transfer · Durability"
                  icon={Shield}
                  color="#7B61FF"
                  onClick={() => onStudioOpen('proofs')}
                />
                <StudioCard
                  id="simulation"
                  title="Simulation Lab"
                  description="LUMA replay & scenario testing"
                  icon={Zap}
                  color="#9D88FF"
                  onClick={() => onStudioOpen('simulation')}
                />
                <StudioCard
                  id="enrichment"
                  title="Media Enrichment"
                  description="Admin only · Trigger asset enrichment & backfill operations"
                  icon={Image}
                  color="#40E0D0"
                  onClick={() => onStudioOpen('enrichment')}
                />
                <StudioCard
                  id="ai-tagging"
                  title="AI Tagging Assistant"
                  description="Gemini 2.0 Flash · Automatic taxonomy mapping · Marketing asset intelligence"
                  icon={Bot}
                  color="#5739FB"
                  onClick={() => onStudioOpen('ai-tagging')}
                />
                <StudioCard
                  id="synthetics"
                  title="Synthetics Engine"
                  description="Continuous synthetic data generation · Monitor activity flow"
                  icon={TrendingUp}
                  color="#7C67FF"
                  onClick={() => onStudioOpen('synthetics')}
                />
                <StudioCard
                  id="settings"
                  title="Settings"
                  description="Configure system parameters"
                  icon={Settings}
                  color="#FF6B6B"
                  onClick={() => onStudioOpen('settings')}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}