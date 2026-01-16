import type { Preview } from "@storybook/react";
import "@recoverlution/ui/tokens.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    a11y: { disable: false }
  }
};

export default preview;
