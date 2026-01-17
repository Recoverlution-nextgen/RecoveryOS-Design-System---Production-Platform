/**
 * WELLBEING - infiniteK Design System V3
 * 
 * Philosophy: "Your body is part of the recovery"
 * 
 * Wellbeing is the video practice library - guided sessions for:
 * - Meditation: Cultivating presence and awareness
 * - Breathwork: Your nervous system's remote control
 * - Movement: Yoga & fitness for mind-body integration
 * - Nutrition: Nourishing recovery from within
 * 
 * Integration with Platform Ecosystem:
 * - State: When logging difficult states, suggests relevant videos
 * - NaviCues: Provocations can link to specific practices
 * - Journey: Weekly themes suggest complementary videos
 * - Momentum: Tracks video completion patterns
 * - Toolkit: Practices reference specific videos
 * - LUMA: Identifies which videos support which emotional patterns
 * 
 * Backend Architecture (SQL):
 * Each video should be tagged with:
 * - Primary pillar (emotional, stress, social, cognitive, identity, decision)
 * - Secondary pillars (array)
 * - Topic category (meditation, breathwork, movement, nutrition)
 * - Subcategory (yoga, fitness for movement)
 * - State patterns it helps (anxious, overwhelmed, disconnected, etc.)
 * - Intensity level (gentle, moderate, vigorous)
 * - Time of day recommendation (morning, midday, evening, anytime)
 * - Duration (actual minutes)
 * - Completion tracking per patient
 * - Effectiveness ratings (patient feedback)
 * 
 * This enables:
 * - Dynamic NaviCues suggestions based on current state
 * - LUMA pattern recognition ("meditation helped reduce anxiety 40%")
 * - Personalized recommendations
 * - Journey integration
 */

import { useState, useEffect } from "react";
import { PlatformPageHeader } from "../PlatformPageHeader";
import { 
  Play, Heart, Shield, Users, Brain, Target, Sparkles,
  Clock, CheckCircle, Filter, X, Pause
} from "lucide-react";

// Asset for cards (4:5 ratio) - using momentum asset for now
const WELLBEING_ASSET = "https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Platform/Library/4:5/WebP/3D%20SHAPE%20%20momentum%20chips.png";

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

// Topics for organization
const TOPICS = {
  meditation: { 
    name: "Meditation", 
    icon: Sparkles, 
    color: "#C4B5FD", 
    description: "Cultivate presence and awareness",
    patient: "Finding Stillness"
  },
  breathwork: { 
    name: "Breathwork", 
    icon: Heart, 
    color: "#9D8FFF", 
    description: "Your nervous system's remote control",
    patient: "Regulating Breath"
  },
  movement: { 
    name: "Movement", 
    icon: Target, 
    color: "#7C67FF", 
    description: "Yoga & fitness for mind-body integration",
    patient: "Moving Through It"
  },
  nutrition: { 
    name: "Nutrition", 
    icon: Brain, 
    color: "#5739FB", 
    description: "Nourish your recovery from within",
    patient: "Nourishing Recovery"
  }
};

type TopicKey = keyof typeof TOPICS;

// Video interface
interface Video {
  id: string;
  title: string;
  category: "yoga" | "fitness" | "nutrition" | "breathwork" | "meditation";
  topic: TopicKey;
  duration: string;
  durationMinutes: number; // for sorting
  jwPlayerUrl: string;
  thumbnail?: string; // JW Player can auto-generate thumbnails
  description: string;
  longDescription: string;
  pillarTags: PillarKey[];
  instructor?: string;
  intensity?: "gentle" | "moderate" | "vigorous";
  bestTime?: "morning" | "midday" | "evening" | "anytime";
  completionCount?: number; // how many times patient completed
  lastCompleted?: string; // ISO date
}

interface WellbeingPageV3Props {
  patientId?: string | null;
}

export function WellbeingPageV3({ patientId }: WellbeingPageV3Props) {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | "all">("all");
  const [selectedPillar, setSelectedPillar] = useState<PillarKey | "all">("all");
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // All videos - using the JW Player URLs provided
  const ALL_VIDEOS: Video[] = [
    // YOGA (5 videos)
    {
      id: "yoga-1",
      title: "Morning Flow Yoga",
      category: "yoga",
      topic: "movement",
      duration: "20 min",
      durationMinutes: 20,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/1J3frLWf-ArinPu6B",
      description: "Gentle sequences to wake up your body and mind with intention",
      longDescription: "Start your day with movement that honors where your body is right now. This flow integrates breath, mindful movement, and gentle strength-building to create energy without overwhelming your system.",
      pillarTags: ["stress", "identity"],
      instructor: "Maya Chen",
      intensity: "gentle",
      bestTime: "morning"
    },
    {
      id: "yoga-2",
      title: "Restorative Yoga for Recovery",
      category: "yoga",
      topic: "movement",
      duration: "30 min",
      durationMinutes: 30,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/vt9pN1xR-ArinPu6B",
      description: "Gentle supported poses for deep rest and nervous system regulation",
      longDescription: "Recovery needs rest as much as action. Restorative yoga uses props to fully support your body, allowing your nervous system to shift into deep healing mode.",
      pillarTags: ["stress", "emotional"],
      instructor: "Maya Chen",
      intensity: "gentle",
      bestTime: "evening"
    },
    {
      id: "yoga-3",
      title: "Power Yoga for Strength",
      category: "yoga",
      topic: "movement",
      duration: "45 min",
      durationMinutes: 45,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/L7bRwRPB-ArinPu6B",
      description: "Build physical and mental strength through dynamic sequences",
      longDescription: "Challenge yourself with power yoga that builds both physical strength and mental resilience. Learn to stay present when things get difficult.",
      pillarTags: ["stress", "decision", "identity"],
      instructor: "Maya Chen",
      intensity: "vigorous",
      bestTime: "morning"
    },
    {
      id: "yoga-4",
      title: "Yoga for Flexibility",
      category: "yoga",
      topic: "movement",
      duration: "25 min",
      durationMinutes: 25,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/GO2ZBHwK-ArinPu6B",
      description: "Deep stretches to release tension and increase range of motion",
      longDescription: "Flexibility isn't just physical. This practice releases stored tension in your body while teaching you to find ease within discomfort.",
      pillarTags: ["stress", "identity"],
      instructor: "Maya Chen",
      intensity: "moderate",
      bestTime: "anytime"
    },
    {
      id: "yoga-5",
      title: "Yin Yoga for Release",
      category: "yoga",
      topic: "movement",
      duration: "40 min",
      durationMinutes: 40,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/fuxbqFAq-ArinPu6B",
      description: "Long-held passive stretches targeting deep connective tissue",
      longDescription: "Yin yoga works on fascia and connective tissue where emotional memory often lives. Holding poses for 3 to 5 minutes creates space for deep release.",
      pillarTags: ["emotional", "stress"],
      instructor: "Maya Chen",
      intensity: "gentle",
      bestTime: "evening"
    },

    // FITNESS (5 videos)
    {
      id: "fitness-1",
      title: "Strength Training Basics",
      category: "fitness",
      topic: "movement",
      duration: "30 min",
      durationMinutes: 30,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/cJcx5lTX-ArinPu6B",
      description: "Foundation movements for building functional strength",
      longDescription: "Physical strength builds mental strength. These fundamental exercises teach your nervous system that you're capable of hard things.",
      pillarTags: ["stress", "decision", "identity"],
      instructor: "James Rivera",
      intensity: "moderate",
      bestTime: "morning"
    },
    {
      id: "fitness-2",
      title: "HIIT for Mental Clarity",
      category: "fitness",
      topic: "movement",
      duration: "20 min",
      durationMinutes: 20,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/EsgjD7QM-ArinPu6B",
      description: "High-intensity intervals to release endorphins and clear your mind",
      longDescription: "Sometimes the fastest way to change your mental state is to change your physical state. HIIT floods your system with endorphins and creates a natural high.",
      pillarTags: ["stress", "emotional"],
      instructor: "James Rivera",
      intensity: "vigorous",
      bestTime: "morning"
    },
    {
      id: "fitness-3",
      title: "Recovery Mobility Flow",
      category: "fitness",
      topic: "movement",
      duration: "15 min",
      durationMinutes: 15,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/V3Ji6C8K-ArinPu6B",
      description: "Gentle movement to maintain flexibility and prevent injury",
      longDescription: "Active recovery teaches your body that movement doesn't always have to be intense. This flow keeps you mobile while honoring rest days.",
      pillarTags: ["stress", "identity"],
      instructor: "James Rivera",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "fitness-4",
      title: "Core Strength for Stability",
      category: "fitness",
      topic: "movement",
      duration: "25 min",
      durationMinutes: 25,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/dnOg8LPj-ArinPu6B",
      description: "Build a strong foundation from your center",
      longDescription: "A strong core provides physical stability that translates to emotional stability. These exercises build the foundation for all movement.",
      pillarTags: ["stress", "identity"],
      instructor: "James Rivera",
      intensity: "moderate",
      bestTime: "morning"
    },
    {
      id: "fitness-5",
      title: "Cardio for Endurance",
      category: "fitness",
      topic: "movement",
      duration: "35 min",
      durationMinutes: 35,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/m5Nm0ZNj-ArinPu6B",
      description: "Build cardiovascular health and mental endurance",
      longDescription: "Recovery is a marathon, not a sprint. Building physical endurance teaches your mind that you can sustain difficult things over time.",
      pillarTags: ["stress", "decision"],
      instructor: "James Rivera",
      intensity: "vigorous",
      bestTime: "morning"
    },

    // NUTRITION (5 videos)
    {
      id: "nutrition-1",
      title: "Nutrition Foundations",
      category: "nutrition",
      topic: "nutrition",
      duration: "15 min",
      durationMinutes: 15,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/C6dOCrTE-ArinPu6B",
      description: "Understanding how food fuels your recovery journey",
      longDescription: "What you eat directly impacts your mood, energy, and capacity to heal. This foundational video explains the relationship between nutrition and nervous system health.",
      pillarTags: ["stress", "decision"],
      instructor: "Dr. Sarah Kim",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "nutrition-2",
      title: "Meal Planning for Recovery",
      category: "nutrition",
      topic: "nutrition",
      duration: "20 min",
      durationMinutes: 20,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/MEOWgqJ7-ArinPu6B",
      description: "Simple strategies for nourishing your body consistently",
      longDescription: "Decision fatigue is real in recovery. Learn simple meal planning strategies that remove the mental load while ensuring your body gets what it needs.",
      pillarTags: ["decision", "stress"],
      instructor: "Dr. Sarah Kim",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "nutrition-3",
      title: "Gut Health and Mood",
      category: "nutrition",
      topic: "nutrition",
      duration: "18 min",
      durationMinutes: 18,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/am1E0PXL-ArinPu6B",
      description: "The gut-brain connection and emotional regulation",
      longDescription: "Your gut produces more serotonin than your brain. Understand how gut health directly impacts your emotional regulation and mental clarity.",
      pillarTags: ["emotional", "stress"],
      instructor: "Dr. Sarah Kim",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "nutrition-4",
      title: "Anti-Inflammatory Eating",
      category: "nutrition",
      topic: "nutrition",
      duration: "22 min",
      durationMinutes: 22,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/aHYvvj9A-ArinPu6B",
      description: "Foods that support healing and reduce inflammation",
      longDescription: "Inflammation affects both body and mind. Learn which foods fight inflammation and support your nervous system's healing process.",
      pillarTags: ["stress", "identity"],
      instructor: "Dr. Sarah Kim",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "nutrition-5",
      title: "Mindful Eating Practice",
      category: "nutrition",
      topic: "nutrition",
      duration: "12 min",
      durationMinutes: 12,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/OZ0Aldyp-ArinPu6B",
      description: "Transform your relationship with food through presence",
      longDescription: "Eating can be a meditation. This practice teaches you to slow down, notice hunger cues, and find pleasure in nourishing your body.",
      pillarTags: ["emotional", "decision"],
      instructor: "Dr. Sarah Kim",
      intensity: "gentle",
      bestTime: "anytime"
    },

    // BREATHWORK (5 videos)
    {
      id: "breathwork-1",
      title: "Box Breathing for Calm",
      category: "breathwork",
      topic: "breathwork",
      duration: "8 min",
      durationMinutes: 8,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/8ESuafXR-ArinPu6B",
      description: "Four-part breath pattern to regulate your nervous system instantly",
      longDescription: "Your breath is the fastest way to shift your nervous system state. Box breathing creates balance between activation and calm, perfect for moments when you need to center yourself quickly.",
      pillarTags: ["stress", "emotional"],
      instructor: "Alex Morgan",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "breathwork-2",
      title: "4-7-8 Breathing for Sleep",
      category: "breathwork",
      topic: "breathwork",
      duration: "10 min",
      durationMinutes: 10,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/lb7qlf4F-ArinPu6B",
      description: "Natural sleep aid through breath pattern regulation",
      longDescription: "Struggle with racing thoughts at bedtime? This breathwork technique activates your parasympathetic nervous system, signaling safety and readiness for rest.",
      pillarTags: ["stress", "decision"],
      instructor: "Alex Morgan",
      intensity: "gentle",
      bestTime: "evening"
    },
    {
      id: "breathwork-3",
      title: "Energizing Breath",
      category: "breathwork",
      topic: "breathwork",
      duration: "5 min",
      durationMinutes: 5,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/y6I3VpXk-ArinPu6B",
      description: "Wake up your body and mind with invigorating breathwork",
      longDescription: "When you need energy without caffeine, breath is your tool. This practice increases oxygen flow and activates your sympathetic nervous system in a controlled, sustainable way.",
      pillarTags: ["stress", "decision"],
      instructor: "Alex Morgan",
      intensity: "moderate",
      bestTime: "morning"
    },
    {
      id: "breathwork-4",
      title: "Alternate Nostril Breathing",
      category: "breathwork",
      topic: "breathwork",
      duration: "12 min",
      durationMinutes: 12,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/8QDhfC8F-ArinPu6B",
      description: "Ancient pranayama technique for balancing energy and focus",
      longDescription: "This yogic breathing practice balances the left and right hemispheres of the brain, creating mental clarity and emotional equilibrium.",
      pillarTags: ["cognitive", "stress"],
      instructor: "Alex Morgan",
      intensity: "moderate",
      bestTime: "anytime"
    },
    {
      id: "breathwork-5",
      title: "Breathwork for Anxiety Relief",
      category: "breathwork",
      topic: "breathwork",
      duration: "15 min",
      durationMinutes: 15,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/4T2F5gsj-ArinPu6B",
      description: "Specific breath patterns to interrupt anxiety spirals",
      longDescription: "Anxiety lives in your nervous system, not just your mind. These breath techniques send direct signals of safety to your brain, interrupting the anxiety loop at its source.",
      pillarTags: ["emotional", "stress"],
      instructor: "Alex Morgan",
      intensity: "gentle",
      bestTime: "anytime"
    },

    // MEDITATION (5 videos)
    {
      id: "meditation-1",
      title: "Introduction to Mindfulness",
      category: "meditation",
      topic: "meditation",
      duration: "10 min",
      durationMinutes: 10,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/Lsfgmkfo-ArinPu6B",
      description: "Begin your meditation practice with simple, accessible techniques",
      longDescription: "Meditation isn't about stopping thoughts, it's about changing your relationship with them. This beginner-friendly practice introduces the fundamentals of mindfulness in a way that feels supportive, not intimidating.",
      pillarTags: ["emotional", "cognitive", "stress"],
      instructor: "Tenzin Parker",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "meditation-2",
      title: "Body Scan Meditation",
      category: "meditation",
      topic: "meditation",
      duration: "15 min",
      durationMinutes: 15,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/pRGTWbLV-ArinPu6B",
      description: "Guided journey through the body to release tension and cultivate presence",
      longDescription: "Your body knows things your mind hasn't learned yet. This practice guides your awareness systematically through the body, helping you release tension, notice sensations, and arrive fully in the present moment.",
      pillarTags: ["emotional", "stress"],
      instructor: "Tenzin Parker",
      intensity: "gentle",
      bestTime: "evening"
    },
    {
      id: "meditation-3",
      title: "Loving-Kindness Meditation",
      category: "meditation",
      topic: "meditation",
      duration: "12 min",
      durationMinutes: 12,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/H7E5vu7w-ArinPu6B",
      description: "Cultivate compassion for yourself and others through this heart-opening practice",
      longDescription: "Recovery requires fierce self-compassion. This ancient practice helps you extend kindness to yourself first, then gradually expand that compassion outward to others. Healing begins with how you treat yourself.",
      pillarTags: ["emotional", "social", "identity"],
      instructor: "Tenzin Parker",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "meditation-4",
      title: "Observing Thoughts Meditation",
      category: "meditation",
      topic: "meditation",
      duration: "10 min",
      durationMinutes: 10,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/tZ9pOvvY-ArinPu6B",
      description: "Practice watching thoughts without judgment or engagement",
      longDescription: "You are not your thoughts. This meditation teaches you to observe thoughts as passing clouds rather than absolute truths, creating space between stimulus and response.",
      pillarTags: ["cognitive", "emotional"],
      instructor: "Tenzin Parker",
      intensity: "gentle",
      bestTime: "anytime"
    },
    {
      id: "meditation-5",
      title: "Walking Meditation",
      category: "meditation",
      topic: "meditation",
      duration: "15 min",
      durationMinutes: 15,
      jwPlayerUrl: "https://cdn.jwplayer.com/previews/URqJgxHg-ArinPu6B",
      description: "Bring mindfulness to movement through slow, deliberate walking",
      longDescription: "Meditation doesn't have to be still. This practice brings full awareness to each step, grounding you in your body and the present moment through gentle movement.",
      pillarTags: ["stress", "identity"],
      instructor: "Tenzin Parker",
      intensity: "gentle",
      bestTime: "morning"
    },
  ];

  useEffect(() => {
    loadCompletedVideos();
  }, [patientId]);

  const loadCompletedVideos = () => {
    setLoading(true);
    
    // In real implementation, fetch from backend
    // For now, mock some completed videos
    const mockCompleted = ["yoga-2", "meditation-1", "breathwork-1"];
    setCompletedVideos(mockCompleted);
    
    setLoading(false);
  };

  // Filter videos
  const filteredVideos = ALL_VIDEOS.filter(video => {
    const matchesTopic = selectedTopic === "all" || video.topic === selectedTopic;
    const matchesPillar = selectedPillar === "all" || video.pillarTags.includes(selectedPillar);
    return matchesTopic && matchesPillar;
  });

  const handleVideoClick = (video: Video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    
    // Track video start
    console.log(`🎬 Started video: ${video.title}`);
    
    // In real implementation, track to backend for LUMA insights
  };

  const handleVideoComplete = (videoId: string) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
      
      // Track completion to backend
      console.log(`✅ Completed video: ${videoId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden" style={{ height: '100vh' }}>
        <PlatformPageHeader
          page="Wellbeing"
          headline="Your body is part of the recovery"
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
        headline="Your body is part of the recovery"
        height="medium"
      />

      {/* Content Area */}
      <div className="page-content">
        <div className="content-container">
          
          {/* Hero Card 1: Video Player */}
          {currentVideo && (
            <div className="card-hero" style={{ minHeight: '720px', marginBottom: 'var(--spacing-6)' }}>
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
                
                {/* Video Player - Full width, larger */}
                <div style={{
                  width: '100%',
                  maxWidth: '1200px',
                  aspectRatio: '16 / 9',
                  background: '#000000',
                  borderRadius: 'var(--radius-none)',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}>
                  <iframe
                    src={currentVideo.jwPlayerUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="auto"
                    title={currentVideo.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>

                {/* Video Info */}
                <div style={{ maxWidth: '1200px', width: '100%' }}>
                  {/* Pillar Eyebrow */}
                  {currentVideo.pillarTags[0] && (
                    <p className="text-eyebrow" style={{ 
                      marginBottom: '6px',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      {SIX_PILLARS[currentVideo.pillarTags[0]].clinical}
                    </p>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 'var(--spacing-4)',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.25rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        margin: '0 0 var(--spacing-2) 0',
                        lineHeight: 1.2
                      }}>
                        {currentVideo.title}
                      </h2>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.125rem',
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {currentVideo.longDescription}
                      </p>
                    </div>
                    
                    {completedVideos.includes(currentVideo.id) && (
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.2)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-none)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.875rem',
                          color: '#10B981',
                          fontWeight: 600
                        }}>
                          Completed
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-4)',
                    flexWrap: 'wrap'
                  }}>
                    {currentVideo.instructor && (
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        with {currentVideo.instructor}
                      </span>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {currentVideo.duration}
                      </span>
                    </div>

                    {currentVideo.intensity && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-none)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.9)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontWeight: 600
                        }}>
                          {currentVideo.intensity}
                        </span>
                      </div>
                    )}

                    {/* Patient Pillar Tags */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {currentVideo.pillarTags.map(pillarKey => {
                        const pillar = SIX_PILLARS[pillarKey];
                        const Icon = pillar.icon;
                        return (
                          <div
                            key={pillarKey}
                            style={{
                              background: `${pillar.color}20`,
                              border: `1px solid ${pillar.color}40`,
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-none)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Icon className="w-3 h-3" style={{ color: pillar.color }} />
                            <span style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.75rem',
                              color: pillar.color,
                              fontWeight: 600
                            }}>
                              {pillar.patient}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Hero Card 2: Video Library */}
          <div className="card-hero" style={{ minHeight: '680px' }}>
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
              
              {/* Header with Filters */}
              <div style={{ width: '100%' }}>
                <p className="text-eyebrow text-white-80" style={{ marginBottom: '8px' }}>
                  Practice Library
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 'var(--spacing-4)',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--spacing-5)'
                }}>
                  <div>
                    <h2 className="text-hero-headline text-white" style={{ margin: '0 0 var(--spacing-2) 0' }}>
                      {ALL_VIDEOS.length} Guided Sessions
                    </h2>
                    <p className="text-body-hero text-white" style={{ maxWidth: '680px' }}>
                      Movement, breath, and nourishment practices to support your whole recovery.
                    </p>
                  </div>
                </div>

                {/* Topic Filter */}
                <div style={{
                  background: 'var(--glass-bg-medium)',
                  backdropFilter: 'var(--glass-blur-default)',
                  WebkitBackdropFilter: 'var(--glass-blur-default)',
                  border: 'var(--glass-border-default)',
                  padding: 'var(--spacing-3)',
                  borderRadius: 'var(--radius-none)',
                  marginBottom: 'var(--spacing-3)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    flexWrap: 'wrap'
                  }}>
                    <Filter className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600
                    }}>
                      Topic
                    </span>
                    <button
                      onClick={() => setSelectedTopic("all")}
                      style={{
                        padding: '6px 14px',
                        background: selectedTopic === "all" 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-none)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      All
                    </button>
                    {Object.entries(TOPICS).map(([key, topic]) => {
                      const Icon = topic.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedTopic(key as TopicKey)}
                          style={{
                            padding: '6px 14px',
                            background: selectedTopic === key 
                              ? `${topic.color}40` 
                              : 'transparent',
                            border: selectedTopic === key 
                              ? `1px solid ${topic.color}` 
                              : '1px solid transparent',
                            borderRadius: 'var(--radius-none)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: selectedTopic === key ? topic.color : 'rgba(255, 255, 255, 0.7)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {topic.patient}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pillar Filter */}
                <div style={{
                  background: 'var(--glass-bg-medium)',
                  backdropFilter: 'var(--glass-blur-default)',
                  WebkitBackdropFilter: 'var(--glass-blur-default)',
                  border: 'var(--glass-border-default)',
                  padding: 'var(--spacing-3)',
                  borderRadius: 'var(--radius-none)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    flexWrap: 'wrap'
                  }}>
                    <Filter className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600
                    }}>
                      Pillar
                    </span>
                    <button
                      onClick={() => setSelectedPillar("all")}
                      style={{
                        padding: '6px 14px',
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
                        transition: 'all 0.2s ease'
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
                            padding: '6px 14px',
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

              {/* Video Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--spacing-4)',
                width: '100%'
              }}>
                {filteredVideos.map((video) => {
                  const topic = TOPICS[video.topic];
                  const isCompleted = completedVideos.includes(video.id);
                  
                  return (
                    <button
                      key={video.id}
                      onClick={() => handleVideoClick(video)}
                      style={{
                        background: 'var(--glass-bg-light)',
                        backdropFilter: 'var(--glass-blur-default)',
                        WebkitBackdropFilter: 'var(--glass-blur-default)',
                        border: currentVideo?.id === video.id 
                          ? `2px solid ${topic.color}` 
                          : 'var(--glass-border-subtle)',
                        padding: 'var(--spacing-4)',
                        borderRadius: 'var(--radius-none)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'block',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        if (currentVideo?.id !== video.id) {
                          e.currentTarget.style.background = 'var(--glass-bg-medium)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentVideo?.id !== video.id) {
                          e.currentTarget.style.background = 'var(--glass-bg-light)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 'var(--spacing-2)',
                        marginBottom: 'var(--spacing-2)'
                      }}>
                        <h4 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          margin: 0,
                          flex: 1
                        }}>
                          {video.title}
                        </h4>
                        {isCompleted && (
                          <CheckCircle className="w-4 h-4" style={{ color: '#10B981', flexShrink: 0 }} />
                        )}
                      </div>

                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: '0 0 var(--spacing-3) 0',
                        lineHeight: '1.4'
                      }}>
                        {video.description}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          background: `${topic.color}20`,
                          border: `1px solid ${topic.color}40`,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-none)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Play className="w-3 h-3" style={{ color: topic.color }} />
                          <span style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.75rem',
                            color: topic.color,
                            fontWeight: 600
                          }}>
                            {topic.patient}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock className="w-3 h-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                          <span style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}>
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredVideos.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-8)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem'
                  }}>
                    No videos match your filters. Try selecting different options.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}