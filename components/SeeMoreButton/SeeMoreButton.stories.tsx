import { Meta, StoryObj } from "@storybook/react";
import SeeMoreButton from "./SeeMoreButton";
import { ButtonSize, ButtonVariant } from "../Button/Button.types";

const meta: Meta<typeof SeeMoreButton> = {
  title: "Components/SeeMoreButton",
  component: SeeMoreButton,
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

type Story = StoryObj<typeof SeeMoreButton>;

export const Default: Story = {
  args: {
    text: "SeeMoreButton",
    variant: ButtonVariant.PRIMARY,
    size: ButtonSize.MEDIUM,
    disabled: false,
  },
};
