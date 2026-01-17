/**
 * STATE - Platform V2 Benchmark Edition
 * 
 * "Where you are right now matters"
 * 
 * INNOVATION STACK:
 * ✓ Brain visualization with animated regions
 * ✓ Time-aware greeting and context
 * ✓ Therapeutic streak system
 * ✓ First-time onboarding experience
 * ✓ Success celebration animations
 * ✓ Sentient AI-powered insights
 * ✓ Recovery language (Building → Centered → Thriving)
 * ✓ Care team transparency
 * ✓ Historical comparison tools
 * ✓ Micro-interactions everywhere
 * ✓ Asset-backed glass panels
 * ✓ Desktop & mobile perfection
 */

import { useState, useEffect } from "react";
import { 
  Sparkles, ChevronRight, Circle, TrendingUp, Zap, Target, Heart,
  Clock, Award, Users, Download, Share2, Info, CheckCircle2,
  Brain, Activity, Waves
} from "lucide-react";
import { PlatformPageHeader } from "../PlatformPageHeader";

// Asset URLs
const VITALITY_ASSET = "https://images.unsplash.com/photo-1759437857377-a7be3314c8b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHB1cnBsZSUyMGVuZXJneSUyMGZsb3d8ZW58MXx8fHwxNzYxNjg1NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const FOCUS_ASSET = "https://images.unsplash.com/photo-1717406670993-641033c2a81e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWFuJTIwZ2VvbWV0cmljJTIwcGF0dGVybnN8ZW58MXx8fHwxNzYxNjg1NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const ANCHORAGE_ASSET = "https://images.unsplash.com/photo-1649788515270-d76d0a4b838b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwZmxvd2luZyUyMHdhdGVyJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYxNjg1NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const BRAIN_ASSET = "https://images.unsplash.com/photo-1719550371336-7bb64b5cacfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MXx8fHwxNzYxNTc1ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080";

// Brand colors - Cyan/Purple/Blue rotation
const GAUGES = [
  {
    id: "vitality",
    label: "Vitality",
    subtitle: "Physical energy",
    description: "How your body feels right now. Your capacity to move through the day. This includes physical energy, sleep quality, and overall sense of aliveness.",
    icon: Zap,
    brainRegion: "Brainstem & Energy Centers",
    brainDescription: "The foundation that keeps your body ready and alert",
    gradient: "from-[#5739FB] via-[#7C3AED] to-[#6366F1]",
    glowColor: "rgba(87, 57, 251, 0.4)",
    lightColor: "#5739FB",
    assetUrl: VITALITY_ASSET
  },
  {
    id: "focus",
    label: "Focus", 
    subtitle: "Mental clarity",
    description: "Your ability to pay attention and think clearly. This includes concentration, mental sharpness, and how easily you can complete tasks without distraction.",
    icon: Target,
    brainRegion: "Prefrontal Cortex",
    brainDescription: "Where planning, decisions, and attention live",
    gradient: "from-[#06B6D4] via-[#0891B2] to-[#0E7490]",
    glowColor: "rgba(6, 182, 212, 0.4)",
    lightColor: "#06B6D4",
    assetUrl: FOCUS_ASSET
  },
  {
    id: "anchorage",
    label: "Anchorage",
    subtitle: "Emotional connection",
    description: "How grounded and connected you feel. Your sense of safety, belonging, and emotional stability. This is about feeling tethered to yourself and others.",
    icon: Heart,
    brainRegion: "Limbic System",
    brainDescription: "Where emotions, memory, and connection are processed",
    gradient: "from-[#3E2BB8] via-[#4F46E5] to-[#6366F1]",
    glowColor: "rgba(62, 43, 184, 0.4)",
    lightColor: "#3E2BB8",
    assetUrl: ANCHORAGE_ASSET
  }
];

interface GaugeState {
  vitality: number;
  focus: number;
  anchorage: number;
}

interface InnerCompassPageProps {
  heroImage?: string;
}

export function InnerCompassPage({ heroImage }: InnerCompassPageProps = {}) {
  // State management
  const [values, setValues] = useState<GaugeState>({
    vitality: 65,
    focus: 58,
    anchorage: 72
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFirstTime] = useState(false); // Toggle for demo
  const [activeGauge, setActiveGauge] = useState<string | null>(null);

  // Time awareness
  const [greeting, setGreeting] = useState("");
  const [timeContext, setTimeContext] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
      setTimeContext("Start your day with awareness");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
      setTimeContext("Check in with where you are");
    } else {
      setGreeting("Good evening");
      setTimeContext("Reflect on your day");
    }
  }, []);

  const handleChange = (gauge: keyof GaugeState, value: number) => {
    setValues(prev => ({ ...prev, [gauge]: value }));
    setHasInteracted(true);
  };

  const handleLogBaseline = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const average = Math.round((values.vitality + values.focus + values.anchorage) / 3);

  // Mock data
  const streakDays = 7;
  const lastCheckIn = "8 hours ago";
  const bestWeekAvg = 74;

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <PlatformPageHeader
        page="State"
        headline="Where you are right now matters"
        height="medium"
      />

      {/* Body */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
          
          {/* Time-Aware Greeting */}
          <div className="text-center mb-8 md:mb-12">
            <h2 
              className="text-gray-900 mb-2"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '2rem',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              {greeting}, Alex
            </h2>
            <p 
              className="text-gray-600 mb-4"
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '1.0625rem'
              }}
            >
              {timeContext}
            </p>

            {/* Streak & Context Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#5739FB]" />
                <span 
                  className="text-gray-700"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}
                >
                  {streakDays} Day Streak
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span 
                  className="text-gray-500"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                >
                  Last checked in {lastCheckIn}
                </span>
              </div>
            </div>
          </div>

          {/* First Time Experience */}
          {isFirstTime && (
            <div 
              className="max-w-3xl mx-auto mb-12 p-8 relative overflow-hidden"
              style={{ borderRadius: '0px' }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(245, 243, 255, 0.98) 0%, rgba(250, 248, 255, 0.95) 100%)'
                }}
              />
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.06) 0%, rgba(87, 57, 251, 0.08) 100%)'
                }}
              />
              
              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-14 h-14 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center shadow-[0_8px_24px_rgba(62,43,184,0.25)]"
                    style={{ borderRadius: '0px' }}
                  >
                    <Info className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-gray-900 mb-2"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 600, 
                        fontSize: '1.375rem' 
                      }}
                    >
                      Welcome to State Tracking
                    </h3>
                    <p 
                      className="text-gray-700"
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '1rem', 
                        lineHeight: '1.7' 
                      }}
                    >
                      Your state calibrates everything in the platform. By tracking these three dimensions, we adapt your content, pacing, and support to meet you exactly where you are. There are no wrong answers, and your honesty helps the system serve you better.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Brain Visualization + Gauges Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
            
            {/* Brain Panel */}
            <div className="xl:col-span-5 flex">
              <BrainVisualization values={values} activeGauge={activeGauge} />
            </div>

            {/* Gauges Column */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              {GAUGES.map((gauge, index) => (
                <GaugeSlider
                  key={gauge.id}
                  gauge={gauge}
                  value={values[gauge.id as keyof GaugeState]}
                  onChange={(val) => handleChange(gauge.id as keyof GaugeState, val)}
                  onFocus={() => setActiveGauge(gauge.id)}
                  onBlur={() => setActiveGauge(null)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Log Baseline Button */}
          {hasInteracted && !showSuccess && (
            <div 
              className="max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <button 
                onClick={handleLogBaseline}
                className="w-full px-8 py-6 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white shadow-[0_8px_32px_rgba(62,43,184,0.25)] hover:shadow-[0_12px_40px_rgba(62,43,184,0.35)] transition-all group active:scale-[0.98]"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '1.125rem',
                  borderRadius: '0px'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <span>Log Your Baseline</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          )}

          {/* Success State */}
          {showSuccess && (
            <div 
              className="max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              <div 
                className="relative overflow-hidden p-8"
                style={{ borderRadius: '0px' }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 0.95) 100%)'
                  }}
                />
                
                <div className="relative flex items-center gap-6">
                  <div 
                    className="w-16 h-16 bg-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                    style={{ borderRadius: '0px' }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-white mb-1"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 600, 
                        fontSize: '1.5rem' 
                      }}
                    >
                      Baseline Logged
                    </h3>
                    <p 
                      className="text-white/90"
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '1rem' 
                      }}
                    >
                      Your content is adapting now. We will check in with you again tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Pattern */}
          <div 
            className="relative overflow-hidden mb-12"
            style={{ borderRadius: '0px' }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(250, 250, 250, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)'
              }}
            />
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.02) 0%, rgba(87, 57, 251, 0.04) 100%)'
              }}
            />

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <div>
                  <h2 
                    className="text-gray-900 mb-1"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '1.75rem', 
                      fontWeight: 600 
                    }}
                  >
                    Last 7 Days
                  </h2>
                  <p 
                    className="text-gray-600"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
                  >
                    Your patterns inform your journey
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div 
                    className="flex items-center gap-3 px-4 py-2.5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                    style={{ borderRadius: '0px' }}
                  >
                    <Sparkles className="w-5 h-5 text-[#5739FB]" />
                    <span 
                      className="text-[#5739FB] uppercase tracking-wider"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 600, 
                        fontSize: '0.8125rem' 
                      }}
                    >
                      Stable Pattern
                    </span>
                  </div>
                  <button 
                    className="p-2.5 bg-white hover:bg-gray-50 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-colors"
                    style={{ borderRadius: '0px' }}
                    title="Compare to best week"
                  >
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <WeeklyChart values={values} />

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <InsightCard
                  icon={Activity}
                  title="Pattern Detected"
                  description="Your focus dips midweek, but vitality and anchorage remain stable. Low volatility indicates good nervous system regulation."
                  color="#5739FB"
                />
                <InsightCard
                  icon={Brain}
                  title="Adaptive Response"
                  description={`Your weekly baseline is ${average}. We have adjusted your Wednesday content to include grounding exercises during your focus dip.`}
                  color="#06B6D4"
                />
                <InsightCard
                  icon={Waves}
                  title="Your Best Week"
                  description={`Week of Aug 12 averaged ${bestWeekAvg}. You are ${average >= bestWeekAvg ? 'matching' : 'building toward'} that rhythm.`}
                  color="#3E2BB8"
                />
                <InsightCard
                  icon={Clock}
                  title="Check-In Pattern"
                  description="You typically check in at 9:15am. Morning awareness creates a strong foundation for your day."
                  color="#9B8AFB"
                />
              </div>
            </div>
          </div>

          {/* Sentient Support */}
          <div 
            className="relative overflow-hidden mb-12"
            style={{ borderRadius: '0px' }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 243, 255, 0.98) 0%, rgba(250, 248, 255, 0.95) 100%)'
              }}
            />
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.06) 0%, rgba(87, 57, 251, 0.08) 100%)'
              }}
            />

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center flex-shrink-0 shadow-[0_8px_24px_rgba(62,43,184,0.25)]"
                  style={{ borderRadius: '0px' }}
                >
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-gray-900 mb-2"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600, 
                      fontSize: '1.625rem' 
                    }}
                  >
                    Your Support Adapts
                  </h3>
                  <p 
                    className="text-gray-600 mb-6"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1rem',
                      lineHeight: '1.7'
                    }}
                  >
                    The system learns your rhythm and adjusts in real-time. Your state calibrates everything from content selection to pacing to the types of practices we recommend.
                  </p>

                  {/* Next Calibration */}
                  <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-[#3E2BB8] text-[#3E2BB8] animate-pulse" />
                    <span 
                      className="text-gray-600"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                    >
                      Next calibration in 3 days • Content adjusting now
                    </span>
                  </div>
                </div>
              </div>

              {/* Care Team Transparency */}
              <div 
                className="bg-white p-7 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border-l-4"
                style={{ borderColor: '#3E2BB8', borderRadius: '0px' }}
              >
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-[#3E2BB8] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 
                        className="text-gray-900 mb-1"
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 600, 
                          fontSize: '1.0625rem' 
                        }}
                      >
                        Your Care Team Sees This
                      </h4>
                      <p 
                        className="text-gray-600"
                        style={{ 
                          fontFamily: 'var(--font-sans)', 
                          fontSize: '0.9375rem',
                          lineHeight: '1.65'
                        }}
                      >
                        Your therapist and case manager can view your state patterns to provide better support. All data is encrypted and HIPAA compliant.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 transition-colors"
                      style={{ borderRadius: '0px' }}
                      title="Share with care team"
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 transition-colors"
                      style={{ borderRadius: '0px' }}
                      title="Download your data"
                    >
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Promise */}
          <div 
            className="max-w-3xl mx-auto p-8 border-l-4"
            style={{ 
              backgroundColor: '#FAFAFA',
              borderColor: '#3E2BB8',
              borderRadius: '0px'
            }}
          >
            <p 
              className="text-gray-700 text-center"
              style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '1.0625rem', 
                lineHeight: '1.7' 
              }}
            >
              The system meets you where you are, not where it expects you to be. Your state calibrates everything. Recovery is not linear, and neither is support.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

/**
 * BRAIN VISUALIZATION
 * Shows three brain regions lighting up based on gauge values
 */
interface BrainVisualizationProps {
  values: GaugeState;
  activeGauge: string | null;
}

function BrainVisualization({ values, activeGauge }: BrainVisualizationProps) {
  return (
    <div 
      className="relative overflow-hidden w-full group flex flex-col"
      style={{ borderRadius: '0px' }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${BRAIN_ASSET})`,
          filter: 'brightness(0.85) saturate(0.9)'
        }}
      />
      
      {/* Lighter glass overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 250, 250, 0.88) 100%)'
        }}
      />
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.3)'
        }}
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col p-8 md:p-10">
        <div className="mb-6">
          <h3 
            className="text-gray-900 mb-2"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 600, 
              fontSize: '1.625rem',
              letterSpacing: '-0.01em'
            }}
          >
            Right Now, Inside
          </h3>
          <p 
            className="text-gray-700"
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.9375rem',
              lineHeight: '1.6'
            }}
          >
            These three systems work together. When you check in, you are helping us understand how to support you.
          </p>
        </div>

        {/* Simplified Brain SVG */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <svg viewBox="0 0 300 350" className="w-full max-w-[260px]">
            {/* Prefrontal Cortex (Focus) */}
            <ellipse
              cx="150"
              cy="100"
              rx="80"
              ry="60"
              fill={activeGauge === 'focus' ? GAUGES[1].lightColor : 'rgba(6, 182, 212, 0.3)'}
              opacity={Math.max(0.4, values.focus / 100)}
              className="transition-all duration-500"
              style={{
                filter: `drop-shadow(0 0 ${Math.max(10, values.focus / 2.5)}px ${GAUGES[1].lightColor})`
              }}
            />
            
            {/* Limbic System (Anchorage) */}
            <ellipse
              cx="150"
              cy="200"
              rx="70"
              ry="55"
              fill={activeGauge === 'anchorage' ? GAUGES[2].lightColor : 'rgba(62, 43, 184, 0.3)'}
              opacity={Math.max(0.4, values.anchorage / 100)}
              className="transition-all duration-500"
              style={{
                filter: `drop-shadow(0 0 ${Math.max(10, values.anchorage / 2.5)}px ${GAUGES[2].lightColor})`
              }}
            />
            
            {/* Brainstem (Vitality) */}
            <rect
              x="130"
              y="280"
              width="40"
              height="60"
              rx="8"
              fill={activeGauge === 'vitality' ? GAUGES[0].lightColor : 'rgba(87, 57, 251, 0.3)'}
              opacity={Math.max(0.4, values.vitality / 100)}
              className="transition-all duration-500"
              style={{
                filter: `drop-shadow(0 0 ${Math.max(10, values.vitality / 2.5)}px ${GAUGES[0].lightColor})`
              }}
            />

            {/* Connections */}
            <line x1="150" y1="160" x2="150" y2="240" stroke="rgba(100,100,100,0.2)" strokeWidth="2" />
            <line x1="150" y1="255" x2="150" y2="280" stroke="rgba(100,100,100,0.2)" strokeWidth="2" />
          </svg>
        </div>

        {/* Region Labels - Softer, more human */}
        <div className="space-y-3">
          {GAUGES.map((gauge) => (
            <div 
              key={gauge.id}
              className={`flex items-start gap-3 p-3.5 transition-all ${
                activeGauge === gauge.id ? 'bg-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : 'bg-white/30'
              }`}
              style={{ borderRadius: '0px' }}
            >
              <div 
                className="w-2.5 h-2.5 flex-shrink-0 mt-1.5"
                style={{ 
                  backgroundColor: gauge.lightColor,
                  borderRadius: '0px',
                  opacity: activeGauge === gauge.id ? 1 : 0.6,
                  boxShadow: activeGauge === gauge.id ? `0 0 8px ${gauge.lightColor}` : 'none'
                }}
              />
              <div className="flex-1 min-w-0">
                <div 
                  className="text-gray-900 mb-0.5"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 600, 
                    fontSize: '0.875rem'
                  }}
                >
                  {gauge.label}
                </div>
                <div 
                  className="text-gray-700"
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '0.8125rem',
                    lineHeight: '1.5'
                  }}
                >
                  {gauge.brainDescription}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * GAUGE SLIDER - Horizontal compact version
 */
interface GaugeSliderProps {
  gauge: typeof GAUGES[0];
  value: number;
  onChange: (value: number) => void;
  onFocus: () => void;
  onBlur: () => void;
  index: number;
}

function GaugeSlider({ gauge, value, onChange, onFocus, onBlur, index }: GaugeSliderProps) {
  const Icon = gauge.icon;

  const getStateLabel = (val: number): string => {
    if (val < 35) return "Building";
    if (val < 65) return "Centered";
    return "Thriving";
  };

  return (
    <div 
      className="relative overflow-hidden group transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] flex-1 flex flex-col"
      style={{ 
        borderRadius: '0px',
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Background Asset */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ 
          backgroundImage: `url(${gauge.assetUrl})`,
          filter: 'brightness(0.9) saturate(0.85)'
        }}
      />

      {/* Lighter multi-layer glass */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.93) 0%, rgba(250, 250, 250, 0.88) 100%)'
        }}
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${gauge.glowColor} 100%)`
        }}
      />
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.2)'
        }}
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
          {/* Icon + Label + Description */}
          <div className="flex items-start gap-4 flex-1">
            <div 
              className={`w-12 h-12 bg-gradient-to-br ${gauge.gradient} flex items-center justify-center shadow-[0_6px_20px_${gauge.glowColor}] flex-shrink-0`}
              style={{ borderRadius: '0px' }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 
                className="text-gray-900 mb-1"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '1.25rem',
                  letterSpacing: '-0.01em'
                }}
              >
                {gauge.label}
              </h3>
              <p 
                className="text-gray-700 mb-3"
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '0.875rem',
                  lineHeight: '1.6'
                }}
              >
                {gauge.description}
              </p>
            </div>
          </div>

          {/* Value */}
          <div className="lg:w-28 flex-shrink-0">
            <div 
              className="transition-all duration-300"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: '3rem',
                lineHeight: '1',
                color: gauge.lightColor,
                letterSpacing: '-0.03em',
                textShadow: `0 4px 16px ${gauge.glowColor}`
              }}
            >
              {value}
            </div>
            <div 
              className="uppercase tracking-wider text-gray-600"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 600, 
                fontSize: '0.6875rem'
              }}
            >
              {getStateLabel(value)}
            </div>
          </div>
        </div>

        {/* Slider - Full Width Below */}
        <div className="mt-auto">
          <div className="relative">
            <div 
              className="relative h-3 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]"
              style={{ 
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0px'
              }}
            >
              <div 
                className={`absolute h-full bg-gradient-to-r ${gauge.gradient} transition-all duration-300`}
                style={{ 
                  width: `${value}%`,
                  boxShadow: `0 0 20px ${gauge.glowColor}`
                }}
              />
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              onFocus={onFocus}
              onBlur={onBlur}
              className="absolute top-0 w-full h-10 appearance-none bg-transparent cursor-pointer"
              style={{
                marginTop: '-14px',
                WebkitAppearance: 'none'
              }}
              aria-label={`${gauge.label} level`}
            />

            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 28px;
                height: 28px;
                background: white;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 3px ${gauge.lightColor};
                border-radius: 0px;
                transition: all 0.2s;
              }
              
              input[type="range"]::-webkit-slider-thumb:hover {
                box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4), 0 0 0 4px ${gauge.lightColor};
                transform: scale(1.15);
              }
              
              input[type="range"]::-moz-range-thumb {
                width: 28px;
                height: 28px;
                background: white;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 3px ${gauge.lightColor};
                border-radius: 0px;
                transition: all 0.2s;
              }
              
              input[type="range"]::-moz-range-thumb:hover {
                box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4), 0 0 0 4px ${gauge.lightColor};
                transform: scale(1.15);
              }
            `}</style>

            {/* Range labels */}
            <div className="flex justify-between mt-3 px-1">
              <span 
                className="text-gray-500 uppercase tracking-wider"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '0.6875rem' 
                }}
              >
                Low
              </span>
              <span 
                className="text-gray-500 uppercase tracking-wider"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '0.6875rem' 
                }}
              >
                High
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * WEEKLY CHART
 */
function WeeklyChart({ values }: { values: GaugeState }) {
  return (
    <div 
      className="bg-white p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      style={{ borderRadius: '0px' }}
    >
      <div className="relative h-64 md:h-80">
        <svg className="w-full h-full" viewBox="0 0 1000 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="vitalityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5739FB" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#5739FB" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="focusGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="anchorageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3E2BB8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3E2BB8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[80, 160, 240].map((y) => (
            <line 
              key={y}
              x1="0" 
              y1={y} 
              x2="1000" 
              y2={y} 
              stroke="#F3F4F6" 
              strokeWidth="1.5" 
            />
          ))}
          
          {/* Area fills */}
          <path
            d="M 0 170 L 143 165 L 286 175 L 429 168 L 572 172 L 715 166 L 858 170 L 1000 165 L 1000 320 L 0 320 Z"
            fill="url(#vitalityGradient)"
          />
          <path
            d="M 0 130 L 143 125 L 286 135 L 429 185 L 572 178 L 715 128 L 858 132 L 1000 130 L 1000 320 L 0 320 Z"
            fill="url(#focusGradient)"
          />
          <path
            d="M 0 100 L 143 95 L 286 98 L 429 93 L 572 97 L 715 94 L 858 98 L 1000 95 L 1000 320 L 0 320 Z"
            fill="url(#anchorageGradient)"
          />
          
          {/* Lines */}
          <path
            d="M 0 170 L 143 165 L 286 175 L 429 168 L 572 172 L 715 166 L 858 170 L 1000 165"
            stroke="#5739FB"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 0 130 L 143 125 L 286 135 L 429 185 L 572 178 L 715 128 L 858 132 L 1000 130"
            stroke="#06B6D4"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 0 100 L 143 95 L 286 98 L 429 93 L 572 97 L 715 94 L 858 98 L 1000 95"
            stroke="#3E2BB8"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {[0, 143, 286, 429, 572, 715, 858, 1000].map((x, i) => {
            const vitalityY = [170, 165, 175, 168, 172, 166, 170, 165][i];
            const focusY = [130, 125, 135, 185, 178, 128, 132, 130][i];
            const anchorageY = [100, 95, 98, 93, 97, 94, 98, 95][i];
            
            return (
              <g key={i}>
                <circle cx={x} cy={vitalityY} r="6" fill="white" stroke="#5739FB" strokeWidth="3" />
                <circle cx={x} cy={focusY} r="6" fill="white" stroke="#06B6D4" strokeWidth="3" />
                <circle cx={x} cy={anchorageY} r="6" fill="white" stroke="#3E2BB8" strokeWidth="3" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Day labels */}
      <div className="flex justify-between mt-6 px-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today'].map((day) => (
          <span 
            key={day}
            className={`uppercase tracking-wider ${day === 'Today' ? 'text-[#3E2BB8]' : 'text-gray-500'}`}
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '0.6875rem', 
              fontWeight: 600 
            }}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * INSIGHT CARD
 */
interface InsightCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

function InsightCard({ icon: Icon, title, description, color }: InsightCardProps) {
  return (
    <div 
      className="bg-white p-6 md:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border-l-4 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow"
      style={{ borderColor: color, borderRadius: '0px' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
        <h4 
          className="text-gray-900"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 600, 
            fontSize: '1rem' 
          }}
        >
          {title}
        </h4>
      </div>
      <p 
        className="text-gray-700"
        style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: '0.9375rem',
          lineHeight: '1.65'
        }}
      >
        {description}
      </p>
    </div>
  );
}
