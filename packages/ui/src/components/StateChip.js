import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const StateChip = ({ label, value, tone = 'safe' }) => {
    return (_jsxs("div", { className: `badge ${tone}`, "aria-label": `${label} ${value}`, children: [_jsx("span", { className: "label", children: label }), _jsx("span", { children: value })] }));
};
