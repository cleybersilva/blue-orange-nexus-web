
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import CalendlyModal from '@/components/agendar/CalendlyModal';

export const useCalendlyDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const openCalendly = () => {
    setIsOpen(true);
    toast({
      title: t('calendly.openingSchedule'),
      description: t('calendly.chooseTime'),
      duration: 3000,
    });
    console.log("Calendly dialog opened");
  };
  
  const closeCalendly = () => {
    setIsOpen(false);
    console.log("Calendly dialog closed");
  };

  const handleEventScheduled = () => {
    toast({
      title: t('form.briefingSentSuccess'),
      description: t('form.willContactSoon'),
      duration: 5000,
    });
    console.log("Calendly event scheduled successfully");
  };

  const CalendlyDialog = () => (
    <CalendlyModal 
      isOpen={isOpen}
      onClose={closeCalendly}
      onEventScheduled={handleEventScheduled}
    />
  );

  return { openCalendly, closeCalendly, CalendlyDialog };
};
