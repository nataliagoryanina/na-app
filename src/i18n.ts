import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import general from './locales/en/general.json';

export const defaultNS = 'general';
export const resources = {
  en: {
    general
  }
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['general'],
  defaultNS,
  resources
});

export default i18n;
