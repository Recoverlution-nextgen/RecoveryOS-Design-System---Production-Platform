# Supabase Asset Library Schema

Create this table in your Supabase database to store RecoveryOS assets:

```sql
-- Create assets table
CREATE TABLE assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN (
    'hero-poster',
    'hero-loop',
    'noise-texture',
    'thread-texture',
    'seal-pulse',
    'receipt-object',
    'system',
    'icon'
  )),
  category TEXT NOT NULL CHECK (category IN (
    'atmosphere',
    'hero',
    'system',
    'icon',
    'proof'
  )),
  scene_id TEXT CHECK (scene_id IN ('scene-01', 'scene-02', 'scene-03', 'scene-04')),
  pillar_id TEXT CHECK (pillar_id IN ('ER', 'SR', 'SC', 'CR', 'II', 'DM')),
  format TEXT NOT NULL CHECK (format IN ('avif', 'webp', 'webm', 'mp4', 'png', 'svg', 'css')),
  url TEXT NOT NULL,
  fallback_url TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category and type for fast queries
CREATE INDEX idx_assets_category_type ON assets(category, type);
CREATE INDEX idx_assets_scene_id ON assets(scene_id) WHERE scene_id IS NOT NULL;
CREATE INDEX idx_assets_pillar_id ON assets(pillar_id) WHERE pillar_id IS NOT NULL;
CREATE INDEX idx_assets_tags ON assets USING GIN(tags);

-- Enable Row Level Security (RLS)
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public read access"
  ON assets
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated insert/update (for your admin)
CREATE POLICY "Authenticated users can insert"
  ON assets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update"
  ON assets
  FOR UPDATE
  TO authenticated
  USING (true);
```

## Example Data Seed

```sql
-- Insert Core 12 hero assets
INSERT INTO assets (name, type, category, scene_id, format, url, tags) VALUES
  ('scene-01-poster', 'hero-poster', 'hero', 'scene-01', 'avif', 'https://your-cdn.com/hero/scene-01.avif', ARRAY['keynote', 'motion', 'continuity']),
  ('scene-01-loop', 'hero-loop', 'hero', 'scene-01', 'webm', 'https://your-cdn.com/hero/scene-01.webm', ARRAY['keynote', 'motion', 'continuity']),
  ('scene-02-poster', 'hero-poster', 'hero', 'scene-02', 'avif', 'https://your-cdn.com/hero/scene-02.avif', ARRAY['keynote', 'spine', 'feed']),
  ('scene-02-loop', 'hero-loop', 'hero', 'scene-02', 'webm', 'https://your-cdn.com/hero/scene-02.webm', ARRAY['keynote', 'spine', 'feed']),
  ('scene-03-poster', 'hero-poster', 'hero', 'scene-03', 'avif', 'https://your-cdn.com/hero/scene-03.avif', ARRAY['keynote', 'proof', 'receipts']),
  ('scene-03-loop', 'hero-loop', 'hero', 'scene-03', 'webm', 'https://your-cdn.com/hero/scene-03.webm', ARRAY['keynote', 'proof', 'receipts']),
  ('scene-04-poster', 'hero-poster', 'hero', 'scene-04', 'avif', 'https://your-cdn.com/hero/scene-04.avif', ARRAY['keynote', 'lens', 'three-worlds']),
  ('scene-04-loop', 'hero-loop', 'hero', 'scene-04', 'webm', 'https://your-cdn.com/hero/scene-04.webm', ARRAY['keynote', 'lens', 'three-worlds']);

-- Insert system assets
INSERT INTO assets (name, type, category, format, url, tags) VALUES
  ('noise-texture', 'noise-texture', 'atmosphere', 'png', 'https://your-cdn.com/system/noise.png', ARRAY['texture', 'grain']),
  ('thread-line', 'thread-texture', 'system', 'svg', 'https://your-cdn.com/system/thread.svg', ARRAY['continuity', 'spine']),
  ('receipt-base', 'receipt-object', 'proof', 'svg', 'https://your-cdn.com/proof/receipt.svg', ARRAY['proof', 'artifact']);

-- Insert pillar halos
INSERT INTO assets (name, type, category, pillar_id, format, url, tags) VALUES
  ('halo-ER', 'system', 'system', 'ER', 'svg', 'https://your-cdn.com/system/halo-er.svg', ARRAY['pillar', 'emotional-regulation']),
  ('halo-SR', 'system', 'system', 'SR', 'svg', 'https://your-cdn.com/system/halo-sr.svg', ARRAY['pillar', 'social-repair']),
  ('halo-SC', 'system', 'system', 'SC', 'svg', 'https://your-cdn.com/system/halo-sc.svg', ARRAY['pillar', 'sense-of-connection']),
  ('halo-CR', 'system', 'system', 'CR', 'svg', 'https://your-cdn.com/system/halo-cr.svg', ARRAY['pillar', 'caregiver-reciprocity']),
  ('halo-II', 'system', 'system', 'II', 'svg', 'https://your-cdn.com/system/halo-ii.svg', ARRAY['pillar', 'identity-integrity']),
  ('halo-DM', 'system', 'system', 'DM', 'svg', 'https://your-cdn.com/system/halo-dm.svg', ARRAY['pillar', 'drift-monitoring']);
```

## Usage in Components

```tsx
import { useEffect, useState } from 'react';
import { getHeroSceneAssets, type Asset } from '@repo/ui';

export function HeroSection() {
  const [assets, setAssets] = useState<{ poster?: Asset; loop?: Asset } | null>(null);

  useEffect(() => {
    getHeroSceneAssets('scene-01').then(setAssets);
  }, []);

  if (!assets?.poster) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <img src={assets.poster.url} alt="Hero" />
      {assets.loop && (
        <video src={assets.loop.url} autoPlay loop muted playsInline />
      )}
    </div>
  );
}
```

## Asset CDN Setup

Recommended: Use Supabase Storage for asset hosting

```sql
-- Create storage bucket for assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true);

-- Create policy for public read
CREATE POLICY "Public read access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'assets');
```

Then upload assets and get public URLs:
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/assets/hero/scene-01.avif
```
