import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TraceObject } from '../trace/TraceObject';
import './ThreadView.css';
export const ThreadView = ({ traces, state = 'growing', lens = 'individual', title, week, }) => {
    // Copy per lens
    const threadLabel = {
        individual: 'Your thread',
        professional: 'Continuity line',
        organisation: 'Thread archive',
    };
    return (_jsxs(motion.section, { className: `thread-view thread-view--${state} thread-view--${lens}`, initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 }, children: [_jsxs("header", { className: "thread-view__header", children: [_jsx("h2", { className: "thread-view__title", children: title || threadLabel[lens] }), week && (_jsxs("span", { className: "thread-view__week", children: ["Week ", week] })), _jsxs("span", { className: "thread-view__count", children: [traces.length, " ", traces.length === 1 ? 'trace' : 'traces'] })] }), _jsxs("div", { className: "thread-view__timeline", children: [_jsx(motion.div, { className: "thread-view__line", initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: {
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                            delay: 0.2,
                        } }), _jsx("div", { className: "thread-view__traces", children: traces.map((trace, index) => (_jsxs(motion.div, { className: "thread-view__node", initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: {
                                delay: 0.3 + index * 0.1,
                                type: 'spring',
                                stiffness: 300,
                                damping: 25,
                            }, children: [_jsx(motion.div, { className: "thread-view__node-dot", initial: { scale: 0 }, animate: { scale: 1 }, transition: {
                                        delay: 0.3 + index * 0.1,
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 20,
                                    } }), _jsx(TraceObject, { ...trace, lens: lens })] }, trace.id))) })] }), traces.length === 0 && (_jsx("div", { className: "thread-view__empty", children: _jsxs("p", { className: "thread-view__empty-text", children: [lens === 'individual' && 'No traces yet. Return when ready.', lens === 'professional' && 'Thread empty. Start continuity.', lens === 'organisation' && 'No trace records found.'] }) }))] }));
};
