
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from "@/components/ui/use-toast";

export interface NewsletterSubscription {
  email: string;
  language: string;
  subscribedAt: string;
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
      // Get existing subscriptions
      const existingSubscriptions = JSON.parse(
        localStorage.getItem('newsletterSubscriptions') || '[]'
      ) as NewsletterSubscription[];

      // Check if email already exists
      const existingSubscription = existingSubscriptions.find(
        sub => sub.email.toLowerCase() === email.toLowerCase()
      );

      if (existingSubscription) {
        toast({
          variant: "destructive",
          title: t('footer.error'),
          description: "Este e-mail já está inscrito na newsletter.",
        });
        return false;
      }

      // Add new subscription
      const newSubscription: NewsletterSubscription = {
        email: email.toLowerCase(),
        language: i18n.language,
        subscribedAt: new Date().toISOString()
      };

      existingSubscriptions.push(newSubscription);
      localStorage.setItem('newsletterSubscriptions', JSON.stringify(existingSubscriptions));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: t('footer.success'),
        description: t('footer.subscribed'),
      });

      console.log("Newsletter subscription successful:", newSubscription);
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

  const getSubscriptions = (): NewsletterSubscription[] => {
    try {
      return JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
    } catch {
      return [];
    }
  };

  const sendNewsletterToSubscribers = async (articleTitle: string, articleUrl: string) => {
    const subscriptions = getSubscriptions();
    
    // In a real implementation, this would send emails via an API
    // For now, we'll just log the action
    console.log(`Sending newsletter to ${subscriptions.length} subscribers about: ${articleTitle}`);
    
    // Group subscribers by language
    const subscribersByLanguage = subscriptions.reduce((acc, sub) => {
      if (!acc[sub.language]) {
        acc[sub.language] = [];
      }
      acc[sub.language].push(sub);
      return acc;
    }, {} as Record<string, NewsletterSubscription[]>);

    // Log what would be sent to each language group
    Object.entries(subscribersByLanguage).forEach(([language, subs]) => {
      console.log(`Newsletter for ${language}: ${subs.length} subscribers`);
      console.log(`Article: ${articleTitle} - ${articleUrl}`);
    });

    return subscriptions.length;
  };

  return {
    subscribe,
    getSubscriptions,
    sendNewsletterToSubscribers,
    isLoading
  };
};
