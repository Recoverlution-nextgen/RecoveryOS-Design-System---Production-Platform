import type { Meta, StoryObj } from '@storybook/react';
import { LensControl } from '../components/lens/LensControl';
import { useState } from 'react';

const meta = {
  title: 'Continuity Layer/LensControl',
  component: LensControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['compact', 'comfortable'],
    },
  },
} satisfies Meta<typeof LensControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive lens control with state
 */
export const Interactive: Story = {
  render: (args) => {
    const [lens, setLens] = useState<'individual' | 'professional' | 'organisation'>('individual');
    return <LensControl {...args} value={lens} onChange={setLens} />;
  },
  args: {
    size: 'comfortable',
  },
};

/**
 * Compact size: Mobile-friendly
 */
export const Compact: Story = {
  render: (args) => {
    const [lens, setLens] = useState<'individual' | 'professional' | 'organisation'>('professional');
    return <LensControl {...args} value={lens} onChange={setLens} />;
  },
  args: {
    size: 'compact',
  },
};

/**
 * Individual lens active
 */
export const IndividualActive: Story = {
  render: (args) => {
    const [lens, setLens] = useState<'individual' | 'professional' | 'organisation'>('individual');
    return <LensControl {...args} value={lens} onChange={setLens} />;
  },
  args: {
    size: 'comfortable',
  },
};

/**
 * Professional lens active
 */
export const ProfessionalActive: Story = {
  render: (args) => {
    const [lens, setLens] = useState<'individual' | 'professional' | 'organisation'>('professional');
    return <LensControl {...args} value={lens} onChange={setLens} />;
  },
  args: {
    size: 'comfortable',
  },
};

/**
 * Organisation lens active
 */
export const OrganisationActive: Story = {
  render: (args) => {
    const [lens, setLens] = useState<'individual' | 'professional' | 'organisation'>('organisation');
    return <LensControl {...args} value={lens} onChange={setLens} />;
  },
  args: {
    size: 'comfortable',
  },
};
