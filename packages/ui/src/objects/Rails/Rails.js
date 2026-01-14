import { jsx as _jsx } from "react/jsx-runtime";
import { useRovingTabindex } from "../../utils/rovingTabindex";
import { testAttr } from "../../utils/testIds";
function RailContainer({ label, children }) {
    return (_jsx("nav", { "aria-label": label, style: {
            border: "1px solid var(--semantic-border-subtle)",
            borderRadius: "var(--radius-xl)",
            background: "var(--semantic-surface-rail, var(--semantic-surface-panel))",
            boxShadow: "var(--shadow-soft)",
            padding: "var(--space-2)"
        }, children: children }));
}
function RailButton({ label, active, disabled, testId, onClick, itemProps }) {
    return (_jsx("button", { type: "button", ...testAttr(testId), disabled: disabled, onClick: onClick, style: {
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
        }, ...itemProps, children: label }));
}
export function PrimaryRail(props) {
    const visible = props.items.filter(i => !i.hidden && i.kind !== "divider");
    const roving = useRovingTabindex(visible.length);
    return (_jsx(RailContainer, { label: props.a11y.railLabel, children: _jsx("div", { onKeyDown: roving.onKeyDown, children: visible.map((item, idx) => (_jsx(RailButton, { label: item.label || "", disabled: item.disabled, active: item.to_room === props.active_room, testId: `rail-item-${idx}`, onClick: () => props.onSelect?.(item, "pointer"), itemProps: {
                    ...roving.getItemProps(idx),
                    onKeyDown: (e) => {
                        roving.onKeyDown(e);
                        if ((e.key === "Enter" || e.key === " ") && !item.disabled) {
                            props.onSelect?.(item, "keyboard");
                        }
                    }
                } }, item.id))) }) }));
}
export function ContextRail(props) {
    const visible = props.items.filter(i => !i.hidden && i.kind !== "divider");
    const roving = useRovingTabindex(visible.length);
    return (_jsx(RailContainer, { label: props.a11y.railLabel, children: _jsx("div", { onKeyDown: roving.onKeyDown, children: visible.map((item, idx) => (_jsx(RailButton, { label: item.label || "", disabled: item.disabled, active: false, testId: `rail-item-${idx}`, onClick: () => props.onSelect?.(item, "pointer"), itemProps: {
                    ...roving.getItemProps(idx),
                    onKeyDown: (e) => {
                        roving.onKeyDown(e);
                        if ((e.key === "Enter" || e.key === " ") && !item.disabled) {
                            props.onSelect?.(item, "keyboard");
                        }
                    }
                } }, item.id))) }) }));
}
export function ArtifactRail(props) {
    const roving = useRovingTabindex(props.artifacts.length);
    return (_jsx(RailContainer, { label: props.a11y.railLabel, children: _jsx("div", { onKeyDown: roving.onKeyDown, children: props.artifacts.map((a, idx) => {
                const label = a.redacted ? a.label : `${a.label}${a.subtitle ? ` · ${a.subtitle}` : ""}`;
                return (_jsx(RailButton, { label: label, disabled: false, active: false, testId: `artifact-item-${idx}`, onClick: () => props.onOpen?.(a, "pointer"), itemProps: {
                        ...roving.getItemProps(idx),
                        onKeyDown: (e) => {
                            roving.onKeyDown(e);
                            if (e.key === "Enter" || e.key === " ")
                                props.onOpen?.(a, "keyboard");
                        }
                    } }, a.id));
            }) }) }));
}
