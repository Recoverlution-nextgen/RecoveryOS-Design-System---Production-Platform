/**
 * TraceTravel — Same Trace → Three Altitudes
 * 
 * Story Job: Show "receipt travels up the spine"
 * 
 * Maps to: Same receipt, three meanings, one spine
 *          Individual (identity) → Professional (signal) → Organisation (integrity)
 * 
 * Interaction:
 * - Toggle: LensControl switches view
 * - Scroll: Scroll position triggers transformation
 * - Auto: Animates through all three views
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TraceObject, TraceObjectProps } from '../trace/TraceObject';
import './TraceTravel.css';

export interface TraceTravelProps {
  /** Source trace (always same ID) */
  trace: TraceObjectProps;
  /** Trigger mechanism */
  trigger?: 'toggle' | 'scroll' | 'auto';
  /** Default view based on lens */
  defaultViewByLens?: boolean;
  /** Current lens (if controlled externally) */
  lens?: 'individual' | 'professional' | 'organisation';
  /** Auto-play interval (ms) */
  autoInterval?: number;
}

type AltitudeView = 'me' | 'care' | 'system';

export const TraceTravel: React.FC<TraceTravelProps> = ({
  trace,
  trigger = 'toggle',
  defaultViewByLens = false,
  lens = 'individual',
  autoInterval = 3000,
}) => {
  const [currentView, setCurrentView] = useState<AltitudeView>(() => {
    if (defaultViewByLens) {
      return lens === 'individual' ? 'me' : lens === 'professional' ? 'care' : 'system';
    }
    return 'me';
  });

  // Auto-cycle through views
  useEffect(() => {
    if (trigger === 'auto') {
      const views: AltitudeView[] = ['me', 'care', 'system'];
      let index = 0;
      
      const interval = setInterval(() => {
        index = (index + 1) % views.length;
        setCurrentView(views[index]);
      }, autoInterval);

      return () => clearInterval(interval);
    }
  }, [trigger, autoInterval]);

  // Update view when lens changes (if controlled externally)
  useEffect(() => {
    if (trigger === 'toggle' && defaultViewByLens) {
      setCurrentView(
        lens === 'individual' ? 'me' : lens === 'professional' ? 'care' : 'system'
      );
    }
  }, [lens, trigger, defaultViewByLens]);

  // Transform trace data per altitude
  const getTransformedTrace = (view: AltitudeView): TraceObjectProps => {
    const base = { ...trace };

    switch (view) {
      case 'me':
        // Individual view: identity reinforcement
        return {
          ...base,
          copy: trace.copy, // Original felt language
          metadata: {
            ...trace.metadata,
            // Hide technical details
          },
        };

      case 'care':
        // Professional view: signal (what happened / what held / what next)
        return {
          ...base,
          copy: transformToCareSignal(trace),
          metadata: {
            ...trace.metadata,
            // Add clinical context
          },
        };

      case 'system':
        // Organisation view: integrity (consent + reliability)
        return {
          ...base,
          copy: transformToSystemIntegrity(trace),
          metadata: {
            ...trace.metadata,
            // Add governance metadata
          },
        };
    }
  };

  const handleViewToggle = (view: AltitudeView) => {
    if (trigger === 'toggle') {
      setCurrentView(view);
    }
  };

  return (
    <div className="trace-travel">
      {/* Altitude selector (if toggle mode) */}
      {trigger === 'toggle' && (
        <div className="trace-travel__selector">
          <button
            className={`trace-travel__view-button ${currentView === 'me' ? 'trace-travel__view-button--active' : ''}`}
            onClick={() => handleViewToggle('me')}
          >
            <span className="trace-travel__view-icon">●</span>
            <span className="trace-travel__view-label">Me</span>
          </button>
          <button
            className={`trace-travel__view-button ${currentView === 'care' ? 'trace-travel__view-button--active' : ''}`}
            onClick={() => handleViewToggle('care')}
          >
            <span className="trace-travel__view-icon">◆</span>
            <span className="trace-travel__view-label">Care</span>
          </button>
          <button
            className={`trace-travel__view-button ${currentView === 'system' ? 'trace-travel__view-button--active' : ''}`}
            onClick={() => handleViewToggle('system')}
          >
            <span className="trace-travel__view-icon">■</span>
            <span className="trace-travel__view-label">System</span>
          </button>
        </div>
      )}

      {/* Trace transformation */}
      <div className="trace-travel__container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            className="trace-travel__trace"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <TraceObject
              {...getTransformedTrace(currentView)}
              lens={currentView === 'me' ? 'individual' : currentView === 'care' ? 'professional' : 'organisation'}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Spine visualization (subtle) */}
      <div className="trace-travel__spine">
        <motion.div
          className="trace-travel__spine-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <div className={`trace-travel__spine-node trace-travel__spine-node--me ${currentView === 'me' ? 'trace-travel__spine-node--active' : ''}`} />
        <div className={`trace-travel__spine-node trace-travel__spine-node--care ${currentView === 'care' ? 'trace-travel__spine-node--active' : ''}`} />
        <div className={`trace-travel__spine-node trace-travel__spine-node--system ${currentView === 'system' ? 'trace-travel__spine-node--active' : ''}`} />
      </div>

      {/* Labels evolve, IDs don't (principle visualization) */}
      {trigger === 'auto' && (
        <div className="trace-travel__principle">
          <p className="trace-travel__principle-text">
            Same ID: <code>{trace.id}</code>
          </p>
          <p className="trace-travel__principle-text">
            Three interpretations
          </p>
        </div>
      )}
    </div>
  );
};

// Transform trace to Care signal
function transformToCareSignal(trace: TraceObjectProps): string {
  const { metadata } = trace;
  
  const signals: string[] = [];
  
  if (metadata?.gripType) {
    const gripLabels = {
      anchor: 'Arousal regulation',
      compass: 'Direction-finding',
      handrail: 'Sustained support',
    };
    signals.push(`Target: ${gripLabels[metadata.gripType]}`);
  }
  
  if (metadata?.duration) {
    signals.push(`Dose: ${metadata.duration < 60 ? `${metadata.duration}s` : `${Math.floor(metadata.duration / 60)}m`}`);
  }
  
  if (metadata?.driftLevel) {
    const driftLabels = {
      low: 'Stable',
      medium: 'Elevated',
      high: 'Critical',
    };
    signals.push(`Drift: ${driftLabels[metadata.driftLevel]}`);
  }
  
  return signals.join(' • ');
}

// Transform trace to System integrity
function transformToSystemIntegrity(trace: TraceObjectProps): string {
  const integrity: string[] = [];
  
  integrity.push(`ID: ${trace.id}`);
  integrity.push('Consent: Granted');
  integrity.push('Escalation: None');
  integrity.push('Reliability: 100%');
  integrity.push(`Logged: ${new Date(trace.timestamp).toISOString()}`);
  
  return integrity.join(' | ');
}
