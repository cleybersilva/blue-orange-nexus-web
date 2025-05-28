
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import CalendlyWidget from '@/components/agendar/CalendlyWidget';

export const useCalendlyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const openCalendly = () => {
    setIsOpen(true);
    console.log("Calendly modal opened");
  };
  
  const closeCalendly = () => {
    setIsOpen(false);
    console.log("Calendly modal closed");
  };

  const CalendlyModal = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0">
        <div className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold text-navy">
            {t('form.scheduleYourMeeting')}
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            {t('form.chooseTimeSlot')}
          </p>
        </div>
        <div className="px-6 pb-6">
          <CalendlyWidget height={600} />
        </div>
      </DialogContent>
    </Dialog>
  );

  return { openCalendly, closeCalendly, CalendlyModal };
};
