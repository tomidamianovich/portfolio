import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { ButtonVariant, ButtonSize } from "./Button.types";

describe("Button component", () => {
  it("renders the text correctly", () => {
    render(<Button text="Click me"></Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders children correctly", () => {
    render(<Button text="Child Text">Child Text</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Child Text");
  });

  it("applies variant and size classes correctly", () => {
    render(
      <Button
        text="Test"
        variant={ButtonVariant.OUTLINED}
        size={ButtonSize.LARGE}
      />
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("outlined");
    expect(button.className).toContain("large");
  });

  it("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" onClick={onClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" onClick={onClickMock} disabled />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("applies ARIA attributes correctly when active and disabled", () => {
    render(<Button text="Test" active disabled />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-selected", "true");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
