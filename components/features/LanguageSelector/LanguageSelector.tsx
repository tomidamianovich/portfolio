import React, { useEffect, useState } from "react";
import styles from "./LanguageSelector.module.css";
import { LanguageSelectorTypeEnum } from "./LanguageSelector.types";
import { useTranslation } from "react-i18next";
import Button, { ButtonSize, ButtonVariant } from "@/components/base/Button";
import { GrLanguage } from "react-icons/gr";

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation("common", { useSuspense: false });
  const [currentLanguage, setCurrentLanguage] = useState<string>("es");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    const stored =
      (localStorage.getItem("language") as LanguageSelectorTypeEnum | null) ??
      null;

    if (stored) {
      i18n.changeLanguage(stored);
      setCurrentLanguage(stored);
    } else {
      setCurrentLanguage(i18n.language);
    }
  }, [i18n]);

  return (
    <div
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
            active={currentLanguage === language}
            onClick={() => handleChangeLanguage(language)}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
