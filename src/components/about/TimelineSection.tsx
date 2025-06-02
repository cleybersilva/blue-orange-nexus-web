
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import HubHighlight from '@/components/ui/hub-highlight';

const TimelineSection = () => {
  const { t, i18n } = useTranslation();
  // Add a state to force re-render on language change
  const [, setForceUpdate] = useState(0);

  // Enhanced language change handling
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Timeline language updated:', i18n.language);
      // Force re-render when language changes
      setForceUpdate(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Define timeline events as an array to properly use map function
  const timelineEvents = [
    {
      year: "2018",
      title: t('timeline.2018.title'),
      description: t('timeline.2018.description')
    },
    {
      year: "2019",
      title: t('timeline.2019.title'),
      description: t('timeline.2019.description')
    },
    {
      year: "2020",
      title: t('timeline.2020.title'),
      description: t('timeline.2020.description')
    },
    {
      year: "2022",
      title: t('timeline.2022.title'),
      description: t('timeline.2022.description')
    },
    {
      year: "2023",
      title: t('timeline.2023.title'),
      description: t('timeline.2023.description')
    },
    {
      year: "2024",
      title: t('timeline.2024.title'),
      description: t('timeline.2024.description')
    },
    {
      year: "2025",
      title: t('timeline.2025.title'),
      description: t('timeline.2025.description')
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-lg text-center mb-12 flex items-center justify-center gap-2">
          {t('timeline.title')} <HubHighlight />
        </h2>
        
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
