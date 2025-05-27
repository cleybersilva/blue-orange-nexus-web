
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Vote, 
  MessageSquare, 
  BarChart4, 
  MapPin, 
  Heart, 
  Users, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PoliticalPage = () => {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Captação de Leads IA",
      description: "Plataformas inteligentes para captação e conversão de eleitores com segmentação avançada."
    },
    {
      icon: <Heart size={24} />,
      title: "Análise de Sentimento",
      description: "Monitoramento em tempo real do humor do eleitorado nas redes sociais e mídia."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Assistentes Virtuais",
      description: "Chatbots multicanal (WhatsApp, Telegram, site) para resposta automática 24/7."
    },
    {
      icon: <BarChart4 size={24} />,
      title: "CRM Eleitoral",
      description: "Gestão completa de contatos, histórico de interações e segmentação de eleitores."
    },
    {
      icon: <MapPin size={24} />,
      title: "Métricas por Localidade",
      description: "Dashboards com dados de engajamento e performance por região e demografia."
    },
    {
      icon: <Vote size={24} />,
      title: "Estratégias Digitais",
      description: "Campanhas otimizadas para cada fase eleitoral com conteúdo personalizado."
    }
  ];

  const benefits = [
    "Plataforma de captação de leads e doações",
    "Monitoramento de redes sociais e menções",
    "CRM eleitoral com segmentação inteligente",
    "Chatbots para atendimento automatizado",
    "Landing pages para campanhas específicas",
    "Análise de concorrência política",
    "Relatórios de performance em tempo real",
    "Consultoria estratégica especializada"
  ];

  const process = [
    {
      step: "01",
      title: "Diagnóstico Político",
      description: "Análise do cenário político, concorrência e definição de estratégia digital."
    },
    {
      step: "02", 
      title: "Plataforma Digital",
      description: "Desenvolvimento de site, CRM e ferramentas de captação personalizadas."
    },
    {
      step: "03",
      title: "Automação IA",
      description: "Implementação de chatbots e sistemas de análise de sentimento."
    },
    {
      step: "04",
      title: "Acompanhamento",
      description: "Monitoramento contínuo, otimizações e relatórios estratégicos."
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
            <span className="text-gray-600">Campanhas Políticas</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                Campanhas Políticas com <span className="text-orange">IA Estratégica</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Soluções completas para campanhas eleitorais com IA de análise de sentimento, 
                assistentes virtuais e CRM eleitoral. Conecte-se com seus eleitores 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Consultoria
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Cases Políticos
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Political Campaign"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Crown className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+30 Campanhas</p>
                    <p className="text-sm text-gray-600">Vitoriosas com nossa IA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Tecnologia Política de Ponta
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ferramentas inteligentes para conectar candidatos e eleitores de forma eficiente.
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
                Como Digitalizamos Sua Campanha
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Processo estratégico especializado em campanhas políticas vencedoras.
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
                  Soluções Completas para Sua Campanha
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
                <h3 className="text-2xl font-bold mb-4">Resultados Eleitorais</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-orange">80%</div>
                    <p className="text-gray-300">Taxa de vitória dos clientes</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">+500%</div>
                    <p className="text-gray-300">Aumento no engajamento</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">24/7</div>
                    <p className="text-gray-300">Atendimento automatizado</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Vencer as Eleições?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Transforme sua campanha com nossa tecnologia política especializada e IA estratégica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Agendar Consultoria Estratégica
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

export default PoliticalPage;
