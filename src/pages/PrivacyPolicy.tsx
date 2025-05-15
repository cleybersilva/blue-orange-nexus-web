
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <h1 className="heading-lg mb-8">{t('privacy.title')}</h1>
          
          <div className="prose max-w-none">
            <p className="mb-6">{t('privacy.lastUpdated')}: 15/05/2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.introduction.title')}</h2>
              <p>{t('privacy.introduction.p1')}</p>
              <p className="mt-4">{t('privacy.introduction.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.dataCollection.title')}</h2>
              <p>{t('privacy.dataCollection.p1')}</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>{t('privacy.dataCollection.items.personal')}</li>
                <li>{t('privacy.dataCollection.items.usage')}</li>
                <li>{t('privacy.dataCollection.items.technical')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.dataUse.title')}</h2>
              <p>{t('privacy.dataUse.p1')}</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>{t('privacy.dataUse.items.provide')}</li>
                <li>{t('privacy.dataUse.items.improve')}</li>
                <li>{t('privacy.dataUse.items.communicate')}</li>
                <li>{t('privacy.dataUse.items.security')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.cookies.title')}</h2>
              <p>{t('privacy.cookies.p1')}</p>
              <p className="mt-4">{t('privacy.cookies.p2')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.thirdParty.title')}</h2>
              <p>{t('privacy.thirdParty.p1')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.dataRetention.title')}</h2>
              <p>{t('privacy.dataRetention.p1')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.rights.title')}</h2>
              <p>{t('privacy.rights.p1')}</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>{t('privacy.rights.items.access')}</li>
                <li>{t('privacy.rights.items.rectification')}</li>
                <li>{t('privacy.rights.items.erasure')}</li>
                <li>{t('privacy.rights.items.restrict')}</li>
                <li>{t('privacy.rights.items.portability')}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.changes.title')}</h2>
              <p>{t('privacy.changes.p1')}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('privacy.contact.title')}</h2>
              <p>{t('privacy.contact.p1')}</p>
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

export default PrivacyPolicy;
