/**
 * HERO TEST PAGE - Glass Effect Experiments
 * 
 * Testing 5 different approaches to achieve glass-aesthetic dashboard screenshots
 * Created: October 26, 2025
 */

import { ArrowRight, Brain, Calendar, TrendingUp, Sparkles, Activity, BarChart3, Users } from "lucide-react";
import { useState } from "react";
import recoverlutionLogo from "figma:asset/7da866ea6ef2018dfd4656f74ef1f42cdc972b51.png";
import dashboardAsset from "figma:asset/c8edf26e8ed03b34a9f6b382ff2d28c54a36836e.png";

const BRAND = {
  dark: '#3E2BB8',
  mid: '#5739FB'
};

interface HeroTestPageProps {
  onBack?: () => void;
}

export function HeroTestPage({ onBack }: HeroTestPageProps) {
  const [activeTest, setActiveTest] = useState(6);

  const tests = [
    {
      id: 1,
      name: "Original (Baseline)",
      description: "Current production approach - sharp image as reference point"
    },
    {
      id: 2,
      name: "Multi-Layer Frosted",
      description: "Advanced 4-layer glass with noise texture, gradient shifts, and depth"
    },
    {
      id: 3,
      name: "Clinical Frost Ultra",
      description: "Heavy clinical glass with grain texture, blur depth, and white diffusion"
    },
    {
      id: 4,
      name: "Prismatic Crystalline",
      description: "Crystalline glass with color refraction, rainbow shifts, and light play"
    },
    {
      id: 5,
      name: "Infinite Glass Peak",
      description: "Ultimate glass combining all techniques - layered blur, noise, refraction, depth"
    },
    {
      id: 6,
      name: "Tab-Based Peak Glass 💎",
      description: "HTML-inspired peak glass with prism rotation, shimmer sweep, floating badge, and 3-tab switcher"
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-auto">
      
      {/* Quick Nav */}
      <nav 
        className="sticky top-0 z-50"
        style={{
          background: 'linear-gradient(180deg, #FEFCFF 0%, #FDFBFF 100%)',
          borderBottom: '1px solid rgba(87, 57, 251, 0.08)',
          boxShadow: '0 1px 3px rgba(62, 43, 184, 0.04)',
          backdropFilter: 'blur(32px)'
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center transition-opacity hover:opacity-70">
              <img src={recoverlutionLogo} alt="Recoverlution" className="h-8" />
            </button>
            <span className="text-gray-400 text-sm">Hero Glass Tests</span>
          </div>

          <div className="flex items-center gap-2">
            {tests.map(test => (
              <button
                key={test.id}
                onClick={() => setActiveTest(test.id)}
                className={`px-4 py-2 text-xs transition-all ${
                  activeTest === test.id 
                    ? 'bg-[#3E2BB8] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{ borderRadius: '0px', fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                Test {test.id}
              </button>
            ))}
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs"
              style={{ borderRadius: '0px', fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              Back
            </button>
          )}
        </div>
      </nav>

      {/* Test Info Banner */}
      <div className="bg-[#F5F3FF] border-b border-[#E5E1FF] px-6 py-4">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-sm font-bold text-[#3E2BB8] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            {tests[activeTest - 1].name}
          </h2>
          <p className="text-xs text-gray-600">
            {tests[activeTest - 1].description}
          </p>
        </div>
      </div>

      {/* Render Active Test */}
      <div className="flex-1">
        {activeTest === 1 && <HeroTest1 />}
        {activeTest === 2 && <HeroTest2 />}
        {activeTest === 3 && <HeroTest3 />}
        {activeTest === 4 && <HeroTest4 />}
        {activeTest === 5 && <HeroTest5 />}
        {activeTest === 6 && <HeroTest6 />}
      </div>

    </div>
  );
}

// TEST 1: Original (Current Production)
function HeroTest1() {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2D1F6B 50%, #1A1438 100%)`,
        minHeight: 'calc(100vh - 140px)'
      }}
    >
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Copy */}
          <HeroCopy />

          {/* RIGHT: Original Approach */}
          <div className="relative">
            <div 
              className="absolute -inset-6 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
                borderRadius: '0px'
              }}
            />

            <div 
              className="relative"
              style={{
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                height: '580px'
              }}
            >
              <img
                src={dashboardAsset}
                alt="Dashboard"
                className="w-full h-full object-cover object-top"
                style={{ borderRadius: '0px' }}
              />

              <GlassBadge />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// TEST 2: Multi-Layer Frosted Glass
function HeroTest2() {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2D1F6B 50%, #1A1438 100%)`,
        minHeight: 'calc(100vh - 140px)'
      }}
    >
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          
          <HeroCopy />

          {/* RIGHT: Multi-Layer Frosted */}
          <div className="relative">
            <div 
              className="absolute -inset-6 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div 
              className="relative"
              style={{
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                height: '580px'
              }}
            >
              {/* Layer 1: Deep blur foundation */}
              <img
                src={dashboardAsset}
                alt="Dashboard Base"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  filter: 'blur(20px) saturate(1.1)',
                  opacity: 0.4
                }}
              />

              {/* Layer 2: Medium blur */}
              <img
                src={dashboardAsset}
                alt="Dashboard Mid"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  filter: 'blur(10px) brightness(1.05)',
                  opacity: 0.5
                }}
              />

              {/* Layer 3: Light blur with detail */}
              <img
                src={dashboardAsset}
                alt="Dashboard Detail"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  filter: 'blur(4px) saturate(0.95)',
                  opacity: 0.7
                }}
              />

              {/* Layer 4: Sharp detail layer */}
              <img
                src={dashboardAsset}
                alt="Dashboard"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  opacity: 0.5,
                  mixBlendMode: 'normal'
                }}
              />

              {/* Frosted glass texture overlay (noise simulation) */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255, 255, 255, 0.03) 2px,
                      rgba(255, 255, 255, 0.03) 4px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      rgba(255, 255, 255, 0.03) 2px,
                      rgba(255, 255, 255, 0.03) 4px
                    )
                  `,
                  opacity: 0.6
                }}
              />

              {/* White diffusion overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
                  mixBlendMode: 'overlay'
                }}
              />

              <GlassBadge />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// TEST 3: Clinical Frost Ultra
function HeroTest3() {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2D1F6B 50%, #1A1438 100%)`,
        minHeight: 'calc(100vh - 140px)'
      }}
    >
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          
          <HeroCopy />

          {/* RIGHT: Clinical Frost Ultra */}
          <div className="relative">
            <div 
              className="absolute -inset-6 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div 
              className="relative"
              style={{
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                height: '580px'
              }}
            >
              {/* Heavy frosted base */}
              <img
                src={dashboardAsset}
                alt="Dashboard"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  filter: 'blur(16px) brightness(1.1) saturate(0.8)',
                  opacity: 0.85
                }}
              />

              {/* White clinical diffusion - strong */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.35)',
                  mixBlendMode: 'overlay'
                }}
              />

              {/* Frosted grain texture (dense) */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 1px,
                      rgba(255, 255, 255, 0.08) 1px,
                      rgba(255, 255, 255, 0.08) 2px
                    ),
                    repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 1px,
                      rgba(255, 255, 255, 0.08) 1px,
                      rgba(255, 255, 255, 0.08) 2px
                    )
                  `,
                  opacity: 0.5
                }}
              />

              {/* Light transmission gradient */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                  mixBlendMode: 'soft-light'
                }}
              />

              {/* Depth shadow (inner) */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 0 60px rgba(255, 255, 255, 0.1)',
                  borderRadius: '0px'
                }}
              />

              {/* Ultra-fine noise (micro grain) */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    repeating-conic-gradient(
                      from 0deg at 50% 50%,
                      rgba(255, 255, 255, 0.02) 0deg,
                      transparent 0.5deg,
                      rgba(255, 255, 255, 0.02) 1deg
                    )
                  `,
                  opacity: 0.7
                }}
              />

              <GlassBadge />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// TEST 4: Prismatic Crystalline
function HeroTest4() {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2D1F6B 50%, #1A1438 100%)`,
        minHeight: 'calc(100vh - 140px)'
      }}
    >
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          
          <HeroCopy />

          {/* RIGHT: Prismatic Crystalline */}
          <div className="relative">
            <div 
              className="absolute -inset-6 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div 
              className="relative"
              style={{
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                height: '580px'
              }}
            >
              {/* Base image with slight blur */}
              <img
                src={dashboardAsset}
                alt="Dashboard"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  filter: 'blur(6px) saturate(1.2)'
                }}
              />

              {/* Rainbow refraction layer 1 (cyan-magenta) */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.06) 100%)',
                  mixBlendMode: 'screen',
                  opacity: 0.6
                }}
              />

              {/* Rainbow refraction layer 2 (purple-blue) */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(225deg, rgba(87, 57, 251, 0.12) 0%, rgba(64, 224, 208, 0.08) 100%)',
                  mixBlendMode: 'color-dodge',
                  opacity: 0.4
                }}
              />

              {/* Crystalline facet effect (diagonal bands) */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 40px,
                      rgba(255, 255, 255, 0.08) 40px,
                      rgba(255, 255, 255, 0.08) 42px,
                      transparent 42px,
                      transparent 80px,
                      rgba(87, 57, 251, 0.06) 80px,
                      rgba(87, 57, 251, 0.06) 82px
                    )
                  `,
                  mixBlendMode: 'overlay',
                  opacity: 0.7
                }}
              />

              {/* Light refraction spots */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 20% 20%, rgba(64, 224, 208, 0.15) 0%, transparent 30%),
                    radial-gradient(ellipse at 80% 40%, rgba(87, 57, 251, 0.12) 0%, transparent 35%),
                    radial-gradient(ellipse at 50% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)
                  `,
                  mixBlendMode: 'soft-light'
                }}
              />

              {/* Sharp detail overlay with color shift */}
              <img
                src={dashboardAsset}
                alt="Dashboard Detail"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  opacity: 0.35,
                  mixBlendMode: 'luminosity'
                }}
              />

              {/* Prism edge highlights */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 2px 2px 8px rgba(64, 224, 208, 0.2), inset -2px -2px 8px rgba(87, 57, 251, 0.2)',
                  borderRadius: '0px'
                }}
              />

              <GlassBadge />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// TEST 5: Infinite Glass Peak (ULTIMATE)
function HeroTest5() {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2D1F6B 50%, #1A1438 100%)`,
        minHeight: 'calc(100vh - 140px)'
      }}
    >
      {/* Advanced SVG Filters */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Multi-stage glass blur filter */}
          <filter id="infiniteGlass" x="-50%" y="-50%" width="200%" height="200%">
            {/* Stage 1: Deep blur */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur1" />
            <feColorMatrix in="blur1" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" result="blurOpacity1" />
            
            {/* Stage 2: Medium blur */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
            <feColorMatrix in="blur2" type="matrix" values="1 0 0 0 0.05  0 1 0 0 0.05  0 0 1 0 0.05  0 0 0 0.7 0" result="blurOpacity2" />
            
            {/* Stage 3: Light blur */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur3" />
            <feColorMatrix in="blur3" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" result="blurOpacity3" />
            
            {/* Combine all blur stages */}
            <feBlend in="blurOpacity1" in2="blurOpacity2" mode="normal" result="blend1" />
            <feBlend in="blend1" in2="blurOpacity3" mode="normal" result="finalBlend" />
            
            {/* Add turbulence for frosted texture */}
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="2" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="desaturatedNoise" />
            <feComponentTransfer in="desaturatedNoise" result="adjustedNoise">
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>
            
            {/* Blend noise with blurred image */}
            <feBlend in="finalBlend" in2="adjustedNoise" mode="overlay" result="texturedGlass" />
          </filter>
        </defs>
      </svg>

      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          
          <HeroCopy />

          {/* RIGHT: ULTIMATE INFINITE GLASS */}
          <div className="relative">
            {/* Enhanced purple glow */}
            <div 
              className="absolute -inset-6 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.4) 0%, rgba(64, 224, 208, 0.1) 50%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            <div 
              className="relative"
              style={{
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: `
                  0 32px 80px rgba(0, 0, 0, 0.5), 
                  0 12px 24px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                  0 2px 4px rgba(255, 255, 255, 0.1) inset
                `,
                border: '1px solid rgba(255, 255, 255, 0.25)',
                height: '580px'
              }}
            >
              {/* Layer 1: SVG-filtered base with ultimate frosted effect */}
              <img
                src={dashboardAsset}
                alt="Dashboard Base"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  filter: 'url(#infiniteGlass) saturate(0.9) brightness(1.08)'
                }}
              />

              {/* Layer 2: Multi-directional glass grain */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 1.5px,
                      rgba(255, 255, 255, 0.04) 1.5px,
                      rgba(255, 255, 255, 0.04) 3px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 1.5px,
                      rgba(255, 255, 255, 0.04) 1.5px,
                      rgba(255, 255, 255, 0.04) 3px
                    ),
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 2px,
                      rgba(255, 255, 255, 0.02) 2px,
                      rgba(255, 255, 255, 0.02) 4px
                    )
                  `,
                  opacity: 0.6
                }}
              />

              {/* Layer 3: Crystalline refraction bands */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(
                      135deg,
                      transparent,
                      transparent 60px,
                      rgba(64, 224, 208, 0.05) 60px,
                      rgba(64, 224, 208, 0.05) 62px,
                      transparent 62px,
                      transparent 120px,
                      rgba(87, 57, 251, 0.04) 120px,
                      rgba(87, 57, 251, 0.04) 122px
                    )
                  `,
                  mixBlendMode: 'overlay',
                  opacity: 0.5
                }}
              />

              {/* Layer 4: White clinical diffusion (premium) */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)
                  `,
                  mixBlendMode: 'overlay'
                }}
              />

              {/* Layer 5: Subtle color refraction */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse at 20% 40%, rgba(64, 224, 208, 0.08) 0%, transparent 40%),
                    radial-gradient(ellipse at 80% 60%, rgba(87, 57, 251, 0.06) 0%, transparent 45%)
                  `,
                  mixBlendMode: 'soft-light',
                  opacity: 0.7
                }}
              />

              {/* Layer 6: Sharp detail preservation (very subtle) */}
              <img
                src={dashboardAsset}
                alt="Dashboard Detail"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ 
                  borderRadius: '0px',
                  opacity: 0.25,
                  mixBlendMode: 'luminosity',
                  filter: 'contrast(1.1)'
                }}
              />

              {/* Layer 7: Inner depth shadows */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `
                    inset 0 2px 12px rgba(0, 0, 0, 0.1),
                    inset 0 0 80px rgba(255, 255, 255, 0.08),
                    inset 2px 2px 6px rgba(64, 224, 208, 0.08),
                    inset -2px -2px 6px rgba(87, 57, 251, 0.08)
                  `,
                  borderRadius: '0px'
                }}
              />

              {/* Layer 8: Surface highlights */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(
                      180deg,
                      rgba(255, 255, 255, 0.12) 0%,
                      transparent 30%,
                      transparent 70%,
                      rgba(0, 0, 0, 0.05) 100%
                    )
                  `,
                  mixBlendMode: 'overlay'
                }}
              />

              <GlassBadge />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Shared Components
function HeroCopy() {
  return (
    <div className="space-y-8">
      <div 
        className="inline-flex items-center gap-2 px-5 py-2 backdrop-blur-md border border-white/30"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '0px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div 
          className="w-1.5 h-1.5"
          style={{
            background: '#40E0D0',
            borderRadius: '0px',
            boxShadow: '0 0 8px rgba(64, 224, 208, 0.6)'
          }}
        />
        <span 
          className="text-white"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.15em'
          }}
        >
          THE PLATFORM THAT RECOVERS WITH YOU
        </span>
      </div>

      <div 
        className="backdrop-blur-md px-8 py-6 border border-white/15"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '0px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
        }}
      >
        <h1 
          className="text-white"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            textShadow: '0 2px 30px rgba(0, 0, 0, 0.4)'
          }}
        >
          Recovery. Reimagined.
        </h1>
      </div>

      <div 
        className="backdrop-blur-sm px-8 py-5 border border-white/10"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '0px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
        }}
      >
        <p 
          className="text-white/90"
          style={{ 
            fontSize: '1.1875rem', 
            lineHeight: 1.6, 
            fontWeight: 500,
            textShadow: '0 1px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          Extend your inpatient therapeutic standard into seamless patient-driven lifelong care.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          className="px-8 py-4 bg-white text-[#3E2BB8] hover:bg-white/95 transition-all flex items-center justify-center gap-3 group"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            fontSize: '1.0625rem',
            borderRadius: '0px',
            boxShadow: '0 6px 24px rgba(255, 255, 255, 0.15)'
          }}
        >
          Schedule a Demo
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          className="px-8 py-4 backdrop-blur-sm border border-white/30 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            fontSize: '1.0625rem',
            borderRadius: '0px',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
        >
          Explore Platform
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function GlassBadge() {
  return (
    <div 
      className="absolute top-8 right-8 backdrop-blur-2xl border z-20"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '0px',
        boxShadow: '0 0 24px #40E0D030, 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
      }}
    >
      <div className="flex items-center gap-3 px-5 py-3.5">
        <div 
          className="w-9 h-9 flex items-center justify-center border"
          style={{
            background: 'linear-gradient(135deg, #40E0D025, rgba(0, 0, 0, 0.3))',
            borderColor: '#40E0D040',
            borderRadius: '0px',
            boxShadow: '0 0 16px #40E0D035'
          }}
        >
          <Calendar className="w-5 h-5" style={{ color: '#40E0D0' }} />
        </div>

        <span 
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#FFFFFF',
            letterSpacing: '0.08em',
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
          }}
        >
          ALWAYS-ON INTELLIGENCE
        </span>
      </div>
    </div>
  );
}

// TEST 6: Tab-Based Peak Glass (HTML-Inspired Architecture) 
function HeroTest6() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Journey", icon: Activity, badge: "Patient-Driven" },
    { id: 2, label: "Momentum", icon: TrendingUp, badge: "Data Intelligence" },
    { id: 3, label: "Navigate", icon: Brain, badge: "Micro-Block System" }
  ];

  return (
    <>
      <style>{`
        @keyframes prismRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes diagonalShimmer {
          from { transform: rotate(-45deg) translateX(-100%); }
          to { transform: rotate(-45deg) translateX(100%); }
        }

        @keyframes iconPulseGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 25px rgba(64, 224, 208, 0.9))
                    drop-shadow(0 0 50px rgba(64, 224, 208, 0.5));
          }
          50% { 
            filter: drop-shadow(0 0 35px rgba(64, 224, 208, 1))
                    drop-shadow(0 0 70px rgba(64, 224, 208, 0.7));
          }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-3px) rotate(1deg); }
          66% { transform: translateY(2px) rotate(-1deg); }
        }

        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-2px) rotate(0.5deg); }
          75% { transform: translateY(1px) rotate(-0.5deg); }
        }

        @keyframes badgeShimmer {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }

        @keyframes tabShimmer {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }

        @keyframes activeTabGlow {
          0% { 
            box-shadow: 
              0 0 15px rgba(64, 224, 208, 0.6),
              0 0 30px rgba(64, 224, 208, 0.3);
          }
          100% { 
            box-shadow: 
              0 0 20px rgba(64, 224, 208, 0.8),
              0 0 40px rgba(64, 224, 208, 0.4);
          }
        }
      `}</style>

      <section 
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2D1F6B 50%, #1A1438 100%)`,
          minHeight: 'calc(100vh - 140px)'
        }}
      >
        {/* Ambient purple glow */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT: Hero Copy */}
            <HeroCopy />

            {/* RIGHT: Peak Glass Asset Container with Tabs */}
            <div className="relative">
              
              {/* Ambient glow behind container */}
              <div 
                className="absolute -inset-6 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(87, 57, 251, 0.3) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="relative">
                {/* PEAK GLASS VISUAL CONTAINER */}
                <div 
                  className="group relative overflow-hidden"
                  style={{
                    borderRadius: '0px',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    height: '400px'
                  }}
                >
                  {/* Main glass visual content */}
                  <div 
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                      background: `
                        linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%),
                        radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(87, 57, 251, 0.06) 0%, transparent 50%)
                      `,
                      backdropFilter: 'blur(24px) saturate(1.3) brightness(1.1)',
                      WebkitBackdropFilter: 'blur(24px) saturate(1.3) brightness(1.1)',
                      boxShadow: `
                        0 40px 120px rgba(0, 0, 0, 0.5),
                        0 20px 60px rgba(0, 0, 0, 0.3),
                        0 10px 30px rgba(0, 0, 0, 0.2),
                        inset 0 2px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.02),
                        inset 2px 0 0 rgba(255, 255, 255, 0.03),
                        inset -2px 0 0 rgba(255, 255, 255, 0.03)
                      `,
                      transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `
                        linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.06) 100%),
                        radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(87, 57, 251, 0.08) 0%, transparent 50%)
                      `;
                      e.currentTarget.style.backdropFilter = 'blur(28px) saturate(1.4) brightness(1.15)';
                      e.currentTarget.style.WebkitBackdropFilter = 'blur(28px) saturate(1.4) brightness(1.15)';
                      e.currentTarget.style.boxShadow = `
                        0 50px 150px rgba(0, 0, 0, 0.6),
                        0 25px 75px rgba(0, 0, 0, 0.4),
                        0 12px 35px rgba(0, 0, 0, 0.25),
                        inset 0 2px 0 rgba(255, 255, 255, 0.15),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.04),
                        inset 2px 0 0 rgba(255, 255, 255, 0.05),
                        inset -2px 0 0 rgba(255, 255, 255, 0.05)
                      `;
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `
                        linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%),
                        radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(87, 57, 251, 0.06) 0%, transparent 50%)
                      `;
                      e.currentTarget.style.backdropFilter = 'blur(24px) saturate(1.3) brightness(1.1)';
                      e.currentTarget.style.WebkitBackdropFilter = 'blur(24px) saturate(1.3) brightness(1.1)';
                      e.currentTarget.style.boxShadow = `
                        0 40px 120px rgba(0, 0, 0, 0.5),
                        0 20px 60px rgba(0, 0, 0, 0.3),
                        0 10px 30px rgba(0, 0, 0, 0.2),
                        inset 0 2px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.02),
                        inset 2px 0 0 rgba(255, 255, 255, 0.03),
                        inset -2px 0 0 rgba(255, 255, 255, 0.03)
                      `;
                      e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                    }}
                  >
                    {/* Prism rotation layer */}
                    <div 
                      className="absolute -top-full -left-full w-[300%] h-[300%] pointer-events-none"
                      style={{
                        background: `
                          conic-gradient(from 0deg at 50% 50%, 
                            transparent 0deg,
                            rgba(255, 255, 255, 0.02) 60deg,
                            rgba(64, 224, 208, 0.04) 120deg,
                            rgba(255, 255, 255, 0.02) 180deg,
                            transparent 240deg,
                            rgba(255, 255, 255, 0.01) 300deg,
                            transparent 360deg)
                        `,
                        animation: 'prismRotate 20s linear infinite'
                      }}
                    />

                    {/* Diagonal shimmer sweep on hover */}
                    <div 
                      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.04) 50%, transparent 70%)',
                        transform: 'rotate(-45deg) translateX(-100%)',
                        transition: 'opacity 0.3s ease'
                      }}
                    />

                    {/* Icon with pulse + float animations */}
                    {tabs.map(tab => {
                      const IconComponent = tab.icon;
                      return activeTab === tab.id ? (
                        <div
                          key={tab.id}
                          className="relative z-10"
                          style={{
                            animation: 'iconFloat 6s ease-in-out infinite'
                          }}
                        >
                          <IconComponent 
                            className="w-16 h-16"
                            style={{ 
                              color: '#40E0D0',
                              filter: 'drop-shadow(0 0 25px rgba(64, 224, 208, 0.9)) drop-shadow(0 0 50px rgba(64, 224, 208, 0.5))',
                              animation: 'iconPulseGlow 4s ease-in-out infinite',
                              transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                            }}
                          />
                        </div>
                      ) : null;
                    })}
                  </div>

                  {/* Floating badge with shimmer */}
                  <div 
                    className="absolute top-5 right-5 z-20 px-5 py-2.5 overflow-hidden"
                    style={{
                      background: `
                        linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%),
                        radial-gradient(circle at 20% 20%, rgba(64, 224, 208, 0.18) 0%, transparent 70%)
                      `,
                      backdropFilter: 'blur(20px) saturate(1.4) brightness(1.1)',
                      WebkitBackdropFilter: 'blur(20px) saturate(1.4) brightness(1.1)',
                      borderRadius: '0px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: `
                        0 15px 40px rgba(0, 0, 0, 0.5),
                        0 8px 20px rgba(0, 0, 0, 0.3),
                        0 4px 10px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                        inset 1px 0 0 rgba(255, 255, 255, 0.1),
                        inset -1px 0 0 rgba(255, 255, 255, 0.1)
                      `,
                      animation: 'badgeFloat 5s ease-in-out infinite',
                      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                      position: 'relative'
                    }}
                  >
                    {/* Internal shimmer */}
                    <div 
                      className="absolute top-0 w-full h-full pointer-events-none"
                      style={{
                        left: '-100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                        animation: 'badgeShimmer 3s ease-in-out infinite'
                      }}
                    />
                    <span 
                      className="relative z-10 text-white/90 text-xs"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5), 0 0 10px rgba(64, 224, 208, 0.3)'
                      }}
                    >
                      {tabs.find(t => t.id === activeTab)?.badge}
                    </span>
                  </div>

                  <GlassBadge />
                </div>

                {/* GLASS TABS - Bottom switcher */}
                <div 
                  className="relative flex overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)',
                    backdropFilter: 'blur(24px) saturate(1.2)',
                    WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderTop: 'none',
                    boxShadow: `
                      0 15px 40px rgba(0, 0, 0, 0.4),
                      0 8px 20px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.08),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                    `,
                    borderRadius: '0px'
                  }}
                >
                  {/* Ambient shimmer */}
                  <div 
                    className="absolute top-0 w-full h-full pointer-events-none"
                    style={{
                      left: '-100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), rgba(64, 224, 208, 0.02), rgba(255, 255, 255, 0.04), transparent)',
                      animation: 'tabShimmer 12s ease-in-out infinite'
                    }}
                  />

                  {tabs.map((tab, idx) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative flex-1 px-7 py-4.5 transition-all duration-400"
                      style={{
                        background: activeTab === tab.id 
                          ? `
                              linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%),
                              radial-gradient(circle at 50% 0%, rgba(64, 224, 208, 0.08) 0%, transparent 70%)
                            `
                          : 'transparent',
                        color: activeTab === tab.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        borderRight: idx < tabs.length - 1 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                        borderRadius: '0px',
                        cursor: 'pointer',
                        outline: 'none',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== tab.id) {
                          e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== tab.id) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                          e.currentTarget.style.transform = 'translateY(0px)';
                        }
                      }}
                    >
                      {/* Active tab top glow */}
                      {activeTab === tab.id && (
                        <div 
                          className="absolute top-0 left-0 right-0 h-[3px]"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(64, 224, 208, 0.3) 20%, #40E0D0 50%, rgba(64, 224, 208, 0.3) 80%, transparent 100%)',
                            boxShadow: '0 0 15px rgba(64, 224, 208, 0.6), 0 0 30px rgba(64, 224, 208, 0.3)',
                            animation: 'activeTabGlow 2s ease-in-out infinite alternate'
                          }}
                        />
                      )}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
