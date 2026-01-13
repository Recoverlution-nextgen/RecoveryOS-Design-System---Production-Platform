import type { Meta, StoryObj } from '@storybook/react';
import { TraceTravel } from '../components/travel/TraceTravel';
import { TraceObjectProps } from '../components/trace/TraceObject';

const mockTrace: TraceObjectProps = {
  id: 'trace-demo-123',
  state: 'sealed',
  copy: 'Breathed through the wave. Found my footing.',
  timestamp: new Date().toISOString(),
  metadata: {
    gripType: 'anchor',
    duration: 10,
    driftLevel: 'low',
  },
};

const meta = {
  title: 'Belief Machines/TraceTravel',
  component: TraceTravel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TraceTravel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Toggle mode: Manual altitude switching
 */
export const ToggleMode: Story = {
  args: {
    trace: mockTrace,
    trigger: 'toggle',
    defaultViewByLens: false,
    lens: 'individual',
  },
};

/**
 * Auto mode: Cycles through all three altitudes
 */
export const AutoMode: Story = {
  args: {
    trace: mockTrace,
    trigger: 'auto',
    autoInterval: 2000,
  },
};

/**
 * Individual lens default
 */
export const IndividualDefault: Story = {
  args: {
    trace: mockTrace,
    trigger: 'toggle',
    defaultViewByLens: true,
    lens: 'individual',
  },
};

/**
 * Professional lens default
 */
export const ProfessionalDefault: Story = {
  args: {
    trace: mockTrace,
    trigger: 'toggle',
    defaultViewByLens: true,
    lens: 'professional',
  },
};

/**
 * Organisation lens default
 */
export const OrganisationDefault: Story = {
  args: {
    trace: mockTrace,
    trigger: 'toggle',
    defaultViewByLens: true,
    lens: 'organisation',
  },
};

/**
 * Compass grip trace
 */
export const CompassGrip: Story = {
  args: {
    trace: {
      ...mockTrace,
      copy: 'Found my direction. Moving toward what matters.',
      metadata: {
        gripType: 'compass',
        duration: 30,
        driftLevel: 'medium',
      },
    },
    trigger: 'toggle',
  },
};

/**
 * Handrail grip trace
 */
export const HandrailGrip: Story = {
  args: {
    trace: {
      ...mockTrace,
      copy: 'Held steady through the wave.',
      metadata: {
        gripType: 'handrail',
        duration: 120,
        driftLevel: 'high',
      },
    },
    trigger: 'toggle',
  },
};
