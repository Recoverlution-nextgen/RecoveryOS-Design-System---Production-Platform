import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './NodeCapsule.css';
export function NodeCapsule({ variant = 'default', size = 'md', label, className = '', children }) {
    return (_jsxs("div", { className: `ro-node-capsule ro-node-capsule--${variant} ro-node-capsule--${size} ${className}`, children: [_jsx("div", { className: "ro-node-capsule__border" }), _jsxs("div", { className: "ro-node-capsule__content", children: [label && _jsx("span", { className: "ro-node-capsule__label", children: label }), children] })] }));
}
