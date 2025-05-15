
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Ensure translations update when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language changed in NotFound page:", i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
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
