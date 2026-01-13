import type { Meta, StoryObj } from '@storybook/react';
import { LoopRunner, LoopConfig } from '../components/loop/LoopRunner';

const meta = {
  title: 'Belief Machines/LoopRunner',
  component: LoopRunner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoopRunner>;

export default meta;
type Story = StoryObj<typeof meta>;

const anchorConfig: LoopConfig = {
  intent: 'anchor',
  duration: 10,
  tempo: 'moment',
  depth: 'glance',
};

const clarityConfig: LoopConfig = {
  intent: 'clarity',
  duration: 30,
  tempo: 'moment',
  depth: 'seed',
};

/**
 * Individual lens: "Settle the wave"
 */
export const IndividualAnchor: Story = {
  args: {
    config: anchorConfig,
    lens: 'individual',
    onReceiptCreate: (trace) => console.log('Trace created:', trace),
    onComplete: () => console.log('Loop complete'),
  },
};

/**
 * Professional lens: "Arousal regulation"
 */
export const ProfessionalAnchor: Story = {
  args: {
    config: anchorConfig,
    lens: 'professional',
    onReceiptCreate: (trace) => console.log('Receipt created:', trace),
    onComplete: () => console.log('Loop complete'),
  },
};

/**
 * Organisation lens: "Grounding protocol"
 */
export const OrganisationAnchor: Story = {
  args: {
    config: anchorConfig,
    lens: 'organisation',
    onReceiptCreate: (trace) => console.log('Protocol executed:', trace),
    onComplete: () => console.log('Sequence complete'),
  },
};

/**
 * Clarity intent: Longer duration
 */
export const ClarityIntent: Story = {
  args: {
    config: clarityConfig,
    lens: 'individual',
    onReceiptCreate: (trace) => console.log('Trace created:', trace),
    onComplete: () => console.log('Loop complete'),
  },
};

/**
 * Connection intent
 */
export const ConnectionIntent: Story = {
  args: {
    config: {
      intent: 'connection',
      duration: 30,
      tempo: 'moment',
      depth: 'seed',
    },
    lens: 'individual',
    onReceiptCreate: (trace) => console.log('Trace created:', trace),
    onComplete: () => console.log('Loop complete'),
  },
};

/**
 * Direction intent
 */
export const DirectionIntent: Story = {
  args: {
    config: {
      intent: 'direction',
      duration: 120,
      tempo: 'moment',
      depth: 'thread',
    },
    lens: 'professional',
    onReceiptCreate: (trace) => console.log('Trace created:', trace),
    onComplete: () => console.log('Loop complete'),
  },
};
