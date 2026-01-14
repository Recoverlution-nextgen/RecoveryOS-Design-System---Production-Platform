import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './form.css';
export function Button({ variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props }) {
    const classes = [
        'ro-button',
        variant !== 'primary' && `ro-button--${variant}`,
        size !== 'md' && `ro-button--${size}`,
        loading && 'ro-button--loading',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("button", { className: classes, disabled: disabled || loading, ...props, children: [loading && _jsx("span", { className: "ro-button__spinner", "aria-hidden": "true" }), children] }));
}
