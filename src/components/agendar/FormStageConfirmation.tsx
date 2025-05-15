
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription 
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent 
} from "@/components/ui/card";

const FormStageConfirmation = () => {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <>
      <CardHeader>
        <CardTitle>{t('form.confirmation')}</CardTitle>
        <CardDescription>{t('form.howPreferContact')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="preferWhatsApp"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>WhatsApp</FormLabel>
                  <FormDescription>
                    {t('form.sendBriefingWhatsApp')}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferEmail"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('form.email')}</FormLabel>
                  <FormDescription>
                    {t('form.sendBriefingEmail')}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferPhone"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('form.phone')}</FormLabel>
                  <FormDescription>
                    {t('form.preferPhone')}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferCalendly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('form.onlineScheduling')}</FormLabel>
                  <FormDescription>
                    {t('form.scheduleCalendly')}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-md bg-navy-light/10 p-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium">{t('form.informationSummary')}</p>
            <p><span className="font-semibold">{t('form.name')}:</span> {form.getValues("name")}</p>
            <p><span className="font-semibold">{t('form.company')}:</span> {form.getValues("companyName")}</p>
            <p><span className="font-semibold">{t('form.service')}:</span> {form.getValues("serviceType")}</p>
            <p><span className="font-semibold">{t('form.deadline')}:</span> {form.getValues("deadline")}</p>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default FormStageConfirmation;
