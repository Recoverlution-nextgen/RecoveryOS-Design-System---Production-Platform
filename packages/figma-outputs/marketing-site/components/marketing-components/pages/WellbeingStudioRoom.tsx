/**
 * WELLBEING STUDIO - Command Center Room
 * 
 * 300 Premium Videos with Comprehensive Tagging
 * 
 * Features:
 * - Video library browser (filters: category, intensity, duration, pillar)
 * - Video editor (metadata, schema mapper, tag manager)
 * - NaviCue delivery configurator
 * - Bulk import tool (CSV upload for 300 videos)
 * - AI-assisted auto-tagging
 */

import React, { useState } from 'react';

interface WellbeingStudioRoomProps {
  onNavigate: (page: string) => void;
}

type VideoCategory = 'yoga' | 'fitness' | 'nutrition' | 'breathwork' | 'meditation' | 'movement';
type ViewMode = 'browser' | 'editor' | 'bulk';

export default function WellbeingStudioRoom({ onNavigate }: WellbeingStudioRoomProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('browser');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('yoga');

  return (
    <div className="platform-container" style={{ paddingTop: 'var(--spacing-7)' }}>
      {/* Header */}
      <div className="glass-primary" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
        <button
          onClick={() => onNavigate('/command-center-execution')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-none)',
            padding: 'var(--spacing-2) var(--spacing-3)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            marginBottom: 'var(--spacing-4)',
          }}
        >
          ← Back to Command Center
        </button>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>🧘</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>Wellbeing Studio</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>
          Your body is part of recovery — 300 high-end wellness videos ready for schema mapping
        </p>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {(['browser', 'editor', 'bulk'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                background: viewMode === mode ? 'rgba(87, 57, 251, 0.12)' : 'transparent',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}
            >
              {mode === 'browser' && '📚 Library Browser'}
              {mode === 'editor' && '✏️ Video Editor'}
              {mode === 'bulk' && '📦 Bulk Import'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'browser' && <LibraryBrowser selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />}
      {viewMode === 'editor' && <VideoEditor />}
      {viewMode === 'bulk' && <BulkImport />}
    </div>
  );
}

// ============================================================================
// LIBRARY BROWSER
// ============================================================================

function LibraryBrowser({ selectedCategory, onCategoryChange }: {
  selectedCategory: VideoCategory;
  onCategoryChange: (cat: VideoCategory) => void;
}) {
  const categories: VideoCategory[] = ['yoga', 'fitness', 'nutrition', 'breathwork', 'meditation', 'movement'];
  
  const mockVideos = Array.from({ length: 12 }, (_, i) => ({
    id: `${selectedCategory}-${i + 1}`,
    title: `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Practice ${i + 1}`,
    instructor: ['Maya Chen', 'James Rivera', 'Sofia Martinez', 'Alex Thompson'][i % 4],
    duration: [5, 10, 15, 20, 30, 45][i % 6],
    intensity: ['gentle', 'moderate', 'vigorous'][i % 3],
    pillar: ['ER', 'SR', 'SC'][i % 3],
    arousalFit: ['red', 'amber', 'green'][i % 3],
    tags: ['anxiety', 'sleep', 'energy', 'grounding', 'focus', 'calm'].slice(0, 3),
  }));

  return (
    <div>
      {/* Category Selector */}
      <div className="glass-primary" style={{ padding: 'var(--spacing-5)', marginBottom: 'var(--spacing-5)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--spacing-2)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              style={{
                padding: 'var(--spacing-3)',
                background: selectedCategory === cat ? 'rgba(87, 57, 251, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: selectedCategory === cat ? '1px solid rgba(87, 57, 251, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-none)',
                color: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
        {mockVideos.map(video => (
          <div key={video.id} className="glass-secondary" style={{ padding: 'var(--spacing-4)' }}>
            {/* Thumbnail Placeholder */}
            <div style={{
              width: '100%',
              height: '160px',
              background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.2) 0%, rgba(62, 43, 184, 0.1) 100%)',
              borderRadius: 'var(--radius-none)',
              marginBottom: 'var(--spacing-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-tertiary)',
              fontSize: '48px',
            }}>
              ▶️
            </div>

            <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-2)' }}>
              {video.title}
            </h3>

            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-3)' }}>
              {video.instructor} · {video.duration} min
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-3)', flexWrap: 'wrap' }}>
              <span style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                background: 'rgba(255, 255, 255, 0.05)',
                fontSize: '10px',
                borderRadius: 'var(--radius-none)',
              }}>
                {video.intensity}
              </span>
              <span style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                background: 'rgba(87, 57, 251, 0.1)',
                fontSize: '10px',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-accent)',
              }}>
                {video.pillar}
              </span>
              <span style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                background: video.arousalFit === 'red' ? 'rgba(255, 0, 0, 0.1)' : video.arousalFit === 'amber' ? 'rgba(255, 184, 0, 0.1)' : 'rgba(0, 217, 163, 0.1)',
                fontSize: '10px',
                borderRadius: 'var(--radius-none)',
              }}>
                {video.arousalFit}
              </span>
            </div>

            <button style={{
              width: '100%',
              padding: 'var(--spacing-2)',
              background: 'rgba(87, 57, 251, 0.08)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-accent)',
              cursor: 'pointer',
              fontSize: '12px',
            }}>
              Edit & Tag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// VIDEO EDITOR
// ============================================================================

function VideoEditor() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>
        Video Editor
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-5)' }}>
        {/* Main Content */}
        <div>
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              Title
            </label>
            <input
              type="text"
              placeholder="Morning Flow Yoga"
              style={{
                width: '100%',
                padding: 'var(--spacing-2)',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              Description
            </label>
            <textarea
              placeholder="Video description..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: 'var(--spacing-2)',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ background: 'rgba(87, 57, 251, 0.08)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>
              NaviCue Delivery Configuration
            </h3>
            
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
                NaviCue Intro
              </label>
              <input
                type="text"
                placeholder="Your system needs grounding. Here's a 5-min practice."
                style={{
                  width: '100%',
                  padding: 'var(--spacing-2)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-none)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Metadata</h3>
            
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Category</label>
              <select style={{
                width: '100%',
                padding: 'var(--spacing-2)',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
                marginTop: 'var(--spacing-1)',
              }}>
                <option>yoga</option>
                <option>fitness</option>
                <option>breathwork</option>
                <option>meditation</option>
              </select>
            </div>

            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Intensity</label>
              <div style={{ display: 'flex', gap: 'var(--spacing-1)', marginTop: 'var(--spacing-1)' }}>
                {['gentle', 'moderate', 'vigorous'].map(i => (
                  <button key={i} style={{
                    flex: 1,
                    padding: 'var(--spacing-1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-none)',
                    color: 'var(--color-text-primary)',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}>
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Arousal Fit</label>
              <div style={{ display: 'flex', gap: 'var(--spacing-1)', marginTop: 'var(--spacing-1)' }}>
                {['red', 'amber', 'green'].map(state => (
                  <button key={state} style={{
                    flex: 1,
                    padding: 'var(--spacing-1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-none)',
                    color: 'var(--color-text-primary)',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}>
                    {state}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: 'var(--spacing-3)',
            background: 'rgba(87, 57, 251, 0.15)',
            border: '1px solid rgba(87, 57, 251, 0.4)',
            borderRadius: 'var(--radius-none)',
            color: 'var(--color-accent)',
            cursor: 'pointer',
            marginBottom: 'var(--spacing-2)',
          }}>
            Save to Library
          </button>

          <button style={{
            width: '100%',
            padding: 'var(--spacing-2)',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-none)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}>
            Preview in Player
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BULK IMPORT
// ============================================================================

function BulkImport() {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>
        Bulk Import - 300 Wellness Videos
      </h2>

      <div style={{ marginBottom: 'var(--spacing-5)' }}>
        <div style={{
          background: 'rgba(255, 184, 0, 0.08)',
          border: '1px solid rgba(255, 184, 0, 0.3)',
          borderRadius: 'var(--radius-none)',
          padding: 'var(--spacing-4)',
        }}>
          <strong style={{ color: '#FFB800' }}>Import Strategy:</strong>
          <ol style={{ marginTop: 'var(--spacing-2)', paddingLeft: 'var(--spacing-4)', color: 'var(--color-text-secondary)' }}>
            <li>Export 300 video metadata from JWPlayer</li>
            <li>Create CSV with schema mapping columns</li>
            <li>AI-assisted tagging (title/description → auto-tags)</li>
            <li>Import into wellness_library table</li>
            <li>Manual review + schema validation</li>
            <li>Deploy 50 highest-priority videos first</li>
          </ol>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-5)' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Import CSV</h3>
          
          <div style={{
            border: '2px dashed rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-none)',
            padding: 'var(--spacing-6)',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-2)' }}>📁</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Drop CSV file here (300 videos)
            </div>
            <button style={{
              marginTop: 'var(--spacing-3)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              background: 'rgba(87, 57, 251, 0.12)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-accent)',
              cursor: 'pointer',
            }}>
              Browse Files
            </button>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
            Expected format: title, instructor, duration_minutes, category, intensity, pillar_ids, arousal_fit, tags, jwplayer_url
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>AI-Assisted Tagging</h3>
          
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
            Auto-generate tags based on title, description, and category using AI
          </p>

          <button style={{
            width: '100%',
            padding: 'var(--spacing-3)',
            background: 'rgba(87, 57, 251, 0.15)',
            border: '1px solid rgba(87, 57, 251, 0.4)',
            borderRadius: 'var(--radius-none)',
            color: 'var(--color-accent)',
            cursor: 'pointer',
            marginBottom: 'var(--spacing-2)',
          }}>
            Run AI Tagging
          </button>

          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: 'var(--spacing-3)' }}>
            AI will suggest: pillar_ids, arousal_fit, tags, best_time based on video metadata
          </div>
        </div>
      </div>
    </div>
  );
}
