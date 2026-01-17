/**
 * JOURNEY STUDIO - Complete Journey Management System
 * 
 * Architecture:
 * - Tab 1: PLAYER - Preview & test journeys
 * - Tab 2: PRODUCTION - Build & edit journeys
 * - Tab 3: ANALYTICS - Usage stats & outcomes
 * - Tab 4: MAPPING - Schema integration
 * 
 * Pattern: Same as NaviCue Arsenal but optimized for 13-scene journey structure
 */

import { useState, useEffect } from 'react';
import { Play, Hammer, BarChart3, Map, Plus } from 'lucide-react';
import { JourneyLibraryBrowser } from './journey/JourneyLibraryBrowser';
import { JourneyPlayground } from './journey/JourneyPlayground';
import { JourneyBuilder } from './journey/JourneyBuilder';
import { JourneyAnalytics } from './journey/JourneyAnalytics';
import { useUser } from '../../../contexts/UserContext';
import { fetchAllJourneyTemplates } from '../../../utils/journeyRuntimeApi';

interface JourneyStudioProps {
  onClose?: () => void;
}

type TabView = 'player' | 'production' | 'analytics' | 'mapping';

export function JourneyStudio({ onClose }: JourneyStudioProps) {
  const { role } = useUser();
  const [activeTab, setActiveTab] = useState<TabView>('player');
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [totalJourneys, setTotalJourneys] = useState(0);

  useEffect(() => {
    loadTotalCount();
  }, []);

  async function loadTotalCount() {
    try {
      const journeys = await fetchAllJourneyTemplates();
      setTotalJourneys(journeys.length);
    } catch (error) {
      console.error('[Journey Studio] Error loading journey count:', error);
    }
  }

  const tabs = [
    { id: 'player', label: 'Player', icon: Play, badge: totalJourneys || '...' },
    { id: 'production', label: 'Production Floor', icon: Hammer, badge: 'Build' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'Live' },
    { id: 'mapping', label: 'Schema Mapping', icon: Map, badge: 'Taxonomy' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0A0B0F]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Journey Studio
              </h1>
              <p className="text-zinc-400">
                13-Scene Transformational Arcs · ERA Framework · Universal Player Ready
              </p>
            </div>

            {activeTab === 'production' && (
              <button
                onClick={() => setShowBuilder(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Journey
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabView)}
                className={`
                  flex items-center gap-3 px-6 py-3 transition-all
                  ${activeTab === tab.id
                    ? 'bg-[#3E2BB8] text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
                {tab.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs
                    ${activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-zinc-800 text-zinc-400'
                    }
                  `}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {activeTab === 'player' && (
          <JourneyPlayground />
        )}

        {activeTab === 'production' && (
          <>
            {showBuilder ? (
              <JourneyBuilder
                journeyId={selectedJourneyId}
                onClose={() => {
                  setShowBuilder(false);
                  setSelectedJourneyId(null);
                }}
                onSave={() => {
                  setShowBuilder(false);
                  setSelectedJourneyId(null);
                  setTotalJourneys(prev => prev + 1);
                }}
              />
            ) : (
              <JourneyLibraryBrowser
                onSelect={(id) => {
                  setSelectedJourneyId(id);
                  setShowBuilder(true);
                }}
                onCreateNew={() => {
                  setSelectedJourneyId(null);
                  setShowBuilder(true);
                }}
              />
            )}
          </>
        )}

        {activeTab === 'analytics' && (
          <JourneyAnalytics />
        )}

        {activeTab === 'mapping' && (
          <div className="text-center py-24">
            <Map className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Schema Mapping</h3>
            <p className="text-zinc-400 max-w-md mx-auto">
              Map journeys to clinical taxonomy: Pillar → Concept → Theme → Journey
            </p>
            <p className="text-zinc-500 text-sm mt-4">Coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}