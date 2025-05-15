
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCalendly } from '@/components/CalendlyProvider';
import { toast } from "@/components/ui/use-toast";
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCalendly } = useCalendly();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/sobre-nos' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.portfolio'), href: '/#portfolio' },
    { name: t('nav.testimonials'), href: '/#testimonials' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const handleCalendlyOpen = () => {
    openCalendly();
    console.log("Calendly opened from header");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-navy shadow-lg py-2' : 'bg-navy py-4'
    }`}>
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold text-2xl">
            <span className="text-orange">Agência</span>Digital
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className="text-white hover:text-orange transition-colors duration-300"
              onClick={(e) => {
                if (item.href.startsWith('/#')) {
                  e.preventDefault();
                  const sectionId = item.href.substring(2);
                  const section = document.getElementById(sectionId);
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              {item.name}
            </Link>
          ))}
          <Button 
            className="bg-orange hover:bg-orange-dark flex items-center gap-2"
            onClick={handleCalendlyOpen}
          >
            {t('nav.schedule')} <Calendar size={16} />
          </Button>
          <LanguageSelector />
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:text-orange"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <LanguageSelector />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-dark">
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-orange py-2 transition-colors duration-300"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  if (item.href.startsWith('/#')) {
                    e.preventDefault();
                    const sectionId = item.href.substring(2);
                    const section = document.getElementById(sectionId);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              className="bg-orange hover:bg-orange-dark w-full flex items-center justify-center gap-2"
              onClick={() => {
                setIsMenuOpen(false);
                handleCalendlyOpen();
              }}
            >
              {t('nav.schedule')} <Calendar size={16} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
