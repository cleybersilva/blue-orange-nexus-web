
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Mic, 
  MessageCircle, 
  Zap, 
  Shield, 
  Layers, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AppsPage = () => {
  const features = [
    {
      icon: <Smartphone size={24} />,
      title: "Apps Nativos e Híbridos",
      description: "Desenvolvimento para Android e iOS com performance nativa e experiência otimizada para cada plataforma."
    },
    {
      icon: <Mic size={24} />,
      title: "Comandos por Voz",
      description: "Integração com assistentes de voz e comandos por fala para interação mais natural e acessível."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Chatbots Integrados",
      description: "IA conversacional integrada para atendimento 24/7 e suporte automático aos usuários."
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Otimizada",
      description: "Apps rápidos e responsivos com otimização de memória, bateria e experiência fluida."
    },
    {
      icon: <Shield size={24} />,
      title: "Segurança Avançada",
      description: "Criptografia end-to-end, autenticação biométrica e proteção de dados sensíveis."
    },
    {
      icon: <Layers size={24} />,
      title: "Prototipação com IA",
      description: "Desenvolvimento acelerado com prototipação assistida por IA para validação rápida de MVPs."
    }
  ];

  const benefits = [
    "Design personalizado para Android e iOS",
    "Integração com APIs e serviços externos",
    "Push notifications inteligentes",
    "Analytics e métricas de uso detalhadas",
    "Publicação nas lojas oficiais (Google Play/App Store)",
    "Atualizações automáticas e manutenção",
    "Testes em dispositivos reais",
    "Suporte pós-lançamento completo"
  ];

  const process = [
    {
      step: "01",
      title: "Conceito & Prototipação",
      description: "Definição do conceito, wireframes e prototipação interativa com validação de UX."
    },
    {
      step: "02", 
      title: "Design & Interface",
      description: "Criação da identidade visual e interfaces otimizadas para cada plataforma."
    },
    {
      step: "03",
      title: "Desenvolvimento",
      description: "Codificação nativa/híbrida com integração de APIs e funcionalidades avançadas."
    },
    {
      step: "04",
      title: "Testes & Publicação",
      description: "Testes rigorosos, correções e publicação nas lojas oficiais."
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
            <span className="text-gray-600">Aplicativos Móveis</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                Apps Móveis com <span className="text-orange">IA Integrada</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Desenvolvemos aplicativos nativos e híbridos com comandos por voz, chatbots inteligentes 
                e prototipação acelerada por IA. Transforme sua ideia em app de sucesso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Orçamento
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Apps Criados
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Mobile App Development"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Download className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+50 Apps Publicados</p>
                    <p className="text-sm text-gray-600">Com 4.8★ de avaliação média</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Funcionalidades Avançadas com IA
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Criamos apps modernos com as mais avançadas tecnologias de inteligência artificial.
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
                Nosso Processo de Desenvolvimento
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Metodologia ágil que garante apps de qualidade em tempo recorde.
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
                  Vantagens dos Nossos Apps
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
                <h3 className="text-2xl font-bold mb-4">Estatísticas de Sucesso</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-orange">4.8★</div>
                    <p className="text-gray-300">Avaliação média nas lojas</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">90%</div>
                    <p className="text-gray-300">Apps aprovados na primeira tentativa</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">30%</div>
                    <p className="text-gray-300">Mais rápido com IA</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Criar Seu App?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Transforme sua ideia em um aplicativo de sucesso com nossa equipe especializada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Agendar Consultoria Gratuita
                </Button>
              </Link>
              <Link to="/servicos">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange px-8 py-3 bg-transparent">
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

export default AppsPage;
