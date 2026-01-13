import type { Meta, StoryObj } from '@storybook/react';
import { NaviCueGallery } from './NaviCueGallery';

const meta: Meta<typeof NaviCueGallery> = {
  title: 'Components/NaviCueGallery',
  component: NaviCueGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NaviCueGallery>;

export const Default: Story = {
  args: {
    selectedCategory: 'all',
    lens: 'individual',
  },
};

export const IndividualLens: Story = {
  args: {
    selectedCategory: 'all',
    lens: 'individual',
  },
};

export const ProfessionalLens: Story = {
  args: {
    selectedCategory: 'all',
    lens: 'professional',
  },
};

export const OrganisationLens: Story = {
  args: {
    selectedCategory: 'all',
    lens: 'organisation',
  },
};

export const GroundingCategory: Story = {
  args: {
    selectedCategory: 'grounding',
    lens: 'individual',
  },
};

export const ReflectionCategory: Story = {
  args: {
    selectedCategory: 'reflection',
    lens: 'individual',
  },
};

export const ConnectionCategory: Story = {
  args: {
    selectedCategory: 'connection',
    lens: 'individual',
  },
};

export const Interactive: Story = {
  args: {
    selectedCategory: 'all',
    lens: 'individual',
    onLaunch: (cueId) => console.log('Launching NaviCue:', cueId),
    onCategoryChange: (category) => console.log('Category changed:', category),
  },
};
