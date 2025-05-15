
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'pt-BR',
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Initial setup
  useEffect(() => {
    // Ensure language is set from i18n, not directly from localStorage
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }
    
    // Update state with current language
    setCurrentLanguage(i18n.language);
    
    // Set HTML language attribute for SEO and accessibility
    document.documentElement.lang = i18n.language;
    
    console.log('Language provider initialized with:', i18n.language);
  }, []);

  // Listen for language changes from i18n itself
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log('Language changed via i18n event:', lng);
      setCurrentLanguage(lng);
      document.documentElement.lang = lng;
      
      // Dispatch global event to force component updates
      window.dispatchEvent(new Event('languageChanged'));
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Handle language change
  const changeLanguage = (lang: string) => {
    if (lang === currentLanguage) return;
    
    console.log('Changing language to:', lang);
    i18n.changeLanguage(lang).then(() => {
      setCurrentLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
      document.documentElement.lang = lang;
      
      // Dispatch global event to force component updates
      window.dispatchEvent(new Event('languageChanged'));
    });
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
