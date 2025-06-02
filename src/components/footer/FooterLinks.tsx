
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCalendly } from '../CalendlyProvider';
import { useTranslation } from 'react-i18next';

const FooterLinks: React.FC = () => {
  const { openCalendly } = useCalendly();
  const { t } = useTranslation();

  return (
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
          <Link to="/projetos" className="text-gray-300 hover:text-orange transition-colors flex items-center">
            <ChevronRight size={16} className="mr-2" /> 
            {t('nav.portfolio')}
          </Link>
        </li>
        <li>
          <Link to="/blog" className="text-gray-300 hover:text-orange transition-colors flex items-center">
            <ChevronRight size={16} className="mr-2" /> 
            {t('nav.blog')}
          </Link>
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
        <li>
          <Link 
            to="/admin/login" 
            className="text-gray-300 hover:text-orange transition-colors flex items-center"
          >
            <ChevronRight size={16} className="mr-2" /> 
            Painel Administrativo
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterLinks;
