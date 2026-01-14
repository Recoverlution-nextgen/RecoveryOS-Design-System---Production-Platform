import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
export function parseLens(lens) {
    return Array.isArray(lens) ? lens[0] : lens;
}
export function parseBand(band) {
    return Array.isArray(band) ? band[0] : band;
}
export function Center({ children, className = '' }) {
    return (_jsx("div", { className: `flex items-center justify-center min-h-screen ${className}`, children: children }));
}
export function useAutoFocus(selector, enabled = true) {
    React.useEffect(() => {
        if (!enabled)
            return;
        const element = document.querySelector(selector);
        if (element) {
            element.focus();
        }
    }, [selector, enabled]);
}
export function AutoFocus({ selector, enabled = true, children }) {
    useAutoFocus(selector, enabled);
    return _jsx(_Fragment, { children: children });
}
