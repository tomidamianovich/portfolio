import React, { useEffect, useState } from "react";
import styles from "./LanguageSelector.module.css";
import { LanguageSelectorTypeEnum } from "./LanguageSelector.types";
import { useTranslation } from "react-i18next";
import Button, { ButtonSize, ButtonVariant } from "@/components/base/Button";
import { GrLanguage } from "react-icons/gr";

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation("common", { useSuspense: false });
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    i18n.language || "en"
  );

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    setCurrentLanguage(i18n.language || "en");
  }, [i18n.language]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get("lang") || urlParams.get("language");
      const supportedLngs = Object.values(LanguageSelectorTypeEnum);

      if (queryLang) {
        const normalizedLang = queryLang.split("-")[0].toLowerCase();
        if (
          supportedLngs.includes(normalizedLang as LanguageSelectorTypeEnum) &&
          i18n.language !== normalizedLang
        ) {
          i18n.changeLanguage(normalizedLang);
          setCurrentLanguage(normalizedLang);
          localStorage.setItem("language", normalizedLang);
        }
      } else {
        const stored = localStorage.getItem("language");
        if (
          stored &&
          supportedLngs.includes(stored as LanguageSelectorTypeEnum) &&
          i18n.language !== stored
        ) {
          i18n.changeLanguage(stored);
          setCurrentLanguage(stored);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
