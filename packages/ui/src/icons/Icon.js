import { jsx as _jsx } from "react/jsx-runtime";
import { GLYPHS } from './glyphs';
import './icon.css';
export function Icon({ name, size = 24, tone = 'ink', pulse = false, className = '', 'aria-label': ariaLabel, }) {
    const glyph = GLYPHS[name];
    if (!glyph) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }
    // Stroke width scales with icon size (1.75px at 24px)
    const strokeWidth = (size / 24) * 1.75;
    const classes = [
        'ro-icon',
        `ro-icon--${tone}`,
        pulse && 'ro-icon--pulse',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsx("span", { className: classes, "aria-label": ariaLabel, role: ariaLabel ? 'img' : undefined, children: _jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", strokeLinecap: "round", strokeLinejoin: "round", children: glyph({ sw: strokeWidth }) }) }));
}
