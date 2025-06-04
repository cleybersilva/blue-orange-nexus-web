
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Smartphone, 
  Search,
  CheckCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WebsitePortfolioPage = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: "E-commerce de Moda Premium",
      category: "Loja Virtual",
      description: "Plataforma completa de e-commerce com integração de pagamentos, gestão de estoque e sistema de recomendações com IA.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: ["Pagamentos Online", "Gestão de Estoque", "SEO Otimizado", "Mobile First"],
      results: {
        conversion: "+250%",
        performance: "98/100",
        loading: "1.2s"
      }
    },
    {
      id: 2,
      title: "Portal Corporativo Tecnológico",
      category: "Site Institucional",
      description: "Website institucional moderno com sistema de blog integrado, área de clientes e dashboard administrativo.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      features: ["Blog Integrado", "Área do Cliente", "Analytics", "Multilíngue"],
      results: {
        conversion: "+180%",
        performance: "96/100",
        loading: "0.9s"
      }
    },
    {
      id: 3,
      title: "Marketplace B2B Industrial",
      category: "Marketplace",
      description: "Plataforma que conecta fornecedores e compradores do setor industrial com sistema de cotações e negociações.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Express", "PostgreSQL", "Redis"],
      features: ["Sistema de Cotações", "Chat Integrado", "Relatórios", "API REST"],
      results: {
        conversion: "+320%",
        performance: "94/100",
        loading: "1.5s"
      }
    },
    {
      id: 4,
      title: "Portal de Educação Online",
      category: "Plataforma Educacional",
      description: "Sistema completo de ensino à distância com videoaulas, exercícios interativos e certificação digital.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC"],
      features: ["Videoaulas", "Exercícios", "Certificados", "Gamificação"],
      results: {
        conversion: "+200%",
        performance: "97/100",
        loading: "1.1s"
      }
    },
    {
      id: 5,
      title: "Site de Serviços Médicos",
      category: "Healthcare",
      description: "Plataforma para clínicas médicas com agendamento online, prontuário eletrônico e telemedicina.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      features: ["Agendamento", "Prontuário Digital", "Telemedicina", "LGPD Compliant"],
      results: {
        conversion: "+150%",
        performance: "99/100",
        loading: "0.8s"
      }
    },
    {
      id: 6,
      title: "Portal de Notícias Digital",
      category: "Mídia Digital",
      description: "Site de notícias com CMS personalizado, sistema de comentários e integração com redes sociais.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["WordPress", "PHP", "MySQL", "Redis"],
      features: ["CMS Personalizado", "Sistema de Comentários", "SEO Avançado", "AMP"],
      results: {
        conversion: "+280%",
        performance: "95/100",
        loading: "1.3s"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/servicos" className="text-orange hover:underline">{t('nav.services')}</Link>
            <span className="text-gray-400">/</span>
            <Link to="/servicos/websites" className="text-orange hover:underline">Desenvolvimento de Websites</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Portfólio</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
              Portfólio de <span className="text-orange">Websites</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Conheça alguns dos projetos que desenvolvemos para nossos clientes. 
              Cada website é único e criado sob medida para atender às necessidades específicas de cada negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button className="bg-orange hover:bg-orange-dark text-white px-8 py-3">
                  {t('nav.schedule')} Consulta Gratuita
                </Button>
              </Link>
              <Link to="/servicos/websites">
                <Button variant="outline" className="px-8 py-3 bg-transparent">
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar para Websites
                </Button>
              </Link>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {projects.map((project, index) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-orange/10 text-orange px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    <Button variant="ghost" size="sm" className="text-orange hover:text-orange-dark">
                      <ExternalLink size={16} className="mr-1" />
                      Ver Projeto
                    </Button>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-navy mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-navy mb-2">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-navy mb-2">Principais Recursos:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="text-orange" size={16} />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-navy mb-3">Resultados Alcançados:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange">{project.results.conversion}</div>
                        <div className="text-xs text-gray-600">Conversões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange">{project.results.performance}</div>
                        <div className="text-xs text-gray-600">Performance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange">{project.results.loading}</div>
                        <div className="text-xs text-gray-600">Carregamento</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <section className="bg-white rounded-2xl p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                O que Todos os Nossos Websites Incluem
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Padrões de qualidade que aplicamos em todos os projetos para garantir resultados excepcionais.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="text-orange" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-navy">Design Responsivo</h3>
                <p className="text-gray-600">Perfeita adaptação a todos os dispositivos e tamanhos de tela.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-orange" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-navy">SEO Otimizado</h3>
                <p className="text-gray-600">Estruturação técnica para máxima visibilidade nos buscadores.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-orange" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-navy">Performance Avançada</h3>
                <p className="text-gray-600">Carregamento ultrarrápido e otimização de recursos.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Quer um Website Como Estes?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Transforme sua presença digital com um website profissional que gera resultados reais para seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <Button variant="secondary" className="bg-white text-orange hover:bg-gray-100 px-8 py-3">
                  Solicitar Orçamento Gratuito
                </Button>
              </Link>
              <Link to="/servicos/websites">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange px-8 py-3 bg-transparent">
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar para Websites
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebsitePortfolioPage;
