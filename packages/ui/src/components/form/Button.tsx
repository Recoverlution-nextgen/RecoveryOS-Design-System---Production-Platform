import './form.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'ro-button',
    variant !== 'primary' && `ro-button--${variant}`,
    size !== 'md' && `ro-button--${size}`,
    loading && 'ro-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="ro-button__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
