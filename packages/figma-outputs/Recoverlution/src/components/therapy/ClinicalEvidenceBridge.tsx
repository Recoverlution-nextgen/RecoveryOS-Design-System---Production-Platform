/**
 * CLINICAL EVIDENCE BRIDGE COMPONENT
 * 
 * Compact banner-style bridge section matching Section 4 style.
 * Shows 4 clinical stats proving the science behind Recoverlution.
 * 
 * Used in: Marketing Therapy Page (Section 8)
 */

import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

export function ClinicalEvidenceBridge() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/hero/lost_space.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(135deg, rgba(62, 43, 184, 0.92) 0%, rgba(87, 57, 251, 0.88) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Eyebrow */}
        <motion.div
          className="mb-4 flex items-center gap-2 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Shield size={14} style={{ color: '#40E0D0', strokeWidth: 2.5 }} />
          <span
            className="uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              color: '#40E0D0'
            }}
          >
            PROVEN IN PRACTICE
          </span>
        </motion.div>

        {/* Main Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'white',
            marginBottom: '1rem'
          }}
        >
          Validated by Science.
        </motion.h2>

        {/* Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-4xl mx-auto"
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500,
            marginBottom: '3rem'
          }}
        >
          Applied Neuroplasticity, Trauma-Aware Design, and JITAI research ensure every outcome is scientific and sustainable.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          
          {/* Stat 1 - Memory Consolidation */}
          <div className="text-center">
            <div
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'white',
                lineHeight: 1,
                marginBottom: '0.5rem'
              }}
            >
              75%
            </div>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.02em',
                marginBottom: '0.25rem'
              }}
            >
              Memory Consolidation
            </div>
            <div
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.4,
                marginBottom: '0.75rem'
              }}
            >
              when practice is experiential
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#40E0D0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              Experiential Practice
            </div>
          </div>

          {/* Stat 2 - Behaviour Change */}
          <div className="text-center">
            <div
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'white',
                lineHeight: 1,
                marginBottom: '0.5rem'
              }}
            >
              60%
            </div>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.02em',
                marginBottom: '0.25rem'
              }}
            >
              Behaviour Change
            </div>
            <div
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.4,
                marginBottom: '0.75rem'
              }}
            >
              when reflection is structured
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#40E0D0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              Structured Reflection
            </div>
          </div>

          {/* Stat 3 - Sustained Coherence */}
          <div className="text-center">
            <div
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'white',
                lineHeight: 1,
                marginBottom: '0.5rem'
              }}
            >
              72%
            </div>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.02em',
                marginBottom: '0.25rem'
              }}
            >
              Sustained Coherence
            </div>
            <div
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.4,
                marginBottom: '0.75rem'
              }}
            >
              when support adapts to context
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#40E0D0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              Adaptive Support
            </div>
          </div>

          {/* Stat 4 - Relapse Reduction */}
          <div className="text-center">
            <div
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'white',
                lineHeight: 1,
                marginBottom: '0.5rem'
              }}
            >
              24%
            </div>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.02em',
                marginBottom: '0.25rem'
              }}
            >
              Relapse Reduction
            </div>
            <div
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.4,
                marginBottom: '0.75rem'
              }}
            >
              when recovery is connected
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#40E0D0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              Connected Continuity
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
