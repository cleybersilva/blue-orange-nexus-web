
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { useCalendly } from './CalendlyProvider';
import { useTranslation } from 'react-i18next';
import { useMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const { openCalendly } = useCalendly();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // Force re-render on language change
      console.log('Language changed in header:', i18n.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/sobre-nos' },
    { label: t('nav.services'), path: '/#services' },
    { label: t('nav.portfolio'), path: '/#portfolio' },
    { label: t('nav.testimonials'), path: '/#testimonials' },
    { label: t('nav.contact'), path: '/#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-lg md:text-xl font-bold text-white">
            {t('siteTitle')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, i) => (
            <Link 
              key={i}
              to={item.path}
              className={`px-3 py-2 text-sm text-white/90 hover:text-white transition-colors duration-300`}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="ml-4 flex items-center space-x-2">
            <LanguageSelector />
            <Button 
              className="btn-primary ml-2"
              onClick={openCalendly}
            >
              {t('nav.schedule')}
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center lg:hidden">
          <LanguageSelector />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 ml-2 text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="lg:hidden bg-navy shadow-lg">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item, i) => (
                <Link 
                  key={i}
                  to={item.path}
                  className="px-3 py-2 text-white/90 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                className="btn-primary mt-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  openCalendly();
                }}
              >
                {t('nav.schedule')}
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
