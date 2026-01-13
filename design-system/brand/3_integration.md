<!doctype html>  
<html lang="en">  
 <head>  
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <title>RecoveryOS Integration &amp; Pipeline Setup Guide</title>  
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
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;  
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);  
      color: #e2e8f0;  
      overflow-x: hidden;  
    }  
  
    .container {  
      width: 100%;  
      height: 100%;  
      overflow-y: auto;  
      padding: 40px 20px;  
    }  
  
    .content-wrapper {  
      max-width: 1400px;  
      margin: 0 auto;  
    }  
  
    .header {  
      text-align: center;  
      margin-bottom: 48px;  
    }  
  
    .header h1 {  
      font-size: 48px;  
      font-weight: 800;  
      margin-bottom: 16px;  
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%);  
      -webkit-background-clip: text;  
      -webkit-text-fill-color: transparent;  
      text-shadow: 0 0 40px rgba(96, 165, 250, 0.3);  
    }  
  
    .header p {  
      font-size: 18px;  
      color: #94a3b8;  
      line-height: 1.6;  
    }  
  
    .section {  
      background: rgba(30, 41, 59, 0.8);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 20px;  
      padding: 40px;  
      margin-bottom: 32px;  
      backdrop-filter: blur(10px);  
    }  
  
    .section-title {  
      font-size: 28px;  
      font-weight: 700;  
      margin-bottom: 12px;  
      display: flex;  
      align-items: center;  
      gap: 12px;  
      color: #f1f5f9;  
    }  
  
    .section-subtitle {  
      font-size: 16px;  
      color: #94a3b8;  
      margin-bottom: 32px;  
      line-height: 1.6;  
    }  
  
    .architecture-diagram {  
      background: rgba(15, 23, 42, 0.6);  
      border: 2px solid rgba(96, 165, 250, 0.3);  
      border-radius: 16px;  
      padding: 32px;  
      margin-bottom: 32px;  
      overflow-x: auto;  
    }  
  
    .flow-container {  
      display: flex;  
      align-items: center;  
      gap: 24px;  
      min-width: 1000px;  
      justify-content: center;  
      flex-wrap: wrap;  
    }  
  
    .flow-box {  
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1));  
      border: 2px solid rgba(96, 165, 250, 0.4);  
      border-radius: 12px;  
      padding: 24px;  
      min-width: 180px;  
      text-align: center;  
      position: relative;  
    }  
  
    .flow-box.highlight {  
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(167, 139, 250, 0.2));  
      border-color: rgba(236, 72, 153, 0.6);  
    }  
  
    .flow-icon {  
      font-size: 48px;  
      margin-bottom: 12px;  
    }  
  
    .flow-title {  
      font-size: 16px;  
      font-weight: 700;  
      margin-bottom: 8px;  
      color: #f1f5f9;  
    }  
  
    .flow-desc {  
      font-size: 13px;  
      color: #94a3b8;  
      line-height: 1.4;  
    }  
  
    .flow-arrow {  
      font-size: 32px;  
      color: #60a5fa;  
    }  
  
    .tech-stack {  
      display: grid;  
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));  
      gap: 20px;  
      margin-bottom: 32px;  
    }  
  
    .tech-card {  
      background: rgba(15, 23, 42, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 12px;  
      padding: 24px;  
      transition: all 0.3s;  
    }  
  
    .tech-card:hover {  
      transform: translateY(-4px);  
      border-color: rgba(96, 165, 250, 0.5);  
      box-shadow: 0 12px 32px rgba(96, 165, 250, 0.2);  
    }  
  
    .tech-header {  
      display: flex;  
      align-items: center;  
      gap: 12px;  
      margin-bottom: 16px;  
    }  
  
    .tech-icon {  
      font-size: 32px;  
    }  
  
    .tech-name {  
      font-size: 18px;  
      font-weight: 700;  
      color: #f1f5f9;  
    }  
  
    .tech-purpose {  
      font-size: 13px;  
      color: #60a5fa;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
      margin-bottom: 12px;  
    }  
  
    .tech-description {  
      font-size: 14px;  
      color: #cbd5e1;  
      line-height: 1.6;  
      margin-bottom: 16px;  
    }  
  
    .tech-features {  
      list-style: none;  
    }  
  
    .tech-features li {  
      font-size: 13px;  
      color: #94a3b8;  
      padding-left: 20px;  
      position: relative;  
      margin-bottom: 8px;  
      line-height: 1.5;  
    }  
  
    .tech-features li:before {  
      content: "✓";  
      position: absolute;  
      left: 0;  
      color: #34d399;  
      font-weight: 700;  
    }  
  
    .code-block {  
      background: rgba(15, 23, 42, 0.9);  
      border: 1px solid rgba(96, 165, 250, 0.3);  
      border-radius: 12px;  
      padding: 24px;  
      margin: 20px 0;  
      overflow-x: auto;  
    }  
  
    .code-header {  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      margin-bottom: 16px;  
      padding-bottom: 12px;  
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);  
    }  
  
    .code-label {  
      font-size: 13px;  
      font-weight: 600;  
      color: #60a5fa;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
    }  
  
    .copy-code-btn {  
      background: rgba(96, 165, 250, 0.2);  
      border: 1px solid rgba(96, 165, 250, 0.4);  
      color: #60a5fa;  
      padding: 6px 12px;  
      border-radius: 6px;  
      font-size: 12px;  
      font-weight: 600;  
      cursor: pointer;  
      transition: all 0.2s;  
    }  
  
    .copy-code-btn:hover {  
      background: rgba(96, 165, 250, 0.3);  
      transform: translateY(-1px);  
    }  
  
    .code-content {  
      font-family: 'Courier New', monospace;  
      font-size: 13px;  
      line-height: 1.6;  
      color: #e2e8f0;  
      white-space: pre;  
    }  
  
    .step-list {  
      list-style: none;  
      counter-reset: step-counter;  
    }  
  
    .step-item {  
      position: relative;  
      padding-left: 60px;  
      margin-bottom: 32px;  
      counter-increment: step-counter;  
    }  
  
    .step-number {  
      position: absolute;  
      left: 0;  
      top: 0;  
      width: 40px;  
      height: 40px;  
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);  
      border-radius: 50%;  
      display: flex;  
      align-items: center;  
      justify-content: center;  
      font-weight: 700;  
      font-size: 18px;  
      color: white;  
    }  
  
    .step-number::before {  
      content: counter(step-counter);  
    }  
  
    .step-title {  
      font-size: 20px;  
      font-weight: 700;  
      margin-bottom: 8px;  
      color: #f1f5f9;  
    }  
  
    .step-description {  
      font-size: 15px;  
      color: #cbd5e1;  
      line-height: 1.6;  
      margin-bottom: 16px;  
    }  
  
    .step-details {  
      background: rgba(15, 23, 42, 0.6);  
      border-left: 3px solid #60a5fa;  
      border-radius: 8px;  
      padding: 16px;  
      margin-top: 12px;  
    }  
  
    .warning-box {  
      background: rgba(245, 158, 11, 0.1);  
      border: 2px solid rgba(245, 158, 11, 0.4);  
      border-radius: 12px;  
      padding: 20px;  
      margin: 24px 0;  
    }  
  
    .warning-header {  
      display: flex;  
      align-items: center;  
      gap: 12px;  
      font-size: 16px;  
      font-weight: 700;  
      color: #fbbf24;  
      margin-bottom: 12px;  
    }  
  
    .warning-content {  
      font-size: 14px;  
      color: #fcd34d;  
      line-height: 1.6;  
    }  
  
    .success-box {  
      background: rgba(34, 197, 94, 0.1);  
      border: 2px solid rgba(34, 197, 94, 0.4);  
      border-radius: 12px;  
      padding: 20px;  
      margin: 24px 0;  
    }  
  
    .success-header {  
      display: flex;  
      align-items: center;  
      gap: 12px;  
      font-size: 16px;  
      font-weight: 700;  
      color: #34d399;  
      margin-bottom: 12px;  
    }  
  
    .success-content {  
      font-size: 14px;  
      color: #6ee7b7;  
      line-height: 1.6;  
    }  
  
    .badge {  
      display: inline-block;  
      padding: 6px 12px;  
      background: rgba(96, 165, 250, 0.2);  
      color: #60a5fa;  
      border: 1px solid rgba(96, 165, 250, 0.4);  
      border-radius: 6px;  
      font-size: 12px;  
      font-weight: 600;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
      margin-right: 8px;  
      margin-bottom: 8px;  
    }  
  
    .badge.required {  
      background: rgba(236, 72, 153, 0.2);  
      color: #ec4899;  
      border-color: rgba(236, 72, 153, 0.4);  
    }  
  
    .badge.optional {  
      background: rgba(167, 139, 250, 0.2);  
      color: #a78bfa;  
      border-color: rgba(167, 139, 250, 0.4);  
    }  
  
    .cost-table {  
      width: 100%;  
      border-collapse: collapse;  
      margin-top: 20px;  
    }  
  
    .cost-table th,  
    .cost-table td {  
      padding: 16px;  
      text-align: left;  
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);  
    }  
  
    .cost-table th {  
      background: rgba(96, 165, 250, 0.1);  
      color: #60a5fa;  
      font-weight: 700;  
      text-transform: uppercase;  
      font-size: 12px;  
      letter-spacing: 0.5px;  
    }  
  
    .cost-table td {  
      color: #cbd5e1;  
      font-size: 14px;  
    }  
  
    .cost-table tr:hover {  
      background: rgba(96, 165, 250, 0.05);  
    }  
  
    .timeline {  
      position: relative;  
      padding: 20px 0;  
    }  
  
    .timeline::before {  
      content: '';  
      position: absolute;  
      left: 20px;  
      top: 0;  
      bottom: 0;  
      width: 2px;  
      background: linear-gradient(180deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%);  
    }  
  
    .timeline-item {  
      position: relative;  
      padding-left: 60px;  
      margin-bottom: 32px;  
    }  
  
    .timeline-dot {  
      position: absolute;  
      left: 12px;  
      top: 8px;  
      width: 18px;  
      height: 18px;  
      background: #60a5fa;  
      border: 3px solid rgba(30, 41, 59, 0.9);  
      border-radius: 50%;  
    }  
  
    .timeline-content {  
      background: rgba(15, 23, 42, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 12px;  
      padding: 20px;  
    }  
  
    .timeline-title {  
      font-size: 16px;  
      font-weight: 700;  
      color: #f1f5f9;  
      margin-bottom: 8px;  
    }  
  
    .timeline-desc {  
      font-size: 14px;  
      color: #94a3b8;  
      line-height: 1.6;  
    }  
  
    .btn {  
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);  
      color: white;  
      border: none;  
      padding: 14px 28px;  
      border-radius: 10px;  
      font-size: 15px;  
      font-weight: 600;  
      cursor: pointer;  
      transition: all 0.3s;  
      display: inline-flex;  
      align-items: center;  
      gap: 10px;  
      margin-top: 16px;  
    }  
  
    .btn:hover {  
      transform: translateY(-2px);  
      box-shadow: 0 12px 32px rgba(96, 165, 250, 0.4);  
    }  
  
    .tab-container {  
      display: flex;  
      gap: 8px;  
      margin-bottom: 24px;  
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);  
      padding-bottom: 0;  
    }  
  
    .tab {  
      padding: 12px 24px;  
      background: transparent;  
      border: none;  
      color: #94a3b8;  
      font-size: 15px;  
      font-weight: 600;  
      cursor: pointer;  
      border-bottom: 3px solid transparent;  
      transition: all 0.2s;  
      position: relative;  
      bottom: -2px;  
    }  
  
    .tab:hover {  
      color: #cbd5e1;  
    }  
  
    .tab.active {  
      color: #60a5fa;  
      border-bottom-color: #60a5fa;  
    }  
  
    .tab-content {  
      display: none;  
    }  
  
    .tab-content.active {  
      display: block;  
      animation: fadeIn 0.3s ease;  
    }  
  
    @keyframes fadeIn {  
      from {  
        opacity: 0;  
        transform: translateY(10px);  
      }  
      to {  
        opacity: 1;  
        transform: translateY(0);  
      }  
    }  
  
    .toast {  
      position: fixed;  
      bottom: 24px;  
      right: 24px;  
      background: #1e293b;  
      color: white;  
      padding: 16px 24px;  
      border-radius: 12px;  
      border: 1px solid rgba(96, 165, 250, 0.4);  
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);  
      display: none;  
      align-items: center;  
      gap: 12px;  
      z-index: 1000;  
      animation: slideIn 0.3s ease;  
    }  
  
    .toast.show {  
      display: flex;  
    }  
  
    @keyframes slideIn {  
      from {  
        transform: translateX(400px);  
        opacity: 0;  
      }  
      to {  
        transform: translateX(0);  
        opacity: 1;  
      }  
    }  
  
    @media (max-width: 768px) {  
      .container {  
        padding: 24px 16px;  
      }  
  
      .header h1 {  
        font-size: 36px;  
      }  
  
      .section {  
        padding: 24px;  
      }  
  
      .flow-container {  
        flex-direction: column;  
        min-width: auto;  
      }  
  
      .flow-arrow {  
        transform: rotate(90deg);  
      }  
  
      .tech-stack {  
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
  <div class="container">  
   <div class="content-wrapper">  
    <header class="header">  
     <h1>🔌 Integration &amp; Pipeline Setup</h1>  
     <p>Complete guide to connecting Canva, building automation, and deploying your asset pipeline</p>  
    </header><!-- Architecture Overview -->  
    <div class="section">  
     <h2 class="section-title"><span>🏗️</span> System Architecture Overview</h2>  
     <p class="section-subtitle">Here's how all the pieces connect together in your asset management pipeline</p>  
     <div class="architecture-diagram">  
      <div class="flow-container">  
       <div class="flow-box highlight">  
        <div class="flow-icon">  
         🎨  
        </div>  
        <div class="flow-title">  
         Canva  
        </div>  
        <div class="flow-desc">  
         Design &amp; Export  
        </div>  
       </div>  
       <div class="flow-arrow">  
        →  
       </div>  
       <div class="flow-box">  
        <div class="flow-icon">  
         🪝  
        </div>  
        <div class="flow-title">  
         Webhook  
        </div>  
        <div class="flow-desc">  
         Export Detection  
        </div>  
       </div>  
       <div class="flow-arrow">  
        →  
       </div>  
       <div class="flow-box">  
        <div class="flow-icon">  
         ⚙️  
        </div>  
        <div class="flow-title">  
         Processing  
        </div>  
        <div class="flow-desc">  
         Optimize &amp; Convert  
        </div>  
       </div>  
       <div class="flow-arrow">  
        →  
       </div>  
       <div class="flow-box">  
        <div class="flow-icon">  
         ☁️  
        </div>  
        <div class="flow-title">  
         CDN Storage  
        </div>  
        <div class="flow-desc">  
         Asset Delivery  
        </div>  
       </div>  
       <div class="flow-arrow">  
        →  
       </div>  
       <div class="flow-box highlight">  
        <div class="flow-icon">  
         📋  
        </div>  
        <div class="flow-title">  
         Registry  
        </div>  
        <div class="flow-desc">  
         Asset Database  
        </div>  
       </div>  
      </div>  
     </div>  
     <div class="success-box">  
      <div class="success-header"><span>✨</span> <span>Fully Automated Pipeline</span>  
      </div>  
      <div class="success-content">  
       Once set up, this pipeline automatically detects Canva exports, processes them, optimizes them, uploads to your CDN, and updates your registry - all without manual intervention!  
      </div>  
     </div>  
    </div><!-- Tech Stack -->  
    <div class="section">  
     <h2 class="section-title"><span>🛠️</span> Required Technology Stack</h2>  
     <p class="section-subtitle">These are the core services and tools you'll need to build the complete system</p>  
     <div class="tab-container"><button class="tab active" onclick="switchTab('core')">Core Services</button> <button class="tab" onclick="switchTab('processing')">Processing Tools</button> <button class="tab" onclick="switchTab('optional')">Optional Enhancements</button>  
     </div>  
     <div id="core" class="tab-content active">  
      <div class="tech-stack">  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          🎨  
         </div>  
         <div>  
          <div class="tech-name">  
           Canva Connect API  
          </div>  
          <div class="tech-purpose">  
           Design Export Integration  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Canva's developer platform that enables automated exports and webhooks for design files.  
        </div>  
        <ul class="tech-features">  
         <li>Webhook notifications for new exports</li>  
         <li>Automated design export API</li>  
         <li>Folder and project management</li>  
         <li>OAuth authentication for secure access</li>  
        </ul><span class="badge required">Required</span> <span class="badge">Free tier available</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          ☁️  
         </div>  
         <div>  
          <div class="tech-name">  
           AWS S3 / Cloudflare R2  
          </div>  
          <div class="tech-purpose">  
           CDN Storage  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Object storage for your processed assets with CDN integration for fast global delivery.  
        </div>  
        <ul class="tech-features">  
         <li>Unlimited scalable storage</li>  
         <li>CDN integration (CloudFront / Cloudflare)</li>  
         <li>Automatic backups and versioning</li>  
         <li>Cost: ~$0.023/GB/month (S3) or free egress (R2)</li>  
        </ul><span class="badge required">Required</span> <span class="badge">Pay as you go</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          🔥  
         </div>  
         <div>  
          <div class="tech-name">  
           Firebase / Supabase  
          </div>  
          <div class="tech-purpose">  
           Registry Database  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Real-time database to store your asset registry with built-in authentication and API.  
        </div>  
        <ul class="tech-features">  
         <li>JSON document storage for registry</li>  
         <li>Real-time sync across clients</li>  
         <li>Built-in REST API and SDKs</li>  
         <li>Free tier: 1GB storage, 10GB bandwidth</li>  
        </ul><span class="badge required">Required</span> <span class="badge">Free tier available</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          ⚡  
         </div>  
         <div>  
          <div class="tech-name">  
           Vercel / Netlify / Railway  
          </div>  
          <div class="tech-purpose">  
           Backend Hosting  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Serverless platform to host your webhook handlers and processing functions.  
        </div>  
        <ul class="tech-features">  
         <li>Serverless functions for webhooks</li>  
         <li>Automatic deployments from Git</li>  
         <li>Environment variable management</li>  
         <li>Free tier: 100GB bandwidth/month</li>  
        </ul><span class="badge required">Required</span> <span class="badge">Free tier available</span>  
       </div>  
      </div>  
     </div>  
     <div id="processing" class="tab-content">  
      <div class="tech-stack">  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          🖼️  
         </div>  
         <div>  
          <div class="tech-name">  
           Sharp.js  
          </div>  
          <div class="tech-purpose">  
           Image Processing  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         High-performance Node.js image processing library for resizing and format conversion.  
        </div>  
        <ul class="tech-features">  
         <li>Convert to WebP, AVIF formats</li>  
         <li>Resize to multiple dimensions</li>  
         <li>Quality optimization and compression</li>  
         <li>Fast processing (30-50ms per image)</li>  
        </ul><span class="badge required">Required</span> <span class="badge">Open source</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          🎬  
         </div>  
         <div>  
          <div class="tech-name">  
           FFmpeg  
          </div>  
          <div class="tech-purpose">  
           Video Processing  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Industry-standard video processing tool for transcoding and optimization.  
        </div>  
        <ul class="tech-features">  
         <li>Convert to MP4, WebM formats</li>  
         <li>Compress and optimize video files</li>  
         <li>Extract thumbnails and previews</li>  
         <li>Adjust resolution and bitrate</li>  
        </ul><span class="badge required">Required for video</span> <span class="badge">Open source</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          📦  
         </div>  
         <div>  
          <div class="tech-name">  
           Bull Queue / AWS SQS  
          </div>  
          <div class="tech-purpose">  
           Job Queue Management  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Background job processing for handling multiple asset conversions concurrently.  
        </div>  
        <ul class="tech-features">  
         <li>Process multiple assets in parallel</li>  
         <li>Retry failed processing jobs</li>  
         <li>Priority queue for urgent assets</li>  
         <li>Monitor job status and progress</li>  
        </ul><span class="badge optional">Optional</span> <span class="badge">Improves performance</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          🔍  
         </div>  
         <div>  
          <div class="tech-name">  
           Zod / Ajv  
          </div>  
          <div class="tech-purpose">  
           Schema Validation  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Runtime validation libraries to ensure asset metadata and registry entries are correct.  
        </div>  
        <ul class="tech-features">  
         <li>Validate asset naming conventions</li>  
         <li>Enforce registry schema compliance</li>  
         <li>Type-safe data handling</li>  
         <li>Clear validation error messages</li>  
        </ul><span class="badge required">Required</span> <span class="badge">Open source</span>  
       </div>  
      </div>  
     </div>  
     <div id="optional" class="tab-content">  
      <div class="tech-stack">  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          📊  
         </div>  
         <div>  
          <div class="tech-name">  
           Sentry / LogRocket  
          </div>  
          <div class="tech-purpose">  
           Error Monitoring  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Track errors, performance issues, and system health across your pipeline.  
        </div>  
        <ul class="tech-features">  
         <li>Real-time error notifications</li>  
         <li>Performance monitoring and alerts</li>  
         <li>Stack traces and debugging info</li>  
         <li>Free tier: 5k events/month</li>  
        </ul><span class="badge optional">Optional</span> <span class="badge">Free tier available</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          🔐  
         </div>  
         <div>  
          <div class="tech-name">  
           Auth0 / Clerk  
          </div>  
          <div class="tech-purpose">  
           Team Authentication  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Add user authentication if you need team access controls for your asset management.  
        </div>  
        <ul class="tech-features">  
         <li>Multi-user authentication</li>  
         <li>Role-based access control</li>  
         <li>SSO integration options</li>  
         <li>Free tier: 7,500 users</li>  
        </ul><span class="badge optional">Optional</span> <span class="badge">For teams</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          📈  
         </div>  
         <div>  
          <div class="tech-name">  
           Grafana / Datadog  
          </div>  
          <div class="tech-purpose">  
           Analytics Dashboard  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Visualize metrics like processing times, storage usage, and CDN performance.  
        </div>  
        <ul class="tech-features">  
         <li>Custom dashboards and charts</li>  
         <li>Performance metrics tracking</li>  
         <li>Usage analytics and trends</li>  
         <li>Cost monitoring and forecasting</li>  
        </ul><span class="badge optional">Optional</span> <span class="badge">For analytics</span>  
       </div>  
       <div class="tech-card">  
        <div class="tech-header">  
         <div class="tech-icon">  
          🤖  
         </div>  
         <div>  
          <div class="tech-name">  
           GitHub Actions  
          </div>  
          <div class="tech-purpose">  
           CI/CD Pipeline  
          </div>  
         </div>  
        </div>  
        <div class="tech-description">  
         Automate testing, validation, and deployment of your asset pipeline code.  
        </div>  
        <ul class="tech-features">  
         <li>Automated testing on commits</li>  
         <li>Schema validation checks</li>  
         <li>Automatic deployments</li>  
         <li>Free for public repos</li>  
        </ul><span class="badge optional">Optional</span> <span class="badge">Best practice</span>  
       </div>  
      </div>  
     </div>  
    </div><!-- Implementation Steps -->  
    <div class="section">  
     <h2 class="section-title"><span>📋</span> Step-by-Step Implementation Guide</h2>  
     <p class="section-subtitle">Follow these steps to build your complete asset pipeline from scratch</p>  
     <ol class="step-list">  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Set Up Canva Connect Integration  
        </div>  
        <div class="step-description">  
         Register your app with Canva and configure webhook endpoints to receive export notifications.  
        </div>  
        <div class="step-details"><strong>Actions:</strong>  
         <ul class="tech-features">  
          <li>Go to canva.com/developers and create a new app</li>  
          <li>Enable "Design Export" and "Webhooks" permissions</li>  
          <li>Configure webhook URL (e.g., https://yourapp.com/api/canva-webhook)</li>  
          <li>Save your Client ID and Client Secret</li>  
          <li>Set up OAuth flow for user authorization</li>  
         </ul><span class="badge">Time: 30 minutes</span> <span class="badge">Complexity: Easy</span>  
        </div>  
       </div></li>  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Create Webhook Handler Backend  
        </div>  
        <div class="step-description">  
         Build a serverless function that receives Canva export webhooks and triggers your processing pipeline.  
        </div>  
        <div class="step-details"><strong>Technology:</strong> Node.js + Express + Vercel Functions <br><br>  
         <div class="code-block">  
          <div class="code-header"><span class="code-label">Webhook Handler Example</span> <button class="copy-code-btn" onclick="copyCode('webhook-code')">Copy Code</button>  
          </div>  
          <div class="code-content" id="webhook-code">  
           // api/canva-webhook.js export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); } const { event_type, design_id, export_url } = req.body; if (event_type === 'design.export.completed') { // Download the exported file const fileBuffer = await downloadFromCanva(export_url); // Extract asset metadata from filename const metadata = parseAssetName(filename); // Queue for processing await queueAssetProcessing({ file: fileBuffer, metadata: metadata, design_id: design_id }); return res.status(200).json({ success: true }); } res.status(400).json({ error: 'Unknown event type' }); }  
          </div>  
         </div><span class="badge">Time: 2-3 hours</span> <span class="badge">Complexity: Medium</span>  
        </div>  
       </div></li>  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Build Asset Processing Pipeline  
        </div>  
        <div class="step-description">  
         Create functions to optimize images, transcode videos, and generate multiple renditions for different use cases.  
        </div>  
        <div class="step-details"><strong>Processing Steps:</strong>  
         <ul class="tech-features">  
          <li>Validate asset naming and metadata</li>  
          <li>Generate optimized formats (WebP, AVIF for images)</li>  
          <li>Create multiple sizes (thumbnail, medium, large, original)</li>  
          <li>Transcode videos to MP4 and WebM</li>  
          <li>Calculate file hashes for integrity checking</li>  
          <li>Extract dimensions, duration, and other metadata</li>  
         </ul>  
         <div class="code-block">  
          <div class="code-header"><span class="code-label">Image Processing Example</span> <button class="copy-code-btn" onclick="copyCode('processing-code')">Copy Code</button>  
          </div>  
          <div class="code-content" id="processing-code">  
           // lib/process-image.js import sharp from 'sharp'; import crypto from 'crypto'; export async function processImage(buffer, assetId) { const sizes = [ { name: 'thumbnail', width: 400 }, { name: 'medium', width: 1200 }, { name: 'large', width: 1920 }, { name: 'original', width: null } ]; const formats = ['webp', 'avif', 'jpeg']; const renditions = []; for (const size of sizes) { for (const format of formats) { let pipeline = sharp(buffer); if (size.width) { pipeline = pipeline.resize(size.width, null, { fit: 'inside', withoutEnlargement: true }); } const processed = await pipeline .toFormat(format, { quality: 85 }) .toBuffer(); const hash = crypto .createHash('sha256') .update(processed) .digest('hex'); renditions.push({ size: size.name, format: format, buffer: processed, hash: `sha256-${hash}`, filesize: processed.length }); } } return renditions; }  
          </div>  
         </div><span class="badge">Time: 4-6 hours</span> <span class="badge">Complexity: Medium-Hard</span>  
        </div>  
       </div></li>  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Set Up CDN Storage  
        </div>  
        <div class="step-description">  
         Configure S3/R2 buckets and upload processed assets with proper naming and access controls.  
        </div>  
        <div class="step-details"><strong>Configuration:</strong>  
         <ul class="tech-features">  
          <li>Create S3 bucket with versioning enabled</li>  
          <li>Set up CloudFront CDN distribution</li>  
          <li>Configure CORS for web access</li>  
          <li>Set cache headers (1 year for immutable assets)</li>  
          <li>Enable automatic backups</li>  
         </ul>  
         <div class="code-block">  
          <div class="code-header"><span class="code-label">S3 Upload Example</span> <button class="copy-code-btn" onclick="copyCode('s3-code')">Copy Code</button>  
          </div>  
          <div class="code-content" id="s3-code">  
           // lib/upload-to-s3.js import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; const s3 = new S3Client({ region: 'us-east-1' }); export async function uploadRendition(rendition, assetId, metadata) { const key = `assets/${metadata.surface}/${assetId}_${rendition.size}.${rendition.format}`; await s3.send(new PutObjectCommand({ Bucket: 'recoveryos-assets', Key: key, Body: rendition.buffer, ContentType: `image/${rendition.format}`, CacheControl: 'public, max-age=31536000, immutable', Metadata: { 'asset-id': assetId, 'asset-class': metadata.asset_class, 'integrity-hash': rendition.hash } })); const cdnUrl = `https://cdn.recoveryos.com/${key}`; return { url: cdnUrl, size: rendition.size, format: rendition.format }; }  
          </div>  
         </div><span class="badge">Time: 1-2 hours</span> <span class="badge">Complexity: Easy</span>  
        </div>  
       </div></li>  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Create Registry Database  
        </div>  
        <div class="step-description">  
         Set up your asset registry database with proper schema and indexing for fast queries.  
        </div>  
        <div class="step-details"><strong>Registry Structure:</strong>  
         <div class="code-block">  
          <div class="code-header"><span class="code-label">Registry Schema</span> <button class="copy-code-btn" onclick="copyCode('registry-code')">Copy Code</button>  
          </div>  
          <div class="code-content" id="registry-code">  
           // Registry JSON structure stored in Firebase/Supabase { "version": "15.2.1", "last_updated": "2026-01-11T16:00:00Z", "assets": [ { "id": "hero_recoveryos_field_001", "kind": "image", "asset_class": "hero", "status": "approved", "surface": "mkt_home", "component": "hero_keynote", "altitude": "companion", "renditions": [ { "url": "https://cdn.recoveryos.com/...", "size": "large", "format": "webp", "width": 1920, "height": 1080, "filesize": 245680 } ], "trust": { "approved_by": "governance@platform", "approved_at": "2026-01-10T12:00:00Z", "consent_scope": ["public", "internal"] }, "integrity": { "hash": "sha256-9f8a7b6c...", "algorithm": "sha256" }, "accessibility": { "alt": "Mountain landscape at sunrise", "caption": "RecoveryOS hero image" } } ] }  
          </div>  
         </div><span class="badge">Time: 2-3 hours</span> <span class="badge">Complexity: Medium</span>  
        </div>  
       </div></li>  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Build Registry Update Logic  
        </div>  
        <div class="step-description">  
         Automatically update your registry when new assets are processed and uploaded.  
        </div>  
        <div class="step-details"><strong>Update Flow:</strong>  
         <ul class="tech-features">  
          <li>Fetch current registry from database</li>  
          <li>Add new asset entry with all metadata</li>  
          <li>Increment version number</li>  
          <li>Update last_updated timestamp</li>  
          <li>Validate schema before saving</li>  
          <li>Commit changes atomically</li>  
          <li>Trigger CDN cache invalidation</li>  
         </ul><span class="badge">Time: 2-3 hours</span> <span class="badge">Complexity: Medium</span>  
        </div>  
       </div></li>  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Add Validation &amp; Error Handling  
        </div>  
        <div class="step-description">  
         Implement comprehensive validation to catch naming errors, schema violations, and processing failures.  
        </div>  
        <div class="step-details"><strong>Validation Checks:</strong>  
         <ul class="tech-features">  
          <li>Asset naming grammar validation</li>  
          <li>File type and size limits</li>  
          <li>Metadata completeness checks</li>  
          <li>Duplicate asset detection</li>  
          <li>Registry schema validation</li>  
          <li>Error logging and notifications</li>  
         </ul><span class="badge">Time: 3-4 hours</span> <span class="badge">Complexity: Medium</span>  
        </div>  
       </div></li>  
      <li class="step-item">  
       <div class="step-number"></div>  
       <div>  
        <div class="step-title">  
         Deploy &amp; Test End-to-End  
        </div>  
        <div class="step-description">  
         Deploy your complete pipeline and test the full workflow from Canva export to registry update.  
        </div>  
        <div class="step-details"><strong>Testing Checklist:</strong>  
         <ul class="tech-features">  
          <li>Export a test design from Canva</li>  
          <li>Verify webhook receives notification</li>  
          <li>Check processing generates all renditions</li>  
          <li>Confirm files upload to CDN correctly</li>  
          <li>Validate registry updates with new asset</li>  
          <li>Test CDN URLs are accessible</li>  
          <li>Verify error handling for invalid inputs</li>  
         </ul><span class="badge">Time: 2-3 hours</span> <span class="badge">Complexity: Easy</span>  
        </div>  
       </div></li>  
     </ol>  
    </div><!-- Implementation Timeline -->  
    <div class="section">  
     <h2 class="section-title"><span>⏱️</span> Implementation Timeline</h2>  
     <p class="section-subtitle">Estimated time to build each phase of the system</p>  
     <div class="timeline">  
      <div class="timeline-item">  
       <div class="timeline-dot"></div>  
       <div class="timeline-content">  
        <div class="timeline-title">  
         Phase 1: Foundation (Week 1)  
        </div>  
        <div class="timeline-desc">  
         Set up Canva Connect, create webhook handler, configure basic infrastructure (CDN, database, hosting)  
        </div>  
       </div>  
      </div>  
      <div class="timeline-item">  
       <div class="timeline-dot"></div>  
       <div class="timeline-content">  
        <div class="timeline-title">  
         Phase 2: Processing Pipeline (Week 2-3)  
        </div>  
        <div class="timeline-desc">  
         Build image/video processing, implement optimization, create multiple renditions, add validation logic  
        </div>  
       </div>  
      </div>  
      <div class="timeline-item">  
       <div class="timeline-dot"></div>  
       <div class="timeline-content">  
        <div class="timeline-title">  
         Phase 3: Registry &amp; Automation (Week 3-4)  
        </div>  
        <div class="timeline-desc">  
         Create registry database, implement automatic updates, add governance workflows, build admin dashboard  
        </div>  
       </div>  
      </div>  
      <div class="timeline-item">  
       <div class="timeline-dot"></div>  
       <div class="timeline-content">  
        <div class="timeline-title">  
         Phase 4: Testing &amp; Deployment (Week 4-5)  
        </div>  
        <div class="timeline-desc">  
         End-to-end testing, error handling, monitoring setup, documentation, production deployment  
        </div>  
       </div>  
      </div>  
      <div class="timeline-item">  
       <div class="timeline-dot"></div>  
       <div class="timeline-content">  
        <div class="timeline-title">  
         Phase 5: Optimization (Week 5-6)  
        </div>  
        <div class="timeline-desc">  
         Performance tuning, cost optimization, advanced features, team training, process refinement  
        </div>  
       </div>  
      </div>  
     </div>  
     <div class="warning-box">  
      <div class="warning-header"><span>⚡</span> <span>Total Build Time: 4-6 Weeks</span>  
      </div>  
      <div class="warning-content">  
       This assumes 10-15 hours of development per week. With a dedicated team or developer, it could be completed in 2-3 weeks full-time.  
      </div>  
     </div>  
    </div><!-- Cost Estimation -->  
    <div class="section">  
     <h2 class="section-title"><span>💰</span> Cost Estimation</h2>  
     <p class="section-subtitle">Monthly costs for running the complete asset management system</p>  
     <table class="cost-table">  
      <thead>  
       <tr>  
        <th>Service</th>  
        <th>Provider</th>  
        <th>Free Tier</th>  
        <th>Paid Tier (Low Volume)</th>  
        <th>Paid Tier (High Volume)</th>  
       </tr>  
      </thead>  
      <tbody>  
       <tr>  
        <td>CDN Storage</td>  
        <td>Cloudflare R2</td>  
        <td>10GB free</td>  
        <td>$5-10/month (50GB)</td>  
        <td>$50-100/month (500GB)</td>  
       </tr>  
       <tr>  
        <td>Database</td>  
        <td>Firebase/Supabase</td>  
        <td>1GB free</td>  
        <td>$25/month (Pro plan)</td>  
        <td>$99/month (Team plan)</td>  
       </tr>  
       <tr>  
        <td>Backend Hosting</td>  
        <td>Vercel</td>  
        <td>100GB bandwidth</td>  
        <td>$20/month (Pro)</td>  
        <td>$150/month (Team)</td>  
       </tr>  
       <tr>  
        <td>Processing Workers</td>  
        <td>Cloudflare Workers</td>  
        <td>100k requests/day</td>  
        <td>$5/month</td>  
        <td>$50/month</td>  
       </tr>  
       <tr>  
        <td>Monitoring</td>  
        <td>Sentry</td>  
        <td>5k events/month</td>  
        <td>$26/month (Team)</td>  
        <td>$80/month (Business)</td>  
       </tr>  
       <tr>  
        <td><strong>Total</strong></td>  
        <td></td>  
        <td><strong>$0/month</strong></td>  
        <td><strong>$80-85/month</strong></td>  
        <td><strong>$380-430/month</strong></td>  
       </tr>  
      </tbody>  
     </table>  
     <div class="success-box">  
      <div class="success-header"><span>💡</span> <span>Start with Free Tier</span>  
      </div>  
      <div class="success-content">  
       You can build and test the entire system using only free tiers! Upgrade to paid plans only when you exceed free tier limits or need advanced features.  
      </div>  
     </div>  
    </div><!-- Quick Start Repository -->  
    <div class="section">  
     <h2 class="section-title"><span>🚀</span> Quick Start Options</h2>  
     <p class="section-subtitle">Ways to accelerate your implementation</p>  
     <div class="tech-stack">  
      <div class="tech-card">  
       <div class="tech-header">  
        <div class="tech-icon">  
         📦  
        </div>  
        <div>  
         <div class="tech-name">  
          Build from Scratch  
         </div>  
         <div class="tech-purpose">  
          Full Control  
         </div>  
        </div>  
       </div>  
       <div class="tech-description">  
        Follow the step-by-step guide above to build every component yourself. Best for learning and customization.  
       </div>  
       <ul class="tech-features">  
        <li>Complete control over architecture</li>  
        <li>Learn every part of the system</li>  
        <li>Customize to exact requirements</li>  
        <li>Time: 4-6 weeks</li>  
       </ul><button class="btn" onclick="scrollToSteps()"> <span>📋</span> View Implementation Steps </button>  
      </div>  
      <div class="tech-card">  
       <div class="tech-header">  
        <div class="tech-icon">  
         ⚡  
        </div>  
        <div>  
         <div class="tech-name">  
          Use Starter Template  
         </div>  
         <div class="tech-purpose">  
          Faster Setup  
         </div>  
        </div>  
       </div>  
       <div class="tech-description">  
        Start with a pre-built Node.js template that includes webhook handlers, processing pipeline, and deployment configs.  
       </div>  
       <ul class="tech-features">  
        <li>Pre-configured infrastructure</li>  
        <li>Example implementations included</li>  
        <li>Deploy in hours, not weeks</li>  
        <li>Time: 3-5 days</li>  
       </ul><button class="btn"> <span>🔗</span> Coming Soon </button>  
      </div>  
      <div class="tech-card">  
       <div class="tech-header">  
        <div class="tech-icon">  
         🎯  
        </div>  
        <div>  
         <div class="tech-name">  
          Hire a Developer  
         </div>  
         <div class="tech-purpose">  
          Turnkey Solution  
         </div>  
        </div>  
       </div>  
       <div class="tech-description">  
        Hire a developer to build the complete system for you. Budget $5k-15k for full implementation and deployment.  
       </div>  
       <ul class="tech-features">  
        <li>Professional implementation</li>  
        <li>Custom to your requirements</li>  
        <li>Includes testing and deployment</li>  
        <li>Time: 2-4 weeks</li>  
       </ul><button class="btn"> <span>💼</span> Find Developers </button>  
      </div>  
     </div>  
    </div><!-- Resources -->  
    <div class="section">  
     <h2 class="section-title"><span>📚</span> Additional Resources</h2>  
     <p class="section-subtitle">Documentation and guides to help you build</p>  
     <div class="tech-stack">  
      <div class="tech-card">  
       <div class="tech-header">  
        <div class="tech-icon">  
         📖  
        </div>  
        <div>  
         <div class="tech-name">  
          Canva Connect Docs  
         </div>  
        </div>  
       </div>  
       <div class="tech-description">  
        Official Canva developer documentation for API integration and webhooks  
       </div><button class="btn" style="font-size: 13px; padding: 10px 16px;"> <span>🔗</span> developers.canva.com </button>  
      </div>  
      <div class="tech-card">  
       <div class="tech-header">  
        <div class="tech-icon">  
         🖼️  
        </div>  
        <div>  
         <div class="tech-name">  
          Sharp.js Documentation  
         </div>  
        </div>  
       </div>  
       <div class="tech-description">  
        Complete guide to image processing with Sharp.js  
       </div><button class="btn" style="font-size: 13px; padding: 10px 16px;"> <span>🔗</span> sharp.pixelplumbing.com </button>  
      </div>  
      <div class="tech-card">  
       <div class="tech-header">  
        <div class="tech-icon">  
         ☁️  
        </div>  
        <div>  
         <div class="tech-name">  
          AWS S3 + CloudFront  
         </div>  
        </div>  
       </div>  
       <div class="tech-description">  
        Set up CDN storage and delivery with AWS  
       </div><button class="btn" style="font-size: 13px; padding: 10px 16px;"> <span>🔗</span> docs.aws.amazon.com </button>  
      </div>  
      <div class="tech-card">  
       <div class="tech-header">  
        <div class="tech-icon">  
         🔥  
        </div>  
        <div>  
         <div class="tech-name">  
          Firebase Setup Guide  
         </div>  
        </div>  
       </div>  
       <div class="tech-description">  
        Getting started with Firebase for your registry database  
       </div><button class="btn" style="font-size: 13px; padding: 10px 16px;"> <span>🔗</span> firebase.google.com/docs </button>  
      </div>  
     </div>  
    </div><!-- Summary -->  
    <div class="section">  
     <h2 class="section-title"><span>✅</span> Summary: What You Need</h2>  
     <p class="section-subtitle">Quick checklist of everything required to build the complete system</p>  
     <div class="success-box">  
      <div class="success-header"><span>🎯</span> <span>Core Requirements</span>  
      </div>  
      <div class="success-content" style="margin-top: 16px;">  
       <ul class="tech-features">  
        <li><strong>Canva Connect API</strong> - For design exports and webhooks (Free tier available)</li>  
        <li><strong>CDN Storage</strong> - S3 or Cloudflare R2 for hosting assets (~$10-50/month)</li>  
        <li><strong>Database</strong> - Firebase or Supabase for registry (Free tier available)</li>  
        <li><strong>Backend Hosting</strong> - Vercel, Netlify, or Railway for webhooks (Free tier available)</li>  
        <li><strong>Processing Libraries</strong> - Sharp.js (images) and FFmpeg (videos) (Free/Open source)</li>  
        <li><strong>Validation</strong> - Zod or Ajv for schema validation (Free/Open source)</li>  
        <li><strong>Time Investment</strong> - 4-6 weeks part-time or 2-3 weeks full-time development</li>  
        <li><strong>Skillset Needed</strong> - Node.js, API integration, serverless functions, basic DevOps</li>  
       </ul>  
      </div>  
     </div>  
     <div class="warning-box">  
      <div class="warning-header"><span>💡</span> <span>Pro Tip</span>  
      </div>  
      <div class="warning-content">  
       Start simple! Build the basic webhook → process → upload → registry flow first. Then add optimizations, multiple formats, validation, and governance workflows incrementally. Don't try to build everything at once!  
      </div>  
     </div>  
    </div>  
   </div>  
  </div><!-- Toast Notification -->  
  <div class="toast" id="toast"><span>✓</span> <span id="toast-message">Copied to clipboard!</span>  
  </div>  
  <script>  
    function switchTab(tabName) {  
      // Update tab buttons  
      document.querySelectorAll('.tab').forEach(tab => {  
        tab.classList.remove('active');  
      });  
      event.target.classList.add('active');  
  
      // Update tab content  
      document.querySelectorAll('.tab-content').forEach(content => {  
        content.classList.remove('active');  
      });  
      document.getElementById(tabName).classList.add('active');  
    }  
  
    function copyCode(elementId) {  
      const code = document.getElementById(elementId).textContent;  
        
      const textarea = document.createElement('textarea');  
      textarea.value = code;  
      textarea.style.position = 'fixed';  
      textarea.style.opacity = '0';  
      document.body.appendChild(textarea);  
        
      textarea.select();  
      document.execCommand('copy');  
        
      document.body.removeChild(textarea);  
        
      showToast('Code copied to clipboard!');  
    }  
  
    function showToast(message) {  
      const toast = document.getElementById('toast');  
      const toastMessage = document.getElementById('toast-message');  
        
      toastMessage.textContent = message;  
      toast.classList.add('show');  
        
      setTimeout(() => {  
        toast.classList.remove('show');  
      }, 3000);  
    }  
  
    function scrollToSteps() {  
      document.querySelector('.step-list').scrollIntoView({   
        behavior: 'smooth',  
        block: 'start'  
      });  
    }  
  
    // Make all buttons with external links work  
    document.querySelectorAll('.btn').forEach(btn => {  
      btn.addEventListener('click', function(e) {  
        if (this.textContent.includes('developers.canva.com')) {  
          window.open('https://www.canva.dev/', '_blank', 'noopener,noreferrer');  
        } else if (this.textContent.includes('sharp.pixelplumbing.com')) {  
          window.open('https://sharp.pixelplumbing.com/', '_blank', 'noopener,noreferrer');  
        } else if (this.textContent.includes('docs.aws.amazon.com')) {  
          window.open('https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', '_blank', 'noopener,noreferrer');  
        } else if (this.textContent.includes('firebase.google.com/docs')) {  
          window.open('https://firebase.google.com/docs', '_blank', 'noopener,noreferrer');  
        }  
      });  
    });  
  </script>  
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9bc09d43a62bd519',t:'MTc2ODA5NDY2NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>  
</html>  
