import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionConfig } from './config';
import { useReducedMotion } from './hooks';

/**
 * MotionCard: Spring-animated container
 */
interface MotionCardProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  variant?: keyof typeof motionConfig.variants;
}

export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ children, delay = 0, variant = 'slideUp', ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const variants = motionConfig.variants[variant];

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={prefersReduced ? { duration: 0 } : { ...motionConfig.spring.gentle, delay }}
        className="card"
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

MotionCard.displayName = 'MotionCard';

/**
 * MotionButton: Spring + ripple on press
 */
interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        className={`button ${variant === 'secondary' ? 'secondary' : ''}`}
        whileHover={prefersReduced ? {} : { scale: 1.02 }}
        whileTap={prefersReduced ? {} : { scale: 0.98 }}
        transition={motionConfig.spring.snappy}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

MotionButton.displayName = 'MotionButton';

/**
 * MotionProofPill: Success celebration with bounce
 */
interface MotionProofPillProps extends React.HTMLProps<HTMLDivElement> {
  label: string;
  status: 'captured' | 'pending' | 'missed';
  celebrating?: boolean;
}

export const MotionProofPill = React.forwardRef<HTMLDivElement, MotionProofPillProps>(
  ({ label, status, celebrating = false, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={`badge ${status}`}
        initial={prefersReduced ? {} : { scale: 0.8, opacity: 0 }}
        animate={
          celebrating && !prefersReduced
            ? {
                scale: [1, 1.15, 1],
                opacity: 1,
                backgroundColor: ['rgba(126, 224, 163, 0.14)', 'rgba(126, 224, 163, 0.3)', 'rgba(126, 224, 163, 0.14)'],
              }
            : { scale: 1, opacity: 1 }
        }
        transition={
          celebrating && !prefersReduced
            ? motionConfig.spring.bouncy
            : { duration: motionConfig.duration.fast }
        }
        {...props}
      >
        <span>{label}</span>
      </motion.div>
    );
  },
);

MotionProofPill.displayName = 'MotionProofPill';

/**
 * MotionView: Cross-fade + stagger children on view change
 */
interface MotionViewProps {
  children: React.ReactNode;
  isExiting?: boolean;
}

export const MotionView = React.forwardRef<HTMLDivElement, MotionViewProps>(
  ({ children, isExiting = false }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={prefersReduced ? {} : { opacity: 1 }}
        exit={prefersReduced ? {} : { opacity: 0 }}
        transition={{ duration: motionConfig.duration.fast / 1000 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isExiting ? 'exiting' : 'visible'}
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: motionConfig.duration.base / 1000 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  },
);

MotionView.displayName = 'MotionView';

/**
 * MotionList: Staggered cascade of list items
 */
interface MotionListProps {
  items: React.ReactNode[];
  layout?: 'vertical' | 'horizontal';
}

export const MotionList = React.forwardRef<HTMLDivElement, MotionListProps>(
  ({ items, layout = 'vertical' }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={layout === 'vertical' ? 'list' : 'row'}
        initial={prefersReduced ? {} : 'hidden'}
        animate={prefersReduced ? {} : 'visible'}
        variants={{
          visible: {
            transition: {
              staggerChildren: prefersReduced ? 0 : motionConfig.transitions.viewChange.stagger,
            },
          },
        }}
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={motionConfig.variants.slideUp}
            transition={motionConfig.spring.gentle}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    );
  },
);

MotionList.displayName = 'MotionList';

/**
 * MotionToggle: Spring-animated switch
 */
interface MotionToggleProps {
  checked: boolean;
  onChange?: (next: boolean) => void;
}

export const MotionToggle = React.forwardRef<HTMLDivElement, MotionToggleProps>(
  ({ checked, onChange }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={`toggle ${checked ? 'on' : ''}`}
        onClick={() => onChange?.(!checked)}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange?.(!checked);
          }
        }}
      >
        <motion.div
          className="toggle-thumb"
          animate={prefersReduced ? {} : { x: checked ? 18 : 0 }}
          transition={motionConfig.spring.snappy}
        />
      </motion.div>
    );
  },
);

MotionToggle.displayName = 'MotionToggle';

/**
 * MotionAlert: Shake + pulse for escalation
 */
interface MotionAlertProps {
  active?: boolean;
  children: React.ReactNode;
}

export const MotionAlert = React.forwardRef<HTMLDivElement, MotionAlertProps>(
  ({ active = false, children }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        animate={
          active && !prefersReduced
            ? {
                x: [-8, 8, -8, 8, 0],
                boxShadow: [
                  '0 0 0 0 rgba(255, 111, 97, 0.7)',
                  '0 0 20px 10px rgba(255, 111, 97, 0.3)',
                  '0 0 0 0 rgba(255, 111, 97, 0)',
                ],
              }
            : {}
        }
        transition={active && !prefersReduced ? { duration: 0.6, ease: 'easeInOut' } : {}}
      >
        {children}
      </motion.div>
    );
  },
);

MotionAlert.displayName = 'MotionAlert';
