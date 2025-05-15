
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from 'react-i18next';
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FormStage } from "@/components/agendar/FormProgress";
import { useCalendly } from "@/components/CalendlyProvider";

export type ScheduleFormValues = z.infer<ReturnType<typeof createFormSchema>>;

const createFormSchema = (t: (key: string) => string) => z.object({
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

export const useScheduleForm = () => {
  const { t, i18n } = useTranslation();
  const [stage, setStage] = useState<FormStage>(FormStage.PERSONAL);
  const [showCalendly, setShowCalendly] = useState(false);
  const { openCalendly } = useCalendly();
  
  // Create form with the translation function
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(createFormSchema(t)),
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

  // Handle stage navigation
  const goToNextStage = () => {
    if (stage < FormStage.CONFIRMATION) {
      setStage(stage + 1);
    }
  };

  const goToPreviousStage = () => {
    if (stage > FormStage.PERSONAL) {
      setStage(stage - 1);
    }
  };

  // Handle form submission
  const onSubmit = (values: ScheduleFormValues) => {
    if (stage < FormStage.CONFIRMATION) {
      goToNextStage();
      return;
    }

    // Formatting data for submission
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
      openCalendly();
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
  
  const closeCalendly = () => {
    setShowCalendly(false);
    form.reset();
    setStage(FormStage.PERSONAL);
  };

  return {
    form,
    stage,
    showCalendly,
    goToNextStage,
    goToPreviousStage,
    onSubmit,
    closeCalendly
  };
};
