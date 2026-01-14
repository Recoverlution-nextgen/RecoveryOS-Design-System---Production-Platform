// Mock components for typography snapshot
export function mockRails(lens: string) {
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

export function mockReceipt(lens: string, band: string, state: string) {
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
export const RoomHeader = ({ lens, stateBand, model }: any) => (
  <header style={{ padding: "24px 0" }}>
    <h1 className="ros-type-title">{model.title}</h1>
    <p className="ros-type-headline">{model.subtitle}</p>
  </header>
);

export const PrimaryRail = ({ lens, items, active_room }: any) => (
  <nav style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px", background: "#1a1c1f", borderRadius: "8px" }}>
    {items.map((item: any) => (
      <button
        key={item.id}
        className={`ros-type-label ${lens === "organisation" ? "ros-type-dense" : ""}`}
        style={{
          padding: "12px 16px",
          background: item.active ? "#4fb3ff" : "transparent",
          color: item.active ? "#0c0d0f" : "#f7f7f5",
          border: "none",
          borderRadius: "6px",
          textAlign: "left",
          cursor: "pointer"
        }}
      >
        {item.label}
      </button>
    ))}
  </nav>
);

export const SystemMessageToastHost = ({ lens, state }: any) => (
  <div style={{
    position: "fixed",
    bottom: "24px",
    right: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 1000
  }}>
    {state.stack.map((toast: any) => (
      <div
        key={toast.id}
        style={{
          padding: "16px",
          background: "#1a1c1f",
          border: "1px solid #2a2d33",
          borderRadius: "8px",
          maxWidth: "320px"
        }}
      >
        <p className="ros-type-caption" style={{ margin: 0, color: "#f7f7f5" }}>
          {toast.message}
        </p>
      </div>
    ))}
  </div>
);

export const ReceiptCard = ({ viewer_lens, receipt }: any) => (
  <div style={{
    padding: "24px",
    background: "#1a1c1f",
    border: "1px solid #2a2d33",
    borderRadius: "12px"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
      <h3 className="ros-type-headline" style={{ margin: 0, color: "#f7f7f5" }}>
        Session Receipt
      </h3>
      <span className="ros-type-caption" style={{ color: receipt.state === "redacted" ? "#ff6f61" : "#7ee0a3" }}>
        {receipt.state}
      </span>
    </div>
    <div style={{ display: "grid", gap: "8px" }}>
      <div className="ros-type-body" style={{ color: "#b7bcc6" }}>
        Duration: {Math.floor(receipt.proof.duration / 60)}m {receipt.proof.duration % 60}s
      </div>
      <div className="ros-type-caption" style={{ color: "#8a8f99" }}>
        Lens: {viewer_lens} • Band: {receipt.band}
      </div>
    </div>
  </div>
);
