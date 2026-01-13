import type { Meta, StoryObj } from '@storybook/react';
import { EscalationRail } from '../components/trust/EscalationRail';

const meta = {
  title: 'Tier C: Trust Surfaces/EscalationRail',
  component: EscalationRail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Show escalation as infrastructure. Clean handoff under drift by protocol.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EscalationRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualSelfRoute: Story = {
  args: {
    currentLevel: 'self',
    handoffTypes: ['peer', 'clinician', 'crisis'],
    supportGraphEnabled: true,
    consentGate: true,
    lens: 'individual',
    onEscalate: (level) => console.log(`Escalated to: ${level}`),
    onHandoff: (type) => console.log(`Handoff to: ${type}`),
  },
};

export const IndividualTighten: Story = {
  args: {
    currentLevel: 'tighten',
    handoffTypes: ['peer', 'clinician', 'crisis'],
    supportGraphEnabled: true,
    consentGate: true,
    lens: 'individual',
    onEscalate: (level) => console.log(`Escalated to: ${level}`),
    onHandoff: (type) => console.log(`Handoff to: ${type}`),
  },
};

export const IndividualHandoff: Story = {
  args: {
    currentLevel: 'handoff',
    handoffTypes: ['peer', 'clinician', 'crisis'],
    supportGraphEnabled: true,
    consentGate: true,
    lens: 'individual',
    onEscalate: (level) => console.log(`Escalated to: ${level}`),
    onHandoff: (type) => console.log(`Handoff to: ${type}`),
  },
};

export const ProfessionalSwitch: Story = {
  args: {
    currentLevel: 'switch',
    handoffTypes: ['peer', 'clinician', 'crisis'],
    supportGraphEnabled: true,
    consentGate: true,
    lens: 'professional',
    onEscalate: (level) => console.log(`Escalated to: ${level}`),
    onHandoff: (type) => console.log(`Handoff to: ${type}`),
  },
};

export const OrganisationHandoff: Story = {
  args: {
    currentLevel: 'handoff',
    handoffTypes: ['peer', 'clinician', 'crisis'],
    supportGraphEnabled: true,
    consentGate: true,
    lens: 'organisation',
    onEscalate: (level) => console.log(`Escalated to: ${level}`),
    onHandoff: (type) => console.log(`Handoff to: ${type}`),
  },
};

export const NoGraph: Story = {
  args: {
    currentLevel: 'tighten',
    handoffTypes: ['clinician', 'crisis'],
    supportGraphEnabled: false,
    consentGate: true,
    lens: 'professional',
    onEscalate: (level) => console.log(`Escalated to: ${level}`),
    onHandoff: (type) => console.log(`Handoff to: ${type}`),
  },
};
