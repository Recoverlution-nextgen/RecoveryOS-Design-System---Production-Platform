/**
 * Journey Toolkit Sidebar
 * Slides in from right when clicked
 * Shows relevant Library, Wellbeing, and Micro-block content filtered by tags
 * 
 * infiniteK Design System:
 * - Premium glass treatment with backdrop blur
 * - No card on card (flat content cards)
 * - Consistent 8px spacing
 * - Brand colors #3E2BB8 and #5739FB
 */

import { X, BookOpen, Heart, Target, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { microBlocks } from '../utils/microBlockData';

interface JourneyToolkitSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tags: string[]; // Current journey tags for filtering
  pillarId?: string;
  conceptId?: string;
}

export function JourneyToolkitSidebar({
  isOpen,
  onClose,
  tags,
  pillarId,
  conceptId
}: JourneyToolkitSidebarProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'wellbeing' | 'blocks'>('blocks'); // Default to blocks for demo
  
  // Filter micro-blocks by tags or pillar
  const filteredBlocks = microBlocks.filter(block => {
    // If we have a pillar, filter by pillar
    if (pillarId) {
      return block.pillar.toLowerCase().includes(pillarId.toLowerCase());
    }
    // Otherwise filter by tags
    if (tags.length > 0) {
      return tags.some(tag => 
        block.name.toLowerCase().includes(tag.toLowerCase()) ||
        block.description.toLowerCase().includes(tag.toLowerCase())
      );
    }
    return true; // Show all if no filters
  });

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease-out'
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(480px, 100vw)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          boxShadow: '-12px 0 48px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInFromRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          borderLeft: '1px solid rgba(62, 43, 184, 0.15)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: 'clamp(24px, 5vw, 32px)',
          borderBottom: '1px solid rgba(62, 43, 184, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
            fontWeight: 600,
            color: '#1a1a1a',
            letterSpacing: '-0.02em'
          }}>
            Toolkit
          </h2>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: '#666',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1a1a1a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: 'clamp(16px, 4vw, 24px) clamp(24px, 5vw, 32px)',
          borderBottom: '1px solid rgba(62, 43, 184, 0.08)'
        }}>
          {[
            { id: 'library', label: 'Library', icon: BookOpen },
            { id: 'wellbeing', label: 'Wellbeing', icon: Heart },
            { id: 'blocks', label: 'Micro-blocks', icon: Target }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: activeTab === id ? 'rgba(62, 43, 184, 0.08)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: activeTab === id ? 600 : 500,
                color: activeTab === id ? '#3E2BB8' : '#666',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== id) {
                  e.currentTarget.style.background = 'rgba(62, 43, 184, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Icon size={16} />
              <span className="journey-toolkit-tab-text">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'clamp(24px, 5vw, 32px)'
        }}>
          {activeTab === 'library' && (
            <div>
              <p style={{
                fontSize: '0.9375rem',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                Related content will appear here based on your current Journey theme.
              </p>
              
              <div style={{
                padding: '24px',
                background: 'rgba(62, 43, 184, 0.04)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <BookOpen size={32} style={{ color: '#3E2BB8', margin: '0 auto 12px' }} />
                <p style={{
                  fontSize: '0.875rem',
                  color: '#666',
                  margin: 0
                }}>
                  Library content tagged with: {tags.join(', ') || 'No tags'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'wellbeing' && (
            <div>
              <p style={{
                fontSize: '0.9375rem',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                Wellbeing resources to support your Journey.
              </p>
              
              <div style={{
                padding: '24px',
                background: 'rgba(62, 43, 184, 0.04)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <Heart size={32} style={{ color: '#3E2BB8', margin: '0 auto 12px' }} />
                <p style={{
                  fontSize: '0.875rem',
                  color: '#666',
                  margin: 0
                }}>
                  Wellbeing resources will be dynamically loaded here
                </p>
              </div>
            </div>
          )}

          {activeTab === 'blocks' && (
            <div>
              {filteredBlocks.length > 0 ? (
                <>
                  <p style={{
                    fontSize: '0.8125rem',
                    color: '#666',
                    lineHeight: '1.5',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600
                  }}>
                    {filteredBlocks.length} Micro-block{filteredBlocks.length !== 1 ? 's' : ''}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredBlocks.map((block) => (
                      <div
                        key={block.id}
                        style={{
                          padding: '20px',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(62, 43, 184, 0.12)',
                          borderRadius: '0px',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(62, 43, 184, 0.12)';
                          e.currentTarget.style.borderColor = 'rgba(62, 43, 184, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                          e.currentTarget.style.borderColor = 'rgba(62, 43, 184, 0.12)';
                        }}
                      >
                        {/* Pillar Tag */}
                        <div style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          background: 'rgba(62, 43, 184, 0.08)',
                          borderRadius: '4px',
                          marginBottom: '12px'
                        }}>
                          <span style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: '#3E2BB8',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {block.pillar}
                          </span>
                        </div>
                        
                        {/* Block Name */}
                        <h3 style={{
                          margin: '0 0 8px 0',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#1a1a1a',
                          lineHeight: '1.4',
                          letterSpacing: '-0.01em'
                        }}>
                          {block.name}
                        </h3>
                        
                        {/* Description */}
                        <p style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          color: '#666',
                          lineHeight: '1.6'
                        }}>
                          {block.description}
                        </p>
                        
                        {/* Arrow Icon */}
                        <div style={{
                          marginTop: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#3E2BB8',
                          fontSize: '0.8125rem',
                          fontWeight: 500
                        }}>
                          <span>Explore</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{
                  padding: '32px 24px',
                  background: 'rgba(62, 43, 184, 0.04)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <Target size={32} style={{ color: '#3E2BB8', margin: '0 auto 12px' }} />
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#666',
                    margin: '0 0 8px 0',
                    fontWeight: 500
                  }}>
                    No micro-blocks found
                  </p>
                  <p style={{
                    fontSize: '0.8125rem',
                    color: '#999',
                    margin: 0
                  }}>
                    {pillarId ? `For pillar: ${pillarId}` : `Tagged: ${tags.join(', ') || 'No filters'}`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .journey-toolkit-tab-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}