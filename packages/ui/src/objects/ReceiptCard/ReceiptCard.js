import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { testAttr } from "../../utils/testIds";
export function ReceiptCard({ receipt, viewer_lens, compact, className, style, policy, onOpen, onShare, onExport, testId }) {
    const redactOnNoConsent = policy?.redactOnNoConsent ?? true;
    const showPolicyNote = policy?.showPolicyNote ?? true;
    const consent = receipt.consent_state ?? "unknown";
    const shouldRedact = redactOnNoConsent && consent !== "granted";
    const box = {
        border: "1px solid var(--semantic-border-subtle)",
        background: "var(--semantic-surface-receipt, var(--semantic-surface-panel))",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-soft)",
        padding: compact ? "var(--space-3)" : "var(--space-4)",
        color: "var(--semantic-text-primary)"
    };
    const meta = {
        marginTop: 8,
        fontSize: 13,
        color: "var(--semantic-text-secondary)"
    };
    const field = (label, value) => {
        if (!value)
            return null;
        return (_jsxs("div", { style: { display: "grid", gridTemplateColumns: "120px 1fr", gap: "var(--space-2)", marginTop: 8 }, children: [_jsx("div", { style: { fontSize: 12, color: "var(--semantic-text-secondary)" }, children: label }), _jsx("div", { style: { fontSize: 13 }, children: value })] }));
    };
    const safe = (v) => (shouldRedact ? undefined : v);
    return (_jsxs("article", { className: className, style: { ...box, ...style }, ...testAttr(testId), "aria-label": "Receipt", children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: "var(--space-3)" }, children: [_jsxs("div", { style: { minWidth: 0 }, children: [_jsx("div", { style: { fontSize: 14, fontWeight: 700 }, children: receipt.title }), _jsxs("div", { style: meta, children: [formatDate(receipt.created_at), " \u00B7 ", receipt.visibility] })] }), _jsxs("div", { style: { display: "flex", gap: "var(--space-2)", alignItems: "center" }, children: [_jsx("button", { type: "button", ...testAttr("receipt-open"), onClick: () => onOpen?.(receipt), style: pillButtonStyle(true), children: "Open" }), receipt.visibility === "exportable" ? (_jsx("button", { type: "button", onClick: () => onExport?.(receipt, "pdf"), style: pillButtonStyle(false), children: "Export" })) : null, _jsx("button", { type: "button", onClick: () => onShare?.(receipt), style: pillButtonStyle(false), children: "Share" })] })] }), safe(receipt.summary) ? _jsx("div", { style: { marginTop: 10, fontSize: 13 }, children: receipt.summary }) : null, viewer_lens !== "individual" ? (_jsxs(_Fragment, { children: [field("Mechanism", safe(receipt.mechanism)), field("Primitive", safe(receipt.primitive)), field("Evidence", safe(receipt.evidence))] })) : null, field("Next", safe(receipt.next_step)), shouldRedact && showPolicyNote ? (_jsx("div", { style: { marginTop: 12, fontSize: 12, color: "var(--semantic-text-secondary)" }, children: "Some details are hidden by policy." })) : null] }));
}
function pillButtonStyle(primary) {
    return {
        border: "1px solid var(--semantic-border-strong)",
        background: primary ? "var(--semantic-surface-portal, var(--semantic-surface-panel))" : "transparent",
        color: "var(--semantic-text-primary)",
        borderRadius: "999px",
        padding: "8px 12px",
        cursor: "pointer"
    };
}
function formatDate(iso) {
    // deterministic formatting for snapshots: keep as YYYY-MM-DD
    return iso.slice(0, 10);
}
