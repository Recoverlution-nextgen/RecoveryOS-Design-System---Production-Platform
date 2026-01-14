import * as React from "react";
import { testAttr } from "../../utils/testIds";

export type Lens = "individual" | "professional" | "organisation";
export type StateBand = "low" | "medium" | "high";

export interface HeaderAction {
  id: string;
  label: string;
  disabled?: boolean;
  kind?: "primary" | "secondary";
  onPress?: () => void;
}

export interface RoomHeaderModel {
  room_id: string;
  title: string;
  subtitle?: string;
  context?: string;
  actions?: HeaderAction[];
  status?: { node: React.ReactNode; collapseWhenHigh?: boolean };
}

export interface RoomHeaderProps {
  lens: Lens;
  stateBand: StateBand;
  model: RoomHeaderModel;

  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;

  policy?: { reduceDetailWhenHigh?: boolean; maxActions?: number };

  onEmit?: (event: any) => void;
  onAction?: (action: HeaderAction, method: "pointer" | "keyboard") => void;

  /** Test id */
  testId?: string;
}

export function RoomHeader({
  stateBand,
  model,
  compact,
  className,
  style,
  policy,
  onEmit,
  onAction,
  testId
}: RoomHeaderProps) {
  const reduce = policy?.reduceDetailWhenHigh ?? true;
  const maxActions = policy?.maxActions ?? 2;
  const hideDetails = reduce && stateBand === "high";

  const container: React.CSSProperties = {
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

  const titleStyle: React.CSSProperties = {
    fontSize: 18,
    margin: 0,
    color: "var(--semantic-text-primary)"
  };

  const subStyle: React.CSSProperties = {
    fontSize: 13,
    margin: "6px 0 0 0",
    color: "var(--semantic-text-secondary)"
  };

  const actions = (model.actions || []).slice(0, maxActions);

  return (
    <header className={className} style={{ ...container, ...style }} {...testAttr(testId)} aria-label="Room header">
      <div style={{ minWidth: 0 }}>
        <h1 style={titleStyle}>{model.title}</h1>
        {!hideDetails && model.subtitle ? <p style={subStyle}>{model.subtitle}</p> : null}
        {!hideDetails && model.context ? <p style={{ ...subStyle, marginTop: 4 }}>{model.context}</p> : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        {!hideDetails && model.status?.node ? <div>{model.status.node}</div> : null}

        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          {actions.map((a, idx) => (
            <button
              key={a.id}
              type="button"
              {...testAttr(a.kind === "primary" ? "roomheader-action-primary" : undefined)}
              disabled={a.disabled}
              onClick={() => {
                a.onPress?.();
                onAction?.(a, "pointer");
                onEmit?.({ type: "room.primary_action", timestamp: Date.now(), action_id: a.id, method: "pointer" });
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !a.disabled) {
                  onAction?.(a, "keyboard");
                  onEmit?.({ type: "room.primary_action", timestamp: Date.now(), action_id: a.id, method: "keyboard" });
                }
              }}
              style={{
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
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}