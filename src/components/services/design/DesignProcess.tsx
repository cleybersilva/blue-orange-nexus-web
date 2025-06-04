
import React from 'react';
import { ArrowRight } from 'lucide-react';

const DesignProcess = () => {
  const process = [
    {
      step: "01",
      title: "Research & Discovery",
      description: "Pesquisa de usuários, análise de concorrência e definição de requisitos."
    },
    {
      step: "02", 
      title: "Ideação & Wireframes",
      description: "Criação de wireframes, fluxos de usuário e arquitetura de informação."
    },
    {
      step: "03",
      title: "Design Visual",
      description: "Desenvolvimento da identidade visual e interfaces de alta fidelidade."
    },
    {
      step: "04",
      title: "Testes & Entrega",
      description: "Testes de usabilidade, ajustes finais e entrega para desenvolvimento."
    }
  ];

  return (
    <section className="mb-20 bg-white rounded-2xl p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-navy mb-4">
          Nosso Processo de Design Centrado no Usuário
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Metodologia comprovada que garante designs funcionais e esteticamente impecáveis.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {process.map((item, index) => (
          <div key={index} className="text-center relative">
            <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              {item.step}
            </div>
            <h3 className="text-lg font-semibold mb-3 text-navy">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            {index < process.length - 1 && (
              <ArrowRight className="hidden lg:block absolute top-8 -right-4 text-gray-300" size={24} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesignProcess;
