/**
 * MARKETING STORY PAGE V2 - EXHIBITION-LEVEL NARRATIVE
 * 
 * Mission: Tell the Recoverlution origin story with emotional authenticity
 * Design DNA: Layered Floating Glass, massive 3D assets, asymmetric breakthrough layouts
 * Philosophy: Vulnerability meets premium design - human truth in infiniteK elegance
 * 
 * OPTIMIZATION PROGRESS (Nov 6, 2025):
 * - Section 2 (Crisis): Blue flows optimized
 * - Section 3 (Insight): All 3 tiles optimized + white icons
 * - Section 4 (Mission): All 4 tiles optimized + white icons + "patient-driven" copy
 * - Section 5 (Team): ALL 4 team photos optimized ✅ COMPLETE
 * 
 * TILE STRUCTURE:
 * - "The Insight" (3 tiles): Economics-style glass treatment
 * - "Our Mission" (4 tiles): Economics-style glass treatment
 * - Structure: Full-bleed asset → Icon glass container → Copy glass container (Economics formula)
 * 
 * GLASS UPGRADE (Nov 1, 2025):
 * Applied Economics section treatment to eliminate flatness:
 * - Icon: rgba(255,255,255,0.12) background + blur(24px)
 * - Copy: rgba(255,255,255,0.1) background + blur(32px) - COMPOUND GLASS
 * - Result: Premium depth, consistent with Crisis + Hero sections
 * 
 * Created: October 27, 2025
 * Optimized: November 6, 2025 - Assets + Copy + Icons
 */

import { useState } from 'react';
import { Heart, Brain, Lightbulb, Target, Users, Sparkles, Zap, ChevronRight, Code, Award, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { MarketingHeader } from '../MarketingHeader';
import { MarketingFooter } from '../MarketingFooter';
import { SEOHead } from '../SEOHead';
import { getPageSEO } from '../../utils/seo';
import { BookendSectionClass } from '../marketing/universal/BookendSectionClass';
import { StoryPageGlassInsight } from '../StoryPageGlassInsight';
import { StoryPageGlassMission } from '../StoryPageGlassMission';
import FinalCTAClean from '../FinalCTAClean';
import { HeroClass } from '../marketing/universal/HeroClass';

// Hero Asset - Nov 6, 2025 Optimized
import { heroStoryOptimized } from '../../utils/heroAssets';

// Team Photos - All Optimized Nov 6
import danielPhoto from 'figma:asset/64b83f1cfef00a4ad94ce7ecf71428767c723295.png'; // Optimized Nov 6
import sophiePhoto from 'figma:asset/9854ef2c06b4effc47c14ce3104d90da03410b0c.png'; // Optimized Nov 6
import mikePhoto from 'figma:asset/42f7d33deb3e3c10c161ba5ee87d8581d5cba24d.png'; // Optimized Nov 6
import mananPhoto from 'figma:asset/944b522e0b1128a20883604614ea7ac27d4ed9c0.png'; // Optimized Nov 6
import insightArchitecture from 'figma:asset/10095535b0a260cb13e809f0aff2b357ec9d5051.png';
import insightMicroBlocks from 'figma:asset/5152496e67ac8a8406a7bf77a3557092e1b74edf.png';
import insightTechnology from 'figma:asset/e4c3d8046127b77ffa9979e616ae9a6bdc0b5eb5.png';
import patientFirstTile from 'figma:asset/21fc7433f42ea9d808013b1bc96cc408bb358e5b.png';
import scienceBackedTile from 'figma:asset/31fed99ccc575c72f8dd1c27cdee3f720b3f2749.png';
import outcomeFocusedTile from 'figma:asset/0e6c08bea8b51b27b6111a14bd62c9a87c043cf0.png';
import radicallyInclusiveTile from 'figma:asset/a7ccd3161cc0a5ee8b8ca22786b5468d325c6f8e.png';
import crisisBlue3D from "figma:asset/51a98848c649ce4d8ca7521955300eb15e5e84f5.png"; // Section 2 - The Crisis (Optimized Nov 6)
import finalCTAAsset from 'figma:asset/6364c082f3acea50f59f09412aa1a5f0b355311f.png'; // Final CTA - Purple chair (FIXED)

interface MarketingStoryPageV2Props {
  onBack: () => void;
  onScheduleDemo: () => void;
  onNavigate: (page: string) => void;
  onLogin?: () => void;
}

// Brand colors now managed in /utils/sectionStyles.tsx (BRAND_COLORS)
const BRAND = {
  offWhite: '#FAFAFA', // Still needed for section backgrounds
  cyan: '#40E0D0',
  dark: '#3E2BB8',
  mid: '#5739FB'
};

export function MarketingStoryPage({ onBack, onScheduleDemo, onNavigate, onLogin }: MarketingStoryPageV2Props) {
  const seo = getPageSEO('story');
  const [storyExpanded, setStoryExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead {...seo} />
      
      {/* Master Marketing Header */}
      <MarketingHeader 
        onNavigate={onNavigate}
        onEnterPlatform={onLogin}
        currentPage="story"
      />

      {/* 🎨 HERO - Universal Component */}
      <HeroClass
        eyebrow="OUR ORIGIN STORY"
        eyebrowIcon={
          <Heart 
            size={14}
            style={{ strokeWidth: 2.5 }} 
          />
        }
        headline={
          <>
            Built from<br />
            <span style={{ color: '#40E0D0' }}>
              lived experience
            </span>
          </>
        }
        subheadline="At 36, Daniel Fincham hit rock bottom. Six weeks into his own recovery journey, he started building Recoverlution. Not as a business plan, but as survival architecture."
        customContent={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-l-4 pl-6 max-w-2xl mx-auto mb-12"
            style={{
              borderColor: '#40E0D0'
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 500,
                fontStyle: 'italic',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9)'
              }}
            >
              "I refused to accept that recovery had to be this hard. So I built the system I wished had existed."
            </p>
          </motion.div>
        }
        ctaText="EXPLORE OUR STORY"
        ctaOnClick={onScheduleDemo}
        backgroundAsset={heroStoryOptimized}
        backgroundAssetAlt="3D architectural scene with illuminated portal representing breakthrough moment and clarity emerging from darkness"
        backgroundFilter="brightness(0.85) saturate(1.1)"
        overlayGradient="linear-gradient(180deg, rgba(10, 25, 47, 0.3) 0%, rgba(10, 25, 47, 0.1) 50%, rgba(10, 25, 47, 0.3) 100%)"
      />

      {/* THE CRISIS - Universal Section 2 Pattern */}
      <BookendSectionClass
        eyebrow="THE CRISIS"
        eyebrowIcon={<Code size={14} style={{ strokeWidth: 2.5, color: '#FFFFFF' }} />}
        headline="The industry was broken"
        bodyCopy={
          <>
            {/* Problem Point 1 - Regular paragraph (no indent) */}
            <p style={{
              fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.95)',
              fontWeight: 500,
              marginBottom: 'clamp(1.25rem, 2vw, 1.5rem)'
            }}>
              Patients drowning in information but starving for integration. Clinicians working heroically but without scalable systems. Outcomes measured in anecdotes, not data. Privacy fears blocking the very tracking that could save lives.
            </p>

            {/* Problem Point 2 - Cyan accent */}
            <div style={{ 
              paddingLeft: 'clamp(1rem, 1.5vw, 1.25rem)',
              borderLeft: '3px solid rgba(64, 224, 208, 0.4)'
            }}>
              <p style={{
                fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 500
              }}>
                Every therapeutic approach speaking a different language. 
                <span style={{ 
                  fontWeight: 600, 
                  color: '#40E0D0',
                  fontStyle: 'italic',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem'
                }}>CBT, DBT, EMDR, somatic work, 12-step, mindfulness.</span> 
                All valuable. None connected. Patients left to translate alone, breakthroughs staying siloed, nothing compounding.
              </p>
            </div>
          </>
        }
        tiles={[
          {
            id: 'crisis',
            icon: Code,
            label: 'CRISIS',
            tagline: 'THE CATALYST',
            color: '#5739FB'
          },
          {
            id: 'clarity',
            icon: Lightbulb,
            label: 'CLARITY',
            tagline: 'THE INSIGHT',
            color: '#40E0D0'
          },
          {
            id: 'revolution',
            icon: Target,
            label: 'CONVICTION',
            tagline: 'THE ACTION',
            color: '#10B981'
          }
        ]}
        backgroundAsset={crisisBlue3D}
        backgroundAssetAlt="3D flowing blue forms representing breakthrough and transformation during crisis"
      />

      {/* THE INSIGHT - Universal GlassCard Standard */}
      <StoryPageGlassInsight />

      {/* THE MISSION - Universal GlassCard Standard */}
      <StoryPageGlassMission />

      {/* THE TEAM - Meet the Humans */}
      <section className="py-32 md:py-40 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          {/* Section Header - RIGHT layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16">
            <div>
              <p 
                style={{ 
                  fontSize: 'clamp(1.1875rem, 2.2vw, 1.5rem)', 
                  lineHeight: 1.5,
                  fontWeight: 500,
                  color: '#6B7280'
                }}
              >
                The humans behind the platform
              </p>
            </div>
            <div className="lg:text-right">
              <h2 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 800, 
                  fontSize: 'clamp(3.75rem, 7vw, 6rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#111827'
                }}
              >
                The{' '}
                <span style={{ 
                  color: BRAND.cyan,
                  textShadow: `0 0 40px ${BRAND.cyan}40`
                }}>
                  Team
                </span>
              </h2>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Daniel - Founder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden group"
              style={{
                borderRadius: '0px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(62, 43, 184, 0.15)',
                transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
                minHeight: '580px'
              }}
            >
              {/* Full-Bleed Photo Background */}
              <div className="absolute inset-0" style={{ zIndex: 1 }}>
                <img 
                  src={danielPhoto} 
                  alt="Daniel Fincham - Founder & CEO"
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                />
                {/* Subtle gradient overlay for legibility */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: `linear-gradient(135deg, ${BRAND.dark}08 0%, ${BRAND.mid}06 100%)`,
                    zIndex: 2
                  }}
                />
              </div>

              {/* Hover Glow - Subtle Apple Pro style */}
              <div 
                className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${BRAND.dark}12 0%, transparent 50%)`,
                  filter: 'blur(20px)',
                  zIndex: 0
                }}
              />

              <div className="relative z-10"  style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

                {/* Glass Copy Container */}
                <div 
                  className="p-8 lg:p-10"
                  style={{
                    background: 'transparent',
                    borderRadius: '0px',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)'
                  }}
                >
                  {/* Name & Role */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      color: '#FFFFFF',
                      marginBottom: '0.5rem',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    Daniel Fincham
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.90)',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Founder & CEO
                  </p>

                  {/* Tagline */}
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontStyle: 'italic',
                      color: 'rgba(255, 255, 255, 0.75)',
                      marginBottom: '1rem',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Building Recovery Technology from Lived Experience
                  </p>

                  {/* Bio */}
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.7,
                      color: '#FFFFFF',
                      fontWeight: 500,
                      marginBottom: '1.5rem',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    At 36, everything hit the fan. Six weeks into his own recovery, Daniel started building Recoverlution as survival architecture. Five years later, every crisis, confusion, breakthrough, and setback is built into the platform.
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Applied Neuroscience', 'Recovery Architecture', 'SaaS Leadership'].map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5"
                        style={{
                          background: 'rgba(255, 255, 255, 0.20)',
                          backdropFilter: 'blur(4px)',
                          WebkitBackdropFilter: 'blur(4px)',
                          borderRadius: '0px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          letterSpacing: '0.02em',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read The Full Story Button - Clear Glass */}
                  <button
                    onClick={() => setStoryExpanded(!storyExpanded)}
                    className="w-full px-6 py-3.5 transition-all duration-700 relative overflow-hidden"
                    style={{
                      background: storyExpanded 
                        ? `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.mid} 100%)`
                        : 'rgba(255, 255, 255, 0.20)',
                      borderRadius: '0px',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      letterSpacing: '0.02em',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                      boxShadow: storyExpanded 
                        ? `0 8px 24px ${BRAND.dark}40`
                        : `0 4px 12px rgba(0, 0, 0, 0.2)`
                    }}
                  >
                    {/* Shimmer Effect */}
                    {!storyExpanded && (
                      <div 
                        className="absolute inset-0 animate-shimmer"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)`,
                          backgroundSize: '200% 100%'
                        }}
                      />
                    )}
                    
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2">
                      <BookOpen 
                        size={18} 
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{
                          strokeWidth: 2.5
                        }}
                      />
                      {storyExpanded ? 'Close Story' : 'Read The Full Story'}
                      {!storyExpanded && (
                        <Sparkles 
                          size={16} 
                          className="transition-all duration-300 group-hover:rotate-12"
                          style={{
                            strokeWidth: 2.5
                          }}
                        />
                      )}
                    </span>
                  </button>
                </div>

                {/* Expanded Story */}
                {storyExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden mt-4"
                  >
                    <div 
                      className="p-8 lg:p-12 custom-scrollbar"
                      style={{
                        background: `linear-gradient(180deg, ${BRAND.dark}02 0%, ${BRAND.mid}03 50%, rgba(64, 224, 208, 0.02) 100%)`,
                        borderRadius: '0px',
                        maxHeight: '70vh',
                        overflowY: 'scroll',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      <div style={{ maxWidth: '70ch', margin: '0 auto' }}>
                        
                        {/* Story Content */}
                        <div style={{
                          fontSize: '1.0625rem',
                          lineHeight: 2,
                          color: '#FFFFFF',
                          fontWeight: 400
                        }}>
                          
                          {/* Title with Elegant Gradient */}
                          <div style={{ 
                            textAlign: 'center',
                            marginBottom: '3.5rem',
                            paddingBottom: '2rem',
                            borderBottom: `1px solid ${BRAND.dark}10`
                          }}>
                            <h4 style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 800,
                              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                              background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.mid} 50%, #40E0D0 100%)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              marginBottom: '0.75rem',
                              letterSpacing: '-0.02em',
                              lineHeight: 1.2
                            }}>
                              The Room That Wasn't a Room
                            </h4>
                            <p style={{
                              fontSize: '0.875rem',
                              color: 'rgba(255, 255, 255, 0.70)',
                              fontStyle: 'italic',
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase'
                            }}>
                              Daniel's Story
                            </p>
                          </div>

                          <p style={{ marginBottom: '1.5rem' }}>
                            I thought life was a movie. I waited for music before I spoke and looked for the camera. School arrived like a cold corridor. My best friend went to another class. The floor tilted. I cried until a teacher pulled me to the door. The first lesson was not phonics. It was this. Everyone else belongs. I do not.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            Home was my parents. They were the house I lived in. They were my safe house, my comfort and hiding place. As the apron string weathered, the world felt lonelier. Losses came and went. Grandparents. A friend in a crash. Underneath was mismatch. A mind that ran hot. A body that braced. A world that would not sit still. No one had a word yet. I had a feeling I could not name. Alien.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            So I hid by getting good. If I could not belong, I would excel. Be the bright kid. Be fast at sport. Be good at smiling. I turned feelings into trophies and wore them like armour. A shy boy with a fast mind and a stomach that failed sleepovers. I learned to stand behind bigger kids or louder laughs. Them and us. Mostly them.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            College and uni widened the map. I learned the trick of being fine. I could ace an exam and still feel like a tourist in my own life. I could laugh on stag weekends and watch myself laughing. I held the camera and never got in the frame.
                          </p>

                          {/* Visual Section Break */}
                          <div style={{
                            width: '60px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${BRAND.dark}40, transparent)`,
                            margin: '3rem auto'
                          }} />

                          <p style={{ marginBottom: '1.5rem' }}>
                            I left and travelled. I wanted scale. I wanted proof. I met a Danish girl and love hit like a drum. I followed her across the world. I was in Auckland and supposed to fly to Chile. I booked a ticket to Copenhagen instead. Thirty two hours in the air for a heartbeat on the ground. I stayed five years. I integrated. Danish best friends. A mortgage. I was certain this meant belonging. Then she saw through the blackouts and left. Weeks later I met the woman who would become my wife. Six months later we bought a flat in London. I re offic ed to London and commuted to Chester. We married. We built a great nest. We had three luminous children. The good in her I hoped would transfuse. In the end my toxicity spilled onto her. That truth still stings.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            Work found me and I found it. Software fitted my speed. The path bent upward. I grew with a company and it grew with me. I learned how to be a VP in SaaS. I lived out of a suitcase in London, Boston and Copenhagen. I never used the hotel kettle. I drank from the bar. Late flights. Per diems. Gold status. The mask set in like plaster. The mantra I learned in the old country was not always be selling but always be drinking. It got teams to their targets. It got me to midnight. People clapped. I smiled for the photo. I felt less than alive.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            I moved back. We designed and built a house. Friends filled it. Firsts happened under its roof. The brochure matched the walls. On paper it was a life completed by thirty six. Inside I was emotionally, physically and mentally bankrupt.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            My mind was a swarm of bees. Racing. Reaching. Stacking expectation on expectation. No finish line. A bottomless pit that I kept calling the stars. I thought I was reaching upward. I was digging my own grave.
                          </p>

                          {/* Visual Section Break */}
                          <div style={{
                            width: '60px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${BRAND.dark}40, transparent)`,
                            margin: '3rem auto'
                          }} />

                          <p style={{ marginBottom: '1.5rem' }}>
                            Alcohol dressed me in a cape. It let me be the person the world wanted. I had confidence to converse. To dream. To believe. It became the internal talk that handed me worth and recognition when the room was loud. Then it became silence for the thoughts I could not switch off. It blunted the adrenaline that rattled my bones when I spoke in public. It was the fuel to maximise a weekend. To meet strangers when I travelled. To be the joker in the pack at stag dos. To keep the batteries charged in the characters I played. Every milestone moved the posts. Marriage. Money. Job. House. Children. I thought they would deliver a soul and a safe space. They only pushed the line further and took another piece of me.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            The progression was not neat. It never is. The morning I knew was the morning the shakes told the truth. I needed a drink to stop them. Five bottles of wine for the day and one medicated in the airing cupboard for the two a.m. rattle in a pool of cold sweat. Sometimes it was not enough to get me to the next batch of sleepless sleep. I hid it well because I was never in one place long enough for severity to settle. I had a house big enough to conceal a vineyard and places to be across the world. I had a small sanctuary flat in London where bottles were easy to miss between flights. Everyone else saw the suit and the schedule. I saw the stash and the tremor.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            The game completed itself at thirty six. No more big milestones left to chase. The last drop of soul had been squeezed out of my job by another VC deck. I fell out of love with the work and I was the most senior person in Europe spending more time boozing than breathing. Cracks turned into a seam down the middle. The dam shivered. I hid behind depression and anxiety diagnoses that were not the full story. Years later, long into recovery, I would be properly diagnosed with ADHD. Back then I still thought ADHD belonged to naughty kids and Ritalin was punishment. Rehabs came and consultants came and branded psychiatrists came. None of them fit until a loving therapist named Jules sat with me, whiteboarded the whole story, and noticed the drug that ran under all the others. Love. She said it gently. It blew my mind. Then she guided me to a specialist who finally understood the noise.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            The swarm of bees was my prefrontal cortex under stimulated. The western world is a stimulant. The molecule of more that Lieberman describes has a simple name. Dopamine. Wanting. It drove me across continents for a girl I could not stop thinking about. It drove me toward money and status and things that glinted. Gambling lit it like a fuse. It was not booze that packed my wife's bags. It was the night the bank statements were printed and each transaction told the truth. The floor fell out from under her. The floor needed to fall out from under me.
                          </p>

                          {/* Visual Section Break */}
                          <div style={{
                            width: '60px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${BRAND.mid}40, transparent)`,
                            margin: '3rem auto'
                          }} />

                          <p style={{ marginBottom: '1.5rem' }}>
                            <span style={{ 
                              fontWeight: 600, 
                              color: BRAND.cyan,
                              borderBottom: `2px solid ${BRAND.cyan}20`,
                              paddingBottom: '2px'
                            }}>Recovery became protection.</span> I let go because I had to. The masks. The egos. The identities. The tricks I used to make you see me a certain way. The captions I hoped you would read under my face. Gone. I was rawer than the day I was born and somehow freer. I could see my thoughts. I could watch them pass like weather. Nothing outside could save me. Not status. Not stuff. Not a new city or a new room or a new hand to hold. <span style={{ 
                              fontWeight: 500, 
                              color: BRAND.cyan
                            }}>I had to journey inside to live in the world outside.</span>
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            Rooms came. The kind where honesty is the ticket. No hierarchy. No theatre. Every accent and creed. People telling the truth out loud. Old pages read like letters from last night. Meditation taught me to sit with the witness without asking for fireworks. Therapy walked me to the school gate and let me kneel beside the boy who could not stop crying. You are enough. Say it until it sticks.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            The diagnosis landed later. ADHD. Elvanse at sixty milligrams. My brain moved from bees to an army of ants, aligned and walking in step from prefrontal cortex to basal ganglia to thalamus to cerebellum. Focus. Clarity. Drive. Words cannot measure the click of that lock. Only God knows where I would be if the label had found me as a child. It was the missing piece in a thousand piece set. It did not replace recovery. It helped me use it. It gave me the last push to take Recoverlution live.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            I fell back in love with the brain I had been taming. I learned to work with its power. I learned the neuroscience because it gave me language for what I felt. I am mind and body and soul. The body is miraculous and heals first. The mind is slower and will not be rushed. It took a long time to build pathways to terminal destinations. You cannot fast track the rewire. You walk it back online. And the soul has been there all along. That is the feeling when your mind's eye shows you at seven, at sixteen, at thirty, at now, and each picture changes while the felt sense of being does not. That constant is where labels fall away and a person returns. <span style={{ 
                              fontWeight: 600, 
                              color: BRAND.cyan,
                              borderBottom: `2px solid ${BRAND.cyan}40`,
                              paddingBottom: '2px'
                            }}>Addiction is an experience, not an identity. Recovery the same.</span> The soul does not fit the box. It is the compass.
                          </p>

                          {/* Visual Section Break */}
                          <div style={{
                            width: '60px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${BRAND.mid}40, transparent)`,
                            margin: '3rem auto'
                          }} />

                          <p style={{ marginBottom: '1.5rem' }}>
                            I learned to crawl again. I tried to walk and fell. I crawled some more. I sprinted too soon and nursed the bruises. Recovery does not run by clock. The point is not arrival. The point is to be on the path. I followed the flow and did the right next thing in the moment. I could not change my code overnight. The brain needed time. Triggers and old thorns in the soul needed to be recognised as what they were. I sat with them. I named them. I accepted them. I let them go.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            There was no magic guide. No rehab with a wand. The best therapists walked me inward sooner and stood beside me when it hurt. The path was mine. Perfectly imperfect. Fascinating and unique. Timeless and long. If I can guide people and give them the way and the time to allow the rewire, to grow an identity of being strong enough to play in this world, then my story turns toward good. If you are content in the moment you are in, everything behind you has been worth it.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            The witness became a companion. Shame spoke. Excuses spoke back. The witness noticed. I began small. Rituals that fit a pocket. Hand on the door. Who is walking in. Not a role. A pulse. When heat rose I read the dashboard. The urge to win the point and lose the person. The old contract with control. Do not make it a movie. Make it a moment. Name it. Breathe. Choose one sentence I can stand inside tomorrow.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            Perception is partnership. Light enters. Memory paints. The brain completes from partial data. The picture is a best guess. Captions are guesses, not verdicts. Hold them lightly and let reality edit. Attention is the lantern I carry. It is how I love. Leadership is custody of collective attention. Power is permission. Power is responsibility. Power is restraint. Balance is a photograph. Rhythm is a body. Rhythm forgives. If a day spills, tomorrow is not a courtroom. It is a field. Start where truth is.
                          </p>

                          {/* Visual Section Break */}
                          <div style={{
                            width: '60px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${BRAND.cyan}40, transparent)`,
                            margin: '3rem auto'
                          }} />

                          <p style={{ marginBottom: '1.5rem' }}>
                            <span style={{ 
                              fontWeight: 600, 
                              color: BRAND.cyan
                            }}>Ask me why I am still here. I will say their names.</span> Three children who did not need a phoenix. They needed their dad. I became a man I could trust in a room with them. Less clever. More present. Watch the small mannerisms. Speak softly. <span style={{ 
                              fontWeight: 500, 
                              color: BRAND.cyan,
                              fontStyle: 'italic'
                            }}>Tell them they are enough. Tell the five year old in me the same.</span> I wrote the book for them first so they would know who I am when the world shouted what I did.
                          </p>

                          {/* Visual Section Break */}
                          <div style={{
                            width: '60px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${BRAND.cyan}40, transparent)`,
                            margin: '3rem auto'
                          }} />

                          {/* "Then I built a room" - Key Turning Point */}
                          <div style={{
                            background: `linear-gradient(135deg, ${BRAND.dark}05 0%, ${BRAND.mid}05 100%)`,
                            padding: '2rem',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            borderLeft: `3px solid ${BRAND.dark}`,
                            borderRadius: '0px'
                          }}>
                            <p style={{ 
                              marginBottom: '1.5rem',
                              fontSize: '1.125rem',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              letterSpacing: '-0.01em'
                            }}>
                              Then I built a room.
                            </p>

                            <p style={{ marginBottom: '0', lineHeight: 1.9, color: 'rgba(255, 255, 255, 0.95)' }}>
                              Not four walls. A way of being you can stand inside. A room where story is told without theatre and science stays human. Where the body's weather is named, not shamed. Where perception is partnership and attention is how we love. Where leadership is gentle custody of where we point the light. Where every gathering ends with one practice you can carry into morning.
                            </p>
                          </div>

                          <p style={{ 
                            marginBottom: '1rem',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.85)',
                            textAlign: 'center',
                            fontStyle: 'italic',
                            letterSpacing: '0.02em'
                          }}>
                            That room has a name now.
                          </p>

                          {/* Recoverlution Reveal */}
                          <div style={{
                            textAlign: 'center',
                            padding: '2.5rem 1rem',
                            marginBottom: '2rem'
                          }}>
                            <p style={{ 
                              fontSize: 'clamp(2rem, 4vw, 3rem)',
                              fontWeight: 800,
                              fontFamily: 'var(--font-display)',
                              background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.mid} 50%, #40E0D0 100%)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              letterSpacing: '-0.03em',
                              lineHeight: 1,
                              marginBottom: '0'
                            }}>
                              Recoverlution
                            </p>
                          </div>

                          <p style={{ marginBottom: '1.5rem' }}>
                            It is for the kid who felt filmed instead of seen. For the parent who feels like a fraud. For the partner who has run out of words. For the old friend who has run out of patience. For the woman who keeps a glass for courage. For the man who keeps vodka for quiet. For the one who thinks fire means ending. For the one who learns it can mean begin again.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            We start with lived story. Funny when it saves you. Honest where it hurts. True always.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            We fold in clear neuroscience so your nervous system makes sense when it lies.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            We finish with a practice you can stand inside by morning. Small enough to do. Big enough to change a day.
                          </p>

                          <p style={{ marginBottom: '2rem' }}>
                            No shame. No stagecraft. Useful over performative.
                          </p>

                          <p style={{ marginBottom: '1.5rem' }}>
                            If you are in discovery or day one or decade ten. If you are loving someone through it. This room is for you. Breathe. Listen. Take what helps. Leave what does not. Come back when the rhythm wobbles.
                          </p>

                          <p style={{ 
                            marginBottom: '0',
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.75)'
                          }}>
                            The lantern sits on the table. The water goes still. Ripples move outward. Two notes make a chord. Observer and observed. In that light we belong.
                          </p>

                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>

            {/* Other Team Members - Vertical Stack */}
            <div className="flex flex-col gap-8">
                
              {/* Sophie Strasser - CPO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden group"
                style={{
                  borderRadius: '0px',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.10), 0 6px 20px rgba(87, 57, 251, 0.12)',
                  transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)'
                }}
              >
                {/* Full-Bleed Photo Background */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                  <img 
                    src={sophiePhoto} 
                    alt="Sophie Strasser - Chief Product Officer"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                  />
                  {/* Subtle gradient overlay for legibility */}
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      background: `linear-gradient(135deg, ${BRAND.mid}08 0%, ${BRAND.mid}06 100%)`,
                      zIndex: 2
                    }}
                  />
                </div>

                {/* Hover Glow - Subtle Apple Pro style */}
                <div 
                  className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${BRAND.mid}12 0%, transparent 50%)`,
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}
                />

                <div className="relative z-10 p-6 flex flex-col justify-end" style={{ minHeight: '280px' }}>
                  {/* Glass Copy Container */}
                  <div 
                    className="p-5"
                    style={{
                      background: 'transparent',
                      borderRadius: '0px',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)'
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      Sophie Strasser
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.90)',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Chief Product Officer
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#FFFFFF',
                        fontWeight: 500,
                        marginBottom: '1rem',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Experience designer who believes recovery happens in the details. Sophie crafts micro-moments that spark discovery, introspection, and lasting habit change through thoughtful interaction design.
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Product Design', 'UX Research', 'Behavioral Science'].map((tag, i) => (
                        <div
                          key={i}
                          className="px-3 py-1.5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.20)',
                            borderColor: `${BRAND.mid}20`,
                            borderRadius: '0px',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            letterSpacing: '0.02em',
                            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)'
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mike Harsanyi - CTO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative overflow-hidden group"
                style={{
                  borderRadius: '0px',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.10), 0 6px 20px rgba(62, 43, 184, 0.12)',
                  transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)'
                }}
              >
                {/* Full-Bleed Photo Background */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                  <img 
                    src={mikePhoto} 
                    alt="Mike Harsanyi - Chief Technology Officer"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                  />
                  {/* Subtle gradient overlay for legibility */}
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      background: `linear-gradient(135deg, ${BRAND.dark}08 0%, ${BRAND.dark}06 100%)`,
                      zIndex: 2
                    }}
                  />
                </div>

                {/* Hover Glow - Subtle Apple Pro style */}
                <div 
                  className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${BRAND.dark}12 0%, transparent 50%)`,
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}
                />

                <div className="relative z-10 p-6 flex flex-col justify-end" style={{ minHeight: '280px' }}>
                  {/* Glass Copy Container */}
                  <div 
                    className="p-5"
                    style={{
                      background: 'transparent',
                      borderRadius: '0px',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)'
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      Mike Harsanyi
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.90)',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Chief Technology Officer
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#FFFFFF',
                        fontWeight: 500,
                        marginBottom: '1rem',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Neuro-adaptive systems engineer building AI that understands context, respects autonomy, and knows when to intervene. Mike architects technology that serves the recovery journey and not the algorithm.
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['AI Architecture', 'Neuroscience Tech', 'Privacy Engineering'].map((tag, i) => (
                        <div
                          key={i}
                          className="px-3 py-1.5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.20)',
                            borderRadius: '0px',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            letterSpacing: '0.02em',
                            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)'
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Manan Mehta - CMO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative overflow-hidden group"
                style={{
                  borderRadius: '0px',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.10), 0 6px 20px rgba(64, 224, 208, 0.12)',
                  transition: 'all 0.7s cubic-bezier(0.19, 1, 0.22, 1)'
                }}
              >
                {/* Full-Bleed Photo Background */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                  <img 
                    src={mananPhoto} 
                    alt="Manan Mehta - Chief Marketing Officer"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                  />
                  {/* Subtle gradient overlay for legibility */}
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      background: `linear-gradient(135deg, ${BRAND.cyan}08 0%, ${BRAND.cyan}06 100%)`,
                      zIndex: 2
                    }}
                  />
                </div>

                {/* Hover Glow - Subtle Apple Pro style */}
                <div 
                  className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${BRAND.cyan}12 0%, transparent 50%)`,
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}
                />

                <div className="relative z-10 p-6 flex flex-col justify-end" style={{ minHeight: '280px' }}>
                  {/* Glass Copy Container */}
                  <div 
                    className="p-5"
                    style={{
                      background: 'transparent',
                      borderRadius: '0px',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)'
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      Manan Mehta
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.90)',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Chief Marketing Officer
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#FFFFFF',
                        fontWeight: 500,
                        marginBottom: '1rem',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      Narrative strategist who connects hearts before features and builds belief before the first login. Manan translates neuroscience into stories that make clinicians lean forward and administrators say yes.
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Brand Strategy', 'Clinical Positioning', 'Storytelling'].map((tag, i) => (
                        <div
                          key={i}
                          className="px-3 py-1.5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.20)',
                            borderRadius: '0px',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            letterSpacing: '0.02em',
                            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)'
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTAClean 
        backgroundAsset={finalCTAAsset}
        eyebrow="THE FUTURE"
        headline="Identity-level recovery"
        accentWord="Identity-level"
        subtext="We envision a world where every person in recovery has access to neuroscience-backed tools, where clinicians can focus on connection instead of logistics, and where outcomes are measured, improved, and celebrated."
        buttonText="JOIN THE MISSION"
        onButtonClick={onScheduleDemo}
      />



      {/* Master Marketing Footer */}
      <MarketingFooter onNavigate={onNavigate} />

      {/* Shimmer Animation Keyframes */}
      <style>{`
        @keyframes shimmer-glass {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0.3;
          }
          50% {
            transform: translateX(100%);
            opacity: 0.8;
          }
        }
      `}</style>

    </div>
  );
}
