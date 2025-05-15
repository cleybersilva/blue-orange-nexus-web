
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent 
} from "@/components/ui/card";

const FormStageCompany = () => {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <>
      <CardHeader>
        <CardTitle>{t('form.aboutCompany')}</CardTitle>
        <CardDescription>{t('form.companyInfo')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.companyName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.companyNamePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="segment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.segment')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.segmentPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.companySize')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.companySizePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.website')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.websitePlaceholder')} {...field} />
              </FormControl>
              <FormDescription>
                {t('form.websiteDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </>
  );
};

export default FormStageCompany;
