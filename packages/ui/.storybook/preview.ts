import type { Preview } from '@storybook/react';
import '../src/styles/reset.css';
import '../src/styles/theme.css';
import '../src/styles/components.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Calm or Heat',
      defaultValue: 'calm',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'calm', title: 'Calm' },
          { value: 'heat', title: 'Heat' },
        ],
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'obsidian',
      values: [
        { name: 'obsidian', value: '#0C0D0F' },
        { name: 'bone', value: '#F7F7F5' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.theme === 'heat' ? 'theme-heat' : 'theme-calm';
      document.body.classList.remove('theme-calm', 'theme-heat');
      document.body.classList.add(mode);
      return <Story />;
    },
  ],
};

export default preview;
