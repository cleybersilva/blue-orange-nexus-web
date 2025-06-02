
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HubHighlight from '../ui/hub-highlight';

const FooterBrand: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span><span className="text-orange">Agência</span><span style={{ color: '#FFFFFF' }}>Digital</span></span>
        <HubHighlight />
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
  );
};

export default FooterBrand;
