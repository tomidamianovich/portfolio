import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Pill from "./Pill";
import { PillSizeEnum, PillVariantEnum, IconTypeEnum } from "./Pill.types";

const meta: Meta<typeof Pill> = {
  title: "Base/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "Pill text label",
    },
    href: {
      control: "text",
      description: "Optional URL - makes pill clickable as a link",
    },
    variant: {
      control: "select",
      options: Object.values(PillVariantEnum),
      description: "Pill visual variant",
    },
    size: {
      control: "select",
      options: Object.values(PillSizeEnum),
      description: "Pill size",
    },
    icon: {
      control: "select",
      options: Object.values(IconTypeEnum),
      description: "Icon type to display (only shown when href is provided)",
    },
    index: {
      control: "number",
      description: "Index for language color styling (used in pillsView)",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A versatile pill component that can display text, icons, and links. Used for tags, languages, and contact links.",
      },
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

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Pill text="Primary" variant={PillVariantEnum.PRIMARY} />
      <Pill text="Outlined" variant={PillVariantEnum.OUTLINED} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available pill variants",
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
      <Pill text="Small" size={PillSizeEnum.SMALL} />
      <Pill text="Medium" size={PillSizeEnum.MEDIUM} />
      <Pill text="Large" size={PillSizeEnum.LARGE} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available pill sizes",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Pill
        text="Instagram"
        href="https://instagram.com"
        icon={IconTypeEnum.INSTAGRAM}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pills with icons (icons only appear when href is provided)",
      },
    },
  },
};

export const WithLinks: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Pill text="Clickable Pill" href="https://example.com" />
      <Pill
        text="Outlined Link"
        href="https://example.com"
        variant={PillVariantEnum.OUTLINED}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pills as clickable links",
      },
    },
  },
};

export const LanguageDots: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Pill text="Español" index={0} />
      <Pill text="Inglés" index={1} />
      <Pill text="Alemán" index={2} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Language pills with colored dots (colors are styled via CSS nth-child selectors in pillsView)",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    text: "Pill",
    variant: PillVariantEnum.PRIMARY,
    size: PillSizeEnum.MEDIUM,
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive pill - use controls to modify props",
      },
    },
  },
};
