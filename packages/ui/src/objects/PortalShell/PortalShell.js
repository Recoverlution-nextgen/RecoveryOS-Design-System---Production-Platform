import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { testAttr } from "../../utils/testIds";
export function PortalShell({ lens, stateBand, rooms, rails, initialRoomId = "home", showContextRail = true, showArtifactRail = true, collapseRailsBelowPx = 1100, className, style, testId }) {
    const [room, setRoom] = React.useState(initialRoomId);
    const allowedRooms = rooms.filter(r => !r.allowed_lenses || r.allowed_lenses.includes(lens));
    const activeRoom = allowedRooms.find(r => r.id === room) || allowedRooms[0];
    // Collapse rails at breakpoint (deterministic)
    const [collapsed, setCollapsed] = React.useState(false);
    React.useEffect(() => {
        const onResize = () => setCollapsed(window.innerWidth < collapseRailsBelowPx);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [collapseRailsBelowPx]);
    const shell = {
        border: "1px solid var(--semantic-border-subtle)",
        borderRadius: "var(--radius-xl)",
        background: "var(--semantic-surface-portal, var(--semantic-surface-room))",
        boxShadow: "var(--shadow-soft)",
        overflow: "hidden"
    };
    const header = {
        padding: "var(--space-4)",
        borderBottom: "1px solid var(--semantic-border-subtle)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };
    return (_jsxs("div", { className: className, style: { ...shell, ...style }, ...testAttr(testId), children: [_jsxs("div", { style: header, children: [_jsx("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--semantic-text-primary)" }, children: "Portal" }), _jsxs("div", { style: { fontSize: 12, color: "var(--semantic-text-secondary)" }, children: [lens, " \u00B7 ", stateBand] })] }), _jsxs("div", { style: { display: "grid", gridTemplateColumns: collapsed ? "1fr" : "280px 1fr 360px", gap: "var(--space-4)", padding: "var(--space-4)" }, children: [!collapsed ? (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" }, children: [_jsxs("div", { style: { border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", padding: "var(--space-2)" }, children: [_jsx("div", { style: { fontSize: 12, color: "var(--semantic-text-secondary)", padding: "6px 10px" }, children: "Primary" }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-1)" }, children: (rails.primary || []).map((i) => (_jsx("button", { type: "button", onClick: () => setRoom(i.to_room || room), style: {
                                                textAlign: "left",
                                                border: "1px solid transparent",
                                                background: (i.to_room === activeRoom?.id) ? "var(--semantic-surface-railActive, var(--semantic-surface-railHover))" : "transparent",
                                                borderRadius: "999px",
                                                padding: "10px 12px",
                                                cursor: "pointer"
                                            }, children: i.label }, i.id))) })] }), showContextRail && rails.context ? (_jsxs("div", { style: { border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", padding: "var(--space-2)" }, children: [_jsx("div", { style: { fontSize: 12, color: "var(--semantic-text-secondary)", padding: "6px 10px" }, children: "Context" }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-1)" }, children: rails.context(activeRoom?.id || "home", lens).map((i) => (_jsx("button", { type: "button", style: { textAlign: "left", border: "1px solid transparent", background: "transparent", borderRadius: "999px", padding: "10px 12px", cursor: "pointer" }, children: i.label }, i.id))) })] })) : null] })) : null, _jsxs("div", { style: { border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)" }, children: [_jsx("div", { style: { padding: "var(--space-4)", borderBottom: "1px solid var(--semantic-border-subtle)" }, children: _jsx("div", { style: { fontSize: 16, fontWeight: 700 }, children: activeRoom?.title }) }), _jsx("div", { children: activeRoom?.render({ lens, stateBand, room_id: activeRoom?.id }) })] }), !collapsed && showArtifactRail ? (_jsxs("div", { style: { border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)" }, children: [_jsx("div", { style: { padding: "var(--space-3)", borderBottom: "1px solid var(--semantic-border-subtle)", fontSize: 12, color: "var(--semantic-text-secondary)" }, children: "Artifacts" }), _jsx("div", { style: { padding: "var(--space-2)", display: "flex", flexDirection: "column", gap: "var(--space-1)" }, children: (rails.artifact || []).map((a) => (_jsx("button", { type: "button", style: {
                                        textAlign: "left",
                                        border: "1px solid transparent",
                                        background: "transparent",
                                        borderRadius: "999px",
                                        padding: "10px 12px",
                                        cursor: "pointer"
                                    }, children: a.label }, a.id))) })] })) : null] })] }));
}
