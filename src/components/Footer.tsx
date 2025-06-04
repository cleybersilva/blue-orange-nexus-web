
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
    <footer className="bg-navy text-white pt-12 lg:pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12 text-center sm:text-left">
          <FooterBrand />
          <FooterServices />
          <FooterLinks />
          <FooterContact />
        </div>

        <hr className="border-navy-light mb-4 lg:mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-400 text-xs lg:text-sm">
            © {new Date().getFullYear()} <span><span className="text-orange">{t('siteTitle.agency')}</span><span style={{ color: '#FFFFFF' }}>{t('siteTitle.digital')}</span></span><HubHighlight className="text-xs lg:text-sm" />. {t('footer.rights')}
          </p>
          <div className="flex gap-3 lg:gap-4">
            <Link to="/politica-privacidade" className="text-gray-400 hover:text-orange text-xs lg:text-sm transition-colors duration-300">{t('footer.privacy')}</Link>
            <Link to="/termos-uso" className="text-gray-400 hover:text-orange text-xs lg:text-sm transition-colors duration-300">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
