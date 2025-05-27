
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, ShoppingBag, Smartphone, GraduationCap, BarChartBig, Users, Palette, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicosPage = () => {
  const services = [
    {
      icon: <Globe size={40} />,
      title: "Desenvolvimento de Websites",
      description: "Sites institucionais responsivos e otimizados para SEO com integração de IA para geração automática de textos e tradução em tempo real.",
      link: "/servicos/websites",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <ShoppingBag size={40} />,
      title: "Soluções de E-commerce",
      description: "Plataformas integradas com IA de recomendação de produtos, otimização mobile-first e checkouts inteligentes.",
      link: "/servicos/ecommerce",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Smartphone size={40} />,
      title: "Aplicativos Móveis",
      description: "Apps nativos e híbridos para Android e iOS com funcionalidades de comandos por voz e chatbots integrados.",
      link: "/servicos/aplicativos",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <GraduationCap size={40} />,
      title: "Sistemas LMS",
      description: "Plataformas EAD com gamificação, dashboards de performance e suporte a tutores IA para acompanhamento de alunos.",
      link: "/servicos/lms",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <BarChartBig size={40} />,
      title: "Marketing Digital",
      description: "Estratégias baseadas em dados e automações com IA, criação de campanhas com análise preditiva de ROI.",
      link: "/servicos/marketing",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Users size={40} />,
      title: "Gestão de Mídias Sociais",
      description: "Agendamento inteligente com IA de copywriting, relatórios automáticos e criativos personalizados.",
      link: "/servicos/midias-sociais",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <Palette size={40} />,
      title: "Design UI/UX",
      description: "Prototipagem rápida com IA, estudos de usabilidade e layouts com animações leves e microinterações.",
      link: "/servicos/design",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: <Vote size={40} />,
      title: "Campanhas Políticas",
      description: "Plataformas para captação de leads com IA, análise de sentimento e assistentes virtuais multicanal.",
      link: "/servicos/politicas",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-6">Nossos Serviços</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções digitais completas integradas com Inteligência Artificial para transformar 
              sua presença online e impulsionar o crescimento do seu negócio.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${service.color} rounded-lg w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy group-hover:text-orange transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center text-orange font-medium text-sm group-hover:gap-2 transition-all duration-300">
                  Saiba mais
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 bg-navy rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nossa equipe especializada está preparada para desenvolver a solução perfeita 
              para suas necessidades, utilizando as mais avançadas tecnologias de IA.
            </p>
            <Link to="/agendar">
              <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3 text-lg">
                Agendar Consultoria Gratuita
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicosPage;
