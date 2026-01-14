import * as React from "react";
import { testAttr } from "../../utils/testIds";

export type Lens = "individual" | "professional" | "organisation";
export type StateBand = "low" | "medium" | "high";

export type RoomId =
  | "home"
  | "return"
  | "trace"
  | "plan"
  | "library"
  | "console"
  | "command";

export interface PortalRoomSpec {
  id: RoomId;
  title: string;
  render: (ctx: any) => React.ReactNode;
  allowed_lenses?: Lens[];
}

export interface PortalRails {
  primary: any[];
  context?: (room_id: RoomId, lens: Lens) => any[];
  artifact?: any[];
}

export interface PortalShellProps {
  lens: Lens;
  stateBand: StateBand;

  rooms: PortalRoomSpec[];
  rails: PortalRails;

  initialRoomId?: RoomId;

  showContextRail?: boolean;
  showArtifactRail?: boolean;

  collapseRailsBelowPx?: number;

  className?: string;
  style?: React.CSSProperties;

  onEmit?: (event: any) => void;

  /** Test id */
  testId?: string;
}

export function PortalShell({
  lens,
  stateBand,
  rooms,
  rails,
  initialRoomId = "home",
  showContextRail = true,
  showArtifactRail = true,
  collapseRailsBelowPx = 1100,
  className,
  style,
  testId
}: PortalShellProps) {
  const [room, setRoom] = React.useState<RoomId>(initialRoomId);

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

  const shell: React.CSSProperties = {
    border: "1px solid var(--semantic-border-subtle)",
    borderRadius: "var(--radius-xl)",
    background: "var(--semantic-surface-portal, var(--semantic-surface-room))",
    boxShadow: "var(--shadow-soft)",
    overflow: "hidden"
  };

  const header: React.CSSProperties = {
    padding: "var(--space-4)",
    borderBottom: "1px solid var(--semantic-border-subtle)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  return (
    <div className={className} style={{ ...shell, ...style }} {...testAttr(testId)}>
      <div style={header}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--semantic-text-primary)" }}>
          Portal
        </div>
        <div style={{ fontSize: 12, color: "var(--semantic-text-secondary)" }}>
          {lens} · {stateBand}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: collapsed ? "1fr" : "280px 1fr 360px", gap: "var(--space-4)", padding: "var(--space-4)" }}>
        {!collapsed ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <div style={{ border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", padding: "var(--space-2)" }}>
              <div style={{ fontSize: 12, color: "var(--semantic-text-secondary)", padding: "6px 10px" }}>Primary</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                {(rails.primary || []).map((i: any) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => setRoom(i.to_room || room)}
                    style={{
                      textAlign: "left",
                      border: "1px solid transparent",
                      background: (i.to_room === activeRoom?.id) ? "var(--semantic-surface-railActive, var(--semantic-surface-railHover))" : "transparent",
                      borderRadius: "999px",
                      padding: "10px 12px",
                      cursor: "pointer"
                    }}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>

            {showContextRail && rails.context ? (
              <div style={{ border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", padding: "var(--space-2)" }}>
                <div style={{ fontSize: 12, color: "var(--semantic-text-secondary)", padding: "6px 10px" }}>Context</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                  {rails.context(activeRoom?.id || "home", lens).map((i: any) => (
                    <button
                      key={i.id}
                      type="button"
                      style={{ textAlign: "left", border: "1px solid transparent", background: "transparent", borderRadius: "999px", padding: "10px 12px", cursor: "pointer" }}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div style={{ border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)" }}>
          <div style={{ padding: "var(--space-4)", borderBottom: "1px solid var(--semantic-border-subtle)" }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{activeRoom?.title}</div>
          </div>
          <div>{activeRoom?.render({ lens, stateBand, room_id: activeRoom?.id })}</div>
        </div>

        {!collapsed && showArtifactRail ? (
          <div style={{ border: "1px solid var(--semantic-border-subtle)", borderRadius: "var(--radius-xl)", background: "var(--semantic-surface-panel)", boxShadow: "var(--shadow-soft)" }}>
            <div style={{ padding: "var(--space-3)", borderBottom: "1px solid var(--semantic-border-subtle)", fontSize: 12, color: "var(--semantic-text-secondary)" }}>
              Artifacts
            </div>
            <div style={{ padding: "var(--space-2)", display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              {(rails.artifact || []).map((a: any) => (
                <button
                  key={a.id}
                  type="button"
                  style={{
                    textAlign: "left",
                    border: "1px solid transparent",
                    background: "transparent",
                    borderRadius: "999px",
                    padding: "10px 12px",
                    cursor: "pointer"
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}