import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SeeMoreButton from "./SeeMoreButton";

const meta: Meta<typeof SeeMoreButton> = {
  title: "Features/SeeMoreButton",
  component: SeeMoreButton,
  tags: ["autodocs"],
  argTypes: {
    onButtonClick: {
      action: "clicked",
      description: "Callback function called when button is clicked",
    },
    isMoreItemsVisible: {
      control: "boolean",
      description:
        "Controls whether more items are visible (affects text and icon)",
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
          "A toggle button that switches between 'See more' and 'See less' states. Changes text and icon based on visibility state. Uses i18n literals: `literals.seeMore` and `literals.seeLess`.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SeeMoreButton>;

export const Default: Story = {
  args: {
    onButtonClick: () => {},
    isMoreItemsVisible: false,
  },
};

export const SeeMore: Story = {
  args: {
    onButtonClick: () => {},
    isMoreItemsVisible: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Button in 'See more' state - shows plus icon",
      },
    },
  },
};

export const SeeLess: Story = {
  args: {
    onButtonClick: () => {},
    isMoreItemsVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Button in 'See less' state - shows minus icon",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <SeeMoreButton onButtonClick={() => {}} isMoreItemsVisible={false} />
      <SeeMoreButton onButtonClick={() => {}} isMoreItemsVisible={true} />
      <SeeMoreButton
        onButtonClick={() => {}}
        isMoreItemsVisible={false}
        disabled
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button states: See more, See less, and disabled",
      },
    },
  },
};
