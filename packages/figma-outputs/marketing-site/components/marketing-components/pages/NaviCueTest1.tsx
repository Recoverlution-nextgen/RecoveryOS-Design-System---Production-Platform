import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * NAVICUE TEST 1: QUICK PREDICTION
 * 
 * NOT a journey. NOT an assessment. NOT solving anything.
 * 
 * ONE MICRO-MOMENT:
 * - Show a scenario
 * - "What happens next?"
 * - Capture their prediction
 * - Done. Exit.
 * 
 * Goal: Attention capture. Make them pause. "Huh..."
 * 
 * Think: Instagram but therapeutic. One swipe, one moment.
 */

interface NaviCueTest1Props {
  onNavigate?: (page: string) => void;
  onComplete?: (data: any) => void;
}

export function NaviCueTest1({ onNavigate, onComplete }: NaviCueTest1Props) {
  const [state, setState] = useState<'ready' | 'showing' | 'predicting' | 'captured'>('ready');
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleStart = () => {
    setState('showing');
    // Auto-advance after 2 seconds
    setTimeout(() => setState('predicting'), 2000);
  };

  const handlePredict = (choice: string) => {
    setPrediction(choice);
    setState('captured');
    
    // Capture the data
    onComplete?.({ 
      type: 'quick-prediction',
      scenario: 'message-left-on-read',
      prediction: choice,
      timestamp: Date.now(),
    });

    // Auto-exit after 1.5 seconds
    setTimeout(() => {
      onNavigate?.('Home');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <AnimatePresence mode="wait">
        {/* STATE 1: READY */}
        {state === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md w-full p-6 text-center"
          >
            <button
              onClick={handleStart}
              className="w-20 h-20 mx-auto rounded-full transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: '#5739FB',
              }}
            >
              <div className="text-3xl">▶</div>
            </button>
          </motion.div>
        )}

        {/* STATE 2: SHOWING SCENARIO */}
        {state === 'showing' && (
          <motion.div
            key="showing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-2xl w-full p-8"
          >
            <div className="text-center space-y-6">
              <div className="text-6xl mb-6">💬</div>
              <div className="text-2xl" style={{ color: '#FFFFFF' }}>
                You send a vulnerable text to a friend
              </div>
              <div className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                They read it. No response.
              </div>
            </div>
          </motion.div>
        )}

        {/* STATE 3: PREDICTING */}
        {state === 'predicting' && (
          <motion.div
            key="predicting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full p-8 space-y-6"
          >
            <div className="text-center mb-8">
              <div className="text-xl mb-2" style={{ color: '#FFFFFF' }}>
                What happens next?
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                First instinct
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handlePredict('they-forgot')}
                className="p-6 text-center transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '2px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                <div className="text-3xl mb-2">🤷</div>
                <div className="text-sm">They forgot to reply</div>
              </button>

              <button
                onClick={() => handlePredict('pulling-away')}
                className="p-6 text-center transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '2px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                <div className="text-3xl mb-2">🚪</div>
                <div className="text-sm">They are pulling away</div>
              </button>

              <button
                onClick={() => handlePredict('thinking-carefully')}
                className="p-6 text-center transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '2px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                <div className="text-3xl mb-2">💭</div>
                <div className="text-sm">They are thinking carefully</div>
              </button>

              <button
                onClick={() => handlePredict('i-messed-up')}
                className="p-6 text-center transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(87, 57, 251, 0.1)',
                  border: '2px solid rgba(87, 57, 251, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                <div className="text-3xl mb-2">😔</div>
                <div className="text-sm">I said too much</div>
              </button>
            </div>
          </motion.div>
        )}

        {/* STATE 4: CAPTURED */}
        {state === 'captured' && (
          <motion.div
            key="captured"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md w-full p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#5739FB',
              }}
            >
              <div className="text-3xl">✓</div>
            </motion.div>
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Captured
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
