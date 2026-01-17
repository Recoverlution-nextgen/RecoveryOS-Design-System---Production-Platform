/**
 * ✨✨✨ LIVE PRICING PAGE V2 - EXHIBITION READY ✨✨✨
 * 
 * MARKETING PRICING PAGE V2 - STRATEGIC ELEVATION
 * Route: /pricing → MarketingPricingPageV2
 * Status: 🟢 LIVE & COMPLETE - November 5, 2025
 * 
 * Mission: Strategic positioning through evidence and elegance
 * Philosophy: High-level power content with Apple precision
 * 
 * HERO: Universal hero system aligned (responsive heights, typography locked)
 * - Eyebrow: "ECONOMICS THAT EXTEND" (direct bridge to Section 2)
 * - Headline: "Continuity that Converts" (dual meaning: patient continuity + sales conversion)
 * - Strategic Alignment: Hero → Section 2 "Relationship Architecture - Economics That Extend"
 * 
 * STRUCTURE:
 * 1. Hero - Universal hero system (mobile 600/700px, desktop 21:9 aspect ratio)
 * 2. Economics That Compound - TileGridSectionClass + TileClass (UNIVERSAL)
 * 3. Platform Tiers - Core + Enterprise (glass cards with product assets)
 * 4. Evidence of Value - TileGridSectionClass + TileClass (UNIVERSAL)
 * 5. Final CTA (Clean pattern with purple gradient)
 * 
 * Created: November 1, 2025 - Strategic Reimagination
 * Finalized: November 1, 2025 - Exhibition Grade Complete
 * Hero Update: November 4, 2025 - Universal Hero System Aligned
 * Renamed: November 5, 2025 - Phase 5: V2 Naming Standardization
 * Universal Tiles: November 5, 2025 - Phase 6: Tile Consolidation Complete
 */

import { Shield, Sparkles, Layers, Building2, ArrowRight, Lock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { MarketingHeader } from '../MarketingHeader';
import { MarketingFooter } from '../MarketingFooter';
import { SEOHead } from '../SEOHead';
import { getPageSEO } from '../../utils/seo';
import FinalCTAClean from '../FinalCTAClean';
import { HeroClass } from '../marketing/universal/HeroClass';
import { CentralisedHeadlineClass } from '../marketing/universal/CentralisedHeadlineClass';
import { PricingPageEconomics } from '../PricingPageEconomics';
import { PricingPageStakeholders } from '../PricingPageStakeholders';

// Hero Asset - Nov 6, 2025 Optimized
import { heroPricingOptimized } from '../../utils/heroAssets';

// Final CTA background
import pricingFinalCTAAsset from 'figma:asset/91c32174ef766e0977af71d7e3b89bc39689839a.png';

// Tier Product Images
import coreProductImage from 'figma:asset/a887cd8e5215c50628d93d8a2f8ff2423024c60a.png';
import customProductImage from 'figma:asset/ed4e6c28c332f02788872bed2848d05d883526d6.png';

// Brand colors
const BRAND = {
  offWhite: '#FAFAFA',
  cyan: '#40E0D0',
  dark: '#3E2BB8',
  mid: '#5739FB'
};

// PRICING TIERS - Exhibition Grade with Background Assets
const tiers = [
  {
    name: 'Core',
    tier: 'COMPLETE PLATFORM',
    icon: Layers,
    description: 'Three layers. One ecosystem. Everything included.',
    price: '$49',
    period: 'seat/month',
    features: [
      'Practice Foundation',
      'Continuity Engine',
      'Intelligence Layer',
      'Unlimited seats',
      'Full platform access'
    ],
    cta: 'Get Started',
    highlight: false,
    color: '#5739FB',
    asset: coreProductImage
  },
  {
    name: 'Custom',
    tier: 'ENTERPRISE',
    icon: Building2,
    description: 'Core platform plus tailored infrastructure.',
    price: 'Let\'s talk about',
    period: 'what you need',
    features: [
      'Everything in Core',
      'Custom therapeutic frameworks',
      'White label branding',
      'API integrations',
      'Dedicated success team'
    ],
    cta: 'Schedule Discovery',
    highlight: false,
    color: '#3E2BB8',
    asset: customProductImage
  }
];

interface MarketingPricingPageProps {
  onBack?: () => void;
  onScheduleDemo?: () => void;
  onNavigate?: (page: string) => void;
  onLogin?: () => void;
}

export default function MarketingPricingPage({ onBack, onScheduleDemo, onNavigate, onLogin }: MarketingPricingPageProps) {
  const seo = getPageSEO('pricing');

  return (
    <>
      <SEOHead {...seo} />
      <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
        <MarketingHeader 
          onNavigate={onNavigate}
          onEnterPlatform={onLogin}
          currentPage="pricing"
        />

        {/* 🎨 HERO - Universal Component */}
        <HeroClass
          eyebrow="ECONOMICS THAT EXTEND"
          eyebrowIcon={
            <Shield 
              size={14}
              style={{ strokeWidth: 2.5 }} 
            />
          }
          headline={
            <>
              Continuity that<br />
              <span style={{ color: '#40E0D0' }}>
                Converts.
              </span>
            </>
          }
          subheadline="Continuous care infrastructure that transforms economics, scales expertise, and delivers measurable outcomes."
          ctaText="SCHEDULE DISCOVERY"
          ctaOnClick={onScheduleDemo}
          backgroundAsset={heroPricingOptimized}
          backgroundAssetAlt="Layered blue glass architecture representing premium continuous care infrastructure"
          backgroundFilter="brightness(0.85) saturate(1.1)"
          overlayGradient="linear-gradient(180deg, rgba(10, 25, 47, 0.3) 0%, rgba(10, 25, 47, 0.1) 50%, rgba(10, 25, 47, 0.3) 100%)"
        />

        {/* ECONOMICS THAT COMPOUND - Universal Tile System */}
        <PricingPageEconomics />

        {/* PLATFORM TIERS - Keep as-is (unique pricing pattern) */}
        <section className="py-32 md:py-40" style={{ background: '#FFFFFF' }}>
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12">
            
            <CentralisedHeadlineClass
              eyebrow="TRANSPARENT PRICING"
              eyebrowIcon={<Sparkles size={18} style={{ strokeWidth: 2 }} />}
              eyebrowColor={BRAND.mid}
              headline={
                <>
                  Choose your<br /><span style={{ color: BRAND.mid }}>foundation</span>
                </>
              }
              subheadline="Core gives you everything you need. Custom tailors it to your vision."
              marginBottom="mb-20"
              containerMaxWidth="64rem"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1100px] mx-auto items-stretch">
              {tiers.map((tier, idx) => {
                const Icon = tier.icon;
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className="relative overflow-hidden group flex flex-col"
                    style={{
                      borderRadius: '0px',
                      boxShadow: '0 40px 120px rgba(64, 224, 208, 0.2), 0 20px 60px rgba(87, 57, 251, 0.15)',
                      transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
                      minHeight: '100%'
                    }}
                    whileHover={{
                      scale: 1.012,
                      y: -3,
                      boxShadow: `
                        0 28px 80px rgba(0, 0, 0, 0.12),
                        0 12px 32px rgba(87, 57, 251, 0.15)
                      `,
                      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
                    }}
                  >
                    {/* Background Asset */}
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-75" style={{ zIndex: 1 }}>
                      <img 
                        src={tier.asset}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0" 
                        style={{ 
                          background: `linear-gradient(135deg, ${tier.color}06 0%, ${tier.color}04 100%)`
                        }}
                      />
                    </div>

                    {/* Hover Glow */}
                    <div 
                      className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, ${tier.color}12 0%, transparent 50%)`,
                        filter: 'blur(20px)',
                        zIndex: 0
                      }}
                    />

                    {/* Glass Content Container */}
                    <div 
                      className="relative z-10 p-8 lg:p-10 flex flex-col h-full"
                      style={{
                        background: 'transparent',
                        borderRadius: '0px',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                        {/* Eyebrow Badge */}
                        <div 
                          className="inline-flex items-center gap-2 mb-5"
                          style={{
                            borderRadius: '0px'
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '0.625rem',
                              letterSpacing: '0.12em',
                              color: '#FFFFFF',
                              textShadow: `0 1px 2px ${tier.color}80`
                            }}
                          >
                            {tier.tier}
                          </span>
                        </div>
                        
                        {/* Product Name with Icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <Icon 
                            size={32} 
                            style={{ 
                              color: tier.color,
                              strokeWidth: 2.5
                            }} 
                          />
                          <h3 
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 800,
                              fontSize: '2.75rem',
                              letterSpacing: '-0.03em',
                              color: tier.color,
                              lineHeight: 1.1,
                              margin: 0
                            }}
                          >
                            {tier.name}
                          </h3>
                        </div>

                        {/* Description */}
                        <p 
                          style={{
                            fontSize: '0.9375rem',
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.95)',
                            marginBottom: '2rem',
                            fontWeight: 500,
                            textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)',
                            minHeight: '3.2rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {tier.description}
                        </p>

                        {/* Pricing */}
                        <div className="mb-8 pb-8 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                          <div className="flex items-baseline gap-2">
                            <span
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 900,
                                fontSize: tier.price.startsWith('$') ? '3.5rem' : '1.5rem',
                                letterSpacing: '-0.04em',
                                color: '#FFFFFF',
                                lineHeight: 1,
                                textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
                              }}
                            >
                              {tier.price}
                            </span>
                            {tier.price.startsWith('$') && (
                              <span
                                style={{
                                  fontSize: '1rem',
                                  fontWeight: 500,
                                  color: 'rgba(255, 255, 255, 0.85)',
                                  letterSpacing: '0.01em',
                                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
                                }}
                              >
                                /{tier.period}
                              </span>
                            )}
                          </div>
                          {!tier.price.startsWith('$') && (
                            <div
                              style={{
                                fontSize: '1.125rem',
                                fontWeight: 500,
                                color: 'rgba(255, 255, 255, 0.9)',
                                marginTop: '0.25rem',
                                textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)'
                              }}
                            >
                              {tier.period}
                            </div>
                          )}
                        </div>

                        {/* Features */}
                        <div className="space-y-3.5 mb-10 flex-grow">
                          {tier.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3">
                              <div 
                                className="flex-shrink-0"
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '0px',
                                  background: '#FFFFFF',
                                  marginTop: '7px',
                                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                                }}
                              />
                              <span style={{
                                fontSize: '0.9375rem',
                                lineHeight: 1.6,
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontWeight: 500,
                                textShadow: '0 1px 4px rgba(0, 0, 0, 0.25)'
                              }}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={onScheduleDemo}
                          className="group w-full relative inline-flex items-center justify-center gap-3 py-4 overflow-hidden transition-all duration-400"
                          style={{
                            borderRadius: '0px',
                            background: 'rgba(64, 224, 208, 0.08)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            cursor: 'pointer'
                          }}
                        >
                          <div 
                            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-400"
                            style={{ borderRadius: '0px' }}
                          />
                          
                          <span 
                            className="flex items-center gap-3"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '0.9375rem',
                              letterSpacing: '0.03em',
                              color: '#FFFFFF',
                              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
                            }}
                          >
                            {tier.cta}
                            <ArrowRight 
                              size={18} 
                              style={{ 
                                transition: 'transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                transform: 'translateX(0)'
                              }}
                              className="group-hover:translate-x-1"
                            />
                          </span>
                        </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust & Compliance Messaging */}
            <div className="max-w-[1100px] mx-auto mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* HIPAA Compliant */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-3 justify-center"
                >
                  <div 
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0px',
                      background: 'rgba(64, 224, 208, 0.08)',
                      border: '1px solid rgba(64, 224, 208, 0.15)'
                    }}
                  >
                    <Shield 
                      size={18} 
                      style={{ 
                        color: BRAND.cyan,
                        strokeWidth: 2.5
                      }} 
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: 'rgba(10, 25, 47, 0.85)',
                      letterSpacing: '0.01em'
                    }}
                  >
                    HIPAA Compliant
                  </span>
                </motion.div>

                {/* End-to-end Encryption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3 justify-center md:justify-center"
                >
                  <div 
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0px',
                      background: 'rgba(87, 57, 251, 0.06)',
                      border: '1px solid rgba(87, 57, 251, 0.12)'
                    }}
                  >
                    <Lock 
                      size={18} 
                      style={{ 
                        color: BRAND.mid,
                        strokeWidth: 2.5
                      }} 
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: 'rgba(10, 25, 47, 0.85)',
                      letterSpacing: '0.01em'
                    }}
                  >
                    End-to-end encryption
                  </span>
                </motion.div>

                {/* Training & Support */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center gap-3 justify-center"
                >
                  <div 
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0px',
                      background: 'rgba(20, 184, 166, 0.06)',
                      border: '1px solid rgba(20, 184, 166, 0.12)'
                    }}
                  >
                    <Users 
                      size={18} 
                      style={{ 
                        color: '#14B8A6',
                        strokeWidth: 2.5
                      }} 
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: 'rgba(10, 25, 47, 0.85)',
                      letterSpacing: '0.01em'
                    }}
                  >
                    Onboarding, training & support included
                  </span>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        {/* VALUE ACROSS STAKEHOLDERS - Universal Tile System */}
        <PricingPageStakeholders />

        {/* FINAL CTA - CLEAN */}
        <FinalCTAClean 
          backgroundAsset={pricingFinalCTAAsset}
          eyebrow="TRANSFORM YOUR ECONOMICS"
          headline="Ready to transform your economics?"
          accentWord="transform"
          subtext="Schedule a discovery call to explore how continuous care infrastructure delivers measurable return."
          buttonText="SCHEDULE DISCOVERY"
          onButtonClick={onScheduleDemo}
        />

        <MarketingFooter />
      </div>
    </>
  );
}