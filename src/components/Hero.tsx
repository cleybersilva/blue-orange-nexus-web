
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useCalendly } from '@/components/CalendlyProvider';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { openCalendly } = useCalendly();
  const { t } = useTranslation();
  
  return (
    <section id="hero" className="relative bg-navy pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Abstract shapes for background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-orange opacity-10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-orange opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="heading-xl leading-tight">
              {t('hero.title')} <span className="text-orange">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-orange hover:bg-orange-dark text-white flex items-center gap-2"
                onClick={() => {
                  openCalendly();
                  console.log("Calendly opened from Hero section");
                }}
              >
                {t('hero.scheduleButton')} <Calendar size={16} />
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary" 
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('hero.ctaButton')}
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-orange rounded-lg"></div>
              <div className="relative bg-navy-light p-8 rounded-lg">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt={t('hero.imageAlt')} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if the primary one fails
                      e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
