
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterData {
  articleTitle: string;
  articleUrl: string;
  articleSummary?: string;
  subscriptions: Array<{
    email: string;
    language: string;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { articleTitle, articleUrl, articleSummary, subscriptions }: NewsletterData = await req.json();
    
    // Group subscribers by language
    const subscribersByLanguage = subscriptions.reduce((acc, sub) => {
      if (!acc[sub.language]) {
        acc[sub.language] = [];
      }
      acc[sub.language].push(sub.email);
      return acc;
    }, {} as Record<string, string[]>);

    // Send emails for each language group
    const emailPromises = Object.entries(subscribersByLanguage).map(async ([language, emails]) => {
      const getRecipientEmail = (language: string) => {
        if (language === 'en') {
          return 'contact@agenciadigitalhub.com';
        }
        return 'contato@agenciadigitalhub.com';
      };

      const senderEmail = getRecipientEmail(language);

      const languageMessages = {
        'pt-BR': {
          subject: `📰 Novo Artigo: ${articleTitle}`,
          content: `
            <h2>Novo artigo publicado!</h2>
            <h3>${articleTitle}</h3>
            ${articleSummary ? `<p>${articleSummary}</p>` : ''}
            <p>Leia o artigo completo clicando no botão abaixo:</p>
            <a href="${articleUrl}" style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Ler Artigo</a>
            <p>Obrigado por acompanhar a Agência Digital Hub!</p>
            <hr>
            <p><em>Agência Digital Hub - Transformando ideias em realidade digital</em></p>
          `
        },
        'pt-PT': {
          subject: `📰 Novo Artigo: ${articleTitle}`,
          content: `
            <h2>Novo artigo publicado!</h2>
            <h3>${articleTitle}</h3>
            ${articleSummary ? `<p>${articleSummary}</p>` : ''}
            <p>Leia o artigo completo clicando no botão abaixo:</p>
            <a href="${articleUrl}" style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Ler Artigo</a>
            <p>Obrigado por acompanhar a Agência Digital Hub!</p>
            <hr>
            <p><em>Agência Digital Hub - Transformando ideias em realidade digital</em></p>
          `
        },
        'es': {
          subject: `📰 Nuevo Artículo: ${articleTitle}`,
          content: `
            <h2>¡Nuevo artículo publicado!</h2>
            <h3>${articleTitle}</h3>
            ${articleSummary ? `<p>${articleSummary}</p>` : ''}
            <p>Lee el artículo completo haciendo clic en el botón de abajo:</p>
            <a href="${articleUrl}" style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Leer Artículo</a>
            <p>¡Gracias por seguir a Agencia Digital Hub!</p>
            <hr>
            <p><em>Agencia Digital Hub - Transformando ideas en realidad digital</em></p>
          `
        },
        'en': {
          subject: `📰 New Article: ${articleTitle}`,
          content: `
            <h2>New article published!</h2>
            <h3>${articleTitle}</h3>
            ${articleSummary ? `<p>${articleSummary}</p>` : ''}
            <p>Read the full article by clicking the button below:</p>
            <a href="${articleUrl}" style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Read Article</a>
            <p>Thank you for following Digital Hub Agency!</p>
            <hr>
            <p><em>Digital Hub Agency - Transforming ideas into digital reality</em></p>
          `
        }
      };

      const message = languageMessages[language as keyof typeof languageMessages] || languageMessages['pt-BR'];

      return resend.emails.send({
        from: `Digital Hub Agency <noreply@agenciadigitalhub.com>`,
        to: emails,
        subject: message.subject,
        html: message.content,
      });
    });

    const emailResults = await Promise.all(emailPromises);
    
    console.log("Newsletter sent successfully to all subscribers:", emailResults);

    return new Response(JSON.stringify({ 
      success: true, 
      emailsSent: subscriptions.length,
      results: emailResults 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-article function:", error);
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
