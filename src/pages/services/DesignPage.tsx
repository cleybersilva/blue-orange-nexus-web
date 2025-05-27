
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Palette, 
  Smartphone, 
  Monitor, 
  Eye, 
  Layers, 
  Zap, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DesignPage = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Prototipação Rápida IA",
      description: "Criação de protótipos interativos em tempo recorde com feedback automático de usabilidade."
    },
    {
      icon: <Eye size={24} />,
      title: "Estudos de Usabilidade",
      description: "Análise comportamental e testes A/B para otimizar a experiência do usuário."
    },
    {
      icon: <Layers size={24} />,
      title: "Design System",
      description: "Sistemas de design escaláveis com componentes reutilizáveis e guidelines completos."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile-First",
      description: "Designs pensados primeiramente para mobile com responsividade perfeita."
    },
    {
      icon: <Monitor size={24} />,
      title: "Microinterações",
      description: "Animações leves e microinterações que tornam a experiência mais envolvente."
    },
    {
      icon: <Palette size={24} />,
      title: "Tendências Visuais",
      description: "Aplicação de glassmorphism, dark mode e outras tendências modernas de design."
    }
  ];

  const benefits = [
    "Pesquisa e análise de usuários",
    "Wireframes e arquitetura de informação",
    "Design visual moderno e atrativo",
    "Protótipos interativos de alta fidelidade",
    "Testes de usabilidade e acessibilidade",
    "Design system completo e escalável",
    "Handoff detalhado para desenvolvimento",
    "Suporte contínuo pós-lançamento"
  ];

  const process = [
    {
      step: "01",
      title: "Research & Discovery",
      description: "Pesquisa de usuários, análise de concorrência e definição de requisitos."
    },
    {
      step: "02", 
      title: "Ideação & Wireframes",
      description: "Criação de wireframes, fluxos de usuário e arquitetura de informação."
    },
    {
      step: "03",
      title: "Design Visual",
      description: "Desenvolvimento da identidade visual e interfaces de alta fidelidade."
    },
    {
      step: "04",
      title: "Testes & Entrega",
      description: "Testes de usabilidade, ajustes finais e entrega para desenvolvimento."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/servicos" className="text-orange hover:underline">Serviços</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Design UI/UX</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                Design UI/UX com <span className="text-orange">IA Generativa</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Criamos experiências digitais extraordinárias com prototipação rápida, estudos de usabilidade 
                e design systems modernos. Transforme ideias em interfaces que encantam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Proposta
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Portfolio Design
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="UI/UX Design"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Sparkles className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+100 Interfaces</p>
                    <p className="text-sm text-gray-600">Premiadas por usabilidade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Design Moderno com Foco na Experiência
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Combinamos criatividade, usabilidade e tecnologia para criar designs que convertem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-orange">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-navy">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-20 bg-white rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Nosso Processo de Design Centrado no Usuário
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Metodologia comprovada que garante designs funcionais e esteticamente impecáveis.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-navy">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  {index < process.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-8 -right-4 text-gray-300" size={24} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6">
                  O que Entregamos em Cada Projeto
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-orange mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-navy rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Impacto dos Nossos Designs</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-orange">40%</div>
                    <p className="text-gray-300">Aumento na conversão</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">60%</div>
                    <p className="text-gray-300">Redução na taxa de rejeição</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">98%</div>
                    <p className="text-gray-300">Satisfação dos usuários</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para um Design Excepcional?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Transforme sua visão em uma experiência digital que seus usuários vão amar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Começar Projeto
                </Button>
              </Link>
              <Link to="/servicos">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange px-8 py-3">
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar aos Serviços
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DesignPage;
