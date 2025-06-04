import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  PenTool, 
  BarChart3, 
  Image, 
  MessageCircle, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  ThumbsUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialMediaPage = () => {
  const features = [
    {
      icon: <Calendar size={24} />,
      title: "Agendamento Inteligente",
      description: "IA identifica os melhores horários para cada rede social e agenda automaticamente."
    },
    {
      icon: <PenTool size={24} />,
      title: "Copywriting com IA",
      description: "Geração automática de textos persuasivos adaptados para cada plataforma e público."
    },
    {
      icon: <Image size={24} />,
      title: "Criação Visual IA",
      description: "Arte e design automatizados com IA, integração Canva e biblioteca de templates."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Relatórios Automáticos",
      description: "Analytics detalhados com insights acionáveis entregues automaticamente."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Engajamento 24/7",
      description: "Chatbots inteligentes que respondem comentários e mensagens automaticamente."
    },
    {
      icon: <Users size={24} />,
      title: "Crescimento Orgânico",
      description: "Estratégias comprovadas para aumentar seguidores e engajamento genuínos."
    }
  ];

  const benefits = [
    "Gestão completa de todas as redes sociais",
    "Criação de conteúdo com IA generativa",
    "Agendamento automatizado nos melhores horários",
    "Monitoramento de marca e menções",
    "Análise de concorrência e tendências",
    "Campanhas de ads otimizadas",
    "Relatórios mensais personalizados",
    "Suporte especializado e consultoria estratégica"
  ];

  const process = [
    {
      step: "01",
      title: "Auditoria & Estratégia",
      description: "Análise das redes atuais e definição da estratégia de conteúdo personalizada."
    },
    {
      step: "02", 
      title: "Planejamento",
      description: "Criação do calendário editorial e templates visuais da marca."
    },
    {
      step: "03",
      title: "Execução IA",
      description: "Produção e agendamento automatizado com IA de conteúdo e design."
    },
    {
      step: "04",
      title: "Otimização",
      description: "Análise de performance e ajustes contínuos para maximizar resultados."
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
            <span className="text-gray-600">Gestão de Mídias Sociais</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                Redes Sociais com <span className="text-orange">IA Criativa</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Gestão completa das suas redes sociais com IA de copywriting, agendamento inteligente 
                e criação automática de conteúdo. Destaque-se da concorrência com nossa estratégia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Proposta
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Portfolio Social
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Social Media Management"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <ThumbsUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+200% Engajamento</p>
                    <p className="text-sm text-gray-600">Médio dos nossos clientes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Gestão Automatizada com Resultados Reais
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                IA de última geração para criar, agendar e otimizar seu conteúdo automaticamente.
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
                Como Gerenciamos Suas Redes Sociais
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Processo estratégico que combina criatividade humana com eficiência da IA.
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
                  Tudo que Fazemos Pelas Suas Redes
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
                <h3 className="text-2xl font-bold mb-4">Resultados das Nossas Gestões</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-orange">+200%</div>
                    <p className="text-gray-300">Aumento no engajamento</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">150%</div>
                    <p className="text-gray-300">Mais seguidores orgânicos</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">90%</div>
                    <p className="text-gray-300">Economia de tempo</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Dominar as Redes Sociais?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Deixe nossa IA cuidar das suas redes enquanto você foca no que importa: seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Começar Agora
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

export default SocialMediaPage;
