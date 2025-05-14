
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  company,
  rating
}) => (
  <Card className="bg-white card-shadow border-none hover:scale-[1.02] transition-transform duration-300">
    <CardContent className="p-8">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={18} className="fill-orange text-orange" />
        ))}
      </div>
      <blockquote className="text-gray-700 mb-6">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 bg-navy-light">
          <AvatarFallback className="text-white">{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-navy">{author}</h4>
          <p className="text-gray-500 text-sm">{role}, {company}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "A equipe superou todas as nossas expectativas. Nosso site foi entregue dentro do prazo e com um design excepcional que reflete perfeitamente nossa marca.",
      author: "Ana Silva",
      role: "CEO",
      company: "TechSolutions",
      rating: 5
    },
    {
      quote: "Nossa loja virtual aumentou as vendas em 150% após o redesign e implementação das estratégias de marketing sugeridas pela equipe.",
      author: "Carlos Mendes",
      role: "Diretor Comercial",
      company: "ModaStore",
      rating: 5
    },
    {
      quote: "O aplicativo desenvolvido revolucionou a forma como nos comunicamos com nossos clientes. Interface intuitiva e sem bugs.",
      author: "Patricia Lopes",
      role: "Gerente de Produto",
      company: "DeliveryExpress",
      rating: 4
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-50 section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">O que dizem nossos clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A satisfação de nossos clientes é nosso maior indicador de sucesso.
            Veja o que eles têm a dizer sobre nossas soluções.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
