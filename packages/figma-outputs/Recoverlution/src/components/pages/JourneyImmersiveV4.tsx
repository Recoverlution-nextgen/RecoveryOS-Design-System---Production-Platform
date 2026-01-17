/**
 * Journey Immersive V4 - CLEAN 13-SCENE ONLY
 * 
 * UNIVERSAL 13-SCENE ARCHITECTURE ONLY
 * No legacy baggage. No dual rendering paths. Just scenes.
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { DASHBOARD_ASSETS } from '../../utils/dashboardAssetManifest';
import { JourneyNarrator } from '../JourneyNarrator';
import { JourneyToolkitSidebar } from '../JourneyToolkitSidebar';
import { JourneySceneRenderer } from '../JourneySceneRenderer';
import { 
  fetchBlock, 
  getCurrentAssignment, 
  startBlockAssignment,
  type Block,
  type BlockAssignment
} from '../../utils/journeyV2API';
import { getSession, getCurrentUser } from '../../utils/auth';
import { publicAnonKey, projectId } from '../../utils/supabase/info';

interface JourneyImmersiveProps {
  patientId?: string | null;
  onNavigate?: (page: string) => void;
}

type ViewMode = 'loading' | 'scene';

export function JourneyImmersiveV4({ patientId, onNavigate }: JourneyImmersiveProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('loading');
  const [block, setBlock] = useState<Block | null>(null);
  const [assignment, setAssignment] = useState<BlockAssignment | null>(null);
  const [currentSequence, setCurrentSequence] = useState<number>(0);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toolkitOpen, setToolkitOpen] = useState(false);
  
  // Auth state
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [rehabId, setRehabId] = useState<string | null>(null);
  
  // Initialize
  useEffect(() => {
    async function initialize() {
      try {
        const session = getSession();
        const user = getCurrentUser();
        
        const isDemoMode = !session || !user;
        const demoRehabId = '00000000-0000-0000-0000-000000000001';
        const demoPatientId = '00000000-0000-0000-0000-000000000002';

        setAccessToken(isDemoMode ? publicAnonKey : session.access_token);
        const facilityId = isDemoMode ? demoRehabId : (user.facility_id || demoRehabId);
        setRehabId(facilityId);

        // Fetch block data
        const blockData = await fetchBlock('buy-2-seconds');
        if (!blockData || !blockData.scenes) {
          setError('Journey data unavailable. Please refresh.');
          return;
        }
        setBlock(blockData);
        
        console.log('✅ Block loaded:', {
          sceneCount: blockData.scenes.length,
          pillar: blockData.pillar_name,
          anchor: blockData.anchor
        });

        // Check for existing assignment
        const currentAssignment = await getCurrentAssignment(
          facilityId,
          isDemoMode ? demoPatientId : (patientId || user.id),
          isDemoMode ? publicAnonKey : session.access_token
        );

        if (currentAssignment) {
          setAssignment(currentAssignment);
          
          // Calculate sequence (0-indexed)
          const seq = (currentAssignment.current_day || 1) - 1;
          const maxSeq = blockData.scenes.length - 1;
          const safeSequence = Math.max(0, Math.min(seq, maxSeq));
          
          setCurrentSequence(safeSequence);
          setViewMode('scene');
        } else {
          // No assignment - start fresh at Scene 1
          await startNewAssignment(facilityId, isDemoMode ? demoPatientId : (patientId || user.id), isDemoMode ? publicAnonKey : session.access_token);
        }

        setTimeout(() => setShowContent(true), 100);
      } catch (err) {
        console.error('❌ Error initializing Journey:', err);
        setError('Failed to load Journey. Please try again.');
      }
    }

    initialize();
  }, [patientId]);

  const startNewAssignment = async (facilityId: string, userId: string, token: string) => {
    try {
      const newAssignment = await startBlockAssignment(facilityId, userId, 'buy-2-seconds', token);
      
      if (newAssignment) {
        setAssignment(newAssignment);
        setCurrentSequence(0);
        setViewMode('scene');
      } else {
        setError('Failed to start Journey');
      }
    } catch (err) {
      console.error('❌ Error starting assignment:', err);
      setError('Failed to start Journey');
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('Journey'); // Go to Journey Landing/Home page
    }
  };

  const handleSceneAction = (action: 'return' | 'continue' | 'begin' | 'ready' | 'complete') => {
    switch (action) {
      case 'return':
        if (onNavigate) {
          onNavigate('dashboard');
        }
        break;
      
      case 'continue':
      case 'begin':
      case 'ready':
        if (block && currentSequence < block.scenes.length - 1) {
          setShowContent(false);
          setTimeout(() => {
            setCurrentSequence(currentSequence + 1);
            setTimeout(() => setShowContent(true), 100);
          }, 300);
        }
        break;
      
      case 'complete':
        if (onNavigate) {
          onNavigate('dashboard');
        }
        break;
    }
  };

  const handleReflectionSubmit = async (text: string) => {
    if (!assignment || !accessToken) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/reflections`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            assignment_id: assignment.id,
            sequence: currentSequence + 1,
            input_type: 'text',
            raw_text: text
          })
        }
      );
    } catch (err) {
      console.error('❌ Error saving reflection:', err);
    }
  };

  const handleAssessmentSubmit = async (answers: any[]) => {
    if (!assignment || !accessToken) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/journey/reflections`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            assignment_id: assignment.id,
            sequence: currentSequence + 1,
            input_type: 'assessment',
            raw_text: JSON.stringify(answers)
          })
        }
      );
    } catch (err) {
      console.error('❌ Error saving assessment:', err);
    }
  };

  const renderProgressDots = () => {
    if (!block || viewMode !== 'scene') return null;
    
    return (
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        zIndex: 10
      }}>
        {block.scenes.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentSequence ? '20px' : '6px',
              height: '6px',
              background: i <= currentSequence 
                ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.85) 100%)'
                : 'rgba(255, 255, 255, 0.25)',
              boxShadow: i <= currentSequence ? '0 0 8px rgba(255, 255, 255, 0.5)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              borderRadius: '3px'
            }}
          />
        ))}
      </div>
    );
  };
  
  // LOADING
  if (viewMode === 'loading') {
    return (
      <div className="journey-immersive-container">
        <div className="journey-background">
          <ImageWithFallback
            src={DASHBOARD_ASSETS.journey}
            alt="Journey Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
        </div>
        <div className="journey-content">
          <div className="journey-card journey-reveal" style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 24px',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              borderTopColor: '#FFFFFF',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
              Loading Your Journey...
            </p>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // SCENE RENDERING
  if (viewMode === 'scene' && block && block.scenes) {
    const currentScene = block.scenes[currentSequence];
    
    if (!currentScene) {
      return (
        <div className="journey-immersive-container">
          <div className="journey-background">
            <ImageWithFallback
              src={DASHBOARD_ASSETS.journey}
              alt="Journey Background"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
            />
          </div>
          <div className="journey-content">
            <div className="journey-card journey-reveal" style={{ textAlign: 'center' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Scene not available. Please refresh.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const toolkitTags = currentScene.toolkit_tags || [];
    const pillarId = block.pillar_id || '';
    const conceptId = block.concept_id || '';

    return (
      <div className="journey-immersive-container">
        <div className="journey-background">
          <ImageWithFallback
            src={DASHBOARD_ASSETS.journey}
            alt="Journey Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          />
        </div>

        <nav className="journey-nav">
          <button onClick={handleBack} className="journey-nav-back">
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          
          <button 
            onClick={() => setToolkitOpen(true)}
            className="journey-nav-back"
          >
            <Package size={18} />
            <span>Toolkit</span>
          </button>
        </nav>

        {renderProgressDots()}

        <div className="journey-content">
          <JourneySceneRenderer
            scene={currentScene}
            block={block}
            showContent={showContent}
            anchor={block.anchor || ''}
            pillarName={block.pillar_name || ''}
            conceptName={block.concept_name || ''}
            phase={currentScene.phase || 'Experience'}
            onActionClick={handleSceneAction}
            onReflectionSubmit={handleReflectionSubmit}
            onAssessmentSubmit={handleAssessmentSubmit}
          />
        </div>

        <JourneyToolkitSidebar
          isOpen={toolkitOpen}
          onClose={() => setToolkitOpen(false)}
          tags={toolkitTags}
          pillarId={pillarId}
          conceptId={conceptId}
        />
      </div>
    );
  }

  // Error state
  return (
    <div className="journey-immersive-container">
      <div className="journey-background">
        <ImageWithFallback
          src={DASHBOARD_ASSETS.journey}
          alt="Journey Background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        />
      </div>
      <nav className="journey-nav">
        <button onClick={handleBack} className="journey-nav-back">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
      </nav>
      <div className="journey-content">
        <div className="journey-card journey-reveal" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Loading Journey...</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>
            {error || 'Please wait a moment. If this persists, try refreshing the page.'}
          </p>
          <button onClick={() => window.location.reload()} className="journey-btn journey-btn-primary">
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}