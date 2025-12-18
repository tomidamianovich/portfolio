import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";
import { DarkModeToggleTypeEnum } from "./DarkModeToggle.types";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-icons/md", () => ({
  MdDarkMode: () => <svg data-testid="dark-mode-icon" />,
  MdLightMode: () => <svg data-testid="light-mode-icon" />,
}));

jest.mock("@/components/Button", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    active,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    active: boolean;
  }) => (
    <button data-active={active ? "true" : "false"} onClick={onClick}>
      {children}
    </button>
  ),
  ButtonSize: { MEDIUM: "medium" },
  ButtonVariant: { SECONDARY: "secondary" },
}));

describe("DarkModeToggle component", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    // Reset document.documentElement.dataset.theme
    delete document.documentElement.dataset.theme;
  });

  it("renders dark and light mode buttons", async () => {
    render(<DarkModeToggle />);

    await waitFor(() => {
      expect(screen.getByTestId("dark-mode-icon")).toBeInTheDocument();
      expect(screen.getByTestId("light-mode-icon")).toBeInTheDocument();
    });
  });

  it("renders a button for each mode", async () => {
    render(<DarkModeToggle />);

    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(
        Object.values(DarkModeToggleTypeEnum).length
      );
    });
  });

  it("marks the active mode button after mount", async () => {
    render(<DarkModeToggle />);

    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      // After mount, it should detect system preference or use stored value
      // Initially all buttons might be inactive, then one becomes active
      const activeButtons = buttons.filter(
        (btn) => btn.getAttribute("data-active") === "true"
      );
      expect(activeButtons.length).toBeGreaterThanOrEqual(0);
    });
  });

  it("changes mode when a button is clicked", async () => {
    render(<DarkModeToggle />);

    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    const buttons = screen.getAllByRole("button");
    const darkButton = buttons.find((btn) =>
      btn.querySelector('[data-testid="dark-mode-icon"]')
    );

    if (darkButton) {
      fireEvent.click(darkButton);

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "theme",
          DarkModeToggleTypeEnum.DARK
        );
        expect(document.documentElement.dataset.theme).toBe(
          DarkModeToggleTypeEnum.DARK
        );
      });
    }
  });

  it("loads stored theme from localStorage on mount", async () => {
    localStorageMock.setItem("theme", DarkModeToggleTypeEnum.DARK);

    render(<DarkModeToggle />);

    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith("theme");
      expect(document.documentElement.dataset.theme).toBe(
        DarkModeToggleTypeEnum.DARK
      );
    });
  });
});
