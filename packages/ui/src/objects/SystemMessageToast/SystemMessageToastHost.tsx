import * as React from "react";
import { useReducedMotion } from "../../utils/reducedMotion";
import { testAttr } from "../../utils/testIds";

export type Lens = "individual" | "professional" | "organisation";
export type ToastKind = "neutral" | "confirm" | "info" | "caution";

export interface ToastAction {
  id: string;
  label: string;
  kind?: "primary" | "secondary";
  onPress?: () => void;
}

export interface ToastModel {
  id: string;
  title: string;
  message?: string;
  kind?: ToastKind;
  dismissible?: boolean;
  actions?: ToastAction[];
}

export interface ToastManagerState {
  stack: ToastModel[];
  throttle: Record<string, number[]>;
}

export interface SystemMessageToastHostProps {
  lens?: Lens;
  state: ToastManagerState;

  a11y?: { ariaLive?: "polite" | "off"; regionLabel?: string };

  onEmit?: (event: any) => void;
  onDismiss?: (toast_id: string, reason: "close_btn" | "timeout" | "programmatic") => void;
  onAction?: (toast_id: string, action_id: string) => void;

  className?: string;
  style?: React.CSSProperties;

  /** Test id */
  testId?: string;
}

export function SystemMessageToastHost({
  state,
  a11y,
  onDismiss,
  onAction,
  className,
  style,
  testId
}: SystemMessageToastHostProps) {
  const reduced = useReducedMotion();
  const ariaLive = a11y?.ariaLive ?? "polite";
  const label = a11y?.regionLabel ?? "System messages";

  // HARD LIMIT: max 3 visible
  const stack = state.stack.slice(-3);

  const hostStyle: React.CSSProperties = {
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

  const listStyle: React.CSSProperties = {
    width: "min(720px, 92vw)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)"
  };

  const toastStyle: React.CSSProperties = {
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

  return (
    <div
      className={className}
      style={{ ...hostStyle, ...style }}
      {...testAttr(testId)}
      role="region"
      aria-label={label}
      aria-live={ariaLive}
    >
      <div style={listStyle}>
        {stack.map((t) => (
          <div key={t.id} style={toastStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.title}</div>
                {t.message ? (
                  <div style={{ marginTop: 4, fontSize: 13, color: "var(--semantic-text-secondary)" }}>{t.message}</div>
                ) : null}
              </div>

              {t.dismissible !== false ? (
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => onDismiss?.(t.id, "close_btn")}
                  style={{
                    border: "1px solid var(--semantic-border-subtle)",
                    background: "transparent",
                    borderRadius: "999px",
                    padding: "6px 10px",
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>
              ) : null}
            </div>

            {t.actions?.length ? (
              <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
                {t.actions.slice(0, 2).map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      a.onPress?.();
                      onAction?.(t.id, a.id);
                    }}
                    style={{
                      border: "1px solid var(--semantic-border-strong)",
                      background: a.kind === "primary" ? "var(--semantic-surface-portal, var(--semantic-surface-panel))" : "transparent",
                      borderRadius: "999px",
                      padding: "8px 12px",
                      cursor: "pointer"
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}