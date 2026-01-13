import type { Meta, StoryObj } from '@storybook/react';
import { ThreadView } from '../components/thread/ThreadView';
import { TraceObjectProps } from '../components/trace/TraceObject';

const mockTraces: TraceObjectProps[] = [
  {
    id: '1',
    state: 'sealed',
    copy: 'Found my footing again.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    metadata: {
      gripType: 'anchor',
      duration: 10,
      driftLevel: 'low',
    },
  },
  {
    id: '2',
    state: 'sealed',
    copy: 'Chose presence over pattern.',
    timestamp: new Date(Date.now() - 64800000).toISOString(),
    metadata: {
      gripType: 'compass',
      duration: 30,
      driftLevel: 'medium',
    },
  },
  {
    id: '3',
    state: 'sealed',
    copy: 'Held steady through the wave.',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    metadata: {
      gripType: 'handrail',
      duration: 120,
      driftLevel: 'high',
    },
  },
  {
    id: '4',
    state: 'sealed',
    copy: 'Noticed the pattern. Breathed through it.',
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    metadata: {
      gripType: 'anchor',
      duration: 10,
      driftLevel: 'low',
    },
  },
];

const meta = {
  title: 'Continuity Layer/ThreadView',
  component: ThreadView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['new', 'growing', 'reviewable', 'shareable'],
    },
    lens: {
      control: 'select',
      options: ['individual', 'professional', 'organisation'],
    },
  },
} satisfies Meta<typeof ThreadView>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Individual lens: "Your thread"
 */
export const Individual: Story = {
  args: {
    traces: mockTraces,
    state: 'growing',
    lens: 'individual',
    week: '12',
  },
};

/**
 * Professional lens: "Continuity line"
 */
export const Professional: Story = {
  args: {
    traces: mockTraces,
    state: 'reviewable',
    lens: 'professional',
    week: '12',
  },
};

/**
 * Organisation lens: "Thread archive"
 */
export const Organisation: Story = {
  args: {
    traces: mockTraces,
    state: 'shareable',
    lens: 'organisation',
    week: '12',
  },
};

/**
 * Empty thread: Awaiting first trace
 */
export const Empty: Story = {
  args: {
    traces: [],
    state: 'new',
    lens: 'individual',
  },
};

/**
 * Single trace: Thread just starting
 */
export const SingleTrace: Story = {
  args: {
    traces: [mockTraces[0]],
    state: 'new',
    lens: 'individual',
    week: '1',
  },
};

/**
 * Growing thread: Accumulating continuity
 */
export const Growing: Story = {
  args: {
    traces: mockTraces.slice(0, 2),
    state: 'growing',
    lens: 'individual',
    week: '5',
  },
};

/**
 * Reviewable: Ready for clinical review
 */
export const Reviewable: Story = {
  args: {
    traces: mockTraces,
    state: 'reviewable',
    lens: 'professional',
    week: '12',
  },
};

/**
 * Shareable: Prepared for hand-off
 */
export const Shareable: Story = {
  args: {
    traces: mockTraces,
    state: 'shareable',
    lens: 'organisation',
    week: '12',
  },
};
