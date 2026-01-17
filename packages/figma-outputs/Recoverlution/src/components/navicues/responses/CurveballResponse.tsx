/**
 * CURVEBALL Response Component
 * 
 * Unexpected format variations to break patterns
 * Psychology: Disrupts habituation, tests adaptability
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

type CurveballVariation = 
  | 'delayed_reveal'
  | 'inverted_colors'
  | 'sideways_text'
  | 'minimal_word'
  | 'extreme_zoom';

interface CurveballResponseProps {
  text: string;
  variation?: CurveballVariation;
  onRespond: () => void;
  pillarColor: string;
}

export function CurveballResponse({
  text,
  variation,
  onRespond,
  pillarColor
}: CurveballResponseProps) {
  const [revealed, setRevealed] = useState(false);
  const [autoVariation] = useState<CurveballVariation>(
    variation || (['delayed_reveal', 'inverted_colors', 'sideways_text', 'minimal_word', 'extreme_zoom'] as CurveballVariation[])[
      Math.floor(Math.random() * 5)
    ]
  );

  useEffect(() => {
    if (autoVariation === 'delayed_reveal') {
      const timer = setTimeout(() => {
        setRevealed(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setRevealed(true);
    }
  }, [autoVariation]);

  // DELAYED REVEAL - Black screen, then text appears
  if (autoVariation === 'delayed_reveal') {
    return (
      <div className="space-y-8" onClick={revealed ? onRespond : undefined}>
        {!revealed ? (
          <div className="text-center text-white/40 text-sm">
            Wait for it...
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <p 
              className="text-4xl text-white text-center"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              {text}
            </p>
            <div className="text-center text-white/60 text-sm mt-8">
              Tap to continue
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // INVERTED COLORS - White background, black text
  if (autoVariation === 'inverted_colors') {
    return (
      <div 
        className="p-12 text-center cursor-pointer"
        style={{ backgroundColor: 'white', borderRadius: '0px' }}
        onClick={onRespond}
      >
        <p 
          className="text-4xl mb-8"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700,
            color: 'black'
          }}
        >
          {text}
        </p>
        <div className="text-sm" style={{ color: '#666' }}>
          Tap to continue
        </div>
      </div>
    );
  }

  // SIDEWAYS TEXT - Rotated 90 degrees
  if (autoVariation === 'sideways_text') {
    return (
      <div className="flex items-center justify-center h-96 cursor-pointer" onClick={onRespond}>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 90 }}
          transition={{ duration: 1, type: 'spring' }}
          className="text-center"
        >
          <p 
            className="text-3xl text-white whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            {text}
          </p>
        </motion.div>
      </div>
    );
  }

  // MINIMAL WORD - Extract key word and show it alone
  if (autoVariation === 'minimal_word') {
    const words = text.split(' ');
    const keyWord = words[Math.floor(words.length / 2)] || words[0];
    
    return (
      <div className="text-center cursor-pointer" onClick={onRespond}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: 'spring' }}
        >
          <p 
            className="text-8xl mb-8"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: pillarColor
            }}
          >
            {keyWord}
          </p>
          <p className="text-white/60 text-sm">
            {text}
          </p>
        </motion.div>
      </div>
    );
  }

  // EXTREME ZOOM - Single letter zoomed in
  if (autoVariation === 'extreme_zoom') {
    const firstLetter = text.charAt(0);
    
    return (
      <div className="space-y-8 text-center cursor-pointer" onClick={onRespond}>
        <motion.div
          initial={{ scale: 5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, type: 'spring' }}
        >
          <div 
            className="text-9xl mb-4"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 700,
              color: pillarColor,
              lineHeight: 1
            }}
          >
            {firstLetter}
          </div>
          <p 
            className="text-2xl text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {text}
          </p>
        </motion.div>
      </div>
    );
  }

  return null;
}
