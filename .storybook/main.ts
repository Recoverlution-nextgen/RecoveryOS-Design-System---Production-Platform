import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    "stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "stories/**/*.mdx",
    "packages/ui/src/**/*.stories.@(ts|tsx|mdx)",
    "packages/ui/src/**/*.mdx"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/nextjs-vite"
};
export default config;