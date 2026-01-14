import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ReturnButton — The universal action surface
 *
 * Tap → Default Grip (Anchor, 10s)
 * Long-press → GripGenerator (choose direction + time)
 *
 * States: Idle → Hover → Press → Active → Confirm → Hold
 */
import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './ReturnButton.css';
export const ReturnButton = ({ lens = 'individual', drift = 'low', attention = 'calm', onTap, onLongPress, pressThreshold = 400, }) => {
    const [state, setState] = useState('idle');
    const [pressTimer, setPressTimer] = useState(null);
    const scale = useMotionValue(1);
    const glow = useTransform(scale, [1, 0.95], [0, 1]);
    const handlePressStart = () => {
        setState('press');
        scale.set(0.95);
        const timer = setTimeout(() => {
            setState('hold');
            onLongPress?.();
        }, pressThreshold);
        setPressTimer(timer);
    };
    const handlePressEnd = () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
        }
        if (state === 'press') {
            setState('confirm');
            onTap?.();
            setTimeout(() => {
                setState('idle');
                scale.set(1);
            }, 300);
        }
        else {
            setState('idle');
            scale.set(1);
        }
        setPressTimer(null);
    };
    const handleHoverStart = () => {
        if (state === 'idle') {
            setState('hover');
        }
    };
    const handleHoverEnd = () => {
        if (state === 'hover') {
            setState('idle');
        }
    };
    // Copy variants per lens
    const copy = {
        individual: 'Return',
        professional: 'Initiate',
        organisation: 'Activate',
    };
    return (_jsxs(motion.button, { className: `return-button return-button--${lens} return-button--${state} return-button--drift-${drift} return-button--${attention}`, style: { scale }, onPointerDown: handlePressStart, onPointerUp: handlePressEnd, onPointerCancel: handlePressEnd, onHoverStart: handleHoverStart, onHoverEnd: handleHoverEnd, whileTap: { scale: 0.95 }, transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
        }, children: [_jsx(motion.div, { className: "return-button__glow", style: { opacity: glow } }), _jsx("span", { className: "return-button__label", children: copy[lens] }), _jsx(motion.div, { className: "return-button__hold-indicator", initial: { scaleX: 0 }, animate: { scaleX: state === 'press' ? 1 : 0 }, transition: { duration: pressThreshold / 1000 } })] }));
};
