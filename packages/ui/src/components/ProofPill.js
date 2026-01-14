import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const statusTone = {
    captured: 'safe',
    pending: 'caution',
    missed: 'alert',
};
const statusCopy = {
    captured: 'Proof captured',
    pending: 'Proof requested',
    missed: 'Proof missed',
};
export const ProofPill = ({ label, status, timestamp, intent }) => {
    const tone = statusTone[status];
    return (_jsx("div", { className: `badge ${tone}`, "aria-live": "polite", children: _jsxs("div", { className: "stack", style: { gap: 2 }, children: [_jsx("span", { style: { fontWeight: 600 }, children: label }), _jsxs("span", { style: { fontSize: 12, color: 'var(--color-text-secondary)' }, children: [statusCopy[status], intent ? ` · ${intent}` : '', timestamp ? ` · ${timestamp}` : ''] })] }) }));
};
