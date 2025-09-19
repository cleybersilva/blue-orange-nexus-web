import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogOverlay } from '@/components/ui/dialog';
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

export const useCalendlyDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const openCalendly = () => {
    setIsOpen(true);
    toast.success(t('calendly.openingSchedule'), {
      description: t('calendly.chooseTime'),
    });
    console.log("Calendly dialog opened");
  };
  
  const closeCalendly = () => setIsOpen(false);

  // Get the current language code for Calendly
  const getCalendlyLanguage = () => {
    // Calendly supported languages (as of May 2025)
    const supportedLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
    
    // Convert i18next language code to Calendly language code
    let langCode = i18n.language.split('-')[0]; // Get base language code
    
    if (!supportedLanguages.includes(langCode)) {
      langCode = 'en'; // Default to English if not supported
    }
    
    return langCode;
  };

  const CalendlyDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] max-w-[95vw] max-h-[90vh] overflow-hidden p-0">
        <div className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">{t('calendly.scheduleTitle')}</DialogTitle>
        </div>
        <div className="px-6 pb-6">
          <div className="w-full h-[600px] bg-white rounded-md overflow-hidden">
            <iframe
              src={`https://calendly.com/sre-engineer/30min?lang=${getCalendlyLanguage()}`}
              width="100%" 
              height="100%"
              frameBorder="0" 
              title={t('calendly.scheduleTitle')}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return { openCalendly, closeCalendly, CalendlyDialog };
};