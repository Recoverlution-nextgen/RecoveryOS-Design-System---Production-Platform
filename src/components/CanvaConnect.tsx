/**
 * CANVA CONNECT COMPONENT
 *
 * React component for Canva OAuth integration and design import
 * Handles authentication flow and asset processing pipeline
 */

import React, { useState, useEffect } from 'react';
import { CanvaAuth, CanvaAPI, AssetProcessor } from '../services/canvaConnect';

interface CanvaDesign {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  urls: {
    edit_url: string;
    view_url: string;
  };
}

interface ImportJob {
  designId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}

export function CanvaConnect() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [designs, setDesigns] = useState<CanvaDesign[]>([]);
  const [loading, setLoading] = useState(false);
  const [importJobs, setImportJobs] = useState<Map<string, ImportJob>>(new Map());
  const [selectedDesigns, setSelectedDesigns] = useState<Set<string>>(new Set());

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check if user is authenticated with Canva
   */
  async function checkAuthStatus(): Promise<void> {
    try {
      await CanvaAuth.getAccessToken();
      setIsAuthenticated(true);
      await loadDesigns();
    } catch {
      setIsAuthenticated(false);
    }
  }

  /**
   * Initiate Canva OAuth flow
   */
  async function handleConnect(): Promise<void> {
    try {
      const authUrl = await CanvaAuth.initiateAuth();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to initiate Canva auth:', error);
      alert('Failed to connect to Canva. Please try again.');
    }
  }

  /**
   * Handle OAuth callback
   */
  async function handleAuthCallback(code: string, state: string): Promise<void> {
    try {
      await CanvaAuth.exchangeCodeForToken(code, state);
      setIsAuthenticated(true);
      await loadDesigns();
    } catch (error) {
      console.error('Auth callback failed:', error);
      alert('Authentication failed. Please try again.');
    }
  }

  /**
   * Load user's Canva designs
   */
  async function loadDesigns(): Promise<void> {
    setLoading(true);
    try {
      const userDesigns = await CanvaAPI.getDesigns();
      setDesigns(userDesigns);
    } catch (error) {
      console.error('Failed to load designs:', error);
      alert('Failed to load your designs. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handle design selection
   */
  function toggleDesignSelection(designId: string): void {
    const newSelection = new Set(selectedDesigns);
    if (newSelection.has(designId)) {
      newSelection.delete(designId);
    } else {
      newSelection.add(designId);
    }
    setSelectedDesigns(newSelection);
  }

  /**
   * Import selected designs
   */
  async function importSelectedDesigns(): Promise<void> {
    if (selectedDesigns.size === 0) {
      alert('Please select at least one design to import.');
      return;
    }

    // Initialize import jobs
    const jobs = new Map<string, ImportJob>();
    selectedDesigns.forEach(designId => {
      jobs.set(designId, {
        designId,
        status: 'pending',
        progress: 0
      });
    });
    setImportJobs(jobs);

    // Process each design
    for (const designId of selectedDesigns) {
      await importDesign(designId);
    }
  }

  /**
   * Import a single design
   */
  async function importDesign(designId: string): Promise<void> {
    try {
      // Update job status
      updateJobStatus(designId, 'processing', 10);

      // Get design details
      const design = await CanvaAPI.getDesign(designId);
      updateJobStatus(designId, 'processing', 30);

      // Export design
      const exportJob = await CanvaAPI.exportDesign(designId, 'png');
      updateJobStatus(designId, 'processing', 60);

      // Process into RecoveryOS asset
      const context = {
        designId: design.id,
        exportUrl: exportJob.export_url!,
        contentCategory: 'educational-content', // Default category
        therapeuticFocus: ['general-education'],
        governanceRules: ['content-appropriateness', 'clinical-accuracy']
      };

      await AssetProcessor.processCanvaExport(context);
      updateJobStatus(designId, 'completed', 100);

    } catch (error) {
      console.error(`Failed to import design ${designId}:`, error);
      updateJobStatus(designId, 'failed', 0, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * Update import job status
   */
  function updateJobStatus(
    designId: string,
    status: ImportJob['status'],
    progress: number,
    error?: string
  ): void {
    setImportJobs(prev => {
      const newJobs = new Map(prev);
      newJobs.set(designId, {
        designId,
        status,
        progress,
        error
      });
      return newJobs;
    });
  }

  /**
   * Get job status for a design
   */
  function getJobStatus(designId: string): ImportJob | undefined {
    return importJobs.get(designId);
  }

  /**
   * Disconnect from Canva
   */
  function handleDisconnect(): void {
    localStorage.removeItem('canva_access_token');
    localStorage.removeItem('canva_refresh_token');
    localStorage.removeItem('canva_token_expires');
    setIsAuthenticated(false);
    setDesigns([]);
    setSelectedDesigns(new Set());
    setImportJobs(new Map());
  }

  // Handle OAuth callback from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      console.error('Canva auth error:', error);
      alert('Authentication failed. Please try again.');
      return;
    }

    if (code && state) {
      handleAuthCallback(code, state);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="canva-connect">
      <div className="canva-header">
        <h2>Canva Design Integration</h2>
        <p>Import your Canva designs directly into RecoveryOS assets</p>
      </div>

      {!isAuthenticated ? (
        <div className="canva-auth-section">
          <div className="auth-prompt">
            <h3>Connect Your Canva Account</h3>
            <p>
              Link your Canva account to automatically import designs as therapeutic assets.
              Your designs will be processed for optimal performance and tagged for clinical relevance.
            </p>
            <button
              className="canva-connect-btn"
              onClick={handleConnect}
            >
              <img
                src="https://static.canva.com/static/images/canva-logo-small.svg"
                alt="Canva"
                className="canva-logo"
              />
              Connect Canva Account
            </button>
          </div>
        </div>
      ) : (
        <div className="canva-dashboard">
          <div className="dashboard-header">
            <h3>Your Canva Designs</h3>
            <div className="dashboard-actions">
              <button
                className="refresh-btn"
                onClick={loadDesigns}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh Designs'}
              </button>
              <button
                className="disconnect-btn"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
          </div>

          {designs.length === 0 ? (
            <div className="no-designs">
              <p>No designs found in your Canva account.</p>
              <p>Create some designs in Canva and come back to import them!</p>
            </div>
          ) : (
            <>
              <div className="designs-grid">
                {designs.map(design => {
                  const job = getJobStatus(design.id);
                  const isSelected = selectedDesigns.has(design.id);

                  return (
                    <div
                      key={design.id}
                      className={`design-card ${isSelected ? 'selected' : ''} ${job ? 'processing' : ''}`}
                    >
                      <div className="design-thumbnail">
                        {design.thumbnail ? (
                          <img
                            src={design.thumbnail.url}
                            alt={design.title}
                            onClick={() => toggleDesignSelection(design.id)}
                            style={{ cursor: 'pointer' }}
                          />
                        ) : (
                          <div
                            className="design-placeholder"
                            onClick={() => toggleDesignSelection(design.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            No Preview
                          </div>
                        )}

                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleDesignSelection(design.id)}
                          className="design-checkbox"
                        />
                      </div>

                      <div className="design-info">
                        <h4>{design.title}</h4>
                        <p>Updated: {new Date(design.updated_at).toLocaleDateString()}</p>

                        {job && (
                          <div className="import-status">
                            <div className="status-bar">
                              <div
                                className="status-progress"
                                style={{ width: `${job.progress}%` }}
                              />
                            </div>
                            <span className={`status-text ${job.status}`}>
                              {job.status === 'processing' && 'Processing...'}
                              {job.status === 'completed' && 'Imported ✓'}
                              {job.status === 'failed' && 'Failed ✗'}
                              {job.status === 'pending' && 'Pending'}
                            </span>
                            {job.error && (
                              <p className="error-message">{job.error}</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="design-actions">
                        <a
                          href={design.urls.edit_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="edit-link"
                        >
                          Edit in Canva
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedDesigns.size > 0 && (
                <div className="import-section">
                  <div className="import-summary">
                    <p>{selectedDesigns.size} design(s) selected for import</p>
                    <button
                      className="import-btn"
                      onClick={importSelectedDesigns}
                      disabled={Array.from(importJobs.values()).some(job => job.status === 'processing')}
                    >
                      Import Selected Designs
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <style jsx>{`
        .canva-connect {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .canva-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .canva-header h2 {
          color: #333;
          margin-bottom: 10px;
        }

        .canva-header p {
          color: #666;
          font-size: 16px;
        }

        .canva-auth-section {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }

        .auth-prompt {
          text-align: center;
          max-width: 400px;
          padding: 30px;
          border: 2px dashed #ddd;
          border-radius: 10px;
        }

        .auth-prompt h3 {
          margin-bottom: 15px;
          color: #333;
        }

        .auth-prompt p {
          margin-bottom: 20px;
          color: #666;
          line-height: 1.5;
        }

        .canva-connect-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00C4CC;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .canva-connect-btn:hover {
          background: #00A8B0;
        }

        .canva-logo {
          width: 20px;
          height: 20px;
        }

        .canva-dashboard {
          margin-top: 30px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .dashboard-header h3 {
          margin: 0;
          color: #333;
        }

        .dashboard-actions {
          display: flex;
          gap: 10px;
        }

        .refresh-btn, .disconnect-btn {
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
        }

        .disconnect-btn {
          color: #d32f2f;
          border-color: #d32f2f;
        }

        .designs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .design-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .design-card:hover {
          border-color: #00C4CC;
          box-shadow: 0 2px 8px rgba(0, 196, 204, 0.1);
        }

        .design-card.selected {
          border-color: #00C4CC;
          box-shadow: 0 0 0 2px rgba(0, 196, 204, 0.2);
        }

        .design-card.processing {
          opacity: 0.7;
        }

        .design-thumbnail {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .design-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .design-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          color: #999;
          font-size: 14px;
        }

        .design-checkbox {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
        }

        .design-info {
          padding: 15px;
        }

        .design-info h4 {
          margin: 0 0 5px 0;
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .design-info p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .import-status {
          margin-top: 10px;
        }

        .status-bar {
          width: 100%;
          height: 4px;
          background: #eee;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 5px;
        }

        .status-progress {
          height: 100%;
          background: #00C4CC;
          transition: width 0.3s ease;
        }

        .status-text {
          font-size: 12px;
          font-weight: 500;
        }

        .status-text.processing {
          color: #ff9800;
        }

        .status-text.completed {
          color: #4caf50;
        }

        .status-text.failed {
          color: #f44336;
        }

        .error-message {
          color: #f44336;
          font-size: 12px;
          margin-top: 5px;
        }

        .design-actions {
          padding: 0 15px 15px 15px;
        }

        .edit-link {
          color: #00C4CC;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .edit-link:hover {
          text-decoration: underline;
        }

        .import-section {
          border-top: 1px solid #eee;
          padding-top: 20px;
          text-align: center;
        }

        .import-summary {
          display: inline-flex;
          align-items: center;
          gap: 15px;
        }

        .import-summary p {
          margin: 0;
          font-weight: 500;
          color: #333;
        }

        .import-btn {
          background: #00C4CC;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .import-btn:hover:not(:disabled) {
          background: #00A8B0;
        }

        .import-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .no-designs {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .no-designs p {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}

export default CanvaConnect;