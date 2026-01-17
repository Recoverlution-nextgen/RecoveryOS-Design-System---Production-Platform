/**
 * BADGE TAG SIGNATURE SYSTEM
 * The Recoverlution standard for content category tags
 * 
 * RULES:
 * - Always use 3 tags (consistency, visual rhythm)
 * - Square corners (infiniteK compliance)
 * - Dynamic color from parent context
 * - Subtle hover interactions
 * - Staggered entrance animations
 */

import { motion } from 'motion/react';

interface BadgeTagSignatureProps {
  tags: string[];
  color: string;
  delay?: number;
}

export function BadgeTagSignature({ tags, color, delay = 0.4 }: BadgeTagSignatureProps) {
  
  // Always show exactly 3 tags for visual consistency
  const displayTags = tags.slice(0, 3);
  
  // Ensure we always have 3 tags (pad if needed)
  while (displayTags.length < 3) {
    displayTags.push('');
  }
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {displayTags.map((tag, index) => {
        // Skip rendering empty tags
        if (!tag) return null;
        
        return (
          <motion.div 
            key={index}
            className="px-4 py-2.5 border group cursor-default"
            style={{
              background: `linear-gradient(135deg, ${color}12, ${color}08)`,
              borderColor: `${color}30`,
              borderRadius: '0px',
              boxShadow: `0 2px 8px ${color}10, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
              transition: 'all 0.3s ease'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: delay + (index * 0.08),
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
              y: -2,
              boxShadow: `0 4px 16px ${color}20, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
            }}
          >
            <span 
              className="uppercase tracking-wider"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                color: color
              }}
            >
              {tag}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * USAGE EXAMPLE:
 * 
 * <BadgeTagSignature 
 *   tags={['EMOTIONAL REGULATION', 'IDENTITY INTEGRATION', 'COGNITIVE REFRAMING']} 
 *   color="#E85D75"
 *   delay={0.4}
 * />
 */
