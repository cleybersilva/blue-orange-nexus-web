
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type CalendlyWidgetProps = {
  onEventScheduled?: () => void;
  className?: string;
};

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ onEventScheduled, className = '' }) => {
  const { i18n } = useTranslation();

  // Get language for Calendly
  const getCalendlyLanguage = () => {
    const supportedLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
    let langCode = i18n.language.split('-')[0];
    
    if (!supportedLanguages.includes(langCode)) {
      langCode = 'en';
    }
    
    return langCode;
  };

  useEffect(() => {
    // Load Calendly widget script if not already loaded
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        initializeCalendly();
      };
    } else {
      initializeCalendly();
    }

    return () => {
      // Cleanup function to remove any Calendly elements
      const calendlyElements = document.querySelectorAll('.calendly-inline-widget');
      calendlyElements.forEach(el => el.remove());
    };
  }, [i18n.language]);

  const initializeCalendly = () => {
    if (window.Calendly) {
      const calendlyContainer = document.getElementById('calendly-container');
      if (calendlyContainer) {
        // Clear existing content
        calendlyContainer.innerHTML = '';
        
        // Initialize Calendly widget
        window.Calendly.initInlineWidget({
          url: `https://calendly.com/agenciadigital/30min?lang=${getCalendlyLanguage()}`,
          parentElement: calendlyContainer,
          prefill: {},
          utm: {}
        });

        // Listen for Calendly events
        window.addEventListener('message', function(e) {
          if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            if (e.data.event === 'calendly.event_scheduled') {
              console.log('Event scheduled:', e.data.payload);
              if (onEventScheduled) {
                onEventScheduled();
              }
            }
          }
        });
      }
    }
  };

  return (
    <div className={`calendly-widget-container ${className}`}>
      <div 
        id="calendly-container" 
        className="calendly-inline-widget" 
        style={{ minWidth: '320px', height: '700px' }}
      ></div>
    </div>
  );
};

export default CalendlyWidget;
