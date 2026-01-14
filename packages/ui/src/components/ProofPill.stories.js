import { ProofPill } from './ProofPill';
const meta = {
    title: 'LUMA/ProofPill',
    component: ProofPill,
    args: {
        label: 'Baseline micro-receipt',
        status: 'pending',
        intent: 'Hold under load',
        timestamp: 'Just now',
    },
};
export default meta;
export const Pending = {};
export const Captured = { args: { status: 'captured', timestamp: 'Today 09:14' } };
export const Missed = { args: { status: 'missed', timestamp: 'Earlier' } };
