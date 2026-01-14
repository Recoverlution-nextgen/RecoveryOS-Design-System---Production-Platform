import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Mock components for typography snapshot
export function mockRails(lens) {
    return {
        primary: [
            { id: "return", label: "Return", active: true },
            { id: "thread", label: "Thread", active: false },
            { id: "trace", label: "Trace", active: false },
            { id: lens === "organisation" ? "Command Center" : "Studio", active: false },
            { id: "travel", label: "Travel", active: false }
        ]
    };
}
export function mockToasts() {
    return {
        stack: [
            { id: "1", message: "Session started", type: "info" },
            { id: "2", message: "Proof captured", type: "success" },
            { id: "3", message: "High cognitive load detected", type: "warning" }
        ]
    };
}
export function mockReceipt(lens, band, state) {
    return {
        id: "receipt-1",
        timestamp: new Date().toISOString(),
        lens,
        band,
        state,
        proof: {
            type: "session",
            duration: 1800,
            quality: state === "redacted" ? "partial" : "complete"
        }
    };
}
// Mock UI components (simplified for snapshot)
export const RoomHeader = ({ lens, stateBand, model }) => (_jsxs("header", { style: { padding: "24px 0" }, children: [_jsx("h1", { className: "ros-type-title", children: model.title }), _jsx("p", { className: "ros-type-headline", children: model.subtitle })] }));
export const PrimaryRail = ({ lens, items, active_room }) => (_jsx("nav", { style: { display: "flex", flexDirection: "column", gap: "8px", padding: "16px", background: "#1a1c1f", borderRadius: "8px" }, children: items.map((item) => (_jsx("button", { className: `ros-type-label ${lens === "organisation" ? "ros-type-dense" : ""}`, style: {
            padding: "12px 16px",
            background: item.active ? "#4fb3ff" : "transparent",
            color: item.active ? "#0c0d0f" : "#f7f7f5",
            border: "none",
            borderRadius: "6px",
            textAlign: "left",
            cursor: "pointer"
        }, children: item.label }, item.id))) }));
export const SystemMessageToastHost = ({ lens, state }) => (_jsx("div", { style: {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        zIndex: 1000
    }, children: state.stack.map((toast) => (_jsx("div", { style: {
            padding: "16px",
            background: "#1a1c1f",
            border: "1px solid #2a2d33",
            borderRadius: "8px",
            maxWidth: "320px"
        }, children: _jsx("p", { className: "ros-type-caption", style: { margin: 0, color: "#f7f7f5" }, children: toast.message }) }, toast.id))) }));
export const ReceiptCard = ({ viewer_lens, receipt }) => (_jsxs("div", { style: {
        padding: "24px",
        background: "#1a1c1f",
        border: "1px solid #2a2d33",
        borderRadius: "12px"
    }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }, children: [_jsx("h3", { className: "ros-type-headline", style: { margin: 0, color: "#f7f7f5" }, children: "Session Receipt" }), _jsx("span", { className: "ros-type-caption", style: { color: receipt.state === "redacted" ? "#ff6f61" : "#7ee0a3" }, children: receipt.state })] }), _jsxs("div", { style: { display: "grid", gap: "8px" }, children: [_jsxs("div", { className: "ros-type-body", style: { color: "#b7bcc6" }, children: ["Duration: ", Math.floor(receipt.proof.duration / 60), "m ", receipt.proof.duration % 60, "s"] }), _jsxs("div", { className: "ros-type-caption", style: { color: "#8a8f99" }, children: ["Lens: ", viewer_lens, " \u2022 Band: ", receipt.band] })] })] }));
