
import { FormStage } from '@/components/agendar/FormProgress';
import { ScheduleFormValues } from '@/types/scheduleForm';

// Get fields to validate for each stage
export const getFieldsForStage = (currentStage: FormStage): (keyof ScheduleFormValues)[] => {
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

// Validate current stage before proceeding
export const validateCurrentStage = async (
  form: any, 
  stage: FormStage, 
  t: (key: string) => string,
  toast: any
): Promise<boolean> => {
  const fieldsToValidate = getFieldsForStage(stage);
  console.log('Validating fields for stage:', stage, 'Fields:', fieldsToValidate);
  
  if (fieldsToValidate.length === 0) {
    console.log('No fields to validate for this stage');
    return true;
  }
  
  const result = await form.trigger(fieldsToValidate);
  console.log('Validation result:', result);
  
  if (!result) {
    console.log('Validation failed for stage:', stage);
    const errors = form.formState.errors;
    console.log('Form errors:', errors);
    
    // Show first error message
    const firstErrorField = fieldsToValidate.find(field => errors[field]);
    if (firstErrorField && errors[firstErrorField]?.message) {
      toast({
        title: t('form.validationError'),
        description: errors[firstErrorField]?.message as string,
        variant: "destructive",
        duration: 4000,
      });
    } else {
      toast({
        title: t('form.validationError'),
        description: t('form.pleaseCheckRequiredFields'),
        variant: "destructive",
        duration: 4000,
      });
    }
    return false;
  }
  
  console.log('Validation passed for stage:', stage);
  return true;
};
