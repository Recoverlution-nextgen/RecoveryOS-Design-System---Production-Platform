import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface StepProps {
  number: string;
  title: string;
  subtitle: string;
  details: string[];
  assetUrl: string;
  delay?: number;
}

const JourneyStep: React.FC<StepProps> = ({
  number,
  title,
  subtitle,
  details,
  assetUrl,
  delay = 0
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <motion.div
      className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      style={{
        borderRadius: '0px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(87, 57, 251, 0.12)',
      }}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? `Close ${title}` : `Explore ${title}`}
      whileHover={{
        scale: 1.012,
        y: -3,
        boxShadow: '0 28px 80px rgba(0, 0, 0, 0.12), 0 12px 32px rgba(87, 57, 251, 0.15)'
      }}
    >
      {/* Shimmer Animation Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
          animation: 'shimmer-glass 12s ease-in-out infinite',
          borderRadius: '0px',
          zIndex: 100
        }}
      />

      {/* Background Image - Always Visible */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <img 
          src={assetUrl}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
        />
        {/* Gradient overlay for text legibility */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 40%, transparent 70%)',
            zIndex: 2
          }}
        />
      </div>

      {/* Content Container */}
      <div 
        className="relative p-6 lg:p-6 flex flex-col justify-end" 
        style={{ 
          zIndex: 10,
          height: '100%'
        }}
      >
        {/* Copy Container */}
        <div 
          className="p-6 lg:p-8 flex flex-col"
          style={{
            background: isFlipped 
              ? 'rgba(255, 255, 255, 0.08)'
              : 'transparent',
            backdropFilter: isFlipped ? 'blur(20px) saturate(150%)' : 'none',
            WebkitBackdropFilter: isFlipped ? 'blur(20px) saturate(150%)' : 'none',
            border: isFlipped ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
            borderRadius: '0px',
            boxShadow: isFlipped 
              ? '0 8px 32px rgba(87, 57, 251, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : 'none'
          }}
        >
          
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              // FRONT FACE
              <motion.div
                key="front"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Step Number */}
                <div className="mb-4">
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 0.9,
                      color: 'rgba(255, 255, 255, 0.5)',
                      display: 'block'
                    }}
                  >
                    {number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                    marginBottom: '0.75rem'
                  }}
                >
                  {title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500,
                    marginBottom: '1.5rem',
                    maxWidth: '48rem'
                  }}
                >
                  {subtitle}
                </p>

                {/* Tap to Explore Button */}
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 border self-start"
                  style={{
                    background: 'linear-gradient(135deg, rgba(87, 57, 251, 0.12), rgba(87, 57, 251, 0.08))',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '0px',
                    backdropFilter: 'blur(16px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                    boxShadow: '0 2px 8px rgba(87, 57, 251, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    TAP TO EXPLORE
                  </span>
                </div>
              </motion.div>
            ) : (
              // BACK FACE - White text on asset
              <motion.div
                key="back"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Header with Close Button */}
                <div className="flex justify-between items-start mb-4">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      color: '#FFFFFF'
                    }}
                  >
                    {title}
                  </h3>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlip();
                    }}
                    className="flex-shrink-0 p-2 hover:bg-white/10 transition-colors"
                    style={{
                      color: '#FFFFFF',
                      borderRadius: '0px'
                    }}
                    aria-label="Close"
                  >
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5">
                  {details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 
                        size={16} 
                        style={{ 
                          color: '#FFFFFF',
                          flexShrink: 0,
                          marginTop: '0.125rem',
                          strokeWidth: 2.5
                        }} 
                      />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          color: 'rgba(255, 255, 255, 0.95)',
                          fontWeight: 500
                        }}
                      >
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </motion.div>
  );
};

interface JourneyStepsFlowProps {
  steps: Array<{
    number: string;
    title: string;
    subtitle: string;
    details: string[];
    assetUrl: string;
  }>;
}

export const JourneyStepsFlow: React.FC<JourneyStepsFlowProps> = ({ steps }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      {steps.map((step, index) => (
        <JourneyStep
          key={index}
          number={step.number}
          title={step.title}
          subtitle={step.subtitle}
          details={step.details}
          assetUrl={step.assetUrl}
          delay={index * 0.15}
        />
      ))}
    </div>
  );
};