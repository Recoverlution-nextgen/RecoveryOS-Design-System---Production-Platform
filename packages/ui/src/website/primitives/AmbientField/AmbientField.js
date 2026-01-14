import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './AmbientField.css';
export function AmbientField({ variant = 'calm', intensity = 'medium', children, className = '', }) {
    // Check if variant is a pillar ID
    const isPillar = ['ER', 'SR', 'SC', 'CR', 'II', 'DM'].includes(variant);
    const dataVariant = isPillar ? 'pillar' : variant;
    return (_jsxs("div", { className: `ro-ambient ro-ambient--${dataVariant} ro-ambient--${intensity} ${className}`, "data-variant": dataVariant, "data-pillar": isPillar ? variant : undefined, "data-intensity": intensity, "aria-hidden": "true", children: [_jsx("div", { className: "ro-ambient__glow" }), _jsx("div", { className: "ro-ambient__glass" }), children] }));
}
