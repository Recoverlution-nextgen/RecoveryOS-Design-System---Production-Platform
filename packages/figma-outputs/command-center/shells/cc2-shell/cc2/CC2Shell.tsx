import { useState } from 'react';
import { Database, Shield, Brain, BarChart3, Play, ChevronRight } from 'lucide-react';
import EnrichmentPanel from '../admin/EnrichmentPanel';
import AITaggingAssistant from '../admin/AITaggingAssistant';

type CC2Mode = 'BUILD' | 'GOVERN' | 'SIMULATE' | 'PROVE';

interface CC2ShellProps {
  onNavigate?: (page: string) => void;
}

export function CC2Shell({ onNavigate }: CC2ShellProps) {
  const [mode, setMode] = useState<CC2Mode>('BUILD');
  const [activeStudio, setActiveStudio] = useState<string | null>(null);

  const modes = [
    { id: 'BUILD' as CC2Mode, label: 'BUILD', icon: Database, color: '#3E2BB8' },
    { id: 'GOVERN' as CC2Mode, label: 'GOVERN', icon: Shield, color: '#5739FB' },
    { id: 'SIMULATE' as CC2Mode, label: 'SIMULATE', icon: Brain, color: '#7B61FF' },
    { id: 'PROVE' as CC2Mode, label: 'PROVE', icon: BarChart3, color: '#9D88FF' },
  ];

  const studios = {
    BUILD: [
      { id: 'registry', label: 'Registry Studio', desc: 'Content · Deliveries · Variants' },
      { id: 'player', label: 'Player Preview', desc: 'Universal Player Rendering' },
      { id: 'journey', label: 'Journey Studio', desc: '13 Scenes · ERA Phases' },
      { id: 'assembly', label: 'Content Assembly', desc: 'Articles · Insights · Practices' },
      { id: 'wellbeing', label: 'Wellbeing Studio', desc: 'Video Library · Schema' },
      { id: 'orbit', label: 'Orbit Studio', desc: '6S Configuration' },
    ],
    GOVERN: [
      { id: 'policies', label: 'Safety Policies', desc: 'Pre-rank Governance' },
      { id: 'reviews', label: 'Review Queue', desc: 'Clinical Approval Workflow' },
      { id: 'consent', label: 'Consent Manager', desc: 'Privacy · Portability' },
      { id: 'lifecycle', label: 'Lifecycle Manager', desc: 'Draft → Publish → Deprecate' },
      { id: 'releases', label: 'Release Manager', desc: 'Deployments · Rollbacks' },
      { id: 'enrichment', label: 'Media Enrichment', desc: 'Asset Metadata Sync' },
      { id: 'ai-tagging', label: 'AI Tagging Assistant', desc: 'Gemini Taxonomy Mapping' },
    ],
    SIMULATE: [
      { id: 'replay', label: 'Replay Timeline', desc: 'User Journey Replay' },
      { id: 'decisions', label: 'Decision Inspector', desc: 'WhyNow Breakdown' },
      { id: 'scenarios', label: 'Scenario Simulator', desc: 'What If Testing' },
    ],
    PROVE: [
      { id: 'events', label: 'Event Explorer', desc: 'Event Spine Query' },
      { id: 'proof', label: 'Proof Ledger', desc: 'Artifacts · Transfer · Durability' },
      { id: 'analytics', label: 'Cohort Analytics', desc: 'Org Reporting' },
      { id: 'audit', label: 'Audit Log', desc: 'Change History' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl tracking-tight text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                COMMAND CENTER 2
              </h1>
              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'var(--font-sans)' }}>
                Recovery Operating System · Control Plane
              </p>
            </div>
            <button
              onClick={() => onNavigate?.('home')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Exit to Platform
            </button>
          </div>
        </div>
      </header>

      {/* Mode Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex gap-1">
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id);
                    setActiveStudio(null);
                  }}
                  className={`px-6 py-3 text-sm flex items-center gap-2 border-b-2 transition-all ${
                    isActive
                      ? 'border-[#3E2BB8] text-[#3E2BB8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Studio Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-140px)] overflow-y-auto">
          <div className="p-4">
            <div className="text-xs text-gray-500 mb-3 tracking-wide" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {mode} STUDIOS
            </div>
            <div className="space-y-1">
              {studios[mode].map((studio) => (
                <button
                  key={studio.id}
                  onClick={() => setActiveStudio(studio.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeStudio === studio.id
                      ? 'bg-[#3E2BB8]/5 border border-[#3E2BB8]/20'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className={`text-sm mb-1 ${
                          activeStudio === studio.id ? 'text-[#3E2BB8]' : 'text-gray-900'
                        }`}
                        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                      >
                        {studio.label}
                      </div>
                      <div className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>
                        {studio.desc}
                      </div>
                    </div>
                    {activeStudio === studio.id && <ChevronRight className="w-4 h-4 text-[#3E2BB8]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Studio Content Area */}
        <main className="flex-1 p-6 h-[calc(100vh-140px)] overflow-y-auto">
          {!activeStudio ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>
                  Select a studio to begin
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* Studio content will be rendered based on activeStudio + mode */}
              {mode === 'BUILD' && activeStudio === 'registry' && (
                <div className="text-sm text-gray-600">Registry Studio loading...</div>
              )}
              {mode === 'SIMULATE' && activeStudio === 'replay' && (
                <div className="text-sm text-gray-600">Replay Timeline loading...</div>
              )}
              {mode === 'PROVE' && activeStudio === 'events' && (
                <div className="text-sm text-gray-600">Event Explorer loading...</div>
              )}
              {mode === 'PROVE' && activeStudio === 'proof' && (
                <div className="text-sm text-gray-600">Proof Ledger loading...</div>
              )}
              
              {/* Media Enrichment Panel */}
              {mode === 'GOVERN' && activeStudio === 'enrichment' && (
                <EnrichmentPanel onBack={() => setActiveStudio(null)} />
              )}
              
              {/* AI Tagging Assistant */}
              {mode === 'GOVERN' && activeStudio === 'ai-tagging' && (
                <AITaggingAssistant onBack={() => setActiveStudio(null)} />
              )}
              
              {/* Fallback */}
              {!(['registry', 'replay', 'events', 'proof', 'enrichment', 'ai-tagging'].some(s => s === activeStudio)) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <Play className="w-5 h-5 text-[#3E2BB8] mt-1" />
                    <div>
                      <h3 className="text-lg text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {studios[mode].find(s => s.id === activeStudio)?.label}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                        {studios[mode].find(s => s.id === activeStudio)?.desc}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-xs text-gray-500">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        Studio in development
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}