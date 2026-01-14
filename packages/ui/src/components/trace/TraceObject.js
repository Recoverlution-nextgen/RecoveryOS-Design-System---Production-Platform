import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import './TraceObject.css';
export const TraceObject = ({ id, state = 'draft', copy, timestamp, metadata, lens = 'individual', onClick, }) => {
    // Format timestamp per lens
    const formatTimestamp = (ts) => {
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
    return (_jsxs(motion.article, { className: `trace-object trace-object--${state} trace-object--${lens}`, onClick: onClick, initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
        }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "trace-object__surface", children: [_jsx("div", { className: "trace-object__copy", children: copy }), state === 'sealed' && (_jsx(motion.div, { className: "trace-object__seal", initial: { scale: 0 }, animate: { scale: 1 }, transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                            delay: 0.2,
                        }, children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: _jsx("path", { d: "M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z", fill: "currentColor" }) }) }))] }), _jsxs("div", { className: "trace-object__metadata", children: [_jsx("time", { className: "trace-object__timestamp", children: formatTimestamp(timestamp) }), metadata?.gripType && (_jsx("span", { className: `trace-object__grip-badge trace-object__grip-badge--${metadata.gripType}`, children: metadata.gripType })), metadata?.duration && (_jsx("span", { className: "trace-object__duration", children: metadata.duration < 60 ? `${metadata.duration}s` : `${Math.floor(metadata.duration / 60)}m` }))] })] }));
};
