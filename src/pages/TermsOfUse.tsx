
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const TermsOfUse = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <h1 className="heading-lg mb-8">{t('terms.title')}</h1>
          
          <div className="prose max-w-none">
            <p className="mb-6">{t('terms.lastUpdated')}: 15/05/2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.introduction.title')}</h2>
              <p>{t('terms.introduction.p1')}</p>
              <p className="mt-4">{t('terms.introduction.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.use.title')}</h2>
              <p>{t('terms.use.p1')}</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>{t('terms.use.items.license')}</li>
                <li>{t('terms.use.items.restrictions')}</li>
                <li>{t('terms.use.items.modifications')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.content.title')}</h2>
              <p>{t('terms.content.p1')}</p>
              <p className="mt-4">{t('terms.content.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.accounts.title')}</h2>
              <p>{t('terms.accounts.p1')}</p>
              <p className="mt-4">{t('terms.accounts.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.intellectual.title')}</h2>
              <p>{t('terms.intellectual.p1')}</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>{t('terms.intellectual.items.copyright')}</li>
                <li>{t('terms.intellectual.items.trademarks')}</li>
                <li>{t('terms.intellectual.items.use')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.userContent.title')}</h2>
              <p>{t('terms.userContent.p1')}</p>
              <p className="mt-4">{t('terms.userContent.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.privacy.title')}</h2>
              <p>
                {t('terms.privacy.p1')} 
                <a href="/politica-privacidade" className="text-orange hover:underline">
                  {t('terms.privacy.link')}
                </a>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.termination.title')}</h2>
              <p>{t('terms.termination.p1')}</p>
              <p className="mt-4">{t('terms.termination.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.liability.title')}</h2>
              <p>{t('terms.liability.p1')}</p>
              <p className="mt-4">{t('terms.liability.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.changes.title')}</h2>
              <p>{t('terms.changes.p1')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('terms.contact.title')}</h2>
              <p>{t('terms.contact.p1')}</p>
              <p className="mt-2">
                Email: <a href="mailto:contact@agenciadigital.com" className="text-orange hover:underline">
                  contact@agenciadigital.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
