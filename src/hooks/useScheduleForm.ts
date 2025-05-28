
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

  // Determine email based on language
  const getContactEmail = () => {
    const currentLanguage = i18n.language;
    console.log('Current language:', currentLanguage);
    
    // For English, use contact@agenciadigitalhub.com
    if (currentLanguage === 'en') {
      return 'contact@agenciadigitalhub.com';
    }
    
    // For Portuguese (BR and PT) and Spanish, use contato@agenciadigitalhub.com
    return 'contato@agenciadigitalhub.com';
  };

  // Validate current stage before proceeding
  const validateCurrentStage = async () => {
    const fieldsToValidate = getFieldsForStage(stage);
    const result = await form.trigger(fieldsToValidate);
    
    if (!result) {
      console.log('Validation failed for stage:', stage);
      const errors = form.formState.errors;
      console.log('Form errors:', errors);
      
      // Show first error message
      const firstError = Object.values(errors)[0];
      if (firstError?.message) {
        toast({
          title: t('form.validationError'),
          description: firstError.message,
          variant: "destructive",
          duration: 4000,
        });
      }
      return false;
    }
    
    return true;
  };

  // Get fields to validate for each stage
  const getFieldsForStage = (currentStage: FormStage): (keyof ScheduleFormValues)[] => {
    switch (currentStage) {
      case FormStage.PERSONAL:
        return ['name', 'email', 'phone', 'role'];
      case FormStage.COMPANY:
        return ['companyName', 'segment', 'companySize'];
      case FormStage.PROJECT:
        return ['serviceType', 'projectDescription', 'deadline'];
      case FormStage.CONFIRMATION:
        return [];
      default:
        return [];
    }
  };

  // Handle form submission
  const onSubmit = async (values: ScheduleFormValues) => {
    console.log('Form submission triggered for stage:', stage);
    console.log('Form values:', values);

    // If not on confirmation stage, validate and go to next stage
    if (stage < FormStage.CONFIRMATION) {
      const isValid = await validateCurrentStage();
      if (isValid) {
        console.log('Stage validation passed, moving to next stage');
        goToNextStage();
      }
      return;
    }

    // Final submission on confirmation stage
    console.log('Final submission - processing form data');

    // Store form data in localStorage for persistence
    localStorage.setItem('scheduleFormData', JSON.stringify(values));
    console.log('Form data stored in localStorage');

    // Formatting data for submission
    const contactEmail = getContactEmail();
    console.log('Contact email determined:', contactEmail);

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

*${t('form.systemInfo')}*
${t('form.submissionTime')}: ${new Date().toLocaleString()}
${t('form.language')}: ${i18n.language}
    `;

    let submissionSuccess = false;

    // Sending to WhatsApp
    if (values.preferWhatsApp) {
      try {
        const whatsappNumber = "5583988329018";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
        console.log('Opening WhatsApp with message');
        window.open(whatsappUrl, "_blank");
        submissionSuccess = true;
      } catch (error) {
        console.error('Error opening WhatsApp:', error);
      }
    }
    
    // Sending to email
    if (values.preferEmail) {
      try {
        const emailSubject = t('form.newBriefingSubject');
        const emailBody = formattedMessage;
        const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        console.log('Opening email client with message to:', contactEmail);
        window.location.href = mailtoUrl;
        submissionSuccess = true;
      } catch (error) {
        console.error('Error opening email client:', error);
      }
    }
    
    // Showing Calendly if preferred
    if (values.preferCalendly) {
      console.log('Opening Calendly for scheduling');
      setShowCalendly(true);
      openCalendly();
      submissionSuccess = true;
    }

    // Show success message
    if (submissionSuccess) {
      toast({
        title: t('form.briefingSentSuccess'),
        description: t('form.willContactSoon'),
        duration: 5000,
      });
      
      console.log('Form submission completed successfully');
    } else {
      toast({
        title: t('form.submissionError'),
        description: t('form.pleaseSelectContactMethod'),
        variant: "destructive",
        duration: 4000,
      });
    }
    
    // Reset form if not using Calendly
    if (!values.preferCalendly) {
      setTimeout(() => {
        form.reset();
        setStage(FormStage.PERSONAL);
        localStorage.removeItem('scheduleFormData');
        console.log('Form reset completed');
      }, 2000);
    }
  };
  
  const closeCalendly = () => {
    console.log('Closing Calendly and resetting form');
    setShowCalendly(false);
    form.reset();
    setStage(FormStage.PERSONAL);
    localStorage.removeItem('scheduleFormData');
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
