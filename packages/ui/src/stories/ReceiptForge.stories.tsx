import type { Meta, StoryObj } from '@storybook/react';
import { ReceiptForge } from '../components/forge/ReceiptForge';

const meta = {
  title: 'Tier B: Belief Machines/ReceiptForge',
  component: ReceiptForge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Make proof tangible, sacred, non-performative. Turn moment into Trace with dignity. No celebration — only seal.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReceiptForge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualSimple: Story = {
  args: {
    note: 'Breathed through it.',
    grip: 'anchor',
    duration: 10,
    lens: 'individual',
    onSeal: (trace) => console.log('Trace sealed:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};

export const IndividualWithStates: Story = {
  args: {
    preState: 'Overwhelmed',
    postState: 'Steady',
    note: 'Found my footing.',
    grip: 'anchor',
    duration: 10,
    lens: 'individual',
    onSeal: (trace) => console.log('Trace sealed:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};

export const ProfessionalWithMeta: Story = {
  args: {
    preState: 'High arousal',
    postState: 'Regulated',
    note: 'Box breathing protocol executed.',
    targetMeta: {
      target: 'Arousal regulation',
      mechanism: 'Parasympathetic activation',
      primitive: 'Breathwork',
      dose: '10s',
    },
    grip: 'anchor',
    duration: 10,
    lens: 'professional',
    onSeal: (trace) => console.log('Receipt forged:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};

export const ProfessionalCompass: Story = {
  args: {
    note: 'Decision clarity protocol.',
    targetMeta: {
      target: 'Decision fatigue',
      mechanism: 'Prefrontal engagement',
      primitive: 'Structured reflection',
      dose: '30s',
    },
    grip: 'compass',
    duration: 30,
    lens: 'professional',
    onSeal: (trace) => console.log('Receipt forged:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};

export const OrganisationAudit: Story = {
  args: {
    note: 'BREATH_4X4_PROTOCOL executed.',
    targetMeta: {
      target: 'Arousal regulation',
      mechanism: 'Parasympathetic activation',
      primitive: 'Breathwork',
      dose: '10s',
    },
    grip: 'anchor',
    duration: 10,
    lens: 'organisation',
    onSeal: (trace) => console.log('Proof logged:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};

export const OrganisationHandrail: Story = {
  args: {
    preState: 'Baseline drift detected',
    postState: 'Baseline restored',
    note: 'Sustained support protocol.',
    targetMeta: {
      target: 'Baseline maintenance',
      mechanism: 'Continuous monitoring',
      primitive: 'Guided reflection',
      dose: '2m',
    },
    grip: 'handrail',
    duration: 120,
    lens: 'organisation',
    onSeal: (trace) => console.log('Proof logged:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};

export const MinimalIndividual: Story = {
  args: {
    grip: 'anchor',
    duration: 10,
    lens: 'individual',
    onSeal: (trace) => console.log('Trace sealed:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};

export const LongDuration: Story = {
  args: {
    note: 'Found my way through the fog.',
    grip: 'compass',
    duration: 120,
    lens: 'individual',
    onSeal: (trace) => console.log('Trace sealed:', trace),
    onDismiss: () => console.log('Forge dismissed'),
  },
};
