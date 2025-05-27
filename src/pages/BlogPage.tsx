
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Inteligência Artificial',
    'Marketing Digital',
    'UX/UI Design',
    'Tecnologia',
    'Cases de Sucesso',
    'Automação'
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Como a IA está Revolucionando o Marketing Digital em 2025",
      summary: "Descubra as principais tendências e ferramentas de inteligência artificial que estão transformando as estratégias de marketing digital.",
      category: "Inteligência Artificial",
      date: "15 Nov 2024",
      author: "Cleyber Silva",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "5 min",
      link: "/blog/ia-no-marketing-digital-2025"
    },
    {
      id: 2,
      title: "Tendências de UX/UI Design para 2025: O Futuro da Experiência Digital",
      summary: "Explore as principais tendências visuais e de usabilidade que definirão o design digital no próximo ano.",
      category: "UX/UI Design",
      date: "12 Nov 2024",
      author: "Cleyber Silva",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "7 min",
      link: "/blog/tendencias-ux-ui-2025"
    },
    {
      id: 3,
      title: "Case de Sucesso: E-commerce com IA Aumenta Vendas em 300%",
      summary: "Como implementamos soluções de inteligência artificial em um e-commerce e alcançamos resultados extraordinários.",
      category: "Cases de Sucesso",
      date: "08 Nov 2024",
      author: "Cleyber Silva",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "6 min",
      link: "/blog/case-ecommerce-ia-vendas"
    },
    {
      id: 4,
      title: "Automação com Chatbots: Como Otimizar o Atendimento ao Cliente",
      summary: "Aprenda a implementar assistentes virtuais inteligentes para melhorar a experiência do cliente e reduzir custos.",
      category: "Automação",
      date: "05 Nov 2024",
      author: "Cleyber Silva",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "4 min",
      link: "/blog/chatbots-automacao-atendimento"
    },
    {
      id: 5,
      title: "Marketing Digital Data-Driven: Estratégias Baseadas em Dados",
      summary: "Como utilizar análise de dados e machine learning para criar campanhas de marketing mais eficazes.",
      category: "Marketing Digital",
      date: "02 Nov 2024",
      author: "Cleyber Silva",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "8 min",
      link: "/blog/marketing-digital-data-driven"
    },
    {
      id: 6,
      title: "O Futuro dos PWAs: Progressive Web Apps em 2025",
      summary: "Entenda como os Progressive Web Apps estão evoluindo e por que sua empresa deveria considerar essa tecnologia.",
      category: "Tecnologia",
      date: "30 Out 2024",
      author: "Cleyber Silva",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      readTime: "6 min",
      link: "/blog/pwa-futuro-2025"
    }
  ];

  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
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
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.readTime} de leitura</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-navy group-hover:text-orange transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>Autor: {post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <Link to={post.link}>
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
