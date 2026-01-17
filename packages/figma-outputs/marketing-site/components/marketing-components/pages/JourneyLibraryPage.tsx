/**
 * JOURNEY LIBRARY PAGE - User-facing journey browser
 * Platform dimension: Discovery & exploration
 */

import { useState, useEffect } from 'react';
import { Play, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface Journey {
  id: string;
  anchor: string;
  pillar_name: string;
  concept_name: string;
  description: string;
  era_headlines: {
    experience: string;
    recognize: string;
    align: string;
  };
  scenes: any[];
}

interface JourneyLibraryPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function JourneyLibraryPage({ onNavigate }: JourneyLibraryPageProps) {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const pillars = [
    'All Journeys',
    'Emotional Regulation',
    'Stress Resilience',
    'Social Connectivity',
    'Cognitive Reframing',
    'Identity Integration',
    'Decision Mastery',
  ];

  useEffect(() => {
    loadJourneys();
  }, []);

  async function loadJourneys() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/blocks/buy-2-seconds`,
        {
          headers: {
            'Authorization': `Bearer ${session?.access_token || publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.block) {
          setJourneys([data.block]);
        }
      }
    } catch (error) {
      console.error('Error loading journeys:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredJourneys = selectedPillar && selectedPillar !== 'All Journeys'
    ? journeys.filter(j => j.pillar_name === selectedPillar)
    : journeys;

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      {/* Hero */}
      <div className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Journey Library
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            13-scene transformational arcs. Guided. Grounded. Built to last.
          </p>
        </div>
      </div>

      {/* Pillar Filter */}
      <div className="border-b border-white/5 bg-black/40">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="flex gap-3 overflow-x-auto">
            {pillars.map((pillar) => (
              <button
                key={pillar}
                onClick={() => setSelectedPillar(pillar === 'All Journeys' ? null : pillar)}
                className={`
                  px-6 py-2 whitespace-nowrap transition-all
                  ${(pillar === 'All Journeys' && !selectedPillar) || pillar === selectedPillar
                    ? 'bg-[#3E2BB8] text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {pillar}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Grid */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {loading ? (
          <div className="text-center py-24">
            <div className="text-zinc-400">Loading journeys...</div>
          </div>
        ) : filteredJourneys.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJourneys.map((journey) => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                onSelect={() => onNavigate?.('journey-room', { journeyId: journey.id })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-zinc-400">
              {selectedPillar ? `No journeys in ${selectedPillar}` : 'No journeys available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface JourneyCardProps {
  journey: Journey;
  onSelect: () => void;
}

function JourneyCard({ journey, onSelect }: JourneyCardProps) {
  const totalMinutes = Math.round(journey.scenes.reduce((sum, s) => sum + (s.duration_minutes || 0), 0));

  return (
    <button
      onClick={onSelect}
      className="text-left bg-black/40 border border-white/10 hover:border-[#5739FB]/50 p-8 transition-all group"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs text-zinc-500 mb-2">{journey.pillar_name}</div>
        <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-[#5739FB] transition-colors">
          {journey.anchor}
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          {journey.description}
        </p>
      </div>

      {/* ERA Preview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 p-4">
          <div className="text-xs text-zinc-500 mb-2">EXPERIENCE</div>
          <div className="text-sm font-medium text-white">{journey.era_headlines.experience}</div>
        </div>
        <div className="bg-white/5 p-4">
          <div className="text-xs text-zinc-500 mb-2">RECOGNIZE</div>
          <div className="text-sm font-medium text-white">{journey.era_headlines.recognize}</div>
        </div>
        <div className="bg-white/5 p-4">
          <div className="text-xs text-zinc-500 mb-2">ALIGN</div>
          <div className="text-sm font-medium text-white">{journey.era_headlines.align}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{journey.scenes.length} Scenes</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>~{totalMinutes} min</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#5739FB] group-hover:gap-3 transition-all">
          <span className="text-sm font-medium">Enter Journey</span>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
}
