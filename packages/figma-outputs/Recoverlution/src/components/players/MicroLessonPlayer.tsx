/**
 * MICRO LESSON PLAYER
 * Cinematic 7-scene micro-intervention player
 * Scenes: Anchor → Disrupt → Insight → Practice → Integration → Transfer → Seal
 */

import { useState, useEffect } from 'react';
import { ChevronRight, X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { TruthLayer } from './TruthLayer';

interface MicroLesson {
  id: string;
  title: string;
  pillar_id: string;
  estimated_duration_minutes: number;
  scenes: LessonScene[];
}

interface LessonScene {
  scene_number: number;
  scene_type: 'anchor' | 'disrupt' | 'insight' | 'practice' | 'integration' | 'transfer' | 'seal';
  title: string;
  content: string;
  voice_guidance?: string;
  duration_seconds: number;
  interaction?: {
    type: 'reflection' | 'choice' | 'writing';
    prompt: string;
    options?: string[];
  };
}

interface MicroLessonPlayerProps {
  lesson: MicroLesson;
  onComplete: (proof: {
    lesson_id: string;
    scenes_completed: number[];
    reflections: Record<number, string>;
    duration_seconds: number;
  }) => void;
  onClose: () => void;
}

export function MicroLessonPlayer({ lesson, onComplete, onClose }: MicroLessonPlayerProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [reflection, setReflection] = useState('');
  const [reflections, setReflections] = useState<Record<number, string>>({});
  const [scenesCompleted, setScenesCompleted] = useState<number[]>([]);
  const [startTime] = useState(Date.now());
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [sceneStartTime, setSceneStartTime] = useState(Date.now());

  const scene = lesson.scenes[currentScene];
  const progress = ((currentScene + 1) / lesson.scenes.length) * 100;

  useEffect(() => {
    setSceneStartTime(Date.now());
    
    // Auto-advance scenes without interaction after duration
    if (autoAdvance && !scene.interaction) {
      const timer = setTimeout(() => {
        handleNextScene();
      }, scene.duration_seconds * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentScene, autoAdvance]);

  function handleNextScene() {
    // Save reflection if present
    if (reflection.trim()) {
      setReflections({ ...reflections, [currentScene]: reflection });
      setReflection('');
    }

    // Mark scene complete
    if (!scenesCompleted.includes(currentScene)) {
      setScenesCompleted([...scenesCompleted, currentScene]);
    }

    // Move to next scene or complete
    if (currentScene < lesson.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    } else {
      handleComplete();
    }
  }

  function handleComplete() {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    onComplete({
      lesson_id: lesson.id,
      scenes_completed: [...scenesCompleted, currentScene],
      reflections: { ...reflections, [currentScene]: reflection },
      duration_seconds: duration,
    });
  }

  const sceneConfig = {
    anchor: { color: '#3E2BB8', label: 'Anchor', icon: '⚓' },
    disrupt: { color: '#5739FB', label: 'Disrupt', icon: '⚡' },
    insight: { color: '#10b981', label: 'Insight', icon: '💡' },
    practice: { color: '#f59e0b', label: 'Practice', icon: '🎯' },
    integration: { color: '#8b5cf6', label: 'Integration', icon: '🔗' },
    transfer: { color: '#ec4899', label: 'Transfer', icon: '🚀' },
    seal: { color: '#06b6d4', label: 'Seal', icon: '✨' },
  };

  const config = sceneConfig[scene.scene_type];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0118] flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl mb-0.5">{lesson.title}</h1>
              <p className="text-white/40 text-sm">
                Scene {currentScene + 1} of {lesson.scenes.length}: {config.label}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scene Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Scene Type Badge */}
          <div className="flex items-center justify-center mb-8">
            <div
              className="px-6 py-3 rounded-full text-2xl"
              style={{ backgroundColor: `${config.color}20`, color: config.color }}
            >
              {config.icon} {config.label}
            </div>
          </div>

          {/* Scene Title */}
          <h2 className="text-3xl text-center mb-8">{scene.title}</h2>

          {/* Scene Content */}
          <div className="prose prose-invert prose-lg mx-auto mb-12 text-center max-w-2xl">
            <p className="text-white/80 text-lg leading-relaxed">{scene.content}</p>
          </div>

          {/* Voice Guidance */}
          {scene.voice_guidance && (
            <div className="max-w-2xl mx-auto mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-white/60 italic text-center">"{scene.voice_guidance}"</p>
            </div>
          )}

          {/* Interaction */}
          {scene.interaction && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="p-6 bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl">
                <h3 className="text-lg mb-4">{scene.interaction.prompt}</h3>
                
                {scene.interaction.type === 'reflection' || scene.interaction.type === 'writing' ? (
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Your reflection..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50 h-32 resize-none"
                  />
                ) : scene.interaction.type === 'choice' ? (
                  <div className="space-y-2">
                    {scene.interaction.options?.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setReflection(option);
                          setTimeout(handleNextScene, 500);
                        }}
                        className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all text-left hover:border-[#5739FB]/50"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Scene Navigation */}
          <div className="max-w-2xl mx-auto flex gap-4">
            {currentScene > 0 && (
              <button
                onClick={() => setCurrentScene(currentScene - 1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNextScene}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5739FB] to-[#3E2BB8] text-white rounded hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {currentScene === lesson.scenes.length - 1 ? (
                <>
                  <Check className="w-5 h-5" />
                  Complete Lesson
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Scene Indicators */}
          <div className="max-w-2xl mx-auto mt-12 flex justify-center gap-2">
            {lesson.scenes.map((s, idx) => {
              const sConfig = sceneConfig[s.scene_type];
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentScene(idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    idx === currentScene
                      ? 'ring-2 ring-offset-2 ring-offset-[#0A0118] scale-110'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                  style={{
                    backgroundColor: `${sConfig.color}${idx === currentScene ? '' : '40'}`,
                    ringColor: idx === currentScene ? sConfig.color : 'transparent',
                  }}
                >
                  {scenesCompleted.includes(idx) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Auto-advance Toggle */}
          <div className="max-w-2xl mx-auto mt-6 flex items-center justify-center gap-2 text-sm text-white/40">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="rounded"
            />
            <label>Auto-advance scenes</label>
          </div>
        </div>
      </div>

      {/* Truth Layer - appears after completion */}
      {currentScene === lesson.scenes.length && (
        <TruthLayer
          contentId={lesson.id}
          onClose={onClose}
        />
      )}
    </div>
  );
}

// Example usage with mock data
export function MicroLessonPlayerDemo() {
  const [playing, setPlaying] = useState(false);

  const mockLesson: MicroLesson = {
    id: 'ml_001_urge_surfing',
    title: 'Urge Surfing',
    pillar_id: 'stress_resilience',
    estimated_duration_minutes: 5,
    scenes: [
      {
        scene_number: 1,
        scene_type: 'anchor',
        title: 'Noticing the Wave',
        content: 'Right now, you might be feeling pulled toward something. A craving, an urge, a familiar pattern. Instead of fighting it or giving in, we\'re going to surf it.',
        voice_guidance: 'Take a breath. You\'re safe here.',
        duration_seconds: 15,
      },
      {
        scene_number: 2,
        scene_type: 'disrupt',
        title: 'The Disruption',
        content: 'What if this urge isn\'t your enemy? What if it\'s just a wave—temporary, rising and falling on its own?',
        voice_guidance: 'Let that idea settle for a moment...',
        duration_seconds: 10,
      },
      {
        scene_number: 3,
        scene_type: 'insight',
        title: 'The Truth About Urges',
        content: 'Urges peak within 20-30 minutes and then naturally subside. You don\'t have to act. You just have to ride.',
        voice_guidance: 'This is the insight that changes everything.',
        duration_seconds: 15,
        interaction: {
          type: 'reflection',
          prompt: 'What does this urge feel like in your body right now?',
        },
      },
      {
        scene_number: 4,
        scene_type: 'practice',
        title: 'Surf the Wave',
        content: 'Close your eyes. Notice where the urge lives in your body. Breathe into that space. Watch it rise, peak, and begin to fall. You are not the wave—you are the surfer.',
        voice_guidance: 'Stay with it. Just observe. No judgment. No action.',
        duration_seconds: 60,
      },
      {
        scene_number: 5,
        scene_type: 'integration',
        title: 'What Changed?',
        content: 'The urge might still be there, but notice: you didn\'t collapse under it. You rode it. That\'s the skill.',
        voice_guidance: 'This is what mastery feels like.',
        duration_seconds: 10,
        interaction: {
          type: 'reflection',
          prompt: 'What shifted for you during this practice?',
        },
      },
      {
        scene_number: 6,
        scene_type: 'transfer',
        title: 'Next Time',
        content: 'The next time an urge arrives, you\'ll remember: I can surf this. I\'ve done it before. I can do it again.',
        voice_guidance: 'You now have this tool forever.',
        duration_seconds: 10,
      },
      {
        scene_number: 7,
        scene_type: 'seal',
        title: 'Complete',
        content: 'You just practiced urge surfing. This is how you build agency—one wave at a time.',
        voice_guidance: 'Well done.',
        duration_seconds: 5,
      },
    ],
  };

  if (!playing) {
    return (
      <div className="min-h-screen bg-[#0A0118] flex items-center justify-center">
        <div className="text-center max-w-lg">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#5739FB]" />
          <h1 className="text-3xl mb-4">Micro Lesson Player</h1>
          <p className="text-white/60 mb-8">
            Experience the cinematic 7-scene micro-intervention format
          </p>
          <button
            onClick={() => setPlaying(true)}
            className="px-8 py-4 bg-gradient-to-r from-[#5739FB] to-[#3E2BB8] text-white rounded text-lg hover:opacity-90 transition-all flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Start Lesson: Urge Surfing
          </button>
        </div>
      </div>
    );
  }

  return (
    <MicroLessonPlayer
      lesson={mockLesson}
      onComplete={(proof) => {
        console.log('Lesson completed:', proof);
        setPlaying(false);
      }}
      onClose={() => setPlaying(false)}
    />
  );
}
