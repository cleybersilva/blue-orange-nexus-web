
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ProjectProps {
  title: string;
  category: string;
  image: string;
  link: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, category, image, link }) => (
  <div className="group relative overflow-hidden rounded-lg card-shadow">
    <div className="bg-gray-200 aspect-[4/3] w-full">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover" 
        onError={(e) => {
          // Fallback image if the original fails to load
          e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
        }}
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end">
      <div className="p-6 w-full">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-orange font-medium text-sm">{category}</p>
          <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
          <a 
            href={link} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-orange transition-colors"
          >
            Ver projeto <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: 'Website Corporativo',
      category: 'Desenvolvimento Web',
      image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
    },
    {
      title: 'E-commerce de Moda',
      category: 'Loja Virtual',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
    },
    {
      title: 'Aplicativo de Delivery',
      category: 'App Móvel',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
    },
    {
      title: 'Plataforma de Cursos',
      category: 'Ambiente Virtual',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
    },
    {
      title: 'Campanha de Marketing',
      category: 'Marketing Digital',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
    },
    {
      title: 'Identidade Visual',
      category: 'Design Gráfico',
      image: 'https://images.unsplash.com/photo-1600866920583-1ccd4ba2525e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '#',
    },
  ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">Nosso Portfólio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes,
            transformando ideias em soluções digitais de sucesso.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              category={project.category}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            className="btn-secondary"
            onClick={() => {
              // This could link to a more detailed portfolio page in the future
              console.log("Ver mais projetos clicked");
            }}
          >
            Ver mais projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
