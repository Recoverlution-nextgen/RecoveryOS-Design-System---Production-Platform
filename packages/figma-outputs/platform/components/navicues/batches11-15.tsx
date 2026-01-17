import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// BATCH 11: IDENTITY FRAGMENTS (NaviCues 101-110)

export function NaviCue101({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [text, setText] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Who are you without your name?
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type anything"
          className="w-full p-6 text-center text-xl bg-transparent text-white border-b-2"
          style={{ borderColor: '#5739FB', outline: 'none' }}
        />
        <button
          onClick={() => {
            onComplete?.({ response: text, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This is me
        </button>
      </div>
    </div>
  );
}

export function NaviCue102({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [age, setAge] = useState(25);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Choose your age
        </div>
        <div className="text-9xl text-center" style={{ color: '#5739FB' }}>
          {age}
        </div>
        <input
          type="range"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ chosenAge: age, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          I am {age}
        </button>
      </div>
    </div>
  );
}

export function NaviCue103({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [stage, setStage] = useState<'past' | 'meet'>('past');
  const [pastAge, setPastAge] = useState(10);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      {stage === 'past' ? (
        <div className="space-y-8 w-96">
          <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
            Your past self at age
          </div>
          <div className="text-7xl text-center" style={{ color: '#5739FB' }}>{pastAge}</div>
          <input
            type="range"
            min="1"
            max="80"
            value={pastAge}
            onChange={(e) => setPastAge(parseInt(e.target.value))}
            className="w-full"
          />
          <button
            onClick={() => setStage('meet')}
            className="w-full p-4"
            style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
          >
            Meet them
          </button>
        </div>
      ) : (
        <div className="max-w-lg space-y-8">
          <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
            What would you say to {pastAge} year old you?
          </div>
          <div className="space-y-3">
            <button onClick={() => { onComplete?.({ pastAge, message: 'sorry', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I am sorry</button>
            <button onClick={() => { onComplete?.({ pastAge, message: 'proud', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I am proud</button>
            <button onClick={() => { onComplete?.({ pastAge, message: 'thank-you', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Thank you</button>
            <button onClick={() => { onComplete?.({ pastAge, message: 'nothing', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing to say</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function NaviCue104({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Future you is watching this moment
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('wave'); onComplete?.({ answer: 'wave', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Wave at them</button>
          <button onClick={() => { setAnswer('ashamed'); onComplete?.({ answer: 'ashamed', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Feel ashamed</button>
          <button onClick={() => { setAnswer('proud'); onComplete?.({ answer: 'proud', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Make them proud</button>
          <button onClick={() => { setAnswer('same-person'); onComplete?.({ answer: 'same-person', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>We are the same person</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue105({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const traits = ['Kind', 'Smart', 'Funny', 'Strong', 'Creative', 'Loyal', 'Brave', 'Calm'];
  const [removed, setRemoved] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Remove one trait. You can never have it back.
        </div>
        <div className="grid grid-cols-4 gap-3">
          {traits.map(trait => (
            <button
              key={trait}
              onClick={() => {
                setRemoved(trait);
                onComplete?.({ removed: trait, timestamp: Date.now() });
                setTimeout(() => onExit?.(), 1000);
              }}
              className="p-4 aspect-square flex items-center justify-center text-center transition-all"
              style={{
                backgroundColor: removed === trait ? 'rgba(0, 0, 0, 0.5)' : 'rgba(87, 57, 251, 0.1)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: removed === trait ? 'rgba(255, 255, 255, 0.3)' : '#FFFFFF',
                textDecoration: removed === trait ? 'line-through' : 'none',
              }}
            >
              {trait}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue106({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const qualities = ['Courage', 'Wisdom', 'Peace', 'Power', 'Love', 'Freedom', 'Clarity', 'Purpose'];
  const [added, setAdded] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Add one quality. It becomes you forever.
        </div>
        <div className="grid grid-cols-4 gap-3">
          {qualities.map(quality => (
            <button
              key={quality}
              onClick={() => {
                setAdded(quality);
                onComplete?.({ added: quality, timestamp: Date.now() });
                setTimeout(() => onExit?.(), 1000);
              }}
              className="p-4 aspect-square flex items-center justify-center text-center transition-all"
              style={{
                backgroundColor: added === quality ? '#5739FB' : 'rgba(87, 57, 251, 0.1)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
                color: '#FFFFFF',
              }}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue107({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [count, setCount] = useState(1);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          How many versions of you exist right now?
        </div>
        <div className="text-9xl" style={{ color: '#5739FB' }}>{count}</div>
        <input
          type="range"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ versions: count, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {count === 1 ? 'One me' : `${count} versions`}
        </button>
      </div>
    </div>
  );
}

export function NaviCue108({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [percentage, setPercentage] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How much of you do you hide?
        </div>
        <div className="relative h-96 flex flex-col">
          <div className="flex-1" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }} />
          <div 
            className="transition-all duration-300"
            style={{ 
              height: `${percentage}%`,
              backgroundColor: '#5739FB',
            }}
          />
        </div>
        <div className="text-6xl text-center" style={{ color: '#5739FB' }}>{percentage}%</div>
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
            onComplete?.({ hiddenPercentage: percentage, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This much hidden
        </button>
      </div>
    </div>
  );
}

export function NaviCue109({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [essence, setEssence] = useState(100);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Strip away everything until only essence remains
        </div>
        <motion.div
          animate={{ 
            scale: essence / 100,
            opacity: Math.max(0.3, essence / 100),
          }}
          className="w-64 h-64 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <input
          type="range"
          min="1"
          max="100"
          value={essence}
          onChange={(e) => setEssence(parseInt(e.target.value))}
          className="w-96 mx-auto block"
        />
        <button
          onClick={() => {
            onComplete?.({ essenceLevel: essence, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This is core
        </button>
      </div>
    </div>
  );
}

export function NaviCue110({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [dissolved, setDissolved] = useState(0);
  
  useEffect(() => {
    if (dissolved >= 100) {
      onComplete?.({ timestamp: Date.now() });
      setTimeout(() => onExit?.(), 1500);
    }
  }, [dissolved, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <motion.div
          animate={{ opacity: 1 - (dissolved / 100) }}
          className="text-4xl"
          style={{ color: '#FFFFFF' }}
        >
          I am
        </motion.div>
        <input
          type="range"
          min="0"
          max="100"
          value={dissolved}
          onChange={(e) => setDissolved(parseInt(e.target.value))}
          className="w-96"
        />
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          {dissolved < 100 ? 'Dissolve identity' : 'Gone'}
        </div>
      </div>
    </div>
  );
}

// BATCH 12: CHOICE WITHOUT MEANING (NaviCues 111-120)

export function NaviCue111({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-16">
        <div className="text-6xl" style={{ color: '#FFFFFF' }}>A or B</div>
        <div className="flex gap-12">
          <button
            onClick={() => {
              setChoice('A');
              onComplete?.({ choice: 'A', timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }}
            className="w-40 h-40 text-6xl"
            style={{ backgroundColor: choice === 'A' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}
          >
            A
          </button>
          <button
            onClick={() => {
              setChoice('B');
              onComplete?.({ choice: 'B', timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }}
            className="w-40 h-40 text-6xl"
            style={{ backgroundColor: choice === 'B' ? '#5739FB' : 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}
          >
            B
          </button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue112({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [number, setNumber] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>Pick a number</div>
        <div className="text-9xl" style={{ color: '#5739FB' }}>{number}</div>
        <input
          type="range"
          min="1"
          max="100"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ number, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This one
        </button>
      </div>
    </div>
  );
}

export function NaviCue113({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="flex gap-8">
        <button
          onClick={() => {
            setChoice('left');
            onComplete?.({ choice: 'left', timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-64 h-96 text-2xl"
          style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}
        >
          ←
        </button>
        <button
          onClick={() => {
            setChoice('right');
            onComplete?.({ choice: 'right', timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-64 h-96 text-2xl"
          style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export function NaviCue114({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8">
        <div className="flex gap-8 justify-center">
          <button onClick={() => { setAnswer('yes'); onComplete?.({ answer: 'yes', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-48 h-48 text-4xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>Yes</button>
          <button onClick={() => { setAnswer('no'); onComplete?.({ answer: 'no', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-48 h-48 text-4xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>No</button>
          <button onClick={() => { setAnswer('maybe'); onComplete?.({ answer: 'maybe', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-48 h-48 text-4xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>Maybe</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue115({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>More or less?</div>
        <div className="space-y-4">
          <button onClick={() => { setChoice('more'); onComplete?.({ choice: 'more', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-96 p-8 text-3xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>More</button>
          <button onClick={() => { setChoice('less'); onComplete?.({ choice: 'less', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-96 p-8 text-3xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>Less</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue116({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [value, setValue] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>Higher or lower?</div>
        <div className="text-9xl" style={{ color: '#5739FB' }}>{value}</div>
        <div className="flex gap-8 justify-center">
          <button onClick={() => setValue(Math.max(0, value - 10))} className="w-32 h-32 text-4xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>↓</button>
          <button onClick={() => setValue(Math.min(100, value + 10))} className="w-32 h-32 text-4xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>↑</button>
        </div>
        <button onClick={() => { onComplete?.({ value, timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="px-12 py-4" style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}>Lock it</button>
      </div>
    </div>
  );
}

export function NaviCue117({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="flex gap-12">
        <button onClick={() => { setChoice('first'); onComplete?.({ choice: 'first', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-64 h-64 text-3xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>First</button>
        <button onClick={() => { setChoice('last'); onComplete?.({ choice: 'last', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-64 h-64 text-3xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>Last</button>
      </div>
    </div>
  );
}

export function NaviCue118({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>In or out?</div>
        <div className="space-y-6">
          <button onClick={() => { setChoice('in'); onComplete?.({ choice: 'in', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-96 p-8 text-3xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '4px solid #5739FB', color: '#FFFFFF' }}>In</button>
          <button onClick={() => { setChoice('out'); onComplete?.({ choice: 'out', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-96 p-8 text-3xl" style={{ backgroundColor: '#0A0B0F', border: '4px solid #5739FB', color: '#FFFFFF' }}>Out</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue119({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="flex gap-12">
        <button onClick={() => { setChoice('begin'); onComplete?.({ choice: 'begin', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-64 h-64 text-3xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>Begin</button>
        <button onClick={() => { setChoice('end'); onComplete?.({ choice: 'end', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-64 h-64 text-3xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>End</button>
      </div>
    </div>
  );
}

export function NaviCue120({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-16">
        <div className="text-3xl" style={{ color: '#FFFFFF' }}>All or none</div>
        <div className="flex gap-8 justify-center">
          <button onClick={() => { setChoice('all'); onComplete?.({ choice: 'all', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-80 h-80 text-6xl" style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}>All</button>
          <button onClick={() => { setChoice('none'); onComplete?.({ choice: 'none', timestamp: Date.now() }); setTimeout(() => onExit?.(), 800); }} className="w-80 h-80 text-6xl" style={{ backgroundColor: '#0A0B0F', border: '2px solid #5739FB', color: '#FFFFFF' }}>None</button>
        </div>
      </div>
    </div>
  );
}

// BATCH 13: PATTERN BREAKING (NaviCues 121-130)

export function NaviCue121({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicks, setClicks] = useState(0);
  const pattern = [1, 2, 3, 1, 2, 3, 1, 2];
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {clicks < 7 ? 'Follow the pattern' : 'Now break it'}
        </div>
        <motion.button
          onClick={() => {
            const newClicks = clicks + 1;
            setClicks(newClicks);
            if (newClicks >= 9) {
              onComplete?.({ clicksToBreak: newClicks, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }
          }}
          animate={{ scale: clicks < 7 ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: clicks < 7 ? Infinity : 0 }}
          className="w-48 h-48 rounded-full text-4xl"
          style={{ backgroundColor: clicks < 7 ? '#5739FB' : '#E74C3C', color: '#FFFFFF' }}
        >
          {clicks}
        </motion.button>
      </div>
    </div>
  );
}

export function NaviCue122({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Step {step} of 5
        </div>
        <button
          onClick={() => {
            if (step === 3) {
              onComplete?.({ skippedStep: 3, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            } else if (step < 5) {
              setStep(step + 1);
            }
          }}
          className="px-12 py-6 text-xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {step === 3 ? 'Skip this step' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue123({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [waited, setWaited] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.({ unexpected: true, timestamp: Date.now() });
      onExit?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-2xl" style={{ color: '#FFFFFF' }}>
        Wait for the button...
      </div>
    </div>
  );
}

export function NaviCue124({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [rule, setRule] = useState('Click when blue');
  const [color, setColor] = useState('#5739FB');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newRule = Math.random() > 0.5 ? 'Click when blue' : 'Do NOT click when blue';
      setRule(newRule);
      setColor(Math.random() > 0.5 ? '#5739FB' : '#E74C3C');
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-xl" style={{ color: '#FFFFFF' }}>{rule}</div>
        <button
          onClick={() => {
            onComplete?.({ rule, color, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-48 h-48 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function NaviCue125({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const sequence = [1, 2, 4, 8, 16, '?'];
  const [clickedOn, setClickedOn] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>What comes next?</div>
        <div className="flex gap-4">
          {sequence.map((num, i) => (
            <div key={i} className="w-20 h-20 flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>
              {num}
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-center">
          {[32, 31, 17, 'X'].map((answer) => (
            <button
              key={answer}
              onClick={() => {
                setClickedOn(String(answer));
                onComplete?.({ answer, timestamp: Date.now() });
                setTimeout(() => onExit?.(), 800);
              }}
              className="w-24 h-24 text-2xl"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue126({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [clicked, setClicked] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          This will do what you expect
        </div>
        <button
          onClick={() => {
            setClicked(true);
            onComplete?.({ expectedFailed: true, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 2000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {clicked ? 'Or did it?' : 'Click me'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue127({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [inverted, setInverted] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: inverted ? '#FFFFFF' : '#0A0B0F' }}>
      <button
        onClick={() => {
          setInverted(!inverted);
          if (inverted) {
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }
        }}
        className="px-12 py-6 text-xl"
        style={{ backgroundColor: inverted ? '#0A0B0F' : '#5739FB', color: inverted ? '#5739FB' : '#FFFFFF' }}
      >
        {inverted ? 'Everything inverted' : 'Invert everything'}
      </button>
    </div>
  );
}

export function NaviCue128({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const routine = ['Wake', 'Coffee', 'Work', 'Lunch', 'Work', 'Dinner', 'Sleep'];
  const [shattered, setShattered] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-2xl mb-8" style={{ color: '#FFFFFF' }}>Your routine</div>
        <motion.div
          animate={shattered ? { scale: [1, 2, 0], opacity: [1, 1, 0], rotate: [0, 180, 360] } : {}}
          transition={{ duration: 1 }}
          className="space-y-2"
        >
          {routine.map((item, i) => (
            <div key={i} className="p-3 text-lg" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', color: '#FFFFFF' }}>
              {item}
            </div>
          ))}
        </motion.div>
        <button
          onClick={() => {
            setShattered(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-4 mt-8"
          style={{ backgroundColor: '#E74C3C', color: '#FFFFFF' }}
        >
          Shatter it
        </button>
      </div>
    </div>
  );
}

export function NaviCue129({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [count, setCount] = useState(0);
  const expectedPattern = [1, 1, 2, 3, 5, 8, 13];
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-8">
        <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Expected: {count < expectedPattern.length ? expectedPattern[count] : '?'}
        </div>
        <div className="text-9xl" style={{ color: count < 5 ? '#5739FB' : '#E74C3C' }}>
          {count}
        </div>
        <button
          onClick={() => {
            const newCount = count + 1;
            setCount(newCount);
            if (newCount >= 7) {
              onComplete?.({ brokeAt: newCount, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }
          }}
          className="w-32 h-32 text-2xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          +1
        </button>
      </div>
    </div>
  );
}

export function NaviCue130({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [broken, setBroken] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <motion.div
          animate={broken ? { y: [0, -500], opacity: [1, 0] } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl"
          style={{ color: '#FFFFFF' }}
        >
          {broken ? 'Broken' : 'Predictable'}
        </motion.div>
        <button
          onClick={() => {
            setBroken(true);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1000);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Break prediction
        </button>
      </div>
    </div>
  );
}

// BATCH 14: SURRENDER MECHANICS (NaviCues 131-140)

export function NaviCue131({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [holding, setHolding] = useState(true);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          You are holding on
        </div>
        <motion.div
          animate={{ scale: holding ? 1 : 0, opacity: holding ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => {
            setHolding(false);
            onComplete?.({ timestamp: Date.now() });
            setTimeout(() => onExit?.(), 1500);
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Let go
        </button>
      </div>
    </div>
  );
}

export function NaviCue132({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [control, setControl] = useState(100);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Release control
        </div>
        <div className="relative h-96">
          <div
            className="absolute bottom-0 w-full transition-all duration-300"
            style={{
              height: `${control}%`,
              backgroundColor: '#5739FB',
            }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={control}
          onChange={(e) => setControl(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ controlReleased: 100 - control, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {control === 0 ? 'Fully released' : `${100 - control}% released`}
        </button>
      </div>
    </div>
  );
}

export function NaviCue133({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [trying, setTrying] = useState(true);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {trying ? 'You are trying' : 'You stopped'}
        </div>
        <button
          onClick={() => {
            if (trying) {
              setTrying(false);
              onComplete?.({ timestamp: Date.now() });
              setTimeout(() => onExit?.(), 1500);
            }
          }}
          className="px-12 py-6"
          style={{ backgroundColor: trying ? '#5739FB' : 'rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}
        >
          Stop trying
        </button>
      </div>
    </div>
  );
}

export function NaviCue134({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [allowed, setAllowed] = useState(false);
  
  useEffect(() => {
    if (allowed) {
      const timer = setTimeout(() => {
        onComplete?.({ timestamp: Date.now() });
        onExit?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [allowed, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          {allowed ? 'Allowing...' : 'Resisting'}
        </div>
        <button
          onClick={() => setAllowed(true)}
          disabled={allowed}
          className="px-12 py-6"
          style={{ backgroundColor: allowed ? 'rgba(87, 57, 251, 0.3)' : '#5739FB', color: '#FFFFFF' }}
        >
          Allow it
        </button>
      </div>
    </div>
  );
}

export function NaviCue135({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [wisdom, setWisdom] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Give up
        </div>
        <div className="space-y-3">
          <button onClick={() => { setWisdom('fight'); onComplete?.({ type: 'fight', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Give up the fight</button>
          <button onClick={() => { setWisdom('control'); onComplete?.({ type: 'control', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Give up control</button>
          <button onClick={() => { setWisdom('outcome'); onComplete?.({ type: 'outcome', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Give up the outcome</button>
          <button onClick={() => { setWisdom('everything'); onComplete?.({ type: 'everything', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Give up everything</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue136({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [acceptance, setAcceptance] = useState(0);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Acceptance
        </div>
        <motion.div
          animate={{ scale: 1 + (acceptance / 100) }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB', opacity: 0.3 + (acceptance / 150) }}
        />
        <div className="text-6xl text-center" style={{ color: '#5739FB' }}>{acceptance}%</div>
        <input
          type="range"
          min="0"
          max="100"
          value={acceptance}
          onChange={(e) => setAcceptance(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ acceptance, timestamp: Date.now() });
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

export function NaviCue137({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [inFlow, setInFlow] = useState(false);
  
  useEffect(() => {
    if (inFlow) {
      const timer = setTimeout(() => {
        onComplete?.({ timestamp: Date.now() });
        onExit?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [inFlow, onComplete, onExit]);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <motion.div
          animate={inFlow ? { x: [-50, 50, -50] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <button
          onClick={() => setInFlow(true)}
          disabled={inFlow}
          className="px-12 py-6"
          style={{ backgroundColor: inFlow ? 'rgba(87, 57, 251, 0.3)' : '#5739FB', color: '#FFFFFF' }}
        >
          {inFlow ? 'In flow...' : 'Enter flow'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue138({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [resistance, setResistance] = useState(100);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Feel the resistance fade
        </div>
        <motion.div
          animate={{ opacity: resistance / 100 }}
          className="w-full h-64"
          style={{ backgroundColor: '#E74C3C' }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={resistance}
          onChange={(e) => setResistance(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ resistanceLevel: resistance, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {resistance === 0 ? 'No resistance' : `${resistance}% resistance`}
        </button>
      </div>
    </div>
  );
}

export function NaviCue139({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [struggle, setStruggle] = useState(100);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How hard are you struggling?
        </div>
        <motion.div
          animate={{ rotate: struggle * 3.6, scale: 1 + (struggle / 100) }}
          className="w-32 h-32 mx-auto"
          style={{ backgroundColor: '#E74C3C' }}
        />
        <div className="text-6xl text-center" style={{ color: '#E74C3C' }}>{struggle}%</div>
        <input
          type="range"
          min="0"
          max="100"
          value={struggle}
          onChange={(e) => setStruggle(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ struggle, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {struggle === 0 ? 'No struggle' : 'Stop struggling'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue140({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [depth, setDepth] = useState(0);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Surrender depth
        </div>
        <div className="relative h-96" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)' }}>
          <motion.div
            animate={{ height: `${depth}%` }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 w-full"
            style={{ backgroundColor: '#5739FB' }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={depth}
          onChange={(e) => setDepth(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ surrenderDepth: depth, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {depth === 100 ? 'Complete surrender' : `${depth}% surrendered`}
        </button>
      </div>
    </div>
  );
}

// BATCH 15: MIRROR & REFLECTION (NaviCues 141-150)

export function NaviCue141({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          What reflects back at you?
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('truth'); onComplete?.({ answer: 'truth', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Truth</button>
          <button onClick={() => { setAnswer('lie'); onComplete?.({ answer: 'lie', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Lie</button>
          <button onClick={() => { setAnswer('fear'); onComplete?.({ answer: 'fear', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Fear</button>
          <button onClick={() => { setAnswer('nothing'); onComplete?.({ answer: 'nothing', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue142({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [layers, setLayers] = useState(1);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Seeing yourself seeing yourself
        </div>
        <div className="relative w-64 h-64 mx-auto">
          {Array.from({ length: layers }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: '#5739FB',
                transform: `scale(${1 - i * 0.2})`,
              }}
            />
          ))}
        </div>
        <div className="text-4xl" style={{ color: '#5739FB' }}>{layers} layers</div>
        <input
          type="range"
          min="1"
          max="10"
          value={layers}
          onChange={(e) => setLayers(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ layers, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export function NaviCue143({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [distortion, setDistortion] = useState(0);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Mirror distortion
        </div>
        <motion.div
          animate={{ scaleX: 1 + (distortion / 50), scaleY: 1 - (distortion / 100) }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={distortion}
          onChange={(e) => setDistortion(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ distortion, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This distorted
        </button>
      </div>
    </div>
  );
}

export function NaviCue144({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          The reflection tells the truth
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('yes'); onComplete?.({ answer: 'yes', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Yes</button>
          <button onClick={() => { setAnswer('no'); onComplete?.({ answer: 'no', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>No</button>
          <button onClick={() => { setAnswer('sometimes'); onComplete?.({ answer: 'sometimes', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Sometimes</button>
          <button onClick={() => { setAnswer('i-am-the-reflection'); onComplete?.({ answer: 'i-am-the-reflection', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>I am the reflection</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue145({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl"
          style={{ color: '#5739FB' }}
        >
          {flipped ? '?' : 'YOU'}
        </motion.div>
        <button
          onClick={() => {
            if (!flipped) {
              setFlipped(true);
              onComplete?.({ timestamp: Date.now() });
              setTimeout(() => onExit?.(), 1500);
            }
          }}
          className="px-12 py-6"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Who looks back?
        </button>
      </div>
    </div>
  );
}

export function NaviCue146({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [gap, setGap] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Gap between self image and reality
        </div>
        <div className="flex justify-center items-center" style={{ gap: `${gap * 2}px` }}>
          <div className="w-32 h-32 rounded-full" style={{ backgroundColor: '#5739FB' }} />
          <div className="w-32 h-32 rounded-full" style={{ backgroundColor: 'rgba(87, 57, 251, 0.3)' }} />
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
            onComplete?.({ gap, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="block mx-auto px-12 py-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          This far apart
        </button>
      </div>
    </div>
  );
}

export function NaviCue147({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Reality vs perception
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('reality'); onComplete?.({ answer: 'reality', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Reality wins</button>
          <button onClick={() => { setAnswer('perception'); onComplete?.({ answer: 'perception', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Perception wins</button>
          <button onClick={() => { setAnswer('same'); onComplete?.({ answer: 'same', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>They are the same</button>
          <button onClick={() => { setAnswer('neither'); onComplete?.({ answer: 'neither', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Neither exists</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue148({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [projection, setProjection] = useState(50);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How much are you projecting?
        </div>
        <motion.div
          animate={{ scale: 1 + (projection / 50) }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB', opacity: 0.3 + (projection / 150) }}
        />
        <div className="text-6xl text-center" style={{ color: '#5739FB' }}>{projection}%</div>
        <input
          type="range"
          min="0"
          max="100"
          value={projection}
          onChange={(e) => setProjection(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ projection, timestamp: Date.now() });
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

export function NaviCue149({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="text-center space-y-12">
        <div className="text-2xl" style={{ color: '#FFFFFF' }}>
          Your shadow self
        </div>
        <motion.div
          animate={{ opacity: revealed ? 1 : 0.2, scale: revealed ? 1.5 : 0.5 }}
          transition={{ duration: 1 }}
          className="w-48 h-48 mx-auto rounded-full"
          style={{ backgroundColor: '#000000', border: '2px solid #5739FB' }}
        />
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
          {revealed ? 'Revealed' : 'Reveal'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue150({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-lg space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          The truest reflection of you is
        </div>
        <div className="space-y-3">
          <button onClick={() => { setAnswer('actions'); onComplete?.({ answer: 'actions', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Your actions</button>
          <button onClick={() => { setAnswer('thoughts'); onComplete?.({ answer: 'thoughts', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Your thoughts</button>
          <button onClick={() => { setAnswer('others-see'); onComplete?.({ answer: 'others-see', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>What others see</button>
          <button onClick={() => { setAnswer('cannot-be-reflected'); onComplete?.({ answer: 'cannot-be-reflected', timestamp: Date.now() }); setTimeout(() => onExit?.(), 1000); }} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Cannot be reflected</button>
        </div>
      </div>
    </div>
  );
}
