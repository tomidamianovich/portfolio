import React from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Button, { ButtonVariant, ButtonSize } from "@/components/Button";
import { type FC } from "react";
import { type SeeMoreButtonProps } from "./SeeMoreButton.types";
import { useTranslation } from "react-i18next";

const SeeMoreButton: FC<SeeMoreButtonProps> = ({
  onButtonClick,
  isMoreItemsVisible,
}) => {
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
    >
      {isMoreItemsVisible ? (
        <CiCircleMinus size={24} />
      ) : (
        <CiCirclePlus size={24} />
      )}
    </Button>
  );
};

export default SeeMoreButton;
