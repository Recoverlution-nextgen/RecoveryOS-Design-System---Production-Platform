import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * GripGenerator — Intent + Time picker
 *
 * Direction: Anchor (settle) | Compass (orient) | Handrail (hold)
 * Duration: 10s | 30s | 2m
 *
 * Flow: Choose direction → Pick time → Confirm → Launch GripPlayer
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GripGenerator.css';
export const GripGenerator = ({ lens = 'individual', onConfirm, onCancel, }) => {
    const [step, setStep] = useState('direction');
    const [direction, setDirection] = useState(null);
    const [duration, setDuration] = useState(10);
    const handleDirectionSelect = (dir) => {
        setDirection(dir);
        setStep('duration');
    };
    const handleDurationSelect = (dur) => {
        setDuration(dur);
    };
    const handleConfirm = () => {
        if (direction) {
            onConfirm?.({ direction, duration });
        }
    };
    // Copy per lens and step
    const copy = {
        individual: {
            title: step === 'direction' ? 'What kind of help?' : 'How long?',
            anchor: { label: 'Settle', description: 'Ground yourself' },
            compass: { label: 'Orient', description: 'Find direction' },
            handrail: { label: 'Hold on', description: 'Stay steady' },
            confirm: 'Start',
        },
        professional: {
            title: step === 'direction' ? 'Select grip type' : 'Duration',
            anchor: { label: 'Anchor', description: 'Grounding protocol' },
            compass: { label: 'Compass', description: 'Orientation support' },
            handrail: { label: 'Handrail', description: 'Sustained hold' },
            confirm: 'Begin',
        },
        organisation: {
            title: step === 'direction' ? 'Grip type' : 'Duration (seconds)',
            anchor: { label: 'ANCHOR', description: 'Settling sequence' },
            compass: { label: 'COMPASS', description: 'Orienting sequence' },
            handrail: { label: 'HANDRAIL', description: 'Sustained sequence' },
            confirm: 'Execute',
        },
    };
    const directionOptions = ['anchor', 'compass', 'handrail'];
    const durationOptions = [10, 30, 120];
    return (_jsxs(motion.div, { className: `grip-generator grip-generator--${lens}`, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25,
        }, children: [_jsxs("header", { className: "grip-generator__header", children: [_jsx("h2", { className: "grip-generator__title", children: copy[lens].title }), _jsx("button", { className: "grip-generator__close", onClick: onCancel, "aria-label": "Close", children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: _jsx("path", { d: "M4 4L12 12M12 4L4 12", stroke: "currentColor", strokeWidth: "2" }) }) })] }), _jsxs(AnimatePresence, { mode: "wait", children: [step === 'direction' && (_jsx(motion.div, { className: "grip-generator__step", initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 8 }, transition: { duration: 0.2 }, children: _jsx("div", { className: "grip-generator__options", children: directionOptions.map((dir) => (_jsxs(motion.button, { className: `grip-generator__option grip-generator__option--${dir}`, onClick: () => handleDirectionSelect(dir), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("span", { className: "grip-generator__option-label", children: copy[lens][dir].label }), _jsx("span", { className: "grip-generator__option-description", children: copy[lens][dir].description })] }, dir))) }) }, "direction")), step === 'duration' && (_jsxs(motion.div, { className: "grip-generator__step", initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 8 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "grip-generator__duration-options", children: durationOptions.map((dur) => (_jsx(motion.button, { className: `grip-generator__duration-option ${duration === dur ? 'grip-generator__duration-option--selected' : ''}`, onClick: () => handleDurationSelect(dur), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: dur < 60 ? `${dur}s` : `${Math.floor(dur / 60)}m` }, dur))) }), _jsxs("div", { className: "grip-generator__actions", children: [_jsx(motion.button, { className: "grip-generator__back", onClick: () => setStep('direction'), whileTap: { scale: 0.95 }, children: "Back" }), _jsx(motion.button, { className: "grip-generator__confirm", onClick: handleConfirm, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: copy[lens].confirm })] })] }, "duration"))] })] }));
};
