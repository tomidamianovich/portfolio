import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BackendModule } from "i18next";
import { LanguageSelectorTypeEnum } from "@/components/features/LanguageSelector/LanguageSelector.types";

function detectLanguage(ignoreLocalStorage = false): string {
  const supportedLngs = Object.values(LanguageSelectorTypeEnum) as string[];

  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get("lang") || urlParams.get("language");
    if (queryLang) {
      const normalizedQueryLang = queryLang.split("-")[0].toLowerCase();
      if (supportedLngs.includes(normalizedQueryLang)) {
        localStorage.setItem("language", normalizedQueryLang);
        return normalizedQueryLang;
      }
    }

    if (!ignoreLocalStorage) {
      const stored = localStorage.getItem("language");
      if (stored && supportedLngs.includes(stored)) {
        return stored;
      }
    }
  }

  return LanguageSelectorTypeEnum.EN;
}

if (!i18n.isInitialized) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const enTranslations = require("./locales/en/en.json");

    const detectedLanguage = detectLanguage(true);

    const hybridBackend = {
      type: "backend" as const,
      init: function () {},
      read: function (
        language: string,
        namespace: string,
        callback: (err: Error | null, data: unknown) => void
      ) {
        if (language === "en") {
          callback(null, enTranslations);
          return;
        }
        fetch(`/locales/${language}/${language}.json`)
          .then((res) => res.json())
          .then((data) => callback(null, data))
          .catch((err) => callback(err as Error, null));
      },
    };

    i18n
      .use(hybridBackend as BackendModule)
      .use(initReactI18next)
      .init({
        fallbackLng: "en",
        supportedLngs: Object.values(LanguageSelectorTypeEnum),
        lng: detectedLanguage,
        defaultNS: "common",
        ns: ["common"],
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        load: "languageOnly",
        nonExplicitSupportedLngs: true,
      })
      .catch((err) => {
        console.error("i18n init error:", err);
      });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const serverBackend = require("./i18n-server-backend").default;

    let serverLang = "en";
    if (
      typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_INITIAL_LANG
    ) {
      const envLang =
        process.env.NEXT_PUBLIC_INITIAL_LANG.split("-")[0].toLowerCase();
      const supportedLngs = Object.values(LanguageSelectorTypeEnum);
      if (supportedLngs.includes(envLang as LanguageSelectorTypeEnum)) {
        serverLang = envLang;
      }
    }

    i18n
      .use(serverBackend)
      .use(initReactI18next)
      .init({
        fallbackLng: "en",
        supportedLngs: Object.values(LanguageSelectorTypeEnum),
        lng: serverLang,
        defaultNS: "common",
        ns: ["common"],
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        load: "languageOnly",
        nonExplicitSupportedLngs: true,
        initImmediate: false,
      })
      .catch((err) => {
        console.error("i18n init error:", err);
      });
  }
}

export default i18n;
