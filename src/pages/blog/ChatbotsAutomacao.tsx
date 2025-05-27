
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatbotsAutomacao = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <Link to="/blog" className="text-orange hover:underline">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Automação com Chatbots</span>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Chatbots Automation"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Automação com Chatbots: Como Otimizar o Atendimento ao Cliente
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Aprenda a implementar assistentes virtuais inteligentes para melhorar a experiência do cliente e reduzir custos operacionais.
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Autor: Cleyber Silva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>05 Nov 2024</span>
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
              <h2 className="text-2xl font-bold text-navy mb-4">A Revolução dos Chatbots</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Os chatbots evoluíram de simples respondedores automáticos para assistentes virtuais sofisticados capazes de compreender contexto, sentimentos e intenções dos usuários.
              </p>

              <h2 className="text-2xl font-bold text-navy mb-4">Benefícios da Automação</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-2"><strong>Disponibilidade 24/7:</strong> Atendimento ininterrupto sem custos adicionais</li>
                <li className="mb-2"><strong>Redução de Custos:</strong> Até 70% de economia em atendimento</li>
                <li className="mb-2"><strong>Escalabilidade:</strong> Atende milhares de clientes simultaneamente</li>
                <li className="mb-2"><strong>Consistência:</strong> Respostas padronizadas e precisas</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                <p className="text-blue-800 italic">
                  "Um chatbot bem implementado pode resolver 80% das dúvidas dos clientes, liberando a equipe humana para casos mais complexos."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-navy mb-4">Implementação Estratégica</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A chave para o sucesso está em mapear as principais dúvidas dos clientes, criar fluxos conversacionais naturais e integrar o chatbot aos sistemas existentes da empresa.
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
                Implementar Chatbot Inteligente
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotsAutomacao;
