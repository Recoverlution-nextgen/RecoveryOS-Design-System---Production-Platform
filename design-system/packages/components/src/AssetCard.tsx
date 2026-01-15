import React from 'react';
import { colors } from '@design-system/tokens';
import type { StorageAsset } from '@design-system/supabase';

interface AssetCardProps {
  asset: StorageAsset;
  onClick?: (asset: StorageAsset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  return (
    <div
      style={{
        border: `1px solid ${colors.neutral[200]}`,
        borderRadius: '8px',
        padding: '1rem',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
      }}
      onClick={() => onClick?.(asset)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 12px ${colors.neutral[100]}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img
        src={asset.url}
        alt={asset.description}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '0.5rem',
        }}
      />
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
        {asset.description}
      </h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: colors.primary[100],
            color: colors.primary[800],
            borderRadius: '4px',
            fontSize: '0.75rem',
          }}
        >
          {asset.style}
        </span>
        <span
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: colors.neutral[100],
            color: colors.neutral[700],
            borderRadius: '4px',
            fontSize: '0.75rem',
          }}
        >
          {asset.type}
        </span>
        <span
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: colors.neutral[100],
            color: colors.neutral[700],
            borderRadius: '4px',
            fontSize: '0.75rem',
          }}
        >
          {asset.dimension}
        </span>
      </div>
      {asset.tags && asset.tags.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: colors.neutral[600], marginBottom: '0.25rem' }}>
            Tags:
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {asset.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.125rem 0.25rem',
                  backgroundColor: colors.neutral[50],
                  color: colors.neutral[600],
                  borderRadius: '2px',
                  fontSize: '0.625rem',
                }}
              >
                {tag}
              </span>
            ))}
            {asset.tags.length > 3 && (
              <span
                style={{
                  padding: '0.125rem 0.25rem',
                  backgroundColor: colors.neutral[50],
                  color: colors.neutral[600],
                  borderRadius: '2px',
                  fontSize: '0.625rem',
                }}
              >
                +{asset.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};