/**
 * THERAPY PLATFORM LAYERS
 * 
 * Three large flip tiles - each tile shows its features on the FRONT
 * Click any feature → tile flips → shows that feature's "For You / For Clients"
 * Clean, no scroll, everything on the tile
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Calendar,
  DollarSign,
  FileText,
  Heart,
  Footprints,
  MapPin,
  Shield,
  Activity,
  Brain,
  Zap,
  BarChart3,
  Sparkles,
  ArrowRight,
  X,
  Users,
  Check
} from 'lucide-react';

// Types
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  forYou: string[];
  forClients: string[];
}

interface LayerData {
  number: string;
  title: string;
  subtitle: string;
  color: string;
  assetUrl: string;
  features: Feature[];
}

// Component for individual layer tile
interface LayerTileProps {
  layer: LayerData;
  delay: number;
}

const LayerTile: React.FC<LayerTileProps> = ({ layer, delay }) => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  
  const isFlipped = selectedFeature !== null;
  const activeFeature = selectedFeature !== null ? layer.features[selectedFeature] : null;

  return (
    <motion.div
      className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      style={{
        borderRadius: '0px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(87, 57, 251, 0.12)',
      }}
      whileHover={{
        scale: 1.008,
        y: -2,
        boxShadow: '0 28px 80px rgba(0, 0, 0, 0.12), 0 12px 32px rgba(87, 57, 251, 0.15)'
      }}
    >
      {/* Shimmer Animation Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
          animation: 'shimmer-glass 12s ease-in-out infinite',
          borderRadius: '0px',
          zIndex: 100
        }}
      />

      {/* Background Image - Always Visible */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <img 
          src={layer.assetUrl}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* Content Container */}
      <div 
        className="relative flex flex-col" 
        style={{ 
          zIndex: 10,
          height: '100%',
          padding: 'clamp(1.5rem, 3vw, 3rem)'
        }}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            // FRONT FACE - Show all features as grid
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(2rem, 3vw, 3rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 0.9,
                      color: 'rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {layer.number}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                    marginBottom: '0.5rem'
                  }}
                >
                  {layer.title}
                </h3>

                <p
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                    lineHeight: 1.5,
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontWeight: 500,
                  }}
                >
                  {layer.subtitle}
                </p>
              </div>

              {/* Features Grid */}
              <div 
                className="grid gap-3 flex-1"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                }}
              >
                {layer.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      className="relative p-4 cursor-pointer group/feature overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '0px',
                        transition: 'all 0.3s ease',
                        minHeight: '220px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeature(index);
                      }}
                      whileHover={{
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        y: -2
                      }}
                    >
                      {/* Hover gradient effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${layer.color}20 0%, transparent 100%)`
                        }}
                      />
                      
                      <div className="relative flex flex-col">
                        {/* Icon Eyebrow */}
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                          style={{ 
                            backgroundColor: `${layer.color}25`,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Icon size={16} style={{ color: layer.color, strokeWidth: 2 }} />
                        </div>
                        
                        {/* Title - Two Lines */}
                        <h4 
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                            letterSpacing: '-0.01em',
                            color: '#FFFFFF',
                            marginBottom: '0.5rem',
                            lineHeight: 1.2,
                            whiteSpace: 'pre-line'
                          }}
                        >
                          {feature.title}
                        </h4>
                        
                        {/* Description */}
                        <p
                          style={{
                            fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)',
                            lineHeight: 1.5,
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: 400,
                            marginBottom: '0.75rem'
                          }}
                        >
                          {feature.description}
                        </p>
                        
                        {/* Explore CTA */}
                        <div className="flex items-center gap-1.5 opacity-0 group-hover/feature:opacity-100 transition-opacity mt-auto">
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '0.6875rem',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: layer.color
                            }}
                          >
                            Explore
                          </span>
                          <ArrowRight 
                            size={12} 
                            style={{ color: layer.color, strokeWidth: 2.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            // BACK FACE - Show selected feature detail
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {activeFeature && (
                <>
                  {/* Header with close button */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${layer.color}25` }}
                      >
                        {React.createElement(activeFeature.icon, { 
                          size: 24, 
                          style: { color: layer.color, strokeWidth: 2 } 
                        })}
                      </div>
                      <div>
                        <span
                          className="inline-block px-2.5 py-1 rounded-full mb-1"
                          style={{
                            backgroundColor: `${layer.color}20`,
                            color: layer.color,
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {layer.number} / {layer.title.toUpperCase()}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                            letterSpacing: '-0.02em',
                            color: '#FFFFFF',
                            lineHeight: 1.1
                          }}
                        >
                          {activeFeature.title}
                        </h4>
                      </div>
                    </div>
                    <button
                      className="p-2.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                      onClick={() => setSelectedFeature(null)}
                      aria-label="Close"
                    >
                      <X size={20} style={{ color: '#FFFFFF', strokeWidth: 2.5 }} />
                    </button>
                  </div>

                  {/* Two-column layout for For You / For Clients */}
                  <div className="grid md:grid-cols-2 gap-8 flex-1">
                    {/* For You */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${layer.color}20` }}
                        >
                          <Users size={16} style={{ color: layer.color, strokeWidth: 2.5 }} />
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            color: layer.color
                          }}
                        >
                          FOR YOU
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {activeFeature.forYou.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check 
                              size={16} 
                              className="mt-0.5 flex-shrink-0" 
                              style={{ color: layer.color, strokeWidth: 2.5 }} 
                            />
                            <span
                              style={{
                                fontSize: 'clamp(0.875rem, 1.25vw, 0.9375rem)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                lineHeight: 1.6,
                                fontWeight: 400
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* For Clients */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${layer.color}20` }}
                        >
                          <Heart size={16} style={{ color: layer.color, strokeWidth: 2.5 }} />
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.08em',
                            color: layer.color
                          }}
                        >
                          FOR CLIENTS
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {activeFeature.forClients.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check 
                              size={16} 
                              className="mt-0.5 flex-shrink-0" 
                              style={{ color: layer.color, strokeWidth: 2.5 }} 
                            />
                            <span
                              style={{
                                fontSize: 'clamp(0.875rem, 1.25vw, 0.9375rem)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                lineHeight: 1.6,
                                fontWeight: 400
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export function TherapyPlatformLayers() {
  const layers: LayerData[] = [
    {
      number: '01',
      title: 'Practice Foundation',
      subtitle: 'Everything you need to run your practice.',
      color: '#3E2BB8',
      assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/oneecosystem/Practice%20Foundation.avif',
      features: [
        {
          icon: Video,
          title: 'Sessions\nAnywhere',
          description: 'Secure and convenient video conferencing.',
          forYou: [
            'HIPAA compliant video conferencing built in',
            'Automatic session recording with encrypted storage',
            'No external tools or subscriptions needed',
            'One-click start from your dashboard'
          ],
          forClients: [
            'One-click join from any device',
            'No downloads or complex setup required',
            'Reliable connection without friction',
            'Clear audio and video quality'
          ]
        },
        {
          icon: Calendar,
          title: 'Automatic\nScheduling',
          description: 'Streamline client communication.',
          forYou: [
            'Set availability once, clients book themselves',
            'Automated reminders reduce no-shows',
            'Syncs with Google, Outlook, iCal',
            'Buffer time between sessions automated'
          ],
          forClients: [
            'Book based on real-time availability',
            'Reschedule without email threads',
            'Automatic reminders for upcoming sessions',
            'See your schedule at a glance'
          ]
        },
        {
          icon: DollarSign,
          title: 'Invisible\nBilling',
          description: 'Effortlessly manage billing and payments.',
          forYou: [
            'Automatic invoices generated after each session',
            'Accept card, insurance, or direct billing',
            'Track revenue and payments in one place',
            'Superbill generation for insurance claims'
          ],
          forClients: [
            'Clear invoices delivered automatically',
            'Pay securely with card or submit to insurance',
            'No confusion about what they owe',
            'Superbills provided for reimbursement'
          ]
        },
        {
          icon: FileText,
          title: 'Living\nRecords',
          description: 'Maintain HIPAA compliant electronic health records.',
          forYou: [
            'HIPAA compliant electronic health records',
            'Session notes and treatment plans centralized',
            'Activity history shows client engagement',
            'Search and filter across your caseload'
          ],
          forClients: [
            'Access their own records anytime',
            'Review treatment plans between sessions',
            'Trust in encrypted protection',
            'Export their data if they choose'
          ]
        },
        {
          icon: Activity,
          title: 'Mirror\nPractice',
          description: 'Support your own mental health and capacity.',
          forYou: [
            'Access the same wellbeing tools you assign',
            'Track your own regulation and capacity',
            'Prevent burnout with somatic practices',
            'Sustainable care starts with self-care'
          ],
          forClients: [
            'Know their therapist practices what they preach',
            'Trust in a shared understanding',
            'See wellbeing as ongoing, not achieved',
            'Modeling matters more than advice'
          ]
        }
      ]
    },
    {
      number: '02',
      title: 'Continuity Engine',
      subtitle: 'What makes your practice different.',
      color: '#40E0D0',
      assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/oneecosystem/Continuity%20Engine.avif',
      features: [
        {
          icon: Sparkles,
          title: 'Companion\nApp',
          description: 'Care that moves with you. Support that knows.',
          forYou: [
            'Extends your therapeutic frameworks into everyday moments',
            'Neural pattern mapping reveals behavioral architecture',
            'Micro-doses complexity through neuroadaptive pacing',
            'Journey mapping captures backstory to understand foundation'
          ],
          forClients: [
            'Always-on support that knows their story and respects autonomy',
            'Behavior rewires through small, spaced moves, not force',
            'Plants seeds for therapeutic discovery, never gives advice',
            'Guides from knowing, to believing, to embodying real change'
          ]
        },
        {
          icon: Brain,
          title: 'Amplified\nScience',
          description: 'Six core brain systems that drive lasting recovery.',
          forYou: [
            'Applied neuroplasticity research foundation built in',
            'Six pillar framework creates architectural integrity',
            'Experiential learning methodology proven by neuroscience',
            'Clinical wisdom digitized into scalable infrastructure'
          ],
          forClients: [
            'Brain creates stronger connections through real-world practice',
            'Recovery anchored in six core systems, not scattered tactics',
            'Lasting change through lived experience, not passive reading',
            'Each practice strengthens specific neural circuits over time'
          ]
        },
        {
          icon: Footprints,
          title: 'Intelligent\nJourneys',
          description: 'Sustained behavioral shifts through experiential delivery.',
          forYou: [
            'ERA micro-cycles structure Experience, Reflect, Anchor weekly',
            'JITAI framework delivers precision interventions contextually',
            'Pathway automation maintains therapeutic momentum',
            'Somatic intelligence and behavioral architecture integrated'
          ],
          forClients: [
            'Transforms passive treatment into active daily practice',
            'Right support at the right moment based on their state',
            'Weekly cycles build neural pathways through consistency',
            'Relevance keeps them engaged and moving forward'
          ]
        },
        {
          icon: Shield,
          title: 'Connected\nEcosystem',
          description: 'Felt safety and continuous connection that prevents isolation.',
          forYou: [
            'State captures Energy, Clarity, Anchorage as recovery signature',
            'Wellbeing library tagged to emotional states and goals',
            'Toolkit surfaces resources based on journey context',
            'Insights transform data into pattern recognition and prediction'
          ],
          forClients: [
            'Daily check-in builds awareness of their unique patterns',
            'Evidence-based practices for regulation exactly when needed',
            'Knowledge and tools appear when most relevant',
            'See their recovery patterns emerge through beautiful data'
          ]
        }
      ]
    },
    {
      number: '03',
      title: 'Intelligence Layer',
      subtitle: 'What proves your impact.',
      color: '#5739FB',
      assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/oneecosystem/Intelligence%20Layer.avif',
      features: [
        {
          icon: Brain,
          title: 'Neuroadaptive\nCompanion',
          description: 'Emotionally intelligent therapeutic companion delivering contextual support.',
          forYou: [
            'AI companion trained on your therapeutic approach',
            'Extends your presence without 24/7 availability',
            'Conversation logs surface insights before sessions',
            'Carries your frameworks into everyday moments'
          ],
          forClients: [
            'Always available support carrying frameworks',
            'Contextual guidance in moments of overwhelm',
            'Companion that remembers and respects autonomy',
            'Not a chatbot, an extension of therapeutic container'
          ]
        },
        {
          icon: Zap,
          title: 'Session\nSignals',
          description: 'Real-time three-dimensional snapshots and predictive indicators available anytime.',
          forYou: [
            'Pre-session readiness signals before they arrive',
            'Risk indicators surface before crisis',
            'Engagement patterns show therapeutic momentum',
            'Know what to prioritize before they sit down'
          ],
          forClients: [
            'Strength-based progress views',
            'No guilt-inducing streaks or gamification',
            'Privacy protected, detailed data stays on device',
            'See their own momentum building'
          ]
        },
        {
          icon: BarChart3,
          title: 'Clinical\nStudio',
          description: 'Turns trend analysis, pattern recognition, and predictive insights into measurable impact.',
          forYou: [
            'Publish measurable outcomes for referrers',
            'Track engagement, retention, therapeutic impact',
            'Transform practice from anecdotes into evidence',
            'Demonstrate value to commissioners and funders'
          ],
          forClients: [
            'See their own progress build confidence',
            'Understand impact without shame or pressure',
            'Trust their effort is leading somewhere',
            'Data shows growth even when it feels slow'
          ]
        }
      ]
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Header - LEFT ALIGNED PATTERN */}
        <div className="section-header-left">
          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow">
              <Sparkles size={14} style={{ strokeWidth: 2.5 }} />
              <span>THE PLATFORM</span>
            </div>
            <h2 className="section-headline-therapy">
              Three layers.<br />
              <span className="accent">One ecosystem.</span>
            </h2>
          </motion.div>

          <motion.div
            className="subheading-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="section-subheading">
              The continuous care operating system for care professionals. Keeps healing in motion and delivers defensible ROI.
            </p>
          </motion.div>
        </div>

        {/* Layer Tiles */}
        <div className="space-y-6">
          {layers.map((layer, index) => (
            <LayerTile
              key={layer.number}
              layer={layer}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}