import React from "react";
import styles from "./DarkModeToggle.module.css";
import { DarkModeToggleTypeEnum } from "./DarkModeToggle.types";
import { useTranslation } from "react-i18next";
import Button, { ButtonSize, ButtonVariant } from "@/components/Button";
import { GrLanguage } from "react-icons/gr";

const DarkModeToggle: React.FC = () => {
  const { i18n, t } = useTranslation("common", { useSuspense: false });

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav
      className={styles.darkModeToggle}
      aria-label={t("literals.darkModeToggleAriaLabel")}
    >
      <GrLanguage size={18} aria-hidden />
      <div className={styles.darkModeToggleButtonsWrapper}>
        {Object.values(DarkModeToggleTypeEnum).map((language, key) => (
          <Button
            text={language}
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.SECONDARY}
            key={key}
            active={i18n.language === language}
            onClick={() => handleChangeLanguage(language)}
          />
        ))}
      </div>
    </nav>
  );
};

export default DarkModeToggle;
