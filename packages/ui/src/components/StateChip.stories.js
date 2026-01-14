import { StateChip } from './StateChip';
const meta = {
    title: 'LUMA/StateChip',
    component: StateChip,
    args: {
        label: 'Energy',
        value: 'Stable',
        tone: 'safe',
    },
};
export default meta;
export const Safe = {};
export const Caution = { args: { tone: 'caution', value: 'Elevated' } };
export const Alert = { args: { tone: 'alert', value: 'Spiking' } };
