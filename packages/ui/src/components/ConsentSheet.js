import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ConsentSheet = ({ title = 'Consent preferences', subtitle = 'Choose what the system can see and when it can speak.', scopes, onToggle, }) => {
    return (_jsxs("div", { className: "panel", role: "group", "aria-label": title, children: [_jsx("h3", { className: "panel-title", children: title }), _jsx("p", { className: "panel-subtitle", children: subtitle }), _jsx("div", { className: "list", children: scopes.map((scope) => (_jsxs("div", { className: "list-row", children: [_jsx("div", { className: `toggle ${scope.enabled ? 'on' : ''}`, children: _jsx("div", { className: "toggle-thumb", role: "switch", "aria-checked": scope.enabled, tabIndex: 0, onClick: () => onToggle?.(scope.id, !scope.enabled), onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onToggle?.(scope.id, !scope.enabled);
                                    }
                                } }) }), _jsxs("div", { className: "stack", style: { gap: 4 }, children: [_jsxs("div", { className: "row", style: { gap: 6 }, children: [_jsx("span", { style: { fontWeight: 600 }, children: scope.label }), scope.required ? _jsx("span", { className: "chip", children: "Required" }) : null] }), _jsx("span", { className: "subtitle", style: { margin: 0 }, children: scope.description })] })] }, scope.id))) })] }));
};
