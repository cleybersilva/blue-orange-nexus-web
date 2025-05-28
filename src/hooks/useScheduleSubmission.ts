
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { ScheduleFormValues } from '@/types/scheduleForm';

export const useScheduleSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const submitScheduleForm = async (values: ScheduleFormValues): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Submit to edge function
      const { error } = await supabase.functions.invoke('send-schedule-briefing', {
        body: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          role: values.role,
          companyName: values.companyName,
          segment: values.segment,
          companySize: values.companySize,
          website: values.website,
          serviceType: values.serviceType,
          projectDescription: values.projectDescription,
          deadline: values.deadline,
          budget: values.budget,
          preferWhatsApp: values.preferWhatsApp,
          preferEmail: values.preferEmail,
          preferPhone: values.preferPhone,
          preferCalendly: values.preferCalendly,
          language: i18n.language,
        },
      });

      if (error) throw error;

      toast({
        title: t('form.briefingSentSuccess'),
        description: t('form.willContactSoon'),
        duration: 5000,
      });

      console.log("Schedule form submission successful for:", values.email);
      return true;

    } catch (error) {
      console.error("Schedule form submission error:", error);
      toast({
        variant: "destructive",
        title: t('form.submissionError'),
        description: "Erro ao processar agendamento. Tente novamente.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitScheduleForm,
    isLoading
  };
};
