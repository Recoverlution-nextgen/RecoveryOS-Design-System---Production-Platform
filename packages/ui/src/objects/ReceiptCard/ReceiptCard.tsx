import * as React from "react";
import { testAttr } from "../../utils/testIds";

export type Lens = "individual" | "professional" | "organisation";

export type ReceiptVisibility = "private" | "care_team" | "organisation" | "exportable";
export type ConsentState = "granted" | "revoked" | "pending" | "unknown";

export interface ReceiptModel {
  id: string;
  created_at: string;
  kind: string;
  proof: string;

  subject_user_id: string;
  organisation_id?: string;

  lens: Lens;
  intent?: string;
  stateBand?: "low" | "medium" | "high";

  title: string;
  summary?: string;
  mechanism?: string;
  primitive?: string;
  evidence?: string;
  next_step?: string;

  visibility: ReceiptVisibility;
  consent_state?: ConsentState;

  redactions?: Record<string, boolean>;
}

export interface ReceiptCardProps {
  receipt: ReceiptModel;
  viewer_lens: Lens;

  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;

  policy?: {
    redactOnNoConsent?: boolean;
    showPolicyNote?: boolean;
    viewer_scope?: ReceiptVisibility;
  };

  actions?: {
    canOpen?: boolean;
    canShare?: boolean;
    canExport?: boolean;
  };

  onOpen?: (receipt: ReceiptModel) => void;
  onShare?: (receipt: ReceiptModel) => void | Promise<void>;
  onExport?: (receipt: ReceiptModel, format: "pdf" | "json" | "csv") => void | Promise<void>;

  onEmit?: (event: any) => void;

  playSealOnMount?: boolean;

  /** Test id */
  testId?: string;
}

export function ReceiptCard({
  receipt,
  viewer_lens,
  compact,
  className,
  style,
  policy,
  onOpen,
  onShare,
  onExport,
  testId
}: ReceiptCardProps) {
  const redactOnNoConsent = policy?.redactOnNoConsent ?? true;
  const showPolicyNote = policy?.showPolicyNote ?? true;

  const consent = receipt.consent_state ?? "unknown";
  const shouldRedact = redactOnNoConsent && consent !== "granted";

  const box: React.CSSProperties = {
    border: "1px solid var(--semantic-border-subtle)",
    background: "var(--semantic-surface-receipt, var(--semantic-surface-panel))",
    borderRadius: "var(--radius-xl)",
    boxShadow: "var(--shadow-soft)",
    padding: compact ? "var(--space-3)" : "var(--space-4)",
    color: "var(--semantic-text-primary)"
  };

  const meta: React.CSSProperties = {
    marginTop: 8,
    fontSize: 13,
    color: "var(--semantic-text-secondary)"
  };

  const field = (label: string, value?: string) => {
    if (!value) return null;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "var(--space-2)", marginTop: 8 }}>
        <div style={{ fontSize: 12, color: "var(--semantic-text-secondary)" }}>{label}</div>
        <div style={{ fontSize: 13 }}>{value}</div>
      </div>
    );
  };

  const safe = (v?: string) => (shouldRedact ? undefined : v);

  return (
    <article className={className} style={{ ...box, ...style }} {...testAttr(testId)} aria-label="Receipt">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{receipt.title}</div>
          <div style={meta}>{formatDate(receipt.created_at)} · {receipt.visibility}</div>
        </div>

        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
          <button
            type="button"
            {...testAttr("receipt-open")}
            onClick={() => onOpen?.(receipt)}
            style={pillButtonStyle(true)}
          >
            Open
          </button>

          {receipt.visibility === "exportable" ? (
            <button type="button" onClick={() => onExport?.(receipt, "pdf")} style={pillButtonStyle(false)}>
              Export
            </button>
          ) : null}

          <button type="button" onClick={() => onShare?.(receipt)} style={pillButtonStyle(false)}>
            Share
          </button>
        </div>
      </div>

      {safe(receipt.summary) ? <div style={{ marginTop: 10, fontSize: 13 }}>{receipt.summary}</div> : null}

      {/* Pro/org: show more detail by default */}
      {viewer_lens !== "individual" ? (
        <>
          {field("Mechanism", safe(receipt.mechanism))}
          {field("Primitive", safe(receipt.primitive))}
          {field("Evidence", safe(receipt.evidence))}
        </>
      ) : null}

      {field("Next", safe(receipt.next_step))}

      {shouldRedact && showPolicyNote ? (
        <div style={{ marginTop: 12, fontSize: 12, color: "var(--semantic-text-secondary)" }}>
          Some details are hidden by policy.
        </div>
      ) : null}
    </article>
  );
}

function pillButtonStyle(primary: boolean): React.CSSProperties {
  return {
    border: "1px solid var(--semantic-border-strong)",
    background: primary ? "var(--semantic-surface-portal, var(--semantic-surface-panel))" : "transparent",
    color: "var(--semantic-text-primary)",
    borderRadius: "999px",
    padding: "8px 12px",
    cursor: "pointer"
  };
}

function formatDate(iso: string) {
  // deterministic formatting for snapshots: keep as YYYY-MM-DD
  return iso.slice(0, 10);
}