
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

interface CalendlyEmbedProps {
  onClose: () => void;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{t('form.scheduleYourMeeting')}</h2>
        <div className="calendly-embed mb-6" style={{ minHeight: '650px' }}>
          <iframe
            src={`https://calendly.com/agenciadigital/30min?lang=${i18n.language.split('-')[0]}`}
            width="100%"
            height="650"
            frameBorder="0"
            title={t('form.scheduleTitle')}
          ></iframe>
        </div>
        <Button 
          onClick={onClose} 
          variant="outline"
          className="mt-4"
        >
          {t('form.backToForm')}
        </Button>
      </div>
    </div>
  );
};

export default CalendlyEmbed;
