
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { useBlogArticles } from '@/hooks/useBlogData';
import { format } from 'date-fns';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { data: articles, isLoading, error } = useBlogArticles();

  const categories = [
    'Todos',
    'Inteligência Artificial',
    'Marketing Digital',
    'UX/UI Design',
    'Tecnologia',
    'Cases de Sucesso',
    'Automação'
  ];

  const filteredArticles = selectedCategory === 'Todos' 
    ? articles || []
    : articles?.filter(article => article.category === selectedCategory) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange" />
              <p className="text-gray-600">Carregando artigos...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <div className="text-center">
              <p className="text-red-600">Erro ao carregar artigos. Tente novamente mais tarde.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-6">Blog AgênciaDigital</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights sobre tecnologia, marketing digital, IA e tendências que moldam o futuro dos negócios digitais.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? 'bg-orange hover:bg-orange-dark text-white' 
                    : 'hover:bg-orange hover:text-white'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.cover_image_url || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-orange/10 text-orange px-2 py-1 rounded-full text-xs font-medium">
                      <Tag size={12} className="inline mr-1" />
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">{article.read_time} min de leitura</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-navy group-hover:text-orange transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>Por: {article.author?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{article.published_at ? format(new Date(article.published_at), 'dd MMM yyyy') : ''}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${article.slug}`}>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-orange group-hover:text-white group-hover:border-orange transition-all duration-300"
                    >
                      Ler Artigo Completo
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum artigo encontrado nesta categoria.</p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="bg-navy rounded-2xl p-12 mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Fique por Dentro das Novidades
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Receba insights exclusivos sobre tecnologia, IA e marketing digital diretamente em seu e-mail.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-orange"
              />
              <Button className="bg-orange hover:bg-orange-dark text-white px-6">
                Assinar
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
