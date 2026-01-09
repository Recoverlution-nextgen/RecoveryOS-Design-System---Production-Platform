import type { Meta, StoryObj } from '@storybook/react';
import { Console } from './Console';
import { RecoveryOSEvent } from '../types/events';

const mockEvents: RecoveryOSEvent[] = [
  {
    delivery_id: 'ev-001',
    timestamp: Date.now() - 3600000,
    sequence: 1,
    contract: {
      target: 'Arousal regulation',
      aim: 'Lower activation',
      dose: '30s',
      primitive: 'Box breath 4x',
      heatBand: 'caution',
      proofRequest: 'Felt shift',
    },
    consent_scope: {
      state_signals: true,
      notifications: true,
      escalation_contact: false,
    },
    status: 'captured',
    proof: { felt_shift: 'Activation down 1 band', timestamp: Date.now() - 3600000, held_under: 'caution' },
  },
  {
    delivery_id: 'ev-002',
    timestamp: Date.now() - 1800000,
    sequence: 2,
    contract: {
      target: 'Choice space',
      aim: 'Widen options',
      dose: '45s',
      primitive: 'Name the pattern',
      heatBand: 'safe',
      proofRequest: 'Recognition moment',
    },
    consent_scope: {
      state_signals: true,
      notifications: true,
      escalation_contact: false,
    },
    status: 'captured',
    proof: { felt_shift: 'Clarity increased', timestamp: Date.now() - 1800000, held_under: 'safe' },
  },
];

const meta: Meta<typeof Console> = {
  title: 'System/Console',
  component: Console,
  args: {
    events: mockEvents,
    personName: 'Sarah M.',
  },
};

export default meta;

type Story = StoryObj<typeof Console>;

export const Default: Story = {};

export const Empty: Story = {
  args: { events: [] },
};
