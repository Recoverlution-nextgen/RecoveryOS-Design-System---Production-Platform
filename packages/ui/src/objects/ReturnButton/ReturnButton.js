import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useReducedMotion } from "../../utils/reducedMotion";
import { testAttr } from "../../utils/testIds";
export function ReturnButton(props) {
    const reduced = useReducedMotion();
    const { disabled, isRouting, tone = "calm", className, style, onEmit, testId } = props;
    const handleClick = () => {
        if (disabled)
            return;
        onEmit?.({ type: "return.invoked", timestamp: Date.now(), method: "tap" });
    };
    const base = {
        appearance: "none",
        border: "1px solid var(--semantic-border-return, var(--semantic-border-strong))",
        background: "var(--semantic-surface-return, var(--semantic-surface-panel))",
        color: "var(--semantic-text-onReturn, var(--semantic-text-primary))",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-3) var(--space-4)",
        boxShadow: "var(--shadow-soft)",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        minHeight: 44,
        minWidth: 44,
        position: "relative",
        userSelect: "none",
        opacity: disabled ? 0.6 : 1,
        transition: reduced ? "none" : "transform var(--motion-dur-settle, 140ms) var(--motion-ease-settle, ease-out)"
    };
    const labelStyle = {
        fontFamily: "inherit",
        fontSize: 14,
        letterSpacing: "var(--base-letterSpacing-tight, 0)",
        lineHeight: 1
    };
    const glyphStyle = {
        width: 18,
        height: 18,
        display: "inline-block"
    };
    // Routing sweep: calm ring arc (static in snapshots; can animate later)
    const ring = {
        position: "absolute",
        inset: -6,
        borderRadius: "999px",
        border: isRouting ? "2px solid var(--semantic-border-subtle)" : "2px solid transparent",
        pointerEvents: "none"
    };
    return (_jsxs("button", { type: "button", ...testAttr(testId), className: className, style: { ...base, ...style }, disabled: disabled, "aria-label": "Return", "aria-busy": !!isRouting, onClick: handleClick, onKeyDown: (e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
                // native button already handles, but we keep deterministic event
                onEmit?.({ type: "return.invoked", timestamp: Date.now(), method: "keyboard" });
            }
        }, children: [_jsx("span", { style: ring }), _jsx("span", { "aria-hidden": "true", style: glyphStyle, children: _jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", children: [_jsx("path", { d: "M9 6l-6 6 6 6", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M3 12h11a5 5 0 015 5v1", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })] }) }), _jsx("span", { style: labelStyle, children: "Return" }), isRouting ? (_jsx("span", { "aria-hidden": "true", style: { width: 10, height: 10, borderRadius: 999, background: "var(--semantic-signal-live, var(--semantic-border-strong))" } })) : null] }));
}
