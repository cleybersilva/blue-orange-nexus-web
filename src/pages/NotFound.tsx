
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  // State to force re-render on language change
  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Enhanced language change handling
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language changed in NotFound page:", i18n.language);
      // Force re-render
      setForceUpdate(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">{t("notFound.message")}</p>
          <Link 
            to="/" 
            className="bg-orange hover:bg-orange-dark text-white py-2 px-6 rounded-md transition-colors duration-300"
          >
            {t("notFound.returnHome")}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
