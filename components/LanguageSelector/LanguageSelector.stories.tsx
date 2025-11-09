import { Meta, StoryObj } from "@storybook/nextjs-vite";
import LanguageSelector from "./LanguageSelector";

const meta: Meta<typeof LanguageSelector> = {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
};

export default meta;

type Story = StoryObj<typeof LanguageSelector>;

export const Default: Story = {};
