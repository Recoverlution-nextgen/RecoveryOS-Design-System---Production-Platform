import { CommandCenter } from './CommandCenter';
const mockLogs = [
    {
        delivery_id: 'ev-001',
        timestamp: Date.now() - 3600000,
        quiet_hours_adherence: true,
        consent_adherence: true,
        delivery_success: true,
    },
    {
        delivery_id: 'ev-002',
        timestamp: Date.now() - 1800000,
        quiet_hours_adherence: true,
        consent_adherence: true,
        escalation_protocol_used: 'consent-bound-text',
        delivery_success: true,
    },
    {
        delivery_id: 'ev-003',
        timestamp: Date.now() - 900000,
        quiet_hours_adherence: false,
        consent_adherence: true,
        delivery_success: false,
    },
];
const meta = {
    title: 'System/CommandCenter',
    component: CommandCenter,
    args: {
        logs: mockLogs,
        organizationName: 'Clinical Operations',
    },
};
export default meta;
export const Default = {};
export const Empty = {
    args: { logs: [] },
};
