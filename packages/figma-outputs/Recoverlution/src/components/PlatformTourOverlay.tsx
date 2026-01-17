/**
 * Platform Tour Overlay - Apple-Level First-Time Experience
 * 
 * Philosophy:
 * - Show popups OVER the actual dashboard tiles (not just nav highlights)
 * - Frosted glass v4.9 aesthetic with premium shadows
 * - Intelligent positioning that adapts to screen size
 * - Smooth spotlight effect with purple brand glow
 * - DNA-compliant: No dashes, no minimizing words
 * - Every word honors the user's journey
 */

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { X, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlatformTourOverlayProps {
  currentStep: number;
  onNext: () => void;
  onSkip: () => void;
  onClose: () => void;
}

interface TourStep {
  target: string; // data-tour attribute value
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'auto'; // auto = smart positioning
  icon?: any;
}

const TOUR_STEPS: TourStep[] = [
  {
    target: 'journey',
    title: 'Your Journey',
    description: 'A personalized path designed for where you are. We suggest what to explore next, and you decide when you\'re ready.',
    position: 'auto',
  },
  {
    target: 'navicues',
    title: 'NaviCues',
    description: 'The right wisdom at the right moment. Quick insights that meet you exactly where you are.',
    position: 'auto',
  },
  {
    target: 'state',
    title: 'Your Inner Compass',
    description: 'Track your emotional state throughout the day. No judgment, pure awareness.',
    position: 'auto',
  },
  {
    target: 'wellbeing',
    title: 'Wellbeing',
    description: 'Daily practices and exercises to build your foundation. Always here when you need support.',
    position: 'auto',
  },
  {
    target: 'toolkit',
    title: 'Your Toolkit',
    description: 'Over 200 resources at your fingertips. Articles, videos, and tools, all searchable and organized for you.',
    position: 'auto',
  },
  {
    target: 'navigate',
    title: 'Navigate',
    description: 'Your care team, always connected. Get support from the people who know your journey.',
    position: 'auto',
  },
  {
    target: 'momentum',
    title: 'Momentum',
    description: 'See your progress over time. Small steps create lasting change.',
    position: 'auto',
  },
  {
    target: 'luma',
    title: 'Meet LUMA',
    description: 'Your emotional co-pilot, available anytime. Ask questions, explore feelings, get personalized guidance. Let\'s start there.',
    position: 'center',
  },
];

export function PlatformTourOverlay({ 
  currentStep, 
  onNext, 
  onSkip, 
  onClose 
}: PlatformTourOverlayProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const step = TOUR_STEPS[currentStep];
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  // Find and track the target element
  useEffect(() => {
    if (!step) return;

    const updateTargetPosition = () => {
      const element = document.querySelector(`[data-tour="${step.target}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        setIsVisible(true);
      }
    };

    // Initial position
    updateTargetPosition();

    // Update on window resize
    window.addEventListener('resize', updateTargetPosition);
    window.addEventListener('scroll', updateTargetPosition);

    return () => {
      window.removeEventListener('resize', updateTargetPosition);
      window.removeEventListener('scroll', updateTargetPosition);
    };
  }, [step, currentStep]);

  if (!step || !targetRect) return null;

  // Smart card positioning based on target location
  const getCardPosition = (): React.CSSProperties => {
    const padding = 24;
    const cardWidth = 380;
    const cardHeight = 240; // estimated

    // For LUMA (last step), center it
    if (step.target === 'luma') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    // Smart positioning based on target location
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Determine best position
    let top = targetRect.bottom + padding;
    let left = targetRect.left;

    // If card would go off right edge, align to right of target
    if (left + cardWidth > viewportWidth - padding) {
      left = targetRect.right - cardWidth;
    }

    // If card would go off left edge, align to left edge
    if (left < padding) {
      left = padding;
    }

    // If card would go off bottom, position above target
    if (top + cardHeight > viewportHeight - padding) {
      top = targetRect.top - cardHeight - padding;
    }

    // If still would go off top, position to the side
    if (top < padding) {
      top = targetRect.top;
      if (targetRect.right + cardWidth + padding < viewportWidth) {
        left = targetRect.right + padding;
      } else if (targetRect.left - cardWidth - padding > 0) {
        left = targetRect.left - cardWidth - padding;
      } else {
        top = padding;
        left = (viewportWidth - cardWidth) / 2;
      }
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Subtle dark overlay with blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100]" 
            onClick={onSkip}
          />

          {/* Spotlight effect - Premium purple glow around target */}
          <div 
            className="fixed z-[101] pointer-events-none transition-all duration-500 ease-out"
            style={{
              top: `${targetRect.top - 8}px`,
              left: `${targetRect.left - 8}px`,
              width: `${targetRect.width + 16}px`,
              height: `${targetRect.height + 16}px`,
            }}
          >
            {/* Multiple layered shadows for depth */}
            <div className="absolute inset-0 rounded-[20px] shadow-[0_0_0_4px_rgba(87,57,251,0.4),0_0_0_1px_rgba(255,255,255,0.8),0_0_32px_8px_rgba(87,57,251,0.3),0_0_64px_16px_rgba(87,57,251,0.2)]" />
            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Raise the target element */}
          <div 
            className="fixed z-[102] pointer-events-none"
            style={{
              top: `${targetRect.top}px`,
              left: `${targetRect.left}px`,
              width: `${targetRect.width}px`,
              height: `${targetRect.height}px`,
            }}
          />

          {/* Tour Card - Frosted Glass v4.9 */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[103] pointer-events-auto"
            style={getCardPosition()}
          >
            <div className="bg-white/98 backdrop-blur-[32px] backdrop-saturate-[180%] rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.5)_inset] border border-[#3E2BB8]/10 p-8 w-[380px]">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  {/* Brand icon with gradient */}
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3E2BB8] to-[#5739FB] flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-gray-900 text-xl mb-0.5" 
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      {currentStep + 1} of {TOUR_STEPS.length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                {step.description}
              </p>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mb-6">
                {TOUR_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'w-8 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB]'
                        : index < currentStep
                        ? 'w-1.5 bg-[#5739FB]'
                        : 'w-1.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  I've got it
                </Button>
                <Button
                  onClick={onNext}
                  className="bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#2E1B98] hover:to-[#4729DB] text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isLastStep ? (
                    <>
                      Open LUMA
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {/* Subtle hint for last step */}
              {isLastStep && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-xs text-gray-500 mt-4 italic"
                >
                  Your emotional co-pilot is ready to help
                </motion.p>
              )}
            </div>

            {/* Arrow pointer to target (optional, elegant touch) */}
            {step.target !== 'luma' && (
              <div
                className="absolute w-4 h-4 bg-white/98 border-l border-t border-[#3E2BB8]/10 transform rotate-45"
                style={{
                  bottom: '-8px',
                  left: '50%',
                  marginLeft: '-8px',
                }}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
