import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import './IntegrityLogPreview.css';
const defaultEntries = [
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
export const IntegrityLogPreview = ({ entries = defaultEntries, detail = 'summary', filters = [], lens = 'individual', maxEntries = 10, onExpandEntry, }) => {
    const [expandedId, setExpandedId] = useState(null);
    const formatTimestamp = (iso) => {
        const date = new Date(iso);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1)
            return 'Just now';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        return `${days}d ago`;
    };
    const getConsentBadge = (consent) => {
        const badges = {
            granted: { label: '✓', color: 'success' },
            denied: { label: '✗', color: 'error' },
            required: { label: '?', color: 'warning' },
        };
        return badges[consent];
    };
    const getEscalationBadge = (escalation) => {
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
    const getReliabilityLabel = (reliability) => {
        if (reliability >= 95)
            return 'High';
        if (reliability >= 80)
            return 'Moderate';
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
        if (filters.length === 0)
            return true;
        if (filters.includes('consent') && entry.consent !== 'granted')
            return true;
        if (filters.includes('escalation') && entry.escalation !== 'none')
            return true;
        if (filters.includes('reliability') && entry.reliability < 95)
            return true;
        return false;
    })
        .slice(0, maxEntries);
    const handleExpand = (entryId) => {
        setExpandedId(expandedId === entryId ? null : entryId);
        onExpandEntry?.(entryId);
    };
    return (_jsxs("div", { className: `integrity-log integrity-log--${lens} integrity-log--${detail}`, children: [_jsxs("div", { className: "integrity-log__header", children: [_jsx("h3", { className: "integrity-log__title", children: copy.title }), _jsx("p", { className: "integrity-log__subtitle", children: copy.subtitle })] }), filteredEntries.length === 0 ? (_jsx("div", { className: "integrity-log__empty", children: copy.noEntries })) : (_jsx("div", { className: "integrity-log__entries", children: filteredEntries.map((entry, i) => {
                    const consentBadge = getConsentBadge(entry.consent);
                    const isExpanded = expandedId === entry.id;
                    return (_jsxs(motion.div, { className: `integrity-log__entry ${isExpanded ? 'integrity-log__entry--expanded' : ''}`, initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.05 }, children: [_jsxs("div", { className: "integrity-log__entry-row", onClick: () => handleExpand(entry.id), children: [_jsxs("div", { className: "integrity-log__entry-main", children: [_jsx("div", { className: "integrity-log__entry-action", children: entry.action }), _jsx("div", { className: "integrity-log__entry-time", children: formatTimestamp(entry.timestamp) })] }), _jsxs("div", { className: "integrity-log__entry-badges", children: [_jsx("span", { className: `integrity-log__badge integrity-log__badge--${consentBadge.color}`, children: consentBadge.label }), _jsx("span", { className: "integrity-log__badge integrity-log__badge--escalation", children: getEscalationBadge(entry.escalation) }), _jsxs("span", { className: `integrity-log__badge integrity-log__badge--reliability-${getReliabilityLabel(entry.reliability).toLowerCase()}`, children: [entry.reliability, "%"] })] })] }), (detail === 'expanded' || isExpanded) && entry.metadata && (_jsxs(motion.div, { className: "integrity-log__entry-details", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "integrity-log__metadata", children: Object.entries(entry.metadata).map(([key, value]) => (_jsxs("div", { className: "integrity-log__metadata-row", children: [_jsxs("span", { className: "integrity-log__metadata-key", children: [key, ":"] }), _jsx("span", { className: "integrity-log__metadata-value", children: value })] }, key))) }), _jsxs("div", { className: "integrity-log__audit-id", children: [_jsx("span", { className: "integrity-log__audit-label", children: "ID:" }), _jsx("span", { className: "integrity-log__audit-value", children: entry.id })] })] }))] }, entry.id));
                }) }))] }));
};
