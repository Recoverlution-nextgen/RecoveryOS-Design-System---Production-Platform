import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getPillarColors } from '../../../assets/tokens';
import './PillarHalo.css';
export function PillarHalo({ pillarId, size = 'md', intensity = 'medium', animated = false, className = '', children }) {
    const colors = getPillarColors(pillarId);
    return (_jsxs("div", { className: `ro-pillar-halo ro-pillar-halo--${size} ro-pillar-halo--${intensity} ${animated ? 'ro-pillar-halo--animated' : ''} ${className}`, "data-pillar": pillarId, style: {
            '--pillar-primary': colors.primary,
            '--pillar-secondary': colors.secondary,
        }, children: [_jsx("div", { className: "ro-pillar-halo__glow" }), children && _jsx("div", { className: "ro-pillar-halo__content", children: children })] }));
}
