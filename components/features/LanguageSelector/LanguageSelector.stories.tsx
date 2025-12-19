import { Meta, StoryObj } from "@storybook/nextjs-vite";
import LanguageSelector from "./LanguageSelector";
import { LanguageSelectorTypeEnum } from "./LanguageSelector.types";

const meta: Meta<typeof LanguageSelector> = {
  title: "Features/LanguageSelector",
  component: LanguageSelector,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A language selector component that allows users to switch between available languages (Spanish, English, German). The selected language is persisted in localStorage and updates the i18n configuration. Includes an icon and displays active language state.",
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

type Story = StoryObj<typeof LanguageSelector>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default language selector with all available languages displayed as buttons.",
      },
    },
  },
};

export const WithSpanishSelected: Story = {
  decorators: [
    (Story) => {
      // Mock localStorage to have Spanish selected
      if (typeof window !== "undefined") {
        localStorage.setItem("language", LanguageSelectorTypeEnum.ES);
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
        story: "Language selector with Spanish (ES) as the active language.",
      },
    },
  },
};

export const WithEnglishSelected: Story = {
  decorators: [
    (Story) => {
      // Mock localStorage to have English selected
      if (typeof window !== "undefined") {
        localStorage.setItem("language", LanguageSelectorTypeEnum.EN);
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
        story: "Language selector with English (EN) as the active language.",
      },
    },
  },
};

export const WithGermanSelected: Story = {
  decorators: [
    (Story) => {
      // Mock localStorage to have German selected
      if (typeof window !== "undefined") {
        localStorage.setItem("language", LanguageSelectorTypeEnum.DE);
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
        story: "Language selector with German (DE) as the active language.",
      },
    },
  },
};
