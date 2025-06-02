
import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { useNewsletter } from '@/hooks/useNewsletter';

const FooterContact: React.FC = () => {
  const [email, setEmail] = useState('');
  const { t, i18n } = useTranslation();
  const { subscribe, isLoading } = useNewsletter();

  // Get contact email based on language
  const getContactEmail = () => {
    return i18n.language === 'en' ? 'contact@agenciadigitalhub.com' : 'contato@agenciadigitalhub.com';
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await subscribe(email);
    if (success) {
      setEmail('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
      <ul className="space-y-4">
        <li className="flex items-start">
          <MapPin size={18} className="mr-2 mt-1 text-orange" />
          <span className="text-gray-300">{t('footer.address')}</span>
        </li>
        <li className="flex items-center">
          <Phone size={18} className="mr-2 text-orange" />
          <a href="tel:+5583988329018" className="text-gray-300 hover:text-orange">
            (83) 98832-9018
          </a>
        </li>
        <li className="flex items-center">
          <Mail size={18} className="mr-2 text-orange" />
          <a href={`mailto:${getContactEmail()}`} className="text-gray-300 hover:text-orange">
            {getContactEmail()}
          </a>
        </li>
      </ul>
      
      <div className="mt-6">
        <p className="text-gray-300 mb-4">
          {t('footer.newsletterText')}
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <Input
            placeholder={t('footer.placeholder')}
            className="bg-navy-light border-navy-light focus:border-orange"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-orange hover:bg-orange-dark w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : t('footer.subscribe')} <Mail size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FooterContact;
