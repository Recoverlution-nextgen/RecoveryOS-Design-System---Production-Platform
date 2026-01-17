/**
 * TODAY PAGE - Daily landing page
 * Mobile dimension: Intimate, immediate, personal
 */

import { useState, useEffect } from 'react';
import { Play, ChevronRight, CheckCircle } from 'lucide-react';
import { UniversalPlayer } from '../universal-player/UniversalPlayer';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface TodayPageProps {
  onNavigate?: (page: string) => void;
}

export function TodayPage({ onNavigate }: TodayPageProps) {
  const [activeJourney, setActiveJourney] = useState<any>(null);
  const [currentScene, setCurrentScene] = useState<any>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodayContent();
  }, []);

  async function loadTodayContent() {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      // For now, load Buy 2 Seconds as active journey
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
          setActiveJourney(data.block);
          setCurrentScene(data.block.scenes[0]); // Demo: show first scene
        }
      }
    } catch (error) {
      console.error('Error loading today content:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleContinueJourney() {
    if (!activeJourney || !currentScene) return;
    setShowPlayer(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center">
        <div className="text-zinc-400">Loading today...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      {/* Hero */}
      <div className="border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <div className="text-sm text-zinc-500 mb-3">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Today
          </h1>
          <p className="text-xl text-zinc-400">
            Your daily practice. What matters now.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-12 space-y-8">
        {/* Active Journey */}
        {activeJourney && currentScene && (
          <div className="bg-black/40 border border-white/10 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs text-zinc-500 mb-2">Your Journey</div>
                <h2 className="text-3xl font-bold text-white mb-2">{activeJourney.anchor}</h2>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <span>Scene {currentScene.sequence} of {activeJourney.scenes.length}</span>
                  <span>·</span>
                  <span>{currentScene.phase || 'Introduction'}</span>
                </div>
              </div>
              <button
                onClick={handleContinueJourney}
                className="flex items-center gap-2 px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
              >
                <Play className="w-5 h-5" />
                Continue
              </button>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="h-2 w-full bg-white/5 overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB]"
                  style={{ width: `${(currentScene.sequence / activeJourney.scenes.length) * 100}%` }}
                />
              </div>
              <div className="text-xs text-zinc-500">
                {Math.round((currentScene.sequence / activeJourney.scenes.length) * 100)}% Complete
              </div>
            </div>

            {/* Today's Scene */}
            <div className="bg-white/5 p-6">
              <h3 className="text-xl font-bold text-white mb-3">{currentScene.headline}</h3>
              <p className="text-zinc-400 leading-relaxed line-clamp-3">
                {currentScene.context || currentScene.anchor_guide}
              </p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate?.('state')}
            className="text-left bg-black/40 border border-white/10 hover:border-[#5739FB]/50 p-6 transition-all group"
          >
            <div className="text-sm text-zinc-400 mb-2">Check In</div>
            <div className="text-xl font-bold text-white group-hover:text-[#5739FB] transition-colors">State</div>
          </button>
          
          <button
            onClick={() => onNavigate?.('navigate')}
            className="text-left bg-black/40 border border-white/10 hover:border-[#5739FB]/50 p-6 transition-all group"
          >
            <div className="text-sm text-zinc-400 mb-2">What's Next</div>
            <div className="text-xl font-bold text-white group-hover:text-[#5739FB] transition-colors">Navigate</div>
          </button>
          
          <button
            onClick={() => onNavigate?.('momentum')}
            className="text-left bg-black/40 border border-white/10 hover:border-[#5739FB]/50 p-6 transition-all group"
          >
            <div className="text-sm text-zinc-400 mb-2">Track Progress</div>
            <div className="text-xl font-bold text-white group-hover:text-[#5739FB] transition-colors">Momentum</div>
          </button>
        </div>

        {/* Empty State (if no active journey) */}
        {!activeJourney && (
          <div className="text-center py-24 bg-black/40 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to begin?</h3>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Start a journey to build lasting skills for recovery
            </p>
            <button
              onClick={() => onNavigate?.('journey-library')}
              className="flex items-center gap-2 px-8 py-4 bg-[#3E2BB8] hover:bg-[#5739FB] text-white mx-auto transition-colors"
            >
              Browse Journeys
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Universal Player */}
      {showPlayer && activeJourney && currentScene && (
        <UniversalPlayer
          content={{
            journey_id: activeJourney.id,
            journey_name: activeJourney.anchor,
            scene: currentScene,
            total_scenes: activeJourney.scenes.length,
            current_scene: currentScene.sequence,
          }}
          contentType="journey_scene"
          onClose={() => setShowPlayer(false)}
          onResponse={(response) => {
            console.log('[Today] Scene response:', response);
            setShowPlayer(false);
            // Reload to show next scene
            loadTodayContent();
          }}
        />
      )}
    </div>
  );
}
