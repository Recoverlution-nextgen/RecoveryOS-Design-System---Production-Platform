import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './CTACluster.css';
export function CTACluster({ primary, secondary, align = 'center', className = '' }) {
    const renderButton = (button, variant) => {
        const classes = `ro-cta-btn ro-cta-btn--${variant}`;
        if (button.href) {
            return (_jsx("a", { href: button.href, className: classes, children: button.label }));
        }
        return (_jsx("button", { type: "button", onClick: button.onClick, className: classes, children: button.label }));
    };
    return (_jsxs("div", { className: `ro-cta-cluster ro-cta-cluster--${align} ${className}`, children: [renderButton(primary, 'primary'), secondary && renderButton(secondary, 'secondary')] }));
}
