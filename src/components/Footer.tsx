import React, { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  ChevronRight,
  MapPin,
  Mail
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCalendly } from '@/components/CalendlyProvider';
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { openCalendly } = useCalendly();
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast({
        variant: "destructive",
        title: t('footer.error'),
        description: t('footer.emailInvalid'),
      });
      return;
    }
    
    // Simulate subscription success
    toast({
      title: t('footer.success'),
      description: t('footer.subscribed'),
    });
    setEmail('');
    console.log("Newsletter subscription:", email);
  };

  return (
    <footer className="bg-navy text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-orange">{t('siteTitle.agency')}</span>
              <span className="text-white">Digital</span>
            </h2>
            <p className="text-gray-300 mb-6">
              {t('footer.aboutText')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('services.title')}</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('services.websites.title')}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('services.ecommerce.title')}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('services.apps.title')}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('services.marketing.title')}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('services.design.title')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.links')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sobre-nos" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <a 
                  href="#portfolio" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('portfolio');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('nav.portfolio')}
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('testimonials');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('nav.testimonials')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    openCalendly();
                  }}
                  className="text-gray-300 hover:text-orange transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2" /> 
                  {t('nav.schedule')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-orange" />
                <span className="text-gray-300">{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <Facebook size={18} className="mr-2 text-orange" />
                <a href="tel:+5583988329018" className="text-gray-300 hover:text-orange">
                  (83) 98832-9018
                </a>
              </li>
              <li className="flex items-center">
                <Instagram size={18} className="mr-2 text-orange" />
                <a href="mailto:contact@agenciadigital.com" className="text-gray-300 hover:text-orange">
                  contact@agenciadigital.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <p className="text-gray-300 mb-4">
                {t('footer.newsletter')}
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  placeholder={t('footer.emailPlaceholder')}
                  className="bg-navy-light border-navy-light focus:border-orange"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-orange hover:bg-orange-dark w-full flex items-center justify-center gap-2"
                >
                  {t('footer.subscribe')} <Mail size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <hr className="border-navy-light mb-6" />

        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-orange">{t('siteTitle.agency')}</span><span className="text-white">Digital</span>. {t('footer.rights')}
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/politica-privacidade" className="text-gray-400 hover:text-orange text-sm">{t('footer.privacy')}</Link>
            <Link to="/termos-uso" className="text-gray-400 hover:text-orange text-sm">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
