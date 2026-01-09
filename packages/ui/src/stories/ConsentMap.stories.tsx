import type { Meta, StoryObj } from '@storybook/react';
import { ConsentMap } from '../components/trust/ConsentMap';

const meta = {
  title: 'Tier C: Trust Surfaces/ConsentMap',
  component: ConsentMap,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Calm readable "what system can see/do/ask" panel. Consent by design, not compliance theater.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConsentMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualDefault: Story = {
  args: {
    lens: 'individual',
    showDetails: false,
    onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
  },
};

export const IndividualWithDetails: Story = {
  args: {
    lens: 'individual',
    showDetails: true,
    onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
  },
};

export const ProfessionalDefault: Story = {
  args: {
    lens: 'professional',
    showDetails: false,
    onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
  },
};

export const OrganisationDefault: Story = {
  args: {
    lens: 'organisation',
    showDetails: false,
    onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
  },
};

export const OrganisationWithDetails: Story = {
  args: {
    lens: 'organisation',
    showDetails: true,
    onConsentChange: (itemId, granted) => console.log(`Consent changed: ${itemId} = ${granted}`),
  },
};
