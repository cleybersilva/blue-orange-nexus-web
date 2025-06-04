
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DesignCTA = () => {
  return (
    <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">
        Pronto para um Design Excepcional?
      </h2>
      <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
        Transforme sua visão em uma experiência digital que seus usuários vão amar.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/agendar">
          <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
            Começar Projeto
          </Button>
        </Link>
        <Link to="/servicos">
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange px-8 py-3 bg-transparent">
            <ArrowLeft size={16} className="mr-2" />
            Voltar aos Serviços
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default DesignCTA;
