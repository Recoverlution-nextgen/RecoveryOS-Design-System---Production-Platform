import { ERALane } from './ERALane';
const meta = {
    title: 'LUMA/ERALane',
    component: ERALane,
};
export default meta;
export const Default = {};
export const Advanced = {
    args: {
        steps: [
            {
                id: 'experience',
                label: 'Experience',
                description: 'Felt shift: breath + body-first',
                status: 'done',
            },
            {
                id: 'recognise',
                label: 'Recognise',
                description: 'Name the loop in-flight',
                status: 'active',
            },
            {
                id: 'align',
                label: 'Align',
                description: 'Place the next right move',
                status: 'pending',
            },
        ],
    },
};
