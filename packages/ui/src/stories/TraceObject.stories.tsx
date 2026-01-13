import type { Meta, StoryObj } from '@storybook/react';
import { TraceObject } from '../components/trace/TraceObject';

const meta = {
  title: 'Continuity Layer/TraceObject',
  component: TraceObject,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['draft', 'sealed', 'carried', 'shared'],
    },
    lens: {
      control: 'select',
      options: ['individual', 'professional', 'organisation'],
    },
  },
} satisfies Meta<typeof TraceObject>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Draft state: Dashed border, not yet sealed
 */
export const Draft: Story = {
  args: {
    id: '1',
    state: 'draft',
    copy: 'Noticed the pattern forming. Stayed present.',
    timestamp: new Date().toISOString(),
    lens: 'individual',
  },
};

/**
 * Sealed state: Proof captured, badge visible
 */
export const Sealed: Story = {
  args: {
    id: '2',
    state: 'sealed',
    copy: 'Breathed through the urge. Chose differently.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    metadata: {
      gripType: 'anchor',
      duration: 10,
      driftLevel: 'low',
    },
    lens: 'individual',
  },
};

/**
 * Compass grip: Different badge color
 */
export const CompassGrip: Story = {
  args: {
    id: '3',
    state: 'sealed',
    copy: 'Oriented toward what matters most.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    metadata: {
      gripType: 'compass',
      duration: 30,
      driftLevel: 'medium',
    },
    lens: 'individual',
  },
};

/**
 * Handrail grip: Hold-on support
 */
export const HandrailGrip: Story = {
  args: {
    id: '4',
    state: 'sealed',
    copy: 'Held steady through the wave.',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    metadata: {
      gripType: 'handrail',
      duration: 120,
      driftLevel: 'high',
    },
    lens: 'individual',
  },
};

/**
 * Professional lens: Pattern language, fuller timestamp
 */
export const ProfessionalLens: Story = {
  args: {
    id: '5',
    state: 'sealed',
    copy: 'Continuity maintained under load.',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    metadata: {
      gripType: 'anchor',
      duration: 10,
      driftLevel: 'low',
    },
    lens: 'professional',
  },
};

/**
 * Organisation lens: Dense, ISO timestamp
 */
export const OrganisationLens: Story = {
  args: {
    id: '6',
    state: 'sealed',
    copy: 'Protocol executed. Evidence captured.',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    metadata: {
      gripType: 'anchor',
      duration: 10,
      driftLevel: 'low',
    },
    lens: 'organisation',
  },
};

/**
 * Carried state: Active in thread
 */
export const Carried: Story = {
  args: {
    id: '7',
    state: 'carried',
    copy: 'This moment became part of my continuity.',
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    metadata: {
      gripType: 'anchor',
      duration: 10,
    },
    lens: 'individual',
  },
};

/**
 * Shared state: Proof shared with care team
 */
export const Shared: Story = {
  args: {
    id: '8',
    state: 'shared',
    copy: 'Evidence of continuity, shared with consent.',
    timestamp: new Date(Date.now() - 25200000).toISOString(),
    metadata: {
      gripType: 'compass',
      duration: 30,
    },
    lens: 'professional',
  },
};
