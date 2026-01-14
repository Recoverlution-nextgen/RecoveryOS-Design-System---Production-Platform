import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './SiteLensToggle.css';
const LENS_OPTIONS = [
    { id: 'individual', label: 'Individual', short: 'Me' },
    { id: 'professional', label: 'Professional', short: 'Care' },
    { id: 'organisation', label: 'Organisation', short: 'System' },
];
export function SiteLensToggle({ value, onChange, variant = 'chrome', className = '' }) {
    return (_jsxs("div", { className: `ro-site-lens ro-site-lens--${variant} ${className}`, role: "group", "aria-label": "Lens selector", children: [LENS_OPTIONS.map((lens) => (_jsxs("button", { type: "button", className: `ro-site-lens__btn ${value === lens.id ? 'ro-site-lens__btn--active' : ''}`, onClick: () => onChange(lens.id), "aria-pressed": value === lens.id, "data-lens": lens.id, children: [_jsx("span", { className: "ro-site-lens__label", children: lens.label }), _jsx("span", { className: "ro-site-lens__short", children: lens.short })] }, lens.id))), _jsx("div", { className: "ro-site-lens__indicator", "data-active": value, style: {
                    '--lens-index': LENS_OPTIONS.findIndex((l) => l.id === value),
                } })] }));
}
