import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RoomHeader } from "../RoomHeader/RoomHeader";
export function RoomFrame({ lens, stateBand, header, panel, footer, children, policy, className, style, onEmit }) {
    const reducePanels = policy?.reducePanelsWhenHigh ?? true;
    const minMain = policy?.minMainWidthPx ?? 540;
    const hidePanel = (panel?.hideWhenHigh ?? true) && reducePanels && stateBand === "high";
    const frame = {
        background: "var(--semantic-surface-room, var(--semantic-surface-portal))",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)"
    };
    return (_jsxs("section", { className: className, style: { ...frame, ...style }, "aria-label": "Room", children: [_jsx(RoomHeader, { lens: lens, stateBand: stateBand, model: header, onEmit: onEmit }), _jsxs("div", { style: { display: "grid", gridTemplateColumns: hidePanel ? "1fr" : `minmax(${minMain}px, 1fr) 360px`, gap: "var(--space-4)" }, children: [_jsx("main", { style: { border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)" }, children: children }), !hidePanel && panel ? (_jsxs("aside", { style: { border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)", overflow: "hidden" }, children: [panel.title ? (_jsx("div", { style: { padding: "var(--space-3)", borderBottom: "1px solid var(--semantic-border-subtle)", color: "var(--semantic-text-primary)" }, children: panel.title })) : null, _jsx("div", { children: panel.render() })] })) : null] }), footer ? _jsx("footer", { children: footer }) : null] }));
}
