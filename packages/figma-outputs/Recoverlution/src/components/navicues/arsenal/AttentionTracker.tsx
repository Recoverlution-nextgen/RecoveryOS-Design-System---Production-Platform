import React, { useState, useEffect } from 'react';

/**
 * ATTENTION TRACKER - KNOWING LAYER
 * 
 * Purpose: What do they focus on reveals priorities
 * Mechanism: Presents array of elements, tracks what they look at/select
 * Psychology: Attention is a choice that reveals values
 * 
 * Example: Shows 6 life domains - which do they tap first?
 * First choice = unconscious priority
 */

interface AttentionTrackerProps {
  prompt: string;
  elements: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  onSelection: (selected: string, orderIndex: number, timeToSelect: number) => void;
}

export function AttentionTracker({ prompt, elements, onSelection }: AttentionTrackerProps) {
  const [startTime] = useState(Date.now());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [orderIndex, setOrderIndex] = useState(0);

  const handleSelect = (elementId: string) => {
    if (selected.has(elementId)) return;
    
    const timeToSelect = Date.now() - startTime;
    const newSelected = new Set(selected);
    newSelected.add(elementId);
    setSelected(newSelected);
    
    setTimeout(() => {
      onSelection(elementId, orderIndex, timeToSelect);
      setOrderIndex(orderIndex + 1);
    }, 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-3xl w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#5739FB' }}>
            What draws your attention?
          </div>
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>
            {prompt}
          </h2>
        </div>

        {/* Elements grid */}
        <div className="grid grid-cols-2 gap-4">
          {elements.map((element, index) => {
            const isSelected = selected.has(element.id);
            const selectionOrder = Array.from(selected).indexOf(element.id) + 1;
            
            return (
              <button
                key={element.id}
                onClick={() => handleSelect(element.id)}
                className="p-6 text-left transition-all duration-200 relative"
                style={{
                  backgroundColor: isSelected ? '#3E2BB8' : 'rgba(87, 57, 251, 0.1)',
                  border: `2px solid ${isSelected ? '#5739FB' : 'rgba(87, 57, 251, 0.2)'}`,
                  color: '#FFFFFF',
                  opacity: isSelected ? 0.6 : 1,
                }}
              >
                {isSelected && (
                  <div 
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-sm"
                    style={{
                      backgroundColor: '#5739FB',
                      color: '#FFFFFF',
                    }}
                  >
                    {selectionOrder}
                  </div>
                )}
                <div className="text-lg mb-2">{element.label}</div>
                <div className="text-sm opacity-60">{element.description}</div>
              </button>
            );
          })}
        </div>

        {/* Insight */}
        <div className="text-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          {selected.size === 0 ? 'Tap what draws your attention first' : `${selected.size}/${elements.length} selected`}
        </div>
      </div>
    </div>
  );
}
