
import React from 'react';
import { CheckCircle } from 'lucide-react';

const DesignBenefits = () => {
  const benefits = [
    "Pesquisa e análise de usuários",
    "Wireframes e arquitetura de informação",
    "Design visual moderno e atrativo",
    "Protótipos interativos de alta fidelidade",
    "Testes de usabilidade e acessibilidade",
    "Design system completo e escalável",
    "Handoff detalhado para desenvolvimento",
    "Suporte contínuo pós-lançamento"
  ];

  return (
    <section className="mb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-navy mb-6">
            O que Entregamos em Cada Projeto
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-orange mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-navy rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Impacto dos Nossos Designs</h3>
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-orange">40%</div>
              <p className="text-gray-300">Aumento na conversão</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange">60%</div>
              <p className="text-gray-300">Redução na taxa de rejeição</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange">98%</div>
              <p className="text-gray-300">Satisfação dos usuários</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignBenefits;
