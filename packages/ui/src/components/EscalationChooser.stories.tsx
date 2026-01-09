import type { Meta, StoryObj } from '@storybook/react';
import { EscalationChooser } from './EscalationChooser';

const meta: Meta<typeof EscalationChooser> = {
  title: 'Safety/EscalationChooser',
  component: EscalationChooser,
  args: {
    selectedId: 'clinician',
    options: [
      {
        id: 'self',
        label: 'Self-stabilise only',
        description: 'Keep it quiet; no external handoff. Use state-first stabilisers.',
        protocol: 'Micro-dose only',
      },
      {
        id: 'clinician',
        label: 'Clinician (primary)',
        description: 'Escalate to primary clinician if heat > threshold.',
        contact: 'Dr. Rivers',
        protocol: 'Consent-bound outreach',
      },
      {
        id: 'support',
        label: 'Support person',
        description: 'Reach designated person if pattern repeats x3 in 24h.',
        contact: 'T. Cole',
        protocol: 'Text + call fallback',
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof EscalationChooser>;

export const Default: Story = {};
