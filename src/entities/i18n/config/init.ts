import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector, {
  DetectorOptions,
} from "i18next-browser-languagedetector";

export const initI18n = async () => {
  if (i18n.isInitialized) {
    return;
  }

  return i18n
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init<HttpBackendOptions & DetectorOptions>({
      debug: import.meta.env.DEV,
      load: "languageOnly",
      fallbackLng: "ru",
      ns: "app",
      defaultNS: "app",
      supportedLngs: ["en", "ru"],

      keySeparator: false,

      interpolation: {
        escapeValue: false,
      },

      // https://github.com/i18next/i18next-browser-languageDetector
      detection: {},

      // https://github.com/i18next/i18next-http-backend?tab=readme-ov-file#backend-options
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });
};
