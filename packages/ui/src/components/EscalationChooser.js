import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const EscalationChooser = ({ options, selectedId, onSelect }) => {
    return (_jsxs("div", { className: "panel", role: "radiogroup", "aria-label": "Escalation options", children: [_jsx("h3", { className: "panel-title", children: "Escalation path" }), _jsx("p", { className: "panel-subtitle", children: "Choose who to bring in, by protocol and consent." }), _jsx("div", { className: "list", children: options.map((opt) => {
                    const active = selectedId === opt.id;
                    return (_jsxs("div", { className: "list-row", role: "radio", "aria-checked": active, tabIndex: 0, onClick: () => onSelect?.(opt.id), onKeyDown: (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onSelect?.(opt.id);
                            }
                        }, children: [_jsx("div", { className: `badge ${active ? 'safe' : 'caution'}`, children: active ? 'Selected' : 'Available' }), _jsxs("div", { className: "stack", style: { gap: 4 }, children: [_jsx("span", { style: { fontWeight: 600 }, children: opt.label }), _jsx("span", { className: "subtitle", style: { margin: 0 }, children: opt.description }), _jsxs("div", { className: "row", style: { gap: 8 }, children: [opt.contact ? _jsxs("span", { className: "chip", children: ["Contact: ", opt.contact] }) : null, opt.protocol ? _jsxs("span", { className: "chip", children: ["Protocol: ", opt.protocol] }) : null] })] })] }, opt.id));
                }) })] }));
};
