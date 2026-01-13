import './form.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export function Textarea({
  label,
  hint,
  error,
  required,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className="ro-field">
      {label && (
        <label
          htmlFor={textareaId}
          className={`ro-field__label ${required ? 'ro-field__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={`ro-textarea ${hasError ? 'ro-textarea--error' : ''} ${className}`}
        required={required}
        aria-invalid={hasError}
        aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
        {...props}
      />
      
      {hint && !error && (
        <span id={`${textareaId}-hint`} className="ro-field__hint">
          {hint}
        </span>
      )}
      
      {error && (
        <span id={`${textareaId}-error`} className="ro-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
