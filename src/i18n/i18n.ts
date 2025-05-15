
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationPtBR from './locales/pt-BR/translation.json';
import translationPtPT from './locales/pt-PT/translation.json';
import translationEn from './locales/en/translation.json';
import translationEs from './locales/es/translation.json';

// the translations
const resources = {
  'pt-BR': {
    translation: translationPtBR
  },
  'pt-PT': {
    translation: translationPtPT
  },
  'en': {
    translation: translationEn
  },
  'es': {
    translation: translationEs
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('preferredLanguage') || 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false // Disable suspense for SSR compatibility
    }
  });

// Add an observer for language changes to trigger the custom event
i18n.on('languageChanged', (lng) => {
  // Dispatch custom event
  window.dispatchEvent(new Event('languageChanged'));
  console.log(`Language changed to: ${lng}`);
});

export default i18n;
