import { UniversalPlayer } from './UniversalPlayer';
const meta = {
    title: 'LUMA/UniversalPlayer',
    component: UniversalPlayer,
    args: {
        title: 'Steady hand on the wheel',
        description: 'Deliver the right primitive at the right dose; seal proof.',
        contract: {
            target: 'Arousal regulation',
            mechanism: 'Breath + orient',
            primitive: 'Downshift under load',
            heatBand: 'caution',
            proofRequest: 'Capture felt shift within 45s',
            duration: '00:45',
        },
        status: 'pending',
    },
};
export default meta;
export const Pending = {};
export const Captured = {
    args: {
        status: 'captured',
        contract: {
            target: 'Boundary micro-rep',
            mechanism: 'Script + breath',
            primitive: 'Say no cleanly',
            heatBand: 'safe',
            proofRequest: 'Receipt: sent and logged',
            duration: '00:20',
        },
    },
};
export const Alert = {
    args: {
        status: 'missed',
        contract: {
            target: 'Urge surf',
            mechanism: 'Delay + breath drop',
            primitive: 'Delay 90s',
            heatBand: 'alert',
            proofRequest: 'Mark completion in 90s',
            duration: '01:30',
        },
    },
};
