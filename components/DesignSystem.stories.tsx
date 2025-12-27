import { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import Button, { ButtonVariant, ButtonSize } from "./base/Button";
import Pill, { PillVariantEnum, PillSizeEnum, IconTypeEnum } from "./base/Pill";
import DarkModeToggle from "./features/DarkModeToggle";
import LanguageSelector from "./features/LanguageSelector";
import SeeMoreButton from "./features/SeeMoreButton";
import Section from "./structures/Section";
import { SectionTypeEnum } from "./structures/Section/Section.types";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const meta: Meta = {
  title: "Design System/Overview",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Complete overview of the portfolio design system. Includes all base components, features, structures, and design tokens.",
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Design Tokens Section
export const DesignTokens: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          color: "var(--foreground)",
        }}
      >
        Design Tokens
      </h1>

      {/* Colors */}
      <section style={{ marginBottom: "3rem", width: "100%" }}>
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Colors
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            { name: "Primary", var: "var(--color-primary)" },
            { name: "Primary Light", var: "var(--color-primary-light)" },
            { name: "Primary Dark", var: "var(--color-primary-dark)" },
            { name: "Accent", var: "var(--color-accent)" },
            { name: "Success", var: "var(--color-success)" },
            { name: "Warning", var: "var(--color-warning)" },
            { name: "Gray 100", var: "var(--color-gray-100)" },
            { name: "Gray 200", var: "var(--color-gray-200)" },
            { name: "Gray 300", var: "var(--color-gray-300)" },
            { name: "Gray 400", var: "var(--color-gray-400)" },
            { name: "Gray 500", var: "var(--color-gray-500)" },
            { name: "Gray 600", var: "var(--color-gray-600)" },
            { name: "Gray 700", var: "var(--color-gray-700)" },
            { name: "Gray 800", var: "var(--color-gray-800)" },
            { name: "Black", var: "var(--color-black)" },
            { name: "White", var: "var(--color-white)" },
          ].map((color) => (
            <div
              key={color.name}
              style={{
                border: "1px solid var(--color-gray-300)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "80px",
                  backgroundColor: color.var,
                  borderBottom: "1px solid var(--color-gray-300)",
                }}
              />
              <div style={{ padding: "0.75rem" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0.25rem",
                    color: "var(--foreground)",
                  }}
                >
                  {color.name}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--foreground)",
                    opacity: 0.7,
                    fontFamily: "monospace",
                  }}
                >
                  {color.var}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section style={{ marginBottom: "3rem", width: "100%" }}>
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Typography
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { name: "XXS", var: "var(--font-size-xxs)" },
            { name: "XS", var: "var(--font-size-xs)" },
            { name: "SM", var: "var(--font-size-sm)" },
            { name: "Base", var: "var(--font-size-base)" },
            { name: "MD", var: "var(--font-size-md)" },
            { name: "LG", var: "var(--font-size-lg)" },
            { name: "XL", var: "var(--font-size-xl)" },
            { name: "2XL", var: "var(--font-size-2xl)" },
            { name: "3XL", var: "var(--font-size-3xl)" },
            { name: "4XL", var: "var(--font-size-4xl)" },
          ].map((size) => (
            <div
              key={size.name}
              style={{
                padding: "1rem",
                border: "1px solid var(--color-gray-300)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: size.var,
                  marginBottom: "0.5rem",
                  color: "var(--foreground)",
                }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--foreground)",
                  opacity: 0.7,
                  fontFamily: "monospace",
                }}
              >
                {size.name} - {size.var}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section style={{ marginBottom: "3rem", width: "100%" }}>
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Spacing
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { name: "XXS", var: "var(--space-xxs)" },
            { name: "XS", var: "var(--space-xs)" },
            { name: "SM", var: "var(--space-sm)" },
            { name: "MD", var: "var(--space-md)" },
            { name: "LG", var: "var(--space-lg)" },
            { name: "XL", var: "var(--space-xl)" },
            { name: "2XL", var: "var(--space-2xl)" },
            { name: "3XL", var: "var(--space-3xl)" },
            { name: "4XL", var: "var(--space-4xl)" },
            { name: "5XL", var: "var(--space-5xl)" },
            { name: "6XL", var: "var(--space-6xl)" },
          ].map((space) => (
            <div
              key={space.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem",
                border: "1px solid var(--color-gray-300)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: space.var,
                  height: "40px",
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "4px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold", color: "var(--foreground)" }}>
                  {space.name}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--foreground)",
                    opacity: 0.7,
                    fontFamily: "monospace",
                  }}
                >
                  {space.var}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Design tokens: colors, typography, and spacing system.",
      },
    },
  },
};

// Base Components Section
export const BaseComponents: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          color: "var(--foreground)",
        }}
      >
        Base Components
      </h1>

      {/* Buttons */}
      <section style={{ marginBottom: "3rem", width: "100%" }}>
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Buttons
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Variants
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Button text="Primary" variant={ButtonVariant.PRIMARY} />
              <Button text="Secondary" variant={ButtonVariant.SECONDARY} />
              <Button text="Outlined" variant={ButtonVariant.OUTLINED} />
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Sizes
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Button text="Small" size={ButtonSize.SMALL} />
              <Button text="Medium" size={ButtonSize.MEDIUM} />
              <Button text="Large" size={ButtonSize.LARGE} />
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              States
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Button text="Default" />
              <Button text="Active" active />
              <Button text="Disabled" disabled />
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              With Icons
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Button ariaLabel="Light mode">
                <MdLightMode size={18} />
              </Button>
              <Button text="With Icon" variant={ButtonVariant.OUTLINED}>
                <MdDarkMode size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pills */}
      <section style={{ marginBottom: "3rem", width: "100%" }}>
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Pills
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Variants
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Pill text="Primary" variant={PillVariantEnum.PRIMARY} />
              <Pill text="Outlined" variant={PillVariantEnum.OUTLINED} />
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Sizes
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Pill text="Small" size={PillSizeEnum.SMALL} />
              <Pill text="Medium" size={PillSizeEnum.MEDIUM} />
              <Pill text="Large" size={PillSizeEnum.LARGE} />
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              With Icons and Links
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Pill
                text="Instagram"
                href="https://instagram.com"
                icon={IconTypeEnum.INSTAGRAM}
              />
              <Pill
                text="LinkedIn"
                href="https://linkedin.com"
                icon={IconTypeEnum.LINKEDIN}
              />
              <Pill
                text="GitHub"
                href="https://github.com"
                icon={IconTypeEnum.GITHUB}
              />
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Language Pills
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Pill text="Spanish" index={0} />
              <Pill text="English" index={1} />
              <Pill text="German" index={2} />
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reusable base components: Button and Pill.",
      },
    },
  },
};

// Feature Components Section
export const FeatureComponents: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          color: "var(--foreground)",
        }}
      >
        Feature Components
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          width: "100%",
          alignItems: "start",
        }}
      >
        <section>
          <h2
            style={{
              marginBottom: "1rem",
              fontSize: "1.5rem",
              color: "var(--foreground)",
            }}
          >
            Dark Mode Toggle
          </h2>
          <p
            style={{
              marginBottom: "1rem",
              color: "var(--foreground)",
              opacity: 0.8,
            }}
          >
            Component to toggle between light and dark mode.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              padding: "0",
            }}
          >
            <DarkModeToggle />
          </div>
        </section>

        <section>
          <h2
            style={{
              marginBottom: "1rem",
              fontSize: "1.5rem",
              color: "var(--foreground)",
            }}
          >
            Language Selector
          </h2>
          <p
            style={{
              marginBottom: "1rem",
              color: "var(--foreground)",
              opacity: 0.8,
            }}
          >
            Language selector to switch between Spanish, English, and German.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              padding: "0",
            }}
          >
            <LanguageSelector />
          </div>
        </section>

        <section>
          <h2
            style={{
              marginBottom: "1rem",
              fontSize: "1.5rem",
              color: "var(--foreground)",
            }}
          >
            See More Button
          </h2>
          <p
            style={{
              marginBottom: "1rem",
              color: "var(--foreground)",
              opacity: 0.8,
            }}
          >
            Button to expand/collapse additional content.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <SeeMoreButton
              isMoreItemsVisible={false}
              onButtonClick={() => {}}
            />
            <SeeMoreButton isMoreItemsVisible={true} onButtonClick={() => {}} />
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Feature components: DarkModeToggle, LanguageSelector, and SeeMoreButton.",
      },
    },
  },
};

// Structure Components Section
export const StructureComponents: Story = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          color: "var(--foreground)",
        }}
      >
        Structure Components
      </h1>

      <section style={{ marginBottom: "3rem", width: "100%" }}>
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "var(--foreground)",
          }}
        >
          Section
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            color: "var(--foreground)",
            opacity: 0.8,
          }}
        >
          Section component with multiple views: default, grouped, and pills.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            alignItems: "start",
            width: "100%",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Default View
            </h3>
            <Section
              title="Experience"
              sectionName={SectionTypeEnum.EXPERIENCE}
              items={[
                {
                  title: "Frontend Developer",
                  titleDetail: "Senior",
                  subtitle: "Example Company",
                  date: "2023-01",
                  endDate: "2024-12",
                  content:
                    "Development of modern web applications with React and Next.js.",
                },
                {
                  title: "Full Stack Developer",
                  titleDetail: "Mid-level",
                  subtitle: "Tech Startup",
                  date: "2021-06",
                  endDate: "2022-12",
                  content:
                    "Development of complete applications with Node.js and React.",
                },
              ]}
            />
          </div>

          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Grouped View
            </h3>
            <Section
              title="Certifications"
              sectionName={SectionTypeEnum.CERTIFICATIONS}
              isGrouped={true}
              items={[
                {
                  title: "Frontend",
                  titleDetail: "React Developer",
                  date: "2023-01",
                },
                {
                  title: "Frontend",
                  titleDetail: "Next.js Certification",
                  date: "2023-01",
                },
                {
                  title: "Backend",
                  titleDetail: "Node.js Expert",
                  date: "2022-06",
                },
                {
                  title: "Backend",
                  titleDetail: "Express Master",
                  date: "2022-06",
                },
              ]}
            />
          </div>

          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--foreground)" }}>
              Pills View
            </h3>
            <Section
              title="Languages"
              sectionName={SectionTypeEnum.LANGUAGES}
              isPillsView={true}
              items={[
                { title: "Spanish" },
                { title: "English" },
                { title: "German" },
                { title: "French" },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Structure components: Section with different views.",
      },
    },
  },
};
