/**
 * TraceObject — Proof made tangible
 * 
 * States: Draft → Sealed → Carried → Shared
 * Finish: Glass (translucent, etched with copy)
 */

import React from 'react';
import { motion } from 'framer-motion';
import './TraceObject.css';

export interface TraceObjectProps {
  /** Unique trace ID */
  id: string;
  /** Current state */
  state?: 'draft' | 'sealed' | 'carried' | 'shared';
  /** Copy etched into the trace */
  copy: string;
  /** Timestamp */
  timestamp: string;
  /** Optional metadata */
  metadata?: {
    gripType?: 'anchor' | 'compass' | 'handrail';
    duration?: number; // seconds
    driftLevel?: 'low' | 'medium' | 'high';
  };
  /** Lens mode */
  lens?: 'individual' | 'professional' | 'organisation';
  /** Click handler */
  onClick?: () => void;
}

export const TraceObject: React.FC<TraceObjectProps> = ({
  id,
  state = 'draft',
  copy,
  timestamp,
  metadata,
  lens = 'individual',
  onClick,
}) => {
  // Format timestamp per lens
  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    switch (lens) {
      case 'individual':
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        });
      case 'professional':
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      case 'organisation':
        return date.toISOString();
      default:
        return ts;
    }
  };

  return (
    <motion.article
      className={`trace-object trace-object--${state} trace-object--${lens}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glass surface with etched copy */}
      <div className="trace-object__surface">
        <div className="trace-object__copy">{copy}</div>
        
        {state === 'sealed' && (
          <motion.div
            className="trace-object__seal"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 20,
              delay: 0.2,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Metadata ribbon */}
      <div className="trace-object__metadata">
        <time className="trace-object__timestamp">
          {formatTimestamp(timestamp)}
        </time>
        
        {metadata?.gripType && (
          <span className={`trace-object__grip-badge trace-object__grip-badge--${metadata.gripType}`}>
            {metadata.gripType}
          </span>
        )}
        
        {metadata?.duration && (
          <span className="trace-object__duration">
            {metadata.duration < 60 ? `${metadata.duration}s` : `${Math.floor(metadata.duration / 60)}m`}
          </span>
        )}
      </div>
    </motion.article>
  );
};
