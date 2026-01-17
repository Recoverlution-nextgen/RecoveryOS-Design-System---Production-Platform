/**
 * THERAPY FEATURES ARCHITECTURE SECTION
 * 
 * "THE ARCHITECTURE THAT MOVES BEYOND THE PACE OF CHANGE"
 * 
 * Three-tier tabbed showcase of platform capabilities:
 * - The Console: Practice Foundation (3 features)
 * - The Companion: Continuity Engine (3 features)
 * - The Clinical Studio: Intelligence Layer (3 features)
 * 
 * Design Pattern:
 * - Top-level tabs (like pricing section)
 * - One large tile per tab
 * - 3 feature cards within each tile
 * - Tap any feature → entire tile flips to show details
 * - Flip back to see all 3 features again
 * 
 * infiniteK DNA: No card on card, square corners, clinical elegance
 * Created: December 9, 2025
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Settings,
  Heart,
  Link2,
  Shield,
  Activity,
  Compass,
  Sparkles,
  Brain,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Database,
  Zap,
  GitBranch,
  FileText,
  Bell,
  Clock,
  ChevronRight,
  X,
  ArrowRight,
  Monitor,
  Layers
} from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ElementType;
  name: string;
  tagline: string;
  impact: string;
  mechanism: string;
  keywords: string[];
  description?: string;
}

interface ArchitectureLayer {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  backgroundAsset: string;
  features: Feature[];
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'console',
    name: 'The Console',
    title: 'Practice Foundation',
    subtitle: 'Infrastructure transforms.',
    description: 'From transactional sessions to relational care. From administrative burden to seamless flow. From burnout risk to protected capacity. The foundation layer that makes therapeutic practice sustainable.',
    color: '#5739FB',
    backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/features/the_console.avif',
    features: [
      {
        id: 'clinician-control',
        icon: Video,
        name: 'Clinician Control',
        tagline: 'Hours become journeys. Transactions become partnerships. Care that compounds.',
        description: 'The shift from episodic to everlasting. Clients commit to the path, not just the appointment. Your clinical presence carries forward through neuroadaptive support between sessions. Relationship-driven care meets sustainable economics. Predictable revenue built on therapeutic integrity, not transactional volume. The journey matters more than any single destination.',
        impact: 'Transforms transactional session bookings into lifelong therapeutic partnerships with recurring revenue model',
        mechanism: 'Subscription-based care architecture where clients commit to journeys combining sessions with companion continuity',
        keywords: ['Recurring Revenue', 'Lifelong Care', 'Therapeutic Partnerships']
      },
      {
        id: 'connected-care',
        icon: Link2,
        name: 'Connected Care',
        tagline: 'Administration vanishes. Alignment surfaces. Session time becomes sacred.',
        description: 'Video conferencing, scheduling, billing, and records converge into invisible infrastructure. But the real transformation lives deeper: session insights flow into companion experiences. You curate the journey together. They practice what matters between meetings. You arrive briefed with progress signals showing readiness, risks, momentum. They arrive having done the work, not just thought about it. The hour maximizes human connection because operations handle everything else. Prepared, not blindsided. Aligned, not catching up.',
        impact: 'Maximizes human potential by aligning therapist and client on shared path with operational excellence',
        mechanism: 'Unified platform combining video conferencing, scheduling, billing, EHR, and session-to-companion insight flow',
        keywords: ['Operational Flow', 'Session Alignment', 'Human Potential']
      },
      {
        id: 'therapeutic-wellbeing',
        icon: Heart,
        name: 'Therapeutic Wellbeing',
        tagline: 'You care for others. The platform cares for you. Same tools. Same compassion.',
        description: 'The vessel cannot pour when empty. You prescribe regulation practices, identity-first prompts, adaptive intelligence, searchable knowledge. You deserve the same. Therapeutic Wellbeing delivers neuroadaptive support threaded through your daily work. Right-moment micro-practices when your nervous system signals need. Somatic techniques that restore rhythm. Cognitive reframes that steady hard moments. A sequenced cadence building your own capacity while you build theirs. Clinical excellence without burnout when infrastructure protects the protector.',
        impact: 'Protects practitioner capacity by providing the same neuroadaptive wellbeing tools therapists deliver to clients',
        mechanism: 'Four-pillar wellbeing system: Experiential Growth, Adaptive Intelligence, Physiological Resilience, Instant Insight',
        keywords: ['Practitioner Capacity', 'Burnout Prevention', 'Caregiver Wellbeing']
      }
    ]
  },
  {
    id: 'companion',
    name: 'The Companion',
    title: 'Continuity Engine',
    subtitle: 'Care persists.',
    description: 'Between sessions, clients experience structure that feels personal. Weekly journeys. Contextual prompts. Somatic practices. Psychoeducation exactly when curiosity strikes. The continuity layer that transforms insight into integration.',
    color: '#40E0D0',
    backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/features/the_companion.avif',
    features: [
      {
        id: 'journey',
        icon: Compass,
        name: 'Journey',
        tagline: 'Experience, reflect, anchor. Therapeutic cycles designed for completion, not aspiration.',
        description: 'Every week brings a new journey clients actually finish. Experience therapeutic content that resonates. Reflect on personal meaning through guided prompts. Anchor insights into evolving identity. The ERA framework repeated until neural pathways strengthen. Mapped to recovery milestones. Designed for fragmented attention spans, not ideal conditions. Behavioral change through micro-doses that compound, not overwhelming assignments that create shame. Progress builds because the structure holds.',
        impact: 'Transforms passive treatment into active practice through structured, repeatable behavioral frameworks',
        mechanism: 'ERA cycle architecture (Experience → Reflect → Anchor) repeated weekly to build neural pathways through consistent therapeutic engagement',
        keywords: ['ERA Framework', 'Neural Pathways', 'Behavioral Change']
      },
      {
        id: 'navicues',
        icon: Bell,
        name: 'Navicues',
        tagline: 'Contextual interventions that redirect patterns before they spiral. Support, never surveillance.',
        description: 'Micro-interventions appearing when need arises, not when schedules dictate. Identity-first language reinforcing who they are becoming, not what they are escaping. Somatic grounding when the body signals danger. Cognitive reframes when thoughts loop toward darkness. Relational prompts when isolation whispers lies. Gentle redirection woven through daily experience. Therapeutic presence that feels like someone who knows them, cares deeply, and shows up consistently. Never intrusive. Always available.',
        impact: 'Creates continuous therapeutic presence through contextual micro-interventions that redirect attention without overwhelming',
        mechanism: 'Adaptive content delivery system serving targeted building blocks based on user state, journey progress, and therapeutic goals',
        keywords: ['Micro Interventions', 'Adaptive Delivery', 'Contextual Flow']
      },
      {
        id: 'wellbeing-toolkit',
        icon: Heart,
        name: 'Wellbeing & Toolkit',
        tagline: 'Regulation when the body needs it. Knowledge when the mind seeks it.',
        description: 'Wellbeing delivers somatic practices for immediate use. Breathwork calming nervous system activation. Movement shifting stuck energy. Meditation quieting racing thoughts. Short videos designed for hard moments, not perfect conditions. Toolkit provides searchable psychoeducation organized by recovery phase and pillar. Knowledge landing when curiosity opens the door, not when curriculum demands attention. The nervous system learns safety through repetition. Understanding deepens through exploration. Both accessible exactly when needed.',
        impact: 'Builds nervous system regulation capacity and delivers contextual psychoeducation precisely when needed',
        mechanism: 'Curated video library of somatic practices combined with searchable resource library organized by pillar and micro-block',
        keywords: ['Somatic Integration', 'Psychoeducation', 'Knowledge Base']
      }
    ]
  },
  {
    id: 'studio',
    name: 'The Clinical Studio',
    title: 'Intelligence Layer',
    subtitle: 'Data speaks.',
    description: 'Pattern recognition revealing risks before crisis. Visualizations proving progress when hope wavers. AI companionship scaling care without replacing humanity. The intelligence layer that transforms anecdote into evidence.',
    color: '#3E2BB8',
    backgroundAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/features/the_clinical_studio.avif',
    features: [
      {
        id: 'luma',
        icon: Brain,
        name: 'LUMA',
        tagline: 'Emotional intelligence meeting infinite availability. We only ever guide, never advise.',
        description: 'The always-present therapeutic companion extending your capacity without exhausting your hours. LUMA handles daily check-ins feeling personal, not transactional. Surfaces risk signals demanding clinical attention, not noise overwhelming dashboards. Delivers contextual support during activation spikes, not generic responses. Trained on recovery trajectories understanding what works, when it works, why it works. Pattern recognition meeting emotional precision. Available 24/7. Human care scaled through intelligence, never replaced by it.',
        impact: 'Scales clinical care 24/7 through emotionally intelligent responses that adapt to patient state and therapeutic context',
        mechanism: 'Pattern recognition AI trained on recovery trajectories, delivering contextual support from check-ins to crisis intervention',
        keywords: ['Pattern Recognition', '24/7 Support', 'Emotional Intelligence']
      },
      {
        id: 'state',
        icon: BarChart3,
        name: 'STATE',
        tagline: 'Energy, Clarity, Anchorage. Three quick questions. One longitudinal truth.',
        description: 'The daily heartbeat signal making everything else intelligent. Three dimensions measured every morning. Energy tracking nervous system activation. Clarity measuring cognitive function. Anchorage reading emotional stability. Simple questions clients actually answer. Data compounding into patterns predicting risks before they become crises. Powers adaptive delivery knowing when biology allows learning. Triggers interventions before patterns spiral. Informs clinical conversations with evidence, not hunches. The baseline establishing personal recovery signature over time.',
        impact: 'Creates personal recovery signature through daily measurement of Energy, Clarity, and Anchorage states',
        mechanism: 'Three-dimensional daily check-in system tracking nervous system activation, cognitive function, and emotional stability',
        keywords: ['Three Dimensions', 'Recovery Signature', 'Daily Tracking']
      },
      {
        id: 'momentum',
        icon: TrendingUp,
        name: 'Momentum',
        tagline: 'Progress visualized when hope feels distant. Patterns revealed that moments hide.',
        description: 'Daily STATE data transforming into longitudinal story. Beautiful visualizations revealing behavioral patterns invisible in single moments. Engagement metrics showing what actually works, not what sounds therapeutic. Risk predictions based on baseline deviation, not clinical assumptions. Wins celebrated with evidence, not just encouragement. The arc becoming visible when today feels impossibly hard. Clients seeing their trajectory across weeks and months. Therapists proving impact with data. Progress no longer requiring faith when proof speaks.',
        impact: 'Reveals recovery patterns and predicts risks through beautiful visualizations of longitudinal engagement and state data',
        mechanism: 'Data transformation engine converting daily check-ins and engagement metrics into trend analysis, pattern recognition, and predictive insights',
        keywords: ['Pattern Recognition', 'Risk Prediction', 'Trend Analysis']
      }
    ]
  }
];

export default function TherapyFeaturesArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string>('console');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const currentLayer = architectureLayers.find(layer => layer.id === activeLayer);

  const handleFeatureClick = (featureId: string) => {
    if (selectedFeature === featureId) {
      setSelectedFeature(null); // Close if clicking same feature
    } else {
      setSelectedFeature(featureId);
    }
  };

  const handleCloseDetail = () => {
    setSelectedFeature(null);
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Section Header - LEFT ALIGNED PATTERN (from THE DELIVERY) */}
        <div className="section-header-left mb-16">
          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow">
              <Layers size={14} style={{ strokeWidth: 2.5 }} />
              <span>THE ARCHITECTURE</span>
            </div>
            <h2 className="section-headline-therapy">
              Signals sync.<br />
              <span className="accent">Pathways flow.</span>
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
              Orchestration, not overload. From signal to service. A nervous system for care.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          {architectureLayers.map((layer, index) => (
            <motion.button
              key={layer.id}
              onClick={() => {
                setActiveLayer(layer.id);
                setSelectedFeature(null); // Reset selected feature when switching tabs
              }}
              className="flex-1 text-left px-6 py-5 transition-all duration-500"
              style={{
                background: activeLayer === layer.id 
                  ? layer.color 
                  : '#FFFFFF',
                border: `1px solid ${activeLayer === layer.id ? layer.color : 'rgba(0, 0, 0, 0.08)'}`,
                boxShadow: activeLayer === layer.id
                  ? `0 12px 40px ${layer.color}25, 0 4px 16px ${layer.color}15`
                  : '0 1px 3px rgba(0, 0, 0, 0.05)',
                borderRadius: '0px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div 
                className="uppercase tracking-wider mb-2"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: activeLayer === layer.id ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.5)',
                  fontFamily: 'var(--font-display)'
                }}
              >
                {layer.name}
              </div>
              <div 
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: activeLayer === layer.id ? '#FFFFFF' : '#1A1A1A',
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1.3
                }}
              >
                {layer.title}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Main Tile Container */}
        <AnimatePresence mode="wait">
          {currentLayer && (
            <motion.div
              key={currentLayer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden"
              style={{
                borderRadius: '0px',
                boxShadow: `
                  0 20px 60px ${currentLayer.color}12,
                  0 8px 24px ${currentLayer.color}08
                `,
                minHeight: '600px'
              }}
            >
              {/* Full-Bleed Asset Background */}
              <div className="absolute inset-0" style={{ zIndex: 1 }}>
                <img 
                  src={currentLayer.backgroundAsset}
                  alt=""
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                {/* Dark gradient overlay for text legibility */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)',
                    zIndex: 2
                  }}
                />
              </div>

              <AnimatePresence mode="wait">
                {!selectedFeature ? (
                  // FRONT FACE: Show all 3 features
                  <motion.div
                    key="front"
                    initial={{ opacity: 0, rotateY: -15 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 15 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="relative p-8 md:p-12 flex flex-col"
                    style={{ 
                      zIndex: 10,
                      minHeight: '600px'
                    }}
                  >
                    {/* Layer Hero Copy */}
                    <div className="mb-8">
                      {/* Eyebrow with Icon */}
                      <div 
                        className="mb-4 flex items-center gap-2"
                      >
                        {currentLayer.id === 'console' && <Monitor size={14} style={{ strokeWidth: 2.5, color: currentLayer.color }} />}
                        {currentLayer.id === 'companion' && <Sparkles size={14} style={{ strokeWidth: 2.5, color: currentLayer.color }} />}
                        {currentLayer.id === 'studio' && <Brain size={14} style={{ strokeWidth: 2.5, color: currentLayer.color }} />}
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: currentLayer.color,
                            textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          {currentLayer.name.toUpperCase()}
                        </span>
                      </div>

                      {/* Hero Headline */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.1,
                          color: '#FFFFFF',
                          marginBottom: '1rem'
                        }}
                      >
                        {currentLayer.subtitle}
                      </h3>

                      {/* Description - Subtitle */}
                      <p 
                        style={{
                          fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                          lineHeight: 1.6,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: 500,
                          maxWidth: '900px'
                        }}
                      >
                        {currentLayer.description}
                      </p>
                    </div>

                    {/* Feature Grid - aligned to bottom */}
                    <div 
                      className="grid gap-3 mt-auto"
                      style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
                      }}
                    >
                      {currentLayer.features.map((feature, index) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <motion.div
                            key={feature.id}
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
                              handleFeatureClick(feature.id);
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                              backgroundColor: 'rgba(255, 255, 255, 0.12)',
                              y: -2
                            }}
                          >
                            {/* Hover gradient effect */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${currentLayer.color}20 0%, transparent 100%)`
                              }}
                            />

                            <div className="relative flex flex-col">
                              {/* Icon Eyebrow */}
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                                style={{ 
                                  backgroundColor: `${currentLayer.color}25`,
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <FeatureIcon size={16} style={{ color: currentLayer.color, strokeWidth: 2 }} />
                              </div>

                              {/* Title */}
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
                                {feature.name}
                              </h4>

                              {/* Tagline */}
                              <p
                                style={{
                                  fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)',
                                  lineHeight: 1.5,
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  fontWeight: 400,
                                  marginBottom: '0.75rem'
                                }}
                              >
                                {feature.tagline}
                              </p>

                              {/* TAP TO EXPLORE badge - visible always */}
                              <div 
                                className="inline-flex items-center gap-2 px-3 py-1.5 border self-start mt-auto"
                                style={{
                                  background: `linear-gradient(135deg, ${currentLayer.color}12, ${currentLayer.color}08)`,
                                  borderColor: 'rgba(255, 255, 255, 0.25)',
                                  borderRadius: '0px',
                                  backdropFilter: 'blur(16px) saturate(150%)',
                                  WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                                  boxShadow: `0 2px 8px ${currentLayer.color}15, inset 0 1px 0 rgba(255, 255, 255, 0.25)`
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '0.6875rem',
                                    fontWeight: 700,
                                    color: '#FFFFFF',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                                  }}
                                >
                                  TAP TO EXPLORE
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  // BACK FACE: Show selected feature details
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, rotateY: -15 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 15 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="relative p-8 md:p-12"
                    style={{ zIndex: 10 }}
                  >
                    {(() => {
                      const feature = currentLayer.features.find(f => f.id === selectedFeature);
                      if (!feature) return null;
                      
                      const FeatureIcon = feature.icon;
                      
                      return (
                        <div 
                          className="relative p-8 md:p-10"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(20px) saturate(150%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '0px',
                            boxShadow: `0 8px 32px ${currentLayer.color}15, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                          }}
                        >
                          {/* Close Button */}
                          <button
                            onClick={handleCloseDetail}
                            className="absolute top-6 right-6 p-2.5 transition-all duration-300 hover:bg-white/10 z-50"
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '0px',
                              backdropFilter: 'blur(10px)'
                            }}
                            aria-label="Close detail view"
                          >
                            <X size={20} style={{ color: '#FFFFFF', strokeWidth: 2 }} />
                          </button>

                          <div className="max-w-4xl">
                            {/* Feature Header */}
                            <div className="flex items-start gap-6 mb-10">
                              <div 
                                className="flex items-center justify-center flex-shrink-0"
                                style={{
                                  width: '72px',
                                  height: '72px',
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  borderRadius: '0px',
                                  backdropFilter: 'blur(10px)'
                                }}
                              >
                                <FeatureIcon 
                                  size={36} 
                                  style={{ 
                                    color: currentLayer.color,
                                    strokeWidth: 2,
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                                  }} 
                                />
                              </div>
                              
                              <div className="flex-1">
                                <h3 
                                  className="mb-2"
                                  style={{
                                    fontSize: '32px',
                                    fontWeight: 800,
                                    color: '#FFFFFF',
                                    fontFamily: 'var(--font-display)',
                                    lineHeight: 1.2
                                  }}
                                >
                                  {feature.name}
                                </h3>
                                <p 
                                  style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: currentLayer.color,
                                    fontFamily: 'var(--font-display)',
                                    marginBottom: '16px'
                                  }}
                                >
                                  {feature.tagline}
                                </p>
                                <p 
                                  style={{
                                    fontSize: '16px',
                                    lineHeight: 1.7,
                                    color: 'rgba(255, 255, 255, 0.95)'
                                  }}
                                >
                                  {feature.description}
                                </p>
                              </div>
                            </div>

                            {/* Impact & Mechanism */}
                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                              <div>
                                <div 
                                  className="mb-3 flex items-center gap-2"
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    color: currentLayer.color,
                                    fontFamily: 'var(--font-display)'
                                  }}
                                >
                                  <Zap size={14} style={{ strokeWidth: 2.5 }} />
                                  <span>Impact</span>
                                </div>
                                <p 
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: 1.7,
                                    color: 'rgba(255, 255, 255, 0.9)'
                                  }}
                                >
                                  {feature.impact}
                                </p>
                              </div>

                              <div>
                                <div 
                                  className="mb-3 flex items-center gap-2"
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    color: currentLayer.color,
                                    fontFamily: 'var(--font-display)'
                                  }}
                                >
                                  <Settings size={14} style={{ strokeWidth: 2.5 }} />
                                  <span>Mechanism</span>
                                </div>
                                <p 
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: 1.7,
                                    color: 'rgba(255, 255, 255, 0.9)'
                                  }}
                                >
                                  {feature.mechanism}
                                </p>
                              </div>
                            </div>

                            {/* Keywords */}
                            <div>
                              <div 
                                className="mb-4"
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                  color: currentLayer.color,
                                  fontFamily: 'var(--font-display)'
                                }}
                              >
                                Key Capabilities
                              </div>
                              <div className="flex flex-wrap gap-3">
                                {feature.keywords.map((keyword, idx) => (
                                  <div
                                    key={idx}
                                    className="px-4 py-2"
                                    style={{
                                      background: 'rgba(255, 255, 255, 0.1)',
                                      border: '1px solid rgba(255, 255, 255, 0.2)',
                                      borderRadius: '0px',
                                      backdropFilter: 'blur(10px)',
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      color: '#FFFFFF',
                                      fontFamily: 'var(--font-display)'
                                    }}
                                  >
                                    {keyword}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}