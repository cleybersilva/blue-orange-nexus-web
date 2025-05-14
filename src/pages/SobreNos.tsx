
import React from 'react';
import { Calendar, Users, Building, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const SobreNos = () => {
  // Dados dos membros da equipe
  const teamMembers = [
    {
      name: "Ana Silva",
      role: "CEO & Fundadora",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Carlos Mendes",
      role: "Diretor de Tecnologia",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Juliana Costa",
      role: "Diretora de Design",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Rafael Santos",
      role: "Gerente de Marketing",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  // Linha do tempo da empresa
  const timelineEvents = [
    {
      year: "2018",
      title: "O início da jornada",
      description: "Fundação da empresa com foco em desenvolvimento web"
    },
    {
      year: "2019",
      title: "Expansão de serviços",
      description: "Incluímos design gráfico e marketing digital em nosso portfólio"
    },
    {
      year: "2020",
      title: "Adaptação em tempos de crise",
      description: "Desenvolvemos soluções digitais para empresas se manterem ativas durante a pandemia"
    },
    {
      year: "2022",
      title: "Novos horizontes",
      description: "Expandimos para desenvolvimento de aplicativos móveis e AVAs"
    },
    {
      year: "2023",
      title: "Especialização em marketing político",
      description: "Iniciamos nossa divisão de estratégia digital para campanhas políticas"
    },
    {
      year: "2024",
      title: "Consolidação no mercado",
      description: "Ampliamos nossa equipe e expandimos nosso escritório para atender a demanda crescente"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-xl mb-6">Nossa História</h1>
              <p className="text-lg mb-6">
                Desde 2018, estamos transformando ideias em soluções digitais inovadoras que impulsionam o sucesso dos nossos clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Calendar className="text-orange mr-2" />
                  <span>Desde 2018</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-orange mr-2" />
                  <span>+100 clientes atendidos</span>
                </div>
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

      {/* Nossa Equipe */}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Nossa História */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">Nossa Trajetória</h2>
          
          <div className="relative border-l-2 border-orange ml-4 md:ml-0 md:mx-auto md:max-w-3xl pl-8 md:pl-0">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`mb-12 relative ${
                  index % 2 === 0 
                    ? 'md:ml-auto md:pl-8 md:pr-0 md:text-left' 
                    : 'md:mr-auto md:pr-8 md:pl-0 md:text-right md:-translate-x-full'
                }`}
                style={{ width: 'calc(50% - 1rem)' }}
              >
                <div className="absolute top-0 -left-10 md:left-auto md:right-full md:mr-6">
                  <div className="w-6 h-6 rounded-full bg-orange"></div>
                </div>
                <div className={`bg-white p-6 rounded-lg shadow-md ${
                  index % 2 === 1 && 'md:ml-auto'
                }`}>
                  <span className="inline-block px-4 py-1 mb-4 text-sm bg-navy text-white rounded-full">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-navy">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

      {/* Call To Action */}
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
            <a href="/contato" className="btn-secondary border-white text-white hover:bg-white hover:text-navy">
              Fale Conosco
            </a>
          </div>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Onde Estamos</h2>
              <p className="text-gray-600 mb-8">
                Nosso escritório está localizado em São Paulo, mas atendemos clientes de todo o Brasil 
                e estamos expandindo nossas operações para América Latina.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <Building className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">Escritório Principal</h3>
                    <address className="text-gray-600 not-italic">
                      Av. Paulista, 1000, Bela Vista<br />
                      São Paulo - SP, 01310-100
                    </address>
                  </div>
                </div>
                <div className="flex">
                  <Phone className="h-6 w-6 text-orange mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-navy">Contato</h3>
                    <p className="text-gray-600">
                      contato@empresa.com.br<br />
                      +55 (11) 9999-9999
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-ratio overflow-hidden rounded-lg shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976521576186!2d-46.6549364!3d-23.5657291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1653397790866!5m2!1spt-BR!2sbr" 
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
    </div>
  );
};

export default SobreNos;
