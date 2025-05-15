
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
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'pt-BR'
  );

  // Initial setup
  useEffect(() => {
    // Set initial language
    i18n.changeLanguage(currentLanguage);
    
    // Set HTML language attribute for SEO and accessibility
    document.documentElement.lang = currentLanguage;
    
    // Force refresh all components that depend on translations
    window.dispatchEvent(new Event('languageChanged'));
    
    console.log('Language provider initialized with:', currentLanguage);
  }, [i18n, currentLanguage]);

  // Handle language change
  const changeLanguage = (lang: string) => {
    if (lang === currentLanguage) return;
    
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    // Update HTML language attribute
    document.documentElement.lang = lang;
    
    // Force refresh all components that depend on translations
    window.dispatchEvent(new Event('languageChanged'));
    
    console.log('Language changed to:', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
