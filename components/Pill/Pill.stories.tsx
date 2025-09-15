import { Meta, StoryObj } from "@storybook/react";
import Pill from "./Pill";
import { PillSize, PillVariant } from "./Pill.types";

const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  argTypes: {
    text: { control: "text" },
    variant: {
      options: Object.values(PillVariant),
    },
    size: {
      options: Object.values(PillSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    text: "Pill",
    variant: PillVariant.PRIMARY,
    size: PillSize.MEDIUM,
  },
};
