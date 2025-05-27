import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Import translation files
import ptTranslations from "./locales/pt.json"
import enTranslations from "./locales/en.json"

const resources = {
  pt: {
    translation: ptTranslations,
  },
  en: {
    translation: enTranslations,
  },
}

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "pt",
  lng: "pt",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
