
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const IAMarketingDigital2025 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Como a IA Está Revolucionando o Marketing Digital em 2025</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="IA no Marketing Digital"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Como a IA Está Revolucionando o Marketing Digital em 2025
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Uma análise das principais ferramentas de IA aplicadas em tráfego pago, copywriting, automação de campanhas e análise de comportamento do consumidor.
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Autor: Cleyber Silva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>15 Nov 2024</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-navy mb-4">O Cenário Atual da IA no Marketing</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A inteligência artificial deixou de ser um conceito futurista para se tornar uma realidade presente no dia a dia das estratégias de marketing digital. Em 2025, observamos uma transformação sem precedentes na forma como as empresas se relacionam com seus clientes.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Principais Ferramentas de IA para Marketing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As ferramentas de IA estão revolucionando diferentes aspectos do marketing digital:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2"><strong>Copywriting Automatizado:</strong> Ferramentas como ChatGPT e Jasper estão criando conteúdos personalizados em escala</li>
                <li className="mb-2"><strong>Análise Preditiva:</strong> Algoritmos que preveem comportamentos de compra com precisão superior a 85%</li>
                <li className="mb-2"><strong>Segmentação Inteligente:</strong> Criação automática de personas baseada em dados comportamentais</li>
                <li className="mb-2"><strong>Otimização de Campanhas:</strong> Ajustes em tempo real de lances e direcionamentos</li>
              </ul>

              <div className="bg-orange/10 border-l-4 border-orange p-6 my-8">
                <p className="text-gray-800 italic">
                  "A IA não substitui a criatividade humana, mas potencializa sua eficiência e precisão, permitindo que os profissionais de marketing foquem na estratégia enquanto a tecnologia cuida da execução."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-4">Automação de Campanhas com IA</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A automação inteligente permite que as campanhas se adaptem em tempo real aos comportamentos dos usuários. Isso inclui ajustes automáticos de orçamento, criação de variações de anúncios e otimização de horários de exibição baseados em dados históricos e preditivos.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Análise de Comportamento do Consumidor</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Com ferramentas de machine learning, é possível analisar padrões de comportamento complexos, identificar momentos de maior propensão à compra e personalizar a jornada do cliente de forma única para cada usuário.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">O Futuro do Marketing com IA</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Estamos caminhando para um futuro onde a IA será capaz de criar estratégias de marketing completas, desde a concepção até a execução e análise de resultados. A chave será encontrar o equilíbrio entre automação e toque humano.
              </p>
            </div>
          </div>

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
                Implementar IA no Seu Marketing
              </Button>
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-navy mb-8">Artigos Relacionados</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/blog/tendencias-ux-ui-2025" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="UX/UI Trends"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-navy group-hover:text-orange transition-colors">
                      Tendências de UX/UI Design para 2025
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">O futuro da experiência digital</p>
                  </div>
                </div>
              </Link>
              <Link to="/blog/marketing-digital-data-driven" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Data-Driven Marketing"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-navy group-hover:text-orange transition-colors">
                      Marketing Digital Data-Driven
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">Estratégias baseadas em dados</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IAMarketingDigital2025;
