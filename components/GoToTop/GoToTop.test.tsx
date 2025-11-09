import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GoToTop from "./GoToTop";

jest.mock("react-icons/fa", () => ({
  FaArrowUp: () => <svg data-testid="arrow-icon" />,
}));

describe("GoToTop component", () => {
  const ariaLabel = "Go to top";
  const title = "Go to top button";

  beforeEach(() => {
    window.scrollTo = jest.fn();
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      writable: true,
    });
  });

  it("renders button with aria-label and title", () => {
    render(<GoToTop ariaLabel={ariaLabel} title={title} />);
    const button = screen.getByRole("button", { hidden: true });
    expect(button).toHaveAttribute("aria-label", ariaLabel);
    expect(button).toHaveAttribute("title", title);
  });

  it("hides the button when scrollY is less than threshold", () => {
    render(<GoToTop ariaLabel={ariaLabel} title={title} />);
    const button = screen.getByRole("button", { hidden: true });
    expect(button).toHaveStyle({ display: "none" });
    expect(button).toHaveAttribute("aria-hidden", "true");
  });

  it("shows the button when scrollY exceeds threshold", () => {
    render(<GoToTop ariaLabel={ariaLabel} title={title} />);
    const button = screen.getByRole("button", { hidden: true });

    window.scrollY = 600;
    fireEvent.scroll(window);

    fireEvent.scroll(window);
    expect(button).toHaveStyle({ display: "flex" });
    expect(button).toHaveAttribute("aria-hidden", "false");
  });

  it("calls window.scrollTo on click", () => {
    render(<GoToTop ariaLabel={ariaLabel} title={title} />);
    const button = screen.getByRole("button", { hidden: true });

    window.scrollY = 600;
    fireEvent.scroll(window);

    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
