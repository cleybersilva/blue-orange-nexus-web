import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Trophy, 
  BarChart3, 
  Users, 
  BookOpen, 
  Brain, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LMSPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Trophy size={24} />,
      title: "Gamificação Avançada",
      description: "Sistema de pontos, badges e rankings para aumentar o engajamento e motivação dos alunos."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Dashboards de Performance",
      description: "Relatórios detalhados de progresso individual e turmas com insights em tempo real."
    },
    {
      icon: <Brain size={24} />,
      title: "Tutores IA",
      description: "Assistentes virtuais inteligentes para acompanhamento personalizado e suporte 24/7."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Compatibilidade SCORM",
      description: "Suporte completo aos padrões SCORM para integração com qualquer conteúdo educacional."
    },
    {
      icon: <Users size={24} />,
      title: "Gestão de Turmas",
      description: "Ferramentas avançadas para organizar alunos, professores e conteúdos de forma eficiente."
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Templates Prontos",
      description: "Modelos pré-configurados para diferentes tipos de instituições e cursos."
    }
  ];

  const benefits = [
    "Plataforma EAD completa e personalizável",
    "Integração com CRMs educacionais",
    "Sistema de avaliações automatizado",
    "Videoconferências integradas",
    "Certificados digitais automáticos",
    "App móvel para estudar em qualquer lugar",
    "Suporte multilíngue e acessibilidade",
    "Backup automático e segurança de dados"
  ];

  const process = [
    {
      step: "01",
      title: "Análise Pedagógica",
      description: "Estudo das necessidades educacionais e definição da estrutura curricular."
    },
    {
      step: "02", 
      title: "Design Educacional",
      description: "Criação da experiência de aprendizagem e interface otimizada para ensino."
    },
    {
      step: "03",
      title: "Desenvolvimento",
      description: "Construção da plataforma com integração de ferramentas educacionais."
    },
    {
      step: "04",
      title: "Implementação & Treinamento",
      description: "Deploy da plataforma e capacitação completa da equipe educacional."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/servicos" className="text-orange hover:underline">{t('nav.services')}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{t('services.lms.title')}</span>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
                Plataformas EAD com <span className="text-orange">IA Educacional</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Criamos sistemas LMS completos com gamificação, tutores IA e dashboards avançados. 
                Revolucione a educação com nossa plataforma inteligente de aprendizagem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/agendar">
                  <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                    Solicitar Demonstração
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-3">
                  Ver Demo Interativa
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="LMS Platform"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">+25 Instituições</p>
                    <p className="text-sm text-gray-600">+10mil alunos ativos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Recursos Inovadores para Educação
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tecnologia educacional de ponta com IA para potencializar o aprendizado.
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
                Como Criamos Sua Plataforma Educacional
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Metodologia especializada em projetos educacionais de sucesso.
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
                  Vantagens da Nossa Plataforma LMS
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
                <h3 className="text-2xl font-bold mb-4">Resultados Educacionais</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-orange">85%</div>
                    <p className="text-gray-300">Taxa de conclusão dos cursos</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">+40%</div>
                    <p className="text-gray-300">Aumento no engajamento</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange">24/7</div>
                    <p className="text-gray-300">Suporte com tutores IA</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Revolucionar a Educação?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende uma demonstração e veja como nossa plataforma pode transformar sua instituição.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Agendar Demonstração
                </Button>
              </Link>
              <Link to="/servicos">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange px-8 py-3">
                  <ArrowLeft size={16} className="mr-2" />
                  ← Voltar aos Serviços
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

export default LMSPage;
