/**
 * RECOVERYOS INVESTOR PRESENTATION
 * 12-section narrative journey using design system components
 * Built with: tokens, primitives, playground components
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Layers, Zap, Target, Shield, TrendingUp, Users, 
  Brain, Clock, Award, Sparkles, ChevronDown, Circle,
  Play, Pause, RotateCw, Database, Activity, Lock, ArrowRight
} from 'lucide-react';

// Import design system primitives
import { Surface } from '../../design-system/src/primitives/Surface';
import { Text } from '../../design-system/src/primitives/Text';
import { Stack } from '../../design-system/src/primitives/Stack';
import { Button } from '../../design-system/src/primitives/Button';

// Import playground components
import { FourLayerArchitecture } from '../cc2/playground/components/FourLayerArchitecture';
import { RoutingEngine } from '../cc2/playground/components/RoutingEngine';
import { SchemaConstellation } from '../cc2/playground/components/SchemaConstellation';
import { ProofTransferSystem } from '../cc2/playground/components/ProofTransferSystem';

// Motion-wrapped primitives
function MotionSurface({ children, ...props }: any) {
  return (
    <motion.div {...props}>
      <Surface glass={props.glass} tone={props.tone || 'raised'} style={{ height: '100%' }}>
        {children}
      </Surface>
    </motion.div>
  );
}

function MotionCard({ children, delay = 0, ...props }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      <Surface tone="raised" glass style={{ height: '100%', padding: 'var(--space-6)' }}>
        {children}
      </Surface>
    </motion.div>
  );
}

function MotionList({ children, stagger = 0.1 }: { children: React.ReactNode[]; stagger?: number }) {
  return (
    <>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * stagger }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

function MotionAlert({ children, ...props }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <Surface tone="overlay" glass style={{ 
        padding: 'var(--space-6)',
        border: '2px solid hsla(160, 70%, 48%, 0.3)',
        background: 'linear-gradient(135deg, hsla(160, 70%, 48%, 0.1) 0%, transparent 100%)'
      }}>
        {children}
      </Surface>
    </motion.div>
  );
}

// Asset Card Component
function AssetCard({ asset, headline, oneliner }: { asset?: string; headline: string; oneliner: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {asset && (
        <div className="absolute inset-0 opacity-10">
          <img src={asset} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: 'var(--space-6)'
          }}
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.6
          }}
        >
          {oneliner}
        </motion.p>
      </div>
    </div>
  );
}

// Section Navigation
function SectionDots({ currentSection, totalSections, onNavigate }: { 
  currentSection: number; 
  totalSections: number; 
  onNavigate: (section: number) => void;
}) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className="group relative"
          aria-label={`Go to section ${i + 1}`}
        >
          <div 
            className={`w-2 h-2 transition-all duration-300`}
            style={{
              backgroundColor: i === currentSection 
                ? 'hsla(160, 70%, 48%, 1)' 
                : 'rgba(255,255,255,0.3)',
              transform: i === currentSection ? 'scale(1.5)' : 'scale(1)',
              borderRadius: '0px'
            }}
          />
        </button>
      ))}
    </div>
  );
}

// Lens Switcher
type Lens = 'individual' | 'professional' | 'organization';

function LensSwitcher({ lens, onLensChange }: { lens: Lens; onLensChange: (lens: Lens) => void }) {
  return (
    <div className="fixed top-8 right-24 z-50 flex items-center gap-2" style={{
      background: 'rgba(11,11,12,0.6)',
      backdropFilter: 'blur(12px)',
      padding: 'var(--space-2) var(--space-4)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <span style={{ 
        fontSize: '11px', 
        color: 'rgba(255,255,255,0.6)', 
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 600
      }}>
        Lens:
      </span>
      {(['individual', 'professional', 'organization'] as Lens[]).map((l) => (
        <button
          key={l}
          onClick={() => onLensChange(l)}
          style={{
            padding: 'var(--space-1) var(--space-3)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600,
            background: lens === l ? 'hsla(160, 70%, 48%, 1)' : 'transparent',
            color: lens === l ? '#0B0B0C' : 'rgba(255,255,255,0.6)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 200ms'
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// SECTION 1: The Foundation
function Section1() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #3E2BB8 0%, #5739FB 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.08,
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      
      <AssetCard
        headline="RecoveryOS"
        oneliner="The operating system for cognitive change. Not another app. Not another tool. The infrastructure recovery never had."
      />
    </section>
  );
}

// SECTION 2: The Reality
function Section2() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0B0C',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              color: 'hsla(160, 70%, 48%, 1)', 
              marginBottom: 'var(--space-4)',
              fontWeight: 600
            }}>
              THE REALITY
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-6)', lineHeight: 1.2 }}>
              The gap between knowing and doing is where relapse lives
            </h2>
            
            <MotionAlert>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
                Patients know what to do. Therapists know what works. But between sessions, in moments of actual need, the connection breaks.
              </p>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: 'var(--space-4)' }}>
                The problem isn't knowledge. It's delivery.
              </p>
            </MotionAlert>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Surface tone="raised" glass style={{ padding: 'var(--space-8)', background: 'rgba(220, 38, 38, 0.1)', border: '2px solid rgba(220, 38, 38, 0.3)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', fontWeight: 700, color: '#DC2626', marginBottom: 'var(--space-4)' }}>167</div>
              <div style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-8)' }}>hours between sessions</div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--space-6)' }}>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: '#EF4444', marginBottom: 'var(--space-2)' }}>40-60%</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>relapse within first year</div>
              </div>

              <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: '#F87171' }}>$42B</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginTop: 'var(--space-2)' }}>annual cost of treatment failure</div>
              </div>
            </div>
          </Surface>
        </motion.div>
      </div>
    </section>
  );
}

// SECTION 3: The Moment (needs ThreadView + StateChip components)
function Section3() {
  const moments = [
    { time: 'Session 1', event: 'Clinical Insight: "I see the pattern now"', heat: 'GREEN' },
    { time: '2 Days Later', event: 'Critical Moment: Trigger activated, no support', heat: 'RED' },
    { time: '4 Days Later', event: 'Session 2: "I knew what to do, but..."', heat: 'AMBER' },
    { time: '7 Days Later', event: 'Relapse Event: Gap becomes crisis', heat: 'RED' },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0B0B0C 0%, #1a0f3a 100%)',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE MOMENT
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>
            The timeline of failure
          </h2>
        </motion.div>

        {/* Timeline with MotionList */}
        <div style={{ position: 'relative', paddingLeft: 'var(--space-8)' }}>
          <div style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.1)' }} />

          <MotionList stagger={0.2}>
            {moments.map((moment, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: 'var(--space-8)' }}>
                {/* StateChip (dot) */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '-40px', 
                    top: '8px', 
                    width: '16px', 
                    height: '16px', 
                    background: '#0B0B0C',
                    border: `2px solid ${moment.heat === 'RED' ? '#DC2626' : moment.heat === 'AMBER' ? '#F59E42' : '#10B981'}`
                  }}
                />
                
                <Surface tone="raised" glass style={{ padding: 'var(--space-6)' }}>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-2)' }}>{moment.time}</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{moment.event}</div>
                </Surface>
              </div>
            ))}
          </MotionList>
        </div>

        <MotionAlert style={{ marginTop: 'var(--space-8)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'hsla(160, 70%, 48%, 1)', marginBottom: 'var(--space-3)' }}>
            RecoveryOS fills the gap
          </div>
          <div style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)' }}>
            Between-session intelligence. Real-time routing. Contextual delivery. The bridge that makes change possible.
          </div>
        </MotionAlert>
      </div>
    </section>
  );
}

// SECTION 4: The System (LoopRunner component)
function Section4() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0B0C',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1600px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE SYSTEM
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            Four-layer architecture
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-8)', maxWidth: '800px' }}>
            This isn't a feature. It's a complete operating system for therapeutic change.
          </p>
        </motion.div>

        {/* Use FourLayerArchitecture component */}
        <div style={{ marginTop: 'var(--space-8)' }}>
          <FourLayerArchitecture />
        </div>
      </div>
    </section>
  );
}

// SECTION 5: The Edge (SpineAtlas, ReceiptForge, ConsentMap)
function Section5() {
  const edges = [
    {
      title: 'Clinical Targeting',
      subtitle: 'SpineAtlas',
      desc: '20 Schemas → 200 Families → 2,400 Mindblocks mapped to clinical patterns',
      stats: '3,000 NaviCues',
      icon: Target
    },
    {
      title: 'Proof System',
      subtitle: 'ReceiptForge',
      desc: 'Every interaction creates auditable change receipts. Transfer, not just engagement.',
      stats: 'Auditable outcomes',
      icon: Shield
    },
    {
      title: 'Governance',
      subtitle: 'ConsentMap',
      desc: 'Patient consent. Clinical oversight. Transparent routing. Trust by design.',
      stats: 'HIPAA + Ethics',
      icon: Lock
    },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #1a0f3a 0%, #0B0B0C 100%)',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1400px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE EDGE
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>
            Three unfair advantages
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
          {edges.map((item, i) => (
            <MotionCard key={item.title} delay={i * 0.2}>
              <item.icon style={{ width: '48px', height: '48px', color: 'hsla(160, 70%, 48%, 1)', marginBottom: 'var(--space-4)' }} />
              <div style={{ 
                fontSize: '11px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                color: 'hsla(160, 70%, 48%, 1)',
                marginBottom: 'var(--space-2)',
                fontWeight: 600
              }}>
                {item.subtitle}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>{item.desc}</p>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'hsla(160, 70%, 48%, 1)' }}>
                {item.stats}
              </div>
            </MotionCard>
          ))}
        </div>

        {/* Use ProofTransferSystem component */}
        <div style={{ marginTop: 'var(--space-8)' }}>
          <ProofTransferSystem />
        </div>
      </div>
    </section>
  );
}

// SECTION 6: The Ecosystem (RecoveryOSPortal with world switching)
function Section6() {
  const [activeWorld, setActiveWorld] = useState<'individual' | 'professional' | 'organization'>('individual');

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0B0C',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1400px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE ECOSYSTEM
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>
            Three altitudes. One platform.
          </h2>
        </motion.div>

        {/* RoomSwitcher / MotionToggle */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          {(['individual', 'professional', 'organization'] as const).map((world) => (
            <button
              key={world}
              onClick={() => setActiveWorld(world)}
              style={{
                flex: 1,
                padding: 'var(--space-6)',
                background: activeWorld === world ? 'rgba(64, 224, 208, 0.1)' : 'rgba(255,255,255,0.05)',
                border: activeWorld === world ? '2px solid hsla(160, 70%, 48%, 1)' : '1px solid rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 200ms',
                borderRadius: '0px'
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-2)' }}>
                {world}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'capitalize' }}>{world}</div>
            </button>
          ))}
        </div>

        {/* Content based on active world */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeWorld}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Surface tone="raised" glass style={{ padding: 'var(--space-8)' }}>
              {activeWorld === 'individual' && (
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>B2C: Direct to Consumer</h3>
                  <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-6)' }}>
                    Journey-guided pathways. Daily check-ins. Between-session support. $29/month.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                    <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-1)' }}>Market Size</div>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>23M people</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>in recovery (US)</div>
                    </div>
                    <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-1)' }}>Annual Revenue</div>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>$8B TAM</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>at 1% penetration</div>
                    </div>
                  </div>
                </div>
              )}

              {activeWorld === 'professional' && (
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>B2B: Professional Tools</h3>
                  <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-6)' }}>
                    Clinical dashboard. Session prep. Proof ledger. Patient monitoring. $199/month per provider.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                    <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-1)' }}>Target Market</div>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>85K clinicians</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>addiction specialists (US)</div>
                    </div>
                    <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-1)' }}>ARR Potential</div>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>$203M</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>at 10% penetration</div>
                    </div>
                  </div>
                </div>
              )}

              {activeWorld === 'organization' && (
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>B2B2C: Enterprise Deployment</h3>
                  <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-6)' }}>
                    Full platform deployment for treatment centers. Alumni engagement. Discharge continuity. Custom pricing.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                    <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-1)' }}>Facilities</div>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>15,000+</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>treatment centers (US)</div>
                    </div>
                    <div style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-1)' }}>Enterprise Value</div>
                      <div style={{ fontSize: '2rem', fontWeight: 700 }}>$50K-250K</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>per facility annually</div>
                    </div>
                  </div>
                </div>
              )}
            </Surface>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// SECTION 7: The Intelligence (DecisionFlow + RoutingEngine)
function Section7() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0B0B0C 0%, #0a0520 100%)',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1600px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE INTELLIGENCE
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            LUMA: The AI orchestration layer
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-8)', maxWidth: '900px' }}>
            Not chatbot assistance. True routing intelligence. Deciding what therapeutic intervention to deliver, when, and why now.
          </p>
        </motion.div>

        {/* Use RoutingEngine component */}
        <div style={{ marginTop: 'var(--space-8)' }}>
          <RoutingEngine />
        </div>

        {/* Additional architecture overview */}
        <div style={{ marginTop: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
          {[
            { title: 'State Awareness', desc: 'Real-time arousal, focus, context detection', icon: Activity },
            { title: 'Multi-Armed Bandit', desc: 'Optimization that learns from every interaction', icon: TrendingUp },
            { title: 'Resistance Signals', desc: 'Detect avoidance before it becomes relapse', icon: Shield },
          ].map((item, i) => (
            <MotionCard key={item.title} delay={i * 0.15}>
              <item.icon style={{ width: '32px', height: '32px', color: 'hsla(160, 70%, 48%, 1)', marginBottom: 'var(--space-4)' }} />
              <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>{item.title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 8: The Model
function Section8() {
  const plans = [
    { tier: 'Individual', price: '$29', period: '/month', features: ['Journey pathways', 'Daily check-ins', 'Cue library', 'State tracking'] },
    { tier: 'Professional', price: '$199', period: '/month', features: ['Clinical dashboard', 'Patient monitoring', 'Session prep', 'Proof ledger'] },
    { tier: 'Enterprise', price: 'Custom', period: 'per facility', features: ['Full deployment', 'Alumni engagement', 'Custom branding', 'Dedicated support'] },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0B0C',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1400px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE MODEL
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>
            Business model: Triple revenue stream
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          {plans.map((plan, i) => (
            <MotionCard key={plan.tier} delay={i * 0.2}>
              <div style={{ 
                fontSize: '0.75rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                color: 'hsla(160, 70%, 48%, 1)',
                marginBottom: 'var(--space-4)',
                fontWeight: 600
              }}>
                {plan.tier}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 700 }}>{plan.price}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)', marginLeft: 'var(--space-2)' }}>{plan.period}</span>
              </div>
              <ul style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {plan.features.map((feature, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                    <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.4)', marginTop: '8px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </MotionCard>
          ))}
        </div>

        <MotionAlert style={{ marginTop: 'var(--space-8)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'hsla(160, 70%, 48%, 1)' }}>Revenue Projection</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)' }}>
            {[
              { year: 'Year 1', value: '$2.4M' },
              { year: 'Year 2', value: '$12M' },
              { year: 'Year 3', value: '$48M' },
              { year: 'Year 5', value: '$200M+' },
            ].map((item) => (
              <div key={item.year}>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-1)' }}>{item.year}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: item.year === 'Year 5' ? 'hsla(160, 70%, 48%, 1)' : '#FFFFFF' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </MotionAlert>
      </div>
    </section>
  );
}

// SECTION 9-12: Continue with similar patterns...
// For brevity, I'll create simplified versions

function Section9() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a0520 0%, #0B0B0C 100%)',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1400px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE PATH
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>
            Go-to-market roadmap
          </h2>
        </motion.div>

        {/* GTM Timeline - would use JourneyStudio component */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {[
            { phase: 'Q1 2026', milestone: 'Private Beta Launch', details: '50 individuals, 5 clinicians. Proof-of-concept validation.', status: 'In Progress' },
            { phase: 'Q2 2026', milestone: 'Professional Platform', details: 'Clinical dashboard release. 100 providers. Case studies.', status: 'Planned' },
            { phase: 'Q3 2026', milestone: 'First Enterprise Pilot', details: '2-3 treatment centers. Alumni continuity programs.', status: 'Planned' },
            { phase: 'Q4 2026', milestone: 'Scale & Partnerships', details: 'Insurance integration. Academic partnerships. National expansion.', status: 'Roadmap' },
          ].map((item, i) => (
            <MotionCard key={item.phase} delay={i * 0.2}>
              <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
                <div style={{ width: '128px', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-1)' }}>Phase {i + 1}</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>{item.phase}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{item.milestone}</h3>
                    <span style={{ 
                      padding: 'var(--space-1) var(--space-3)', 
                      fontSize: '0.75rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em',
                      background: 'rgba(64, 224, 208, 0.1)',
                      color: 'hsla(160, 70%, 48%, 1)',
                      border: '1px solid hsla(160, 70%, 48%, 0.4)'
                    }}>
                      {item.status}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>{item.details}</p>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section10() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0B0C',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1600px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE ADVANTAGE
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>
            Why competitors can't copy this
          </h2>
        </motion.div>

        {/* Use SchemaConstellation component to show competitive moat */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <SchemaConstellation />
        </div>

        <div style={{ marginTop: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
          {[
            { label: 'Years to Build', value: '3+', desc: 'Clinical taxonomy + AI routing' },
            { label: 'NaviCues Created', value: '3,000+', desc: 'Handcrafted therapeutic interventions' },
            { label: 'Network Effects', value: 'Strong', desc: 'Each user improves the routing' },
          ].map((item, i) => (
            <MotionCard key={item.label} delay={i * 0.15}>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-2)' }}>{item.label}</div>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: 'hsla(160, 70%, 48%, 1)', marginBottom: 'var(--space-2)' }}>{item.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section11() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0B0B0C 0%, #1a0f3a 100%)',
      color: '#FFFFFF',
      padding: 'var(--space-8)'
    }}>
      <div style={{ maxWidth: '1400px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-4)',
            fontWeight: 600
          }}>
            THE HORIZON
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: 'var(--space-8)' }}>
            Beyond recovery: The cognitive OS
          </h2>
        </motion.div>

        {/* ProofStack for roadmap items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          {[
            { year: '2027', vision: 'Mental Health Expansion', desc: 'Anxiety, depression, PTSD. Same infrastructure, different schemas.' },
            { year: '2028', vision: 'Chronic Disease Management', desc: 'Diabetes, heart disease, chronic pain. Behavior change at scale.' },
            { year: '2029', vision: 'Performance & Wellness', desc: 'Elite athletes, executives, anyone pursuing change. RecoveryOS becomes ChangeOS.' },
            { year: '2030+', vision: 'The Cognitive Platform', desc: 'The operating system for human transformation. Every app builds on RecoveryOS.' },
          ].map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'flex-start' }}
            >
              <div style={{ width: '96px', flexShrink: 0, fontSize: '4rem', fontWeight: 700, color: 'rgba(255,255,255,0.1)' }}>
                {item.year}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'hsla(160, 70%, 48%, 1)' }}>{item.vision}</h3>
                <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <MotionAlert style={{ marginTop: 'var(--space-8)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-4)', textAlign: 'center' }}>
            This isn't just about recovery.
          </div>
          <div style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
            It's about building the infrastructure for all cognitive change. Recovery is the beachhead.
          </div>
        </MotionAlert>
      </div>
    </section>
  );
}

function Section12() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #1a0f3a 0%, #3E2BB8 50%, #5739FB 100%)',
      color: '#FFFFFF',
      padding: 'var(--space-8)',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'hsla(160, 70%, 48%, 1)', 
            marginBottom: 'var(--space-6)',
            fontWeight: 600
          }}>
            THE OPPORTUNITY
          </div>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, marginBottom: 'var(--space-6)', lineHeight: 1.2 }}>
            Join us in building the OS for human change
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: 'var(--space-8)' }}
        >
          <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>
            We're raising our Series A to scale infrastructure, expand clinical validation, and capture the recovery market before building the platform for all behavior change.
          </p>
          
          <div style={{ 
            display: 'inline-block', 
            background: 'rgba(11,11,12,0.4)', 
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)', 
            padding: 'var(--space-8)' 
          }}>
            <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-2)' }}>Raising</div>
            <div style={{ fontSize: '4rem', fontWeight: 700, color: 'hsla(160, 70%, 48%, 1)' }}>$10M Series A</div>
            <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginTop: 'var(--space-3)' }}>18-month runway to profitability</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}
        >
          {[
            { label: 'TAM', value: '$50B+', desc: 'Behavioral health market' },
            { label: 'Growth', value: '400%', desc: 'Year-over-year potential' },
            { label: 'Exit Path', value: 'Clear', desc: 'Strategic or IPO' },
          ].map((item, i) => (
            <div key={i} style={{ padding: 'var(--space-6)', background: 'rgba(11,11,12,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-2)' }}>{item.label}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>{item.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          {/* ReturnButton CTA */}
          <button style={{
            padding: 'var(--space-6) var(--space-8)',
            background: 'hsla(160, 70%, 48%, 1)',
            color: '#0B0B0C',
            fontSize: '1.25rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 200ms',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-3)'
          }}>
            Schedule Investor Call
            <ArrowRight style={{ width: '20px', height: '20px' }} />
          </button>
          
          <div style={{ marginTop: 'var(--space-6)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
            For detailed financials, technical architecture, and clinical validation data, contact:{' '}
            <a href="mailto:investors@recoveryos.com" style={{ color: 'hsla(160, 70%, 48%, 1)', textDecoration: 'none' }}>
              investors@recoveryos.com
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-8)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            This is the operating system recovery never had.
          </div>
          <div style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }}>
            And we're just getting started.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Component
export function InvestorsPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [lens, setLens] = useState<Lens>('individual');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    Section1, Section2, Section3, Section4, Section5, Section6,
    Section7, Section8, Section9, Section10, Section11, Section12
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(Math.min(section, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const navigateToSection = (section: number) => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: section * windowHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} style={{ background: '#0B0B0C', color: '#FFFFFF', overflowX: 'hidden' }}>
      <SectionDots 
        currentSection={currentSection} 
        totalSections={sections.length} 
        onNavigate={navigateToSection}
      />
      <LensSwitcher lens={lens} onLensChange={setLens} />

      {sections.map((SectionComponent, i) => (
        <SectionComponent key={i} />
      ))}
    </div>
  );
}
