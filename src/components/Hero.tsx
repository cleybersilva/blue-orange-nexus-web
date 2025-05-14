
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
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
              <Button className="btn-primary flex items-center gap-2">
                Agendar Reunião <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="btn-secondary">
                Conheça Nossos Serviços
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-orange rounded-lg"></div>
              <div className="relative bg-navy-light p-8 rounded-lg">
                <div className="aspect-video rounded-lg bg-navy-dark flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-orange font-semibold">Sua visão, nossa expertise</p>
                    <p className="text-sm mt-2">Imagem ilustrativa do website</p>
                  </div>
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
