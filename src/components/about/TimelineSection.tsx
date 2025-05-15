
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const TimelineSection = () => {
  const { t, i18n } = useTranslation();

  // Reload component when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Timeline language updated:', i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const timelineEvents = [
    {
      year: "2018",
      title: t('timeline.2018.title', "O início da jornada"),
      description: t('timeline.2018.description', "Fundação da empresa com foco em desenvolvimento web e soluções digitais personalizadas.")
    },
    {
      year: "2019",
      title: t('timeline.2019.title', "Expansão de serviços"),
      description: t('timeline.2019.description', "Ampliamos nosso portfólio para incluir design gráfico profissional e estratégias de marketing digital.")
    },
    {
      year: "2020",
      title: t('timeline.2020.title', "Adaptação e inovação"),
      description: t('timeline.2020.description', "Durante a pandemia, desenvolvemos soluções digitais que ajudaram empresas a se manterem ativas e conectadas com seus clientes.")
    },
    {
      year: "2022",
      title: t('timeline.2022.title', "Diversificação tecnológica"),
      description: t('timeline.2022.description', "Expandimos para o desenvolvimento de aplicativos móveis e Ambientes Virtuais de Aprendizagem (AVAs).")
    },
    {
      year: "2023",
      title: t('timeline.2023.title', "Estratégia política digital"),
      description: t('timeline.2023.description', "Lançamos nossa divisão especializada em marketing político digital, oferecendo soluções completas para campanhas.")
    },
    {
      year: "2024",
      title: t('timeline.2024.title', "Crescimento sustentável"),
      description: t('timeline.2024.description', "Ampliamos nossa equipe e infraestrutura para atender à crescente demanda por nossas soluções digitais integradas.")
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-lg text-center mb-12">{t('timeline.title', 'Nossa Trajetória')}</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange"></div>
          
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center relative`}>
                {/* Year bubble */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white font-bold z-10">
                  {event.year}
                </div>
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`}>
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-5px]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-navy">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Empty space on the other side */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
