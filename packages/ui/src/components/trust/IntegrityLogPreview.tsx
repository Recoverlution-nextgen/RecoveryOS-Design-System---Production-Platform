import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Lens } from '../../types/theme';
import './IntegrityLogPreview.css';

export type LogDetail = 'summary' | 'expanded';
export type LogFilter = 'consent' | 'escalation' | 'reliability';

export interface IntegrityLogEntry {
  id: string;
  timestamp: string;
  action: string;
  consent: 'granted' | 'denied' | 'required';
  escalation: 'none' | 'tightened' | 'switched' | 'handoff';
  reliability: number; // 0-100
  metadata?: Record<string, string>;
}

export interface IntegrityLogPreviewProps {
  /** Log entries to display */
  entries?: IntegrityLogEntry[];
  
  /** Detail level */
  detail?: LogDetail;
  
  /** Active filters */
  filters?: LogFilter[];
  
  /** Current lens */
  lens?: Lens;
  
  /** Max entries to show */
  maxEntries?: number;
  
  /** Callback when entry is expanded */
  onExpandEntry?: (entryId: string) => void;
}

const defaultEntries: IntegrityLogEntry[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    action: 'BREATH_4X4_PROTOCOL',
    consent: 'granted',
    escalation: 'none',
    reliability: 100,
    metadata: { target: 'Arousal regulation', duration: '10s' },
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    action: 'GUIDED_REFLECTION',
    consent: 'granted',
    escalation: 'none',
    reliability: 100,
    metadata: { target: 'Clarity enhancement', duration: '30s' },
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    action: 'BASELINE_CHECK',
    consent: 'granted',
    escalation: 'tightened',
    reliability: 95,
    metadata: { target: 'Drift detection', drift: 'moderate' },
  },
];

export const IntegrityLogPreview: React.FC<IntegrityLogPreviewProps> = ({
  entries = defaultEntries,
  detail = 'summary',
  filters = [],
  lens = 'individual',
  maxEntries = 10,
  onExpandEntry,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatTimestamp = (iso: string): string => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getConsentBadge = (consent: IntegrityLogEntry['consent']) => {
    const badges = {
      granted: { label: '✓', color: 'success' },
      denied: { label: '✗', color: 'error' },
      required: { label: '?', color: 'warning' },
    };
    return badges[consent];
  };

  const getEscalationBadge = (escalation: IntegrityLogEntry['escalation']) => {
    switch (lens) {
      case 'individual':
        return {
          none: 'Self-routed',
          tightened: 'Adjusted',
          switched: 'Changed approach',
          handoff: 'Support connected',
        }[escalation];
      case 'professional':
        return {
          none: 'Standard',
          tightened: 'Dose tightened',
          switched: 'Primitive switched',
          handoff: 'Escalated',
        }[escalation];
      case 'organisation':
        return {
          none: 'NONE',
          tightened: 'TIGHTENED',
          switched: 'SWITCHED',
          handoff: 'HANDOFF',
        }[escalation];
    }
  };

  const getReliabilityLabel = (reliability: number): string => {
    if (reliability >= 95) return 'High';
    if (reliability >= 80) return 'Moderate';
    return 'Low';
  };

  const getCopy = () => {
    switch (lens) {
      case 'individual':
        return {
          title: 'Activity Log',
          subtitle: 'Your recent moves and proof.',
          noEntries: 'No activity yet.',
          expandLabel: 'Details',
        };
      case 'professional':
        return {
          title: 'Delivery Log',
          subtitle: 'Auditable delivery logs, not bureaucratic.',
          noEntries: 'No logged interventions.',
          expandLabel: 'View details',
        };
      case 'organisation':
        return {
          title: 'Integrity Log',
          subtitle: 'Defensible audit trail with reliability metrics.',
          noEntries: 'No logged operations.',
          expandLabel: 'Audit details',
        };
    }
  };

  const copy = getCopy();

  const filteredEntries = entries
    .filter(entry => {
      if (filters.length === 0) return true;
      if (filters.includes('consent') && entry.consent !== 'granted') return true;
      if (filters.includes('escalation') && entry.escalation !== 'none') return true;
      if (filters.includes('reliability') && entry.reliability < 95) return true;
      return false;
    })
    .slice(0, maxEntries);

  const handleExpand = (entryId: string) => {
    setExpandedId(expandedId === entryId ? null : entryId);
    onExpandEntry?.(entryId);
  };

  return (
    <div className={`integrity-log integrity-log--${lens} integrity-log--${detail}`}>
      <div className="integrity-log__header">
        <h3 className="integrity-log__title">{copy.title}</h3>
        <p className="integrity-log__subtitle">{copy.subtitle}</p>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="integrity-log__empty">{copy.noEntries}</div>
      ) : (
        <div className="integrity-log__entries">
          {filteredEntries.map((entry, i) => {
            const consentBadge = getConsentBadge(entry.consent);
            const isExpanded = expandedId === entry.id;

            return (
              <motion.div
                key={entry.id}
                className={`integrity-log__entry ${isExpanded ? 'integrity-log__entry--expanded' : ''}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="integrity-log__entry-row" onClick={() => handleExpand(entry.id)}>
                  <div className="integrity-log__entry-main">
                    <div className="integrity-log__entry-action">{entry.action}</div>
                    <div className="integrity-log__entry-time">{formatTimestamp(entry.timestamp)}</div>
                  </div>
                  <div className="integrity-log__entry-badges">
                    <span className={`integrity-log__badge integrity-log__badge--${consentBadge.color}`}>
                      {consentBadge.label}
                    </span>
                    <span className="integrity-log__badge integrity-log__badge--escalation">
                      {getEscalationBadge(entry.escalation)}
                    </span>
                    <span className={`integrity-log__badge integrity-log__badge--reliability-${getReliabilityLabel(entry.reliability).toLowerCase()}`}>
                      {entry.reliability}%
                    </span>
                  </div>
                </div>

                {(detail === 'expanded' || isExpanded) && entry.metadata && (
                  <motion.div
                    className="integrity-log__entry-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="integrity-log__metadata">
                      {Object.entries(entry.metadata).map(([key, value]) => (
                        <div key={key} className="integrity-log__metadata-row">
                          <span className="integrity-log__metadata-key">{key}:</span>
                          <span className="integrity-log__metadata-value">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="integrity-log__audit-id">
                      <span className="integrity-log__audit-label">ID:</span>
                      <span className="integrity-log__audit-value">{entry.id}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
