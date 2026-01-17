import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, Sparkles, Layers, ChevronDown, X } from 'lucide-react';
import { Video, BarChart3, Heart, TrendingUp, Settings, Users, ShieldCheck } from 'lucide-react';
import { Compass } from 'lucide-react';
import InlineCheckout from './InlineCheckout';
import EnterpriseContactForm from './EnterpriseContactForm';

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  priceDetail: string;
  eyebrow: string;
  hooks: {
    icon: React.ElementType;
    label: string;
    description: string;
  }[];
  deepDive: {
    ecosystemStatement: string;
    flowStages: {
      number: string;
      icon: React.ElementType;
      title: string;
      description: string;
      points: string[];
      highlighted?: boolean;
    }[];
  };
  cta: string;
  highlighted?: boolean;
  assetUrl: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Foundation',
    tagline: 'Add continuity. Keep your rhythm.',
    price: '£99',
    priceDetail: 'per month',
    eyebrow: 'THE ESSENTIALS',
    hooks: [
      {
        icon: Video,
        label: 'Practice architecture',
        description: 'Sessions, scheduling, billing, records. Infrastructure that works with your existing model.'
      },
      {
        icon: Sparkles,
        label: 'Continuity extends your work',
        description: 'Companion experience carries your method between sessions. Clients deepen engagement.'
      },
      {
        icon: Heart,
        label: 'Recurring revenue, existing rhythm',
        description: 'Clients add companion for ongoing support. You gain recurring income without restructuring.'
      },
      {
        icon: BarChart3,
        label: 'Intelligence that surfaces',
        description: 'STATE signals, LUMA support, Momentum insights. Full platform intelligence.'
      },
      {
        icon: TrendingUp,
        label: 'Speed outcomes',
        description: 'Accelerate therapeutic impact. See engagement patterns. Track what works.'
      }
    ],
    deepDive: {
      ecosystemStatement: 'The complete platform for extending your reach. All nine features. Companion continuity clients opt into alongside your existing practice. Add recurring revenue without changing your rhythm.',
      flowStages: [
        {
          number: '01',
          icon: Video,
          title: 'Practice architecture in place',
          description: 'Infrastructure works with your existing flow.',
          points: [
            'Sessions anywhere with HIPAA compliant video conferencing',
            'Automatic scheduling syncs with your calendar',
            'Invisible billing and living records in one place'
          ]
        },
        {
          number: '02',
          icon: Sparkles,
          title: 'Extend your reach',
          description: 'Companion continuity becomes a separate value stream clients choose.',
          points: [
            'They invest in ongoing support alongside your sessions',
            'You gain recurring revenue without operational overhaul',
            'Your existing model stays intact while engagement deepens'
          ],
          highlighted: true
        },
        {
          number: '03',
          icon: Compass,
          title: 'Continuity carries forward',
          description: 'Your method moves into daily life.',
          points: [
            'Client companion app with structured weekly journeys',
            'Your frameworks become everyday support between sessions',
            'Therapeutic voice extends without depleting your capacity'
          ]
        },
        {
          number: '04',
          icon: BarChart3,
          title: 'Intelligence reveals patterns',
          description: 'Full platform intelligence shows what matters.',
          points: [
            'STATE signals show readiness before they arrive',
            'LUMA provides contextual support during activation spikes',
            'Momentum visualizations reveal longitudinal progress'
          ]
        },
        {
          number: '05',
          icon: TrendingUp,
          title: 'Outcomes accelerate',
          description: 'Speed therapeutic impact with continuous engagement.',
          points: [
            'Engagement patterns surface what works',
            'Risk indicators appear before crisis moments',
            'Measurable outcomes replace anecdotal stories'
          ]
        }
      ]
    },
    cta: 'Start with Foundation',
    highlighted: false,
    assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/products/Foundation.avif'
  },
  {
    name: 'Professional',
    tagline: 'Your model. Your rhythm. Complete control.',
    price: '£199',
    priceDetail: 'per month',
    eyebrow: 'THE COMPLETE SYSTEM',
    hooks: [
      {
        icon: Video,
        label: 'Practice architecture',
        description: 'Sessions, scheduling, billing, records. Infrastructure that accelerates impact.'
      },
      {
        icon: Settings,
        label: 'Continuity becomes yours',
        description: 'Companion lives in your offering. Sessions become journeys. Appointments become commitments.'
      },
      {
        icon: Sparkles,
        label: 'Complete control',
        description: 'Your structure. Your pricing. Your client relationships. Episodic becomes recurring.'
      },
      {
        icon: TrendingUp,
        label: 'Speed, scale, sustain',
        description: 'Multiply impact without extending hours. Your capacity protected by the same care you deliver.'
      },
      {
        icon: BarChart3,
        label: 'Intelligence reveals readiness',
        description: 'Walk in knowing. Daily signals show state. Longitudinal patterns prove progress.'
      }
    ],
    deepDive: {
      ecosystemStatement: 'The complete system for continuous care. All nine features. Dynamic control. Transform episodic sessions into recurring partnerships where clients commit to the path and you control the entire experience.',
      flowStages: [
        {
          number: '01',
          icon: Video,
          title: 'Practice architecture accelerates',
          description: 'Infrastructure built for transformation.',
          points: [
            'Sessions anywhere with HIPAA compliant video conferencing',
            'Automatic scheduling syncs with your calendar',
            'Invisible billing and living records in one place'
          ]
        },
        {
          number: '02',
          icon: Settings,
          title: 'Control your model',
          description: 'Dynamic control transforms how care flows.',
          points: [
            'You set the rhythm. Your pricing. Your structure.',
            'Clients pay you directly for the complete journey',
            'Episodic becomes recurring. Transactional becomes relational.'
          ],
          highlighted: true
        },
        {
          number: '03',
          icon: Sparkles,
          title: 'Continuity compounds',
          description: 'Companion experience lives under your roof.',
          points: [
            'Client companion app becomes part of your offering',
            'Your frameworks become the infrastructure clients commit to',
            'Between sessions becomes continuous care you orchestrate'
          ]
        },
        {
          number: '04',
          icon: BarChart3,
          title: 'Intelligence flows',
          description: 'Full platform intelligence reveals readiness.',
          points: [
            'STATE signals show nervous system state before they arrive',
            'LUMA provides 24/7 support scaling your clinical voice',
            'Momentum visualizations prove impact to clients and commissioners'
          ]
        },
        {
          number: '05',
          icon: TrendingUp,
          title: 'Speed, scale, sustain',
          description: 'Deepen impact without depleting capacity.',
          points: [
            'Engagement patterns show what works in real time',
            'Risk predictions surface before patterns spiral',
            'Your method works while you rest. Relationships compound.'
          ]
        }
      ]
    },
    cta: 'Transform with Professional',
    highlighted: true,
    assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/products/Professional.avif'
  },
  {
    name: 'Enterprise',
    tagline: 'Institutional scale. Your infrastructure. Complete control.',
    price: 'Custom',
    priceDetail: 'let us talk',
    eyebrow: 'THE INSTITUTIONAL MODEL',
    hooks: [
      {
        icon: Video,
        label: 'Enterprise architecture',
        description: 'Multi-location sessions. Enterprise scheduling. Custom billing integration. Your scale.'
      },
      {
        icon: Sparkles,
        label: 'White-label continuity',
        description: 'Branded companion app. Organization journeys. Your clinical method at institutional scale.'
      },
      {
        icon: BarChart3,
        label: 'Organizational intelligence',
        description: 'Aggregate insights. Custom reporting. Prove impact to commissioners and funders.'
      },
      {
        icon: Users,
        label: 'Dedicated partnership',
        description: 'Custom integration. Multi-location orchestration. Priority support built for your deployment.'
      },
      {
        icon: ShieldCheck,
        label: 'Your rules, your infrastructure',
        description: 'SSO. Custom workflows. Enterprise security. Your revenue model. Complete sovereignty.'
      }
    ],
    deepDive: {
      ecosystemStatement: 'The complete system for institutional transformation. All nine features at organizational scale. White-label deployment. Your brand, your method, your infrastructure. Speed, scale, and sustain care across locations.',
      flowStages: [
        {
          number: '01',
          icon: Video,
          title: 'Enterprise architecture deploys',
          description: 'Multi-location infrastructure at scale.',
          points: [
            'Multi-location sessions with enterprise scheduling',
            'Custom billing integration and unified records',
            'Organization-wide HIPAA compliance and security architecture'
          ]
        },
        {
          number: '02',
          icon: Sparkles,
          title: 'Brand your continuity',
          description: 'White-label companion becomes your product.',
          points: [
            'Branded companion app with your organization identity',
            'Custom journey architecture encoding your clinical method',
            'Your science. Your frameworks. Your infrastructure at scale.'
          ],
          highlighted: true
        },
        {
          number: '03',
          icon: BarChart3,
          title: 'Intelligence aggregates',
          description: 'Organizational insights across all locations.',
          points: [
            'Aggregate outcomes proving impact to commissioners',
            'Custom reporting dashboards for funders and stakeholders',
            'Multi-location analytics revealing what works at scale'
          ]
        },
        {
          number: '04',
          icon: Users,
          title: 'Partnership deploys you',
          description: 'Dedicated success team built for your scale.',
          points: [
            'Custom integration with your existing systems',
            'Dedicated implementation and multi-location training',
            'Priority technical support and ongoing optimization'
          ]
        },
        {
          number: '05',
          icon: ShieldCheck,
          title: 'Your infrastructure, your rules',
          description: 'Complete sovereignty at institutional scale.',
          points: [
            'SSO, custom workflows, enterprise-grade security',
            'Your revenue model. Your processes. Your control.',
            'Complete white-label deployment options available'
          ]
        }
      ]
    },
    cta: 'Transform your organization',
    highlighted: false,
    assetUrl: 'https://owtwhnvntwavuuvkrmvh.supabase.co/storage/v1/object/public/dashboard-assets/Website/Therapy/products/Enterprise.avif'
  }
];

export default function PricingExperience() {
  const [selectedTier, setSelectedTier] = useState<number>(1); // Default to Professional
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const handleCTAClick = () => {
    setIsExpanded(false);
    setShowCheckout(true);
  };

  return (
    <>
      <section className="py-20 md:py-32" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          
          {/* Header */}
          <div className="section-header-right">
            <motion.div
              className="subheading-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-subheading">
                One platform. Three ways to build recurring revenue into your practice.
              </p>
            </motion.div>

            <motion.div
              className="headline-col"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="section-eyebrow">
                <Sparkles size={14} style={{ strokeWidth: 2.5 }} />
                <span>PRICING</span>
              </div>
              <h2 className="section-headline-therapy">
                Curated continuity.<br />
                <span className="accent">Recurring revenue.</span>
              </h2>
            </motion.div>
          </div>

          {/* Tier Selector Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12 mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {pricingTiers.map((tier, index) => (
              <button
                key={tier.name}
                onClick={() => {
                  setSelectedTier(index);
                  setIsExpanded(false); // Reset expansion when switching tiers
                }}
                className="relative group transition-all duration-300"
                style={{
                  padding: '0.875rem 1.75rem',
                  border: selectedTier === index 
                    ? '2px solid var(--color-primary)' 
                    : '2px solid var(--color-border)',
                  backgroundColor: selectedTier === index 
                    ? 'var(--color-primary)' 
                    : 'transparent',
                  color: selectedTier === index 
                    ? '#FFFFFF' 
                    : 'var(--color-text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  letterSpacing: '-0.01em',
                  borderRadius: '0px',
                  cursor: 'pointer'
                }}
              >
                {tier.highlighted && selectedTier !== index && (
                  <Sparkles 
                    size={14} 
                    className="inline-block mr-1.5 mb-0.5"
                    style={{ color: 'var(--color-primary)' }}
                  />
                )}
                {tier.name}
              </button>
            ))}
          </motion.div>

          {/* Selected Tier Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedTier}-${isExpanded}-${showCheckout}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative"
              style={{
                borderRadius: '0px',
                overflow: 'hidden'
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0"
                style={{ zIndex: 1 }}
              >
                <img 
                  src={pricingTiers[selectedTier].assetUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: isExpanded || showCheckout
                      ? 'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)'
                      : 'linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.35) 100%)',
                    zIndex: 2,
                    transition: 'background 0.5s ease'
                  }}
                />
              </div>

              {/* Content Overlay */}
              <div 
                className="relative"
                style={{
                  zIndex: 3,
                  padding: 'clamp(2.5rem, 5vw, 4rem)',
                  minHeight: isExpanded || showCheckout ? 'auto' : '600px'
                }}
              >
                {showCheckout ? (
                  /* CHECKOUT VIEW: Inline checkout or Enterprise form */
                  selectedTier === 2 ? (
                    <EnterpriseContactForm onBack={() => setShowCheckout(false)} />
                  ) : (
                    <InlineCheckout
                      tier={pricingTiers[selectedTier].name.toLowerCase() as 'foundation' | 'professional'}
                      onBack={() => setShowCheckout(false)}
                    />
                  )
                ) : !isExpanded ? (
                  /* INITIAL VIEW: Clean & Simple */
                  <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Left: Tier Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {/* Eyebrow */}
                      <div 
                        className="mb-4 flex items-center gap-2"
                      >
                        <Layers size={14} style={{ strokeWidth: 2.5, color: '#FFFFFF' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.6875rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#FFFFFF',
                            opacity: 0.9
                          }}
                        >
                          {pricingTiers[selectedTier].eyebrow}
                        </span>
                      </div>

                      {/* Tier Name */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                          color: '#FFFFFF',
                          marginBottom: '1rem'
                        }}
                      >
                        {pricingTiers[selectedTier].name}
                      </h3>

                      {/* Tagline */}
                      <p
                        style={{
                          fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                          lineHeight: 1.4,
                          color: 'rgba(255, 255, 255, 0.95)',
                          marginBottom: '3rem',
                          fontWeight: 500
                        }}
                      >
                        {pricingTiers[selectedTier].tagline}
                      </p>

                      {/* Pricing */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 900,
                            fontSize: pricingTiers[selectedTier].price === 'Custom' ? '2.5rem' : 'clamp(3.5rem, 6vw, 5rem)',
                            letterSpacing: '-0.03em',
                            lineHeight: 1,
                            color: '#FFFFFF'
                          }}
                        >
                          {pricingTiers[selectedTier].price}
                        </span>
                        {pricingTiers[selectedTier].price !== 'Custom' && (
                          <span
                            style={{
                              fontSize: '1.25rem',
                              color: 'rgba(255, 255, 255, 0.85)',
                              fontWeight: 500
                            }}
                          >
                            {pricingTiers[selectedTier].priceDetail}
                          </span>
                        )}
                      </div>
                      {pricingTiers[selectedTier].price === 'Custom' && (
                        <p
                          style={{
                            fontSize: '1.25rem',
                            color: 'rgba(255, 255, 255, 0.85)',
                            marginBottom: '0.5rem',
                            fontWeight: 500
                          }}
                        >
                          {pricingTiers[selectedTier].priceDetail}
                        </p>
                      )}
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'rgba(255, 255, 255, 0.75)',
                          marginBottom: '3rem',
                          fontWeight: 500
                        }}
                      >
                        Platform access
                      </p>
                    </motion.div>

                    {/* Right: Five Hooks Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="space-y-6"
                    >
                      {/* Five Hooks Card */}
                      <div
                        style={{
                          padding: '2.5rem',
                          background: 'rgba(255, 255, 255, 0.12)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '2px solid rgba(255, 255, 255, 0.25)',
                          borderRadius: '0px'
                        }}
                      >
                        {/* Five hooks grid */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                          {pricingTiers[selectedTier].hooks.map((hook, idx) => {
                            const Icon = hook.icon;
                            return (
                              <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                <div
                                  style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '0px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    flexShrink: 0
                                  }}
                                >
                                  <Icon size={18} style={{ color: '#FFFFFF', strokeWidth: 2.5 }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <h5
                                    style={{
                                      fontFamily: 'var(--font-display)',
                                      fontWeight: 700,
                                      fontSize: '1rem',
                                      letterSpacing: '-0.01em',
                                      color: '#FFFFFF',
                                      marginBottom: '0.25rem',
                                      lineHeight: 1.3
                                    }}
                                  >
                                    {hook.label}
                                  </h5>
                                  <p
                                    style={{
                                      fontSize: '0.875rem',
                                      lineHeight: 1.5,
                                      color: 'rgba(255, 255, 255, 0.8)',
                                      fontWeight: 500
                                    }}
                                  >
                                    {hook.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Explore link */}
                        <button
                          onClick={() => setIsExpanded(true)}
                          className="group w-full"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '0.875rem 1.5rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '0.9375rem',
                            letterSpacing: '-0.01em',
                            borderRadius: '0px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Explore how it works
                          <ChevronDown 
                            size={16} 
                            className="transition-transform duration-300 group-hover:translate-y-1"
                            strokeWidth={2.5}
                          />
                        </button>
                      </div>

                      {/* CTA Button - ALWAYS PRESENT */}
                      <button
                        onClick={() => handleCTAClick()}
                        className="group w-full transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          padding: '1.25rem 2rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1rem',
                          letterSpacing: '-0.01em',
                          borderRadius: '0px',
                          border: '2px solid rgba(255, 255, 255, 0.4)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {pricingTiers[selectedTier].cta}
                        <ArrowRight 
                          size={18} 
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={2.5}
                        />
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  /* EXPANDED VIEW: Deep Dive */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-12"
                  >
                    {/* Close Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="group transition-all duration-300"
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          letterSpacing: '-0.01em',
                          borderRadius: '0px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <X size={16} strokeWidth={2.5} />
                        Close
                      </button>
                    </div>

                    {/* Tier Header */}
                    <div className="text-center">
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: 'clamp(2rem, 4vw, 3rem)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                          color: '#FFFFFF',
                          marginBottom: '0.75rem'
                        }}
                      >
                        {pricingTiers[selectedTier].name}
                      </h3>
                      <p
                        style={{
                          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                          lineHeight: 1.6,
                          color: 'rgba(255, 255, 255, 0.85)',
                          fontWeight: 500,
                          maxWidth: '42rem',
                          margin: '0 auto'
                        }}
                      >
                        {pricingTiers[selectedTier].deepDive.ecosystemStatement}
                      </p>
                    </div>

                    {/* FLOWING JOURNEY - Vertical timeline */}
                    <div 
                      className="max-w-3xl mx-auto"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3rem'
                      }}
                    >
                      {pricingTiers[selectedTier].deepDive.flowStages.map((stage, idx) => {
                        const Icon = stage.icon;
                        const isHighlighted = stage.highlighted;
                        
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            style={{
                              position: 'relative',
                              paddingLeft: 'clamp(3rem, 6vw, 4.5rem)'
                            }}
                          >
                            {/* Connecting Line */}
                            {idx < pricingTiers[selectedTier].deepDive.flowStages.length - 1 && (
                              <div
                                style={{
                                  position: 'absolute',
                                  left: 'clamp(1rem, 2vw, 1.375rem)',
                                  top: 'clamp(2.5rem, 4vw, 3.5rem)',
                                  width: '2px',
                                  height: 'calc(100% + 1.5rem)',
                                  background: 'rgba(255, 255, 255, 0.2)'
                                }}
                              />
                            )}

                            {/* Stage Number Circle */}
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: 'clamp(2.25rem, 4vw, 3rem)',
                                height: 'clamp(2.25rem, 4vw, 3rem)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isHighlighted ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.12)',
                                border: isHighlighted ? '2px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.2)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 900,
                                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                                color: '#FFFFFF',
                                letterSpacing: '-0.02em'
                              }}
                            >
                              {stage.number}
                            </div>

                            {/* Stage Content */}
                            <div>
                              {/* Icon + Title Row */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div
                                  style={{
                                    width: '2rem',
                                    height: '2rem',
                                    borderRadius: '0px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: isHighlighted ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                                  }}
                                >
                                  <Icon size={16} style={{ color: '#FFFFFF', strokeWidth: 2.5 }} />
                                </div>
                                <h4
                                  style={{
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: isHighlighted ? 800 : 700,
                                    fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                                    letterSpacing: '-0.02em',
                                    color: '#FFFFFF',
                                    lineHeight: 1.2
                                  }}
                                >
                                  {stage.title}
                                </h4>
                              </div>

                              {/* Description */}
                              <p
                                style={{
                                  fontSize: 'clamp(0.875rem, 1.5vw, 0.9375rem)',
                                  lineHeight: 1.5,
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  marginBottom: '1rem',
                                  fontWeight: 500
                                }}
                              >
                                {stage.description}
                              </p>

                              {/* Points */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                {stage.points.map((point, pointIdx) => (
                                  <div key={pointIdx} style={{ display: 'flex', gap: '0.625rem' }}>
                                    <span
                                      style={{
                                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                                        lineHeight: 1.6,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 500
                                      }}
                                    >
                                      {point}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center pt-6">
                      <button
                        onClick={() => handleCTAClick()}
                        className="group transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          padding: '1.25rem 3rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          letterSpacing: '-0.01em',
                          borderRadius: '0px',
                          border: '2px solid rgba(255, 255, 255, 0.4)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        {pricingTiers[selectedTier].cta}
                        <ArrowRight 
                          size={20} 
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={2.5}
                        />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              marginTop: '3rem',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                maxWidth: '48rem',
                margin: '0 auto',
                fontWeight: 500
              }}
            >
              No setup fees. No contracts. No per-client charges. Your platform fee stays fixed while your practice grows.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
}