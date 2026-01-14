import { NaviCueCard } from './NaviCueCard';
const meta = {
    title: 'LUMA/NaviCueCard',
    component: NaviCueCard,
    args: {
        title: 'Downshift under load',
        intent: 'Stabilise arousal and widen choice space',
        suitability: 'safe',
        primitive: 'Breath drop + orient',
        proofRequest: 'Log one felt shift within 30s',
        status: 'pending',
    },
};
export default meta;
export const Default = {};
export const Caution = {
    args: {
        suitability: 'caution',
        status: 'captured',
    },
};
export const Alert = {
    args: {
        suitability: 'alert',
        status: 'missed',
    },
};
