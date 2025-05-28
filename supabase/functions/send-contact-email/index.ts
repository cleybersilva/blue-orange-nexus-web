
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Determine recipient email based on language
    const getRecipientEmail = (language: string) => {
      if (language === 'en') {
        return 'contact@agenciadigitalhub.com';
      }
      // For pt-BR, pt-PT, and es
      return 'contato@agenciadigitalhub.com';
    };

    const recipientEmail = getRecipientEmail(formData.language);

    // Format the email content
    const emailContent = `
      <h2>Nova Mensagem do Formulário de Contato</h2>
      <p><strong>Nome:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Telefone:</strong> ${formData.phone || 'Não informado'}</p>
      <p><strong>Serviço:</strong> ${formData.service || 'Não especificado'}</p>
      <p><strong>Idioma:</strong> ${formData.language}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${formData.message}</p>
      <hr>
      <p><em>Enviado em: ${new Date().toLocaleString()}</em></p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Digital Hub Agency <noreply@agenciadigitalhub.com>",
      to: [recipientEmail],
      subject: `Nova Mensagem de Contato - ${formData.name}`,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
