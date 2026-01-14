import * as React from "react";
import { RoomHeader, RoomHeaderModel, Lens, StateBand } from "../RoomHeader/RoomHeader";

export interface RoomPanelSpec {
  title?: string;
  render: () => React.ReactNode;
  hideWhenHigh?: boolean;
}

export interface RoomFrameProps {
  lens: Lens;
  stateBand: StateBand;

  room_id: string;
  header: RoomHeaderModel;

  panel?: RoomPanelSpec;
  footer?: React.ReactNode;

  children: React.ReactNode;

  policy?: { reducePanelsWhenHigh?: boolean; minMainWidthPx?: number };

  className?: string;
  style?: React.CSSProperties;

  onEmit?: (event: any) => void;
}

export function RoomFrame({
  lens,
  stateBand,
  header,
  panel,
  footer,
  children,
  policy,
  className,
  style,
  onEmit
}: RoomFrameProps) {
  const reducePanels = policy?.reducePanelsWhenHigh ?? true;
  const minMain = policy?.minMainWidthPx ?? 540;

  const hidePanel = (panel?.hideWhenHigh ?? true) && reducePanels && stateBand === "high";

  const frame: React.CSSProperties = {
    background: "var(--semantic-surface-room, var(--semantic-surface-portal))",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-4)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-4)"
  };

  return (
    <section className={className} style={{ ...frame, ...style }} aria-label="Room">
      <RoomHeader lens={lens} stateBand={stateBand} model={header} onEmit={onEmit} />

      <div style={{ display: "grid", gridTemplateColumns: hidePanel ? "1fr" : `minmax(${minMain}px, 1fr) 360px`, gap: "var(--space-4)" }}>
        <main style={{ border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)" }}>
          {children}
        </main>

        {!hidePanel && panel ? (
          <aside style={{ border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)", overflow: "hidden" }}>
            {panel.title ? (
              <div style={{ padding: "var(--space-3)", borderBottom: "1px solid var(--semantic-border-subtle)", color: "var(--semantic-text-primary)" }}>
                {panel.title}
              </div>
            ) : null}
            <div>{panel.render()}</div>
          </aside>
        ) : null}
      </div>

      {footer ? <footer>{footer}</footer> : null}
    </section>
  );
}