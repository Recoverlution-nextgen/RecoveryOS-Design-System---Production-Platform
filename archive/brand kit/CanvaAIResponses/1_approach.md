<!doctype html>  
<html lang="en">  
 <head>  
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <title>RecoveryOS Asset Management Platform</title>  
  <style>  
    * {  
      margin: 0;  
      padding: 0;  
      box-sizing: border-box;  
    }  
  
    body {  
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;  
      background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);  
      color: #e0e0e0;  
      min-height: 100vh;  
      overflow-x: hidden;  
    }  
  
    .platform-container {  
      display: flex;  
      height: 100vh;  
      width: 100%;  
    }  
  
    /* Sidebar Navigation */  
    .sidebar {  
      width: 280px;  
      background: rgba(15, 15, 30, 0.95);  
      border-right: 1px solid rgba(255, 255, 255, 0.1);  
      padding: 24px;  
      display: flex;  
      flex-direction: column;  
      backdrop-filter: blur(10px);  
      overflow-y: auto;  
    }  
  
    .platform-logo {  
      font-size: 24px;  
      font-weight: 700;  
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
      -webkit-background-clip: text;  
      -webkit-text-fill-color: transparent;  
      margin-bottom: 32px;  
      letter-spacing: -0.5px;  
    }  
  
    .nav-section {  
      margin-bottom: 24px;  
    }  
  
    .nav-label {  
      font-size: 11px;  
      text-transform: uppercase;  
      letter-spacing: 1px;  
      color: #888;  
      margin-bottom: 12px;  
      font-weight: 600;  
    }  
  
    .nav-item {  
      padding: 12px 16px;  
      margin-bottom: 4px;  
      border-radius: 8px;  
      cursor: pointer;  
      transition: all 0.2s;  
      display: flex;  
      align-items: center;  
      gap: 12px;  
      font-size: 14px;  
      color: #b0b0b0;  
    }  
  
    .nav-item:hover {  
      background: rgba(102, 126, 234, 0.1);  
      color: #667eea;  
    }  
  
    .nav-item.active {  
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));  
      color: #fff;  
      font-weight: 500;  
    }  
  
    .nav-icon {  
      width: 20px;  
      height: 20px;  
      display: flex;  
      align-items: center;  
      justify-content: center;  
    }  
  
    /* Main Content Area */  
    .main-content {  
      flex: 1;  
      overflow-y: auto;  
      padding: 32px;  
    }  
  
    .content-section {  
      display: none;  
      animation: fadeIn 0.3s ease-in;  
    }  
  
    .content-section.active {  
      display: block;  
    }  
  
    @keyframes fadeIn {  
      from { opacity: 0; transform: translateY(10px); }  
      to { opacity: 1; transform: translateY(0); }  
    }  
  
    .section-header {  
      margin-bottom: 32px;  
    }  
  
    .section-title {  
      font-size: 32px;  
      font-weight: 700;  
      margin-bottom: 8px;  
      background: linear-gradient(135deg, #fff 0%, #b0b0b0 100%);  
      -webkit-background-clip: text;  
      -webkit-text-fill-color: transparent;  
    }  
  
    .section-subtitle {  
      font-size: 16px;  
      color: #888;  
      line-height: 1.6;  
    }  
  
    /* Cards */  
    .card-grid {  
      display: grid;  
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));  
      gap: 24px;  
      margin-bottom: 32px;  
    }  
  
    .card {  
      background: rgba(26, 26, 46, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 16px;  
      padding: 24px;  
      transition: all 0.3s;  
      backdrop-filter: blur(10px);  
    }  
  
    .card:hover {  
      transform: translateY(-4px);  
      border-color: rgba(102, 126, 234, 0.5);  
      box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);  
    }  
  
    .card-title {  
      font-size: 18px;  
      font-weight: 600;  
      margin-bottom: 8px;  
      color: #fff;  
    }  
  
    .card-value {  
      font-size: 36px;  
      font-weight: 700;  
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
      -webkit-background-clip: text;  
      -webkit-text-fill-color: transparent;  
      margin-bottom: 8px;  
    }  
  
    .card-label {  
      font-size: 13px;  
      color: #888;  
    }  
  
    /* Asset Browser */  
    .filter-bar {  
      background: rgba(26, 26, 46, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 12px;  
      padding: 20px;  
      margin-bottom: 24px;  
      display: flex;  
      gap: 16px;  
      flex-wrap: wrap;  
      align-items: center;  
    }  
  
    .filter-group {  
      display: flex;  
      flex-direction: column;  
      gap: 8px;  
      min-width: 180px;  
    }  
  
    .filter-label {  
      font-size: 12px;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
      color: #888;  
      font-weight: 600;  
    }  
  
    select, input[type="text"] {  
      background: rgba(15, 15, 30, 0.8);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 8px;  
      padding: 10px 14px;  
      color: #e0e0e0;  
      font-size: 14px;  
      transition: all 0.2s;  
      outline: none;  
    }  
  
    select:focus, input[type="text"]:focus {  
      border-color: #667eea;  
      background: rgba(15, 15, 30, 0.95);  
    }  
  
    select option {  
      background: #1a1a2e;  
    }  
  
    .asset-grid {  
      display: grid;  
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));  
      gap: 20px;  
    }  
  
    .asset-card {  
      background: rgba(26, 26, 46, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 12px;  
      overflow: hidden;  
      transition: all 0.3s;  
      cursor: pointer;  
    }  
  
    .asset-card:hover {  
      transform: translateY(-4px);  
      border-color: rgba(102, 126, 234, 0.5);  
      box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);  
    }  
  
    .asset-preview {  
      width: 100%;  
      height: 180px;  
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);  
      display: flex;  
      align-items: center;  
      justify-content: center;  
      font-size: 48px;  
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);  
    }  
  
    .asset-info {  
      padding: 16px;  
    }  
  
    .asset-id {  
      font-size: 13px;  
      font-weight: 600;  
      color: #667eea;  
      margin-bottom: 8px;  
      font-family: 'Courier New', monospace;  
    }  
  
    .asset-meta {  
      display: flex;  
      gap: 8px;  
      flex-wrap: wrap;  
      margin-top: 12px;  
    }  
  
    .badge {  
      padding: 4px 10px;  
      border-radius: 12px;  
      font-size: 11px;  
      font-weight: 600;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
    }  
  
    .badge-approved {  
      background: rgba(76, 175, 80, 0.2);  
      color: #4caf50;  
      border: 1px solid rgba(76, 175, 80, 0.3);  
    }  
  
    .badge-draft {  
      background: rgba(255, 152, 0, 0.2);  
      color: #ff9800;  
      border: 1px solid rgba(255, 152, 0, 0.3);  
    }  
  
    .badge-deprecated {  
      background: rgba(244, 67, 54, 0.2);  
      color: #f44336;  
      border: 1px solid rgba(244, 67, 54, 0.3);  
    }  
  
    /* Validator */  
    .validator-input {  
      background: rgba(26, 26, 46, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 12px;  
      padding: 24px;  
      margin-bottom: 24px;  
    }  
  
    .input-group {  
      margin-bottom: 20px;  
    }  
  
    .input-label {  
      display: block;  
      font-size: 14px;  
      font-weight: 600;  
      color: #e0e0e0;  
      margin-bottom: 8px;  
    }  
  
    textarea {  
      width: 100%;  
      min-height: 200px;  
      background: rgba(15, 15, 30, 0.8);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 8px;  
      padding: 16px;  
      color: #e0e0e0;  
      font-size: 14px;  
      font-family: 'Courier New', monospace;  
      resize: vertical;  
      outline: none;  
    }  
  
    textarea:focus {  
      border-color: #667eea;  
      background: rgba(15, 15, 30, 0.95);  
    }  
  
    .btn {  
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
      color: #fff;  
      border: none;  
      padding: 12px 24px;  
      border-radius: 8px;  
      font-size: 14px;  
      font-weight: 600;  
      cursor: pointer;  
      transition: all 0.2s;  
      display: inline-flex;  
      align-items: center;  
      gap: 8px;  
    }  
  
    .btn:hover {  
      transform: translateY(-2px);  
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);  
    }  
  
    .btn:active {  
      transform: translateY(0);  
    }  
  
    .validation-results {  
      margin-top: 24px;  
    }  
  
    .result-item {  
      background: rgba(26, 26, 46, 0.6);  
      border-left: 4px solid;  
      border-radius: 8px;  
      padding: 16px;  
      margin-bottom: 12px;  
    }  
  
    .result-item.success {  
      border-left-color: #4caf50;  
      background: rgba(76, 175, 80, 0.1);  
    }  
  
    .result-item.error {  
      border-left-color: #f44336;  
      background: rgba(244, 67, 54, 0.1);  
    }  
  
    .result-item.warning {  
      border-left-color: #ff9800;  
      background: rgba(255, 152, 0, 0.1);  
    }  
  
    .result-title {  
      font-weight: 600;  
      margin-bottom: 4px;  
      display: flex;  
      align-items: center;  
      gap: 8px;  
    }  
  
    .result-message {  
      font-size: 13px;  
      color: #b0b0b0;  
      line-height: 1.6;  
    }  
  
    /* Governance Dashboard */  
    .workflow-timeline {  
      position: relative;  
      padding-left: 40px;  
    }  
  
    .timeline-item {  
      position: relative;  
      padding-bottom: 32px;  
    }  
  
    .timeline-item::before {  
      content: '';  
      position: absolute;  
      left: -33px;  
      top: 8px;  
      width: 16px;  
      height: 16px;  
      border-radius: 50%;  
      background: #667eea;  
      border: 3px solid rgba(15, 15, 30, 0.95);  
    }  
  
    .timeline-item::after {  
      content: '';  
      position: absolute;  
      left: -26px;  
      top: 24px;  
      width: 2px;  
      height: calc(100% - 16px);  
      background: rgba(102, 126, 234, 0.3);  
    }  
  
    .timeline-item:last-child::after {  
      display: none;  
    }  
  
    .timeline-content {  
      background: rgba(26, 26, 46, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 12px;  
      padding: 20px;  
    }  
  
    .timeline-title {  
      font-weight: 600;  
      margin-bottom: 8px;  
      color: #fff;  
    }  
  
    .timeline-meta {  
      font-size: 13px;  
      color: #888;  
      margin-bottom: 12px;  
    }  
  
    .timeline-description {  
      font-size: 14px;  
      color: #b0b0b0;  
      line-height: 1.6;  
    }  
  
    /* Pipeline Simulator */  
    .pipeline-stage {  
      background: rgba(26, 26, 46, 0.6);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 12px;  
      padding: 24px;  
      margin-bottom: 16px;  
      position: relative;  
      overflow: hidden;  
    }  
  
    .pipeline-stage::before {  
      content: '';  
      position: absolute;  
      left: 0;  
      top: 0;  
      width: 4px;  
      height: 100%;  
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);  
    }  
  
    .stage-header {  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      margin-bottom: 16px;  
    }  
  
    .stage-title {  
      font-weight: 600;  
      font-size: 16px;  
      color: #fff;  
    }  
  
    .stage-status {  
      padding: 6px 12px;  
      border-radius: 12px;  
      font-size: 11px;  
      font-weight: 600;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
    }  
  
    .status-pending {  
      background: rgba(158, 158, 158, 0.2);  
      color: #9e9e9e;  
    }  
  
    .status-running {  
      background: rgba(33, 150, 243, 0.2);  
      color: #2196f3;  
      animation: pulse 2s infinite;  
    }  
  
    .status-complete {  
      background: rgba(76, 175, 80, 0.2);  
      color: #4caf50;  
    }  
  
    @keyframes pulse {  
      0%, 100% { opacity: 1; }  
      50% { opacity: 0.6; }  
    }  
  
    .stage-details {  
      font-size: 14px;  
      color: #b0b0b0;  
      line-height: 1.6;  
    }  
  
    .progress-bar {  
      width: 100%;  
      height: 6px;  
      background: rgba(255, 255, 255, 0.1);  
      border-radius: 3px;  
      margin-top: 16px;  
      overflow: hidden;  
    }  
  
    .progress-fill {  
      height: 100%;  
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);  
      border-radius: 3px;  
      transition: width 0.5s ease;  
    }  
  
    /* Modal */  
    .modal {  
      display: none;  
      position: fixed;  
      top: 0;  
      left: 0;  
      width: 100%;  
      height: 100%;  
      background: rgba(0, 0, 0, 0.8);  
      backdrop-filter: blur(5px);  
      z-index: 1000;  
      align-items: center;  
      justify-content: center;  
      animation: fadeIn 0.3s;  
    }  
  
    .modal.active {  
      display: flex;  
    }  
  
    .modal-content {  
      background: rgba(26, 26, 46, 0.98);  
      border: 1px solid rgba(255, 255, 255, 0.1);  
      border-radius: 16px;  
      padding: 32px;  
      max-width: 600px;  
      width: 90%;  
      max-height: 80vh;  
      overflow-y: auto;  
    }  
  
    .modal-header {  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
      margin-bottom: 24px;  
    }  
  
    .modal-title {  
      font-size: 24px;  
      font-weight: 700;  
      color: #fff;  
    }  
  
    .modal-close {  
      background: none;  
      border: none;  
      color: #888;  
      font-size: 24px;  
      cursor: pointer;  
      padding: 0;  
      width: 32px;  
      height: 32px;  
      display: flex;  
      align-items: center;  
      justify-content: center;  
      border-radius: 8px;  
      transition: all 0.2s;  
    }  
  
    .modal-close:hover {  
      background: rgba(255, 255, 255, 0.1);  
      color: #fff;  
    }  
  
    .detail-row {  
      display: flex;  
      padding: 12px 0;  
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);  
    }  
  
    .detail-row:last-child {  
      border-bottom: none;  
    }  
  
    .detail-label {  
      font-weight: 600;  
      color: #888;  
      min-width: 140px;  
      font-size: 13px;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
    }  
  
    .detail-value {  
      color: #e0e0e0;  
      font-size: 14px;  
      font-family: 'Courier New', monospace;  
    }  
  
    /* Responsive */  
    @media (max-width: 1024px) {  
      .sidebar {  
        width: 240px;  
      }  
    }  
  
    @media (max-width: 768px) {  
      .platform-container {  
        flex-direction: column;  
      }  
  
      .sidebar {  
        width: 100%;  
        border-right: none;  
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);  
        padding: 16px;  
      }  
  
      .main-content {  
        padding: 16px;  
      }  
  
      .card-grid {  
        grid-template-columns: 1fr;  
      }  
  
      .asset-grid {  
        grid-template-columns: 1fr;  
      }  
  
      .filter-bar {  
        flex-direction: column;  
      }  
  
      .filter-group {  
        width: 100%;  
      }  
    }  
  
    .empty-state {  
      text-align: center;  
      padding: 64px 32px;  
      color: #888;  
    }  
  
    .empty-icon {  
      font-size: 64px;  
      margin-bottom: 16px;  
      opacity: 0.3;  
    }  
  
    .empty-title {  
      font-size: 18px;  
      font-weight: 600;  
      margin-bottom: 8px;  
      color: #b0b0b0;  
    }  
  
    .empty-message {  
      font-size: 14px;  
      line-height: 1.6;  
    }  
  </style>  
  <style>@view-transition { navigation: auto; }</style>  
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>  
  <script src="/_sdk/element_sdk.js" type="text/javascript"></script>  
  <script src="https://cdn.tailwindcss.com" type="text/javascript"></script>  
 </head>  
 <body>  
  <div class="platform-container"><!-- Sidebar Navigation -->  
   <aside class="sidebar">  
    <div class="platform-logo">  
     RecoveryOS AMP  
    </div>  
    <nav>  
     <div class="nav-section">  
      <div class="nav-label">  
       Explore  
      </div>  
      <div class="nav-item active" data-section="explorer">  
       <div class="nav-icon">  
        🗺️  
       </div><span>Asset Explorer</span>  
      </div>  
      <div class="nav-item" data-section="browser">  
       <div class="nav-icon">  
        🔍  
       </div><span>Registry Browser</span>  
      </div>  
     </div>  
     <div class="nav-section">  
      <div class="nav-label">  
       Validate  
      </div>  
      <div class="nav-item" data-section="validator">  
       <div class="nav-icon">  
        ✓  
       </div><span>Validation Tool</span>  
      </div>  
      <div class="nav-item" data-section="compliance">  
       <div class="nav-icon">  
        🛡️  
       </div><span>Compliance Check</span>  
      </div>  
     </div>  
     <div class="nav-section">  
      <div class="nav-label">  
       Govern  
      </div>  
      <div class="nav-item" data-section="governance">  
       <div class="nav-icon">  
        ⚖️  
       </div><span>Governance Dashboard</span>  
      </div>  
      <div class="nav-item" data-section="audit">  
       <div class="nav-icon">  
        📋  
       </div><span>Audit Logs</span>  
      </div>  
     </div>  
     <div class="nav-section">  
      <div class="nav-label">  
       Deploy  
      </div>  
      <div class="nav-item" data-section="pipeline">  
       <div class="nav-icon">  
        ⚡  
       </div><span>Pipeline Simulator</span>  
      </div>  
      <div class="nav-item" data-section="deployment">  
       <div class="nav-icon">  
        🚀  
       </div><span>Deployment Status</span>  
      </div>  
     </div>  
    </nav>  
   </aside><!-- Main Content -->  
   <main class="main-content"><!-- Asset Explorer Section -->  
    <section id="explorer" class="content-section active">  
     <div class="section-header">  
      <h1 class="section-title">Asset Explorer</h1>  
      <p class="section-subtitle">Overview of your asset ecosystem with real-time metrics and system health</p>  
     </div>  
     <div class="card-grid">  
      <div class="card">  
       <div class="card-title">  
        Total Assets  
       </div>  
       <div class="card-value" id="total-assets">  
        847  
       </div>  
       <div class="card-label">  
        Across all surfaces and components  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Approved Assets  
       </div>  
       <div class="card-value" id="approved-assets">  
        723  
       </div>  
       <div class="card-label">  
        Ready for production deployment  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Pending Review  
       </div>  
       <div class="card-value" id="pending-assets">  
        98  
       </div>  
       <div class="card-label">  
        Awaiting governance approval  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Registry Version  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        v15.2.1  
       </div>  
       <div class="card-label">  
        Last updated 2 hours ago  
       </div>  
      </div>  
     </div>  
     <div class="card-grid">  
      <div class="card">  
       <div class="card-title">  
        Surfaces  
       </div>  
       <div class="card-value" id="surface-count">  
        8  
       </div>  
       <div class="card-label">  
        Active deployment surfaces  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Components  
       </div>  
       <div class="card-value" id="component-count">  
        24  
       </div>  
       <div class="card-label">  
        Registered component types  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Storage Used  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        2.4 GB  
       </div>  
       <div class="card-label">  
        CDN and backup storage  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        CDN Hit Rate  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        98.7%  
       </div>  
       <div class="card-label">  
        Last 30 days performance  
       </div>  
      </div>  
     </div>  
     <div class="card" style="margin-top: 24px;">  
      <div class="card-title">  
       Quick Actions  
      </div>  
      <div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;"><button class="btn" onclick="switchSection('browser')"> <span>🔍</span> Browse Assets </button> <button class="btn" onclick="switchSection('validator')"> <span>✓</span> Validate Registry </button> <button class="btn" onclick="switchSection('pipeline')"> <span>⚡</span> Run Pipeline </button>  
      </div>  
     </div>  
    </section><!-- Registry Browser Section -->  
    <section id="browser" class="content-section">  
     <div class="section-header">  
      <h1 class="section-title">Registry Browser</h1>  
      <p class="section-subtitle">Explore assets by surface, component, altitude, and status</p>  
     </div>  
     <div class="filter-bar">  
      <div class="filter-group"><label class="filter-label">Surface</label> <select id="filter-surface"> <option value="">All Surfaces</option> <option value="mkt_home">Marketing Home</option> <option value="cmp_player">Companion Player</option> <option value="cmp_editor">Companion Editor</option> <option value="cmd_console">Command Console</option> <option value="cmd_center">Command Center</option> <option value="sys_recovery">System Recovery</option> </select>  
      </div>  
      <div class="filter-group"><label class="filter-label">Component</label> <select id="filter-component"> <option value="">All Components</option> <option value="hero_keynote">Hero Keynote</option> <option value="portal_shell">Portal Shell</option> <option value="proof_mark">Proof Mark</option> <option value="texture_overlay">Texture Overlay</option> <option value="motion_loop">Motion Loop</option> </select>  
      </div>  
      <div class="filter-group"><label class="filter-label">Status</label> <select id="filter-status"> <option value="">All Statuses</option> <option value="approved">Approved</option> <option value="draft">Draft</option> <option value="deprecated">Deprecated</option> </select>  
      </div>  
      <div class="filter-group"><label class="filter-label">Search</label> <input type="text" id="filter-search" placeholder="Search by ID or class...">  
      </div>  
     </div>  
     <div class="asset-grid" id="asset-grid"><!-- Assets will be generated here -->  
     </div>  
    </section><!-- Validation Tool Section -->  
    <section id="validator" class="content-section">  
     <div class="section-header">  
      <h1 class="section-title">Validation Tool</h1>  
      <p class="section-subtitle">Validate asset names, registry schemas, and compliance requirements</p>  
     </div>  
     <div class="validator-input">  
      <div class="input-group"><label class="input-label" for="validate-name">Asset Name Validation</label> <input type="text" id="validate-name" placeholder="e.g., hero_recoveryos_field_001">  
      </div><button class="btn" onclick="validateAssetName()"> <span>✓</span> Validate Name </button>  
     </div>  
     <div class="validator-input">  
      <div class="input-group"><label class="input-label" for="validate-registry">Registry Schema Validation</label> <textarea id="validate-registry" placeholder="Paste your registry JSON here..."></textarea>  
      </div><button class="btn" onclick="validateRegistry()"> <span>✓</span> Validate Registry </button>  
     </div>  
     <div class="validation-results" id="validation-results"></div>  
    </section><!-- Compliance Check Section -->  
    <section id="compliance" class="content-section">  
     <div class="section-header">  
      <h1 class="section-title">Compliance Check</h1>  
      <p class="section-subtitle">Verify trust metadata, consent scopes, and accessibility requirements</p>  
     </div>  
     <div class="card-grid">  
      <div class="card">  
       <div class="card-title">  
        Trust Compliance  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        96%  
       </div>  
       <div class="card-label">  
        Assets with complete trust metadata  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Integrity Checks  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        100%  
       </div>  
       <div class="card-label">  
        Assets with verified hashes  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Accessibility  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        94%  
       </div>  
       <div class="card-label">  
        WCAG 2 AA compliant  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Consent Scope  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        98%  
       </div>  
       <div class="card-label">  
        Properly scoped assets  
       </div>  
      </div>  
     </div>  
     <div class="card" style="margin-top: 24px;">  
      <div class="card-title">  
       Recent Compliance Issues  
      </div>  
      <div style="margin-top: 16px;">  
       <div class="result-item warning">  
        <div class="result-title">  
         ⚠️ Missing Alt Text  
        </div>  
        <div class="result-message">  
         12 assets missing accessibility.alt metadata  
        </div>  
       </div>  
       <div class="result-item warning">  
        <div class="result-title">  
         ⚠️ Motion Policy Undefined  
        </div>  
        <div class="result-message">  
         5 motion loops need accessibility.motion_policy set  
        </div>  
       </div>  
       <div class="result-item success">  
        <div class="result-title">  
         ✓ All Integrity Hashes Valid  
        </div>  
        <div class="result-message">  
         847 assets verified successfully  
        </div>  
       </div>  
      </div>  
     </div>  
    </section><!-- Governance Dashboard Section -->  
    <section id="governance" class="content-section">  
     <div class="section-header">  
      <h1 class="section-title">Governance Dashboard</h1>  
      <p class="section-subtitle">Track approval workflows and asset lifecycle management</p>  
     </div>  
     <div class="card-grid">  
      <div class="card">  
       <div class="card-title">  
        Pending Approvals  
       </div>  
       <div class="card-value">  
        23  
       </div>  
       <div class="card-label">  
        Assets awaiting review  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Approved This Week  
       </div>  
       <div class="card-value">  
        47  
       </div>  
       <div class="card-label">  
        By governance team  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Deprecated Assets  
       </div>  
       <div class="card-value">  
        15  
       </div>  
       <div class="card-label">  
        Pending replacement  
       </div>  
      </div>  
     </div>  
     <div class="card" style="margin-top: 24px;">  
      <div class="card-title">  
       Approval Workflow Timeline  
      </div>  
      <div class="workflow-timeline" style="margin-top: 24px;">  
       <div class="timeline-item">  
        <div class="timeline-content">  
         <div class="timeline-title">  
          Schema Update Approved  
         </div>  
         <div class="timeline-meta">  
          System Steward • 2 hours ago  
         </div>  
         <div class="timeline-description">  
          Added new ui_illustration asset class to registry v15.2.0  
         </div>  
        </div>  
       </div>  
       <div class="timeline-item">  
        <div class="timeline-content">  
         <div class="timeline-title">  
          Asset Batch Approved  
         </div>  
         <div class="timeline-meta">  
          Governance Reviewer • 5 hours ago  
         </div>  
         <div class="timeline-description">  
          Approved 12 hero assets for mkt_home surface  
         </div>  
        </div>  
       </div>  
       <div class="timeline-item">  
        <div class="timeline-content">  
         <div class="timeline-title">  
          Deprecation Request  
         </div>  
         <div class="timeline-meta">  
          Design Curator • 1 day ago  
         </div>  
         <div class="timeline-description">  
          Flagged 8 outdated proof marks for replacement  
         </div>  
        </div>  
       </div>  
       <div class="timeline-item">  
        <div class="timeline-content">  
         <div class="timeline-title">  
          Compliance Audit Complete  
         </div>  
         <div class="timeline-meta">  
          Compliance Officer • 2 days ago  
         </div>  
         <div class="timeline-description">  
          Quarterly review passed with 96% compliance rate  
         </div>  
        </div>  
       </div>  
      </div>  
     </div>  
    </section><!-- Audit Logs Section -->  
    <section id="audit" class="content-section">  
     <div class="section-header">  
      <h1 class="section-title">Audit Logs</h1>  
      <p class="section-subtitle">Complete audit trail of all system changes and approvals</p>  
     </div>  
     <div class="card">  
      <div class="card-title">  
       Recent Activity  
      </div>  
      <div style="margin-top: 20px;">  
       <div class="detail-row">  
        <div class="detail-label">  
         Timestamp  
        </div>  
        <div class="detail-label">  
         Event  
        </div>  
        <div class="detail-label">  
         User  
        </div>  
       </div>  
       <div class="detail-row">  
        <div class="detail-value">  
         2026-01-11 14:23  
        </div>  
        <div class="detail-value">  
         Registry Update  
        </div>  
        <div class="detail-value">  
         registry@platform  
        </div>  
       </div>  
       <div class="detail-row">  
        <div class="detail-value">  
         2026-01-11 12:15  
        </div>  
        <div class="detail-value">  
         Asset Approved  
        </div>  
        <div class="detail-value">  
         governance@platform  
        </div>  
       </div>  
       <div class="detail-row">  
        <div class="detail-value">  
         2026-01-11 10:47  
        </div>  
        <div class="detail-value">  
         Pipeline Run  
        </div>  
        <div class="detail-value">  
         ops@platform  
        </div>  
       </div>  
       <div class="detail-row">  
        <div class="detail-value">  
         2026-01-11 09:32  
        </div>  
        <div class="detail-value">  
         Schema Change  
        </div>  
        <div class="detail-value">  
         registry@platform  
        </div>  
       </div>  
       <div class="detail-row">  
        <div class="detail-value">  
         2026-01-10 16:54  
        </div>  
        <div class="detail-value">  
         Asset Deprecated  
        </div>  
        <div class="detail-value">  
         governance@platform  
        </div>  
       </div>  
      </div>  
     </div>  
     <div class="card" style="margin-top: 24px;">  
      <div class="card-title">  
       Export Options  
      </div>  
      <div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;"><button class="btn"> <span>📄</span> Export as CSV </button> <button class="btn"> <span>📊</span> Export as JSON </button> <button class="btn"> <span>📋</span> Generate Report </button>  
      </div>  
     </div>  
    </section><!-- Pipeline Simulator Section -->  
    <section id="pipeline" class="content-section">  
     <div class="section-header">  
      <h1 class="section-title">Pipeline Simulator</h1>  
      <p class="section-subtitle">Visualize and simulate the asset automation pipeline</p>  
     </div>  
     <div class="card" style="margin-bottom: 24px;"><button class="btn" onclick="runPipeline()" id="run-pipeline-btn"> <span>▶️</span> Run Pipeline Simulation </button>  
     </div>  
     <div id="pipeline-stages">  
      <div class="pipeline-stage">  
       <div class="stage-header">  
        <div class="stage-title">  
         1. Canva Export Detection  
        </div>  
        <div class="stage-status status-pending" id="stage1-status">  
         Pending  
        </div>  
       </div>  
       <div class="stage-details" id="stage1-details">  
        Webhook listens for new design exports from Canva Connect  
       </div>  
       <div class="progress-bar">  
        <div class="progress-fill" id="stage1-progress" style="width: 0%"></div>  
       </div>  
      </div>  
      <div class="pipeline-stage">  
       <div class="stage-header">  
        <div class="stage-title">  
         2. Asset Validation  
        </div>  
        <div class="stage-status status-pending" id="stage2-status">  
         Pending  
        </div>  
       </div>  
       <div class="stage-details" id="stage2-details">  
        Validate naming grammar, metadata, and file integrity  
       </div>  
       <div class="progress-bar">  
        <div class="progress-fill" id="stage2-progress" style="width: 0%"></div>  
       </div>  
      </div>  
      <div class="pipeline-stage">  
       <div class="stage-header">  
        <div class="stage-title">  
         3. Transcode &amp; Optimization  
        </div>  
        <div class="stage-status status-pending" id="stage3-status">  
         Pending  
        </div>  
       </div>  
       <div class="stage-details" id="stage3-details">  
        Generate optimized renditions (AVIF, WebP, MP4) at multiple sizes  
       </div>  
       <div class="progress-bar">  
        <div class="progress-fill" id="stage3-progress" style="width: 0%"></div>  
       </div>  
      </div>  
      <div class="pipeline-stage">  
       <div class="stage-header">  
        <div class="stage-title">  
         4. Storage Upload  
        </div>  
        <div class="stage-status status-pending" id="stage4-status">  
         Pending  
        </div>  
       </div>  
       <div class="stage-details" id="stage4-details">  
        Upload renditions to CDN and generate signed URLs  
       </div>  
       <div class="progress-bar">  
        <div class="progress-fill" id="stage4-progress" style="width: 0%"></div>  
       </div>  
      </div>  
      <div class="pipeline-stage">  
       <div class="stage-header">  
        <div class="stage-title">  
         5. Registry Update  
        </div>  
        <div class="stage-status status-pending" id="stage5-status">  
         Pending  
        </div>  
       </div>  
       <div class="stage-details" id="stage5-details">  
        Update registry with new asset metadata and version increment  
       </div>  
       <div class="progress-bar">  
        <div class="progress-fill" id="stage5-progress" style="width: 0%"></div>  
       </div>  
      </div>  
      <div class="pipeline-stage">  
       <div class="stage-header">  
        <div class="stage-title">  
         6. Governance Sync  
        </div>  
        <div class="stage-status status-pending" id="stage6-status">  
         Pending  
        </div>  
       </div>  
       <div class="stage-details" id="stage6-details">  
        Notify governance systems and update approval workflows  
       </div>  
       <div class="progress-bar">  
        <div class="progress-fill" id="stage6-progress" style="width: 0%"></div>  
       </div>  
      </div>  
     </div>  
    </section><!-- Deployment Status Section -->  
    <section id="deployment" class="content-section">  
     <div class="section-header">  
      <h1 class="section-title">Deployment Status</h1>  
      <p class="section-subtitle">Monitor production deployments and rollback status</p>  
     </div>  
     <div class="card-grid">  
      <div class="card">  
       <div class="card-title">  
        Current Version  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        v15.2.1  
       </div>  
       <div class="card-label">  
        Deployed 2 hours ago  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Environment  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        PROD  
       </div>  
       <div class="card-label">  
        Production environment  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Deployment Status  
       </div>  
       <div class="card-value" style="font-size: 28px; color: #4caf50;">  
        ✓  
       </div>  
       <div class="card-label">  
        All systems operational  
       </div>  
      </div>  
      <div class="card">  
       <div class="card-title">  
        Rollback Available  
       </div>  
       <div class="card-value" style="font-size: 28px;">  
        v15.2.0  
       </div>  
       <div class="card-label">  
        Last stable version  
       </div>  
      </div>  
     </div>  
     <div class="card" style="margin-top: 24px;">  
      <div class="card-title">  
       Deployment History  
      </div>  
      <div class="workflow-timeline" style="margin-top: 24px;">  
       <div class="timeline-item">  
        <div class="timeline-content">  
         <div class="timeline-title">  
          v15.2.1 Deployed  
         </div>  
         <div class="timeline-meta">  
          Platform Engineer • 2 hours ago  
         </div>  
         <div class="timeline-description">  
          Added 15 new assets, updated 3 schemas, deprecated 2 old textures  
         </div>  
        </div>  
       </div>  
       <div class="timeline-item">  
        <div class="timeline-content">  
         <div class="timeline-title">  
          v15.2.0 Deployed  
         </div>  
         <div class="timeline-meta">  
          Platform Engineer • 2 days ago  
         </div>  
         <div class="timeline-description">  
          Major schema update with new ui_illustration class  
         </div>  
        </div>  
       </div>  
       <div class="timeline-item">  
        <div class="timeline-content">  
         <div class="timeline-title">  
          v15.1.3 Deployed  
         </div>  
         <div class="timeline-meta">  
          Platform Engineer • 5 days ago  
         </div>  
         <div class="timeline-description">  
          Hotfix for CDN cache invalidation issue  
         </div>  
        </div>  
       </div>  
      </div>  
     </div>  
     <div class="card" style="margin-top: 24px;">  
      <div class="card-title">  
       Deployment Actions  
      </div>  
      <div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;"><button class="btn"> <span>🚀</span> Deploy New Version </button> <button class="btn" style="background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);"> <span>↩️</span> Rollback to v15.2.0 </button> <button class="btn"> <span>🔄</span> Invalidate CDN Cache </button>  
      </div>  
     </div>  
    </section>  
   </main>  
  </div><!-- Asset Detail Modal -->  
  <div class="modal" id="asset-modal">  
   <div class="modal-content">  
    <div class="modal-header">  
     <h2 class="modal-title">Asset Details</h2><button class="modal-close" onclick="closeModal()">×</button>  
    </div>  
    <div id="modal-body"><!-- Asset details will be inserted here -->  
    </div>  
   </div>  
  </div>  
  <script>  
    // Sample Data  
    const sampleAssets = [  
      {  
        id: 'hero_recoveryos_field_001',  
        kind: 'image',  
        asset_class: 'hero',  
        status: 'approved',  
        surface: 'mkt_home',  
        component: 'hero_keynote',  
        altitude: 'companion',  
        icon: '🏔️'  
      },  
      {  
        id: 'atmosphere_cmd_portal_001',  
        kind: 'video',  
        asset_class: 'atmosphere',  
        status: 'approved',  
        surface: 'cmd_center',  
        component: 'portal_shell',  
        altitude: 'command_center',  
        icon: '🌌'  
      },  
      {  
        id: 'proof_recoveryos_chain_001',  
        kind: 'image',  
        asset_class: 'proof',  
        status: 'deprecated',  
        surface: 'sys_recovery',  
        component: 'proof_mark',  
        altitude: 'console',  
        icon: '🔗'  
      },  
      {  
        id: 'texture_cmp_glass_001',  
        kind: 'image',  
        asset_class: 'ui_texture',  
        status: 'approved',  
        surface: 'cmp_player',  
        component: 'texture_overlay',  
        altitude: 'companion',  
        icon: '✨'  
      },  
      {  
        id: 'motion_cmp_flow_001',  
        kind: 'video',  
        asset_class: 'motion_loop',  
        status: 'draft',  
        surface: 'cmp_editor',  
        component: 'motion_loop',  
        altitude: 'companion',  
        icon: '🌊'  
      },  
      {  
        id: 'icon_sys_boot_001',  
        kind: 'image',  
        asset_class: 'icon',  
        status: 'approved',  
        surface: 'sys_boot',  
        component: 'ui_icon',  
        altitude: 'console',  
        icon: '⚙️'  
      },  
      {  
        id: 'hero_cmd_nexus_001',  
        kind: 'image',  
        asset_class: 'hero',  
        status: 'approved',  
        surface: 'cmd_console',  
        component: 'hero_keynote',  
        altitude: 'command_center',  
        icon: '🎯'  
      },  
      {  
        id: 'illustration_mkt_story_001',  
        kind: 'image',  
        asset_class: 'ui_illustration',  
        status: 'draft',  
        surface: 'mkt_home',  
        component: 'ui_illustration',  
        altitude: 'companion',  
        icon: '🎨'  
      }  
    ];  
  
    let currentAssets = [...sampleAssets];  
  
    // Navigation  
    document.querySelectorAll('.nav-item').forEach(item => {  
      item.addEventListener('click', function() {  
        const section = this.getAttribute('data-section');  
        switchSection(section);  
      });  
    });  
  
    function switchSection(sectionId) {  
      // Update nav  
      document.querySelectorAll('.nav-item').forEach(item => {  
        item.classList.remove('active');  
      });  
      document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add('active');  
  
      // Update content  
      document.querySelectorAll('.content-section').forEach(section => {  
        section.classList.remove('active');  
      });  
      document.getElementById(sectionId).classList.add('active');  
  
      // Initialize section if needed  
      if (sectionId === 'browser') {  
        renderAssets();  
      }  
    }  
  
    // Asset Browser  
    function renderAssets() {  
      const grid = document.getElementById('asset-grid');  
        
      if (currentAssets.length === 0) {  
        grid.innerHTML = `  
          <div class="empty-state">  
            <div class="empty-icon">🔍</div>  
            <div class="empty-title">No assets found</div>  
            <div class="empty-message">Try adjusting your filters or search criteria</div>  
          </div>  
        `;  
        return;  
      }  
  
      grid.innerHTML = currentAssets.map(asset => `  
        <div class="asset-card" onclick="showAssetDetail('${asset.id}')">  
          <div class="asset-preview">${asset.icon}</div>  
          <div class="asset-info">  
            <div class="asset-id">${asset.id}</div>  
            <div class="asset-meta">  
              <span class="badge badge-${asset.status}">${asset.status}</span>  
              <span class="badge" style="background: rgba(102, 126, 234, 0.2); color: #667eea; border: 1px solid rgba(102, 126, 234, 0.3);">${asset.kind}</span>  
            </div>  
          </div>  
        </div>  
      `).join('');  
    }  
  
    // Filters  
    document.getElementById('filter-surface')?.addEventListener('change', applyFilters);  
    document.getElementById('filter-component')?.addEventListener('change', applyFilters);  
    document.getElementById('filter-status')?.addEventListener('change', applyFilters);  
    document.getElementById('filter-search')?.addEventListener('input', applyFilters);  
  
    function applyFilters() {  
      const surface = document.getElementById('filter-surface')?.value || '';  
      const component = document.getElementById('filter-component')?.value || '';  
      const status = document.getElementById('filter-status')?.value || '';  
      const search = document.getElementById('filter-search')?.value.toLowerCase() || '';  
  
      currentAssets = sampleAssets.filter(asset => {  
        const matchSurface = !surface || asset.surface === surface;  
        const matchComponent = !component || asset.component === component;  
        const matchStatus = !status || asset.status === status;  
        const matchSearch = !search ||   
          asset.id.toLowerCase().includes(search) ||   
          asset.asset_class.toLowerCase().includes(search);  
  
        return matchSurface && matchComponent && matchStatus && matchSearch;  
      });  
  
      renderAssets();  
    }  
  
    // Asset Detail Modal  
    function showAssetDetail(assetId) {  
      const asset = sampleAssets.find(a => a.id === assetId);  
      if (!asset) return;  
  
      const modalBody = document.getElementById('modal-body');  
      modalBody.innerHTML = `  
        <div class="detail-row">  
          <div class="detail-label">Asset ID</div>  
          <div class="detail-value">${asset.id}</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Kind</div>  
          <div class="detail-value">${asset.kind}</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Asset Class</div>  
          <div class="detail-value">${asset.asset_class}</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Status</div>  
          <div class="detail-value">${asset.status}</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Surface</div>  
          <div class="detail-value">${asset.surface}</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Component</div>  
          <div class="detail-value">${asset.component}</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Altitude</div>  
          <div class="detail-value">${asset.altitude}</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Approved By</div>  
          <div class="detail-value">governance@platform</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Approved At</div>  
          <div class="detail-value">2026-01-10T12:00:00Z</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Consent Scope</div>  
          <div class="detail-value">["public", "internal"]</div>  
        </div>  
        <div class="detail-row">  
          <div class="detail-label">Integrity Hash</div>  
          <div class="detail-value">sha256-9f8a7b...</div>  
        </div>  
      `;  
  
      document.getElementById('asset-modal').classList.add('active');  
    }  
  
    function closeModal() {  
      document.getElementById('asset-modal').classList.remove('active');  
    }  
  
    // Close modal on outside click  
    document.getElementById('asset-modal').addEventListener('click', function(e) {  
      if (e.target === this) {  
        closeModal();  
      }  
    });  
  
    // Validation Functions  
    function validateAssetName() {  
      const name = document.getElementById('validate-name').value.trim();  
      const resultsDiv = document.getElementById('validation-results');  
  
      if (!name) {  
        resultsDiv.innerHTML = `  
          <div class="result-item error">  
            <div class="result-title">❌ Validation Error</div>  
            <div class="result-message">Please enter an asset name to validate</div>  
          </div>  
        `;  
        return;  
      }  
  
      const results = [];  
      const parts = name.split('_');  
  
      // Check format  
      if (!/^[a-z0-9_]+$/.test(name)) {  
        results.push({  
          type: 'error',  
          title: 'Invalid Characters',  
          message: 'Asset name must use only lowercase letters, numbers, and underscores'  
        });  
      }  
  
      // Check structure  
      if (parts.length < 4) {  
        results.push({  
          type: 'error',  
          title: 'Invalid Structure',  
          message: 'Asset name must follow: <asset_class>_<surface>_<component>_<descriptor>_<index>'  
        });  
      }  
  
      // Check asset class  
      const validClasses = ['hero', 'atmosphere', 'system', 'proof', 'icon', 'ui_texture', 'ui_illustration', 'motion_loop', 'audio_bed', 'lottie'];  
      if (parts.length > 0 && !validClasses.includes(parts[0])) {  
        results.push({  
          type: 'warning',  
          title: 'Unknown Asset Class',  
          message: `"${parts[0]}" is not a recognized asset class`  
        });  
      }  
  
      // Check index format  
      if (parts.length > 0) {  
        const lastPart = parts[parts.length - 1];  
        if (!/^\d{3}$/.test(lastPart)) {  
          results.push({  
            type: 'warning',  
            title: 'Invalid Index Format',  
            message: 'Index should be a three-digit number (e.g., 001, 002)'  
          });  
        }  
      }  
  
      // Success case  
      if (results.length === 0) {  
        results.push({  
          type: 'success',  
          title: 'Valid Asset Name',  
          message: `"${name}" follows the universal naming grammar correctly`  
        });  
      }  
  
      resultsDiv.innerHTML = results.map(r => `  
        <div class="result-item ${r.type}">  
          <div class="result-title">${r.type === 'success' ? '✓' : r.type === 'error' ? '❌' : '⚠️'} ${r.title}</div>  
          <div class="result-message">${r.message}</div>  
        </div>  
      `).join('');  
    }  
  
    function validateRegistry() {  
      const registryText = document.getElementById('validate-registry').value.trim();  
      const resultsDiv = document.getElementById('validation-results');  
  
      if (!registryText) {  
        resultsDiv.innerHTML = `  
          <div class="result-item error">  
            <div class="result-title">❌ Validation Error</div>  
            <div class="result-message">Please paste a registry JSON to validate</div>  
          </div>  
        `;  
        return;  
      }  
  
      const results = [];  
  
      // Try to parse JSON  
      let registry;  
      try {  
        registry = JSON.parse(registryText);  
        results.push({  
          type: 'success',  
          title: 'Valid JSON',  
          message: 'Registry JSON is well-formed and parseable'  
        });  
      } catch (e) {  
        results.push({  
          type: 'error',  
          title: 'Invalid JSON',  
          message: `Parse error: ${e.message}`  
        });  
        resultsDiv.innerHTML = results.map(r => `  
          <div class="result-item ${r.type}">  
            <div class="result-title">❌ ${r.title}</div>  
            <div class="result-message">${r.message}</div>  
          </div>  
        `).join('');  
        return;  
      }  
  
      // Check required fields  
      if (!registry.version) {  
        results.push({  
          type: 'error',  
          title: 'Missing Version',  
          message: 'Registry must include a "version" field'  
        });  
      }  
  
      if (!registry.assets || !Array.isArray(registry.assets)) {  
        results.push({  
          type: 'error',  
          title: 'Missing Assets Array',  
          message: 'Registry must include an "assets" array'  
        });  
      } else {  
        results.push({  
          type: 'success',  
          title: 'Valid Structure',  
          message: `Registry contains ${registry.assets.length} asset entries`  
        });  
  
        // Validate first few assets  
        const assetsToCheck = registry.assets.slice(0, 5);  
        assetsToCheck.forEach((asset, idx) => {  
          const required = ['id', 'kind', 'asset_class', 'status'];  
          const missing = required.filter(field => !asset[field]);  
            
          if (missing.length > 0) {  
            results.push({  
              type: 'warning',  
              title: `Asset ${idx + 1} Missing Fields`,  
              message: `Missing: ${missing.join(', ')}`  
            });  
          }  
        });  
      }  
  
      resultsDiv.innerHTML = results.map(r => `  
        <div class="result-item ${r.type}">  
          <div class="result-title">${r.type === 'success' ? '✓' : r.type === 'error' ? '❌' : '⚠️'} ${r.title}</div>  
          <div class="result-message">${r.message}</div>  
        </div>  
      `).join('');  
    }  
  
    // Pipeline Simulator  
    function runPipeline() {  
      const btn = document.getElementById('run-pipeline-btn');  
      btn.disabled = true;  
      btn.innerHTML = '<span>⏳</span> Running Pipeline...';  
  
      const stages = [  
        { id: 1, duration: 1000, details: 'Webhook received: new_export_batch_47.zip' },  
        { id: 2, duration: 1500, details: 'Validated 8 assets, all naming conventions correct' },  
        { id: 3, duration: 2500, details: 'Generated 24 renditions (AVIF, WebP, MP4)' },  
        { id: 4, duration: 2000, details: 'Uploaded 156 MB to CDN storage' },  
        { id: 5, duration: 1000, details: 'Registry updated to v15.2.2' },  
        { id: 6, duration: 800, details: 'Governance notification sent successfully' }  
      ];  
  
      let currentStage = 0;  
  
      function runStage() {  
        if (currentStage >= stages.length) {  
          btn.disabled = false;  
          btn.innerHTML = '<span>✓</span> Pipeline Complete';  
          setTimeout(() => {  
            btn.innerHTML = '<span>▶️</span> Run Pipeline Simulation';  
            resetPipeline();  
          }, 2000);  
          return;  
        }  
  
        const stage = stages[currentStage];  
        const statusEl = document.getElementById(`stage${stage.id}-status`);  
        const progressEl = document.getElementById(`stage${stage.id}-progress`);  
        const detailsEl = document.getElementById(`stage${stage.id}-details`);  
  
        statusEl.textContent = 'Running';  
        statusEl.className = 'stage-status status-running';  
        detailsEl.textContent = stage.details;  
  
        let progress = 0;  
        const interval = setInterval(() => {  
          progress += 5;  
          progressEl.style.width = `${progress}%`;  
  
          if (progress >= 100) {  
            clearInterval(interval);  
            statusEl.textContent = 'Complete';  
            statusEl.className = 'stage-status status-complete';  
            currentStage++;  
            setTimeout(runStage, 300);  
          }  
        }, stage.duration / 20);  
      }  
  
      runStage();  
    }  
  
    function resetPipeline() {  
      for (let i = 1; i <= 6; i++) {  
        document.getElementById(`stage${i}-status`).textContent = 'Pending';  
        document.getElementById(`stage${i}-status`).className = 'stage-status status-pending';  
        document.getElementById(`stage${i}-progress`).style.width = '0%';  
      }  
    }  
  
    // Initialize  
    renderAssets();  
  </script>  
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9bc092e7e75a9a7c',t:'MTc2ODA5NDI0MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>  
</html>  
