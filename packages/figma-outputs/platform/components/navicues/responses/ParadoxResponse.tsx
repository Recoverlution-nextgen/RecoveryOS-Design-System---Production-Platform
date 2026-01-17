/**
 * PARADOX Response Component
 * 
 * Hold two contradictory truths simultaneously
 * Psychology: Dialectical thinking (DBT), builds distress tolerance
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface ParadoxResponseProps {
  statement1: string;
  statement2: string;
  holdDuration?: number;
  onRespond: (duration: number) => void;
  pillarColor: string;
}

export function ParadoxResponse({
  statement1,
  statement2,
  holdDuration = 5,
  onRespond,
  pillarColor
}: ParadoxResponseProps) {
  const [holdTime1, setHoldTime1] = useState(0);
  const [holdTime2, setHoldTime2] = useState(0);
  const [isHolding1, setIsHolding1] = useState(false);
  const [isHolding2, setIsHolding2] = useState(false);

  const interval1Ref = useRef<number | null>(null);
  const interval2Ref = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (interval1Ref.current) clearInterval(interval1Ref.current);
      if (interval2Ref.current) clearInterval(interval2Ref.current);
    };
  }, []);

  useEffect(() => {
    // Check if both completed
    if (holdTime1 >= holdDuration && holdTime2 >= holdDuration) {
      onRespond(holdDuration);
    }
  }, [holdTime1, holdTime2, holdDuration, onRespond]);

  const handleHoldStart1 = () => {
    setIsHolding1(true);
    interval1Ref.current = window.setInterval(() => {
      setHoldTime1(prev => {
        if (prev >= holdDuration) {
          if (interval1Ref.current) clearInterval(interval1Ref.current);
          return holdDuration;
        }
        return prev + 0.1;
      });
    }, 100);
  };

  const handleHoldEnd1 = () => {
    setIsHolding1(false);
    if (interval1Ref.current) {
      clearInterval(interval1Ref.current);
      interval1Ref.current = null;
    }
    if (holdTime1 < holdDuration - 0.2) {
      setHoldTime1(0);
    }
  };

  const handleHoldStart2 = () => {
    setIsHolding2(true);
    interval2Ref.current = window.setInterval(() => {
      setHoldTime2(prev => {
        if (prev >= holdDuration) {
          if (interval2Ref.current) clearInterval(interval2Ref.current);
          return holdDuration;
        }
        return prev + 0.1;
      });
    }, 100);
  };

  const handleHoldEnd2 = () => {
    setIsHolding2(false);
    if (interval2Ref.current) {
      clearInterval(interval2Ref.current);
      interval2Ref.current = null;
    }
    if (holdTime2 < holdDuration - 0.2) {
      setHoldTime2(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center text-white/60 text-sm uppercase tracking-wider">
        Hold BOTH truths simultaneously
      </div>

      {/* Statements */}
      <div className="space-y-4">
        {/* Statement 1 */}
        <div className="space-y-3">
          <p 
            className="text-white text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {statement1}
          </p>
          <div className="relative">
            <motion.button
              onMouseDown={handleHoldStart1}
              onMouseUp={handleHoldEnd1}
              onTouchStart={handleHoldStart1}
              onTouchEnd={handleHoldEnd1}
              className="w-full py-6 bg-white/10 hover:bg-white/15 text-white transition-colors relative overflow-hidden"
              style={{ borderRadius: '0px' }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: `${pillarColor}40` }}
                initial={{ width: '0%' }}
                animate={{ width: isHolding1 ? '100%' : `${(holdTime1 / holdDuration) * 100}%` }}
                transition={{ duration: isHolding1 ? holdDuration : 0.1, ease: 'linear' }}
              />
              <span 
                className="relative z-10"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Hold {holdTime1.toFixed(1)}s / {holdDuration}s
              </span>
            </motion.button>
          </div>
        </div>

        {/* AND connector */}
        <div className="text-center text-white/80 text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          AND
        </div>

        {/* Statement 2 */}
        <div className="space-y-3">
          <p 
            className="text-white text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {statement2}
          </p>
          <div className="relative">
            <motion.button
              onMouseDown={handleHoldStart2}
              onMouseUp={handleHoldEnd2}
              onTouchStart={handleHoldStart2}
              onTouchEnd={handleHoldEnd2}
              className="w-full py-6 bg-white/10 hover:bg-white/15 text-white transition-colors relative overflow-hidden"
              style={{ borderRadius: '0px' }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: `${pillarColor}40` }}
                initial={{ width: '0%' }}
                animate={{ width: isHolding2 ? '100%' : `${(holdTime2 / holdDuration) * 100}%` }}
                transition={{ duration: isHolding2 ? holdDuration : 0.1, ease: 'linear' }}
              />
              <span 
                className="relative z-10"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Hold {holdTime2.toFixed(1)}s / {holdDuration}s
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Progress message */}
      {(holdTime1 >= holdDuration || holdTime2 >= holdDuration) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white/60 text-sm"
        >
          {holdTime1 >= holdDuration && holdTime2 >= holdDuration
            ? 'Both truths held'
            : 'Keep holding both'}
        </motion.div>
      )}
    </div>
  );
}
