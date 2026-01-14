import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './form.css';
export function Input({ label, hint, error, required, className = '', id, ...props }) {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = Boolean(error);
    return (_jsxs("div", { className: "ro-field", children: [label && (_jsx("label", { htmlFor: inputId, className: `ro-field__label ${required ? 'ro-field__label--required' : ''}`, children: label })), _jsx("input", { id: inputId, className: `ro-input ${hasError ? 'ro-input--error' : ''} ${className}`, required: required, "aria-invalid": hasError, "aria-describedby": error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined, ...props }), hint && !error && (_jsx("span", { id: `${inputId}-hint`, className: "ro-field__hint", children: hint })), error && (_jsx("span", { id: `${inputId}-error`, className: "ro-field__error", role: "alert", children: error }))] }));
}
