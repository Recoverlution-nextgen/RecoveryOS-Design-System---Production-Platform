import type { Meta, StoryObj } from '@storybook/react';
import { AssetCard } from './AssetCard';
import { SENSE_ROUTE_DELIVER_SEAL_HERO, ERA_CADENCE_HERO, THREE_ALTITUDES_HERO, PROOF_STACKING_ASSET } from '../assets/heroes';

const meta: Meta<typeof AssetCard> = {
  title: 'Assets/AssetCard',
  component: AssetCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AssetCard>;

export const SenseRouteDeliverSeal: Story = {
  args: {
    asset: SENSE_ROUTE_DELIVER_SEAL_HERO,
    interactive: true,
  },
};

export const ERACadence: Story = {
  args: {
    asset: ERA_CADENCE_HERO,
    interactive: true,
  },
};

export const ThreeAltitudes: Story = {
  args: {
    asset: THREE_ALTITUDES_HERO,
    interactive: true,
  },
};

export const ProofStacking: Story = {
  args: {
    asset: PROOF_STACKING_ASSET,
    interactive: false,
  },
};
