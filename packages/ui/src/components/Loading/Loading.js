import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Loading.css';
export function LoadingSpinner({ size = 'md', className = '' }) {
    return (_jsxs("div", { className: `ro-spinner ro-spinner--${size} ${className}`, role: "status", "aria-label": "Loading", children: [_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", opacity: "0.25" }), _jsx("path", { d: "M12 2a10 10 0 0 1 10 10", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })] }), _jsx("span", { className: "ro-spinner__label", children: "Loading..." })] }));
}
export function Skeleton({ variant = 'text', width, height, className = '', }) {
    const style = {
        width,
        height: height || (variant === 'text' ? '1em' : undefined),
    };
    return (_jsx("div", { className: `ro-skeleton ro-skeleton--${variant} ${className}`, style: style, "aria-hidden": "true" }));
}
export function PageLoader({ message = 'Loading...' }) {
    return (_jsxs("div", { className: "ro-page-loader", children: [_jsx(LoadingSpinner, { size: "lg" }), _jsx("p", { className: "ro-page-loader__message", children: message })] }));
}
