
import React from 'react';
import { 
  GraduationCap, 
  Trophy, 
  BarChart3, 
  Users, 
  BookOpen, 
  Brain
} from 'lucide-react';

const LMSFeatures = () => {
  const features = [
    {
      icon: <Trophy size={24} />,
      title: "Gamificação Avançada",
      description: "Sistema de pontos, badges e rankings para aumentar o engajamento e motivação dos alunos."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Dashboards de Performance",
      description: "Relatórios detalhados de progresso individual e turmas com insights em tempo real."
    },
    {
      icon: <Brain size={24} />,
      title: "Tutores IA",
      description: "Assistentes virtuais inteligentes para acompanhamento personalizado e suporte 24/7."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Compatibilidade SCORM",
      description: "Suporte completo aos padrões SCORM para integração com qualquer conteúdo educacional."
    },
    {
      icon: <Users size={24} />,
      title: "Gestão de Turmas",
      description: "Ferramentas avançadas para organizar alunos, professores e conteúdos de forma eficiente."
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Templates Prontos",
      description: "Modelos pré-configurados para diferentes tipos de instituições e cursos."
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-navy mb-4">
          Recursos Inovadores para Educação
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tecnologia educacional de ponta com IA para potencializar o aprendizado.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
              <div className="text-orange">{feature.icon}</div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-navy">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LMSFeatures;
