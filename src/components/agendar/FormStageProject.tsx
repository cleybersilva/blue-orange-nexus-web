
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
import { Textarea } from "@/components/ui/textarea";
import { 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent 
} from "@/components/ui/card";

const FormStageProject = () => {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <>
      <CardHeader>
        <CardTitle>{t('form.aboutProject')}</CardTitle>
        <CardDescription>{t('form.projectDetails')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.serviceType')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.serviceTypePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.projectDescription')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t('form.projectDescriptionPlaceholder')}
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.desiredDeadline')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.deadlinePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.estimatedBudget')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.budgetPlaceholder')} {...field} />
              </FormControl>
              <FormDescription>
                {t('form.budgetDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </>
  );
};

export default FormStageProject;
