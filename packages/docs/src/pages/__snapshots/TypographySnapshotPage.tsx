import React from "react";
import { useRouter } from "next/router";
import { applyFontStack } from "../../snapshots/fontStacks";
import { parseBand, parseLens } from "../../snapshots/snapshot-helpers";
import {
  mockRails,
  mockToasts,
  mockReceipt,
  RoomHeader,
  PrimaryRail,
  SystemMessageToastHost,
  ReceiptCard
} from "../../snapshots/snapshot-mocks";

export default function TypographySnapshotPage() {
  const router = useRouter();
  const { lens, band, stack } = router.query;

  const parsedLens = parseLens(lens as string);
  const parsedBand = parseBand(band as string);
  const fontStack = (stack as string || "plex") as "plex";

  React.useEffect(() => {
    applyFontStack(fontStack);
  }, [fontStack]);

  // Apply lens/band modifiers at root for deterministic snapshots
  React.useEffect(() => {
    const root = document.documentElement;

    // Numbers: org lens prefers tabular
    root.style.setProperty(
      "--semantic-type-numbers-ui",
      parsedLens === "organisation" ? "tabular-nums" : "proportional-nums"
    );

    // High band: relaxed body line-height
    root.style.setProperty(
      "--semantic-text-body-lineHeight",
      parsedBand === "high" ? "1.56" : "1.42"
    );

    // Set data attributes for compression
    root.setAttribute("data-band", parsedBand);
    root.setAttribute("data-lens", parsedLens);
  }, [parsedLens, parsedBand]);

  const rails = mockRails(parsedLens);
  const toasts = mockToasts();
  const receiptDefault = mockReceipt(parsedLens, parsedBand, "default");
  const receiptRedacted = mockReceipt(parsedLens, parsedBand, "redacted");

  return (
    <div style={{ minHeight: "100vh", padding: 32, display: "grid", gap: 18, background: "#0c0d0f", color: "#f7f7f5" }}>
      <div style={{ display: "grid", gap: 12 }}>
        <RoomHeader
          lens={parsedLens}
          stateBand={parsedBand}
          model={{
            room_id: "return",
            title: "Return",
            subtitle: "Small step. Real shift.",
            actions: [{ id: "primary", label: "Open", kind: "primary" }]
          }}
        />

        <div className="ros-type-body" style={{ maxWidth: 900 }}>
          You don&apos;t need a perfect day. You need one clean moment. Return to the breath.
          Return to the room. Proof travels.
        </div>

        <div className="ros-type-caption" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <span>09:06</span>
          <span>1,024</span>
          <span>12.5%</span>
          <span>2026-01-13</span>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="ros-type-label" style={pill(true)}>Primary</button>
          <button className="ros-type-label" style={pill(false)}>Secondary</button>
          <button className="ros-type-label" style={pill(false)} disabled>Disabled</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 18 }}>
        <PrimaryRail
          lens={parsedLens}
          items={rails.primary}
          active_room="return"
          a11y={{ railLabel: "Primary navigation" }}
        />

        <div style={{ display: "grid", gap: 12 }}>
          <ReceiptCard viewer_lens={parsedLens} receipt={receiptDefault} playSealOnMount={false} policy={{ redactOnNoConsent: true, showPolicyNote: true }} />
          <ReceiptCard viewer_lens={parsedLens} receipt={receiptRedacted} playSealOnMount={false} policy={{ redactOnNoConsent: true, showPolicyNote: true }} />
        </div>
      </div>

      {/* Toast host sits fixed; we add padding space so it appears in viewport */}
      <SystemMessageToastHost
        lens={parsedLens}
        state={{ stack: toasts.stack, throttle: {} }}
        a11y={{ ariaLive: "polite", regionLabel: "System messages" }}
      />
      <div style={{ height: 260 }} />
    </div>
  );
}

function pill(primary: boolean): React.CSSProperties {
  return {
    border: "1px solid #2a2d33",
    background: primary ? "#4fb3ff" : "transparent",
    color: primary ? "#0c0d0f" : "#f7f7f5",
    borderRadius: "999px",
    padding: "10px 14px",
    cursor: "pointer"
  };
}
