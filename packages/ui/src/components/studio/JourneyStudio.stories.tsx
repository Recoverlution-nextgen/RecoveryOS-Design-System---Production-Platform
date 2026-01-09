import type { Meta, StoryObj } from '@storybook/react';
import { JourneyStudio } from './JourneyStudio';

const meta: Meta<typeof JourneyStudio> = {
  title: 'Components/JourneyStudio',
  component: JourneyStudio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JourneyStudio>;

export const Default: Story = {
  args: {
    currentPhase: 'experience',
    lens: 'individual',
  },
};

export const ExperiencePhase: Story = {
  args: {
    currentPhase: 'experience',
    lens: 'individual',
  },
};

export const RecognizePhase: Story = {
  args: {
    currentPhase: 'recognize',
    lens: 'individual',
  },
};

export const AlignPhase: Story = {
  args: {
    currentPhase: 'align',
    lens: 'individual',
  },
};

export const ProfessionalLens: Story = {
  args: {
    currentPhase: 'experience',
    lens: 'professional',
  },
};

export const OrganisationLens: Story = {
  args: {
    currentPhase: 'align',
    lens: 'organisation',
  },
};

export const Interactive: Story = {
  args: {
    currentPhase: 'experience',
    lens: 'individual',
    onPhaseChange: (phase) => console.log('Phase changed:', phase),
    onInstall: (config) => console.log('Journey installed:', config),
  },
};
