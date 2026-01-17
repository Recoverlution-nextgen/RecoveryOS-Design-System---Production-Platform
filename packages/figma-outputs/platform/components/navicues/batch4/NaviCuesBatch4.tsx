import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// BATCH 4: RHYTHM AND SOUND

export function NaviCue31({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [taps, setTaps] = useState<number[]>([]);
  const [started, setStarted] = useState(false);

  const handleTap = () => {
    if (!started) setStarted(true);
    setTaps([...taps, Date.now()]);
    if (taps.length >= 4) {
      onComplete?.({ rhythm: taps, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Tap your heartbeat
        </div>
        <motion.button
          onClick={handleTap}
          whileTap={{ scale: 0.9 }}
          className="w-48 h-48 rounded-full text-3xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {taps.length}/5
        </motion.button>
      </div>
    </div>
  );
}

export function NaviCue32({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [speed, setSpeed] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2 / speed, repeat: Infinity }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ speed, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This is my pace
        </button>
      </div>
    </div>
  );
}

export function NaviCue33({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicks, setClicks] = useState(0);
  const [pattern, setPattern] = useState<'fast' | 'slow' | 'irregular'>('fast');

  useEffect(() => {
    if (clicks >= 10) {
      onComplete?.({ pattern, clicks, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  }, [clicks, pattern, onComplete, onExit]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Click until it feels complete
        </div>
        <button
          onClick={() => setClicks(clicks + 1)}
          className="w-32 h-32 rounded-full text-2xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {clicks}
        </button>
      </div>
    </div>
  );
}

export function NaviCue34({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [held, setHeld] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (held) {
      interval = setInterval(() => setDuration(d => d + 100), 100);
    } else if (duration > 0) {
      onComplete?.({ heldMs: duration, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
    return () => clearInterval(interval);
  }, [held, duration, onComplete, onExit]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Hold for one breath
        </div>
        <motion.div
          onMouseDown={() => setHeld(true)}
          onMouseUp={() => setHeld(false)}
          onTouchStart={() => setHeld(true)}
          onTouchEnd={() => setHeld(false)}
          animate={{ scale: held ? 1.3 : 1 }}
          className="w-48 h-48 mx-auto rounded-full cursor-pointer flex items-center justify-center text-2xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {held ? `${(duration / 1000).toFixed(1)}s` : 'Hold'}
        </motion.div>
      </div>
    </div>
  );
}

export function NaviCue35({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (a: string) => {
    setAnswer(a);
    onComplete?.({ answer: a, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Silence is
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('peaceful')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Peaceful</button>
          <button onClick={() => handleAnswer('uncomfortable')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Uncomfortable</button>
          <button onClick={() => handleAnswer('lonely')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Lonely</button>
          <button onClick={() => handleAnswer('full')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Full</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue36({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [intensity, setIntensity] = useState(50);
  const [pulsing, setPulsing] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8">
        {pulsing && (
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 - (intensity / 50), repeat: Infinity }}
            className="w-48 h-48 mx-auto rounded-full"
            style={{ backgroundColor: '#5739FB' }}
          />
        )}
        <input
          type="range"
          min="1"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            setPulsing(false);
            onComplete?.({ intensity, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export function NaviCue37({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoice = (c: string) => {
    setChoice(c);
    onComplete?.({ choice: c, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Your inner voice sounds like
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleChoice('whisper')} className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>A whisper</button>
          <button onClick={() => handleChoice('shout')} className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>A shout</button>
          <button onClick={() => handleChoice('hum')} className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>A hum</button>
          <button onClick={() => handleChoice('static')} className="p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Static</button>
          <button onClick={() => handleChoice('silence')} className="p-6 col-span-2" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Silence</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue38({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [beats, setBeats] = useState(0);

  const handleBeat = () => {
    const newBeats = beats + 1;
    setBeats(newBeats);
    if (newBeats >= 8) {
      onComplete?.({ beats: newBeats, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Create a pattern
        </div>
        <motion.button
          onClick={handleBeat}
          whileTap={{ scale: 1.5, backgroundColor: '#FFFFFF' }}
          className="w-40 h-40 rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {beats}/8
        </div>
      </div>
    </div>
  );
}

export function NaviCue39({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaited(true);
      onComplete?.({ waited: true, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 1500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete, onExit]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-3xl"
        style={{ color: '#5739FB' }}
      >
        {waited ? 'The silence spoke' : '...'}
      </motion.div>
    </div>
  );
}

export function NaviCue40({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAnswer = (a: string) => {
    setAnswer(a);
    onComplete?.({ answer: a, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          What do you hear when no one is speaking?
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('everything')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Everything</button>
          <button onClick={() => handleAnswer('nothing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing</button>
          <button onClick={() => handleAnswer('myself')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Myself</button>
          <button onClick={() => handleAnswer('the-world')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>The world</button>
        </div>
      </div>
    </div>
  );
}
