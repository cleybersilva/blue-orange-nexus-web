import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  CreditCard, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Users, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EcommercePage = () => {
  const features = [
    {
      icon: <CreditCard size={24} />,
      title: "Pagamentos Inteligentes",
      description: "Integração com múltiplos gateways de pagamento e checkout otimizado com IA para reduzir abandono de carrinho."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile-First",
      description: "Design responsivo otimizado para dispositivos móveis, garantindo excelente experiência de compra em qualquer tela."
    },
    {
      icon: <Users size={24} />,
      title: "IA de Recomendação",
      description: "Sistema inteligente que sugere produtos personalizados baseado no comportamento e histórico do cliente."
    },
    {
      icon: <Shield size={24} />,
      title: "Segurança Avançada",
      description: "Certificados SSL, proteção contra fraudes e compliance com LGPD para máxima segurança dos dados."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytics Avançado",
      description: "Dashboards em tempo real com métricas de conversão, abandono de carrinho e performance de vendas."
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Gestão Completa",
      description: "Painel administrativo intuitivo para gerenciar produtos, pedidos, estoque e relatórios financeiros."
    }
  ];

  const benefits = [
    "Plataforma e-commerce personalizada para sua marca",
    "Integração com marketplaces (Mercado Livre, Amazon, etc.)",
    "Sistema de gestão de estoque automático",
    "Carrinho abandonado com recuperação via IA",
    "Programa de fidelidade e cupons inteligentes",
    "Relatórios de vendas e análise de comportamento",
    "Suporte técnico 24/7 e atualizações constantes",
    "Treinamento completo para sua equipe"
  ];

  const process = [
    {
      step: "01",
      title: "Análise & Estratégia",
      description: "Estudo do mercado, concorrência e definição da estratégia de vendas online ideal."
    },
    {
      step: "02", 
      title: "Design & UX",
      description: "Criação de interface focada em conversão com experiência de compra otimizada."
    },
    {
      step: "03",
      title: "Desenvolvimento",
      description: "Construção da plataforma com integração de pagamentos e sistemas de gestão."
    },
    {
      step: "04",
      title: "Lançamento & Otimização",
      description: "Go-live com monitoramento, ajustes e otimizações baseadas em dados reais."
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
            <span className="text-gray-600">Soluções de E-commerce</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                E-commerce que <span className="text-orange">Vende Mais</span> com IA
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Criamos lojas virtuais inteligentes com IA de recomendação, checkout otimizado 
                e integração completa. Transforme visitantes em clientes fiéis com nossa plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Orçamento
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Cases
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="E-commerce Development"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+80 Lojas Criadas</p>
                    <p className="text-sm text-gray-600">Com 300% mais vendas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Recursos Avançados para Vender Mais
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tecnologia de ponta com IA integrada para maximizar suas conversões e fidelizar clientes.
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
                Como Desenvolvemos Seu E-commerce
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Metodologia comprovada para criar lojas virtuais que realmente vendem.
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
                  Por que Escolher Nosso E-commerce?
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
                <h3 className="text-2xl font-bold mb-4">Resultados Impressionantes</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-orange">+250%</div>
                    <p className="text-gray-300">Aumento médio em vendas</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">15%</div>
                    <p className="text-gray-300">Taxa de conversão média</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">24/7</div>
                    <p className="text-gray-300">Vendas automáticas</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Vender Mais Online?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende uma consultoria gratuita e descubra como multiplicar suas vendas com nossa plataforma.
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

export default EcommercePage;
