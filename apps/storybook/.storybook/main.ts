import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)", "../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)", "../../stories/**/*.stories.@(ts|tsx|mdx)", "../../packages/ui/src/**/*.mdx"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@recoverlution/ui": path.resolve(__dirname, "../../packages/ui/src"),
      designsystem: path.resolve(__dirname, "../../designsystem")
    };
    return config;
  }
};

export default config;
