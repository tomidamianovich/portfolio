import { Meta, StoryObj } from "@storybook/react";
import Section from "./Section";
import { SectionSize, SectionVariant } from "./Section.types";

const meta: Meta<typeof Section> = {
  title: "Components/Section",
  component: Section,
  argTypes: {
    text: { control: "text" },
    onClick: { action: "clicked" },
    variant: {
      options: Object.values(SectionVariant),
    },
    disabled: { control: "boolean" },
    size: {
      options: Object.values(SectionSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    text: "Section",
    variant: SectionVariant.PRIMARY,
    size: SectionSize.MEDIUM,
    disabled: false,
  },
};
