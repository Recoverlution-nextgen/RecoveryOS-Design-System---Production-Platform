<!doctype html>  
<html lang="en">  
 <head>  
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <title>RecoveryOS Canva Folder Structure Setup</title>  
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
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
      color: #2d3748;  
      overflow-x: hidden;  
    }  
  
    .container {  
      width: 100%;  
      height: 100%;  
      overflow-y: auto;  
      padding: 40px 20px;  
    }  
  
    .content-wrapper {  
      max-width: 1200px;  
      margin: 0 auto;  
    }  
  
    .header {  
      text-align: center;  
      margin-bottom: 48px;  
      color: white;  
    }  
  
    .header h1 {  
      font-size: 42px;  
      font-weight: 700;  
      margin-bottom: 12px;  
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);  
    }  
  
    .header p {  
      font-size: 18px;  
      opacity: 0.95;  
      font-weight: 400;  
    }  
  
    .card {  
      background: white;  
      border-radius: 16px;  
      padding: 32px;  
      margin-bottom: 24px;  
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);  
    }  
  
    .card-title {  
      font-size: 24px;  
      font-weight: 700;  
      margin-bottom: 8px;  
      color: #2d3748;  
      display: flex;  
      align-items: center;  
      gap: 12px;  
    }  
  
    .card-subtitle {  
      font-size: 15px;  
      color: #718096;  
      margin-bottom: 24px;  
      line-height: 1.6;  
    }  
  
    .folder-tree {  
      background: #f7fafc;  
      border: 2px solid #e2e8f0;  
      border-radius: 12px;  
      padding: 24px;  
      font-family: 'Courier New', monospace;  
      font-size: 14px;  
      line-height: 1.8;  
      overflow-x: auto;  
    }  
  
    .folder-item {  
      display: flex;  
      align-items: center;  
      gap: 8px;  
      padding: 6px 0;  
      position: relative;  
    }  
  
    .folder-item:hover {  
      background: rgba(102, 126, 234, 0.05);  
      border-radius: 4px;  
      padding-left: 8px;  
      margin-left: -8px;  
    }  
  
    .folder-icon {  
      font-size: 16px;  
      min-width: 20px;  
    }  
  
    .folder-name {  
      font-weight: 600;  
      color: #2d3748;  
      cursor: pointer;  
      user-select: all;  
    }  
  
    .folder-name:hover {  
      color: #667eea;  
    }  
  
    .folder-description {  
      color: #718096;  
      font-size: 13px;  
      font-family: 'Segoe UI', sans-serif;  
      margin-left: 4px;  
    }  
  
    .indent-1 { padding-left: 24px; }  
    .indent-2 { padding-left: 48px; }  
    .indent-3 { padding-left: 72px; }  
    .indent-4 { padding-left: 96px; }  
  
    .copy-btn {  
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
      color: white;  
      border: none;  
      padding: 10px 20px;  
      border-radius: 8px;  
      font-size: 14px;  
      font-weight: 600;  
      cursor: pointer;  
      transition: all 0.2s;  
      display: inline-flex;  
      align-items: center;  
      gap: 8px;  
      margin-top: 16px;  
    }  
  
    .copy-btn:hover {  
      transform: translateY(-2px);  
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);  
    }  
  
    .copy-btn:active {  
      transform: translateY(0);  
    }  
  
    .checklist {  
      list-style: none;  
    }  
  
    .checklist-item {  
      display: flex;  
      align-items: flex-start;  
      gap: 12px;  
      padding: 16px;  
      border-radius: 8px;  
      margin-bottom: 12px;  
      background: #f7fafc;  
      border: 2px solid #e2e8f0;  
      transition: all 0.2s;  
      cursor: pointer;  
    }  
  
    .checklist-item:hover {  
      background: #edf2f7;  
      border-color: #cbd5e0;  
    }  
  
    .checklist-item.completed {  
      background: #c6f6d5;  
      border-color: #68d391;  
    }  
  
    .checkbox {  
      width: 24px;  
      height: 24px;  
      border: 2px solid #cbd5e0;  
      border-radius: 6px;  
      display: flex;  
      align-items: center;  
      justify-content: center;  
      flex-shrink: 0;  
      margin-top: 2px;  
      background: white;  
      transition: all 0.2s;  
    }  
  
    .checklist-item.completed .checkbox {  
      background: #48bb78;  
      border-color: #48bb78;  
      color: white;  
    }  
  
    .checklist-content {  
      flex: 1;  
    }  
  
    .checklist-title {  
      font-weight: 600;  
      margin-bottom: 4px;  
      color: #2d3748;  
    }  
  
    .checklist-description {  
      font-size: 14px;  
      color: #718096;  
      line-height: 1.5;  
    }  
  
    .step-number {  
      display: inline-flex;  
      align-items: center;  
      justify-content: center;  
      width: 32px;  
      height: 32px;  
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
      color: white;  
      border-radius: 50%;  
      font-weight: 700;  
      font-size: 16px;  
      margin-right: 12px;  
    }  
  
    .instructions {  
      background: #fff5e6;  
      border-left: 4px solid #f59e0b;  
      padding: 20px;  
      border-radius: 8px;  
      margin-top: 24px;  
    }  
  
    .instructions-title {  
      font-weight: 700;  
      color: #92400e;  
      margin-bottom: 12px;  
      display: flex;  
      align-items: center;  
      gap: 8px;  
    }  
  
    .instructions-list {  
      list-style: none;  
      color: #78350f;  
      line-height: 1.8;  
    }  
  
    .instructions-list li {  
      padding-left: 24px;  
      position: relative;  
      margin-bottom: 8px;  
    }  
  
    .instructions-list li:before {  
      content: "→";  
      position: absolute;  
      left: 0;  
      font-weight: 700;  
      color: #f59e0b;  
    }  
  
    .copy-section {  
      background: #f7fafc;  
      border: 2px dashed #cbd5e0;  
      border-radius: 12px;  
      padding: 20px;  
      margin-top: 20px;  
    }  
  
    .copy-section-title {  
      font-weight: 600;  
      color: #2d3748;  
      margin-bottom: 12px;  
      font-size: 14px;  
      text-transform: uppercase;  
      letter-spacing: 0.5px;  
    }  
  
    .copy-list {  
      list-style: none;  
    }  
  
    .copy-list li {  
      padding: 8px 12px;  
      background: white;  
      border: 1px solid #e2e8f0;  
      border-radius: 6px;  
      margin-bottom: 8px;  
      font-family: 'Courier New', monospace;  
      font-size: 14px;  
      color: #2d3748;  
      cursor: pointer;  
      transition: all 0.2s;  
      display: flex;  
      justify-content: space-between;  
      align-items: center;  
    }  
  
    .copy-list li:hover {  
      background: #edf2f7;  
      border-color: #667eea;  
    }  
  
    .copy-indicator {  
      font-size: 12px;  
      color: #667eea;  
      opacity: 0;  
      transition: opacity 0.2s;  
    }  
  
    .copy-list li:hover .copy-indicator {  
      opacity: 1;  
    }  
  
    .progress-bar {  
      width: 100%;  
      height: 8px;  
      background: #e2e8f0;  
      border-radius: 4px;  
      overflow: hidden;  
      margin-top: 24px;  
    }  
  
    .progress-fill {  
      height: 100%;  
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);  
      border-radius: 4px;  
      transition: width 0.3s ease;  
      width: 0%;  
    }  
  
    .progress-text {  
      text-align: center;  
      margin-top: 8px;  
      font-size: 14px;  
      font-weight: 600;  
      color: #4a5568;  
    }  
  
    .badge {  
      display: inline-block;  
      padding: 4px 12px;  
      background: #e6f2ff;  
      color: #0066cc;  
      border-radius: 12px;  
      font-size: 12px;  
      font-weight: 600;  
      margin-left: 8px;  
    }  
  
    .example-section {  
      background: #f0f4f8;  
      border-left: 4px solid #667eea;  
      padding: 20px;  
      border-radius: 8px;  
      margin-top: 20px;  
    }  
  
    .example-title {  
      font-weight: 700;  
      color: #2d3748;  
      margin-bottom: 12px;  
      display: flex;  
      align-items: center;  
      gap: 8px;  
    }  
  
    .example-content {  
      font-size: 14px;  
      color: #4a5568;  
      line-height: 1.8;  
    }  
  
    .toast {  
      position: fixed;  
      bottom: 24px;  
      right: 24px;  
      background: #2d3748;  
      color: white;  
      padding: 16px 24px;  
      border-radius: 8px;  
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);  
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
        font-size: 32px;  
      }  
  
      .header p {  
        font-size: 16px;  
      }  
  
      .card {  
        padding: 24px;  
      }  
  
      .folder-tree {  
        font-size: 12px;  
      }  
  
      .indent-1 { padding-left: 16px; }  
      .indent-2 { padding-left: 32px; }  
      .indent-3 { padding-left: 48px; }  
      .indent-4 { padding-left: 64px; }  
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
     <h1>📁 Canva Folder Setup Guide</h1>  
     <p>Complete folder structure for RecoveryOS Asset Management</p>  
    </header><!-- Quick Start Instructions -->  
    <div class="card">  
     <h2 class="card-title"><span>🚀</span> Quick Start Guide</h2>  
     <p class="card-subtitle">Follow these steps to set up your Canva account structure</p>  
     <div class="instructions">  
      <div class="instructions-title"><span>💡</span> How to Create Folders in Canva  
      </div>  
      <ol class="instructions-list">  
       <li>Open your Canva homepage or projects page</li>  
       <li>Look for "Create a folder" or the folder icon in your sidebar</li>  
       <li>Click to create a new folder and name it</li>  
       <li>You can create subfolders by opening a folder and clicking "Create a folder" inside it</li>  
       <li>Use the checklist below to track your progress!</li>  
      </ol>  
     </div>  
    </div><!-- Complete Folder Structure -->  
    <div class="card">  
     <h2 class="card-title"><span>🗂️</span> Complete Folder Structure</h2>  
     <p class="card-subtitle">Visual hierarchy of all folders you need to create</p>  
     <div class="folder-tree" id="folder-tree">  
      <div class="folder-item"><span class="folder-icon">📁</span> <span class="folder-name">RecoveryOS_Assets</span> <span class="folder-description">// Root folder</span>  
      </div>  
      <div class="folder-item indent-1"><span class="folder-icon">📁</span> <span class="folder-name">01_Design_Sources</span> <span class="folder-description">// Original Canva designs</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Hero_Assets</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Atmosphere_Assets</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">System_Assets</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Proof_Assets</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">UI_Components</span>  
      </div>  
      <div class="folder-item indent-1"><span class="folder-icon">📁</span> <span class="folder-name">02_By_Surface</span> <span class="folder-description">// Organized by deployment surface</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Marketing_Home</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Companion_Player</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Companion_Editor</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Command_Console</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Command_Center</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">System_Recovery</span>  
      </div>  
      <div class="folder-item indent-1"><span class="folder-icon">📁</span> <span class="folder-name">03_Export_Queue</span> <span class="folder-description">// Ready for pipeline processing</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Ready_to_Export</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Exported_Pending_Review</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Approved_Archive</span>  
      </div>  
      <div class="folder-item indent-1"><span class="folder-icon">📁</span> <span class="folder-name">04_Work_In_Progress</span> <span class="folder-description">// Active development</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Drafts</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Iterations</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Feedback_Review</span>  
      </div>  
      <div class="folder-item indent-1"><span class="folder-icon">📁</span> <span class="folder-name">05_Templates</span> <span class="folder-description">// Reusable design templates</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Hero_Templates</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Component_Templates</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Brand_Guidelines</span>  
      </div>  
      <div class="folder-item indent-1"><span class="folder-icon">📁</span> <span class="folder-name">06_Deprecated</span> <span class="folder-description">// Old versions and archived assets</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Replaced_Assets</span>  
      </div>  
      <div class="folder-item indent-2"><span class="folder-icon">📁</span> <span class="folder-name">Version_Archive</span>  
      </div>  
     </div><button class="copy-btn" onclick="copyStructure()"> <span>📋</span> Copy All Folder Names </button>  
    </div><!-- Checklist -->  
    <div class="card">  
     <h2 class="card-title"><span>✓</span> Setup Checklist</h2>  
     <p class="card-subtitle">Track your progress as you create each folder. Click items to mark complete.</p>  
     <ul class="checklist" id="checklist">  
      <li class="checklist-item" onclick="toggleChecklistItem(0)">  
       <div class="checkbox"></div>  
       <div class="checklist-content">  
        <div class="checklist-title">  
         <span class="step-number">1</span>Create root folder: RecoveryOS_Assets  
        </div>  
        <div class="checklist-description">  
         This is your main container for all RecoveryOS assets  
        </div>  
       </div></li>  
      <li class="checklist-item" onclick="toggleChecklistItem(1)">  
       <div class="checkbox"></div>  
       <div class="checklist-content">  
        <div class="checklist-title">  
         <span class="step-number">2</span>Create 01_Design_Sources folder + 5 subfolders  
        </div>  
        <div class="checklist-description">  
         Hero_Assets, Atmosphere_Assets, System_Assets, Proof_Assets, UI_Components  
        </div>  
       </div></li>  
      <li class="checklist-item" onclick="toggleChecklistItem(2)">  
       <div class="checkbox"></div>  
       <div class="checklist-content">  
        <div class="checklist-title">  
         <span class="step-number">3</span>Create 02_By_Surface folder + 6 subfolders  
        </div>  
        <div class="checklist-description">  
         Marketing_Home, Companion_Player, Companion_Editor, Command_Console, Command_Center, System_Recovery  
        </div>  
       </div></li>  
      <li class="checklist-item" onclick="toggleChecklistItem(3)">  
       <div class="checkbox"></div>  
       <div class="checklist-content">  
        <div class="checklist-title">  
         <span class="step-number">4</span>Create 03_Export_Queue folder + 3 subfolders  
        </div>  
        <div class="checklist-description">  
         Ready_to_Export, Exported_Pending_Review, Approved_Archive  
        </div>  
       </div></li>  
      <li class="checklist-item" onclick="toggleChecklistItem(4)">  
       <div class="checkbox"></div>  
       <div class="checklist-content">  
        <div class="checklist-title">  
         <span class="step-number">5</span>Create 04_Work_In_Progress folder + 3 subfolders  
        </div>  
        <div class="checklist-description">  
         Drafts, Iterations, Feedback_Review  
        </div>  
       </div></li>  
      <li class="checklist-item" onclick="toggleChecklistItem(5)">  
       <div class="checkbox"></div>  
       <div class="checklist-content">  
        <div class="checklist-title">  
         <span class="step-number">6</span>Create 05_Templates folder + 3 subfolders  
        </div>  
        <div class="checklist-description">  
         Hero_Templates, Component_Templates, Brand_Guidelines  
        </div>  
       </div></li>  
      <li class="checklist-item" onclick="toggleChecklistItem(6)">  
       <div class="checkbox"></div>  
       <div class="checklist-content">  
        <div class="checklist-title">  
         <span class="step-number">7</span>Create 06_Deprecated folder + 2 subfolders  
        </div>  
        <div class="checklist-description">  
         Replaced_Assets, Version_Archive  
        </div>  
       </div></li>  
     </ul>  
     <div class="progress-bar">  
      <div class="progress-fill" id="progress-fill"></div>  
     </div>  
     <div class="progress-text" id="progress-text">  
      0% Complete (0 of 7 steps)  
     </div>  
    </div><!-- Copy Lists -->  
    <div class="card">  
     <h2 class="card-title"><span>📝</span> Quick Copy Lists</h2>  
     <p class="card-subtitle">Click any folder name to copy it to your clipboard</p>  
     <div class="copy-section">  
      <div class="copy-section-title">  
       Main Folders (6 folders)  
      </div>  
      <ul class="copy-list">  
       <li onclick="copyText('01_Design_Sources')"><span>01_Design_Sources</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('02_By_Surface')"><span>02_By_Surface</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('03_Export_Queue')"><span>03_Export_Queue</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('04_Work_In_Progress')"><span>04_Work_In_Progress</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('05_Templates')"><span>05_Templates</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('06_Deprecated')"><span>06_Deprecated</span> <span class="copy-indicator">Click to copy</span></li>  
      </ul>  
     </div>  
     <div class="copy-section">  
      <div class="copy-section-title">  
       Design Sources Subfolders (5 folders)  
      </div>  
      <ul class="copy-list">  
       <li onclick="copyText('Hero_Assets')"><span>Hero_Assets</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Atmosphere_Assets')"><span>Atmosphere_Assets</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('System_Assets')"><span>System_Assets</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Proof_Assets')"><span>Proof_Assets</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('UI_Components')"><span>UI_Components</span> <span class="copy-indicator">Click to copy</span></li>  
      </ul>  
     </div>  
     <div class="copy-section">  
      <div class="copy-section-title">  
       Surface Subfolders (6 folders)  
      </div>  
      <ul class="copy-list">  
       <li onclick="copyText('Marketing_Home')"><span>Marketing_Home</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Companion_Player')"><span>Companion_Player</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Companion_Editor')"><span>Companion_Editor</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Command_Console')"><span>Command_Console</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Command_Center')"><span>Command_Center</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('System_Recovery')"><span>System_Recovery</span> <span class="copy-indicator">Click to copy</span></li>  
      </ul>  
     </div>  
     <div class="copy-section">  
      <div class="copy-section-title">  
       Export Queue Subfolders (3 folders)  
      </div>  
      <ul class="copy-list">  
       <li onclick="copyText('Ready_to_Export')"><span>Ready_to_Export</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Exported_Pending_Review')"><span>Exported_Pending_Review</span> <span class="copy-indicator">Click to copy</span></li>  
       <li onclick="copyText('Approved_Archive')"><span>Approved_Archive</span> <span class="copy-indicator">Click to copy</span></li>  
      </ul>  
     </div>  
    </div><!-- Folder Purpose Guide -->  
    <div class="card">  
     <h2 class="card-title"><span>📖</span> Folder Purpose Guide</h2>  
     <p class="card-subtitle">Understand what each folder is for and how to use it</p>  
     <div class="example-section">  
      <div class="example-title"><span>📁</span> 01_Design_Sources  
      </div>  
      <div class="example-content"><strong>Purpose:</strong> Store all your original Canva design files organized by asset type.<br><strong>Use case:</strong> When you create a new hero image in Canva, save it in Hero_Assets subfolder.<br><strong>Example:</strong> "hero_recoveryos_mountain_001.png" design file goes in Hero_Assets  
      </div>  
     </div>  
     <div class="example-section">  
      <div class="example-title"><span>📁</span> 02_By_Surface  
      </div>  
      <div class="example-content"><strong>Purpose:</strong> Organize assets by where they'll be deployed (website, app, etc).<br><strong>Use case:</strong> Group all assets needed for your marketing homepage together.<br><strong>Example:</strong> All hero images, backgrounds for the homepage go in Marketing_Home  
      </div>  
     </div>  
     <div class="example-section">  
      <div class="example-title"><span>📁</span> 03_Export_Queue  
      </div>  
      <div class="example-content"><strong>Purpose:</strong> Manage the export and approval workflow.<br><strong>Use case:</strong> Move finished designs to Ready_to_Export, then to Exported_Pending_Review after export.<br><strong>Example:</strong> Approved assets move to Approved_Archive for final storage  
      </div>  
     </div>  
     <div class="example-section">  
      <div class="example-title"><span>📁</span> 04_Work_In_Progress  
      </div>  
      <div class="example-content"><strong>Purpose:</strong> Active design work and iteration.<br><strong>Use case:</strong> Save early drafts, multiple versions, and designs awaiting feedback.<br><strong>Example:</strong> "hero_mountain_v1, v2, v3" iterations stored in Iterations folder  
      </div>  
     </div>  
     <div class="example-section">  
      <div class="example-title"><span>📁</span> 05_Templates  
      </div>  
      <div class="example-content"><strong>Purpose:</strong> Reusable design templates and brand standards.<br><strong>Use case:</strong> Create master templates for consistent asset creation.<br><strong>Example:</strong> "Hero_1920x1080_Template" in Hero_Templates for quick new hero creation  
      </div>  
     </div>  
     <div class="example-section">  
      <div class="example-title"><span>📁</span> 06_Deprecated  
      </div>  
      <div class="example-content"><strong>Purpose:</strong> Archive old versions and replaced assets.<br><strong>Use case:</strong> Keep old versions for reference but mark them as no longer active.<br><strong>Example:</strong> Old logo variations or superseded hero images  
      </div>  
     </div>  
    </div><!-- Next Steps -->  
    <div class="card">  
     <h2 class="card-title"><span>🎯</span> Next Steps</h2>  
     <p class="card-subtitle">Once your folders are set up, here's what to do next</p>  
     <div class="instructions">  
      <div class="instructions-title"><span>✨</span> After Setup Is Complete  
      </div>  
      <ol class="instructions-list">  
       <li>Start creating your first hero asset in Canva</li>  
       <li>Save it in the appropriate Design_Sources subfolder</li>  
       <li>Use the universal naming convention (e.g., hero_recoveryos_field_001)</li>  
       <li>When ready to export, move design to Ready_to_Export</li>  
       <li>After exporting, move to Exported_Pending_Review</li>  
       <li>Once approved, archive in Approved_Archive</li>  
       <li>Use the platform tools to validate and track your assets</li>  
      </ol>  
     </div>  
    </div>  
   </div>  
  </div><!-- Toast Notification -->  
  <div class="toast" id="toast"><span>✓</span> <span id="toast-message">Copied to clipboard!</span>  
  </div>  
  <script>  
    // Checklist state  
    let checklistState = [false, false, false, false, false, false, false];  
  
    function toggleChecklistItem(index) {  
      checklistState[index] = !checklistState[index];  
      const items = document.querySelectorAll('.checklist-item');  
      const checkbox = items[index].querySelector('.checkbox');  
        
      if (checklistState[index]) {  
        items[index].classList.add('completed');  
        checkbox.innerHTML = '✓';  
      } else {  
        items[index].classList.remove('completed');  
        checkbox.innerHTML = '';  
      }  
  
      updateProgress();  
    }  
  
    function updateProgress() {  
      const completed = checklistState.filter(x => x).length;  
      const total = checklistState.length;  
      const percentage = Math.round((completed / total) * 100);  
  
      document.getElementById('progress-fill').style.width = percentage + '%';  
      document.getElementById('progress-text').textContent =   
        `${percentage}% Complete (${completed} of ${total} steps)`;  
    }  
  
    function copyText(text) {  
      // Create temporary textarea  
      const textarea = document.createElement('textarea');  
      textarea.value = text;  
      textarea.style.position = 'fixed';  
      textarea.style.opacity = '0';  
      document.body.appendChild(textarea);  
        
      // Select and copy  
      textarea.select();  
      document.execCommand('copy');  
        
      // Clean up  
      document.body.removeChild(textarea);  
        
      // Show toast  
      showToast(`Copied: ${text}`);  
    }  
  
    function copyStructure() {  
      const structure = `RecoveryOS_Assets/  
├── 01_Design_Sources/  
│   ├── Hero_Assets/  
│   ├── Atmosphere_Assets/  
│   ├── System_Assets/  
│   ├── Proof_Assets/  
│   └── UI_Components/  
├── 02_By_Surface/  
│   ├── Marketing_Home/  
│   ├── Companion_Player/  
│   ├── Companion_Editor/  
│   ├── Command_Console/  
│   ├── Command_Center/  
│   └── System_Recovery/  
├── 03_Export_Queue/  
│   ├── Ready_to_Export/  
│   ├── Exported_Pending_Review/  
│   └── Approved_Archive/  
├── 04_Work_In_Progress/  
│   ├── Drafts/  
│   ├── Iterations/  
│   └── Feedback_Review/  
├── 05_Templates/  
│   ├── Hero_Templates/  
│   ├── Component_Templates/  
│   └── Brand_Guidelines/  
└── 06_Deprecated/  
    ├── Replaced_Assets/  
    └── Version_Archive/`;  
  
      const textarea = document.createElement('textarea');  
      textarea.value = structure;  
      textarea.style.position = 'fixed';  
      textarea.style.opacity = '0';  
      document.body.appendChild(textarea);  
        
      textarea.select();  
      document.execCommand('copy');  
        
      document.body.removeChild(textarea);  
        
      showToast('Complete folder structure copied!');  
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
  
    // Initialize progress  
    updateProgress();  
  </script>  
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9bc0975da1fb9a7c',t:'MTc2ODA5NDQyMi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>  
</html>  
