/**
 * OSRevealDemo — "Feel → Understand → Trust → Scale"
 * 
 * Demonstrates the four realities:
 * 1. It runs as a loop (LoopRunner)
 * 2. It has rooms and tempos (moment/week)
 * 3. It produces proof as objects (TraceTravel)
 * 4. It is safe at scale (trust surfaces preview)
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoopRunner, LoopConfig } from '../components/loop/LoopRunner';
import { TraceTravel } from '../components/travel/TraceTravel';
import { TraceObjectProps } from '../components/trace/TraceObject';
import { LensControl } from '../components/lens/LensControl';
import './OSRevealDemo.css';

type Scene = 'intro' | 'loop' | 'proof' | 'travel' | 'trust';

export const OSRevealDemo: React.FC = () => {
  const [scene, setScene] = useState<Scene>('intro');
  const [lens, setLens] = useState<'individual' | 'professional' | 'organisation'>('individual');
  const [generatedTrace, setGeneratedTrace] = useState<TraceObjectProps | null>(null);
  const [isRunningLoop, setIsRunningLoop] = useState(false);

  const loopConfig: LoopConfig = {
    intent: 'anchor',
    duration: 10,
    tempo: 'moment',
    depth: 'glance',
  };

  const handleRunLoop = () => {
    setIsRunningLoop(true);
    setScene('loop');
  };

  const handleLoopComplete = () => {
    setIsRunningLoop(false);
    setScene('proof');
  };

  const handleTraceCreated = (trace: TraceObjectProps) => {
    setGeneratedTrace(trace);
  };

  const handleExploreTravel = () => {
    if (generatedTrace) {
      setScene('travel');
    }
  };

  return (
    <div className="os-reveal-demo">
      {/* Lens control (persistent) */}
      <div className="os-reveal-demo__lens">
        <LensControl value={lens} onChange={setLens} size="comfortable" />
      </div>

      {/* Scene navigator */}
      <div className="os-reveal-demo__nav">
        {['intro', 'loop', 'proof', 'travel', 'trust'].map((s) => (
          <button
            key={s}
            className={`os-reveal-demo__nav-button ${scene === s ? 'os-reveal-demo__nav-button--active' : ''}`}
            onClick={() => setScene(s as Scene)}
          >
            {s === 'intro' && '1. Feel'}
            {s === 'loop' && '2. Loop'}
            {s === 'proof' && '3. Proof'}
            {s === 'travel' && '4. Travel'}
            {s === 'trust' && '5. Trust'}
          </button>
        ))}
      </div>

      {/* Scene content */}
      <div className="os-reveal-demo__content">
        <AnimatePresence mode="wait">
          {scene === 'intro' && (
            <motion.div
              key="intro"
              className="os-reveal-demo__scene os-reveal-demo__scene--intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="os-reveal-demo__title">
                {lens === 'individual' && 'RecoveryOS'}
                {lens === 'professional' && 'Clinical Delivery Infrastructure'}
                {lens === 'organisation' && 'Governed Recovery Platform'}
              </h1>
              <p className="os-reveal-demo__description">
                {lens === 'individual' && 'Small help, always there. Return when you need it.'}
                {lens === 'professional' && 'Evidence-based micro-intervention architecture supporting person-centered recovery.'}
                {lens === 'organisation' && 'Regulatory-grade delivery infrastructure with proof-of-care audit trail.'}
              </p>
              <button
                className="os-reveal-demo__cta"
                onClick={handleRunLoop}
              >
                {lens === 'individual' && 'See how it works'}
                {lens === 'professional' && 'Demonstrate loop'}
                {lens === 'organisation' && 'Execute protocol'}
              </button>
            </motion.div>
          )}

          {scene === 'loop' && (
            <motion.div
              key="loop"
              className="os-reveal-demo__scene os-reveal-demo__scene--loop"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="os-reveal-demo__scene-header">
                <h2 className="os-reveal-demo__scene-title">
                  {lens === 'individual' && 'The Loop'}
                  {lens === 'professional' && 'OS Loop (Sense → Route → Deliver → Seal)'}
                  {lens === 'organisation' && 'DELIVERY_LOOP_PROTOCOL'}
                </h2>
                <p className="os-reveal-demo__scene-subtitle">
                  {lens === 'individual' && 'Watch what happens when you return'}
                  {lens === 'professional' && 'Four-beat orchestration cycle'}
                  {lens === 'organisation' && 'Governed micro-intervention sequence'}
                </p>
              </div>

              {isRunningLoop && (
                <LoopRunner
                  config={loopConfig}
                  lens={lens}
                  onReceiptCreate={handleTraceCreated}
                  onComplete={handleLoopComplete}
                />
              )}

              {!isRunningLoop && (
                <button
                  className="os-reveal-demo__cta"
                  onClick={handleRunLoop}
                >
                  Run again
                </button>
              )}
            </motion.div>
          )}

          {scene === 'proof' && generatedTrace && (
            <motion.div
              key="proof"
              className="os-reveal-demo__scene os-reveal-demo__scene--proof"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="os-reveal-demo__scene-header">
                <h2 className="os-reveal-demo__scene-title">
                  {lens === 'individual' && 'Proof, Made Tangible'}
                  {lens === 'professional' && 'Receipt Object (TraceTile)'}
                  {lens === 'organisation' && 'AUDIT_ARTIFACT'}
                </h2>
                <p className="os-reveal-demo__scene-subtitle">
                  {lens === 'individual' && 'This moment is now part of your continuity'}
                  {lens === 'professional' && 'Sealed receipt with metadata'}
                  {lens === 'organisation' && 'Immutable proof object created'}
                </p>
              </div>

              <div className="os-reveal-demo__trace-preview">
                <TraceObject {...generatedTrace} lens={lens} />
              </div>

              <button
                className="os-reveal-demo__cta"
                onClick={handleExploreTravel}
              >
                {lens === 'individual' && 'See how it travels'}
                {lens === 'professional' && 'Explore altitude transformation'}
                {lens === 'organisation' && 'View multi-level rendering'}
              </button>
            </motion.div>
          )}

          {scene === 'travel' && generatedTrace && (
            <motion.div
              key="travel"
              className="os-reveal-demo__scene os-reveal-demo__scene--travel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="os-reveal-demo__scene-header">
                <h2 className="os-reveal-demo__scene-title">
                  {lens === 'individual' && 'Three Worlds, One Spine'}
                  {lens === 'professional' && 'Receipt Travel (Altitude Transformation)'}
                  {lens === 'organisation' && 'MULTI_ALTITUDE_RENDERING'}
                </h2>
                <p className="os-reveal-demo__scene-subtitle">
                  {lens === 'individual' && 'Same moment, seen from three heights'}
                  {lens === 'professional' && 'Same ID, three interpretations'}
                  {lens === 'organisation' && 'Labels evolve. IDs don\'t.'}
                </p>
              </div>

              <TraceTravel
                trace={generatedTrace}
                trigger="toggle"
                defaultViewByLens={false}
                lens={lens}
              />

              <button
                className="os-reveal-demo__cta"
                onClick={() => setScene('trust')}
              >
                {lens === 'individual' && 'Explore trust & safety'}
                {lens === 'professional' && 'Review governance'}
                {lens === 'organisation' && 'Audit infrastructure'}
              </button>
            </motion.div>
          )}

          {scene === 'trust' && (
            <motion.div
              key="trust"
              className="os-reveal-demo__scene os-reveal-demo__scene--trust"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="os-reveal-demo__scene-header">
                <h2 className="os-reveal-demo__scene-title">
                  {lens === 'individual' && 'Safe at Scale'}
                  {lens === 'professional' && 'Trust Infrastructure'}
                  {lens === 'organisation' && 'GOVERNANCE_LAYER'}
                </h2>
                <p className="os-reveal-demo__scene-subtitle">
                  {lens === 'individual' && 'Your boundaries, always respected'}
                  {lens === 'professional' && 'Consent by design, escalation protocols'}
                  {lens === 'organisation' && 'LOCKED / CONTROLLED / EXPANDABLE'}
                </p>
              </div>

              <div className="os-reveal-demo__trust-preview">
                <div className="os-reveal-demo__trust-card">
                  <h3>Consent</h3>
                  <p>First-class UI, not compliance theater</p>
                </div>
                <div className="os-reveal-demo__trust-card">
                  <h3>Escalation</h3>
                  <p>Clean handoff under drift, by protocol</p>
                </div>
                <div className="os-reveal-demo__trust-card">
                  <h3>Integrity</h3>
                  <p>Auditable logs, defensibility metrics</p>
                </div>
                <div className="os-reveal-demo__trust-card">
                  <h3>Governance</h3>
                  <p>Labels evolve. IDs don't.</p>
                </div>
              </div>

              <button
                className="os-reveal-demo__cta"
                onClick={() => setScene('intro')}
              >
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Re-import TraceObject to use in proof scene
import { TraceObject } from '../components/trace/TraceObject';
