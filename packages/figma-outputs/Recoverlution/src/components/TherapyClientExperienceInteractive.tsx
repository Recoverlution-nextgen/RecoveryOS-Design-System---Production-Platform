/**
 * THERAPY CLIENT EXPERIENCE - INTERACTIVE SHOWCASE
 * 
 * Pattern: Platform page style interactive feature showcase
 * Design: Left-aligned clickable features, right-side large visual mockup
 * DNA: infiniteK glass morphism, square borders, pattern backgrounds
 * Purpose: Show therapists what their clients actually experience
 * 
 * Created: December 8, 2025
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Clock, TrendingUp, Heart, Sparkles, Zap } from 'lucide-react';

const BRAND = {
  mid: '#5739FB',
  dark: '#3E2BB8',
  cyan: '#40E0D0',
  green: '#10B981'
};

interface ClientFeature {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  description: string;
  color: string;
  mockupAsset: string; // Large right-side visual
  patternLeft?: string; // Pattern for the left card
}

// CLIENT-FACING FEATURES
const clientFeatures: ClientFeature[] = [
  {
    id: 'precision-practices',
    name: 'Precision practices',
    icon: Target,
    tagline: 'Moments matter.',
    description: 'Two to five minute practices built for regulation when cravings hit. Evidence-based interventions designed to be completed, not abandoned.',
    color: BRAND.mid,
    mockupAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/client%20experience/Precision%20practices.avif'
  },
  {
    id: 'just-in-time',
    name: 'Just in time nudges',
    icon: Clock,
    tagline: 'Timing adapts.',
    description: 'Light prompts when patterns suggest support might help. Contextual nudges that respect autonomy without pressure or surveillance.',
    color: BRAND.cyan,
    mockupAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/client%20experience/Just%20in%20time%20nudges.avif'
  },
  {
    id: 'progress-visible',
    name: 'Progress they feel',
    icon: TrendingUp,
    tagline: 'Strength visible.',
    description: 'Shows what\'s getting stronger without guilt or shame. Privacy-protected progress that builds confidence instead of pressure.',
    color: BRAND.green,
    mockupAsset: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/client%20experience/Progress%20they%20feel.avif'
  }
];

interface FeatureCardProps {
  feature: ClientFeature;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}

const FeatureCard = ({ feature, isSelected, onClick, delay = 0 }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <div className="relative group">
      {/* Hover Glow Halo */}
      <div 
        className="absolute -inset-1.5 opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${feature.color}10 0%, transparent 70%)`,
          filter: 'blur(16px)',
          zIndex: 0
        }}
      />
      
      <motion.button
        onClick={onClick}
        className="relative text-left w-full overflow-hidden group/button"
        style={{
          background: '#FFFFFF',
          borderRadius: '0px', // SQUARE - infiniteK DNA
          border: `1px solid ${isSelected ? feature.color + '60' : 'rgba(0, 0, 0, 0.05)'}`,
          borderLeft: `3px solid ${isSelected ? feature.color : 'rgba(0, 0, 0, 0.06)'}`,
          boxShadow: isSelected 
            ? `
                0 20px 60px ${feature.color}20,
                0 8px 28px ${feature.color}14,
                0 3px 12px ${feature.color}10,
                inset 0 1px 0 rgba(255, 255, 255, 1),
                inset 1px 0 0 rgba(255, 255, 255, 0.8),
                inset -1px 0 0 rgba(255, 255, 255, 0.3)
              `
            : `
                0 1px 2px rgba(0, 0, 0, 0.03),
                0 1px 1px rgba(0, 0, 0, 0.02),
                inset 0 1px 0 rgba(255, 255, 255, 0.95),
                inset 1px 0 0 rgba(255, 255, 255, 0.5)
              `,
          padding: '1.5rem',
          transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
          transform: isSelected ? 'scale(1.012) translateX(2px)' : 'scale(1) translateX(0)',
          zIndex: 1,
          cursor: 'pointer'
        }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{
          boxShadow: isSelected 
            ? `
                0 24px 72px ${feature.color}24,
                0 12px 36px ${feature.color}16,
                0 4px 16px ${feature.color}12,
                inset 0 1px 0 rgba(255, 255, 255, 1),
                inset 1px 0 0 rgba(255, 255, 255, 0.8),
                inset -1px 0 0 rgba(255, 255, 255, 0.3)
              `
            : `
                0 8px 32px ${feature.color}14,
                0 4px 16px ${feature.color}08,
                0 2px 8px rgba(0, 0, 0, 0.04),
                inset 0 1px 0 rgba(255, 255, 255, 0.95),
                inset 1px 0 0 rgba(255, 255, 255, 0.5)
              `,
          borderLeft: `3px solid ${feature.color}`,
          border: `1px solid ${feature.color}${isSelected ? '70' : '45'}`,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
        }}
        whileTap={{
          scale: isSelected ? 1.008 : 0.998,
          transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        {/* Icon + Name + Tagline */}
        <div className="relative flex flex-col gap-2" style={{ zIndex: 2 }}>
          {/* Top Row: Icon + Name */}
          <div className="flex items-center gap-3">
            <Icon 
              size={20}
              style={{ 
                color: feature.color,
                opacity: isSelected ? 1 : 0.7,
                transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                flexShrink: 0,
                strokeWidth: 2.5
              }} 
            />
            <span
              style={{
                color: isSelected ? feature.color : '#1F2937',
                opacity: isSelected ? 1 : 0.85,
                transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                letterSpacing: '-0.01em'
              }}
              className="font-medium"
            >
              {feature.name}
            </span>
          </div>
          
          {/* Tagline */}
          <p
            style={{
              color: isSelected ? '#374151' : '#6B7280',
              fontSize: '0.8125rem',
              lineHeight: '1.25rem',
              opacity: isSelected ? 0.95 : 0.75,
              transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
              fontStyle: 'italic'
            }}
          >
            {feature.tagline}
          </p>
          
          {/* Description - only show when selected */}
          {isSelected && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              style={{
                color: '#4B5563',
                fontSize: '0.875rem',
                lineHeight: '1.5rem',
                marginTop: '0.5rem'
              }}
            >
              {feature.description}
            </motion.p>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default function TherapyClientExperienceInteractive() {
  const [selectedFeature, setSelectedFeature] = useState(clientFeatures[0]);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Header - LEFT ALIGNED PATTERN */}
        <div className="section-header-left mb-16">
          <motion.div
            className="headline-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow">
              <Sparkles size={14} style={{ strokeWidth: 2.5 }} />
              <span>CLIENT EXPERIENCE</span>
            </div>
            <h2 className="section-headline-therapy">
              Lived change.<br />
              <span className="accent">Seamless shifts.</span>
            </h2>
          </motion.div>

          <motion.div
            className="subheading-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="section-subheading">
              Small, well timed practices that fit real life. Support without pressure. Structure without friction.
            </p>
          </motion.div>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
          
          {/* LEFT: Feature Cards */}
          <div className="space-y-4">
            {clientFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isSelected={selectedFeature.id === feature.id}
                onClick={() => setSelectedFeature(feature)}
                delay={0.1 + idx * 0.1}
              />
            ))}
          </div>

          {/* RIGHT: Large Visual Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Container with color background */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '0px', // SQUARE - infiniteK DNA
                background: selectedFeature.color,
                border: `1px solid ${selectedFeature.color}30`,
                boxShadow: `
                  0 20px 60px ${selectedFeature.color}18,
                  0 8px 28px ${selectedFeature.color}12,
                  0 3px 12px ${selectedFeature.color}08,
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                aspectRatio: '16/10',
                minHeight: '500px'
              }}
            >
              {/* Visual Asset */}
              <motion.img
                key={selectedFeature.id}
                src={selectedFeature.mockupAsset}
                alt={`${selectedFeature.name} interface`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  mixBlendMode: 'normal'
                }}
              />
              
              {/* Subtle gradient overlay for depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${selectedFeature.color}08 0%, transparent 50%, ${selectedFeature.color}05 100%)`,
                  transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
                }}
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
