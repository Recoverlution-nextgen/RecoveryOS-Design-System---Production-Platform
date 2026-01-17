/**
 * DASHBOARD TILE CLASS - Adaptive Text Sizing Based on Tile Dimensions
 * Created: November 7, 2025
 * 
 * Font sizes adapt to tile dimensions:
 * - Journey (960×360): Largest
 * - Toolkit (680×100): Smallest (banner)
 * - State (240×460): Compact vertical
 */

import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardTileClassProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  subtitle: string;
  backgroundAsset: string;
  onClick: () => void;
  animationDelay?: number;
  width?: number;
  height?: number;
}

export function DashboardTileClass({
  icon: Icon,
  iconColor,
  title,
  subtitle,
  backgroundAsset,
  onClick,
  animationDelay = 0,
  width = 360,
  height = 360
}: DashboardTileClassProps) {
  
  // Calculate typography based on actual tile dimensions
  // Now uses clamp() for truly responsive text that scales with viewport
  const getTypography = () => {
    const area = width * height;
    
    // JOURNEY (960×360) - Largest
    if (area > 300000) {
      return {
        titleSize: 'clamp(1.5rem, 3vw, 2rem)',
        subtitleSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)',
        gap: 'clamp(3px, 0.5vw, 6px)'
      };
    }
    
    // WELLBEING (680×320) + NAVICUES (360×360) - Medium
    if (area > 200000 || (width === 360 && height === 360)) {
      return {
        titleSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
        subtitleSize: 'clamp(0.875rem, 1.6vw, 1rem)',
        gap: 'clamp(3px, 0.4vw, 5px)'
      };
    }
    
    // TOOLKIT / STATE / NAVIGATE / MOMENTUM - Standard
    return {
      titleSize: 'clamp(1.125rem, 2vw, 1.375rem)',
      subtitleSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
      gap: 'clamp(2px, 0.3vw, 4px)'
    };
  };
  
  const typo = getTypography();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: animationDelay }}
      className="relative overflow-hidden group cursor-pointer w-full h-full"
      onClick={onClick}
      style={{
        borderRadius: '0px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(87, 57, 251, 0.12)',
        transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)'
      }}
      whileHover={{
        scale: 1.012,
        y: -3,
        boxShadow: '0 28px 80px rgba(0, 0, 0, 0.12), 0 12px 32px rgba(87, 57, 251, 0.15)'
      }}
    >
      {/* Shimmer Animation Overlay - 12s cycle like heroes */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer-glass 12s ease-in-out infinite',
          borderRadius: '0px',
          zIndex: 100
        }}
      />

      {/* Asset */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <ImageWithFallback
          src={backgroundAsset}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
      </div>

      {/* Text - embedded directly */}
      <div 
        className="absolute left-6"
        style={{ 
          bottom: '24px',
          zIndex: 10 
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: typo.titleSize,
            lineHeight: 1.2,
            color: '#FFFFFF',
            marginBottom: typo.gap,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
            textTransform: 'capitalize',
            margin: 0
          }}
        >
          {title.toLowerCase()}
        </h3>

        <p
          style={{
            fontSize: typo.subtitleSize,
            lineHeight: 1.4,
            color: '#FFFFFF',
            fontWeight: 500,
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
            margin: 0,
            marginTop: typo.gap
          }}
        >
          {subtitle}
        </p>
      </div>

      <style>{`
        @keyframes shimmer-glass {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
}