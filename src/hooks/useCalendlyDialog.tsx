
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogOverlay } from '@/components/ui/dialog';

export const useCalendlyDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendly = () => setIsOpen(true);
  const closeCalendly = () => setIsOpen(false);

  const CalendlyDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay />
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogTitle className="text-xl font-bold mb-4">Agende sua Reunião</DialogTitle>
        <div className="min-h-[600px]">
          <iframe
            src="https://calendly.com/agenciadigital/30min"
            width="100%" 
            height="600"
            frameBorder="0" 
            title="Agendar reunião"
            className="rounded-md"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );

  return { openCalendly, closeCalendly, CalendlyDialog };
};
