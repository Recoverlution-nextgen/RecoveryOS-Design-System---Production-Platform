import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const defaultSteps = [
    { id: 'experience', label: 'Experience', description: 'Felt shift, body-first', status: 'active' },
    { id: 'recognise', label: 'Recognise', description: 'Name it while it happens', status: 'pending' },
    { id: 'align', label: 'Align', description: 'Place one real-world move', status: 'pending' },
];
const statusTone = {
    done: 'safe',
    active: 'caution',
    pending: 'alert',
};
export const ERALane = ({ steps = defaultSteps }) => {
    return (_jsx("div", { className: "card", "aria-label": "ERA lane", children: _jsxs("div", { className: "stack", style: { gap: 10 }, children: [_jsxs("div", { className: "row", style: { justifyContent: 'space-between' }, children: [_jsxs("div", { className: "stack", style: { gap: 4 }, children: [_jsx("p", { className: "label", children: "WEEKLY LOOP \u00B7 ERA" }), _jsx("h3", { className: "title", style: { margin: 0 }, children: "Experience \u2192 Recognise \u2192 Align" })] }), _jsx("span", { className: "label", children: "Baselines" })] }), _jsx("div", { className: "timeline", children: steps.map((step) => (_jsxs("div", { className: "timeline-step", children: [_jsxs("div", { className: "step-head", children: [_jsx("span", { className: `badge ${statusTone[step.status]}`, children: step.status }), _jsx("span", { className: "label", children: step.id })] }), _jsx("h4", { className: "title", style: { fontSize: 16, lineHeight: '22px', margin: '4px 0' }, children: step.label }), step.description ? (_jsx("p", { className: "subtitle", style: { margin: 0 }, children: step.description })) : null] }, step.id))) })] }) }));
};
