import type { Meta, StoryObj } from '@storybook/react';
import { QuietHoursPicker } from './QuietHoursPicker';

const meta: Meta<typeof QuietHoursPicker> = {
  title: 'Safety/QuietHoursPicker',
  component: QuietHoursPicker,
  args: {
    start: '21:00',
    end: '07:00',
  },
};

export default meta;

type Story = StoryObj<typeof QuietHoursPicker>;

export const Default: Story = {};
