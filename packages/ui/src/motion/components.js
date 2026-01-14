import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionConfig } from './config';
import { useReducedMotion } from './hooks';
export const MotionCard = React.forwardRef(({ children, delay = 0, variant = 'slideUp', ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const variants = motionConfig.variants[variant];
    return (_jsx(motion.div, { ref: ref, initial: "hidden", animate: "visible", exit: "exit", variants: variants, transition: prefersReduced ? { duration: 0 } : { ...motionConfig.spring.gentle, delay }, className: "card", ...props, children: children }));
});
MotionCard.displayName = 'MotionCard';
export const MotionButton = React.forwardRef(({ children, variant = 'primary', ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    return (_jsx(motion.button, { ref: ref, className: `button ${variant === 'secondary' ? 'secondary' : ''}`, whileHover: prefersReduced ? {} : { scale: 1.02 }, whileTap: prefersReduced ? {} : { scale: 0.98 }, transition: motionConfig.spring.snappy, ...props, children: children }));
});
MotionButton.displayName = 'MotionButton';
export const MotionProofPill = React.forwardRef(({ label, status, celebrating = false, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    return (_jsx(motion.div, { ref: ref, className: `badge ${status}`, initial: prefersReduced ? {} : { scale: 0.8, opacity: 0 }, animate: celebrating && !prefersReduced
            ? {
                scale: [1, 1.15, 1],
                opacity: 1,
                backgroundColor: ['rgba(126, 224, 163, 0.14)', 'rgba(126, 224, 163, 0.3)', 'rgba(126, 224, 163, 0.14)'],
            }
            : { scale: 1, opacity: 1 }, transition: celebrating && !prefersReduced
            ? motionConfig.spring.bouncy
            : { duration: motionConfig.duration.fast }, ...props, children: _jsx("span", { children: label }) }));
});
MotionProofPill.displayName = 'MotionProofPill';
export const MotionView = React.forwardRef(({ children, isExiting = false }, ref) => {
    const prefersReduced = useReducedMotion();
    return (_jsx(motion.div, { ref: ref, initial: prefersReduced ? {} : { opacity: 0 }, animate: prefersReduced ? {} : { opacity: 1 }, exit: prefersReduced ? {} : { opacity: 0 }, transition: { duration: motionConfig.duration.fast / 1000 }, children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: prefersReduced ? {} : { opacity: 0, y: 10 }, animate: prefersReduced ? {} : { opacity: 1, y: 0 }, exit: prefersReduced ? {} : { opacity: 0, y: -10 }, transition: { duration: motionConfig.duration.base / 1000 }, children: children }, isExiting ? 'exiting' : 'visible') }) }));
});
MotionView.displayName = 'MotionView';
export const MotionList = React.forwardRef(({ items, layout = 'vertical' }, ref) => {
    const prefersReduced = useReducedMotion();
    return (_jsx(motion.div, { ref: ref, className: layout === 'vertical' ? 'list' : 'row', initial: prefersReduced ? {} : 'hidden', animate: prefersReduced ? {} : 'visible', variants: {
            visible: {
                transition: {
                    staggerChildren: prefersReduced ? 0 : motionConfig.transitions.viewChange.stagger,
                },
            },
        }, children: items.map((item, idx) => (_jsx(motion.div, { variants: motionConfig.variants.slideUp, transition: motionConfig.spring.gentle, children: item }, idx))) }));
});
MotionList.displayName = 'MotionList';
export const MotionToggle = React.forwardRef(({ checked, onChange }, ref) => {
    const prefersReduced = useReducedMotion();
    return (_jsx(motion.div, { ref: ref, className: `toggle ${checked ? 'on' : ''}`, onClick: () => onChange?.(!checked), role: "switch", "aria-checked": checked, tabIndex: 0, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange?.(!checked);
            }
        }, children: _jsx(motion.div, { className: "toggle-thumb", animate: prefersReduced ? {} : { x: checked ? 18 : 0 }, transition: motionConfig.spring.snappy }) }));
});
MotionToggle.displayName = 'MotionToggle';
export const MotionAlert = React.forwardRef(({ active = false, children }, ref) => {
    const prefersReduced = useReducedMotion();
    return (_jsx(motion.div, { ref: ref, animate: active && !prefersReduced
            ? {
                x: [-8, 8, -8, 8, 0],
                boxShadow: [
                    '0 0 0 0 rgba(255, 111, 97, 0.7)',
                    '0 0 20px 10px rgba(255, 111, 97, 0.3)',
                    '0 0 0 0 rgba(255, 111, 97, 0)',
                ],
            }
            : {}, transition: active && !prefersReduced ? { duration: 0.6, ease: 'easeInOut' } : {}, children: children }));
});
MotionAlert.displayName = 'MotionAlert';
