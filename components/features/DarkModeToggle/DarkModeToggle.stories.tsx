import { Meta, StoryObj } from "@storybook/nextjs-vite";
import DarkModeToggle from "./DarkModeToggle";
import { DarkModeToggleTypeEnum } from "./DarkModeToggle.types";

const meta: Meta<typeof DarkModeToggle> = {
  title: "Features/DarkModeToggle",
  component: DarkModeToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dark mode toggle component that allows users to switch between light and dark themes. The selected theme is persisted in localStorage and updates the document's data-theme attribute. Automatically detects system preference on first load. Includes icons for visual feedback.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DarkModeToggle>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default dark mode toggle with both light and dark mode options displayed as buttons with icons.",
      },
    },
  },
};

export const WithLightModeSelected: Story = {
  decorators: [
    (Story) => {
      // Mock localStorage to have light mode selected
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", DarkModeToggleTypeEnum.LIGHT);
        document.documentElement.dataset.theme = DarkModeToggleTypeEnum.LIGHT;
      }
      return (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story: "Dark mode toggle with light mode as the active theme.",
      },
    },
  },
};

export const WithDarkModeSelected: Story = {
  decorators: [
    (Story) => {
      // Mock localStorage to have dark mode selected
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", DarkModeToggleTypeEnum.DARK);
        document.documentElement.dataset.theme = DarkModeToggleTypeEnum.DARK;
      }
      return (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story: "Dark mode toggle with dark mode as the active theme.",
      },
    },
  },
};
