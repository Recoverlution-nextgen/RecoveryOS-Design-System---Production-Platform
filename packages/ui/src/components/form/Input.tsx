import './form.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export function Input({
  label,
  hint,
  error,
  required,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className="ro-field">
      {label && (
        <label
          htmlFor={inputId}
          className={`ro-field__label ${required ? 'ro-field__label--required' : ''}`}
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={`ro-input ${hasError ? 'ro-input--error' : ''} ${className}`}
        required={required}
        aria-invalid={hasError}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      
      {hint && !error && (
        <span id={`${inputId}-hint`} className="ro-field__hint">
          {hint}
        </span>
      )}
      
      {error && (
        <span id={`${inputId}-error`} className="ro-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
