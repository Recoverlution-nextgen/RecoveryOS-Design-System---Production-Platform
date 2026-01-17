/**
 * JOURNEY SCENE RENDERER - Renders 13-scene journey content
 * Displays scenes with appropriate formatting based on scene type
 */

import { useState } from 'react';
import { ChevronRight, MessageSquare } from 'lucide-react';

interface JourneySceneContent {
  journey_id: string;
  journey_name: string;
  scene: {
    sequence: number;
    type: string;
    phase?: string;
    headline: string;
    context?: string;
    instruction?: string;
    anchor_guide?: string;
    anchor_integration?: string;
    reflection_prompts?: string[];
    transition_context?: string;
    focus?: string;
    focus_reminder?: string;
    assessment_questions?: any[];
    duration_minutes?: number;
    cta_text?: string;
    cta_focus?: string;
  };
  total_scenes: number;
  current_scene: number;
}

interface JourneySceneRendererProps {
  content: JourneySceneContent;
  onResponse?: (response: any) => void;
  onClose?: () => void;
  onNext?: () => void;
}

export function JourneySceneRenderer({ content, onResponse, onClose, onNext }: JourneySceneRendererProps) {
  const { scene, journey_name, total_scenes, current_scene } = content;
  const [reflectionText, setReflectionText] = useState('');
  const [assessmentAnswers, setAssessmentAnswers] = useState<any[]>([]);

  function handleContinue() {
    if (scene.type.includes('reflection') && reflectionText.trim()) {
      onResponse?.({ type: 'reflection', text: reflectionText });
    } else if (scene.type === 'integration' && assessmentAnswers.length > 0) {
      onResponse?.({ type: 'assessment', answers: assessmentAnswers });
    } else {
      onResponse?.({ type: 'continue', scene: scene.sequence });
    }
  }

  const isLastScene = current_scene === total_scenes;

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Header - Much lighter, more breathing room */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="px-3 py-1.5 bg-[#3E2BB8]/10 text-[#5739FB] text-xs font-medium tracking-wide">
            {journey_name}
          </div>
          {scene.phase && (
            <div className="px-3 py-1.5 bg-white/[0.02] text-zinc-500 text-xs font-medium tracking-wide">
              {scene.phase}
            </div>
          )}
          <div className="ml-auto text-xs text-zinc-600">
            Scene {current_scene} of {total_scenes}
          </div>
        </div>
        <h1 className="text-4xl text-white mb-6 tracking-tight">{scene.headline}</h1>
        <div className="h-px w-full bg-white/[0.03] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] transition-all duration-500"
            style={{ width: `${(current_scene / total_scenes) * 100}%` }}
          />
        </div>
      </div>

      {/* Content based on scene type - Much more whitespace */}
      <div className="space-y-12 mb-16">
        {/* Context */}
        {scene.context && (
          <div className="text-lg text-zinc-400 leading-loose whitespace-pre-line max-w-2xl">
            {scene.context}
          </div>
        )}

        {/* Instruction */}
        {scene.instruction && (
          <div className="bg-white/[0.01] border border-white/[0.05] p-8 mt-12">
            <div className="text-xs font-medium text-[#5739FB] mb-4 tracking-wide uppercase">Practice</div>
            <div className="text-zinc-400 leading-loose whitespace-pre-line">
              {scene.instruction}
            </div>
          </div>
        )}

        {/* Anchor Guide (for cue scenes) */}
        {scene.anchor_guide && (
          <div className="bg-[#3E2BB8]/[0.03] border border-[#5739FB]/10 p-8 mt-12">
            <div className="text-xs font-medium text-[#5739FB] mb-4 tracking-wide uppercase">Today's Focus</div>
            <div className="text-white text-xl leading-relaxed">
              {scene.anchor_guide}
            </div>
            {scene.focus_reminder && (
              <div className="mt-6 text-zinc-500 text-sm">
                {scene.focus_reminder}
              </div>
            )}
          </div>
        )}

        {/* Anchor Integration */}
        {scene.anchor_integration && (
          <div className="bg-white/[0.01] border border-white/[0.05] p-8 mt-12">
            <div className="text-xs font-medium text-[#5739FB] mb-4 tracking-wide uppercase">Integration</div>
            <div className="text-zinc-400 leading-loose whitespace-pre-line">
              {scene.anchor_integration}
            </div>
          </div>
        )}

        {/* Transition Context (for bridge scenes) */}
        {scene.transition_context && (
          <div className="text-lg text-zinc-400 leading-loose whitespace-pre-line max-w-2xl mt-12">
            {scene.transition_context}
          </div>
        )}

        {/* Reflection Prompts */}
        {scene.reflection_prompts && scene.reflection_prompts.length > 0 && (
          <div className="space-y-6 mt-12">
            <div className="text-xs font-medium text-zinc-600 tracking-wide uppercase">Reflect</div>
            <div className="space-y-4">
              {scene.reflection_prompts.map((prompt, index) => (
                <div key={index} className="flex items-start gap-4 text-zinc-500">
                  <MessageSquare className="w-4 h-4 mt-1.5 flex-shrink-0 text-zinc-600" />
                  <span className="text-sm leading-relaxed">{prompt}</span>
                </div>
              ))}
            </div>
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Take a moment to reflect..."
              rows={8}
              className="w-full px-5 py-4 bg-black/20 border border-white/[0.05] text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#5739FB]/30 resize-none leading-relaxed mt-6"
            />
          </div>
        )}

        {/* Assessment Questions (for integration scene) */}
        {scene.assessment_questions && scene.assessment_questions.length > 0 && (
          <div className="space-y-10 mt-12">
            <div className="text-xs font-medium text-zinc-600 tracking-wide uppercase">Assessment</div>
            {scene.assessment_questions.map((q, index) => (
              <div key={index} className="space-y-4">
                <div className="text-white text-lg">{q.question}</div>
                {q.type === 'scale' ? (
                  <div className="space-y-3 pt-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      className="w-full"
                      onChange={(e) => {
                        const newAnswers = [...assessmentAnswers];
                        newAnswers[index] = { question: q.question, answer: e.target.value };
                        setAssessmentAnswers(newAnswers);
                      }}
                    />
                    <div className="flex justify-between text-xs text-zinc-600">
                      <span>{q.min_label}</span>
                      <span>{q.max_label}</span>
                    </div>
                  </div>
                ) : (
                  <textarea
                    rows={4}
                    placeholder="Your answer..."
                    className="w-full px-5 py-4 bg-black/20 border border-white/[0.05] text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#5739FB]/30 resize-none leading-relaxed"
                    onChange={(e) => {
                      const newAnswers = [...assessmentAnswers];
                      newAnswers[index] = { question: q.question, answer: e.target.value };
                      setAssessmentAnswers(newAnswers);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions - Lighter divider */}
      <div className="flex items-center justify-between pt-8 border-t border-white/[0.03]">
        <button
          onClick={onClose}
          className="px-6 py-3 text-zinc-600 hover:text-zinc-400 transition-colors text-sm"
        >
          Exit Journey
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 px-8 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] text-white transition-colors"
        >
          <span>{scene.cta_text || (isLastScene ? 'Complete Journey' : 'Continue')}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}