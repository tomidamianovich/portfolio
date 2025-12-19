import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Section from "./Section";
import { SectionTypeEnum, type SectionItem } from "./Section.types";

const meta: Meta<typeof Section> = {
  title: "Structures/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Section title",
    },
    items: {
      control: "object",
      description: "Array of items to display in the section",
    },
    sectionName: {
      control: "select",
      options: Object.values(SectionTypeEnum),
      description: "Type of section (for analytics and styling)",
    },
    isGrouped: {
      control: "boolean",
      description: "Whether to group items by a common property",
    },
    isPillsView: {
      control: "boolean",
      description: "Display items as pills instead of list",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A flexible section component that can display items in list or pill format, with grouping and expand/collapse functionality. Supports different section types (Experience, Education, Languages, Certifications) with specialized layouts including timeline view for experience and grid view for education.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

const mockExperienceItems: SectionItem[] = [
  {
    title: "Senior Frontend Engineer",
    titleDetail: "Tech Corp",
    date: "2023-01",
    endDate: undefined,
    subtitle: "Remote",
    content:
      "Leading frontend development with React and TypeScript. Mentoring junior developers and improving code quality.",
    link: "https://example.com",
  },
  {
    title: "Frontend Developer",
    titleDetail: "Startup Inc",
    date: "2021-06",
    endDate: "2022-12",
    subtitle: "Barcelona, Spain",
    content:
      "React and TypeScript development. Built responsive web applications.",
  },
  {
    title: "Junior Developer",
    titleDetail: "Web Agency",
    date: "2020-01",
    endDate: "2021-05",
    subtitle: "Madrid, Spain",
    content: "Developed client websites using modern web technologies.",
  },
];

const mockEducationItems: SectionItem[] = [
  {
    title: "Computer Science Degree",
    titleDetail: "University of Technology",
    date: "2016-09",
    endDate: "2020-06",
    subtitle: "Bachelor's Degree",
    content: "Specialized in software engineering and web development.",
  },
  {
    title: "Web Development Bootcamp",
    titleDetail: "Coding Academy",
    date: "2019-01",
    endDate: "2019-06",
    subtitle: "Full Stack Development",
    content: "Intensive program covering React, Node.js, and databases.",
  },
];

const mockLanguageItems: SectionItem[] = [
  { title: "Spanish", titleDetail: "Native" },
  { title: "English", titleDetail: "Fluent" },
  { title: "German", titleDetail: "Intermediate" },
  { title: "French", titleDetail: "Basic" },
];

const mockCertificationItems: SectionItem[] = [
  {
    title: "AWS Certified Developer",
    titleDetail: "Amazon Web Services",
    date: "2023-03",
    content: "Associate level certification in cloud development.",
  },
  {
    title: "React Advanced Patterns",
    titleDetail: "Frontend Masters",
    date: "2022-11",
    content: "Advanced React patterns and performance optimization.",
  },
];

const mockManyItems: SectionItem[] = [
  ...mockExperienceItems,
  {
    title: "Intern Developer",
    titleDetail: "Local Company",
    date: "2019-07",
    endDate: "2019-12",
    subtitle: "Part-time",
    content: "Assisted in developing internal tools.",
  },
  {
    title: "Freelance Web Developer",
    titleDetail: "Self-employed",
    date: "2018-01",
    endDate: "2020-01",
    content: "Built custom websites for small businesses.",
  },
];

export const Default: Story = {
  args: {
    title: "Experience",
    items: mockExperienceItems.slice(0, 2),
    sectionName: SectionTypeEnum.EXPERIENCE,
    isGrouped: false,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default experience section with timeline view. Shows current and past positions with dates, company details, and descriptions.",
      },
    },
  },
};

export const Experience: Story = {
  args: {
    title: "Work Experience",
    items: mockExperienceItems,
    sectionName: SectionTypeEnum.EXPERIENCE,
    isGrouped: false,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Experience section with timeline layout. Current positions (without endDate) show a work icon, past positions show a history icon.",
      },
    },
  },
};

export const ExperienceWithLinks: Story = {
  args: {
    title: "Experience",
    items: mockExperienceItems.map((item) => ({
      ...item,
      link: item.link || "https://example.com",
    })),
    sectionName: SectionTypeEnum.EXPERIENCE,
    isGrouped: false,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Experience section with clickable company links. Links open in a new tab and are tracked via analytics.",
      },
    },
  },
};

export const Education: Story = {
  args: {
    title: "Education",
    items: mockEducationItems,
    sectionName: SectionTypeEnum.EDUCATION,
    isGrouped: false,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Education section with grid layout. Displays educational background with dates and descriptions.",
      },
    },
  },
};

export const Languages: Story = {
  args: {
    title: "Languages",
    items: mockLanguageItems,
    sectionName: SectionTypeEnum.LANGUAGES,
    isGrouped: false,
    isPillsView: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Languages section displayed as pills. Each language shows its proficiency level.",
      },
    },
  },
};

export const Certifications: Story = {
  args: {
    title: "Certifications",
    items: mockCertificationItems,
    sectionName: SectionTypeEnum.CERTIFICATIONS,
    isGrouped: false,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Certifications section displaying professional certifications and courses with dates.",
      },
    },
  },
};

export const PillsView: Story = {
  args: {
    title: "Technologies",
    items: [
      { title: "React" },
      { title: "TypeScript" },
      { title: "Next.js" },
      { title: "Node.js" },
      { title: "PostgreSQL" },
    ],
    sectionName: SectionTypeEnum.LANGUAGES,
    isGrouped: false,
    isPillsView: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Section displaying items as pills. Useful for skills, technologies, or tags.",
      },
    },
  },
};

export const Grouped: Story = {
  args: {
    title: "Grouped Experience",
    items: [
      {
        title: "Frontend Developer",
        titleDetail: "Company A",
        date: "2022-01",
        endDate: "2023-06",
      },
      {
        title: "Frontend Developer",
        titleDetail: "Company B",
        date: "2020-01",
        endDate: "2021-12",
      },
      {
        title: "Backend Developer",
        titleDetail: "Company C",
        date: "2019-01",
        endDate: "2019-12",
      },
    ],
    sectionName: SectionTypeEnum.EXPERIENCE,
    isGrouped: true,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Section with grouped items. Items are grouped by title and sorted by date. Shows 'See More' button when there are more than 3 items per group.",
      },
    },
  },
};

export const WithSeeMore: Story = {
  args: {
    title: "Experience",
    items: mockManyItems,
    sectionName: SectionTypeEnum.EXPERIENCE,
    isGrouped: false,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Section with more than 3 items showing the 'See More' button. Click to expand and see all items.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    title: "Experience",
    items: mockExperienceItems,
    sectionName: SectionTypeEnum.EXPERIENCE,
    isGrouped: false,
    isPillsView: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive section - use controls to modify props and see different configurations.",
      },
    },
  },
};
