/**
 * ContinuityDemo — Showcase of public language components
 * ReturnButton → GripGenerator → TraceObject → ThreadView → LensControl
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReturnButton } from '../components/return/ReturnButton';
import { GripGenerator, GripConfig } from '../components/grip/GripGenerator';
import { TraceObject, TraceObjectProps } from '../components/trace/TraceObject';
import { ThreadView } from '../components/thread/ThreadView';
import { LensControl } from '../components/lens/LensControl';
import './ContinuityDemo.css';

export const ContinuityDemo: React.FC = () => {
  const [lens, setLens] = useState<'individual' | 'professional' | 'organisation'>('individual');
  const [showGripGenerator, setShowGripGenerator] = useState(false);
  const [traces, setTraces] = useState<TraceObjectProps[]>([
    {
      id: '1',
      state: 'sealed',
      copy: 'Noticed the pattern. Breathed through it.',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      metadata: {
        gripType: 'anchor',
        duration: 10,
        driftLevel: 'low',
      },
    },
    {
      id: '2',
      state: 'sealed',
      copy: 'Felt the pull. Chose to stay present.',
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      metadata: {
        gripType: 'compass',
        duration: 30,
        driftLevel: 'medium',
      },
    },
  ]);

  const handleReturnTap = () => {
    // Quick grip (default: Anchor 10s)
    handleGripComplete({
      direction: 'anchor',
      duration: 10,
    });
  };

  const handleReturnLongPress = () => {
    setShowGripGenerator(true);
  };

  const handleGripConfirm = (config: GripConfig) => {
    setShowGripGenerator(false);
    handleGripComplete(config);
  };

  const handleGripComplete = (config: GripConfig) => {
    // Simulate grip completion → save as Trace
    const newTrace: TraceObjectProps = {
      id: String(Date.now()),
      state: 'sealed',
      copy: generateTraceCopy(config),
      timestamp: new Date().toISOString(),
      metadata: {
        gripType: config.direction,
        duration: config.duration,
        driftLevel: 'low',
      },
    };
    setTraces([newTrace, ...traces]);
  };

  const generateTraceCopy = (config: GripConfig) => {
    const copies = {
      anchor: [
        'Found my footing again.',
        'Settled into the moment.',
        'Grounded. Present. Here.',
      ],
      compass: [
        'Checked my bearing.',
        'Oriented toward what matters.',
        'Found my direction.',
      ],
      handrail: [
        'Held steady through it.',
        'Stayed with the discomfort.',
        'Made it through.',
      ],
    };
    const options = copies[config.direction];
    return options[Math.floor(Math.random() * options.length)];
  };

  return (
    <div className="continuity-demo">
      {/* Lens control (top right) */}
      <div className="continuity-demo__lens">
        <LensControl value={lens} onChange={setLens} />
      </div>

      {/* Hero section */}
      <section className="continuity-demo__hero">
        <h1 className="continuity-demo__title">
          {lens === 'individual' && 'Your continuity layer'}
          {lens === 'professional' && 'Clinical continuity interface'}
          {lens === 'organisation' && 'Infrastructure dashboard'}
        </h1>
        <p className="continuity-demo__description">
          {lens === 'individual' && 'Small help, always there. Return when you need it.'}
          {lens === 'professional' && 'Evidence-based micro-intervention architecture supporting person-centered recovery.'}
          {lens === 'organisation' && 'Regulatory-grade delivery infrastructure with proof-of-care audit trail.'}
        </p>
      </section>

      {/* Return button */}
      <div className="continuity-demo__return">
        <ReturnButton
          lens={lens}
          drift="low"
          attention="calm"
          onTap={handleReturnTap}
          onLongPress={handleReturnLongPress}
        />
        <p className="continuity-demo__hint">
          {lens === 'individual' && 'Tap for 10 seconds. Hold to choose.'}
          {lens === 'professional' && 'Quick tap: default grip. Long press: configure.'}
          {lens === 'organisation' && 'TAP=default sequence | HOLD=configuration'}
        </p>
      </div>

      {/* Grip generator (modal) */}
      <AnimatePresence>
        {showGripGenerator && (
          <>
            <div
              className="continuity-demo__overlay"
              onClick={() => setShowGripGenerator(false)}
            />
            <div className="continuity-demo__modal">
              <GripGenerator
                lens={lens}
                onConfirm={handleGripConfirm}
                onCancel={() => setShowGripGenerator(false)}
              />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Thread view */}
      <div className="continuity-demo__thread">
        <ThreadView
          traces={traces}
          state="growing"
          lens={lens}
          week="12"
        />
      </div>
    </div>
  );
};
