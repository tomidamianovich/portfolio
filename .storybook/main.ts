import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx|js|jsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    // Optimize chunking to reduce bundle size
    if (config.build) {
      config.build.chunkSizeWarningLimit = 1000; // Increase limit to 1MB
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          manualChunks: (id) => {
            // Split vendor chunks
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "vendor-react";
              }
              if (id.includes("@storybook")) {
                return "vendor-storybook";
              }
              return "vendor";
            }
          },
        },
      };
    }
    return config;
  },
};

export default config;
