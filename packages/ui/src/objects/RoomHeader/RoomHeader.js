import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { testAttr } from "../../utils/testIds";
export function RoomHeader({ stateBand, model, compact, className, style, policy, onEmit, onAction, testId }) {
    const reduce = policy?.reduceDetailWhenHigh ?? true;
    const maxActions = policy?.maxActions ?? 2;
    const hideDetails = reduce && stateBand === "high";
    const container = {
        background: "var(--semantic-surface-roomHeader, var(--semantic-surface-panel))",
        border: "1px solid var(--semantic-border-subtle)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-soft)",
        padding: compact ? "var(--space-3)" : "var(--space-4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)"
    };
    const titleStyle = {
        fontSize: 18,
        margin: 0,
        color: "var(--semantic-text-primary)"
    };
    const subStyle = {
        fontSize: 13,
        margin: "6px 0 0 0",
        color: "var(--semantic-text-secondary)"
    };
    const actions = (model.actions || []).slice(0, maxActions);
    return (_jsxs("header", { className: className, style: { ...container, ...style }, ...testAttr(testId), "aria-label": "Room header", children: [_jsxs("div", { style: { minWidth: 0 }, children: [_jsx("h1", { style: titleStyle, children: model.title }), !hideDetails && model.subtitle ? _jsx("p", { style: subStyle, children: model.subtitle }) : null, !hideDetails && model.context ? _jsx("p", { style: { ...subStyle, marginTop: 4 }, children: model.context }) : null] }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "var(--space-3)" }, children: [!hideDetails && model.status?.node ? _jsx("div", { children: model.status.node }) : null, _jsx("div", { style: { display: "flex", gap: "var(--space-2)" }, children: actions.map((a, idx) => (_jsx("button", { type: "button", ...testAttr(a.kind === "primary" ? "roomheader-action-primary" : undefined), disabled: a.disabled, onClick: () => {
                                a.onPress?.();
                                onAction?.(a, "pointer");
                                onEmit?.({ type: "room.primary_action", timestamp: Date.now(), action_id: a.id, method: "pointer" });
                            }, onKeyDown: (e) => {
                                if ((e.key === "Enter" || e.key === " ") && !a.disabled) {
                                    onAction?.(a, "keyboard");
                                    onEmit?.({ type: "room.primary_action", timestamp: Date.now(), action_id: a.id, method: "keyboard" });
                                }
                            }, style: {
                                appearance: "none",
                                border: "1px solid var(--semantic-border-strong)",
                                background: a.kind === "primary"
                                    ? "var(--semantic-surface-portal, var(--semantic-surface-panel))"
                                    : "transparent",
                                color: "var(--semantic-text-primary)",
                                borderRadius: "999px",
                                padding: "10px 14px",
                                cursor: a.disabled ? "not-allowed" : "pointer",
                                outline: "none"
                            }, children: a.label }, a.id))) })] })] }));
}
