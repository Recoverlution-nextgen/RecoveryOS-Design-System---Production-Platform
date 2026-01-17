import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// BATCH 16: EDGE CASES & EXTREMES (NaviCues 151-160)

export function NaviCue151({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [intensity, setIntensity] = useState(100);
  
  useEffect(() => {
    if (intensity === 100) {
      const timer = setTimeout(() => {
        onComplete?.({ maxIntensity: true, timestamp: Date.now() });
        setTimeout(() => onExit?.(), 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [intensity, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Maximum intensity
        </div>
        <motion.div
          animate={{ scale: intensity / 50, opacity: intensity / 100 }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#FF0000' }}
        />
        <div className="text-9xl text-center" style={{ color: '#FF0000' }}>{intensity}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

export function NaviCue152({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [existence, setExistence] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF', opacity: existence / 100 }}>
          Minimum existence
        </div>
        <motion.div
          animate={{ scale: existence / 100, opacity: existence / 100 }}
          className="w-64 h-64 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <input
          type="range"
          min="1"
          max="100"
          value={existence}
          onChange={(e) => setExistence(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ minimalExistence: existence, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF', opacity: existence / 100 }}
        >
          {existence === 1 ? 'Barely there' : 'Still here'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue153({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [overflowing, setOverflowing] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Total overflow
        </div>
        <motion.div
          animate={overflowing ? { scale: [1, 20], opacity: [1, 0] } : {}}
          transition={{ duration: 2 }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            setOverflowing(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 2000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Overflow
        </button>
      </div>
    </div>
  );
}

export function NaviCue154({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [depleted, setDepleted] = useState(100);
  
  useEffect(() => {
    if (depleted === 0) {
      onComplete?.({ timestamp: Date.now() });
      setTimeout(() => onExit?.(), 1500);
    }
  }, [depleted, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Complete depletion
        </div>
        <div className="relative h-96" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <motion.div
            animate={{ height: `${depleted}%` }}
            className="absolute bottom-0 w-full"
            style={{ backgroundColor: '#5739FB' }}
          />
        </div>
        <div className="text-6xl text-center" style={{ color: '#5739FB' }}>{depleted}%</div>
        <input
          type="range"
          min="0"
          max="100"
          value={depleted}
          onChange={(e) => setDepleted(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

export function NaviCue155({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [beyond, setBeyond] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {beyond ? 'You went beyond' : 'The limit is here'}
        </div>
        <div className="relative w-96 h-2 mx-auto" style={{ backgroundColor: 'rgba(87, 57, 251, 0.3)' }}>
          <motion.div
            animate={beyond ? { x: 500, opacity: 0 } : {}}
            transition={{ duration: 1 }}
            className="absolute w-8 h-8 rounded-full"
            style={{ backgroundColor: '#5739FB', top: -12 }}
          />
        </div>
        <button
          onClick={() => {
            setBeyond(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Go beyond
        </button>
      </div>
    </div>
  );
}

export function NaviCue156({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [threshold, setThreshold] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Before the threshold
        </div>
        <div className="relative w-96 h-64 mx-auto" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <div className="absolute top-1/2 w-full h-0.5" style={{ backgroundColor: '#FF0000' }} />
          <motion.div
            animate={{ top: `${100 - threshold}%` }}
            className="absolute w-full h-4"
            style={{ backgroundColor: '#5739FB' }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ threshold, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {threshold > 50 ? 'Past threshold' : 'Before threshold'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue157({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [broken, setBroken] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          After the breaking point
        </div>
        <motion.div
          animate={broken ? { 
            scale: [1, 1.5, 0.5, 1.2, 0],
            rotate: [0, 45, -45, 90, 180],
            opacity: [1, 1, 1, 0.5, 0]
          } : {}}
          transition={{ duration: 1.5 }}
          className="w-48 h-48 mx-auto"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            setBroken(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 2000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#E74C3C', color: '#FFFFFF' }}
        >
          Break
        </button>
      </div>
    </div>
  );
}

export function NaviCue158({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [atEdge, setAtEdge] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          At the edge
        </div>
        <motion.div
          animate={atEdge ? { x: [0, 400, 400, 0] } : {}}
          transition={{ duration: 3 }}
          onAnimationComplete={() => {
            if (atEdge) {
              onComplete?.({ timestamp: Date.now() });
              onExit?.();
            }
          }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => setAtEdge(true)}
          disabled={atEdge}
          className="px-12 py-6"
          style={{ backgroundColor: atEdge ? 'rgba(87, 57, 251, 0.3)' : '#5739FB', color: '#FFFFFF' }}
        >
          {atEdge ? 'At edge...' : 'Go to edge'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue159({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [crossed, setCrossed] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          The line you cannot cross
        </div>
        <div className="relative w-96 h-64 mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1" style={{ backgroundColor: '#FF0000' }} />
          <motion.div
            animate={crossed ? { x: 200 } : {}}
            transition={{ duration: 1 }}
            className="absolute left-0 top-1/2 w-16 h-16 rounded-full"
            style={{ backgroundColor: '#5739FB', transform: 'translateY(-50%)' }}
          />
        </div>
        <button
          onClick={() => {
            setCrossed(true);
            onComplete?.({ crossed: true, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Cross it anyway
        </button>
      </div>
    </div>
  );
}

export function NaviCue160({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [temp, setTemp] = useState(0);
  
  useEffect(() => {
    if (temp === 0) {
      const timer = setTimeout(() => {
        onComplete?.({ absoluteZero: true, timestamp: Date.now() });
        setTimeout(() => onExit?.(), 1500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [temp, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Absolute zero
        </div>
        <motion.div
          animate={{ scale: temp / 50 || 0.1, opacity: temp / 100 || 0.1 }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#0066FF' }}
        />
        <div className="text-9xl text-center" style={{ color: '#0066FF' }}>{temp}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={temp}
          onChange={(e) => setTemp(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

// BATCH 17: RECURSIVE & META (NaviCues 161-170)

export function NaviCue161({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicked, setClicked] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          This is a NaviCue about NaviCues
        </div>
        <button
          onClick={() => {
            setClicked(true);
            onComplete?.({ meta: true, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {clicked ? 'You experienced the meta' : 'Experience'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue162({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Why are you answering questions?
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('curious'); onComplete?.({ answer: 'curious', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Curious</button>
          <button onClick={() => { setAnswer('told-to'); onComplete?.({ answer: 'told-to', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I was told to</button>
          <button onClick={() => { setAnswer('dont-know'); onComplete?.({ answer: 'dont-know', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I do not know</button>
          <button onClick={() => { setAnswer('question-about-questions'); onComplete?.({ answer: 'question-about-questions', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>This is also a question</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue163({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [chose, setChose] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Choose to choose
        </div>
        <button
          onClick={() => {
            setChose(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {chose ? 'Chose to choose' : 'Choose'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue164({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [thinking, setThinking] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Think about thinking
        </div>
        <motion.div
          animate={thinking ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1, repeat: thinking ? Infinity : 0 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            if (!thinking) {
              setThinking(true);
              onComplete?.({ timestamp: Date.now() });
              setTimeout(() => onExit?.(), 3000);
            }
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {thinking ? 'Thinking...' : 'Start'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue165({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [feeling, setFeeling] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How do you feel about feeling?
        </div>
        <div className="space-y-3">
          <button onClick={() => { setFeeling('overwhelming'); onComplete?.({ feeling: 'overwhelming', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Overwhelming</button>
          <button onClick={() => { setFeeling('interesting'); onComplete?.({ feeling: 'interesting', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Interesting</button>
          <button onClick={() => { setFeeling('avoid'); onComplete?.({ feeling: 'avoid', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I avoid it</button>
          <button onClick={() => { setFeeling('meta'); onComplete?.({ feeling: 'meta', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>This question loops</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue166({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [aware, setAware] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {aware ? 'You are aware that you are aware' : 'Be aware of your awareness'}
        </div>
        <button
          onClick={() => {
            setAware(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 2000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Aware
        </button>
      </div>
    </div>
  );
}

export function NaviCue167({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [depth, setDepth] = useState(1);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Loop within loop within loop
        </div>
        <div className="relative w-64 h-64 mx-auto">
          {Array.from({ length: depth }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 2 - (i * 0.2), repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid rgba(87, 57, 251, ${1 - i * 0.15})`,
                transform: `scale(${1 - i * 0.15})`,
              }}
            />
          ))}
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={depth}
          onChange={(e) => setDepth(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ depth, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {depth} loops deep
        </button>
      </div>
    </div>
  );
}

export function NaviCue168({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [layers, setLayers] = useState(1);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Meta layer {layers}
        </div>
        <button
          onClick={() => {
            const newLayers = layers + 1;
            setLayers(newLayers);
            if (newLayers >= 5) {
              onComplete?.({ layers: newLayers, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }
          }}
          className="w-64 h-64 text-6xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {layers}
        </button>
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Click to go deeper
        </div>
      </div>
    </div>
  );
}

export function NaviCue169({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicked, setClicked] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          This button references itself
        </div>
        <button
          onClick={() => {
            setClicked(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {clicked ? 'This button was clicked' : 'Click this button'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue170({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [regress, setRegress] = useState(0);
  
  useEffect(() => {
    if (regress > 0) {
      const timer = setInterval(() => {
        setRegress(r => r + 1);
        if (regress >= 10) {
          onComplete?.({ infiniteRegress: true, timestamp: Date.now() });
          setTimeout(() => onExit?.(), 500);
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, [regress, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-xl" style={{ color: '#FFFFFF' }}>
          {regress === 0 && 'Start infinite regress'}
          {regress > 0 && regress < 10 && `${Array(regress).fill('Why?').join(' ')}`}
          {regress >= 10 && '∞'}
        </div>
        {regress === 0 && (
          <button
            onClick={() => setRegress(1)}
            className="px-12 py-6"
            style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
          >
            Why?
          </button>
        )}
      </div>
    </div>
  );
}

// BATCH 18: SENSORY (NaviCues 171-180)

export function NaviCue171({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          What do you taste right now?
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('sweet'); onComplete?.({ taste: 'sweet', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Sweet</button>
          <button onClick={() => { setAnswer('bitter'); onComplete?.({ taste: 'bitter', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Bitter</button>
          <button onClick={() => { setAnswer('metallic'); onComplete?.({ taste: 'metallic', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Metallic</button>
          <button onClick={() => { setAnswer('nothing'); onComplete?.({ taste: 'nothing', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue172({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const textures = ['Smooth', 'Rough', 'Soft', 'Hard', 'Warm', 'Cold', 'Wet', 'Dry'];
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          The texture of this moment
        </div>
        <div className="grid grid-cols-4 gap-3">
          {textures.map(texture => (
            <button
              key={texture}
              onClick={() => {
                setSelected(texture);
                onComplete?.({ texture, timestamp: Date.now() });
                setTimeout(() => onExit?.(), 1000);
              }}
              className="p-6 aspect-square flex items-center justify-center text-center"
              style={{
                backgroundColor: selected === texture ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            >
              {texture}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue173({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          What sound is silence?
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('ringing'); onComplete?.({ sound: 'ringing', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Ringing</button>
          <button onClick={() => { setAnswer('hum'); onComplete?.({ sound: 'hum', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Low hum</button>
          <button onClick={() => { setAnswer('breathing'); onComplete?.({ sound: 'breathing', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>My breathing</button>
          <button onClick={() => { setAnswer('nothing'); onComplete?.({ sound: 'nothing', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>True silence</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue174({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Memory has a smell
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('yes'); onComplete?.({ answer: 'yes', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes, I smell it</button>
          <button onClick={() => { setAnswer('faint'); onComplete?.({ answer: 'faint', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Faint trace</button>
          <button onClick={() => { setAnswer('no'); onComplete?.({ answer: 'no', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No smell</button>
          <button onClick={() => { setAnswer('overwhelming'); onComplete?.({ answer: 'overwhelming', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Overwhelming</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue175({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Touch without contact
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('possible'); onComplete?.({ answer: 'possible', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>It is possible</button>
          <button onClick={() => { setAnswer('impossible'); onComplete?.({ answer: 'impossible', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Impossible</button>
          <button onClick={() => { setAnswer('feel-it'); onComplete?.({ answer: 'feel-it', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I feel it now</button>
          <button onClick={() => { setAnswer('energy'); onComplete?.({ answer: 'energy', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Energy field</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue176({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [colors, setColors] = useState<string[]>([]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          With eyes closed, what do you see?
        </div>
        <div className="space-y-3">
          {['Black', 'Purple', 'Patterns', 'Light', 'Memories', 'Nothing'].map(option => (
            <button
              key={option}
              onClick={() => {
                onComplete?.({ see: option, timestamp: Date.now() });
                setTimeout(() => onExit?.(), 1000);
              }}
              className="w-full p-5"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue177({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [volume, setVolume] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Volume of your thoughts
        </div>
        <motion.div
          animate={{ scale: 0.5 + (volume / 100) }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB', opacity: 0.3 + (volume / 150) }}
        />
        <div className="text-6xl text-center" style={{ color: '#5739FB' }}>{volume}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ thoughtVolume: volume, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This loud
        </button>
      </div>
    </div>
  );
}

export function NaviCue178({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Feel what is invisible
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('yes'); onComplete?.({ answer: 'yes', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I feel it</button>
          <button onClick={() => { setAnswer('trying'); onComplete?.({ answer: 'trying', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Trying to feel</button>
          <button onClick={() => { setAnswer('no'); onComplete?.({ answer: 'no', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Cannot feel it</button>
          <button onClick={() => { setAnswer('always'); onComplete?.({ answer: 'always', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Always feel it</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue179({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Sense what is absent
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('yes'); onComplete?.({ answer: 'yes', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes</button>
          <button onClick={() => { setAnswer('no'); onComplete?.({ answer: 'no', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No</button>
          <button onClick={() => { setAnswer('paradox'); onComplete?.({ answer: 'paradox', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>This is a paradox</button>
          <button onClick={() => { setAnswer('only-way'); onComplete?.({ answer: 'only-way', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>The only way to sense</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue180({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [synesthesia, setSynesthesia] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          This moment tastes like
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Blue', 'Wednesday', 'Sharp', 'Velvet', 'C minor', 'Rain', 'Copper', 'Midnight'].map(option => (
            <button
              key={option}
              onClick={() => {
                setSynesthesia(option);
                onComplete?.({ synesthesia: option, timestamp: Date.now() });
                setTimeout(() => onExit?.(), 1000);
              }}
              className="p-6 aspect-square flex items-center justify-center text-center"
              style={{
                backgroundColor: synesthesia === option ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// BATCH 19: QUANTUM & UNCERTAINTY (NaviCues 181-190)

export function NaviCue181({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [state, setState] = useState<'both' | 'and' | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          You are both
        </div>
        <div className="flex gap-8 justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-32 h-32 rounded-full cursor-pointer"
            style={{ backgroundColor: '#5739FB', opacity: 0.5 }}
            onClick={() => {
              setState('both');
              onComplete?.({ state: 'both-and', timestamp: Date.now() });
              setTimeout(() => onExit?.(), 1000);
            }}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-32 h-32 rounded-full cursor-pointer"
            style={{ backgroundColor: '#FF00FF', opacity: 0.5 }}
            onClick={() => {
              setState('and');
              onComplete?.({ state: 'both-and', timestamp: Date.now() });
              setTimeout(() => onExit?.(), 1000);
            }}
          />
        </div>
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          and
        </div>
      </div>
    </div>
  );
}

export function NaviCue182({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [superposition, setSuperposition] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  
  const handleCollapse = () => {
    setSuperposition(false);
    const collapsed = Math.random() > 0.5 ? 'A' : 'B';
    setResult(collapsed);
    onComplete?.({ collapsed, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {superposition ? 'Superposition' : `Collapsed to ${result}`}
        </div>
        <motion.div
          animate={superposition ? { opacity: [0.3, 1, 0.3] } : {}}
          transition={{ duration: 1, repeat: superposition ? Infinity : 0 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: result === 'A' ? '#5739FB' : result === 'B' ? '#FF00FF' : '#7F00FF' }}
        />
        {superposition && (
          <button
            onClick={handleCollapse}
            className="px-12 py-6"
            style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
          >
            Observe
          </button>
        )}
      </div>
    </div>
  );
}

export function NaviCue183({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          The wave collapses when you look
        </div>
        <motion.div
          animate={!collapsed ? { scaleX: [1, 1.5, 1], scaleY: [1, 0.7, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: collapsed ? 0 : Infinity }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            setCollapsed(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {collapsed ? 'Collapsed' : 'Look'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue184({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [observed, setObserved] = useState(false);
  const [state] = useState(Math.random() > 0.5 ? 'exists' : 'does-not-exist');
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Uncertain until observed
        </div>
        <motion.div
          animate={{ opacity: observed ? (state === 'exists' ? 1 : 0) : 0.5 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            setObserved(true);
            onComplete?.({ state, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {observed ? (state === 'exists' ? 'It exists' : 'It does not exist') : 'Observe'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue185({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [probability, setProbability] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Probability of existence
        </div>
        <motion.div
          animate={{ opacity: probability / 100 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <div className="text-6xl text-center" style={{ color: '#5739FB' }}>{probability}%</div>
        <input
          type="range"
          min="0"
          max="100"
          value={probability}
          onChange={(e) => setProbability(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ probability, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Lock probability
        </button>
      </div>
    </div>
  );
}

export function NaviCue186({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [state] = useState(Math.random() > 0.5);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {opened ? (state ? 'Alive' : 'Dead') : 'Schrödinger'}
        </div>
        <motion.div
          animate={!opened ? { opacity: [0.3, 1, 0.3] } : {}}
          transition={{ duration: 1, repeat: opened ? 0 : Infinity }}
          className="w-48 h-48 mx-auto"
          style={{ 
            backgroundColor: opened ? (state ? '#00FF00' : '#000000') : '#5739FB',
            border: '2px solid #5739FB',
          }}
        />
        <button
          onClick={() => {
            setOpened(true);
            onComplete?.({ state: state ? 'alive' : 'dead', timestamp: Date.now() });
            setTimeout(() => onExit?.(), 2000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {opened ? 'Observed' : 'Open box'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue187({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [entangled, setEntangled] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Entanglement
        </div>
        <div className="flex gap-32 justify-center">
          <motion.div
            animate={entangled ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 0.5, repeat: entangled ? Infinity : 0 }}
            className="w-32 h-32 rounded-full"
            style={{ backgroundColor: '#5739FB' }}
          />
          <motion.div
            animate={entangled ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 0.5, repeat: entangled ? Infinity : 0 }}
            className="w-32 h-32 rounded-full"
            style={{ backgroundColor: '#5739FB' }}
          />
        </div>
        <button
          onClick={() => {
            setEntangled(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 3000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {entangled ? 'Entangled' : 'Entangle'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue188({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [observed, setObserved] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          You changed it by looking
        </div>
        <motion.div
          animate={observed ? { 
            backgroundColor: ['#5739FB', '#FF0000'],
            scale: [1, 1.5, 1],
          } : {}}
          transition={{ duration: 1 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            setObserved(true);
            onComplete?.({ observerEffect: true, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {observed ? 'Changed' : 'Observe'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue189({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [leaped, setLeaped] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Quantum leap
        </div>
        <motion.div
          animate={leaped ? { 
            x: [0, -200, 200, 0],
            y: [0, -100, -100, 0],
            opacity: [1, 0, 0, 1],
          } : {}}
          transition={{ duration: 1 }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            setLeaped(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {leaped ? 'Leaped' : 'Leap'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue190({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [uncertainty, setUncertainty] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Heisenberg uncertainty
        </div>
        <motion.div
          animate={{ 
            x: [-uncertainty, uncertainty, -uncertainty],
            y: [-uncertainty/2, uncertainty/2, -uncertainty/2],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB', opacity: 1 - (uncertainty / 200) }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={uncertainty}
          onChange={(e) => setUncertainty(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ uncertainty, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {uncertainty === 100 ? 'Maximum uncertainty' : `${uncertainty}% uncertain`}
        </button>
      </div>
    </div>
  );
}

// BATCH 20: VOID & ABSENCE (NaviCues 191-200)

export function NaviCue191({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          What is missing?
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('everything'); onComplete?.({ answer: 'everything', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Everything</button>
          <button onClick={() => { setAnswer('something'); onComplete?.({ answer: 'something', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Something I cannot name</button>
          <button onClick={() => { setAnswer('nothing'); onComplete?.({ answer: 'nothing', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing is missing</button>
          <button onClick={() => { setAnswer('myself'); onComplete?.({ answer: 'myself', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I am</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue192({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [presence, setPresence] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Absence has presence
        </div>
        <motion.div
          animate={{ opacity: 1 - (presence / 100) }}
          className="w-48 h-48 mx-auto"
          style={{ backgroundColor: '#FFFFFF', border: '2px solid #5739FB' }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={presence}
          onChange={(e) => setPresence(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ absencePresence: presence, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This present
        </button>
      </div>
    </div>
  );
}

export function NaviCue193({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [percentage, setPercentage] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How much is negative space?
        </div>
        <div className="w-full h-96 relative" style={{ backgroundColor: '#5739FB' }}>
          <motion.div
            animate={{ height: `${percentage}%` }}
            className="absolute bottom-0 w-full"
            style={{ backgroundColor: '#0A0B0F' }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={(e) => setPercentage(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ negativeSpace: percentage, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {percentage}% negative
        </button>
      </div>
    </div>
  );
}

export function NaviCue194({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          The void is
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('empty'); onComplete?.({ quality: 'empty', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Empty</button>
          <button onClick={() => { setAnswer('full'); onComplete?.({ quality: 'full', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Full</button>
          <button onClick={() => { setAnswer('potential'); onComplete?.({ quality: 'potential', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Pure potential</button>
          <button onClick={() => { setAnswer('home'); onComplete?.({ quality: 'home', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Home</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue195({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [text, setText] = useState('');
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Describe nothing
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-6 text-center bg-transparent text-white border-b-2"
          style={{ borderColor: '#5739FB', outline: 'none' }}
        />
        <button
          onClick={() => {
            onComplete?.({ description: text, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Submit nothing
        </button>
      </div>
    </div>
  );
}

export function NaviCue196({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [awareness, setAwareness] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Aware of what is lacking
        </div>
        <motion.div
          animate={{ scale: awareness / 50 }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: 'transparent', border: `${awareness / 10}px solid #5739FB` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={awareness}
          onChange={(e) => setAwareness(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ lackAwareness: awareness, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This aware
        </button>
      </div>
    </div>
  );
}

export function NaviCue197({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [gap, setGap] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          The gap that defines
        </div>
        <div className="flex justify-center items-center" style={{ gap: `${gap * 3}px` }}>
          <div className="w-32 h-32" style={{ backgroundColor: '#5739FB' }} />
          <div className="w-32 h-32" style={{ backgroundColor: '#5739FB' }} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={gap}
          onChange={(e) => setGap(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ gapSize: gap, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This gap
        </button>
      </div>
    </div>
  );
}

export function NaviCue198({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [emptiness, setEmptiness] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Measure the hollow
        </div>
        <div className="w-full h-96 relative" style={{ border: '2px solid #5739FB' }}>
          <motion.div
            animate={{ height: `${100 - emptiness}%` }}
            className="absolute bottom-0 w-full"
            style={{ backgroundColor: '#5739FB' }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={emptiness}
          onChange={(e) => setEmptiness(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ hollowness: emptiness, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {emptiness}% hollow
        </button>
      </div>
    </div>
  );
}

export function NaviCue199({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [antimatter, setAntimatter] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: antimatter ? '#FFFFFF' : '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: antimatter ? '#0A0B0F' : '#FFFFFF' }}>
          {antimatter ? 'Anti-matter' : 'Matter'}
        </div>
        <motion.div
          animate={antimatter ? { scale: [1, 0, 1], backgroundColor: ['#5739FB', '#FFFFFF', '#000000'] } : {}}
          transition={{ duration: 1 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: antimatter ? '#000000' : '#5739FB' }}
        />
        <button
          onClick={() => {
            setAntimatter(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: antimatter ? '#000000' : '#5739FB', color: '#FFFFFF' }}
        >
          Invert
        </button>
      </div>
    </div>
  );
}

export function NaviCue200({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-3xl" style={{ color: '#FFFFFF' }}>
          {revealed ? 'You completed 200 NaviCues' : '200'}
        </div>
        <button
          onClick={() => {
            setRevealed(true);
            onComplete?.({ completed200: true, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 3000);
          }}
          className="px-12 py-6 text-xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {revealed ? 'The journey continues...' : 'Final NaviCue'}
        </button>
      </div>
    </div>
  );
}
