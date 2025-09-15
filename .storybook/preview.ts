import type { Preview } from "@storybook/nextjs-vite";
import "../styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
