<!doctype html>  
<html lang="en">  
 <head>  
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <title>Critical Considerations - Asset Pipeline</title>  
  <style>  
    * {  
      margin: 0;  
      padding: 0;  
      box-sizing: border-box;  
    }  
  
    html, body {  
      height: 100%;  
    }  
  
    body {  
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;  
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);  
      color: #e2e8f0;  
      box-sizing: border-box;  
    }  
  
    .main-container {  
      width: 100%;  
      height: 100%;  
      overflow-y: auto;  
      padding: 48px 24px;  
    }  
  
    .content-wrapper {  
      max-width: 1400px;  
      margin: 0 auto;  
    }  
  
    .hero-header {  
      text-align: center;  
      margin-bottom: 64px;  
      padding: 40px 20px;  
      background: rgba(99, 102, 241, 0.1);  
      border: 2px solid rgba(99, 102, 241, 0.3);  
      border-radius: 24px;  
      backdrop-filter: blur(10px);  
    }  
  
    .hero-title {  
      font-size: 56px;  
      font-weight: 900;  
      margin-bottom: 20px;  
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ef4444 100%);  
      -webkit-background-clip: text;  
      -webkit-text-fill-color: transparent;  
      letter-spacing: -1px;  
    }  
  
    .hero-subtitle {  
      font-size: 20px;  
      color: #cbd5e1;  
      line-height: 1.7;  
      max-width: 800px;  
      margin: 0 auto;  
    }  
  
    .category-section {  
      margin-bottom: 48px;  
    }  
  
    .category-header {  
      display: flex;  
      align-items: center;  
      gap: 16px;  
      margin-bottom: 32px;  
      padding-bottom: 16px;  
      border-bottom: 3px solid rgba(99, 102, 241, 0.4);  
    }  
  
    .category-icon {  
      font-size: 48px;  
      filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.6));  
    }  
  
    .category-title {  
      font-size: 32px;  
      font-weight: 800;  
      color: #f1f5f9;  
    }  
  
    .considerations-grid {  
      display: grid;  
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));  
      gap: 24px;  
    }  
  
    .consideration-card {  
      background: rgba(30, 27, 75, 0.6);  
      border: 2px solid rgba(99, 102, 241, 0.3);  
      border-radius: 16px;  
      padding: 32px;  
      transition: all 0.3s;  
      position: relative;  
      overflow: hidden;  
    }  
  
    .consideration-card::before {  
      content: '';  
      position: absolute;  
      top: 0;  
      left: 0;  
      right: 0;  
      height: 4px;  
      background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);  
      opacity: 0;  
      transition: opacity 0.3s;  
    }  
  
    .consideration-card:hover {  
      transform: translateY(-4px);  
      border-color: rgba(99, 102, 241, 0.6);  
      box-shadow: 0 16px 48px rgba(99, 102, 241, 0.3);  
    }  
  
    .consideration-card:hover::before {  
      opacity: 1;  
    }  
  
    .card-header {  
      display: flex;  
      align-items: flex-start;  
      gap: 16px;  
      margin-bottom: 20px;  
    }  
  
    .card-emoji {  
      font-size: 40px;  
      flex-shrink: 0;  
    }  
  
    .card-title {  
      font-size: 22px;  
      font-weight: 700;  
      color: #f1f5f9;  
      line-height: 1.3;  
    }  
  
    .card-description {  
      font-size: 15px;  
      color: #cbd5e1;  
      line-height: 1.7;  
      margin-bottom: 20px;  
    }  
  
    .impact-badge {  
      display: inline-flex;  
      align-items: center;  
      gap: 8px;  
      padding: 8px 16px;  
      border-radius: 8px;  
      font-size: 13px;  
      font-weight: 700;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
      margin-bottom: 16px;  
    }  
  
    .impact-critical {  
      background: rgba(239, 68, 68, 0.2);  
      color: #fca5a5;  
      border: 2px solid rgba(239, 68, 68, 0.4);  
    }  
  
    .impact-high {  
      background: rgba(251, 191, 36, 0.2);  
      color: #fcd34d;  
      border: 2px solid rgba(251, 191, 36, 0.4);  
    }  
  
    .impact-medium {  
      background: rgba(99, 102, 241, 0.2);  
      color: #a5b4fc;  
      border: 2px solid rgba(99, 102, 241, 0.4);  
    }  
  
    .details-list {  
      list-style: none;  
      margin-top: 20px;  
    }  
  
    .details-list li {  
      position: relative;  
      padding-left: 32px;  
      margin-bottom: 12px;  
      font-size: 14px;  
      color: #cbd5e1;  
      line-height: 1.6;  
    }  
  
    .details-list li::before {  
      content: '▸';  
      position: absolute;  
      left: 8px;  
      color: #6366f1;  
      font-size: 18px;  
      font-weight: 700;  
    }  
  
    .solution-box {  
      background: rgba(16, 185, 129, 0.1);  
      border: 2px solid rgba(16, 185, 129, 0.3);  
      border-radius: 12px;  
      padding: 20px;  
      margin-top: 20px;  
    }  
  
    .solution-header {  
      display: flex;  
      align-items: center;  
      gap: 10px;  
      font-size: 15px;  
      font-weight: 700;  
      color: #6ee7b7;  
      margin-bottom: 12px;  
    }  
  
    .solution-text {  
      font-size: 14px;  
      color: #a7f3d0;  
      line-height: 1.6;  
    }  
  
    .warning-box {  
      background: rgba(239, 68, 68, 0.1);  
      border: 2px solid rgba(239, 68, 68, 0.3);  
      border-radius: 12px;  
      padding: 20px;  
      margin-top: 20px;  
    }  
  
    .warning-header {  
      display: flex;  
      align-items: center;  
      gap: 10px;  
      font-size: 15px;  
      font-weight: 700;  
      color: #fca5a5;  
      margin-bottom: 12px;  
    }  
  
    .warning-text {  
      font-size: 14px;  
      color: #fecaca;  
      line-height: 1.6;  
    }  
  
    .code-snippet {  
      background: rgba(15, 23, 42, 0.9);  
      border: 1px solid rgba(99, 102, 241, 0.3);  
      border-radius: 10px;  
      padding: 16px;  
      margin-top: 16px;  
      font-family: 'Monaco', 'Courier New', monospace;  
      font-size: 13px;  
      color: #e2e8f0;  
      overflow-x: auto;  
      line-height: 1.6;  
    }  
  
    .checklist-section {  
      background: rgba(99, 102, 241, 0.1);  
      border: 2px solid rgba(99, 102, 241, 0.3);  
      border-radius: 20px;  
      padding: 40px;  
      margin-top: 48px;  
    }  
  
    .checklist-title {  
      font-size: 28px;  
      font-weight: 800;  
      color: #f1f5f9;  
      margin-bottom: 24px;  
      display: flex;  
      align-items: center;  
      gap: 16px;  
    }  
  
    .checklist {  
      display: grid;  
      gap: 16px;  
    }  
  
    .checklist-item {  
      background: rgba(30, 27, 75, 0.6);  
      border: 2px solid rgba(99, 102, 241, 0.2);  
      border-radius: 12px;  
      padding: 20px;  
      display: flex;  
      align-items: flex-start;  
      gap: 16px;  
      transition: all 0.2s;  
      cursor: pointer;  
    }  
  
    .checklist-item:hover {  
      border-color: rgba(99, 102, 241, 0.5);  
      transform: translateX(4px);  
    }  
  
    .checkbox {  
      width: 28px;  
      height: 28px;  
      border: 3px solid rgba(99, 102, 241, 0.5);  
      border-radius: 6px;  
      flex-shrink: 0;  
      margin-top: 2px;  
      display: flex;  
      align-items: center;  
      justify-content: center;  
      transition: all 0.2s;  
    }  
  
    .checklist-item.checked .checkbox {  
      background: #6366f1;  
      border-color: #6366f1;  
    }  
  
    .checkbox::after {  
      content: '✓';  
      color: white;  
      font-size: 18px;  
      font-weight: 700;  
      opacity: 0;  
      transform: scale(0);  
      transition: all 0.2s;  
    }  
  
    .checklist-item.checked .checkbox::after {  
      opacity: 1;  
      transform: scale(1);  
    }  
  
    .checklist-text {  
      flex: 1;  
    }  
  
    .checklist-label {  
      font-size: 16px;  
      font-weight: 600;  
      color: #f1f5f9;  
      margin-bottom: 6px;  
    }  
  
    .checklist-item.checked .checklist-label {  
      opacity: 0.6;  
      text-decoration: line-through;  
    }  
  
    .checklist-desc {  
      font-size: 14px;  
      color: #94a3b8;  
      line-height: 1.5;  
    }  
  
    .resource-links {  
      display: grid;  
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));  
      gap: 20px;  
      margin-top: 32px;  
    }  
  
    .resource-card {  
      background: rgba(30, 27, 75, 0.6);  
      border: 2px solid rgba(99, 102, 241, 0.3);  
      border-radius: 12px;  
      padding: 24px;  
      transition: all 0.3s;  
      cursor: pointer;  
    }  
  
    .resource-card:hover {  
      transform: translateY(-4px);  
      border-color: rgba(99, 102, 241, 0.6);  
      box-shadow: 0 12px 32px rgba(99, 102, 241, 0.3);  
    }  
  
    .resource-icon {  
      font-size: 36px;  
      margin-bottom: 12px;  
    }  
  
    .resource-title {  
      font-size: 18px;  
      font-weight: 700;  
      color: #f1f5f9;  
      margin-bottom: 8px;  
    }  
  
    .resource-desc {  
      font-size: 14px;  
      color: #94a3b8;  
      line-height: 1.6;  
    }  
  
    .summary-callout {  
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);  
      border: 3px solid rgba(99, 102, 241, 0.5);  
      border-radius: 20px;  
      padding: 48px;  
      margin-top: 64px;  
      text-align: center;  
    }  
  
    .summary-icon {  
      font-size: 64px;  
      margin-bottom: 24px;  
    }  
  
    .summary-title {  
      font-size: 36px;  
      font-weight: 900;  
      color: #f1f5f9;  
      margin-bottom: 16px;  
    }  
  
    .summary-text {  
      font-size: 18px;  
      color: #cbd5e1;  
      line-height: 1.8;  
      max-width: 800px;  
      margin: 0 auto;  
    }  
  
    @media (max-width: 768px) {  
      .main-container {  
        padding: 24px 16px;  
      }  
  
      .hero-title {  
        font-size: 36px;  
      }  
  
      .considerations-grid {  
        grid-template-columns: 1fr;  
      }  
  
      .resource-links {  
        grid-template-columns: 1fr;  
      }  
    }  
  </style>  
  <style>@view-transition { navigation: auto; }</style>  
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>  
  <script src="/_sdk/element_sdk.js" type="text/javascript"></script>  
  <script src="https://cdn.tailwindcss.com" type="text/javascript"></script>  
 </head>  
 <body>  
  <div class="main-container">  
   <div class="content-wrapper">  
    <header class="hero-header">  
     <h1 class="hero-title">⚠️ Critical Considerations</h1>  
     <p class="hero-subtitle">The often-overlooked details that separate a good asset pipeline from a great one. These are the things that will save you from headaches, debugging nightmares, and production failures down the road.</p>  
    </header><!-- Security & Compliance -->  
    <div class="category-section">  
     <div class="category-header"><span class="category-icon">🔒</span>  
      <h2 class="category-title">Security &amp; Compliance</h2>  
     </div>  
     <div class="considerations-grid">  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🔑</span>  
        <h3 class="card-title">API Key &amp; Secrets Management</h3>  
       </div><span class="impact-badge impact-critical">🔥 Critical</span>  
       <p class="card-description">Never hardcode API keys, OAuth secrets, or database credentials in your code. A single exposed secret can compromise your entire system.</p>  
       <ul class="details-list">  
        <li>Use environment variables for all secrets</li>  
        <li>Rotate keys every 90 days</li>  
        <li>Never commit .env files to Git</li>  
        <li>Use secret management services (AWS Secrets Manager, Vault)</li>  
        <li>Implement least-privilege access policies</li>  
       </ul>  
       <div class="solution-box">  
        <div class="solution-header"><span>✅</span> <span>Best Practice</span>  
        </div>  
        <div class="solution-text">  
         Use platform-native secret management: Vercel Environment Variables, Netlify Environment Variables, or AWS Parameter Store. These encrypt secrets at rest and inject them at runtime.  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">👤</span>  
        <h3 class="card-title">Image Rights &amp; Consent</h3>  
       </div><span class="impact-badge impact-critical">🔥 Critical</span>  
       <p class="card-description">If your assets include photos of real people, you MUST track consent and usage rights. GDPR and CCPA violations carry massive fines.</p>  
       <ul class="details-list">  
        <li>Store consent metadata with each asset</li>  
        <li>Track consent scope (public, internal, region-specific)</li>  
        <li>Implement "right to be forgotten" deletion workflows</li>  
        <li>Log all asset access for audit trails</li>  
        <li>Geographic restrictions for region-specific rights</li>  
       </ul>  
       <div class="warning-box">  
        <div class="warning-header"><span>⚠️</span> <span>Legal Requirement</span>  
        </div>  
        <div class="warning-text">  
         GDPR fines can reach €20 million or 4% of global revenue. Build consent tracking from day one, not as an afterthought.  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🛡️</span>  
        <h3 class="card-title">CDN Security &amp; Access Control</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">Public CDN URLs are guessable. Without proper access controls, anyone can hotlink your assets or scrape your entire library.</p>  
       <ul class="details-list">  
        <li>Use signed URLs for sensitive assets</li>  
        <li>Implement hotlink protection (referer checking)</li>  
        <li>Rate limiting on CDN endpoints</li>  
        <li>Geographic restrictions if needed</li>  
        <li>Watermarking for public preview assets</li>  
       </ul>  
       <div class="code-snippet">  
        // Generate signed URL with expiration const signedUrl = cloudfront.getSignedUrl({ url: 'https://cdn.example.com/asset.jpg', expires: Math.floor(Date.now() / 1000) + 3600, // 1 hour policy: JSON.stringify({ Statement: [{ Resource: 'https://cdn.example.com/*', Condition: { DateLessThan: { 'AWS:EpochTime': expires }, IpAddress: { 'AWS:SourceIp': allowedIPs } } }] }) });  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">📜</span>  
        <h3 class="card-title">Audit Logging</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">When something breaks or assets get corrupted, you need to know who did what and when. Comprehensive logging saves hours of debugging.</p>  
       <ul class="details-list">  
        <li>Log all asset uploads and modifications</li>  
        <li>Track who approved/rejected assets</li>  
        <li>Record all registry updates with timestamps</li>  
        <li>Store processing errors and retries</li>  
        <li>Keep logs for 90+ days for compliance</li>  
       </ul>  
      </div>  
     </div>  
    </div><!-- Performance & Scale -->  
    <div class="category-section">  
     <div class="category-header"><span class="category-icon">⚡</span>  
      <h2 class="category-title">Performance &amp; Scale</h2>  
     </div>  
     <div class="considerations-grid">  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🎯</span>  
        <h3 class="card-title">Processing Timeouts</h3>  
       </div><span class="impact-badge impact-critical">🔥 Critical</span>  
       <p class="card-description">Serverless functions have timeout limits (10s-15min). Large video processing WILL fail if you don't architect for async processing.</p>  
       <ul class="details-list">  
        <li>Vercel Functions: 10s free tier, 5min paid</li>  
        <li>AWS Lambda: 15 minutes maximum</li>  
        <li>Use job queues (Bull, AWS SQS) for long tasks</li>  
        <li>Break video processing into chunks</li>  
        <li>Implement progress tracking for users</li>  
       </ul>  
       <div class="solution-box">  
        <div class="solution-header"><span>✅</span> <span>Architecture Pattern</span>  
        </div>  
        <div class="solution-text">  
         Webhook receives export → Validates quickly → Queues processing job → Returns 200 immediately → Background worker processes asset → Updates registry when complete → Sends notification.  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">💾</span>  
        <h3 class="card-title">Storage Costs at Scale</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">Generating 5 formats × 4 sizes = 20 files per asset. With 1,000 assets, that's 20,000 files. Storage costs compound fast if you're not careful.</p>  
       <ul class="details-list">  
        <li>Only generate formats you actually use</li>  
        <li>Implement lifecycle policies (delete old versions)</li>  
        <li>Consider on-demand transformation (Cloudinary, Imgix)</li>  
        <li>Compress aggressively (WebP saves 30-50% vs JPEG)</li>  
        <li>Monitor storage growth monthly</li>  
       </ul>  
       <div class="code-snippet">  
        // Example cost calculation 1000 assets × 20 renditions × 500KB avg = 10GB storage S3: 10GB × $0.023/GB/month = $0.23/month storage + 100k requests × $0.0004 = $40/month requests CloudFlare R2: 10GB storage = FREE Egress bandwidth = FREE Total savings: ~$40/month with R2  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🔄</span>  
        <h3 class="card-title">Retry Logic &amp; Idempotency</h3>  
       </div><span class="impact-badge impact-critical">🔥 Critical</span>  
       <p class="card-description">Webhooks can fire multiple times. Processing can fail halfway. Without idempotency, you'll create duplicate assets or corrupt your registry.</p>  
       <ul class="details-list">  
        <li>Generate deterministic asset IDs (not random UUIDs)</li>  
        <li>Check if asset already exists before processing</li>  
        <li>Implement retry with exponential backoff</li>  
        <li>Use database transactions for registry updates</li>  
        <li>Store processing state (pending, processing, complete, failed)</li>  
       </ul>  
       <div class="code-snippet">  
        // Idempotent asset creation const assetId = generateDeterministicId(metadata); // hash-based const existing = await registry.get(assetId); if (existing &amp;&amp; existing.status === 'complete') { return existing; // Already processed, skip } // Process only if not complete const result = await processAsset(file, metadata); await registry.upsert(assetId, result); // upsert, not insert  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">📊</span>  
        <h3 class="card-title">Registry Performance</h3>  
       </div><span class="impact-badge impact-medium">💡 Medium Impact</span>  
       <p class="card-description">A 10MB JSON registry with 10,000 assets is slow to download and parse. Plan for efficient querying and caching strategies.</p>  
       <ul class="details-list">  
        <li>Implement pagination (don't return all assets at once)</li>  
        <li>Add database indexes on frequently-queried fields</li>  
        <li>Cache registry in CDN with appropriate TTLs</li>  
        <li>Consider GraphQL for flexible querying</li>  
        <li>Implement search functionality for large registries</li>  
       </ul>  
      </div>  
     </div>  
    </div><!-- Developer Experience -->  
    <div class="category-section">  
     <div class="category-header"><span class="category-icon">🛠️</span>  
      <h2 class="category-title">Developer Experience &amp; Maintenance</h2>  
     </div>  
     <div class="considerations-grid">  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🔍</span>  
        <h3 class="card-title">Observability &amp; Monitoring</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">You won't know the system is broken until users complain. Proactive monitoring catches issues before they impact production.</p>  
       <ul class="details-list">  
        <li>Track processing success/failure rates</li>  
        <li>Monitor webhook delivery times</li>  
        <li>Alert on error spikes (&gt;5% failure rate)</li>  
        <li>Dashboard for processing queue length</li>  
        <li>CDN cache hit rates and bandwidth usage</li>  
        <li>Database query performance metrics</li>  
       </ul>  
       <div class="solution-box">  
        <div class="solution-header"><span>✅</span> <span>Recommended Tools</span>  
        </div>  
        <div class="solution-text">  
         Sentry for error tracking, Datadog/Grafana for metrics, PagerDuty for on-call alerts, LogRocket for session replay and debugging.  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🧪</span>  
        <h3 class="card-title">Testing Strategy</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">Manual testing breaks down when you have 50+ asset types and 20+ processing variations. Automated testing is non-negotiable.</p>  
       <ul class="details-list">  
        <li>Unit tests for naming validation logic</li>  
        <li>Integration tests for processing pipeline</li>  
        <li>End-to-end tests simulating Canva webhooks</li>  
        <li>Visual regression tests for image quality</li>  
        <li>Load testing for concurrent processing</li>  
        <li>Schema validation tests for registry</li>  
       </ul>  
       <div class="code-snippet">  
        // Example test structure describe('Asset Processing Pipeline', () =&gt; { test('validates naming convention', async () =&gt; { const result = validateAssetName('hero_product_feature_001'); expect(result.valid).toBe(true); expect(result.metadata.asset_class).toBe('hero'); }); test('generates all required renditions', async () =&gt; { const renditions = await processImage(testImage); expect(renditions).toHaveLength(12); // 3 formats × 4 sizes expect(renditions.every(r =&gt; r.hash)).toBe(true); }); test('handles duplicate uploads idempotently', async () =&gt; { await processAndUpload(asset); await processAndUpload(asset); // duplicate const registry = await getRegistry(); expect(registry.assets).toHaveLength(1); // not duplicated }); });  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">📖</span>  
        <h3 class="card-title">Documentation &amp; Onboarding</h3>  
       </div><span class="impact-badge impact-medium">💡 Medium Impact</span>  
       <p class="card-description">When a new designer joins or you need to troubleshoot 6 months later, good documentation is the difference between 10 minutes and 10 hours.</p>  
       <ul class="details-list">  
        <li>Document asset naming grammar with examples</li>  
        <li>Step-by-step Canva export instructions</li>  
        <li>Troubleshooting guide for common errors</li>  
        <li>Architecture diagrams (how data flows)</li>  
        <li>API documentation for registry access</li>  
        <li>Video walkthrough for designers</li>  
       </ul>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🔄</span>  
        <h3 class="card-title">Version Control &amp; Rollback</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">When a bad deployment corrupts assets or breaks processing, you need to roll back instantly. Version everything.</p>  
       <ul class="details-list">  
        <li>Tag all registry updates with version numbers</li>  
        <li>Store previous registry versions for 30 days</li>  
        <li>Enable S3 versioning for asset files</li>  
        <li>Git tag production deployments</li>  
        <li>One-click rollback capability</li>  
        <li>Canary deployments for risky changes</li>  
       </ul>  
      </div>  
     </div>  
    </div><!-- Workflow & Governance -->  
    <div class="category-section">  
     <div class="category-header"><span class="category-icon">👥</span>  
      <h2 class="category-title">Workflow &amp; Governance</h2>  
     </div>  
     <div class="considerations-grid">  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">✅</span>  
        <h3 class="card-title">Approval Workflows</h3>  
       </div><span class="impact-badge impact-medium">💡 Medium Impact</span>  
       <p class="card-description">Not every exported asset should go straight to production. Build approval gates for quality control and brand consistency.</p>  
       <ul class="details-list">  
        <li>Assets default to "pending" status</li>  
        <li>Require explicit approval before CDN publication</li>  
        <li>Track who approved each asset and when</li>  
        <li>Slack/email notifications for pending approvals</li>  
        <li>Batch approval interface for efficiency</li>  
        <li>Rejection feedback loop to designers</li>  
       </ul>  
       <div class="solution-box">  
        <div class="solution-header"><span>✅</span> <span>Workflow States</span>  
        </div>  
        <div class="solution-text">  
         pending → under_review → approved → published<br>  
          pending → rejected → needs_revision  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🎨</span>  
        <h3 class="card-title">Quality Validation</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">Automated checks catch common mistakes before humans review. This saves time and ensures consistency across thousands of assets.</p>  
       <ul class="details-list">  
        <li>Minimum resolution requirements (e.g., 1920px wide)</li>  
        <li>File size limits (reject overly large files)</li>  
        <li>Color space validation (sRGB only)</li>  
        <li>Accessibility checks (contrast ratios)</li>  
        <li>Brand color compliance (if applicable)</li>  
        <li>Metadata completeness (alt text required)</li>  
       </ul>  
       <div class="code-snippet">  
        // Automated validation example async function validateAsset(buffer, metadata) { const image = await sharp(buffer).metadata(); const errors = []; if (image.width &lt; 1920) { errors.push('Image too small: minimum 1920px wide'); } if (buffer.length &gt; 5 * 1024 * 1024) { errors.push('File too large: maximum 5MB'); } if (image.space !== 'srgb') { errors.push('Invalid color space: must be sRGB'); } if (!metadata.alt || metadata.alt.length &lt; 10) { errors.push('Alt text required (min 10 characters)'); } return { valid: errors.length === 0, errors }; }  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🔔</span>  
        <h3 class="card-title">Notification System</h3>  
       </div><span class="impact-badge impact-medium">💡 Medium Impact</span>  
       <p class="card-description">Keep stakeholders informed without overwhelming them. The right notifications at the right time improve collaboration.</p>  
       <ul class="details-list">  
        <li>Designer: asset processed successfully</li>  
        <li>Designer: asset failed validation (with error details)</li>  
        <li>Approver: new assets pending review</li>  
        <li>Team: daily summary of asset activity</li>  
        <li>Ops: error rate spike alerts</li>  
        <li>All: registry version updates</li>  
       </ul>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">📱</span>  
        <h3 class="card-title">Admin Dashboard</h3>  
       </div><span class="impact-badge impact-medium">💡 Medium Impact</span>  
       <p class="card-description">A simple UI for managing assets, approving uploads, and troubleshooting issues saves hours compared to raw database access.</p>  
       <ul class="details-list">  
        <li>View all assets with thumbnails and metadata</li>  
        <li>Filter by status, surface, asset class</li>  
        <li>Approve/reject interface</li>  
        <li>Manual re-processing trigger</li>  
        <li>Registry version history</li>  
        <li>Processing queue status</li>  
        <li>Error logs and retry controls</li>  
       </ul>  
      </div>  
     </div>  
    </div><!-- Edge Cases -->  
    <div class="category-section">  
     <div class="category-header"><span class="category-icon">🔧</span>  
      <h2 class="category-title">Edge Cases &amp; Gotchas</h2>  
     </div>  
     <div class="considerations-grid">  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🎬</span>  
        <h3 class="card-title">Video Processing Complexity</h3>  
       </div><span class="impact-badge impact-critical">🔥 Critical</span>  
       <p class="card-description">Video transcoding is 100x harder than image processing. FFmpeg is powerful but unforgiving. Budget extra time for video workflows.</p>  
       <ul class="details-list">  
        <li>Requires FFmpeg binary (not available in all serverless environments)</li>  
        <li>Processing time: 5-10 minutes for 1080p video</li>  
        <li>File sizes can exceed serverless memory limits (512MB-3GB)</li>  
        <li>Streaming upload to S3 required for large files</li>  
        <li>Thumbnail extraction needs separate passes</li>  
        <li>Audio track handling (stereo, mono, multi-language)</li>  
       </ul>  
       <div class="warning-box">  
        <div class="warning-header"><span>⚠️</span> <span>Consider Alternative</span>  
        </div>  
        <div class="warning-text">  
         For video-heavy workflows, consider using Mux, Cloudinary Video, or AWS MediaConvert instead of building your own FFmpeg pipeline. They handle the complexity for $0.05-0.15 per minute of video.  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🌐</span>  
        <h3 class="card-title">Internationalization (i18n)</h3>  
       </div><span class="impact-badge impact-medium">💡 Medium Impact</span>  
       <p class="card-description">If your platform serves multiple countries, you'll need localized assets. Plan for this in your naming convention and registry structure.</p>  
       <ul class="details-list">  
        <li>Add locale suffix to naming (e.g., _en_US, _fr_FR)</li>  
        <li>Support region-specific assets in registry</li>  
        <li>Fallback logic (fr_CA → fr_FR → en_US)</li>  
        <li>Timezone-aware timestamps</li>  
        <li>Character encoding (UTF-8 everywhere)</li>  
        <li>Text in images requires separate localized versions</li>  
       </ul>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">♿</span>  
        <h3 class="card-title">Accessibility Metadata</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">Alt text, captions, and transcripts aren't optional. Build them into your workflow from the start, not as an afterthought.</p>  
       <ul class="details-list">  
        <li>Require alt text for all images (min length validation)</li>  
        <li>Support long descriptions for complex diagrams</li>  
        <li>Captions and transcripts for video assets</li>  
        <li>Color contrast checking for text-in-images</li>  
        <li>Focus on descriptive, not decorative descriptions</li>  
        <li>ARIA labels for interactive assets</li>  
       </ul>  
       <div class="solution-box">  
        <div class="solution-header"><span>✅</span> <span>AI-Assisted Alt Text</span>  
        </div>  
        <div class="solution-text">  
         Use GPT-4 Vision or similar to generate draft alt text automatically. Require human review/editing before approval.  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🗑️</span>  
        <h3 class="card-title">Asset Deprecation &amp; Deletion</h3>  
       </div><span class="impact-badge impact-medium">💡 Medium Impact</span>  
       <p class="card-description">Old assets need to be retired gracefully. Hard deletes break live pages. Implement soft deletion and deprecation warnings.</p>  
       <ul class="details-list">  
        <li>Soft delete: mark as "deprecated" not removed</li>  
        <li>Serve deprecated assets with warning headers</li>  
        <li>Track usage of deprecated assets (analytics)</li>  
        <li>Grace period before hard deletion (90 days)</li>  
        <li>Automated checks for deprecated asset usage in codebase</li>  
        <li>Replacement suggestions in deprecation notices</li>  
       </ul>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">🔀</span>  
        <h3 class="card-title">Asset Versioning</h3>  
       </div><span class="impact-badge impact-high">⚡ High Impact</span>  
       <p class="card-description">When you update an asset, should it replace the old one or create a new version? Both approaches have trade-offs.</p>  
       <ul class="details-list">  
        <li>Immutable assets: new version = new asset_id</li>  
        <li>Mutable assets: same asset_id, version number increments</li>  
        <li>Cache busting strategy (change URLs on updates)</li>  
        <li>Keep old versions for rollback capability</li>  
        <li>Clear documentation on when to version vs. replace</li>  
       </ul>  
       <div class="solution-box">  
        <div class="solution-header"><span>✅</span> <span>Recommended Approach</span>  
        </div>  
        <div class="solution-text">  
         Use immutable assets by default (new version = new ID). Only use mutable assets for truly dynamic content that requires the same URL (e.g., "latest_product_screenshot").  
        </div>  
       </div>  
      </div>  
      <div class="consideration-card">  
       <div class="card-header"><span class="card-emoji">💸</span>  
        <h3 class="card-title">Cost Monitoring &amp; Budgets</h3>  
       </div><span class="impact-badge impact-critical">🔥 Critical</span>  
       <p class="card-description">Cloud costs can spiral out of control quickly. A misconfigured CDN or processing loop can cost thousands in a single day.</p>  
       <ul class="details-list">  
        <li>Set billing alerts at 50%, 75%, 100% of budget</li>  
        <li>Monitor CDN bandwidth usage daily</li>  
        <li>Rate limit webhook endpoints (prevent DoS)</li>  
        <li>Cap concurrent processing jobs (prevent runaway costs)</li>  
        <li>Regular cost audits (weekly for first month)</li>  
        <li>Kill switch for emergency cost spikes</li>  
       </ul>  
       <div class="warning-box">  
        <div class="warning-header"><span>⚠️</span> <span>Real Example</span>  
        </div>  
        <div class="warning-text">  
         A startup hit a $28k AWS bill because an infinite webhook loop processed the same video 10,000 times. Rate limiting and idempotency would have prevented this.  
        </div>  
       </div>  
      </div>  
     </div>  
    </div><!-- Pre-Launch Checklist -->  
    <div class="checklist-section">  
     <h2 class="checklist-title"><span>✅</span> Pre-Launch Checklist</h2>  
     <p style="color: #94a3b8; margin-bottom: 32px; font-size: 16px;">Verify all these items before deploying to production. Each one is critical for a stable, secure, and maintainable system.</p>  
     <div class="checklist">  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         All API keys and secrets stored in environment variables  
        </div>  
        <div class="checklist-desc">  
         Never hardcoded in source code, proper secret rotation plan documented  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Webhook endpoint has retry logic and idempotency  
        </div>  
        <div class="checklist-desc">  
         Handles duplicate webhooks gracefully, exponential backoff implemented  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Processing pipeline has timeout handling for long jobs  
        </div>  
        <div class="checklist-desc">  
         Job queue configured, progress tracking implemented  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         CDN security configured (signed URLs or hotlink protection)  
        </div>  
        <div class="checklist-desc">  
         Rate limiting enabled, geographic restrictions if needed  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Comprehensive error logging and monitoring active  
        </div>  
        <div class="checklist-desc">  
         Sentry or equivalent configured, alerts set up for error spikes  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Automated testing covers critical paths  
        </div>  
        <div class="checklist-desc">  
         Unit tests, integration tests, end-to-end tests all passing  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Cost alerts and budget limits configured  
        </div>  
        <div class="checklist-desc">  
         Billing alerts at 50%/75%/100%, rate limiting prevents runaway costs  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Registry versioning and rollback capability tested  
        </div>  
        <div class="checklist-desc">  
         Can roll back to previous version in under 5 minutes  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Asset validation enforces quality standards  
        </div>  
        <div class="checklist-desc">  
         Resolution, file size, color space, metadata completeness all checked  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Accessibility metadata required for all assets  
        </div>  
        <div class="checklist-desc">  
         Alt text, captions, transcripts enforced by validation  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Consent and rights tracking implemented (if using photos of people)  
        </div>  
        <div class="checklist-desc">  
         GDPR/CCPA compliance verified, audit trail in place  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Documentation complete for designers and developers  
        </div>  
        <div class="checklist-desc">  
         Naming conventions, export process, troubleshooting guide all documented  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         End-to-end test from Canva export to registry update successful  
        </div>  
        <div class="checklist-desc">  
         Full workflow tested with real assets in staging environment  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Backup and disaster recovery plan documented  
        </div>  
        <div class="checklist-desc">  
         S3 versioning enabled, registry backups automated, recovery process tested  
        </div>  
       </div>  
      </div>  
      <div class="checklist-item" onclick="toggleCheck(this)">  
       <div class="checkbox"></div>  
       <div class="checklist-text">  
        <div class="checklist-label">  
         Notification system configured for team  
        </div>  
        <div class="checklist-desc">  
         Slack/email notifications working, alert thresholds appropriate  
        </div>  
       </div>  
      </div>  
     </div>  
    </div><!-- Additional Resources -->  
    <div class="category-section">  
     <div class="category-header"><span class="category-icon">📚</span>  
      <h2 class="category-title">Additional Resources</h2>  
     </div>  
     <div class="resource-links">  
      <div class="resource-card" onclick="openLink('https://www.canva.dev/')">  
       <div class="resource-icon">  
        📖  
       </div>  
       <div class="resource-title">  
        Canva Connect Documentation  
       </div>  
       <div class="resource-desc">  
        Official API docs, webhook guides, and OAuth setup instructions  
       </div>  
      </div>  
      <div class="resource-card" onclick="openLink('https://aws.amazon.com/architecture/well-architected/')">  
       <div class="resource-icon">  
        🏗️  
       </div>  
       <div class="resource-title">  
        AWS Well-Architected Framework  
       </div>  
       <div class="resource-desc">  
        Best practices for building secure, scalable cloud systems  
       </div>  
      </div>  
      <div class="resource-card" onclick="openLink('https://web.dev/performance/')">  
       <div class="resource-icon">  
        ⚡  
       </div>  
       <div class="resource-title">  
        Web.dev Performance Guides  
       </div>  
       <div class="resource-desc">  
        Image optimization, CDN setup, and performance monitoring  
       </div>  
      </div>  
      <div class="resource-card" onclick="openLink('https://www.w3.org/WAI/WCAG21/quickref/')">  
       <div class="resource-icon">  
        ♿  
       </div>  
       <div class="resource-title">  
        WCAG Accessibility Guidelines  
       </div>  
       <div class="resource-desc">  
        Standards for accessible image alt text and media content  
       </div>  
      </div>  
      <div class="resource-card" onclick="openLink('https://gdpr.eu/')">  
       <div class="resource-icon">  
        🔒  
       </div>  
       <div class="resource-title">  
        GDPR Compliance Guide  
       </div>  
       <div class="resource-desc">  
        Requirements for data protection and consent management  
       </div>  
      </div>  
      <div class="resource-card" onclick="openLink('https://12factor.net/')">  
       <div class="resource-icon">  
        ⚙️  
       </div>  
       <div class="resource-title">  
        The Twelve-Factor App  
       </div>  
       <div class="resource-desc">  
        Methodology for building maintainable SaaS applications  
       </div>  
      </div>  
     </div>  
    </div><!-- Summary -->  
    <div class="summary-callout">  
     <div class="summary-icon">  
      🎯  
     </div>  
     <h2 class="summary-title">Don't Skip These Details</h2>  
     <p class="summary-text">The difference between a prototype and a production-ready system lies in these details. Security vulnerabilities, performance bottlenecks, and governance gaps won't show up in demos—they emerge when you're managing thousands of assets across multiple teams at scale. <br><br><strong>Budget 30-40% of your development time for these "non-functional" requirements.</strong> They're what separate a toy project from enterprise-grade infrastructure.</p>  
    </div>  
   </div>  
  </div>  
  <script>  
    function toggleCheck(element) {  
      element.classList.toggle('checked');  
    }  
  
    function openLink(url) {  
      window.open(url, '_blank', 'noopener,noreferrer');  
    }  
  </script>  
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9bc0a23292b4d519',t:'MTc2ODA5NDg2Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>  
</html>  
