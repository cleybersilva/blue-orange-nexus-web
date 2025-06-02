
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FooterServices: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">{t('services.title')}</h3>
      <ul className="space-y-3">
        <li>
          <Link 
            to="/servicos"
            className="text-gray-300 hover:text-orange transition-colors flex items-center"
          >
            <ChevronRight size={16} className="mr-2" /> 
            {t('services.websites.title')}
          </Link>
        </li>
        <li>
          <Link 
            to="/servicos"
            className="text-gray-300 hover:text-orange transition-colors flex items-center"
          >
            <ChevronRight size={16} className="mr-2" /> 
            {t('services.ecommerce.title')}
          </Link>
        </li>
        <li>
          <Link 
            to="/servicos"
            className="text-gray-300 hover:text-orange transition-colors flex items-center"
          >
            <ChevronRight size={16} className="mr-2" /> 
            {t('services.apps.title')}
          </Link>
        </li>
        <li>
          <Link 
            to="/servicos"
            className="text-gray-300 hover:text-orange transition-colors flex items-center"
          >
            <ChevronRight size={16} className="mr-2" /> 
            {t('services.marketing.title')}
          </Link>
        </li>
        <li>
          <Link 
            to="/servicos"
            className="text-gray-300 hover:text-orange transition-colors flex items-center"
          >
            <ChevronRight size={16} className="mr-2" /> 
            {t('services.design.title')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterServices;
