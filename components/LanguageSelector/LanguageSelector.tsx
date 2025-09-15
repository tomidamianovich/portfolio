import React from "react";
import styles from "./LanguageSelector.module.css";
import {
  type LanguageSelectorProps,
  LanguageSelectorTypeEnum,
} from "./LanguageSelector.types";
import { useTranslation } from "react-i18next";
import Button, { ButtonSize, ButtonVariant } from "@/components/Button";

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.languageSelector}>
      {Object.values(LanguageSelectorTypeEnum).map((language, key) => (
        <Button
          text={language}
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINED}
          key={key}
          active={i18n.language === language}
          onClick={() => handleChangeLanguage(language)}
        />
      ))}
    </div>
  );
};

export default LanguageSelector;
