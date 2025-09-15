import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: "es",
      supportedLngs: ["es", "en", "de"],
      lng: "es",
      defaultNS: "common",
      ns: ["common"],
      backend: {
        loadPath: "/locales/{{lng}}/{{lng}}.json",
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })
    .catch((err) => {
      console.error("i18n init error:", err);
    });
}

export default i18n;
