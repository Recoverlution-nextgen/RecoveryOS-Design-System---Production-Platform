# Design System

A comprehensive, production-ready design system built with TypeScript, React, and Supabase integration.

## 📦 Packages

- **`@design-system/tokens`** - Design tokens (colors, spacing, typography, shadows)
- **`@design-system/components`** - React components with full TypeScript support
- **`@design-system/supabase`** - Supabase client for asset management
- **`@design-system/docs`** - Documentation site with Storybook

## 🎨 Design Tokens

Complete token system including:
- **Colors**: Primary, secondary, neutral, success, warning, error (50-900 scales)
- **Spacing**: 0-96 scale with rem units
- **Typography**: Font families, sizes (xs-9xl), weights
- **Border Radius**: none, sm, md, lg, xl, 2xl, 3xl, full
- **Box Shadows**: sm, md, lg, xl, 2xl, inner, none
- **Breakpoints**: sm, md, lg, xl, 2xl

## 🧩 Components

### Core Components
- **Button** - Primary/secondary variants with click handling
- **Input** - Form input with labels, validation, helper text
- **Card** - Container with padding, shadows, hover states
- **Modal** - Overlay modal with sizes, keyboard/click outside handling
- **AssetCard** - Display Supabase assets with metadata

### Hooks
- **useAssets** - Query Supabase assets with filtering
- **useHeroAssets** - Get featured assets
- **useAssetsByStyle** - Filter by therapeutic style
- **useAssetsForContext** - Context-based asset selection

## 🗄️ Supabase Integration

Connects to your existing `storage_assets` table with:
- **5 Therapeutic Styles**: neural_flower, flowstate, evolvingforms, mindblock, neural_flow
- **Flexible Governance Tags**: therapeutic, growth, flow, transformation, etc.
- **Context Mapping**: Meditation, healing, focus, growth, calm, breakthrough
- **Asset Metadata**: dimensions, types, descriptions, tags

### Environment Variables

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
### Environment Variables

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
VITE_SUPABASE_CDN_URL=your_cdn_base_url  # Optional, for faster asset loading
```

## ⚡ Performance & CDN Integration

### CDN Caching & Image Optimization

The design system includes advanced performance features for optimal asset delivery:

- **CDN Integration**: Automatic CDN URL generation with fallback to Supabase storage
- **Cache Busting**: Version-based cache invalidation using asset metadata
- **Image Transforms**: On-demand resizing, format conversion (WebP, AVIF), quality optimization
- **Responsive Images**: Automatic srcset generation for different breakpoints
- **Format Fallbacks**: WebP/AVIF with original format fallbacks

### Image Optimization Utilities

```tsx
import { supabaseClient, ImageOptimizationUtils } from '@design-system/supabase';

// Get optimized asset URL
const assetUrl = supabaseClient.getAssetUrl(asset, {
  width: 800,
  height: 600,
  format: 'webp',
  quality: 85,
  version: '1.0.0'
});

// Generate responsive image srcset
const srcSet = ImageOptimizationUtils.generateSrcSet(asset, [400, 800, 1200], 'webp');

// Get modern format fallbacks
const fallbacks = supabaseClient.getFallbackImageUrls(asset);
// { webp: '...', avif: '...', original: '...' }

// Calculate optimal dimensions
const dimensions = ImageOptimizationUtils.calculateOptimalDimensions(800, 600, 16/9);
// { width: 800, height: 450 }
```

### Cache Management

```tsx
import { CacheUtils } from '@design-system/supabase';

// Cache asset data locally
CacheUtils.setCachedAsset(asset.id, asset);

// Retrieve cached asset
const cachedAsset = CacheUtils.getCachedAsset(asset.id);

// Clear cache when needed
CacheUtils.clearAssetCache();

// Get cache statistics
const stats = CacheUtils.getCacheStats();
// { totalItems: 25, totalSize: 15432 }
```

### Performance Monitoring

```tsx
import { PerformanceUtils } from '@design-system/supabase';

// Measure image load performance
const loadTime = await PerformanceUtils.measureImageLoad(assetUrl);

// Track asset usage
PerformanceUtils.trackAssetUsage(asset.id, 'hero-section', userId);

// Generate performance report
const report = PerformanceUtils.generatePerformanceReport(loadEntries);
// { averageLoadTime: 245, slowestAsset: '...', fastestAsset: '...', totalAssets: 10 }
```

## 🛠️ Development Tools

- **TypeScript** - Full type safety across all packages
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Vitest** - Unit testing with React Testing Library
- **Storybook** - Component documentation and development
- **GitHub Actions** - CI/CD pipeline

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

3. **Sync Supabase assets**:
   ```bash
   npm run sync-assets
   ```

4. **Build all packages**:
   ```bash
   npm run build
   ```

5. **Start Storybook**:
   ```bash
   npm run storybook
   ```

6. **Start documentation site**:
   ```bash
   npm run dev --workspace=@design-system/docs
   ```

## 📋 Available Scripts

- `npm run build` - Build all packages
- `npm run dev` - Start development for all packages
- `npm run lint` - Lint all code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Type check all packages
- `npm test` - Run all tests
- `npm run storybook` - Start Storybook
- `npm run sync-assets` - Sync governance tags from Supabase

## 🧪 Testing

Components include unit tests with Vitest and React Testing Library:
```bash
npm test --workspace=@design-system/components
```

## 📚 Documentation

- **Storybook**: Interactive component documentation
- **README**: Package documentation
- **TypeScript**: Full type definitions
- **JSDoc**: Inline code documentation

## 🎯 Key Features

✅ **Monorepo Structure** - Organized packages with npm workspaces
✅ **Type Safety** - Full TypeScript coverage
✅ **Component Library** - Reusable React components
✅ **Design Tokens** - Centralized design system values
✅ **Supabase Integration** - Asset management and querying
✅ **Testing Setup** - Unit tests with Vitest
✅ **Documentation** - Storybook and comprehensive docs
✅ **CI/CD** - GitHub Actions workflow
✅ **Code Quality** - ESLint, Prettier, type checking
✅ **Accessibility** - Built-in a11y considerations

## 📖 Usage Examples

### Using Components
```tsx
import { Button, Card, Input, Modal } from '@design-system/components';
import { colors, spacing } from '@design-system/tokens';

function App() {
  return (
    <Card padding={6}>
      <Input label="Email" type="email" />
      <Button onClick={() => console.log('Clicked!')}>
        Submit
      </Button>
    </Card>
  );
}
```

### Using Supabase Assets
```tsx
import { useAssets, AssetCard } from '@design-system/components';

function AssetGallery() {
  const { assets, loading } = useAssets({ style: 'neural_flower', limit: 10 });

  return (
    <div>
      {assets.map(asset => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
```

This design system provides everything needed for a professional, scalable component library with your therapeutic asset integration! 🎨✨

### Querying Assets

```tsx
import { supabaseClient } from '@design-system/supabase';

// Get hero assets
const heroes = await supabaseClient.getHeroAssets({ limit: 5 });

// Get assets for meditation context
const meditationAssets = await supabaseClient.getAssetsForContext('meditation', 10);

// Query with filters
const filteredAssets = await supabaseClient.queryStorageAssets({
  style: 'flowstate',
  type: 'image',
  tags: ['therapeutic', 'calm']
});
```