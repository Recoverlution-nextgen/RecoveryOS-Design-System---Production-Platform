import { jsx as _jsx } from "react/jsx-runtime";
import './Container.css';
export function Container({ size = 'lg', children, className = '' }) {
    return _jsx("div", { className: `ro-container ro-container--${size} ${className}`, children: children });
}
