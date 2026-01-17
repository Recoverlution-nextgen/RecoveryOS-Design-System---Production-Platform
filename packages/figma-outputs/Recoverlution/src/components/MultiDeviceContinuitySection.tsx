/**
 * MULTI-DEVICE CONTINUITY SECTION
 * 
 * Architectural Pattern: BOOKEND FOUNDATION SECTION
 * Now uses universal BookendSectionClass component
 * 
 * Updated: November 5, 2025 - Phase 3: Refactored to use BookendSectionClass
 */

import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { BookendSectionClass } from './marketing/universal/BookendSectionClass';
import glassCube3D from 'figma:asset/d3337512b07be403333445260e47e23310f649c7.png';

const deviceComponents = [
  {
    id: 'desktop',
    icon: Monitor,
    label: 'DESKTOP'
  },
  {
    id: 'tablet',
    icon: Tablet,
    label: 'TABLET'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'MOBILE'
  }
];

export function MultiDeviceContinuitySection() {
  return (
    <BookendSectionClass
      eyebrow="SEAMLESS CONTINUITY"
      eyebrowIcon={
        <Monitor 
          size={14} 
          style={{ color: '#FFFFFF' }} 
        />
      }
      headline={
        <>
          One platform.<br />
          Every device.
        </>
      }
      bodyCopy="Desktop, tablet, mobile. Same experience, same data, same care. Your recovery flows with you."
      tiles={deviceComponents}
      backgroundAsset={glassCube3D}
      backgroundAssetAlt="3D glass cube with cyan lighting representing multi-device platform continuity and seamless cross-platform recovery experience architecture"
    />
  );
}
