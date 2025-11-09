import { render, screen } from "@testing-library/react";
import { PillVariantEnum, PillSizeEnum, IconTypeEnum } from "./Pill.types";
import Pill from "./Pill";

describe("Pill component", () => {
  it("renders text correctly", () => {
    render(<Pill text="Frontend" />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("renders as <span> when no href provided", () => {
    const { container } = render(<Pill text="Static pill" />);
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });

  it("renders as <a> when href provided", () => {
    const { container } = render(
      <Pill text="Link" href="https://example.com" />
    );
    const anchor = container.querySelector("a");
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", "https://example.com");
  });

  it("applies variant and size classes correctly", () => {
    const { container } = render(
      <Pill
        text="Outlined small"
        variant={PillVariantEnum.OUTLINED}
        size={PillSizeEnum.SMALL}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/outlined/);
    expect(el.className).toMatch(/small/);
  });

  it("does not render icon if icon prop is invalid", () => {
    const { container } = render(
      <Pill icon={"INVALID" as IconTypeEnum.GITHUB} />
    );
    expect(container.querySelector("svg")).toBeNull();
  });
});
