
import React from 'react';
import { 
  Palette, 
  Smartphone, 
  Monitor, 
  Eye, 
  Layers, 
  Zap
} from 'lucide-react';

const DesignFeatures = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Prototipação Rápida IA",
      description: "Criação de protótipos interativos em tempo recorde com feedback automático de usabilidade."
    },
    {
      icon: <Eye size={24} />,
      title: "Estudos de Usabilidade",
      description: "Análise comportamental e testes A/B para otimizar a experiência do usuário."
    },
    {
      icon: <Layers size={24} />,
      title: "Design System",
      description: "Sistemas de design escaláveis com componentes reutilizáveis e guidelines completos."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile-First",
      description: "Designs pensados primeiramente para mobile com responsividade perfeita."
    },
    {
      icon: <Monitor size={24} />,
      title: "Microinterações",
      description: "Animações leves e microinterações que tornam a experiência mais envolvente."
    },
    {
      icon: <Palette size={24} />,
      title: "Tendências Visuais",
      description: "Aplicação de glassmorphism, dark mode e outras tendências modernas de design."
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-navy mb-4">
          Design Moderno com Foco na Experiência
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Combinamos criatividade, usabilidade e tecnologia para criar designs que convertem.
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

export default DesignFeatures;
