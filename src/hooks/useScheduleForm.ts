
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next';
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormStage } from "@/components/agendar/FormProgress";
import { useCalendly } from "@/components/CalendlyProvider";
import { createFormSchema, ScheduleFormValues } from "@/types/scheduleForm";
import { useFormStorage } from "@/hooks/useFormStorage";
import { validateCurrentStage } from "@/utils/formValidation";
import { useScheduleSubmission } from "@/hooks/useScheduleSubmission";
import { 
  getContactEmail, 
  formatSubmissionMessage, 
  sendToWhatsApp, 
  sendToEmail 
} from "@/utils/formSubmission";

export const useScheduleForm = () => {
  const { t, i18n } = useTranslation();
  const [stage, setStage] = useState<FormStage>(FormStage.PERSONAL);
  const [showCalendly, setShowCalendly] = useState(false);
  const { openCalendly } = useCalendly();
  const { submitScheduleForm } = useScheduleSubmission();
  
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

  const { saveFormData, saveCurrentStage, clearStoredData } = useFormStorage(form, setStage);

  // Handle stage navigation
  const goToNextStage = () => {
    console.log('goToNextStage called, current stage:', stage);
    if (stage < FormStage.CONFIRMATION) {
      const nextStage = stage + 1;
      console.log('Moving to next stage:', nextStage);
      setStage(nextStage);
      saveCurrentStage(nextStage);
    }
  };

  const goToPreviousStage = () => {
    console.log('goToPreviousStage called, current stage:', stage);
    if (stage > FormStage.PERSONAL) {
      const prevStage = stage - 1;
      console.log('Moving to previous stage:', prevStage);
      setStage(prevStage);
      saveCurrentStage(prevStage);
    }
  };

  // Handle next button click with validation
  const handleNext = async () => {
    console.log('handleNext called for stage:', stage);
    
    const isValid = await validateCurrentStage(form, stage, t, toast);
    if (!isValid) {
      console.log('Validation failed, staying on current stage');
      return;
    }
    
    // Save current form data
    const currentValues = form.getValues();
    saveFormData(currentValues);
    
    // Move to next stage
    goToNextStage();
    
    toast({
      title: t('form.stepCompleted'),
      description: t('form.proceedingToNextStep'),
      duration: 2000,
    });
  };

  // Handle form submission
  const onSubmit = async (values: ScheduleFormValues) => {
    console.log('Form submission triggered for stage:', stage);
    console.log('Form values:', values);

    // If not on confirmation stage, validate and go to next stage
    if (stage < FormStage.CONFIRMATION) {
      await handleNext();
      return;
    }

    // Final submission on confirmation stage
    console.log('Final submission - processing form data');

    // Validate that at least one contact method is selected
    if (!values.preferWhatsApp && !values.preferEmail && !values.preferPhone && !values.preferCalendly) {
      toast({
        title: t('form.submissionError'),
        description: t('form.pleaseSelectContactMethod'),
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    // Store form data in localStorage for persistence
    saveFormData(values);

    let submissionSuccess = false;

    // Handle Calendly first if selected
    if (values.preferCalendly) {
      console.log('Opening Calendly for scheduling');
      setShowCalendly(true);
      openCalendly();
      submissionSuccess = true;
    }

    // Submit to database and send emails
    const dbSubmissionSuccess = await submitScheduleForm(values);
    submissionSuccess = submissionSuccess || dbSubmissionSuccess;

    // Handle WhatsApp and Email methods
    if (values.preferWhatsApp || values.preferEmail) {
      const contactEmail = getContactEmail(i18n);
      const formattedMessage = formatSubmissionMessage(values, t, i18n);

      if (values.preferWhatsApp) {
        sendToWhatsApp(formattedMessage);
      }
      
      if (values.preferEmail) {
        sendToEmail(formattedMessage, contactEmail, t);
      }
    }
    
    // Reset form if not using Calendly
    if (!values.preferCalendly && submissionSuccess) {
      setTimeout(() => {
        form.reset();
        setStage(FormStage.PERSONAL);
        clearStoredData();
        console.log('Form reset completed');
      }, 3000);
    }
  };
  
  const closeCalendly = () => {
    console.log('Closing Calendly and resetting form');
    setShowCalendly(false);
    form.reset();
    setStage(FormStage.PERSONAL);
    clearStoredData();
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

export type { ScheduleFormValues };
