
import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  ChevronRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-orange">Agência</span>Digital
            </h2>
            <p className="text-gray-300 mb-6">
              Transformando ideias em experiências digitais memoráveis que conectam marcas aos seus públicos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Criação de Sites
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Lojas Virtuais
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Apps Móveis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Marketing Digital
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Design Gráfico
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Links Úteis</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-orange transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2" /> 
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Inscreva-se para receber dicas, novidades e ofertas especiais.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Seu e-mail"
                className="bg-navy-light border-navy-light focus:border-orange"
              />
              <Button className="bg-orange hover:bg-orange-dark w-full">Inscrever-se</Button>
            </div>
          </div>
        </div>

        <hr className="border-navy-light mb-6" />

        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Agência Digital. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-orange text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-orange text-sm">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
