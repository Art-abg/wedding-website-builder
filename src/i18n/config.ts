import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Simple translation resources for now
import { en } from './locales/en';
import { ru } from './locales/ru';
import { hy } from './locales/hy';

const resources = {
  en,
  ru,
  hy
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
