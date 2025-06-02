
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PWAFuturo2025 = () => {
  const { t, i18n } = useTranslation();
  
  // Force re-render on language change
  const [, setForceUpdate] = React.useState(0);
  
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">{t('nav.blog')}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{t('blog.articles.pwa.title')}</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt={t('blog.articles.pwa.title')}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                {t('blog.articles.pwa.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {t('blog.articles.pwa.subtitle')}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{t('blog.by')}: {t('blog.articles.pwa.author')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{t('blog.articles.pwa.date')}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-2" />
                  {t('blog.share')}
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-navy mb-4">{t('blog.articles.pwa.section1.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('blog.articles.pwa.section1.content')}
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">{t('blog.articles.pwa.section2.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('blog.articles.pwa.section2.content')}
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
                <p className="text-orange-800 italic">
                  "{t('blog.articles.pwa.quote')}"
                </p>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-4">{t('blog.articles.pwa.section3.title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('blog.articles.pwa.section3.content')}
              </p>
            </div>
          </div>

          {/* Navigation and CTA */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                {t('blog.backToBlog')}
              </Button>
            </Link>
            <Link to="/agendar">
              <Button className="bg-orange hover:bg-orange-dark text-white">
                {t('blog.articles.pwa.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PWAFuturo2025;
