
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "E-commerce de Moda",
      description: "Loja virtual completa com integração de pagamentos e gestão de estoque.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Loja Virtual"
    },
    {
      id: 2,
      title: "App de Delivery",
      description: "Aplicativo móvel para pedidos e entregas com rastreamento em tempo real.",
      image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Aplicativo Móvel"
    },
    {
      id: 3,
      title: "Site Institucional",
      description: "Website responsivo com otimização SEO e integração com CRM.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Website"
    },
    {
      id: 4,
      title: "Dashboard Analítico",
      description: "Painel de controle com métricas de negócio e relatórios personalizados.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Software"
    },
    {
      id: 5,
      title: "Rede Social Corporativa",
      description: "Plataforma privada para comunicação e colaboração entre funcionários.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Plataforma Web"
    },
    {
      id: 6,
      title: "Marketplace B2B",
      description: "Portal para conectar fornecedores e compradores do setor industrial.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Marketplace"
    },
    {
      id: 7,
      title: "App de Gestão Financeira",
      description: "Aplicativo para controle de finanças pessoais com análise de gastos.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Fintech"
    },
    {
      id: 8,
      title: "Portal Educacional",
      description: "Plataforma de cursos online com área do aluno e certificação digital.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "EdTech"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h1 className="heading-lg">Nosso Portfólio</h1>
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft size={16} /> Voltar para Home
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Detalhes do projeto",
                        description: "Funcionalidade em desenvolvimento",
                        duration: 3000,
                      });
                    }}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
