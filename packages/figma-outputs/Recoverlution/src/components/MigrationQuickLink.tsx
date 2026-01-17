/**
 * MIGRATION QUICK LINK
 * 
 * Add this component anywhere in the app to provide
 * quick access to the toolkit migration admin page
 * 
 * Usage in CommandCenterNav or similar:
 * <MigrationQuickLink />
 */

import { Database } from 'lucide-react';

interface MigrationQuickLinkProps {
  onClick?: () => void;
  variant?: 'button' | 'link' | 'banner';
}

export function MigrationQuickLink({ 
  onClick, 
  variant = 'button' 
}: MigrationQuickLinkProps) {
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigate to migration page
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'admin-content-migration');
      window.location.href = url.toString();
    }
  };

  if (variant === 'banner') {
    return (
      <div
        onClick={handleClick}
        style={{
          padding: '16px 24px',
          background: 'linear-gradient(135deg, #3E2BB8 0%, #5739FB 100%)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <Database className="w-5 h-5" style={{ color: 'white' }} />
        <div style={{ flex: 1 }}>
          <div style={{
            color: 'white',
            fontFamily: 'var(--font-display)',
            fontSize: '0.875rem',
            marginBottom: '2px'
          }}>
            Toolkit Migration Ready
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.75rem'
          }}>
            100 pieces ready to import → Click to migrate
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'link') {
    return (
      <button
        onClick={handleClick}
        style={{
          background: 'none',
          border: 'none',
          color: '#3E2BB8',
          fontSize: '0.875rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 0',
          textDecoration: 'underline',
          fontFamily: 'var(--font-display)'
        }}
      >
        <Database className="w-4 h-4" />
        Migrate Toolkit Content (100 pieces)
      </button>
    );
  }

  // Default: button variant
  return (
    <button
      onClick={handleClick}
      style={{
        padding: '12px 20px',
        background: '#3E2BB8',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.875rem',
        fontFamily: 'var(--font-display)',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#5739FB';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#3E2BB8';
      }}
    >
      <Database className="w-5 h-5" />
      Migrate Toolkit Content
    </button>
  );
}
