/**
 * CONTENT RENDERER
 * 
 * Universal polymorphic renderer for ALL content types
 * Routes to appropriate renderer based on content_type
 * 
 * Supports:
 * - navicue (standard NaviCues)
 * - session_prep (session summaries)
 * - professional_message (voice/text/video messages)
 * - alumni_message (community messages)
 * - block (articles/insights/practices)
 * - video_moment (AI-extracted clips)
 * - journey_scene (13-scene journeys)
 */

import React from 'react';
import { NaviCueRenderer } from './NaviCueRenderer';
import { SessionPrepRenderer } from './renderers/SessionPrepRenderer';
import { ProfessionalMessageRenderer } from './renderers/ProfessionalMessageRenderer';
import { AlumniMessageRenderer } from './renderers/AlumniMessageRenderer';
import { BlockRenderer } from './renderers/BlockRenderer';
import { VideoMomentRenderer } from './renderers/VideoMomentRenderer';
import { JourneySceneRenderer } from './renderers/JourneySceneRenderer';

interface ContentRendererProps {
  content: any; // Polymorphic content object
  contentType: 'navicue' | 'session_prep' | 'professional_message' | 'alumni_message' | 'block' | 'video_moment' | 'journey_scene';
  onResponse?: (response: any) => void;
  onClose?: () => void;
  onNext?: () => void;
  onContentComplete?: () => void;
}

export function ContentRenderer({
  content,
  contentType,
  onResponse,
  onClose,
  onNext,
  onContentComplete
}: ContentRendererProps) {
  switch (contentType) {
    case 'navicue':
      return <NaviCueRenderer navicue={content} onContentComplete={onContentComplete} />;
    
    case 'session_prep':
      return <SessionPrepRenderer content={content} onResponse={onResponse} onClose={onClose} />;
    
    case 'professional_message':
      return <ProfessionalMessageRenderer content={content} onResponse={onResponse} onClose={onClose} />;
    
    case 'alumni_message':
      return <AlumniMessageRenderer content={content} onResponse={onResponse} onClose={onClose} />;
    
    case 'block':
      return <BlockRenderer content={content} onResponse={onResponse} onClose={onClose} />;
    
    case 'video_moment':
      return <VideoMomentRenderer content={content} onResponse={onResponse} onClose={onClose} onNext={onNext} />;
    
    case 'journey_scene':
      return <JourneySceneRenderer content={content} onResponse={onResponse} onClose={onClose} onNext={onNext} />;
    
    default:
      // Fallback to NaviCue renderer
      return <NaviCueRenderer navicue={content} onContentComplete={onContentComplete} />;
  }
}