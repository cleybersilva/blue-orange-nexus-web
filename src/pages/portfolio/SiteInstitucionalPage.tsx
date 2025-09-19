import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Globe, Search, Smartphone, Zap, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SiteInstitucionalPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-orange" />,
      title: "Design Responsivo",
      description: "Perfeita adaptação em todos os dispositivos"
    },
    {
      icon: <Search className="w-8 h-8 text-orange" />,
      title: "SEO Otimizado",
      description: "Estrutura otimizada para motores de busca"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange" />,
      title: "Performance Mobile",
      description: "Carregamento ultrarrápido em dispositivos móveis"
    },
    {
      icon: <Award className="w-8 h-8 text-orange" />,
      title: "Acessibilidade",
      description: "Seguimos padrões WCAG 2.1 para inclusão digital"
    }
  ];

  const technologies = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Sanity CMS", "Vercel"
  ];

  const results = [
    { metric: "Performance", value: "98/100", description: "Score no Google PageSpeed" },
    { metric: "Tráfego Orgânico", value: "+340%", description: "Crescimento em 6 meses" },
    { metric: "Taxa de Conversão", value: "12.5%", description: "Leads qualificados" },
    { metric: "Tempo no Site", value: "4:32min", description: "Engajamento médio" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/projetos" className="text-orange hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Portfólio
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Site Institucional</span>
          </div>

          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h1 className="heading-xl text-navy mb-6">
                Site Institucional Premium
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Website institucional moderno com foco em conversão, 
                otimização SEO avançada e experiência de usuário excepcional.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="btn-primary">
                  <Users className="w-4 h-4" />
                  Ver Site Live
                </Button>
                <Button variant="outline" className="border-orange text-orange hover:bg-orange hover:text-white">
                  <Zap className="w-4 h-4" />
                  Análise SEO
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Website Interface"
                className="w-full h-96 object-cover rounded-lg card-shadow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="heading-lg text-navy mb-8 text-center">Características Principais</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg text-navy">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Technologies */}
          <section className="mb-16">
            <h2 className="heading-lg text-navy mb-8 text-center">Stack de Desenvolvimento</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-6 py-3 bg-white rounded-full border border-gray-200 text-navy font-medium hover:border-orange transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Results */}
          <section className="mb-16">
            <h2 className="heading-lg text-navy mb-8 text-center">Resultados Obtidos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <Card key={index} className="text-center bg-gradient-to-br from-orange/5 to-navy/5">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-orange">{result.value}</CardTitle>
                    <CardDescription className="text-lg font-medium text-navy">{result.metric}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{result.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-navy to-navy/90 rounded-2xl p-12 text-white">
            <h2 className="heading-lg mb-4">Sua empresa precisa de presença digital?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Criamos sites institucionais que geram resultados e fortalecem sua marca no mercado.
            </p>
            <Link to="/agendar">
              <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                Solicitar Proposta
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SiteInstitucionalPage;