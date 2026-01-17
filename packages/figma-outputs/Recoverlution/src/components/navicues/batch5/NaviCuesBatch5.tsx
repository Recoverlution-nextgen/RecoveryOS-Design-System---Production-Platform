import React, { useState } from 'react';
import { motion } from 'motion/react';

// BATCH 5: BODY AWARENESS

export function NaviCue41({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const bodyParts = ['Head', 'Chest', 'Stomach', 'Hands', 'Feet', 'Everywhere', 'Nowhere'];
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (part: string) => {
    setSelected(part);
    onComplete?.({ bodyPart: part, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8 max-w-lg">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Where do you feel it?
        </div>
        <div className="space-y-3">
          {bodyParts.map(part => (
            <button
              key={part}
              onClick={() => handleSelect(part)}
              className="w-full p-5"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}
            >
              {part}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue42({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [weight, setWeight] = useState(50);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How heavy is your body right now?
        </div>
        <div className="space-y-4">
          <div className="text-center text-6xl" style={{ color: '#5739FB', opacity: weight / 100 }}>
            ⬇
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="w-full"
          />
          <button
            onClick={() => {
              onComplete?.({ weight, timestamp: Date.now() });
              setTimeout(() => onExit?.(), 800);
            }}
            className="w-full p-4"
            style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
          >
            This heavy
          </button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue43({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Your body is trying to tell you
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('rest')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Rest</button>
          <button onClick={() => handleAnswer('move')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Move</button>
          <button onClick={() => handleAnswer('stop')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Stop</button>
          <button onClick={() => handleAnswer('continue')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Continue</button>
          <button onClick={() => handleAnswer('nothing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue44({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [size, setSize] = useState(100);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          How much space do you take up?
        </div>
        <motion.div
          animate={{ scale: size / 100 }}
          className="w-32 h-32 mx-auto rounded-full"
          style={{ backgroundColor: '#5739FB' }}
        />
        <input
          type="range"
          min="10"
          max="200"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={() => {
            onComplete?.({ size, timestamp: Date.now() });
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

export function NaviCue45({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [tension, setTension] = useState(50);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Hold tension here
        </div>
        <div 
          className="w-full h-64 transition-all duration-300"
          style={{ 
            backgroundColor: '#5739FB',
            transform: `scaleY(${tension / 100})`,
          }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={tension}
          onChange={(e) => setTension(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ tension, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Release
        </button>
      </div>
    </div>
  );
}

export function NaviCue46({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          Your breath is
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('shallow')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Shallow</button>
          <button onClick={() => handleAnswer('deep')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Deep</button>
          <button onClick={() => handleAnswer('held')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Held</button>
          <button onClick={() => handleAnswer('free')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Free</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue47({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [temperature, setTemperature] = useState(50);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Your skin feels
        </div>
        <div 
          className="w-full h-32"
          style={{ 
            backgroundColor: temperature > 50 ? `rgb(255, ${255 - (temperature - 50) * 5}, 0)` : `rgb(0, ${temperature * 5}, 255)`,
          }}
        />
        <div className="flex justify-between text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          <span>Cold</span>
          <span>Hot</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={temperature}
          onChange={(e) => setTemperature(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ temperature, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Accurate
        </button>
      </div>
    </div>
  );
}

export function NaviCue48({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          When you sit still
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('calm')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>You feel calm</button>
          <button onClick={() => handleAnswer('restless')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>You feel restless</button>
          <button onClick={() => handleAnswer('aware')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>You become aware</button>
          <button onClick={() => handleAnswer('disappear')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>You disappear</button>
        </div>
      </div>
    </div>
  );
}

export function NaviCue49({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [boundaries, setBoundaries] = useState(50);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Where do you end?
        </div>
        <motion.div
          animate={{ 
            boxShadow: `0 0 ${boundaries}px ${boundaries / 2}px rgba(87, 57, 251, ${1 - boundaries / 100})` 
          }}
          className="w-32 h-32 mx-auto"
          style={{ backgroundColor: '#5739FB' }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={boundaries}
          onChange={(e) => setBoundaries(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={() => {
            onComplete?.({ boundaries, timestamp: Date.now() });
            setTimeout(() => onExit?.(), 800);
          }}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Here
        </button>
      </div>
    </div>
  );
}

export function NaviCue50({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          If your body could speak
        </div>
        <div className="space-y-3">
          <button onClick={() => handleAnswer('thank-you')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Thank you</button>
          <button onClick={() => handleAnswer('stop')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Stop</button>
          <button onClick={() => handleAnswer('help')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Help</button>
          <button onClick={() => handleAnswer('listen')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Listen</button>
        </div>
      </div>
    </div>
  );
}
