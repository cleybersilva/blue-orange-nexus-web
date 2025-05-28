import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import CalendlyWidget from './CalendlyWidget';

type CalendlyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEventScheduled?: () => void;
};

const CalendlyModal: React.FC<CalendlyModalProps> = ({ 
  isOpen, 
  onClose, 
  onEventScheduled 
}) => {
  const { t } = useTranslation();

  const handleEventScheduled = () => {
    console.log('Event scheduled successfully');
    if (onEventScheduled) {
      onEventScheduled();
    }
    // Keep modal open so user can see confirmation
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-navy">
            {t('form.scheduleYourMeeting')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          <div className="flex-1 overflow-y-auto">
            <CalendlyWidget 
              onEventScheduled={handleEventScheduled}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-end border-t pt-4">
            <Button 
              onClick={onClose} 
              variant="outline"
              className="hover:bg-gray-50"
            >
              {t('form.backToForm')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyModal;
