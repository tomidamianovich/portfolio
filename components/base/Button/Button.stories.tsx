import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";
import { ButtonSize, ButtonVariant } from "./Button.types";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const meta: Meta<typeof Button> = {
  title: "Base/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "Button text label",
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
    variant: {
      control: "select",
      options: Object.values(ButtonVariant),
      description: "Button visual variant",
    },
    size: {
      control: "select",
      options: Object.values(ButtonSize),
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disable button interaction",
    },
    active: {
      control: "boolean",
      description: "Active/pressed state",
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label for screen readers",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and states. Supports both text and icon content.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: "Button",
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MEDIUM,
    disabled: false,
    active: false,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button text="Primary" variant={ButtonVariant.PRIMARY} />
      <Button text="Secondary" variant={ButtonVariant.SECONDARY} />
      <Button text="Outlined" variant={ButtonVariant.OUTLINED} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button text="Small" size={ButtonSize.SMALL} />
      <Button text="Medium" size={ButtonSize.MEDIUM} />
      <Button text="Large" size={ButtonSize.LARGE} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button sizes",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button text="Default" />
      <Button text="Active" active />
      <Button text="Disabled" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button states: default, active, and disabled",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button ariaLabel="Light mode">
        <MdLightMode size={18} />
      </Button>
      <Button text="With Icon" variant={ButtonVariant.OUTLINED}>
        <MdDarkMode size={18} />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with icon content using children prop",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    text: "Click me",
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MEDIUM,
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive button - use controls to modify props",
      },
    },
  },
};
