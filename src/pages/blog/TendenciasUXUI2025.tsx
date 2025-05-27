
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TendenciasUXUI2025 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Tendências de UX/UI Design para 2025</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="UX/UI Design Trends"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Tendências de UX/UI Design para 2025: O Futuro da Experiência Digital
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                As principais tendências em design de interface e experiência do usuário, como microinterações inteligentes, acessibilidade com IA, dark mode adaptativo e design emocional.
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Autor: Cleyber Silva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>12 Nov 2024</span>
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
              <h2 className="text-2xl font-bold text-navy mb-4">A Evolução do Design Digital</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                O design de interfaces está passando por uma transformação radical. Em 2025, vemos a convergência entre tecnologia, psicologia e arte criando experiências digitais mais humanas e intuitivas do que nunca.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Microinterações Inteligentes</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                As microinterações não são mais apenas elementos decorativos. Elas se tornaram parte integral da comunicação entre usuário e interface, fornecendo feedback instantâneo e guiando o comportamento do usuário de forma sutil mas eficaz.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Acessibilidade com IA</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A inteligência artificial está revolucionando a acessibilidade digital, com recursos como descrição automática de imagens, adaptação dinâmica de contrastes e navegação assistida por voz.
              </p>

              <div className="bg-orange/10 border-l-4 border-orange p-6 my-8">
                <p className="text-gray-800 italic">
                  "O futuro do design não está apenas em como as coisas parecem, mas em como elas fazem as pessoas se sentirem."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-4">Dark Mode Adaptativo</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Além do dark mode tradicional, estamos vendo a evolução para temas adaptativos que mudam automaticamente baseados na hora do dia, localização e até mesmo no humor do usuário detectado através de padrões de uso.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Design Emocional</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                O design emocional usa cores, formas e animações para evocar sentimentos específicos, criando conexões mais profundas entre marcas e usuários.
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
                Criar Seu Design Inovador
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TendenciasUXUI2025;
