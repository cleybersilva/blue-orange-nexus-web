
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

// Get browser language or stored preference
const detectUserLanguage = () => {
  const storedLanguage = localStorage.getItem('preferredLanguage');
  if (storedLanguage && Object.keys(resources).includes(storedLanguage)) {
    return storedLanguage;
  }
  
  // Try to detect browser language
  const browserLang = navigator.language;
  // Check if the exact language code exists in our resources
  if (browserLang && Object.keys(resources).includes(browserLang)) {
    return browserLang;
  }
  
  // Try to match just the language part (e.g., 'en' from 'en-US')
  const langPart = browserLang?.split('-')[0];
  if (langPart && Object.keys(resources).some(code => code.startsWith(langPart))) {
    // Find the first matching language code
    const matchedCode = Object.keys(resources).find(code => code.startsWith(langPart));
    return matchedCode || 'pt-BR';
  }
  
  // Default fallback
  return 'pt-BR';
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: detectUserLanguage(),
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false, // Disable suspense for SSR compatibility
      bindI18n: 'languageChanged loaded', // Events that trigger rerender
      bindI18nStore: 'added removed' // Listen to store events
    },
    debug: process.env.NODE_ENV === 'development' // Enable debug in development
  });

// Force initial language detection
document.documentElement.lang = i18n.language;
console.log('i18n initialized with language:', i18n.language);

export default i18n;
