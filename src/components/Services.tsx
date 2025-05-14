
import React from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Smartphone, 
  GraduationCap, 
  BarChartBig, 
  Users, 
  Palette,
  Vote 
} from 'lucide-react';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 card-shadow">
    <div className="bg-orange/10 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
      <div className="text-orange">{icon}</div>
    </div>
    <h3 className="heading-sm mb-3 text-navy">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      icon: <Globe size={28} />,
      title: 'Criação de Sites',
      description: 'Sites responsivos, otimizados para SEO e com design moderno para sua marca se destacar online.',
    },
    {
      icon: <ShoppingBag size={28} />,
      title: 'Lojas Virtuais',
      description: 'Plataformas de e-commerce completas com gestão de produtos, pagamentos e logística integrada.',
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Apps Móveis',
      description: 'Aplicativos nativos ou híbridos para Android e iOS com foco em usabilidade e performance.',
    },
    {
      icon: <GraduationCap size={28} />,
      title: 'Ambientes Virtuais',
      description: 'Plataformas educacionais (AVA) personalizadas para cursos online e capacitação corporativa.',
    },
    {
      icon: <BarChartBig size={28} />,
      title: 'Marketing Digital',
      description: 'Estratégias completas de marketing digital para posicionamento e crescimento da sua marca.',
    },
    {
      icon: <Users size={28} />,
      title: 'Gestão de Mídias',
      description: 'Gerenciamento profissional de redes sociais para amplificar sua presença digital.',
    },
    {
      icon: <Palette size={28} />,
      title: 'Design Gráfico',
      description: 'Identidade visual, materiais gráficos e elementos visuais para fortalecer sua marca.',
    },
    {
      icon: <Vote size={28} />,
      title: 'Marketing Político',
      description: 'Estratégias digitais para campanhas eleitorais e presença política para as eleições de 2026.',
    },
  ];

  return (
    <section id="services" className="bg-gray-50 section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">Nossos Serviços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos soluções digitais completas para transformar sua presença online
            e impulsionar o crescimento do seu negócio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
