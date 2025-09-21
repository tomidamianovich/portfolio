import { Meta, StoryObj } from "@storybook/react";
import Pill from "./Pill";
import { PillSizeEnum, PillVariantEnum } from "./Pill.types";

const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  argTypes: {
    text: { control: "text" },
    variant: {
      options: Object.values(PillVariantEnum),
    },
    size: {
      options: Object.values(PillSizeEnum),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    text: "Pill",
    variant: PillVariantEnum.PRIMARY,
    size: PillSizeEnum.MEDIUM,
  },
};
