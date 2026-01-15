import React from 'react';
import { colors, spacing, borderRadius, typography } from '@design-system/tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    border: `1px solid ${error ? colors.error[500] : colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base[0],
    fontFamily: typography.fontFamily.sans.join(', '),
    backgroundColor: 'white',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const focusStyles: React.CSSProperties = {
    outline: 'none',
    borderColor: colors.primary[500],
    boxShadow: `0 0 0 3px ${colors.primary[100]}`,
  };

  return (
    <div style={{ marginBottom: spacing[4] }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: spacing[2],
            fontSize: typography.fontSize.sm[0],
            fontWeight: typography.fontWeight.medium,
            color: colors.neutral[700],
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className={className}
        style={baseStyles}
        onFocus={(e) => {
          Object.assign(e.target.style, focusStyles);
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = 'none';
          e.target.style.borderColor = error ? colors.error[500] : colors.neutral[300];
        }}
      />
      {error && (
        <p
          style={{
            marginTop: spacing[1],
            fontSize: typography.fontSize.sm[0],
            color: colors.error[500],
          }}
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          style={{
            marginTop: spacing[1],
            fontSize: typography.fontSize.sm[0],
            color: colors.neutral[500],
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};