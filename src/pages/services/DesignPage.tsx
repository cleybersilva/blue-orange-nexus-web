
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DesignHero from '@/components/services/design/DesignHero';
import DesignFeatures from '@/components/services/design/DesignFeatures';
import DesignProcess from '@/components/services/design/DesignProcess';
import DesignBenefits from '@/components/services/design/DesignBenefits';
import DesignCTA from '@/components/services/design/DesignCTA';

const DesignPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/servicos" className="text-orange hover:underline">{t('nav.services')}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{t('services.design.title')}</span>
          </div>

          <DesignHero />
          <DesignFeatures />
          <DesignProcess />
          <DesignBenefits />
          <DesignCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DesignPage;
