
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseEcommerceIA = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Case de Sucesso: E-commerce com IA</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="E-commerce Success Case"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Case de Sucesso: E-commerce com IA Aumenta Vendas em 300%
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Como implementamos soluções de inteligência artificial em um e-commerce e alcançamos resultados extraordinários.
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Autor: Cleyber Silva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>08 Nov 2024</span>
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
              <h2 className="text-2xl font-bold text-navy mb-4">O Desafio Inicial</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nossa cliente, uma loja de moda feminina online, enfrentava baixas taxas de conversão e alta taxa de abandono de carrinho. Com mais de 50.000 visitantes mensais, apenas 1,2% realizavam compras.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Soluções Implementadas</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2"><strong>Recomendação Personalizada:</strong> Sistema de IA que analisa comportamento e histórico de compras</li>
                <li className="mb-2"><strong>Chatbot Inteligente:</strong> Assistente virtual 24/7 com processamento de linguagem natural</li>
                <li className="mb-2"><strong>Análise Preditiva:</strong> Previsão de tendências e otimização de estoque</li>
                <li className="mb-2"><strong>Personalização Dinâmica:</strong> Interface que se adapta ao perfil do usuário</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Resultados Alcançados</h3>
                <ul className="text-green-700">
                  <li>• 300% de aumento nas vendas em 6 meses</li>
                  <li>• Taxa de conversão subiu de 1,2% para 4,8%</li>
                  <li>• Redução de 40% na taxa de abandono de carrinho</li>
                  <li>• Aumento de 150% no ticket médio</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-4">Implementação Técnica</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A implementação foi realizada em fases, começando pela análise de dados existentes, seguida pela integração de APIs de machine learning e finalizando com a otimização contínua baseada em feedback em tempo real.
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
                Revolucionar Seu E-commerce
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseEcommerceIA;
