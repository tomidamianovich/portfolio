import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";
import { ButtonSize, ButtonVariant } from "./Button.types";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    text: { control: "text" },
    onClick: { action: "clicked" },
    variant: {
      options: Object.values(ButtonVariant),
    },
    disabled: { control: "boolean" },
    size: {
      options: Object.values(ButtonSize),
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
  },
};
