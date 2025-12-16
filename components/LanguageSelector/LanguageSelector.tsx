import React from "react";
import styles from "./LanguageSelector.module.css";
import { LanguageSelectorTypeEnum } from "./LanguageSelector.types";
import { useTranslation } from "react-i18next";
import Button, { ButtonSize, ButtonVariant } from "@/components/Button";
import { GrLanguage } from "react-icons/gr";

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation("common", { useSuspense: false });

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav
      className={styles.languageSelector}
      aria-label={t("literals.languageSelectorAriaLabel")}
    >
      <GrLanguage size={18} aria-hidden />
      <div className={styles.languageSelectorButtonsWrapper}>
        {Object.values(LanguageSelectorTypeEnum).map((language, key) => (
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

export default LanguageSelector;
