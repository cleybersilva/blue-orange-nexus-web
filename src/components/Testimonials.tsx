
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TestimonialProps {
  quoteKey: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageUrl: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  quoteKey, 
  author, 
  role, 
  company,
  rating,
  imageUrl
}) => {
  const { t } = useTranslation();
  
  return (
    <Card className="bg-white card-shadow border-none hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="p-8">
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={18} className="fill-orange text-orange" />
          ))}
        </div>
        <blockquote className="text-gray-700 mb-6">
          "{t(quoteKey)}"
        </blockquote>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 bg-navy-light">
            <AvatarImage src={imageUrl} alt={author} />
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
};

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      quoteKey: "testimonials.quotes.first",
      author: "Ana Silva",
      role: t("testimonials.roles.ceo"),
      company: "TechSolutions",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      quoteKey: "testimonials.quotes.second",
      author: "Carlos Mendes",
      role: t("testimonials.roles.commercial"),
      company: "ModaStore",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      quoteKey: "testimonials.quotes.third",
      author: "Patricia Lopes",
      role: t("testimonials.roles.product"),
      company: "DeliveryExpress",
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-50 section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">{t('testimonials.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quoteKey={testimonial.quoteKey}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              rating={testimonial.rating}
              imageUrl={testimonial.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
