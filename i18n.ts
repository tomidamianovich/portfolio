import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BackendModule } from "i18next";

if (!i18n.isInitialized) {
  if (typeof window !== "undefined") {
    // Client-side: preload es.json for faster initial load
    // Load es.json directly, use HttpBackend for other languages
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const esTranslations = require("./locales/es/es.json");

    // Create a hybrid backend that uses preloaded es.json
    const hybridBackend = {
      type: "backend" as const,
      init: function () {},
      read: function (
        language: string,
        namespace: string,
        callback: (err: Error | null, data: unknown) => void
      ) {
        // Use preloaded es.json for instant loading
        if (language === "es") {
          callback(null, esTranslations);
          return;
        }
        // For other languages, fetch via HTTP
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
        fallbackLng: "es",
        supportedLngs: ["es", "en", "de"],
        lng: "es",
        defaultNS: "common",
        ns: ["common"],
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      })
      .catch((err) => {
        console.error("i18n init error:", err);
      });
  } else {
    // Server-side: use direct imports for synchronous loading during SSR
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const serverBackend = require("./i18n-server-backend").default;
    // Initialize synchronously and wait for it to complete
    i18n
      .use(serverBackend)
      .use(initReactI18next)
      .init({
        fallbackLng: "es",
        supportedLngs: ["es", "en", "de"],
        lng: "es",
        defaultNS: "common",
        ns: ["common"],
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        // Ensure resources are loaded immediately
        initImmediate: false,
      })
      .catch((err) => {
        console.error("i18n init error:", err);
      });
  }
}

export default i18n;
