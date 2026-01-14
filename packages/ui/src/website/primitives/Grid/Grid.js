import { jsx as _jsx } from "react/jsx-runtime";
import './Grid.css';
export function Grid({ columns = 2, gap = 'md', responsive = true, children, className = '', }) {
    return (_jsx("div", { className: `ro-grid ro-grid--${columns}col ro-grid--gap-${gap} ${responsive ? 'ro-grid--responsive' : ''} ${className}`, "data-columns": columns, children: children }));
}
