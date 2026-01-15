// UI components stub implementation
// Note: React must be installed by the consuming application (declared as peer dependency)
let React;
try {
  React = require('react');
} catch (e) {
  throw new Error('@recoverlution/ui requires react as a peer dependency. Please install react ^18.0.0');
}

// Placeholder component
const Placeholder = ({ children, className = '', style = {} }) => {
  return React.createElement(
    'div',
    {
      className: `placeholder ${className}`,
      style: {
        padding: '16px',
        backgroundColor: '#F3F4F6',
        border: '2px dashed #D1D5DB',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#6B7280',
        ...style
      }
    },
    children || 'Placeholder Content'
  );
};

// Button component
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '',
  style = {}
}) => {
  const variantStyles = {
    primary: {
      backgroundColor: disabled ? '#9CA3AF' : '#0066CC',
      color: '#FFFFFF',
      border: 'none'
    },
    secondary: {
      backgroundColor: disabled ? '#F3F4F6' : '#FFFFFF',
      color: disabled ? '#9CA3AF' : '#374151',
      border: '1px solid #D1D5DB'
    },
    danger: {
      backgroundColor: disabled ? '#9CA3AF' : '#EF4444',
      color: '#FFFFFF',
      border: 'none'
    }
  };

  return React.createElement(
    'button',
    {
      onClick: disabled ? undefined : onClick,
      disabled,
      className: `button button-${variant} ${className}`,
      style: {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        ...variantStyles[variant],
        ...style
      }
    },
    children
  );
};

module.exports = {
  Placeholder,
  Button
};
