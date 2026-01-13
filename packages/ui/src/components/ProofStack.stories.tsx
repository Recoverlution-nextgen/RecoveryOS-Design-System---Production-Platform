import type { Meta, StoryObj } from '@storybook/react';
import { ProofStack } from './ProofStack';

const meta: Meta<typeof ProofStack> = {
  title: 'LUMA/ProofStack',
  component: ProofStack,
  args: {
    title: 'Proof receipts',
    entries: [
      {
        id: '1',
        label: 'Baseline micro-receipt',
        status: 'captured',
        timestamp: 'Today 09:12',
        intent: 'Hold under load',
        target: 'Arousal regulation',
        dose: '30s',
      },
      {
        id: '2',
        label: 'Alignment move',
        status: 'pending',
        timestamp: 'Queued',
        intent: 'Route next move',
        target: 'Choice space',
        dose: '45s',
      },
      {
        id: '3',
        label: 'Moment test',
        status: 'missed',
        timestamp: 'Earlier',
        intent: 'Proof capture',
        target: 'Boundary micro-rep',
        dose: '15s',
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof ProofStack>;

export const Default: Story = {};
