import type { Preview } from "@storybook/react";
import "../../packages/ui/src/tokens.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    a11y: { disable: false }
  }
};

export default preview;
