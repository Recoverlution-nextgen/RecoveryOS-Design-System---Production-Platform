/**
 * ThreadView — Continuity line with Trace nodes
 * 
 * Visual: Vertical timeline with connected Trace objects
 * States: New → Growing → Reviewable → Shareable
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TraceObject, TraceObjectProps } from '../trace/TraceObject';
import './ThreadView.css';

export interface ThreadViewProps {
  /** Array of traces in the thread */
  traces: TraceObjectProps[];
  /** Thread state */
  state?: 'new' | 'growing' | 'reviewable' | 'shareable';
  /** Lens mode */
  lens?: 'individual' | 'professional' | 'organisation';
  /** Thread title */
  title?: string;
  /** Week identifier (for ERA rhythm) */
  week?: string;
}

export const ThreadView: React.FC<ThreadViewProps> = ({
  traces,
  state = 'growing',
  lens = 'individual',
  title,
  week,
}) => {
  // Copy per lens
  const threadLabel = {
    individual: 'Your thread',
    professional: 'Continuity line',
    organisation: 'Thread archive',
  };

  return (
    <motion.section
      className={`thread-view thread-view--${state} thread-view--${lens}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <header className="thread-view__header">
        <h2 className="thread-view__title">
          {title || threadLabel[lens]}
        </h2>
        {week && (
          <span className="thread-view__week">Week {week}</span>
        )}
        <span className="thread-view__count">
          {traces.length} {traces.length === 1 ? 'trace' : 'traces'}
        </span>
      </header>

      {/* Thread line with traces */}
      <div className="thread-view__timeline">
        {/* Continuity line */}
        <motion.div
          className="thread-view__line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.2,
          }}
        />

        {/* Trace nodes */}
        <div className="thread-view__traces">
          {traces.map((trace, index) => (
            <motion.div
              key={trace.id}
              className="thread-view__node"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
            >
              {/* Node indicator */}
              <motion.div
                className="thread-view__node-dot"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
              />
              
              {/* Trace object */}
              <TraceObject {...trace} lens={lens} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {traces.length === 0 && (
        <div className="thread-view__empty">
          <p className="thread-view__empty-text">
            {lens === 'individual' && 'No traces yet. Return when ready.'}
            {lens === 'professional' && 'Thread empty. Start continuity.'}
            {lens === 'organisation' && 'No trace records found.'}
          </p>
        </div>
      )}
    </motion.section>
  );
};
