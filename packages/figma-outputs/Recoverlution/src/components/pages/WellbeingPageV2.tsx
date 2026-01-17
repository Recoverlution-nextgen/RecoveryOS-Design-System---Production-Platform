/**
 * WELLBEING - infiniteK Design System V2
 * 
 * Philosophy: "Recovery lives in the body, not just the mind"
 * 
 * Wellbeing tracks the physical and lifestyle foundations that support recovery:
 * - Sleep: The body's repair mechanism
 * - Movement: Physical expression and regulation
 * - Nourishment: Fuel for healing
 * - Connection: Social wellness
 * - Regulation: Stress response and nervous system health
 * 
 * Integration with Platform Ecosystem:
 * - State: Emotional patterns correlate with sleep/stress
 * - NaviCues: Engagement timing reveals energy patterns
 * - Journey: Practice completion requires physical capacity
 * - Momentum: Consistency requires stable foundation
 * - LUMA: Identifies wellbeing patterns affecting recovery
 * 
 * Design Approach:
 * - Five wellness dimensions (not clinical metrics)
 * - Patient language (how it feels, not what it measures)
 * - Glass aesthetic with 4:5 assets
 * - Integration across all platform data
 */

import { useState, useEffect } from "react";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { 
  Moon, Zap, Apple, Users, Heart,
  TrendingUp, AlertCircle, CheckCircle,
  Sparkles, Activity, Wind
} from "lucide-react";

// Asset for cards (4:5 ratio) - using momentum asset for now
const WELLBEING_ASSET = "https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Library/4:5/WebP/3D%20SHAPE%20%20momentum%20chips.png";

// Five Wellness Dimensions
const WELLNESS_DIMENSIONS = [
  {
    id: "sleep",
    clinical: "Sleep Quality",
    patient: "Rest & Repair",
    subtitle: "Your body's reset button",
    description: "Sleep is where the brain processes, the body heals, and recovery becomes real.",
    icon: Moon,
    color: "#6366F1",
    lightColor: "rgba(99, 102, 241, 0.12)",
    metrics: {
      label: "Hours",
      format: (val: number) => `${val}h`,
      optimal: { min: 7, max: 9 }
    }
  },
  {
    id: "movement",
    clinical: "Physical Activity",
    patient: "Movement & Release",
    subtitle: "Your body's expression",
    description: "Movement isn't punishment. It's how the body processes what the mind can't hold.",
    icon: Activity,
    color: "#8B5CF6",
    lightColor: "rgba(139, 92, 246, 0.12)",
    metrics: {
      label: "Minutes",
      format: (val: number) => `${val}m`,
      optimal: { min: 20, max: 60 }
    }
  },
  {
    id: "nourishment",
    clinical: "Nutrition",
    patient: "Fuel & Nourishment",
    subtitle: "Your body's foundation",
    description: "Food is medicine. What you put in your body shapes your capacity to show up.",
    icon: Apple,
    color: "#10B981",
    lightColor: "rgba(16, 185, 129, 0.12)",
    metrics: {
      label: "Quality",
      format: (val: number) => `${val}/10`,
      optimal: { min: 6, max: 10 }
    }
  },
  {
    id: "connection",
    clinical: "Social Engagement",
    patient: "Connection & Presence",
    subtitle: "Your relational health",
    description: "Isolation feeds the disease. Connection feeds recovery. Even small moments count.",
    icon: Users,
    color: "#06B6D4",
    lightColor: "rgba(6, 182, 212, 0.12)",
    metrics: {
      label: "Interactions",
      format: (val: number) => `${val}`,
      optimal: { min: 2, max: 5 }
    }
  },
  {
    id: "regulation",
    clinical: "Stress Response",
    patient: "Nervous System Health",
    subtitle: "Your stress resilience",
    description: "The nervous system holds the score. Learning to regulate it is learning to heal.",
    icon: Wind,
    color: "#F59E0B",
    lightColor: "rgba(245, 158, 11, 0.12)",
    metrics: {
      label: "Balance",
      format: (val: number) => `${val}/10`,
      optimal: { min: 6, max: 10 }
    }
  }
];

// Wellbeing states
const WELLBEING_STATES = {
  thriving: {
    label: "Thriving",
    message: "Your body is supporting your recovery. The foundation is strong.",
    color: "#10B981",
    icon: CheckCircle
  },
  managing: {
    label: "Managing",
    message: "You're doing what you can with what you have. That's enough.",
    color: "#5739FB",
    icon: Activity
  },
  struggling: {
    label: "Struggling",
    message: "Your body needs support right now. This is data, not judgment.",
    color: "#F59E0B",
    icon: AlertCircle
  }
};

interface WellbeingData {
  sleep: {
    average: number; // hours per night (7 day avg)
    trend: "up" | "down" | "stable";
    quality: number; // 1-10 self-reported
  };
  movement: {
    dailyMinutes: number; // average minutes per day
    trend: "up" | "down" | "stable";
    type: string; // most common: "walking", "yoga", "gym", etc.
  };
  nourishment: {
    quality: number; // 1-10 self-reported
    trend: "up" | "down" | "stable";
    hydration: number; // glasses per day
  };
  connection: {
    interactions: number; // meaningful interactions per day
    trend: "up" | "down" | "stable";
    quality: number; // 1-10 self-reported
  };
  regulation: {
    stressLevel: number; // 1-10 (lower is better)
    trend: "up" | "down" | "stable";
    practices: number; // breathwork, meditation sessions per week
  };
}

interface WellbeingPageV2Props {
  patientId?: string | null;
}

export function WellbeingPageV2({ patientId }: WellbeingPageV2Props) {
  const [wellbeingData, setWellbeingData] = useState<WellbeingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWellbeingData();
  }, [patientId]);

  const loadWellbeingData = () => {
    setLoading(true);

    // In real implementation, this would aggregate from:
    // - Daily wellbeing check-ins
    // - Integration with wearables (Oura, Whoop, Apple Health)
    // - Self-reported data
    // - State logs (correlate emotional state with sleep/stress)
    // - NaviCues engagement times (energy patterns)
    // - Journey practice completion (physical capacity)

    const mockData: WellbeingData = {
      sleep: {
        average: 6.8,
        trend: "up",
        quality: 7
      },
      movement: {
        dailyMinutes: 32,
        trend: "stable",
        type: "Walking"
      },
      nourishment: {
        quality: 6,
        trend: "up",
        hydration: 6
      },
      connection: {
        interactions: 3,
        trend: "stable",
        quality: 7
      },
      regulation: {
        stressLevel: 6,
        trend: "down",
        practices: 4
      }
    };

    setWellbeingData(mockData);
    setLoading(false);
  };

  // Calculate overall wellbeing state
  const getWellbeingState = () => {
    if (!wellbeingData) return WELLBEING_STATES.managing;

    // Simple scoring: each dimension gets 0-2 points
    let score = 0;
    
    // Sleep: 7-9 hours = 2, 6-7 or 9-10 = 1, else 0
    if (wellbeingData.sleep.average >= 7 && wellbeingData.sleep.average <= 9) score += 2;
    else if (wellbeingData.sleep.average >= 6 && wellbeingData.sleep.average <= 10) score += 1;

    // Movement: 20-60 min = 2, 10-20 or 60-90 = 1, else 0
    if (wellbeingData.movement.dailyMinutes >= 20 && wellbeingData.movement.dailyMinutes <= 60) score += 2;
    else if (wellbeingData.movement.dailyMinutes >= 10 || wellbeingData.movement.dailyMinutes <= 90) score += 1;

    // Nourishment: 7-10 = 2, 5-6 = 1, else 0
    if (wellbeingData.nourishment.quality >= 7) score += 2;
    else if (wellbeingData.nourishment.quality >= 5) score += 1;

    // Connection: 2-5 = 2, 1 or 6+ = 1, else 0
    if (wellbeingData.connection.interactions >= 2 && wellbeingData.connection.interactions <= 5) score += 2;
    else if (wellbeingData.connection.interactions >= 1) score += 1;

    // Regulation: stress 1-4 = 2, 5-6 = 1, else 0
    if (wellbeingData.regulation.stressLevel <= 4) score += 2;
    else if (wellbeingData.regulation.stressLevel <= 6) score += 1;

    // Total: 0-10 scale
    // 8-10 = thriving, 4-7 = managing, 0-3 = struggling
    if (score >= 8) return WELLBEING_STATES.thriving;
    if (score >= 4) return WELLBEING_STATES.managing;
    return WELLBEING_STATES.struggling;
  };

  const wellbeingState = getWellbeingState();

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="w-4 h-4" style={{ color: '#10B981' }} />;
    if (trend === "down") return <TrendingUp className="w-4 h-4" style={{ color: '#F59E0B', transform: 'rotate(180deg)' }} />;
    return <Activity className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />;
  };

  if (loading || !wellbeingData) {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden" style={{ height: '100vh' }}>
        <PlatformPageHeader
          page="Wellbeing"
          headline="Recovery lives in the body, not just the mind"
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
        page="Wellbeing"
        headline="Recovery lives in the body, not just the mind"
        height="medium"
      />

      {/* Content Area */}
      <div className="page-content">
        <div className="content-container">
          
          {/* Hero Card: Overall Wellbeing */}
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
                src={WELLBEING_ASSET}
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
              
              {/* Top: Wellbeing State */}
              <div>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: '8px' }}>
                  Your Baseline
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-3)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  <wellbeingState.icon 
                    className="w-8 h-8" 
                    style={{ color: wellbeingState.color }}
                  />
                  <h1 className="text-hero-headline text-white" style={{ margin: 0 }}>
                    {wellbeingState.label}
                  </h1>
                </div>
                <p className="text-body-hero text-white" style={{ maxWidth: '620px' }}>
                  {wellbeingState.message}
                </p>
              </div>

              {/* Wellness Dimensions Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-4)',
                width: '100%'
              }}>
                
                {/* SLEEP */}
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
                    <Moon className="w-5 h-5" style={{ color: WELLNESS_DIMENSIONS[0].color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {WELLNESS_DIMENSIONS[0].patient}
                    </h3>
                  </div>

                  {/* Big Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: WELLNESS_DIMENSIONS[0].color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${WELLNESS_DIMENSIONS[0].color}40`
                  }}>
                    {wellbeingData.sleep.average.toFixed(1)}
                    <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>h</span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-3) 0'
                  }}>
                    average per night
                  </p>

                  {/* Trend & Quality */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)'
                    }}>
                      {getTrendIcon(wellbeingData.sleep.trend)}
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {wellbeingData.sleep.trend === 'up' ? 'Improving' : wellbeingData.sleep.trend === 'down' ? 'Declining' : 'Stable'}
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
                        Quality
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}>
                        {wellbeingData.sleep.quality}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* MOVEMENT */}
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
                    <Activity className="w-5 h-5" style={{ color: WELLNESS_DIMENSIONS[1].color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {WELLNESS_DIMENSIONS[1].patient}
                    </h3>
                  </div>

                  {/* Big Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: WELLNESS_DIMENSIONS[1].color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${WELLNESS_DIMENSIONS[1].color}40`
                  }}>
                    {wellbeingData.movement.dailyMinutes}
                    <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>m</span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-3) 0'
                  }}>
                    per day
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)'
                    }}>
                      {getTrendIcon(wellbeingData.movement.trend)}
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {wellbeingData.movement.trend === 'up' ? 'Increasing' : wellbeingData.movement.trend === 'down' ? 'Decreasing' : 'Consistent'}
                      </span>
                    </div>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.6875rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Most common
                      </span>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        margin: '4px 0 0 0'
                      }}>
                        {wellbeingData.movement.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* NOURISHMENT */}
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
                    <Apple className="w-5 h-5" style={{ color: WELLNESS_DIMENSIONS[2].color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {WELLNESS_DIMENSIONS[2].patient}
                    </h3>
                  </div>

                  {/* Big Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: WELLNESS_DIMENSIONS[2].color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${WELLNESS_DIMENSIONS[2].color}40`
                  }}>
                    {wellbeingData.nourishment.quality}
                    <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>/10</span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-3) 0'
                  }}>
                    nutrition quality
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)'
                    }}>
                      {getTrendIcon(wellbeingData.nourishment.trend)}
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {wellbeingData.nourishment.trend === 'up' ? 'Improving' : wellbeingData.nourishment.trend === 'down' ? 'Declining' : 'Stable'}
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
                        Hydration
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}>
                        {wellbeingData.nourishment.hydration} glasses
                      </span>
                    </div>
                  </div>
                </div>

                {/* CONNECTION */}
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
                    <Users className="w-5 h-5" style={{ color: WELLNESS_DIMENSIONS[3].color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {WELLNESS_DIMENSIONS[3].patient}
                    </h3>
                  </div>

                  {/* Big Number */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: WELLNESS_DIMENSIONS[3].color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${WELLNESS_DIMENSIONS[3].color}40`
                  }}>
                    {wellbeingData.connection.interactions}
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-3) 0'
                  }}>
                    meaningful interactions
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)'
                    }}>
                      {getTrendIcon(wellbeingData.connection.trend)}
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {wellbeingData.connection.trend === 'up' ? 'Expanding' : wellbeingData.connection.trend === 'down' ? 'Contracting' : 'Steady'}
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
                        Quality
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}>
                        {wellbeingData.connection.quality}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* REGULATION */}
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
                    <Wind className="w-5 h-5" style={{ color: WELLNESS_DIMENSIONS[4].color }} />
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      margin: 0
                    }}>
                      {WELLNESS_DIMENSIONS[4].patient}
                    </h3>
                  </div>

                  {/* Big Number (inverted - lower is better) */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: WELLNESS_DIMENSIONS[4].color,
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-2)',
                    textShadow: `0 0 24px ${WELLNESS_DIMENSIONS[4].color}40`
                  }}>
                    {wellbeingData.regulation.stressLevel}
                    <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>/10</span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 var(--spacing-3) 0'
                  }}>
                    current stress level
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)'
                    }}>
                      {/* Inverted trend for stress (down is good) */}
                      {wellbeingData.regulation.trend === 'down' ? (
                        <TrendingUp className="w-4 h-4" style={{ color: '#10B981', transform: 'rotate(180deg)' }} />
                      ) : wellbeingData.regulation.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" style={{ color: '#F59E0B' }} />
                      ) : (
                        <Activity className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                      )}
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {wellbeingData.regulation.trend === 'down' ? 'Improving' : wellbeingData.regulation.trend === 'up' ? 'Elevated' : 'Stable'}
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
                        Regulation practices
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: '#FFFFFF'
                      }}>
                        {wellbeingData.regulation.practices}/week
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
                  Your sleep quality correlates with State check-ins. When you get 7+ hours, your Tempo score averages 23% higher. Consider prioritizing rest this week.
                </p>
              </div>

            </div>
          </div>

          {/* Second Hero Card: Wellbeing Dimensions Detail */}
          <div className="card-hero" style={{ minHeight: '480px', marginTop: 'var(--spacing-6)' }}>
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
                src={WELLBEING_ASSET}
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
              
              {/* Header */}
              <div>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: '8px' }}>
                  The Five Foundations
                </p>
                <h2 className="text-hero-headline text-white" style={{ margin: '0 0 var(--spacing-2) 0' }}>
                  What Supports Recovery
                </h2>
                <p className="text-body-hero text-white" style={{ maxWidth: '680px' }}>
                  These aren't goals to perfect. They're foundations to tend. Small improvements here create space for everything else.
                </p>
              </div>

              {/* Dimensions Detail */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--spacing-4)',
                width: '100%'
              }}>
                {WELLNESS_DIMENSIONS.map((dimension) => (
                  <div
                    key={dimension.id}
                    style={{
                      background: 'var(--glass-bg-medium)',
                      backdropFilter: 'var(--glass-blur-default)',
                      WebkitBackdropFilter: 'var(--glass-blur-default)',
                      border: 'var(--glass-border-default)',
                      padding: 'var(--spacing-5)',
                      borderRadius: 'var(--radius-none)'
                    }}
                  >
                    {/* Icon + Clinical Name Eyebrow */}
                    <p className="text-eyebrow" style={{ 
                      marginBottom: '6px',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      {dimension.clinical}
                    </p>

                    {/* Patient Name */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)',
                      marginBottom: 'var(--spacing-2)'
                    }}>
                      <dimension.icon className="w-5 h-5" style={{ color: dimension.color }} />
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        margin: 0
                      }}>
                        {dimension.patient}
                      </h3>
                    </div>

                    {/* Subtitle */}
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: '0 0 var(--spacing-3) 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {dimension.subtitle}
                    </p>

                    {/* Description */}
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {dimension.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
