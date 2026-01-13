import type { Meta, StoryObj } from '@storybook/react';
import { ProofPill } from './ProofPill';

const meta: Meta<typeof ProofPill> = {
  title: 'LUMA/ProofPill',
  component: ProofPill,
  args: {
    label: 'Baseline micro-receipt',
    status: 'pending',
    intent: 'Hold under load',
    timestamp: 'Just now',
  },
};

export default meta;

type Story = StoryObj<typeof ProofPill>;

export const Pending: Story = {};
export const Captured: Story = { args: { status: 'captured', timestamp: 'Today 09:14' } };
export const Missed: Story = { args: { status: 'missed', timestamp: 'Earlier' } };
