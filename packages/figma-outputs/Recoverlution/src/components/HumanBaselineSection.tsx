/**
 * HUMAN BASELINE SECTION - THE PLATFORM FOUNDATION (BOOKEND SECTION 2)
 * 
 * Architectural Pattern: BOOKEND FOUNDATION SECTION
 * Now uses universal BookendSectionClass component
 * 
 * Updated: November 5, 2025 - Phase 3: Refactored to use BookendSectionClass
 */

import { Cpu, Network, Shield, Layers } from 'lucide-react';
import { BookendSectionClass } from './marketing/universal/BookendSectionClass';
import baselineAsset from 'figma:asset/c03eacfef7bc3b7b8bcdcfb23515cc3990014ea2.png';

const baselineComponents = [
  {
    id: 'os',
    label: 'OS',
    tagline: 'NEUROADAPTIVE ENGINE',
    icon: Cpu,
    color: '#5739FB'
  },
  {
    id: 'orbit',
    label: 'ORBIT',
    tagline: 'EXPONENTIAL CATALYST',
    icon: Network,
    color: '#40E0D0'
  },
  {
    id: 'proof',
    label: 'PROOF',
    tagline: 'ETHICAL CURRENCY',
    icon: Shield,
    color: '#10B981'
  }
];

export function HumanBaselineSection() {
  return (
    <BookendSectionClass
      eyebrow="THE HUMAN BASELINE"
      eyebrowIcon={
        <Layers 
          size={14} 
          style={{ color: '#FFFFFF' }} 
        />
      }
      headline={
        <>
          Load aligned to biology,<br />
          trust native,<br />
          breakthroughs in motion.
        </>
      }
      bodyCopy="Micro-dose complexity into predictable sequences. Neuroadaptive pacing meets patients where biology allows, not where schedules demand."
      tiles={baselineComponents}
      backgroundAsset={baselineAsset}
      backgroundAssetAlt="3D architectural foundation representing OS, ORBIT, and PROOF"
    />
  );
}
