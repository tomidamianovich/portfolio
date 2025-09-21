import React from "react";
import styles from "./LanguageSelector.module.css";
import {
  type LanguageSelectorProps,
  LanguageSelectorTypeEnum,
} from "./LanguageSelector.types";
import { useTranslation } from "react-i18next";
import Button, { ButtonSize, ButtonVariant } from "@/components/Button";
import { GrLanguage } from "react-icons/gr";

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const { i18n, t } = useTranslation("common", { useSuspense: false });

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav
      className={styles.languageSelector}
      aria-label={t("literals.languageSelectorAriaLabel")}
    >
      <GrLanguage size={22} aria-hidden />
      {Object.values(LanguageSelectorTypeEnum).map((language, key) => (
        <Button
          text={language}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINED}
          key={key}
          active={i18n.language === language}
          onClick={() => handleChangeLanguage(language)}
        />
      ))}
    </nav>
  );
};

export default LanguageSelector;
