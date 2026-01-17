/**
 * NaviCue Player V2 - The Spark Room
 * 
 * Philosophy:
 * - Infinite vertical feed (Instagram Reels style)
 * - Patient never sees spark families or room cue types
 * - Pillar is the anchor (always visible eyebrow)
 * - Provocations, STATE checks, LIBRARY, JOURNEY nudges, MICRO-BLOCKS, WELLBEING, DIARY
 * - Seamless transitions - you never know what's next
 * - Immediate advance after response - power through
 * - LUMA orchestrates behind the scenes
 * 
 * Design:
 * - Full screen glass cards (like Journey)
 * - Background assets (pillar-specific)
 * - Pillar eyebrow (like ERA FLOW / EXPERIENCE)
 * - Swipe up OR auto-advance
 * - Apple elegance meets neuroscience precision
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { X, ChevronUp, Mic, ArrowUp, Heart, Brain, Users, Lightbulb, Shield, Target } from "lucide-react";
import { createClient } from "../../utils/supabase/client";

// ============================================================================
// TYPES
// ============================================================================

export type NaviCueType = 
  | "spark"           // Provocations (7-10 families)
  | "state"           // Quick red/orange/green check-in
  | "library"         // Reading/practice/video recommendation
  | "journey"         // Journey nudge
  | "micro_block"     // Micro-block tracker
  | "wellbeing"       // Video/meditation/exercise
  | "diary";          // Open-ended reflection

export type SparkFamily =
  | "statement_mirror"
  | "belief_probe"
  | "identity_koan"
  | "paradox_prompt"
  | "story_shard"
  | "reframe_seed"
  | "curveball";

export type ResponseType = "tap" | "slider" | "one_word" | "voice10" | "none" | "binary" | "breath" | "hold";

export type KBELayer = "knowing" | "believing" | "embodying";

export interface NaviCue {
  id: string;
  type: NaviCueType;
  
  // Pillar anchor (ALWAYS present)
  pillar_id: string;
  pillar_name: string;
  pillar_color: string;
  
  // Content
  text_line?: string;
  heading?: string;
  subtitle?: string;
  
  // Spark-specific
  family?: SparkFamily;
  kbe_target?: KBELayer;
  
  // Response
  response_types: ResponseType[];
  response_options?: {
    tap_options?: string[];
    slider_label?: string;
    slider_min?: number;
    slider_max?: number;
    binary_left?: string;
    binary_right?: string;
    breath_count?: number;
  };
  
  // Metadata
  is_curveball?: boolean;
  background_asset?: string;
  
  // Type-specific data
  library_item?: {
    title: string;
    type: "reading" | "practice" | "video" | "micro_block";
    url: string;
    duration?: string;
  };
  
  journey_data?: {
    scene_number: number;
    theme_title: string;
    progress_percent: number;
  };
  
  micro_block_data?: {
    block_title: string;
    question: string;
  };
}

// ============================================================================
// PILLAR SYSTEM
// ============================================================================

const PILLAR_CONFIG: Record<string, { name: string; color: string; icon: any; eyebrow: string }> = {
  "P-01": {
    name: "Pause + Ground",
    color: "#E85D75",
    icon: Heart,
    eyebrow: "PAUSE + GROUND"
  },
  "P-02": {
    name: "Stress Resilience",
    color: "#9B59B6",
    icon: Shield,
    eyebrow: "STRESS RESILIENCE"
  },
  "P-03": {
    name: "Social Connectivity",
    color: "#3498DB",
    icon: Users,
    eyebrow: "SOCIAL CONNECTIVITY"
  },
  "P-04": {
    name: "Cognitive Reframing",
    color: "#F39C12",
    icon: Lightbulb,
    eyebrow: "COGNITIVE REFRAMING"
  },
  "P-05": {
    name: "Identity Integration",
    color: "#16A085",
    icon: Brain,
    eyebrow: "IDENTITY INTEGRATION"
  },
  "P-06": {
    name: "Decision Mastery",
    color: "#E67E22",
    icon: Target,
    eyebrow: "DECISION MASTERY"
  }
};

// ============================================================================
// PLAYER COMPONENT
// ============================================================================

interface NaviCuePlayerV2Props {
  cues: NaviCue[];
  onExit?: () => void;
  onComplete?: () => void;
}

export function NaviCuePlayerV2({ cues, onExit, onComplete }: NaviCuePlayerV2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  
  const currentCue = cues[currentIndex];
  const pillarConfig = PILLAR_CONFIG[currentCue.pillar_id] || PILLAR_CONFIG["P-01"];
  
  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onExit?.();
    }, 300);
  };
  
  const handleAdvance = async () => {
    if (transitioning) return;
    
    setTransitioning(true);
    
    // Brief pause for visual feedback
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (currentIndex < cues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete?.();
    }
    
    setTransitioning(false);
  };
  
  const handleResponse = async (type: ResponseType, value: any) => {
    // Log response
    console.log("Response:", { cue_id: currentCue.id, type, value });
    
    // TODO: Save to Supabase
    // const supabase = createClient();
    // await supabase.from('navicue_responses').insert({ ... });
    
    // Auto-advance
    await handleAdvance();
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background with pillar color overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        style={{
          backgroundImage: currentCue.background_asset ? `url(${currentCue.background_asset})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Color overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `linear-gradient(135deg, ${pillarConfig.color}20 0%, ${pillarConfig.color}40 100%)`
          }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Exit button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleExit}
        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
        style={{ borderRadius: "0px" }}
      >
        <X className="w-5 h-5 text-white" />
      </motion.button>
      
      {/* Progress indicator */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-1">
        {cues.map((_, idx) => (
          <div
            key={idx}
            className="h-1 w-8 bg-white/20 transition-all duration-300"
            style={{
              borderRadius: "0px",
              backgroundColor: idx <= currentIndex ? pillarConfig.color : "rgba(255,255,255,0.2)"
            }}
          />
        ))}
      </div>
      
      {/* Main card container */}
      <div className="relative z-10 h-full flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCue.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* Render different card types */}
            {currentCue.type === "spark" && (
              <SparkCard 
                cue={currentCue} 
                pillarConfig={pillarConfig}
                onResponse={handleResponse}
                onAdvance={handleAdvance}
              />
            )}
            
            {currentCue.type === "state" && (
              <StateCard 
                cue={currentCue} 
                pillarConfig={pillarConfig}
                onResponse={handleResponse}
              />
            )}
            
            {currentCue.type === "library" && (
              <LibraryCard 
                cue={currentCue} 
                pillarConfig={pillarConfig}
                onResponse={handleResponse}
              />
            )}
            
            {currentCue.type === "journey" && (
              <JourneyCard 
                cue={currentCue} 
                pillarConfig={pillarConfig}
                onResponse={handleResponse}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Swipe up indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-white/60"
      >
        <ChevronUp className="w-6 h-6 animate-bounce" />
        <span className="text-xs uppercase tracking-wider">Swipe to continue</span>
      </motion.div>
    </div>
  );
}

// ============================================================================
// SPARK CARD
// ============================================================================

interface CardProps {
  cue: NaviCue;
  pillarConfig: any;
  onResponse: (type: ResponseType, value: any) => void;
  onAdvance?: () => void;
}

function SparkCard({ cue, pillarConfig, onResponse, onAdvance }: CardProps) {
  const [selectedTap, setSelectedTap] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(5);
  const [wordValue, setWordValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [holdDuration, setHoldDuration] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const primaryResponseType = cue.response_types[0];
  
  const handleTap = (option: string) => {
    setSelectedTap(option);
    setTimeout(() => {
      onResponse("tap", { value: option, hesitationMs: 0 });
    }, 300);
  };
  
  const handleSlider = () => {
    onResponse("slider", { value: sliderValue, hesitationMs: 0 });
  };
  
  const handleWord = () => {
    if (wordValue.trim()) {
      onResponse("one_word", { value: wordValue, hesitationMs: 0 });
    }
  };
  
  const handleBreath = () => {
    if (breathCount < (cue.response_options?.breath_count || 3)) {
      setBreathCount(prev => prev + 1);
    } else {
      onResponse("breath", { value: breathCount + 1, hesitationMs: 0 });
    }
  };
  
  const handleHoldStart = () => {
    const startTime = Date.now();
    holdTimerRef.current = setInterval(() => {
      setHoldDuration(Date.now() - startTime);
    }, 100);
  };
  
  const handleHoldEnd = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
    }
    onResponse("hold", { value: holdDuration, hesitationMs: 0 });
  };
  
  const handleNone = () => {
    // For "none" response type, just auto-advance after 5 seconds
    setTimeout(() => {
      onAdvance?.();
    }, 5000);
  };
  
  useEffect(() => {
    if (primaryResponseType === "none") {
      handleNone();
    }
  }, [primaryResponseType]);
  
  return (
    <div 
      className="relative bg-white/10 backdrop-blur-[32px] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{ borderRadius: "0px" }}
    >
      {/* Pillar eyebrow */}
      <div className="flex items-center gap-3 mb-8">
        <div 
          className="w-8 h-8 flex items-center justify-center"
          style={{ backgroundColor: pillarConfig.color, borderRadius: "0px" }}
        >
          <pillarConfig.icon className="w-5 h-5 text-white" />
        </div>
        <span 
          className="text-xs uppercase tracking-[0.2em] text-white/90"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.2em" }}
        >
          {pillarConfig.eyebrow}
        </span>
      </div>
      
      {/* Provocation text */}
      <div className="mb-12">
        <p 
          className="text-3xl md:text-4xl leading-tight text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {cue.text_line}
        </p>
      </div>
      
      {/* Response UI */}
      <div className="space-y-6">
        {/* TAP response */}
        {primaryResponseType === "tap" && cue.response_options?.tap_options && (
          <div className="flex flex-wrap gap-3">
            {cue.response_options.tap_options.map((option) => (
              <button
                key={option}
                onClick={() => handleTap(option)}
                className={`px-6 py-3 transition-all ${
                  selectedTap === option
                    ? "bg-white text-gray-900"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                style={{ borderRadius: "0px" }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  {option}
                </span>
              </button>
            ))}
          </div>
        )}
        
        {/* SLIDER response */}
        {primaryResponseType === "slider" && (
          <div className="space-y-4">
            <label className="text-sm text-white/80 uppercase tracking-wider">
              {cue.response_options?.slider_label || "How much?"}
            </label>
            <input
              type="range"
              min={cue.response_options?.slider_min || 0}
              max={cue.response_options?.slider_max || 10}
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>{cue.response_options?.slider_min || 0}</span>
              <span className="text-2xl text-white">{sliderValue}</span>
              <span>{cue.response_options?.slider_max || 10}</span>
            </div>
            <button
              onClick={handleSlider}
              className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white transition-all"
              style={{ borderRadius: "0px" }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Continue
              </span>
            </button>
          </div>
        )}
        
        {/* ONE WORD response */}
        {primaryResponseType === "one_word" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="One word..."
              value={wordValue}
              onChange={(e) => setWordValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && wordValue.trim()) {
                  handleWord();
                }
              }}
              className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 text-white placeholder-white/40 text-xl"
              style={{ borderRadius: "0px" }}
              autoFocus
            />
            <button
              onClick={handleWord}
              disabled={!wordValue.trim()}
              className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: "0px" }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Submit
              </span>
            </button>
          </div>
        )}
        
        {/* BREATH response */}
        {primaryResponseType === "breath" && (
          <div className="text-center space-y-6">
            <div className="text-6xl text-white/90">
              {breathCount + 1} / {cue.response_options?.breath_count || 3}
            </div>
            <button
              onClick={handleBreath}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white transition-all"
              style={{ borderRadius: "0px" }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Breathe In... Breathe Out
              </span>
            </button>
          </div>
        )}
        
        {/* HOLD response */}
        {primaryResponseType === "hold" && (
          <div className="text-center space-y-6">
            <p className="text-white/80 text-sm">
              Press and hold until you're ready to release
            </p>
            <button
              onMouseDown={handleHoldStart}
              onMouseUp={handleHoldEnd}
              onTouchStart={handleHoldStart}
              onTouchEnd={handleHoldEnd}
              className="w-full py-12 bg-white/20 hover:bg-white/30 text-white transition-all"
              style={{ borderRadius: "0px" }}
            >
              <span className="text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {holdDuration > 0 ? `${(holdDuration / 1000).toFixed(1)}s` : "Hold"}
              </span>
            </button>
          </div>
        )}
        
        {/* NONE response - just sits */}
        {primaryResponseType === "none" && (
          <div className="text-center py-8">
            <p className="text-sm text-white/60 uppercase tracking-wider">
              Let it sit
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// STATE CARD
// ============================================================================

function StateCard({ cue, pillarConfig, onResponse }: CardProps) {
  const handleStateSelect = (state: "red" | "orange" | "green") => {
    onResponse("tap", { value: state, hesitationMs: 0 });
  };
  
  return (
    <div 
      className="relative bg-white/10 backdrop-blur-[32px] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{ borderRadius: "0px" }}
    >
      {/* Pillar eyebrow */}
      <div className="flex items-center gap-3 mb-8">
        <div 
          className="w-8 h-8 flex items-center justify-center"
          style={{ backgroundColor: pillarConfig.color, borderRadius: "0px" }}
        >
          <pillarConfig.icon className="w-5 h-5 text-white" />
        </div>
        <span 
          className="text-xs uppercase tracking-[0.2em] text-white/90"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {pillarConfig.eyebrow}
        </span>
      </div>
      
      {/* Heading */}
      <h2 
        className="text-3xl md:text-4xl text-white mb-4"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {cue.heading || "How are you right now?"}
      </h2>
      
      <p className="text-lg text-white/80 mb-12">
        {cue.subtitle || "Quick check-in"}
      </p>
      
      {/* State options */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => handleStateSelect("green")}
          className="aspect-square bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500/50 flex flex-col items-center justify-center gap-3 transition-all"
          style={{ borderRadius: "0px" }}
        >
          <div className="w-12 h-12 bg-green-500" style={{ borderRadius: "0px" }} />
          <span className="text-white text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Green
          </span>
        </button>
        
        <button
          onClick={() => handleStateSelect("orange")}
          className="aspect-square bg-orange-500/20 hover:bg-orange-500/30 border-2 border-orange-500/50 flex flex-col items-center justify-center gap-3 transition-all"
          style={{ borderRadius: "0px" }}
        >
          <div className="w-12 h-12 bg-orange-500" style={{ borderRadius: "0px" }} />
          <span className="text-white text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Orange
          </span>
        </button>
        
        <button
          onClick={() => handleStateSelect("red")}
          className="aspect-square bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50 flex flex-col items-center justify-center gap-3 transition-all"
          style={{ borderRadius: "0px" }}
        >
          <div className="w-12 h-12 bg-red-500" style={{ borderRadius: "0px" }} />
          <span className="text-white text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Red
          </span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// LIBRARY CARD
// ============================================================================

function LibraryCard({ cue, pillarConfig, onResponse }: CardProps) {
  const handleOpen = () => {
    // Open library item
    if (cue.library_item?.url) {
      window.open(cue.library_item.url, "_blank");
    }
    onResponse("tap", { value: "opened", hesitationMs: 0 });
  };
  
  const handleSkip = () => {
    onResponse("tap", { value: "skipped", hesitationMs: 0 });
  };
  
  return (
    <div 
      className="relative bg-white/10 backdrop-blur-[32px] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{ borderRadius: "0px" }}
    >
      {/* Pillar eyebrow */}
      <div className="flex items-center gap-3 mb-8">
        <div 
          className="w-8 h-8 flex items-center justify-center"
          style={{ backgroundColor: pillarConfig.color, borderRadius: "0px" }}
        >
          <pillarConfig.icon className="w-5 h-5 text-white" />
        </div>
        <span 
          className="text-xs uppercase tracking-[0.2em] text-white/90"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {pillarConfig.eyebrow}
        </span>
      </div>
      
      <h2 
        className="text-2xl text-white mb-4"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {cue.heading || "Something that might help"}
      </h2>
      
      <div className="mb-8 p-6 bg-white/5 border border-white/10" style={{ borderRadius: "0px" }}>
        <div className="text-xs text-white/60 uppercase tracking-wider mb-2">
          {cue.library_item?.type}
        </div>
        <h3 className="text-xl text-white mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
          {cue.library_item?.title}
        </h3>
        {cue.library_item?.duration && (
          <div className="text-sm text-white/60">
            {cue.library_item.duration}
          </div>
        )}
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={handleOpen}
          className="flex-1 px-6 py-3 bg-white text-gray-900 hover:bg-white/90 transition-all"
          style={{ borderRadius: "0px" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Open
          </span>
        </button>
        <button
          onClick={handleSkip}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white transition-all"
          style={{ borderRadius: "0px" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Skip
          </span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// JOURNEY CARD
// ============================================================================

function JourneyCard({ cue, pillarConfig, onResponse }: CardProps) {
  const handleContinue = () => {
    onResponse("tap", { value: "continue", hesitationMs: 0 });
  };
  
  const handleLater = () => {
    onResponse("tap", { value: "later", hesitationMs: 0 });
  };
  
  return (
    <div 
      className="relative bg-white/10 backdrop-blur-[32px] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{ borderRadius: "0px" }}
    >
      {/* Pillar eyebrow */}
      <div className="flex items-center gap-3 mb-8">
        <div 
          className="w-8 h-8 flex items-center justify-center"
          style={{ backgroundColor: pillarConfig.color, borderRadius: "0px" }}
        >
          <pillarConfig.icon className="w-5 h-5 text-white" />
        </div>
        <span 
          className="text-xs uppercase tracking-[0.2em] text-white/90"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {pillarConfig.eyebrow}
        </span>
      </div>
      
      <div className="mb-8">
        <div className="text-sm text-white/60 mb-2">Your Journey</div>
        <h2 
          className="text-3xl text-white mb-4"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {cue.journey_data?.theme_title}
        </h2>
        <p className="text-white/80">
          Scene {cue.journey_data?.scene_number} is waiting
        </p>
      </div>
      
      {/* Progress */}
      <div className="mb-8">
        <div className="h-2 bg-white/10" style={{ borderRadius: "0px" }}>
          <div 
            className="h-full transition-all"
            style={{ 
              width: `${cue.journey_data?.progress_percent || 0}%`,
              backgroundColor: pillarConfig.color,
              borderRadius: "0px"
            }}
          />
        </div>
        <div className="text-xs text-white/60 mt-2">
          {cue.journey_data?.progress_percent}% complete
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={handleContinue}
          className="flex-1 px-6 py-3 bg-white text-gray-900 hover:bg-white/90 transition-all"
          style={{ borderRadius: "0px" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Continue Journey
          </span>
        </button>
        <button
          onClick={handleLater}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white transition-all"
          style={{ borderRadius: "0px" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Later
          </span>
        </button>
      </div>
    </div>
  );
}

export { NaviCue };
