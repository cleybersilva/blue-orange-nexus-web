import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-navy mb-8">Página de Teste</h1>
          <p className="text-lg text-gray-600 mb-8">
            Esta é uma página de teste para verificar se o roteamento está funcionando.
          </p>
          <Link to="/projetos" className="text-orange hover:underline">
            Voltar para Projetos
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestPage;