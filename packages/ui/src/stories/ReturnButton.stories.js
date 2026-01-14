import { ReturnButton } from '../components/return/ReturnButton';
const meta = {
    title: 'Continuity Layer/ReturnButton',
    component: ReturnButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        lens: {
            control: 'select',
            options: ['individual', 'professional', 'organisation'],
            description: 'Audience altitude: changes copy and tone',
        },
        drift: {
            control: 'select',
            options: ['low', 'medium', 'high'],
            description: 'Drift level: affects visual urgency',
        },
        attention: {
            control: 'select',
            options: ['calm', 'focus'],
            description: 'Attention mode: spacious vs compact',
        },
    },
};
export default meta;
/**
 * Individual lens: Warm, approachable, "Return"
 */
export const Individual = {
    args: {
        lens: 'individual',
        drift: 'low',
        attention: 'calm',
        onTap: () => console.log('Quick grip (Anchor 10s)'),
        onLongPress: () => console.log('Open GripGenerator'),
    },
};
/**
 * Professional lens: Balanced, clear, "Initiate"
 */
export const Professional = {
    args: {
        lens: 'professional',
        drift: 'low',
        attention: 'calm',
        onTap: () => console.log('Default grip protocol'),
        onLongPress: () => console.log('Configure grip'),
    },
};
/**
 * Organisation lens: Infrastructure, "Activate"
 */
export const Organisation = {
    args: {
        lens: 'organisation',
        drift: 'low',
        attention: 'focus',
        onTap: () => console.log('Execute default sequence'),
        onLongPress: () => console.log('Sequence configuration'),
    },
};
/**
 * Medium drift: Caution border
 */
export const MediumDrift = {
    args: {
        lens: 'individual',
        drift: 'medium',
        attention: 'calm',
        onTap: () => console.log('Quick grip'),
        onLongPress: () => console.log('Choose grip'),
    },
};
/**
 * High drift: Alert pulse animation
 */
export const HighDrift = {
    args: {
        lens: 'individual',
        drift: 'high',
        attention: 'calm',
        onTap: () => console.log('Quick grip'),
        onLongPress: () => console.log('Choose grip'),
    },
};
/**
 * Focus mode: Compact padding
 */
export const FocusMode = {
    args: {
        lens: 'individual',
        drift: 'low',
        attention: 'focus',
        onTap: () => console.log('Quick grip'),
        onLongPress: () => console.log('Choose grip'),
    },
};
