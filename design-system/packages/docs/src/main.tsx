import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, AssetCard, useAssets } from '@design-system/components';
import { colors } from '@design-system/tokens';

const AssetGallery = () => {
  const { assets, loading, error } = useAssets({ limit: 6 });

  if (loading) return <div>Loading assets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Design System Documentation</h1>
      <p>This is a design system with Supabase integration for assets.</p>

      <h2>Colors</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ width: '50px', height: '50px', backgroundColor: colors.primary[500] }}></div>
        <div style={{ width: '50px', height: '50px', backgroundColor: colors.neutral[500] }}></div>
      </div>

      <h2>Components</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>

      <h2>Supabase Assets</h2>
      <p>Assets loaded from your Supabase storage:</p>
      <AssetGallery />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);