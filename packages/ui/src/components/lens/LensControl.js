import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import './LensControl.css';
export const LensControl = ({ value, onChange, size = 'comfortable', }) => {
    const lenses = [
        { value: 'individual', label: 'Individual', icon: '●' },
        { value: 'professional', label: 'Professional', icon: '◆' },
        { value: 'organisation', label: 'Organisation', icon: '■' },
    ];
    return (_jsx("div", { className: `lens-control lens-control--${size}`, children: _jsx("div", { className: "lens-control__track", children: lenses.map((lens) => {
                const isActive = value === lens.value;
                return (_jsxs(motion.button, { className: `lens-control__option ${isActive ? 'lens-control__option--active' : ''}`, onClick: () => onChange(lens.value), whileHover: { scale: isActive ? 1 : 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx("span", { className: "lens-control__icon", children: lens.icon }), _jsx("span", { className: "lens-control__label", children: lens.label }), isActive && (_jsx(motion.div, { className: "lens-control__active-indicator", layoutId: "lens-active-indicator", transition: {
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            } }))] }, lens.value));
            }) }) }));
};
