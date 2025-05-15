
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle, Send, Mail, Phone, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCalendly } from '@/components/CalendlyProvider';
import { useTranslation } from 'react-i18next';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Defining form stages
enum FormStage {
  PERSONAL = 0,
  COMPANY = 1,
  PROJECT = 2,
  CONFIRMATION = 3,
}

const Agendar = () => {
  const [stage, setStage] = useState<FormStage>(FormStage.PERSONAL);
  const [showCalendly, setShowCalendly] = useState(false);
  const { openCalendly } = useCalendly();
  const { t, i18n } = useTranslation();

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log('Language changed in Agendar page:', i18n.language);
      // Re-initialize the form with new translations
      resetForm();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n]);
  
  // Function to reset the form with current translations
  const resetForm = () => {
    form.reset({
      name: "",
      email: "",
      phone: "",
      role: "",
      companyName: "",
      segment: "",
      companySize: "",
      website: "",
      serviceType: "",
      projectDescription: "",
      deadline: "",
      budget: "",
      preferWhatsApp: true,
      preferEmail: false,
      preferPhone: false,
      preferCalendly: false,
    });
    setStage(FormStage.PERSONAL);
  };

  // Schema for form validation
  const formSchema = z.object({
    // Personal data
    name: z.string().min(3, { message: t('form.errors.nameMin') }),
    email: z.string().email({ message: t('form.errors.emailInvalid') }),
    phone: z.string().min(10, { message: t('form.errors.phoneInvalid') }),
    role: z.string().min(2, { message: t('form.errors.roleRequired') }),
    
    // Company data
    companyName: z.string().min(2, { message: t('form.errors.companyNameRequired') }),
    segment: z.string().min(2, { message: t('form.errors.segmentRequired') }),
    companySize: z.string().min(1, { message: t('form.errors.companySizeRequired') }),
    website: z.string().optional(),
    
    // Project data
    serviceType: z.string().min(2, { message: t('form.errors.serviceTypeRequired') }),
    projectDescription: z.string().min(20, { message: t('form.errors.descriptionMin') }),
    deadline: z.string().min(1, { message: t('form.errors.deadlineRequired') }),
    budget: z.string().optional(),

    // Contact preferences
    preferWhatsApp: z.boolean().default(true),
    preferEmail: z.boolean().default(false),
    preferPhone: z.boolean().default(false),
    preferCalendly: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      companyName: "",
      segment: "",
      companySize: "",
      website: "",
      serviceType: "",
      projectDescription: "",
      deadline: "",
      budget: "",
      preferWhatsApp: true,
      preferEmail: false,
      preferPhone: false,
      preferCalendly: false,
    },
  });

  // Validate only the current stage fields
  const validateCurrentStage = async () => {
    let fieldsToValidate: string[] = [];
    
    switch (stage) {
      case FormStage.PERSONAL:
        fieldsToValidate = ['name', 'email', 'phone', 'role'];
        break;
      case FormStage.COMPANY:
        fieldsToValidate = ['companyName', 'segment', 'companySize'];
        break;
      case FormStage.PROJECT:
        fieldsToValidate = ['serviceType', 'projectDescription', 'deadline'];
        break;
      case FormStage.CONFIRMATION:
        // No specific validation for confirmation stage
        return true;
    }
    
    const result = await form.trigger(fieldsToValidate as any);
    return result;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // For intermediate stages, validate and advance
    if (stage < FormStage.CONFIRMATION) {
      const isValid = await validateCurrentStage();
      if (isValid) {
        setStage(stage + 1);
      }
      return;
    }

    // Final submission - formatting data
    const formattedMessage = `
*${t('form.newBriefing')}*
-------------------
*${t('form.personalData')}*
${t('form.name')}: ${values.name}
${t('form.email')}: ${values.email}
${t('form.phone')}: ${values.phone}
${t('form.role')}: ${values.role}

*${t('form.companyData')}*
${t('form.company')}: ${values.companyName}
${t('form.segment')}: ${values.segment}
${t('form.size')}: ${values.companySize}
${t('form.website')}: ${values.website || t('form.notProvided')}

*${t('form.projectData')}*
${t('form.service')}: ${values.serviceType}
${t('form.description')}: ${values.projectDescription}
${t('form.deadline')}: ${values.deadline}
${t('form.budget')}: ${values.budget || t('form.notProvided')}

*${t('form.contactPreference')}*
${values.preferWhatsApp ? "• WhatsApp" : ""}
${values.preferEmail ? `• ${t('form.email')}` : ""}
${values.preferPhone ? `• ${t('form.phone')}` : ""}
${values.preferCalendly ? `• ${t('form.onlineScheduling')}` : ""}
    `;

    // Sending to WhatsApp
    if (values.preferWhatsApp) {
      const whatsappNumber = "5583988329018"; // Format: country code + area code + number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(whatsappUrl, "_blank");
    }
    
    // Sending to email
    if (values.preferEmail) {
      const emailSubject = t('form.newBriefingSubject');
      const emailBody = formattedMessage;
      const mailtoUrl = `mailto:contact@agenciadigital.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
    }
    
    // Showing Calendly if preferred
    if (values.preferCalendly) {
      setShowCalendly(true);
    }
    
    toast({
      title: t('form.briefingSentSuccess'),
      description: t('form.willContactSoon'),
      duration: 3000,
    });
    
    // Reset form if not using Calendly
    if (!values.preferCalendly) {
      form.reset();
      setStage(FormStage.PERSONAL);
    }
  };

  const goBack = () => {
    if (stage > FormStage.PERSONAL) {
      setStage(stage - 1);
    }
  };

  const closeCalendly = () => {
    setShowCalendly(false);
    form.reset();
    setStage(FormStage.PERSONAL);
  };

  // Conditional rendering based on current stage
  const renderStageContent = () => {
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

  const renderProgress = () => {
    const stages = [
      { name: t('form.stages.personal'), stage: FormStage.PERSONAL },
      { name: t('form.stages.company'), stage: FormStage.COMPANY },
      { name: t('form.stages.project'), stage: FormStage.PROJECT },
      { name: t('form.stages.confirmation'), stage: FormStage.CONFIRMATION },
    ];

    return (
      <div className="flex justify-between mb-8 px-4">
        {stages.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
          >
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                stage >= item.stage 
                  ? "bg-orange text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {stage > item.stage ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span 
              className={`text-xs ${
                stage >= item.stage ? "text-orange font-medium" : "text-gray-500"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto py-16 md:py-24 flex-grow">
        <h1 className="heading-lg text-center mb-2">{t('form.scheduleTitle')}</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          {t('form.briefingInstructions')}
        </p>
        
        {showCalendly ? (
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
                onClick={closeCalendly} 
                variant="outline"
                className="mt-4"
              >
                {t('form.backToForm')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="shadow-md">
                  {renderProgress()}
                  {renderStageContent()}
                  <CardFooter className="flex justify-between mt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={goBack}
                      disabled={stage === FormStage.PERSONAL}
                    >
                      {t('form.back')}
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-orange hover:bg-orange-dark"
                    >
                      {stage === FormStage.CONFIRMATION ? (
                        <>
                          <span>{t('form.send')}</span>
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      ) : t('form.next')}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>

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
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Agendar;
