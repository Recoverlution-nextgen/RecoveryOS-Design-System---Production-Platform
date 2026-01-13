# RecoveryOS Asset Processing Pipeline

A comprehensive, AI-powered asset processing system that integrates Canva designs with intelligent therapeutic content delivery.

## 🚀 Features

- **Canva Connect Integration**: OAuth 2.0 PKCE authentication with real-time webhooks
- **Automated Processing Pipeline**: Transcoding, optimization, and intelligent tagging
- **Deep Tagging System**: Therapeutic, emotional, cognitive, and clinical relevance tagging
- **Intelligent Asset Selection**: Context-aware asset matching based on user state
- **Governance & Compliance**: Automated content validation and approval workflows
- **Performance Optimization**: Multi-format transcoding (AVIF, WebP) with performance budgets
- **Real-time Webhooks**: Automatic re-processing when designs are updated

## 📋 Prerequisites

- Node.js 18+
- Supabase project with database
- Canva developer account with Connect API access
- Vite/React application

## 🛠️ Installation

### 1. Database Setup

Run the asset registry schema:

```sql
-- Execute the contents of src/supabase/SCHEMA.sql
-- This creates all asset-related tables and indexes
```

### 2. Environment Variables

Add to your `.env` file:

```env
# Canva Connect API
VITE_CANVA_CLIENT_ID=your_canva_client_id
CANVA_CLIENT_SECRET=your_canva_client_secret
VITE_CANVA_REDIRECT_URI=http://localhost:3000/auth/canva/callback

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 🔧 Configuration

### Canva Connect Setup

1. Create a Canva app at https://www.canva.com/developers/
2. Configure OAuth settings:
   - Redirect URI: `http://localhost:3000/auth/canva/callback`
   - Scopes: `design:content:read`, `design:content:write`, `design:meta:read`
3. Set up webhooks for real-time updates:
   - Webhook URL: `https://yourdomain.com/api/webhooks/canva`
   - Events: `design.updated`, `design.created`, `design.deleted`

### Governance Rules

Configure content governance rules in the database:

```sql
INSERT INTO asset_governance_rules (
  rule_name,
  rule_description,
  applies_to_categories,
  conditions,
  actions,
  severity
) VALUES (
  'Clinical Accuracy Check',
  'Ensure therapeutic content is clinically accurate',
  ARRAY['emotional-regulation', 'cognitive-reframing'],
  '{"requires_clinical_review": true}',
  '{"flag_for_review": true, "notify_clinicians": true}',
  'high'
);
```

## 📖 Usage

### Basic Asset Import

```tsx
import { CanvaConnect } from './components/CanvaConnect';

function App() {
  return (
    <div>
      <CanvaConnect />
    </div>
  );
}
```

### Intelligent Asset Selection

```tsx
import { IntelligentAssetSelector } from './components/IntelligentAssetSelector';

function TherapySession({ userContext }) {
  return (
    <IntelligentAssetSelector
      context={userContext}
      maxAssets={3}
      onAssetSelect={(assets) => console.log('Selected assets:', assets)}
    />
  );
}

// Example user context
const userContext = {
  currentEmotion: 'anxious',
  sessionPhase: 'education',
  clinicalProfile: {
    primaryConcerns: ['anxiety', 'stress'],
    therapeuticApproaches: ['cognitive-behavioral'],
    progressStage: 'middle'
  },
  accessibility: {
    prefersReducedMotion: false,
    textSize: 'medium'
  }
};
```

### Manual Asset Processing

```tsx
import { AssetProcessingEngine } from './services/assetProcessor';

// Queue processing jobs
await AssetProcessingEngine.queueJob({
  asset_id: 'asset-123',
  job_type: 'optimize',
  job_config: { formats: ['avif', 'webp'], quality: 85 },
  priority: 3
});

await AssetProcessingEngine.queueJob({
  asset_id: 'asset-123',
  job_type: 'tag',
  job_config: { auto_tag: true, clinical_focus: true },
  priority: 2
});
```

## 🏗️ Architecture

### Core Components

1. **CanvaConnect Service** (`src/services/canvaConnect.ts`)
   - OAuth 2.0 PKCE authentication
   - Design export and import
   - Webhook handling

2. **Asset Processor** (`src/services/assetProcessor.ts`)
   - Multi-format transcoding
   - Image optimization (AVIF/WebP)
   - Intelligent tagging
   - Governance checking

3. **Intelligent Selector** (`src/components/IntelligentAssetSelector.tsx`)
   - Context-aware asset matching
   - Therapeutic relevance scoring
   - Performance optimization

4. **Database Schema** (`src/supabase/SCHEMA.sql`)
   - Asset registry tables
   - Processing pipeline tables
   - Governance and compliance tables

### Processing Pipeline

```
Canva Design → OAuth Auth → Export → Upload to Supabase → Processing Queue → Transcode → Tag → Governance Check → Asset Registry → Intelligent Selection
```

## 🧪 Testing

Run the comprehensive test suite:

```typescript
import { runAssetProcessingTests } from './tests/assetProcessingTests';

// Run all tests
await runAssetProcessingTests();
```

Or run individual tests:

```typescript
import { AssetProcessingTestSuite } from './tests/assetProcessingTests';

const suite = new AssetProcessingTestSuite();
await suite.runAllTests();
suite.printResults();
```

## 🔒 Security

### Authentication
- OAuth 2.0 PKCE for Canva integration
- Supabase RLS policies for data access
- Webhook signature verification

### Content Governance
- Automated content validation
- Clinical accuracy checking
- Access logging and monitoring

### Performance
- File size limits and format validation
- CDN optimization for asset delivery
- Lazy loading and progressive enhancement

## 📊 Monitoring & Analytics

### Asset Performance Metrics
```sql
SELECT
  asset_id,
  usage_count,
  avg(load_time_ms) as avg_load_time,
  count(*) as access_count
FROM asset_access_logs
WHERE accessed_at > NOW() - INTERVAL '30 days'
GROUP BY asset_id
ORDER BY access_count DESC;
```

### Processing Pipeline Health
```sql
SELECT
  job_status,
  count(*) as job_count,
  avg(EXTRACT(EPOCH FROM (completed_at - started_at))) as avg_duration
FROM asset_processing_jobs
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY job_status;
```

## 🚀 Deployment

### Environment Setup

1. **Development**:
   ```bash
   npm run dev
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm run preview
   ```

### Webhook Deployment

Deploy webhook handlers to a serverless platform:

```typescript
// Vercel API Route (api/webhooks/canva.ts)
import { canvaWebhookNextApi } from '../../webhooks/canvaWebhook';

export default canvaWebhookNextApi;
```

```typescript
// Netlify Function (netlify/functions/canva-webhook.js)
const { handleCanvaWebhook } = require('../../webhooks/canvaWebhook');

exports.handler = async (event) => {
  // Handle CORS and method validation
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const response = await handleCanvaWebhook(event);
  return {
    statusCode: response.status,
    body: JSON.stringify({ status: 'ok' })
  };
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Canva Authentication Fails**
   - Verify client ID and secret
   - Check redirect URI matches Canva app settings
   - Ensure PKCE code challenge is generated correctly

2. **Asset Processing Stuck**
   - Check processing job status in database
   - Verify Supabase storage permissions
   - Check for errors in processing job logs

3. **Webhook Not Receiving Events**
   - Verify webhook URL is publicly accessible
   - Check webhook signature verification
   - Ensure Canva app has correct webhook configuration

### Debug Mode

Enable debug logging:

```typescript
// In development
localStorage.setItem('asset-processing-debug', 'true');

// Check processing status
console.log('Asset processing debug enabled');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests: `npm test`
4. Submit a pull request

## 📄 License

This project is part of the RecoveryOS platform. See LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the troubleshooting guide above
- Run the test suite to diagnose issues
- Review logs in browser console and database
- Create an issue with detailed reproduction steps

---

**Built with ❤️ for the RecoveryOS platform**