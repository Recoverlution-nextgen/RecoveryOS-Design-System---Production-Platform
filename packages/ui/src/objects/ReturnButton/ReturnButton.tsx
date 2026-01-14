import * as React from "react";
import { useReducedMotion } from "../../utils/reducedMotion";
import { testAttr } from "../../utils/testIds";

export type Lens = "individual" | "professional" | "organisation";
export type StateBand = "low" | "medium" | "high";
export type ReturnButtonTone = "calm" | "armed" | "confirm" | "disabled";

export interface ReturnButtonProps {
  lens: Lens;
  stateBand: StateBand;

  disabled?: boolean;
  isRouting?: boolean;

  tone?: ReturnButtonTone;

  className?: string;
  style?: React.CSSProperties;

  /** Events */
  onEmit?: (event: any) => void;

  /** Test id */
  testId?: string;
}

export function ReturnButton(props: ReturnButtonProps) {
  const reduced = useReducedMotion();
  const {
    disabled,
    isRouting,
    tone = "calm",
    className,
    style,
    onEmit,
    testId
  } = props;

  const handleClick = () => {
    if (disabled) return;
    onEmit?.({ type: "return.invoked", timestamp: Date.now(), method: "tap" });
  };

  const base: React.CSSProperties = {
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

  const labelStyle: React.CSSProperties = {
    fontFamily: "inherit",
    fontSize: 14,
    letterSpacing: "var(--base-letterSpacing-tight, 0)",
    lineHeight: 1
  };

  const glyphStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    display: "inline-block"
  };

  // Routing sweep: calm ring arc (static in snapshots; can animate later)
  const ring: React.CSSProperties = {
    position: "absolute",
    inset: -6,
    borderRadius: "999px",
    border: isRouting ? "2px solid var(--semantic-border-subtle)" : "2px solid transparent",
    pointerEvents: "none"
  };

  return (
    <button
      type="button"
      {...testAttr(testId)}
      className={className}
      style={{ ...base, ...style }}
      disabled={disabled}
      aria-label="Return"
      aria-busy={!!isRouting}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          // native button already handles, but we keep deterministic event
          onEmit?.({ type: "return.invoked", timestamp: Date.now(), method: "keyboard" });
        }
      }}
    >
      <span style={ring} />
      <span aria-hidden="true" style={glyphStyle}>
        {/* simple invariant glyph */}
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M9 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12h11a5 5 0 015 5v1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span style={labelStyle}>Return</span>

      {/* optional tiny routing indicator */}
      {isRouting ? (
        <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 999, background: "var(--semantic-signal-live, var(--semantic-border-strong))" }} />
      ) : null}
    </button>
  );
}