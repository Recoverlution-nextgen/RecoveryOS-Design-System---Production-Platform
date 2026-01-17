import React, { useState } from 'react';

/**
 * MICRO-MOMENT SNAPSHOT - KNOWING LAYER
 * 
 * Purpose: Captures what user notices in present moment
 * Mechanism: Random prompts throughout day
 * Psychology: Attention reveals values and concerns
 * 
 * Example: "What did you just notice?" (body sensation, thought, emotion, urge)
 * Pattern shows where attention habitually goes
 */

interface MicroMomentSnapshotProps {
  onCapture: (category: string, note: string) => void;
}

const categories = [
  { id: 'body', label: 'Body sensation', color: '#5739FB' },
  { id: 'thought', label: 'Thought', color: '#7B68EE' },
  { id: 'emotion', label: 'Emotion', color: '#9370DB' },
  { id: 'urge', label: 'Urge to do something', color: '#BA55D3' },
];

export function MicroMomentSnapshot({ onCapture }: MicroMomentSnapshotProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    if (!selectedCategory) return;
    setCaptured(true);
    setTimeout(() => {
      onCapture(selectedCategory, note);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            Right now
          </div>
          <h2 className="text-3xl" style={{ color: '#FFFFFF' }}>
            What did you just notice?
          </h2>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="p-5 text-left transition-all duration-200"
              style={{
                backgroundColor: selectedCategory === category.id 
                  ? category.color 
                  : 'rgba(87, 57, 251, 0.1)',
                border: `2px solid ${selectedCategory === category.id ? category.color : 'transparent'}`,
                color: '#FFFFFF',
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Optional note */}
        {selectedCategory && (
          <div className="space-y-3">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)"
              className="w-full p-4 text-sm"
              rows={3}
              style={{
                backgroundColor: 'rgba(87, 57, 251, 0.05)',
                border: '1px solid rgba(87, 57, 251, 0.2)',
                color: '#FFFFFF',
              }}
            />
          </div>
        )}

        {/* Capture */}
        <button
          onClick={handleCapture}
          disabled={!selectedCategory || captured}
          className="w-full p-5 transition-all duration-200"
          style={{
            backgroundColor: captured ? '#3E2BB8' : (selectedCategory ? '#5739FB' : 'rgba(87, 57, 251, 0.3)'),
            color: '#FFFFFF',
            opacity: selectedCategory ? 1 : 0.5,
          }}
        >
          {captured ? 'Captured' : 'Log this moment'}
        </button>

        {/* Footer */}
        <div className="text-center text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Attention reveals what matters to you
        </div>
      </div>
    </div>
  );
}
