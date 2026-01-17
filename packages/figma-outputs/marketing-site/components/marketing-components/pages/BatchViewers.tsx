import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Batch2 from '../navicues/batch2/NaviCuesBatch2';
import * as Batch3 from '../navicues/batch3/NaviCuesBatch3';
import * as Batch4 from '../navicues/batch4/NaviCuesBatch4';
import * as Batch5 from '../navicues/batch5/NaviCuesBatch5';
import * as Batches6to10 from '../navicues/batches6-10';

/**
 * BATCH VIEWERS for Batches 2-10
 * Reusable viewer component for all batches
 */

interface BatchViewerProps {
  batchNumber: number;
  batchName: string;
  navicues: Array<{
    id: number;
    name: string;
    component: React.ComponentType<{ onComplete?: (data: any) => void; onExit?: () => void }>;
  }>;
  onNavigate?: (page: string) => void;
}

function BatchViewer({ batchNumber, batchName, navicues, onNavigate }: BatchViewerProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const handleComplete = (index: number, data: any) => {
    setResults([...results, { index, data }]);
  };

  const handleExit = () => {
    if (currentIndex !== null && currentIndex < navicues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(null);
    }
  };

  if (currentIndex !== null) {
    const CurrentNaviCue = navicues[currentIndex].component;
    return (
      <AnimatePresence mode="wait">
        <CurrentNaviCue
          key={currentIndex}
          onComplete={(data) => handleComplete(currentIndex, data)}
          onExit={handleExit}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#0A0B0F' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate?.('navicue-master-index')}
            className="text-sm px-4 py-2"
            style={{
              backgroundColor: 'rgba(87, 57, 251, 0.1)',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            ← Back to Master Index
          </button>

          <div>
            <h1 className="text-3xl mb-2" style={{ color: '#FFFFFF' }}>
              Batch {batchNumber}: {batchName}
            </h1>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {navicues.length} NaviCues ready to experience
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {navicues.map((navicue, index) => (
            <button
              key={navicue.id}
              onClick={() => setCurrentIndex(index)}
              className="aspect-square p-6 flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: results.some(r => r.index === index) 
                  ? 'rgba(87, 57, 251, 0.3)' 
                  : 'rgba(87, 57, 251, 0.1)',
                border: '1px solid rgba(87, 57, 251, 0.3)',
              }}
            >
              <div className="text-3xl mb-3" style={{ color: '#5739FB' }}>
                {navicue.id}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {navicue.name}
              </div>
              {results.some(r => r.index === index) && (
                <div className="mt-2 text-xs" style={{ color: '#5739FB' }}>
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Play All */}
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#5739FB',
              color: '#FFFFFF',
            }}
          >
            Play All ({results.length}/{navicues.length} completed)
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-12 p-6" style={{ backgroundColor: 'rgba(87, 57, 251, 0.05)' }}>
            <h2 className="text-xl mb-4" style={{ color: '#FFFFFF' }}>
              Captured Data
            </h2>
            <div className="space-y-2 text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {results.map((result, i) => (
                <div key={i}>
                  NaviCue {navicues[result.index].id}: {JSON.stringify(result.data)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Batch 2
export function NaviCueBatch2Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 11, name: 'How Long Is Now', component: Batch2.NaviCue11 },
    { id: 12, name: 'Worry Future', component: Batch2.NaviCue12 },
    { id: 13, name: 'Time Reversed', component: Batch2.NaviCue13 },
    { id: 14, name: 'Before Too Late', component: Batch2.NaviCue14 },
    { id: 15, name: 'Yesterday Different', component: Batch2.NaviCue15 },
    { id: 16, name: 'Moment Never Returns', component: Batch2.NaviCue16 },
    { id: 17, name: 'What Age', component: Batch2.NaviCue17 },
    { id: 18, name: 'Cannot Go Back', component: Batch2.NaviCue18 },
    { id: 19, name: 'Future Becomes Past', component: Batch2.NaviCue19 },
    { id: 20, name: 'Countdown', component: Batch2.NaviCue20 },
  ];
  return <BatchViewer batchNumber={2} batchName="Time Paradoxes" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 3
export function NaviCueBatch3Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 21, name: 'Color Identity', component: Batch3.NaviCue21 },
    { id: 22, name: 'Intensity Slider', component: Batch3.NaviCue22 },
    { id: 23, name: 'Color of Fear', component: Batch3.NaviCue23 },
    { id: 24, name: 'Visibility Fade', component: Batch3.NaviCue24 },
    { id: 25, name: 'Black White Invert', component: Batch3.NaviCue25 },
    { id: 26, name: 'Find Yourself Hue', component: Batch3.NaviCue26 },
    { id: 27, name: 'Layer Builder', component: Batch3.NaviCue27 },
    { id: 28, name: 'Temperature Color', component: Batch3.NaviCue28 },
    { id: 29, name: 'Brightness Adjust', component: Batch3.NaviCue29 },
    { id: 30, name: 'Eyes Closed', component: Batch3.NaviCue30 },
  ];
  return <BatchViewer batchNumber={3} batchName="Color & Emotion" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 4
export function NaviCueBatch4Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 31, name: 'Tap Heartbeat', component: Batch4.NaviCue31 },
    { id: 32, name: 'Speed Matcher', component: Batch4.NaviCue32 },
    { id: 33, name: 'Click Completion', component: Batch4.NaviCue33 },
    { id: 34, name: 'One Breath Hold', component: Batch4.NaviCue34 },
    { id: 35, name: 'Silence Is', component: Batch4.NaviCue35 },
    { id: 36, name: 'Pulse Adjuster', component: Batch4.NaviCue36 },
    { id: 37, name: 'Inner Voice Sound', component: Batch4.NaviCue37 },
    { id: 38, name: 'Create Pattern', component: Batch4.NaviCue38 },
    { id: 39, name: 'Wait Silence', component: Batch4.NaviCue39 },
    { id: 40, name: 'Hear When Silent', component: Batch4.NaviCue40 },
  ];
  return <BatchViewer batchNumber={4} batchName="Rhythm & Sound" navicues={navicues} onNavigate={onNavigate} />;
}

// Batch 5
export function NaviCueBatch5Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 41, name: 'Where Feel It', component: Batch5.NaviCue41 },
    { id: 42, name: 'Body Weight', component: Batch5.NaviCue42 },
    { id: 43, name: 'Body Message', component: Batch5.NaviCue43 },
    { id: 44, name: 'Space You Take', component: Batch5.NaviCue44 },
    { id: 45, name: 'Tension Hold', component: Batch5.NaviCue45 },
    { id: 46, name: 'Breath State', component: Batch5.NaviCue46 },
    { id: 47, name: 'Skin Temperature', component: Batch5.NaviCue47 },
    { id: 48, name: 'Sit Still Feeling', component: Batch5.NaviCue48 },
    { id: 49, name: 'Where You End', component: Batch5.NaviCue49 },
    { id: 50, name: 'Body Speaks', component: Batch5.NaviCue50 },
  ];
  return <BatchViewer batchNumber={5} batchName="Body Awareness" navicues={navicues} onNavigate={onNavigate} />;
}

// Batches 6-10
export function NaviCueBatch6Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 51, name: 'Most Yourself When', component: Batches6to10.NaviCue51 },
    { id: 52, name: 'Try Harder Works Less', component: Batches6to10.NaviCue52 },
    { id: 53, name: 'Stop Looking Find', component: Batches6to10.NaviCue53 },
    { id: 54, name: 'Answer Is Question', component: Batches6to10.NaviCue54 },
    { id: 55, name: 'Problem And Solution', component: Batches6to10.NaviCue55 },
    { id: 56, name: 'Choose Not Choose', component: Batches6to10.NaviCue56 },
    { id: 57, name: 'Nothing To Get Through', component: Batches6to10.NaviCue57 },
    { id: 58, name: 'Flip Same Side', component: Batches6to10.NaviCue58 },
    { id: 59, name: 'Resist Accept Paradox', component: Batches6to10.NaviCue59 },
    { id: 60, name: 'Complete The Loop', component: Batches6to10.NaviCue60 },
  ];
  return <BatchViewer batchNumber={6} batchName="Contradiction & Paradox" navicues={navicues} onNavigate={onNavigate} />;
}

export function NaviCueBatch7Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 61, name: 'Type To Forget', component: Batches6to10.NaviCue61 },
    { id: 62, name: 'First Memory Today', component: Batches6to10.NaviCue62 },
    { id: 63, name: 'Which Memory Real', component: Batches6to10.NaviCue63 },
    { id: 64, name: 'Let It Fade', component: Batches6to10.NaviCue64 },
    { id: 65, name: 'Remember This', component: Batches6to10.NaviCue65 },
    { id: 66, name: 'What Remember Most', component: Batches6to10.NaviCue66 },
    { id: 67, name: 'Rewrite Memory', component: Batches6to10.NaviCue67 },
    { id: 68, name: 'Wish To Forget', component: Batches6to10.NaviCue68 },
    { id: 69, name: 'Memory Clarity', component: Batches6to10.NaviCue69 },
    { id: 70, name: 'Remember This Moment', component: Batches6to10.NaviCue70 },
  ];
  return <BatchViewer batchNumber={7} batchName="Memory & Forgetting" navicues={navicues} onNavigate={onNavigate} />;
}

export function NaviCueBatch8Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 71, name: 'Quick', component: Batches6to10.NaviCue71 },
    { id: 72, name: 'Wait', component: Batches6to10.NaviCue72 },
    { id: 73, name: 'Fast Clicking', component: Batches6to10.NaviCue73 },
    { id: 74, name: 'Speed Adjuster', component: Batches6to10.NaviCue74 },
    { id: 75, name: 'Slow Down Feeling', component: Batches6to10.NaviCue75 },
    { id: 76, name: 'Watch Seconds', component: Batches6to10.NaviCue76 },
    { id: 77, name: 'Pause', component: Batches6to10.NaviCue77 },
    { id: 78, name: 'Life Moving Speed', component: Batches6to10.NaviCue78 },
    { id: 79, name: 'Rhythm Tempo', component: Batches6to10.NaviCue79 },
    { id: 80, name: 'Do Not Rush', component: Batches6to10.NaviCue80 },
  ];
  return <BatchViewer batchNumber={8} batchName="Speed & Slowness" navicues={navicues} onNavigate={onNavigate} />;
}

export function NaviCueBatch9Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 81, name: 'Click Nothing', component: Batches6to10.NaviCue81 },
    { id: 82, name: 'Empty Space Feels', component: Batches6to10.NaviCue82 },
    { id: 83, name: 'Type Nothing', component: Batches6to10.NaviCue83 },
    { id: 84, name: 'Empty Yourself', component: Batches6to10.NaviCue84 },
    { id: 85, name: 'Invisible Dot', component: Batches6to10.NaviCue85 },
    { id: 86, name: 'Fill The Void', component: Batches6to10.NaviCue86 },
    { id: 87, name: 'Remove Everything', component: Batches6to10.NaviCue87 },
    { id: 88, name: 'Nothing Matters', component: Batches6to10.NaviCue88 },
    { id: 89, name: 'Space Between', component: Batches6to10.NaviCue89 },
    { id: 90, name: 'Before Something', component: Batches6to10.NaviCue90 },
  ];
  return <BatchViewer batchNumber={9} batchName="Empty Space & Nothing" navicues={navicues} onNavigate={onNavigate} />;
}

export function NaviCueBatch10Viewer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const navicues = [
    { id: 91, name: 'Who Saw You', component: Batches6to10.NaviCue91 },
    { id: 92, name: 'How Close', component: Batches6to10.NaviCue92 },
    { id: 93, name: 'When They Leave', component: Batches6to10.NaviCue93 },
    { id: 94, name: 'Walls Between', component: Batches6to10.NaviCue94 },
    { id: 95, name: 'Connection Happens', component: Batches6to10.NaviCue95 },
    { id: 96, name: 'They Reflect You', component: Batches6to10.NaviCue96 },
    { id: 97, name: 'Need People', component: Batches6to10.NaviCue97 },
    { id: 98, name: 'Thread Counter', component: Batches6to10.NaviCue98 },
    { id: 99, name: 'They See', component: Batches6to10.NaviCue99 },
    { id: 100, name: 'Knows You Best', component: Batches6to10.NaviCue100 },
  ];
  return <BatchViewer batchNumber={10} batchName="Relationships" navicues={navicues} onNavigate={onNavigate} />;
}
