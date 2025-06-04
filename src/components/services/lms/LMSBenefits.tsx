
import React from 'react';
import { CheckCircle } from 'lucide-react';

const LMSBenefits = () => {
  const benefits = [
    "Plataforma EAD completa e personalizável",
    "Integração com CRMs educacionais",
    "Sistema de avaliações automatizado",
    "Videoconferências integradas",
    "Certificados digitais automáticos",
    "App móvel para estudar em qualquer lugar",
    "Suporte multilíngue e acessibilidade",
    "Backup automático e segurança de dados"
  ];

  return (
    <section className="mb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-navy mb-6">
            Vantagens da Nossa Plataforma LMS
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
          <h3 className="text-2xl font-bold mb-4">Resultados Educacionais</h3>
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-orange">85%</div>
              <p className="text-gray-300">Taxa de conclusão dos cursos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange">+40%</div>
              <p className="text-gray-300">Aumento no engajamento</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange">24/7</div>
              <p className="text-gray-300">Suporte com tutores IA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LMSBenefits;
