/**
 * RAW PLAYER TYPES - V3 READY
 * Core interfaces for content players
 */

export type PlayerMode = 'single' | 'queue' | 'infinite';

export interface RawPlayerProps {
  mode: PlayerMode;
  content: RawContentItem[];
  onComplete?: (contentId: string, response: any) => void;
  onClose?: () => void;
  showProgress?: boolean;
  allowSkip?: boolean;
}

export interface RawContentItem {
  id: string;
  type: 'navicue' | 'video' | 'article' | 'practice' | 'reflection';
  title?: string;
  content: any; // Type-specific content
  responseRequired?: boolean;
  responseType?: string;
}

export interface PlayerState {
  currentIndex: number;
  totalItems: number;
  isPlaying: boolean;
  responses: Record<string, any>;
}