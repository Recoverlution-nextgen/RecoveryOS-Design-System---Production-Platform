import * as React from "react";
import { useRovingTabindex } from "../../utils/rovingTabindex";
import { testAttr } from "../../utils/testIds";

export type Lens = "individual" | "professional" | "organisation";
export type RoomId = "home" | "return" | "trace" | "plan" | "library" | "console" | "command";

export type RailItemKind = "room" | "action" | "artifact" | "divider" | "heading";

export interface RailItemModel {
  id: string;
  kind: RailItemKind;
  label?: string;
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  to_room?: RoomId;
}

export interface RailArtifactModel {
  id: string;
  type: "receipt" | "cue" | "trace" | "note" | "export" | "unknown";
  label: string;
  subtitle?: string;
  created_at?: string;
  redacted?: boolean;
}

function RailContainer({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <nav
      aria-label={label}
      style={{
        border: "1px solid var(--semantic-border-subtle)",
        borderRadius: "var(--radius-xl)",
        background: "var(--semantic-surface-rail, var(--semantic-surface-panel))",
        boxShadow: "var(--shadow-soft)",
        padding: "var(--space-2)"
      }}
    >
      {children}
    </nav>
  );
}

function RailButton({
  label,
  active,
  disabled,
  testId,
  onClick,
  itemProps
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  testId?: string;
  onClick: () => void;
  itemProps: any;
}) {
  return (
    <button
      type="button"
      {...testAttr(testId)}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        appearance: "none",
        border: "1px solid transparent",
        background: active ? "var(--semantic-surface-railActive, var(--semantic-surface-railHover, rgba(0,0,0,0)))" : "transparent",
        color: "var(--semantic-text-primary)",
        borderRadius: "999px",
        padding: "10px 12px",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none"
      }}
      {...itemProps}
    >
      {label}
    </button>
  );
}

export function PrimaryRail(props: {
  lens: Lens;
  items: RailItemModel[];
  active_room?: RoomId;
  a11y: { railLabel: string };
  onSelect?: (item: RailItemModel, method: "pointer" | "keyboard") => void;
}) {
  const visible = props.items.filter(i => !i.hidden && i.kind !== "divider");
  const roving = useRovingTabindex<HTMLButtonElement>(visible.length);

  return (
    <RailContainer label={props.a11y.railLabel}>
      <div onKeyDown={roving.onKeyDown}>
        {visible.map((item, idx) => (
          <RailButton
            key={item.id}
            label={item.label || ""}
            disabled={item.disabled}
            active={item.to_room === props.active_room}
            testId={`rail-item-${idx}`}
            onClick={() => props.onSelect?.(item, "pointer")}
            itemProps={{
              ...roving.getItemProps(idx),
              onKeyDown: (e: React.KeyboardEvent) => {
                roving.onKeyDown(e);
                if ((e.key === "Enter" || e.key === " ") && !item.disabled) {
                  props.onSelect?.(item, "keyboard");
                }
              }
            }}
          />
        ))}
      </div>
    </RailContainer>
  );
}

export function ContextRail(props: {
  lens: Lens;
  items: RailItemModel[];
  a11y: { railLabel: string };
  onSelect?: (item: RailItemModel, method: "pointer" | "keyboard") => void;
}) {
  const visible = props.items.filter(i => !i.hidden && i.kind !== "divider");
  const roving = useRovingTabindex<HTMLButtonElement>(visible.length);

  return (
    <RailContainer label={props.a11y.railLabel}>
      <div onKeyDown={roving.onKeyDown}>
        {visible.map((item, idx) => (
          <RailButton
            key={item.id}
            label={item.label || ""}
            disabled={item.disabled}
            active={false}
            testId={`rail-item-${idx}`}
            onClick={() => props.onSelect?.(item, "pointer")}
            itemProps={{
              ...roving.getItemProps(idx),
              onKeyDown: (e: React.KeyboardEvent) => {
                roving.onKeyDown(e);
                if ((e.key === "Enter" || e.key === " ") && !item.disabled) {
                  props.onSelect?.(item, "keyboard");
                }
              }
            }}
          />
        ))}
      </div>
    </RailContainer>
  );
}

export function ArtifactRail(props: {
  lens: Lens;
  artifacts: RailArtifactModel[];
  a11y: { railLabel: string };
  onOpen?: (artifact: RailArtifactModel, method: "pointer" | "keyboard") => void;
}) {
  const roving = useRovingTabindex<HTMLButtonElement>(props.artifacts.length);

  return (
    <RailContainer label={props.a11y.railLabel}>
      <div onKeyDown={roving.onKeyDown}>
        {props.artifacts.map((a, idx) => {
          const label = a.redacted ? a.label : `${a.label}${a.subtitle ? ` · ${a.subtitle}` : ""}`;
          return (
            <RailButton
              key={a.id}
              label={label}
              disabled={false}
              active={false}
              testId={`artifact-item-${idx}`}
              onClick={() => props.onOpen?.(a, "pointer")}
              itemProps={{
                ...roving.getItemProps(idx),
                onKeyDown: (e: React.KeyboardEvent) => {
                  roving.onKeyDown(e);
                  if (e.key === "Enter" || e.key === " ") props.onOpen?.(a, "keyboard");
                }
              }}
            />
          );
        })}
      </div>
    </RailContainer>
  );
}