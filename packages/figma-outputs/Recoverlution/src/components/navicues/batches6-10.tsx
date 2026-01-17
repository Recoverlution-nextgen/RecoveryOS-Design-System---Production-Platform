import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// BATCH 6: CONTRADICTION & PARADOX (NaviCues 51-60)

export function NaviCue51({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          You are most yourself when you are
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('alone')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Alone</button>
          <button onClick={() => handleAnswer('with-others')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>With others</button>
          <button onClick={() => handleAnswer('performing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Performing</button>
          <button onClick={() => handleAnswer('no-self')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>There is no self</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue52({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicks, setClicks] = useState(0);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          The more you try, the less it works
        </div>
        <button
          onClick={() => {
            const newClicks = clicks + 1;
            setClicks(newClicks);
            if (newClicks >= 5) {
              onComplete?.({ clicks: newClicks, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }
          }}
          className="px-12 py-6 text-xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF', opacity: 1 - (clicks * 0.15) }}
        >
          Try ({clicks}/5)
        </button>
      </div>
    </div>
  );
}

export function NaviCue53({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          To find it, you must stop looking
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('found')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I found it</button>
          <button onClick={() => handleAnswer('still-looking')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Still looking</button>
          <button onClick={() => handleAnswer('stopped')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I stopped</button>
          <button onClick={() => handleAnswer('never-lost')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>It was never lost</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue54({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {revealed ? 'The answer was the question' : 'Click for the answer'}
        </div>
        <button
          onClick={() => {
            if (!revealed) {
              setRevealed(true);
              onComplete?.({ timestamp: Date.now() });
              setTimeout(() => onExit?.(), 2000);
            }
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {revealed ? '?' : 'Reveal'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue55({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          You are both the problem and the solution
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('yes')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes</button>
          <button onClick={() => handleAnswer('no')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No</button>
          <button onClick={() => handleAnswer('neither')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Neither</button>
          <button onClick={() => handleAnswer('both')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Both</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue56({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [chose, setChose] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Choose not to choose
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
          {chose ? 'You chose' : 'Choose'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue57({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          The only way out is through, but there is nothing to get through
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('through')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Go through</button>
          <button onClick={() => handleAnswer('stay')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Stay here</button>
          <button onClick={() => handleAnswer('already-through')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Already through</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue58({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        onClick={() => {
          if (!flipped) {
            setFlipped(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }
        }}
        className="w-64 h-64 flex items-center justify-center text-2xl cursor-pointer"
        style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
      >
        {flipped ? 'Same side' : 'Flip to other side'}
      </motion.div>
    </div>
  );
}

export function NaviCue59({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          What you resist persists, but what you accept controls you
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('resist')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Resist</button>
          <button onClick={() => handleAnswer('accept')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Accept</button>
          <button onClick={() => handleAnswer('neither')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Neither</button>
          <button onClick={() => handleAnswer('observe')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Just observe</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue60({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [cycles, setCycles] = useState(0);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          To escape the loop, complete the loop
        </div>
        <motion.button
          onClick={() => {
            const newCycles = cycles + 1;
            setCycles(newCycles);
            if (newCycles >= 3) {
              onComplete?.({ cycles: newCycles, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }
          }}
          animate={{ rotate: cycles * 360 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 rounded-full text-2xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {cycles}/3
        </motion.button>
      </div>
    </div>
  );
}

// BATCH 7: MEMORY & FORGETTING (NaviCues 61-70)

export function NaviCue61({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [text, setText] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Type something you want to forget
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 bg-transparent text-white border-b-2"
          style={{ borderColor: '#5739FB', outline: 'none' }}
        />
        <motion.button
          onClick={() => {
            onComplete?.({ forgot: text, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Forget
        </motion.button>
      </div>
    </div>
  );
}

export function NaviCue62({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          The first thing you remember today
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('waking')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Waking up</button>
          <button onClick={() => handleAnswer('feeling')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>A feeling</button>
          <button onClick={() => handleAnswer('face')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>A face</button>
          <button onClick={() => handleAnswer('nothing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing specific</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue63({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const memories = ['Childhood', 'Last year', 'Yesterday', 'This morning', 'Just now'];
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Which memory feels most real?
        </div>
        <div className="space-y-3">
          {memories.map(m => (
            <button
              key={m}
              onClick={() => {
                setSelected(m);
                onComplete?.({ memory: m, timestamp: Date.now() });
                setTimeout(() => onExit?.(), 1000);
              }}
              className="w-full p-5"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue64({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [fading, setFading] = useState(100);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF', opacity: fading / 100 }}>
          Let it fade
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={fading}
          onChange={(e) => setFading(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ fadedTo: fading, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF', opacity: fading / 100 }}
        >
          Gone
        </button>
      </div>
    </div>
  );
}

export function NaviCue65({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [showWord, setShowWord] = useState(true);
  const word = 'remember this';
  
  useEffect(() => {
    const timer = setTimeout(() => setShowWord(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      {showWord ? (
        <div className="text-4xl" style={{ color: '#5739FB' }}>
          {word}
        </div>
      ) : (
        <button
          onClick={() => {
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="px-12 py-6 text-xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          It is gone
        </button>
      )}
    </div>
  );
}

export function NaviCue66({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          What you remember most is
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('joy')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Joy</button>
          <button onClick={() => handleAnswer('pain')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Pain</button>
          <button onClick={() => handleAnswer('nothing-special')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing special</button>
          <button onClick={() => handleAnswer('everything')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Everything</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue67({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [rewrites, setRewrites] = useState(0);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Every time you remember, you rewrite
        </div>
        <button
          onClick={() => {
            const newRewrites = rewrites + 1;
            setRewrites(newRewrites);
            if (newRewrites >= 5) {
              onComplete?.({ rewrites: newRewrites, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }
          }}
          className="px-12 py-6 text-xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Rewrite ({rewrites}/5)
        </button>
      </div>
    </div>
  );
}

export function NaviCue68({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          A memory you wish you could forget
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('yes')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes, I have one</button>
          <button onClick={() => handleAnswer('many')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I have many</button>
          <button onClick={() => handleAnswer('no')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No</button>
          <button onClick={() => handleAnswer('kept-me-alive')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>It kept me alive</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue69({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clarity, setClarity] = useState(50);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF', filter: `blur(${(100 - clarity) / 20}px)` }}>
          How clear is your memory?
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={clarity}
          onChange={(e) => setClarity(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ clarity, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This clear
        </button>
      </div>
    </div>
  );
}

export function NaviCue70({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Tomorrow you will remember this moment as
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('important')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Important</button>
          <button onClick={() => handleAnswer('strange')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Strange</button>
          <button onClick={() => handleAnswer('forgotten')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Already forgotten</button>
          <button onClick={() => handleAnswer('beginning')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>The beginning</button>
        </div>
      </div>
    </div>
  );
}

// BATCH 8: SPEED & SLOWNESS (NaviCues 71-80)

export function NaviCue71({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  const handleAnswer = (a: string) => {
    setAnswer(a);
    onComplete?.({ answer: a, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 200);
  };
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-4">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>Quick</div>
        <div className="space-y-2">
          <button onClick={() => handleAnswer('yes')} className="w-full p-3" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes</button>
          <button onClick={() => handleAnswer('no')} className="w-full p-3" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue72({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [waited, setWaited] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaited(true);
      onComplete?.({ timestamp: Date.now() });
      setTimeout(() => onExit?.(), 1000);
    }, 10000);
    return () => clearTimeout(timer);
  }, [onComplete, onExit]);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-2xl" style={{ color: '#5739FB' }}>
        {waited ? 'Time moved' : 'Wait...'}
      </div>
    </div>
  );
}

export function NaviCue73({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicks, setClicks] = useState(0);
  const [startTime] = useState(Date.now());
  
  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 10) {
      const elapsed = Date.now() - startTime;
      onComplete?.({ clicks: newClicks, elapsedMs: elapsed, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          As fast as you can
        </div>
        <button
          onClick={handleClick}
          className="w-32 h-32 rounded-full text-2xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {clicks}/10
        </button>
      </div>
    </div>
  );
}

export function NaviCue74({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [speed, setSpeed] = useState(1);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8">
        <motion.div
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 5 / speed, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <input
          type="range"
          min="0.1"
          max="5"
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
          This is my speed
        </button>
      </div>
    </div>
  );
}

export function NaviCue75({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          When you slow down, you feel
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('peaceful')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Peaceful</button>
          <button onClick={() => handleAnswer('anxious')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Anxious</button>
          <button onClick={() => handleAnswer('bored')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Bored</button>
          <button onClick={() => handleAnswer('alive')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Alive</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue76({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-6xl" style={{ color: '#5739FB' }}>{seconds}</div>
        <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Seconds passing
        </div>
        <button
          onClick={() => {
            onComplete?.({ secondsWatched: seconds, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="px-8 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Enough
        </button>
      </div>
    </div>
  );
}

export function NaviCue77({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <motion.div
          animate={{ scale: paused ? 1 : [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: paused ? 0 : Infinity }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            if (!paused) {
              setPaused(true);
              onComplete?.({ timestamp: Date.now() });
              setTimeout(() => onExit?.(), 1000);
            }
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {paused ? 'Paused' : 'Pause'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue78({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Life is moving
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('too-fast')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Too fast</button>
          <button onClick={() => handleAnswer('too-slow')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Too slow</button>
          <button onClick={() => handleAnswer('just-right')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Just right</button>
          <button onClick={() => handleAnswer('not-moving')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Not moving at all</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue79({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [tempo, setTempo] = useState(60);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A B0F' }}>
      <div className="space-y-8">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 60 / tempo, repeat: Infinity }}
          className="w-24 h-24 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <div className="text-center text-2xl" style={{ color: '#FFFFFF' }}>{tempo} BPM</div>
        <input
          type="range"
          min="40"
          max="180"
          value={tempo}
          onChange={(e) => setTempo(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ tempo, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This is my rhythm
        </button>
      </div>
    </div>
  );
}

export function NaviCue80({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [rushed, setRushed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!rushed) {
        onComplete?.({ rushed: false, timestamp: Date.now() });
        onExit?.();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [rushed, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Do not rush
        </div>
        <button
          onClick={() => {
            setRushed(true);
            onComplete?.({ rushed: true, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          I rushed
        </button>
      </div>
    </div>
  );
}

// BATCH 9: EMPTY SPACE & NOTHING (NaviCues 81-90)

export function NaviCue81({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clicked) {
        onComplete?.({ clickedNothing: false, timestamp: Date.now() });
        onExit?.();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [clicked, onComplete, onExit]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center cursor-pointer" 
      style={{ backgroundColor: '#0A0B0F' }}
      onClick={() => {
        if (!clicked) {
          setClicked(true);
          onComplete?.({ clickedNothing: true, timestamp: Date.now() });
          setTimeout(() => onExit?.(), 800);
        }
      }}
    >
      <div className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
        Click nothing
      </div>
    </div>
  );
}

export function NaviCue82({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Empty space feels like
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('freedom')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Freedom</button>
          <button onClick={() => handleAnswer('void')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Void</button>
          <button onClick={() => handleAnswer('possibility')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Possibility</button>
          <button onClick={() => handleAnswer('nothing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue83({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [typed, setTyped] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Type nothing
        </div>
        <input
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          className="w-full p-4 bg-transparent text-white border-b-2"
          style={{ borderColor: '#5739FB', outline: 'none' }}
        />
        <button
          onClick={() => {
            onComplete?.({ typedNothing: typed === '', actuallyTyped: typed, timestamp: Date.now() });
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

export function NaviCue84({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [filled, setFilled] = useState(100);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Empty yourself
        </div>
        <div 
          className="w-full h-96 transition-all duration-300"
          style={{ 
            backgroundColor: '#5739FB',
            transform: `scaleY(${filled / 100})`,
            transformOrigin: 'bottom',
          }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={filled}
          onChange={(e) => setFilled(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ emptiness: 100 - filled, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This empty
        </button>
      </div>
    </div>
  );
}

export function NaviCue85({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.({ timestamp: Date.now() });
      onExit?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete, onExit]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div style={{ color: 'rgba(0, 0, 0, 0)' }}>.</div>
    </div>
  );
}

export function NaviCue86({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          What fills the void?
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('fear')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Fear</button>
          <button onClick={() => handleAnswer('peace')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Peace</button>
          <button onClick={() => handleAnswer('noise')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Noise</button>
          <button onClick={() => handleAnswer('nothing-fills-it')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing fills it</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue87({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [removed, setRemoved] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        {!removed && (
          <>
            <div className="text-2xl" style={{ color: '#FFFFFF' }}>
              Remove everything
            </div>
            <div className="w-64 h-64 mx-auto" style={{ backgroundColor: '#5739FB' }} />
          </>
        )}
        <button
          onClick={() => {
            if (!removed) {
              setRemoved(true);
              onComplete?.({ timestamp: Date.now() });
              setTimeout(() => onExit?.(), 1500);
            }
          }}
          className="px-12 py-6"
          style={{ backgroundColor: removed ? 'transparent' : '#5739FB', color: removed ? 'transparent' : '#FFFFFF' }}
        >
          {removed ? '' : 'Remove'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue88({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Nothing matters
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('terrifying')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Terrifying</button>
          <button onClick={() => handleAnswer('freeing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Freeing</button>
          <button onClick={() => handleAnswer('sad')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Sad</button>
          <button onClick={() => handleAnswer('everything-matters')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No, everything matters</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue89({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [gaps, setGaps] = useState(3);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="flex justify-center gap-4">
          {Array.from({ length: gaps }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-16"
              style={{ backgroundColor: '#5739FB' }}
            />
          ))}
        </div>
        <div className="text-center text-xl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          The space between
        </div>
        <input
          type="range"
          min="2"
          max="10"
          value={gaps}
          onChange={(e) => setGaps(parseInt(e.target.value))}
          className="w-96 mx-auto block"
        />
        <button
          onClick={() => {
            onComplete?.({ gaps, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full max-w-md mx-auto block p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          The gaps matter
        </button>
      </div>
    </div>
  );
}

export function NaviCue90({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Before something, there was
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('nothing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing</button>
          <button onClick={() => handleAnswer('everything')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Everything</button>
          <button onClick={() => handleAnswer('potential')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Potential</button>
          <button onClick={() => handleAnswer('always-was')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>It always was</button>
        </div>
      </div>
    </div>
  );
}

// BATCH 10: RELATIONSHIPS WITHOUT CONTEXT (NaviCues 91-100)

export function NaviCue91({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          The last person who saw you
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('really-saw')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Really saw me</button>
          <button onClick={() => handleAnswer('saw-surface')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Saw the surface</button>
          <button onClick={() => handleAnswer('saw-past')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Saw my past</button>
          <button onClick={() => handleAnswer('didnt-see')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Did not see me</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue92({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [distance, setDistance] = useState(50);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-full max-w-4xl px-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How close can someone get?
        </div>
        <div className="flex justify-center items-center" style={{ gap: `${distance * 2}px` }}>
          <div className="w-24 h-24 rounded-full" style={{ backgroundColor: '#5739FB' }} />
          <div className="w-24 h-24 rounded-full" style={{ backgroundColor: 'rgba(87, 57, 251, 0.5)' }} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ distance, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This close
        </button>
      </div>
    </div>
  );
}

export function NaviCue93({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          When someone leaves
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('relief')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Relief</button>
          <button onClick={() => handleAnswer('emptiness')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Emptiness</button>
          <button onClick={() => handleAnswer('freedom')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Freedom</button>
          <button onClick={() => handleAnswer('they-never-leave')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>They never really leave</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue94({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [walls, setWalls] = useState(5);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Walls between you and them
        </div>
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          {Array.from({ length: walls }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                border: '2px solid rgba(87, 57, 251, 0.5)',
                transform: `scale(${1 - i * 0.15})`,
              }}
            />
          ))}
          <div className="relative z-10 w-16 h-16 rounded-full" style={{ backgroundColor: '#5739FB' }} />
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={walls}
          onChange={(e) => setWalls(parseInt(e.target.value))}
          className="w-96 mx-auto block"
        />
        <button
          onClick={() => {
            onComplete?.({ walls, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full max-w-md mx-auto block p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {walls === 0 ? 'No walls' : `${walls} walls`}
        </button>
      </div>
    </div>
  );
}

export function NaviCue95({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Connection happens when
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('guards-down')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Guards are down</button>
          <button onClick={() => handleAnswer('seen')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>You feel seen</button>
          <button onClick={() => handleAnswer('speaking')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No one is speaking</button>
          <button onClick={() => handleAnswer('rare')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Rarely</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue96({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [mirror, setMirror] = useState(50);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          They reflect you
        </div>
        <div className="flex justify-center gap-8">
          <div className="w-32 h-32 rounded-full" style={{ backgroundColor: '#5739FB' }} />
          <div className="w-32 h-32 rounded-full" style={{ backgroundColor: '#5739FB', opacity: mirror / 100 }} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={mirror}
          onChange={(e) => setMirror(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ mirrorIntensity: mirror, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This much
        </button>
      </div>
    </div>
  );
}

export function NaviCue97({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          You need people
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('yes')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes</button>
          <button onClick={() => handleAnswer('no')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No</button>
          <button onClick={() => handleAnswer('sometimes')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Sometimes</button>
          <button onClick={() => handleAnswer('want-not-need')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Want, not need</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue98({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [threads, setThreads] = useState(3);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How many threads connect you?
        </div>
        <div className="w-96 h-64 mx-auto relative flex justify-between items-center px-12">
          <div className="w-16 h-16 rounded-full z-10" style={{ backgroundColor: '#5739FB' }} />
          {Array.from({ length: threads }).map((_, i) => (
            <div
              key={i}
              className="absolute left-12 right-12 h-0.5"
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.5)',
                top: `${30 + i * 20}%`,
              }}
            />
          ))}
          <div className="w-16 h-16 rounded-full z-10" style={{ backgroundColor: 'rgba(87, 57, 251, 0.5)' }} />
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={threads}
          onChange={(e) => setThreads(parseInt(e.target.value))}
          className="w-96 mx-auto block"
        />
        <button
          onClick={() => {
            onComplete?.({ threads, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full max-w-md mx-auto block p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {threads === 0 ? 'Disconnected' : `${threads} threads`}
        </button>
      </div>
    </div>
  );
}

export function NaviCue99({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          When they look at you, they see
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('who-i-am')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Who I am</button>
          <button onClick={() => handleAnswer('who-i-was')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Who I was</button>
          <button onClick={() => handleAnswer('who-they-want')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Who they want me to be</button>
          <button onClick={() => handleAnswer('themselves')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Themselves</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue100({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          The person who knows you best
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('knows-parts')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Knows parts</button>
          <button onClick={() => handleAnswer('knows-surface')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Knows the surface</button>
          <button onClick={() => handleAnswer('knows-all')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Knows me fully</button>
          <button onClick={() => handleAnswer('is-me')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Is me</button>
        </div>
      </div>
    </div>
  );
}
