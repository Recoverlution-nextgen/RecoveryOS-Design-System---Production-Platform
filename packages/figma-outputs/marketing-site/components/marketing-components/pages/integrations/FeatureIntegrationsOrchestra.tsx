/**
 * FEATURE INTEGRATIONS ORCHESTRA
 * Ten animated data journeys showing how everything connects
 * Visual step-by-step flows demonstrating the invisible orchestration
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  tagline: string;
  color: string;
  steps: IntegrationStep[];
}

interface IntegrationStep {
  label: string;
  description: string;
  icon: string;
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'soundbites-navicues',
    name: 'Soundbites → NaviCues',
    tagline: 'Your voice becomes wisdom',
    color: '#FF6B9D',
    steps: [
      {
        label: 'User Voice Recording',
        description: 'User records in YOUR VOICE: "I always feel like I am failing"',
        icon: '🎤'
      },
      {
        label: 'Transcription & Prosody',
        description: 'AI transcribes text + analyzes tone (heavy), pace (slow), pauses (frequent)',
        icon: '📝'
      },
      {
        label: 'Pattern Detection',
        description: 'Identifies: All or nothing thinking + Shame schema + Perfectionism',
        icon: '🔍'
      },
      {
        label: 'NaviCue Generation',
        description: 'Custom prompt: "What if always is just sometimes that feels loud?"',
        icon: '✨'
      },
      {
        label: 'Timed Delivery',
        description: 'Delivered 24-48hrs later for reflection with original soundbite',
        icon: '⏰'
      }
    ]
  },
  {
    id: 'voice-analysis',
    name: 'Voice Recordings → Analysis',
    tagline: 'Voice as biometric for emotional state',
    color: '#4ECDC4',
    steps: [
      {
        label: 'Soundbite Library',
        description: 'All voice recordings stored with metadata (date, context, pillar)',
        icon: '📚'
      },
      {
        label: 'Prosody Batch Analysis',
        description: 'Analyze tone, pace, hesitation across all recordings',
        icon: '📊'
      },
      {
        label: 'Emotional State Detection',
        description: 'Map arousal, confidence, authenticity markers per recording',
        icon: '💭'
      },
      {
        label: 'Pattern Over Time',
        description: 'Track changes: Tone improving, pace steadier, pauses less frequent',
        icon: '📈'
      },
      {
        label: 'LUMA Confidence Feed',
        description: 'Voice patterns feed into overall confidence scoring system',
        icon: '🎯'
      }
    ]
  },
  {
    id: 'story-journey',
    name: 'Story Mapping → Journey',
    tagline: 'Your story drives your healing',
    color: '#F4A261',
    steps: [
      {
        label: 'Story Timeline Creation',
        description: 'User plots life events: Birth, trauma, relationships, wins, losses',
        icon: '📅'
      },
      {
        label: 'Emotion Tagging',
        description: 'Each event tagged with valence: joy, grief, shame, pride, fear',
        icon: '🎨'
      },
      {
        label: 'Schema Pattern Detection',
        description: 'AI identifies: Mom illness activates Abandonment schema',
        icon: '🧩'
      },
      {
        label: 'Hot Context Mapping',
        description: 'High-risk contexts mapped: hospital visits, being alone, anniversaries',
        icon: '📍'
      },
      {
        label: 'Story-Driven Interventions',
        description: 'NaviCues reference specific events: "Remember when..."',
        icon: '💬'
      }
    ]
  },
  {
    id: 'practice-delivery',
    name: 'Practices → Delivery',
    tagline: 'Right practice, right time, every time',
    color: '#95E1D3',
    steps: [
      {
        label: 'Practice Library',
        description: '50+ practices organized by pillar: breathing, grounding, reframing',
        icon: '🧘'
      },
      {
        label: 'User State Monitoring',
        description: 'Track window of tolerance, arousal level, recent activities',
        icon: '📡'
      },
      {
        label: 'Time Pattern Learning',
        description: 'AI learns: User stressed at 3pm daily, calm in mornings',
        icon: '⏱️'
      },
      {
        label: 'Engagement History',
        description: 'Which practices completed? Which skipped? What worked?',
        icon: '✅'
      },
      {
        label: 'Intelligent Queue',
        description: 'Delivers breathing practice at 2:45pm, before stress hits',
        icon: '🎯'
      }
    ]
  },
  {
    id: 'videos-moments',
    name: 'Videos → Moments',
    tagline: 'TikTok for therapy',
    color: '#E76F51',
    steps: [
      {
        label: 'Full Video Library',
        description: '10-30 minute videos on complex topics (attachment, regulation)',
        icon: '🎬'
      },
      {
        label: 'AI Key Moment Detection',
        description: 'Transcription + computer vision identifies pivotal insights',
        icon: '🔍'
      },
      {
        label: 'Clip Generation',
        description: 'Extracts 30-90 second clips with complete thoughts',
        icon: '✂️'
      },
      {
        label: 'Context Tagging',
        description: 'Clips tagged by pillar, concept, readiness level',
        icon: '🏷️'
      },
      {
        label: 'Micro-Delivery',
        description: 'Clips delivered when relevant, not full videos',
        icon: '📲'
      }
    ]
  },
  {
    id: 'articles-context',
    name: 'Articles → Context',
    tagline: 'Articles that enhance, not overwhelm',
    color: '#9370DB',
    steps: [
      {
        label: 'Article Library',
        description: '100+ articles per pillar on deep topics',
        icon: '📰'
      },
      {
        label: 'AI Summarization',
        description: 'Extract key insights, main arguments, practical takeaways',
        icon: '💡'
      },
      {
        label: 'NaviCue Context Enrichment',
        description: 'Insights become context for NaviCues: "Research shows..."',
        icon: '🔗'
      },
      {
        label: 'Readiness Detection',
        description: 'User ready for depth on Day 14, not Day 3',
        icon: '📊'
      },
      {
        label: 'Smart Article Delivery',
        description: 'Full article delivered with context when user curious',
        icon: '📖'
      }
    ]
  },
  {
    id: 'belief-progress',
    name: 'Belief Progress → Next Steps',
    tagline: 'Adaptive progression through transformation',
    color: '#60A5FA',
    steps: [
      {
        label: 'Belief Ladder Position',
        description: 'User on Rung 3: "I deserve good things (sometimes)"',
        icon: '🪜'
      },
      {
        label: 'Progress Rate Analysis',
        description: '2 weeks on this rung, moderate pace, some resistance',
        icon: '⏳'
      },
      {
        label: 'Sticking Point Detection',
        description: 'Stuck on worthiness. Needs more evidence, less pressure',
        icon: '🎯'
      },
      {
        label: 'Next Concept Selection',
        description: 'AI suggests: Self-compassion before self-worth',
        icon: '🧭'
      },
      {
        label: 'Practice Queue Update',
        description: 'Queues compassion practices, adjusts NaviCue delivery',
        icon: '🔄'
      }
    ]
  },
  {
    id: 'therapist-dashboard',
    name: 'Therapist Dashboard',
    tagline: 'Clinical intelligence at a glance',
    color: '#F59E0B',
    steps: [
      {
        label: 'Patient Data Aggregation',
        description: 'All soundbites, practices, engagement, patterns collected',
        icon: '📦'
      },
      {
        label: 'Risk Scoring',
        description: 'ML calculates: Patient 2 showing regression signals',
        icon: '⚠️'
      },
      {
        label: 'Insight Generation',
        description: 'Auto-summary: "Abandonment schema highly active this week"',
        icon: '💬'
      },
      {
        label: 'Therapist View',
        description: 'Dashboard shows: engagement drops, schema spikes, risk flags',
        icon: '📊'
      },
      {
        label: 'Action Recommendations',
        description: 'Suggests: Check in via message, adjust intervention timing',
        icon: '✅'
      }
    ]
  },
  {
    id: 'multimodal-evidence',
    name: 'Multi-Modal Evidence',
    tagline: 'Triangulated truth across data types',
    color: '#DC2626',
    steps: [
      {
        label: 'Voice Data',
        description: 'Soundbite analysis shows: tone heavy, pace slow, content dark',
        icon: '🎤'
      },
      {
        label: 'Text Data',
        description: 'Written response: "I can\'t handle this anymore"',
        icon: '✍️'
      },
      {
        label: 'Behavioral Data',
        description: 'User skipped last 3 practices, engagement dropping',
        icon: '📉'
      },
      {
        label: 'Pattern Synthesis',
        description: 'All three point to: Window of tolerance breach',
        icon: '🔗'
      },
      {
        label: 'Triangulated Evidence',
        description: 'Confidence: 89%. Multiple data points = stronger signal',
        icon: '✨'
      }
    ]
  },
  {
    id: 'universal-player',
    name: 'Universal Player',
    tagline: 'One interface, infinite content',
    color: '#6B7280',
    steps: [
      {
        label: 'Content Types',
        description: 'NaviCue, Practice, Video clip, Article, Soundbite playback',
        icon: '🎯'
      },
      {
        label: 'Unified Format Conversion',
        description: 'All content converted to common playback structure',
        icon: '🔄'
      },
      {
        label: 'Context Detection',
        description: 'Knows: Phone vs Desktop vs Watch, commute vs home vs bed',
        icon: '📱'
      },
      {
        label: 'Device Adaptation',
        description: 'Adjusts: length, format, interaction type per context',
        icon: '⚙️'
      },
      {
        label: 'Seamless Experience',
        description: 'User never thinks about format, only engages with content',
        icon: '✨'
      }
    ]
  }
];

interface FeatureIntegrationsOrchestraProps {
  onNavigate?: (page: string) => void;
}

export function FeatureIntegrationsOrchestra({ onNavigate }: FeatureIntegrationsOrchestraProps) {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const currentIntegration = INTEGRATIONS.find(i => i.id === selectedIntegration);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0B0F' }}>
      <AnimatePresence mode="wait">
        {!selectedIntegration ? (
          <IntegrationGrid
            key="grid"
            integrations={INTEGRATIONS}
            onSelectIntegration={setSelectedIntegration}
          />
        ) : (
          <IntegrationFlow
            key={selectedIntegration}
            integration={currentIntegration!}
            onBack={() => setSelectedIntegration(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Integration Grid - Main selection view
function IntegrationGrid({ integrations, onSelectIntegration }: {
  integrations: Integration[];
  onSelectIntegration: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-12"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl" style={{ color: '#FFFFFF' }}>
            Feature Integrations
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Ten data journeys showing how everything connects
          </p>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Click to watch the flow
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {integrations.map((integration, index) => (
            <motion.button
              key={integration.id}
              onClick={() => onSelectIntegration(integration.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 text-left transition-all duration-200"
              style={{
                backgroundColor: `${integration.color}15`,
                border: `2px solid ${integration.color}`,
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{integration.steps[0].icon}</div>
                  <ChevronRight size={24} style={{ color: integration.color }} />
                  <div className="text-3xl">{integration.steps[integration.steps.length - 1].icon}</div>
                </div>
                <h3 className="text-2xl" style={{ color: '#FFFFFF' }}>
                  {integration.name}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {integration.tagline}
                </p>
                <div className="text-xs" style={{ color: `${integration.color}80` }}>
                  {integration.steps.length} steps →
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Architecture Overview */}
        <div className="mt-16 p-8" style={{
          backgroundColor: 'rgba(87, 57, 251, 0.1)',
          border: '2px solid rgba(87, 57, 251, 0.3)'
        }}>
          <h2 className="text-3xl mb-6 text-center" style={{ color: '#FFFFFF' }}>
            The Integration Architecture
          </h2>
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
              <span style={{ color: '#FF6B9D' }}>Sound Bites</span>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: '#4ECDC4' }}>Analysis Layer</span>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: '#F4A261' }}>LUMA Brain</span>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: '#95E1D3' }}>Content Selection</span>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: '#E76F51' }}>Universal Player</span>
              <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span style={{ color: '#9370DB' }}>Evidence Vault</span>
            </div>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Everything feeds LUMA. LUMA orchestrates everything. Evidence proves transformation.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Integration Flow - Animated step-by-step journey
function IntegrationFlow({ integration, onBack }: {
  integration: Integration;
  onBack: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && currentStep < integration.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep === integration.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, integration.steps.length]);

  const handlePlay = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-12"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="text-sm px-4 py-2 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
        >
          ← Back to Integrations
        </button>

        <div className="space-y-2">
          <h1 className="text-4xl" style={{ color: '#FFFFFF' }}>
            {integration.name}
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {integration.tagline}
          </p>
        </div>

        {/* Flow visualization */}
        <div className="relative py-12">
          <div className="flex items-center justify-between">
            {integration.steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: index <= currentStep ? 1 : 0.8,
                    opacity: index <= currentStep ? 1 : 0.3
                  }}
                  className="flex flex-col items-center gap-3 w-32"
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center text-3xl transition-all"
                    style={{
                      backgroundColor: index <= currentStep ? integration.color : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${index <= currentStep ? integration.color : 'rgba(255,255,255,0.2)'}`
                    }}
                  >
                    {step.icon}
                  </div>
                  <div className="text-xs text-center" style={{
                    color: index <= currentStep ? '#FFFFFF' : 'rgba(255,255,255,0.4)'
                  }}>
                    {step.label}
                  </div>
                </motion.div>
                
                {index < integration.steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: index < currentStep ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 h-0.5 mx-2"
                    style={{
                      backgroundColor: integration.color,
                      transformOrigin: 'left'
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Current step details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8"
            style={{
              backgroundColor: `${integration.color}15`,
              border: `2px solid ${integration.color}`
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{integration.steps[currentStep].icon}</div>
                <div>
                  <h2 className="text-2xl mb-2" style={{ color: '#FFFFFF' }}>
                    Step {currentStep + 1}: {integration.steps[currentStep].label}
                  </h2>
                  <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {integration.steps[currentStep].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="px-8 py-4 transition-opacity hover:opacity-80"
              style={{ backgroundColor: integration.color, color: '#000' }}
            >
              {currentStep === 0 ? 'Play Flow' : 'Replay'}
            </button>
          )}
          
          {!isPlaying && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-4 transition-opacity hover:opacity-80 disabled:opacity-30"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff'
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(integration.steps.length - 1, currentStep + 1))}
                disabled={currentStep === integration.steps.length - 1}
                className="px-6 py-4 transition-opacity hover:opacity-80 disabled:opacity-30"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff'
                }}
              >
                Next →
              </button>
            </div>
          )}

          {isPlaying && (
            <button
              onClick={() => setIsPlaying(false)}
              className="px-8 py-4 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff'
              }}
            >
              Pause
            </button>
          )}
        </div>

        {/* All steps overview */}
        <div className="grid grid-cols-5 gap-4 mt-12">
          {integration.steps.map((step, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentStep(index);
                setIsPlaying(false);
              }}
              className="p-4 text-left transition-all hover:scale-105"
              style={{
                backgroundColor: index === currentStep ? `${integration.color}30` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${index === currentStep ? integration.color : 'rgba(255,255,255,0.1)'}`,
                opacity: index <= currentStep ? 1 : 0.5
              }}
            >
              <div className="text-2xl mb-2">{step.icon}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {step.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}