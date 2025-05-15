
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormStage } from './FormProgress';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UseFormReturn } from 'react-hook-form';
import { ScheduleFormValues } from '@/hooks/useScheduleForm';

type FormStagesProps = {
  stage: FormStage;
  form: UseFormReturn<ScheduleFormValues>;
};

const FormStages: React.FC<FormStagesProps> = ({ stage, form }) => {
  const { t } = useTranslation();

  switch (stage) {
    case FormStage.PERSONAL:
      return (
        <>
          <CardHeader>
            <CardTitle>{t('form.personalData')}</CardTitle>
            <CardDescription>{t('form.provideContactInfo')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.fullName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form.yourName')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('form.emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form.phonePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.role')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form.rolePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </>
      );

    case FormStage.COMPANY:
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

    case FormStage.PROJECT:
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

    case FormStage.CONFIRMATION:
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

    default:
      return null;
  }
};

export default FormStages;
