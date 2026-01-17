/**
 * JOURNEY ROOM PAGE - Rich preview of single journey
 * Platform dimension: Deep dive before beginning
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, Play, CheckCircle, Clock } from 'lucide-react';
import { UniversalPlayer } from '../universal-player/UniversalPlayer';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface Journey {
  id: string;
  anchor: string;
  pillar_name: string;
  concept_name: string;
  theme_name: string;
  description: string;
  era_headlines: {
    experience: string;
    recognize: string;
    align: string;
  };
  anchor_guides: {
    experience: string;
    recognize: string;
    align: string;
  };
  scenes: any[];
}

interface JourneyRoomPageProps {
  journeyId: string;
  onNavigate?: (page: string) => void;
}

export function JourneyRoomPage({ journeyId, onNavigate }: JourneyRoomPageProps) {
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  useEffect(() => {
    loadJourney();
  }, [journeyId]);

  async function loadJourney() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/blocks/${journeyId}`,
        {
          headers: {
            'Authorization': `Bearer ${session?.access_token || publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.block) {
          setJourney(data.block);
        }
      }
    } catch (error) {
      console.error('Error loading journey:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleBegin() {
    setCurrentSceneIndex(0);
    setShowPlayer(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-zinc-400">Loading journey...</div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-zinc-400">Journey not found</div>
      </div>
    );
  }

  const totalMinutes = Math.round(journey.scenes.reduce((sum, s) => sum + (s.duration_minutes || 0), 0));

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          <button
            onClick={() => onNavigate?.('journey-library')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-zinc-500 mb-2">{journey.pillar_name}</div>
              <h1 className="text-5xl font-bold text-white mb-4">{journey.anchor}</h1>
              <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                {journey.description}
              </p>
            </div>
            <button
              onClick={handleBegin}
              className="flex items-center gap-3 px-8 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] text-white text-lg transition-colors"
            >
              <Play className="w-6 h-6" />
              Begin Journey
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-12 space-y-12">
        {/* ERA Framework */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">The Journey Arc</h2>
          <div className="grid grid-cols-3 gap-6">
            <ERAPhaseCard
              phase="Experience"
              headline={journey.era_headlines.experience}
              guide={journey.anchor_guides.experience}
            />
            <ERAPhaseCard
              phase="Recognize"
              headline={journey.era_headlines.recognize}
              guide={journey.anchor_guides.recognize}
            />
            <ERAPhaseCard
              phase="Align"
              headline={journey.era_headlines.align}
              guide={journey.anchor_guides.align}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-black/40 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-[#5739FB]" />
              <span className="text-3xl font-bold text-white">{journey.scenes.length}</span>
            </div>
            <div className="text-sm text-zinc-400">Scenes</div>
          </div>
          <div className="bg-black/40 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#5739FB]" />
              <span className="text-3xl font-bold text-white">~{totalMinutes}</span>
            </div>
            <div className="text-sm text-zinc-400">Minutes Total</div>
          </div>
          <div className="bg-black/40 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <div className="text-sm text-zinc-400">ERA Phases</div>
          </div>
        </div>

        {/* Scene Preview */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">What to Expect</h2>
          <div className="space-y-3">
            {journey.scenes.map((scene, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-black/40 border border-white/10"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#3E2BB8]/20 text-[#5739FB] font-bold">
                  {scene.sequence}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium mb-1">{scene.headline}</div>
                  <div className="flex items-center gap-3 text-sm text-zinc-500">
                    <span>{scene.type.replace(/_/g, ' ')}</span>
                    {scene.phase && <span>· {scene.phase}</span>}
                    {scene.duration_minutes && <span>· {scene.duration_minutes} min</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 bg-gradient-to-b from-transparent via-[#3E2BB8]/10 to-transparent">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to begin?</h3>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            This journey will guide you through {journey.scenes.length} scenes over the next week.
          </p>
          <button
            onClick={handleBegin}
            className="flex items-center gap-3 px-10 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] text-white text-lg mx-auto transition-colors"
          >
            <Play className="w-6 h-6" />
            Begin Journey
          </button>
        </div>
      </div>

      {/* Universal Player */}
      {showPlayer && journey && (
        <UniversalPlayer
          content={{
            journey_id: journey.id,
            journey_name: journey.anchor,
            scene: journey.scenes[currentSceneIndex],
            total_scenes: journey.scenes.length,
            current_scene: currentSceneIndex + 1,
          }}
          contentType="journey_scene"
          onClose={() => setShowPlayer(false)}
          onResponse={(response) => {
            console.log('[JourneyRoom] Scene response:', response);
            if (currentSceneIndex < journey.scenes.length - 1) {
              setCurrentSceneIndex(currentSceneIndex + 1);
            } else {
              setShowPlayer(false);
              onNavigate?.('dashboard');
            }
          }}
        />
      )}
    </div>
  );
}

interface ERAPhaseCardProps {
  phase: string;
  headline: string;
  guide: string;
}

function ERAPhaseCard({ phase, headline, guide }: ERAPhaseCardProps) {
  return (
    <div className="bg-black/40 border border-white/10 p-6">
      <div className="text-xs text-zinc-500 mb-3">{phase.toUpperCase()}</div>
      <h3 className="text-xl font-bold text-white mb-3">{headline}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{guide}</p>
    </div>
  );
}
