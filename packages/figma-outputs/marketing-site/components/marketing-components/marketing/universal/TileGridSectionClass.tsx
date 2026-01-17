/**
 * TILE GRID SECTION CLASS - UNIVERSAL MULTI-TILE SECTION STANDARD
 * Created: November 5, 2025
 * Updated: November 5, 2025 - LEGACY API REMOVED
 * 
 * THE ULTIMATE CONSOLIDATION: ONE CLASS FOR ALL MULTI-TILE SECTIONS
 * 
 * CLEAN ARCHITECTURE:
 * - Section wrapper + tile grid ONLY
 * - Uses CentralisedHeadlineClass for headlines
 * - For TwoColumn headlines, use TwoColumnHeadlineClass directly in your component
 * 
 * Used across:
 * - Pricing Page: Economics, Stakeholders
 * - Demo Page: Experience, Promise
 * 
 * USAGE EXAMPLE:
 * 
 * <TileGridSectionClass
 *   background="#FFFFFF"
 *   eyebrow="THE EVIDENCE ERA"
 *   eyebrowIcon={<Zap size={16} />}
 *   eyebrowColor="#5739FB"
 *   headline={<>Economics That <span style={{ color: '#40E0D0' }}>Compound</span></>}
 *   subheadline="When recovery infrastructure scales, value multiplies across every stakeholder"
 *   tiles={tilesArray}
 *   columns={{ mobile: 1, desktop: 3 }}
 *   containerMaxWidth="max-w-[1600px]"
 * />
 */

import React from 'react';
import { TileClass } from './TileClass';
import { CentralisedHeadlineClass } from './CentralisedHeadlineClass';

interface TileGridSectionClassProps {
  /** Section background color */
  background?: 'white' | '#FAFAFA' | '#F5F3FF' | string;
  
  /** Eyebrow text (small badge above headline) */
  eyebrow?: string;
  
  /** Eyebrow icon component */
  eyebrowIcon?: React.ReactNode;
  
  /** Eyebrow color */
  eyebrowColor?: string;
  
  /** Main headline (can be JSX with accent spans) */
  headline?: React.ReactNode;
  
  /** Subheadline text */
  subheadline?: string;
  
  /** Array of tile data for rendering TileClass components */
  tiles?: Array<any>;
  
  /** Column configuration {mobile: 1, tablet: 2, desktop: 3} */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  
  /** Container max-width (e.g., "max-w-[1600px]" or "max-w-6xl") */
  containerMaxWidth?: string;
  
  /** Minimum height for tiles (e.g., "280px", "420px") */
  tileMinHeight?: string;
  
  /** Children (TileClass components) - fallback if tiles not provided */
  children?: React.ReactNode;
  
  /** Optional additional className */
  className?: string;
  
  /** Optional clean variant for tiles (removes shadows, colored backgrounds) */
  cleanVariant?: boolean;
}

/**
 * 🎨 TILE GRID SECTION CLASS - UNIVERSAL MULTI-TILE SECTION
 * 
 * The single source of truth for multi-tile sections with centered headlines.
 * For sections with TwoColumn headlines, use TwoColumnHeadlineClass directly.
 */
export function TileGridSectionClass({
  background = 'white',
  eyebrow,
  eyebrowIcon,
  eyebrowColor,
  headline,
  subheadline,
  tiles,
  columns,
  containerMaxWidth,
  tileMinHeight,
  children,
  className = '',
  cleanVariant = false
}: TileGridSectionClassProps) {
  
  // Determine grid classes from columns prop
  const getGridClasses = () => {
    if (!columns) return 'grid grid-cols-1 md:grid-cols-3 gap-8';
    const { mobile = 1, tablet, desktop = 3 } = columns;
    
    if (mobile === 1 && desktop === 1) return 'grid grid-cols-1 gap-8';
    if (mobile === 1 && desktop === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-8';
    if (mobile === 1 && desktop === 3) return 'grid grid-cols-1 md:grid-cols-3 gap-8';
    if (mobile === 1 && tablet === 2 && desktop === 4) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8';
    if (mobile === 1 && desktop === 4) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8';
    if (mobile === 1 && desktop === 5) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8';
    
    return 'grid grid-cols-1 md:grid-cols-3 gap-8';
  };
  
  // Convert background string to Tailwind class if needed
  const getBgClass = () => {
    if (background === 'white' || background === '#FFFFFF') return 'bg-white';
    if (background === '#FAFAFA') return 'bg-[#FAFAFA]';
    if (background === '#F5F3FF') return 'bg-[#F5F3FF]';
    return 'bg-white';
  };
  
  return (
    <section className={`py-32 md:py-40 ${getBgClass()} ${className}`}>
      <div className={`mx-auto px-6 md:px-10 lg:px-12 ${containerMaxWidth || 'max-w-[1600px]'}`}>
        
        {/* Header using CentralisedHeadlineClass */}
        {(eyebrow || headline || subheadline) && (
          <CentralisedHeadlineClass
            eyebrow={eyebrow}
            eyebrowIcon={eyebrowIcon}
            eyebrowColor={eyebrowColor}
            headline={headline}
            subheadline={subheadline}
            marginBottom="mb-16"
          />
        )}
        
        {/* Tiles Grid */}
        {tiles && tiles.length > 0 && (
          <div className={getGridClasses()}>
            {tiles.map((tile, index) => (
              <TileClass 
                key={index} 
                {...tile} 
                minHeight={tileMinHeight || tile.minHeight}
                cleanVariant={cleanVariant}
              />
            ))}
          </div>
        )}
        
        {/* Fallback to children if tiles not provided */}
        {!tiles && children}
        
      </div>
    </section>
  );
}

/**
 * HELPER: TileGrid wrapper (for when you just need the grid, no section wrapper)
 */
interface TileGridProps {
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: '4' | '6' | '8' | '10' | '12';
  maxWidth?: 'default' | 'narrow' | 'wide' | 'full';
  children: React.ReactNode;
  className?: string;
}

export function TileGrid({
  columns = 3,
  gap = '8',
  maxWidth = 'default',
  children,
  className = ''
}: TileGridProps) {
  const gridCols = {
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 md:grid-cols-3',
    4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
  };

  const gaps = {
    '4': 'gap-4',
    '6': 'gap-6',
    '8': 'gap-8',
    '10': 'gap-10',
    '12': 'gap-12'
  };

  const maxWidths = {
    'default': 'max-w-6xl',
    'narrow': 'max-w-5xl',
    'wide': 'max-w-7xl',
    'full': 'max-w-[1600px]'
  };

  return (
    <div className={`${gridCols[columns]} ${gaps[gap]} ${maxWidths[maxWidth]} mx-auto ${className}`}>
      {children}
    </div>
  );
}
