/**
 * SCIENCE PAGE SECTION 2 - THE ARCHITECTURE
 * 
 * Architectural Pattern: BOOKEND FOUNDATION SECTION (Universal Pattern)
 * Now uses universal BookendSectionClass component
 * 
 * Updated: November 6, 2025 - Converted to BookendSectionClass for universal alignment
 */

import { Sparkles } from 'lucide-react';
import { BookendSectionClass } from './marketing/universal/BookendSectionClass';
import hcpArchitectureMockup from "figma:asset/fda0f5bde0857fa59dc8b55962f0a9ed027cfab9.png";

export function SciencePageGlassSection2() {
  return (
    <BookendSectionClass
      eyebrow="THE NEW OPERATING STANDARD"
      eyebrowIcon={
        <Sparkles 
          size={14} 
          style={{ color: '#FFFFFF' }} 
        />
      }
      headline={
        <>
          The adaptive architecture<br />
          maximizing human potential.
        </>
      }
      bodyCopy="Recovery becomes building blocks that carry one operating truth, so progress transfers and returns compound across health, learning, and life."
      tiles={[]} // No tiles for this section
      backgroundAsset={hcpArchitectureMockup}
      backgroundAssetAlt="Human Cognition Platform Architecture - Six pillars interface showing Journey, Navicues, Wellbeing, Inner Compass, Library, Navigate, and Momentum"
      backgroundColor="#FAFAFA"
      shadowColor="0 48px 140px rgba(87, 57, 251, 0.35), 0 24px 72px rgba(64, 224, 208, 0.28)"
    />
  );
}
