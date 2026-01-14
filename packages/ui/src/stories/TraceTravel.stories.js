import { TraceTravel } from '../components/travel/TraceTravel';
const mockTrace = {
    id: 'trace-demo-123',
    state: 'sealed',
    copy: 'Breathed through the wave. Found my footing.',
    timestamp: new Date().toISOString(),
    metadata: {
        gripType: 'anchor',
        duration: 10,
        driftLevel: 'low',
    },
};
const meta = {
    title: 'Belief Machines/TraceTravel',
    component: TraceTravel,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};
export default meta;
/**
 * Toggle mode: Manual altitude switching
 */
export const ToggleMode = {
    args: {
        trace: mockTrace,
        trigger: 'toggle',
        defaultViewByLens: false,
        lens: 'individual',
    },
};
/**
 * Auto mode: Cycles through all three altitudes
 */
export const AutoMode = {
    args: {
        trace: mockTrace,
        trigger: 'auto',
        autoInterval: 2000,
    },
};
/**
 * Individual lens default
 */
export const IndividualDefault = {
    args: {
        trace: mockTrace,
        trigger: 'toggle',
        defaultViewByLens: true,
        lens: 'individual',
    },
};
/**
 * Professional lens default
 */
export const ProfessionalDefault = {
    args: {
        trace: mockTrace,
        trigger: 'toggle',
        defaultViewByLens: true,
        lens: 'professional',
    },
};
/**
 * Organisation lens default
 */
export const OrganisationDefault = {
    args: {
        trace: mockTrace,
        trigger: 'toggle',
        defaultViewByLens: true,
        lens: 'organisation',
    },
};
/**
 * Compass grip trace
 */
export const CompassGrip = {
    args: {
        trace: {
            ...mockTrace,
            copy: 'Found my direction. Moving toward what matters.',
            metadata: {
                gripType: 'compass',
                duration: 30,
                driftLevel: 'medium',
            },
        },
        trigger: 'toggle',
    },
};
/**
 * Handrail grip trace
 */
export const HandrailGrip = {
    args: {
        trace: {
            ...mockTrace,
            copy: 'Held steady through the wave.',
            metadata: {
                gripType: 'handrail',
                duration: 120,
                driftLevel: 'high',
            },
        },
        trigger: 'toggle',
    },
};
