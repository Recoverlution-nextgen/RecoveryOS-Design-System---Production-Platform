/**
 * CONTENT ASSEMBLY LAB - Command Center Room
 * 
 * Templates with coded philosophy for Articles, Insights, and Practices
 * 
 * Features:
 * - Template manager (article, insight, practice templates)
 * - Schema mapper (pillar → theme → mindblock)
 * - Content editor with NaviCue delivery configurator
 * - Preview in Universal Player
 * - Bulk import tool for AI writer scaling
 */

import React, { useState } from 'react';

interface ContentAssemblyLabRoomProps {
  onNavigate: (page: string) => void;
}

type ContentType = 'article' | 'insight' | 'practice';

export default function ContentAssemblyLabRoom({ onNavigate }: ContentAssemblyLabRoomProps) {
  const [contentType, setContentType] = useState<ContentType>('article');
  const [viewMode, setViewMode] = useState<'templates' | 'editor' | 'bulk'>('templates');

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
          <span style={{ fontSize: '40px', marginRight: 'var(--spacing-3)' }}>🔬</span>
          <h1 style={{ display: 'inline', fontSize: 'var(--font-size-display)' }}>Content Assembly Lab</h1>
        </div>

        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-5)' }}>
          Knowledge to action — templates with coded philosophy ready for AI scaling
        </p>

        {/* Content Type Selector */}
        <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          {(['article', 'insight', 'practice'] as ContentType[]).map(type => (
            <button
              key={type}
              onClick={() => setContentType(type)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                background: contentType === type ? 'rgba(87, 57, 251, 0.15)' : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: contentType === type ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
            >
              {type === 'article' && '📄 Articles (Knowing)'}
              {type === 'insight' && '💡 Insights (Believing)'}
              {type === 'practice' && '🧘 Practices (Embodying)'}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {(['templates', 'editor', 'bulk'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                background: viewMode === mode ? 'rgba(87, 57, 251, 0.08)' : 'transparent',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              {mode === 'templates' && '📋 Templates'}
              {mode === 'editor' && '✏️ Editor'}
              {mode === 'bulk' && '📦 Bulk Import'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'templates' && <TemplatesView contentType={contentType} />}
      {viewMode === 'editor' && <ContentEditor contentType={contentType} />}
      {viewMode === 'bulk' && <BulkImport contentType={contentType} />}
    </div>
  );
}

// ============================================================================
// TEMPLATES VIEW
// ============================================================================

function TemplatesView({ contentType }: { contentType: ContentType }) {
  const templates = {
    article: [
      { id: 1, name: 'Clinical Foundation', description: 'Evidence-based clinical framework', pillar: 'ER', status: 'ready' },
      { id: 2, name: 'Schema Deep Dive', description: 'Detailed schema exploration', pillar: 'CR', status: 'draft' },
      { id: 3, name: 'Recovery Science', description: 'Neuroscience + psychology integration', pillar: 'II', status: 'draft' },
    ],
    insight: [
      { id: 1, name: 'Mind Step Pattern', description: 'Belief shift micro-intervention', pillar: 'CR', status: 'ready' },
      { id: 2, name: 'Schema Awareness', description: 'Real-time pattern recognition', pillar: 'SC', status: 'draft' },
    ],
    practice: [
      { id: 1, name: 'Somatic Grounding', description: 'Body-based regulation', pillar: 'ER', status: 'ready' },
      { id: 2, name: 'Cognitive Reframe', description: 'Thought pattern interruption', pillar: 'CR', status: 'draft' },
      { id: 3, name: 'Compassion Practice', description: 'Self-compassion activation', pillar: 'SC', status: 'draft' },
    ],
  };

  return (
    <div>
      <div className="glass-primary" style={{ padding: 'var(--spacing-5)', marginBottom: 'var(--spacing-4)' }}>
        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-3)' }}>
          {contentType === 'article' && 'Article Templates'}
          {contentType === 'insight' && 'Insight Templates'}
          {contentType === 'practice' && 'Practice Templates'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          {contentType === 'article' && 'Never-been-read-before philosophy and science foundation'}
          {contentType === 'insight' && 'Mind_step NaviCue concept for belief shifts'}
          {contentType === 'practice' && 'Step-by-step embodiment frameworks'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-4)' }}>
        {templates[contentType].map(template => (
          <div key={template.id} className="glass-secondary" style={{ padding: 'var(--spacing-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
              <h3 style={{ fontSize: 'var(--font-size-lg)' }}>{template.name}</h3>
              <span style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                background: template.status === 'ready' ? 'rgba(0, 217, 163, 0.15)' : 'rgba(255, 184, 0, 0.15)',
                border: `1px solid ${template.status === 'ready' ? '#00D9A3' : '#FFB800'}`,
                borderRadius: 'var(--radius-none)',
                fontSize: '11px',
                color: template.status === 'ready' ? '#00D9A3' : '#FFB800',
                textTransform: 'uppercase',
              }}>
                {template.status}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              {template.description}
            </p>

            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-4)' }}>
              Pillar: {template.pillar}
            </div>

            <button style={{
              width: '100%',
              padding: 'var(--spacing-2)',
              background: 'rgba(87, 57, 251, 0.12)',
              border: '1px solid rgba(87, 57, 251, 0.3)',
              borderRadius: 'var(--radius-none)',
              color: 'var(--color-accent)',
              cursor: 'pointer',
              fontSize: '13px',
            }}>
              Edit Template
            </button>
          </div>
        ))}

        {/* Add New Template Card */}
        <div 
          className="glass-secondary" 
          style={{ 
            padding: 'var(--spacing-5)', 
            border: '2px dashed rgba(255, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            minHeight: '200px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-2)', opacity: 0.5 }}>+</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Create New Template
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONTENT EDITOR
// ============================================================================

function ContentEditor({ contentType }: { contentType: ContentType }) {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>
        {contentType === 'article' && 'Article Editor'}
        {contentType === 'insight' && 'Insight Editor'}
        {contentType === 'practice' && 'Practice Editor'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-5)' }}>
        {/* Main Content */}
        <div>
          {/* Title */}
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              Title
            </label>
            <input
              type="text"
              placeholder={`Enter ${contentType} title...`}
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

          {/* Content */}
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              {contentType === 'article' && 'Article Content'}
              {contentType === 'insight' && 'Core Insight'}
              {contentType === 'practice' && 'Practice Steps'}
            </label>
            <textarea
              placeholder="Enter content..."
              style={{
                width: '100%',
                minHeight: '400px',
                padding: 'var(--spacing-3)',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
                fontFamily: 'inherit',
                lineHeight: '1.6',
                resize: 'vertical',
              }}
            />
          </div>

          {/* NaviCue Delivery */}
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
                placeholder="How to introduce this as a NaviCue..."
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

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
                LUMA Prompt
              </label>
              <input
                type="text"
                placeholder="The prompt if served via LUMA..."
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

        {/* Sidebar - Schema Mapping */}
        <div>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-none)', marginBottom: 'var(--spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Schema Mapping</h3>
            
            {/* Pillar */}
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
                Pillar
              </label>
              <select style={{
                width: '100%',
                padding: 'var(--spacing-2)',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
              }}>
                <option>Emotional Regulation</option>
                <option>Stress Resilience</option>
                <option>Social Connectivity</option>
                <option>Cognitive Restructuring</option>
                <option>Identity Integration</option>
                <option>Decision Mastery</option>
              </select>
            </div>

            {/* Mindblocks */}
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
                Mindblock Targets
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-1)' }}>
                {['shame', 'control', 'perfectionism', 'worthlessness'].map(mb => (
                  <button
                    key={mb}
                    style={{
                      padding: 'var(--spacing-1) var(--spacing-2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-none)',
                      color: 'var(--color-text-tertiary)',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    {mb}
                  </button>
                ))}
              </div>
            </div>

            {/* Arousal Fit */}
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
                Arousal Fit
              </label>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                {['red', 'amber', 'green'].map(state => (
                  <button
                    key={state}
                    style={{
                      flex: 1,
                      padding: 'var(--spacing-1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-none)',
                      color: 'var(--color-text-primary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            {/* KBE Target */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
                KBE Target
              </label>
              <select style={{
                width: '100%',
                padding: 'var(--spacing-2)',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-none)',
                color: 'var(--color-text-primary)',
              }}>
                <option>knowing</option>
                <option>believing</option>
                <option>embodying</option>
              </select>
            </div>
          </div>

          {/* Actions */}
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
            Save to Supabase
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
            Preview in Universal Player
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BULK IMPORT
// ============================================================================

function BulkImport({ contentType }: { contentType: ContentType }) {
  return (
    <div className="glass-primary" style={{ padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-5)' }}>
        Bulk Import - {contentType === 'article' ? 'Articles' : contentType === 'insight' ? 'Insights' : 'Practices'}
      </h2>

      <div style={{ marginBottom: 'var(--spacing-5)' }}>
        <div style={{
          background: 'rgba(255, 184, 0, 0.08)',
          border: '1px solid rgba(255, 184, 0, 0.3)',
          borderRadius: 'var(--radius-none)',
          padding: 'var(--spacing-4)',
        }}>
          <strong style={{ color: '#FFB800' }}>AI Writer Scaling Strategy:</strong>
          <ol style={{ marginTop: 'var(--spacing-2)', paddingLeft: 'var(--spacing-4)', color: 'var(--color-text-secondary)' }}>
            <li>Create template with coded philosophy</li>
            <li>Export CSV with schema mapping</li>
            <li>Give brief to AI writer</li>
            <li>Import completed content (CSV/JSON)</li>
            <li>Validate schema + review</li>
            <li>Deploy to platform</li>
          </ol>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-5)' }}>
        {/* Import */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Import Content</h3>
          
          <div style={{
            border: '2px dashed rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-none)',
            padding: 'var(--spacing-6)',
            textAlign: 'center',
            marginBottom: 'var(--spacing-4)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-2)' }}>📁</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Drop CSV or JSON file here
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

          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            Expected format: CSV with columns: title, content, pillar_id, mindblock_ids, arousal_fit, kbe_target
          </div>
        </div>

        {/* Export Template */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 'var(--spacing-5)', borderRadius: 'var(--radius-none)' }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-3)' }}>Export AI Writer Brief</h3>
          
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
            Generate a template file with schema requirements + instructions for AI writers
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
            Export CSV Template
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
            Generate AI Writer Brief (PDF)
          </button>

          <div style={{ marginTop: 'var(--spacing-4)', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            Brief includes: coded philosophy examples, schema requirements, tone guidelines, structure templates
          </div>
        </div>
      </div>
    </div>
  );
}
