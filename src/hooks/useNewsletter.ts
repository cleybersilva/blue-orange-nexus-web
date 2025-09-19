
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

export interface NewsletterSubscription {
  id: string;
  email: string;
  language: string;
  subscribed_at: string;
  status: string;
  created_at: string;
}

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const subscribe = async (email: string): Promise<boolean> => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast({
        variant: "destructive",
        title: t('footer.error'),
        description: t('footer.emailInvalid'),
      });
      return false;
    }

    setIsLoading(true);

    try {
      // Check if email already exists
      const { data: existingSubscription, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing subscription:', checkError);
        throw checkError;
      }

      if (existingSubscription) {
        toast({
          variant: "destructive",
          title: t('footer.error'),
          description: "Este e-mail já está inscrito na newsletter.",
        });
        return false;
      }

      // Insert new subscription
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email.toLowerCase(),
          language: i18n.language,
          status: 'active'
        });

      if (insertError) throw insertError;

      // Send welcome email
      const { error: emailError } = await supabase.functions.invoke('send-newsletter-welcome', {
        body: {
          email: email.toLowerCase(),
          language: i18n.language,
        },
      });

      if (emailError) {
        console.error('Welcome email sending error:', emailError);
        // Don't throw error for email - subscription still succeeded
      }

      toast({
        title: t('footer.success'),
        description: t('footer.subscribed'),
      });

      console.log("Newsletter subscription successful for:", email);
      return true;

    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        variant: "destructive",
        title: t('footer.error'),
        description: "Erro ao processar inscrição. Tente novamente.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getSubscriptions = async (): Promise<NewsletterSubscription[]> => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }
  };

  const sendNewsletterToSubscribers = async (articleTitle: string, articleUrl: string, articleSummary?: string) => {
    try {
      const subscriptions = await getSubscriptions();
      
      if (subscriptions.length === 0) {
        console.log('No active subscribers found');
        return 0;
      }

      // Send newsletter via edge function
      const { error } = await supabase.functions.invoke('send-newsletter-article', {
        body: {
          articleTitle,
          articleUrl,
          articleSummary,
          subscriptions
        },
      });

      if (error) {
        console.error('Newsletter sending error:', error);
        throw error;
      }

      console.log(`Newsletter sent to ${subscriptions.length} subscribers`);
      return subscriptions.length;

    } catch (error) {
      console.error('Error sending newsletter:', error);
      throw error;
    }
  };

  return {
    subscribe,
    getSubscriptions,
    sendNewsletterToSubscribers,
    isLoading
  };
};
