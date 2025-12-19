import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@vercel/analytics", () => ({
  track: jest.fn(),
}));
import Section from "./Section";
import { SectionTypeEnum } from "./Section.types";
import { MAX_ITEMS_DEFAULT } from "./Section.constant";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

jest.mock("@/hooks/useFormatDate", () => ({
  useFormatDate: () => ({ formatDate: (d: string) => `formatted-${d}` }),
}));
jest.mock("@/hooks/useDuration", () => ({
  useDuration: () => ({
    calculate: (start: string, end: string) => `duration-${start}-${end}`,
  }),
}));

jest.mock("@/components/base/Pill", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <div>{text}</div>,
  PillVariantEnum: { OUTLINED: "outlined" },
}));

describe("Section component", () => {
  const defaultItems = [
    {
      title: "Item 1",
      date: "2022-01-01",
      endDate: "2022-02-01",
      titleDetail: "Detail 1",
      mode: "Remote",
      subtitle: "Sub 1",
      content: "Content 1",
    },
    {
      title: "Item 2",
      date: "2021-01-01",
      endDate: "2021-06-01",
      titleDetail: "Detail 2",
      mode: "Onsite",
      subtitle: "Sub 2",
      content: "Content 2",
    },
  ];

  const defaultLiterals = {
    present: "Present",
    seeLess: "See less",
    seeMore: "See more",
  };

  it("renders default view correctly", () => {
    render(
      <Section
        title="Test"
        items={defaultItems}
        sectionName={SectionTypeEnum.EXPERIENCE}
        literals={defaultLiterals}
      />
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText(/formatted-2022-01-01/)).toBeInTheDocument();
  });

  it("renders pills view correctly", () => {
    render(
      <Section
        title="Pills Test"
        items={defaultItems}
        isPillsView
        literals={defaultLiterals}
      />
    );
    expect(screen.getByText("Pills Test")).toBeInTheDocument();
    expect(screen.getByText("Item 1 - Detail 1")).toBeInTheDocument();
  });

  it("renders grouped view correctly", () => {
    const groupedItems = [
      { title: "Group 1", titleDetail: "Detail A", date: "2022-01-01" },
      { title: "Group 1", titleDetail: "Detail B", date: "2022-02-01" },
      { title: "Group 2", titleDetail: "Detail C", date: "2023-01-01" },
    ];
    render(
      <Section
        title="Grouped Test"
        items={groupedItems}
        isGrouped
        literals={defaultLiterals}
        sectionName={SectionTypeEnum.EXPERIENCE}
      />
    );
    expect(screen.getByText("Grouped Test")).toBeInTheDocument();
    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Detail A")).toBeInTheDocument();
    expect(screen.getByText("Detail B")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
    expect(screen.getByText("Detail C")).toBeInTheDocument();
  });

  it("SeeMoreButton toggles more items visibility", () => {
    const manyItems = Array.from({ length: MAX_ITEMS_DEFAULT + 1 }, (_, i) => ({
      title: `Item ${i + 1}`,
      date: `2022-0${i + 1}-01`,
    }));
    render(
      <Section
        title="See More Test"
        items={manyItems}
        sectionName={SectionTypeEnum.EXPERIENCE}
        literals={defaultLiterals}
      />
    );

    const lastItem = screen
      .getByText(`Item ${MAX_ITEMS_DEFAULT + 1}`)
      .closest("div");
    expect(lastItem).toHaveClass("hidden");

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(lastItem).toHaveClass("visible");
  });
});
