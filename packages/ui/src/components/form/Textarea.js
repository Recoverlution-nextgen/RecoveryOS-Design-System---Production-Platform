import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './form.css';
export function Textarea({ label, hint, error, required, className = '', id, ...props }) {
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = Boolean(error);
    return (_jsxs("div", { className: "ro-field", children: [label && (_jsx("label", { htmlFor: textareaId, className: `ro-field__label ${required ? 'ro-field__label--required' : ''}`, children: label })), _jsx("textarea", { id: textareaId, className: `ro-textarea ${hasError ? 'ro-textarea--error' : ''} ${className}`, required: required, "aria-invalid": hasError, "aria-describedby": error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined, ...props }), hint && !error && (_jsx("span", { id: `${textareaId}-hint`, className: "ro-field__hint", children: hint })), error && (_jsx("span", { id: `${textareaId}-error`, className: "ro-field__error", role: "alert", children: error }))] }));
}
