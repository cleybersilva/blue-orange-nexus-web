
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, FileText } from 'lucide-react';

const TermsOfUse = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4 text-foreground">{t('terms.title')}</h1>
            <p className="text-muted-foreground">
              {t('terms.lastUpdated')}: 15 de dezembro de 2024
            </p>
          </div>
          
          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-foreground">
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.introduction.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('terms.introduction.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('terms.introduction.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.use.title')}
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">{t('terms.use.p1')}</p>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('terms.use.items.license')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('terms.use.items.restrictions')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('terms.use.items.modifications')}</span>
                  </li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.content.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('terms.content.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('terms.content.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.accounts.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('terms.accounts.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('terms.accounts.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.intellectual.title')}
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">{t('terms.intellectual.p1')}</p>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('terms.intellectual.items.copyright')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('terms.intellectual.items.trademarks')}</span>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-foreground">{t('terms.intellectual.items.use')}</span>
                  </li>
                </ul>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.userContent.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('terms.userContent.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('terms.userContent.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.privacy.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('terms.privacy.p1')} 
                  <Link to="/politica-privacidade" className="text-primary hover:text-primary/80 transition-colors underline">
                    {t('terms.privacy.link')}
                  </Link>.
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.termination.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('terms.termination.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('terms.termination.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.liability.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('terms.liability.p1')}</p>
                <p className="text-muted-foreground leading-relaxed">{t('terms.liability.p2')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.changes.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('terms.changes.p1')}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary pb-2">
                  {t('terms.contact.title')}
                </h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">{t('terms.contact.p1')}</p>
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
                        Conheça nossa Política de Privacidade para entender como tratamos seus dados.
                      </p>
                      <Link 
                        to="/politica-privacidade" 
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Política de Privacidade
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

export default TermsOfUse;
