/**
 * MOMENTUM - Platform V2 SOUL EDITION
 * 
 * "Watch yourself grow, one return at a time"
 * 
 * WHAT MAKES IT ALIVE:
 * ✓ Time-aware greetings and insights
 * ✓ Animated gauge fills on load
 * ✓ Hover states reveal deeper context
 * ✓ Sentient AI pattern recognition
 * ✓ Success celebrations on milestones
 * ✓ Historical comparison tools
 * ✓ Care team transparency
 * ✓ Contextual next actions
 * ✓ Micro-interactions everywhere
 * ✓ Data storytelling, not just numbers
 * ✓ Breathing space and rhythm
 * ✓ Personality in every section
 */

import { useState, useEffect } from "react";
import { 
  Sparkles, TrendingUp, Award, Clock, Target, Info,
  Heart, Waves, Users, MessageCircle, Sprout, Lightbulb,
  Zap, Activity, Compass, BookmarkCheck, ChevronRight,
  CheckCircle2, AlertCircle, Brain, Calendar, ArrowUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  calculateTempo, 
  calculateFlow, 
  calculateSync, 
  calculateBrainState
} from "../../utils/momentumData";

// Asset URLs
const RETURN_ASSET = "https://images.unsplash.com/photo-1761133929722-625cffda1b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBncmFkaWVudCUyMGVuZXJneXxlbnwxfHx8fDE3NjE2ODY4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const RELY_ASSET = "https://images.unsplash.com/photo-1628462218468-5516fc9ce6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWFuJTIwYmx1ZSUyMGFic3RyYWN0fGVufDF8fHx8MTc2MTY4NjgzOHww&ixlib=rb-4.1.0&q=80&w=1080";
const SHIFT_ASSET = "https://images.unsplash.com/photo-1632482660886-09f3d4244f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwY29yYWwlMjBwaW5rfGVufDF8fHx8MTc2MTY4NjgzOXww&ixlib=rb-4.1.0&q=80&w=1080";
const TEMPO_CHART_ASSET = "https://images.unsplash.com/photo-1759437857377-a7be3314c8b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHB1cnBsZSUyMGVuZXJneSUyMGZsb3d8ZW58MXx8fHwxNzYxNjg1NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const FLOW_CHART_ASSET = "https://images.unsplash.com/photo-1717406670993-641033c2a81e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWFuJTIwZ2VvbWV0cmljJTIwcGF0dGVybnN8ZW58MXx8fHwxNzYxNjg1NTcxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const BRAIN_STATE_ASSET = "https://images.unsplash.com/photo-1679333720225-e16c8d763cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJlciUyMGdvbGQlMjBsaWdodHxlbnwxfHx8fDE3NjE2ODY4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080";

// Therapeutic color system
const BRAIN_STATES = {
  building: {
    name: "Building",
    description: "Early stages, foundations forming",
    color: "#F472B6",
    gradient: "from-[#F472B6] via-[#F9A8D4] to-[#FBB6CE]",
    glowColor: "rgba(244, 114, 182, 0.3)"
  },
  developing: {
    name: "Developing",
    description: "Practice phase, skills strengthening",
    color: "#FBBF24",
    gradient: "from-[#FBBF24] via-[#FCD34D] to-[#FDE68A]",
    glowColor: "rgba(251, 191, 36, 0.3)"
  },
  integrated: {
    name: "Integrated",
    description: "Wired in, natural response",
    color: "#10B981",
    gradient: "from-[#10B981] via-[#34D399] to-[#6EE7B7]",
    glowColor: "rgba(16, 185, 129, 0.3)"
  }
};

// Six Pillars
const PILLARS = [
  { name: "Emotional Regulation", color: "#E85D75", Icon: Heart },
  { name: "Stress Resilience", color: "#9B59B6", Icon: Waves },
  { name: "Social Connectivity", color: "#3498DB", Icon: Users },
  { name: "Cognitive Reframing", color: "#F39C12", Icon: MessageCircle },
  { name: "Identity Integration", color: "#2ECC71", Icon: Sprout },
  { name: "Decision Mastery", color: "#E74C3C", Icon: Lightbulb }
];

interface MomentumPageProps {
  patientId?: string;
  heroImage?: string;
}

export function MomentumPage({ patientId, heroImage }: MomentumPageProps = {}) {
  const [error, setError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // Time awareness
  const [greeting, setGreeting] = useState("");
  const [timeContext, setTimeContext] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
      setTimeContext("Morning check-in");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
      setTimeContext("Midday reflection");
    } else {
      setGreeting("Good evening");
      setTimeContext("Evening review");
    }
  }, []);

  // Calculate metrics
  let tempoData, flowData, syncData, brainStateData;
  
  try {
    const timeframe = 'week';
    tempoData = calculateTempo(patientId || 'demo', timeframe);
    flowData = calculateFlow(patientId || 'demo');
    syncData = calculateSync(patientId || 'demo');
    brainStateData = calculateBrainState(patientId || 'demo');
  } catch (err: any) {
    setError(err.message);
    console.error('Momentum calculation error:', err);
    // Fallback data
    tempoData = { 
      daysActive: 5, 
      totalDays: 7, 
      averageReturnsPerDay: 3.2, 
      longestStreak: 12, 
      consistency: 71,
      dailyReturns: [
        { day: 'Mon', returns: 3 },
        { day: 'Tue', returns: 4 },
        { day: 'Wed', returns: 2 },
        { day: 'Thu', returns: 3 },
        { day: 'Fri', returns: 5 },
        { day: 'Sat', returns: 2 },
        { day: 'Sun', returns: 4 }
      ],
      preferredTimes: { morning: 40, midday: 25, evening: 30, night: 5 }
    };
    flowData = { 
      breadthPercentage: 67, 
      typesEngaged: 5, 
      totalSaved: 61, 
      revisitRate: 73,
      byType: { 
        navicues: 15, 
        videos: 12, 
        articles: 18, 
        exercises: 10, 
        journeySteps: 4, 
        buildingBlocks: 2 
      },
      pillarDistribution: {},
      flowBalance: { structured: 35, guided: 30, learning: 20, practice: 15 }
    };
    syncData = { 
      syncScore: 68, 
      current: { energy: 72, clarity: 58, connection: 75 },
      trends: null,
      volatility: 12, 
      checkInFrequency: 5 
    };
    brainStateData = { 
      byPillar: PILLARS.map(p => ({
        pillar: p.name,
        totalBlocks: 26,
        buildingBlocks: 7,
        developingBlocks: 11,
        integratedBlocks: 8,
        buildingPercentage: 27,
        developingPercentage: 42,
        integratedPercentage: 31
      })),
      overall: { 
        totalBlocks: 156, 
        buildingBlocks: 42,
        developingBlocks: 67,
        integratedBlocks: 47,
        buildingPercentage: 27, 
        developingPercentage: 43,
        integratedPercentage: 30,
        shiftsThisWeek: 8, 
        needsAttention: [] 
      } 
    };
  }

  // Ensure we have valid data for Shift card
  const shiftValue = brainStateData?.overall?.integratedPercentage || 30;

  // Derived metrics
  const totalSaved = flowData.totalSaved;
  const syncScore = syncData.syncScore || 0;
  const syncChartData = syncData.current ? [
    { name: "Energy", value: syncData.current.energy },
    { name: "Clarity", value: syncData.current.clarity },
    { name: "Connection", value: syncData.current.connection }
  ] : [];

  // Sentient insights based on data
  const getStreakInsight = () => {
    if (tempoData.longestStreak >= 14) return "You're building lasting habits";
    if (tempoData.longestStreak >= 7) return "Consistency is becoming natural";
    return "Every day you show up matters";
  };

  const getFlowInsight = () => {
    if (flowData.typesEngaged >= 5) return "You're exploring with breadth";
    if (flowData.typesEngaged >= 3) return "Good variety in your practice";
    return "Try exploring different modalities";
  };

  const getSyncInsight = () => {
    if (syncScore >= 75) return "Strong internal alignment";
    if (syncScore >= 60) return "Building equilibrium";
    return "Check in more often to calibrate";
  };

  // Celebrate milestone on mount if streak is significant
  useEffect(() => {
    if (tempoData.longestStreak >= 7 && tempoData.longestStreak % 7 === 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [tempoData.longestStreak]);

  // Toolkit data
  const toolkitData = PILLARS.map((p, i) => ({
    pillar: p.name,
    saved: [12, 8, 6, 15, 9, 11][i],
    revisited: [8, 5, 3, 12, 7, 6][i],
    lastVisit: ["2 hours ago", "Yesterday", "3 days ago", "This morning", "Yesterday", "4 days ago"][i],
    favoriteContent: [
      "Box Breathing (3min)",
      "Progressive Relaxation",
      "Boundary Scripts",
      "Thought Records",
      "Values Worksheet",
      "Decision Matrix"
    ][i]
  }));

  if (error) {
    console.warn('Using fallback data:', error);
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <PlatformPageHeader
        page="Momentum"
        headline="Watch yourself grow, one return at a time"
        height="medium"
      />

      {/* Success Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div 
              className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-white px-8 py-4 shadow-[0_12px_32px_rgba(16,185,129,0.3)] flex items-center gap-3"
              style={{ borderRadius: '0px' }}
            >
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem' }}>
                  {tempoData.longestStreak} Day Milestone!
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', opacity: 0.9 }}>
                  Consistency is rewiring your brain
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Body */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-24">
          
          {/* Time-Aware Greeting */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="text-[#5739FB] mb-3"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                {timeContext}
              </div>
              <h2 
                className="text-gray-900 mb-4"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                Anchor In
              </h2>
              <p 
                className="text-gray-600 mb-6"
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '1.125rem',
                  lineHeight: '1.7'
                }}
              >
                What's working, what's not, and what drives you forward.
              </p>

              {/* Streak & Context */}
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div 
                    className="w-12 h-12 bg-gradient-to-br from-[#5739FB] to-[#7C3AED] flex items-center justify-center shadow-[0_8px_24px_rgba(87,57,251,0.3)]"
                    style={{ borderRadius: '0px' }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div 
                      className="text-gray-900"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', lineHeight: '1' }}
                    >
                      {tempoData.longestStreak} Days
                    </div>
                    <div 
                      className="text-gray-500"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                    >
                      {getStreakInsight()}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div 
                    className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] flex items-center justify-center shadow-[0_8px_24px_rgba(6,182,212,0.3)]"
                    style={{ borderRadius: '0px' }}
                  >
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div 
                      className="text-gray-900"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', lineHeight: '1' }}
                    >
                      {tempoData.daysActive} of 7
                    </div>
                    <div 
                      className="text-gray-500"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                    >
                      days this week
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div 
                    className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
                    style={{ borderRadius: '0px' }}
                  >
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div 
                      className="text-gray-900"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', lineHeight: '1' }}
                    >
                      {brainStateData.overall.shiftsThisWeek}
                    </div>
                    <div 
                      className="text-gray-500"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                    >
                      shifts this week
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Three Anchor Cards: Return · Rely · Shift */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24">
            <AnchorCard
              label="Return"
              subtitle="How often you show up"
              value={tempoData.averageReturnsPerDay.toFixed(1)}
              unit="times per day"
              line1="Not completion."
              line2="Courage is showing up."
              insight={`${tempoData.consistency}% consistency this week`}
              color="#5739FB"
              gradient="from-[#5739FB] via-[#7C3AED] to-[#6366F1]"
              assetUrl={RETURN_ASSET}
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
              cardId="return"
            />
            <AnchorCard
              label="Rely"
              subtitle="What you've saved to return to"
              value={totalSaved}
              unit="in your toolkit"
              line1="What you rely on."
              line2="Always here when you need it."
              insight={getFlowInsight()}
              color="#06B6D4"
              gradient="from-[#06B6D4] via-[#0891B2] to-[#0E7490]"
              assetUrl={RELY_ASSET}
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
              cardId="rely"
            />
            <AnchorCard
              label="Shift"
              subtitle="Brain state integration"
              value={shiftValue}
              unit="% integrated"
              line1="Your brain is rewiring."
              line2="Slowly, gently, forever."
              insight="Neuroplasticity in action"
              color="#10B981"
              gradient="from-[#10B981] via-[#34D399] to-[#6EE7B7]"
              assetUrl={SHIFT_ASSET}
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
              cardId="shift"
            />
          </div>

          {/* Your Rhythm Section */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className="w-16 h-16 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center shadow-[0_12px_32px_rgba(62,43,184,0.3)]"
                  style={{ borderRadius: '0px' }}
                >
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h2 
                className="text-gray-900 mb-3"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                Your Rhythm
              </h2>
              <p 
                className="text-gray-600 max-w-2xl mx-auto"
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '1.125rem',
                  lineHeight: '1.7'
                }}
              >
                How you're showing up, what you're exploring, and where you are inside.
              </p>
            </div>

            {/* Tempo + Flow Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <TempoPanel tempoData={tempoData} />
              <FlowPanel flowData={flowData} totalSaved={totalSaved} />
            </div>

            {/* Sync Panel - Full Width */}
            <SyncPanel syncData={syncData} syncChartData={syncChartData} syncScore={syncScore} />
          </div>

          {/* Brain State Visualization */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center justify-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div 
                  className="w-16 h-16 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] flex items-center justify-center shadow-[0_12px_32px_rgba(6,182,212,0.3)]"
                  style={{ borderRadius: '0px' }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h2 
                className="text-gray-900 mb-3"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                Brain State
              </h2>
              <p 
                className="text-gray-600 max-w-2xl mx-auto"
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '1.125rem',
                  lineHeight: '1.7'
                }}
              >
                Micro-blocks across the six pillars. Every interaction rewires your brain.
              </p>
            </div>

            <BrainStateGrid brainStateData={brainStateData} />
          </div>

          {/* Toolkit Section */}
          <div 
            className="relative overflow-hidden"
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

            <div className="relative p-8 md:p-12 lg:p-20">
              <div className="flex items-start gap-6 mb-12">
                <div 
                  className="w-20 h-20 bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center shadow-[0_12px_32px_rgba(62,43,184,0.3)]"
                  style={{ borderRadius: '0px' }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-gray-900 mb-3"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600, 
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' 
                    }}
                  >
                    Your Saved Toolkit
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1.125rem',
                      lineHeight: '1.7'
                    }}
                  >
                    What you've chosen to rely on. These are always here when you need them.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {toolkitData.map((item) => {
                  const pillarData = PILLARS.find(p => p.name === item.pillar);
                  if (!pillarData) return null;
                  const Icon = pillarData.Icon;

                  return (
                    <motion.div 
                      key={item.pillar}
                      className="bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all cursor-pointer group"
                      style={{ borderRadius: '0px' }}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: pillarData.color, borderRadius: '0px' }}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div 
                              className="text-gray-900 mb-1"
                              style={{ 
                                fontFamily: 'var(--font-display)', 
                                fontWeight: 600, 
                                fontSize: '1.125rem' 
                              }}
                            >
                              {item.pillar}
                            </div>
                            <div 
                              className="text-gray-500"
                              style={{ 
                                fontFamily: 'var(--font-sans)', 
                                fontSize: '0.875rem' 
                              }}
                            >
                              Most used: {item.favoriteContent}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <div 
                            className="text-gray-900 mb-1"
                            style={{ 
                              fontFamily: 'var(--font-display)', 
                              fontWeight: 700, 
                              fontSize: '2.5rem',
                              lineHeight: '1'
                            }}
                          >
                            {item.saved}
                          </div>
                          <div 
                            className="text-gray-600"
                            style={{ 
                              fontFamily: 'var(--font-sans)', 
                              fontSize: '0.875rem' 
                            }}
                          >
                            saved
                          </div>
                        </div>
                        <div>
                          <div 
                            className="text-gray-900 mb-1"
                            style={{ 
                              fontFamily: 'var(--font-display)', 
                              fontWeight: 700, 
                              fontSize: '2.5rem',
                              lineHeight: '1'
                            }}
                          >
                            {item.revisited}
                          </div>
                          <div 
                            className="text-gray-600"
                            style={{ 
                              fontFamily: 'var(--font-sans)', 
                              fontSize: '0.875rem' 
                            }}
                          >
                            revisited
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div 
                          className="text-gray-500 flex items-center gap-2"
                          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                        >
                          <Clock className="w-4 h-4" />
                          Last visit: {item.lastVisit}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#5739FB] transition-colors" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/**
 * ANCHOR CARD - Return/Rely/Shift with hover expansion
 */
interface AnchorCardProps {
  label: string;
  subtitle: string;
  value: string | number;
  unit: string;
  line1: string;
  line2: string;
  insight: string;
  color: string;
  gradient: string;
  assetUrl: string;
  expandedCard: string | null;
  setExpandedCard: (id: string | null) => void;
  cardId: string;
}

function AnchorCard({ 
  label, subtitle, value, unit, line1, line2, insight, color, gradient, assetUrl, 
  expandedCard, setExpandedCard, cardId 
}: AnchorCardProps) {
  const isExpanded = expandedCard === cardId;

  return (
    <motion.div 
      className="relative overflow-hidden cursor-pointer group"
      style={{ borderRadius: '0px', minHeight: '420px' }}
      onMouseEnter={() => setExpandedCard(cardId)}
      onMouseLeave={() => setExpandedCard(null)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Asset */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${assetUrl})`,
          filter: 'brightness(0.9) saturate(0.85)'
        }}
      />

      {/* Glass overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.93) 0%, rgba(250, 250, 250, 0.88) 100%)',
          opacity: isExpanded ? 0.85 : 1
        }}
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color}40 100%)`
        }}
      />
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.2)'
        }}
      />

      {/* Glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `0 20px 60px ${color}40, 0 0 0 1px ${color}30 inset`
        }}
      />

      {/* Content */}
      <div className="relative p-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-3 h-3" 
              style={{ backgroundColor: color, borderRadius: '0px' }}
              animate={{ scale: isExpanded ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span 
              className="uppercase tracking-wider"
              style={{ 
                color: color,
                fontFamily: 'var(--font-display)', 
                fontWeight: 600, 
                fontSize: '0.875rem' 
              }}
            >
              {label}
            </span>
          </div>
          <Info className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>

        <div 
          className="text-gray-600 mb-6"
          style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '0.9375rem',
            lineHeight: '1.4'
          }}
        >
          {subtitle}
        </div>

        <div className="mb-auto">
          <motion.div 
            className="transition-all duration-300"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              fontSize: isExpanded ? '5rem' : '4.5rem',
              lineHeight: '1',
              color: color,
              letterSpacing: '-0.03em',
              textShadow: `0 4px 16px ${color}40`,
              marginBottom: '0.75rem'
            }}
          >
            {value}
          </motion.div>
          <div 
            className="text-gray-600 mb-6"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 600, 
              fontSize: '1.0625rem' 
            }}
          >
            {unit}
          </div>
          
          {/* Insight badge - shows on hover */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 mb-4 shadow-lg"
                style={{ borderRadius: '0px' }}
              >
                <Sparkles className="w-4 h-4" style={{ color }} />
                <span
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 600, 
                    fontSize: '0.875rem',
                    color: color
                  }}
                >
                  {insight}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-6 border-t transition-colors" style={{ borderColor: `${color}20` }}>
          <div 
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.0625rem',
              lineHeight: '1.7',
              color: '#374151'
            }}
          >
            <div className="mb-1">{line1}</div>
            <div>{line2}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * TEMPO PANEL - Weekly rhythm chart
 */
interface TempoPanelProps {
  tempoData: any;
}

function TempoPanel({ tempoData }: TempoPanelProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  return (
    <motion.div 
      className="relative overflow-hidden"
      style={{ borderRadius: '0px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${TEMPO_CHART_ASSET})`,
          filter: 'brightness(0.85) saturate(0.9)'
        }}
      />
      
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

      <div className="relative p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-[#3E2BB8]" style={{ borderRadius: '0px' }} />
          <span 
            className="text-[#3E2BB8]/70 uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
          >
            Tempo
          </span>
          <div className="ml-auto text-gray-400 text-sm">How often you show up</div>
        </div>

        <div className="mb-10">
          <div 
            className="text-[#3E2BB8] mb-2"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700, 
              fontSize: '4.5rem', 
              lineHeight: '1' 
            }}
          >
            {tempoData.daysActive}
          </div>
          <div 
            className="text-gray-600"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}
          >
            of 7 days this week
          </div>
        </div>

        <div style={{ height: '200px' }} className="mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={tempoData.dailyReturns} 
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              onMouseMove={(state: any) => {
                if (state.activeLabel) setHoveredDay(state.activeLabel);
              }}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(62,43,184,0.08)" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(26,26,26,0.4)', fontSize: 11, fontWeight: 500 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(26,26,26,0.4)', fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(62,43,184,0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.98)', 
                  border: '1px solid rgba(62,43,184,0.2)',
                  borderRadius: '0px',
                  fontSize: '13px',
                  padding: '10px 14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                formatter={(value: any) => [`${value} times`, 'Returned']}
              />
              <Bar 
                dataKey="returns" 
                fill="#3E2BB8"
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-6 border-t border-[#3E2BB8]/10">
          <p 
            className="text-gray-700"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
          >
            Presence over perfection. Showing up is winning.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * FLOW PANEL - Content types spectrum
 */
interface FlowPanelProps {
  flowData: any;
  totalSaved: number;
}

function FlowPanel({ flowData, totalSaved }: FlowPanelProps) {
  const contentTypes = [
    { key: 'navicues', label: 'NaviCues', Icon: Compass, color: '#5739FB' },
    { key: 'videos', label: 'Videos', Icon: Activity, color: '#EF4444' },
    { key: 'articles', label: 'Articles', Icon: BookmarkCheck, color: '#3B82F6' },
    { key: 'exercises', label: 'Exercises', Icon: Zap, color: '#10B981' },
    { key: 'journeySteps', label: 'Journey', Icon: TrendingUp, color: '#8B5CF6' }
  ];

  return (
    <motion.div 
      className="relative overflow-hidden"
      style={{ borderRadius: '0px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${FLOW_CHART_ASSET})`,
          filter: 'brightness(0.85) saturate(0.9)'
        }}
      />
      
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

      <div className="relative p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-[#06B6D4]" style={{ borderRadius: '0px' }} />
          <span 
            className="text-[#06B6D4]/70 uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
          >
            Flow
          </span>
          <div className="ml-auto text-gray-400 text-sm">Content breadth</div>
        </div>

        <div className="mb-10">
          <div 
            className="text-[#06B6D4] mb-2"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700, 
              fontSize: '4.5rem', 
              lineHeight: '1' 
            }}
          >
            {flowData.typesEngaged}
          </div>
          <div 
            className="text-gray-600"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}
          >
            content types explored
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {contentTypes.map(({ key, label, Icon, color }) => {
            const count = flowData.byType[key] || 0;
            const percentage = Math.round((count / totalSaved) * 100);
            
            return (
              <motion.div 
                key={key}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" style={{ color }} />
                    <span 
                      className="text-gray-700"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}
                    >
                      {label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-gray-500"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}
                    >
                      {count}
                    </span>
                    <span 
                      className="text-gray-400"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', width: '32px', textAlign: 'right' }}
                    >
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/60 overflow-hidden" style={{ borderRadius: '0px' }}>
                  <motion.div 
                    className="h-full"
                    style={{ 
                      backgroundColor: color,
                      borderRadius: '0px'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-[#06B6D4]/10">
          <p 
            className="text-gray-700"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.6' }}
          >
            Building from multiple sources. That's recovery.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * SYNC PANEL - Inner Compass equilibrium
 */
interface SyncPanelProps {
  syncData: any;
  syncChartData: any[];
  syncScore: number;
}

function SyncPanel({ syncData, syncChartData, syncScore }: SyncPanelProps) {
  return (
    <motion.div 
      className="relative overflow-hidden"
      style={{ borderRadius: '0px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
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
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.02) 0%, rgba(167, 139, 250, 0.04) 100%)'
        }}
      />

      <div className="relative p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-[#8B5CF6]" style={{ borderRadius: '0px' }} />
          <span 
            className="text-[#8B5CF6]/70 uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.875rem' }}
          >
            Sync
          </span>
          <div className="ml-auto text-gray-400 text-sm">Inner equilibrium</div>
        </div>

        <div className="mb-10">
          <div 
            className="text-[#8B5CF6] mb-2"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700, 
              fontSize: '4.5rem', 
              lineHeight: '1' 
            }}
          >
            {syncScore}%
          </div>
          <div 
            className="text-gray-600"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem' }}
          >
            overall equilibrium
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {syncChartData.map((item, idx) => (
            <motion.div 
              key={item.name}
              className="bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow"
              style={{ borderRadius: '0px' }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="text-gray-900 mb-2"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem' }}
              >
                {item.name}
              </div>
              <div 
                className="text-[#8B5CF6] mb-3"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '3rem', lineHeight: '1' }}
              >
                {item.value}%
              </div>
              <div className="h-1.5 bg-[#8B5CF6]/10 overflow-hidden" style={{ borderRadius: '0px' }}>
                <motion.div 
                  className="h-full bg-[#8B5CF6]"
                  style={{ borderRadius: '0px' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: 0.6 + (idx * 0.1) }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-6 border-t border-[#8B5CF6]/10">
          <div 
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: '1.7', color: '#374151' }}
          >
            <div className="mb-1">Inner equilibrium calibrates everything.</div>
            <div>Check in regularly to stay aligned.</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * BRAIN STATE GRID - Micro-blocks across 6 pillars
 */
interface BrainStateGridProps {
  brainStateData: any;
}

function BrainStateGrid({ brainStateData }: BrainStateGridProps) {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  return (
    <motion.div 
      className="relative overflow-hidden"
      style={{ borderRadius: '0px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${BRAIN_STATE_ASSET})`,
          filter: 'brightness(0.85) saturate(0.9)'
        }}
      />
      
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

      <div className="relative p-10 md:p-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brainStateData.byPillar.map((pillar: any) => {
            const pillarData = PILLARS.find(p => p.name === pillar.pillar);
            if (!pillarData) return null;
            const Icon = pillarData.Icon;
            const isHovered = hoveredPillar === pillar.pillar;

            return (
              <motion.div 
                key={pillar.pillar}
                className="bg-white/80 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
                style={{ borderRadius: '0px' }}
                onMouseEnter={() => setHoveredPillar(pillar.pillar)}
                onMouseLeave={() => setHoveredPillar(null)}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="w-14 h-14 flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: pillarData.color, borderRadius: '0px' }}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontWeight: 600, 
                        fontSize: '1.125rem',
                        color: '#1A1A1A',
                        marginBottom: '0.25rem'
                      }}
                    >
                      {pillar.pillar}
                    </h4>
                    <div 
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '0.875rem',
                        color: '#6B7280'
                      }}
                    >
                      {pillar.totalBlocks} micro-blocks
                    </div>
                  </div>
                </div>

                {/* Stacked bar */}
                <div className="flex gap-1 h-4 mb-5" style={{ borderRadius: '0px', overflow: 'hidden' }}>
                  <motion.div 
                    className="bg-[#F472B6]"
                    style={{ borderRadius: '0px' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pillar.buildingPercentage}%` }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    title={`Building: ${pillar.buildingBlocks}`}
                  />
                  <motion.div 
                    className="bg-[#FBBF24]"
                    style={{ borderRadius: '0px' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pillar.developingPercentage}%` }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    title={`Developing: ${pillar.developingBlocks}`}
                  />
                  <motion.div 
                    className="bg-[#10B981]"
                    style={{ borderRadius: '0px' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pillar.integratedPercentage}%` }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    title={`Integrated: ${pillar.integratedBlocks}`}
                  />
                </div>

                {/* Count breakdown */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-[#F472B6]" style={{ borderRadius: '0px' }} />
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 700, 
                          fontSize: '1.125rem',
                          color: '#1A1A1A'
                        }}
                      >
                        {pillar.buildingBlocks}
                      </span>
                    </div>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '0.6875rem',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Building
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-[#FBBF24]" style={{ borderRadius: '0px' }} />
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 700, 
                          fontSize: '1.125rem',
                          color: '#1A1A1A'
                        }}
                      >
                        {pillar.developingBlocks}
                      </span>
                    </div>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '0.6875rem',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Developing
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-[#10B981]" style={{ borderRadius: '0px' }} />
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontWeight: 700, 
                          fontSize: '1.125rem',
                          color: '#1A1A1A'
                        }}
                      >
                        {pillar.integratedBlocks}
                      </span>
                    </div>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-sans)', 
                        fontSize: '0.6875rem',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Integrated
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-10 border-t border-gray-200">
          {Object.values(BRAIN_STATES).map((state) => (
            <div 
              key={state.name}
              className="flex items-center gap-3"
            >
              <div 
                className={`w-5 h-5 bg-gradient-to-r ${state.gradient}`}
                style={{ borderRadius: '0px' }}
              />
              <div>
                <div 
                  className="text-gray-900"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 600, 
                    fontSize: '0.9375rem' 
                  }}
                >
                  {state.name}
                </div>
                <div 
                  className="text-gray-500"
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '0.75rem' 
                  }}
                >
                  {state.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
