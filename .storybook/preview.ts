import type { Preview } from "@storybook/nextjs-vite";
import React, { useLayoutEffect } from "react";
import "../styles/globals.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Force light theme in Storybook - prevent any changes to dark
const forceLightTheme = () => {
  if (typeof document !== "undefined" && document.documentElement) {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme !== "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
};

// Set theme immediately and prevent changes
if (typeof window !== "undefined") {
  forceLightTheme();
  // Set on DOM ready
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", forceLightTheme);
    } else {
      forceLightTheme();
    }
    // Multiple fallbacks to ensure theme is set and locked
    setTimeout(forceLightTheme, 0);
    setTimeout(forceLightTheme, 100);
    setTimeout(forceLightTheme, 500);
    
    // Watch for any theme changes and force back to light
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const currentTheme = document.documentElement.getAttribute("data-theme");
          if (currentTheme !== "light") {
            forceLightTheme();
          }
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
}

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
  decorators: [
    (Story) => {
      // Force light theme when decorator runs
      forceLightTheme();
      
      // Create a wrapper that ensures light theme is always applied
      const ThemeWrapper: React.FC = () => {
        // Force theme on mount and keep it locked
        useLayoutEffect(() => {
          forceLightTheme();
          // Set up interval to continuously enforce light theme
          const interval = setInterval(forceLightTheme, 100);
          return () => clearInterval(interval);
        }, []);
        
        // Also force immediately on render
        forceLightTheme();
        
        return React.createElement(Story, {});
      };
      
      return React.createElement(ThemeWrapper, {});
    },
  ],
};

export default preview;
