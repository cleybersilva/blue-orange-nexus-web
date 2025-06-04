
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const DesignHero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
          Design UI/UX com <span className="text-orange">IA Generativa</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Criamos experiências digitais extraordinárias com prototipação rápida, estudos de usabilidade 
          e design systems modernos. Transforme ideias em interfaces que encantam.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/agendar">
            <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
              Solicitar Proposta
            </Button>
          </Link>
          <Button variant="outline" className="px-8 py-3">
            Ver Portfolio Design
          </Button>
        </div>
      </div>
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="UI/UX Design"
          className="rounded-2xl shadow-2xl"
        />
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Sparkles className="text-green-600" size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">+100 Interfaces</p>
              <p className="text-sm text-gray-600">Premiadas por usabilidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignHero;
