
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketingDataDriven = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Marketing Digital Data-Driven</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Data-Driven Marketing"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Marketing Digital Data-Driven: Estratégias Baseadas em Dados
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Como utilizar análise de dados e machine learning para criar campanhas de marketing mais eficazes e mensuráveis.
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Autor: Cleyber Silva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>02 Nov 2024</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-navy mb-4">A Era dos Dados no Marketing</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                O marketing baseado em dados transformou a forma como as empresas tomam decisões estratégicas. Não se trata mais de intuição, mas de insights precisos extraídos de análises profundas do comportamento do consumidor.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">KPIs Essenciais para Acompanhar</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2"><strong>CAC (Custo de Aquisição de Cliente):</strong> Quanto custa para conquistar um novo cliente</li>
                <li className="mb-2"><strong>LTV (Lifetime Value):</strong> Valor total que um cliente gera ao longo do relacionamento</li>
                <li className="mb-2"><strong>ROI (Return on Investment):</strong> Retorno sobre investimento das campanhas</li>
                <li className="mb-2"><strong>Taxa de Conversão:</strong> Percentual de visitantes que realizam a ação desejada</li>
              </ul>

              <h2 className="text-2xl font-bold text-navy mb-4">Ferramentas de Business Intelligence</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Plataformas como Google Analytics 4, Facebook Analytics e ferramentas de BI como Tableau e Power BI permitem visualizar dados complexos de forma simples e actionable.
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8">
                <p className="text-purple-800 italic">
                  "Dados sem ação são apenas números. A verdadeira vantagem competitiva está em transformar insights em estratégias práticas."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-4">Segmentação Avançada</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Com machine learning, é possível criar segmentações muito mais precisas, identificando micro-audiências com comportamentos similares e personalizando a comunicação para cada grupo.
              </p>
            </div>
          </div>

          {/* Navigation and CTA */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
            <Link to="/agendar">
              <Button className="bg-orange hover:bg-orange-dark text-white">
                Otimizar Marketing com Dados
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketingDataDriven;
