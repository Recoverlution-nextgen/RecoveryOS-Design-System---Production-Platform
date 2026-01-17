/**
 * LUMA Recommendations - AI-Powered NaviCue Suggestions
 * 
 * Shows personalized NaviCue recommendations based on:
 * - Red-state micro-blocks (high priority)
 * - Current Journey progress
 * - Proven effectiveness
 * - Patient state (energy, clarity, connection)
 * 
 * Design:
 * - infiniteK Square (0px borderRadius)
 * - Premium glass cards
 * - Confidence scores shown subtly
 * - "Recommended for You" copy
 */

import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Zap, Brain, Heart, Waves } from "lucide-react";
import { motion } from "motion/react";

interface NavicueRecommendation {
  id: string;
  title: string;
  subtitle: string;
  pillar: string;
  icon: any;
  gradient: string;
  confidence: number; // 0-100
  score: number; // 0-100
  reasoning: string;
  estimatedTime: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  targetStates: ("red" | "orange" | "green")[];
}

interface LumaRecommendationsProps {
  patientId?: string;
  type?: "spark" | "sos" | "journey-next";
  limit?: number;
  onSelectNaviCue?: (navicueId: string) => void;
  className?: string;
}

// Mock LUMA recommendations (replace with SQL query later)
const getMockRecommendations = (type: string = "spark"): NavicueRecommendation[] => {
  const allRecommendations: NavicueRecommendation[] = [
    {
      id: "shame",
      title: "Understanding Shame",
      subtitle: "Meet shame with compassion",
      pillar: "Emotional Regulation",
      icon: Heart,
      gradient: "from-[#FF8E72] to-[#FFB84D]",
      confidence: 88,
      score: 85,
      reasoning: "Addresses 1 red-state block (CB-SOC-001), high effectiveness (8.2 avg improvement)",
      estimatedTime: 5,
      difficulty: "beginner",
      targetStates: ["red", "orange"]
    },
    {
      id: "window-of-tolerance",
      title: "Window of Tolerance",
      subtitle: "Regulate your nervous system",
      pillar: "Stress Resilience",
      icon: Waves,
      gradient: "from-purple-500 to-pink-500",
      confidence: 82,
      score: 80,
      reasoning: "Matches current journey pillar, proven effectiveness (87% helpful)",
      estimatedTime: 5,
      difficulty: "beginner",
      targetStates: ["red", "orange"]
    },
    {
      id: "values",
      title: "Values Clarification",
      subtitle: "Discover what you're recovering for",
      pillar: "Identity Integration",
      icon: Brain,
      gradient: "from-blue-500 to-indigo-500",
      confidence: 76,
      score: 75,
      reasoning: "Foundation practice, appropriate difficulty level",
      estimatedTime: 4,
      difficulty: "beginner",
      targetStates: ["orange", "green"]
    }
  ];

  return allRecommendations.slice(0, 3);
};

export function LumaRecommendations({
  patientId,
  type = "spark",
  limit = 3,
  onSelectNaviCue,
  className = ""
}: LumaRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<NavicueRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual SQL query
    // SELECT * FROM luma_get_recommendations(patientId, type, limit);
    
    setTimeout(() => {
      const recs = getMockRecommendations(type);
      setRecommendations(recs.slice(0, limit));
      setLoading(false);
    }, 300);
  }, [patientId, type, limit]);

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-[#5739FB] animate-pulse" />
          <h2 className="text-2xl text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Finding your path...
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-100 animate-pulse"
              style={{ borderRadius: '0px' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-[#5739FB]" />
        <h2 className="text-2xl text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Recommended for You
        </h2>
      </div>

      {/* AI Note */}
      <p className="text-sm text-gray-600 mb-6 max-w-2xl">
        Based on your current state and journey progress, these quick interventions could help right now.
      </p>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;

          return (
            <motion.button
              key={rec.id}
              onClick={() => onSelectNaviCue?.(rec.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-80 overflow-hidden bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.2),0_4px_16px_rgba(87,57,251,0.15)] transition-all duration-300 text-left"
              style={{ borderRadius: '0px' }}
            >
              {/* Confidence Badge */}
              <div className="absolute top-4 right-4 z-20">
                <div 
                  className="px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200"
                  style={{ borderRadius: '0px' }}
                >
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-[#5739FB]" />
                    <span className="text-xs text-gray-700" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {rec.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${rec.gradient} opacity-30 group-hover:opacity-40 transition-opacity`} />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col p-6">
                {/* Icon */}
                <div 
                  className={`w-14 h-14 bg-gradient-to-br ${rec.gradient} flex items-center justify-center shadow-md mb-4`}
                  style={{ borderRadius: '0px' }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {rec.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {rec.subtitle}
                </p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Meta */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{rec.pillar}</span>
                    <span>•</span>
                    <span>{rec.estimatedTime} min</span>
                    <span>•</span>
                    <span className="capitalize">{rec.difficulty}</span>
                  </div>

                  {/* Reasoning (subtle) */}
                  <p className="text-xs text-gray-400 italic line-clamp-2">
                    {rec.reasoning}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-4">
                  <div 
                    className="w-full py-3 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white text-center shadow-md group-hover:shadow-lg transition-all"
                    style={{ borderRadius: '0px' }}
                  >
                    <span className="text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      Start Now
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 italic mt-6 text-center">
        AI recommendations adapt to your progress. Skip what does not resonate.
      </p>
    </div>
  );
}
