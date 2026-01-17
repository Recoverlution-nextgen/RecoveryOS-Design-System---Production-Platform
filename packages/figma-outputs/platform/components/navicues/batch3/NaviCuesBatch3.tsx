import React, { useState } from 'react';
import { motion } from 'motion/react';

// BATCH 3: COLOR AND EMOTION

export function NaviCue21({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'];
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    setSelected(color);
    onComplete?.({ color, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Right now you are
        </div>
        <div className="grid grid-cols-4 gap-4">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => handleSelect(color)}
              className="w-24 h-24 transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue22({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [intensity, setIntensity] = useState(128);

  const handleRelease = () => {
    onComplete?.({ intensity, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: `rgb(${intensity}, 0, ${255 - intensity})` }}>
      <div className="space-y-8 w-96">
        <input
          type="range"
          min="0"
          max="255"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={handleRelease}
          className="w-full p-4 text-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          This is it
        </button>
      </div>
    </div>
  );
}

export function NaviCue23({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
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
          What color is fear?
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['Red', 'Black', 'Grey', 'Blue', 'Yellow', 'Green', 'White', 'Purple', 'No color'].map(color => (
            <button
              key={color}
              onClick={() => handleChoice(color)}
              className="p-6 aspect-square flex items-center justify-center text-center"
              style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NaviCue24({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [opacity, setOpacity] = useState(1);

  const handleFade = () => {
    onComplete?.({ finalOpacity: opacity, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF', opacity }}>
          How visible are you?
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity * 100}
          onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
          className="w-96"
        />
        <button
          onClick={handleFade}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF', opacity }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function NaviCue25({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(true);
    onComplete?.({ timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: flipped ? '#FFFFFF' : '#000000' }}>
      <button
        onClick={handleFlip}
        className="text-4xl px-12 py-8"
        style={{ backgroundColor: flipped ? '#000000' : '#FFFFFF', color: flipped ? '#FFFFFF' : '#000000' }}
      >
        Invert
      </button>
    </div>
  );
}

export function NaviCue26({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [hue, setHue] = useState(0);

  const handleStop = () => {
    onComplete?.({ hue, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: `hsl(${hue}, 80%, 50%)` }}>
      <div className="space-y-8">
        <div className="text-3xl text-center text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Find yourself
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(parseInt(e.target.value))}
          className="w-96"
        />
        <button
          onClick={handleStop}
          className="w-full p-4 text-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          Here
        </button>
      </div>
    </div>
  );
}

export function NaviCue27({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [layers, setLayers] = useState(1);

  const handleAdd = () => {
    if (layers < 10) {
      setLayers(layers + 1);
    } else {
      onComplete?.({ totalLayers: layers, timestamp: Date.now() });
      setTimeout(() => onExit?.(), 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="relative">
        {Array.from({ length: layers }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            className="absolute inset-0 w-64 h-64"
            style={{
              backgroundColor: '#5739FB',
              transform: `scale(${1 + i * 0.1}) rotate(${i * 10}deg)`,
            }}
          />
        ))}
        <button
          onClick={handleAdd}
          className="relative z-10 w-64 h-64 text-2xl"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          {layers < 10 ? 'Another layer' : 'Enough'}
        </button>
      </div>
    </div>
  );
}

export function NaviCue28({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [temperature, setTemperature] = useState(50);

  const getColor = (temp: number) => {
    if (temp < 33) return '#0000FF';
    if (temp < 66) return '#00FF00';
    return '#FF0000';
  };

  const handleSet = () => {
    onComplete?.({ temperature, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-12 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Your temperature right now
        </div>
        <div
          className="w-full h-32 transition-all duration-300"
          style={{ backgroundColor: getColor(temperature) }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={temperature}
          onChange={(e) => setTemperature(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={handleSet}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Lock it
        </button>
      </div>
    </div>
  );
}

export function NaviCue29({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [brightness, setBrightness] = useState(50);

  const handleSubmit = () => {
    onComplete?.({ brightness, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F', filter: `brightness(${brightness}%)` }}>
      <div className="space-y-8 w-96">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          Adjust until you feel seen
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => setBrightness(parseInt(e.target.value))}
          className="w-full"
        />
        <button
          onClick={handleSubmit}
          className="w-full p-4"
          style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}
        >
          Seen
        </button>
      </div>
    </div>
  );
}

export function NaviCue30({ onComplete, onExit }: { onComplete?: (data: any) => void; onExit?: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoice = (c: string) => {
    setChoice(c);
    onComplete?.({ choice: c, timestamp: Date.now() });
    setTimeout(() => onExit?.(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="space-y-8">
        <div className="text-2xl text-center" style={{ color: '#FFFFFF' }}>
          When you close your eyes
        </div>
        <div className="space-y-3">
          <button onClick={() => handleChoice('dark')} className="w-full p-5" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Darkness</button>
          <button onClick={() => handleChoice('light')} className="w-full p-5" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>Light</button>
          <button onClick={() => handleChoice('color')} className="w-full p-5" style={{ backgroundColor: '#5739FB', color: '#FFFFFF' }}>Colors</button>
          <button onClick={() => handleChoice('nothing')} className="w-full p-5" style={{ backgroundColor: 'rgba(87, 57, 251, 0.1)', border: '1px solid rgba(87, 57, 251, 0.3)', color: '#FFFFFF' }}>Nothing at all</button>
        </div>
      </div>
    </div>
  );
}
