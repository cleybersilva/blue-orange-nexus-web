import React, { useEffect, useState } from 'react';
import { Calendar, Users, Building, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TimelineSection from '@/components/about/TimelineSection';
import { useCalendly } from '@/components/CalendlyProvider';
import { useTranslation } from 'react-i18next';

const SobreNos = () => {
  const { t, i18n } = useTranslation();
  const { openCalendly } = useCalendly();
  // Add a state to force re-render on language change
  const [, setForceUpdate] = useState(0);

  // Enhanced language change handling
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Language changed in About page:', i18n.language);
      // Force re-render
      setForceUpdate(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const handleWhatsAppClick = () => {
    window.open('https://w.app/agenciadigitalhub', '_blank');
  };

  // Updated team members with translated roles and bios
  const teamMembers = [
    {
      name: "Cleyber Silva",
      role: t('teamMembers.seo'),
      bio: t('teamMembers.seoBio'),
      image: "/cleyber-silva.jpg",
      linkedin: "https://www.linkedin.com/in/cleybersilva/"
    },
    {
      name: "Marcos Túlio",
      role: t('teamMembers.security'),
      bio: t('teamMembers.securityBio'),
      image: "/marcos-tulio.jpg",
      linkedin: "https://www.linkedin.com/in/marcos-tulio-gomes-830aa269/"
    },
    {
      name: "Euthelys Arthur",
      role: t('teamMembers.traffic'),
      bio: t('teamMembers.trafficBio'),
      image: "/lovable-uploads/1912350f-7bdb-459c-b8cc-2e9f1ad46335.png"
    },
    {
      name: "Marcus Vinícius",
      role: t('teamMembers.design'),
      bio: t('teamMembers.designBio'),
      image: "/lovable-uploads/8e3b9181-21e7-49d8-b685-e5722af69b52.png"
    }
  ];

  // Define default values list as fallback
  const defaultValuesList = [
    "Excelência",
    "Inovação",
    "Transparência",
    "Compromisso",
    "Resultados"
  ];

  // Get values list with fallback to default values
  const valuesList = (() => {
    try {
      const translatedValues = t('aboutPage.mvv.valuesList', { returnObjects: true });
      return Array.isArray(translatedValues) ? translatedValues : defaultValuesList;
    } catch (error) {
      console.error('Error getting valuesList:', error);
      return defaultValuesList;
    }
  })();

  // Function to get the correct email based on language
  const getContactEmail = () => {
    if (i18n.language === 'en') {
      return 'contact@agenciadigitahub.com';
    }
    return 'contato@agenciadigitalhub.com';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-navy text-white py-20 mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-xl mb-6">{t('aboutPage.ourHistory')}</h1>
              <p className="text-lg mb-6">
                {t('aboutPage.historyIntro')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-[#25D366] hover:bg-[#20b958] flex items-center gap-2"
                  onClick={handleWhatsAppClick}
                >
                  {t('aboutPage.contactUs')} <MessageCircle className="h-5 w-5" />
                </Button>
                <Button
                  className="bg-orange hover:bg-orange-dark flex items-center gap-2"
                  onClick={openCalendly}
                >
                  {t('aboutPage.scheduleCall')} <Calendar className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange rounded-full opacity-20"></div>
              <AspectRatio ratio={16/9} className="bg-navy-light rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt={t('aboutPage.ourHistory')}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection />

      {/* Missão, Visão e Valores */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">{t('aboutPage.mvv.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-navy flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">M</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy">{t('aboutPage.mvv.mission')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.mvv.missionText')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-orange flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">V</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy">{t('aboutPage.mvv.vision')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.mvv.visionText')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-navy-light flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">V</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy">{t('aboutPage.mvv.values')}</h3>
                <ul className="text-gray-600 space-y-2">
                  {valuesList.map((value, index) => (
                    <li key={index}>• {value}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-4">{t('aboutPage.team.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            {t('aboutPage.team.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <AspectRatio ratio={3/4} className="bg-gray-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-center space-x-3">
                        <a 
                          href={member.linkedin || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-white/20 p-2 rounded-full hover:bg-orange hover:text-white transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-500 text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-4">{t('aboutPage.differentials.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            {t('aboutPage.differentials.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-orange shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('aboutPage.differentials.agility.title')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.differentials.agility.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-navy shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('aboutPage.differentials.innovation.title')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.differentials.innovation.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-orange shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20h2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('aboutPage.differentials.team.title')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.differentials.team.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-navy shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('aboutPage.differentials.security.title')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.differentials.security.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-orange shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('aboutPage.differentials.cloud.title')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.differentials.cloud.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-navy shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('aboutPage.differentials.support.title')}</h3>
                <p className="text-gray-600">
                  {t('aboutPage.differentials.support.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-light text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">{t('aboutPage.cta.title')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t('aboutPage.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/agendar" className="btn-primary bg-orange hover:bg-orange-dark">
              {t('aboutPage.cta.schedule')}
            </a>
            <button 
              onClick={handleWhatsAppClick} 
              className="btn-secondary border-white text-white hover:bg-white hover:text-navy">
              {t('aboutPage.cta.contact')}
            </button>
          </div>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">{t('aboutPage.location.title')}</h2>
              <p className="text-gray-600 mb-8">
                {t('aboutPage.location.description')}
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <MapPin className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">{t('aboutPage.location.office')}</h3>
                    <address className="text-gray-600 not-italic">
                      {t('footer.address')}
                    </address>
                  </div>
                </div>
                <div className="flex">
                  <Phone className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">{t('aboutPage.location.phone')}</h3>
                    <p className="text-gray-600">
                      <a href="tel:+5583988329018" className="hover:text-orange transition-colors">
                        +55 (83) 98832-9018
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Mail className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">{t('aboutPage.location.email')}</h3>
                    <p className="text-gray-600">
                      <a href={`mailto:${getContactEmail()}`} className="hover:text-orange transition-colors">
                        {getContactEmail()}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-ratio overflow-hidden rounded-lg shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.013136161069!2d-34.84086482477677!3d-7.128195292865566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9d31e7cf233%3A0xf632c57f6b5940ef!2sR.%20Empres%C3%A1rio%20Lourival%20Lopes%20Filho%2C%20105%20-%20Jardim%20Oceania%2C%20Jo%C3%A3o%20Pessoa%20-%20PB%2C%2058037-735!5e0!3m2!1spt-BR!2sbr!4v1713305804046!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={t('aboutPage.location.office')}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SobreNos;
