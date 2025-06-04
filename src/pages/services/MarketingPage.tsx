
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  BarChartBig, 
  Target, 
  TrendingUp, 
  Zap, 
  Brain, 
  Users, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketingPage = () => {
  const features = [
    {
      icon: <Brain size={24} />,
      title: "IA Preditiva",
      description: "Análise preditiva de ROI e otimização automática de campanhas baseada em machine learning."
    },
    {
      icon: <Target size={24} />,
      title: "Segmentação Avançada",
      description: "Identificação precisa do público-alvo com IA para maximizar a efetividade das campanhas."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Automação Inteligente",
      description: "Fluxos automatizados que se adaptam ao comportamento do usuário em tempo real."
    },
    {
      icon: <BarChartBig size={24} />,
      title: "Analytics Avançado",
      description: "Dashboards com métricas em tempo real e insights acionáveis para otimização contínua."
    },
    {
      icon: <Zap size={24} />,
      title: "Lead Scoring IA",
      description: "Pontuação automática de leads com IA para priorizar oportunidades de maior conversão."
    },
    {
      icon: <Users size={24} />,
      title: "Personalização em Massa",
      description: "Conteúdo personalizado automaticamente para cada segmento de público."
    }
  ];

  const benefits = [
    "Estratégias baseadas em dados e IA",
    "Criação de landing pages otimizadas",
    "Gestão completa de campanhas Google Ads",
    "Email marketing com automação inteligente",
    "Funis de vendas otimizados",
    "Análise de concorrência com IA",
    "Relatórios personalizados em tempo real",
    "ROI garantido com otimização contínua"
  ];

  const process = [
    {
      step: "01",
      title: "Análise & Estratégia",
      description: "Estudo do mercado, persona e definição da estratégia digital personalizada."
    },
    {
      step: "02", 
      title: "Implementação",
      description: "Criação de campanhas, landing pages e configuração de automações."
    },
    {
      step: "03",
      title: "Otimização IA",
      description: "Monitoramento com IA e ajustes automáticos para maximizar resultados."
    },
    {
      step: "04",
      title: "Escala & Growth",
      description: "Expansão das campanhas vencedoras e estratégias de crescimento acelerado."
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
            <span className="text-gray-600">Marketing Digital</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                Marketing Digital com <span className="text-orange">IA Preditiva</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Estratégias baseadas em dados e automações inteligentes para maximizar seu ROI. 
                Transforme leads em clientes com nossa abordagem científica de marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Auditoria Gratuita
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Cases de Sucesso
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Digital Marketing"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+400% ROI Médio</p>
                    <p className="text-sm text-gray-600">Em campanhas otimizadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Marketing Inteligente que Gera Resultados
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Utilizamos IA e machine learning para otimizar suas campanhas automaticamente.
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
                Nossa Metodologia de Crescimento
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Processo científico que garante resultados mensuráveis e escaláveis.
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
                  O que Está Incluso no Nosso Marketing
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
                <h3 className="text-2xl font-bold mb-4">Resultados Comprovados</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-orange">+400%</div>
                    <p className="text-gray-300">ROI médio das campanhas</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">12x</div>
                    <p className="text-gray-300">Mais leads qualificados</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">85%</div>
                    <p className="text-gray-300">Redução no CAC</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Escalar Seus Resultados?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Faça uma auditoria gratuita e descubra como multiplicar seus resultados com IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Agendar Auditoria Gratuita
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

export default MarketingPage;
