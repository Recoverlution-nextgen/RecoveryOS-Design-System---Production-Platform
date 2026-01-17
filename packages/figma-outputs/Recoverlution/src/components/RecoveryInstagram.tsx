/**
 * Recovery Instagram - NaviCues Player
 * 
 * Philosophy:
 * - Quick-fire neurological pings (30 sec per cue)
 * - Instagram Stories UX (vertical scroll)
 * - Always can skip (Next button always visible)
 * - Optional interactions (skip = valuable data)
 * - Breath button (pause or go deeper to Building Blocks)
 * - Backend tracks EVERYTHING
 * - Goal: Measure red/orange/green micro-blocks
 * 
 * Design DNA:
 * - infiniteK Square: borderRadius: '0px' EVERYWHERE
 * - ALL buttons square
 * - ALL containers square
 * - Progress dots square
 * - Brand purple: #3E2BB8 and #5739FB
 * - NO dashes, NO minimizing words
 */

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Wind, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface NaviCue {
  id: string;
  type: 
    | "quote-resonance"
    | "visual-one-word"
    | "question-choice"
    | "contemplation"
    | "body-scan"
    | "know-believe-embody";
  
  // Visual
  image: string;
  gradient?: string;
  
  // Content
  quote?: string;
  author?: string;
  prompt?: string;
  question?: string;
  choices?: string[];
  bodyParts?: string[];
  
  // Response config
  optional?: boolean;
  requireInteraction?: boolean;
  
  // Hidden backend metadata
  linkedPillar: string;
  linkedMicroBlock: string;
  linkedTheme: string;
  kbeLevel: "know" | "believe" | "embody";
  microBlockState?: "red" | "orange" | "green";
}

interface RecoveryInstagramProps {
  navicues: NaviCue[];
  onComplete?: () => void;
  onClose?: () => void;
  onBreathPause?: () => void;
  onGoDeeper?: (navicueId: string) => void;
}

export function RecoveryInstagram({
  navicues,
  onComplete,
  onClose,
  onBreathPause,
  onGoDeeper
}: RecoveryInstagramProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [showBreathMenu, setShowBreathMenu] = useState(false);
  const touchStartY = useRef<number>(0);

  const currentCue = navicues[currentIndex];
  const isLastCue = currentIndex === navicues.length - 1;
  const hasAnswered = !!responses[currentCue.id];
  const hasSkipped = skipped.has(currentCue.id);

  // Send analytics to backend
  const trackNaviCue = (eventType: string, data: any) => {
    console.log('📊 NaviCue Analytics:', {
      eventType,
      navicueId: currentCue.id,
      pillar: currentCue.linkedPillar,
      microBlock: currentCue.linkedMicroBlock,
      theme: currentCue.linkedTheme,
      kbeLevel: currentCue.kbeLevel,
      microBlockState: currentCue.microBlockState,
      timestamp: new Date().toISOString(),
      ...data
    });
  };

  const handleResponse = (value: any) => {
    setResponses(prev => ({
      ...prev,
      [currentCue.id]: value
    }));

    trackNaviCue('response', {
      responseValue: value,
      responseType: currentCue.type,
      timeSpent: 0
    });
  };

  const handleNext = () => {
    if (!hasAnswered && !hasSkipped) {
      setSkipped(prev => new Set([...prev, currentCue.id]));
      
      trackNaviCue('skip', {
        reason: 'no_interaction',
        optional: currentCue.optional
      });
    }

    if (isLastCue) {
      trackNaviCue('suite_complete', {
        totalAnswered: Object.keys(responses).length,
        totalSkipped: skipped.size + (hasAnswered ? 0 : 1),
        completionRate: Object.keys(responses).length / navicues.length
      });
      onComplete?.();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBreathAction = (action: 'pause' | 'deeper') => {
    setShowBreathMenu(false);
    
    trackNaviCue('breath_action', { action });
    
    if (action === 'pause') {
      onBreathPause?.();
    } else {
      onGoDeeper?.(currentCue.id);
    }
  };

  // Touch/swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (diff > 80) {
      handleNext();
    }
  };

  // Track cue view
  useEffect(() => {
    trackNaviCue('view', {
      index: currentIndex,
      totalCues: navicues.length
    });
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 bg-black z-50 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button - SQUARE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
        style={{ borderRadius: '0px' }}
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Logo/Brand - SQUARE */}
      <div className="absolute top-4 left-4 z-50">
        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20" style={{ borderRadius: '0px' }}>
          <span className="text-white text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>NaviCues</span>
        </div>
      </div>

      {/* NaviCue slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full"
        >
          <NaviCueSlide
            cue={currentCue}
            onResponse={handleResponse}
            hasAnswered={hasAnswered}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50 pb-8 px-6">
        {/* Progress indicator - SQUARE dots */}
        <div className="flex gap-1.5 justify-center mb-6">
          {navicues.map((_, idx) => (
            <div
              key={idx}
              className={`transition-all ${
                idx === currentIndex
                  ? "w-8 h-1 bg-white"
                  : idx < currentIndex
                  ? "w-1.5 h-1 bg-white/60"
                  : "w-1.5 h-1 bg-white/20"
              }`}
              style={{ borderRadius: '0px' }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 max-w-md mx-auto">
          {/* Breath button - SQUARE */}
          <motion.button
            onClick={() => setShowBreathMenu(true)}
            className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:from-cyan-400/30 hover:to-blue-500/30 transition-all shadow-lg"
            style={{ borderRadius: '0px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wind className="w-6 h-6 text-white" />
          </motion.button>

          {/* Next button - SQUARE (always visible) */}
          <motion.button
            onClick={handleNext}
            className="flex-1 h-14 bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30 transition-all shadow-lg flex items-center justify-center"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', borderRadius: '0px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLastCue ? "Complete" : "Next"}
          </motion.button>
        </div>

        {/* Swipe hint (first cue) */}
        {currentIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center mt-4"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-5 h-5 text-white/40 mx-auto" />
              <p className="text-white/40 text-xs mt-1">Swipe up for next</p>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Breath Menu Overlay - SQUARE */}
      <AnimatePresence>
        {showBreathMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowBreathMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 max-w-md mx-6 border border-white/20 shadow-2xl"
              style={{ borderRadius: '0px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-6">
                <Wind className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  Take a Breath.
                </h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleBreathAction('pause')}
                  className="w-full p-5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/20 text-center hover:from-cyan-500/30 hover:to-blue-500/30 transition-all group"
                  style={{ borderRadius: '0px' }}
                >
                  <p className="text-white mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>Pause and Reflect</p>
                  <p className="text-white/70" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>Come back when you're ready</p>
                </button>

                <button
                  onClick={() => handleBreathAction('deeper')}
                  className="w-full p-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 text-center hover:from-purple-500/30 hover:to-pink-500/30 transition-all group"
                  style={{ borderRadius: '0px' }}
                >
                  <p className="text-white mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>Go Deeper</p>
                  <p className="text-white/70" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>Explore this in Building Blocks</p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual NaviCue slide component
function NaviCueSlide({
  cue,
  onResponse,
  hasAnswered
}: {
  cue: NaviCue;
  onResponse: (value: any) => void;
  hasAnswered: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full h-full relative">
      {/* Background with gradient (no image dependency) */}
      <div className="absolute inset-0">
        {cue.image ? (
          <>
            <img
              src={cue.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 ${
                cue.gradient || "bg-gradient-to-b from-black/50 via-black/30 to-black/70"
              }`}
            />
          </>
        ) : (
          <div
            className={`absolute inset-0 ${
              cue.gradient || "bg-gradient-to-br from-[#3E2BB8] to-[#5739FB]"
            }`}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pb-32">
        {/* Quote + Resonance */}
        {cue.type === "quote-resonance" && (
          <QuoteResonanceContent
            cue={cue}
            onResponse={onResponse}
            hasAnswered={hasAnswered}
          />
        )}

        {/* Visual + One Word */}
        {cue.type === "visual-one-word" && (
          <VisualOneWordContent
            cue={cue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onResponse={onResponse}
            hasAnswered={hasAnswered}
          />
        )}

        {/* Question + Choice */}
        {cue.type === "question-choice" && (
          <QuestionChoiceContent
            cue={cue}
            onResponse={onResponse}
            hasAnswered={hasAnswered}
          />
        )}

        {/* Contemplation */}
        {cue.type === "contemplation" && (
          <ContemplationContent cue={cue} />
        )}

        {/* Body Scan */}
        {cue.type === "body-scan" && (
          <BodyScanContent
            cue={cue}
            onResponse={onResponse}
            hasAnswered={hasAnswered}
          />
        )}

        {/* Know/Believe/Embody */}
        {cue.type === "know-believe-embody" && (
          <KnowBelieveEmbodyContent
            cue={cue}
            onResponse={onResponse}
            hasAnswered={hasAnswered}
          />
        )}
      </div>
    </div>
  );
}

// Quote + Resonance component
function QuoteResonanceContent({
  cue,
  onResponse,
  hasAnswered
}: {
  cue: NaviCue;
  onResponse: (value: any) => void;
  hasAnswered: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="mb-10 text-center">
        <p className="text-white italic leading-relaxed mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500 }}>
          {cue.quote}
        </p>
        {cue.author && (
          <p className="text-white/80" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem' }}>
            {cue.author}
          </p>
        )}
      </div>

      {cue.prompt && (
        <p className="text-white/90 mb-6 text-center" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem' }}>
          {cue.prompt}
        </p>
      )}

      {/* Scale 1-5 - SQUARE buttons */}
      <div className="flex gap-4 justify-center items-center">
        {[1, 2, 3, 4, 5].map((num) => (
          <motion.button
            key={num}
            onClick={() => onResponse(num)}
            className={`w-16 h-16 backdrop-blur-md border-2 text-white transition-all flex items-center justify-center ${
              hasAnswered
                ? "bg-white/10 border-white/20 opacity-50"
                : "bg-white/20 border-white/40 hover:bg-white/30 hover:border-white/60"
            }`}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', borderRadius: '0px' }}
            whileHover={!hasAnswered ? { scale: 1.1 } : {}}
            whileTap={!hasAnswered ? { scale: 0.95 } : {}}
            disabled={hasAnswered}
          >
            {num}
          </motion.button>
        ))}
      </div>

      {cue.optional && !hasAnswered && (
        <p className="text-white/50 text-sm mt-4">You can skip this</p>
      )}
    </motion.div>
  );
}

// Visual + One Word component
function VisualOneWordContent({
  cue,
  inputValue,
  setInputValue,
  onResponse,
  hasAnswered
}: {
  cue: NaviCue;
  inputValue: string;
  setInputValue: (val: string) => void;
  onResponse: (value: any) => void;
  hasAnswered: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl w-full mx-auto text-center"
    >
      {cue.prompt && (
        <p className="text-white leading-relaxed mb-8 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600 }}>
          {cue.prompt}
        </p>
      )}

      <div className="flex justify-center">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              onResponse(inputValue.trim());
              setInputValue("");
            }
          }}
          placeholder="One word"
          className="w-full max-w-md px-6 py-5 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white placeholder:text-white/50 text-center focus:bg-white/30 focus:border-white/60"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', borderRadius: '0px' }}
          disabled={hasAnswered}
          autoFocus
        />
      </div>

      {cue.optional && (
        <p className="text-white/50 text-sm mt-4">You can skip this</p>
      )}
    </motion.div>
  );
}

// Question + Choice component
function QuestionChoiceContent({
  cue,
  onResponse,
  hasAnswered
}: {
  cue: NaviCue;
  onResponse: (value: any) => void;
  hasAnswered: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl w-full mx-auto text-center"
    >
      {cue.question && (
        <p className="text-white leading-relaxed mb-8 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600 }}>
          {cue.question}
        </p>
      )}

      <div className="space-y-3">
        {cue.choices?.map((choice) => (
          <motion.button
            key={choice}
            onClick={() => onResponse(choice)}
            className={`w-full px-6 py-4 backdrop-blur-md border-2 text-white transition-all text-center ${
              hasAnswered
                ? "bg-white/10 border-white/20 opacity-50"
                : "bg-white/20 border-white/40 hover:bg-white/30 hover:border-white/60"
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', fontWeight: 500, borderRadius: '0px' }}
            whileHover={!hasAnswered ? { scale: 1.02 } : {}}
            whileTap={!hasAnswered ? { scale: 0.98 } : {}}
            disabled={hasAnswered}
          >
            {choice}
          </motion.button>
        ))}
      </div>

      {cue.optional && !hasAnswered && (
        <p className="text-white/50 text-sm mt-4">You can skip this</p>
      )}
    </motion.div>
  );
}

// Contemplation component
function ContemplationContent({ cue }: { cue: NaviCue }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl text-center"
    >
      <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-6" />
      
      {cue.quote && (
        <p className="text-white italic leading-relaxed mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500 }}>
          {cue.quote}
        </p>
      )}
      
      {cue.author && (
        <p className="text-white/80 mb-8" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem' }}>
          {cue.author}
        </p>
      )}

      {cue.prompt && (
        <p className="text-white/70 italic" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem' }}>
          {cue.prompt}
        </p>
      )}
    </motion.div>
  );
}

// Body Scan component
function BodyScanContent({
  cue,
  onResponse,
  hasAnswered
}: {
  cue: NaviCue;
  onResponse: (value: any) => void;
  hasAnswered: boolean;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const togglePart = (part: string) => {
    if (hasAnswered) return;
    
    const newSelected = selected.includes(part)
      ? selected.filter(p => p !== part)
      : [...selected, part];
    
    setSelected(newSelected);
    onResponse(newSelected);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl w-full mx-auto text-center"
    >
      {cue.prompt && (
        <p className="text-white leading-relaxed mb-8 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600 }}>
          {cue.prompt}
        </p>
      )}

      <div className="space-y-3">
        {cue.bodyParts?.map((part) => (
          <motion.button
            key={part}
            onClick={() => togglePart(part)}
            className={`w-full px-6 py-4 backdrop-blur-md border-2 text-white transition-all text-center ${
              selected.includes(part)
                ? "bg-white/30 border-white/60"
                : "bg-white/20 border-white/40 hover:bg-white/25"
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', fontWeight: 500, borderRadius: '0px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {part}
          </motion.button>
        ))}
      </div>

      {cue.optional && (
        <p className="text-white/50 text-sm mt-4">Select all that apply, or skip</p>
      )}
    </motion.div>
  );
}

// Know/Believe/Embody component
function KnowBelieveEmbodyContent({
  cue,
  onResponse,
  hasAnswered
}: {
  cue: NaviCue;
  onResponse: (value: any) => void;
  hasAnswered: boolean;
}) {
  const kbeOptions = [
    { value: "know", label: "I understand this (Know)", color: "from-blue-500/20 to-cyan-500/20" },
    { value: "believe", label: "I believe this (Believe)", color: "from-purple-500/20 to-pink-500/20" },
    { value: "embody", label: "I live this (Embody)", color: "from-emerald-500/20 to-teal-500/20" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl w-full mx-auto text-center"
    >
      {cue.question && (
        <p className="text-white leading-relaxed mb-8 text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600 }}>
          {cue.question}
        </p>
      )}

      <div className="space-y-3">
        {kbeOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onResponse(option.value)}
            className={`w-full px-6 py-5 bg-gradient-to-br ${option.color} backdrop-blur-md border-2 border-white/40 text-white hover:border-white/60 transition-all text-center ${
              hasAnswered ? "opacity-50" : ""
            }`}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', fontWeight: 500, borderRadius: '0px' }}
            whileHover={!hasAnswered ? { scale: 1.02 } : {}}
            whileTap={!hasAnswered ? { scale: 0.98 } : {}}
            disabled={hasAnswered}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {cue.optional && !hasAnswered && (
        <p className="text-white/50 text-sm mt-4">You can skip this</p>
      )}
    </motion.div>
  );
}