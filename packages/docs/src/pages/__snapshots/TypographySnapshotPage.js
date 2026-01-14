import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useRouter } from "next/router";
import { applyFontStack } from "../../snapshots/fontStacks";
import { parseBand, parseLens } from "../../snapshots/snapshot-helpers";
import { mockRails, mockToasts, mockReceipt, RoomHeader, PrimaryRail, SystemMessageToastHost, ReceiptCard } from "../../snapshots/snapshot-mocks";
export default function TypographySnapshotPage() {
    const router = useRouter();
    const { lens, band, stack } = router.query;
    const parsedLens = parseLens(lens);
    const parsedBand = parseBand(band);
    const fontStack = (stack || "plex");
    React.useEffect(() => {
        applyFontStack(fontStack);
    }, [fontStack]);
    // Apply lens/band modifiers at root for deterministic snapshots
    React.useEffect(() => {
        const root = document.documentElement;
        // Numbers: org lens prefers tabular
        root.style.setProperty("--semantic-type-numbers-ui", parsedLens === "organisation" ? "tabular-nums" : "proportional-nums");
        // High band: relaxed body line-height
        root.style.setProperty("--semantic-text-body-lineHeight", parsedBand === "high" ? "1.56" : "1.42");
        // Set data attributes for compression
        root.setAttribute("data-band", parsedBand);
        root.setAttribute("data-lens", parsedLens);
    }, [parsedLens, parsedBand]);
    const rails = mockRails(parsedLens);
    const toasts = mockToasts();
    const receiptDefault = mockReceipt(parsedLens, parsedBand, "default");
    const receiptRedacted = mockReceipt(parsedLens, parsedBand, "redacted");
    return (_jsxs("div", { style: { minHeight: "100vh", padding: 32, display: "grid", gap: 18, background: "#0c0d0f", color: "#f7f7f5" }, children: [_jsxs("div", { style: { display: "grid", gap: 12 }, children: [_jsx(RoomHeader, { lens: parsedLens, stateBand: parsedBand, model: {
                            room_id: "return",
                            title: "Return",
                            subtitle: "Small step. Real shift.",
                            actions: [{ id: "primary", label: "Open", kind: "primary" }]
                        } }), _jsx("div", { className: "ros-type-body", style: { maxWidth: 900 }, children: "You don't need a perfect day. You need one clean moment. Return to the breath. Return to the room. Proof travels." }), _jsxs("div", { className: "ros-type-caption", style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: [_jsx("span", { children: "09:06" }), _jsx("span", { children: "1,024" }), _jsx("span", { children: "12.5%" }), _jsx("span", { children: "2026-01-13" })] }), _jsxs("div", { style: { display: "flex", gap: 12, alignItems: "center" }, children: [_jsx("button", { className: "ros-type-label", style: pill(true), children: "Primary" }), _jsx("button", { className: "ros-type-label", style: pill(false), children: "Secondary" }), _jsx("button", { className: "ros-type-label", style: pill(false), disabled: true, children: "Disabled" })] })] }), _jsxs("div", { style: { display: "grid", gridTemplateColumns: "320px 1fr", gap: 18 }, children: [_jsx(PrimaryRail, { lens: parsedLens, items: rails.primary, active_room: "return", a11y: { railLabel: "Primary navigation" } }), _jsxs("div", { style: { display: "grid", gap: 12 }, children: [_jsx(ReceiptCard, { viewer_lens: parsedLens, receipt: receiptDefault, playSealOnMount: false, policy: { redactOnNoConsent: true, showPolicyNote: true } }), _jsx(ReceiptCard, { viewer_lens: parsedLens, receipt: receiptRedacted, playSealOnMount: false, policy: { redactOnNoConsent: true, showPolicyNote: true } })] })] }), _jsx(SystemMessageToastHost, { lens: parsedLens, state: { stack: toasts.stack, throttle: {} }, a11y: { ariaLive: "polite", regionLabel: "System messages" } }), _jsx("div", { style: { height: 260 } })] }));
}
function pill(primary) {
    return {
        border: "1px solid #2a2d33",
        background: primary ? "#4fb3ff" : "transparent",
        color: primary ? "#0c0d0f" : "#f7f7f5",
        borderRadius: "999px",
        padding: "10px 14px",
        cursor: "pointer"
    };
}
