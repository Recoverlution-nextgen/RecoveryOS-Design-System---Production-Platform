/**
 * JOURNEY PLAYGROUND - Test journeys in Universal Player
 * Uses NEW Journey Runtime API (January 2026)
 * - Browsing: Read journey_templates (legacy read-only)
 * - Playing: Start journey_instances via /journey-api/start
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Play, ChevronRight, CheckCircle, ChevronDown, ChevronUp, BookOpen, AudioLines } from 'lucide-react';
import { JourneyPlayer } from '../../../journey/JourneyPlayer';
import { 
  fetchAllJourneyTemplates,
  fetchTemplateScenes,
  groupJourneysByPillar,
  getPillarInfo,
  startJourney,
  getCurrentScene,
  completeScene,
  postAudioEvents,
  postCapture,
  type JourneyInstance,
  type JourneyTemplateScene,
} from '../../../../utils/journeyRuntimeApi';
import { useJourneyRealtime } from '../../../../hooks/useJourneyRealtime';
import { createClient } from '../../../../utils/supabase/client';

const supabase = createClient();

interface JourneyTemplate {
  id: string;
  pillar_id: string;
  title: string;
  description?: string;
  is_onboarding?: boolean;
  total_scenes?: number;
  duration_minutes?: number;
  [key: string]: any;
}

export function JourneyPlayground() {
  const [journeys, setJourneys] = useState<JourneyTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<JourneyTemplate | null>(null);
  const [templateScenes, setTemplateScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Default to expand 'onboarding' pillar (full name, not abbreviated 'ONB')
  const [expandedPillars, setExpandedPillars] = useState<Set<string>>(new Set(['onboarding']));
  
  // Journey Runtime state
  const [activeInstance, setActiveInstance] = useState<JourneyInstance | null>(null);
  const [currentScene, setCurrentScene] = useState<JourneyTemplateScene | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  
  // Audio telemetry
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const telemetryBuffer = useRef<any[]>([]);

  useEffect(() => {
    loadJourneys();
  }, []);

  async function loadJourneys() {
    try {
      const data = await fetchAllJourneyTemplates();
      
      // COMPREHENSIVE DIAGNOSTIC LOGGING
      console.log('═══════════════════════════════════════════════');
      console.log('[JourneyPlayground] POST-STATUS-FIX DIAGNOSTIC');
      console.log('═══════════════════════════════════════════════');
      console.log('✅ Total journeys loaded:', data.length);
      console.log('Expected: 64 (60 recovery sprints + 4 onboarding)');
      
      if (data.length === 0) {
        console.error('❌ STILL NO JOURNEYS - Possible RLS issue');
        console.error('Check: Does journey_template have RLS enabled?');
        console.error('Run: SELECT * FROM journey_template LIMIT 5; in SQL editor');
      } else if (data.length < 64) {
        console.warn(`⚠️ Only ${data.length}/64 journeys loaded`);
      } else {
        console.log('✅ All 64 journeys loaded successfully');
      }
      
      console.log('\nFirst 3 journeys:');
      data.slice(0, 3).forEach((j, i) => {
        console.log(`${i + 1}.`, {
          id: j.id,
          title: j.title,
          pillar_id: j.pillar_id,
          status: j.status,
          is_onboarding: j.is_onboarding,
        });
      });
      
      console.log('\nJourneys by pillar:');
      const grouped = data.reduce((acc, j) => {
        const key = j.pillar_id || 'NULL';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      console.log(grouped);
      
      console.log('\nAll statuses:');
      const statuses = [...new Set(data.map(j => j.status))];
      console.log(statuses);
      
      console.log('═══════════════════════════════════════════════');
      
      setJourneys(data);
      
      // AUTO-EXPAND ALL PILLARS so user can see everything
      const allPillarIds = new Set(data.map(j => j.pillar_id).filter(Boolean));
      console.log('[JourneyPlayground] Auto-expanding pillars:', Array.from(allPillarIds));
      setExpandedPillars(allPillarIds);
    } catch (error) {
      console.error('[JourneyPlayground] Error loading journeys:', error);
      console.error('Full error:', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectTemplate(template: JourneyTemplate) {
    console.log('[JourneyPlayground] Selected template:', template.title);
    setSelectedTemplate(template);
    
    // Load scenes for preview
    try {
      const scenes = await fetchTemplateScenes(template.id);
      console.log('[JourneyPlayground] Loaded template scenes:', {
        template: template.title,
        sceneCount: scenes.length,
      });
      setTemplateScenes(scenes);
    } catch (error) {
      console.error('[JourneyPlayground] Error loading template scenes:', error);
      setTemplateScenes([]);
    }
  }

  async function handleEnterJourney() {
    if (!selectedTemplate) {
      console.error('[JourneyPlayground] No template selected');
      return;
    }

    try {
      setLoading(true);
      
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      console.log('[JourneyPlayground] Starting journey instance:', {
        template: selectedTemplate.title,
        user: user.id,
      });

      // Start or resume journey instance via Runtime API
      const instance = await startJourney({
        individualId: user.id,
        templateId: selectedTemplate.id,
        source: 'cc2_playground',
      });

      console.log('[JourneyPlayground] Journey instance started:', instance);

      // Fetch current scene with signed audio URL
      const { instance: updatedInstance, scene } = await getCurrentScene(instance.id);

      console.log('[JourneyPlayground] Current scene loaded:', {
        scene_number: scene.scene_number,
        title: scene.title,
        has_audio: scene.signed_audio_url ? true : false,
      });

      setActiveInstance(updatedInstance);
      setCurrentScene(scene);
      setShowPlayer(true);
    } catch (error: any) {
      console.error('[JourneyPlayground] Error starting journey:', error);
      alert(`Failed to start journey: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function togglePillar(pillarId: string) {
    const newExpanded = new Set(expandedPillars);
    if (newExpanded.has(pillarId)) {
      newExpanded.delete(pillarId);
    } else {
      newExpanded.add(pillarId);
    }
    setExpandedPillars(newExpanded);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-400">Loading journey library...</div>
      </div>
    );
  }

  // Group journeys by pillar
  const groupedJourneys = groupJourneysByPillar(journeys);
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

  // DIAGNOSTIC: Log grouped journeys
  console.log('[JourneyPlayground] Grouped journeys:', {
    groupedJourneys,
    pillarOrder,
    totalJourneys: journeys.length,
    journeysWithPillarId: journeys.filter(j => j.pillar_id).length,
    sampleJourneys: journeys.slice(0, 3).map(j => ({
      id: j.id,
      title: j.title,
      pillar_id: j.pillar_id,
    })),
  });

  // DIAGNOSTIC: Show if no journeys at all
  if (journeys.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <div className="text-red-400 text-xl font-bold">⚠️ No Journeys Loaded</div>
          <div className="text-zinc-400">
            The journey_template table appears to be empty.
          </div>
          <div className="text-zinc-500 text-sm">
            Check Supabase: SELECT count(*) FROM journey_template;
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left: Journey Library */}
      <div className="col-span-5 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Journey Library</h2>
            <p className="text-sm text-zinc-500">{journeys.length} journeys · 7 pillars</p>
          </div>
        </div>

        {/* Pillar Groups */}
        <div className="space-y-3">
          {pillarOrder.map(pillarId => {
            const pillarJourneys = groupedJourneys[pillarId] || [];
            if (pillarJourneys.length === 0) return null;
            
            const pillarInfo = getPillarInfo(pillarId);
            const isExpanded = expandedPillars.has(pillarId);
            
            return (
              <div key={pillarId} className="border border-white/10">
                {/* Pillar Header */}
                <button
                  onClick={() => togglePillar(pillarId)}
                  className="w-full flex items-center justify-between p-4 bg-black/40 hover:bg-black/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-1 h-8" 
                      style={{ backgroundColor: pillarInfo.color }}
                    />
                    <div className="text-left">
                      <div className="font-bold text-white">{pillarInfo.name}</div>
                      <div className="text-xs text-zinc-500">{pillarJourneys.length} sprints</div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </button>

                {/* Journey List */}
                {isExpanded && (
                  <div className="bg-black/20">
                    {pillarJourneys.map(journey => (
                      <button
                        key={journey.id}
                        onClick={() => handleSelectTemplate(journey)}
                        className={`
                          w-full flex items-center justify-between p-4 border-t border-white/5 
                          hover:bg-white/5 transition-colors
                          ${selectedTemplate?.id === journey.id ? 'bg-[#3E2BB8]/20 border-l-2 border-l-[#5739FB]' : ''}
                        `}
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-6 h-6 flex items-center justify-center bg-white/10 text-xs text-white font-bold">
                            {journey.sprint_number || (groupedJourneys[pillarId]?.indexOf(journey) ?? 0) + 1}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{journey.title}</div>
                            <div className="text-xs text-zinc-500">
                              {journey.duration_minutes || '~20'} min · {journey.total_scenes || 13} scenes
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Journey Preview */}
      <div className="col-span-7 space-y-6">
        {selectedTemplate ? (
          <JourneyPreview
            template={selectedTemplate}
            scenes={templateScenes}
            onEnterJourney={handleEnterJourney}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400">Select a journey to preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Universal Player */}
      {showPlayer && activeInstance && currentScene && (
        <JourneyPlayer
          content={{
            journey_id: activeInstance.template_id,
            journey_name: selectedTemplate?.title || 'Unknown Journey',
            scene: currentScene,
            total_scenes: selectedTemplate?.total_scenes || 13,
            current_scene: currentScene.scene_number,
          }}
          contentType="journey_scene"
          onClose={() => setShowPlayer(false)}
          onResponse={(response) => {
            console.log('[Playground] Scene response:', response);
            // Auto-advance to next scene if not last
            if (currentScene.scene_number < (selectedTemplate?.total_scenes || 13)) {
              // Complete current scene
              completeScene(activeInstance.id, currentScene.scene_number);
              
              // Fetch next scene
              getCurrentScene(activeInstance.id).then(({ scene }) => {
                setCurrentScene(scene);
              });
            } else {
              setShowPlayer(false);
            }
          }}
          onAudioEvent={(event) => {
            // Buffer audio events for batch posting
            telemetryBuffer.current.push(event);
            if (telemetryBuffer.current.length >= 10) {
              postAudioEvents(activeInstance.id, telemetryBuffer.current);
              telemetryBuffer.current = [];
            }
          }}
          onCapture={(capture) => {
            postCapture(activeInstance.id, capture);
          }}
          audioRef={audioRef}
        />
      )}
    </div>
  );
}

// Journey Preview Component
interface JourneyPreviewProps {
  template: JourneyTemplate;
  scenes: JourneyTemplateScene[];
  onEnterJourney: () => void;
}

function JourneyPreview({ template, scenes, onEnterJourney }: JourneyPreviewProps) {
  const [expandedScenes, setExpandedScenes] = useState<Set<number>>(new Set());

  function toggleScene(sceneIndex: number) {
    const newExpanded = new Set(expandedScenes);
    if (newExpanded.has(sceneIndex)) {
      newExpanded.delete(sceneIndex);
    } else {
      newExpanded.add(sceneIndex);
    }
    setExpandedScenes(newExpanded);
  }

  return (
    <div className="space-y-6">
      {/* Journey Header */}
      <div className="bg-black/40 border border-white/[0.05] p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xs text-zinc-500 tracking-wide uppercase">
                {template.pillar_name}
              </div>
              {template.is_onboarding && (
                <div className="px-2 py-0.5 bg-[#5739FB]/20 text-[#5739FB] text-xs font-medium">
                  Onboarding
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">{template.title}</h2>
            <p className="text-zinc-400 leading-relaxed max-w-2xl">{template.description}</p>
          </div>
          <button
            onClick={onEnterJourney}
            className="flex items-center gap-2 px-6 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
          >
            <Play className="w-5 h-5" />
            Enter Journey
          </button>
        </div>

        {/* ERA Headlines */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.02] border border-white/[0.05] p-6">
            <div className="text-xs text-zinc-500 mb-2 tracking-wide uppercase">Experience</div>
            <div className="text-white leading-relaxed">{template.era_experience_headline || 'Not specified'}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] p-6">
            <div className="text-xs text-zinc-500 mb-2 tracking-wide uppercase">Recognize</div>
            <div className="text-white leading-relaxed">{template.era_recognize_headline || 'Not specified'}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] p-6">
            <div className="text-xs text-zinc-500 mb-2 tracking-wide uppercase">Align</div>
            <div className="text-white leading-relaxed">{template.era_align_headline || 'Not specified'}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/[0.05] p-4">
            <div className="text-2xl font-bold text-white mb-1">{template.total_scenes || scenes.length || 13}</div>
            <div className="text-xs text-zinc-500">Scenes</div>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] p-4">
            <div className="text-2xl font-bold text-white mb-1">{template.duration_minutes || '~20'}</div>
            <div className="text-xs text-zinc-500">Minutes</div>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {scenes?.filter(s => s.has_audio).length || 0}
            </div>
            <div className="text-xs text-zinc-500">Audio Scenes</div>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] p-4">
            <div className="text-2xl font-bold text-white mb-1">0</div>
            <div className="text-xs text-zinc-500">Active</div>
          </div>
        </div>
      </div>

      {/* Scene List with Full Copy Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">All 13 Scenes</h3>
          <div className="text-sm text-zinc-500">
            Click to preview copy · Audio markers shown
          </div>
        </div>

        {scenes.map((scene, index) => {
          const isExpanded = expandedScenes.has(index);
          
          // Safety check
          if (!scene) return null;
          
          return (
            <div key={scene.id || index} className="bg-black/40 border border-white/[0.05]">
              {/* Scene Header */}
              <button
                onClick={() => toggleScene(index)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#3E2BB8]/20 text-[#5739FB] font-bold">
                    {scene.scene_number || index + 1}
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="text-base font-bold text-white">{scene.title || 'Untitled Scene'}</div>
                      {scene.has_audio && scene.audio_type && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-[#5739FB]/10 text-[#5739FB] text-xs">
                          <AudioLines className="w-3 h-3" />
                          <span>{scene.audio_type.toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      {scene.era_phase && (
                        <>
                          <span className="capitalize">{scene.era_phase}</span>
                          <span>·</span>
                        </>
                      )}
                      {scene.phase_label && (
                        <span className="capitalize">{scene.phase_label.replace(/_/g, ' ')}</span>
                      )}
                      {scene.requires_capture && scene.capture_kind && (
                        <>
                          <span>·</span>
                          <span className="text-yellow-500">Requires {scene.capture_kind}</span>
                        </>
                      )}
                      {scene.requires_real_world_trigger && (
                        <>
                          <span>·</span>
                          <span className="text-blue-400">Real-world trigger</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnterJourney();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#3E2BB8] text-white transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span className="text-sm">Play</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </button>

              {/* Scene Body (Expanded) */}
              {isExpanded && (
                <div className="border-t border-white/[0.05] p-8 bg-black/20">
                  <div className="max-w-3xl">
                    {/* Body Copy */}
                    {scene.body_md && (
                      <div className="mb-6">
                        <div className="text-xs text-zinc-500 mb-3 uppercase tracking-wide">
                          {scene.has_audio ? 'Narration + Text' : 'Text Only'}
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <div className="text-zinc-300 leading-loose whitespace-pre-line">
                            {scene.body_md}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Prompt (Reflection scenes) */}
                    {scene.prompt_md && (
                      <div className="mb-6 p-6 bg-white/[0.02] border border-white/[0.05]">
                        <div className="text-xs text-zinc-500 mb-3 uppercase tracking-wide">
                          Reflection Prompt
                        </div>
                        <div className="text-white leading-relaxed">{scene.prompt_md}</div>
                      </div>
                    )}

                    {/* Real-world trigger hint */}
                    {scene.real_world_trigger_hint && (
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20">
                        <div className="text-xs text-blue-400 mb-2 uppercase tracking-wide">
                          Real-World Practice
                        </div>
                        <div className="text-zinc-300 text-sm">{scene.real_world_trigger_hint}</div>
                      </div>
                    )}

                    {/* Scene Metadata */}
                    <div className="mt-6 pt-6 border-t border-white/[0.05] flex items-center gap-6 text-xs text-zinc-500">
                      <div>
                        <span className="text-zinc-600">Scene Key:</span>{' '}
                        <code className="text-zinc-400">{scene.scene_key}</code>
                      </div>
                      {scene.audio_object_path && (
                        <div>
                          <span className="text-zinc-600">Audio:</span>{' '}
                          <code className="text-zinc-400">{scene.audio_object_path}</code>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}