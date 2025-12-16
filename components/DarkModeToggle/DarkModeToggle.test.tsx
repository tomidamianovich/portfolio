import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";
import { DarkModeToggleTypeEnum } from "./DarkModeToggle.types";

const changeLanguageMock = jest.fn();
const firstLanguage = Object.values(DarkModeToggleTypeEnum)[0];

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: firstLanguage,
      changeLanguage: changeLanguageMock,
    },
  }),
}));

jest.mock("react-icons/gr", () => ({
  GrLanguage: () => <svg data-testid="language-icon" />,
}));

jest.mock("@/components/Button", () => ({
  __esModule: true,
  default: ({
    text,
    onClick,
    active,
  }: {
    text: string;
    onClick: () => void;
    active: boolean;
  }) => (
    <button data-active={active ? "true" : "false"} onClick={onClick}>
      {text}
    </button>
  ),
  ButtonSize: { MEDIUM: "medium" },
  ButtonVariant: { OUTLINED: "outlined" },
}));

describe("DarkModeToggle component", () => {
  beforeEach(() => {
    changeLanguageMock.mockClear();
  });

  it("renders the language icon", () => {
    render(<DarkModeToggle />);
    expect(screen.getByTestId("language-icon")).toBeInTheDocument();
  });

  it("renders a button for each language", () => {
    render(<DarkModeToggle />);
    Object.values(DarkModeToggleTypeEnum).forEach((lang) => {
      expect(screen.getByText(lang)).toBeInTheDocument();
    });
  });

  it("marks the active language button", () => {
    render(<DarkModeToggle />);
    const activeButton = screen.getByText(firstLanguage);
    expect(activeButton).toHaveAttribute("data-active", "true");
  });

  it("calls i18n.changeLanguage when a button is clicked", () => {
    render(<DarkModeToggle />);
    const buttons = Object.values(DarkModeToggleTypeEnum).map((lang) =>
      screen.getByText(lang)
    );

    fireEvent.click(buttons[1]);
    expect(changeLanguageMock).toHaveBeenCalledWith(buttons[1].textContent);
  });
});
