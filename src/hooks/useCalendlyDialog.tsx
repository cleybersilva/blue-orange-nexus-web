
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogOverlay } from '@/components/ui/dialog';
import { toast } from "@/components/ui/use-toast";
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
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogTitle className="text-xl font-bold mb-4">{t('calendly.scheduleTitle')}</DialogTitle>
        <div className="min-h-[600px]">
          <iframe
            src={`https://calendly.com/agenciadigital/30min?lang=${getCalendlyLanguage()}`}
            width="100%" 
            height="600"
            frameBorder="0" 
            title={t('calendly.scheduleTitle')}
            className="rounded-md"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );

  return { openCalendly, closeCalendly, CalendlyDialog };
};
