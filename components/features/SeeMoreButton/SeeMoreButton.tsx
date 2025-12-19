import React, { type ComponentProps } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Button, { ButtonVariant, ButtonSize } from "@/components/base/Button";
import { type FC } from "react";
import { type SeeMoreButtonProps } from "./SeeMoreButton.types";
import { useTranslation } from "react-i18next";

type ButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick" | "text" | "variant" | "size"
>;

const SeeMoreButton: FC<SeeMoreButtonProps & ButtonProps> = ({
  onButtonClick,
  isMoreItemsVisible,
  ...props
}: SeeMoreButtonProps & ButtonProps) => {
  const { t } = useTranslation("common", { useSuspense: false });

  const handleButtonClick = (e: Event) => {
    e.preventDefault();
    onButtonClick();
  };

  return (
    <Button
      variant={ButtonVariant.OUTLINED}
      text={
        isMoreItemsVisible
          ? t("literals.seeLess") ?? ""
          : t("literals.seeMore") ?? ""
      }
      size={ButtonSize.SMALL}
      aria-expanded={isMoreItemsVisible}
      aria-controls="section-items"
      onClick={handleButtonClick}
      {...props}
    >
      {isMoreItemsVisible ? (
        <CiCircleMinus data-testid="icon-minus" size={24} />
      ) : (
        <CiCirclePlus data-testid="icon-plus" size={24} />
      )}
    </Button>
  );
};

export default SeeMoreButton;
