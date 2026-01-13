import type { Meta, StoryObj } from '@storybook/react';
import { CommandCenter } from './CommandCenter';
import { IntegrityLog } from '../types/events';

const mockLogs: IntegrityLog[] = [
  {
    delivery_id: 'ev-001',
    timestamp: Date.now() - 3600000,
    quiet_hours_adherence: true,
    consent_adherence: true,
    delivery_success: true,
  },
  {
    delivery_id: 'ev-002',
    timestamp: Date.now() - 1800000,
    quiet_hours_adherence: true,
    consent_adherence: true,
    escalation_protocol_used: 'consent-bound-text',
    delivery_success: true,
  },
  {
    delivery_id: 'ev-003',
    timestamp: Date.now() - 900000,
    quiet_hours_adherence: false,
    consent_adherence: true,
    delivery_success: false,
  },
];

const meta: Meta<typeof CommandCenter> = {
  title: 'System/CommandCenter',
  component: CommandCenter,
  args: {
    logs: mockLogs,
    organizationName: 'Clinical Operations',
  },
};

export default meta;

type Story = StoryObj<typeof CommandCenter>;

export const Default: Story = {};

export const Empty: Story = {
  args: { logs: [] },
};
