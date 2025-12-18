import React, { useEffect, useState } from "react";
import styles from "./DarkModeToggle.module.css";
import { DarkModeToggleTypeEnum } from "./DarkModeToggle.types";
import { useTranslation } from "react-i18next";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import Button, { ButtonSize, ButtonVariant } from "@/components/Button";

const DarkModeToggle: React.FC = () => {
  // Always start with LIGHT to ensure SSR/client hydration match
  const [modeSelected, setModeSelected] = useState<DarkModeToggleTypeEnum>(
    DarkModeToggleTypeEnum.LIGHT
  );
  const [mounted, setMounted] = useState(false);

  // After mount, read the actual theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);

    const stored =
      (localStorage.getItem("theme") as DarkModeToggleTypeEnum | null) ?? null;

    if (stored) {
      setModeSelected(stored);
      document.documentElement.dataset.theme = stored;
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialMode = prefersDark
      ? DarkModeToggleTypeEnum.DARK
      : DarkModeToggleTypeEnum.LIGHT;

    setModeSelected(initialMode);
    document.documentElement.dataset.theme = initialMode;
  }, []);

  const handleChangeDarkMode = (mode: DarkModeToggleTypeEnum) => {
    setModeSelected(mode);
    if (mounted) {
      document.documentElement.dataset.theme = mode;
      localStorage.setItem("theme", mode);
    }
  };

  // Update theme when modeSelected changes (but only after mount)
  useEffect(() => {
    if (mounted) {
      document.documentElement.dataset.theme = modeSelected;
      localStorage.setItem("theme", modeSelected);
    }
  }, [modeSelected, mounted]);

  const { t } = useTranslation("common", { useSuspense: false });

  return (
    <div
      className={styles.darkModeToggle}
      aria-label={t("literals.darkModeToggleAriaLabel")}
    >
      <div className={styles.darkModeToggleButtonsWrapper}>
        {Object.values(DarkModeToggleTypeEnum).map((mode, key) => (
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.SECONDARY}
            key={key}
            active={modeSelected === mode}
            onClick={() => handleChangeDarkMode(mode)}
          >
            {mode === DarkModeToggleTypeEnum.DARK ? (
              <MdDarkMode size={18} />
            ) : (
              <MdLightMode size={18} />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DarkModeToggle;
