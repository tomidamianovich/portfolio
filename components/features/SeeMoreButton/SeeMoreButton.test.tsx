import { render, screen, fireEvent } from "@testing-library/react";
import SeeMoreButton from "./SeeMoreButton";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "literals.seeMore") return "See more";
      if (key === "literals.seeLess") return "See less";
      return key;
    },
  }),
}));

describe("SeeMoreButton", () => {
  it("renderiza el botón con 'See more' cuando isMoreItemsVisible es false", () => {
    const handleClick = jest.fn();
    render(
      <SeeMoreButton onButtonClick={handleClick} isMoreItemsVisible={false} />
    );

    expect(
      screen.getByRole("button", { name: "See more" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
  });

  it("renderiza el botón con 'See less' cuando isMoreItemsVisible es true", () => {
    const handleClick = jest.fn();
    render(
      <SeeMoreButton onButtonClick={handleClick} isMoreItemsVisible={true} />
    );

    expect(
      screen.getByRole("button", { name: "See less" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-minus")).toBeInTheDocument();
  });

  it("llama a onButtonClick cuando se hace click", () => {
    const handleClick = jest.fn();
    render(
      <SeeMoreButton onButtonClick={handleClick} isMoreItemsVisible={false} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
