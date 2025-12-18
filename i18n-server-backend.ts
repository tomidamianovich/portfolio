import type { BackendModule, ReadCallback } from "i18next";

// Import translations directly - these are bundled with the app in production (Vercel)
// This ensures translations are available synchronously during SSR
// Using require so the JSON files are bundled at build time
// eslint-disable-next-line @typescript-eslint/no-require-imports
const esTranslations = require("./locales/es/es.json");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const enTranslations = require("./locales/en/en.json");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const deTranslations = require("./locales/de/de.json");

const translations: Record<string, unknown> = {
  es: esTranslations,
  en: enTranslations,
  de: deTranslations,
};

const serverBackend: BackendModule = {
  type: "backend",
  init: function () {
    // No initialization needed - translations are already loaded
  },
  read: function (language: string, namespace: string, callback: ReadCallback) {
    try {
      const translationData = translations[language];
      if (translationData) {
        callback(null, translationData);
      } else {
        callback(
          new Error(`Translation not found for language: ${language}`),
          null
        );
      }
    } catch (err) {
      callback(err as Error, null);
    }
  },
};

export default serverBackend;
