import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import './ErrorBoundary.css';
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                hasError: false,
            }
        });
        Object.defineProperty(this, "handleReset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.setState({ hasError: false, error: undefined });
            }
        });
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (_jsx("div", { className: "ro-error-boundary", children: _jsxs("div", { className: "ro-error-boundary__content", children: [_jsx("div", { className: "ro-error-boundary__icon", "aria-hidden": "true", children: _jsxs("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M12 7v6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("circle", { cx: "12", cy: "16", r: "0.5", fill: "currentColor" })] }) }), _jsx("h2", { className: "ro-error-boundary__title", children: "Something went wrong" }), _jsx("p", { className: "ro-error-boundary__message", children: "We encountered an unexpected error. The issue has been logged." }), process.env.NODE_ENV === 'development' && this.state.error && (_jsxs("details", { className: "ro-error-boundary__details", children: [_jsx("summary", { children: "Error details" }), _jsxs("pre", { className: "ro-error-boundary__stack", children: [this.state.error.toString(), this.state.error.stack] })] })), _jsx("button", { type: "button", className: "ro-error-boundary__button", onClick: this.handleReset, children: "Try again" })] }) }));
        }
        return this.props.children;
    }
}
