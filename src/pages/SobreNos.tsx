import React from 'react';
import { Calendar, Users, Building, Phone, MapPin, Mail, Whatsapp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TimelineSection from '@/components/about/TimelineSection';
import { useCalendly } from '@/components/CalendlyProvider';

const SobreNos = () => {
  const { openCalendly } = useCalendly();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5583988329018', '_blank');
  };

  // Dados dos membros da equipe atualizados
  const teamMembers = [
    {
      name: "Cleyber Silva",
      role: "SEO e AI Scientist",
      bio: "Especialista em otimização para motores de busca e aplicações de inteligência artificial para negócios digitais.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Marcos Túlio",
      role: "Sênior CyberSecurity",
      bio: "Responsável pela segurança digital e proteção de dados dos clientes, com vasta experiência em prevenção de ameaças.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Euthelys Arthur",
      role: "Traffic Manager",
      bio: "Especialista em geração de tráfego qualificado e estratégias de conversão para campanhas digitais.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Vini",
      role: "Graphic Design Manager",
      bio: "Lidera o time de design gráfico, garantindo a excelência visual em todos os projetos e materiais da empresa.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  // Linha do tempo da empresa corrigida
  const timelineEvents = [
    {
      year: "2018",
      title: "O início da jornada",
      description: "Fundação da empresa com foco em desenvolvimento web e soluções digitais personalizadas."
    },
    {
      year: "2019",
      title: "Expansão de serviços",
      description: "Ampliamos nosso portfólio para incluir design gráfico profissional e estratégias de marketing digital."
    },
    {
      year: "2020",
      title: "Adaptação e inovação",
      description: "Durante a pandemia, desenvolvemos soluções digitais que ajudaram empresas a se manterem ativas e conectadas com seus clientes."
    },
    {
      year: "2022",
      title: "Diversificação tecnológica",
      description: "Expandimos para o desenvolvimento de aplicativos móveis e Ambientes Virtuais de Aprendizagem (AVAs)."
    },
    {
      year: "2023",
      title: "Estratégia política digital",
      description: "Lançamos nossa divisão especializada em marketing político digital, oferecendo soluções completas para campanhas."
    },
    {
      year: "2024",
      title: "Crescimento sustentável",
      description: "Ampliamos nossa equipe e infraestrutura para atender à crescente demanda por nossas soluções digitais integradas."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Adicionando o Header que estava faltando */}
      <Header />
      
      {/* Hero Section - Updated styling */}
      <section className="bg-navy text-white py-20 mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-xl mb-6">Nossa História</h1>
              <p className="text-lg mb-6">
                Desde 2018, estamos transformando ideias em soluções digitais inovadoras que impulsionam o sucesso dos nossos clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-[#25D366] hover:bg-[#20b958] flex items-center gap-2"
                  onClick={handleWhatsAppClick}
                >
                  Fale Conosco <Whatsapp className="h-5 w-5" />
                </Button>
                <Button
                  className="bg-orange hover:bg-orange-dark flex items-center gap-2"
                  onClick={openCalendly}
                >
                  Agendar Reunião <Calendar className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange rounded-full opacity-20"></div>
              <AspectRatio ratio={16/9} className="bg-navy-light rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Equipe trabalhando" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection />

      {/* Missão, Visão e Valores */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">Missão, Visão e Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-navy flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">M</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy">Missão</h3>
                <p className="text-gray-600">
                  Transformar ideias em soluções digitais inovadoras que impulsionem o crescimento dos nossos clientes, 
                  agregando valor real aos seus negócios através da tecnologia e criatividade.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-orange flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">V</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy">Visão</h3>
                <p className="text-gray-600">
                  Ser reconhecida como referência em soluções digitais integradas, 
                  expandindo nossa atuação nacional e destacando-nos pela excelência, 
                  inovação e resultados entregues aos nossos clientes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-navy-light flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">V</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy">Valores</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Excelência em cada entrega</li>
                  <li>• Inovação constante</li>
                  <li>• Transparência nos processos</li>
                  <li>• Compromisso com resultados</li>
                  <li>• Relacionamento de confiança</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa Equipe - Atualizada com os novos membros */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-4">Nossa Equipe</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Conheça os profissionais talentosos que fazem parte do nosso time e trabalham 
            diariamente para entregar as melhores soluções digitais.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <AspectRatio ratio={3/4} className="bg-gray-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-center space-x-3">
                        <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-orange hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-500 text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-4">Nossos Diferenciais</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            O que nos torna únicos no mercado e por que nossos clientes confiam em nossos serviços.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-orange shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Agilidade</h3>
                <p className="text-gray-600">
                  Entregamos projetos com rapidez sem comprometer a qualidade, utilizando metodologias ágeis 
                  para garantir eficiência e resultados.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-navy shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Inovação</h3>
                <p className="text-gray-600">
                  Estamos sempre à frente das tendências tecnológicas, integrando as mais recentes 
                  inovações em nossos projetos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-orange shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20h2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Equipe Multidisciplinar</h3>
                <p className="text-gray-600">
                  Contamos com profissionais especializados em diversas áreas, garantindo uma abordagem 
                  completa para cada projeto.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-navy shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Segurança</h3>
                <p className="text-gray-600">
                  Priorizamos a proteção dos dados e a segurança dos sistemas que desenvolvemos, 
                  seguindo as melhores práticas do mercado.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-orange shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Soluções na Nuvem</h3>
                <p className="text-gray-600">
                  Desenvolvemos e implementamos soluções baseadas em nuvem, garantindo escalabilidade, 
                  disponibilidade e redução de custos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-navy shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Suporte Contínuo</h3>
                <p className="text-gray-600">
                  Oferecemos suporte técnico pós-entrega e manutenção contínua, garantindo que sua 
                  solução permaneça atualizada e funcional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call To Action - Com botão de WhatsApp corrigido */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-light text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Pronto para Transformar suas Ideias em Realidade?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco ou agende um atendimento personalizado para discutirmos seu projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/agendar" className="btn-primary bg-orange hover:bg-orange-dark">
              Agendar Atendimento
            </a>
            <button 
              onClick={handleWhatsAppClick} 
              className="btn-secondary border-white text-white hover:bg-white hover:text-navy">
              Fale Conosco
            </button>
          </div>
        </div>
      </section>

      {/* Informações de Contato - Atualizadas */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Onde Estamos</h2>
              <p className="text-gray-600 mb-8">
                Estamos localizados em João Pessoa, mas atendemos clientes de todo o Brasil 
                através de nossas soluções digitais integradas.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <MapPin className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">Escritório Principal</h3>
                    <address className="text-gray-600 not-italic">
                      R. Empresário Lourival Lopes Filho, 105<br />
                      Jardim Oceania, João Pessoa - PB, 58037-735
                    </address>
                  </div>
                </div>
                <div className="flex">
                  <Phone className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">Telefone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+5583988329018" className="hover:text-orange transition-colors">
                        +55 (83) 98832-9018
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Mail className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">E-mail</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contato@agenciadigital.com" className="hover:text-orange transition-colors">
                        contato@agenciadigital.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-ratio overflow-hidden rounded-lg shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.013136161069!2d-34.84086482477677!3d-7.128195292865566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace9d31e7cf233%3A0xf632c57f6b5940ef!2sR.%20Empres%C3%A1rio%20Lourival%20Lopes%20Filho%2C%20105%20-%20Jardim%20Oceania%2C%20Jo%C3%A3o%20Pessoa%20-%20PB%2C%2058037-735!5e0!3m2!1spt-BR!2sbr!4v1713305804046!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa do escritório"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Adicionando o Footer */}
      <Footer />
    </div>
  );
};

export default SobreNos;
