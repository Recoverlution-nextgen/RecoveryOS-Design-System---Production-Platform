"use client";

import React, { useId } from "react";
import "./tokens.css";
import "./styles.css";

type Size = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
}) => (
  <button className={`ui-btn ${variant} ${size}`} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  status?: "default" | "error" | "success";
}

export const Input: React.FC<InputProps> = ({ label, helperText, error, status, id, ...rest }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const computedStatus = status ?? (error ? "error" : "default");
  const helperId = helperText ? `${fieldId}-help` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label className="ui-field">
      {label && <span className="ui-field-label">{label}</span>}
      <input
        id={fieldId}
        className={`ui-input ${computedStatus}`}
        aria-invalid={computedStatus === "error"}
        aria-describedby={describedBy}
        {...rest}
      />
      {helperText && (
        <small className="ui-field-helper" id={helperId}>
          {helperText}
        </small>
      )}
      {error && (
        <small className="ui-field-error" id={errorId}>
          {error}
        </small>
      )}
    </label>
  );
};

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  status?: "default" | "error" | "success";
}

export const TextArea: React.FC<TextAreaProps> = ({ label, helperText, error, status, id, rows = 3, ...rest }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const computedStatus = status ?? (error ? "error" : "default");
  const helperId = helperText ? `${fieldId}-help` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label className="ui-field">
      {label && <span className="ui-field-label">{label}</span>}
      <textarea
        id={fieldId}
        className={`ui-textarea ${computedStatus}`}
        aria-invalid={computedStatus === "error"}
        aria-describedby={describedBy}
        rows={rows}
        {...rest}
      />
      {helperText && (
        <small className="ui-field-helper" id={helperId}>
          {helperText}
        </small>
      )}
      {error && (
        <small className="ui-field-error" id={errorId}>
          {error}
        </small>
      )}
    </label>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  status?: "default" | "error" | "success";
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, helperText, error, status, id, options, ...rest }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const computedStatus = status ?? (error ? "error" : "default");
  const helperId = helperText ? `${fieldId}-help` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label className="ui-field">
      {label && <span className="ui-field-label">{label}</span>}
      <select
        id={fieldId}
        className={`ui-select ${computedStatus}`}
        aria-invalid={computedStatus === "error"}
        aria-describedby={describedBy}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <small className="ui-field-helper" id={helperId}>
          {helperText}
        </small>
      )}
      {error && (
        <small className="ui-field-error" id={errorId}>
          {error}
        </small>
      )}
    </label>
  );
};

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...rest }) => (
  <label className="ui-checkbox">
    <input type="checkbox" {...rest} />
    <span>{label}</span>
  </label>
);

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Switch: React.FC<SwitchProps> = ({ label, ...rest }) => (
  <label className="ui-switch">
    <input type="checkbox" role="switch" {...rest} />
    <span>{label}</span>
  </label>
);

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, footer }) => (
  <div className="ui-card">
    {title && <h3 className="ui-card-title">{title}</h3>}
    <div>{children}</div>
    {footer && <div className="ui-card-footer">{footer}</div>}
  </div>
);

export interface BadgeProps {
  label: string;
  tone?: "brand" | "neutral" | "success" | "danger";
}

export const Badge: React.FC<BadgeProps> = ({ label, tone = "brand" }) => (
  <span
    className="ui-badge"
    style={{
      background:
        tone === "brand"
          ? "var(--semantic-colors-brand-primary, #3E2BB8)"
          : tone === "neutral"
          ? "var(--semantic-colors-surface-elevated, #373541)"
          : tone === "success"
          ? "var(--primitive-colors-recovery-green-500, #25D494)"
          : "var(--primitive-colors-red-500, #EF4444)",
    }}
  >
    {label}
  </span>
);

export interface AvatarProps {
  name: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 40 }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="ui-avatar" style={{ width: size, height: size, fontSize: size / 2.5 }}>
      {initials}
    </div>
  );
};

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

export interface TableProps {
  columns: TableColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  caption?: string;
  dense?: boolean;
  zebra?: boolean;
}

export const Table: React.FC<TableProps> = ({ columns, rows, caption, dense, zebra }) => {
  return (
    <div className="ui-table-wrapper">
      <table className={`ui-table ${dense ? "dense" : ""} ${zebra ? "zebra" : ""}`}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ textAlign: col.align || "left" }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align || "left" }}>
                  {row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="ui-shell">{children}</div>
);

export const Rail: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <aside className="ui-rail">{children}</aside>
);

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="ui-main">{children}</section>
);

export const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="ui-panel">{children}</div>
);

export const SectionHeader: React.FC<{ eyebrow?: string; title: string; subtitle?: string }> = ({
  eyebrow,
  title,
  subtitle,
}) => (
  <div className="ui-section-header">
    {eyebrow && <div className="ui-section-eyebrow">{eyebrow}</div>}
    <div className="ui-section-title">{title}</div>
    {subtitle && <div className="ui-section-subtitle">{subtitle}</div>}
  </div>
);

export const Pill: React.FC<{ label: string; tone?: "default" | "muted"; dotTone?: "default" | "success" | "warning" }> = ({
  label,
  tone = "default",
  dotTone,
}) => (
  <span className="ui-pill" data-tone={tone}>
    {dotTone && <span className="ui-dot" data-tone={dotTone === "default" ? undefined : dotTone} />}
    {label}
  </span>
);
