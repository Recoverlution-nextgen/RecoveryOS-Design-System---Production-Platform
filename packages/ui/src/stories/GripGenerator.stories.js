import { GripGenerator } from '../components/grip/GripGenerator';
const meta = {
    title: 'Continuity Layer/GripGenerator',
    component: GripGenerator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        lens: {
            control: 'select',
            options: ['individual', 'professional', 'organisation'],
        },
    },
};
export default meta;
/**
 * Individual lens: "What kind of help?"
 */
export const Individual = {
    args: {
        lens: 'individual',
        onConfirm: (config) => console.log('Grip confirmed:', config),
        onCancel: () => console.log('Grip cancelled'),
    },
};
/**
 * Professional lens: "Select grip type"
 */
export const Professional = {
    args: {
        lens: 'professional',
        onConfirm: (config) => console.log('Grip configured:', config),
        onCancel: () => console.log('Configuration cancelled'),
    },
};
/**
 * Organisation lens: "Grip type"
 */
export const Organisation = {
    args: {
        lens: 'organisation',
        onConfirm: (config) => console.log('Sequence configured:', config),
        onCancel: () => console.log('Configuration terminated'),
    },
};
