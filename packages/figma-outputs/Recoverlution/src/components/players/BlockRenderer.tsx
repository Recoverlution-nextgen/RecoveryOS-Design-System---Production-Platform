/**
 * BLOCK RENDERER (Article Experience)
 * 
 * Purpose: Start → Shift → Integrate → Next Steps
 * Size: 1,000-1,800 words
 * Required: ≥1 embedded practice
 * 
 * Structure:
 * - Hero (title, subtitle, promise)
 * - Context card (why now + state-fit)
 * - Body (start/middle/end with practice injection)
 * - Next steps (deeper insights, practices, wellbeing)
 * - Truth Layer drawers (lineage, targeting, state-fit, proof)
 */

import { useState, useEffect, useRef } from 'react';
import { X, Clock, BookOpen, ChevronRight, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TruthLayer } from './shared/TruthLayer';

export interface BlockContent {
  id: string;
  pillar_id: string;
  title: string;
  subtitle?: string;
  promise: string; // "What changes if you do this"
  
  // Body
  body: string; // Markdown
  reading_time_minutes: number;
  
  // Truth Layer
  lineage: {
    people: string[];
    lens?: string;
    framework?: string;
  };
  targeting: {
    pillar: string;
    theme?: string;
    schema?: string;
    family?: string;
    concept?: string;
    also_helps?: string[];
  };
  state_fit: {
    best_when: string;
    not_when: string;
    arousal_constraint?: string;
    contraindications?: string[];
  };
  proof_hooks: {
    pre_post_state: boolean;
    completion_log: boolean;
    reflections: string[];
    transfer_test?: string;
  };
  
  // Embedded Practice
  embedded_practice?: {
    id: string;
    title: string;
    duration_minutes: number;
  };
  
  // Next Steps
  next_steps: {
    insights: Array<{ id: string; title: string }>;
    practices: Array<{ id: string; title: string }>;
    wellbeing: Array<{ id: string; title: string }>;
  };
}

interface BlockRendererProps {
  block: BlockContent;
  onClose: () => void;
  onComplete: (proof: {
    block_id: string;
    percent_read: number;
    exit_response?: string;
    practice_completed: boolean;
  }) => void;
  onOpenPractice?: (practiceId: string) => void;
  onOpenInsight?: (insightId: string) => void;
  onOpenWellbeing?: (videoId: string) => void;
}

export function BlockRenderer({ block, onComplete, onClose }: BlockRendererProps) {
  const [showTruthLayer, setShowTruthLayer] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Guard: Return early if block is undefined or invalid
  if (!block) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0A0118] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Content not available</p>
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  // Ensure required fields have defaults
  const safeBlock = {
    pillar_id: block.pillar_id || 'unknown',
    title: block.title || 'Untitled',
    subtitle: block.subtitle || '',
    reading_time_minutes: block.reading_time_minutes || 5,
    promise: block.promise || 'Learn something new',
    sections: block.sections || [],
    practices: block.practices || [],
    ...block,
  };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const percent = Math.round((scrollTop / scrollHeight) * 100);

      setScrollProgress(Math.min(percent, 100));

      if (percent >= 95) {
        setShowTruthLayer(true);
      }
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleComplete = () => {
    onComplete({
      block_id: block.id,
      percent_read: scrollProgress,
      practice_completed: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col">
      {/* Minimal Progress Bar */}
      <div className="h-0.5 bg-[#3E2BB8]/5">
        <div
          className="h-full bg-[#5739FB] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Clean Header */}
      <div className="border-b border-[#3E2BB8]/10 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 text-xs tracking-wide uppercase border border-[#3E2BB8]/20 text-[#3E2BB8]/60">
                  {block.pillar_id}
                </span>
                <div className="flex items-center gap-2 text-sm text-[#3E2BB8]/40">
                  <Clock className="size-3.5" />
                  <span>{block.reading_time_minutes} min read</span>
                </div>
              </div>
              <h1 className="text-[#3E2BB8] mb-2 leading-tight">{block.title}</h1>
              {block.subtitle && (
                <p className="text-[#3E2BB8]/50 text-lg leading-relaxed mb-3">{block.subtitle}</p>
              )}
              {/* Promise */}
              <div className="px-4 py-3 bg-[#5739FB]/5 border-l-2 border-[#5739FB]">
                <p className="text-sm text-[#3E2BB8]/70">
                  <span className="text-[#5739FB]">What changes if you do this:</span> {block.promise}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#3E2BB8]/5 transition-colors rounded-full"
              aria-label="Close"
            >
              <X className="size-5 text-[#3E2BB8]/60" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Article Body */}
          <div className="prose prose-recoverlution max-w-none mb-12">
            <ReactMarkdown>{block.body}</ReactMarkdown>
          </div>

          {/* Embedded Practice (if present) */}
          {block.embedded_practice && (
            <div className="my-12 p-6 bg-[#5739FB]/5 border border-[#5739FB]/10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="size-4 text-[#5739FB]" />
                    <span className="text-xs tracking-wide uppercase text-[#5739FB]">PRACTICE INJECTION</span>
                  </div>
                  <h3 className="text-xl text-[#3E2BB8] mb-1">{block.embedded_practice.title}</h3>
                  <p className="text-sm text-[#3E2BB8]/60">{block.embedded_practice.duration_minutes} minutes</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onOpenPractice?.(block.embedded_practice!.id);
                }}
                className="w-full px-4 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors"
              >
                Do This Now
              </button>
            </div>
          )}

          {/* Truth Layer */}
          {showTruthLayer && (
            <div className="my-12">
              <h3 className="text-sm tracking-wide uppercase text-[#3E2BB8]/60 mb-4">WHY THIS BLOCK?</h3>
              <TruthLayer
                lineage={block.lineage}
                targeting={block.targeting}
                stateFit={block.state_fit}
                proofHooks={block.proof_hooks}
              />
            </div>
          )}

          {/* Next Steps */}
          <div className="my-12">
            <h3 className="text-2xl text-[#3E2BB8] mb-6">Next Steps</h3>
            
            {block.next_steps.insights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm tracking-wide uppercase text-[#3E2BB8]/60 mb-3">GO DEEPER</h4>
                <div className="space-y-2">
                  {block.next_steps.insights.map((insight) => (
                    <button
                      key={insight.id}
                      onClick={() => onOpenInsight?.(insight.id)}
                      className="w-full flex items-center justify-between px-4 py-3 border border-[#3E2BB8]/10 hover:bg-[#3E2BB8]/5 transition-colors text-left"
                    >
                      <span className="text-sm text-[#3E2BB8]">{insight.title}</span>
                      <ChevronRight className="size-4 text-[#3E2BB8]/40" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {block.next_steps.practices.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm tracking-wide uppercase text-[#3E2BB8]/60 mb-3">DO NOW</h4>
                <div className="space-y-2">
                  {block.next_steps.practices.map((practice) => (
                    <button
                      key={practice.id}
                      onClick={() => onOpenPractice?.(practice.id)}
                      className="w-full flex items-center justify-between px-4 py-3 border border-[#3E2BB8]/10 hover:bg-[#3E2BB8]/5 transition-colors text-left"
                    >
                      <span className="text-sm text-[#3E2BB8]">{practice.title}</span>
                      <ChevronRight className="size-4 text-[#3E2BB8]/40" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {block.next_steps.wellbeing.length > 0 && (
              <div>
                <h4 className="text-sm tracking-wide uppercase text-[#3E2BB8]/60 mb-3">IN THE FLOW</h4>
                <div className="space-y-2">
                  {block.next_steps.wellbeing.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => onOpenWellbeing?.(video.id)}
                      className="w-full flex items-center justify-between px-4 py-3 border border-[#3E2BB8]/10 hover:bg-[#3E2BB8]/5 transition-colors text-left"
                    >
                      <span className="text-sm text-[#3E2BB8]">{video.title}</span>
                      <ChevronRight className="size-4 text-[#3E2BB8]/40" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Exit Prompt */}
          {showTruthLayer && (
            <div className="my-12 p-6 bg-[#3E2BB8]/5 border border-[#3E2BB8]/10">
              <h3 className="text-xl text-[#3E2BB8] mb-4">What landed for you?</h3>
              <textarea
                placeholder="One thing that shifted, even 1%..."
                className="w-full px-4 py-3 border border-[#3E2BB8]/20 focus:border-[#5739FB] focus:outline-none resize-none text-[#3E2BB8]"
                rows={3}
              />
              <button
                onClick={handleComplete}
                className="mt-4 w-full px-4 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors"
              >
                Complete & Save to Toolkit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}