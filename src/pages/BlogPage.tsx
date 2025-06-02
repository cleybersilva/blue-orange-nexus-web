
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
  const { t } = useTranslation();
  
  const articles = [
    {
      id: 1,
      title: t('blog.articles.chatbots.title'),
      subtitle: t('blog.articles.chatbots.subtitle'),
      author: t('blog.articles.chatbots.author'),
      date: t('blog.articles.chatbots.date'),
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: t('blog.categories.automation'),
      readTime: "8",
      link: "/blog/chatbots-automacao"
    },
    {
      id: 2,
      title: t('blog.articles.pwa.title'),
      subtitle: t('blog.articles.pwa.subtitle'),
      author: t('blog.articles.pwa.author'),
      date: t('blog.articles.pwa.date'),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: t('blog.categories.technology'),
      readTime: "6",
      link: "/blog/pwa-futuro-2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-6">{t('blog.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={article.link}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span>{article.readTime} {t('blog.readTime')}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-navy mb-3 group-hover:text-orange transition-colors duration-300">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {article.subtitle}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{t('blog.by')}: {article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-orange font-medium group-hover:gap-2 transition-all duration-300">
                      {t('blog.readFull')}
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-navy rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('blog.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('blog.newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange"
              />
              <Button className="bg-orange hover:bg-orange-dark text-white px-8">
                {t('blog.newsletter.subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
