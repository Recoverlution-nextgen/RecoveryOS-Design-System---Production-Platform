import { ConsentSheet } from './ConsentSheet';
const meta = {
    title: 'Safety/ConsentSheet',
    component: ConsentSheet,
    args: {
        scopes: [
            {
                id: 'state-signals',
                label: 'State signals',
                description: 'Energy, clarity, anchorage — pulled on request only.',
                enabled: true,
            },
            {
                id: 'notifications',
                label: 'Notifications',
                description: 'Moment nudges when heat is rising.',
                enabled: true,
            },
            {
                id: 'escalation',
                label: 'Escalation contact',
                description: 'Allow LUMA to reach your chosen person per protocol.',
                enabled: false,
                required: false,
            },
        ],
    },
};
export default meta;
export const Default = {};
