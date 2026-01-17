/**
 * HEAT × KBE MATRIX
 * State-based routing grid
 * Do not think in a fire
 */

import { useState } from 'react';
import { X } from 'lucide-react';

interface MatrixCell {
  heat: 'RED' | 'AMBER' | 'GREEN';
  kbe: 'Knowing' | 'Believing' | 'Embodying';
  primaryPrimitive: string;
  mindblockCount: number;
  description: string;
  voices: string[];
  sampleMindblocks: string[];
}

const MATRIX: MatrixCell[] = [
  // RED ROW
  { heat: 'RED', kbe: 'Knowing', primaryPrimitive: 'Orient', mindblockCount: 142, description: 'High arousal, intellectual awareness only', voices: ['Clinician', 'Nurturer'], sampleMindblocks: ['I know I am panicking but cannot stop', 'I understand the pattern but feel overwhelmed'] },
  { heat: 'RED', kbe: 'Believing', primaryPrimitive: 'Downshift', mindblockCount: 187, description: 'High arousal, emotionally convinced', voices: ['Nurturer', 'Clinician'], sampleMindblocks: ['This feeling will never end', 'I believe I am in danger'] },
  { heat: 'RED', kbe: 'Embodying', primaryPrimitive: 'Repair', mindblockCount: 96, description: 'High arousal, somatic activation', voices: ['Nurturer', 'Witness'], sampleMindblocks: ['My body is threat', 'I am the panic'] },
  
  // AMBER ROW
  { heat: 'AMBER', kbe: 'Knowing', primaryPrimitive: 'Name Pattern', mindblockCount: 201, description: 'Moderate arousal, pattern visible', voices: ['Witness', 'Sage'], sampleMindblocks: ['I see this cycle but still feel stuck', 'I know this is a schema'] },
  { heat: 'AMBER', kbe: 'Believing', primaryPrimitive: 'Witness', mindblockCount: 234, description: 'Moderate arousal, story feels true', voices: ['Paradox', 'Sage'], sampleMindblocks: ['This thought defines me', 'I believe this is who I am'] },
  { heat: 'AMBER', kbe: 'Embodying', primaryPrimitive: 'Reframe', mindblockCount: 168, description: 'Moderate arousal, felt sense of pattern', voices: ['Coach', 'Witness'], sampleMindblocks: ['I feel this pattern in my body', 'This is how I always respond'] },
  
  // GREEN ROW
  { heat: 'GREEN', kbe: 'Knowing', primaryPrimitive: 'Make Move', mindblockCount: 178, description: 'Calm, ready for behavioral test', voices: ['Coach', 'Straight Talk'], sampleMindblocks: ['I know what to do and am ready', 'I understand and can act'] },
  { heat: 'GREEN', kbe: 'Believing', primaryPrimitive: 'Experiment', mindblockCount: 145, description: 'Calm, ready to test new belief', voices: ['Coach', 'Sage'], sampleMindblocks: ['I believe change is possible', 'I trust this new way'] },
  { heat: 'GREEN', kbe: 'Embodying', primaryPrimitive: 'Transfer Test', mindblockCount: 89, description: 'Calm, new pattern integrated', voices: ['Elder', 'Coach'], sampleMindblocks: ['This is now automatic', 'I am this change'] }
];

export function HeatKbeMatrix() {
  const [selectedCell, setSelectedCell] = useState<MatrixCell | null>(null);

  const getHeatColor = (heat: string) => {
    switch (heat) {
      case 'RED': return '#DC2626';
      case 'AMBER': return '#F59E42';
      case 'GREEN': return '#10B981';
      default: return '#71717A';
    }
  };

  const getKbeColumn = (kbe: string) => {
    switch (kbe) {
      case 'Knowing': return 0;
      case 'Believing': return 1;
      case 'Embodying': return 2;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <div className="mb-3">
            <span 
              className="text-xs tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              09 OF 10
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            State-based routing. Do not think in a fire.
          </h1>
          <p 
            className="text-lg text-zinc-400"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Heat × KBE determines the move.
          </p>
        </div>
      </div>

      {/* Matrix + Detail */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Matrix Grid */}
          <div className="col-span-2">
            <div className="border border-zinc-800">
              {/* Column Headers */}
              <div className="grid grid-cols-4 border-b border-zinc-800">
                <div className="p-4 bg-zinc-900" />
                <div className="p-4 bg-zinc-900 text-center">
                  <span 
                    className="text-sm font-semibold text-zinc-400"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    KNOWING
                  </span>
                </div>
                <div className="p-4 bg-zinc-900 text-center">
                  <span 
                    className="text-sm font-semibold text-zinc-400"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    BELIEVING
                  </span>
                </div>
                <div className="p-4 bg-zinc-900 text-center">
                  <span 
                    className="text-sm font-semibold text-zinc-400"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    EMBODYING
                  </span>
                </div>
              </div>

              {/* Rows */}
              {['RED', 'AMBER', 'GREEN'].map((heat) => (
                <div key={heat} className="grid grid-cols-4 border-b border-zinc-800 last:border-b-0">
                  {/* Row Header */}
                  <div 
                    className="p-4 flex items-center justify-center font-bold"
                    style={{
                      background: `${getHeatColor(heat)}20`,
                      color: getHeatColor(heat),
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {heat}
                  </div>

                  {/* Cells */}
                  {['Knowing', 'Believing', 'Embodying'].map((kbe) => {
                    const cell = MATRIX.find(c => c.heat === heat && c.kbe === kbe);
                    if (!cell) return null;

                    return (
                      <button
                        key={`${heat}-${kbe}`}
                        onClick={() => setSelectedCell(cell)}
                        className="p-4 text-left border-l border-zinc-800 transition-all hover:bg-zinc-900"
                        style={{
                          background: selectedCell?.heat === heat && selectedCell?.kbe === kbe
                            ? 'rgba(87, 57, 251, 0.1)'
                            : 'transparent'
                        }}
                      >
                        <p 
                          className="text-sm font-semibold mb-2"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {cell.primaryPrimitive}
                        </p>
                        <p 
                          className="text-xs text-zinc-500"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {cell.mindblockCount} mindblocks
                        </p>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Glossary */}
            <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800">
              <p 
                className="text-xs text-zinc-500 mb-2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                GLOSSARY
              </p>
              <div className="space-y-1 text-xs text-zinc-400" style={{ fontFamily: 'var(--font-sans)' }}>
                <p><strong>Knowing:</strong> Intellectual understanding without emotional conviction</p>
                <p><strong>Believing:</strong> Emotionally convinced, story feels true</p>
                <p><strong>Embodying:</strong> Somatic integration, pattern is automatic</p>
              </div>
            </div>
          </div>

          {/* Detail Pane */}
          <div>
            {selectedCell ? (
              <div 
                className="sticky top-8 border border-zinc-800 p-6"
                style={{
                  background: 'rgba(39, 39, 42, 0.3)',
                  backdropFilter: 'blur(20px) saturate(110%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                  borderLeft: `4px solid ${getHeatColor(selectedCell.heat)}`
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCell(null)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Cell Coordinates */}
                <div className="mb-4">
                  <span 
                    className="text-xs px-2 py-1 font-bold"
                    style={{
                      background: `${getHeatColor(selectedCell.heat)}20`,
                      color: getHeatColor(selectedCell.heat),
                      border: `1px solid ${getHeatColor(selectedCell.heat)}40`,
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {selectedCell.heat}
                  </span>
                  <span className="text-xs text-zinc-500 mx-2">×</span>
                  <span 
                    className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {selectedCell.kbe}
                  </span>
                </div>

                {/* Primary Primitive */}
                <h3 
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {selectedCell.primaryPrimitive}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm text-zinc-400 mb-6"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {selectedCell.description}
                </p>

                {/* Mindblock Count */}
                <div className="mb-6 p-3 bg-zinc-900 border border-zinc-800">
                  <p 
                    className="text-xs text-zinc-500 mb-1"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    MINDBLOCKS IN CELL
                  </p>
                  <p 
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {selectedCell.mindblockCount}
                  </p>
                </div>

                {/* Voices */}
                <div className="mb-6">
                  <p 
                    className="text-xs text-zinc-500 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    PRIMARY VOICES
                  </p>
                  <div className="flex gap-2">
                    {selectedCell.voices.map(voice => (
                      <span
                        key={voice}
                        className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {voice}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sample Mindblocks */}
                <div className="mb-6">
                  <p 
                    className="text-xs text-zinc-500 mb-2"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    SAMPLE MINDBLOCKS
                  </p>
                  <div className="space-y-2">
                    {selectedCell.sampleMindblocks.map((mb, i) => (
                      <p 
                        key={i}
                        className="text-xs text-zinc-400 italic"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        • {mb}
                      </p>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="w-full px-4 py-3 bg-[#5739FB] text-white font-semibold transition-all hover:bg-[#3E2BB8]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Open cell
                </button>
              </div>
            ) : (
              <div 
                className="sticky top-8 border border-zinc-800 flex items-center justify-center text-center p-6"
                style={{ height: '500px' }}
              >
                <p className="text-zinc-500" style={{ fontFamily: 'var(--font-sans)' }}>
                  Select a cell to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
