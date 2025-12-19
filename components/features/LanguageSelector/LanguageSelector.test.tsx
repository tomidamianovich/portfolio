import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "./LanguageSelector";
import { LanguageSelectorTypeEnum } from "./LanguageSelector.types";

const changeLanguageMock = jest.fn();
const firstLanguage = Object.values(LanguageSelectorTypeEnum)[0];

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

jest.mock("@/components/base/Button", () => ({
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

describe("LanguageSelector component", () => {
  beforeEach(() => {
    changeLanguageMock.mockClear();
  });

  it("renders the language icon", () => {
    render(<LanguageSelector />);
    expect(screen.getByTestId("language-icon")).toBeInTheDocument();
  });

  it("renders a button for each language", () => {
    render(<LanguageSelector />);
    Object.values(LanguageSelectorTypeEnum).forEach((lang) => {
      expect(screen.getByText(lang)).toBeInTheDocument();
    });
  });

  it("marks the active language button", () => {
    render(<LanguageSelector />);
    const activeButton = screen.getByText(firstLanguage);
    expect(activeButton).toHaveAttribute("data-active", "true");
  });

  it("calls i18n.changeLanguage when a button is clicked", () => {
    render(<LanguageSelector />);
    const buttons = Object.values(LanguageSelectorTypeEnum).map((lang) =>
      screen.getByText(lang)
    );

    fireEvent.click(buttons[1]);
    expect(changeLanguageMock).toHaveBeenCalledWith(buttons[1].textContent);
  });
});
