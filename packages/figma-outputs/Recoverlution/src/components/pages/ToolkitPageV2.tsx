/**
 * TOOLKIT - infiniteK Design System V2
 * 
 * Philosophy: "Recovery isn't learned, it's built"
 * 
 * Toolkit is the Skills Lab - three interconnected foundations:
 * 1. LIBRARY (Articles): Understanding the WHY
 *    - Deep educational content, stories, research-backed insights
 *    - "Learn the science, understand yourself"
 * 
 * 2. BUILDING BLOCKS (Micro-blocks): Understanding the WHAT
 *    - Foundational concepts, core therapeutic principles
 *    - "The building blocks of change"
 * 
 * 3. PRACTICES: Mastering the HOW
 *    - Actionable techniques, step-by-step guidance
 *    - "From knowledge to competency"
 * 
 * Integration with Platform Ecosystem:
 * - State: When struggling, suggests relevant skills
 * - NaviCues: Provocations link to specific practices
 * - Journey: Weekly themes connect to resources
 * - Momentum: Tracks skill usage and mastery
 * - Wellbeing: Physical practices support body foundations
 * - LUMA: Identifies which skills are working
 * 
 * Design Approach:
 * - Unified dashboard showing all three foundations
 * - Skill competency across six pillars
 * - Usage analytics and personalization
 * - Glass aesthetic with 4:5 assets
 */

import { useState, useEffect } from "react";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { 
  BookOpen, Zap, Play, Heart, Shield, Users, Brain, Target, Sparkles,
  TrendingUp, Clock, CheckCircle, ArrowRight, Lightbulb, Tag
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Asset for cards (4:5 ratio) - using momentum asset for now
const TOOLKIT_ASSET = "https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Library/4:5/WebP/3D%20SHAPE%20%20momentum%20chips.png";

// The Six Pillars
const SIX_PILLARS = {
  emotional: {
    clinical: "Emotional Regulation",
    patient: "Feeling It Through",
    icon: Heart,
    color: "#7C67FF"
  },
  stress: {
    clinical: "Stress Resilience",
    patient: "Staying Steady",
    icon: Shield,
    color: "#C49DC4"
  },
  social: {
    clinical: "Social Connectivity",
    patient: "Showing Up",
    icon: Users,
    color: "#9D8FFF"
  },
  cognitive: {
    clinical: "Cognitive Reframing",
    patient: "Thinking Differently",
    icon: Brain,
    color: "#3E2BB8"
  },
  identity: {
    clinical: "Identity Integration",
    patient: "Becoming Whole",
    icon: Target,
    color: "#5739FB"
  },
  decision: {
    clinical: "Decision Mastery",
    patient: "Choosing Wisely",
    icon: Sparkles,
    color: "#E1A57E"
  }
};

type PillarKey = keyof typeof SIX_PILLARS;

// Practice - Actionable skill
interface Practice {
  id: string;
  name: string;
  description: string;
  duration: string;
  pillar: PillarKey;
  timesCompleted: number; // User's practice count
  lastCompleted?: string; // ISO date
  appearsIn: {
    type: 'article' | 'block';
    id: number;
    title: string;
  }[];
}

// Article - Deep wisdom
interface Article {
  id: number;
  title: string;
  subtitle: string;
  pillar: PillarKey;
  readTime: string;
  image: string;
  isCompleted: boolean;
  practices: string[]; // Practice IDs
}

// Building Block - Core concept
interface BuildingBlock {
  id: number;
  title: string;
  subtitle: string;
  pillar: PillarKey;
  readTime: string;
  image: string;
  isCompleted: boolean;
  practices: string[]; // Practice IDs
}

interface ToolkitData {
  skillStats: {
    articlesRead: number;
    blocksCompleted: number;
    practicesUsed: number;
    mostUsedPillar: PillarKey;
  };
  pillarCompetency: Record<PillarKey, number>; // 0-100 score
  recentActivity: {
    type: 'article' | 'block' | 'practice';
    id: string | number;
    title: string;
    date: string;
  }[];
}

interface ToolkitPageV2Props {
  patientId?: string | null;
  onNavigateToArticle?: (articleId: number) => void;
  onNavigateToBuildingBlock?: (blockId: number) => void;
  onNavigateToPractice?: (practiceId: string) => void;
}

export function ToolkitPageV2({ 
  patientId, 
  onNavigateToArticle,
  onNavigateToBuildingBlock,
  onNavigateToPractice 
}: ToolkitPageV2Props) {
  const [selectedPillar, setSelectedPillar] = useState<PillarKey | "all">("all");
  const [activeView, setActiveView] = useState<"overview" | "library" | "blocks" | "practices">("overview");
  const [toolkitData, setToolkitData] = useState<ToolkitData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToolkitData();
  }, [patientId]);

  const loadToolkitData = () => {
    setLoading(true);

    // In real implementation, this would aggregate from:
    // - Article/block completion tracking
    // - Practice usage logs
    // - Journey integration (weekly themes)
    // - State correlations (which skills help which states)
    // - Momentum patterns (skill consistency)

    const mockData: ToolkitData = {
      skillStats: {
        articlesRead: 12,
        blocksCompleted: 8,
        practicesUsed: 24,
        mostUsedPillar: "emotional"
      },
      pillarCompetency: {
        emotional: 75,
        stress: 60,
        social: 30,
        cognitive: 45,
        identity: 40,
        decision: 55
      },
      recentActivity: [
        { type: 'practice', id: '5-4-3-2-1-grounding', title: '5-4-3-2-1 Grounding', date: '2024-11-13' },
        { type: 'article', id: 1, title: 'Understanding Your Window of Tolerance', date: '2024-11-12' },
        { type: 'practice', id: 'breath-regulation', title: 'Breath Regulation', date: '2024-11-12' },
      ]
    };

    setToolkitData(mockData);
    setLoading(false);
  };

  // Sample data
  const practices: Practice[] = [
    {
      id: "5-4-3-2-1-grounding",
      name: "5-4-3-2-1 Grounding",
      description: "Use your five senses to anchor yourself in the present moment when overwhelmed",
      duration: "3 min",
      pillar: "emotional",
      timesCompleted: 8,
      lastCompleted: "2024-11-13",
      appearsIn: [
        { type: 'article', id: 1, title: 'Understanding Your Window of Tolerance' },
        { type: 'block', id: 1, title: 'Window of Tolerance' },
      ]
    },
    {
      id: "box-breathing",
      name: "Box Breathing",
      description: "4-4-4-4 breath pattern to activate your parasympathetic nervous system",
      duration: "2 min",
      pillar: "stress",
      timesCompleted: 12,
      lastCompleted: "2024-11-12",
      appearsIn: [
        { type: 'block', id: 4, title: 'Understanding Stress Response' },
        { type: 'block', id: 5, title: 'Vagal Tone and Regulation' },
      ]
    },
    {
      id: "body-scan",
      name: "Body Scan",
      description: "Systematic awareness of physical sensations throughout your body",
      duration: "5 min",
      pillar: "emotional",
      timesCompleted: 6,
      lastCompleted: "2024-11-10",
      appearsIn: [
        { type: 'article', id: 1, title: 'Understanding Your Window of Tolerance' },
        { type: 'block', id: 3, title: 'Body Awareness Foundations' },
      ]
    },
    {
      id: "affect-labeling",
      name: "Affect Labeling",
      description: "Name your emotions with precision to reduce their intensity",
      duration: "3 min",
      pillar: "emotional",
      timesCompleted: 4,
      lastCompleted: "2024-11-09",
      appearsIn: [
        { type: 'article', id: 8, title: 'Labeling to Reduce Intensity' },
        { type: 'block', id: 2, title: 'Name It to Tame It' },
      ]
    },
    {
      id: "values-card-sort",
      name: "Values Card Sort",
      description: "Identify your core values through guided reflection",
      duration: "15 min",
      pillar: "decision",
      timesCompleted: 2,
      lastCompleted: "2024-11-08",
      appearsIn: [
        { type: 'article', id: 6, title: 'Values Clarification Exercise' },
      ]
    },
    {
      id: "thought-record",
      name: "Thought Record",
      description: "Examine and challenge unhelpful thinking patterns",
      duration: "10 min",
      pillar: "cognitive",
      timesCompleted: 3,
      lastCompleted: "2024-11-07",
      appearsIn: [
        { type: 'block', id: 7, title: 'Cognitive Distortions' },
      ]
    },
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: "Understanding Your Window of Tolerance",
      subtitle: "Learn to recognize when you're in your optimal zone for regulation",
      pillar: "emotional",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1759185408853-45d428437c5b?w=800",
      isCompleted: true,
      practices: ["5-4-3-2-1-grounding", "body-scan"]
    },
    {
      id: 2,
      title: "The Pause Practice",
      subtitle: "Create space between trigger and response",
      pillar: "emotional",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1652447385283-817463bd31af?w=800",
      isCompleted: false,
      practices: []
    },
    {
      id: 3,
      title: "Reframing Stress as Energy",
      subtitle: "Transform how your body interprets stress signals",
      pillar: "stress",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1598129202606-e3894fa71cfb?w=800",
      isCompleted: true,
      practices: ["box-breathing"]
    },
    {
      id: 6,
      title: "Values Clarification Exercise",
      subtitle: "Discover what truly matters to guide your decisions",
      pillar: "decision",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1600540984005-c7f3a641fbe5?w=800",
      isCompleted: false,
      practices: ["values-card-sort"]
    },
    {
      id: 7,
      title: "Who Am I Becoming?",
      subtitle: "Integrate past experiences into your evolving identity",
      pillar: "identity",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1646444570390-55a6131b8edb?w=800",
      isCompleted: false,
      practices: []
    },
    {
      id: 8,
      title: "Labeling to Reduce Intensity",
      subtitle: "Use neuroscience to calm your emotional brain",
      pillar: "emotional",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1759228340616-022eaeaf3786?w=800",
      isCompleted: false,
      practices: ["affect-labeling"]
    }
  ];

  const buildingBlocks: BuildingBlock[] = [
    {
      id: 1,
      title: "Window of Tolerance",
      subtitle: "Understanding your nervous system's optimal zone",
      pillar: "emotional",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1759086343456-2b49f6c0d148?w=800",
      isCompleted: true,
      practices: ["5-4-3-2-1-grounding", "body-scan"]
    },
    {
      id: 2,
      title: "Name It to Tame It",
      subtitle: "The neuroscience of emotion labeling",
      pillar: "emotional",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1761063198766-9df7175dd089?w=800",
      isCompleted: false,
      practices: ["affect-labeling"]
    },
    {
      id: 3,
      title: "Body Awareness Foundations",
      subtitle: "Learning to listen to what your body is telling you",
      pillar: "emotional",
      readTime: "15 min",
      image: "https://images.unsplash.com/photo-1748183607998-30e288846885?w=800",
      isCompleted: false,
      practices: ["body-scan"]
    },
    {
      id: 4,
      title: "Understanding Stress Response",
      subtitle: "How your body interprets and responds to stress",
      pillar: "stress",
      readTime: "14 min",
      image: "https://images.unsplash.com/photo-1759185408853-45d428437c5b?w=800",
      isCompleted: true,
      practices: ["box-breathing"]
    },
    {
      id: 5,
      title: "Vagal Tone and Regulation",
      subtitle: "Strengthening your body's natural calm system",
      pillar: "stress",
      readTime: "13 min",
      image: "https://images.unsplash.com/photo-1568305516592-8debcaf101c5?w=800",
      isCompleted: false,
      practices: ["box-breathing"]
    },
    {
      id: 7,
      title: "Cognitive Distortions",
      subtitle: "Identifying and challenging unhelpful thought patterns",
      pillar: "cognitive",
      readTime: "16 min",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      isCompleted: false,
      practices: ["thought-record"]
    }
  ];

  // Filter content by pillar
  const filteredArticles = selectedPillar === "all" 
    ? articles 
    : articles.filter(a => a.pillar === selectedPillar);
  
  const filteredBlocks = selectedPillar === "all"
    ? buildingBlocks
    : buildingBlocks.filter(b => b.pillar === selectedPillar);
  
  const filteredPractices = selectedPillar === "all"
    ? practices
    : practices.filter(p => p.pillar === selectedPillar);

  if (loading || !toolkitData) {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden" style={{ height: '100vh' }}>
        <PlatformPageHeader
          page="Toolkit"
          headline="Recovery isn't learned, it's built"
          height="medium"
        />
        <div className="page-content">
          <div className="content-container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              <div className="w-8 h-8 border-2 border-[#5739FB]/30 border-t-[#5739FB] rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden" style={{ height: '100vh' }}>
      {/* Header */}
      <PlatformPageHeader
        page="Toolkit"
        headline="Recovery isn't learned, it's built"
        height="medium"
      />

      {/* Content Area */}
      <div className="page-content">
        <div className="content-container">
          
          {/* Hero Card 1: Your Skills Dashboard */}
          <div className="card-hero" style={{ minHeight: '560px' }}>
            {/* Background Asset */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0
            }}>
              <img
                src={TOOLKIT_ASSET}
                alt=""
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            {/* Content */}
            <div className="card-hero-content" style={{ 
              gap: 'var(--spacing-7)',
              justifyContent: 'flex-start'
            }}>
              
              {/* Header */}
              <div>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: '8px' }}>
                  Your Skills Lab
                </p>
                <h1 className="text-hero-headline text-white" style={{ margin: '0 0 var(--spacing-2) 0' }}>
                  Building Competency
                </h1>
                <p className="text-body-hero text-white" style={{ maxWidth: '720px' }}>
                  Recovery is skill-building. Every article read, concept learned, and practice completed strengthens your foundation.
                </p>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--spacing-4)',
                width: '100%'
              }}>
                
                {/* Articles Read */}
                <div style={{
                  background: 'var(--glass-bg-medium)',
                  backdropFilter: 'var(--glass-blur-default)',
                  WebkitBackdropFilter: 'var(--glass-blur-default)',
                  border: 'var(--glass-border-default)',
                  padding: 'var(--spacing-5)',
                  borderRadius: 'var(--radius-none)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <BookOpen className="w-5 h-5" style={{ color: '#6366F1' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      Library
                    </h3>
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: '#6366F1',
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: '0 0 24px rgba(99, 102, 241, 0.4)'
                  }}>
                    {toolkitData.skillStats.articlesRead}
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0
                  }}>
                    articles read
                  </p>
                </div>

                {/* Blocks Completed */}
                <div style={{
                  background: 'var(--glass-bg-medium)',
                  backdropFilter: 'var(--glass-blur-default)',
                  WebkitBackdropFilter: 'var(--glass-blur-default)',
                  border: 'var(--glass-border-default)',
                  padding: 'var(--spacing-5)',
                  borderRadius: 'var(--radius-none)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <Lightbulb className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      Building Blocks
                    </h3>
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: '#8B5CF6',
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: '0 0 24px rgba(139, 92, 246, 0.4)'
                  }}>
                    {toolkitData.skillStats.blocksCompleted}
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0
                  }}>
                    concepts learned
                  </p>
                </div>

                {/* Practices Used */}
                <div style={{
                  background: 'var(--glass-bg-medium)',
                  backdropFilter: 'var(--glass-blur-default)',
                  WebkitBackdropFilter: 'var(--glass-blur-default)',
                  border: 'var(--glass-border-default)',
                  padding: 'var(--spacing-5)',
                  borderRadius: 'var(--radius-none)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <Play className="w-5 h-5" style={{ color: '#10B981' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      Practices
                    </h3>
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: '#10B981',
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: '0 0 24px rgba(16, 185, 129, 0.4)'
                  }}>
                    {toolkitData.skillStats.practicesUsed}
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0
                  }}>
                    times practiced
                  </p>
                </div>

              </div>

              {/* Pillar Competency */}
              <div>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: 'var(--spacing-4)' }}>
                  Skill Competency Across Six Pillars
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'var(--spacing-4)',
                  width: '100%'
                }}>
                  {Object.entries(SIX_PILLARS).map(([key, pillar]) => {
                    const competency = toolkitData.pillarCompetency[key as PillarKey];
                    const Icon = pillar.icon;
                    
                    return (
                      <div
                        key={key}
                        style={{
                          background: 'var(--glass-bg-medium)',
                          backdropFilter: 'var(--glass-blur-default)',
                          WebkitBackdropFilter: 'var(--glass-blur-default)',
                          border: 'var(--glass-border-default)',
                          padding: 'var(--spacing-4)',
                          borderRadius: 'var(--radius-none)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 'var(--spacing-3)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                            <Icon className="w-4 h-4" style={{ color: pillar.color }} />
                            <span style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: '#FFFFFF'
                            }}>
                              {pillar.patient}
                            </span>
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.9375rem',
                            fontWeight: 600,
                            color: pillar.color
                          }}>
                            {competency}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{
                          width: '100%',
                          height: '6px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${competency}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${pillar.color}, ${pillar.color}DD)`,
                            boxShadow: `0 0 12px ${pillar.color}80`,
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LUMA Insight */}
              <div style={{
                background: 'var(--glass-bg-strong)',
                backdropFilter: 'var(--glass-blur-heavy)',
                WebkitBackdropFilter: 'var(--glass-blur-heavy)',
                border: '2px solid rgba(87, 57, 251, 0.4)',
                padding: 'var(--spacing-5)',
                borderRadius: 'var(--radius-none)',
                maxWidth: '720px',
                boxShadow: '0 0 40px rgba(87, 57, 251, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  marginBottom: 'var(--spacing-3)'
                }}>
                  <Sparkles className="w-5 h-5" style={{ color: '#5739FB' }} />
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#5739FB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    LUMA Insight
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  lineHeight: '1.6',
                  margin: 0,
                  opacity: 0.95
                }}>
                  You've built strong emotional regulation skills (75%) but haven't explored social connectivity yet (30%). Your box breathing practice reduced stress levels by 40% this week.
                </p>
              </div>

            </div>
          </div>

          {/* Hero Card 2: The Three Foundations */}
          <div className="card-hero" style={{ minHeight: '680px', marginTop: 'var(--spacing-6)' }}>
            {/* Background Asset */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0
            }}>
              <img
                src={TOOLKIT_ASSET}
                alt=""
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            {/* Content */}
            <div className="card-hero-content" style={{ 
              gap: 'var(--spacing-6)',
              justifyContent: 'flex-start'
            }}>
              
              {/* Header with Filter */}
              <div style={{ width: '100%' }}>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: '8px' }}>
                  The Three Foundations
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 'var(--spacing-4)',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <h2 className="text-hero-headline text-white" style={{ margin: '0 0 var(--spacing-2) 0' }}>
                      From Understanding to Mastery
                    </h2>
                    <p className="text-body-hero text-white" style={{ maxWidth: '680px' }}>
                      Learn the WHY. Understand the WHAT. Master the HOW.
                    </p>
                  </div>

                  {/* Pillar Filter */}
                  <div style={{
                    background: 'var(--glass-bg-medium)',
                    backdropFilter: 'var(--glass-blur-default)',
                    WebkitBackdropFilter: 'var(--glass-blur-default)',
                    border: 'var(--glass-border-default)',
                    padding: 'var(--spacing-2)',
                    borderRadius: 'var(--radius-none)',
                    display: 'flex',
                    gap: 'var(--spacing-2)',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => setSelectedPillar("all")}
                      style={{
                        padding: '8px 16px',
                        background: selectedPillar === "all" 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-none)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      All
                    </button>
                    {Object.entries(SIX_PILLARS).map(([key, pillar]) => {
                      const Icon = pillar.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedPillar(key as PillarKey)}
                          style={{
                            padding: '8px 16px',
                            background: selectedPillar === key 
                              ? `${pillar.color}40` 
                              : 'transparent',
                            border: selectedPillar === key 
                              ? `1px solid ${pillar.color}` 
                              : '1px solid transparent',
                            borderRadius: 'var(--radius-none)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: selectedPillar === key ? pillar.color : 'rgba(255, 255, 255, 0.7)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {pillar.patient}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Three Columns: Library | Blocks | Practices */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--spacing-5)',
                width: '100%'
              }}>

                {/* LIBRARY (Articles) */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    <BookOpen className="w-5 h-5" style={{ color: '#6366F1' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      Library
                    </h3>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    Understanding the WHY
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-3)'
                  }}>
                    {filteredArticles.slice(0, 4).map((article) => {
                      const pillar = SIX_PILLARS[article.pillar];
                      const Icon = pillar.icon;
                      
                      return (
                        <button
                          key={article.id}
                          onClick={() => onNavigateToArticle?.(article.id)}
                          style={{
                            background: 'var(--glass-bg-light)',
                            backdropFilter: 'var(--glass-blur-default)',
                            WebkitBackdropFilter: 'var(--glass-blur-default)',
                            border: 'var(--glass-border-subtle)',
                            padding: 'var(--spacing-4)',
                            borderRadius: 'var(--radius-none)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'block',
                            width: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--glass-bg-medium)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--glass-bg-light)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: 'var(--spacing-3)',
                            marginBottom: 'var(--spacing-2)'
                          }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.9375rem',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                margin: '0 0 6px 0'
                              }}>
                                {article.title}
                              </h4>
                              <p style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.8125rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                margin: 0
                              }}>
                                {article.subtitle}
                              </p>
                            </div>
                            {article.isCompleted && (
                              <CheckCircle className="w-4 h-4" style={{ color: '#10B981', flexShrink: 0 }} />
                            )}
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            marginTop: 'var(--spacing-2)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Icon className="w-3.5 h-3.5" style={{ color: pillar.color }} />
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.6875rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}>
                                {pillar.patient}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Clock className="w-3.5 h-3.5" style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.6875rem',
                                color: 'rgba(255, 255, 255, 0.5)'
                              }}>
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* BUILDING BLOCKS */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    <Lightbulb className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      Building Blocks
                    </h3>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    Understanding the WHAT
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-3)'
                  }}>
                    {filteredBlocks.slice(0, 4).map((block) => {
                      const pillar = SIX_PILLARS[block.pillar];
                      const Icon = pillar.icon;
                      
                      return (
                        <button
                          key={block.id}
                          onClick={() => onNavigateToBuildingBlock?.(block.id)}
                          style={{
                            background: 'var(--glass-bg-light)',
                            backdropFilter: 'var(--glass-blur-default)',
                            WebkitBackdropFilter: 'var(--glass-blur-default)',
                            border: 'var(--glass-border-subtle)',
                            padding: 'var(--spacing-4)',
                            borderRadius: 'var(--radius-none)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'block',
                            width: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--glass-bg-medium)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--glass-bg-light)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: 'var(--spacing-3)',
                            marginBottom: 'var(--spacing-2)'
                          }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.9375rem',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                margin: '0 0 6px 0'
                              }}>
                                {block.title}
                              </h4>
                              <p style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.8125rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                margin: 0
                              }}>
                                {block.subtitle}
                              </p>
                            </div>
                            {block.isCompleted && (
                              <CheckCircle className="w-4 h-4" style={{ color: '#10B981', flexShrink: 0 }} />
                            )}
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            marginTop: 'var(--spacing-2)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Icon className="w-3.5 h-3.5" style={{ color: pillar.color }} />
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.6875rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}>
                                {pillar.patient}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Clock className="w-3.5 h-3.5" style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.6875rem',
                                color: 'rgba(255, 255, 255, 0.5)'
                              }}>
                                {block.readTime}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PRACTICES */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    <Play className="w-5 h-5" style={{ color: '#10B981' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      Practices
                    </h3>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    Mastering the HOW
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-3)'
                  }}>
                    {filteredPractices.slice(0, 4).map((practice) => {
                      const pillar = SIX_PILLARS[practice.pillar];
                      const Icon = pillar.icon;
                      
                      return (
                        <button
                          key={practice.id}
                          onClick={() => onNavigateToPractice?.(practice.id)}
                          style={{
                            background: 'var(--glass-bg-light)',
                            backdropFilter: 'var(--glass-blur-default)',
                            WebkitBackdropFilter: 'var(--glass-blur-default)',
                            border: 'var(--glass-border-subtle)',
                            padding: 'var(--spacing-4)',
                            borderRadius: 'var(--radius-none)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'block',
                            width: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--glass-bg-medium)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--glass-bg-light)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: 'var(--spacing-3)',
                            marginBottom: 'var(--spacing-2)'
                          }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.9375rem',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                margin: '0 0 6px 0'
                              }}>
                                {practice.name}
                              </h4>
                              <p style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.8125rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                margin: 0
                              }}>
                                {practice.description}
                              </p>
                            </div>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            marginTop: 'var(--spacing-2)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Icon className="w-3.5 h-3.5" style={{ color: pillar.color }} />
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.6875rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}>
                                {pillar.patient}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Clock className="w-3.5 h-3.5" style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.6875rem',
                                color: 'rgba(255, 255, 255, 0.5)'
                              }}>
                                {practice.duration}
                              </span>
                            </div>
                            <div style={{
                              marginLeft: 'auto',
                              background: 'rgba(16, 185, 129, 0.2)',
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-none)',
                              border: '1px solid rgba(16, 185, 129, 0.3)'
                            }}>
                              <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.6875rem',
                                fontWeight: 600,
                                color: '#10B981'
                              }}>
                                {practice.timesCompleted}×
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
