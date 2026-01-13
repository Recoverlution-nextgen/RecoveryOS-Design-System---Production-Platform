import type { Meta, StoryObj } from '@storybook/react';
import { RecoveryOSPortal } from '../components/portal/RecoveryOSPortal';

const meta = {
  title: 'Tier D: Immersive Explorers/RecoveryOSPortal',
  component: RecoveryOSPortal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Flagship website-within-website immersive explorer. Full-screen cinematic portal with prompt corridor, spine rail, artifact rail, and 5 internal rooms.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecoveryOSPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualDefault: Story = {
  args: {
    initialRoom: 'moment',
    spineRailVisible: true,
    artifactRailVisible: true,
    skipEnabled: true,
    lens: 'individual',
    onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
  },
};

export const ProfessionalDefault: Story = {
  args: {
    initialRoom: 'orchestration',
    spineRailVisible: true,
    artifactRailVisible: true,
    skipEnabled: true,
    lens: 'professional',
    onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
  },
};

export const OrganisationDefault: Story = {
  args: {
    initialRoom: 'trust',
    spineRailVisible: true,
    artifactRailVisible: true,
    skipEnabled: true,
    lens: 'organisation',
    onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
  },
};

export const MinimalChrome: Story = {
  args: {
    initialRoom: 'moment',
    spineRailVisible: false,
    artifactRailVisible: false,
    skipEnabled: false,
    lens: 'individual',
    onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
  },
};

export const ExploreRoom: Story = {
  args: {
    initialRoom: 'explore',
    spineRailVisible: true,
    artifactRailVisible: true,
    skipEnabled: true,
    lens: 'professional',
    onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
  },
};

export const WeekRoom: Story = {
  args: {
    initialRoom: 'week',
    spineRailVisible: true,
    artifactRailVisible: true,
    skipEnabled: true,
    lens: 'individual',
    onLensChange: (lens) => console.log(`Lens changed to: ${lens}`),
  },
};
