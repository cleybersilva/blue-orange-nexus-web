
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { useArticleBySlug } from '@/hooks/useBlogData';
import { format } from 'date-fns';

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticleBySlug(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange" />
              <p className="text-gray-600">Carregando artigo...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Artigo não encontrado</h1>
            <p className="text-gray-600 mb-6">O artigo que você está procurando não existe ou foi removido.</p>
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{article.title}</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {article.cover_image_url && (
              <img 
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                }}
              />
            )}
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="text-xl text-gray-600 mb-6">
                  {article.subtitle}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Por: {article.author?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{article.published_at ? format(new Date(article.published_at), 'dd MMM yyyy') : ''}</span>
                  </div>
                  <span>{article.read_time} min de leitura</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 size={16} className="mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-navy prose-a:text-orange prose-blockquote:border-orange prose-blockquote:bg-orange/5"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Author Info */}
          {article.author && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-start gap-4">
                {article.author.avatar_url && (
                  <img 
                    src={article.author.avatar_url}
                    alt={article.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">Sobre o autor</h3>
                  <p className="font-semibold text-gray-800 mb-2">{article.author.name}</p>
                  {article.author.bio && (
                    <p className="text-gray-600">{article.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation and CTA */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
            <Link to="/agendar">
              <Button className="bg-orange hover:bg-orange-dark text-white">
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
