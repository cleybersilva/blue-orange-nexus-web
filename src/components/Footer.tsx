
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FooterBrand from './footer/FooterBrand';
import FooterServices from './footer/FooterServices';
import FooterLinks from './footer/FooterLinks';
import FooterContact from './footer/FooterContact';
import HubHighlight from './ui/hub-highlight';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <FooterBrand />
          <FooterServices />
          <FooterLinks />
          <FooterContact />
        </div>

        <hr className="border-navy-light mb-6" />

        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span><span className="text-orange">Agência</span><span style={{ color: '#FFFFFF' }}>Digital</span></span><HubHighlight className="text-sm" />. {t('footer.rights')}
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
