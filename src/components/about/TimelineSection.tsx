
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const timelineEvents = [
  {
    year: "2018",
    title: "O início da jornada",
    description: "Fundação da empresa com foco em desenvolvimento web e soluções digitais personalizadas."
  },
  {
    year: "2019",
    title: "Expansão de serviços",
    description: "Ampliamos nosso portfólio para incluir design gráfico profissional e estratégias de marketing digital."
  },
  {
    year: "2020",
    title: "Adaptação e inovação",
    description: "Durante a pandemia, desenvolvemos soluções digitais que ajudaram empresas a se manterem ativas e conectadas com seus clientes."
  },
  {
    year: "2022",
    title: "Diversificação tecnológica",
    description: "Expandimos para o desenvolvimento de aplicativos móveis e Ambientes Virtuais de Aprendizagem (AVAs)."
  },
  {
    year: "2023",
    title: "Estratégia política digital",
    description: "Lançamos nossa divisão especializada em marketing político digital, oferecendo soluções completas para campanhas."
  },
  {
    year: "2024",
    title: "Crescimento sustentável",
    description: "Ampliamos nossa equipe e infraestrutura para atender à crescente demanda por nossas soluções digitais integradas."
  }
];

const TimelineSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-lg text-center mb-12">Nossa Trajetória</h2>
        
        <div className="relative border-l-2 border-orange ml-4 md:ml-0 md:mx-auto md:max-w-3xl space-y-8">
          {timelineEvents.map((event, index) => (
            <Card
              key={event.year}
              className={`relative ${
                index % 2 === 0 
                  ? 'md:ml-[50%] md:left-4' 
                  : 'md:mr-[50%] md:right-4'
              } bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="absolute top-6 -left-[42px] md:-left-[46px] w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-bold">
                {event.year}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-navy">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
