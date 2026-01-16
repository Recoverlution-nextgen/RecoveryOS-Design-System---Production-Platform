import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  // Use repo-level stories and UI package stories; avoid searching the local /stories folder (unused)
  stories: [
    "/workspaces/RecoveryOS-Design-System---Production-Platform/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "/workspaces/RecoveryOS-Design-System---Production-Platform/stories/**/*.mdx",
    "/workspaces/RecoveryOS-Design-System---Production-Platform/packages/ui/src/**/*.stories.@(ts|tsx|mdx)",
    "/workspaces/RecoveryOS-Design-System---Production-Platform/packages/ui/src/**/*.mdx",
  ],
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
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@recoverlution/ui": path.resolve(__dirname, "../../../packages/ui/src"),
      designsystem: path.resolve(__dirname, "../../../designsystem")
    };
    const allow = (config.server && config.server.fs && config.server.fs.allow) || [];
    config.server = config.server || {};
    config.server.fs = {
      ...(config.server.fs || {}),
      allow: [...allow, path.resolve(__dirname, "../../../")]
    };
    return config;
  }
};

export default config;
