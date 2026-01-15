# RecoveryOS Web App

A Next.js application showcasing the RecoveryOS Design System.

## Features

- **Design System Showcase**: Interactive component library
- **Documentation Hub**: Cross-referenced governance documentation
- **Therapeutic Assets**: Governed visual content integration
- **Performance Optimized**: CDN-ready with optimal loading

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This app is configured for Vercel deployment with:

- **Framework**: Next.js 14
- **Build Command**: `npm run build`
- **Root Directory**: `apps/web`
- **Node Version**: 18+

## Environment Variables

Add these to your Vercel project settings:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Asset Configuration
NEXT_PUBLIC_ASSET_CDN_URL=your_cdn_url
```

## Architecture

- **Framework**: Next.js with App Router
- **Styling**: CSS custom properties with design tokens
- **Components**: RecoveryOS UI component library
- **Assets**: Supabase-powered asset management
- **TypeScript**: Full type safety throughout