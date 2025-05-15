
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCalendlyDialog } from '@/hooks/useCalendlyDialog';

const Hero: React.FC = () => {
  const { openCalendly } = useCalendlyDialog();
  
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
              Transforme sua <span className="text-orange">presença digital</span> em resultados
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Somos especialistas em criar experiências digitais que conectam marcas com seus públicos através de websites, lojas virtuais, aplicativos e estratégias de marketing eficientes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="btn-primary flex items-center gap-2"
                onClick={() => openCalendly()}
              >
                Agendar Reunião <Calendar size={16} />
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
                Conheça Nossos Serviços
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-orange rounded-lg"></div>
              <div className="relative bg-navy-light p-8 rounded-lg">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Desenvolvimento de website responsivo" 
                    className="w-full h-full object-cover"
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
