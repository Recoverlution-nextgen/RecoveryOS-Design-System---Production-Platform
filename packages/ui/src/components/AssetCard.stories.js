import { AssetCard } from './AssetCard';
import { SENSE_ROUTE_DELIVER_SEAL_HERO, ERA_CADENCE_HERO, THREE_ALTITUDES_HERO, PROOF_STACKING_ASSET } from '../assets/heroes';
const meta = {
    title: 'Assets/AssetCard',
    component: AssetCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;
export const SenseRouteDeliverSeal = {
    args: {
        asset: SENSE_ROUTE_DELIVER_SEAL_HERO,
        interactive: true,
    },
};
export const ERACadence = {
    args: {
        asset: ERA_CADENCE_HERO,
        interactive: true,
    },
};
export const ThreeAltitudes = {
    args: {
        asset: THREE_ALTITUDES_HERO,
        interactive: true,
    },
};
export const ProofStacking = {
    args: {
        asset: PROOF_STACKING_ASSET,
        interactive: false,
    },
};
