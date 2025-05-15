
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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <Globe size={28} />,
      title: t('services.websites.title'),
      description: t('services.websites.description'),
    },
    {
      icon: <ShoppingBag size={28} />,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description'),
    },
    {
      icon: <Smartphone size={28} />,
      title: t('services.apps.title'),
      description: t('services.apps.description'),
    },
    {
      icon: <GraduationCap size={28} />,
      title: t('services.lms.title'),
      description: t('services.lms.description'),
    },
    {
      icon: <BarChartBig size={28} />,
      title: t('services.marketing.title'),
      description: t('services.marketing.description'),
    },
    {
      icon: <Users size={28} />,
      title: t('services.social.title'),
      description: t('services.social.description'),
    },
    {
      icon: <Palette size={28} />,
      title: t('services.design.title'),
      description: t('services.design.description'),
    },
    {
      icon: <Vote size={28} />,
      title: t('services.political.title'),
      description: t('services.political.description'),
    },
  ];

  return (
    <section id="services" className="bg-gray-50 section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">{t('services.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
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
