
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t, i18n } = useTranslation();
  
  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Language changed in Index page:', i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <div id="services">
          <Services />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <ContactForm />
        </div>
      </main>
      <Footer />
      <FloatingSocialButtons />
    </div>
  );
};

export default Index;
