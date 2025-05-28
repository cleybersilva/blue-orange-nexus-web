
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CalendlyWidgetProps {
  url?: string;
  height?: number;
  className?: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ 
  url = "https://calendly.com/agenciadigital/30min", 
  height = 700,
  className = ""
}) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Get language code for Calendly
  const getCalendlyLanguage = () => {
    const langCode = i18n.language.split('-')[0];
    const supportedLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
    return supportedLanguages.includes(langCode) ? langCode : 'en';
  };

  const calendlyUrl = `${url}?embed_domain=${window.location.hostname}&embed_type=Inline&lang=${getCalendlyLanguage()}`;

  return (
    <div className={`calendly-inline-widget ${className}`} style={{ minWidth: '320px', height: `${height}px` }}>
      <iframe
        src={calendlyUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Calendly Scheduling"
        className="rounded-lg"
      />
    </div>
  );
};

export default CalendlyWidget;
