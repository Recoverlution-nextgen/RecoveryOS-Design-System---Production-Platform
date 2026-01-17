/**
 * Journey Player - Contract-Compliant Frontend
 * 
 * Implements the Journey Player Contract:
 * - Pulls full payload from one API call
 * - Renders scenes polymorphically based on scene_type
 * - Handles NaviCue responses via response_type
 * - Submits responses with automatic progress tracking
 * 
 * GOLDEN RULES:
 * 1. Never constructs content - only renders payload
 * 2. Uses navicue_id as stable key
 * 3. Treats uuid as opaque
 * 4. No pillar label dependencies
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';
import { projectId } from '../../utils/supabase/info';
import { NaviCueResponseHandler } from './NaviCueResponseHandler';

// Initialize Supabase client once
const supabase = createClient();

// ============================================================================
// TYPES (from contract)
// ============================================================================

export interface JourneyPayload {
  journey: {
    journey_id: string;
    title: string;
    description?: string;
    version: string;
    status: string;
    estimated_duration?: number;
  };
  resume: {
    last_completed_scene_number: number;
    in_progress_scene_number: number;
    completed_scene_numbers: number[];
    responses_by_scene: Record<string, any>;
  };
  scenes: Scene[];
}

export interface Scene {
  scene_id: string;
  scene_number: number;
  scene_type: string;
  title: string;
  era_phase?: string;
  content: any;
  navicues: NaviCue[];
  gating: {
    requires_response?: boolean;
    requires_all_navicues_completed?: boolean;
    min_seconds_on_scene?: number;
    allow_skip?: boolean;
    skip_penalty?: 'none' | 'mark_incomplete';
  };
  next: {
    mode: 'linear' | 'branching';
    branches?: any;
  };
}

export interface NaviCue {
  navicue_id: string;
  id: string;
  name: string;
  family: string;
  text_line: string;
  track: string;
  pillar_id: string;
  kbe_layer: string;
  intent_primary: string;
  intent_secondary?: string;
  delivery_mechanism: string;
  voice_archetype: string;
  response_type: string;
  response_options: any;
}

interface JourneyPlayerProps {
  journeyId: string;
  userId: string;
  onComplete?: () => void;
  onExit?: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function JourneyPlayer({ 
  journeyId, 
  userId,
  onComplete,
  onExit 
}: JourneyPlayerProps) {
  const [payload, setPayload] = useState<JourneyPayload | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [sceneStartTime, setSceneStartTime] = useState<number>(Date.now());
  
  // Load journey payload on mount
  useEffect(() => {
    loadJourneyPayload();
  }, [journeyId, userId]);

  // Track scene start time whenever scene changes
  useEffect(() => {
    setSceneStartTime(Date.now());
    
    if (payload && currentSceneIndex < payload.scenes.length) {
      trackAnalytics('scene_viewed', {
        scene_id: currentScene?.scene_id,
        scene_number: currentScene?.scene_number,
        scene_type: currentScene?.scene_type
      });
    }
  }, [currentSceneIndex]);

  const loadJourneyPayload = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey-player/payload/${journeyId}/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load journey');
      }

      const data: JourneyPayload = await response.json();
      setPayload(data);
      
      // Resume from where user left off
      if (data.resume.in_progress_scene_number > 1) {
        setCurrentSceneIndex(data.resume.in_progress_scene_number - 1);
      }

      // Track journey started (if first scene)
      if (data.resume.completed_scene_numbers.length === 0) {
        trackAnalytics('journey_started', {
          journey_id: journeyId,
          title: data.journey.title
        });
      }

    } catch (err: any) {
      console.error('Error loading journey:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async (navicueId: string, responseType: string, responseData: any) => {
    if (!payload || !currentScene) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey-player/response`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            journey_id: journeyId,
            scene_id: currentScene.scene_id,
            scene_number: currentScene.scene_number,
            navicue_id: navicueId,
            response_type: responseType,
            response: responseData
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit response');
      }

      const result = await response.json();
      
      // Update local responses
      setResponses(prev => ({
        ...prev,
        [navicueId]: responseData
      }));

      // Track analytics
      trackAnalytics('response_submitted', {
        navicue_id: navicueId,
        response_type: responseType,
        scene_id: currentScene.scene_id
      });

      // If scene completed, track it
      if (result.scene_completed) {
        trackAnalytics('scene_completed', {
          scene_id: currentScene.scene_id,
          scene_number: currentScene.scene_number
        });
      }

      return result;

    } catch (err: any) {
      console.error('Error submitting response:', err);
      throw err;
    }
  };

  const trackAnalytics = async (eventType: string, eventData: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey-player/analytics`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            journey_id: journeyId,
            event_type: eventType,
            event_data: eventData
          })
        }
      );
    } catch (err) {
      // Analytics failures should not block user flow
      console.error('Analytics error:', err);
    }
  };

  const handleNext = () => {
    if (!payload) return;

    // Check gating rules
    if (currentScene?.gating.requires_all_navicues_completed) {
      const allCompleted = currentScene.navicues.every(nc => 
        responses.hasOwnProperty(nc.navicue_id)
      );
      
      if (!allCompleted) {
        alert('Please complete all prompts before continuing');
        return;
      }
    }

    if (currentScene?.gating.min_seconds_on_scene) {
      const timeOnScene = (Date.now() - sceneStartTime) / 1000;
      if (timeOnScene < currentScene.gating.min_seconds_on_scene) {
        const remaining = Math.ceil(currentScene.gating.min_seconds_on_scene - timeOnScene);
        alert(`Please spend ${remaining} more seconds with this content`);
        return;
      }
    }

    // Move to next scene
    if (currentSceneIndex < payload.scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setResponses({}); // Clear responses for new scene
    } else {
      // Journey completed
      trackAnalytics('journey_completed', {
        journey_id: journeyId,
        total_scenes: payload.scenes.length
      });
      
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
      setResponses({}); // Clear responses
    } else {
      if (onExit) {
        onExit();
      }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A0118] via-[#1a0a2e] to-[#0A0118] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#5739FB] animate-spin" />
          <p className="text-white/60">Loading your journey...</p>
        </div>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A0118] via-[#1a0a2e] to-[#0A0118] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <p className="text-white text-xl mb-4">Unable to load journey</p>
          <p className="text-white/60 text-sm mb-6">{error}</p>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentScene = payload.scenes[currentSceneIndex];
  const progress = ((currentSceneIndex + 1) / payload.scenes.length) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0118] via-[#1a0a2e] to-[#0A0118] overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex-1 mx-6">
            <div className="h-1 bg-white/10 backdrop-blur-sm overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="text-white/60 text-sm">
            {currentSceneIndex + 1} / {payload.scenes.length}
          </div>
        </div>
      </div>

      {/* Scene Content */}
      <div className="absolute inset-0 pt-24 pb-32 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.scene_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-6"
          >
            {/* Scene Header */}
            <div className="mb-8">
              {currentScene.era_phase && (
                <div className="inline-block px-3 py-1 bg-[#3E2BB8]/20 backdrop-blur-sm border border-[#3E2BB8]/30 text-[#5739FB] text-sm mb-4">
                  {currentScene.era_phase}
                </div>
              )}
              <h1 className="text-white text-3xl mb-2">{currentScene.title}</h1>
              {currentScene.content?.description && (
                <p className="text-white/60">{currentScene.content.description}</p>
              )}
            </div>

            {/* NaviCues */}
            <div className="space-y-8">
              {currentScene.navicues.map((navicue, index) => (
                <div key={navicue.navicue_id}>
                  <NaviCueResponseHandler
                    navicue={navicue}
                    onResponse={(responseData) => submitResponse(
                      navicue.navicue_id,
                      navicue.response_type,
                      responseData
                    )}
                    currentResponse={responses[navicue.navicue_id]}
                  />
                </div>
              ))}
            </div>

            {/* Scene Content (if any additional) */}
            {currentScene.content?.body && (
              <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-white/80 whitespace-pre-wrap">{currentScene.content.body}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-white/60 text-sm">
            {currentScene.scene_type}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white transition-all"
          >
            {currentSceneIndex < payload.scenes.length - 1 ? (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Complete Journey
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}