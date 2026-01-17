/**
 * JOURNEY LIBRARY BROWSER - Browse all journeys in CC2
 * Shows all 64 journey templates with metadata, stats, and edit options
 */

import { useState, useEffect } from 'react';
import { Play, Edit, Copy, Trash2, CheckCircle, Clock, Users, Filter } from 'lucide-react';
import { fetchAllJourneyTemplates, groupJourneysByPillar, getPillarInfo } from '../../../../utils/journeyRuntimeApi';

interface JourneyTemplate {
  id: string;
  pillar_id: string;
  title: string;
  description?: string;
  pillar_name?: string;
  [key: string]: any;
}

interface JourneyLibraryBrowserProps {
  onSelect: (journeyId: string) => void;
  onCreateNew: () => void;
}

export function JourneyLibraryBrowser({ onSelect, onCreateNew }: JourneyLibraryBrowserProps) {
  const [journeys, setJourneys] = useState<JourneyTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pillarFilter, setPillarFilter] = useState<string | null>(null);

  useEffect(() => {
    loadJourneys();
  }, []);

  async function loadJourneys() {
    try {
      const data = await fetchAllJourneyTemplates();
      setJourneys(data);
    } catch (error) {
      console.error('Error loading journeys:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredJourneys = journeys.filter(j => {
    const matchesSearch = (j.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (j.pillar_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (j.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPillar = !pillarFilter || j.pillar_id === pillarFilter;
    return matchesSearch && matchesPillar;
  });

  const groupedJourneys = groupJourneysByPillar(filteredJourneys);
  // Use FULL pillar_ids as they exist in Supabase (not abbreviated)
  const pillarOrder = [
    'onboarding',
    'emotional_regulation', 
    'stress_resilience',
    'social_connectivity',
    'cognitive_reframing',
    'identity_integration',
    'decision_mastery'
  ];
  const uniquePillars = Array.from(new Set(journeys.map(j => j.pillar_id)));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-400">Loading journey library...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search journeys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 bg-black/40 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#5739FB]"
        />
        <select
          value={pillarFilter || ''}
          onChange={(e) => setPillarFilter(e.target.value || null)}
          className="px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#5739FB]"
        >
          <option value="">All Pillars</option>
          {pillarOrder.map(pillarId => {
            if (!uniquePillars.includes(pillarId)) return null;
            const pillarInfo = getPillarInfo(pillarId);
            return (
              <option key={pillarId} value={pillarId}>{pillarInfo.name}</option>
            );
          })}
        </select>
        <button
          onClick={onCreateNew}
          className="px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors whitespace-nowrap"
        >
          Create New Journey
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-black/40 border border-white/[0.05] p-4">
          <div className="text-2xl font-bold text-white mb-1">{journeys.length}</div>
          <div className="text-xs text-zinc-500">Total Journeys</div>
        </div>
        <div className="bg-black/40 border border-white/[0.05] p-4">
          <div className="text-2xl font-bold text-white mb-1">{uniquePillars.length}</div>
          <div className="text-xs text-zinc-500">Pillars</div>
        </div>
        <div className="bg-black/40 border border-white/[0.05] p-4">
          <div className="text-2xl font-bold text-white mb-1">
            {journeys.reduce((sum, j) => sum + (j.total_scenes || 13), 0)}
          </div>
          <div className="text-xs text-zinc-500">Total Scenes</div>
        </div>
        <div className="bg-black/40 border border-white/[0.05] p-4">
          <div className="text-2xl font-bold text-white mb-1">
            {journeys.filter(j => j.is_onboarding).length}
          </div>
          <div className="text-xs text-zinc-500">Onboarding</div>
        </div>
      </div>

      {/* Grouped by Pillar */}
      {filteredJourneys.length > 0 ? (
        <div className="space-y-8">
          {pillarOrder.map(pillarId => {
            const pillarJourneys = groupedJourneys[pillarId] || [];
            if (pillarJourneys.length === 0) return null;
            
            const pillarInfo = getPillarInfo(pillarId);
            
            return (
              <div key={pillarId}>
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-1 h-8" 
                    style={{ backgroundColor: pillarInfo.color }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{pillarInfo.name}</h3>
                    <p className="text-xs text-zinc-500">{pillarJourneys.length} journeys</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {pillarJourneys.map((journey) => (
                    <JourneyCard
                      key={journey.id}
                      journey={journey}
                      onEdit={() => onSelect(journey.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-zinc-400">
            {searchTerm || pillarFilter ? 'No journeys match your filters' : 'No journeys yet'}
          </p>
          <button
            onClick={onCreateNew}
            className="mt-4 px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
          >
            Create Your First Journey
          </button>
        </div>
      )}
    </div>
  );
}

interface JourneyCardProps {
  journey: JourneyTemplate;
  onEdit: () => void;
}

function JourneyCard({ journey, onEdit }: JourneyCardProps) {
  return (
    <div className="bg-black/40 border border-white/10 p-6 hover:border-[#5739FB]/50 transition-colors group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="text-xs text-zinc-500 mb-1">{journey.pillar_name}</div>
          <h3 className="text-xl font-bold text-white mb-2">{journey.title}</h3>
          <p className="text-sm text-zinc-400 line-clamp-2">{journey.description}</p>
        </div>
      </div>

      {/* ERA Headlines */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/5 p-3">
          <div className="text-xs text-zinc-500 mb-1">Experience</div>
          <div className="text-sm text-white line-clamp-2">{journey.era_experience_headline}</div>
        </div>
        <div className="bg-white/5 p-3">
          <div className="text-xs text-zinc-500 mb-1">Recognize</div>
          <div className="text-sm text-white line-clamp-2">{journey.era_recognize_headline}</div>
        </div>
        <div className="bg-white/5 p-3">
          <div className="text-xs text-zinc-500 mb-1">Align</div>
          <div className="text-sm text-white line-clamp-2">{journey.era_align_headline}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <CheckCircle className="w-4 h-4" />
          <span>{journey.total_scenes} Scenes</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className="w-4 h-4" />
          <span>~{journey.duration_minutes} min</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Users className="w-4 h-4" />
          <span>0 Active</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Journey
        </button>
        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white transition-colors">
          <Copy className="w-4 h-4" />
        </button>
        <button className="px-4 py-2 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}