
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PWAFuturo2025 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">O Futuro dos PWAs</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Progressive Web Apps"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                O Futuro dos PWAs: Progressive Web Apps em 2025
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Entenda como os Progressive Web Apps estão evoluindo e por que sua empresa deveria considerar essa tecnologia revolucionária.
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Autor: Cleyber Silva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>30 Out 2024</span>
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
              <h2 className="text-2xl font-bold text-navy mb-4">O Que São Progressive Web Apps</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                PWAs combinam o melhor dos mundos web e mobile, oferecendo experiências de app nativo através do navegador, com instalação opcional e funcionamento offline.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Vantagens dos PWAs</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2"><strong>Instalação Simplificada:</strong> Sem necessidade de app stores</li>
                <li className="mb-2"><strong>Funcionamento Offline:</strong> Service workers garantem operação sem internet</li>
                <li className="mb-2"><strong>Atualizações Automáticas:</strong> Sempre a versão mais recente</li>
                <li className="mb-2"><strong>Menor Custo:</strong> Uma única base de código para todas as plataformas</li>
              </ul>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 my-8">
                <p className="text-teal-800 italic">
                  "PWAs representam o futuro do desenvolvimento web, oferecendo experiências nativas sem as limitações das app stores."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-4">Casos de Sucesso</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Empresas como Twitter, Pinterest e Starbucks já adotaram PWAs com resultados impressionantes: aumento de engajamento, redução de bounce rate e maior conversão.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">O Futuro em 2025</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Com o avanço das APIs web e maior suporte dos navegadores, PWAs estão se tornando indistinguíveis de apps nativos, oferecendo acesso a câmera, GPS, notificações push e muito mais.
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
                Desenvolver Seu PWA
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
