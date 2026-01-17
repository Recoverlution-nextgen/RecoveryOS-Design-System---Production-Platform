/**
 * RAW NAVICUE TYPES - V3 READY
 * Stripped down to core interfaces, no dependencies
 */

export type NaviCueResponseType =
  | 'text' | 'voice' | 'slider' | 'spectrum' | 'dial'
  | 'bodyMap' | 'timeline' | 'mirror' | 'paradox' | 'echo'
  | 'witness' | 'curveball' | 'comparison' | 'sort' | 'constellation'
  | 'rating' | 'yesNo' | 'singleChoice' | 'multiChoice' | 'photo' | 'sketch';

export type NaviCuePillar = 'ER' | 'SR' | 'SC' | 'CR' | 'II' | 'DM';

export interface RawNaviCue {
  id: string;
  componentType: string; // 'GenericPrompt', 'BeliefProbe', etc.
  text: string;
  responseType: NaviCueResponseType;
  pillar: NaviCuePillar;
  metadata?: {
    duration?: number;
    instructor?: string;
    audioUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    backgroundImage?: string;
    subtitle?: string;
  };
}

export interface NaviCueResponse {
  navicueId: string;
  response: any; // Depends on responseType
  timestamp: Date;
}