import React, { useEffect } from 'react';
import { colors, spacing, borderRadius, boxShadow } from '@design-system/tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: { maxWidth: '20rem' },
    md: { maxWidth: '28rem' },
    lg: { maxWidth: '36rem' },
    xl: { maxWidth: '48rem' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: spacing[4],
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: borderRadius.xl,
          boxShadow: boxShadow['2xl'],
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          ...sizeStyles[size],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            style={{
              padding: `${spacing[6]} ${spacing[6]} 0 ${spacing[6]}`,
              borderBottom: `1px solid ${colors.neutral[200]}`,
              marginBottom: spacing[6],
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '600',
                color: colors.neutral[900],
              }}
            >
              {title}
            </h2>
          </div>
        )}
        <div style={{ padding: title ? `0 ${spacing[6]} ${spacing[6]} ${spacing[6]}` : spacing[6] }}>
          {children}
        </div>
      </div>
    </div>
  );
};