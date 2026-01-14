import { jsx as _jsx } from "react/jsx-runtime";
import './Section.css';
export function Section({ variant = 'default', ambient = false, children, id, className = '', }) {
    return (_jsx("section", { id: id, className: `ro-section ro-section--${variant} ${ambient ? 'ro-section--ambient' : ''} ${className}`, "data-variant": variant, children: children }));
}
