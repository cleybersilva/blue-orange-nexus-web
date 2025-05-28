
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ScheduleFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  segment: string;
  companySize: string;
  website?: string;
  serviceType: string;
  projectDescription: string;
  deadline: string;
  budget?: string;
  preferWhatsApp: boolean;
  preferEmail: boolean;
  preferPhone: boolean;
  preferCalendly: boolean;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ScheduleFormData = await req.json();
    
    // Save to database
    const { data: submission, error: dbError } = await supabase
      .from('schedule_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        company_name: formData.companyName,
        segment: formData.segment,
        company_size: formData.companySize,
        website: formData.website,
        service_type: formData.serviceType,
        project_description: formData.projectDescription,
        deadline: formData.deadline,
        budget: formData.budget,
        prefer_whatsapp: formData.preferWhatsApp,
        prefer_email: formData.preferEmail,
        prefer_phone: formData.preferPhone,
        prefer_calendly: formData.preferCalendly,
        language: formData.language,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    // Determine recipient email based on language
    const getRecipientEmail = (language: string) => {
      if (language === 'en') {
        return 'contact@agenciadigitalhub.com';
      }
      return 'contato@agenciadigitalhub.com';
    };

    const recipientEmail = getRecipientEmail(formData.language);

    // Language-specific content
    const languageContent = {
      'pt-BR': {
        subject: `📋 Novo Briefing de Projeto - ${formData.name}`,
        title: 'Novo Briefing de Projeto Recebido',
        personalData: 'Dados Pessoais',
        companyData: 'Dados da Empresa',
        projectData: 'Dados do Projeto',
        contactPreferences: 'Preferências de Contato',
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        role: 'Cargo',
        company: 'Empresa',
        segment: 'Segmento',
        size: 'Porte',
        website: 'Website',
        service: 'Serviço',
        description: 'Descrição',
        deadline: 'Prazo',
        budget: 'Orçamento',
        notProvided: 'Não informado',
        submissionTime: 'Horário de Envio',
        language: 'Idioma'
      },
      'pt-PT': {
        subject: `📋 Novo Briefing de Projecto - ${formData.name}`,
        title: 'Novo Briefing de Projecto Recebido',
        personalData: 'Dados Pessoais',
        companyData: 'Dados da Empresa',
        projectData: 'Dados do Projecto',
        contactPreferences: 'Preferências de Contacto',
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        role: 'Cargo',
        company: 'Empresa',
        segment: 'Segmento',
        size: 'Porte',
        website: 'Website',
        service: 'Serviço',
        description: 'Descrição',
        deadline: 'Prazo',
        budget: 'Orçamento',
        notProvided: 'Não informado',
        submissionTime: 'Hora de Envio',
        language: 'Idioma'
      },
      'es': {
        subject: `📋 Nuevo Briefing de Proyecto - ${formData.name}`,
        title: 'Nuevo Briefing de Proyecto Recibido',
        personalData: 'Datos Personales',
        companyData: 'Datos de la Empresa',
        projectData: 'Datos del Proyecto',
        contactPreferences: 'Preferencias de Contacto',
        name: 'Nombre',
        email: 'E-mail',
        phone: 'Teléfono',
        role: 'Cargo',
        company: 'Empresa',
        segment: 'Segmento',
        size: 'Tamaño',
        website: 'Website',
        service: 'Servicio',
        description: 'Descripción',
        deadline: 'Plazo',
        budget: 'Presupuesto',
        notProvided: 'No informado',
        submissionTime: 'Hora de Envío',
        language: 'Idioma'
      },
      'en': {
        subject: `📋 New Project Briefing - ${formData.name}`,
        title: 'New Project Briefing Received',
        personalData: 'Personal Data',
        companyData: 'Company Data',
        projectData: 'Project Data',
        contactPreferences: 'Contact Preferences',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        role: 'Role',
        company: 'Company',
        segment: 'Segment',
        size: 'Size',
        website: 'Website',
        service: 'Service',
        description: 'Description',
        deadline: 'Deadline',
        budget: 'Budget',
        notProvided: 'Not provided',
        submissionTime: 'Submission Time',
        language: 'Language'
      }
    };

    const content = languageContent[formData.language as keyof typeof languageContent] || languageContent['pt-BR'];

    const contactPrefs = [];
    if (formData.preferWhatsApp) contactPrefs.push('WhatsApp');
    if (formData.preferEmail) contactPrefs.push(content.email);
    if (formData.preferPhone) contactPrefs.push(content.phone);
    if (formData.preferCalendly) contactPrefs.push('Calendly');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #f97316; margin-bottom: 30px;">${content.title}</h1>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">${content.personalData}</h2>
          <p><strong>${content.name}:</strong> ${formData.name}</p>
          <p><strong>${content.email}:</strong> ${formData.email}</p>
          <p><strong>${content.phone}:</strong> ${formData.phone}</p>
          <p><strong>${content.role}:</strong> ${formData.role}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">${content.companyData}</h2>
          <p><strong>${content.company}:</strong> ${formData.companyName}</p>
          <p><strong>${content.segment}:</strong> ${formData.segment}</p>
          <p><strong>${content.size}:</strong> ${formData.companySize}</p>
          <p><strong>${content.website}:</strong> ${formData.website || content.notProvided}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">${content.projectData}</h2>
          <p><strong>${content.service}:</strong> ${formData.serviceType}</p>
          <p><strong>${content.description}:</strong> ${formData.projectDescription}</p>
          <p><strong>${content.deadline}:</strong> ${formData.deadline}</p>
          <p><strong>${content.budget}:</strong> ${formData.budget || content.notProvided}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">${content.contactPreferences}</h2>
          <p>${contactPrefs.join(', ')}</p>
        </div>

        <div style="background: #fff; padding: 15px; border-left: 4px solid #f97316; margin-top: 30px;">
          <p><strong>${content.submissionTime}:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>${content.language}:</strong> ${formData.language}</p>
        </div>
      </div>
    `;

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: 'Agência Digital Hub <noreply@agenciadigitalhub.com>',
      to: [recipientEmail],
      subject: content.subject,
      html: htmlContent,
    });

    if (emailError) {
      console.error('Email error:', emailError);
      throw emailError;
    }

    // Also add to newsletter if user agreed
    if (formData.preferEmail) {
      const { error: newsletterError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: formData.email,
          language: formData.language,
        })
        .select()
        .single();

      // Don't throw error for newsletter subscription - it's optional
      if (newsletterError) {
        console.log('Newsletter subscription error (non-critical):', newsletterError);
      }
    }

    console.log('Schedule briefing processed successfully for:', formData.email);

    return new Response(JSON.stringify({ 
      success: true, 
      submissionId: submission.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-schedule-briefing function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
