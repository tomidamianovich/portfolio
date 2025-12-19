import type { Preview } from "@storybook/nextjs-vite";
import "../styles/globals.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: "es",
      fallbackLng: "es",
      supportedLngs: ["es", "en", "de"],
      defaultNS: "common",
      ns: ["common"],
      backend: {
        loadPath: "/locales/{{lng}}/{{lng}}.json",
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      initImmediate: false,
    })
    .catch((err) => {
      console.error("i18n init error in Storybook:", err);
    });
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
