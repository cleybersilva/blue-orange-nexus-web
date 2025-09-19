import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Clock, Star, Truck, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AppDeliveryPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-orange" />,
      title: "GPS em Tempo Real",
      description: "Rastreamento preciso com otimização de rotas por IA"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange" />,
      title: "Entrega Rápida",
      description: "Algoritmo de predição para tempos de entrega precisos"
    },
    {
      icon: <Star className="w-8 h-8 text-orange" />,
      title: "Sistema de Avaliação",
      description: "Feedback em tempo real para melhoria contínua"
    },
    {
      icon: <Truck className="w-8 h-8 text-orange" />,
      title: "Logística Inteligente",
      description: "Gestão automatizada de estoque e pedidos"
    }
  ];

  const technologies = [
    "React Native", "Node.js", "MongoDB", "Socket.io", "Google Maps API", "Firebase", "AWS Lambda"
  ];

  const results = [
    { metric: "Tempo Médio", value: "18min", description: "De entrega na cidade" },
    { metric: "Satisfação", value: "4.8/5", description: "Avaliação dos usuários" },
    { metric: "Pedidos/Dia", value: "25k+", description: "Volume processado" },
    { metric: "Eficiência", value: "+90%", description: "Otimização de rotas" }
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
            <span className="text-gray-600">App de Delivery</span>
          </div>

          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h1 className="heading-xl text-navy mb-6">
                App de Delivery Inteligente
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Aplicativo completo de delivery com IA para otimização de rotas, 
                rastreamento em tempo real e experiência de usuário excepcional.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="btn-primary">
                  <Users className="w-4 h-4" />
                  Ver Demo Live
                </Button>
                <Button variant="outline" className="border-orange text-orange hover:bg-orange hover:text-white">
                  <Zap className="w-4 h-4" />
                  Baixar App
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Delivery App Interface"
                className="w-full h-96 object-cover rounded-lg card-shadow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="heading-lg text-navy mb-8 text-center">Funcionalidades Principais</h2>
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
            <h2 className="heading-lg text-navy mb-8 text-center">Tecnologias Utilizadas</h2>
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
            <h2 className="heading-lg text-navy mb-8 text-center">Performance do App</h2>
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
            <h2 className="heading-lg mb-4">Precisa de um app de delivery?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Desenvolvemos aplicativos sob medida para revolucionar seu negócio de delivery.
            </p>
            <Link to="/agendar">
              <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                Começar Projeto
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppDeliveryPage;