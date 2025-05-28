
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailData {
  email: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, language }: WelcomeEmailData = await req.json();
    
    // Determine recipient email based on language
    const getRecipientEmail = (language: string) => {
      if (language === 'en') {
        return 'contact@agenciadigitalhub.com';
      }
      // For pt-BR, pt-PT, and es
      return 'contato@agenciadigitalhub.com';
    };

    const senderEmail = getRecipientEmail(language);

    // Define welcome messages by language
    const welcomeMessages = {
      'pt-BR': {
        subject: '🎉 Bem-vindo à Newsletter da Agência Digital Hub!',
        content: `
          <h2>Obrigado por se inscrever na nossa newsletter!</h2>
          <p>Olá! Bem-vindo à comunidade da <strong>Agência Digital Hub</strong>!</p>
          <p>A partir de agora, você receberá:</p>
          <ul>
            <li>📱 Novidades sobre nossos produtos e serviços digitais</li>
            <li>📰 Artigos exclusivos sobre tecnologia e inovação</li>
            <li>🚀 Dicas práticas para transformar seu negócio digital</li>
            <li>🎯 Insights sobre marketing digital e estratégias</li>
          </ul>
          <p>Estamos animados para compartilhar conteúdo valioso com você!</p>
          <p>Se tiver dúvidas, entre em contato conosco pelo WhatsApp: <strong>(83) 98832-9018</strong></p>
          <hr>
          <p><em>Agência Digital Hub - Transformando ideias em realidade digital</em></p>
        `
      },
      'pt-PT': {
        subject: '🎉 Bem-vindo à Newsletter da Agência Digital Hub!',
        content: `
          <h2>Obrigado por se inscrever na nossa newsletter!</h2>
          <p>Olá! Bem-vindo à comunidade da <strong>Agência Digital Hub</strong>!</p>
          <p>A partir de agora, receberá:</p>
          <ul>
            <li>📱 Novidades sobre os nossos produtos e serviços digitais</li>
            <li>📰 Artigos exclusivos sobre tecnologia e inovação</li>
            <li>🚀 Dicas práticas para transformar o seu negócio digital</li>
            <li>🎯 Insights sobre marketing digital e estratégias</li>
          </ul>
          <p>Estamos entusiasmados para partilhar conteúdo valioso consigo!</p>
          <p>Se tiver dúvidas, entre em contacto connosco pelo WhatsApp: <strong>(83) 98832-9018</strong></p>
          <hr>
          <p><em>Agência Digital Hub - Transformando ideias em realidade digital</em></p>
        `
      },
      'es': {
        subject: '🎉 ¡Bienvenido al Newsletter de Agencia Digital Hub!',
        content: `
          <h2>¡Gracias por suscribirte a nuestro newsletter!</h2>
          <p>¡Hola! ¡Bienvenido a la comunidad de <strong>Agencia Digital Hub</strong>!</p>
          <p>A partir de ahora, recibirás:</p>
          <ul>
            <li>📱 Novedades sobre nuestros productos y servicios digitales</li>
            <li>📰 Artículos exclusivos sobre tecnología e innovación</li>
            <li>🚀 Consejos prácticos para transformar tu negocio digital</li>
            <li>🎯 Insights sobre marketing digital y estrategias</li>
          </ul>
          <p>¡Estamos emocionados de compartir contenido valioso contigo!</p>
          <p>Si tienes dudas, contáctanos por WhatsApp: <strong>(83) 98832-9018</strong></p>
          <hr>
          <p><em>Agencia Digital Hub - Transformando ideas en realidad digital</em></p>
        `
      },
      'en': {
        subject: '🎉 Welcome to Digital Hub Agency Newsletter!',
        content: `
          <h2>Thank you for subscribing to our newsletter!</h2>
          <p>Hello! Welcome to the <strong>Digital Hub Agency</strong> community!</p>
          <p>From now on, you'll receive:</p>
          <ul>
            <li>📱 News about our digital products and services</li>
            <li>📰 Exclusive articles about technology and innovation</li>
            <li>🚀 Practical tips to transform your digital business</li>
            <li>🎯 Insights about digital marketing and strategies</li>
          </ul>
          <p>We're excited to share valuable content with you!</p>
          <p>If you have questions, contact us on WhatsApp: <strong>(83) 98832-9018</strong></p>
          <hr>
          <p><em>Digital Hub Agency - Transforming ideas into digital reality</em></p>
        `
      }
    };

    const message = welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages['pt-BR'];

    const emailResponse = await resend.emails.send({
      from: `Digital Hub Agency <noreply@agenciadigitalhub.com>`,
      to: [email],
      subject: message.subject,
      html: message.content,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-welcome function:", error);
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
