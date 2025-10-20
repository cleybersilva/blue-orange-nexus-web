import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    console.log("Contact form submission received:", { email: formData.email, service: formData.service });

    // Determine recipient email based on language
    const recipientEmail = "contato@agenciadigitalhub.com";

    // Build email content with all form information
    const serviceLabel = formData.service ? `<p><strong>Serviço de Interesse:</strong> ${formData.service}</p>` : '';
    const phoneLabel = formData.phone ? `<p><strong>Telefone:</strong> ${formData.phone}</p>` : '';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #f97316; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            strong { color: #1e3a8a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🔔 Nova Solicitação de Serviço</h1>
              <p style="margin: 10px 0 0 0;">Formulário de Contato - Website</p>
            </div>
            
            <div class="content">
              <div class="info-box">
                <h2 style="color: #f97316; margin-top: 0;">📋 Informações do Cliente</h2>
                <p><strong>Nome:</strong> ${formData.name}</p>
                <p><strong>E-mail:</strong> ${formData.email}</p>
                ${phoneLabel}
                ${serviceLabel}
              </div>

              <div class="info-box">
                <h2 style="color: #f97316; margin-top: 0;">💬 Mensagem</h2>
                <p style="white-space: pre-wrap;">${formData.message}</p>
              </div>

              <div class="info-box">
                <h2 style="color: #f97316; margin-top: 0;">ℹ️ Informações do Sistema</h2>
                <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
                <p><strong>Idioma:</strong> ${formData.language}</p>
              </div>

              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px; border-radius: 8px;">
                <p style="margin: 0; color: #856404;">
                  <strong>⏰ Próximos Passos:</strong><br>
                  Entre em contato com o cliente em até 24 horas para agendar uma reunião e discutir o projeto em detalhes.
                </p>
              </div>
            </div>

            <div class="footer">
              <p>Este é um e-mail automático gerado pelo sistema de contato do website.<br>
              Agência Digital Hub - Transformando ideias em realidade digital</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to the agency
    const emailResponse = await resend.emails.send({
      from: "Agência Digital Hub <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `🔔 Nova Solicitação de Serviço - ${formData.name}`,
      html: emailHtml,
      reply_to: formData.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
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
