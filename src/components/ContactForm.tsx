
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Here you would typically send the data to your backend
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
      duration: 5000,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const contactInfo = [
    { icon: <Phone size={20} className="text-orange" />, label: 'Telefone', value: '(11) 9999-9999' },
    { icon: <Mail size={20} className="text-orange" />, label: 'E-mail', value: 'contato@agenciadigital.com' },
    { icon: <MapPin size={20} className="text-orange" />, label: 'Endereço', value: 'Av. Paulista, 1000, São Paulo - SP' },
    { icon: <Clock size={20} className="text-orange" />, label: 'Horário', value: 'Seg-Sex: 9h às 18h' },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">Entre em Contato</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos prontos para transformar suas ideias em realidade. Fale conosco
            para iniciarmos seu próximo projeto digital.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="heading-sm mb-6 text-navy">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome completo*
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail*
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    Serviço de interesse
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="websites">Criação de Sites</SelectItem>
                      <SelectItem value="ecommerce">Lojas Virtuais</SelectItem>
                      <SelectItem value="apps">Apps Móveis</SelectItem>
                      <SelectItem value="ava">Ambientes Virtuais</SelectItem>
                      <SelectItem value="marketing">Marketing Digital</SelectItem>
                      <SelectItem value="social">Gestão de Mídias</SelectItem>
                      <SelectItem value="design">Design Gráfico</SelectItem>
                      <SelectItem value="political">Marketing Político</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensagem*
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Conte-nos sobre seu projeto ou dúvida"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="btn-primary w-full md:w-auto">
                Enviar mensagem
              </Button>
            </form>
          </div>

          <div className="md:col-span-2 bg-navy text-white p-6 rounded-lg">
            <h3 className="heading-sm mb-6 text-white">Informações de contato</h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <p className="text-gray-300 text-sm">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <h4 className="text-lg font-semibold mb-4 text-orange">Agende uma reunião</h4>
              <p className="text-gray-300 mb-4">
                Prefere conversar diretamente? Agende uma videoconferência ou reunião presencial.
              </p>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-navy w-full">
                Agendar horário
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
