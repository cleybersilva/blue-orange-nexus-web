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
import { useTranslation } from 'react-i18next';
import { useCalendly } from '@/components/CalendlyProvider';
import { supabase } from '@/integrations/supabase/client';

const ContactForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { openCalendly } = useCalendly();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          language: i18n.language,
        });

      if (dbError) throw dbError;

      // Send email
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          language: i18n.language,
        },
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        // Don't throw error for email - form submission still succeeded
      }

      toast({
        title: "🎉 Mensagem enviada com sucesso!",
        description: "Recebemos sua solicitação! Nossa equipe entrará em contato em até 24 horas para agendarmos uma reunião e discutirmos seu projeto. Prepare-se para transformar suas ideias em realidade digital! 🚀",
        duration: 7000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "❌ Ops! Algo deu errado",
        description: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente pelo WhatsApp: (83) 98832-9018',
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Phone size={20} className="text-orange" />, label: t('aboutPage.location.phone'), value: '(83) 98832-9018' },
    { icon: <Mail size={20} className="text-orange" />, label: t('aboutPage.location.email'), value: 'contato@agenciadigital.com' },
    { icon: <MapPin size={20} className="text-orange" />, label: t('aboutPage.location.office'), value: t('footer.address') },
    { icon: <Clock size={20} className="text-orange" />, label: t('timeline.title'), value: 'Seg-Sex: 9h às 18h' },
  ];

  const serviceOptions = [
    { value: "websites", label: t('services.websites.title') },
    { value: "ecommerce", label: t('services.ecommerce.title') },
    { value: "apps", label: t('services.apps.title') },
    { value: "ava", label: t('services.lms.title') },
    { value: "marketing", label: t('services.marketing.title') },
    { value: "social", label: t('services.social.title') },
    { value: "design", label: t('services.design.title') },
    { value: "political", label: t('services.political.title') },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-navy mb-4">{t('nav.contact')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('aboutPage.cta.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="heading-sm mb-6 text-navy">{t('aboutPage.contactUs')}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('aboutPage.team.title')}*
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('aboutPage.team.title')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('aboutPage.location.email')}*
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
                    {t('aboutPage.location.phone')}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(83) 98832-9018"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    {t('services.title')}
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('services.title')} />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('nav.contact')}*
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('aboutPage.cta.subtitle')}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                className="btn-primary w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : t('hero.scheduleButton')}
              </Button>
            </form>
          </div>

          <div className="md:col-span-2 bg-navy text-white p-6 rounded-lg">
            <h3 className="heading-sm mb-6 text-white">{t('footer.contact')}</h3>
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
              <h4 className="text-lg font-semibold mb-4 text-orange">{t('hero.scheduleButton')}</h4>
              <p className="text-gray-300 mb-4">
                {t('aboutPage.scheduleCall')}
              </p>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-navy w-full"
                onClick={() => openCalendly()}
              >
                {t('aboutPage.cta.schedule')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
