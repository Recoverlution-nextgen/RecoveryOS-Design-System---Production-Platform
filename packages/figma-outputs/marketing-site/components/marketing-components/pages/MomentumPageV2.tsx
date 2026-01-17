/**
 * MOMENTUM - infiniteK Design System V2
 * 
 * Philosophy: "Recovery is what you do when you return, not when you arrive"
 * 
 * Integration with Platform Ecosystem:
 * - State: Daily state check-ins reveal emotional patterns
 * - NaviCues: Engagement with provocations shows openness to insight
 * - Journey: Weekly practice completion tracks skill development
 * - LUMA: AI identifies emerging patterns and calibrates support
 * 
 * Design Approach:
 * - Three core metrics: Returns, Reach, Depth
 * - Full glass aesthetic with 4:5 momentum asset
 * - Pattern recognition over raw metrics
 * - Story-driven insights, not numbers
 */

import { useState, useEffect } from "react";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { 
  TrendingUp, Target, Compass, Sparkles, 
  Calendar, Layers, BookOpen, Award,
  ArrowUp, ArrowDown, Minus
} from "lucide-react";

// Asset for cards (4:5 ratio) - Top and Bottom tiles
const MOMENTUM_ASSET_TOP = "https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Library/4:5/WebP/3D%20LANDSHAPE%20_%20balloons-2.webp";
const MOMENTUM_ASSET_BOTTOM = "https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Library/4:5/WebP/3D%20LANDSHAPE%20_%20hearts.webp";

// Six Pillars - Patient Perspective
const PILLARS = [
  {
    id: "emotional-regulation",
    clinical: "Emotional Regulation",
    patient: "Feeling It Through",
    subtitle: "Your emotional range",
    description: "Learning to feel without being overwhelmed by the feeling",
    color: "#E85D75",
    lightColor: "rgba(232, 93, 117, 0.12)",
  },
  {
    id: "stress-resilience",
    clinical: "Stress Resilience",
    patient: "Handling Pressure",
    subtitle: "Your stress response",
    description: "Building capacity to hold tension without breaking",
    color: "#9B59B6",
    lightColor: "rgba(155, 89, 182, 0.12)",
  },
  {
    id: "social-connectivity",
    clinical: "Social Connectivity",
    patient: "Showing Up",
    subtitle: "Your connection to others",
    description: "Being present with people, even when it's hard",
    color: "#3498DB",
    lightColor: "rgba(52, 152, 219, 0.12)",
  },
  {
    id: "cognitive-reframing",
    clinical: "Cognitive Reframing",
    patient: "Thought Patterns",
    subtitle: "Your mental flexibility",
    description: "Catching old stories and choosing new ones",
    color: "#F39C12",
    lightColor: "rgba(243, 156, 18, 0.12)",
  },
  {
    id: "identity-integration",
    clinical: "Identity Integration",
    patient: "Who You're Becoming",
    subtitle: "Your sense of self",
    description: "Building a version of you that includes the past without being defined by it",
    color: "#2ECC71",
    lightColor: "rgba(46, 204, 113, 0.12)",
  },
  {
    id: "decision-mastery",
    clinical: "Decision Mastery",
    patient: "Making Choices",
    subtitle: "Your decision confidence",
    description: "Learning to trust yourself to make the next right choice",
    color: "#E74C3C",
    lightColor: "rgba(231, 76, 60, 0.12)",
  }
];

// Core momentum dimensions
const MOMENTUM_METRICS = {
  returns: {
    id: "returns",
    label: "Returns",
    subtitle: "How often you show up",
    icon: Calendar,
    color: "#5739FB",
    lightColor: "rgba(87, 57, 251, 0.12)",
    glowColor: "rgba(87, 57, 251, 0.25)",
    question: "Recovery is what happens when you come back, not when you stay perfect.",
    insight: "You're building the muscle of return. Every time you come back matters more than how long you were gone."
  },
  reach: {
    id: "reach",
    label: "Reach",
    subtitle: "How broadly you engage",
    icon: Layers,
    color: "#06B6D4",
    lightColor: "rgba(6, 182, 212, 0.12)",
    glowColor: "rgba(6, 182, 212, 0.25)",
    question: "Are you exploring different ways in, or relying on the same patterns?",
    insight: "Variety builds resilience. The more pathways you create, the more ways you can find your way back."
  },
  depth: {
    id: "depth",
    label: "Depth",
    subtitle: "How deeply you integrate",
    icon: BookOpen,
    color: "#3E2BB8",
    lightColor: "rgba(62, 43, 184, 0.12)",
    glowColor: "rgba(62, 43, 184, 0.25)",
    question: "Are insights landing, or just passing through?",
    insight: "Integration happens in the pause. When you revisit, reflect, and let it change you."
  }
};

// Momentum trajectory states
const TRAJECTORY_STATES = {
  ascending: {
    label: "Ascending",
    message: "Your patterns are strengthening. The returns are getting easier.",
    color: "#10B981",
    icon: ArrowUp
  },
  steady: {
    label: "Steady",
    message: "You're holding ground. Consistency is its own form of progress.",
    color: "#5739FB",
    icon: Minus
  },
  rebuilding: {
    label: "Rebuilding",
    message: "You're in a valley. This is where the real work happens.",
    color: "#F59E0B",
    icon: ArrowDown
  }
};

interface MomentumData {
  returns: {
    thisWeek: number;
    lastWeek: number;
    longestStreak: number;
    currentStreak: number;
  };
  reach: {
    typesEngaged: number; // out of 6 (State, NaviCues, Journey, Toolkit, etc.)
    totalTypes: number;
    mostUsed: string;
    leastUsed: string;
  };
  depth: {
    completionRate: number; // % of started content that's completed
    revisitRate: number; // % of content revisited
    reflectionCount: number; // State logs, NaviCue responses, etc.
  };
}

interface MomentumPageV2Props {
  patientId?: string | null;
}

export function MomentumPageV2({ patientId }: MomentumPageV2Props) {
  const [momentumData, setMomentumData] = useState<MomentumData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load momentum data
  useEffect(() => {
    loadMomentumData();
  }, [patientId]);

  const loadMomentumData = () => {
    setLoading(true);
    
    // Load from localStorage and calculate
    // In real implementation, this would aggregate from:
    // - State logs (returns + depth)
    // - NaviCues interactions (returns + reach)
    // - Journey practice completions (returns + depth)
    // - Toolkit engagement (reach)
    
    const mockData: MomentumData = {
      returns: {
        thisWeek: 5,
        lastWeek: 4,
        longestStreak: 12,
        currentStreak: 5
      },
      reach: {
        typesEngaged: 4,
        totalTypes: 6,
        mostUsed: "NaviCues",
        leastUsed: "Toolkit"
      },
      depth: {
        completionRate: 73,
        revisitRate: 28,
        reflectionCount: 12
      }
    };

    setMomentumData(mockData);
    setLoading(false);
  };

  // Calculate trajectory
  const getTrajectory = () => {
    if (!momentumData) return TRAJECTORY_STATES.steady;
    
    const returnsGrowth = momentumData.returns.thisWeek - momentumData.returns.lastWeek;
    
    if (returnsGrowth >= 2) return TRAJECTORY_STATES.ascending;
    if (returnsGrowth <= -2) return TRAJECTORY_STATES.rebuilding;
    return TRAJECTORY_STATES.steady;
  };

  const trajectory = getTrajectory();

  // Get weekly returns pattern (mock - would be real data)
  const weeklyPattern = [
    { day: "Mon", count: 1 },
    { day: "Tue", count: 2 },
    { day: "Wed", count: 0 },
    { day: "Thu", count: 1 },
    { day: "Fri", count: 2 },
    { day: "Sat", count: 1 },
    { day: "Sun", count: 0 }
  ];

  if (loading || !momentumData) {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden" style={{ height: '100vh' }}>
        <PlatformPageHeader
          page="Momentum"
          headline="Recovery is what you do when you return, not when you arrive"
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
        page="Momentum"
        headline="Recovery is what you do when you return, not when you arrive"
        height="medium"
      />

      {/* Content Area */}
      <div className="page-content">
        <div className="content-container">
          
          {/* Hero Card: Trajectory Overview */}
          <div className="card-hero" style={{ minHeight: '520px' }}>
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
                src={MOMENTUM_ASSET_TOP}
                alt="Momentum trajectory visualization with floating balloons representing growth"
                loading="eager"
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
              
              {/* Top: Trajectory State */}
              <div>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: '8px' }}>
                  Your Trajectory
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-3)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  <trajectory.icon 
                    className="w-8 h-8" 
                    style={{ color: trajectory.color }}
                  />
                  <h1 className="text-hero-headline text-white" style={{ margin: 0 }}>
                    {trajectory.label}
                  </h1>
                </div>
                <p className="text-body-hero text-white" style={{ maxWidth: '580px' }}>
                  {trajectory.message}
                </p>
              </div>

              {/* Core Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-4)',
                width: '100%',
                maxWidth: '960px'
              }}>
                
                {/* RETURNS Card */}
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
                    <Calendar className="w-5 h-5" style={{ color: MOMENTUM_METRICS.returns.color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {MOMENTUM_METRICS.returns.label}
                    </h3>
                  </div>

                  {/* Big Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: MOMENTUM_METRICS.returns.color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${MOMENTUM_METRICS.returns.glowColor}`
                  }}>
                    {momentumData.returns.thisWeek}
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-3) 0'
                  }}>
                    times this week
                  </p>

                  {/* Comparison */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    {momentumData.returns.thisWeek > momentumData.returns.lastWeek ? (
                      <TrendingUp className="w-4 h-4" style={{ color: '#10B981' }} />
                    ) : (
                      <Minus className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                    )}
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      {momentumData.returns.lastWeek} last week
                    </span>
                  </div>

                  {/* Weekly Pattern Mini Viz */}
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    {weeklyPattern.map((day, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: '32px',
                          background: day.count > 0 
                            ? MOMENTUM_METRICS.returns.color 
                            : 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '2px',
                          opacity: day.count > 0 ? 0.3 + (day.count * 0.3) : 0.3,
                          position: 'relative'
                        }}
                        title={`${day.day}: ${day.count}`}
                      />
                    ))}
                  </div>

                  {/* Streak */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)'
                  }}>
                    <Award className="w-4 h-4" style={{ color: MOMENTUM_METRICS.returns.color }} />
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {momentumData.returns.currentStreak} day streak
                    </span>
                  </div>
                </div>

                {/* REACH Card */}
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
                    <Layers className="w-5 h-5" style={{ color: MOMENTUM_METRICS.reach.color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {MOMENTUM_METRICS.reach.label}
                    </h3>
                  </div>

                  {/* Big Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: MOMENTUM_METRICS.reach.color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${MOMENTUM_METRICS.reach.glowColor}`
                  }}>
                    {momentumData.reach.typesEngaged}
                    <span style={{ 
                      fontSize: '1.5rem', 
                      opacity: 0.6,
                      marginLeft: '4px'
                    }}>
                      /{momentumData.reach.totalTypes}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-4) 0'
                  }}>
                    pathways explored
                  </p>

                  {/* Most/Least */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'var(--spacing-2)' 
                  }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.6875rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Most used
                      </span>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        margin: '4px 0 0 0'
                      }}>
                        {momentumData.reach.mostUsed}
                      </p>
                    </div>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.6875rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Ready to explore
                      </span>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.6)',
                        margin: '4px 0 0 0'
                      }}>
                        {momentumData.reach.leastUsed}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DEPTH Card */}
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
                    <BookOpen className="w-5 h-5" style={{ color: MOMENTUM_METRICS.depth.color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {MOMENTUM_METRICS.depth.label}
                    </h3>
                  </div>

                  {/* Big Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: MOMENTUM_METRICS.depth.color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${MOMENTUM_METRICS.depth.glowColor}`
                  }}>
                    {momentumData.depth.completionRate}
                    <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>%</span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-4) 0'
                  }}>
                    completion rate
                  </p>

                  {/* Stats */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'var(--spacing-2)' 
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        Revisit rate
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}>
                        {momentumData.depth.revisitRate}%
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        Reflections
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}>
                        {momentumData.depth.reflectionCount}
                      </span>
                    </div>
                  </div>
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
                maxWidth: '680px',
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
                    LUMA Pattern
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
                  Your engagement peaks midday and you prefer brief, frequent interactions over long sessions. LUMA is calibrating NaviCues delivery to match your natural rhythm.
                </p>
              </div>

            </div>
          </div>

          {/* Second Hero Card: Pillar Momentum */}
          <div className="card-hero" style={{ minHeight: '520px', marginTop: 'var(--spacing-6)' }}>
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
                src={MOMENTUM_ASSET_BOTTOM}
                alt="Pillar momentum visualization with hearts representing growth across six therapeutic dimensions"
                loading="lazy"
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
              
              {/* Header */}
              <div>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: '8px' }}>
                  Growth Across Dimensions
                </p>
                <h2 className="text-hero-headline text-white" style={{ margin: '0 0 var(--spacing-2) 0' }}>
                  Where You're Building
                </h2>
                <p className="text-body-hero text-white" style={{ maxWidth: '620px' }}>
                  Recovery isn't one thing. It's six ways of being that build on each other. Here's how you're showing up across all of them.
                </p>
              </div>

              {/* Pillars Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--spacing-4)',
                width: '100%'
              }}>
                {PILLARS.map((pillar, idx) => {
                  // Mock engagement score (0-100)
                  // In real implementation, this would calculate from:
                  // - Journey practices completed in this pillar
                  // - NaviCues responses related to this pillar
                  // - State check-ins that map to pillar metrics
                  // - Toolkit content consumed for this pillar
                  const engagementScore = [78, 62, 45, 71, 38, 54][idx];
                  
                  return (
                    <div
                      key={pillar.id}
                      style={{
                        background: 'var(--glass-bg-medium)',
                        backdropFilter: 'var(--glass-blur-default)',
                        WebkitBackdropFilter: 'var(--glass-blur-default)',
                        border: 'var(--glass-border-default)',
                        padding: 'var(--spacing-5)',
                        borderRadius: 'var(--radius-none)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Progress bar background */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        zIndex: 0
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${engagementScore}%`,
                          background: pillar.color,
                          transition: 'width 0.6s ease-out'
                        }} />
                      </div>

                      {/* Content */}
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* Pillar eyebrow (clinical name) */}
                        <p className="text-eyebrow" style={{ 
                          marginBottom: '6px',
                          color: 'rgba(255, 255, 255, 0.5)'
                        }}>
                          {pillar.clinical}
                        </p>

                        {/* Pillar name */}
                        <h3 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          margin: '0 0 var(--spacing-1) 0'
                        }}>
                          {pillar.patient}
                        </h3>

                        {/* Subtitle */}
                        <p style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8125rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          margin: '0 0 var(--spacing-3) 0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {pillar.subtitle}
                        </p>

                        {/* Description */}
                        <p style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9375rem',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: '1.5',
                          margin: '0 0 var(--spacing-4) 0',
                          minHeight: '66px'
                        }}>
                          {pillar.description}
                        </p>

                        {/* Score */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 'var(--spacing-2)'
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: pillar.color,
                            lineHeight: 1,
                            textShadow: `0 0 16px ${pillar.color}40`
                          }}>
                            {engagementScore}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.875rem',
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}>
                            engagement
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Insight about pillar balance */}
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
                  <Compass className="w-5 h-5" style={{ color: '#5739FB' }} />
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#5739FB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    What This Means
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
                  You're strongest in emotional work and thought patterns. Consider exploring identity and connection more this is where the next layer of growth often lives.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}