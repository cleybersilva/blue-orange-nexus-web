
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

  useEffect(() => {
    // Set initial language
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
