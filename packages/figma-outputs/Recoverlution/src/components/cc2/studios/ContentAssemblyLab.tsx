/**
 * CONTENT ASSEMBLY LAB - LIVE PREVIEW STUDIO
 * 
 * Hero: Live preview player showing selected content
 * Bottom: Browse all 600 items, click to preview
 * 
 * Uses REAL production components:
 * - BlockRenderer (NEW - full Truth Layer integration)
 * - WellbeingVideoRenderer (NEW - video player with state capture)
 * - PracticePlayer (from toolkit)
 * - Micro Lessons (custom 7-scene player)
 */

import { useState } from 'react';
import { Search, Play, X } from 'lucide-react';
import { contentRegistry, PILLARS } from '@/data/content/registry';
import type { ContentItem, PillarId, ContentKind } from '@/types/content';
import { BlockRenderer } from '../../players/BlockRenderer';
import { WellbeingVideoRenderer } from '../../players/WellbeingVideoRenderer';
import { PracticePlayer } from '@/components/toolkit/PracticePlayer';
import type { Article, Practice } from '@/lib/types/toolkit';
import { ErrorBoundary } from '../../shared/ErrorBoundary';

interface ContentAssemblyLabProps {
  onClose: () => void;
}

export function ContentAssemblyLab({ onClose }: ContentAssemblyLabProps) {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<PillarId | null>(null);
  const [selectedKind, setSelectedKind] = useState<ContentKind | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  // Get first item as default
  const defaultItem = contentRegistry.practices[0] || null;
  const activeItem = selectedItem || defaultItem;

  // Get pillar info
  const getPillarInfo = (pillarId: PillarId) => {
    return PILLARS.find(p => p.id === pillarId);
  };

  // Filter items
  const allItems = [
    ...contentRegistry.practices,
    ...contentRegistry.blocks,
    ...contentRegistry.lessons,
  ].filter(item => {
    if (selectedPillar && item.pillar_id !== selectedPillar) return false;
    if (selectedKind && item.kind !== selectedKind) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: allItems.length,
    practices: contentRegistry.practices.length,
    blocks: contentRegistry.blocks.length,
    lessons: contentRegistry.lessons.length,
  };

  // Convert ContentItem to toolkit types for players
  const convertToArticle = (item: ContentItem): Article => {
    // If it's a Block, use the markdown_body
    if (item.kind === 'block' && 'markdown_body' in item) {
      return {
        id: item.code,
        pillar_id: item.pillar_id,
        title: item.title,
        subtitle: item.subheadline || '',
        body: item.markdown_body || `# ${item.title}\n\n${item.subheadline || ''}`,
        reading_time_minutes: item.word_count ? Math.ceil(item.word_count / 200) : 8,
        schema_targets: item.schema_targets || [],
        related_practices: item.practices_injected || [],
        related_insights: [],
        response_contract: {
          entry_cue: 'What brings you to this article right now?',
          exit_receipt: 'What landed for you?',
        },
      };
    }
    
    // Fallback for items without full content yet
    return {
      id: item.code,
      pillar_id: item.pillar_id,
      title: item.title,
      subtitle: item.subheadline || '',
      body: `# ${item.title}\n\n${item.subheadline || ''}\n\nThis is a ${item.word_count || 1200}-word longform article exploring the therapeutic mechanism, providing a clear model, showing real-world examples, and offering practical next steps.\n\n## The Core Insight\n\nThe full article content would be rendered here with proper typography, sections, embedded practices, and references to people/theories.\n\n## Why This Matters\n\nEach block is designed to transfer knowledge that enables behavior change.\n\n## Next Steps\n\nPractical takeaways that bridge knowing to doing.`,
      reading_time_minutes: 8,
      schema_targets: [],
      related_practices: [],
      related_insights: [],
      response_contract: {
        entry_cue: 'What brings you to this article right now?',
        exit_receipt: 'What landed for you?',
      },
    };
  };

  const convertToPractice = (item: ContentItem): Practice => {
    // If it's a PillarPractice, use the steps
    if (item.kind === 'pillar_practice' && 'steps' in item && item.steps) {
      return {
        id: item.code,
        pillar_id: item.pillar_id,
        title: item.title,
        subtitle: item.subheadline || '',
        intro: item.context?.promise || `A ${item.duration || '60-300 second'} micro-intervention designed to help you work with ${item.title.toLowerCase()}.`,
        duration_minutes: parseInt(item.duration?.split(' ')[0] || '5') / 60,
        modality: 'reflection',
        steps: item.steps.map((step, idx) => ({
          step_number: idx + 1,
          instruction: step.instruction,
          duration_seconds: idx === 0 ? 30 : idx === item.steps.length - 1 ? 30 : 60,
          voice_guidance: step.prompt || `Take your time with this step...`,
        })),
        schema_targets: [],
        response_contract: {
          entry_cue: item.context?.when || 'What brings you to this practice?',
          exit_questions: [
            'What did you notice during the practice?',
            'What, if anything, shifted?',
          ],
        },
      };
    }
    
    // Fallback for items without full content yet
    return {
      id: item.code,
      pillar_id: item.pillar_id,
      title: item.title,
      subtitle: item.subheadline || '',
      intro: `This is a ${item.duration || '2-5 minute'} practice designed to help you work with ${item.title.toLowerCase()}.`,
      duration_minutes: 5,
      modality: 'reflection',
      steps: [
        {
          step_number: 1,
          instruction: 'Find a comfortable position and take three deep breaths.',
          duration_seconds: 30,
          voice_guidance: 'Notice how your body feels right now...',
        },
        {
          step_number: 2,
          instruction: 'Bring to mind the situation or pattern.',
          duration_seconds: 60,
          voice_guidance: 'What sensations arise as you hold this in awareness?',
        },
        {
          step_number: 3,
          instruction: 'Practice the core intervention.',
          duration_seconds: 120,
          voice_guidance: 'Stay with whatever emerges...',
        },
        {
          step_number: 4,
          instruction: 'Notice any shifts and complete the practice.',
          duration_seconds: 30,
          voice_guidance: 'Acknowledge what happened, without judgment.',
        },
      ],
      schema_targets: [],
      response_contract: {
        entry_cue: 'What brings you to this practice?',
        exit_questions: [
          'What did you notice during the practice?',
          'What, if anything, shifted?',
        ],
      },
    };
  };

  // Convert ContentItem to BlockContent type for BlockRenderer
  const convertToBlockContent = (item: ContentItem): any => {
    const article = convertToArticle(item);
    
    return {
      id: article.id,
      pillar_id: article.pillar_id || 'unknown',
      title: article.title || 'Untitled',
      subtitle: article.subtitle,
      promise: 'Gain practical insight into this therapeutic concept',
      body: article.body,
      reading_time_minutes: article.reading_time_minutes,
      lineage: {
        people: ['Validated therapeutic sources'],
        lens: 'Therapeutic Framework',
      },
      targeting: {
        pillar: article.pillar_id || 'unknown',
        schema: item.schema_targets?.[0] || 'general',
        also_helps: [],
      },
      state_fit: {
        best_when: 'You have capacity to read and reflect',
        not_when: 'In acute distress',
      },
      proof_hooks: {
        pre_post_state: true,
        completion_log: true,
        reflections: ['What landed for you?'],
      },
      next_steps: {
        insights: [],
        practices: article.related_practices?.map(p => ({ id: p, title: p })) || [],
        wellbeing: [],
      },
    };
  };

  return (
    <div className="min-h-screen bg-[#0A0118] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl mb-0.5">Content Assembly Lab</h1>
              <p className="text-white/40 text-xs">
                {stats.practices} practices · {stats.blocks} blocks · {stats.lessons} lessons
              </p>
            </div>
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT: Preview Card (HERO) */}
          <div className="col-span-8">
            {activeItem && (
              <ContentPreviewCard 
                item={activeItem} 
                onPlay={() => setShowPlayer(true)}
              />
            )}
          </div>

          {/* RIGHT: Browse & Select */}
          <div className="col-span-4">
            {/* Filters */}
            <div className="mb-6">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
                />
              </div>

              {/* Kind Filter */}
              <div className="flex gap-2 mb-3">
                {(['pillar_practice', 'block', 'micro_lesson'] as ContentKind[]).map((kind) => (
                  <button
                    key={kind}
                    onClick={() => setSelectedKind(selectedKind === kind ? null : kind)}
                    className={`px-3 py-1.5 rounded text-xs transition-all flex-1 ${
                      selectedKind === kind
                        ? 'bg-[#5739FB] text-white'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {kind === 'pillar_practice' ? 'Practices' : kind === 'block' ? 'Blocks' : 'Lessons'}
                  </button>
                ))}
              </div>

              {/* Pillar Filter */}
              <div className="grid grid-cols-3 gap-2">
                {PILLARS.map((pillar) => (
                  <button
                    key={pillar.id}
                    onClick={() => setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
                    className={`px-2 py-2 rounded text-xs transition-all border ${
                      selectedPillar === pillar.id
                        ? 'border-[' + pillar.color + '] ring-2 ring-[' + pillar.color + ']/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                    style={{
                      borderColor: selectedPillar === pillar.id ? pillar.color : undefined,
                      backgroundColor: selectedPillar === pillar.id ? pillar.color + '20' : undefined,
                    }}
                  >
                    {pillar.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Item List */}
            <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
              {allItems.slice(0, 50).map((item) => {
                const pillar = getPillarInfo(item.pillar_id);
                const isSelected = activeItem?.code === item.code;
                
                return (
                  <button
                    key={item.code}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-3 rounded border transition-all ${
                      isSelected
                        ? 'border-[#5739FB] bg-[#5739FB]/20 ring-2 ring-[#5739FB]/30'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded flex items-center justify-center text-xs flex-shrink-0"
                        style={{ backgroundColor: pillar?.color + '30', color: pillar?.color }}
                      >
                        {pillar?.code}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm mb-1 leading-tight">{item.title}</div>
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <span>{item.code}</span>
                          <span>·</span>
                          <span>
                            {item.kind === 'pillar_practice' ? 'Practice' : item.kind === 'block' ? 'Block' : 'Lesson'}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Play className="w-4 h-4 text-[#5739FB] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {allItems.length > 50 && (
              <div className="mt-4 text-center text-sm text-white/40">
                Showing 50 of {allItems.length} items
              </div>
            )}
          </div>
        </div>
      </div>

      {/* REAL PLAYERS - Full Screen Overlays */}
      {showPlayer && activeItem && (
        <ErrorBoundary>
          {activeItem.kind === 'block' && (
            <BlockRenderer
              block={convertToBlockContent(activeItem)}
              onClose={() => setShowPlayer(false)}
              onComplete={(proof) => {
                console.log('Article completed:', proof);
                setShowPlayer(false);
              }}
            />
          )}
          {activeItem.kind === 'pillar_practice' && (
            <PracticePlayer
              practice={convertToPractice(activeItem)}
              onClose={() => setShowPlayer(false)}
              onComplete={(completion) => {
                console.log('Practice completed:', completion);
                setShowPlayer(false);
              }}
            />
          )}
          {activeItem.kind === 'micro_lesson' && (
            <LessonPlayerModal
              item={activeItem}
              onClose={() => setShowPlayer(false)}
            />
          )}
        </ErrorBoundary>
      )}
    </div>
  );
}

// PREVIEW CARD - Shows preview + Play button
function ContentPreviewCard({ item, onPlay }: { item: ContentItem; onPlay: () => void }) {
  const pillar = PILLARS.find(p => p.id === item.pillar_id);

  return (
    <div className="space-y-4">
      {/* Meta Header */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-mono"
              style={{ backgroundColor: pillar?.color + '20', color: pillar?.color }}
            >
              {pillar?.code}
            </div>
            <div>
              <div className="text-sm text-white/50 mb-1">
                {item.kind === 'pillar_practice' ? 'Pillar Practice' : item.kind === 'block' ? 'Block' : 'Micro Lesson'}
              </div>
              <div className="text-xs text-white/30">{item.code}</div>
            </div>
          </div>
          <div className="text-xs text-white/40">
            {item.kind === 'pillar_practice' && item.duration}
            {item.kind === 'block' && '~1200 words'}
            {item.kind === 'micro_lesson' && '7 scenes'}
          </div>
        </div>

        <h1 className="text-2xl mb-2">{item.title}</h1>
        {item.subheadline && (
          <p className="text-white/60 text-lg mb-6">{item.subheadline}</p>
        )}

        {/* Play Button */}
        <button
          onClick={onPlay}
          className="w-full px-6 py-4 rounded-lg bg-[#5739FB] hover:bg-[#3E2BB8] text-white transition-all flex items-center justify-center gap-3"
        >
          <Play className="w-5 h-5" />
          <span className="text-lg">
            {item.kind === 'pillar_practice' ? 'Start Practice' : item.kind === 'block' ? 'Read Article' : 'Begin Lesson'}
          </span>
        </button>
      </div>

      {/* Preview Content */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="text-sm text-white/50 mb-3">Preview</div>
        
        {item.kind === 'pillar_practice' && (
          <div className="space-y-3 text-white/70">
            <p>A {item.duration || '60-300 second'} micro-intervention to help you work with {item.title.toLowerCase()}.</p>
            <p className="text-white/50 text-sm">Click "Start Practice" to experience the full guided practice with state check-ins and reflection prompts.</p>
          </div>
        )}

        {item.kind === 'block' && (
          <div className="space-y-3 text-white/70">
            <p>A 1000+ word longform guide exploring the therapeutic mechanism behind {item.title.toLowerCase()}.</p>
            <p className="text-white/50 text-sm">Click "Read Article" to experience the full reader with entry cue, progress tracking, and exit receipt.</p>
          </div>
        )}

        {item.kind === 'micro_lesson' && (
          <div className="space-y-3 text-white/70">
            <p>A 7-scene interactive learning sequence designed to help you understand and apply {item.title.toLowerCase()}.</p>
            <p className="text-white/50 text-sm">Click "Begin Lesson" to experience the full scene-by-scene player with teaching, reflection, and practice injection.</p>
          </div>
        )}

        {/* Context */}
        {item.context && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {item.context.who_its_for && (
                <div>
                  <div className="text-white/40 mb-1">Who it's for</div>
                  <div className="text-white/70">{item.context.who_its_for}</div>
                </div>
              )}
              {item.context.promise && (
                <div>
                  <div className="text-white/40 mb-1">What you'll learn</div>
                  <div className="text-white/70">{item.context.promise}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// LESSON PLAYER MODAL - Full screen 7-scene player
function LessonPlayerModal({ item, onClose }: { item: ContentItem; onClose: () => void }) {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { label: 'Orient', type: 'teaching', goal: 'Set context' },
    { label: 'Lens', type: 'teaching', goal: 'Introduce model' },
    { label: 'Mirror', type: 'reflection', goal: 'Apply to self' },
    { label: 'Practice', type: 'practice_injection', goal: 'Take action' },
    { label: 'Measure', type: 'state_check', goal: 'Track shift' },
    { label: 'Reinforce', type: 'teaching', goal: 'Deepen learning' },
    { label: 'Transfer', type: 'reflection', goal: 'Plan next use' },
  ];

  const pillar = PILLARS.find(p => p.id === item.pillar_id);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-[#3E2BB8]/10">
        <div
          className="h-full bg-[#5739FB] transition-all duration-300"
          style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className="border-b border-[#3E2BB8]/20 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-xs border border-[#3E2BB8] bg-[#3E2BB8]/10 text-[#3E2BB8]">
                  {item.pillar_id}
                </span>
                <span className="text-sm text-[#3E2BB8]/60">
                  Scene {currentScene + 1} of {scenes.length}: {scenes[currentScene].label}
                </span>
              </div>
              <h1 className="text-[#3E2BB8] mb-2">{item.title}</h1>
              <p className="text-[#3E2BB8]/60">{item.subheadline}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#3E2BB8]/5 transition-colors"
            >
              <X className="size-6 text-[#3E2BB8]" />
            </button>
          </div>
        </div>
      </div>

      {/* Scene Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-[#3E2BB8]/5 border border-[#3E2BB8]/20 p-8 mb-8">
            {scenes[currentScene].type === 'teaching' && (
              <div>
                <h2 className="text-[#3E2BB8] mb-4">{scenes[currentScene].label}</h2>
                <p className="text-[#3E2BB8]/80 leading-relaxed">
                  This scene presents core concepts, models, or frameworks in an engaging, 
                  digestible format with clear examples about {item.title.toLowerCase()}.
                </p>
              </div>
            )}
            {scenes[currentScene].type === 'reflection' && (
              <div>
                <h2 className="text-[#3E2BB8] mb-4">Reflection</h2>
                <p className="text-[#3E2BB8]/80 mb-4">How does this pattern show up in your life?</p>
                <textarea
                  className="w-full px-4 py-3 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] placeholder:text-[#3E2BB8]/40 focus:outline-none focus:border-[#5739FB]"
                  rows={6}
                  placeholder="Type your reflection..."
                />
              </div>
            )}
            {scenes[currentScene].type === 'practice_injection' && (
              <div>
                <h2 className="text-[#3E2BB8] mb-4">Try This Practice</h2>
                <div className="bg-[#5739FB]/10 border border-[#5739FB]/30 p-6">
                  <p className="text-[#3E2BB8]/80 mb-4">
                    Quick 60-second intervention to apply what you've learned.
                  </p>
                  <button className="px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors">
                    Launch Practice →
                  </button>
                </div>
              </div>
            )}
            {scenes[currentScene].type === 'state_check' && (
              <div>
                <h2 className="text-[#3E2BB8] mb-4">How are you feeling?</h2>
                <div className="space-y-3">
                  {['Better', 'Same', 'Worse', 'Not sure'].map((option) => (
                    <button
                      key={option}
                      className="w-full px-6 py-4 border border-[#3E2BB8]/20 hover:bg-[#3E2BB8]/5 text-[#3E2BB8] transition-all text-left"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
              disabled={currentScene === 0}
              className="flex-1 px-6 py-3 border border-[#3E2BB8]/20 text-[#3E2BB8] hover:bg-[#3E2BB8]/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentScene === scenes.length - 1) {
                  onClose();
                } else {
                  setCurrentScene(currentScene + 1);
                }
              }}
              className="flex-1 px-6 py-3 bg-[#5739FB] text-white hover:bg-[#3E2BB8] transition-colors"
            >
              {currentScene === scenes.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}