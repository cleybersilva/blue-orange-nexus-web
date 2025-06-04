
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LMSHero from '@/components/services/lms/LMSHero';
import LMSFeatures from '@/components/services/lms/LMSFeatures';
import LMSProcess from '@/components/services/lms/LMSProcess';
import LMSBenefits from '@/components/services/lms/LMSBenefits';
import LMSCTA from '@/components/services/lms/LMSCTA';

const LMSPage = () => {
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
            <span className="text-gray-600">{t('services.lms.title')}</span>
          </div>

          <LMSHero />
          <LMSFeatures />
          <LMSProcess />
          <LMSBenefits />
          <LMSCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LMSPage;
