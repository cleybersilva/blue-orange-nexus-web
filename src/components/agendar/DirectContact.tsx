
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendly } from '@/components/CalendlyProvider';

const DirectContact = () => {
  const { t } = useTranslation();
  const { openCalendly } = useCalendly();

  return (
    <div className="mt-10 bg-navy rounded-lg p-6 text-white">
      <h3 className="text-xl font-semibold mb-4">{t('form.needImmediateHelp')}</h3>
      <p className="mb-6">
        {t('form.contactDirectly')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <Phone className="mr-3 text-orange" />
          <div>
            <p className="font-medium">{t('form.phoneWhatsApp')}</p>
            <p className="text-sm text-gray-200">(83) 98832-9018</p>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className="mr-3 text-orange" />
          <div>
            <p className="font-medium">{t('form.email')}</p>
            <p className="text-sm text-gray-200">contact@agenciadigital.com</p>
          </div>
        </div>
        <div className="flex items-center md:col-span-2">
          <Calendar className="mr-3 text-orange" />
          <div>
            <p className="font-medium">{t('form.onlineScheduling')}</p>
            <Button 
              variant="link" 
              onClick={() => openCalendly()}
              className="p-0 h-auto text-sm text-gray-200 hover:text-orange"
            >
              {t('form.scheduleCalendly')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectContact;
