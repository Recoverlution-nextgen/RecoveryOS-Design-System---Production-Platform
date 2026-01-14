import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useReducedMotion } from "../../utils/reducedMotion";
import { testAttr } from "../../utils/testIds";
export function SystemMessageToastHost({ state, a11y, onDismiss, onAction, className, style, testId }) {
    const reduced = useReducedMotion();
    const ariaLive = a11y?.ariaLive ?? "polite";
    const label = a11y?.regionLabel ?? "System messages";
    // HARD LIMIT: max 3 visible
    const stack = state.stack.slice(-3);
    const hostStyle = {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        display: "grid",
        placeItems: "center",
        paddingBottom: "calc(var(--space-4) + env(safe-area-inset-bottom))",
        pointerEvents: "none",
        zIndex: 9999
    };
    const listStyle = {
        width: "min(720px, 92vw)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)"
    };
    const toastStyle = {
        pointerEvents: "auto",
        border: "1px solid var(--semantic-border-subtle)",
        background: "var(--semantic-surface-toast, var(--semantic-surface-panel))",
        color: "var(--semantic-text-primary)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-soft)",
        padding: "var(--space-3)",
        outline: "none",
        transition: reduced ? "none" : "opacity var(--motion-dur-settle, 140ms) var(--motion-ease-settle, ease-out)"
    };
    return (_jsx("div", { className: className, style: { ...hostStyle, ...style }, ...testAttr(testId), role: "region", "aria-label": label, "aria-live": ariaLive, children: _jsx("div", { style: listStyle, children: stack.map((t) => (_jsxs("div", { style: toastStyle, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: "var(--space-3)" }, children: [_jsxs("div", { style: { minWidth: 0 }, children: [_jsx("div", { style: { fontSize: 14, fontWeight: 600 }, children: t.title }), t.message ? (_jsx("div", { style: { marginTop: 4, fontSize: 13, color: "var(--semantic-text-secondary)" }, children: t.message })) : null] }), t.dismissible !== false ? (_jsx("button", { type: "button", "aria-label": "Dismiss", onClick: () => onDismiss?.(t.id, "close_btn"), style: {
                                    border: "1px solid var(--semantic-border-subtle)",
                                    background: "transparent",
                                    borderRadius: "999px",
                                    padding: "6px 10px",
                                    cursor: "pointer"
                                }, children: "Close" })) : null] }), t.actions?.length ? (_jsx("div", { style: { display: "flex", gap: "var(--space-2)", marginTop: "var(--space-2)" }, children: t.actions.slice(0, 2).map((a) => (_jsx("button", { type: "button", onClick: () => {
                                a.onPress?.();
                                onAction?.(t.id, a.id);
                            }, style: {
                                border: "1px solid var(--semantic-border-strong)",
                                background: a.kind === "primary" ? "var(--semantic-surface-portal, var(--semantic-surface-panel))" : "transparent",
                                borderRadius: "999px",
                                padding: "8px 12px",
                                cursor: "pointer"
                            }, children: a.label }, a.id))) })) : null] }, t.id))) }) }));
}
