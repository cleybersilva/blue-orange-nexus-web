
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, ShoppingBag, Smartphone, GraduationCap, BarChartBig, Users, Palette, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicosPage = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <Globe size={40} />,
      title: t("services.websites.title"),
      description: t("services.websites.description"),
      link: "/servicos/websites",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <ShoppingBag size={40} />,
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      link: "/servicos/ecommerce",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Smartphone size={40} />,
      title: t("services.apps.title"),
      description: t("services.apps.description"),
      link: "/servicos/aplicativos",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <GraduationCap size={40} />,
      title: t("services.lms.title"),
      description: t("services.lms.description"),
      link: "/servicos/lms",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <BarChartBig size={40} />,
      title: t("services.marketing.title"),
      description: t("services.marketing.description"),
      link: "/servicos/marketing",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Users size={40} />,
      title: t("services.social.title"),
      description: t("services.social.description"),
      link: "/servicos/midias-sociais",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <Palette size={40} />,
      title: t("services.design.title"),
      description: t("services.design.description"),
      link: "/servicos/design",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: <Vote size={40} />,
      title: t("services.political.title"),
      description: t("services.political.description"),
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
            <h1 className="heading-lg mb-6">{t('services.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle')}
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
                  {t('services.learnMore')}
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 bg-navy rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('aboutPage.cta.title')}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('aboutPage.cta.subtitle')}
            </p>
            <Link to="/agendar">
              <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3 text-lg">
                {t('aboutPage.cta.schedule')}
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
