import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function NaviCue11({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => setSeconds(s => s + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [started]);

  const handleStop = () => {
    onComplete?.({ secondsWaited: seconds, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        {!started ? (
          <>
            <div className="text-2xl" style={{ color: '#FFFFFF' }}>
              How long is now?
            </div>
            <button
              onClick={() => setStarted(true)}
              className="px-8 py-4"
              style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
            >
              Start
            </button>
          </>
        ) : (
          <>
            <div className="text-6xl" style={{ color: '#5739FB' }}>
              {seconds}
            </div>
            <button
              onClick={handleStop}
              className="px-8 py-4"
              style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
            >
              Now ended
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function NaviCue12({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoice = (c: string) => {
    setChoice(c);
    onComplete?.({ choice: c, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-xl space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          When you worry about the future
        </div>
        <div className="space-y-3">
          <button onClick={() => handleChoice('past')} className="w-full p-5 text-left" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>
            You are living in the past
          </button>
          <button onClick={() => handleChoice('present')} className="w-full p-5 text-left" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>
            You are living in the present
          </button>
          <button onClick={() => handleChoice('nowhere')} className="w-full p-5 text-left" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>
            You are living nowhere
          </button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue13({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [reversed, setReversed] = useState(false);

  const handleToggle = () => {
    const newState = !reversed;
    setReversed(newState);
    if (newState) {
      onComplete?.({ reversed: true, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          What if time ran backwards?
        </div>
        <motion.button
          onClick={handleToggle}
          animate={{ rotate: reversed ? 180 : 0 }}
          transition={{ duration: 1 }}
          className="w-32 h-32 mx-auto rounded-full text-4xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          ⟲
        </motion.button>
      </div>
    </div>
  );
}

export function NaviCue14({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicked, setClicked] = useState(false);
  const [delay] = useState(Math.random() * 3000 + 1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clicked) {
        onComplete?.({ tooSlow: true, timestamp: Date.now() });
        onExit?.();
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [clicked, delay, onComplete, onExit]);

  const handleClick = () => {
    setClicked(true);
    onComplete?.({ tooSlow: false, reactedIn: delay, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <button
        onClick={handleClick}
        disabled={clicked}
        className="text-2xl px-12 py-6"
        style={{ backgroundColor: clicked ? 'rgba(87, 57, 251, 0.3)' : '#5739FB', color: '#FFFFFF' }}
      >
        Before it is too late
      </button>
    </div>
  );
}

export function NaviCue15({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Yesterday you were different
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('yes')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes</button>
          <button onClick={() => handleAnswer('no')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No</button>
          <button onClick={() => handleAnswer('always-different')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Always different</button>
          <button onClick={() => handleAnswer('never-different')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Never different</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue16({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= 5) {
      onComplete?.({ clicks: newCount, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          This moment will never return
        </div>
        <button
          onClick={handleClick}
          className="w-40 h-40 rounded-full text-3xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {count}
        </button>
      </div>
    </div>
  );
}

export function NaviCue17({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoice = (c: string) => {
    setChoice(c);
    onComplete?.({ choice: c, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl space-y-12">
        <div className="text-3xl text-center" style={{ color: '#FFFFFF' }}>
          What age do you feel right now?
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button onClick={() => handleChoice('child')} className="p-6 aspect-square flex items-center justify-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Child</button>
          <button onClick={() => handleChoice('teen')} className="p-6 aspect-square flex items-center justify-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Teen</button>
          <button onClick={() => handleChoice('adult')} className="p-6 aspect-square flex items-center justify-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Adult</button>
          <button onClick={() => handleChoice('elder')} className="p-6 aspect-square flex items-center justify-center" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Elder</button>
          <button onClick={() => handleChoice('all')} className="p-6 aspect-square flex items-center justify-center col-span-2" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>All at once</button>
          <button onClick={() => handleChoice('none')} className="p-6 aspect-square flex items-center justify-center col-span-2" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Ageless</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue18({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [committed, setCommitted] = useState(false);

  const handleCommit = () => {
    setCommitted(true);
    onComplete?.({ timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          You cannot go back
        </div>
        <button
          onClick={handleCommit}
          disabled={committed}
          className="px-12 py-6 text-lg"
          style={{ backgroundColor: committed ? 'rgba(87, 57, 251, 0.3)' : '#5739FB', color: '#FFFFFF' }}
        >
          {committed ? 'Gone' : 'Continue anyway'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue19({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          When does the future become the past?
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('now')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Now</button>
          <button onClick={() => handleAnswer('never')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Never</button>
          <button onClick={() => handleAnswer('always')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Always</button>
          <button onClick={() => handleAnswer('no-difference')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>There is no difference</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue20({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete?.({ watchedCountdown: true, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  }, [seconds, onComplete, onExit]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-9xl"
          style={{ color: '#5739FB' }}
        >
          {seconds}
        </motion.div>
      </div>
    </div>
  );
}
