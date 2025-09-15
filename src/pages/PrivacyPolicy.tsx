
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4 text-foreground">{t('privacy.title')}</h1>
            <p className="text-muted-foreground">
              {t('privacy.lastUpdated')}: 15 de dezembro de 2024
            </p>
          </div>
          
          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-foreground">
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.introduction.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('privacy.introduction.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('privacy.introduction.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.dataCollection.title')}
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">{t('privacy.dataCollection.p1')}</p>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.dataCollection.items.personal')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.dataCollection.items.usage')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.dataCollection.items.technical')}</span>
                  </li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.dataUse.title')}
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">{t('privacy.dataUse.p1')}</p>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.dataUse.items.provide')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.dataUse.items.improve')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.dataUse.items.communicate')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.dataUse.items.security')}</span>
                  </li>
                </ul>
              </section>
              
              <section className="mb-10" id="cookies">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.cookies.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('privacy.cookies.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('privacy.cookies.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.thirdParty.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('privacy.thirdParty.p1')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.dataRetention.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('privacy.dataRetention.p1')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.rights.title')}
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">{t('privacy.rights.p1')}</p>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.rights.items.access')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.rights.items.rectification')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.rights.items.erasure')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.rights.items.restrict')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('privacy.rights.items.portability')}</span>
                  </li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.changes.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('privacy.changes.p1')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('privacy.contact.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('privacy.contact.p1')}</p>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-foreground">
                    Email: <a href="mailto:contact@agenciadigital.com" className="text-primary hover:text-primary/80 transition-colors">
                      contact@agenciadigital.com
                    </a>
                  </p>
                </div>
              </section>
              
              {/* Cross-reference */}
              <Card className="mt-12">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">Leia também</h3>
                      <p className="text-muted-foreground mb-4">
                        Conheça também nossos Termos de Uso para compreender completamente nossas políticas.
                      </p>
                      <Link 
                        to="/termos-uso" 
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Termos de Uso
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
