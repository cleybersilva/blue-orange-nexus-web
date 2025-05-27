
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Search, 
  Smartphone, 
  Zap, 
  Shield, 
  BarChart3, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WebsitesPage = () => {
  const features = [
    {
      icon: <Search size={24} />,
      title: "SEO Otimizado",
      description: "Sites construídos seguindo as melhores práticas de SEO para garantir visibilidade nos mecanismos de busca."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Design Responsivo",
      description: "Layout que se adapta perfeitamente a todos os dispositivos, garantindo excelente experiência mobile."
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Otimizada",
      description: "Carregamento ultrarrápido com otimização de imagens, código limpo e CDN integrado."
    },
    {
      icon: <Shield size={24} />,
      title: "Segurança Avançada",
      description: "Certificados SSL, proteção contra malware e backups automáticos para máxima segurança."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytics Integrado",
      description: "Acompanhamento detalhado de métricas com Google Analytics e ferramentas de monitoramento."
    },
    {
      icon: <Globe size={24} />,
      title: "IA Integrada",
      description: "Chatbots inteligentes, tradução automática e geração de conteúdo com inteligência artificial."
    }
  ];

  const benefits = [
    "Design personalizado exclusivo para sua marca",
    "Painel administrativo intuitivo para gerenciar conteúdo",
    "Integração com redes sociais e ferramentas de marketing",
    "Otimização para velocidade e performance",
    "Suporte técnico contínuo pós-lançamento",
    "Treinamento completo para sua equipe",
    "Hospedagem profissional inclusa no primeiro ano",
    "Certificado SSL e domínio gratuitos"
  ];

  const process = [
    {
      step: "01",
      title: "Briefing & Estratégia",
      description: "Análise detalhada das necessidades, público-alvo e objetivos do projeto."
    },
    {
      step: "02", 
      title: "Design & Prototipagem",
      description: "Criação de wireframes e protótipos interativos com foco na experiência do usuário."
    },
    {
      step: "03",
      title: "Desenvolvimento",
      description: "Codificação com tecnologias modernas, testes e otimizações de performance."
    },
    {
      step: "04",
      title: "Lançamento & Suporte",
      description: "Deploy, treinamento da equipe e suporte contínuo para máximo aproveitamento."
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
            <span className="text-gray-600">Desenvolvimento de Websites</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                Websites que <span className="text-orange">Convertem</span> e Impressionam
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Criamos sites institucionais responsivos com integração de IA, otimizados para SEO 
                e focados em resultados. Transforme visitantes em clientes com nossa experiência digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Orçamento
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Portfolio
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Website Development"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+150 Sites Criados</p>
                    <p className="text-sm text-gray-600">Com 98% de satisfação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Recursos Inclusos em Todos os Projetos
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Utilizamos as mais modernas tecnologias e melhores práticas para garantir sites de alta qualidade.
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
                Metodologia ágil e transparente para garantir o sucesso do seu projeto.
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
                  Por que Escolher Nossos Websites?
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
                    <div className="text-3xl font-bold text-orange">+300%</div>
                    <p className="text-gray-300">Aumento médio em conversões</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">95%</div>
                    <p className="text-gray-300">Score médio de performance</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">2.5s</div>
                    <p className="text-gray-300">Tempo médio de carregamento</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Ter o Website dos Seus Sonhos?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende uma consultoria gratuita e descubra como podemos transformar sua presença digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Agendar Consultoria Gratuita
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

export default WebsitesPage;
