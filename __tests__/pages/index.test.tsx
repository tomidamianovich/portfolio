import { render, screen } from "@testing-library/react";
import { LanguageSelectorTypeEnum } from "@/components/features/LanguageSelector/LanguageSelector.types";

const mockT = (key: string, options?: { returnObjects?: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translations: Record<string, any> = {
    name: "Tomás Damianovich Reddy",
    "footer.storybook.text": "View Storybook",
    "footer.storybook.linkText":
      "https://portfolio-storybook-tomasdamianovich.vercel.app/",
    "footer.github.text": "Project on GitHub",
    "footer.github.linkText": "https://github.com/tomidamianovich/portfolio",
    contact: [],
    "experience.items": [],
    "education.items": [],
    "languages.items": [],
    "certifications.items": [],
    literals: {},
    "about.content": "",
    email: "",
    phone: "",
    position: "",
    titleDetail: "",
    nationality: "",
    "goToTop.ariaLabel": "",
    "goToTop.title": "",
    "seo.title": "",
    "seo.description": "",
    "literals.profileImageAlt": "",
    experience: { title: "" },
    education: { title: "" },
    languages: { title: "" },
    certifications: { title: "" },
  };
  const value = translations[key] || key;
  if (options?.returnObjects) {
    return value;
  }
  return value;
};

jest.mock("@/i18n", () => ({
  __esModule: true,
  default: {
    isInitialized: true,
    language: LanguageSelectorTypeEnum.EN,
    changeLanguage: jest.fn(),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: {
      language: LanguageSelectorTypeEnum.EN,
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    isReady: true,
    query: {},
  }),
}));

jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock("@/components/base/Pill", () => ({
  __esModule: true,
  default: () => <div data-testid="pill" />,
  PillVariantEnum: { OUTLINED: "outlined" },
  IconTypeEnum: {},
}));

jest.mock("@/components/features/DarkModeToggle", () => ({
  __esModule: true,
  default: () => <div data-testid="dark-mode-toggle" />,
}));

jest.mock("@/components/features/LanguageSelector", () => ({
  __esModule: true,
  default: () => <div data-testid="language-selector" />,
  LanguageSelectorTypeEnum: {
    EN: "en",
    ES: "es",
    DE: "de",
  },
}));

jest.mock("@/components/structures/Section", () => ({
  __esModule: true,
  default: () => <div data-testid="section" />,
  SectionTypeEnum: {
    EXPERIENCE: "experience",
    EDUCATION: "education",
    LANGUAGES: "languages",
    CERTIFICATIONS: "certifications",
  },
}));

jest.mock("@/components/features/GoToTop", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

jest.mock("react-icons/fi", () => ({
  FiGithub: () => <svg data-testid="github-icon" />,
  FiPhone: () => <svg data-testid="phone-icon" />,
}));

jest.mock("react-icons/si", () => ({
  SiStorybook: () => <svg data-testid="storybook-icon" />,
}));

jest.mock("react-icons/fa", () => ({
  FaCopyright: () => <svg data-testid="copyright-icon" />,
}));

jest.mock("react-icons/gr", () => ({
  GrLocationPin: () => <svg data-testid="location-icon" />,
}));

jest.mock("react-icons/fa6", () => ({
  FaRegFlag: () => <svg data-testid="flag-icon" />,
}));

jest.mock("react-icons/go", () => ({
  GoMail: () => <svg data-testid="mail-icon" />,
}));

jest.mock("dompurify", () => ({
  sanitize: (html: string) => html,
}));

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => () => <div data-testid="dynamic-component" />,
}));

jest.mock("@/styles/App.module.css", () => ({
  __esModule: true,
  default: {
    footer: "footer",
    footerText: "footerText",
    footerSeparator: "footerSeparator",
    footerLink: "footerLink",
    page: "page",
    selectorsWrapper: "selectorsWrapper",
    main: "main",
    about: "about",
    imageWrapper: "imageWrapper",
    baseInfo: "baseInfo",
    headerPillsWrapper: "headerPillsWrapper",
  },
}));

jest.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "geist-sans",
  }),
  Geist_Mono: () => ({
    variable: "geist-mono",
  }),
}));

import Home from "../../pages/index";

describe("Home page footer", () => {
  it("renders the footer with name and year", () => {
    render(<Home />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`Tomás Damianovich Reddy © ${currentYear}`)
    ).toBeInTheDocument();
  });

  it("renders the Storybook link in footer", () => {
    render(<Home />);
    const storybookLink = screen.getByText("View Storybook");
    expect(storybookLink).toBeInTheDocument();
    expect(storybookLink.closest("a")).toHaveAttribute(
      "href",
      "https://portfolio-storybook-tomasdamianovich.vercel.app/"
    );
    expect(storybookLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(storybookLink.closest("a")).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
  });

  it("renders the GitHub link in footer", () => {
    render(<Home />);
    const githubLink = screen.getByText("Project on GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/tomidamianovich/portfolio"
    );
    expect(githubLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(githubLink.closest("a")).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
  });

  it("renders icons in footer links", () => {
    render(<Home />);
    expect(screen.getByTestId("storybook-icon")).toBeInTheDocument();
    expect(screen.getByTestId("github-icon")).toBeInTheDocument();
  });
});
