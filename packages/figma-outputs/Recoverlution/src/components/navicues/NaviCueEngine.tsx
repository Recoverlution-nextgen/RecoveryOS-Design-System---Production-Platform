/**
 * NaviCue Engine V2
 * 
 * The gold standard for micro-provocations
 * 
 * Philosophy:
 * - Apple elegance meets Meta immersion
 * - Deeply personal, infinitely variable
 * - Multi-modal: text, audio, video, interactive
 * - Enforcers stack on any spark
 * - Patient never sees the mechanism
 * - Pillar is the only anchor
 * 
 * Architecture:
 * - Spark families (internal)
 * - Modalities (how it's delivered)
 * - Response types (how they engage)
 * - Enforcers (add-ons that deepen)
 * - Personalization (make them feel known)
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Volume2, VolumeX } from "lucide-react";
import { DASHBOARD_ASSETS } from "../../utils/dashboardAssetManifest";

// Import all response components
import { Voice10Response } from './responses/Voice10Response';
import { SortResponse } from './responses/SortResponse';
import { BodyMapResponse } from './responses/BodyMapResponse';
import { MirrorResponse } from './responses/MirrorResponse';
import { ConstellationResponse } from './responses/ConstellationResponse';
import { TimelineResponse } from './responses/TimelineResponse';
import { DialResponse } from './responses/DialResponse';
import { SpectrumResponse } from './responses/SpectrumResponse';
import { ComparisonResponse } from './responses/ComparisonResponse';
import { ParadoxResponse } from './responses/ParadoxResponse';
import { EchoResponse } from './responses/EchoResponse';
import { WitnessResponse } from './responses/WitnessResponse';
import { CurveballResponse } from './responses/CurveballResponse';

// ============================================================================
// TYPES
// ============================================================================

export type SparkFamily = 
  | "statement_mirror"
  | "belief_probe"
  | "identity_koan"
  | "paradox_prompt"
  | "story_shard"
  | "reframe_seed"
  | "curveball";

export type Modality = "text" | "audio" | "soundbite" | "video" | "interactive";

export type ResponseType = 
  | "tap" 
  | "binary" 
  | "slider" 
  | "one_word" 
  | "voice" 
  | "breath" 
  | "hold" 
  | "none"
  // NEW RESPONSE TYPES - Phase 1
  | "voice10"
  | "sort"
  | "body_map"
  | "mirror"
  | "constellation"
  | "timeline"
  | "dial"
  | "spectrum"
  | "comparison"
  | "paradox"
  | "echo"
  | "witness"
  | "curveball";

export type Enforcer = "breath" | "mirror" | "echo" | "amplify" | "repeat";

export type KBELayer = "knowing" | "believing" | "embodying";

// NEW: Presentation styles
export type PresentationStyle =
  | "glass_card"
  | "full_image"
  | "minimal_text"
  | "split_screen"
  | "immersive_video"
  | "animated_text";

// NEW: Transition types
export type TransitionType =
  | "fade"
  | "slide"
  | "zoom"
  | "flip"
  | "dissolve"
  | "snap";

export interface NaviCue {
  id: string;
  
  // Internal mechanics (never shown)
  family: SparkFamily;
  subtype?: string;
  
  // Delivery
  modality: Modality;
  text_line: string;
  audio_url?: string;
  video_url?: string;
  
  // Pillar (always shown)
  pillar_id: string;
  pillar_name: string;
  pillar_color: string;
  theme_name?: string; // Optional theme for eyebrow (e.g., "Urgency vs Reality")
  
  // Response
  response_type: ResponseType;
  response_options?: {
    tap_options?: string[];
    binary_left?: string;
    binary_right?: string;
    slider_label?: string;
    slider_min?: number;
    slider_max?: number;
    breath_count?: number;
    hold_duration?: number;
    
    // NEW: VOICE10
    voice_max_duration?: number;
    voice_show_waveform?: boolean;
    voice_allow_playback?: boolean;
    
    // NEW: SORT
    sort_items?: string[];
    sort_instruction?: string;
    sort_orientation?: 'vertical' | 'horizontal';
    
    // NEW: BODY_MAP
    body_regions?: ('head' | 'chest' | 'gut' | 'hands' | 'legs')[];
    body_multi_select?: boolean;
    
    // NEW: MIRROR
    mirror_reference_navicue_id?: string;
    mirror_days_ago_max?: number;
    mirror_question?: string;
    
    // NEW: CONSTELLATION
    constellation_items?: string[];
    constellation_center_label?: string;
    
    // NEW: TIMELINE
    timeline_labels?: string[];
    timeline_min_label?: string;
    timeline_max_label?: string;
    
    // NEW: DIAL
    dial_min_label?: string;
    dial_max_label?: string;
    dial_color_start?: string;
    dial_color_end?: string;
    
    // NEW: SPECTRUM
    spectrum_x_label?: string;
    spectrum_y_label?: string;
    spectrum_quadrants?: [string, string, string, string];
    
    // NEW: COMPARISON
    comparison_old_text?: string;
    comparison_new_text?: string;
    
    // NEW: PARADOX
    paradox_statement_1?: string;
    paradox_statement_2?: string;
    paradox_hold_duration?: number;
    
    // NEW: ECHO
    echo_repetitions?: number;
    echo_statement?: string;
    
    // NEW: WITNESS
    witness_duration?: number;
  };
  
  // Enforcers (optional add-ons)
  enforcers?: Enforcer[];
  
  // Personalization data
  personalization?: {
    use_name?: boolean;
    journey_reference?: string;
    state_reference?: string;
    time_aware?: boolean;
  };
  
  // Meta
  kbe_target: KBELayer;
  is_curveball?: boolean;
  background_asset?: string;
  
  // NEW: Presentation control
  presentation_style?: PresentationStyle;
  transition_type?: TransitionType;
}

interface NaviCueEngineProps {
  cues: NaviCue[];
  onComplete: () => void;
  onExit: () => void;
  userName?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function NaviCueEngine({ cues, onComplete, onExit, userName = "friend" }: NaviCueEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasResponded, setHasResponded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const touchStartY = useRef<number>(0);

  const currentCue = cues[currentIndex];

  // Safety check: If no cues or currentCue is undefined, show error
  if (!cues || cues.length === 0 || !currentCue) {
    return (
      <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">No NaviCues available</p>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white text-black"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Auto-advance after response
  useEffect(() => {
    if (hasResponded && !isTransitioning) {
      const timer = setTimeout(() => {
        advanceToNext();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasResponded]);

  // Handle audio playback
  useEffect(() => {
    if (currentCue.audio_url && !audioMuted) {
      playAudio();
    }
    return () => {
      stopAudio();
    };
  }, [currentIndex, audioMuted]);

  const playAudio = () => {
    if (audioRef.current && currentCue.audio_url) {
      audioRef.current.src = currentCue.audio_url;
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioPlaying(false);
    }
  };

  const toggleAudioMute = () => {
    setAudioMuted(!audioMuted);
    if (!audioMuted) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  const advanceToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentIndex < cues.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setHasResponded(false);
        setIsTransitioning(false);
      } else {
        onComplete();
      }
    }, 300);
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onExit();
    }, 400);
  };

  const handleResponse = (value?: any) => {
    // TODO: Save response to database
    console.log("Response captured:", { cue: currentCue.id, value });
    setHasResponded(true);
  };

  // Swipe gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    // Swipe up to advance
    if (diff > 50 && !isTransitioning) {
      if (currentCue.response_type === "none" || hasResponded) {
        advanceToNext();
      }
    }
  };

  // Personalize text
  const personalizeText = (text: string): string => {
    if (currentCue.personalization?.use_name) {
      text = text.replace(/\{name\}/g, userName);
    }
    return text;
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Asset */}
      <div className="absolute inset-0">
        {currentCue.background_asset ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${currentCue.background_asset})`,
              filter: "blur(8px) brightness(0.5)",
              transform: "scale(1.05)"
            }}
          />
        ) : (
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${currentCue.pillar_color}15 0%, ${currentCue.pillar_color}05 100%)`
            }}
          />
        )}
      </div>

      {/* Audio element */}
      <audio ref={audioRef} />

      {/* Top bar - COLLAPSE ONLY */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-end p-6">
        {/* Collapse button */}
        <button
          onClick={handleExit}
          className="w-10 h-10 bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors"
          style={{ borderRadius: "0px" }}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* Pillar eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <div 
                className="w-2 h-2"
                style={{ 
                  backgroundColor: currentCue.pillar_color,
                  borderRadius: "0px"
                }}
              />
              <div className="text-white/60 text-sm uppercase tracking-[0.2em]">
                {currentCue.pillar_name} · {currentCue.theme_name}
              </div>
            </div>

            {/* Glass card */}
            <div 
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 shadow-2xl"
              style={{ borderRadius: "0px" }}
            >
              {/* Pillar accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: currentCue.pillar_color }}
              />

              {/* Content */}
              <div className="space-y-8">
                {/* Main text */}
                <p 
                  className="text-3xl md:text-4xl text-white leading-relaxed"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {personalizeText(currentCue.text_line)}
                </p>

                {/* Response interface */}
                <ResponseInterface
                  cue={currentCue}
                  onRespond={handleResponse}
                  hasResponded={hasResponded}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe Up Area - Only for "none" response types or after responding */}
      {(currentCue.response_type === "none" || hasResponded) && (
        <motion.div
          className="fixed inset-0 cursor-pointer z-20"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.y < -100) {
              advanceToNext();
            }
          }}
          onClick={() => {
            advanceToNext();
          }}
        >
          {/* Very subtle hint - only on first cue with "none" response */}
          {currentIndex === 2 && currentCue.response_type === "none" && (
            <motion.div 
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-8 h-8 flex items-center justify-center text-white/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// RESPONSE INTERFACE
// ============================================================================

interface ResponseInterfaceProps {
  cue: NaviCue;
  onRespond: (value?: any) => void;
  hasResponded: boolean;
}

function ResponseInterface({ cue, onRespond, hasResponded }: ResponseInterfaceProps) {
  const [sliderValue, setSliderValue] = useState(5);
  const [wordInput, setWordInput] = useState("");
  const [breathCount, setBreathCount] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [holdCompleted, setHoldCompleted] = useState(false);

  const holdIntervalRef = useRef<number | null>(null);

  // Handle hold completion
  useEffect(() => {
    if (holdCompleted) {
      onRespond(holdTime);
      setHoldCompleted(false);
    }
  }, [holdCompleted, holdTime, onRespond]);

  if (cue.response_type === "none" || hasResponded) {
    return null;
  }

  // TAP response
  if (cue.response_type === "tap" && cue.response_options?.tap_options) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {cue.response_options.tap_options.map((option) => (
          <button
            key={option}
            onClick={() => onRespond(option)}
            className="py-4 bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
            style={{ 
              borderRadius: "0px",
              fontFamily: "var(--font-display)", 
              fontWeight: 600 
            }}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  // BINARY response
  if (cue.response_type === "binary") {
    return (
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onRespond("left")}
          className="py-6 bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
          style={{ 
            borderRadius: "0px",
            fontFamily: "var(--font-display)", 
            fontWeight: 600 
          }}
        >
          {cue.response_options?.binary_left || "No"}
        </button>
        <button
          onClick={() => onRespond("right")}
          className="py-6 bg-white/10 hover:bg-white/20 text-white transition-colors text-center"
          style={{ 
            borderRadius: "0px",
            fontFamily: "var(--font-display)", 
            fontWeight: 600 
          }}
        >
          {cue.response_options?.binary_right || "Yes"}
        </button>
      </div>
    );
  }

  // SLIDER response
  if (cue.response_type === "slider") {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-2xl text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            {sliderValue}
          </span>
        </div>
        <input
          type="range"
          min={cue.response_options?.slider_min || 0}
          max={cue.response_options?.slider_max || 10}
          value={sliderValue}
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
          className="w-full h-2 bg-white/20 appearance-none cursor-pointer"
          style={{ borderRadius: "0px" }}
        />
        <button
          onClick={() => onRespond(sliderValue)}
          className="w-full py-4 bg-white/20 hover:bg-white/30 text-white transition-colors"
          style={{ 
            borderRadius: "0px",
            fontFamily: "var(--font-display)", 
            fontWeight: 600 
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  // ONE WORD response
  if (cue.response_type === "one_word") {
    return (
      <div className="space-y-4">
        <input
          type="text"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          placeholder="One word..."
          maxLength={20}
          className="w-full py-4 px-6 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-colors"
          style={{ 
            borderRadius: "0px",
            fontFamily: "var(--font-display)", 
            fontWeight: 600 
          }}
        />
        <button
          onClick={() => onRespond(wordInput)}
          disabled={!wordInput.trim()}
          className="w-full py-4 bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            borderRadius: "0px",
            fontFamily: "var(--font-display)", 
            fontWeight: 600 
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  // BREATH response
  if (cue.response_type === "breath") {
    const targetBreaths = cue.response_options?.breath_count || 3;
    
    return (
      <div className="space-y-6 text-center">
        <div className="text-white/80">
          <p className="text-sm mb-2">Breathe with this thought</p>
          <p className="text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            {breathCount} / {targetBreaths}
          </p>
        </div>
        <motion.button
          onClick={() => {
            if (breathCount < targetBreaths) {
              setBreathCount(breathCount + 1);
            } else {
              onRespond(breathCount);
            }
          }}
          whileTap={{ scale: 0.95 }}
          className="w-32 h-32 mx-auto bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          style={{ borderRadius: "0px" }}
        >
          <span className="text-white text-sm uppercase tracking-wider">
            {breathCount < targetBreaths ? "Breathe" : "Complete"}
          </span>
        </motion.button>
      </div>
    );
  }

  // HOLD response
  if (cue.response_type === "hold") {
    const targetDuration = cue.response_options?.hold_duration || 5;
    
    const handleHoldStart = () => {
      setIsHolding(true);
      holdIntervalRef.current = window.setInterval(() => {
        setHoldTime(prev => {
          const next = prev + 0.1;
          if (next >= targetDuration) {
            if (holdIntervalRef.current) {
              clearInterval(holdIntervalRef.current);
              holdIntervalRef.current = null;
            }
            setIsHolding(false);
            setHoldCompleted(true);
            return targetDuration;
          }
          return next;
        });
      }, 100);
    };

    const handleHoldEnd = () => {
      setIsHolding(false);
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
      // If released early, reset
      if (holdTime < targetDuration - 0.2) {
        setHoldTime(0);
      }
    };

    return (
      <div className="space-y-6 text-center">
        <div className="text-white/80">
          <p className="text-sm mb-2">Hold to sit with this</p>
          <p className="text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            {holdTime.toFixed(1)}s
          </p>
        </div>
        <motion.button
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          whileTap={{ scale: 0.95 }}
          className="w-32 h-32 mx-auto bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors relative overflow-hidden"
          style={{ borderRadius: "0px" }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            initial={{ height: "0%" }}
            animate={{ height: isHolding ? "100%" : "0%" }}
            transition={{ duration: targetDuration, ease: "linear" }}
            style={{ bottom: 0, top: "auto" }}
          />
          <span className="relative z-10 text-white text-sm uppercase tracking-wider">
            Hold
          </span>
        </motion.button>
      </div>
    );
  }

  // NEW RESPONSE TYPES - Phase 1
  if (cue.response_type === "voice10") {
    return (
      <Voice10Response
        onRespond={onRespond}
        maxDuration={cue.response_options?.voice_max_duration}
        showWaveform={cue.response_options?.voice_show_waveform}
        allowPlayback={cue.response_options?.voice_allow_playback}
      />
    );
  }

  if (cue.response_type === "sort" && cue.response_options?.sort_items) {
    return (
      <SortResponse
        items={cue.response_options.sort_items}
        instruction={cue.response_options.sort_instruction}
        orientation={cue.response_options.sort_orientation}
        onRespond={onRespond}
      />
    );
  }

  if (cue.response_type === "body_map") {
    return (
      <BodyMapResponse
        regions={cue.response_options?.body_regions}
        multiSelect={cue.response_options?.body_multi_select}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "mirror") {
    // TODO: Fetch previous response from database
    const previousResponse = null;
    return (
      <MirrorResponse
        previousResponse={previousResponse}
        question={cue.response_options?.mirror_question}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "constellation" && cue.response_options?.constellation_items) {
    return (
      <ConstellationResponse
        items={cue.response_options.constellation_items}
        centerLabel={cue.response_options.constellation_center_label}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "timeline") {
    return (
      <TimelineResponse
        labels={cue.response_options?.timeline_labels}
        minLabel={cue.response_options?.timeline_min_label}
        maxLabel={cue.response_options?.timeline_max_label}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "dial") {
    return (
      <DialResponse
        minLabel={cue.response_options?.dial_min_label}
        maxLabel={cue.response_options?.dial_max_label}
        colorStart={cue.response_options?.dial_color_start}
        colorEnd={cue.response_options?.dial_color_end}
        onRespond={onRespond}
      />
    );
  }

  if (cue.response_type === "spectrum") {
    return (
      <SpectrumResponse
        xLabel={cue.response_options?.spectrum_x_label}
        yLabel={cue.response_options?.spectrum_y_label}
        quadrants={cue.response_options?.spectrum_quadrants}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "comparison") {
    return (
      <ComparisonResponse
        oldText={cue.response_options?.comparison_old_text || ''}
        newText={cue.response_options?.comparison_new_text || ''}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "paradox") {
    return (
      <ParadoxResponse
        statement1={cue.response_options?.paradox_statement_1 || ''}
        statement2={cue.response_options?.paradox_statement_2 || ''}
        holdDuration={cue.response_options?.paradox_hold_duration}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "echo") {
    return (
      <EchoResponse
        statement={cue.response_options?.echo_statement || cue.text_line}
        repetitions={cue.response_options?.echo_repetitions}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "witness") {
    return (
      <WitnessResponse
        duration={cue.response_options?.witness_duration}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  if (cue.response_type === "curveball") {
    return (
      <CurveballResponse
        text={cue.text_line}
        onRespond={onRespond}
        pillarColor={cue.pillar_color}
      />
    );
  }

  return null;
}