import type { Preview } from "@storybook/nextjs-vite";
import React, { useLayoutEffect } from "react";
import "../styles/globals.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Add CSS to handle dark mode text colors in Storybook
if (typeof document !== "undefined") {
  // Add CSS that uses media queries and attribute selectors
  const darkModeStyle = document.createElement("style");
  darkModeStyle.textContent = `
    /* Apply white text when Storybook is in dark mode using media query */
    @media (prefers-color-scheme: dark) {
      [style*="color: var(--foreground)"] {
        color: #ffffff !important;
      }
      
      h1, h2, h3, h4, h5, h6, p, div, span {
        color: #ffffff !important;
      }
      
      [style*="opacity: 0.8"] {
        color: rgba(255, 255, 255, 0.8) !important;
      }
      
      [style*="opacity: 0.7"] {
        color: rgba(255, 255, 255, 0.7) !important;
      }
    }
    
    /* Also check if body has dark background using CSS */
    body[style*="background-color: rgb(17, 17, 17)"],
    body[style*="background-color: rgb(25, 25, 25)"],
    body[style*="background-color: #111"],
    body[style*="background-color: #191919"] {
      color: #ffffff !important;
    }
    
    body[style*="background-color: rgb(17, 17, 17)"] *,
    body[style*="background-color: rgb(25, 25, 25)"] *,
    body[style*="background-color: #111"] *,
    body[style*="background-color: #191919"] * {
      color: #ffffff !important;
    }
  `;
  document.head.appendChild(darkModeStyle);

  // Lightweight script that only runs when needed
  const script = document.createElement("script");
  script.textContent = `
    (function() {
      let lastState = null;
      let timeoutId = null;
      
      function updateTextColors() {
        try {
          const body = document.body;
          if (!body) return;
          
          const bodyBg = window.getComputedStyle(body).backgroundColor;
          const rgb = bodyBg.match(/\\d+/g);
          
          let isDark = false;
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            isDark = (r + g + b) < 400;
          } else {
            isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          }
          
          // Only update if state changed
          if (lastState !== isDark) {
            lastState = isDark;
            if (isDark) {
              body.classList.add('storybook-dark-mode');
            } else {
              body.classList.remove('storybook-dark-mode');
            }
          }
        } catch (e) {
          console.error('Error updating text colors:', e);
        }
      }
      
      // Debounced update function
      function debouncedUpdate() {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(updateTextColors, 100);
      }
      
      // Run once when ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateTextColors);
      } else {
        updateTextColors();
      }
      
      // Watch for media query changes only
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", debouncedUpdate);
      
      // Check less frequently
      setInterval(updateTextColors, 2000);
    })();
  `;
  document.head.appendChild(script);

  // Additional CSS for the class-based approach
  const classStyle = document.createElement("style");
  classStyle.textContent = `
    body.storybook-dark-mode [style*="color: var(--foreground)"] {
      color: #ffffff !important;
    }
    
    body.storybook-dark-mode h1,
    body.storybook-dark-mode h2,
    body.storybook-dark-mode h3,
    body.storybook-dark-mode h4,
    body.storybook-dark-mode h5,
    body.storybook-dark-mode h6,
    body.storybook-dark-mode p,
    body.storybook-dark-mode div,
    body.storybook-dark-mode span {
      color: #ffffff !important;
    }
  `;
  document.head.appendChild(classStyle);
}

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
          const currentTheme =
            document.documentElement.getAttribute("data-theme");
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
